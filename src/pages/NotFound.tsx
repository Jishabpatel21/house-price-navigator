
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md px-4">
        <h1 className="text-6xl font-bold text-realestate-primary mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-2">Page not found</p>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <div className="flex flex-col space-y-3">
          <Button asChild className="w-full">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Home
            </Link>
          </Button>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <Button variant="outline" asChild className="w-full">
              <Link to="/predict">Price Predictor</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/analytics">Market Analytics</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link to="/support">Get Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
