
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Product {
  product_id: number;
  product_name: string;
  price: number;
  category_name: string;
  image_url: string;
  created_at: string;
  stock_quantity: number;
}

const NewlyArrivedProducts: React.FC = () => {
  const [products] = useState<Product[]>([
    {
      product_id: 7,
      product_name: 'Latest Anime Figure 2024',
      price: 149.99,
      category_name: 'Anime Figures',
      image_url: '/placeholder.svg',
      created_at: '2024-01-15',
      stock_quantity: 10
    },
    {
      product_id: 8,
      product_name: 'New Action Hero Set',
      price: 94.99,
      category_name: 'Action Figures',
      image_url: '/placeholder.svg',
      created_at: '2024-01-12',
      stock_quantity: 18
    },
    {
      product_id: 9,
      product_name: 'Fresh Gaming Character',
      price: 84.99,
      category_name: 'Gaming',
      image_url: '/placeholder.svg',
      created_at: '2024-01-10',
      stock_quantity: 15
    },
    {
      product_id: 10,
      product_name: 'Brand New Collectible',
      price: 69.99,
      category_name: 'Collectibles',
      image_url: '/placeholder.svg',
      created_at: '2024-01-08',
      stock_quantity: 22
    }
  ]);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Newly Arrived Products</h2>
        <p className="text-gray-600">Fresh additions to our collection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.product_id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <img
                  src={product.image_url}
                  alt={product.product_name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <Badge className="absolute top-2 left-2 bg-green-500">New</Badge>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{product.product_name}</h3>
                <p className="text-sm text-gray-600">{product.category_name}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">
                    ${product.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    {product.stock_quantity} in stock
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  Added: {new Date(product.created_at).toLocaleDateString()}
                </p>
                <Button className="w-full">Add to Cart</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewlyArrivedProducts;
