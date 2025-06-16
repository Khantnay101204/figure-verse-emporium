
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Package, Users, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Figure Store Admin
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete management system for your figure store. Handle products, categories, promotions, and orders with ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Package className="w-12 h-12 mx-auto text-blue-500 mb-4" />
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Manage your figure inventory with detailed product information
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Shield className="w-12 h-12 mx-auto text-green-500 mb-4" />
              <CardTitle>Categories</CardTitle>
              <CardDescription>
                Organize products into logical categories for better browsing
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <BarChart3 className="w-12 h-12 mx-auto text-purple-500 mb-4" />
              <CardTitle>Promotions</CardTitle>
              <CardDescription>
                Create promo codes and category-wide sales to boost revenue
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 mx-auto text-orange-500 mb-4" />
              <CardTitle>Orders</CardTitle>
              <CardDescription>
                Track and manage customer orders from placement to delivery
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Ready to manage your store?</CardTitle>
              <CardDescription>
                Access your comprehensive admin dashboard to start managing your figure store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                size="lg" 
                className="w-full"
                onClick={() => navigate('/admin')}
              >
                Open Admin Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center text-gray-500">
          <p className="mb-4">Features included:</p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <span>✓ Product Management</span>
            <span>✓ Category Organization</span>  
            <span>✓ Promo Code System</span>
            <span>✓ Category Promotions</span>
            <span>✓ Order Tracking</span>
            <span>✓ Status Updates</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
