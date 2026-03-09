
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import HeroSection from '@/components/features/HeroSection';
import FeatureSection from '@/components/features/FeatureSection';
import MarketTrends from '@/components/features/MarketTrends';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  // Sample trend data for the MarketTrends component
  const marketTrendData = {
    title: "Indian Housing Market",
    description: "Current market trends in major Indian metropolitan areas",
    currentValue: 8500000, // ₹85 lakhs
    previousValue: 7800000, // ₹78 lakhs
    trendData: [6500000, 6800000, 7200000, 7500000, 7800000, 8100000, 8300000, 8500000]
  };

  return (
    <PageLayout>
      <HeroSection />
      <FeatureSection />
      
      {/* How It Works Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-realestate-dark">
            How Our Price Prediction Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-realestate-primary text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-3">Input Property Details</h3>
              <p className="text-gray-600">Enter information about the property including location, size, bedrooms, and features.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-realestate-primary text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-3">AI Analysis</h3>
              <p className="text-gray-600">Our machine learning model analyzes the data against market trends and similar properties.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-realestate-primary text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-3">Get Accurate Prediction</h3>
              <p className="text-gray-600">Receive a detailed pricing estimate with supporting market analytics and visuals.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" className="bg-realestate-primary hover:bg-realestate-secondary">
              <Link to="/predict">Try It Now</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-realestate-dark">
          Latest Market Trends
        </h2>
        <MarketTrends 
          title={marketTrendData.title}
          description={marketTrendData.description}
          currentValue={marketTrendData.currentValue}
          previousValue={marketTrendData.previousValue}
          trendData={marketTrendData.trendData}
        />
      </div>
      
      {/* Testimonial Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-realestate-dark">
            What Our Users Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">"The prediction was spot on! Sold my house within 2% of the estimated price. Incredibly useful for setting realistic expectations."</p>
              <p className="font-medium">- Sarah Johnson</p>
              <p className="text-sm text-gray-500">Home Seller</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">"As a real estate agent, this tool helps me provide quick estimates to clients. The neighborhood analytics are especially valuable."</p>
              <p className="font-medium">- Michael Rodriguez</p>
              <p className="text-sm text-gray-500">Real Estate Agent</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4">"I'm an investor and use this tool to quickly assess potential properties. The market trend analysis helps me identify opportunities."</p>
              <p className="font-medium">- Jennifer Liu</p>
              <p className="text-sm text-gray-500">Real Estate Investor</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-realestate-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Get Your House Price Prediction?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of homeowners, buyers, sellers, and real estate professionals who rely on our accurate ML-powered predictions.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-realestate-primary hover:bg-gray-100">
            <Link to="/predict">Get Started Now</Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
