'use server';

import { NextResponse } from 'next/server';
import { submitToGHL } from '@/lib/utils/formSubmission';
import { z } from 'zod';

// Guide download form validation schema
const guideFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().optional(),
  guideTitle: z.string().optional(), // The title of the guide being downloaded
  guideType: z.string().optional()   // Type of guide (renovation, contractor, etc.)
});

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const formData = await request.json();
    
    // Validate the form data
    const validationResult = guideFormSchema.safeParse(formData);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    // Submit to GoHighLevel with the 'guide' form type - this will use urgent-guide instead of urgent-call
    await submitToGHL(validationResult.data, 'guide');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in guide download submission:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
} 