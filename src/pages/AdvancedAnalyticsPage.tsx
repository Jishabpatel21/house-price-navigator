
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Share2 } from "lucide-react";
import { toast } from "sonner";
import { formatIndianPrice, getSubscriptionPrice } from '@/utils/subscriptionUtils';

const AdvancedAnalyticsPage = () => {
  const navigate = useNavigate();
  
  // Store subscription selection in localStorage if user subscribes
  const handleSubscribe = (plan: string) => {
    navigate(`/payment/${plan.toLowerCase()}`);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Advanced Real Estate Analytics',
          text: 'Check out these premium analytics services for the real estate market!',
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support the Web Share API
        await navigator.clipboard.writeText(window.location.href);
        toast.success("URL copied to clipboard!");
      }
    } catch (error) {
      toast.error("Failed to share content");
      console.error("Error sharing:", error);
    }
  };

  // Initialize userSubscription in localStorage if it doesn't exist
  useEffect(() => {
    if (!localStorage.getItem('userSubscription')) {
      localStorage.setItem('userSubscription', JSON.stringify({
        active: false,
        plan: null,
        expiresAt: null
      }));
    }
    
    // Initialize freePredictions in localStorage if it doesn't exist
    if (!localStorage.getItem('freePredictions')) {
      localStorage.setItem('freePredictions', '3');
    }
  }, []);

  return (
    <PageLayout>
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 relative">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleShare} 
              className="absolute right-0 top-0"
            >
              <Share2 className="h-4 w-4 mr-2" /> Share
            </Button>
            <h1 className="text-3xl font-bold text-realestate-dark mb-4">Advanced Analytics Subscription</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get premium insights and personalized reports for the real estate market with our advanced analytics plans.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Basic Analytics</CardTitle>
                <CardDescription>For casual investors and first-time homebuyers</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{formatIndianPrice(getSubscriptionPrice('basic'))}</span>
                  <span className="text-sm text-gray-500 ml-1">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>30 property price predictions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Access to 10 locations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Monthly market trend reports</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Basic neighborhood comparison</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Email support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleSubscribe("Basic")}>
                  Subscribe Now
                </Button>
              </CardFooter>
            </Card>
            
            {/* Premium Plan */}
            <Card className="border-2 border-realestate-primary relative hover:shadow-lg transition-shadow">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-realestate-primary text-white px-3 py-1 text-xs font-semibold rounded-full">
                Most Popular
              </div>
              <CardHeader>
                <CardTitle className="text-xl">Premium Analytics</CardTitle>
                <CardDescription>For serious property investors and agents</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{formatIndianPrice(getSubscriptionPrice('premium'))}</span>
                  <span className="text-sm text-gray-500 ml-1">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>100 property price predictions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Access to 50+ locations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Weekly detailed market reports</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Investment opportunity alerts</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Priority email & phone support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-realestate-primary hover:bg-realestate-secondary" onClick={() => handleSubscribe("Premium")}>
                  Subscribe Now
                </Button>
              </CardFooter>
            </Card>
            
            {/* Enterprise Plan */}
            <Card className="border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Enterprise Analytics</CardTitle>
                <CardDescription>For developers and institutional investors</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{formatIndianPrice(getSubscriptionPrice('enterprise'))}</span>
                  <span className="text-sm text-gray-500 ml-1">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Unlimited property price predictions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Access to unlimited locations</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Daily market updates</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Custom analytics dashboard</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>API access to raw data</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                    <span>Quarterly strategy consultation</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleSubscribe("Enterprise")}>
                  Subscribe Now
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="mt-16 bg-blue-50 p-6 rounded-lg max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold mb-3 text-realestate-dark">Why Subscribe to Advanced Analytics?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">For Individual Buyers & Sellers:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Find the perfect time to buy or sell in your target area</li>
                  <li>Discover undervalued properties with highest appreciation potential</li>
                  <li>Understand price factors specific to neighborhoods</li>
                  <li>Get tailored recommendations based on your budget and preferences</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">For Investors & Developers:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Identify emerging high-growth areas before the market surge</li>
                  <li>Analyze development potential with demographic insights</li>
                  <li>Track policy changes affecting real estate investments</li>
                  <li>Generate detailed ROI projections for property portfolios</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              All plans include a 14-day money-back guarantee. Cancel anytime. Prices are exclusive of GST (18%).
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdvancedAnalyticsPage;
