# Deployment Guide

This guide will help you deploy the **Namastey Thailand** platform to production.

**Project Details:**
- **GitHub:** syedfaizan4004/Namastey-Thailand
- **Vercel Account:** syedfaizan4004
- **Supabase Project:** Namastey-Thailand

## 📋 Pre-Deployment Checklist

- [ ] Supabase project created
- [ ] Environment variables configured
- [ ] Edge Functions deployed to Supabase
- [ ] Database tables created (kv_store)
- [ ] Auth settings configured in Supabase
- [ ] Domain name ready (optional)

## 🗄️ Supabase Setup

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in with GitHub account **syedfaizan4004**
2. Click "New Project"
3. Project Name: **Namastey-Thailand**
4. Choose your organization
5. Set a strong database password (save this securely!)
6. Select your region (closest to your users - preferably Singapore/Mumbai for India-Thailand)
7. Wait for project to initialize (takes 1-2 minutes)

### 2. Get Your API Keys

1. Go to Project Settings → API
2. Copy your project URL
3. Copy your `anon` public key
4. Copy your `service_role` secret key (keep this secure!)

### 3. Set Up Database

The app uses a key-value store table. Run this SQL in the Supabase SQL Editor:

```sql
-- Create KV store table
CREATE TABLE IF NOT EXISTS kv_store_382214ec (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_kv_store_key ON kv_store_382214ec(key);

-- Enable Row Level Security
ALTER TABLE kv_store_382214ec ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role access
CREATE POLICY "Service role can do everything" ON kv_store_382214ec
  FOR ALL
  USING (auth.role() = 'service_role');

-- Create policy for authenticated users
CREATE POLICY "Authenticated users can read" ON kv_store_382214ec
  FOR SELECT
  USING (auth.role() = 'authenticated');
```

### 4. Deploy Edge Functions

Install Supabase CLI if you haven't:
```bash
npm install -g supabase
```

Login to Supabase:
```bash
supabase login
```

Link your project:
```bash
supabase link --project-ref YOUR_PROJECT_ID
```

Deploy the Edge Function:
```bash
supabase functions deploy make-server-382214ec
```

Set environment variables for the Edge Function:
```bash
supabase secrets set SUPABASE_URL=your_project_url
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
supabase secrets set SUPABASE_ANON_KEY=your_anon_key
```

### 5. Configure Auth Settings

1. Go to Authentication → Providers
2. Enable Email provider
3. Disable email confirmations (or configure SMTP)
4. Set up redirect URLs for your domain

## 🌐 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Namastey Thailand platform"
   git remote add origin https://github.com/syedfaizan4004/Namastey-Thailand.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub account **syedfaizan4004**
   - Click "Add New" → "Project"
   - Import Git Repository: **syedfaizan4004/Namastey-Thailand**
   - Configure project:
     - Project Name: `namastey-thailand`
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Add Environment Variables:
     - `VITE_SUPABASE_URL` = (from your Namastey-Thailand Supabase project)
     - `VITE_SUPABASE_ANON_KEY` = (from your Namastey-Thailand Supabase project)
   - Click "Deploy"
   - Your site will be live at: `https://namastey-thailand.vercel.app`

3. **Configure Domain** (Optional)
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

### Option 2: Netlify

1. **Push to GitHub** (same as above)

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Add Environment Variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Click "Deploy site"

### Option 3: Self-Hosted (VPS/Cloud)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder** to your server

3. **Configure Nginx** (example):
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/namastey-thailand/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Set up SSL** with Let's Encrypt:
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

## 🔐 Security Checklist

- [ ] Never commit `.env` file to git
- [ ] Use environment variables for all sensitive data
- [ ] Keep `service_role` key server-side only
- [ ] Enable Row Level Security on Supabase tables
- [ ] Set up CORS properly on Supabase Edge Functions
- [ ] Use HTTPS in production
- [ ] Implement rate limiting
- [ ] Regular security audits

## 🧪 Testing Deployment

1. **Check homepage loads**: Visit your deployed URL
2. **Test registration**: Create a new freelancer/client account
3. **Test login**: Login with credentials
4. **Test dashboard**: Check if dashboard displays correctly
5. **Check API calls**: Open browser console and verify no errors
6. **Test on mobile**: Verify responsive design works

## 📊 Monitoring

### Supabase Monitoring
- Go to Project → Reports
- Monitor API requests, database usage, and errors
- Set up alerts for high usage

### Frontend Monitoring
- Use Vercel Analytics (if deployed on Vercel)
- Or integrate Google Analytics
- Monitor error logs in browser console

## 🔄 CI/CD Setup

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
          
      - name: Deploy to Vercel
        run: npx vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## 🐛 Troubleshooting

### Build Errors
- Check Node.js version (should be 18+)
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run build`

### API Connection Issues
- Verify Supabase URL and keys
- Check CORS settings in Supabase
- Verify Edge Functions are deployed
- Check browser console for specific errors

### Authentication Issues
- Verify auth settings in Supabase
- Check redirect URLs are configured
- Ensure email confirmation is disabled (if not using SMTP)

## 📞 Support

If you encounter issues:
1. Check the [Supabase Docs](https://supabase.com/docs)
2. Check the [Vite Docs](https://vitejs.dev)
3. Open an issue on GitHub
4. Check browser console for errors

---

**Good luck with your deployment! 🚀**
