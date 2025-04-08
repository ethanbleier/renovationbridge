'use server';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

// Tech support form validation schema
const techSupportSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters long' }),
});

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const formData = await request.json();
    
    // Validate the form data
    const validationResult = techSupportSchema.safeParse(formData);
    if (!validationResult.success) {
      console.error('Validation error details:', validationResult.error.format());
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    const { name, email, message } = validationResult.data;
    
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
    // Send email
    await transporter.sendMail({
      from: `"RenovationBridge Website" <${process.env.EMAIL_FROM}>`,
      to: 'onn@renovationbridge.com',
      subject: 'Tech Support Request',
      html: `
        <h1>Tech Support Request</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in tech support form submission:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
} 