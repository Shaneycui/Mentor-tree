import React from 'react';
import { TreePine, Users, MessageCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
        Welcome to Mentor Tree
      </h1>
      <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
        Your platform for career development and professional guidance
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <FeatureCard
          title="Career Path Visualization"
          description="Explore and plan your career progression with interactive visualizations"
          icon={<TreePine className="h-8 w-8 text-emerald-600" />}
        />
        <FeatureCard
          title="Connect with Mentors"
          description="Find and connect with experienced professionals in your field"
          icon={<Users className="h-8 w-8 text-emerald-600" />}
        />
        <FeatureCard
          title="Q&A Platform"
          description="Get answers to your career questions from the community"
          icon={<MessageCircle className="h-8 w-8 text-emerald-600" />}
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon }: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}