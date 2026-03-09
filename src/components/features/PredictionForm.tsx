import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Layers, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { 
  hasActiveSubscription, 
  getFreePredictionsRemaining, 
  decreaseFreePredictions,
  getPredictionsLeft,
  decreaseSubscriptionPredictions,
  formatIndianPrice
} from "@/utils/subscriptionUtils";

// Mock data with realistic locations and coordinates
const LOCATIONS = [
  { id: 1, name: "South Delhi", lat: 28.5198, lng: 77.2183 },
  { id: 2, name: "Gurugram", lat: 28.4595, lng: 77.0266 },
  { id: 3, name: "Noida", lat: 28.5355, lng: 77.3910 },
  { id: 4, name: "Mumbai Suburbs", lat: 19.0760, lng: 72.8777 },
  { id: 5, name: "Bangalore East", lat: 12.9716, lng: 77.5946 },
  { id: 6, name: "Chennai Central", lat: 13.0827, lng: 80.2707 },
];

const PredictionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    area: 1500,
    location: "",
    bedrooms: 3,
    bathrooms: 2,
    age: 10,
    hasGarage: true,
    hasPool: false,
  });
  
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Check if user has subscription or free predictions remaining
  const [freePredictions, setFreePredictions] = useState<number>(3);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [predictionsLeft, setPredictionsLeft] = useState<number>(3);

  useEffect(() => {
    // Update prediction counts when component mounts
    const updatePredictionCounts = async () => {
      try {
        const remainingFreePredictions = await getFreePredictionsRemaining();
        const hasSubscription = await hasActiveSubscription();
        const remaining = await getPredictionsLeft();
        
        setFreePredictions(remainingFreePredictions);
        setIsSubscribed(hasSubscription);
        setPredictionsLeft(remaining);
      } catch (error) {
        console.error("Error fetching prediction counts:", error);
        toast.error("Failed to retrieve your prediction limits");
      }
    };
    
    updatePredictionCounts();
  }, []);
  
  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  
  const handlePredictPrice = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!currentUser) {
      toast.error("Please login to make predictions");
      navigate('/login');
      return;
    }
    
    // Check if user has predictions left (free or subscription)
    const remainingPredictions = await getPredictionsLeft();
    if (remainingPredictions === 0 && !await hasActiveSubscription()) {
      toast.error("You've used all your free predictions. Please subscribe to continue.");
      navigate('/advanced-analytics');
      return;
    }
    
    if (remainingPredictions === 0 && await hasActiveSubscription()) {
      toast.error("You've used all your predictions for this subscription period.");
      navigate('/advanced-analytics');
      return;
    }
    
    if (!formData.location) {
      toast.error("Please select a location");
      return;
    }
    
    setLoading(true);
    
    try {
      // Advanced ML model simulation with more realistic factors
      // In a real application, this would call a backend API with a trained model
      const locationBasePrices: Record<string, number> = {
        "South Delhi": 15000,    // premium Delhi location
        "Gurugram": 10000,       // corporate hub
        "Noida": 7500,           // growing tech hub
        "Mumbai Suburbs": 18000, // most expensive city
        "Bangalore East": 12000, // tech city premium
        "Chennai Central": 8000  // coastal city
      };
      
      const basePrice = locationBasePrices[formData.location as keyof typeof locationBasePrices] || 10000;
      const areaFactor = formData.area * basePrice; // Square footage multiplier
      
      // Market influence factors (based on real Indian real estate trends)
      const currentYear = new Date().getFullYear();
      const marketGrowth = 1 + ((currentYear - 2020) * 0.08); // 8% YoY growth since 2020
      
      // Neighborhood demand factor (simulated based on location popularity)
      const neighborhoodDemand = 
        formData.location === "South Delhi" ? 1.35 :
        formData.location === "Gurugram" ? 1.25 :
        formData.location === "Noida" ? 1.15 :
        formData.location === "Mumbai Suburbs" ? 1.45 :
        formData.location === "Bangalore East" ? 1.3 :
        formData.location === "Chennai Central" ? 1.2 : 1;
      
      // Property feature weights (based on Indian market preferences)
      const bedroomFactor = formData.bedrooms * 180000; // Premium for each bedroom
      const bathroomFactor = formData.bathrooms * 120000; // Premium for each bathroom
      const ageFactor = formData.age * -20000; // Depreciation per year
      const garageFactor = formData.hasGarage ? 175000 : 0; // Premium for parking
      const poolFactor = formData.hasPool ? 350000 : 0; // Premium for amenities like pool
      
      // Random market fluctuation (±5%)
      const marketFluctuation = 0.95 + (Math.random() * 0.1);
      
      // Calculate final price in INR with all factors
      const calculatedPrice = Math.round(
        (areaFactor + bedroomFactor + bathroomFactor + ageFactor + garageFactor + poolFactor) * 
        neighborhoodDemand * marketGrowth * marketFluctuation
      );
      
      // Add a small delay to simulate processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setPrediction(calculatedPrice);
      
      // Save prediction to localStorage and IndexedDB
      const predictionData = {
        id: Date.now(),
        user: currentUser.username,
        userId: currentUser.id,
        address: `${formData.location} Area`,
        sqft: formData.area,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        age: formData.age,
        hasGarage: formData.hasGarage,
        hasPool: formData.hasPool,
        predictedPrice: calculatedPrice,
        date: new Date().toISOString().split('T')[0],
        currency: "₹", // Store currency as rupees
        accuracy: 92 + Math.floor(Math.random() * 6), // 92-97% accuracy simulation
        predictorVersion: "3.2.1" // Model version
      };
      
      // Get existing predictions
      const predictions = JSON.parse(localStorage.getItem('predictions') || '[]');
      predictions.push(predictionData);
      localStorage.setItem('predictions', JSON.stringify(predictions));
      
      // Decrease predictions count
      if (await hasActiveSubscription()) {
        await decreaseSubscriptionPredictions();
      } else {
        await decreaseFreePredictions();
      }
      
      // Update state with new counts
      const remainingFreePredictions = await getFreePredictionsRemaining();
      const hasSubscription = await hasActiveSubscription();
      const remaining = await getPredictionsLeft();
      
      setFreePredictions(remainingFreePredictions);
      setIsSubscribed(hasSubscription);
      setPredictionsLeft(remaining);
      
      toast.success("Prediction generated using advanced ML model!");
    } catch (error) {
      console.error("Error generating prediction:", error);
      toast.error("Failed to generate prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const miniMapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  
  useEffect(() => {
    const initializeMiniMap = () => {
      if (!mapContainerRef.current) return;
      
      // Check if mapboxgl is available
      if (typeof window !== 'undefined' && window.mapboxgl) {
        // Initialize map
        window.mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '';
        
        miniMapRef.current = new window.mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [78.9629, 20.5937], // Center of India
          zoom: 4,
          interactive: false // Disable interactions for this small map
        });

        // Create marker but don't add it yet
        markerRef.current = new window.mapboxgl.Marker({
          color: '#3b82f6'
        });
      }
    };

    // Load Mapbox script dynamically if not already loaded
    if (typeof window !== 'undefined' && !window.mapboxgl) {
      const mapboxScript = document.querySelector('script[src*="mapbox-gl"]');
      if (!mapboxScript) {
        const script = document.createElement('script');
        script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
        script.async = true;
        script.onload = () => {
          const link = document.createElement('link');
          link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
          link.rel = 'stylesheet';
          document.head.appendChild(link);
          
          // Initialize map after script is loaded
          setTimeout(initializeMiniMap, 500);
        };
        document.head.appendChild(script);
      } else {
        initializeMiniMap();
      }
    } else {
      initializeMiniMap();
    }
  }, []);

  // Update marker when location changes
  useEffect(() => {
    if (!miniMapRef.current || !markerRef.current) return;
    
    const selectedLocation = LOCATIONS.find(loc => loc.name === formData.location);
    
    if (selectedLocation) {
      markerRef.current
        .setLngLat([selectedLocation.lng, selectedLocation.lat])
        .addTo(miniMapRef.current);
      
      miniMapRef.current.flyTo({
        center: [selectedLocation.lng, selectedLocation.lat],
        zoom: 12,
        essential: true
      });
    } else {
      // If no location selected, remove marker
      markerRef.current.remove();
      
      // Reset map view to whole India
      miniMapRef.current.flyTo({
        center: [78.9629, 20.5937],
        zoom: 4,
        essential: true
      });
    }
  }, [formData.location]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {!isSubscribed && freePredictions <= 0 && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-yellow-800 font-medium">
            You've used all your free predictions! 
            <a href="/advanced-analytics" className="text-blue-600 ml-1 underline">
              Subscribe to a plan
            </a> to make more predictions.
          </p>
        </div>
      )}

      {!isSubscribed && freePredictions > 0 && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-800">
            You have <span className="font-semibold">{freePredictions}</span> free predictions remaining.
          </p>
        </div>
      )}
      
      {isSubscribed && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-800">
            You have {predictionsLeft === -1 ? "unlimited" : <span className="font-semibold">{predictionsLeft}</span>} predictions available with your subscription.
          </p>
        </div>
      )}
      
      <form onSubmit={handlePredictPrice} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Home className="h-5 w-5 text-realestate-primary" />
              <h3 className="text-lg font-medium">Property Details</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="area">Area (sq ft): {formData.area}</Label>
                <Slider
                  id="area"
                  defaultValue={[formData.area]}
                  max={10000}
                  min={500}
                  step={100}
                  onValueChange={(value) => handleInputChange("area", value[0])}
                  className="my-4"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Select 
                    value={String(formData.bedrooms)} 
                    onValueChange={(value) => handleInputChange("bedrooms", parseInt(value))}
                  >
                    <SelectTrigger id="bedrooms">
                      <SelectValue placeholder="Select bedrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <SelectItem key={num} value={String(num)}>
                          {num} {num === 1 ? 'bedroom' : 'bedrooms'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Select 
                    value={String(formData.bathrooms)} 
                    onValueChange={(value) => handleInputChange("bathrooms", parseInt(value))}
                  >
                    <SelectTrigger id="bathrooms">
                      <SelectValue placeholder="Select bathrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 1.5, 2, 2.5, 3, 3.5, 4].map(num => (
                        <SelectItem key={num} value={String(num)}>
                          {num} {num === 1 ? 'bathroom' : 'bathrooms'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="age">Property Age: {formData.age} years</Label>
                <Slider
                  id="age"
                  defaultValue={[formData.age]}
                  max={100}
                  min={0}
                  step={1}
                  onValueChange={(value) => handleInputChange("age", value[0])}
                  className="my-4"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasGarage"
                    checked={formData.hasGarage}
                    onChange={(e) => handleInputChange("hasGarage", e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-realestate-primary focus:ring-realestate-primary"
                  />
                  <Label htmlFor="hasGarage">Garage</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="hasPool"
                    checked={formData.hasPool}
                    onChange={(e) => handleInputChange("hasPool", e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-realestate-primary focus:ring-realestate-primary"
                  />
                  <Label htmlFor="hasPool">Swimming Pool</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <MapPin className="h-5 w-5 text-realestate-primary" />
              <h3 className="text-lg font-medium">Location Details</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Neighborhood</Label>
                <Select 
                  value={formData.location} 
                  onValueChange={(value) => handleInputChange("location", value)}
                >
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Select neighborhood" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOCATIONS.map(location => (
                      <SelectItem key={location.id} value={location.name}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="bg-gray-100 rounded-md p-4 mt-4">
                <p className="text-sm text-gray-600 mb-2">
                  Location impact on home values:
                </p>
                <ul className="text-xs text-gray-500 list-disc pl-5 space-y-1">
                  <li>South Delhi: Premium urban location (+120%)</li>
                  <li>Gurugram: Premium residential and business hub (+110%)</li>
                  <li>Noida: Growing tech and residential area (+90%)</li>
                  <li>Mumbai Suburbs: Highest value metro area (+150%)</li>
                  <li>Bangalore East: Tech corridor premium (+110%)</li>
                  <li>Chennai Central: Established urban center (+90%)</li>
                </ul>
              </div>
              
              {/* Real map implementation */}
              <div 
                ref={mapContainerRef}
                className="h-32 rounded-md mt-4 overflow-hidden border border-slate-200"
              ></div>
            </div>
          </CardContent>
        </Card>
        
        <div className="md:col-span-2 mt-4">
          <Button 
            type="submit" 
            className="w-full bg-realestate-primary hover:bg-realestate-secondary h-12" 
            disabled={loading || predictionsLeft === 0}
          >
            {loading ? "Calculating..." : "Predict House Price"}
          </Button>
        </div>
      </form>
      
      {prediction !== null && (
        <Card className="mt-8 border-realestate-primary/20 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Layers className="h-6 w-6 text-realestate-primary" />
              <h3 className="text-xl font-semibold">Predicted House Price</h3>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="text-center">
                <p className="text-sm uppercase text-gray-500 font-medium">Estimated Value</p>
                <p className="text-4xl font-bold text-realestate-dark mt-2">
                  {formatIndianPrice(prediction)}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Based on current market conditions and provided property details
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6 border-t pt-4">
                <div>
                  <p className="text-xs text-gray-500">Price per sq ft</p>
                  <p className="font-medium">{formatIndianPrice(Math.round(prediction / formData.area))}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Location Factor</p>
                  <p className="font-medium">{formData.location || "Not selected"}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              <p>This is an estimated price based on the information provided. Actual selling prices may vary based on additional factors not captured in this model.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PredictionForm;
