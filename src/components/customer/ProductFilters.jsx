
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const ProductFilters = ({
  selectedCategory,
  priceRange,
  onCategoryChange,
  onPriceRangeChange
}) => {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  const categories = [
    { id: 1, name: 'Action Figures' },
    { id: 2, name: 'Anime Figures' },
    { id: 3, name: 'Collectibles' },
    { id: 4, name: 'Limited Edition' },
    { id: 5, name: 'Vintage' },
    { id: 6, name: 'Gaming' },
  ];

  const handlePriceRangeSubmit = () => {
    onPriceRangeChange(localPriceRange.min, localPriceRange.max);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="all-categories"
              checked={selectedCategory === null}
              onCheckedChange={() => onCategoryChange(null)}
            />
            <Label htmlFor="all-categories" className="text-sm">All Categories</Label>
          </div>
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategory === category.id}
                onCheckedChange={() => onCategoryChange(category.id)}
              />
              <Label htmlFor={`category-${category.id}`} className="text-sm">
                {category.name}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="min-price" className="text-xs text-gray-600">Min</Label>
              <Input
                id="min-price"
                type="number"
                value={localPriceRange.min}
                onChange={(e) => setLocalPriceRange(prev => ({ 
                  ...prev, 
                  min: parseInt(e.target.value) || 0 
                }))}
                className="h-8"
              />
            </div>
            <div>
              <Label htmlFor="max-price" className="text-xs text-gray-600">Max</Label>
              <Input
                id="max-price"
                type="number"
                value={localPriceRange.max}
                onChange={(e) => setLocalPriceRange(prev => ({ 
                  ...prev, 
                  max: parseInt(e.target.value) || 1000 
                }))}
                className="h-8"
              />
            </div>
          </div>
          <Button 
            onClick={handlePriceRangeSubmit}
            className="w-full h-8 text-sm"
          >
            Apply Filter
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductFilters;
