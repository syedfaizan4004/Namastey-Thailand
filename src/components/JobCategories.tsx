import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Code, Palette, Megaphone, PenTool, Plane, BarChart3, Camera, DollarSign } from "lucide-react";
import { freelancerAPI } from "../utils/api";

const categories = [
  {
    icon: Code,
    title: "Development & IT",
    description: "Web, mobile, software development",
    jobCount: "2,847 jobs"
  },
  {
    icon: Palette,
    title: "Design & Creative",
    description: "Logo, web design, illustration",
    jobCount: "1,523 jobs"
  },
  {
    icon: Megaphone,
    title: "Sales & Marketing",
    description: "Digital marketing, SEO, social media",
    jobCount: "934 jobs"
  },
  {
    icon: PenTool,
    title: "Writing & Translation",
    description: "Content writing, copywriting, translation",
    jobCount: "756 jobs"
  },
  {
    icon: Plane,
    title: "Tour & Travels",
    description: "Tour Planners, Tour Assistance and Bookings",
    jobCount: "612 jobs"
  },
  {
    icon: BarChart3,
    title: "Data & Analytics",
    description: "Data analysis, visualization, research",
    jobCount: "445 jobs"
  },
  {
    icon: Camera,
    title: "Video & Photography",
    description: "Video Editing, Photography, content videos",
    jobCount: "389 jobs"
  },
  {
    icon: DollarSign,
    title: "Finance & Consulting",
    description: "Accounts, Finance, Tax and Other Financial Plannings",
    jobCount: "234 jobs"
  }
];

export function JobCategories() {
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const response = await freelancerAPI.getCategoryCounts();
        setCategoryCounts(response.categories);
      } catch (error) {
        // Silently fail - use default static counts
        // Backend unavailable, using demo data
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryCounts();
  }, []);

  const handleCategoryClick = (categoryTitle: string) => {
    // Category clicked - could navigate to jobs page or show job listings
    console.log(`Category clicked: ${categoryTitle}`);
  };

  return (
    <section id="job-categories" className="py-20 bg-blue-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
              Browse jobs by category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find opportunities in your area of expertise or explore new fields
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card 
                  key={index} 
                  className="hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-orange-200 bg-white/90 backdrop-blur-sm"
                  onClick={() => handleCategoryClick(category.title)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-orange-400" />
                      </div>
                    </div>
                    <h3 className="text-lg text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                    <p className="text-orange-400 text-sm">
                      {category.jobCount}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
  );
}