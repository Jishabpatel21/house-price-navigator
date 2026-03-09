
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data with Indian cities
const neighborhoodData = [
  { name: 'South Delhi', value: 25000000, count: 125, lat: 28.5198, lng: 77.2183 },
  { name: 'Gurugram', value: 15000000, count: 215, lat: 28.4595, lng: 77.0266 },
  { name: 'Noida', value: 12000000, count: 180, lat: 28.5355, lng: 77.3910 },
  { name: 'Mumbai Suburbs', value: 32000000, count: 160, lat: 19.0760, lng: 72.8777 },
  { name: 'Bangalore East', value: 18000000, count: 110, lat: 12.9716, lng: 77.5946 },
  { name: 'Chennai Central', value: 14000000, count: 95, lat: 13.0827, lng: 80.2707 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const MapView = () => {
  const [viewMode, setViewMode] = useState<'price' | 'count'>('price');
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Function to initialize map
  useEffect(() => {
    const initializeMap = () => {
      if (!mapContainerRef.current) return;
      
      // Check if mapboxgl is available
      if (typeof window !== 'undefined' && window.mapboxgl) {
        // Initialize map
        window.mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || '';
        
        mapRef.current = new window.mapboxgl.Map({
          container: mapContainerRef.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [78.9629, 20.5937], // Center of India
          zoom: 4
        });

        // Add navigation controls
        mapRef.current.addControl(
          new window.mapboxgl.NavigationControl(),
          'top-right'
        );

        // Add markers when map loads
        mapRef.current.on('load', () => {
          addMarkers();
        });

        return () => {
          if (mapRef.current) mapRef.current.remove();
        };
      } else {
        // Fallback for when mapbox is not available
        console.warn('Mapbox is not available. Please add Mapbox script to your project.');
      }
    };

    // Load Mapbox script dynamically
    const loadMapboxScript = () => {
      if (typeof window !== 'undefined' && !window.mapboxgl) {
        const script = document.createElement('script');
        script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js';
        script.async = true;
        script.onload = () => {
          const link = document.createElement('link');
          link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
          link.rel = 'stylesheet';
          document.head.appendChild(link);
          
          // Initialize map after script is loaded
          setTimeout(initializeMap, 500);
        };
        document.head.appendChild(script);
      } else {
        initializeMap();
      }
    };

    loadMapboxScript();
  }, []);

  // Add markers to the map
  const addMarkers = () => {
    if (!mapRef.current) return;
    
    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    neighborhoodData.forEach((area, index) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.backgroundColor = COLORS[index % COLORS.length];
      el.style.width = '20px';
      el.style.height = '20px';
      el.style.borderRadius = '50%';
      el.style.cursor = 'pointer';
      el.style.border = '2px solid white';
      
      // Add a popup
      const popup = new window.mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div>
            <h3 style="font-weight: bold; margin-bottom: 5px;">${area.name}</h3>
            <p>Avg. Price: ₹${(area.value / 100000).toFixed(1)} Lakh</p>
            <p>Listings: ${area.count}</p>
          </div>
        `);

      // Add marker to map
      const marker = new window.mapboxgl.Marker(el)
        .setLngLat([area.lng, area.lat])
        .setPopup(popup)
        .addTo(mapRef.current);
      
      markersRef.current.push(marker);

      el.addEventListener('click', () => {
        setSelectedArea(area.name === selectedArea ? null : area.name);
      });
    });
  };

  // Update markers when selected area changes
  useEffect(() => {
    if (!mapRef.current || markersRef.current.length === 0) return;
    
    neighborhoodData.forEach((area, index) => {
      const marker = markersRef.current[index];
      if (!marker || !marker.getElement()) return;
      
      const el = marker.getElement();
      el.style.backgroundColor = area.name === selectedArea 
        ? '#3b82f6' 
        : COLORS[index % COLORS.length];
      
      el.style.zIndex = area.name === selectedArea ? 100 : 10;
      el.style.width = area.name === selectedArea ? '30px' : '20px';
      el.style.height = area.name === selectedArea ? '30px' : '20px';
    });
  }, [selectedArea]);

  const handleAreaClick = (areaName: string) => {
    setSelectedArea(areaName === selectedArea ? null : areaName);
    
    // Find the area and center the map on it
    const area = neighborhoodData.find(a => a.name === areaName);
    if (area && mapRef.current) {
      mapRef.current.flyTo({
        center: [area.lng, area.lat],
        zoom: 12,
        essential: true
      });
    }
  };

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
          ref={mapContainerRef} 
          className="relative rounded-lg overflow-hidden h-96 border border-gray-200 dark:border-gray-700"
        >
          {/* If map script fails to load, show this as fallback */}
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 z-0">
            <p className="text-gray-500 dark:text-gray-400 text-center">
              Loading map...
            </p>
          </div>
        </div>
        
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
                  <Tooltip formatter={(value) => [`₹${(Number(value) / 100000).toFixed(1)} Lakh`, 'Average Price']} />
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
                        ? `₹${value/100000}L` 
                        : value.toString()
                    } 
                  />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip 
                    formatter={(value) => 
                      viewMode === 'price' 
                        ? [`₹${(Number(value) / 100000).toFixed(1)} Lakh`, 'Average Price'] 
                        : [value, 'Listings']
                    } 
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

export default MapView;
