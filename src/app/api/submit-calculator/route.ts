'use server';

import { NextResponse } from 'next/server';
import { submitToGHL } from '@/lib/utils/formSubmission';
import { z } from 'zod';

// Calculator specific validation schema
const calculatorSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().optional(),
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
    
    // Submit to GoHighLevel with the 'calculator' form type (which will add urgent-call tag)
    await submitToGHL(validationResult.data, 'calculator');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in calculator form submission:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
} 