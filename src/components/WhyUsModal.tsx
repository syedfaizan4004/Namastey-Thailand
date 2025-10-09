import { motion, AnimatePresence } from "motion/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import handshakeImage from 'figma:asset/c453c638233b92bf5fa6215b751edf806eaf487b.png';
import { 
  X, 
  Globe, 
  Shield, 
  CreditCard, 
  CheckCircle, 
  Star, 
  Users, 
  Briefcase,
  Heart,
  Zap,
  Lock,
  TrendingUp,
  Award,
  Handshake
} from "lucide-react";

interface WhyUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WhyUsModal({ isOpen, onClose }: WhyUsModalProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", duration: 0.5 }
  };

  const freelancerBenefits = [
    {
      icon: <Globe className="h-6 w-6 text-blue-600" />,
      title: "Cross-border freedom",
      description: "Find clients in India or Thailand — expand your reach beyond borders."
    },
    {
      icon: <Shield className="h-6 w-6 text-green-600" />,
      title: "Guaranteed payments",
      description: "We hold your client's funds securely and release them as soon as your work is approved."
    },
    {
      icon: <Briefcase className="h-6 w-6 text-purple-600" />,
      title: "Work from any field",
      description: "Whether you're a designer, developer, accountant, translator, or consultant — your skills matter here."
    },
    {
      icon: <CreditCard className="h-6 w-6 text-orange-600" />,
      title: "Get paid in your currency",
      description: "Receive your earnings directly to your local bank account without unnecessary deductions."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-teal-600" />,
      title: "Verified clients",
      description: "Every client is checked and verified, so you work with genuine businesses, not random profiles."
    },
    {
      icon: <Star className="h-6 w-6 text-yellow-600" />,
      title: "Trust & transparency",
      description: "Every project, every payment, every update — clear and traceable at all times."
    }
  ];

  const clientBenefits = [
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "Vetted professionals",
      description: "Only verified and skilled freelancers are allowed on the platform."
    },
    {
      icon: <Lock className="h-6 w-6 text-green-600" />,
      title: "Secure escrow payments",
      description: "Your funds are held safely and released only after the service is delivered to your satisfaction."
    },
    {
      icon: <Award className="h-6 w-6 text-purple-600" />,
      title: "Transparent agreements",
      description: "Every project is backed by a standardized digital contract — simple, clear, and compliant."
    },
    {
      icon: <Globe className="h-6 w-6 text-orange-600" />,
      title: "Local transactions",
      description: "Pay in your local currency, without worrying about cross-border banking issues."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-teal-600" />,
      title: "Fair pricing",
      description: "No hidden charges or inflated commissions — what you see is what you pay."
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-600" />,
      title: "Easy management",
      description: "Handle projects, track progress, and process payments — all in one place."
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="w-screen h-screen max-w-none max-h-none p-0 bg-gradient-to-br from-orange-50 via-white to-blue-50 overflow-y-auto border-none rounded-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-r from-orange-500 via-orange-400 to-blue-500 text-white p-8">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative z-10"
                >
                  <DialogHeader className="space-y-4">
                    <DialogTitle className="text-3xl font-bold flex items-center gap-3">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        <Heart className="h-8 w-8 text-red-300" />
                      </motion.div>
                      Why Choose Namastey Thailand
                    </DialogTitle>
                    <DialogDescription className="text-xl text-orange-100 max-w-6xl">
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        At Namastey Thailand, we believe opportunities should flow as freely as ideas — without borders, complexity, or confusion.
                      </motion.span>
                    </DialogDescription>
                  </DialogHeader>
                </motion.div>
                
                {/* Background decorations */}
                <div className="absolute inset-0 overflow-hidden rounded-[12px]">
                  <motion.div
                    className="absolute -top-12 -right-12 w-56 h-56 bg-white/10 rounded-full"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={{ duration: 20, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -bottom-12 -left-12 w-44 h-44 bg-white/10 rounded-full"
                    animate={{ scale: [1.1, 1, 1.1], rotate: [360, 180, 0] }}
                    transition={{ duration: 15, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Main Content */}
              <div className="px-8 lg:px-16 py-12 space-y-20 max-w-none">
                {/* Hero Image */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1758691737421-86dd84bd2951?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHRlYW13b3JrJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NTk3NzEzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Professional business teamwork collaboration"
                    className="w-full h-64 object-cover rounded-2xl shadow-lg"
                  />
                  <motion.p 
                    className="mt-6 text-lg text-gray-600 max-w-5xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    Our platform empowers freelancers and businesses in both India and Thailand to collaborate confidently, 
                    work seamlessly, and get paid securely when the job is done.
                  </motion.p>
                </motion.div>

                {/* For Freelancers Section */}
                <motion.section 
                  className="space-y-8"
                  variants={staggerChildren}
                  initial="initial"
                  animate="animate"
                >
                  <motion.div variants={fadeInUp} className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1537562268210-3ce996300af3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVlbGFuY2VyJTIwbGFwdG9wJTIwb3V0ZG9vciUyMGdhcmRlbiUyMHJlbW90ZSUyMHdvcmt8ZW58MXx8fHwxNzU5NzcxMzM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Freelancer working on laptop outdoors"
                        className="w-16 h-16 object-cover rounded-full border-4 border-blue-200"
                      />
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">For Freelancers</h2>
                        <Badge className="bg-blue-100 text-blue-800 mt-2">
                          Work globally. Get paid locally. Grow confidently.
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 max-w-5xl mx-auto">
                      Namastey Thailand opens the door for talented professionals from India and Thailand to work with real clients, 
                      across borders, with full payment protection and transparency.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={staggerChildren}
                  >
                    {freelancerBenefits.map((benefit, index) => (
                      <motion.div key={index} variants={fadeInUp}>
                        <Card className="h-full hover:shadow-lg transition-all duration-300 border-blue-100 hover:border-blue-300">
                          <CardContent className="p-6">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                              className="mb-4"
                            >
                              {benefit.icon}
                            </motion.div>
                            <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                            <p className="text-gray-600 text-sm">{benefit.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div variants={fadeInUp} className="text-center">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2">
                      You focus on your craft; we handle the rest.
                    </Badge>
                  </motion.div>
                </motion.section>

                <Separator className="my-12" />

                {/* For Clients Section */}
                <motion.section 
                  className="space-y-8"
                  variants={staggerChildren}
                  initial="initial"
                  animate="animate"
                >
                  <motion.div variants={fadeInUp} className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <ImageWithFallback
                        src="https://images.unsplash.com/photo-1759056486258-443c855b8db1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBidWlsZGluZyUyMGNvcnBvcmF0ZSUyMGhlYWRxdWFydGVyc3xlbnwxfHx8fDE3NTk3NzExNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                        alt="Modern office building"
                        className="w-16 h-16 object-cover rounded-full border-4 border-orange-200"
                      />
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">For Clients</h2>
                        <Badge className="bg-orange-100 text-orange-800 mt-2">
                          Hire confidently. Pay securely. Collaborate effortlessly.
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 max-w-5xl mx-auto">
                      Whether you're an Indian company hiring Thai freelancers or a Thai business working with Indian talent, 
                      Namastey Thailand ensures your experience is professional, compliant, and stress-free.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={staggerChildren}
                  >
                    {clientBenefits.map((benefit, index) => (
                      <motion.div key={index} variants={fadeInUp}>
                        <Card className="h-full hover:shadow-lg transition-all duration-300 border-orange-100 hover:border-orange-300">
                          <CardContent className="p-6">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                              className="mb-4"
                            >
                              {benefit.icon}
                            </motion.div>
                            <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                            <p className="text-gray-600 text-sm">{benefit.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div variants={fadeInUp} className="text-center">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2">
                      You focus on results; we ensure peace of mind.
                    </Badge>
                  </motion.div>
                </motion.section>

                <Separator className="my-12" />

                {/* The Namastey Thailand Promise */}
                <motion.section 
                  className="text-center space-y-8"
                  variants={staggerChildren}
                  initial="initial"
                  animate="animate"
                >
                  <motion.div variants={fadeInUp}>
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <Handshake className="h-12 w-12 text-gradient-to-r from-orange-500 to-blue-500" />
                      </motion.div>
                      <h2 className="text-3xl font-bold text-gray-900">The Namastey Thailand Promise</h2>
                    </div>
                    
                    <img
                      src={handshakeImage}
                      alt="Professional handshake - Trust and partnership"
                      className="w-full h-48 object-cover rounded-2xl mb-8 shadow-lg"
                    />
                  </motion.div>

                  <motion.div 
                    variants={fadeInUp}
                    className="bg-gradient-to-r from-orange-100 via-white to-blue-100 p-8 rounded-2xl shadow-lg"
                  >
                    <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                      We're more than a platform — we're a partnership built on trust, technology, and transparency.
                    </p>
                    
                    <p className="text-lg text-gray-600 mb-8">
                      Every connection, every payment, and every collaboration on Namastey Thailand is designed to make 
                      cross-border work simpler, safer, and smarter.
                    </p>

                    <motion.div 
                      className="bg-white p-6 rounded-xl shadow-md"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Goal is Simple:</h3>
                      <div className="flex items-center justify-center gap-4 text-lg">
                        <span className="text-orange-600 font-semibold">🇮🇳 India</span>
                        <motion.div
                          animate={{ x: [0, 10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          ↔️
                        </motion.div>
                        <span className="text-blue-600 font-semibold">🇹🇭 Thailand</span>
                      </div>
                      <p className="text-gray-700 mt-4">
                        To make collaboration effortless — so freelancers earn what they deserve, 
                        and clients get exactly what they pay for.
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.section>

                {/* CTA Section */}
                <motion.div 
                  className="text-center space-y-6 bg-gradient-to-r from-orange-500 to-blue-500 text-white p-8 rounded-2xl"
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                >
                  <h3 className="text-2xl font-bold">Ready to Join the Namastey Thailand Community?</h3>
                  <p className="text-orange-100">
                    Start your journey of seamless cross-border collaboration today!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      className="bg-white text-orange-600 hover:bg-orange-50"
                      onClick={onClose}
                    >
                      Join as Freelancer
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white text-white hover:bg-white/10"
                      onClick={onClose}
                    >
                      Hire Talent
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}