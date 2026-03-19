# 🚀 Production Deployment Guide for Mero Link

## ✅ Pre-Deployment Checklist

### 1. Environment Variables Setup
Copy `.env.production.example` to `.env.local` and configure:
- `MONGO_URI` - MongoDB production connection string
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your production domain (https://yourdomain.com)
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` - OAuth credentials
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_BUCKET_NAME` - S3 config

### 2. Database Optimization
```bash
# Create database indexes for better performance
mongo your_connection_string --eval "
  db.pages.createIndex({ uri: 1 }, { unique: true });
  db.pages.createIndex({ owner: 1 });
  db.events.createIndex({ page: 1, createdAt: -1 });
  db.events.createIndex({ createdAt: 1 }, { expireAfterSeconds: 7776000 });
"
```

### 3. S3 Bucket Configuration
1. Create S3 bucket with public read access
2. Set CORS policy:
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "POST", "DELETE", "GET"],
    "AllowedOrigins": ["https://yourdomain.com"],
    "ExposeHeaders": ["ETag"]
  }
]
```

### 4. Build Optimization
```bash
# Install dependencies
npm ci --only=production

# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Production Optimizations Applied

### Database Performance
- ✅ Connection pooling (5-10 connections)
- ✅ Query timeout (5 seconds)
- ✅ Automatic retries for failed operations
- ✅ Compression enabled (snappy, zlib)
- ✅ In-memory caching for frequent queries

### Image & File Handling
- ✅ Client-side image compression before upload
- ✅ File type and size validation
- ✅ Automatic old file cleanup
- ✅ CDN-friendly S3 configuration
- ✅ Rate limiting on uploads (10 per 15 minutes)

### Security Enhancements
- ✅ Rate limiting on API routes
- ✅ Authentication required for sensitive endpoints
- ✅ Security headers (XSS, CSRF protection)
- ✅ Input validation and sanitization
- ✅ Error logging without sensitive data exposure

### Performance Optimizations
- ✅ Bundle size optimization
- ✅ Image optimization (WebP, AVIF support)
- ✅ Static asset caching (1 year)
- ✅ API response caching
- ✅ Database query optimization with lean()

### SEO & Analytics
- ✅ Dynamic metadata generation
- ✅ Structured data (JSON-LD) for rich snippets
- ✅ Open Graph and Twitter Card optimization
- ✅ Sitemap generation ready
- ✅ Analytics event tracking

## 📊 Monitoring & Maintenance

### Key Metrics to Monitor
1. **Database Performance**
   - Connection pool usage
   - Query response times
   - Failed connection attempts

2. **API Performance**
   - Response times per endpoint
   - Error rates
   - Rate limit violations

3. **File Upload Performance**
   - Upload success/failure rates
   - File size distributions
   - S3 costs

### Recommended Tools
- **Monitoring**: Sentry, DataDog, or New Relic
- **Uptime**: Pingdom or UptimeRobot
- **Analytics**: Google Analytics 4
- **Performance**: Lighthouse CI in deployment pipeline

## 🚨 Common Production Issues & Solutions

### 1. MongoDB Connection Issues
```bash
# Check connection string format
# Ensure IP whitelist includes production server
# Verify username/password credentials
```

### 2. S3 Upload Failures
```bash
# Verify AWS credentials
# Check bucket permissions
# Ensure CORS is configured correctly
```

### 3. Performance Issues
```bash
# Monitor memory usage
# Check for memory leaks in long-running processes
# Optimize database queries
# Enable compression
```

## 🔄 Deployment Pipeline

### Using Vercel (Recommended)
1. Connect GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy with automatic builds

### Using Docker
```dockerfile
# Use the optimized Dockerfile in the project root
docker build -t mero-link .
docker run -p 3000:3000 --env-file .env.production mero-link
```

### Using PM2 (Node.js)
```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start npm --name "mero-link" -- start

# Enable auto-restart
pm2 startup
pm2 save
```

## 📈 Performance Targets

- **Page Load Time**: < 2 seconds
- **API Response Time**: < 500ms average
- **Image Upload**: < 10 seconds for 5MB files
- **Database Queries**: < 100ms average
- **Memory Usage**: < 512MB per instance
- **Core Web Vitals**: All metrics in "Good" range

## 🔧 Post-Deployment Verification

1. **Health Check Endpoints**
   - [ ] `/api/health` - Basic health check
   - [ ] Database connectivity test
   - [ ] S3 upload test

2. **User Flows**
   - [ ] User registration/login
   - [ ] Page creation and editing
   - [ ] Image upload functionality
   - [ ] Link sharing and analytics

3. **Performance Tests**
   - [ ] Load testing with 100 concurrent users
   - [ ] Database performance under load
   - [ ] File upload under concurrent load

