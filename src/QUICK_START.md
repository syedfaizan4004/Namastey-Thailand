# Quick Start Guide - Namastey Thailand

**Developer:** Syed Faizan ([@syedfaizan4004](https://github.com/syedfaizan4004))

## 🎯 Your Project Details

- **GitHub Repository:** https://github.com/syedfaizan4004/Namastey-Thailand
- **Vercel Account:** syedfaizan4004
- **Supabase Project:** Namastey-Thailand
- **Expected Live URL:** https://namastey-thailand.vercel.app

---

## 📦 Step 1: Upload to GitHub (5 minutes)

Open your terminal in the project folder and run:

```bash
# Initialize Git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Namastey Thailand freelance platform"

# Add your GitHub repository
git remote add origin https://github.com/syedfaizan4004/Namastey-Thailand.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Verify:** Go to https://github.com/syedfaizan4004/Namastey-Thailand and check all files are uploaded.

---

## 🗄️ Step 2: Set Up Supabase (10 minutes)

### A. Create Project

1. Go to https://supabase.com
2. Sign in with GitHub (**syedfaizan4004**)
3. Click "New Project"
4. Fill in:
   - **Name:** Namastey-Thailand
   - **Database Password:** (create a strong password - save it!)
   - **Region:** ap-south-1 (Mumbai) or ap-southeast-1 (Singapore)
5. Click "Create new project" and wait 1-2 minutes

### B. Get API Keys

1. Go to Project Settings (⚙️) → API
2. Copy these values:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **Project ID:** `xxxxx` (from the URL)
   - **anon public key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
   - **service_role key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (keep secret!)

### C. Create Database Table

1. Go to SQL Editor
2. Click "New query"
3. Paste this SQL and click "Run":

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

4. You should see: "Success. No rows returned"

### D. Deploy Edge Function

Install Supabase CLI (if not already installed):

```bash
npm install -g supabase
```

Then deploy:

```bash
# Login to Supabase
supabase login

# Link to your project (use the Project ID from step B)
supabase link --project-ref YOUR_PROJECT_ID

# Deploy the Edge Function
supabase functions deploy make-server-382214ec

# Set environment variables for the function
supabase secrets set SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
supabase secrets set SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

### E. Configure Auth

1. Go to Authentication → Providers
2. Enable "Email" provider
3. Scroll down to "Email Auth" settings
4. **Disable** "Confirm email" (since we don't have SMTP configured)
5. Click "Save"

---

## 🚀 Step 3: Deploy to Vercel (5 minutes)

1. Go to https://vercel.com
2. Sign in with GitHub (**syedfaizan4004**)
3. Click "Add New" → "Project"
4. Find and import: **syedfaizan4004/Namastey-Thailand**
5. Configure:
   - **Project Name:** namastey-thailand
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Root Directory:** `./`
6. Click "Environment Variables" and add:
   - `VITE_SUPABASE_URL` = `https://YOUR_PROJECT_ID.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `YOUR_ANON_KEY`
7. Click "Deploy"
8. Wait 2-3 minutes for deployment

**Your app will be live at:** https://namastey-thailand.vercel.app

---

## 🔧 Step 4: Update Local Code with Supabase Info

Edit the file `/utils/supabase/info.tsx`:

```typescript
// Production values (from your Namastey-Thailand Supabase project)
export const projectId = "YOUR_PROJECT_ID"; // e.g., "abcdefghijklmnop"
export const publicAnonKey = "YOUR_ANON_KEY"; // The long eyJhbG... string
```

Then push the update to GitHub:

```bash
git add .
git commit -m "Update Supabase credentials"
git push
```

Vercel will automatically redeploy with the new credentials.

---

## ✅ Step 5: Test Your Deployment

1. Visit: https://namastey-thailand.vercel.app
2. Click "Get Started" → "I'm a Freelancer"
3. Fill in the registration form
4. Create an account
5. Login and check the dashboard

### Demo Accounts

The app creates these demo accounts for testing:
- **Freelancer:** Mobile: `9876543210`, Password: `demo123`
- **Client:** Mobile: `9876543211`, Password: `demo123`

---

## 🎨 Customize Domain (Optional)

### Vercel Custom Domain

1. Go to your Vercel project
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `namastey-thailand.com`)
4. Follow DNS configuration instructions
5. Wait for SSL certificate to be issued

---

## 📊 Monitor Your App

### Vercel Dashboard
- **Analytics:** https://vercel.com/syedfaizan4004/namastey-thailand/analytics
- **Logs:** https://vercel.com/syedfaizan4004/namastey-thailand/logs
- **Deployments:** https://vercel.com/syedfaizan4004/namastey-thailand/deployments

### Supabase Dashboard
- **Database:** https://supabase.com/dashboard/project/YOUR_PROJECT_ID/editor
- **Auth:** https://supabase.com/dashboard/project/YOUR_PROJECT_ID/auth/users
- **Logs:** https://supabase.com/dashboard/project/YOUR_PROJECT_ID/logs/explorer

---

## 🔄 Making Updates

Whenever you want to update your app:

```bash
# Make your changes to the code
# Then:

git add .
git commit -m "Description of changes"
git push
```

Vercel will automatically detect the push and redeploy in ~2 minutes.

---

## 🐛 Troubleshooting

### Build fails on Vercel
- Check the build logs in Vercel dashboard
- Make sure all environment variables are set
- Verify Node.js version is 18+

### Can't connect to Supabase
- Verify the URL and API keys in environment variables
- Check Edge Function is deployed: `supabase functions list`
- Check browser console for specific errors

### Auth not working
- Make sure "Confirm email" is disabled in Supabase Auth settings
- Verify the ANON key is correct in environment variables

---

## 📞 Need Help?

- **Repository Issues:** https://github.com/syedfaizan4004/Namastey-Thailand/issues
- **Supabase Docs:** https://supabase.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Vite Docs:** https://vitejs.dev

---

## 🎉 Success Checklist

- [ ] Code pushed to GitHub
- [ ] Supabase project "Namastey-Thailand" created
- [ ] Database table created
- [ ] Edge Function deployed
- [ ] Deployed to Vercel at namastey-thailand.vercel.app
- [ ] Environment variables configured
- [ ] Can register and login
- [ ] Dashboard displays correctly

**Congratulations! Your platform is now live! 🚀**

---

Made with ❤️ by Syed Faizan
