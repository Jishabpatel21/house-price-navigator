
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ApiDocsPage = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-realestate-dark">API Documentation</h1>
          <p className="text-lg text-gray-600 text-center mb-12">
            Integrate our property price prediction capabilities into your applications
          </p>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                Basic information to begin using our API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-semibold">Authentication</h3>
              <p className="mb-4">
                All API requests require authentication using an API key. You can obtain an API key by registering for a developer account.
              </p>
              
              <div className="bg-gray-100 p-4 rounded-md font-mono text-sm mb-4">
                <p className="text-gray-600">Example Authentication Header:</p>
                <p className="text-gray-800">Authorization: Bearer YOUR_API_KEY</p>
              </div>
              
              <h3 className="text-lg font-semibold mt-6">Base URL</h3>
              <p>All API endpoints are relative to the following base URL:</p>
              <div className="bg-gray-100 p-4 rounded-md font-mono text-sm">
                <p className="text-gray-800">https://api.housepricenavigator.com/v1</p>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="endpoints" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
              <TabsTrigger value="models">Data Models</TabsTrigger>
              <TabsTrigger value="errors">Errors</TabsTrigger>
            </TabsList>
            
            <TabsContent value="endpoints" className="mt-8">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Price Prediction</CardTitle>
                  <CardDescription>
                    Predict property prices based on property characteristics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded mr-2">POST</span>
                      <span className="font-mono text-sm">/predict</span>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold mt-4">Request Parameters</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 mt-2">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 text-sm">
                        <tr>
                          <td className="px-4 py-2">address</td>
                          <td className="px-4 py-2">string</td>
                          <td className="px-4 py-2">Yes</td>
                          <td className="px-4 py-2">Full property address</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">bedrooms</td>
                          <td className="px-4 py-2">integer</td>
                          <td className="px-4 py-2">Yes</td>
                          <td className="px-4 py-2">Number of bedrooms</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">bathrooms</td>
                          <td className="px-4 py-2">float</td>
                          <td className="px-4 py-2">Yes</td>
                          <td className="px-4 py-2">Number of bathrooms</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">squareFeet</td>
                          <td className="px-4 py-2">integer</td>
                          <td className="px-4 py-2">Yes</td>
                          <td className="px-4 py-2">Total interior square footage</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">lotSize</td>
                          <td className="px-4 py-2">float</td>
                          <td className="px-4 py-2">No</td>
                          <td className="px-4 py-2">Lot size in acres</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <h4 className="font-semibold mt-6">Response</h4>
                  <div className="bg-gray-100 p-4 rounded-md font-mono text-sm mt-2">
                    <pre>{`{
  "predictedPrice": 450000,
  "confidenceInterval": {
    "low": 425000,
    "high": 475000
  },
  "comparableProperties": [
    {
      "address": "123 Similar St",
      "salePrice": 460000,
      "saleDate": "2025-01-15"
    },
    ...
  ]
}`}</pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Historical Prices</CardTitle>
                  <CardDescription>
                    Retrieve historical price data for a specific property
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded mr-2">GET</span>
                      <span className="font-mono text-sm">/properties/{'{propertyId}'}/history</span>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold mt-4">Path Parameters</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 mt-2">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parameter</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 text-sm">
                        <tr>
                          <td className="px-4 py-2">propertyId</td>
                          <td className="px-4 py-2">string</td>
                          <td className="px-4 py-2">Unique identifier for the property</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <h4 className="font-semibold mt-6">Response</h4>
                  <div className="bg-gray-100 p-4 rounded-md font-mono text-sm mt-2">
                    <pre>{`{
  "property": {
    "id": "prop_12345",
    "address": "123 Main St, Anytown, USA"
  },
  "priceHistory": [
    {
      "date": "2025-01-15",
      "price": 450000,
      "event": "sale"
    },
    {
      "date": "2020-07-10",
      "price": 375000,
      "event": "sale"
    },
    ...
  ]
}`}</pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="models" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Data Models</CardTitle>
                  <CardDescription>
                    Detailed information about the structure of API request and response objects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold">Property</h4>
                  <div className="bg-gray-100 p-4 rounded-md font-mono text-sm mt-2 mb-6">
                    <pre>{`{
  "id": "string",          // Unique property identifier
  "address": "string",     // Full property address
  "location": {
    "lat": "float",        // Latitude coordinates
    "lng": "float"         // Longitude coordinates
  },
  "bedrooms": "integer",   // Number of bedrooms
  "bathrooms": "float",    // Number of bathrooms
  "squareFeet": "integer", // Interior square footage
  "lotSize": "float",      // Lot size in acres
  "yearBuilt": "integer",  // Year property was built
  "propertyType": "string" // Type of property (e.g., "single_family")
}`}</pre>
                  </div>
                  
                  <h4 className="font-semibold">Prediction</h4>
                  <div className="bg-gray-100 p-4 rounded-md font-mono text-sm mt-2 mb-6">
                    <pre>{`{
  "predictedPrice": "integer",   // Predicted property value
  "confidenceInterval": {
    "low": "integer",            // Lower bound of prediction interval
    "high": "integer"            // Upper bound of prediction interval
  },
  "factors": [                   // Factors influencing the prediction
    {
      "name": "string",          // Name of the factor
      "impact": "float",         // Impact on prediction (-1.0 to 1.0)
      "description": "string"    // Description of the factor's impact
    }
  ],
  "comparableProperties": [      // Similar properties used for comparison
    { ... Property ... }
  ]
}`}</pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="errors" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Error Handling</CardTitle>
                  <CardDescription>
                    Standard error responses and troubleshooting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    All errors follow a standard format to help with debugging and error handling:
                  </p>
                  
                  <div className="bg-gray-100 p-4 rounded-md font-mono text-sm mb-6">
                    <pre>{`{
  "error": {
    "code": "string",      // Error code
    "message": "string",   // Human-readable error message
    "details": { }         // Additional information about the error
  }
}`}</pre>
                  </div>
                  
                  <h4 className="font-semibold mt-4">Common Error Codes</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 mt-2">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 text-sm">
                        <tr>
                          <td className="px-4 py-2">authentication_error</td>
                          <td className="px-4 py-2">Invalid or missing API key</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">validation_error</td>
                          <td className="px-4 py-2">Invalid or missing request parameters</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">not_found</td>
                          <td className="px-4 py-2">Requested resource was not found</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">geocoding_error</td>
                          <td className="px-4 py-2">Unable to geocode the provided address</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">rate_limit_exceeded</td>
                          <td className="px-4 py-2">API request rate limit exceeded</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2">internal_error</td>
                          <td className="px-4 py-2">Unexpected server error</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default ApiDocsPage;
