
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { toast } from "sonner";
import AdminUserTable from '@/components/admin/AdminUserTable';
import AdminPredictionTable from '@/components/admin/AdminPredictionTable';
import AdminModelTraining from '@/components/admin/AdminModelTraining';
import AdminSubscriptionTable from '@/components/admin/AdminSubscriptionTable';
import { Users, BarChart3, Activity, Share2, CreditCard } from 'lucide-react';

// Mock data for Indian market
const predictionsByMonth = [
  { month: 'Jan', count: 125 },
  { month: 'Feb', count: 156 },
  { month: 'Mar', count: 203 },
  { month: 'Apr', count: 178 },
  { month: 'May', count: 221 },
  { month: 'Jun', count: 267 },
  { month: 'Jul', count: 308 },
  { month: 'Aug', count: 290 },
  { month: 'Sep', count: 312 },
  { month: 'Oct', count: 285 },
  { month: 'Nov', count: 260 },
  { month: 'Dec', count: 315 },
];

const usersByCity = [
  { city: 'Delhi NCR', users: 325 },
  { city: 'Mumbai', users: 290 },
  { city: 'Bangalore', users: 245 },
  { city: 'Hyderabad', users: 180 },
  { city: 'Chennai', users: 165 },
  { city: 'Other', users: 395 },
];

const averagePriceByCity = [
  { city: 'Delhi', price: 15000000 },
  { city: 'Mumbai', price: 22500000 },
  { city: 'Bangalore', price: 12000000 },
  { city: 'Hyderabad', price: 8500000 },
  { city: 'Pune', price: 7800000 },
  { city: 'Chennai', price: 8900000 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AdminPage = () => {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Admin Dashboard',
          text: 'Check out our admin dashboard for the Indian housing market!',
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
            <h1 className="text-3xl font-bold text-realestate-dark mb-3">Admin Dashboard</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Manage users, view analytics, and train the prediction model for the Indian real estate market.
            </p>
          </div>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
              <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
              <TabsTrigger value="model">Model Training</TabsTrigger>
            </TabsList>
            
            <div className="mt-8">
              <TabsContent value="overview">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Users
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,500</div>
                      <p className="text-xs text-muted-foreground">
                        +15.2% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Predictions
                      </CardTitle>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2,950</div>
                      <p className="text-xs text-muted-foreground">
                        +18.7% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Average Prediction
                      </CardTitle>
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">₹85.4L</div>
                      <p className="text-xs text-muted-foreground">
                        +4.5% from last month
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Active Subscriptions
                      </CardTitle>
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">124</div>
                      <p className="text-xs text-muted-foreground">
                        +21.8% from last month
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Predictions by Month</CardTitle>
                      <CardDescription>
                        Number of predictions performed each month
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={predictionsByMonth}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="count" 
                            name="Predictions" 
                            stroke="#2563eb" 
                            activeDot={{ r: 8 }} 
                            strokeWidth={2} 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Users by City</CardTitle>
                      <CardDescription>
                        Distribution of users across major Indian cities
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={usersByCity}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="users"
                            nameKey="city"
                          >
                            {usersByCity.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [value, 'Users']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Average House Price by City</CardTitle>
                    <CardDescription>
                      Comparison of predicted house prices across major Indian cities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={averagePriceByCity}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="city" />
                        <YAxis tickFormatter={(value) => `₹${value/100000}L`} />
                        <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Average Price']} />
                        <Legend />
                        <Bar 
                          dataKey="price" 
                          name="Average Price" 
                          fill="#3b82f6" 
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="users">
                <AdminUserTable />
              </TabsContent>
              
              <TabsContent value="predictions">
                <AdminPredictionTable />
              </TabsContent>
              
              <TabsContent value="subscriptions">
                <AdminSubscriptionTable />
              </TabsContent>
              
              <TabsContent value="model">
                <AdminModelTraining />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default AdminPage;
