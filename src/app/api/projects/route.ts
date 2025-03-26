'use server';

import { NextRequest, NextResponse } from 'next/server';
import Project from '@/lib/models/Project';
import { projectSchema } from '@/lib/utils/validation';
import { authMiddleware } from '@/lib/utils/auth';
import { TokenPayload } from '@/lib/utils/auth';

// GET handler for fetching projects
export async function GET(request: NextRequest) {
  try {
    // Extract query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;
    
    // Build the query
    const query: any = {};
    if (status) {
      query.status = status;
    }
    
    // Execute the query
    const projects = await Project.find(query);
    
    // Apply pagination manually
    const paginatedProjects = projects.slice(skip, skip + limit);
    
    // Count all projects matching the query
    const total = await Project.countDocuments(query);
    
    // Return the projects
    return NextResponse.json({
      projects: paginatedProjects,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

// Create a new project (authenticated users only)
async function createProject(req: NextRequest, user: TokenPayload) {
  try {
    // Parse the request body
    const body = await req.json();
    
    // Validate the request body
    const validationResult = projectSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    // Create the project
    const project = await Project.create({
      ...validationResult.data,
      owner: user.userId,
      status: 'pending', // Default status
    });
    
    // Return the project
    return NextResponse.json({ 
      message: 'Project created successfully', 
      project 
    }, { status: 201 });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

// Apply authentication middleware to POST method
export const POST = authMiddleware(createProject); 