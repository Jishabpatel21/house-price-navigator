
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Mail, MessageSquare, Phone } from "lucide-react";

const SupportPage = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Your message has been sent! Our team will get back to you shortly.");
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-realestate-dark">Support Center</h1>
          <p className="text-lg text-center text-gray-600 mb-12">
            We're here to help you with any questions or issues you may have
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card className="flex flex-col items-center text-center">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-realestate-primary mb-2" />
                <CardTitle>Live Chat</CardTitle>
                <CardDescription>
                  Chat with our support team in real-time
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600">
                  Available Monday - Friday<br />
                  9:00 AM - 5:00 PM EST
                </p>
              </CardContent>
              <CardFooter>
                <Button className="bg-realestate-primary hover:bg-realestate-secondary" onClick={() => toast.info("Live chat feature coming soon!")}>
                  Start Chat
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="flex flex-col items-center text-center">
              <CardHeader>
                <Mail className="h-12 w-12 text-realestate-primary mb-2" />
                <CardTitle>Email Support</CardTitle>
                <CardDescription>
                  Send us an email anytime
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600">
                  We typically respond within 24 hours on business days
                </p>
              </CardContent>
              <CardFooter>
                <Button className="bg-realestate-primary hover:bg-realestate-secondary" onClick={() => window.location.href = 'mailto:support@housepricenavigator.com'}>
                  Email Us
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="flex flex-col items-center text-center">
              <CardHeader>
                <Phone className="h-12 w-12 text-realestate-primary mb-2" />
                <CardTitle>Phone Support</CardTitle>
                <CardDescription>
                  Speak directly with our team
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600">
                  Available for Pro and Enterprise customers<br />
                  (123) 456-7890
                </p>
              </CardContent>
              <CardFooter>
                <Button className="bg-realestate-primary hover:bg-realestate-secondary" onClick={() => window.location.href = 'tel:1234567890'}>
                  Call Us
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your email address" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="account">Account Issues</SelectItem>
                      <SelectItem value="prediction">Prediction Questions</SelectItem>
                      <SelectItem value="billing">Billing Support</SelectItem>
                      <SelectItem value="api">API Support</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Please describe your issue or question in detail..." className="min-h-[150px]" required />
                </div>
                
                <Button type="submit" className="bg-realestate-primary hover:bg-realestate-secondary">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-realestate-dark">How accurate are your price predictions?</h3>
                <p className="text-gray-600">Our predictions are typically within 3-5% of actual market value in areas with good data coverage.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-realestate-dark">Can I upgrade my account at any time?</h3>
                <p className="text-gray-600">Yes, you can upgrade or downgrade your account at any time through your account settings.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-realestate-dark">Do you offer refunds?</h3>
                <p className="text-gray-600">We offer a 14-day money-back guarantee for new Pro subscriptions if you're not satisfied.</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-realestate-dark">Is my data secure?</h3>
                <p className="text-gray-600">Yes, we use industry-standard encryption and security practices to protect all user data.</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button variant="outline" className="mt-4" onClick={() => window.location.href = '/faq'}>
                View All FAQs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SupportPage;
