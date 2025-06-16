
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
  stock_quantity: number;
  is_featured: boolean;
}

interface ProductGridProps {
  searchQuery: string;
  selectedCategory: number | null;
  priceRange: { min: number; max: number };
}

const ProductGrid: React.FC<ProductGridProps> = ({
  searchQuery,
  selectedCategory,
  priceRange
}) => {
  const [products] = useState<Product[]>([
    {
      product_id: 1,
      product_name: 'Premium Action Figure Set',
      price: 89.99,
      category_name: 'Action Figures',
      image_url: '/placeholder.svg',
      stock_quantity: 15,
      is_featured: true
    },
    {
      product_id: 2,
      product_name: 'Anime Character Collectible',
      price: 124.99,
      category_name: 'Anime Figures',
      image_url: '/placeholder.svg',
      stock_quantity: 8,
      is_featured: false
    },
    {
      product_id: 3,
      product_name: 'Limited Edition Figure',
      price: 299.99,
      category_name: 'Limited Edition',
      image_url: '/placeholder.svg',
      stock_quantity: 3,
      is_featured: true
    },
    {
      product_id: 4,
      product_name: 'Vintage Collectible',
      price: 199.99,
      category_name: 'Vintage',
      image_url: '/placeholder.svg',
      stock_quantity: 12,
      is_featured: false
    },
    {
      product_id: 5,
      product_name: 'Gaming Hero Figure',
      price: 79.99,
      category_name: 'Gaming',
      image_url: '/placeholder.svg',
      stock_quantity: 20,
      is_featured: true
    },
    {
      product_id: 6,
      product_name: 'Collectible Series #1',
      price: 45.99,
      category_name: 'Collectibles',
      image_url: '/placeholder.svg',
      stock_quantity: 25,
      is_featured: false
    }
  ]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.product_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === null || product.category_name === getCategoryName(selectedCategory);
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  function getCategoryName(categoryId: number): string {
    const categoryMap: { [key: number]: string } = {
      1: 'Action Figures',
      2: 'Anime Figures',
      3: 'Collectibles',
      4: 'Limited Edition',
      5: 'Vintage',
      6: 'Gaming'
    };
    return categoryMap[categoryId] || '';
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Products</h2>
        <p className="text-gray-600">{filteredProducts.length} products found</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.product_id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="relative mb-4">
                <img
                  src={product.image_url}
                  alt={product.product_name}
                  className="w-full h-48 object-cover rounded-md"
                />
                {product.is_featured && (
                  <Badge className="absolute top-2 left-2">Featured</Badge>
                )}
                {product.stock_quantity < 10 && (
                  <Badge variant="destructive" className="absolute top-2 right-2">
                    Low Stock
                  </Badge>
                )}
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
                <Button className="w-full">Add to Cart</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
