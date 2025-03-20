import { NextResponse } from 'next/server';
import { submitToGHL } from '@/lib/utils/formSubmission';
import { getStartedFormSchema } from '@/lib/utils/validation';

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const formData = await request.json();
    
    // Validate the form data
    const validationResult = getStartedFormSchema.safeParse(formData);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    // Submit to GoHighLevel with the 'get-started' form type (which will add urgent-call tag)
    await submitToGHL(validationResult.data, 'get-started');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in get-started form submission:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
} 