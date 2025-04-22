'use server';

import { NextResponse } from 'next/server';
import { submitToGHL } from '@/lib/utils/formSubmission';
import { getStartedFormSchema } from '@/lib/utils/validation';

export async function POST(request: Request) {
  try {
    console.log('--- GET STARTED FORM SUBMISSION ---');
    console.log('Timestamp:', new Date().toISOString());
    
    // Parse the incoming request body
    const formData = await request.json();
    console.log('Raw form data:', JSON.stringify(formData, null, 2));
    
    // Validate the form data
    const validationResult = getStartedFormSchema.safeParse(formData);
    if (!validationResult.success) {
      console.error('Validation error details:', validationResult.error.format());
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    console.log('Validation successful!');
    console.log('Processing form submission...');
    
    // Submit to GoHighLevel with the 'get-started' form type (which will add urgent-call tag)
    // This also handles Facebook event tracking internally
    console.log('Calling submitToGHL with form type: get-started');
    const ghlResult = await submitToGHL(validationResult.data, 'get-started');
    console.log('GHL submission result:', JSON.stringify(ghlResult, null, 2));
    console.log('Form processing completed successfully');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in get-started form submission:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
} 