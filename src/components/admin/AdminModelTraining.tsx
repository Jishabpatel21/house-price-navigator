
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Database, Upload, FileType, Clock, PieChart, LineChart } from "lucide-react";

const AdminModelTraining = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modelName, setModelName] = useState("House Price Predictor v1");
  const [datasetHistory, setDatasetHistory] = useState<any[]>([]);
  const [algorithmOptions, setAlgorithmOptions] = useState({
    linearRegression: true,
    randomForest: true,
    xgBoost: false,
    neuralNetwork: false,
  });

  // Load dataset history from localStorage
  useEffect(() => {
    const savedDatasets = localStorage.getItem('datasetHistory');
    if (savedDatasets) {
      setDatasetHistory(JSON.parse(savedDatasets));
    }
  }, []);

  // Save dataset history to localStorage
  useEffect(() => {
    localStorage.setItem('datasetHistory', JSON.stringify(datasetHistory));
  }, [datasetHistory]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast.error("Please select a dataset file first");
      return;
    }
    
    // Add the uploaded file to history
    const newDataset = {
      id: Date.now().toString(),
      name: selectedFile.name,
      size: selectedFile.size,
      date: new Date().toISOString(),
      status: 'uploaded'
    };
    
    setDatasetHistory([...datasetHistory, newDataset]);
    toast.success(`Dataset "${selectedFile.name}" uploaded successfully`);
  };

  const handleTrain = () => {
    if (!selectedFile) {
      toast.error("Please upload a dataset before training");
      return;
    }
    
    setIsTraining(true);
    setProgress(0);
    
    // Simulate training progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          
          // Update the model information in localStorage
          const modelInfo = {
            name: modelName,
            trainedOn: new Date().toISOString(),
            accuracy: (Math.random() * 15 + 80).toFixed(1) + "%", // Random accuracy between 80-95%
            datasetSize: Math.floor(Math.random() * 10000 + 10000) + " records",
            algorithms: getModelAlgorithms(),
            metrics: {
              mae: "$" + (Math.random() * 10000 + 10000).toFixed(0),
              r2: (Math.random() * 0.2 + 0.8).toFixed(3),
              rmse: "$" + (Math.random() * 20000 + 20000).toFixed(0),
              mape: (Math.random() * 5 + 2).toFixed(1) + "%"
            }
          };
          
          localStorage.setItem('currentModel', JSON.stringify(modelInfo));
          
          // Update dataset status
          const updatedHistory = datasetHistory.map(dataset => 
            dataset.name === selectedFile.name 
              ? {...dataset, status: 'trained', modelName: modelName} 
              : dataset
          );
          setDatasetHistory(updatedHistory);
          
          toast.success("Model training completed successfully!", {
            description: `The model "${modelName}" has been trained with an accuracy of ${modelInfo.accuracy}.`
          });
          
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 300);
  };

  const getModelAlgorithms = () => {
    const selected = [];
    if (algorithmOptions.linearRegression) selected.push("Linear Regression");
    if (algorithmOptions.randomForest) selected.push("Random Forest");
    if (algorithmOptions.xgBoost) selected.push("XGBoost");
    if (algorithmOptions.neuralNetwork) selected.push("Neural Network");
    
    return selected.join(", ");
  };

  // Get current model info from localStorage
  const getCurrentModel = () => {
    const savedModel = localStorage.getItem('currentModel');
    if (savedModel) {
      return JSON.parse(savedModel);
    }
    
    // Default values if no model is saved
    return {
      name: "House Price Predictor v1",
      trainedOn: "2023-05-15T10:30:00",
      accuracy: "87.5%",
      datasetSize: "15,420 records",
      algorithms: "Linear Regression, Random Forest",
      metrics: {
        mae: "$15,230",
        r2: "0.875",
        rmse: "$24,650",
        mape: "4.2%"
      }
    };
  };

  const currentModel = getCurrentModel();
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b">
          <CardTitle className="flex items-center">
            <Database className="mr-2 h-5 w-5 text-purple-600" />
            Dataset Management
          </CardTitle>
          <CardDescription>
            Upload new datasets to train or improve your prediction model
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="dataset" className="text-sm font-medium">Dataset File (CSV)</Label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input 
                  id="dataset" 
                  type="file" 
                  accept=".csv" 
                  onChange={handleFileChange}
                  className="cursor-pointer" 
                />
                {!selectedFile && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-gray-500 bg-gray-50 border rounded-md opacity-70">
                    <FileType className="h-4 w-4 mr-2" />
                    <span>Choose CSV file</span>
                  </div>
                )}
              </div>
              <Button 
                onClick={handleUpload}
                disabled={!selectedFile}
                className="whitespace-nowrap"
              >
                <Upload className="mr-2 h-4 w-4" /> Upload
              </Button>
            </div>
            {selectedFile && (
              <div className="flex items-center mt-2 p-2 bg-blue-50 rounded text-sm">
                <FileType className="h-4 w-4 mr-2 text-blue-600" />
                <span>
                  Selected: <strong>{selectedFile.name}</strong> ({Math.round(selectedFile.size / 1024)} KB)
                </span>
              </div>
            )}
          </div>
          
          <div>
            <Label htmlFor="modelName" className="text-sm font-medium">Model Name</Label>
            <Input 
              id="modelName" 
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium">Algorithms to Include</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                <Checkbox 
                  id="linearRegression" 
                  checked={algorithmOptions.linearRegression}
                  onCheckedChange={(checked) => 
                    setAlgorithmOptions({...algorithmOptions, linearRegression: !!checked})
                  }
                />
                <label
                  htmlFor="linearRegression"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Linear Regression
                </label>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                <Checkbox 
                  id="randomForest" 
                  checked={algorithmOptions.randomForest}
                  onCheckedChange={(checked) => 
                    setAlgorithmOptions({...algorithmOptions, randomForest: !!checked})
                  }
                />
                <label
                  htmlFor="randomForest"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Random Forest
                </label>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                <Checkbox 
                  id="xgBoost" 
                  checked={algorithmOptions.xgBoost}
                  onCheckedChange={(checked) => 
                    setAlgorithmOptions({...algorithmOptions, xgBoost: !!checked})
                  }
                />
                <label
                  htmlFor="xgBoost"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  XGBoost
                </label>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                <Checkbox 
                  id="neuralNetwork" 
                  checked={algorithmOptions.neuralNetwork}
                  onCheckedChange={(checked) => 
                    setAlgorithmOptions({...algorithmOptions, neuralNetwork: !!checked})
                  }
                />
                <label
                  htmlFor="neuralNetwork"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Neural Network
                </label>
              </div>
            </div>
          </div>
          
          {datasetHistory.length > 0 && (
            <div className="space-y-2 border-t pt-4 mt-4">
              <Label className="text-sm font-medium">Dataset History</Label>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {datasetHistory.map((dataset, index) => (
                  <div key={index} className="text-sm p-2 border rounded flex items-center justify-between">
                    <div className="flex items-center">
                      <FileType className="h-4 w-4 mr-2 text-blue-600" />
                      <span>{dataset.name} <span className="text-xs text-gray-500">({Math.round(dataset.size / 1024)} KB)</span></span>
                    </div>
                    <div className="flex items-center">
                      <Badge variant={dataset.status === 'trained' ? 'secondary' : 'outline'} className="mr-2">
                        {dataset.status === 'trained' ? 'Trained' : 'Uploaded'}
                      </Badge>
                      <Clock className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-500 ml-1">{formatDate(dataset.date)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="bg-gray-50 border-t">
          <Button 
            onClick={handleTrain} 
            disabled={isTraining || !selectedFile}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            <Database className="mr-2 h-4 w-4" />
            {isTraining ? "Training Model..." : "Train Model"}
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="border shadow-lg">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 border-b">
          <CardTitle className="flex items-center">
            <PieChart className="mr-2 h-5 w-5 text-blue-600" />
            Model Status
          </CardTitle>
          <CardDescription>
            Current model information and training progress
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {isTraining ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label className="text-sm font-medium">Training Progress</Label>
                  <span className="text-sm font-medium">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground flex items-center">
                  <LineChart className="h-4 w-4 mr-2 text-blue-500 animate-pulse" />
                  Training in progress. This may take a few minutes...
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <h4 className="text-sm font-semibold mb-2">Training Model: {modelName}</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Dataset:</strong> {selectedFile?.name}</p>
                  <p><strong>Algorithms:</strong> {getModelAlgorithms()}</p>
                  <p className="text-xs text-muted-foreground">
                    The model will be optimized for best predictive performance.
                    This process involves feature engineering, hyperparameter tuning, and validation.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-purple-50 rounded-md">
                  <h4 className="text-xs font-medium text-muted-foreground">Current Model</h4>
                  <p className="font-semibold text-purple-800">{currentModel.name}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-md">
                  <h4 className="text-xs font-medium text-muted-foreground">Last Updated</h4>
                  <p className="font-semibold text-blue-800">{formatDate(currentModel.trainedOn)}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-md">
                  <h4 className="text-xs font-medium text-muted-foreground">Accuracy</h4>
                  <p className="font-semibold text-green-800">{currentModel.accuracy}</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-md">
                  <h4 className="text-xs font-medium text-muted-foreground">Dataset Size</h4>
                  <p className="font-semibold text-orange-800">{currentModel.datasetSize}</p>
                </div>
                <div className="col-span-2 p-3 bg-gray-50 rounded-md">
                  <h4 className="text-xs font-medium text-muted-foreground">Algorithms</h4>
                  <p className="font-semibold">{currentModel.algorithms}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-semibold flex items-center">
                  <LineChart className="h-4 w-4 mr-2 text-blue-600" />
                  Performance Metrics
                </h4>
                <div className="border rounded-md p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-2 bg-white rounded border">
                      <span className="text-xs text-muted-foreground block">Mean Absolute Error:</span>
                      <span className="font-semibold text-blue-800">{currentModel.metrics.mae}</span>
                    </div>
                    <div className="p-2 bg-white rounded border">
                      <span className="text-xs text-muted-foreground block">R² Score:</span> 
                      <span className="font-semibold text-blue-800">{currentModel.metrics.r2}</span>
                    </div>
                    <div className="p-2 bg-white rounded border">
                      <span className="text-xs text-muted-foreground block">Root Mean Squared Error:</span>
                      <span className="font-semibold text-blue-800">{currentModel.metrics.rmse}</span>
                    </div>
                    <div className="p-2 bg-white rounded border">
                      <span className="text-xs text-muted-foreground block">Mean Absolute % Error:</span>
                      <span className="font-semibold text-blue-800">{currentModel.metrics.mape}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-3 rounded-md text-sm">
                <h4 className="text-xs font-semibold text-green-800 mb-1">Model Ready for Predictions</h4>
                <p className="text-xs text-green-700">
                  This model is currently being used for all price predictions on the platform.
                  Upload a new dataset and train to improve accuracy further.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminModelTraining;
