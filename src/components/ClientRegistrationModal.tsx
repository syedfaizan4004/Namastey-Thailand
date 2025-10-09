import { useState } from "react";
import { clientAPI } from "../utils/api";
import { generateClientId } from "../utils/idGenerator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Upload, X } from "lucide-react";

interface ClientRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ClientRegistrationModal({ isOpen, onClose }: ClientRegistrationModalProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [formData, setFormData] = useState({
    profilePhoto: null as File | null,
    businessDescription: "",
    expertiseNeeded: "",
    budget: "",
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    panNumber: "",
    dateOfBirth: "",
    gstNumber: "",
    companyRegistrationNumber: "",
    taxId: "",
    panCardFile: null as File | null,
    gstCertificateFile: null as File | null,
    dbdCertificateFile: null as File | null,
    taxDocumentFile: null as File | null,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCountry || !formData.fullName || !formData.email || !formData.mobile) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      // Generate a unique user ID
      const userId = generateClientId();
      
      // Prepare profile data for backend
      const profileData = {
        userId,
        name: formData.fullName,
        email: formData.email,
        country: selectedCountry,
        companyName: formData.companyName || formData.fullName,
        businessDescription: formData.businessDescription,
        profile: {
          mobile: formData.mobile,
          businessDescription: formData.businessDescription,
          expertiseNeeded: formData.expertiseNeeded,
          budget: formData.budget,
          // Add country-specific fields
          ...(selectedCountry === 'india' && {
            panNumber: formData.panNumber,
            dateOfBirth: formData.dateOfBirth,
            gstNumber: formData.gstNumber,
            companyRegistrationNumber: formData.companyRegistrationNumber
          }),
          ...(selectedCountry === 'thailand' && {
            taxId: formData.taxId,
            companyRegistrationNumber: formData.companyRegistrationNumber
          })
        }
      };
      
      // Save to backend
      await clientAPI.create(profileData);
      
      alert(`🎉 Registration successful!\n\nYour Client ID: ${userId}\n\nYour account is now active and you can start posting jobs. Please save your ID for future reference and login.`);
      onClose();
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const resetForm = () => {
    setSelectedCountry("");
    setFormData({
      profilePhoto: null,
      businessDescription: "",
      expertiseNeeded: "",
      budget: "",
      fullName: "",
      mobile: "",
      email: "",
      password: "",
      confirmPassword: "",
      panNumber: "",
      dateOfBirth: "",
      gstNumber: "",
      companyRegistrationNumber: "",
      taxId: "",
      panCardFile: null,
      gstCertificateFile: null,
      dbdCertificateFile: null,
      taxDocumentFile: null,
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const FileUploadField = ({ 
    label, 
    field, 
    required = false, 
    accept = ".pdf,.jpg,.jpeg,.png" 
  }: { 
    label: string; 
    field: string; 
    required?: boolean; 
    accept?: string; 
  }) => {
    const file = formData[field as keyof typeof formData] as File | null;
    
    return (
      <div className="space-y-2">
        <Label className="text-sm">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
          <input
            type="file"
            accept={accept}
            onChange={(e) => handleFileChange(field, e.target.files?.[0] || null)}
            className="hidden"
            id={field}
          />
          <label htmlFor={field} className="cursor-pointer">
            {file ? (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    handleFileChange(field, null);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                <div className="text-sm text-gray-600">Click to upload {label}</div>
              </div>
            )}
          </label>
        </div>
      </div>
    );
  };

  if (!selectedCountry) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Client Registration</DialogTitle>
            <DialogDescription>
              Please select your country to proceed with registration.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select Country</Label>
              <Select onValueChange={setSelectedCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="thailand">Thailand</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {selectedCountry === "india" ? "Client Registration - India" : "ลงทะเบียนลูกค้า - ประเทศไทย"}
          </DialogTitle>
          <DialogDescription>
            {selectedCountry === "india" 
              ? "Please fill in all required information to create your client account."
              : "กรุณากรอกข้อมูลที่จำเป็นทั้งหมดเพื่อสร้างบัญชีลูกค้าของคุณ"
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {selectedCountry === "india" ? (
            // India Form
            <>
              <FileUploadField 
                label="Profile Photo (Optional)" 
                field="profilePhoto" 
                accept=".jpg,.jpeg,.png"
              />

              <div className="space-y-2">
                <Label htmlFor="businessDescription">Brief About your Business (Optional)</Label>
                <Textarea
                  id="businessDescription"
                  placeholder="Tell us about your business..."
                  value={formData.businessDescription}
                  onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expertiseNeeded">Need Expertise in (Optional)</Label>
                <Input
                  id="expertiseNeeded"
                  placeholder="e.g., Web Development, Graphic Design"
                  value={formData.expertiseNeeded}
                  onChange={(e) => handleInputChange("expertiseNeeded", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget (Optional)</Label>
                <Input
                  id="budget"
                  placeholder="e.g., ₹10,000 - ₹50,000"
                  value={formData.budget}
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                <Input
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile No. <span className="text-red-500">*</span></Label>
                <Input
                  id="mobile"
                  type="tel"
                  required
                  placeholder="This will serve as your User ID"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email ID (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Create Password <span className="text-red-500">*</span></Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Repeat Password <span className="text-red-500">*</span></Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="panNumber">PAN No. <span className="text-red-500">*</span></Label>
                <Input
                  id="panNumber"
                  required
                  placeholder="e.g., ABCDE1234F"
                  value={formData.panNumber}
                  onChange={(e) => handleInputChange("panNumber", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth/Incorporation <span className="text-red-500">*</span></Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                <Input
                  id="gstNumber"
                  placeholder="e.g., 22AAAAA0000A1Z5"
                  value={formData.gstNumber}
                  onChange={(e) => handleInputChange("gstNumber", e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-lg">Upload Documents <span className="text-red-500">*</span></h4>
                <FileUploadField 
                  label="PAN Card Copy" 
                  field="panCardFile" 
                  required
                />
                <FileUploadField 
                  label="GST Certificate (Optional)" 
                  field="gstCertificateFile"
                />
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg space-y-2">
                <p className="text-sm text-gray-700">
                  <strong>Disclaimer:</strong> Your account activation may take some time. Once verified, you will receive a confirmation via SMS and email.
                </p>
                <p className="text-sm text-gray-700">
                  Please ensure that all the information you've provided is accurate and matches official records. Any discrepancies may result in account suspension.
                </p>
              </div>
            </>
          ) : (
            // Thailand Form
            <>
              <FileUploadField 
                label="รูปโปรไฟล์ (ไม่บังคับ)" 
                field="profilePhoto" 
                accept=".jpg,.jpeg,.png"
              />

              <div className="space-y-2">
                <Label htmlFor="businessDescription">แนะนำธุรกิจของคุณโดยย่อ (ไม่บังคับ)</Label>
                <Textarea
                  id="businessDescription"
                  placeholder="บอกเราเกี่ยวกับธุรกิจของคุณ..."
                  value={formData.businessDescription}
                  onChange={(e) => handleInputChange("businessDescription", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="expertiseNeeded">ต้องการความเชี่ยวชาญในด้าน (ไม่บังคับ)</Label>
                <Input
                  id="expertiseNeeded"
                  placeholder="เช่น การพัฒนาเว็บไซต์, การออกแบบกราฟิก"
                  value={formData.expertiseNeeded}
                  onChange={(e) => handleInputChange("expertiseNeeded", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">งบประมาณ (ไม่บังคับ)</Label>
                <Input
                  id="budget"
                  placeholder="เช่น ฿10,000 - ฿50,000"
                  value={formData.budget}
                  onChange={(e) => handleInputChange("budget", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">ชื่อ–นามสกุล <span className="text-red-500">*</span></Label>
                <Input
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobile">หมายเลขโทรศัพท์มือถือ <span className="text-red-500">*</span></Label>
                <Input
                  id="mobile"
                  type="tel"
                  required
                  placeholder="หมายเลขนี้จะใช้เป็น รหัสผู้ใช้งาน ของคุณ"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">อีเมล (ไม่บังคับ)</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">สร้างรหัสผ่าน <span className="text-red-500">*</span></Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">ยืนยันรหัสผ่าน <span className="text-red-500">*</span></Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyRegistrationNumber">หมายเลขทะเบียนบริษัท <span className="text-red-500">*</span></Label>
                <Input
                  id="companyRegistrationNumber"
                  required
                  value={formData.companyRegistrationNumber}
                  onChange={(e) => handleInputChange("companyRegistrationNumber", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">วันเดือนปีเกิด / วันที่จดทะเบียนบริษัท <span className="text-red-500">*</span></Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxId">หมายเลขประจำตัวผู้เสียภาษี (ไม่บังคับ)</Label>
                <Input
                  id="taxId"
                  value={formData.taxId}
                  onChange={(e) => handleInputChange("taxId", e.target.value)}
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-lg">อัปโหลดเอกสาร <span className="text-red-500">*</span></h4>
                <FileUploadField 
                  label="ใบรับรองการจดทะเบียน DBD" 
                  field="dbdCertificateFile" 
                  required
                />
                <FileUploadField 
                  label="เอกสารหมายเลขประจำตัวผู้เสียภาษี (ไม่บังคับ)" 
                  field="taxDocumentFile"
                />
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg space-y-2">
                <p className="text-sm text-gray-700">
                  <strong>ข้อจำกัดความรับผิดชอบ:</strong> การเปิดใช้งานบัญชีของคุณอาจใช้เวลาสักครู่ เมื่อการยืนยันเสร็จสิ้น คุณจะได้รับการแจ้งเตือนทาง SMS และอีเมล
                </p>
                <p className="text-sm text-gray-700">
                  โปรดตรวจสอบให้แน่ใจว่าข้อมูลที่คุณให้มานั้น ถูกต้องและตรงกับข้อมูลทางราชการ ความคลาดเคลื่อนใด ๆ อาจส่งผลให้ บัญชีถูกระงับการใช้งาน ได้
                </p>
                <p className="text-sm text-gray-700">
                  <strong>*Mandatory Fields</strong>
                </p>
              </div>
            </>
          )}

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              {selectedCountry === "india" ? "Cancel" : "ยกเลิก"}
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {selectedCountry === "india" ? "Register as Client" : "ลงทะเบียนเป็นลูกค้า"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}