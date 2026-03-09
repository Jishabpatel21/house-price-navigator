
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatIndianPrice } from "@/utils/subscriptionUtils";

interface PredictionData {
  id: number;
  user: string;
  userId: string;
  address: string;
  sqft: number;
  bedrooms: number;
  bathrooms: number;
  predictedPrice: number;
  date: string;
  currency?: string;
}

const PredictionsPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const user = JSON.parse(userData);
      setCurrentUser(user);
      setIsLoggedIn(true);
      
      // Load user predictions
      const allPredictions = JSON.parse(localStorage.getItem("predictions") || "[]");
      const userPredictions = allPredictions.filter((p: PredictionData) => p.userId === user.id);
      setPredictions(userPredictions);
    } else {
      toast.error("Please login to view your predictions");
      navigate("/login");
    }
    setIsLoading(false);
  }, [navigate]);

  const handleDelete = (id: number) => {
    // Get all predictions
    const allPredictions = JSON.parse(localStorage.getItem("predictions") || "[]");
    
    // Filter out the deleted prediction
    const updatedPredictions = allPredictions.filter((p: PredictionData) => p.id !== id);
    
    // Update localStorage
    localStorage.setItem("predictions", JSON.stringify(updatedPredictions));
    
    // Update state
    const userPredictions = updatedPredictions.filter((p: PredictionData) => p.userId === currentUser.id);
    setPredictions(userPredictions);
    
    toast.success("Prediction deleted successfully");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-realestate-primary"></div>
        </div>
      </PageLayout>
    );
  }

  if (!isLoggedIn) {
    return null; // Will redirect in the useEffect
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-realestate-dark">My Predictions</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Prediction History</CardTitle>
              <CardDescription>
                View and analyze all your previous property price predictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {predictions.length === 0 ? (
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium text-gray-600 mb-4">No predictions yet</h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-6">
                    You haven't made any property price predictions yet. Start by analyzing a property.
                  </p>
                  <Button 
                    onClick={() => navigate("/predict")}
                    className="bg-realestate-primary hover:bg-realestate-secondary"
                  >
                    Make a Prediction
                  </Button>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Address</TableHead>
                        <TableHead>Size (sq ft)</TableHead>
                        <TableHead>Bed/Bath</TableHead>
                        <TableHead>Predicted Price</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {predictions.map((prediction) => (
                        <TableRow key={prediction.id}>
                          <TableCell>{prediction.address}</TableCell>
                          <TableCell>{prediction.sqft}</TableCell>
                          <TableCell>{prediction.bedrooms}/{prediction.bathrooms}</TableCell>
                          <TableCell>{formatIndianPrice(prediction.predictedPrice)}</TableCell>
                          <TableCell>{formatDate(prediction.date)}</TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500"
                              onClick={() => handleDelete(prediction.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default PredictionsPage;
