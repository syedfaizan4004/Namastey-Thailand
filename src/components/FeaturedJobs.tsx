import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Clock, MapPin, DollarSign } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { jobAPI } from "../utils/api";

const featuredJobs = [
  {
    id: 1,
    title: "E-commerce Website Development",
    description: "Looking for an experienced React developer to build a modern e-commerce platform with payment integration.",
    budget: "$2,500 - $5,000",
    duration: "2-3 months",
    location: "Remote",
    skills: ["React", "Node.js", "MongoDB", "Stripe"],
    postedBy: "TechStartup Inc.",
    avatar: "https://images.unsplash.com/photo-1745434159123-4908d0b9df94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzU5NDc5NDcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    proposals: 12,
    urgent: true
  },
  {
    id: 2,
    title: "Brand Identity & Logo Design",
    description: "Need a creative designer to develop a complete brand identity including logo, business cards, and style guide.",
    budget: "$800 - $1,500",
    duration: "3-4 weeks",
    location: "Remote",
    skills: ["Adobe Illustrator", "Photoshop", "Brand Design"],
    postedBy: "Marketing Agency",
    avatar: "https://images.unsplash.com/photo-1740059020488-ba2541d7f907?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwZGVzaWduJTIwY3JlYXRpdmV8ZW58MXx8fHwxNzU5NDIzODM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    proposals: 8,
    urgent: false
  },
  {
    id: 3,
    title: "Mobile App UI/UX Design",
    description: "Seeking a talented UI/UX designer to create intuitive designs for our fitness tracking mobile application.",
    budget: "$1,200 - $2,000",
    duration: "4-6 weeks",
    location: "Remote",
    skills: ["Figma", "UI/UX Design", "Mobile Design"],
    postedBy: "Fitness Co.",
    avatar: "https://images.unsplash.com/photo-1593720213681-e9a8778330a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NTk0MDM5Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    proposals: 15,
    urgent: false
  },
  {
    id: 4,
    title: "Digital Marketing Campaign",
    description: "Looking for a digital marketing expert to create and manage social media campaigns for our product launch.",
    budget: "$1,000 - $3,000",
    duration: "1-2 months",
    location: "Remote",
    skills: ["Social Media", "Google Ads", "SEO", "Analytics"],
    postedBy: "E-commerce Store",
    avatar: "https://images.unsplash.com/photo-1707301280380-56f7e7a00aef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hcmtldGluZyUyMHN0cmF0ZWd5fGVufDF8fHx8MTc1OTM5Mjc1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    proposals: 6,
    urgent: true
  }
];

export function FeaturedJobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        const response = await jobAPI.getFeatured();
        setJobs(response.jobs);
      } catch (error) {
        // Silently fail - fall back to default demo jobs
        // Backend unavailable, using demo data
        setJobs(featuredJobs);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedJobs();
  }, []);

  const jobsToDisplay = jobs.length > 0 ? jobs : featuredJobs;

  return (
    <section id="featured-jobs" className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
            Featured jobs
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover high-quality projects from verified clients
          </p>
        </div>

        {loading ? (
          <div className="text-center">
            <p className="text-gray-600">Loading featured jobs...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {jobsToDisplay.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm border border-blue-100/50">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl text-gray-900">{job.title}</h3>
                      {job.urgent && (
                        <Badge variant="destructive" className="text-xs">Urgent</Badge>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">{job.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4" />
                    <span>{job.budget || `${job.paymentType === 'hourly' ? job.budget + '/hr' : job.budget}`}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{job.duration || job.timeline}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location || "Remote"}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {(job.skills || job.skillsRequired || []).map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <ImageWithFallback 
                      src={job.avatar || "https://images.unsplash.com/photo-1745434159123-4908d0b9df94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHNtaWxpbmd8ZW58MXx8fHwxNzU5NDc5NDcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"}
                      alt={job.postedBy || "Client"}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm text-gray-900">{job.postedBy || "Client"}</div>
                      <div className="text-xs text-gray-600">{job.proposals || job.applicants?.length || 0} proposals</div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-orange-400 hover:bg-orange-500">
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Jobs
          </Button>
        </div>
      </div>
    </section>
  );
}