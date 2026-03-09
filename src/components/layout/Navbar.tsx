
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home, 
  Search, 
  BarChart3, 
  User, 
  LogIn,
  LogOut,
  Settings,
  Shield,
  HelpCircle
} from "lucide-react";
import { toast } from "sonner";

interface UserData {
  id: string;
  username: string;
  email: string;
  role: string;
}

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  
  // Check if user is logged in on component mount
  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setUserInfo(JSON.parse(userData));
      setIsLoggedIn(true);
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setUserInfo(null);
    toast.success("You have been logged out successfully");
    navigate('/');
  };
  
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-realestate-primary" />
          <span className="font-semibold text-lg text-realestate-dark">House Price Navigator</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-realestate-primary transition-colors">Home</Link>
          <Link to="/predict" className="text-gray-600 hover:text-realestate-primary transition-colors">Predict</Link>
          <Link to="/analytics" className="text-gray-600 hover:text-realestate-primary transition-colors">Analytics</Link>
          <Link to="/about" className="text-gray-600 hover:text-realestate-primary transition-colors">About</Link>
          {userInfo?.role === 'admin' && (
            <Link to="/admin" className="text-purple-600 hover:text-purple-700 transition-colors font-medium flex items-center">
              <Shield className="h-4 w-4 mr-1" />
              Admin
            </Link>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {isLoggedIn && userInfo ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-9 w-9 border-2 border-gray-100">
                    <AvatarImage src={`https://avatar.vercel.sh/${userInfo.username}.png`} alt={userInfo.username} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-600 text-white">
                      {userInfo.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{userInfo.username}</span>
                    <span className="text-xs text-muted-foreground">{userInfo.email}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="flex items-center cursor-pointer"
                  onClick={() => navigate('/account')}
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>My Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center cursor-pointer"
                  onClick={() => navigate('/predictions')}
                >
                  <Search className="mr-2 h-4 w-4" />
                  <span>My Predictions</span>
                </DropdownMenuItem>
                {userInfo.role === 'admin' && (
                  <DropdownMenuItem
                    className="flex items-center cursor-pointer"
                    onClick={() => navigate('/admin')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center cursor-pointer text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              <Button size="sm" className="bg-realestate-primary hover:bg-realestate-secondary" asChild>
                <Link to="/register">
                  Get Started
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="md:hidden border-t">
        <div className="flex justify-around py-2">
          <Link to="/" className="flex flex-col items-center text-xs text-gray-600">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link to="/predict" className="flex flex-col items-center text-xs text-gray-600">
            <Search className="h-5 w-5" />
            <span>Predict</span>
          </Link>
          <Link to="/analytics" className="flex flex-col items-center text-xs text-gray-600">
            <BarChart3 className="h-5 w-5" />
            <span>Analytics</span>
          </Link>
          {userInfo?.role === 'admin' ? (
            <Link to="/admin" className="flex flex-col items-center text-xs text-purple-600">
              <Shield className="h-5 w-5" />
              <span>Admin</span>
            </Link>
          ) : (
            <Link to="/about" className="flex flex-col items-center text-xs text-gray-600">
              <HelpCircle className="h-5 w-5" />
              <span>About</span>
            </Link>
          )}
          <Link to={isLoggedIn ? "/account" : "/login"} className="flex flex-col items-center text-xs text-gray-600">
            <User className="h-5 w-5" />
            <span>{isLoggedIn ? "Account" : "Sign In"}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
