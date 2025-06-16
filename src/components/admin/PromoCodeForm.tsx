
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PromoFormData } from './types';

interface PromoCodeFormProps {
  formData: PromoFormData;
  setFormData: React.Dispatch<React.SetStateAction<PromoFormData>>;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isEditing: boolean;
}

const PromoCodeForm: React.FC<PromoCodeFormProps> = ({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  isEditing
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <Label htmlFor="code">Code</Label>
        <Input
          id="code"
          value={formData.code}
          onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          rows={2}
        />
      </div>
      <div>
        <Label htmlFor="type">Type</Label>
        <Select value={formData.type} onValueChange={(value: 'percentage_discount' | 'fixed_amount_discount' | 'free_shipping') => setFormData(prev => ({ ...prev, type: value }))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="percentage_discount">Percentage Discount</SelectItem>
            <SelectItem value="fixed_amount_discount">Fixed Amount Discount</SelectItem>
            <SelectItem value="free_shipping">Free Shipping</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="value">Value</Label>
        <Input
          id="value"
          type="number"
          step="0.01"
          value={formData.value}
          onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label htmlFor="min_order">Minimum Order Amount</Label>
        <Input
          id="min_order"
          type="number"
          step="0.01"
          value={formData.minimum_order_amount}
          onChange={(e) => setFormData(prev => ({ ...prev, minimum_order_amount: e.target.value }))}
        />
      </div>
      <div>
        <Label htmlFor="max_uses">Max Uses (optional)</Label>
        <Input
          id="max_uses"
          type="number"
          value={formData.max_uses}
          onChange={(e) => setFormData(prev => ({ ...prev, max_uses: e.target.value }))}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label htmlFor="start_date">Start Date</Label>
          <Input
            id="start_date"
            type="date"
            value={formData.start_date}
            onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="end_date">End Date</Label>
          <Input
            id="end_date"
            type="date"
            value={formData.end_date}
            onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
            required
          />
        </div>
      </div>
      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1">
          {isEditing ? 'Update' : 'Create'} Promo Code
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default PromoCodeForm;
