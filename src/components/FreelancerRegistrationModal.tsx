import { useState } from "react";
import { freelancerAPI } from "../utils/api";
import { generateFreelancerId } from "../utils/idGenerator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { Eye, EyeOff, ArrowLeft, Upload, User, Phone, Mail, Calendar, CreditCard, MapPin, Building, Landmark } from "lucide-react";

interface FreelancerRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory?: string;
}

interface FormData {
  // Common fields
  profilePhoto?: File;
  briefAbout: string;
  expertIn: string;
  fullName: string;
  mobileNo: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  experience: string;
  skills: string[];
  
  // India specific
  panNo?: string;
  aadhaarNo?: string;
  bankAccountNo?: string;
  bankName?: string;
  ifscCode?: string;
  upiId?: string;
  panCardFile?: File;
  aadhaarFile?: File;
  
  // Thailand specific
  thaiNationalId?: string;
  taxId?: string;
  bankAccountNoTh?: string;
  bankNameTh?: string;
  profileImageTh?: File;
  nationalIdFile?: File;
}

const skillOptions = [
  "Development & IT",
  "Design & Creative", 
  "Sales & Marketing",
  "Writing & Translation",
  "Tour & Travels",
  "Data & Analytics",
  "Video & Photography",
  "Finance & Consulting"
];

const experienceOptions = [
  "Fresher",
  "<1 Year",
  "1 Year to 5 Years", 
  "More than 5 years"
];

const experienceOptionsTh = [
  "ไม่มีประสบการณ์",
  "ต่ำกว่า 1 ปี",
  "1 ปี ถึง 5 ปี",
  "มากกว่า 5 ปี"
];

const skillOptionsTh = [
  "พัฒนาและไอที",
  "ออกแบบและงานสร้างสรรค์",
  "การขายและการตลาด", 
  "การเขียนและการแปล",
  "ท่องเที่ยวและการเดินทาง",
  "ข้อมูลและการวิเคราะห์",
  "วิดีโอและการถ่ายภาพ",
  "การเงินและที่ปรึกษา"
];

export function FreelancerRegistrationModal({ isOpen, onClose, selectedCategory }: FreelancerRegistrationModalProps) {
  const [step, setStep] = useState<"country" | "form">("country");
  const [selectedCountry, setSelectedCountry] = useState<"india" | "thailand" | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAgeAlert, setShowAgeAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    briefAbout: "",
    expertIn: "",
    fullName: "",
    mobileNo: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    experience: "",
    skills: selectedCategory ? [selectedCategory] : []
  });

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleDateChange = (value: string) => {
    setFormData(prev => ({ ...prev, dateOfBirth: value }));
    
    if (value) {
      const age = calculateAge(value);
      if (age < 18) {
        setShowAgeAlert(true);
      }
    }
  };

  const handleCountrySelect = (country: "india" | "thailand") => {
    setSelectedCountry(country);
    setStep("form");
  };

  const handleBackToCountry = () => {
    setStep("country");
    setSelectedCountry(null);
  };

  const handleFileChange = (fieldName: keyof FormData, file: File | null) => {
    if (file) {
      setFormData(prev => ({ ...prev, [fieldName]: file }));
    }
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (formData.skills.length === 0) {
      alert("Please select at least one skill!");
      return;
    }
    
    setLoading(true);
    
    try {
      // Generate a unique user ID
      const userId = generateFreelancerId();
      
      // Map form data to categories for the backend
      const categories = [];
      if (formData.expertIn) {
        categories.push(formData.expertIn);
      }
      
      // Prepare profile data for backend
      const profileData = {
        userId,
        name: formData.fullName,
        email: formData.email,
        country: selectedCountry,
        skills: formData.skills,
        categories,
        profile: {
          briefAbout: formData.briefAbout,
          experience: formData.experience,
          mobileNo: formData.mobileNo,
          dateOfBirth: formData.dateOfBirth,
          // Add country-specific fields
          ...(selectedCountry === 'india' && {
            panNumber: formData.panNumber,
            aadhaarNumber: formData.aadhaarNumber,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode
          }),
          ...(selectedCountry === 'thailand' && {
            nationalId: formData.nationalId,
            address: formData.address,
            city: formData.city,
            province: formData.province,
            postalCode: formData.postalCode
          })
        }
      };
      
      // Save to backend
      await freelancerAPI.create(profileData);
      
      alert(`🎉 Registration successful!\n\nYour Freelancer ID: ${userId}\n\nYour profile is now active and will appear in job categories. Please save your ID for future reference. You will receive confirmation via SMS and email.`);
      onClose();
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isIndia = selectedCountry === "india";
  const isThailand = selectedCountry === "thailand";

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          {step === "country" ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-center">Join as Freelancer</DialogTitle>
                <DialogDescription className="text-center text-sm text-gray-600">
                  Select your country to continue with registration
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <button
                  onClick={() => handleCountrySelect("india")}
                  className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-all group"
                >
                  <div className="flex items-center justify-center space-x-4">
                    <div className="bg-orange-100 p-3 rounded-full group-hover:bg-orange-200">
                      <span className="text-2xl">🇮🇳</span>
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium text-gray-900">India</h3>
                      <p className="text-sm text-gray-600">Register with Indian documents</p>
                    </div>
                  </div>
                </button>
                
                <button
                  onClick={() => handleCountrySelect("thailand")}
                  className="w-full p-6 border-2 border-gray-200 rounded-lg hover:border-orange-400 hover:bg-orange-50 transition-all group"
                >
                  <div className="flex items-center justify-center space-x-4">
                    <div className="bg-orange-100 p-3 rounded-full group-hover:bg-orange-200">
                      <span className="text-2xl">🇹🇭</span>
                    </div>
                    <div className="text-center">
                      <h3 className="font-medium text-gray-900">Thailand</h3>
                      <p className="text-sm text-gray-600">ลงทะเบียนด้วยเอกสารไทย</p>
                    </div>
                  </div>
                </button>
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleBackToCountry}
                    className="p-1"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex-1">
                    <DialogTitle className="text-center">
                      {isIndia ? "Freelancer Registration - India" : "ลงทะเบียนฟรีแลนซ์ - ไทย"}
                    </DialogTitle>
                    <DialogDescription className="text-center text-sm text-gray-600">
                      {isIndia ? `Selected Country: India 🇮🇳` : `ประเทศที่เลือก: ไทย 🇹🇭`}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Photo */}
                <div className="space-y-2">
                  <Label>{isIndia ? "Profile Photo (Optional)" : "รูปโปรไฟล์ (ไม่บังคับ)"}</Label>
                  <div className="flex items-center space-x-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(isIndia ? 'profilePhoto' : 'profileImageTh', e.target.files?.[0] || null)}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                    />
                  </div>
                </div>

                {/* Brief About */}
                <div className="space-y-2">
                  <Label>{isIndia ? "Brief About You (Optional)" : "แนะนำตัวโดยย่อ (ไม่บังคับ)"}</Label>
                  <Textarea
                    placeholder={isIndia ? "Tell us about yourself" : "บอกเล่าเกี่ยวกับตัวคุณ"}
                    value={formData.briefAbout}
                    onChange={(e) => setFormData(prev => ({ ...prev, briefAbout: e.target.value }))}
                    className="min-h-[80px]"
                  />
                </div>

                {/* Expert In */}
                <div className="space-y-2">
                  <Label>{isIndia ? "Expert In (Optional)" : "ความเชี่ยวชาญ (ไม่บังคับ)"}</Label>
                  <Input
                    placeholder={isIndia ? "What are you expert in?" : "คุณเชี่ยวชาญด้านไหน?"}
                    value={formData.expertIn}
                    onChange={(e) => setFormData(prev => ({ ...prev, expertIn: e.target.value }))}
                  />
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <Label>{isIndia ? "Full Name *" : "ชื่อ–นามสกุล *"}</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder={isIndia ? "Enter your full name" : "กรอกชื่อ-นามสกุล"}
                      className="pl-10"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                {/* Mobile No */}
                <div className="space-y-2">
                  <Label>{isIndia ? "Mobile No. * (This will serve as your User ID)" : "หมายเลขโทรศัพท์มือถือ *(หมายเลขนี้จะใช้เป็น รหัสผู้ใช้งาน ของคุณ)"}</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder={isIndia ? "Enter mobile number" : "กรอกหมายเลขโทรศัพท์"}
                      className="pl-10"
                      value={formData.mobileNo}
                      onChange={(e) => setFormData(prev => ({ ...prev, mobileNo: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label>{isIndia ? "Email ID (Optional)" : "อีเมล (ไม่บังคับ)"}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="email"
                      placeholder={isIndia ? "Enter email address" : "กรอกอีเมล"}
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label>{isIndia ? "Create Password *" : "สร้างรหัสผ่าน *"}</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={isIndia ? "Create a password" : "สร้างรหัสผ่าน"}
                      className="pr-10"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label>{isIndia ? "Repeat Password *" : "ยืนยันรหัสผ่าน *"}</Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={isIndia ? "Repeat your password" : "ยืนยันรหัสผ่าน"}
                      className="pr-10"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {/* Country-specific fields */}
                {isIndia && (
                  <>
                    {/* PAN No */}
                    <div className="space-y-2">
                      <Label>PAN No. *</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Enter PAN number"
                          className="pl-10"
                          value={formData.panNo || ""}
                          onChange={(e) => setFormData(prev => ({ ...prev, panNo: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    {/* AADHAAR No */}
                    <div className="space-y-2">
                      <Label>AADHAAR No. *</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="Enter Aadhaar number"
                          className="pl-10"
                          value={formData.aadhaarNo || ""}
                          onChange={(e) => setFormData(prev => ({ ...prev, aadhaarNo: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {isThailand && (
                  <>
                    {/* Thai National ID */}
                    <div className="space-y-2">
                      <Label>เลขประจำตัวประชาชนไทย *</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="กรอกเลขประจำตัวประชาชน"
                          className="pl-10"
                          value={formData.thaiNationalId || ""}
                          onChange={(e) => setFormData(prev => ({ ...prev, thaiNationalId: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    {/* Tax ID (Optional) */}
                    <div className="space-y-2">
                      <Label>เลขประจำตัวผู้เสียภาษี (ไม่บังคับ)</Label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          placeholder="กรอกเลขประจำตัวผู้เสียภาษี"
                          className="pl-10"
                          value={formData.taxId || ""}
                          onChange={(e) => setFormData(prev => ({ ...prev, taxId: e.target.value }))}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label>{isIndia ? "Date of Birth *" : "วันเดือนปีเกิด *"}</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="date"
                      className="pl-10"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleDateChange(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Experience */}
                <div className="space-y-2">
                  <Label>{isIndia ? "Experience (Optional)" : "ประสบการณ์ (ไม่บังคับ)"}</Label>
                  <Select value={formData.experience} onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder={isIndia ? "Select experience level" : "เลือกระดับประสบการณ์"} />
                    </SelectTrigger>
                    <SelectContent>
                      {(isIndia ? experienceOptions : experienceOptionsTh).map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Bank Details */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">
                    {isIndia ? "Bank Details" : "รายละเอียดธนาคาร"}
                  </h3>
                  
                  {/* Bank Account No */}
                  <div className="space-y-2">
                    <Label>
                      {isIndia ? "Bank Account No. (The account where your earnings will be deposited) *" : "หมายเลขบัญชีธนาคาร * (บัญชีที่ใช้สำหรับรับรายได้ของคุณ)"}
                    </Label>
                    <div className="relative">
                      <Landmark className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder={isIndia ? "Enter bank account number" : "กรอกหมายเลขบัญชี"}
                        className="pl-10"
                        value={isIndia ? (formData.bankAccountNo || "") : (formData.bankAccountNoTh || "")}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          [isIndia ? 'bankAccountNo' : 'bankAccountNoTh']: e.target.value 
                        }))}
                        required
                      />
                    </div>
                  </div>

                  {/* Bank Name */}
                  <div className="space-y-2">
                    <Label>{isIndia ? "Bank Name *" : "ชื่อธนาคาร *"}</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder={isIndia ? "Enter bank name" : "กรอกชื่อธนาคาร"}
                        className="pl-10"
                        value={isIndia ? (formData.bankName || "") : (formData.bankNameTh || "")}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          [isIndia ? 'bankName' : 'bankNameTh']: e.target.value 
                        }))}
                        required
                      />
                    </div>
                  </div>

                  {isIndia && (
                    <>
                      {/* IFSC Code */}
                      <div className="space-y-2">
                        <Label>IFSC Code *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            placeholder="Enter IFSC code"
                            className="pl-10"
                            value={formData.ifscCode || ""}
                            onChange={(e) => setFormData(prev => ({ ...prev, ifscCode: e.target.value }))}
                            required
                          />
                        </div>
                      </div>

                      {/* UPI ID */}
                      <div className="space-y-2">
                        <Label>UPI ID *</Label>
                        <Input
                          placeholder="Enter UPI ID"
                          value={formData.upiId || ""}
                          onChange={(e) => setFormData(prev => ({ ...prev, upiId: e.target.value }))}
                          required
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Document Upload */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">
                    {isIndia ? "Upload Documents *" : "อัปโหลดเอกสาร *"}
                  </h3>
                  
                  {isIndia ? (
                    <>
                      {/* PAN Card */}
                      <div className="space-y-2">
                        <Label>PAN Card Copy *</Label>
                        <Input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange('panCardFile', e.target.files?.[0] || null)}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                          required
                        />
                      </div>

                      {/* AADHAAR Card */}
                      <div className="space-y-2">
                        <Label>AADHAAR Copy *</Label>
                        <Input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange('aadhaarFile', e.target.files?.[0] || null)}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                          required
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Thai National ID */}
                      <div className="space-y-2">
                        <Label>สำเนาบัตรประชาชนไทย *</Label>
                        <Input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange('nationalIdFile', e.target.files?.[0] || null)}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                          required
                        />
                      </div>
                    </>
                  )}
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  <Label>{isIndia ? "Skills *" : "ทักษะ *"}</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {(isIndia ? skillOptions : skillOptionsTh).map((skill, index) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={`skill-${index}`}
                          checked={formData.skills.includes(isIndia ? skill : skillOptions[index])}
                          onCheckedChange={() => handleSkillToggle(isIndia ? skill : skillOptions[index])}
                        />
                        <Label htmlFor={`skill-${index}`} className="text-sm">
                          {skill}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <h4 className="font-medium text-gray-900">
                    {isIndia ? "Disclaimer:" : "ข้อจำกัดความรับผิดชอบ"}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {isIndia 
                      ? "Your account activation may take some time. Once verified, you will receive a confirmation via SMS and email. Please ensure that all the information you've provided is accurate and matches official records. Any discrepancies may result in account suspension."
                      : "การเปิดใช้งานบัญชีของคุณอาจใช้เวลาสักครู่ เมื่อการยืนยันเสร็จสิ้น คุณจะได้รับการแจ้งเตือนทาง SMS และอีเมล โปรดตรวจสอบให้แน่ใจว่าข้อมูลที่คุณให้มานั้น ถูกต้องและตรงกับข้อมูลทางราชการ ความคลาดเคลื่อนใด ๆ อาจส่งผลให้ บัญชีถูกระงับการใช้งาน ได้"
                    }
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-orange-400 hover:bg-orange-500"
                  disabled={loading}
                >
                  {loading 
                    ? (isIndia ? "Submitting..." : "กำลังส่ง...") 
                    : (isIndia ? "Submit Registration" : "ส่งใบสมัคร")
                  }
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Age Alert Dialog */}
      <AlertDialog open={showAgeAlert} onOpenChange={setShowAgeAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isIndia ? "Age Requirement" : "ข้อกำหนดเรื่องอายุ"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isIndia 
                ? "We're sorry, but you must be 18 years or older to register and work on this platform. If you're under 18, you are not eligible to create an account or offer services here."
                : "ขออภัย คุณต้องมีอายุ 18 ปีขึ้นไป จึงจะสามารถลงทะเบียนและทำงานบนแพลตฟอร์มนี้ได้ หากคุณอายุต่ำกว่า 18 ปี จะไม่สามารถสร้างบัญชีหรือให้บริการบนแพลตฟอร์มนี้ได้"
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction onClick={() => setShowAgeAlert(false)}>
            {isIndia ? "Understood" : "เข้าใจแล้ว"}
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}