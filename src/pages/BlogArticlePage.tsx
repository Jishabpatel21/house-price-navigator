
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { blogPosts } from '@/data/blogData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Share2, ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const BlogArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (id) {
      const foundPost = blogPosts.find(post => post.id.toString() === id);
      
      if (foundPost) {
        setPost(foundPost);
        
        // Find related posts with the same category
        const related = blogPosts
          .filter(p => p.id !== foundPost.id && p.category === foundPost.category)
          .slice(0, 3);
        setRelatedPosts(related);
      }
      
      setLoading(false);
    }
  }, [id]);

  const handleShare = async () => {
    if (!post) return;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } else {
        // Fallback for browsers that don't support the Web Share API
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Article link copied to clipboard!");
      }
    } catch (error) {
      toast.error("Failed to share article");
      console.error("Error sharing:", error);
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="h-64 bg-gray-200 rounded mb-6"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!post) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
            <p className="text-gray-600 mb-6">Sorry, we couldn't find the article you're looking for.</p>
            <Button asChild>
              <Link to="/blog">Return to Blog</Link>
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="mb-4 pl-0" 
              onClick={() => navigate('/blog')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
            
            <div className="flex justify-between items-center">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {post.category}
              </span>
              <Button variant="ghost" size="sm" onClick={handleShare} className="flex items-center">
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mt-4 mb-4 text-realestate-dark">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-gray-500 text-sm mb-8">
              <div className="flex items-center mr-4 mb-2">
                <User className="h-4 w-4 mr-1" /> {post.author}
              </div>
              <div className="flex items-center mr-4 mb-2">
                <Calendar className="h-4 w-4 mr-1" /> {post.date}
              </div>
              <div className="flex items-center mb-2">
                <Clock className="h-4 w-4 mr-1" /> {post.readTime}
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-auto rounded-lg shadow-md object-cover"
              style={{ maxHeight: '500px' }}
            />
          </div>
          
          <div className="prose prose-lg max-w-none prose-headings:text-realestate-dark prose-a:text-blue-600">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold mb-4">Share This Article</h3>
            <div className="flex space-x-2">
              <Button onClick={handleShare} className="bg-realestate-primary hover:bg-realestate-secondary">
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
            </div>
          </div>
          
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <Link to={`/blog/${relatedPost.id}`} className="block">
                      <div className="h-36 overflow-hidden">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-base line-clamp-2 mb-2">{relatedPost.title}</h4>
                        <p className="text-gray-500 text-xs">{relatedPost.date} · {relatedPost.readTime}</p>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default BlogArticlePage;
