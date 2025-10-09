import { useState, useEffect } from "react";
import { JobPostingModal } from "./JobPostingModal";
import { jobAPI } from "../utils/api";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Star,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Plus
} from "lucide-react";
import { useAuth } from "./AuthContext";

export function ClientDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("given");
  const [showJobModal, setShowJobModal] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientJobs = async () => {
      if (!user?.id) return;
      
      try {
        const response = await jobAPI.getByClient(user.id);
        setJobs(response.jobs);
      } catch (error) {
        console.error("Error fetching client jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientJobs();
  }, [user?.id]);

  const handleJobPosted = async () => {
    // Refresh jobs list
    if (user?.id) {
      try {
        const response = await jobAPI.getByClient(user.id);
        setJobs(response.jobs);
      } catch (error) {
        console.error("Error refreshing jobs:", error);
      }
    }
  };
  
  // Mock data - in real app, this would come from your backend
  const profileData = {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    mobile: "+91 9876543210",
    country: "India",
    age: 32,
    companyName: "Tech Innovations Pvt Ltd",
    industry: "Technology",
    companySize: "50-100 employees",
    totalSpent: "$15,400",
    activeProjects: 3,
    documents: {
      panCard: "Available",
      aadhaarCard: "Available"
    },
    bankDetails: {
      accountNumber: "****6789",
      ifscCode: "HDFC****",
      bankName: "HDFC Bank"
    }
  };

  const jobData = {
    given: [
      {
        id: 1,
        title: "E-commerce Website Development",
        freelancer: "John Doe",
        budget: "$1,200",
        deadline: "Dec 25, 2025",
        status: "new",
        applications: 12,
        description: "Build a modern e-commerce website with React and Node.js"
      },
      {
        id: 2,
        title: "Mobile App UI Design",
        freelancer: null,
        budget: "$800",
        deadline: "Jan 15, 2026",
        status: "new",
        applications: 8,
        description: "Design UI/UX for a social media mobile application"
      }
    ],
    inProgress: [
      {
        id: 3,
        title: "Company Logo Design",
        freelancer: "Alice Smith",
        budget: "$300",
        deadline: "Dec 20, 2025",
        status: "in-progress",
        progress: 60,
        description: "Create a modern logo for a tech company"
      }
    ],
    completed: [
      {
        id: 4,
        title: "WordPress Blog Setup",
        freelancer: "Mike Wilson",
        budget: "$500",
        completedDate: "Nov 28, 2025",
        status: "completed",
        rating: 5,
        description: "Set up and customize a WordPress blog"
      },
      {
        id: 5,
        title: "React Component Library",
        freelancer: "David Brown",
        budget: "$1,500",
        completedDate: "Nov 15, 2025",
        status: "completed",
        rating: 4.5,
        description: "Build a reusable React component library"
      }
    ],
    failed: [
      {
        id: 6,
        title: "Database Migration",
        freelancer: "Tom Anderson",
        budget: "$2,000",
        failedDate: "Oct 30, 2025",
        status: "failed",
        reason: "Freelancer didn't meet requirements",
        description: "Migrate legacy database to modern system"
      }
    ]
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      "new": "bg-blue-100 text-blue-800",
      "in-progress": "bg-orange-100 text-orange-800",
      "completed": "bg-green-100 text-green-800",
      "failed": "bg-red-100 text-red-800"
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.replace("-", " ").toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">Client Dashboard</h1>
            <p className="text-gray-600">Manage your profile and track your projects</p>
          </div>
          <Button 
            onClick={() => setShowJobModal(true)}
            className="bg-orange-400 hover:bg-orange-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto p-1">
            <TabsTrigger value="profile" className="py-3">Profile Details</TabsTrigger>
            <TabsTrigger value="given" className="py-3">Given Jobs</TabsTrigger>
            <TabsTrigger value="in-progress" className="py-3">In Progress</TabsTrigger>
            <TabsTrigger value="completed" className="py-3">Completed</TabsTrigger>
            <TabsTrigger value="failed" className="py-3">Failed</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profile Information</span>
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="text-lg">{profileData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl">{profileData.name}</h3>
                    <p className="text-gray-600">{profileData.companyName}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span>{profileData.activeProjects} active projects</span>
                      <span>Total spent: {profileData.totalSpent}</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg text-gray-900">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{profileData.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{profileData.mobile}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{profileData.country}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Age: {profileData.age}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg text-gray-900">Company Details</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Industry</p>
                        <p>{profileData.industry}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Company Size</p>
                        <p>{profileData.companySize}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Projects Budget</p>
                        <p className="text-lg text-orange-600">{profileData.totalSpent}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-lg text-gray-900">Documents</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>PAN Card:</span>
                        <Badge variant="outline" className="text-green-600">{profileData.documents.panCard}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Aadhaar Card:</span>
                        <Badge variant="outline" className="text-green-600">{profileData.documents.aadhaarCard}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg text-gray-900">Bank Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Account:</span>
                        <span>{profileData.bankDetails.accountNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IFSC:</span>
                        <span>{profileData.bankDetails.ifscCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bank:</span>
                        <span>{profileData.bankDetails.bankName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="given" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl text-gray-900">Given Jobs ({jobs.length})</h2>
              <Button 
                onClick={() => setShowJobModal(true)}
                className="bg-orange-400 hover:bg-orange-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Post New Job
              </Button>
            </div>
            {loading ? (
              <p className="text-gray-600">Loading your jobs...</p>
            ) : (
              <div className="grid gap-4">
                {jobs.filter(job => job.status === 'active').map((job) => (
                  <Card key={job.jobId}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getStatusIcon(job.status)}
                            <h3 className="text-lg">{job.title}</h3>
                            {getStatusBadge(job.status)}
                          </div>
                          <p className="text-gray-600 mb-2">{job.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{job.applicants?.length || 0} applications received</span>
                            <span>Budget: {job.budget}</span>
                            <span>Timeline: {job.timeline}</span>
                            <span>Posted: {new Date(job.postedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm">View Applications ({job.applicants?.length || 0})</Button>
                          <Button size="sm" variant="outline">Edit Job</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl text-gray-900">In Progress Jobs ({jobData.inProgress.length})</h2>
            </div>
            <div className="grid gap-4">
              {jobData.inProgress.map((job) => (
                <Card key={job.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(job.status)}
                          <h3 className="text-lg">{job.title}</h3>
                          {getStatusBadge(job.status)}
                        </div>
                        <p className="text-gray-600 mb-2">{job.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span>Freelancer: {job.freelancer}</span>
                          <span>Budget: {job.budget}</span>
                          <span>Deadline: {job.deadline}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-500 h-2 rounded-full" 
                            style={{ width: `${job.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{job.progress}% completed</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm">Message Freelancer</Button>
                        <Button size="sm" variant="outline">View Progress</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl text-gray-900">Completed Jobs ({jobData.completed.length})</h2>
            </div>
            <div className="grid gap-4">
              {jobData.completed.map((job) => (
                <Card key={job.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(job.status)}
                          <h3 className="text-lg">{job.title}</h3>
                          {getStatusBadge(job.status)}
                        </div>
                        <p className="text-gray-600 mb-2">{job.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Freelancer: {job.freelancer}</span>
                          <span>Budget: {job.budget}</span>
                          <span>Completed: {job.completedDate}</span>
                          <div className="flex items-center space-x-1">
                            <span>Your Rating:</span>
                            <Star className="h-3 w-3 fill-current text-yellow-500" />
                            <span>{job.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Download Files</Button>
                        <Button size="sm" variant="outline">Hire Again</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="failed" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl text-gray-900">Failed Jobs ({jobData.failed.length})</h2>
            </div>
            <div className="grid gap-4">
              {jobData.failed.map((job) => (
                <Card key={job.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusIcon(job.status)}
                          <h3 className="text-lg">{job.title}</h3>
                          {getStatusBadge(job.status)}
                        </div>
                        <p className="text-gray-600 mb-2">{job.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Freelancer: {job.freelancer}</span>
                          <span>Budget: {job.budget}</span>
                          <span>Failed: {job.failedDate}</span>
                        </div>
                        <p className="text-red-600 text-sm mt-2">Reason: {job.reason}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Repost Job</Button>
                        <Button size="sm" variant="outline">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <JobPostingModal
        isOpen={showJobModal}
        onClose={() => setShowJobModal(false)}
        onJobPosted={handleJobPosted}
        clientId={user?.id || ""}
      />
    </div>
  );
}