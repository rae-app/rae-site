interface WelcomeEmailProps {
  name?: string | null;
}

export function WelcomeEmailTemplate({ name }: WelcomeEmailProps) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Rae Waitlist</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .container {
            background: linear-gradient(135deg, #ff928c 0%, #ffffff 100%);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
          }
          .logo-container {
            display: flex;
            align-items: center;
            overflow: visible;
          }
          .logo-circle svg {
            width: 50px;
            height: 50px;
            margin-right: 10px;
            flex-shrink: 0;
            animation: drawCircle 1s ease-in-out 0.1s forwards;
          }

          .logo-circle circle {
            stroke-dasharray: 251.2;
            stroke-dashoffset: 251.2;
            animation: drawStroke 1s ease-in-out 0.1s forwards;
          }
          .logo-text-container {
            overflow: hidden;
            width: 0px;
            animation: slideInText 1s ease-in-out 0.8s forwards;
          }
          .logo-text {
            font-size: 2.5em;
            font-weight: bold;
            color: #333;
            white-space: nowrap;
          }

          @keyframes drawCircle {
            0% {
              transform: rotate(0deg);
            }
            50% {
              transform: rotate(180deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          @keyframes drawStroke {
            0% {
              stroke-dashoffset: 251.2;
              stroke: #ffffff;
            }
            50% {
              stroke-dashoffset: 131.2;
              stroke: #ffffff;
            }
            75% {
              stroke-dashoffset: 62.8;
              stroke: #e53437;
            }
            100% {
              stroke-dashoffset: 0;
              stroke: #e53437;
            }
          }

          @keyframes slideInText {
            0% {
              width: 0px;
              margin-left: 0px;
            }
            100% {
              width: 120px;
              margin-left: 10px;
            }
          }
          .content {
            background: rgba(255, 255, 255, 0.9);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
          }
          .greeting {
            font-size: 1.2em;
            margin-bottom: 20px;
            color: #333;
          }
          .message {
            font-size: 1em;
            line-height: 1.8;
            margin-bottom: 25px;
            color: #555;
          }
          .highlight {
            background: linear-gradient(120deg, #ff928c 0%, #ff6b6b 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: bold;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 0.9em;
            color: #666;
          }
          .social-links {
            margin-top: 20px;
          }
          .social-links a {
            color: #ff928c;
            text-decoration: none;
            margin: 0 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">
              <div class="logo-container">
                <div class="logo-circle">
                  <svg width="50" height="50" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke-width="14"
                      stroke="#ffffff"
                      fill="none"
                    />
                  </svg>
                </div>
                <div class="logo-text-container">
                  <div class="logo-text">Rae</div>
                </div>
              </div>
            </div>
            <p style="color: #666; margin: 0;">Your Invisible Desktop Assistant</p>
          </div>
          
          <div class="content">
            <div class="greeting">
              ${name ? `Hi ${name}!` : 'Hello there!'}
            </div>
            
            <div class="message">
              🎉 <strong>Welcome to the Rae waitlist!</strong>
              <br><br>
              We're thrilled to have you join our community of early adopters. You're now part of an exclusive group that will get <span class="highlight">first access</span> to Rae when we launch.
              <br><br>
              <strong>What's next?</strong>
              <ul style="margin: 15px 0; padding-left: 20px;">
                <li> You'll be among the first to know when Rae is ready</li>
                <li>Exclusive updates and behind-the-scenes content</li>
                <li>Special early-bird pricing and features</li>
                <li>Direct line to our development team for feedback</li>
              </ul>
              
              We're working hard to bring you something amazing. Rae will revolutionize how you interact with your desktop, making complex tasks simple and intuitive.
              <br><br>
              Stay tuned for exciting updates!
            </div>
            
            <div style="text-align: center; margin: 20px 0;">
              <div style="background: #333; color: white; padding: 15px 30px; border-radius: 10px; display: inline-block;">
                <strong>🔥 You're in the queue!</strong>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <p>Thank you for believing in our vision!</p>
            <p><strong>The Rae Team</strong></p>
            
            <div class="social-links">
              <a href="#">Follow us</a> • 
              <a href="#">Updates</a> • 
              <a href="#">Support</a>
            </div>
            
            <p style="font-size: 0.8em; color: #999; margin-top: 20px;">
              You're receiving this email because you joined our waitlist. 
              This is a one-time welcome message.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}
