# Email Setup Guide

The contact form now supports sending emails directly to your inbox. Follow these steps to set it up:

## Prerequisites

1. **Node.js and npm** - Make sure you have Node.js installed
2. **Gmail Account** - You'll need a Gmail account to send emails

## Step 1: Install Dependencies

```bash
npm install
```

This will install both frontend and backend dependencies.

## Step 2: Get Gmail App Password

1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Windows Computer" (or your device)
3. Google will generate a 16-character app password
4. Copy this password (you'll use it in the next step)

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_16_character_app_password
   PORT=3001
   ```

## Step 4: Run the Application

### Development Mode (Frontend + Backend)

```bash
npm run dev:all
```

This will start both:
- **Frontend**: http://localhost:8080 (Vite dev server)
- **Backend**: http://localhost:3001 (Express server)

### Individual Servers

**Frontend only:**
```bash
npm run dev
```

**Backend only:**
```bash
npm run dev:server
```

## Step 5: Test the Contact Form

1. Open http://localhost:8080 in your browser
2. Navigate to the Contact section
3. Fill out the form and click "Send Message"
4. You should receive the email in your Gmail inbox

## Troubleshooting

### Email not being sent?

- ✓ Verify `EMAIL_USER` and `EMAIL_PASSWORD` are correct in `.env.local`
- ✓ Make sure the Gmail app password is correct (not your regular password)
- ✓ Check browser console for error messages
- ✓ Check terminal output for backend errors
- ✓ Ensure both frontend (port 8080) and backend (port 3001) are running

### "Failed to send message" error?

- Check that the backend server is running (`npm run dev:server`)
- Verify the proxy configuration in `vite.config.ts` is correct
- Check Gmail's security settings to ensure app passwords are enabled

### Two-factor authentication issue?

If you have 2FA enabled on Gmail, you MUST use an App Password (not your regular Gmail password). Regular passwords won't work.

## Security Notes

- ⚠️ **Never commit `.env.local` to Git** - It's already in `.gitignore`
- ⚠️ Never share your app password with others
- ⚠️ The backend is only exposed locally during development

## For Production

When deploying to production:

1. Use environment variables from your hosting platform (Vercel, Netlify, etc.)
2. Deploy the backend to a server (Heroku, Railway, AWS, etc.)
3. Update the frontend API URL from `/api` to your production backend URL
4. Use server-side environment variables instead of `.env.local`

## Alternative Email Services

You can replace Nodemailer with other services:
- SendGrid
- Mailgun
- AWS SES
- Resend

Just update the `transporter` configuration in `server.js`.
