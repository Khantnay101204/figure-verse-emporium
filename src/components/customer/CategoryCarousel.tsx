
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface Category {
  category_id: number;
  category_name: string;
  image_url: string;
}

interface CategoryCarouselProps {
  onCategorySelect: (categoryId: number) => void;
}

const CategoryCarousel: React.FC<CategoryCarouselProps> = ({ onCategorySelect }) => {
  const [categories] = useState<Category[]>([
    { category_id: 1, category_name: 'Action Figures', image_url: '/placeholder.svg' },
    { category_id: 2, category_name: 'Anime Figures', image_url: '/placeholder.svg' },
    { category_id: 3, category_name: 'Collectibles', image_url: '/placeholder.svg' },
    { category_id: 4, category_name: 'Limited Edition', image_url: '/placeholder.svg' },
    { category_id: 5, category_name: 'Vintage', image_url: '/placeholder.svg' },
    { category_id: 6, category_name: 'Gaming', image_url: '/placeholder.svg' },
  ]);

  return (
    <div className="relative overflow-hidden py-6">
      <h2 className="text-2xl font-bold text-center mb-6">Shop by Category</h2>
      
      <div className="relative">
        <div className="flex animate-scroll space-x-6">
          {[...categories, ...categories].map((category, index) => (
            <Card 
              key={`${category.category_id}-${index}`}
              className="flex-shrink-0 w-48 h-32 cursor-pointer hover:scale-105 transition-transform duration-300 overflow-hidden"
              onClick={() => onCategorySelect(category.category_id)}
            >
              <div className="relative w-full h-full">
                <img
                  src={category.image_url}
                  alt={category.category_name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white font-semibold text-center px-2">
                    {category.category_name}
                  </h3>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
          
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `
      }} />
    </div>
  );
};

export default CategoryCarousel;
