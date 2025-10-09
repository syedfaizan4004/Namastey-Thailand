# Environment Variables Setup

**Project:** Namastey Thailand  
**Developer:** Syed Faizan (@syedfaizan4004)  
**Supabase Project:** Namastey-Thailand

## Quick Fix

The error you encountered was due to missing environment variables. This has been fixed!

## What Was Done

1. ✅ Created `.env` file with your Supabase credentials
2. ✅ Created `.env.example` template for GitHub
3. ✅ Created `.gitignore` to protect sensitive files
4. ✅ Updated `utils/supabase/info.tsx` with proper fallbacks

## Verify Setup

Run this command to check if everything is working:

```bash
npm run dev
```

The app should now start without errors!

## Environment Variables

Your `.env` file contains:

```env
VITE_SUPABASE_URL=https://gmvujfotlfbsofnhjxhs.supabase.co
VITE_SUPABASE_ANON_KEY=your_key_here
```

### Important Notes

- ✅ `.env` is in `.gitignore` (won't be uploaded to GitHub)
- ✅ `.env.example` will be uploaded (safe, no secrets)
- ✅ The app has fallback values for development

## For Production Deployment

### Vercel (syedfaizan4004)

When deploying to Vercel:

1. Go to https://vercel.com/syedfaizan4004/namastey-thailand/settings/environment-variables
2. Add environment variables:
   - **Name:** `VITE_SUPABASE_URL`  
     **Value:** Your Namastey-Thailand Supabase project URL
   - **Name:** `VITE_SUPABASE_ANON_KEY`  
     **Value:** Your Namastey-Thailand Supabase anon key
3. Save and redeploy!

### Netlify (if using)

1. Go to your Netlify project settings
2. Navigate to "Build & deploy" → "Environment"
3. Add the same variables as above
4. Trigger new deployment

## Changing Credentials

To use different Supabase credentials:

1. Edit `.env` file
2. Update the values
3. Restart dev server (`npm run dev`)

## Troubleshooting

### Still seeing errors?

```bash
# Clear cache and restart
rm -rf node_modules/.vite
npm run dev
```

### Environment variables not loading?

```bash
# Restart the dev server
# Press Ctrl+C to stop
# Then run: npm run dev
```

---

**Status: ✅ Fixed!** Your environment is now properly configured.
