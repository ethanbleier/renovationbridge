'use server';

import { NextResponse } from 'next/server';
import { submitToGHL } from '@/lib/utils/formSubmission';
import { z } from 'zod';

// Calculator specific validation schema
const calculatorSchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string({ required_error: 'Phone number is required' }),
  city: z.string({ required_error: 'City is required' }),
  homeValue: z.string().or(z.number()),
  yearlyIncome: z.string().or(z.number()),
  projectType: z.string(),
  results: z.any()
});

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const formData = await request.json();
    
    // Validate the form data
    const validationResult = calculatorSchema.safeParse(formData);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    // Map city to location for CRM compatibility
    const mappedFormData = {
      ...validationResult.data,
      location: formData.city || '',
      propertyCity: formData.city || '',
      city: formData.city || '',
      projectDescription: `[System Message] User Calculator Results: ${formData.projectType} - Home Value: ${formData.homeValue}, Income: ${formData.yearlyIncome}`
    };
    
    // Get GoHighLevel API credentials directly as a fallback
    const GHL_API_KEY = process.env.GHL_API_KEY || process.env.NEXT_PUBLIC_GHL_API_KEY;
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || process.env.NEXT_PUBLIC_GHL_LOCATION_ID;
    
    // Check if we have the required credentials
    if (!GHL_API_KEY || !GHL_LOCATION_ID) {
      console.warn('GoHighLevel credentials not found in environment variables');
      
      // Submit anyway and let the submitToGHL function handle the error
      await submitToGHL(mappedFormData, 'calculator');
    } else {
      // If we have credentials, we can pass them directly to ensure they're used
      await submitToGHL(mappedFormData, 'calculator', {
        apiKey: GHL_API_KEY,
        locationId: GHL_LOCATION_ID
      });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in calculator form submission:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
} 