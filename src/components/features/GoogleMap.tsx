import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Realistic neighborhood data with Indian real estate prices
const neighborhoodData = [
  { name: 'South Delhi', value: 35000000, count: 125, lat: 28.5198, lng: 77.2183 },     // Premium area in Delhi
  { name: 'Gurugram', value: 12000000, count: 215, lat: 28.4595, lng: 77.0266 },        // Upscale suburb near Delhi
  { name: 'Noida', value: 8500000, count: 180, lat: 28.5355, lng: 77.3910 },            // Growing tech hub in Delhi NCR
  { name: 'Mumbai Suburbs', value: 28000000, count: 160, lat: 19.0760, lng: 72.8777 },  // Affluent Mumbai areas
  { name: 'Bangalore East', value: 11500000, count: 110, lat: 12.9716, lng: 77.5946 },  // Tech corridor in Bangalore
  { name: 'Chennai Central', value: 9800000, count: 95, lat: 13.0827, lng: 80.2707 },    // Central Chennai area
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const GoogleMap = () => {
  const [viewMode, setViewMode] = useState<'price' | 'count'>('price');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const handleAreaClick = (areaName: string) => {
    setSelectedArea(areaName === selectedArea ? null : areaName);
  };

  // Function to initialize the map with Google Maps API
  useEffect(() => {
    const initializeMap = () => {
      if (mapLoaded) return; // Prevent re-initialization
      
      const mapOptions = {
        center: { lat: 20.5937, lng: 78.9629 }, // Center of India
        zoom: 5,
        styles: [
          {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [{ visibility: "simplified" }],
          },
        ],
      };

      // Check if window.google is defined (meaning the script is loaded)
      if (window.google && window.google.maps) {
        const mapDiv = document.getElementById("google-map");
        if (mapDiv) {
          const map = new window.google.maps.Map(mapDiv, mapOptions);
          
          const markers: google.maps.Marker[] = []; // Store markers for later reference
          const infoWindows: google.maps.InfoWindow[] = []; // Store info windows

          // Add markers for each neighborhood
          neighborhoodData.forEach((area) => {
            const marker = new window.google.maps.Marker({
              position: { lat: area.lat, lng: area.lng },
              map: map,
              title: area.name,
              animation: window.google.maps.Animation.DROP,
            });
            
            markers.push(marker);

            // Format the price in rupees with lakhs and crores formatting
            const formattedPrice = formatIndianPrice(area.value);

            // Create an info window for the marker
            const infoWindow = new window.google.maps.InfoWindow({
              content: `
                <div style="padding: 8px;">
                  <h3 style="font-weight: bold; margin-bottom: 5px;">${area.name}</h3>
                  <p>Avg. Price: ₹${formattedPrice}</p>
                  <p>Listings: ${area.count}</p>
                </div>
              `,
            });
            
            infoWindows.push(infoWindow);

            // Add click listener to show info window
            marker.addListener("click", () => {
              // Close all other info windows
              infoWindows.forEach(iw => iw.close());
              
              // Open this info window
              infoWindow.open(map, marker);
              
              // Center map on this marker
              map.panTo(marker.getPosition() as google.maps.LatLng);
              
              // Update selected area in state
              handleAreaClick(area.name);
            });
          });

          // Add listener to map clicks to close info windows when clicking away
          map.addListener("click", () => {
            infoWindows.forEach(iw => iw.close());
            setSelectedArea(null);
          });

          setMapLoaded(true);
        }
      }
    };

    // Function to format price in Indian currency format (lakhs and crores)
    const formatIndianPrice = (price: number): string => {
      if (price >= 10000000) {
        return `${(price / 10000000).toFixed(2)} Cr`;
      } else if (price >= 100000) {
        return `${(price / 100000).toFixed(2)} Lakh`;
      } else {
        return `${price.toLocaleString()}`;
      }
    };

    // Add Google Maps script if not already loaded
    if (!window.google || !window.google.maps) {
      const script = document.createElement("script");
      script.src = 
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap";
      script.defer = true;
      script.async = true;
      
      // Create a global initMap function that Google Maps can call back
      window.initMap = initializeMap;
      
      document.head.appendChild(script);
      
      // Cleanup function to remove the global initMap when component unmounts
      return () => {
        window.initMap = undefined;
      };
    } else {
      initializeMap();
    }
  }, [selectedArea, mapLoaded]);

  useEffect(() => {
    // Add some necessary CSS for the map to display properly
    const style = document.createElement('style');
    style.textContent = `
      #google-map {
        height: 100%;
        width: 100%;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Card className="border shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Indian Real Estate Map</CardTitle>
            <CardDescription>
              Explore housing data by neighborhood
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              variant={viewMode === 'price' ? 'default' : 'outline'}
              onClick={() => setViewMode('price')}
            >
              Price
            </Button>
            <Button 
              size="sm" 
              variant={viewMode === 'count' ? 'default' : 'outline'}
              onClick={() => setViewMode('count')}
            >
              Listings
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Map container */}
        <div 
          id="google-map"
          className="relative rounded-lg overflow-hidden h-96 border border-gray-200"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Price Distribution</h3>
            <div className="h-64">
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
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                        opacity={selectedArea && selectedArea !== entry.name ? 0.5 : 1}
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => {
                      const price = Number(value);
                      if (price >= 10000000) {
                        return [`₹${(price / 10000000).toFixed(2)} Cr`, 'Average Price'];
                      } else {
                        return [`₹${(price / 100000).toFixed(2)} Lakh`, 'Average Price'];
                      }
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">
              {viewMode === 'price' ? 'Average Prices by Area' : 'Listings by Area'}
            </h3>
            <div className="h-64">
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
                      viewMode === 'price' 
                        ? (value >= 10000000 ? `₹${value/10000000}Cr` : `₹${value/100000}L`)
                        : value.toString()
                    } 
                  />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip 
                    formatter={(value) => {
                      if (viewMode === 'price') {
                        const price = Number(value);
                        if (price >= 10000000) {
                          return [`₹${(price / 10000000).toFixed(2)} Cr`, 'Average Price'];
                        } else {
                          return [`₹${(price / 100000).toFixed(2)} Lakh`, 'Average Price'];
                        }
                      } else {
                        return [value, 'Listings'];
                      }
                    }} 
                  />
                  <Bar 
                    dataKey={viewMode === 'price' ? "value" : "count"} 
                    name={viewMode === 'price' ? "Average Price" : "Number of Listings"} 
                    fill="#3b82f6" 
                    barSize={20} 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GoogleMap;
