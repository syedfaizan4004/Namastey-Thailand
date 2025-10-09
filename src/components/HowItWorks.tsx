import { Card, CardContent } from "./ui/card";
import { UserPlus, Search, MessageCircle, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Create Your Profile",
    description: "Sign up and build a compelling profile showcasing your skills, experience, and portfolio."
  },
  {
    icon: Search,
    step: "02", 
    title: "Find Perfect Projects",
    description: "Browse thousands of projects or get matched with jobs that fit your expertise."
  },
  {
    icon: MessageCircle,
    step: "03",
    title: "Submit Proposals",
    description: "Write winning proposals and communicate directly with clients to discuss project details."
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Complete & Get Paid",
    description: "Deliver quality work, get approved by clients, and receive secure payments."
  }
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-gradient-to-br from-white to-blue-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in minutes and find your next opportunity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="text-center">
                <Card className="border-2 border-gray-100 hover:border-orange-200 transition-colors">
                  <CardContent className="p-6">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="h-8 w-8 text-orange-400" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 text-white rounded-full flex items-center justify-center text-sm">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="text-xl text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
                
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full w-8 h-0.5 bg-gray-200 transform -translate-y-1/2" 
                       style={{ marginLeft: '1rem', marginRight: '1rem' }} />
                )}
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
}