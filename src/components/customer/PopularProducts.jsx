
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

const PopularProducts = () => {
  const [products] = useState([
    {
      product_id: 11,
      product_name: 'Bestselling Action Figure',
      price: 119.99,
      category_name: 'Action Figures',
      image_url: '/placeholder.svg',
      total_ordered: 245,
      rating: 4.8,
      stock_quantity: 12
    },
    {
      product_id: 12,
      product_name: 'Top Anime Character',
      price: 159.99,
      category_name: 'Anime Figures',
      image_url: '/placeholder.svg',
      total_ordered: 189,
      rating: 4.9,
      stock_quantity: 8
    },
    {
      product_id: 13,
      product_name: 'Popular Gaming Hero',
      price: 99.99,
      category_name: 'Gaming',
      image_url: '/placeholder.svg',
      total_ordered: 167,
      rating: 4.7,
      stock_quantity: 15
    },
    {
      product_id: 14,
      product_name: 'Fan Favorite Collectible',
      price: 89.99,
      category_name: 'Collectibles',
      image_url: '/placeholder.svg',
      total_ordered: 134,
      rating: 4.6,
      stock_quantity: 20
    }
  ]);

  const sortedProducts = products.sort((a, b) => b.total_ordered - a.total_ordered);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Popular Products</h2>
        <p className="text-gray-600">Most ordered items by our customers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product, index) => (
          <Card key={product.product_id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <img
                  src={product.image_url}
                  alt={product.product_name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <Badge className="absolute top-2 left-2 bg-orange-500">
                  #{index + 1} Popular
                </Badge>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{product.product_name}</h3>
                <p className="text-sm text-gray-600">{product.category_name}</p>
                
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.rating})</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-primary">
                    ${product.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    {product.stock_quantity} in stock
                  </span>
                </div>
                
                <p className="text-xs text-gray-400">
                  {product.total_ordered} orders
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

export default PopularProducts;
