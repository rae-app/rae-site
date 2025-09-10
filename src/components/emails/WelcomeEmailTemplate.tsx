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
        <title>Thankyou for joining our waitlist!</title>
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
              justify-content: center;
              text-align: center;
              gap: 6px;
          }
          .logo-circle {
              width: 20px;
              height: 20px;
              border: 4px solid #e53437;
              border-radius: 50%;
              margin-right: 8px;
              flex-shrink: 0;
          }
          .logo-text {
              font-size: 24px;
              font-weight: bold;
              color: #333;
          }
          .logo-separator {
              font-size: 20px;
              color: #666;
              margin: 0 4px;
          }
          .logo-subtitle {
              font-size: 20px;
              color: #666;
              margin-top: 2px;
              font-weight: normal;
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
                <div class="logo-circle"></div>
                <span class="logo-text">Rae</span>
                <span class="logo-separator"> - </span>
                <span class="logo-subtitle">The First True AI Assistant</span>
              </div>
            </div>
          </div>

          <div class="content">
            <div class="greeting">
              ${name ? `Hi ${name}!` : "Hello there!"}
            </div>

            <div class="message">
              🎉 <strong>Thankyou for joining our waitlist!</strong>
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
                <strong> You're in the queue for our early access!</strong>
              </div>
            </div>
          </div>

          <div class="footer">
            <p>Thank you for believing in our vision!</p>
            <p><strong>Team Rae</strong></p>

            <div class="social-links">
              <a href="https://x.com/thisisraeai" target="_blank" rel="noopener noreferrer">Follow us</a> •
              <a href="https://discord.gg/jbCj6vXq" target="_blank" rel="noopener noreferrer">Updates</a> •
              <a href="https://discord.gg/jbCj6vXq" target="_blank" rel="noopener noreferrer">Support</a>
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
