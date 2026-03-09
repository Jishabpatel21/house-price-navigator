import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Download, Search, UserPlus, Pencil, Trash2, Shield, UserCheck } from "lucide-react";

interface User {
  id: string;
  username: string;
  email: string;
  status: string;
  predictions: number;
  joined: string;
  role: string;
}

const AdminUserTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    status: 'active',
    role: 'user'
  });
  
  // Load users from localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);
  
  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);
  
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleAddUser = () => {
    // Create new user with basic fields
    const newUserObj: User = {
      id: Date.now().toString(),
      username: newUser.username,
      email: newUser.email,
      status: newUser.status,
      role: newUser.role,
      predictions: 0,
      joined: new Date().toISOString()
    };
    
    setUsers([...users, newUserObj]);
    setIsAddDialogOpen(false);
    setNewUser({
      username: '',
      email: '',
      status: 'active',
      role: 'user'
    });
    
    toast.success(`User ${newUser.username} has been added successfully.`);
  };

  const handleUpdateUser = () => {
    if (!currentUser) return;
    
    const updatedUsers = users.map(user => 
      user.id === currentUser.id ? currentUser : user
    );
    
    setUsers(updatedUsers);
    setIsEditDialogOpen(false);
    toast.success(`User ${currentUser.username} has been updated.`);
  };

  const handleDeleteUser = () => {
    if (!currentUser) return;
    
    const updatedUsers = users.filter(user => user.id !== currentUser.id);
    setUsers(updatedUsers);
    setIsDeleteDialogOpen(false);
    toast.success(`User ${currentUser.username} has been deleted.`);
  };

  const handleExport = () => {
    // Create CSV string from users
    const csvHeader = "ID,Username,Email,Status,Role,Predictions,Joined\n";
    const csvRows = users.map(user => 
      `${user.id},${user.username},${user.email},${user.status},${user.role},${user.predictions},${user.joined}`
    ).join("\n");
    const csvString = csvHeader + csvRows;
    
    // Create and download blob
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'users.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast.success('Users data exported successfully.');
  };

  const toggleUserRole = (userId: string, currentRole: string) => {
    const newRole = currentRole === 'user' ? 'admin' : 'user';
    
    const updatedUsers = users.map(user => 
      user.id === userId ? {...user, role: newRole} : user
    );
    
    setUsers(updatedUsers);
    toast.success(`User role updated to ${newRole}.`);
  };

  return (
    <Card className="border shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">User Management</CardTitle>
        <CardDescription>
          View and manage all registered users in the system
        </CardDescription>
        <div className="flex gap-2 pt-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name or email..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Add a new user to the system with their basic information.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="new-username">Username</Label>
                  <Input 
                    id="new-username" 
                    value={newUser.username}
                    onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-email">Email</Label>
                  <Input 
                    id="new-email" 
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-status">Status</Label>
                  <Select 
                    value={newUser.status} 
                    onValueChange={(value) => setNewUser({...newUser, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-role">Role</Label>
                  <Select 
                    value={newUser.role} 
                    onValueChange={(value) => setNewUser({...newUser, role: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddUser}>Add User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-purple-50">
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Predictions</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-purple-50/50">
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={
                        user.status === "active" ? "default" : 
                        user.status === "suspended" ? "destructive" : "outline"
                      }>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.role === "admin" ? "secondary" : "outline"}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.predictions}</TableCell>
                    <TableCell>{formatDate(user.joined)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog open={isEditDialogOpen && currentUser?.id === user.id} onOpenChange={(open) => {
                          setIsEditDialogOpen(open);
                          if (open) setCurrentUser(user);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-blue-600">
                              <Pencil className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit User</DialogTitle>
                              <DialogDescription>
                                Update user information and settings
                              </DialogDescription>
                            </DialogHeader>
                            {currentUser && (
                              <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="edit-username">Username</Label>
                                  <Input 
                                    id="edit-username" 
                                    value={currentUser.username}
                                    onChange={(e) => setCurrentUser({...currentUser, username: e.target.value})}
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="edit-email">Email</Label>
                                  <Input 
                                    id="edit-email" 
                                    value={currentUser.email}
                                    onChange={(e) => setCurrentUser({...currentUser, email: e.target.value})}
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="edit-status">Status</Label>
                                  <Select 
                                    value={currentUser.status} 
                                    onValueChange={(value) => setCurrentUser({...currentUser, status: value})}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="active">Active</SelectItem>
                                      <SelectItem value="inactive">Inactive</SelectItem>
                                      <SelectItem value="suspended">Suspended</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="edit-role">Role</Label>
                                  <Select 
                                    value={currentUser.role} 
                                    onValueChange={(value) => setCurrentUser({...currentUser, role: value})}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="user">User</SelectItem>
                                      <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
                              <Button onClick={handleUpdateUser}>Save Changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-purple-600"
                          onClick={() => toggleUserRole(user.id, user.role)}
                        >
                          {user.role === 'user' ? <Shield className="h-4 w-4 mr-1" /> : <UserCheck className="h-4 w-4 mr-1" />}
                          {user.role === 'user' ? 'Make Admin' : 'Make User'}
                        </Button>
                        
                        <Dialog open={isDeleteDialogOpen && currentUser?.id === user.id} onOpenChange={(open) => {
                          setIsDeleteDialogOpen(open);
                          if (open) setCurrentUser(user);
                        }}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-red-500">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Confirm Deletion</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete the user "{currentUser?.username}"? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                              <Button variant="destructive" onClick={handleDeleteUser}>Delete User</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6 text-gray-500">
                    No users found. Add a new user to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminUserTable;
