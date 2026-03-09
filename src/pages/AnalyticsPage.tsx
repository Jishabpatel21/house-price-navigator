
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

// Realistic data for Indian real estate market
const priceHistoryData = [
  { year: '2013', price: 4500000 },  // Base year price
  { year: '2014', price: 4820000 },  // 7% growth
  { year: '2015', price: 5250000 },  // 9% growth
  { year: '2016', price: 5780000 },  // 10% growth
  { year: '2017', price: 6350000 },  // 10% growth
  { year: '2018', price: 6920000 },  // 9% growth
  { year: '2019', price: 7450000 },  // 7.5% growth
  { year: '2020', price: 7850000 },  // 5% growth (COVID impact)
  { year: '2021', price: 8640000 },  // 10% growth (recovery)
  { year: '2022', price: 9350000 },  // 8% growth
  { year: '2023', price: 9850000 },  // 5% growth
];

const neighborhoodData = [
  { name: 'South Delhi', value: 25000000 },  // Premium location
  { name: 'Gurgaon', value: 12500000 },      // Business hub
  { name: 'Noida', value: 9200000 },         // Growing tech area
  { name: 'Greater Noida', value: 7500000 }, // More affordable
  { name: 'Faridabad', value: 6300000 },     // Industrial area
  { name: 'Ghaziabad', value: 5800000 },     // Affordable option
];

const bedroomPriceData = [
  { bedrooms: '1 BHK', price: 4800000 },   // Entry-level
  { bedrooms: '2 BHK', price: 7500000 },   // Most common
  { bedrooms: '3 BHK', price: 12200000 },  // Mid-range
  { bedrooms: '4 BHK', price: 18500000 },  // Upper mid-range
  { bedrooms: '5 BHK', price: 25000000 },  // Premium
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AnalyticsPage = () => {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Indian Real Estate Market Analytics',
          text: 'Check out these insights on the Indian housing market!',
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

  // Function to format price in Indian currency format (lakhs and crores)
  const formatIndianPrice = (price: number): string => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lakh`;
    } else {
      return `₹${price.toLocaleString('en-IN')}`;
    }
  };

  return (
    <PageLayout>
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 relative">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleShare} 
              className="absolute right-0 top-0"
            >
              <Share2 className="h-4 w-4 mr-2" /> Share
            </Button>
            <h1 className="text-3xl font-bold text-realestate-dark mb-4">Indian Market Analytics</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore housing market trends, price movements, and insights to make informed real estate decisions in the Indian market.
            </p>
          </div>
          
          <Tabs defaultValue="price-trends" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3">
              <TabsTrigger value="price-trends">Price Trends</TabsTrigger>
              <TabsTrigger value="neighborhood">Neighborhood</TabsTrigger>
              <TabsTrigger value="property-features">Property Features</TabsTrigger>
            </TabsList>
            
            <div className="mt-8">
              <TabsContent value="price-trends">
                <Card>
                  <CardHeader>
                    <CardTitle>Historical Price Trends (2013-2023)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-96">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={priceHistoryData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis 
                            tickFormatter={(value) => 
                              value >= 10000000 ? `₹${value/10000000}Cr` : `₹${value/100000}L`
                            } 
                          />
                          <Tooltip 
                            formatter={(value) => {
                              const price = Number(value);
                              return [formatIndianPrice(price), 'Average Price'];
                            }} 
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="price" 
                            name="Average Home Price" 
                            stroke="#2563eb" 
                            activeDot={{ r: 8 }} 
                            strokeWidth={2} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="mt-6 bg-gray-50 p-4 rounded-md">
                      <h3 className="font-medium mb-2">Key Insights:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600">
                        <li>Property prices in Indian metros have increased 119% over the past decade</li>
                        <li>The steepest annual increase (10.1%) occurred between 2020-2021 post-pandemic</li>
                        <li>Growth has begun to stabilize around 5-7% annually in recent years</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="neighborhood">
                <Card>
                  <CardHeader>
                    <CardTitle>Average Home Prices by Neighborhood (Delhi NCR)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={neighborhoodData}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                              type="number" 
                              tickFormatter={(value) => 
                                value >= 10000000 ? `₹${value/10000000}Cr` : `₹${value/100000}L`
                              } 
                            />
                            <YAxis type="category" dataKey="name" />
                            <Tooltip 
                              formatter={(value) => {
                                const price = Number(value);
                                return [formatIndianPrice(price), 'Average Price'];
                              }} 
                            />
                            <Bar dataKey="value" name="Price" fill="#2563eb" barSize={20} radius={[0, 4, 4, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={neighborhoodData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {neighborhoodData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              formatter={(value) => {
                                const price = Number(value);
                                return [formatIndianPrice(price), 'Average Price'];
                              }} 
                            />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-gray-50 p-4 rounded-md">
                      <h3 className="font-medium mb-2">Neighborhood Analysis:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-600">
                        <li>South Delhi commands the highest prices due to prime location and prestige</li>
                        <li>Noida shows strong growth potential with upcoming infrastructure projects</li>
                        <li>Greater Noida remains the most affordable area with emerging development opportunities</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="property-features">
                <Card>
                  <CardHeader>
                    <CardTitle>Price Distribution by Property Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={bedroomPriceData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="bedrooms" />
                          <YAxis 
                            tickFormatter={(value) => 
                              value >= 10000000 ? `₹${value/10000000}Cr` : `₹${value/100000}L`
                            } 
                          />
                          <Tooltip 
                            formatter={(value) => {
                              const price = Number(value);
                              return [formatIndianPrice(price), 'Average Price'];
                            }} 
                          />
                          <Bar dataKey="price" name="Average Price" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                      <div className="bg-blue-50 p-4 rounded-md">
                        <h3 className="font-medium mb-2">Feature Premium Analysis:</h3>
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Feature</th>
                              <th className="text-right py-2">Avg. Price Premium</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-2">Swimming Pool</td>
                              <td className="text-right py-2">+₹15,00,000</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">Parking (2-car)</td>
                              <td className="text-right py-2">+₹8,50,000</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">Modular Kitchen</td>
                              <td className="text-right py-2">+₹5,50,000</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">Power Backup</td>
                              <td className="text-right py-2">+₹3,75,000</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-md">
                        <h3 className="font-medium mb-2">Price Per Square Foot:</h3>
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-2">Area</th>
                              <th className="text-right py-2">Price/Sq.Ft.</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-2">South Delhi</td>
                              <td className="text-right py-2">₹32,000</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">Gurgaon</td>
                              <td className="text-right py-2">₹15,500</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">Noida</td>
                              <td className="text-right py-2">₹7,200</td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-2">Greater Noida</td>
                              <td className="text-right py-2">₹4,800</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Looking for more detailed analytics or customized reports for your specific property or investment strategy in the Indian market? Subscribe to our advanced analytics service.
            </p>
            <Link to="/advanced-analytics">
              <Button className="px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-realestate-primary hover:bg-realestate-secondary">
                Get Advanced Analytics
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AnalyticsPage;
