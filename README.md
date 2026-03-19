<div align="center">
  <img src="public/icon-192x192.png" alt="Mero Link Logo" width="120" height="120" />
  <h1>🌐 Mero Link</h1>
  <p><strong>Your Digital Connection Hub</strong></p>
  
  [![Next.js 15](https://img.shields.io/badge/Next.js-15.5.9-black?logo=next.js)](https://nextjs.org)
  [![React 19](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://react.dev)
  [![MongoDB](https://img.shields.io/badge/MongoDB-8.6.3-13AA52?logo=mongodb)](https://www.mongodb.com)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.0-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
  
  <p>Create a personalized link tree to showcase all your online profiles and services in one beautiful place.</p>
</div>

---

## 🎯 About Mero Link

**Mero Link** is a modern, feature-rich platform that empowers individuals and businesses to create a personalized digital hub. Unlike traditional link tree services, we focus on delivering exceptional user experience with powerful analytics, stunning design customization, and seamless integration.

### Why Choose Mero Link?

✅ **Beautiful Design** - 30+ premium themes to match your brand  
✅ **Real-time Analytics** - Track clicks, views, and engagement  
✅ **Mobile-Optimized** - Perfect experience on all devices  
✅ **Google Sign-in** - Quick authentication with OAuth  
✅ **File Hosting** - Built-in S3 integration for avatars & backgrounds  
✅ **QR Code Export** - Share your profile as QR code  
✅ **Lightning Fast** - Optimized database with caching & indexing  

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🎨 **30+ Themes** | Pre-designed themes from anime to corporate styles |
| 📊 **Analytics Dashboard** | Real-time insights into link performance and user engagement |
| 🖼️ **Custom Branding** | Upload custom background images and adjust colors |
| 📱 **Responsive Design** | Fluid typography and adaptive layouts for all screen sizes |
| 🔒 **Privacy Control** | Control visibility and access to your profile |
| 🌙 **Dark/Light Mode** | Automatic theme switching based on system preference |
| ⚡ **Performance** | Database indexes + response caching for instant loads |
| 🔗 **Social Integration** | Link Instagram, Twitter, LinkedIn, GitHub, and more |
| 📤 **File Upload** | S3-powered image hosting with automatic optimization |
| 🔄 **Live Preview** | See changes in real-time before publishing |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ 
- **MongoDB** 6.0+
- **Google OAuth** credentials
- **AWS S3** bucket (optional, for file uploads)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/mero-link.git
cd mero-link
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your credentials:
# - MONGO_URI
# - NEXTAUTH_SECRET
# - GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET
# - AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY / S3_BUCKET_NAME
```

4. **Run development server**
```bash
npm run dev
```

5. **Open browser**
Navigate to `http://localhost:3000`

---

## 📚 Documentation

- **[Deployment Guide](PRODUCTION-GUIDE.md)** - Deploy to production (Vercel, Docker, PM2)
- **[Migration Guide](MIGRATION-GUIDE.md)** - Environment variable changes
- **[API Reference](docs/API.md)** - REST API endpoints documentation

---

## 🏗️ Architecture

```
├── src/
│   ├── app/           # Next.js App Router pages & API routes
│   ├── components/    # Reusable React components (with optimization)
│   ├── actions/       # Server actions for mutations
│   ├── models/        # Mongoose schemas (User, Page, Event)
│   ├── libs/          # Utilities (caching, auth, upload, logging)
│   └── hooks/         # Custom React hooks
├── public/            # Static assets & PWA icons
├── scripts/           # Database & deployment scripts
└── docker/            # Docker configuration
```

### Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15, React 19, TailwindCSS |
| **Backend** | Node.js, Next.js API Routes |
| **Database** | MongoDB 6+ with Mongoose ORM |
| **Storage** | AWS S3 for avatars & backgrounds |
| **Auth** | NextAuth.js with Google OAuth |
| **Caching** | In-memory TTL cache + response optimization |
| **Monitoring** | Custom logging & performance tracking |

---

## ⚡ Performance Optimizations

### Database Optimizations
- ✅ Indexed queries on `uri`, `owner`, `email` fields
- ✅ Compound indexes for analytics queries
- ✅ Lean queries to reduce memory footprint
- ✅ Field projection to minimize payload size

### Response Caching
- ✅ 60s TTL cache for page data
- ✅ 2-5min cache for user profiles
- ✅ Smart invalidation on mutations
- ✅ Cache monitoring & hit rate tracking

### Client-Side Optimizations
- ✅ Image optimization with Next.js Image
- ✅ Component code-splitting with dynamic imports
- ✅ Lazy-loaded forms and analytics dashboard
- ✅ Global progress bar for navigation feedback

---

## 📦 Deployment

### Docker (Recommended)
```bash
docker-compose up -d
```

### Vercel
```bash
npm install -g vercel
vercel deploy
```

### PM2 (Self-hosted)
```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
```

See [PRODUCTION-GUIDE.md](PRODUCTION-GUIDE.md) for detailed setup steps.

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Tips
- Run `npm run lint` to check code quality
- Run `npm run build` to verify production build
- Run `npm run dev` for development with hot reload

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

Built with ❤️ by the Mero Link team  
Powered by [Next.js](https://nextjs.org), [MongoDB](https://mongodb.com), and [TailwindCSS](https://tailwindcss.com)

---

## 📞 Support

- 📧 Email: support@merolink.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/mero-link/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/mero-link/discussions)

---

<div align="center">
  <p><strong>Made with 🎨 by creators, for creators</strong></p>
  <p>⭐ Star us on GitHub if you find Mero Link useful!</p>
</div>
