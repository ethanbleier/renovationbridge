import { NextResponse } from 'next/server';
import { submitToGHL } from '@/lib/utils/formSubmission';
import { z } from 'zod';

// Generic form data schema with form type
const genericFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().optional(),
  name: z.string().optional(),
  formType: z.enum(['contact', 'get-started', 'calculator', 'referral', 'guide']).default('contact'),
  // Allow any additional fields
}).catchall(z.any());

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const formData = await request.json();
    
    // Validate the form data
    const validationResult = genericFormSchema.safeParse(formData);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    // Extract the form type and remove it from the data to submit
    const { formType, ...dataToSubmit } = validationResult.data;
    
    // Submit to GoHighLevel with the specified form type
    await submitToGHL(dataToSubmit, formType);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in generic form submission:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
} 