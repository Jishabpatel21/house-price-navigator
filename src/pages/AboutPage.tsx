
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <PageLayout>
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-realestate-dark mb-4">About House Price Navigator</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Leveraging advanced machine learning to provide accurate and reliable house price predictions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-realestate-dark">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                House Price Navigator was created with a simple mission: to make accurate real estate valuation accessible to everyone. We believe that transparency in housing markets empowers better decisions for homeowners, buyers, sellers, and investors alike.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-realestate-dark">Our Technology</h2>
              <p className="text-gray-600 mb-4">
                Our prediction engine uses state-of-the-art machine learning algorithms trained on comprehensive datasets that include:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-600 mb-6">
                <li>Historical sales data from thousands of transactions</li>
                <li>Neighborhood and location-specific market trends</li>
                <li>Property characteristics and amenity valuations</li>
                <li>Economic indicators that influence housing markets</li>
                <li>Seasonal and cyclical market patterns</li>
              </ul>
              
              <p className="text-gray-600">
                Our models undergo continuous refinement and validation against actual market transactions to ensure the highest possible accuracy in our predictions.
              </p>
            </div>
            
            <div>
              <Card className="mb-8">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-realestate-dark">Why Trust Our Predictions?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">
                        <strong>93% Accuracy</strong> on price predictions within 5% of actual selling price
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">
                        <strong>Continuous Learning</strong> system that improves with each new market transaction
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">
                        <strong>Local Market Expertise</strong> with neighborhood-specific data analysis
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">
                        <strong>Transparent Methodology</strong> that explains the factors behind each prediction
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <h2 className="text-2xl font-semibold mb-4 text-realestate-dark">Our Team</h2>
              <p className="text-gray-600 mb-6">
                House Price Navigator was developed by a multidisciplinary team of data scientists, real estate professionals, and software engineers with a passion for bringing data-driven insights to the housing market.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4 text-realestate-dark">Contact Us</h2>
              <p className="text-gray-600">
                Have questions or feedback about our platform? We'd love to hear from you! Reach out to our team at <a href="mailto:info@housepricenavigator.com" className="text-realestate-primary hover:underline">info@housepricenavigator.com</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutPage;
