import { useState } from "react";
import { Button } from "./ui/button";
import { Search, Menu, User, LogOut } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useAuth } from "./AuthContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { WhyUsModal } from "./WhyUsModal";
import { EnterpriseModal } from "./EnterpriseModal";
import namasteyLogo from "figma:asset/91f2f05d88c6701181adbc58639d415bf9455768.png";
import thailandFlag from "figma:asset/49cb7c2e6d2a7f97085b354aac07d6e81c1228c6.png";

export function Header() {
  const { user, isAuthenticated, logout, openLoginModal, openAuthModal } = useAuth();
  const [whyUsModalOpen, setWhyUsModalOpen] = useState(false);
  const [enterpriseModalOpen, setEnterpriseModalOpen] = useState(false);
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-blue-100/50 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">

            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#featured-jobs" className="text-gray-600 hover:text-gray-900">Find Work</a>
            <a href="#job-categories" className="text-gray-600 hover:text-gray-900">Find Talent</a>
            <button onClick={() => setWhyUsModalOpen(true)} className="text-gray-600 hover:text-gray-900">Why Us</button>
            <button onClick={() => setEnterpriseModalOpen(true)} className="text-gray-600 hover:text-gray-900">Enterprise</button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle Flags */}
            <div className="hidden md:flex items-center space-x-2">
              <button className="flex items-center space-x-1 hover:opacity-80 transition-opacity">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1597058712635-3182d1eacc1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx8fDE3NTk1MDA3MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                  alt="India Flag" 
                  className="w-6 h-4 object-cover rounded-sm border border-gray-200"
                />
                <span className="text-xs text-gray-600">EN</span>
              </button>
              <span className="text-gray-300">|</span>
              <button className="flex items-center space-x-1 hover:opacity-80 transition-opacity">
                <ImageWithFallback 
                  src={thailandFlag} 
                  alt="Thailand Flag" 
                  className="w-6 h-4 object-cover rounded-sm border border-gray-200 animate-wave-flag"
                />
                <span className="text-xs text-gray-600">TH</span>
              </button>
            </div>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.name}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    My Projects
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost"
                  size="sm" 
                  onClick={() => openLoginModal()}
                >
                  Login
                </Button>
                <Button 
                  size="sm" 
                  className="bg-orange-400 hover:bg-orange-500"
                  onClick={() => openAuthModal()}
                >
                  Sign Up
                </Button>
              </div>
            )}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <WhyUsModal 
        isOpen={whyUsModalOpen}
        onClose={() => setWhyUsModalOpen(false)}
      />
      
      <EnterpriseModal 
        isOpen={enterpriseModalOpen}
        onClose={() => setEnterpriseModalOpen(false)}
      />
    </header>
  );
}