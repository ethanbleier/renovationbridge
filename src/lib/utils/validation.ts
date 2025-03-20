import { z } from 'zod';

// User validation schemas
export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  role: z.enum(['user', 'contractor']).optional(),
});

// Project validation schemas
export const projectSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters long' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters long' }),
  propertyAddress: z.string().min(5, { message: 'Address must be at least 5 characters long' }),
  propertyCity: z.string().min(2, { message: 'City must be at least 2 characters long' }),
  propertyState: z.string().min(2, { message: 'State must be at least 2 characters long' }),
  propertyZip: z.string().min(5, { message: 'Zip code must be at least 5 characters long' }),
  budget: z.number().positive({ message: 'Budget must be a positive number' }),
  timeline: z.string().min(2, { message: 'Timeline must be at least 2 characters long' }),
  projectType: z.string().min(2, { message: 'Project type must be at least 2 characters long' }),
});

export const updateProjectSchema = projectSchema.partial();

// Contact form validation schema
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: 'Message must be at least 10 characters long' }),
});

// Get started form validation schema
export const getStartedFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().optional(),
  projectType: z.string().min(2, { message: 'Project type must be at least 2 characters long' }),
  projectDescription: z.string().min(10, { message: 'Description must be at least 10 characters long' }),
  propertyAddress: z.string().min(5, { message: 'Address must be at least 5 characters long' }),
  propertyCity: z.string().min(2, { message: 'City must be at least 2 characters long' }),
  propertyState: z.string().min(2, { message: 'State must be at least 2 characters long' }),
  propertyZip: z.string().min(5, { message: 'Zip code must be at least 5 characters long' }),
  budget: z.string().or(z.number()).optional(),
  timeline: z.string().optional(),
}); 