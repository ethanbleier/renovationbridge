import { NextResponse } from 'next/server';

export async function GET() {
  const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>GoHighLevel OAuth Success</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body {
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
        .success-container {
          margin-top: 50px;
          padding: 30px;
          border-radius: 10px;
          background-color: #f2f0e9;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #313bc0;
          margin-bottom: 20px;
        }
        p {
          margin-bottom: 15px;
        }
        .icon {
          font-size: 64px;
          color: #4CAF50;
          margin-bottom: 20px;
        }
        .buttons {
          margin-top: 30px;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          margin: 0 10px;
          background-color: #313bc0;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          font-weight: 500;
        }
        .button:hover {
          background-color: #252d9d;
        }
      </style>
    </head>
    <body>
      <div class="success-container">
        <div class="icon">✓</div>
        <h1>GoHighLevel OAuth Successful</h1>
        <p>You have successfully connected your GoHighLevel account.</p>
        <p>The access token has been saved and you can now use the GoHighLevel API.</p>
        <div class="buttons">
          <a href="/api/auth/ghl/status" class="button">Check Status</a>
          <a href="/" class="button">Back to Home</a>
        </div>
      </div>
      <script>
        // Close this window after 10 seconds
        setTimeout(() => {
          window.close();
        }, 10000);
      </script>
    </body>
  </html>
  `;
  
  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
} 