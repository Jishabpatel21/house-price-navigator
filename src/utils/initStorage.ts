
import { initDB } from './dbUtils';
import { toast } from 'sonner';

/**
 * Initialize the application's storage systems
 */
export const initializeStorage = async (): Promise<void> => {
  try {
    console.info('Initializing permanent storage...');
    
    // Initialize IndexedDB
    await initDB();
    console.info('Permanent storage initialized successfully');
    
    // Initialize model version if not already set
    if (!localStorage.getItem('currentModelVersion')) {
      localStorage.setItem('currentModelVersion', '3.2.1');
      localStorage.setItem('model_3.2.1_timestamp', new Date().toISOString());
      console.info('Initialized model version data');
    }
    
    // Initialize currency information
    localStorage.setItem('appCurrency', 'INR');
    localStorage.setItem('currencySymbol', '₹');
    
  } catch (error) {
    console.error('Failed to initialize permanent storage:', error);
    toast.error('Failed to initialize storage. Some features may not work properly.');
  }
};

// Initialize storage when this file is imported
initializeStorage();
