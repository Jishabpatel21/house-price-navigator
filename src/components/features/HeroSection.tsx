
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-realestate-dark mb-4">
              Predict House Prices with AI Precision
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Our advanced machine learning algorithms analyze multiple factors to deliver accurate home value estimates based on location, size, features, and market trends.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-realestate-primary hover:bg-realestate-secondary">
                <Link to="/predict" className="flex items-center">
                  Get Your Estimate
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                <Link to="/analytics">Explore Market Trends</Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-realestate-primary rounded-xl transform translate-x-3 translate-y-3 opacity-20"></div>
            <div className="relative bg-white p-6 rounded-xl shadow-lg">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-md mb-6">
                <div className="h-full w-full rounded-md bg-gradient-to-r from-slate-200 to-slate-100 animate-pulse flex items-center justify-center">
                  <span className="text-gray-400">House Analytics Preview</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                <div className="flex justify-between items-center mt-2">
                  <div className="h-8 bg-realestate-primary rounded-md w-1/3"></div>
                  <div className="h-6 bg-slate-200 rounded-md w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
