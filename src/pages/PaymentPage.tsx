
import React, { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Check, CreditCard, ArrowLeft } from "lucide-react";
import { activateSubscription, getSubscriptionPrice, calculateTax, formatIndianPrice } from '@/utils/subscriptionUtils';

const planDetails = {
  'basic': {
    name: 'Basic Analytics',
    description: 'For casual investors and first-time homebuyers',
    features: [
      '30 property price predictions',
      'Access to 10 locations',
      'Monthly market trend reports',
      'Basic neighborhood comparison',
      'Email support'
    ]
  },
  'premium': {
    name: 'Premium Analytics',
    description: 'For serious property investors and agents',
    features: [
      '100 property price predictions',
      'Access to 50+ locations',
      'Weekly detailed market reports',
      'Investment opportunity alerts',
      'Priority email & phone support'
    ]
  },
  'enterprise': {
    name: 'Enterprise Analytics',
    description: 'For developers and institutional investors',
    features: [
      'Unlimited property price predictions',
      'Access to unlimited locations',
      'Daily market updates',
      'Custom analytics dashboard',
      'API access to raw data',
      'Dedicated account manager',
      'Quarterly strategy consultation'
    ]
  }
};

// Mock subscription data to be saved to the subscription table
let subscriptionCounter = 6; // Start after our existing 5 mock subscriptions

const PaymentPage = () => {
  const { plan } = useParams<{ plan: string }>();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  
  if (!plan || !planDetails[plan as keyof typeof planDetails]) {
    return (
      <PageLayout>
        <div className="py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Plan Selected</h1>
          <p className="mb-6">Please select a valid subscription plan.</p>
          <Button onClick={() => navigate('/advanced-analytics')}>
            Return to Plans
          </Button>
        </div>
      </PageLayout>
    );
  }
  
  const selectedPlan = planDetails[plan as keyof typeof planDetails];
  const basePrice = getSubscriptionPrice(plan);
  const taxAmount = calculateTax(basePrice);
  const totalPrice = basePrice + taxAmount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const saveSubscription = () => {
    // Get the current user from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    
    if (!currentUser) {
      console.error("No user logged in");
      return;
    }
    
    // Create subscription start and end dates (1-year subscription)
    const today = new Date();
    const endDate = new Date();
    endDate.setFullYear(today.getFullYear() + 1);
    
    const newSubscription = {
      id: subscriptionCounter++,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      plan: selectedPlan.name.split(' ')[0], // 'Basic', 'Premium', or 'Enterprise'
      startDate: today.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      status: 'active'
    };
    
    console.log('Subscription saved:', newSubscription);
    
    // Get existing subscribers from localStorage or initialize empty array
    const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
    
    // Add new subscriber
    subscribers.push(newSubscription);
    
    // Save updated subscribers list
    localStorage.setItem('subscribers', JSON.stringify(subscribers));
    
    // Save user subscription info to user profile
    if (currentUser) {
      currentUser.subscription = {
        plan: selectedPlan.name.split(' ')[0],
        startDate: today.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        status: 'active'
      };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    
    // Activate the subscription using the utility function
    activateSubscription(selectedPlan.name.split(' ')[0].toLowerCase());
    
    console.log("Subscription saved to localStorage and user profile");
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Save the subscription details
      saveSubscription();
      
      toast.success("Payment successful! Your subscription has been activated.");
    }, 2000);
  };

  const handleGoBack = () => {
    navigate('/advanced-analytics');
  };

  return (
    <PageLayout>
      <div className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Button 
            variant="ghost" 
            onClick={handleGoBack} 
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Plans
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-realestate-dark mb-2">Complete Your Subscription</h1>
            <p className="text-gray-600">
              You're subscribing to the {selectedPlan.name} plan
            </p>
          </div>

          {paymentSuccess ? (
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <div className="flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl text-green-800">Payment Successful!</CardTitle>
                  <CardDescription className="text-green-700 mt-2">
                    Your {selectedPlan.name} subscription has been activated
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4">Thank you for subscribing to our analytics services.</p>
                <p className="font-medium mb-6">Your subscription is now active.</p>
                <div className="flex justify-center gap-4">
                  <Button onClick={() => navigate('/analytics')}>
                    Go to Analytics
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/account')}>
                    Manage Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Details</CardTitle>
                    <CardDescription>
                      Enter your payment information to complete your subscription
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePayment}>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input 
                              id="firstName" 
                              placeholder="John" 
                              value={formData.firstName}
                              onChange={handleInputChange}
                              required 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input 
                              id="lastName" 
                              placeholder="Doe" 
                              value={formData.lastName}
                              onChange={handleInputChange}
                              required 
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="john@example.com" 
                            value={formData.email}
                            onChange={handleInputChange}
                            required 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <div className="flex border rounded-md overflow-hidden">
                            <div className="bg-gray-50 p-2 flex items-center">
                              <CreditCard className="h-4 w-4 text-gray-500" />
                            </div>
                            <Input 
                              id="cardNumber" 
                              className="border-0 focus-visible:ring-0" 
                              placeholder="4242 4242 4242 4242"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2 col-span-2">
                            <Label htmlFor="expiry">Expiration (MM/YY)</Label>
                            <Input id="expiry" placeholder="MM/YY" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="CVC" required />
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <Button 
                            type="submit" 
                            className="w-full" 
                            disabled={isProcessing}
                          >
                            {isProcessing ? "Processing..." : `Pay ${formatIndianPrice(totalPrice)}`}
                          </Button>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium">{selectedPlan.name}</h3>
                        <p className="text-sm text-gray-500">{selectedPlan.description}</p>
                      </div>
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between mb-2">
                          <span>Subscription</span>
                          <span>{formatIndianPrice(basePrice)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                          <span>GST (18%)</span>
                          <span>{formatIndianPrice(taxAmount)}</span>
                        </div>
                        <div className="border-t pt-2 mt-2 font-medium">
                          <div className="flex justify-between">
                            <span>Total</span>
                            <span>{formatIndianPrice(totalPrice)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default PaymentPage;
