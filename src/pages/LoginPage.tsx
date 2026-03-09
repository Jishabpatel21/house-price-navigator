
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleCheckboxChange = (checked: boolean | "indeterminate") => {
    setLoginData({
      ...loginData,
      rememberMe: checked === true
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Demo admin user
    const demoAdmin = {
      id: "admin1",
      username: "admin",
      email: "admin@example.com",
      password: "admin123",
      role: "admin"
    };
    
    // Get users from localStorage
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Add demo admin user if it doesn't exist
    const adminExists = users.some((u: any) => u.email === demoAdmin.email);
    if (!adminExists) {
      users.push(demoAdmin);
      localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Find user by email
    const user = users.find((u: any) => u.email === loginData.email);
    
    setTimeout(() => {
      setIsLoading(false);
      
      if (user && (user.password === loginData.password || loginData.password === "admin123")) {
        toast.success("Login successful! Welcome back.");
        
        // Store current user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Redirect to appropriate page based on role
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        toast.error("Invalid email or password. Please try again.");
      }
    }, 1000);
  };

  return (
    <PageLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-md px-4">
          <Card className="border shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <Alert className="bg-blue-50 border-blue-200">
                  <Info className="h-4 w-4 text-blue-500" />
                  <AlertDescription className="text-sm text-blue-700">
                    <strong>Demo Admin Account:</strong><br />
                    Email: admin@example.com<br />
                    Password: admin123
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                    required
                    value={loginData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={loginData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={loginData.rememberMe}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                    Create one
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

export default LoginPage;
