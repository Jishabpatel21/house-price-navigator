
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { blogPosts } from '@/data/blogData';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

const BlogPage = () => {
  const handleShare = async (post) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: `${window.location.origin}/blog/${post.id}`,
        });
      } else {
        // Fallback for browsers that don't support the Web Share API
        await navigator.clipboard.writeText(`${window.location.origin}/blog/${post.id}`);
        toast.success("Blog link copied to clipboard!");
      }
    } catch (error) {
      toast.error("Failed to share blog post");
      console.error("Error sharing:", error);
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 text-realestate-dark">Indian Real Estate Blog</h1>
          <p className="text-lg text-center text-gray-600 mb-12">
            Expert insights, market analysis, and tips for navigating the Indian real estate market
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="flex flex-col h-full overflow-hidden hover:shadow-lg transition-shadow">
                <div className="w-full h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardHeader className="py-4 px-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        {post.category}
                      </span>
                      <span className="ml-2">· {post.readTime}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-gray-500 hover:text-blue-600 p-0 h-auto"
                      onClick={() => handleShare(post)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-xl leading-tight mt-2">{post.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-0 px-5 flex-grow">
                  <div className="flex items-center text-sm text-gray-500">
                    <span>By {post.author}</span>
                    <span className="mx-1">·</span>
                    <span>{post.date}</span>
                  </div>
                </CardContent>
                <CardFooter className="py-4 px-5">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`/blog/${post.id}`}>Read Article</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button className="bg-realestate-primary hover:bg-realestate-secondary">
              Load More Articles
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BlogPage;
