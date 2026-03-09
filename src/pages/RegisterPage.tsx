
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from "sonner";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value
    });
    
    // Calculate password strength if the password field changes
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password: string) => {
    // Simple password strength calculation
    let score = 0;
    let message = '';
    
    if (password.length === 0) {
      message = '';
    } else if (password.length < 6) {
      message = 'Weak - Too short';
      score = 1;
    } else {
      score += password.length >= 8 ? 1 : 0;
      score += /[A-Z]/.test(password) ? 1 : 0;
      score += /[a-z]/.test(password) ? 1 : 0;
      score += /[0-9]/.test(password) ? 1 : 0;
      score += /[^A-Za-z0-9]/.test(password) ? 1 : 0;
      
      if (score < 3) message = 'Weak';
      else if (score < 4) message = 'Moderate';
      else message = 'Strong';
    }
    
    setPasswordStrength({ score, message });
  };

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    setRegisterData({
      ...registerData,
      agreeToTerms: checked === true
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Basic validation
    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    
    if (!registerData.agreeToTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }
    
    setIsLoading(true);
    
    // Mock registration - directly log in the user without verification
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Registration successful! You are now logged in.");
      
      // Store user data in localStorage (a simple way to persist user data)
      const userData = {
        id: Date.now().toString(),
        username: registerData.username,
        email: registerData.email,
        role: 'user',
        joined: new Date().toISOString(),
        predictions: 0,
        status: 'active'
      };
      
      // Get existing users or initialize empty array
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      existingUsers.push(userData);
      
      // Save updated users array
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      // Set current user
      localStorage.setItem('currentUser', JSON.stringify(userData));
      
      // Redirect to home page
      navigate('/');
    }, 1500);
  };
  
  const getPasswordStrengthColor = () => {
    switch (passwordStrength.score) {
      case 0: return '';
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <PageLayout>
      <div className="flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <Card className="border shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Create an account</CardTitle>
              <CardDescription className="text-center">
                Enter your information to create your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="johndoe"
                    required
                    value={registerData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                    required
                    value={registerData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={registerData.password}
                    onChange={handleChange}
                  />
                  {registerData.password && (
                    <div className="mt-2 space-y-2">
                      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getPasswordStrengthColor()}`} 
                          style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500">{passwordStrength.message}</p>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={registerData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={registerData.agreeToTerms}
                    onCheckedChange={handleCheckboxChange}
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-blue-600 hover:text-blue-800 font-medium">
                      terms and conditions
                    </Link>
                  </label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default RegisterPage;
