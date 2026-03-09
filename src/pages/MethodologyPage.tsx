
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MethodologyPage = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-realestate-dark">Our Methodology</h1>
          <p className="text-lg text-gray-600 text-center mb-12">
            Learn about the advanced algorithms and data science techniques powering our house price prediction platform
          </p>
          
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Machine Learning Model</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our prediction system uses a sophisticated ensemble of gradient boosting algorithms, 
                  primarily leveraging XGBoost and LightGBM to capture complex relationships in housing data.
                </p>
                <p>
                  These models are trained on millions of historical property transactions, allowing them to identify
                  patterns and correlations that impact house prices across different markets.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Data Processing Pipeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Raw property data undergoes extensive preprocessing before being used for predictions:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Missing value imputation using advanced statistical methods</li>
                  <li>Outlier detection and handling to ensure model robustness</li>
                  <li>Feature engineering to create meaningful variables</li>
                  <li>Normalization and standardization of numerical features</li>
                  <li>Encoding of categorical variables using target encoding</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Feature Importance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our models analyze over 100 different property characteristics and market factors, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Property size, age, and condition metrics</li>
                  <li>Location data at multiple geographic levels</li>
                  <li>Neighborhood amenities and school quality scores</li>
                  <li>Economic indicators and market trends</li>
                  <li>Comparable property transaction history</li>
                </ul>
                <p className="mt-4">
                  Each feature's importance is regularly evaluated and updated as market dynamics change.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Model Validation & Accuracy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We employ rigorous validation techniques to ensure our predictions remain accurate:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cross-validation across multiple geographic regions and time periods</li>
                  <li>Regular backtesting against new transaction data</li>
                  <li>Error analysis to identify and address prediction weaknesses</li>
                  <li>Continuous model retraining as new data becomes available</li>
                </ul>
                <p className="mt-4">
                  Our current models achieve a median error rate of less than 3.5% across major metropolitan markets.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MethodologyPage;
