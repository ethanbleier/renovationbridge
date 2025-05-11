import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

// (Optional) Set a max duration for streaming responses
export const maxDuration = 30;

// Define a type for the messages we expect from the client (simplified from ai.Message)
// type ClientMessage = {
//   role: 'user' | 'assistant' | 'system' | 'function' | 'tool' | 'data';
//   content: string;
//   id?: string; // Will be stripped
//   name?: string; // Will be preserved if present
// };

// Define a type for the messages Groq API expects
// type GroqMessage = {
//   role: 'user' | 'assistant' | 'system';
//   content: string;
//   name?: string;
// };

export async function POST(req: Request) {
  console.log('API route /api/chat POST request received');
  try {
    const { messages } = await req.json();

    console.log('Received messages from client:', JSON.stringify(messages, null, 2));

    if (!messages || !Array.isArray(messages)) {
      console.error('Invalid messages format received');
      return new Response(JSON.stringify({ error: 'Invalid messages format' }), { status: 400 });
    }

    const systemPrompt = {
      role: "system",
      content: `
        You are an expert assistant for a home renovation matchmaking service.
        Our process:
        1. Listen to the user's vision for their space, including goals, style, budget, and timeline.
        2. Explain how we handpick top, vetted contractors matched to their specific needs.
        3. Describe our free walkthroughs and competitive, transparent bids.
        4. Encourage users to compare options and decide at their own pace.
        5. Emphasize our 36 months of post-project support and ongoing guidance.

        We serve the following areas: San Francisco, Oakland, San Jose, Berkeley, Palo Alto, Marin County, Sausalito, Richmond, Fremont, Hayward, Concord, Vallejo, Daly City, and South Bay.

        Always be friendly, concise, and helpful. If unsure, ask clarifying questions.
      `
    };

    // const groq = new Groq({
    //   apiKey: process.env.GROQ_API_KEY
    // });

    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY is not set');
      return new Response(JSON.stringify({ error: 'Server configuration error: GROQ_API_KEY missing' }), { status: 500 });
    }

    // Transform client messages to the format Groq expects
    // const transformedMessagesForGroq: GroqMessage[] = clientMessages.map(msg => {
    //   const groqMessage: GroqMessage = {
    //     role: msg.role as 'user' | 'assistant' | 'system',
    //     content: msg.content
    //   };
    //   if (msg.name) {
    //     groqMessage.name = msg.name;
    //   }
    //   return groqMessage;
    // });

    const allMessagesForGroq = [systemPrompt, ...messages];
    console.log('Messages sent to Groq:', JSON.stringify(allMessagesForGroq, null, 2));

    // Call the Groq model (choose your preferred model)
    const result = streamText({
      model: groq('llama-3.1-8b-instant'), // or 'llama-3.3-70b-versatile', etc.
      messages: allMessagesForGroq,
    });
    console.log('Groq API call initiated, creating stream.');

    // Important: Return the stream in the format expected by the SDK
    return result.toDataStreamResponse();
    
  } catch (error: any) {
    console.error('Error in /api/chat route:', error);
    // Check if the error has a response from Groq that might contain more details
    // if (error.response && error.response.data) {
    //   console.error('Groq API Error details:', error.response.data);
    //   return new Response(JSON.stringify({ error: 'Groq API error', details: error.response.data }), { status: 500 });
    // }
    return new Response(JSON.stringify({ error: error.message || 'An unknown error occurred' }), { status: 500 });
  }
} 