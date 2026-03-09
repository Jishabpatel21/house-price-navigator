import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UserData {
  id: string;
  username: string;
  email: string;
  role: string;
  password?: string;
}

const AccountPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserData | null>(null);
  const [predictions, setPredictions] = useState([]);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("currentUser");
    
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setEditedUser(parsedUser);
      
      // Load user's predictions
      const allPredictions = JSON.parse(localStorage.getItem("predictions") || "[]");
      const userPredictions = allPredictions.filter((p: any) => p.userId === parsedUser.id);
      setPredictions(userPredictions);
    } else {
      toast.error("Please login to access your account");
      navigate("/login");
    }
    
    setIsLoading(false);
  }, [navigate]);
  
  const handleEditProfile = () => {
    setIsEditing(true);
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUser(user);
  };
  
  const handleSaveProfile = () => {
    if (!editedUser) return;
    
    // Update the current user in localStorage
    localStorage.setItem("currentUser", JSON.stringify(editedUser));
    
    // Update user state
    setUser(editedUser);
    
    // Also update the user in the users array
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u: UserData) => 
      u.id === editedUser.id ? { ...u, username: editedUser.username, email: editedUser.email } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editedUser) return;
    
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value
    });
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };
  
  const handleChangePassword = () => {
    if (!user) return;
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const currentUser = users.find((u: UserData) => u.id === user.id);
    
    if (!currentUser) {
      toast.error("User not found");
      return;
    }
    
    // Check if current password is correct
    if (currentUser.password !== passwordData.currentPassword) {
      toast.error("Current password is incorrect");
      return;
    }
    
    // Check if new passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    
    // Update password
    const updatedUsers = users.map((u: UserData) => 
      u.id === user.id ? { ...u, password: passwordData.newPassword } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    // Update current user if in localStorage
    const updatedUser = { ...user, password: passwordData.newPassword };
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    
    // Reset password fields
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    setShowChangePassword(false);
    toast.success("Password changed successfully!");
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-realestate-primary"></div>
        </div>
      </PageLayout>
    );
  }

  if (!user) {
    return null; // Will redirect in the useEffect
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-realestate-primary">
                <AvatarImage src={`https://avatar.vercel.sh/${user.username}.png`} />
                <AvatarFallback className="text-lg bg-realestate-primary text-white">
                  {user.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-realestate-dark">{user.username}</h1>
                <p className="text-gray-600">{user.email}</p>
                {user.role === "admin" && (
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Admin
                  </span>
                )}
              </div>
            </div>
            
            {user.role === "admin" && (
              <Button 
                className="bg-realestate-primary hover:bg-realestate-secondary"
                onClick={() => navigate("/admin")}
              >
                Admin Dashboard
              </Button>
            )}
          </div>
          
          <Tabs defaultValue="predictions" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="predictions">My Predictions</TabsTrigger>
              <TabsTrigger value="settings">Account Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="predictions">
              <Card>
                <CardHeader>
                  <CardTitle>Your Prediction History</CardTitle>
                  <CardDescription>
                    View and analyze all your previous property price predictions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {predictions.length === 0 ? (
                    <div className="text-center py-10">
                      <h3 className="text-lg font-medium text-gray-600 mb-4">No predictions yet</h3>
                      <p className="text-gray-500 max-w-md mx-auto mb-6">
                        You haven't made any property price predictions yet. Start by analyzing a property.
                      </p>
                      <Button 
                        onClick={() => navigate("/predict")}
                        className="bg-realestate-primary hover:bg-realestate-secondary"
                      >
                        Make a Prediction
                      </Button>
                    </div>
                  ) : (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Address</TableHead>
                            <TableHead>Size (sq ft)</TableHead>
                            <TableHead>Bed/Bath</TableHead>
                            <TableHead>Predicted Price</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {predictions.map((prediction: any) => (
                            <TableRow key={prediction.id}>
                              <TableCell>{prediction.address}</TableCell>
                              <TableCell>{prediction.sqft}</TableCell>
                              <TableCell>{prediction.bedrooms}/{prediction.bathrooms}</TableCell>
                              <TableCell>${prediction.predictedPrice.toLocaleString()}</TableCell>
                              <TableCell>
                                {new Date(prediction.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>
                      View and update your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input 
                              id="username"
                              name="username"
                              value={editedUser?.username || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input 
                              id="email"
                              name="email"
                              type="email"
                              value={editedUser?.email || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="pt-4 flex gap-2">
                          <Button onClick={handleSaveProfile}>
                            Save Changes
                          </Button>
                          <Button variant="outline" onClick={handleCancelEdit}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Username</h3>
                            <p className="text-gray-800">{user.username}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                            <p className="text-gray-800">{user.email}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Account Type</h3>
                            <p className="text-gray-800 capitalize">{user.role}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-gray-500">Account Created</h3>
                            <p className="text-gray-800">May 3, 2025</p>
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <Button variant="outline" onClick={handleEditProfile}>
                            Edit Profile
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy & Security</CardTitle>
                    <CardDescription>
                      Manage your account security and privacy settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {showChangePassword ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input 
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input 
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input 
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleChangePassword}>Save New Password</Button>
                          <Button variant="outline" onClick={() => setShowChangePassword(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button 
                        variant="outline" 
                        onClick={() => setShowChangePassword(true)}
                      >
                        Change Password
                      </Button>
                    )}
                    <div className="pt-4">
                      <Button 
                        variant="destructive"
                        onClick={() => {
                          localStorage.removeItem("currentUser");
                          toast.success("You have been logged out");
                          navigate("/login");
                        }}
                      >
                        Log Out
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default AccountPage;
