
// Utility functions for handling subscriptions and free predictions
import { getItem, updateItem, addItem, STORES } from './dbUtils';
import { toast } from "sonner";

interface Subscription {
  id: string;
  userId: string;
  active: boolean;
  plan: string;
  startDate: string;
  expiresAt: string;
  features: { predictions: number; locations: number };
  usedPredictions: number;
}

interface UserData {
  id: string;
  username: string;
  email: string;
  freePredictions: number;
}

/**
 * Check if the user has an active subscription
 * @returns boolean indicating if the user has an active subscription
 */
export const hasActiveSubscription = async (): Promise<boolean> => {
  try {
    // Get current user ID from localStorage as we're still using that for login state
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) return false;
    
    const userId = currentUser.id;
    const subscription = await getItem<Subscription>(STORES.SUBSCRIPTIONS, userId);
    
    return subscription ? subscription.active : false;
  } catch (error) {
    console.error("Error checking subscription status:", error);
    // Fallback to localStorage for backward compatibility
    const userSubscription = JSON.parse(localStorage.getItem('userSubscription') || 'null');
    return userSubscription && userSubscription.active;
  }
};

/**
 * Get the number of free predictions remaining for the user
 * @returns number of free predictions remaining
 */
export const getFreePredictionsRemaining = async (): Promise<number> => {
  try {
    // Get current user ID from localStorage as we're still using that for login state
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) return 3; // Default if no user is logged in
    
    const userId = currentUser.id;
    const userData = await getItem<UserData>(STORES.USERS, userId);
    
    return userData && userData.freePredictions !== undefined ? userData.freePredictions : 3;
  } catch (error) {
    console.error("Error getting free predictions:", error);
    // Fallback to localStorage for backward compatibility
    const freePredictions = localStorage.getItem('freePredictions');
    return freePredictions ? parseInt(freePredictions) : 3;
  }
};

/**
 * Decrease the number of free predictions for a user
 * @returns the updated number of free predictions
 */
export const decreaseFreePredictions = async (): Promise<number> => {
  try {
    // Get current user ID from localStorage as we're still using that for login state
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) return 0;
    
    const userId = currentUser.id;
    const userData = await getItem<UserData>(STORES.USERS, userId);
    
    if (!userData) return 0;
    
    const current = userData.freePredictions !== undefined ? userData.freePredictions : 3;
    const updated = Math.max(0, current - 1); // Ensure it doesn't go below 0
    
    await updateItem<UserData>(STORES.USERS, {
      ...userData,
      freePredictions: updated
    });
    
    return updated;
  } catch (error) {
    console.error("Error decreasing free predictions:", error);
    // Fallback to localStorage for backward compatibility
    const currentPromise = getFreePredictionsRemaining();
    const current = await currentPromise;
    const updated = Math.max(0, current - 1);
    localStorage.setItem('freePredictions', updated.toString());
    return updated;
  }
};

/**
 * Get the total number of predictions a user can make based on their subscription plan
 * @returns number of predictions allowed by their subscription plan
 */
export const getSubscriptionPredictionCredits = async (): Promise<number> => {
  try {
    // Get current user ID from localStorage as we're still using that for login state
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) return 0;
    
    const userId = currentUser.id;
    const subscription = await getItem<Subscription>(STORES.SUBSCRIPTIONS, userId);
    
    if (!subscription || !subscription.active) return 0;
    
    switch (subscription.plan.toLowerCase()) {
      case 'basic':
        return 30;
      case 'premium':
        return 100;
      case 'enterprise':
        return -1; // Unlimited
      default:
        return 0;
    }
  } catch (error) {
    console.error("Error getting subscription credits:", error);
    // Fallback to localStorage for backward compatibility
    const userSubscription = JSON.parse(localStorage.getItem('userSubscription') || 'null');
    if (!userSubscription || !userSubscription.active) return 0;

    switch (userSubscription.plan.toLowerCase()) {
      case 'basic':
        return 30;
      case 'premium':
        return 100;
      case 'enterprise':
        return -1; // Unlimited
      default:
        return 0;
    }
  }
};

/**
 * Get the number of predictions left for a user based on subscription
 * @returns number of predictions left according to subscription
 */
export const getPredictionsLeft = async (): Promise<number> => {
  try {
    const isSubscribed = await hasActiveSubscription();
    
    if (!isSubscribed) {
      // User is not subscribed, return free predictions
      return getFreePredictionsRemaining();
    }
    
    // User is subscribed, return subscription credits
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) return 0;
    
    const userId = currentUser.id;
    const subscription = await getItem<Subscription>(STORES.SUBSCRIPTIONS, userId);
    
    if (!subscription) return 0;
    
    const totalCredits = await getSubscriptionPredictionCredits();
    
    // If totalCredits is -1, it means unlimited
    if (totalCredits === -1) return -1;
    
    const usedPredictions = subscription.usedPredictions || 0;
    return Math.max(0, totalCredits - usedPredictions);
  } catch (error) {
    console.error("Error getting predictions left:", error);
    // Fallback to localStorage for backward compatibility
    const userSubscription = JSON.parse(localStorage.getItem('userSubscription') || 'null');
    if (!userSubscription || !userSubscription.active) {
      // User is not subscribed, return free predictions
      const freePredictions = localStorage.getItem('freePredictions');
      return freePredictions ? parseInt(freePredictions) : 3;
    }
    
    // User is subscribed, return subscription credits
    const usedPredictions = parseInt(localStorage.getItem('usedSubscriptionPredictions') || '0');
    const totalCredits = userSubscription.plan.toLowerCase() === 'basic' ? 30 : 
                         userSubscription.plan.toLowerCase() === 'premium' ? 100 : -1;
    
    // If totalCredits is -1, it means unlimited
    if (totalCredits === -1) return -1;
    
    return Math.max(0, totalCredits - usedPredictions);
  }
};

/**
 * Decrease the number of subscription predictions for a user
 */
export const decreaseSubscriptionPredictions = async (): Promise<void> => {
  try {
    const isSubscribed = await hasActiveSubscription();
    if (!isSubscribed) return;
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) return;
    
    const userId = currentUser.id;
    const subscription = await getItem<Subscription>(STORES.SUBSCRIPTIONS, userId);
    
    if (!subscription) return;
    
    const usedPredictions = subscription.usedPredictions || 0;
    
    await updateItem<Subscription>(STORES.SUBSCRIPTIONS, {
      ...subscription,
      usedPredictions: usedPredictions + 1
    });
  } catch (error) {
    console.error("Error decreasing subscription predictions:", error);
    // Fallback to localStorage for backward compatibility
    const userSubscription = JSON.parse(localStorage.getItem('userSubscription') || 'null');
    if (!userSubscription || !userSubscription.active) return;
    
    const usedPredictions = parseInt(localStorage.getItem('usedSubscriptionPredictions') || '0');
    localStorage.setItem('usedSubscriptionPredictions', (usedPredictions + 1).toString());
  }
};

/**
 * Get the predictions used for the current subscription
 */
export const getUsedSubscriptionPredictions = async (): Promise<number> => {
  try {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) return 0;
    
    const userId = currentUser.id;
    const subscription = await getItem<Subscription>(STORES.SUBSCRIPTIONS, userId);
    
    return subscription && subscription.usedPredictions ? subscription.usedPredictions : 0;
  } catch (error) {
    console.error("Error getting used subscription predictions:", error);
    // Fallback to localStorage for backward compatibility
    return parseInt(localStorage.getItem('usedSubscriptionPredictions') || '0');
  }
};

/**
 * Reset used subscription predictions
 */
export const resetSubscriptionPredictions = async (): Promise<void> => {
  try {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) return;
    
    const userId = currentUser.id;
    const subscription = await getItem<Subscription>(STORES.SUBSCRIPTIONS, userId);
    
    if (subscription) {
      await updateItem<Subscription>(STORES.SUBSCRIPTIONS, {
        ...subscription,
        usedPredictions: 0
      });
    }
  } catch (error) {
    console.error("Error resetting subscription predictions:", error);
    // Fallback to localStorage for backward compatibility
    localStorage.setItem('usedSubscriptionPredictions', '0');
  }
};

/**
 * Mock function to add a subscription for testing purposes
 * In a real app, this would integrate with a payment provider
 * @param plan The subscription plan (basic, premium, enterprise)
 */
export const activateSubscription = async (plan: string): Promise<void> => {
  try {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!currentUser) return;
    
    const userId = currentUser.id;
    
    // Create a subscription object
    const subscription: Subscription = {
      id: userId, // Use userId as the subscription ID for simplicity
      userId: userId,
      active: true,
      plan: plan.toLowerCase(),
      startDate: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      features: getPlanFeatures(plan.toLowerCase()),
      usedPredictions: 0
    };
    
    // Store in IndexedDB
    await addItem(STORES.SUBSCRIPTIONS, subscription);
    
    // For backward compatibility, also store in localStorage
    localStorage.setItem('userSubscription', JSON.stringify({
      active: true,
      plan: plan.toLowerCase(),
      startDate: subscription.startDate,
      expiresAt: subscription.expiresAt,
      features: subscription.features
    }));
    
    // Reset the used subscription predictions counter
    await resetSubscriptionPredictions();
    
    toast.success(`${plan} subscription activated successfully!`);
  } catch (error) {
    console.error("Error activating subscription:", error);
    toast.error("Failed to activate subscription. Please try again.");
    
    // Fallback to localStorage for backward compatibility
    const subscription = {
      active: true,
      plan: plan.toLowerCase(),
      startDate: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      features: getPlanFeatures(plan.toLowerCase())
    };
    
    localStorage.setItem('userSubscription', JSON.stringify(subscription));
    localStorage.setItem('usedSubscriptionPredictions', '0');
  }
};

/**
 * Get the features for a specific plan
 * @param plan The subscription plan
 * @returns Object containing the features
 */
const getPlanFeatures = (plan: string): { predictions: number, locations: number } => {
  switch (plan) {
    case 'basic':
      return { predictions: 30, locations: 10 };
    case 'premium':
      return { predictions: 100, locations: 50 };
    case 'enterprise':
      return { predictions: -1, locations: -1 }; // Unlimited
    default:
      return { predictions: 0, locations: 0 };
  }
};

/**
 * Function to get price for a subscription plan in INR
 * @param plan The plan name
 * @returns Price in INR
 */
export const getSubscriptionPrice = (plan: string): number => {
  switch (plan.toLowerCase()) {
    case 'basic':
      return 1199; // ₹1,199
    case 'premium':
      return 2999; // ₹2,999
    case 'enterprise':
      return 7999; // ₹7,999
    default:
      return 0;
  }
};

/**
 * Calculate tax for subscription (GST 18%)
 * @param price Base price
 * @returns Tax amount
 */
export const calculateTax = (price: number): number => {
  return Math.round(price * 0.18); // 18% GST
};

/**
 * Format price in Indian Rupees
 * @param price Price to format
 * @returns Formatted price string
 */
export const formatIndianPrice = (price: number): string => {
  return `₹${price.toLocaleString('en-IN')}`;
};

