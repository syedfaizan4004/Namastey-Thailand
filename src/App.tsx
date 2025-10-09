import React from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { JobCategories } from "./components/JobCategories";
import { FeaturedJobs } from "./components/FeaturedJobs";
import { HowItWorks } from "./components/HowItWorks";
import { Footer } from "./components/Footer";
import { AuthProvider, useAuth } from "./components/AuthContext";
import { AuthModal } from "./components/AuthModal";
import { LoginModal } from "./components/LoginModal";
import { FreelancerDashboard } from "./components/FreelancerDashboard";
import { ClientDashboard } from "./components/ClientDashboard";

import { projectId, publicAnonKey } from "./utils/supabase/info";

function AppContent() {
  const { authModalOpen, loginModalOpen, setLoginModalOpen, closeAuthModal, isAuthenticated, user } = useAuth();

  // Initialize demo data on app load if no users exist
  React.useEffect(() => {
    const initDemoDataIfNeeded = async () => {
      try {
        console.log("🚀 Checking for existing demo data...");
        
        // Check if we already have demo users in localStorage
        const existingDemoUsers = localStorage.getItem('demoUsers');
        if (existingDemoUsers) {
          console.log("✅ Demo users already exist in localStorage");
          return;
        }
        
        console.log("🚀 Attempting to initialize demo data from backend...");
        
        // Try to initialize from backend with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        try {
          const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-382214ec/debug/init-demo-data`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'Content-Type': 'application/json'
            },
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          
          if (response.ok) {
            const data = await response.json();
            console.log("✅ Backend demo data initialized:", data);
          } else {
            throw new Error(`Backend returned ${response.status}`);
          }
        } catch (fetchError) {
          clearTimeout(timeoutId);
          console.log("❌ Backend unavailable, creating localStorage fallback");
          
          // Create demo users in localStorage as fallback
          const demoUsers = [
            {
              id: 'FL000001',
              name: 'Demo Freelancer',
              email: 'freelancer@demo.com',
              mobileNumber: '9876543210',
              country: 'india',
              userType: 'freelancer',
              profileComplete: true,
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
            },
            {
              id: 'CL000001',
              name: 'Demo Client',
              email: 'client@demo.com',
              mobileNumber: '9876543211',
              country: 'india',
              userType: 'client',
              profileComplete: true,
              avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
            }
          ];
          localStorage.setItem('demoUsers', JSON.stringify(demoUsers));
          console.log("✅ Demo users created in localStorage as fallback");
        }
      } catch (error) {
        console.log("❌ Demo data initialization failed:", error);
      }
    };

    initDemoDataIfNeeded();
  }, []);

  // Show dashboard if user is logged in
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        {user.userType === "freelancer" ? (
          <FreelancerDashboard />
        ) : (
          <ClientDashboard />
        )}
      </div>
    );
  }

  // Show landing page if not logged in
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <JobCategories />
      <FeaturedJobs />
      <HowItWorks />
      <Footer />
      
      <AuthModal 
        isOpen={authModalOpen}
        onClose={closeAuthModal}
      />
      
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}