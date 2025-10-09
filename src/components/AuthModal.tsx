import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { Briefcase, Users } from "lucide-react";
import { useAuth } from "./AuthContext";
import { LoginModal } from "./LoginModal";
import { FreelancerRegistrationModal } from "./FreelancerRegistrationModal";
import { ClientRegistrationModal } from "./ClientRegistrationModal";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { 
    selectedUserType, 
    setSelectedUserType 
  } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showFreelancerRegistration, setShowFreelancerRegistration] = useState(false);
  const [showClientRegistration, setShowClientRegistration] = useState(false);
  
  const handleUserTypeSelect = (type: "freelancer" | "client") => {
    setSelectedUserType(type);
    onClose(); // Close the user type selection modal
    
    if (type === "freelancer") {
      setShowFreelancerRegistration(true);
    } else {
      setShowClientRegistration(true);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Welcome to Namastey Thailand</DialogTitle>
            <DialogDescription className="text-center text-sm text-gray-600">
              Choose how you'd like to get started
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <button
              onClick={() => handleUserTypeSelect("freelancer")}
              className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-orange-100 p-3 rounded-full group-hover:bg-orange-200">
                  <Briefcase className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">Start as Freelancer</h3>
                  <p className="text-sm text-gray-600">Find projects and work with clients worldwide</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => handleUserTypeSelect("client")}
              className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">Hire Freelancers</h3>
                  <p className="text-sm text-gray-600">Post projects and find talented freelancers</p>
                </div>
              </div>
            </button>
          </div>
          
          <div className="text-center">
            <Separator />
            <div className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <button 
                className="text-orange-500 hover:text-orange-600 font-medium"
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />
      
      <FreelancerRegistrationModal
        isOpen={showFreelancerRegistration}
        onClose={() => setShowFreelancerRegistration(false)}
      />
      
      <ClientRegistrationModal
        isOpen={showClientRegistration}
        onClose={() => setShowClientRegistration(false)}
      />
    </>
  );
}