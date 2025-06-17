
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ShoppingBag, Settings } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">FigureVerse</h1>
          <p className="text-xl text-gray-600">Your premium destination for collectible figures</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingBag className="w-6 h-6 mr-2" />
                Customer Store
              </CardTitle>
              <CardDescription>
                Browse and shop for collectible figures, anime merchandise, and limited edition items.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/store">
                <Button className="w-full">Enter Store</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-6 h-6 mr-2" />
                Admin Dashboard
              </CardTitle>
              <CardDescription>
                Manage products, promotions, and store settings. Admin access required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/admin">
                <Button variant="outline" className="w-full">Admin Panel</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
