'use server';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db/connection';
import Project from '@/lib/models/Project';
import { updateProjectSchema } from '@/lib/utils/validation';
import { authMiddleware, TokenPayload } from '@/lib/utils/auth';

// GET a single project
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Connect to the database
    await dbConnect();
    
    const { id } = params;
    
    // Find the project
    const project = await Project.findById(id)
      .populate('owner', 'name email')
      .populate('contractor', 'name email');
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    // Return the project
    return NextResponse.json({ project });
  } catch (error) {
    console.error('Get project error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// Update a project (authenticated users only)
async function updateProject(
  req: NextRequest,
  user: TokenPayload,
  { params }: { params: { id: string } }
) {
  try {
    // Connect to the database
    await dbConnect();
    
    const { id } = params;
    
    // Parse the request body
    const body = await req.json();
    
    // Validate the request body
    const validationResult = updateProjectSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.format() },
        { status: 400 }
      );
    }
    
    // Find the project
    const project = await Project.findById(id);
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    // Check if the user is the owner of the project or an admin
    if (project.owner.toString() !== user.userId && user.role !== 'admin') {
      return NextResponse.json(
        { error: 'You are not authorized to update this project' },
        { status: 403 }
      );
    }
    
    // Update the project
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $set: validationResult.data },
      { new: true, runValidators: true }
    );
    
    // Return the updated project
    return NextResponse.json({ 
      message: 'Project updated successfully', 
      project: updatedProject 
    });
  } catch (error) {
    console.error('Update project error:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

// Delete a project (authenticated users only)
async function deleteProject(
  req: NextRequest,
  user: TokenPayload,
  { params }: { params: { id: string } }
) {
  try {
    // Connect to the database
    await dbConnect();
    
    const { id } = params;
    
    // Find the project
    const project = await Project.findById(id);
    
    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      );
    }
    
    // Check if the user is the owner of the project or an admin
    if (project.owner.toString() !== user.userId && user.role !== 'admin') {
      return NextResponse.json(
        { error: 'You are not authorized to delete this project' },
        { status: 403 }
      );
    }
    
    // Delete the project
    await Project.findByIdAndDelete(id);
    
    // Return success response
    return NextResponse.json({ 
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}

// Apply authentication middleware to PUT and DELETE methods
export const PUT = (request: NextRequest, { params }: { params: { id: string } }) => 
  authMiddleware((req: NextRequest, user: TokenPayload) => updateProject(req, user, { params }))(request);

export const DELETE = (request: NextRequest, { params }: { params: { id: string } }) => 
  authMiddleware((req: NextRequest, user: TokenPayload) => deleteProject(req, user, { params }))(request); 