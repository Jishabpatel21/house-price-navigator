
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Pencil, Trash2 } from "lucide-react";

// Mock data for subscribers
const initialSubscribers = [
  {
    id: 1,
    name: 'Raj Sharma',
    email: 'raj.sharma@example.com',
    plan: 'Premium',
    startDate: '2023-11-15',
    endDate: '2024-11-15',
    status: 'active'
  },
  {
    id: 2,
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    plan: 'Basic',
    startDate: '2023-10-22',
    endDate: '2024-10-22',
    status: 'active'
  },
  {
    id: 3,
    name: 'Vikram Singh',
    email: 'vikram.singh@example.com',
    plan: 'Enterprise',
    startDate: '2023-12-05',
    endDate: '2024-12-05',
    status: 'active'
  },
  {
    id: 4,
    name: 'Neha Gupta',
    email: 'neha.gupta@example.com',
    plan: 'Premium',
    startDate: '2023-09-18',
    endDate: '2024-09-18',
    status: 'active'
  },
  {
    id: 5,
    name: 'Arjun Reddy',
    email: 'arjun.reddy@example.com',
    plan: 'Basic',
    startDate: '2023-08-30',
    endDate: '2024-08-30',
    status: 'inactive'
  }
];

type Subscriber = {
  id: number;
  name: string;
  email: string;
  plan: string;
  startDate: string;
  endDate: string;
  status: string;
}

const AdminSubscriptionTable = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [editingSubscription, setEditingSubscription] = useState<Subscriber | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [subscriberToDelete, setSubscriberToDelete] = useState<number | null>(null);
  
  // Load subscribers from localStorage or use initial data
  useEffect(() => {
    const storedSubscribers = localStorage.getItem('subscribers');
    if (storedSubscribers) {
      const parsedSubscribers = JSON.parse(storedSubscribers);
      // Combine our initial subscribers with any stored in localStorage
      setSubscribers([...initialSubscribers, ...parsedSubscribers]);
    } else {
      setSubscribers(initialSubscribers);
    }
  }, []);
  
  // Handle edit subscriber
  const handleEditSubscriber = (subscriber: Subscriber) => {
    setEditingSubscription({...subscriber});
    setIsEditDialogOpen(true);
  };
  
  // Handle update subscriber
  const handleUpdateSubscriber = () => {
    if (!editingSubscription) return;
    
    const updatedSubscribers = subscribers.map(sub => 
      sub.id === editingSubscription.id ? editingSubscription : sub
    );
    setSubscribers(updatedSubscribers);
    
    // Also update in localStorage if the subscriber came from there
    const storedSubscribers = localStorage.getItem('subscribers');
    if (storedSubscribers) {
      const parsedSubscribers = JSON.parse(storedSubscribers);
      const isFromStorage = parsedSubscribers.some((sub: Subscriber) => sub.id === editingSubscription.id);
      
      if (isFromStorage) {
        const updatedStoredSubscribers = parsedSubscribers.map((sub: Subscriber) => 
          sub.id === editingSubscription.id ? editingSubscription : sub
        );
        localStorage.setItem('subscribers', JSON.stringify(updatedStoredSubscribers));
      }
    }
    
    setIsEditDialogOpen(false);
    toast.success("Subscription updated successfully");
  };
  
  // Handle delete subscriber
  const handleDeleteSubscriber = (id: number) => {
    setSubscriberToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  // Confirm delete subscriber
  const confirmDeleteSubscriber = () => {
    if (subscriberToDelete === null) return;
    
    const updatedSubscribers = subscribers.filter(sub => sub.id !== subscriberToDelete);
    setSubscribers(updatedSubscribers);
    
    // Also update in localStorage if the subscriber came from there
    const storedSubscribers = localStorage.getItem('subscribers');
    if (storedSubscribers) {
      const parsedSubscribers = JSON.parse(storedSubscribers);
      const isFromStorage = parsedSubscribers.some((sub: Subscriber) => sub.id === subscriberToDelete);
      
      if (isFromStorage) {
        const updatedStoredSubscribers = parsedSubscribers.filter((sub: Subscriber) => 
          sub.id !== subscriberToDelete
        );
        localStorage.setItem('subscribers', JSON.stringify(updatedStoredSubscribers));
      }
    }
    
    setIsDeleteDialogOpen(false);
    setSubscriberToDelete(null);
    toast.success("Subscription deleted successfully");
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Subscribers</h2>
        <div className="text-sm text-gray-500">
          <span className="font-medium">{subscribers.filter(s => s.status === 'active').length} Active</span> / {subscribers.length} Total
        </div>
      </div>
      
      <Table>
        <TableCaption>A list of subscribers to the analytics services.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscribers.map((subscriber) => (
            <TableRow key={subscriber.id}>
              <TableCell className="font-medium">{subscriber.name}</TableCell>
              <TableCell>{subscriber.email}</TableCell>
              <TableCell>
                <Badge 
                  className={
                    subscriber.plan === 'Basic' ? 'bg-blue-100 text-blue-800' : 
                    subscriber.plan === 'Premium' ? 'bg-purple-100 text-purple-800' : 
                    'bg-green-100 text-green-800'
                  }
                >
                  {subscriber.plan}
                </Badge>
              </TableCell>
              <TableCell>{new Date(subscriber.startDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(subscriber.endDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Badge 
                  variant={subscriber.status === 'active' ? 'default' : 'outline'}
                  className={subscriber.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                >
                  {subscriber.status === 'active' ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleEditSubscriber(subscriber)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteSubscriber(subscriber.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Edit Subscription Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subscription</DialogTitle>
            <DialogDescription>
              Update the subscription details below.
            </DialogDescription>
          </DialogHeader>
          {editingSubscription && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={editingSubscription.name}
                  onChange={(e) => setEditingSubscription({...editingSubscription, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={editingSubscription.email}
                  onChange={(e) => setEditingSubscription({...editingSubscription, email: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="plan" className="text-right">
                  Plan
                </Label>
                <Select 
                  value={editingSubscription.plan}
                  onValueChange={(value) => setEditingSubscription({...editingSubscription, plan: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={editingSubscription.startDate}
                  onChange={(e) => setEditingSubscription({...editingSubscription, startDate: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={editingSubscription.endDate}
                  onChange={(e) => setEditingSubscription({...editingSubscription, endDate: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select 
                  value={editingSubscription.status}
                  onValueChange={(value) => setEditingSubscription({...editingSubscription, status: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateSubscriber}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this subscription? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDeleteSubscriber}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSubscriptionTable;
