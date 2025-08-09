# 🚀 Cloudflare Pages Deployment Guide

## Prerequisites
- [Cloudflare account](https://cloudflare.com)
- Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Options

### Option 1: Git Integration (Recommended)
1. Push your code to a Git repository
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
3. Navigate to **Workers & Pages** > **Pages**
4. Click **Create** > **Connect to Git**
5. Select your repository and branch
6. Configure build settings:
   - **Framework preset**: None (manual configuration)
   - **Build command**: `npm run build`
   - **Build output directory**: `.svelte-kit/output/client`
   - **Root directory**: `/` (leave empty)
   - **Environment variables**: 
     - `NODE_VERSION`: `18`

### Option 2: Manual Deploy (Alternative)
If Git integration fails, you can deploy manually:
1. Run `npm run build` locally
2. Go to Cloudflare Pages dashboard
3. Click **Upload assets** and upload the `.svelte-kit/output/client` folder

## Build Configuration Details

### Required Environment Variables
Set these in Cloudflare Pages under **Settings** > **Environment variables**:
- `NODE_VERSION`: `18` (recommended)

### Build Settings Summary
- **Build command**: `npm run build` 
- **Build output directory**: `.svelte-kit/output/client`
- **Node.js version**: `18.x`

## Performance Features Configured

### 🎯 HTTP Headers (`static/_headers`)
- Security headers (X-Content-Type-Options, X-Frame-Options)
- Aggressive caching for static assets (1 year)
- Optimized caching for 3D models and videos

### 🔄 Redirects (`static/_redirects`)
- SPA fallback for client-side routing

### ⚡ Build Optimization
- Cloudflare adapter configured in `svelte.config.js`
- Production-optimized builds with code splitting
- Static assets in `/static/` served with optimal caching

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

### Build Fails with wrangler.toml error
- **Solution**: Remove any `wrangler.toml` file from your project root
- Use Git integration instead of CLI deployment for Pages

### Build Fails with Node.js version
- Set `NODE_VERSION` environment variable to `18` in Pages settings
- Ensure all dependencies are in `dependencies` (not `devDependencies`)

### 3D Models Don't Load
- Verify `.glb` files are in `/static/` directory  
- Check browser console for CORS errors
- Ensure correct file paths in components

### Smooth Scrolling Issues
- Lenis library should work automatically
- Check browser console for JavaScript errors
- Verify `autoRaf: true` configuration

## Domain Setup
1. **Custom Domain**: Go to **Custom domains** in Pages settings
2. **DNS**: Configure CNAME record pointing to your Pages domain
3. **SSL**: Automatically handled by Cloudflare

Your Cainta Motors site is now ready for production! 🏎️✨