# Quick Setup Guide

Get Namastey Thailand running locally in 5 minutes!

## 📦 Prerequisites

- **Node.js** 18 or higher ([Download](https://nodejs.org/))
- **npm**, **yarn**, or **pnpm** (comes with Node.js)
- A **Supabase account** ([Sign up free](https://supabase.com))

## ⚡ Quick Start

### Step 1: Clone & Install

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/namastey-thailand.git
cd namastey-thailand

# Install dependencies
npm install
```

### Step 2: Set Up Supabase

#### 2.1 Create a Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click **"New Project"**
3. Fill in:
   - Project name: `namastey-thailand`
   - Database password: (choose a strong password)
   - Region: (closest to you)
4. Wait ~2 minutes for project to initialize

#### 2.2 Create the Database Table

1. In your Supabase project, go to **SQL Editor**
2. Click **"New Query"**
3. Paste this SQL:

```sql
-- Create KV store table
CREATE TABLE IF NOT EXISTS kv_store_382214ec (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index
CREATE INDEX IF NOT EXISTS idx_kv_store_key ON kv_store_382214ec(key);

-- Enable Row Level Security
ALTER TABLE kv_store_382214ec ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Service role full access" ON kv_store_382214ec
  FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Authenticated read access" ON kv_store_382214ec
  FOR SELECT
  USING (auth.role() = 'authenticated');
```

4. Click **"Run"**

#### 2.3 Get Your API Keys

1. Go to **Settings → API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

### Step 3: Configure Environment

```bash
# Create .env file
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### Step 4: Deploy Edge Functions

```bash
# Install Supabase CLI (if not installed)
npm install -g supabase

# Login
supabase login

# Link your project (use your project ref from URL)
supabase link --project-ref YOUR_PROJECT_ID

# Deploy functions
supabase functions deploy make-server-382214ec

# Set function secrets
supabase secrets set SUPABASE_URL=YOUR_SUPABASE_URL
supabase secrets set SUPABASE_ANON_KEY=YOUR_ANON_KEY
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
```

### Step 5: Run the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser! 🎉

## 🧪 Test the App

### Demo Accounts

The app automatically creates demo accounts on first load:

**Freelancer Account:**
- Mobile: `9876543210`
- Password: `demo123`

**Client Account:**
- Mobile: `9876543211`
- Password: `demo123`

### Test Features

1. **Browse as Guest**
   - View job listings
   - Check "Why Us" modal
   - Explore categories

2. **Login as Freelancer**
   - Login with freelancer credentials
   - View freelancer dashboard
   - Browse available jobs

3. **Login as Client**
   - Login with client credentials
   - View client dashboard
   - Post a new job

## 🔧 Troubleshooting

### Port Already in Use

If port 3000 is taken:
```bash
# Use a different port
npm run dev -- --port 3001
```

### Build Errors

```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Supabase Connection Issues

1. Check `.env` file has correct values
2. Verify Supabase project is running
3. Check browser console for specific errors
4. Ensure Edge Functions are deployed

### Edge Function Errors

```bash
# Check function logs
supabase functions logs make-server-382214ec

# Redeploy if needed
supabase functions deploy make-server-382214ec --no-verify-jwt
```

## 📱 Mobile Testing

```bash
# Get your local IP (macOS/Linux)
ifconfig | grep "inet "

# Or on Windows
ipconfig

# Access from mobile device
http://YOUR_LOCAL_IP:3000
```

## 🚀 Next Steps

- [ ] Customize branding and colors
- [ ] Add your own images
- [ ] Configure authentication providers
- [ ] Set up payment integration
- [ ] Deploy to production (see [DEPLOYMENT.md](./DEPLOYMENT.md))

## 📚 Learn More

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

## 🆘 Need Help?

- Check the [README.md](./README.md) for detailed documentation
- Review [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup
- Open an issue on GitHub
- Check browser console for errors

## 🎯 Quick Commands Reference

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Supabase
supabase status      # Check local Supabase status
supabase functions list  # List all functions
supabase db push     # Push database changes
```

---

**Happy coding! 🚀** If everything worked, you should see the Namastey Thailand homepage at http://localhost:3000
