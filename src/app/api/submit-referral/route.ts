import { NextResponse } from 'next/server';
import { submitToGHL } from '@/lib/utils/formSubmission';
import { z } from 'zod';

// Referral specific validation schema
const referralSchema = z.object({
  homeownersEmail: z.string().email({ message: 'Invalid email address' }),
  homeownersPhone: z.string().optional(),
  homeownersFullName: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  homeownersAddress: z.string().min(5, { message: 'Address must be at least 5 characters long' }),
  projectDescription: z.string().min(10, { message: 'Description must be at least 10 characters long' }),
  agentsFullName: z.string().min(2, { message: 'Agent name must be at least 2 characters long' })
});

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const formData = await request.json();
    
    // Validate the form data
    const validationResult = referralSchema.safeParse(formData);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    // Prepare data for GoHighLevel
    const ghlData = {
      ...validationResult.data,
      // Map fields to standard form field names
      email: validationResult.data.homeownersEmail,
      phone: validationResult.data.homeownersPhone,
      name: validationResult.data.homeownersFullName,
      referralSource: "Real Estate Agent"
    };
    
    // Submit to GoHighLevel with the 'referral' form type (which will add urgent-call tag)
    await submitToGHL(ghlData, 'referral');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in referral form submission:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
} 