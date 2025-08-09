# 🚀 Vercel Deployment Guide

## Prerequisites
- [Vercel account](https://vercel.com)
- Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Options

### Option 1: Git Integration (Recommended)
1. Push your code to a Git repository
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click **Add New** > **Project**
4. Import your Git repository
5. Vercel will automatically detect SvelteKit and configure:
   - **Framework**: SvelteKit
   - **Build command**: `npm run build`
   - **Output directory**: Automatically detected
   - **Install command**: `npm install`

### Option 2: Vercel CLI (Alternative)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Follow the prompts for configuration
```

## Build Configuration Details

### Automatic Detection
Vercel automatically detects SvelteKit projects and configures optimal settings:
- **Build command**: `npm run build`
- **Output directory**: `.svelte-kit/output` (automatically handled)
- **Node.js version**: Latest stable (18.x+)
- **Framework**: SvelteKit preset with optimizations

### Environment Variables (Optional)
Set these in Vercel dashboard under **Settings** > **Environment Variables**:
- `NODE_VERSION`: `18` (if you need to specify)

## Performance Features Configured

### 🎯 HTTP Headers (`vercel.json`)
- Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection)
- Aggressive caching for static assets (1 year)
- Optimized caching for 3D models and videos

### ⚡ Build Optimization
- Vercel adapter configured in `svelte.config.js`
- Production-optimized builds with code splitting
- Static assets served with optimal caching
- Edge functions for dynamic routes (if needed)

### 🌍 Global Edge Network
- Automatic deployment to Vercel's global edge network
- Optimal performance worldwide
- Built-in CDN for static assets

## Performance Metrics
Current build output:
- **Main bundle**: ~33.66 kB (gzipped: ~9.41 kB)
- **Three.js chunk**: ~819.42 kB (gzipped: ~216.56 kB)
- **Total CSS**: ~40.40 kB (gzipped: ~7.58 kB)

## Post-Deployment Checklist
- [ ] ✅ Homepage loads correctly
- [ ] ✅ 3D model renders properly
- [ ] ✅ Video background plays
- [ ] ✅ Smooth scrolling works
- [ ] ✅ Navigation between pages works
- [ ] ✅ Mobile responsiveness
- [ ] ✅ Performance metrics (Lighthouse score)

## Troubleshooting

### Build Fails with Node.js version
- Vercel uses Node.js 18.x by default
- Set `NODE_VERSION` environment variable if needed
- Ensure all dependencies are in `dependencies` (not `devDependencies`)

### 3D Models Don't Load
- Verify `.glb` files are in `/static/` directory  
- Check browser console for network errors
- Ensure correct file paths in components
- Vercel serves static files from `/static/` automatically

### Smooth Scrolling Issues
- Lenis library should work automatically
- Check browser console for JavaScript errors
- Verify `autoRaf: true` configuration

### Build Fails with Import Errors
- Check that all imports use correct paths
- Ensure TypeScript types are properly configured
- Verify `$lib` alias is working correctly

## Domain Setup
1. **Custom Domain**: Go to **Domains** in project settings
2. **DNS**: Add domain and configure DNS records as shown
3. **SSL**: Automatically handled by Vercel
4. **Redirects**: Configure www/non-www redirects if needed

## Deployment Commands
```bash
# Deploy to production
vercel --prod

# Deploy preview (branch deployments)
git push origin feature-branch  # Automatic preview deployment

# Local development with Vercel functions
vercel dev
```

## Vercel-Specific Features
- **Preview Deployments**: Every branch gets a preview URL
- **Analytics**: Built-in web analytics and performance monitoring  
- **Functions**: Serverless functions for dynamic features (if needed)
- **Edge Runtime**: Ultra-fast edge functions for dynamic content

Your Cainta Motors site is now ready for production on Vercel! 🏎️✨

## Migration Notes
- Migrated from Cloudflare Pages to Vercel
- Removed `_headers` and `_redirects` (replaced with `vercel.json`)
- Switched from `@sveltejs/adapter-cloudflare` to `@sveltejs/adapter-vercel`
- All existing features maintained with improved global performance