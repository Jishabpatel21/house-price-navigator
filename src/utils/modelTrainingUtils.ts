
/**
 * Utility functions for the house price prediction model training
 */

// Model parameters
export interface ModelParameters {
  learningRate: number;
  epochs: number;
  batchSize: number;
  regularization: number;
  hiddenLayers: number[];
  activationFunction: string;
}

// Training metrics
export interface TrainingMetrics {
  epoch: number;
  loss: number;
  accuracy: number;
  validationLoss: number;
  validationAccuracy: number;
}

// Feature importance
export interface FeatureImportance {
  feature: string;
  importance: number;
}

/**
 * Simulate model training process
 * @param parameters Model training parameters
 * @param callback Function to call with progress updates
 * @returns Promise that resolves with training metrics
 */
export const trainModel = async (
  parameters: ModelParameters,
  callback: (progress: number, metrics?: TrainingMetrics) => void
): Promise<TrainingMetrics[]> => {
  const metrics: TrainingMetrics[] = [];
  const totalEpochs = parameters.epochs;
  
  // Initial loss and accuracy values based on model complexity
  const initialLoss = 0.8 + (Math.random() * 0.4);
  const initialAccuracy = 0.5 + (Math.random() * 0.2);
  
  // Learning curve parameters - how quickly the model improves
  const learningEfficiency = parameters.learningRate * (1 + parameters.hiddenLayers.length * 0.05);
  
  // Regularization effect - prevents overfitting
  const regularizationFactor = parameters.regularization * 2;
  
  // Simulate training process
  for (let epoch = 1; epoch <= totalEpochs; epoch++) {
    // Wait to simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Calculate progress percentage
    const progress = (epoch / totalEpochs) * 100;
    
    // Simulate improvements in loss and accuracy over epochs
    // Using a logarithmic improvement curve that plateaus
    const epochFactor = Math.log(epoch + 1) / Math.log(totalEpochs + 1);
    
    // Loss decreases over time (with some randomness)
    const loss = Math.max(0.05, initialLoss * (1 - (epochFactor * learningEfficiency))) + 
                 (Math.random() * 0.05) - 0.025;
    
    // Validation loss - slightly higher than training loss
    const validationLoss = loss * (1 + (Math.random() * 0.2)) + 
                          (regularizationFactor * 0.01);
    
    // Accuracy increases over time (with some randomness)
    const accuracy = Math.min(0.98, initialAccuracy + (epochFactor * learningEfficiency * 0.5)) + 
                    (Math.random() * 0.02) - 0.01;
    
    // Validation accuracy - slightly lower than training accuracy
    const validationAccuracy = accuracy * (1 - (Math.random() * 0.05)) - 
                              (regularizationFactor * 0.01);
    
    // Create metrics for this epoch
    const epochMetrics: TrainingMetrics = {
      epoch,
      loss: parseFloat(loss.toFixed(4)),
      accuracy: parseFloat(accuracy.toFixed(4)),
      validationLoss: parseFloat(validationLoss.toFixed(4)),
      validationAccuracy: parseFloat(validationAccuracy.toFixed(4))
    };
    
    // Add to metrics history
    metrics.push(epochMetrics);
    
    // Send progress update to callback
    callback(progress, epochMetrics);
  }
  
  return metrics;
};

/**
 * Get feature importance from the trained model
 * @returns Array of feature importances
 */
export const getFeatureImportance = (): FeatureImportance[] => {
  // Realistic feature importance for Indian real estate
  return [
    { feature: "Location", importance: 0.38 + (Math.random() * 0.04) },
    { feature: "Area (sq.ft)", importance: 0.25 + (Math.random() * 0.03) },
    { feature: "Bedrooms", importance: 0.12 + (Math.random() * 0.02) },
    { feature: "Bathrooms", importance: 0.09 + (Math.random() * 0.02) },
    { feature: "Age", importance: 0.07 + (Math.random() * 0.015) },
    { feature: "Garage", importance: 0.05 + (Math.random() * 0.01) },
    { feature: "Swimming Pool", importance: 0.04 + (Math.random() * 0.01) }
  ].sort((a, b) => b.importance - a.importance); // Sort by descending importance
};

/**
 * Evaluate the model using test data
 * @returns Evaluation metrics
 */
export const evaluateModel = (): {
  r2Score: number;
  maeScore: number;
  rmseScore: number;
  medianAbsError: number;
} => {
  // Simulate realistic model evaluation metrics
  return {
    r2Score: 0.82 + (Math.random() * 0.06),           // R² score (higher is better)
    maeScore: 200000 + (Math.random() * 100000),      // Mean Absolute Error in INR
    rmseScore: 350000 + (Math.random() * 150000),     // Root Mean Squared Error in INR
    medianAbsError: 180000 + (Math.random() * 80000)  // Median Absolute Error in INR
  };
};

/**
 * Save the trained model (simulation)
 * @param version Version string
 * @returns Promise that resolves when save is complete
 */
export const saveModel = async (version: string): Promise<boolean> => {
  // Simulate saving the model
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Store model version in localStorage for retrieval
  localStorage.setItem('currentModelVersion', version);
  localStorage.setItem(`model_${version}_timestamp`, new Date().toISOString());
  
  return true;
};

/**
 * Get the current model version
 * @returns Model version string
 */
export const getCurrentModelVersion = (): string => {
  return localStorage.getItem('currentModelVersion') || '3.2.1';
};

/**
 * Get model accuracy
 * @returns Number between 0 and 1 representing model accuracy
 */
export const getModelAccuracy = (): number => {
  // Return a realistic accuracy for real estate prediction (85-95%)
  return 0.85 + (Math.random() * 0.10);
};
