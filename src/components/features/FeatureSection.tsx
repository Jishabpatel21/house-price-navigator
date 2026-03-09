
import React from 'react';
import { MapPin, Home, BarChart3, Search } from "lucide-react";

const features = [
  {
    icon: <MapPin className="h-8 w-8 text-realestate-primary" />,
    title: "Location Analysis",
    description: "Get accurate predictions based on neighborhood trends, proximity to amenities, and regional market conditions."
  },
  {
    icon: <Home className="h-8 w-8 text-realestate-primary" />,
    title: "Property Features",
    description: "Our model factors in size, bedrooms, bathrooms, age, and special amenities to refine prediction accuracy."
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-realestate-primary" />,
    title: "Market Insights",
    description: "Access visual analytics showing market trends, historical price changes, and future forecast projections."
  },
  {
    icon: <Search className="h-8 w-8 text-realestate-primary" />,
    title: "Smart Comparison",
    description: "Compare your property with similar listings in the area to understand its competitive position."
  }
];

const FeatureSection = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-realestate-dark">
          Smart Features, Accurate Predictions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="p-3 bg-blue-50 inline-block rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-realestate-dark">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
