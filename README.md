# Next.js Telegram Authentication

A secure authentication system that leverages Telegram Bot API for OTP verification in Next.js applications.

[![GitHub license](https://img.shields.io/github/license/sukhrobabdullaev/next-telegram-auth)](https://github.com/sukhrobabdullaev/next-telegram-auth/blob/main/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/sukhrobabdullaev/next-telegram-auth/pulls)

## Features

- 🔐 Secure authentication using Telegram bots and OTP verification
- 🌐 Next.js API routes for webhook handling
- 📱 Mobile-friendly contact sharing
- 🔄 OTP regeneration with expiration control
- 🗄️ MongoDB integration for user and OTP storage
- 🌍 Multilingual support (English/Uzbek/Korean)
- 🔒 JWT token generation for authenticated sessions
- 🧹 Automatic keyboard removal after contact sharing
- 📨 Welcome messages personalized with user's name
- 🔔 Comprehensive message handling and error responses
- ⏱️ Time-limited OTP codes (1-minute expiration)
- 🛑 Prevention of duplicate OTP generation

## How It Works

1. **User Interaction**: Users interact with your Telegram bot using `/start` or `/login` commands
2. **Contact Sharing**: Bot requests user's contact information via Telegram's native contact sharing
3. **OTP Generation**: A 6-digit OTP is generated and sent to the user via Telegram
4. **Verification**: User verifies their identity by submitting the OTP through your web application
5. **Authentication**: Upon successful verification, a JWT token is issued for secure sessions

## Prerequisites

- Node.js 16.x or later
- MongoDB database
- Telegram Bot (created via [@BotFather](https://t.me/BotFather))
- Next.js 14.x or later
- ngrok (for local development)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Telegram Bot
BOT_TOKEN=your_telegram_bot_token
WEBHOOK_URL=https://your-domain.com/api/telegram/webhook

# MongoDB
MONGODB_URI=mongodb+srv://your-connection-string

# JWT
JWT_SECRET=your_jwt_secret_key
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/next-telegram-auth.git
   cd next-telegram-auth
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables as described above

4. Run the development server:
   ```bash
   npm run dev
   ```

## Development Setup with ngrok

For local development, you'll need to expose your local server to the internet so Telegram can send webhook updates. [ngrok](https://ngrok.com/) is the perfect tool for this:

1. Install ngrok:

   ```bash
   # macOS with Homebrew
   brew install ngrok
   
   # Windows
   choco install ngrok
   
   # Or download from https://ngrok.com/download
   ```
   ```

2. Start your Next.js development server:

   ```bash
   npm run dev
   ```

3. Start ngrok to create a secure tunnel to your local server:

   ```bash
   ngrok http 3000
   ```

4. Update your Telegram bot webhook using the ngrok URL:

   ```bash
   curl -F "url=https://YOUR-NGROK-URL/api/telegram/webhook" https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook
   ```

5. Update your `.env.local` file with the ngrok URL:

   ```
   WEBHOOK_URL=https://YOUR-NGROK-URL/api/telegram/webhook
   ```

6. You can now test your bot with Telegram while developing locally!

> **Note:** Each time you restart ngrok, you'll get a new URL and will need to update your webhook.

## Deployment

### Deploying to Vercel (Recommended)

Vercel is the ideal platform for Next.js applications and makes deployment straightforward:

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)

2. **Import your project in Vercel**:

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Select your repository
   - Click "Import"

3. **Configure environment variables**:

   - Add all required environment variables in the Vercel project settings:
     - `BOT_TOKEN`
     - `MONGODB_URI`
     - `JWT_SECRET`

4. **Deploy**:

   - Click "Deploy"
   - Wait for the deployment to complete

5. **Update your Telegram webhook**:

   - After deployment, update your bot's webhook URL with your Vercel domain:

   ```bash
   curl -F "url=https://your-project.vercel.app/api/telegram/webhook" https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook
   ```

6. **Verify webhook setup**:
   ```bash
   curl https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo
   ```

> **Note**: Unlike local development with ngrok, once deployed to Vercel, your bot will automatically work with the persistent public URL without requiring any tunneling.

### Deploying to Other Platforms

#### Railway

1. Create a new project in Railway
2. Connect your GitHub repository
3. Add environment variables
4. Deploy and update webhook URL

#### Netlify

1. Import your repository to Netlify
2. Configure build settings (`next build` as build command)
3. Add environment variables
4. Deploy and update webhook URL

> **Important**: For any deployment platform, ensure that serverless function timeout limits are sufficient for your webhook processing. Vercel's limit is 10 seconds on hobby plans.

## Project Structure

```
/
├── app/                   # Next.js 14 app directory
├── api/                   # API Routes
│   ├── telegram/
│   │   ├── webhook.ts     # Telegram webhook handler
│   │   └── verify.ts      # OTP verification endpoint
├── lib/
│   └── mongoose.ts        # Database connection utility
├── models/
│   ├── otp.ts             # OTP model schema
│   └── user.ts            # User model schema
└── components/            # React components
```

## API Endpoints

### `POST /api/telegram/webhook`

Handles incoming Telegram updates through webhooks.

### `POST /api/telegram/verify`

Verifies OTPs and issues JWT tokens.

**Request Body:**

```json
{
  "otp": "123456"
}
```

**Success Response:**

```json
{
  "success": true,
  "phoneNumber": "+1234567890",
  "telegramData": {
    "id": 123456789,
    "first_name": "John",
    "last_name": "Doe",
    "username": "johndoe"
  },
  "token": "your.jwt.token"
}
```

## Telegram Bot Commands

- `/start` - Initiates the authentication process
- `/login` - Generates a new OTP for authentication
- `/test` - Test command to verify bot functionality

## User Experience

1. User receives a personalized welcome message in their preferred language (English, Uzbek, or Korean)
2. A single-tap contact sharing button appears
3. After sharing contact, the keyboard is automatically removed for a cleaner interface
4. OTP is delivered with clear instructions in multiple languages
5. Users can generate new codes with a single tap if needed
6. Informative error messages guide users when something goes wrong

## Multilingual Support

The bot supports three languages:

- 🇺🇿 Uzbek
- 🇺🇸 English
- 🇰🇷 Korean

All user-facing messages are presented in these languages for maximum accessibility.

## Database Models

### User Model

Stores user information linked to their Telegram account:

- `phoneNumber`: User's phone number (unique)
- `telegramId`: Telegram user ID
- `firstName`: User's first name from Telegram
- `lastName`: User's last name from Telegram
- `username`: Telegram username
- `photoUrl`: Profile photo URL (optional)
- `createdAt`: Account creation timestamp
- `lastLogin`: Last login timestamp

### OTP Model

Manages OTP codes with auto-expiration:

- `otp`: 6-digit verification code
- `phoneNumber`: Associated phone number
- `telegramData`: Telegram user information
- `expiresAt`: Expiration timestamp (with TTL index)

## Security Features

- Automatic OTP expiration after 1-2 minutes
- MongoDB TTL index for automatic cleanup of expired OTPs
- Secure JWT token generation for authenticated sessions
- One-time use OTPs (deleted after verification)
- Prevention of duplicate OTP generation
- Clean keyboard removal after authentication
- Error handling for invalid messages or commands

## Advanced Features

- **Personalized Greetings**: Bot welcomes users by name
- **Smart OTP Management**: Prevents unnecessary OTP regeneration if existing code is valid
- **Fallback Error Handling**: Graceful error management for unhandled message types
- **Intelligent Message Processing**: Contextual responses based on user interaction stage
- **Keyboard Management**: Automatic cleanup of UI elements after use

## Troubleshooting

### Common Issues

1. **Webhook not receiving updates**

   - Verify your webhook URL is correctly set in Telegram
   - Check for any error responses in server logs
   - For local development: ensure ngrok tunnel is running

2. **OTP not being generated**

   - Verify MongoDB connection is working
   - Check server logs for any database errors
   - Ensure the Telegram user ID is being correctly extracted

3. **JWT token issues**

   - Verify your JWT_SECRET is properly set
   - Check that the token generation code has correct payload structure

4. **Deployment issues**
   - Check if all environment variables are correctly set
   - Verify the webhook URL has been updated after deployment
   - Review logs in your deployment platform

### Debugging

The webhook handler includes detailed logging:

- Raw request body logging
- Parsed update logging
- Error capture and reporting

You can monitor these logs in your terminal while developing locally or in your deployment platform's logging interface.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Telegraf](https://github.com/telegraf/telegraf) - Modern Telegram Bot Framework for Node.js
- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js
- [ngrok](https://ngrok.com/) - Secure introspectable tunnels to localhost
- [Vercel](https://vercel.com/) - Optimal hosting platform for Next.js applications
