'use server';

import { NextResponse } from 'next/server';
import { submitToGHL } from '@/lib/utils/formSubmission';
import { z } from 'zod';

// Guide download specific validation schema
const downloadGuideSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().optional(),
  guideTitle: z.string(),
  guideType: z.string().optional(),
  downloadUrl: z.string().optional()
});

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const formData = await request.json();
    
    // Validate the form data
    const validationResult = downloadGuideSchema.safeParse(formData);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    // Submit to GoHighLevel with the 'guide' form type (which will add urgent-guide tag)
    await submitToGHL(validationResult.data, 'guide');
    
    // Return success with optional download URL
    return NextResponse.json({ 
      success: true,
      downloadUrl: formData.downloadUrl || '/pdfs/guide.pdf'
    });
  } catch (error) {
    console.error('Error in guide download submission:', error);
    return NextResponse.json(
      { error: 'Failed to process guide download' },
      { status: 500 }
    );
  }
} 