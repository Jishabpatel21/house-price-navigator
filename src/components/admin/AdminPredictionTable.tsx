
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Download, Filter } from "lucide-react";
import { toast } from "sonner";

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

const AdminPredictionTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  
  useEffect(() => {
    // Load all prediction data from localStorage
    const storedPredictions = JSON.parse(localStorage.getItem('predictions') || '[]');
    setPredictions(storedPredictions);
  }, []);
  
  const filteredPredictions = predictions.filter(prediction => 
    prediction.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
    prediction.address.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Function to format price in Indian currency format (lakhs and crores)
  const formatIndianPrice = (price: number): string => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lakh`;
    } else {
      return `₹${price.toLocaleString()}`;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleDelete = (id: number) => {
    // Get all predictions from localStorage
    const updatedPredictions = predictions.filter(p => p.id !== id);
    
    // Update localStorage
    localStorage.setItem('predictions', JSON.stringify(updatedPredictions));
    
    // Update state
    setPredictions(updatedPredictions);
    
    toast.success('Prediction deleted successfully');
  };

  const handleView = (prediction: PredictionData) => {
    toast.info(`Viewing details for prediction at ${prediction.address}`);
    // In a real app, this would open a modal with detailed information
  };

  const handleExport = () => {
    // Create CSV content
    const headers = ['User', 'Address', 'Size (sq ft)', 'Bedrooms', 'Bathrooms', 'Price', 'Date'];
    const csvContent = [
      headers.join(','),
      ...filteredPredictions.map(p => 
        [p.user, p.address, p.sqft, p.bedrooms, p.bathrooms, formatIndianPrice(p.predictedPrice), p.date].join(',')
      )
    ].join('\n');
    
    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'predictions.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast.success('Exported predictions to CSV');
  };

  const handleFilter = () => {
    toast.info('Advanced filtering options coming soon');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prediction History</CardTitle>
        <CardDescription>
          View all house price predictions made by users
        </CardDescription>
        <div className="flex gap-2 pt-2 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by user or address..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleFilter}>
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Size (sq ft)</TableHead>
                <TableHead>Bed/Bath</TableHead>
                <TableHead>Predicted Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPredictions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                    No predictions found
                  </TableCell>
                </TableRow>
              ) : (
                filteredPredictions.map((prediction) => (
                  <TableRow key={prediction.id}>
                    <TableCell className="font-medium">{prediction.user}</TableCell>
                    <TableCell>{prediction.address}</TableCell>
                    <TableCell>{prediction.sqft}</TableCell>
                    <TableCell>{prediction.bedrooms}/{prediction.bathrooms}</TableCell>
                    <TableCell>{formatIndianPrice(prediction.predictedPrice)}</TableCell>
                    <TableCell>{formatDate(prediction.date)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleView(prediction)}
                        >
                          View
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500"
                          onClick={() => handleDelete(prediction.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPredictionTable;
