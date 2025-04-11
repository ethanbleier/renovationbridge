'use server';

import { NextResponse } from 'next/server';
import { submitToGHL } from '@/lib/utils/formSubmission';
import { z } from 'zod';

// PDF lead form validation schema
const pdfLeadSchema = z.object({
  first_name: z.string().min(1, { message: 'First name is required' }),
  last_name: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' })
});

export async function POST(request: Request) {
  try {
    console.log('--- PDF LEAD FORM SUBMISSION ---');
    
    // Parse the incoming request body
    const formData = await request.json();
    console.log('Raw form data:', JSON.stringify(formData, null, 2));
    
    // Validate the form data
    const validationResult = pdfLeadSchema.safeParse(formData);
    if (!validationResult.success) {
      console.error('Validation error details:', validationResult.error.format());
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    console.log('Validation successful!');
    
    // Submit to GoHighLevel with the 'pdf-lead' form type
    const ghlResult = await submitToGHL(validationResult.data, 'pdf-lead');
    console.log('GHL submission result:', JSON.stringify(ghlResult, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in pdf-lead form submission:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
} 