import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { X, ArrowRight, Shield, Users, CreditCard, FileText, Lock, Award, CheckCircle, Building2, Zap, Globe, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface EnterpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EnterpriseModal({ isOpen, onClose }: EnterpriseModalProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    country: "",
    budgetRange: "",
    services: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enterprise form submitted:", formData);
    // Handle form submission here
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[98vw] w-full max-h-[95vh] overflow-y-auto bg-white border-none shadow-2xl p-0">
        <div className="relative">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-400 to-blue-600 text-white p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <DialogHeader className="space-y-4">
                <DialogTitle className="text-4xl lg:text-5xl mb-4 text-white">Enterprise</DialogTitle>
                <DialogDescription className="text-xl lg:text-2xl mb-2 opacity-90 text-white">
                  Power Your Global Projects with Confidence
                </DialogDescription>
              </DialogHeader>
              <p className="text-lg opacity-80 max-w-6xl mx-auto">
                For enterprises that need scale, compliance, and reliability — Namastey Thailand delivers.
                We help large organizations manage cross-border teams, process high-value transactions, and ensure full transparency between India and Thailand — all under one secure platform.
              </p>
              <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                <p className="text-lg">
                  <ArrowRight className="inline mr-2" />
                  Build bigger. Pay smarter. Grow globally.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-8 max-w-none">
            {/* What We Offer Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="text-3xl text-gray-900 mb-6 text-center">What We Offer</h2>
              <p className="text-lg text-gray-600 mb-12 text-center max-w-6xl mx-auto">
                When your business goes beyond one project or one freelancer, you need a system built for scale.
                Namastey Thailand's enterprise solutions provide custom workflows, team coordination, and payment infrastructure designed for large companies operating across India and Thailand.
              </p>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {[
                  {
                    icon: Users,
                    title: "Dedicated Account Manager",
                    description: "Every enterprise client is assigned a dedicated manager who ensures smooth onboarding, communication, and project tracking — from first briefing to final delivery.",
                    color: "from-blue-500 to-blue-600"
                  },
                  {
                    icon: Building2,
                    title: "Bulk Project Management",
                    description: "Run multiple projects and freelancers simultaneously under one secure dashboard. Track milestones, deliverables, and payouts without the chaos of multiple spreadsheets or chats.",
                    color: "from-orange-500 to-orange-600"
                  },
                  {
                    icon: CreditCard,
                    title: "Custom Payment Limits",
                    description: "Unlock higher transaction limits for enterprise-scale operations. Move funds securely for larger projects with real-time payment tracking and compliance checks.",
                    color: "from-green-500 to-green-600"
                  },
                  {
                    icon: Shield,
                    title: "Advanced Escrow & Reporting",
                    description: "Payments are protected through escrow accounts and automatically released upon project completion. Monthly reports and reconciliation summaries keep your finance team fully informed.",
                    color: "from-purple-500 to-purple-600"
                  },
                  {
                    icon: FileText,
                    title: "Legal & Compliance Support",
                    description: "Every transaction is supported by standardized contracts, tax documentation, and audit-ready records — ensuring that your enterprise remains fully compliant with Indian and Thai regulations.",
                    color: "from-red-500 to-red-600"
                  },
                  {
                    icon: Lock,
                    title: "Confidentiality & NDAs",
                    description: "Your projects are protected by non-disclosure agreements (NDAs) and data privacy policies. Every freelancer working under your enterprise account is legally bound to maintain confidentiality.",
                    color: "from-teal-500 to-teal-600"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className="h-full p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:border-gray-200">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg text-gray-900 mb-3">{feature.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* How It Works Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-16 bg-gray-50 -mx-8 px-8 py-12"
            >
              <h2 className="text-3xl text-gray-900 mb-6 text-center">How It Works</h2>
              <p className="text-lg text-gray-600 mb-12 text-center max-w-6xl mx-auto">
                We designed Namastey Thailand's enterprise workflow to simplify complex processes and help you focus on results.
              </p>

              <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {[
                  {
                    step: "1",
                    title: "Share Your Requirements",
                    description: "Tell us your goals, timelines, and project needs — whether it's building a design team in Bangkok, hiring accountants from India, or managing a multilingual marketing campaign.",
                    icon: FileText
                  },
                  {
                    step: "2", 
                    title: "Get Curated Talent",
                    description: "We connect you with verified professionals and teams that match your requirements. Every profile is screened for expertise, background, and communication ability.",
                    icon: Users
                  },
                  {
                    step: "3",
                    title: "Track & Pay Securely",
                    description: "Monitor project progress through your dashboard. Once milestones are completed and approved, payments are released from escrow — securely, in your local currency.",
                    icon: CheckCircle
                  }
                ].map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="relative"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl">
                        {step.step}
                      </div>
                      <step.icon className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                    {index < 2 && (
                      <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-orange-200 to-blue-200 z-0" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Industries Section */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-3xl text-gray-900 mb-6 text-center">Industries We Serve</h2>
              <p className="text-lg text-gray-600 mb-12 text-center">
                Namastey Thailand's enterprise solutions are trusted across multiple sectors.
              </p>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {[
                  { title: "Technology & IT Services", description: "Web, app, and software development projects.", icon: Zap },
                  { title: "Finance & Accounting", description: "Cross-border bookkeeping, audits, and tax preparation.", icon: TrendingUp },
                  { title: "Design & Marketing", description: "Branding, content, and digital campaigns with multilingual support.", icon: Globe },
                  { title: "Translation & Localization", description: "Seamless communication between Indian and Thai businesses.", icon: Globe },
                  { title: "Import–Export Support", description: "Trade document management and product sourcing coordination.", icon: Building2 },
                  { title: "HR & Recruitment", description: "Remote staffing and payroll solutions for expanding teams.", icon: Users }
                ].map((industry, index) => (
                  <motion.div
                    key={industry.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="p-6 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300"
                  >
                    <industry.icon className="w-8 h-8 text-blue-600 mb-3" />
                    <h3 className="text-lg text-gray-900 mb-2">{industry.title}</h3>
                    <p className="text-gray-600">{industry.description}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <p className="text-lg text-gray-600">
                  Whatever your domain, we bring the right talent and tools to execute it efficiently.
                </p>
              </div>
            </motion.section>

            {/* Why Enterprises Trust Us */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-16 bg-gradient-to-br from-blue-50 to-orange-50 -mx-8 px-8 py-12"
            >
              <h2 className="text-3xl text-gray-900 mb-6 text-center">Why Enterprises Trust Us</h2>
              <p className="text-lg text-gray-600 mb-12 text-center max-w-6xl mx-auto">
                When scale meets complexity, you need a partner that understands both.
                Namastey Thailand combines compliance, technology, and human expertise to ensure your business operations run smoothly across borders.
              </p>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {[
                  "100% verified professionals and authentic businesses.",
                  "Escrow-based payment protection for every project.",
                  "Automated reconciliation and transparent fee structure.",
                  "Legal and taxation support across both jurisdictions.",
                  "End-to-end reporting for finance and compliance teams.",
                  "Personalized onboarding and continuous support."
                ].map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700">{point}</p>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="text-lg text-gray-700 italic">
                  We don't just process payments — we power partnerships.
                </p>
              </div>
            </motion.section>

            {/* Contact Form */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="mb-12"
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl text-gray-900 mb-4">Let's Build Your Enterprise Solution</h2>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                  Ready to scale your operations between India and Thailand?
                  Our enterprise team is here to design a solution tailored to your business needs.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Fill in the form below, and one of our representatives will contact you within 24 hours.
                </p>
              </div>

              <div className="max-w-6xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange("companyName", e.target.value)}
                        placeholder="Your company name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPerson">Contact Person *</Label>
                      <Input
                        id="contactPerson"
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="your.email@company.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="india">India</SelectItem>
                          <SelectItem value="thailand">Thailand</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="budgetRange">Project Budget Range</Label>
                      <Select value={formData.budgetRange} onValueChange={(value) => handleInputChange("budgetRange", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10k-50k">$10,000 - $50,000</SelectItem>
                          <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                          <SelectItem value="100k-500k">$100,000 - $500,000</SelectItem>
                          <SelectItem value="500k+">$500,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="services">Services Required</Label>
                      <Input
                        id="services"
                        value={formData.services}
                        onChange={(e) => handleInputChange("services", e.target.value)}
                        placeholder="e.g., Development, Design, Marketing"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message / Brief</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                      rows={4}
                    />
                  </div>

                  <div className="text-center">
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-gradient-to-r from-orange-400 to-blue-600 hover:from-orange-500 hover:to-blue-700 text-white px-12 py-3"
                    >
                      Request a Callback
                    </Button>
                  </div>
                </form>
              </div>
            </motion.section>

            {/* Closing Statement */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-center bg-gradient-to-r from-gray-900 to-gray-800 text-white -mx-8 px-8 py-12"
            >
              <h2 className="text-3xl mb-6">The Namastey Thailand Edge</h2>
              <p className="text-lg mb-6 max-w-6xl mx-auto opacity-90">
                We believe in building bridges — not just between countries, but between businesses and people.
                With Namastey Thailand, enterprises gain a partner that blends flexibility, accountability, and compliance — ensuring every project ends in success.
              </p>
              <p className="text-xl">
                <Award className="inline mr-2" />
                Namastey Thailand — Where India and Thailand Work as One.
              </p>
            </motion.section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}