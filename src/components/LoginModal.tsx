import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Phone, Lock, Mail } from "lucide-react";
import { useAuth } from "./AuthContext";
import { authAPI } from "../utils/api";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [otp, setOtp] = useState("");
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login, openAuthModal } = useAuth();

  const handleLogin = async () => {
    if (!mobileNumber || (!password && !isOtpLogin)) return;
    
    setLoading(true);
    try {
      if (isOtpLogin) {
        // For OTP login, we'll still use the same endpoint but with OTP verification
        // For now, we'll treat any 6-digit OTP as valid if user exists
        if (otp.length !== 6) {
          alert("Please enter a valid 6-digit OTP");
          setLoading(false);
          return;
        }
      }
      
      // Call the real authentication API
      console.log("🔐 Attempting login with mobile:", mobileNumber);
      console.log("🔐 Login type:", isOtpLogin ? "OTP" : "Password");
      
      try {
        const response = await authAPI.login(mobileNumber, password || "otp_login");
        console.log("🔐 Login API response:", response);
        
        if (response && response.success === true && response.user) {
          console.log("✅ Login successful, setting user:", response.user);
          login(response.user);
          onClose();
          // Reset form
          setMobileNumber("");
          setPassword("");
          setOtp("");
          setIsOtpLogin(false);
          return;
        } else {
          console.log("❌ Backend login failed, trying localStorage fallback");
        }
      } catch (backendError) {
        console.log("❌ Backend unavailable, trying localStorage fallback:", backendError);
      }
      
      // Fallback: Check localStorage for demo users
      try {
        const demoUsers = JSON.parse(localStorage.getItem('demoUsers') || '[]');
        console.log("🔍 Checking localStorage demo users:", demoUsers);
        
        const foundUser = demoUsers.find(user => user.mobileNumber === mobileNumber);
        if (foundUser) {
          console.log("✅ Found user in localStorage:", foundUser);
          login(foundUser);
          onClose();
          // Reset form
          setMobileNumber("");
          setPassword("");
          setOtp("");
          setIsOtpLogin(false);
          alert(`✅ Login successful (offline mode)!\\nWelcome back, ${foundUser.name}`);
          return;
        }
      } catch (localStorageError) {
        console.log("❌ localStorage fallback failed:", localStorageError);
      }
      
      // If all methods fail
      console.log("❌ All login methods failed");
      const errorMessage = "Mobile number not found. Please create demo users first or check your number.";
      alert(errorMessage);
    } catch (error) {
      console.error("❌ Login error caught:", error);
      console.error("❌ Error details:", {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : 'No stack',
        type: typeof error
      });
      
      let errorMessage = "Login failed. Please try again.";
      if (error instanceof Error) {
        if (error.message.includes("User not found")) {
          errorMessage = `Mobile number not found. 

To test the login system:
1. Click the "View Database" button (bottom-right)
2. Click "🚀 Initialize Demo Data" 
3. Try logging in with:
   • Freelancer: 9876543210
   • Client: 9876543211
   (Use any password)

Or register a new account first.`;
        } else if (error.message.includes("HTTP")) {
          errorMessage = "Connection error. Please check your internet and try again.";
        } else {
          errorMessage = error.message;
        }
      }
      
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpLogin = async () => {
    if (!mobileNumber) return;
    
    setLoading(true);
    try {
      // Check if mobile number exists in our system
      const response = await authAPI.checkMobile(mobileNumber);
      
      if (response.exists) {
        // Simulate OTP sending - in real app, this would send actual OTP
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsOtpLogin(true);
        alert("OTP sent to your mobile number. Use any 6-digit number for demo.");
      } else {
        alert("Mobile number not found. Please register first or check your number.");
      }
    } catch (error) {
      console.error("OTP request failed:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail) return;
    
    setLoading(true);
    try {
      // Simulate password reset
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Password reset link sent to your email!");
      setIsResetPassword(false);
    } catch (error) {
      console.error("Password reset failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setMobileNumber("");
    setPassword("");
    setOtp("");
    setResetEmail("");
    setIsOtpLogin(false);
    setIsResetPassword(false);
    setLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl text-gray-900">
            {isResetPassword ? "Reset Password" : "Login to Your Account"}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            {isResetPassword 
              ? "Enter your email address to receive a password reset link" 
              : "Welcome back! Please enter your credentials to access your account"
            }
          </DialogDescription>
        </DialogHeader>

        {isResetPassword ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resetEmail">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="resetEmail"
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={handleResetPassword}
                disabled={loading || !resetEmail}
                className="w-full bg-orange-400 hover:bg-orange-500"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={() => {
                  setIsResetPassword(false);
                  setResetEmail("");
                }}
                className="w-full"
              >
                Back to Login
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number (User ID)</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {isOtpLogin ? (
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Button 
                onClick={handleLogin}
                disabled={loading || !mobileNumber || (!password && !isOtpLogin) || (isOtpLogin && !otp)}
                className="w-full bg-orange-400 hover:bg-orange-500"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={handleOtpLogin}
                  disabled={loading || !mobileNumber}
                  className="flex-1"
                >
                  {loading ? "Sending..." : "Get Login by OTP"}
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setIsResetPassword(true)}
                  className="flex-1"
                >
                  Reset Password
                </Button>
              </div>

              <Separator />

              <div className="text-center text-sm text-gray-600 space-y-2">
                <div>
                  Don't have an account?{" "}
                  <button 
                    className="text-orange-500 hover:text-orange-600 font-medium"
                    onClick={() => {
                      handleClose();
                      openAuthModal();
                    }}
                  >
                    Create Account
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <button 
                    className="text-blue-500 hover:text-blue-600 font-medium text-xs px-2 py-1 border rounded"
                    onClick={async () => {
                      try {
                        console.log('🚀 Attempting to create demo users...');
                        
                        // Try to create demo users with multiple fallback strategies
                        const responses = await Promise.allSettled([
                          // Try force demo endpoint
                          fetch(`https://kqcozfmfbxqfhvubzevj.supabase.co/functions/v1/make-server-382214ec/debug/force-demo-data`, {
                            method: 'POST',
                            headers: { 
                              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxY296Zm1mYnhxZmh2dWJ6ZXZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NzIwNTksImV4cCI6MjA0ODE0ODA1OX0.4JM42t_8fqcb6iBRqGJr7b4ZWNtLIW6J5jX_4q5X4E8`,
                              'Content-Type': 'application/json'
                            }
                          }),
                          // Try regular demo endpoint
                          fetch(`https://kqcozfmfbxqfhvubzevj.supabase.co/functions/v1/make-server-382214ec/debug/init-demo-data`, {
                            method: 'POST',
                            headers: { 
                              'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxY296Zm1mYnhxZmh2dWJ6ZXZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1NzIwNTksImV4cCI6MjA0ODE0ODA1OX0.4JM42t_8fqcb6iBRqGJr7b4ZWNtLIW6J5jX_4q5X4E8`,
                              'Content-Type': 'application/json'
                            }
                          })
                        ]);
                        
                        console.log('Demo creation responses:', responses);
                        
                        let success = false;
                        for (const response of responses) {
                          if (response.status === 'fulfilled' && response.value.ok) {
                            const data = await response.value.json();
                            console.log('Successful demo creation:', data);
                            if (data.success) {
                              success = true;
                              break;
                            }
                          }
                        }
                        
                        if (success) {
                          alert('✅ Demo users created!\\n\\nTry logging in with:\\n• Freelancer: 9876543210\\n• Client: 9876543211\\n• Password: any password');
                        } else {
                          // Fallback: Store demo users in localStorage
                          console.log('Backend unavailable, using localStorage fallback');
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
                          alert('✅ Demo users created (offline mode)!\\n\\nTry logging in with:\\n• Freelancer: 9876543210\\n• Client: 9876543211\\n• Password: any password');
                        }
                      } catch (error) {
                        console.error('All demo creation methods failed:', error);
                        // Final fallback: localStorage only
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
                        alert('✅ Demo users created (offline mode)!\\n\\nBackend unavailable, using local storage.\\n\\nTry logging in with:\\n• Freelancer: 9876543210\\n• Client: 9876543211\\n• Password: any password');
                      }
                    }}
                  >
                    🚀 Create Demo Users
                  </button>
                  
                  <button 
                    className="text-green-500 hover:text-green-600 font-medium text-xs px-2 py-1 border rounded"
                    onClick={() => {
                      try {
                        const demoUsers = JSON.parse(localStorage.getItem('demoUsers') || '[]');
                        if (demoUsers.length > 0) {
                          const userList = demoUsers.map(u => `${u.userType}: ${u.mobileNumber} (${u.name})`).join('\\n');
                          alert(`Available demo users (${demoUsers.length}):\\n\\n${userList}`);
                        } else {
                          alert('No demo users found!\\nClick "Create Demo Users" first.');
                        }
                      } catch (error) {
                        alert('Error checking users: ' + error.message);
                      }
                    }}
                  >
                    👥 Check Demo Users
                  </button>
                  
                  <button 
                    className="text-purple-500 hover:text-purple-600 font-medium text-xs px-2 py-1 border rounded"
                    onClick={() => {
                      // Instant demo login - bypass all authentication
                      const demoUser = {
                        id: 'FL000001',
                        name: 'Demo Freelancer',
                        email: 'freelancer@demo.com',
                        mobileNumber: '9876543210',
                        country: 'india',
                        userType: 'freelancer',
                        profileComplete: true,
                        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
                      };
                      
                      console.log('🚀 Instant demo login:', demoUser);
                      login(demoUser);
                      onClose();
                      alert('✅ Logged in as Demo Freelancer!\\n\\nThis bypasses all authentication for testing.');
                    }}
                  >
                    ⚡ Quick Demo Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}