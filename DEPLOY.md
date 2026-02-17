# Vercel Deployment Guide

## Quick Deploy

### Method 1: One-Click Deploy (Recommended)

1. Push your code to a GitHub repository
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Vercel auto-detects Next.js - no configuration needed
5. Click "Deploy"
6. Your app will be live in ~2 minutes

### Method 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd whiz-exam-prep-nextjs
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (Select your account)
# - Link to existing project? No
# - Project name? (Press enter for default)
# - Directory? ./ (Press enter)
# - Override settings? No (Press enter)

# For production deployment
vercel --prod
```

## Environment Variables

**This app requires NO environment variables!** 🎉

Unlike the original version, there are no API keys or external dependencies needed.

## Build Configuration

Vercel automatically detects Next.js projects. The default settings work perfectly:

- **Framework Preset**: Next.js
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `next dev`

## Custom Domain

After deployment:

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Performance Tips

The app is optimized for Vercel Edge Network:

- ✅ Static generation where possible
- ✅ Client-side state management
- ✅ No server-side API calls
- ✅ Optimized bundle size
- ✅ Automatic code splitting

## Monitoring

View your deployment metrics in Vercel dashboard:

- Real-time analytics
- Performance insights
- Error tracking
- Deployment logs

## Troubleshooting

### Build Fails

If build fails, check:
1. Run `npm install` locally first
2. Ensure `package.json` has correct dependencies
3. Run `npm run build` locally to test

### App Won't Load

1. Check browser console for errors
2. Verify deployment succeeded in Vercel dashboard
3. Check deployment logs for errors

### Questions Bank Not Loading

The question bank is bundled with the app - no external loading needed. If issues persist:
1. Clear browser cache
2. Redeploy from Vercel dashboard

## Updates

To update your deployed app:

1. Push changes to GitHub (if using Git integration)
   - Vercel auto-deploys on push
2. OR run `vercel --prod` via CLI

## Cost

This app runs entirely on **Vercel's Free Tier**:
- Unlimited personal projects
- Automatic HTTPS
- Edge Network CDN
- 100GB bandwidth/month

Perfect for personal use or small-scale deployment!
