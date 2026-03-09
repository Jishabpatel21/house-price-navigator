
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import PredictionForm from '@/components/features/PredictionForm';
import MapView from '@/components/features/MapView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const PredictPage = () => {
  const handleShare = async () => {
    try {
      // Try using Web Share API if available
      if (navigator.share) {
        await navigator.share({
          title: 'Property Price Predictor',
          text: 'Check out this accurate house price prediction tool for the real estate market!',
          url: window.location.href,
        });
        toast.success("Shared successfully!");
      } else {
        // Fallback for browsers that don't support the Web Share API
        await navigator.clipboard.writeText(window.location.href);
        toast.success("URL copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Failed to share content");
    }
  };

  return (
    <PageLayout>
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 relative">
            <div className="absolute right-0 top-0 flex items-center space-x-2">
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleShare} 
                className="flex items-center"
              >
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
            </div>
            <h1 className="text-3xl font-bold text-realestate-dark dark:text-white mb-4">Property Price Predictor</h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Enter your property details below to get an accurate estimate of your home's market value using our advanced machine learning algorithm.
            </p>
          </div>
          
          <Tabs defaultValue="predict" className="w-full max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="predict">Predict Price</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
            </TabsList>
            <TabsContent value="predict">
              <PredictionForm />
            </TabsContent>
            <TabsContent value="map">
              <MapView />
            </TabsContent>
          </Tabs>
          
          <div className="mt-16 bg-blue-50 dark:bg-blue-950 rounded-lg p-6 max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold mb-3 text-realestate-dark dark:text-white">About Our Property Prediction Model</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our house price prediction model uses advanced machine learning techniques trained on extensive real estate data. The model incorporates multiple factors including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-4">
              <li>Property characteristics (size, bedrooms, bathrooms)</li>
              <li>Location data across major cities and neighborhoods</li>
              <li>Historical sales data from real estate transactions</li>
              <li>Economic indicators specific to the market</li>
              <li>Proximity to amenities, schools, and transportation</li>
            </ul>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Note: This prediction is an estimate based on available data and market trends. Actual selling prices may vary based on additional factors not captured in the model, including property condition, unique features, and negotiation factors.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default PredictPage;
