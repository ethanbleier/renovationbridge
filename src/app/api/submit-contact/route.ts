'use server';

import { NextResponse } from 'next/server';
import { submitToGHL } from '@/lib/utils/formSubmission';
import { contactFormSchema } from '@/lib/utils/validation';

export async function POST(request: Request) {
  try {
    console.log('--- CONTACT FORM SUBMISSION ---');
    
    // Parse the incoming request body
    const formData = await request.json();
    console.log('Raw form data:', JSON.stringify(formData, null, 2));
    
    // Map additional fields to custom field names that GHL recognizes
    // This is a key step - we're manually mapping to field IDs that GHL's API recognizes
    const mappedFormData = {
      ...formData,
      // Map message/description to fields that GHL's API recognizes
      additional_comments: formData.message || formData.projectDescription || formData.description || formData.work_description || formData.project_details || "No description provided",
      project_description: formData.message || formData.projectDescription || formData.description || "No description provided",
      // Keep any other fields that might be useful as custom fields
    };
    
    console.log('Mapped form data:', JSON.stringify(mappedFormData, null, 2));
    
    // Validate the form data
    const validationResult = contactFormSchema.safeParse(mappedFormData);
    if (!validationResult.success) {
      console.error('Validation error details:', validationResult.error.format());
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    console.log('Validation successful!');
    
    // Submit to GoHighLevel with the 'contact' form type (which will add urgent-call tag)
    const ghlResult = await submitToGHL(mappedFormData, 'contact');
    console.log('GHL submission result:', JSON.stringify(ghlResult, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in contact form submission:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
} 