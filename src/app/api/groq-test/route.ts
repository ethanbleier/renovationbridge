import { Groq } from 'groq-sdk';
import { NextResponse } from 'next/server';

export async function GET() {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
  });
  
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "user", content: "Hello from Vercel!" }
      ]
    });
    
    return NextResponse.json({ 
      message: response.choices[0].message.content 
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'An unknown error occurred' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
  });
  
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "user", content: "Hello from Vercel!" }
      ]
    });
    
    return NextResponse.json({ 
      message: response.choices[0].message.content 
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'An unknown error occurred' },
      { status: 500 }
    );
  }
} 