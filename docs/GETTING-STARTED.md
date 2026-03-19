# 🚀 Getting Started with Mero Link

Welcome to Mero Link! This guide will help you set up the project locally and get it running in development mode.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0+ ([Download](https://nodejs.org))
- **MongoDB** 6.0+ ([Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git** ([Download](https://git-scm.com))
- **Google OAuth Credentials** ([Setup Guide](https://console.cloud.google.com))
- **AWS S3 Bucket** (Optional, for file uploads)

---

## Step 1: Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/mero-link.git
cd mero-link

# Install dependencies
npm install
```

---

## Step 2: Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in the following values:

### Required Variables

```env
# Database
MONGO_URI=your link

# NextAuth.js
NEXTAUTH_SECRET=your-random-secret-key (generate with: openssl rand -base64 32)
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

### Optional Variables (For File Upload)

```env
# AWS S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET_NAME=your-bucket-name
AWS_REGION=us-east-1
```

---

## Step 3: Set Up Database

### Using MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas]
2. Create a cluster
3. Whitelist your IP address
4. Create database user
5. Copy connection string to `MONGO_URI`

### Using Local MongoDB

```bash
# Start MongoDB service
mongod

# Set MONGO_URI in .env.local
MONGO_URI=mongodb://localhost:27017/merolink
```

---

## Step 4: Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable "Google+ API"
4. Navigate to "Credentials"
5. Create "OAuth 2.0 Client ID" for Web Application
6. Add `link` to Authorized redirect URIs
7. Copy Client ID and Secret to `.env.local`

---

## Step 5: Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

---

## Development Workflow

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check code quality
npm run lint

# Fix linting issues
npm run lint:fix
```

### Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (app)/             # Private app routes (requires auth)
│   ├── (website)/         # Public website routes
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   └── buttons/          # Button components
├── libs/                  # Utility functions
│   ├── cache.js          # In-memory caching
│   ├── mongoClient.js    # Database connection
│   ├── upload.js         # S3 file upload
│   └── logger.js         # Logging utility
├── models/                # Mongoose schemas
│   ├── Page.js           # Link page schema
│   ├── User.js           # User account schema
│   └── Event.js          # Analytics events schema
└── actions/               # Server actions
    └── pageActions.js    # Page mutations
```

---

## Common Issues & Solutions

### Issue: "MONGO_URI is required"
**Solution:** Make sure `.env.local` file exists and contains `MONGO_URI` value

### Issue: "Google OAuth failed"
**Solution:** 
- Verify redirect URI is exactly: ` link `
- Check Client ID and Secret match your Google Cloud project

### Issue: Port 3000 already in use
**Solution:** 
```bash
npm run dev -- -p 3001  # Use port 3001 instead
```

### Issue: MongoDB connection timeout
**Solution:**
- Check MongoDB is running
- Verify connection string is correct
- Check firewall/network connectivity

---

## Testing Your Setup

1. **Visit the app**: http://localhost:3000
2. **Sign up**: Click "Sign up" and authenticate with Google
3. **Create a page**: Fill in your profile details
4. **Preview**: Visit `http://localhost:3000/your-username`
5. **Analytics**: Check link clicks in the dashboard

---

## Next Steps

- Read [API Documentation](./API.md)
- Check [Deployment Guide](../PRODUCTION-GUIDE.md)
- Review [Performance Optimizations](../PRODUCTION-GUIDE.md#-production-optimizations-applied)

---

## Need Help?

- 📖 [Next.js Documentation](https://nextjs.org/docs)
- 🗄️ [MongoDB Documentation](https://docs.mongodb.com)
- 🔐 [NextAuth.js Documentation](https://next-auth.js.org)
- 💾 [AWS S3 Documentation](https://docs.aws.amazon.com/s3)

Happy coding! 🎉
