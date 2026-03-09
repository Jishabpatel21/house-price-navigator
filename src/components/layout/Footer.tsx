
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Github, Twitter, Facebook, MapPin, Phone, FileCog, Database, BookOpen, HelpCircle, FileCode, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const Footer = () => {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, handle newsletter subscription here
    toast.success("You've successfully subscribed to our newsletter!");
  };

  return (
    <footer className="bg-gradient-to-br from-realestate-dark to-gray-900 text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-realestate-primary" />
              House Price Navigator
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Accurate house price predictions for the real estate market, powered by advanced machine learning algorithms.
              Make informed decisions with our cutting-edge technology.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 p-0">
                  <Github className="h-4 w-4" />
                </Button>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 p-0">
                  <Twitter className="h-4 w-4" />
                </Button>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 p-0">
                  <Facebook className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/predict" className="hover:text-white transition-colors">Price Predictor</Link></li>
              <li><Link to="/analytics" className="hover:text-white transition-colors">Market Analytics</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/methodology" className="hover:text-white transition-colors flex items-center">
                  <FileCog className="h-4 w-4 mr-2 text-realestate-primary" />
                  Our Methodology
                </Link>
              </li>
              <li>
                <Link to="/dataset" className="hover:text-white transition-colors flex items-center">
                  <Database className="h-4 w-4 mr-2 text-realestate-primary" />
                  Dataset Information
                </Link>
              </li>
              <li>
                <Link to="/api-docs" className="hover:text-white transition-colors flex items-center">
                  <FileCode className="h-4 w-4 mr-2 text-realestate-primary" />
                  API Documentation
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors flex items-center">
                  <BookOpen className="h-4 w-4 mr-2 text-realestate-primary" />
                  Real Estate Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2 text-realestate-primary" />
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-white transition-colors flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2 text-realestate-primary" />
                  Support Center
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Contact & Newsletter</h4>
            <ul className="space-y-2 text-sm text-gray-300 mb-4">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-realestate-primary" />
                info@housepricenavigator.com
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-realestate-primary" />
                +1 800 555 1234
              </li>
              <li className="flex items-start mt-4">
                <MapPin className="h-4 w-4 mr-2 text-realestate-primary" />
                <span>123 Tech Park, Downtown<br />New York, NY 10001</span>
              </li>
            </ul>
            <form onSubmit={handleNewsletterSubmit} className="mt-4">
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 border-gray-700"
                  required
                />
                <Button type="submit" className="bg-realestate-primary hover:bg-realestate-secondary">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Subscribe to our newsletter for market updates and exclusive insights.
              </p>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} House Price Navigator. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
