# GitHub Deployment Guide

This guide will walk you through uploading your **Namastey Thailand** project to GitHub and making it ready for collaboration.

**Your Project Details:**
- **GitHub Username:** syedfaizan4004
- **Repository Name:** Namastey-Thailand
- **Repository URL:** https://github.com/syedfaizan4004/Namastey-Thailand

## 📋 Prerequisites

- Git installed on your computer ([Download Git](https://git-scm.com/downloads))
- A GitHub account ([Sign up](https://github.com/join))

## 🚀 Step-by-Step GitHub Upload

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in as **syedfaizan4004**
2. Click the **"+"** icon in the top right
3. Select **"New repository"**
4. Fill in repository details:
   - **Repository name**: `Namastey-Thailand` (exactly as shown)
   - **Description**: "A freelancing platform connecting Indian and Thai professionals"
   - **Visibility**: Choose Public (recommended for portfolio) or Private
   - **⚠️ Important**: Do NOT initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

Your repository will be created at: https://github.com/syedfaizan4004/Namastey-Thailand

### Step 2: Initialize Git in Your Project

Open your terminal/command prompt in your project folder and run:

```bash
# Initialize git repository
git init

# Add all files to staging
git add .

# Create your first commit
git commit -m "Initial commit: Namastey Thailand freelance platform"
```

### Step 3: Connect to GitHub

Copy the commands from GitHub (they'll look like this):

```bash
# Add GitHub as remote origin (your specific repository)
git remote add origin https://github.com/syedfaizan4004/Namastey-Thailand.git

# Rename default branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

**Note:** This uses your specific repository URL: `https://github.com/syedfaizan4004/Namastey-Thailand.git`

### Step 4: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. Check that README.md displays properly

## 🔐 Protecting Sensitive Information

### Important: Never Commit Secrets!

Your `.env` file is already in `.gitignore`, so it won't be uploaded. However, double-check:

```bash
# Verify .env is ignored
git status

# If you see .env listed, add it to .gitignore:
echo ".env" >> .gitignore
git add .gitignore
git commit -m "Ensure .env is ignored"
git push
```

### Update Supabase Keys for Production

Before sharing your repository:

1. **Edit `/utils/supabase/info.tsx`**
2. **Remove hardcoded keys** (they're already updated to use environment variables)
3. **Commit the change**:
   ```bash
   git add utils/supabase/info.tsx
   git commit -m "Use environment variables for Supabase config"
   git push
   ```

## 📝 Repository Settings

### Add Repository Description

1. Go to your repository on GitHub
2. Click the ⚙️ **Settings** icon (next to About)
3. Add:
   - **Description**: "Cross-border freelancing platform for India & Thailand"
   - **Website**: Your deployed URL (when ready)
   - **Topics**: `react`, `typescript`, `tailwind`, `supabase`, `freelance`, `india`, `thailand`

### Add Repository Topics

Topics help people discover your project:
- `react`
- `typescript`
- `vite`
- `tailwindcss`
- `supabase`
- `freelance-platform`
- `shadcn-ui`
- `india`
- `thailand`

## 🌿 Working with Branches

### Create a Development Branch

```bash
# Create and switch to develop branch
git checkout -b develop

# Push develop branch to GitHub
git push -u origin develop
```

### Set Up Branch Protection (Optional)

1. Go to **Settings → Branches**
2. Click **Add rule**
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
5. Click **Create**

## 🤝 Collaborating with Others

### Adding Collaborators

1. Go to **Settings → Collaborators**
2. Click **Add people**
3. Enter their GitHub username or email
4. They'll receive an invitation

### Creating Issues

1. Go to **Issues** tab
2. Click **New issue**
3. Add:
   - Title: Clear, descriptive
   - Description: Detailed explanation
   - Labels: bug, enhancement, documentation, etc.

### Pull Request Workflow

```bash
# Create a feature branch
git checkout -b feature/new-feature

# Make your changes
# ... edit files ...

# Commit changes
git add .
git commit -m "feat: add new feature"

# Push to GitHub
git push origin feature/new-feature
```

Then on GitHub:
1. Go to **Pull requests**
2. Click **New pull request**
3. Select your feature branch
4. Add description
5. Click **Create pull request**

## 🎨 GitHub Repository Enhancements

### Add a Logo

1. Create a logo image (`logo.png`)
2. Upload to repository
3. Update README.md:
   ```markdown
   <p align="center">
     <img src="logo.png" alt="Namastey Thailand Logo" width="200"/>
   </p>
   ```

### Add Screenshots

1. Create a `screenshots` folder
2. Add screenshots of your app
3. Reference in README:
   ```markdown
   ## Screenshots
   
   ![Homepage](screenshots/homepage.png)
   ![Dashboard](screenshots/dashboard.png)
   ```

### Add Badges

Add status badges to your README:

```markdown
![Build Status](https://github.com/syedfaizan4004/Namastey-Thailand/workflows/CI/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://namastey-thailand.vercel.app)
```

## 🔄 Keeping Your Repository Updated

### Regular Updates

```bash
# Check current status
git status

# Add modified files
git add .

# Commit with meaningful message
git commit -m "fix: resolve login issue"

# Push to GitHub
git push
```

### Syncing with Collaborators

```bash
# Fetch latest changes
git fetch origin

# Pull changes from main
git pull origin main

# Merge if needed
git merge origin/main
```

## 📊 GitHub Actions CI/CD

The `.github/workflows/ci.yml` file is already set up. To use it:

1. Go to **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Add these secrets:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your anon key
   - `VITE_SUPABASE_SERVICE_ROLE_KEY`: Your service role key (if needed)

Now, every push will automatically build and test your project!

## 🌍 Making Your Repository Public

If you started with a private repository:

1. Go to **Settings**
2. Scroll to **Danger Zone**
3. Click **Change visibility**
4. Select **Make public**
5. Confirm

## 📱 GitHub Mobile

Download the GitHub mobile app to:
- Review pull requests on the go
- Respond to issues
- Check build status
- Merge PRs

## 🎯 Best Practices

### Commit Messages

Use conventional commits:
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation changes
- `style:` formatting, missing semicolons, etc.
- `refactor:` code restructuring
- `test:` adding tests
- `chore:` updating build tasks, etc.

Examples:
```bash
git commit -m "feat: add job filtering functionality"
git commit -m "fix: resolve login redirect issue"
git commit -m "docs: update setup instructions"
```

### Atomic Commits

Make small, focused commits:
```bash
# Good
git commit -m "feat: add search bar to header"
git commit -m "style: improve search bar responsiveness"

# Not good
git commit -m "add search, fix bugs, update styles"
```

### Pull Before Push

Always pull before pushing:
```bash
git pull origin main
git push origin main
```

## 🆘 Common Issues

### Authentication Failed

Use a Personal Access Token instead of password:

1. Go to **Settings → Developer settings → Personal access tokens**
2. Click **Generate new token (classic)**
3. Select scopes: `repo`
4. Copy the token
5. Use as password when pushing

Or set up SSH:
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
# Add SSH key to GitHub settings
```

### Merge Conflicts

If you encounter merge conflicts:

```bash
# Pull latest changes
git pull origin main

# Manually resolve conflicts in files
# Look for <<<<<<< HEAD markers

# After resolving
git add .
git commit -m "resolve merge conflicts"
git push
```

### Accidentally Committed .env

If you accidentally committed sensitive files:

```bash
# Remove from git but keep locally
git rm --cached .env

# Add to .gitignore
echo ".env" >> .gitignore

# Commit
git add .gitignore
git commit -m "Remove .env from tracking"
git push

# ⚠️ Important: Rotate your API keys!
```

## 📚 Additional Resources

- [GitHub Docs](https://docs.github.com)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://guides.github.com/introduction/flow/)

## ✅ Quick Checklist

Before making your repository public:

- [ ] `.env` is in `.gitignore`
- [ ] No hardcoded API keys in code
- [ ] README.md is complete and helpful
- [ ] LICENSE file is present
- [ ] CONTRIBUTING.md explains how to contribute
- [ ] Code is well-commented
- [ ] Repository has a clear description
- [ ] Topics/tags are added
- [ ] All tests pass
- [ ] No sensitive information in commit history

---

**Congratulations! 🎉** Your project is now on GitHub and ready for the world to see!

Next steps:
- Share your repository URL
- Set up automatic deployments
- Invite collaborators
- Start accepting contributions
