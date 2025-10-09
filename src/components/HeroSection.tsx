import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { FreelancerRegistrationModal } from "./FreelancerRegistrationModal";
import { ClientRegistrationModal } from "./ClientRegistrationModal";
import namasteyLogo from "figma:asset/91f2f05d88c6701181adbc58639d415bf9455768.png";

export function HeroSection() {
  const { openAuthModal } = useAuth();
  const [displayedText, setDisplayedText] = useState("");
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [clientRegistrationModalOpen, setClientRegistrationModalOpen] = useState(false);
  const fullText = "Find the perfect freelance services for your business";
  const typingSpeed = 80; // milliseconds per character

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, []);

  const renderTypedText = (text: string) => {
    const freelanceStart = text.indexOf('freelance');
    const freelanceEnd = freelanceStart + 'freelance'.length;
    
    return text.split('').map((char, index) => {
      const isFreelanceWord = index >= freelanceStart && index < freelanceEnd && freelanceStart !== -1;
      const isFreelanceStart = index === freelanceStart;
      
      if (isFreelanceStart) {
        // Render the entire "freelance" word as one span to prevent line breaks
        return (
          <span 
            key={index} 
            className="inline-block animate-in fade-in duration-100 text-orange-500 whitespace-nowrap"
            style={{ animationDelay: `${index * typingSpeed}ms` }}
          >
            freelance
          </span>
        );
      } else if (isFreelanceWord && index !== freelanceStart) {
        // Skip individual characters of "freelance" since we already rendered the whole word
        return null;
      }
      
      return (
        <span 
          key={index} 
          className="inline-block animate-in fade-in duration-100"
          style={{ animationDelay: `${index * typingSpeed}ms` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    }).filter(Boolean);
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl text-gray-900 min-h-[120px] lg:min-h-[180px]">
                {renderTypedText(displayedText)}
                <span className="animate-pulse">|</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Connect with skilled freelancers and get your projects done efficiently. 
                From web development to graphic design, find experts ready to work.
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex w-full max-w-md space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Try 'logo design' or 'website development'"
                  className="pl-10 py-3"
                />
              </div>
              <Button className="bg-orange-400 hover:bg-orange-500 px-6">
                Search
              </Button>
            </div>

            {/* Stats */}
            <div className="flex space-x-8 pt-6">
              <div>
                <div className="text-2xl text-blue-600">50K+</div>
                <div className="text-sm text-gray-600">Active Freelancers</div>
              </div>
              <div>
                <div className="text-2xl text-blue-600">25K+</div>
                <div className="text-sm text-gray-600">Completed Projects</div>
              </div>
              <div>
                <div className="text-2xl text-blue-600">98%</div>
                <div className="text-sm text-gray-600">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={namasteyLogo} 
                alt="Namastey Thailand - Connecting Freelancers to the World"
                className="w-full h-96 object-contain rounded-[12px] animate-wave-flag"
              />
            </div>
            {/* Floating Cards */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 hidden lg:block">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm">Escrow</div>
                  <div className="text-xs text-gray-600">Compliant</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to Action Section */}
        <div className="mt-20">
          <div className="bg-orange-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl text-gray-900 mb-4">Ready to get started?</h3>
            <p className="text-gray-600 mb-6">Join thousands of freelancers and clients who trust our platform</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-orange-400 hover:bg-orange-500 text-white px-8 py-3 rounded-lg transition-colors"
                onClick={() => setRegistrationModalOpen(true)}
              >
                Start as Freelancer
              </button>
              <button 
                className="border-2 border-blue-400 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg transition-colors"
                onClick={() => setClientRegistrationModalOpen(true)}
              >
                Hire Freelancers
              </button>
            </div>
          </div>
        </div>
      </div>

      <FreelancerRegistrationModal
        isOpen={registrationModalOpen}
        onClose={() => setRegistrationModalOpen(false)}
      />

      <ClientRegistrationModal
        isOpen={clientRegistrationModalOpen}
        onClose={() => setClientRegistrationModalOpen(false)}
      />
    </section>
  );
}