import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// Endpoint for content revalidation with Vercel
export async function POST(request: NextRequest) {
  try {
    // Verify secret token
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.REVALIDATION_SECRET;

    if (!expectedToken) {
      console.error('REVALIDATION_SECRET is not set in environment variables');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
      console.error('Invalid or missing authorization token');
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Parse the request body
    const body = await request.json();
    
    // Get content type and ID from the webhook payload
    const { contentType, id, slug, path } = body;

    if (!contentType) {
      return NextResponse.json(
        { success: false, message: 'Missing content type' },
        { status: 400 }
      );
    }

    // Revalidate based on content type
    switch (contentType) {
      case 'post':
        // Revalidate the specific post and posts listing
        if (slug) {
          revalidatePath(`/blog/${slug}`);
        }
        revalidateTag('posts');
        revalidatePath('/blog');
        break;
        
      case 'page':
        // Revalidate the specific page
        if (path) {
          revalidatePath(path);
        }
        revalidateTag('pages');
        break;
        
      case 'project':
        // Revalidate the specific project and projects listing
        if (slug) {
          revalidatePath(`/projects/${slug}`);
        }
        revalidateTag('projects');
        revalidatePath('/projects');
        break;
        
      case 'contractor':
        // Revalidate the specific contractor and contractors listing
        if (slug) {
          revalidatePath(`/contractors/${slug}`);
        }
        revalidateTag('contractors');
        revalidatePath('/contractors');
        break;
        
      default:
        // Default to revalidating the home page
        revalidatePath('/');
    }

    return NextResponse.json({ success: true, revalidated: true });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Optional: Test endpoint via GET for debugging
export async function GET(request: NextRequest) {
  const isDevMode = process.env.NODE_ENV === 'development';
  const debugSecret = request.nextUrl.searchParams.get('secret');
  
  // Only allow in development or with a debug secret
  if (!isDevMode && (!debugSecret || debugSecret !== process.env.REVALIDATION_SECRET)) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  const path = request.nextUrl.searchParams.get('path') || '/';
  revalidatePath(path);
  
  return NextResponse.json({
    success: true,
    revalidated: true,
    message: `Path ${path} revalidated.`,
  });
} 