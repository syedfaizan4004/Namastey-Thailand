# Command Reference Guide

Quick reference for all commands you'll need to work with this project.

## 📦 NPM Commands

### Installation
```bash
# Install all dependencies
npm install

# Install specific package
npm install package-name

# Install dev dependency
npm install -D package-name

# Update all packages
npm update

# Check for outdated packages
npm outdated
```

### Development
```bash
# Start development server (port 3000)
npm run dev

# Start on different port
npm run dev -- --port 3001

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run TypeScript compiler check
npx tsc --noEmit
```

### Cleaning
```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

## 🐙 Git Commands

### Initial Setup
```bash
# Initialize git repository
git init

# Check current status
git status

# Add all files to staging
git add .

# Add specific file
git add filename.tsx

# Commit changes
git commit -m "your message here"

# Connect to GitHub
git remote add origin https://github.com/username/repo.git

# Push to GitHub
git push -u origin main
```

### Daily Workflow
```bash
# Check current branch
git branch

# Create new branch
git checkout -b feature/new-feature

# Switch to existing branch
git checkout branch-name

# Pull latest changes
git pull origin main

# Push your changes
git push origin branch-name

# View commit history
git log

# View changes
git diff
```

### Undoing Changes
```bash
# Discard changes in file
git checkout -- filename.tsx

# Unstage file
git reset HEAD filename.tsx

# Undo last commit (keep changes)
git reset --soft HEAD^

# Undo last commit (discard changes)
git reset --hard HEAD^

# Revert a commit
git revert commit-hash
```

### Branch Management
```bash
# List all branches
git branch -a

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name

# Merge branch into current
git merge branch-name

# Rebase current branch
git rebase main
```

## 🗄️ Supabase CLI Commands

### Installation & Setup
```bash
# Install Supabase CLI globally
npm install -g supabase

# Check version
supabase --version

# Login to Supabase
supabase login

# Initialize project
supabase init

# Link to existing project
supabase link --project-ref your-project-id
```

### Edge Functions
```bash
# Create new function
supabase functions new function-name

# Deploy function
supabase functions deploy function-name

# Deploy all functions
supabase functions deploy

# View function logs
supabase functions logs function-name

# View live logs
supabase functions logs function-name --tail

# Delete function
supabase functions delete function-name
```

### Secrets Management
```bash
# Set secret
supabase secrets set SECRET_NAME=value

# List all secrets
supabase secrets list

# Unset secret
supabase secrets unset SECRET_NAME

# Set multiple secrets from .env
supabase secrets set --env-file .env
```

### Database
```bash
# Run migration
supabase db push

# Create new migration
supabase migration new migration-name

# Reset database
supabase db reset

# Dump database
supabase db dump -f dump.sql

# Run SQL file
supabase db execute -f file.sql
```

### Local Development
```bash
# Start local Supabase
supabase start

# Stop local Supabase
supabase stop

# Check status
supabase status

# View local dashboard
# Opens at http://localhost:54323
```

## 🚀 Deployment Commands

### Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# List deployments
vercel ls

# View logs
vercel logs
```

### Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy to draft
netlify deploy

# Deploy to production
netlify deploy --prod

# Open site dashboard
netlify open

# View logs
netlify logs
```

## 🔍 Debugging Commands

### Check TypeScript Errors
```bash
# Check all TypeScript errors
npx tsc --noEmit

# Watch mode
npx tsc --noEmit --watch
```

### Check Bundle Size
```bash
# Analyze bundle
npm run build

# View build stats
npx vite build --mode production --sourcemap
```

### Environment Variables
```bash
# Print environment variables
printenv | grep VITE

# Check specific variable
echo $VITE_SUPABASE_URL
```

## 🧹 Cleanup Commands

### Cache Clearing
```bash
# Clear npm cache
npm cache clean --force

# Clear Vite cache
rm -rf node_modules/.vite

# Clear all caches
rm -rf node_modules package-lock.json .vite
npm install
```

### Git Cleanup
```bash
# Remove untracked files (dry run)
git clean -n

# Remove untracked files
git clean -f

# Remove untracked directories
git clean -fd

# Remove ignored files too
git clean -fdx
```

## 📊 Utility Commands

### File Operations
```bash
# Count lines of code
find . -name '*.tsx' -o -name '*.ts' | xargs wc -l

# Find files
find . -name "*.tsx" -type f

# Search in files
grep -r "search term" ./src

# Replace in files (macOS/Linux)
find . -name "*.tsx" -exec sed -i 's/old/new/g' {} +
```

### Project Info
```bash
# Check Node version
node --version

# Check npm version
npm --version

# List installed packages
npm list --depth=0

# View package info
npm info package-name

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

## 🔐 Security Commands

### Update Dependencies
```bash
# Update package.json
npm update

# Update to latest (interactive)
npx npm-check-updates -u
npm install

# Security audit
npm audit

# Fix security issues
npm audit fix

# Force fix (may break)
npm audit fix --force
```

### Environment Security
```bash
# Check for exposed secrets (requires git-secrets)
git secrets --scan

# Verify .env is ignored
git check-ignore .env

# Remove file from git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all
```

## 🧪 Testing Commands

### Browser Testing
```bash
# Open in default browser
open http://localhost:3000

# Open in specific browser (macOS)
open -a "Google Chrome" http://localhost:3000

# Open in specific browser (Linux)
google-chrome http://localhost:3000

# Open in specific browser (Windows)
start chrome http://localhost:3000
```

### Network Testing
```bash
# Get local IP address (macOS/Linux)
ifconfig | grep "inet "

# Get local IP address (Windows)
ipconfig

# Test API endpoint
curl http://localhost:3000/api/endpoint

# Test with headers
curl -H "Authorization: Bearer token" http://localhost:3000/api/endpoint
```

## 📝 Documentation Commands

### Generate Docs
```bash
# Generate TypeScript docs (requires typedoc)
npx typedoc --out docs src

# Generate dependency tree
npm list --all > dependency-tree.txt

# Create component list
ls -R components/ > component-list.txt
```

## 🔄 CI/CD Commands

### GitHub Actions
```bash
# Run workflow locally (requires act)
act

# Validate workflow syntax
npx action-validator .github/workflows/ci.yml
```

## 💡 Quick Tips

### Aliases (add to ~/.bashrc or ~/.zshrc)
```bash
# Development
alias dev="npm run dev"
alias build="npm run build"
alias preview="npm run preview"

# Git
alias gs="git status"
alias ga="git add ."
alias gc="git commit -m"
alias gp="git push"
alias gl="git log --oneline"

# Supabase
alias sbl="supabase login"
alias sbs="supabase status"
alias sbfd="supabase functions deploy"
```

### One-Liners
```bash
# Full reset and restart
rm -rf node_modules package-lock.json && npm install && npm run dev

# Quick commit and push
git add . && git commit -m "update" && git push

# Deploy functions and check logs
supabase functions deploy && supabase functions logs --tail

# Build and preview
npm run build && npm run preview
```

## 🆘 Troubleshooting Commands

### Common Issues
```bash
# Port already in use (find process)
lsof -i :3000

# Kill process on port
kill -9 $(lsof -t -i:3000)

# Check disk space
df -h

# Check memory usage
free -m

# Check running processes
ps aux | grep node
```

## 📚 Help Commands

### Get Help
```bash
# NPM help
npm help

# Git help
git help
git help commit

# Supabase help
supabase help
supabase functions help

# Vite help
npx vite --help
```

---

## 🎯 Most Used Commands Summary

```bash
# Daily development
npm run dev              # Start dev server
git add .               # Stage changes
git commit -m "msg"     # Commit
git push                # Push to GitHub

# Deployment
npm run build           # Build
supabase functions deploy  # Deploy functions
vercel --prod          # Deploy to Vercel

# Troubleshooting
npm install            # Reinstall
git status            # Check status
npm run build         # Check for errors
```

---

Save this file for quick reference! 📖
