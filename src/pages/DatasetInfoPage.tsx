
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DatasetInfoPage = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-realestate-dark">Dataset Information</h1>
          <p className="text-lg text-gray-600 text-center mb-12">
            Details about the comprehensive datasets powering our house price predictions
          </p>
          
          <Tabs defaultValue="primary" className="w-full mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="primary">Primary Data</TabsTrigger>
              <TabsTrigger value="auxiliary">Auxiliary Data</TabsTrigger>
              <TabsTrigger value="coverage">Data Coverage</TabsTrigger>
            </TabsList>
            
            <TabsContent value="primary" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Primary Data Sources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Our prediction engine is built on multiple high-quality property datasets:
                  </p>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>
                      <strong>Property Transactions:</strong> Over 15 million verified property sales from 2000-2025
                    </li>
                    <li>
                      <strong>Property Characteristics:</strong> Detailed information on property features, condition, and improvements
                    </li>
                    <li>
                      <strong>Tax Assessment Records:</strong> Official property valuations and tax histories
                    </li>
                    <li>
                      <strong>MLS Listings:</strong> Current and historical listing data including days on market and price changes
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="auxiliary" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Auxiliary Data Sources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    To enhance prediction accuracy, we incorporate several auxiliary datasets:
                  </p>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>
                      <strong>Census & Demographic Data:</strong> Population trends, income levels, and household compositions
                    </li>
                    <li>
                      <strong>School Performance Metrics:</strong> Standardized test scores, graduation rates, and school ratings
                    </li>
                    <li>
                      <strong>Crime Statistics:</strong> Incident rates by type and location
                    </li>
                    <li>
                      <strong>Economic Indicators:</strong> Employment rates, wage growth, and industry presence
                    </li>
                    <li>
                      <strong>Amenity Proximity:</strong> Distance to shopping, parks, public transportation, and other amenities
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="coverage" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Coverage</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Our dataset provides comprehensive coverage across multiple geographic levels:
                  </p>
                  <ul className="list-disc pl-6 space-y-3">
                    <li>
                      <strong>Metropolitan Coverage:</strong> All major U.S. metropolitan areas with populations over 100,000
                    </li>
                    <li>
                      <strong>Suburban Coverage:</strong> Extensive data for suburban communities within major metropolitan areas
                    </li>
                    <li>
                      <strong>Rural Coverage:</strong> Select coverage of rural markets with sufficient transaction volume
                    </li>
                    <li>
                      <strong>International Expansion:</strong> Currently piloting data collection in select Canadian and UK markets
                    </li>
                  </ul>
                  <p className="mt-4">
                    Our dataset is continuously expanding, with approximately 50,000 new property transactions added monthly.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Data Quality & Maintenance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We maintain strict quality standards for all data used in our prediction models:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>Regular data validation and cleaning procedures</li>
                <li>Automated anomaly detection to flag suspicious data points</li>
                <li>Manual review of outliers and unusual property characteristics</li>
                <li>Monthly data refreshes to incorporate the latest market activities</li>
                <li>Quarterly retraining of prediction models on updated datasets</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default DatasetInfoPage;
