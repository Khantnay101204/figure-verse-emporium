
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';

const PromoCodesList = ({
  promoCodes,
  onEdit,
  onDelete
}) => {
  return (
    <div className="space-y-4">
      {promoCodes.map(promo => (
        <div key={promo.promo_code_id} className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="font-mono">{promo.code}</Badge>
              <Badge variant={promo.is_active ? "default" : "secondary"}>
                {promo.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 mb-1">{promo.description}</p>
            <div className="text-xs text-gray-500 space-y-1">
              <p>Type: {promo.type.replace('_', ' ')}</p>
              <p>Value: {promo.type === 'percentage_discount' ? `${promo.value}%` : `$${promo.value}`}</p>
              <p>Min Order: ${promo.minimum_order_amount}</p>
              <p>Uses: {promo.uses_count}{promo.max_uses ? `/${promo.max_uses}` : ''}</p>
              <p>Valid: {promo.start_date} to {promo.end_date}</p>
            </div>
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
              onClick={() => onDelete(promo.promo_code_id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PromoCodesList;
