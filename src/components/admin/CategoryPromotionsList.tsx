
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import { CategoryPromotion } from './types';

interface CategoryPromotionsListProps {
  categoryPromotions: CategoryPromotion[];
  onEdit: (promo: CategoryPromotion) => void;
  onDelete: (promoId: number) => void;
}

const CategoryPromotionsList: React.FC<CategoryPromotionsListProps> = ({
  categoryPromotions,
  onEdit,
  onDelete
}) => {
  return (
    <div className="space-y-4">
      {categoryPromotions.map(promo => (
        <div key={promo.category_promo_id} className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">{promo.category_name}</Badge>
              <Badge variant="secondary">{promo.discount_percentage}% OFF</Badge>
              <Badge variant={promo.is_active ? "default" : "secondary"}>
                {promo.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-1">{promo.description}</p>
            <p className="text-xs text-gray-500">
              Valid: {promo.start_date} to {promo.end_date}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(promo)}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(promo.category_promo_id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryPromotionsList;
