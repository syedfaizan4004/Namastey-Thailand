# Namastey Thailand - Freelance Platform

[![Deployed on Vercel](https://vercel.com/button)](https://vercel.com/syedfaizan4004/namastey-thailand)
[![GitHub](https://img.shields.io/badge/GitHub-syedfaizan4004%2FNamastey--Thailand-blue)](https://github.com/syedfaizan4004/Namastey-Thailand)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> 🚀 **New to this project?** Start here: **[START_HERE.md](./START_HERE.md)** for a complete setup guide!

A modern freelancing platform connecting Indian and Thai professionals with global opportunities. Built with React, TypeScript, Tailwind CSS v4, and Supabase.

**Live Demo:** https://namastey-thailand.vercel.app (Coming Soon)  
**Repository:** [github.com/syedfaizan4004/Namastey-Thailand](https://github.com/syedfaizan4004/Namastey-Thailand)  
**Developer:** Syed Faizan ([@syedfaizan4004](https://github.com/syedfaizan4004))

## 🌟 Features

- **Dual Registration System**: Separate flows for freelancers and clients with country-specific forms (India & Thailand)
- **Authentication**: Mobile number login, OTP verification, and password reset
- **Role-Based Dashboards**: Custom dashboards for freelancers and clients
- **Job Management**: Post jobs, browse opportunities, and track applications
- **Cross-Border Support**: Localized content in English and Thai
- **Enterprise Solutions**: Dedicated enterprise account management
- **Secure Payments**: Escrow-based payment protection
- **Modern UI**: Beautiful animations with Motion (Framer Motion) and shadcn/ui components

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion)
- **UI Components**: shadcn/ui + Radix UI
- **Backend**: Supabase (Auth, Database, Edge Functions)
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A Supabase account and project

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/syedfaizan4004/Namastey-Thailand.git
   cd Namastey-Thailand
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env` and fill in your Supabase credentials:
   ```bash
   cp .env.example .env
   ```
   
   Update the values in `.env`:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Set up Supabase**
   
   - Project Name: **Namastey-Thailand**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - The database uses a key-value store table (`kv_store_382214ec`)
   - Deploy the Edge Functions from `/supabase/functions/server/`
   - See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup instructions

5. **Update Supabase info file**
   
   Edit `/utils/supabase/info.tsx` with your Namastey-Thailand project details:
   ```typescript
   export const projectId = "YOUR_SUPABASE_PROJECT_ID"; // e.g., "abcdefghijklmnop"
   export const publicAnonKey = "YOUR_SUPABASE_ANON_KEY";
   ```

## 🏃‍♂️ Running the Project

**Development mode:**
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

## 📁 Project Structure

```
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── figma/          # Figma-imported components
│   ├── Header.tsx      # Main navigation
│   ├── HeroSection.tsx # Landing page hero
│   └── ...
├── supabase/
│   └── functions/
│       └── server/     # Supabase Edge Functions
├── styles/
│   └── globals.css     # Tailwind v4 configuration
├── utils/              # Utility functions
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## 🎨 Key Components

- **Header**: Navigation with authentication state
- **HeroSection**: Landing page with search and CTAs
- **AuthModal**: Registration flow for freelancers and clients
- **LoginModal**: Login with mobile number and password
- **FreelancerDashboard**: Dashboard for freelancer users
- **ClientDashboard**: Dashboard for client users
- **WhyUsModal**: Platform benefits and features
- **EnterpriseModal**: Enterprise solutions information

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Import your repository on [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables in Netlify site settings

### Supabase Edge Functions

Deploy the Edge Functions separately:
```bash
supabase functions deploy make-server-382214ec
```

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key (public) |
| `VITE_SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |

## 📝 Demo Accounts

For testing purposes, the app creates demo accounts:
- **Freelancer**: Mobile: `9876543210`
- **Client**: Mobile: `9876543211`
- **Password**: `demo123`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Powered by [Supabase](https://supabase.com/)
- Images from [Unsplash](https://unsplash.com/)

## 📧 Contact

**Developer:** Syed Faizan  
**GitHub:** [@syedfaizan4004](https://github.com/syedfaizan4004)  
**Project:** [Namastey-Thailand](https://github.com/syedfaizan4004/Namastey-Thailand)

For questions or support, please open an issue on GitHub.

---

Made with ❤️ by Syed Faizan for connecting Indian and Thai professionals
