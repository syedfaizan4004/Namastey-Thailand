import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { jobAPI } from "../utils/api";
import { generateJobId } from "../utils/idGenerator";

interface JobPostingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobPosted: () => void;
  clientId: string;
}

interface JobFormData {
  title: string;
  description: string;
  category: string;
  skillsRequired: string[];
  budget: string;
  paymentType: "fixed" | "hourly";
  timeline: string;
  location: string;
}

const categories = [
  "Development & IT",
  "Design & Creative", 
  "Sales & Marketing",
  "Writing & Translation",
  "Admin & Customer Support",
  "Finance & Accounting",
  "Engineering & Architecture",
  "Legal"
];

const skills = [
  // Development & IT
  "React", "Node.js", "Python", "JavaScript", "TypeScript", "MongoDB", "PostgreSQL", "AWS", "Docker",
  // Design & Creative
  "Figma", "Adobe Photoshop", "Adobe Illustrator", "UI/UX Design", "Logo Design", "Brand Design",
  // Marketing
  "Google Ads", "Facebook Ads", "SEO", "Content Marketing", "Social Media", "Email Marketing",
  // Writing
  "Content Writing", "Copywriting", "Technical Writing", "Translation", "Proofreading",
  // Other
  "Data Analysis", "Excel", "Accounting", "Legal Writing", "Project Management"
];

export function JobPostingModal({ isOpen, onClose, onJobPosted, clientId }: JobPostingModalProps) {
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    description: "",
    category: "",
    skillsRequired: [],
    budget: "",
    paymentType: "fixed",
    timeline: "",
    location: "Remote"
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof JobFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skillsRequired: prev.skillsRequired.includes(skill)
        ? prev.skillsRequired.filter(s => s !== skill)
        : [...prev.skillsRequired, skill]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || formData.skillsRequired.length === 0) {
      alert("Please fill in all required fields and select at least one skill!");
      return;
    }

    setLoading(true);
    
    try {
      const jobId = generateJobId();
      
      await jobAPI.create({
        jobId,
        clientId,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        skillsRequired: formData.skillsRequired,
        budget: formData.budget,
        paymentType: formData.paymentType,
        timeline: formData.timeline,
        location: formData.location
      });
      
      alert(`🎉 Job posted successfully!\n\nJob ID: ${jobId}\n\nYour job will now appear in the featured jobs section and freelancers can apply for it.`);
      onJobPosted();
      onClose();
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        skillsRequired: [],
        budget: "",
        paymentType: "fixed",
        timeline: "",
        location: "Remote"
      });
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Post a New Job</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="e.g., React Developer for E-commerce Website"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select job category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe what you need done, requirements, deliverables..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget">Budget *</Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                placeholder={formData.paymentType === "fixed" ? "e.g., $2500" : "e.g., $50/hr"}
                required
              />
            </div>
            <div>
              <Label htmlFor="paymentType">Payment Type</Label>
              <Select value={formData.paymentType} onValueChange={(value: "fixed" | "hourly") => handleInputChange("paymentType", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fixed">Fixed Price</SelectItem>
                  <SelectItem value="hourly">Hourly Rate</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="timeline">Timeline *</Label>
              <Input
                id="timeline"
                value={formData.timeline}
                onChange={(e) => handleInputChange("timeline", e.target.value)}
                placeholder="e.g., 2-3 months, 4 weeks"
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Remote, New York, etc."
              />
            </div>
          </div>

          <div>
            <Label className="text-base mb-3 block">Skills Required * (Select at least one)</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-40 overflow-y-auto border rounded-lg p-3">
              {skills.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={skill}
                    checked={formData.skillsRequired.includes(skill)}
                    onCheckedChange={() => handleSkillToggle(skill)}
                  />
                  <Label htmlFor={skill} className="text-sm cursor-pointer">
                    {skill}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-orange-400 hover:bg-orange-500">
              {loading ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}