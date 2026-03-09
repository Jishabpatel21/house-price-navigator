
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { toast } from "sonner";

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock password reset request
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      toast.success("Reset link sent! Check your email inbox.");
    }, 1500);
  };

  if (submitted) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="w-full max-w-md px-4">
            <Card className="border shadow-lg">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Check your email</CardTitle>
                <CardDescription className="text-center">
                  We've sent a password reset link to {email}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <p className="text-sm text-gray-600">
                  If you don't see it in your inbox, please check your spam folder.
                </p>
                <p className="text-sm text-gray-600">
                  The link will expire in 30 minutes.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  onClick={() => setSubmitted(false)} 
                  variant="outline"
                  className="w-full"
                >
                  Try another email
                </Button>
                <div className="text-center text-sm">
                  Remember your password?{" "}
                  <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-md px-4">
          <Card className="border shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">Forgot password</CardTitle>
              <CardDescription className="text-center">
                Enter your email address and we'll send you a reset link
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? "Sending reset link..." : "Send reset link"}
                </Button>
                <div className="text-center text-sm">
                  Remember your password?{" "}
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

export default ForgotPasswordPage;
