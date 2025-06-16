
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Gift, Percent } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PromoCode {
  promo_code_id: number;
  code: string;
  description: string;
  type: 'percentage_discount' | 'fixed_amount_discount' | 'free_shipping';
  value: number;
  minimum_order_amount: number;
  max_uses: number | null;
  uses_count: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

interface CategoryPromotion {
  category_promo_id: number;
  category_id: number;
  category_name: string;
  discount_percentage: number;
  start_date: string;
  end_date: string;
  description: string;
  is_active: boolean;
}

const PromotionsManager = () => {
  const { toast } = useToast();
  const [isPromoDialogOpen, setIsPromoDialogOpen] = useState(false);
  const [isCategoryPromoDialogOpen, setIsCategoryPromoDialogOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<PromoCode | null>(null);
  const [editingCategoryPromo, setEditingCategoryPromo] = useState<CategoryPromotion | null>(null);

  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([
    {
      promo_code_id: 1,
      code: 'SAVE20',
      description: '20% off your entire order',
      type: 'percentage_discount',
      value: 20,
      minimum_order_amount: 50,
      max_uses: 100,
      uses_count: 25,
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      is_active: true
    }
  ]);

  const [categoryPromotions, setCategoryPromotions] = useState<CategoryPromotion[]>([
    {
      category_promo_id: 1,
      category_id: 1,
      category_name: 'Anime Figures',
      discount_percentage: 15,
      start_date: '2024-06-01',
      end_date: '2024-06-30',
      description: 'Summer Sale on Anime Figures',
      is_active: true
    }
  ]);

  const categories = [
    { category_id: 1, category_name: 'Anime Figures' },
    { category_id: 2, category_name: 'Marvel Figures' },
    { category_id: 3, category_name: 'DC Figures' }
  ];

  const [promoFormData, setPromoFormData] = useState({
    code: '',
    description: '',
    type: 'percentage_discount' as 'percentage_discount' | 'fixed_amount_discount' | 'free_shipping',
    value: '',
    minimum_order_amount: '',
    max_uses: '',
    start_date: '',
    end_date: ''
  });

  const [categoryPromoFormData, setCategoryPromoFormData] = useState({
    category_id: '',
    discount_percentage: '',
    start_date: '',
    end_date: '',
    description: ''
  });

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPromo) {
      setPromoCodes(prev => prev.map(promo => 
        promo.promo_code_id === editingPromo.promo_code_id
          ? {
              ...promo,
              ...promoFormData,
              value: parseFloat(promoFormData.value),
              minimum_order_amount: parseFloat(promoFormData.minimum_order_amount),
              max_uses: promoFormData.max_uses ? parseInt(promoFormData.max_uses) : null
            }
          : promo
      ));
      toast({
        title: "Promo Code Updated",
        description: "Promo code has been successfully updated.",
      });
    } else {
      const newPromo: PromoCode = {
        promo_code_id: Math.max(...promoCodes.map(p => p.promo_code_id)) + 1,
        ...promoFormData,
        value: parseFloat(promoFormData.value),
        minimum_order_amount: parseFloat(promoFormData.minimum_order_amount),
        max_uses: promoFormData.max_uses ? parseInt(promoFormData.max_uses) : null,
        uses_count: 0,
        is_active: true
      };
      setPromoCodes(prev => [...prev, newPromo]);
      toast({
        title: "Promo Code Created",
        description: "New promo code has been successfully created.",
      });
    }

    resetPromoForm();
  };

  const handleCategoryPromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCategoryPromo) {
      setCategoryPromotions(prev => prev.map(promo => 
        promo.category_promo_id === editingCategoryPromo.category_promo_id
          ? {
              ...promo,
              ...categoryPromoFormData,
              category_id: parseInt(categoryPromoFormData.category_id),
              discount_percentage: parseFloat(categoryPromoFormData.discount_percentage),
              category_name: categories.find(c => c.category_id === parseInt(categoryPromoFormData.category_id))?.category_name || ''
            }
          : promo
      ));
      toast({
        title: "Category Promotion Updated",
        description: "Category promotion has been successfully updated.",
      });
    } else {
      const newCategoryPromo: CategoryPromotion = {
        category_promo_id: Math.max(...categoryPromotions.map(p => p.category_promo_id)) + 1,
        ...categoryPromoFormData,
        category_id: parseInt(categoryPromoFormData.category_id),
        discount_percentage: parseFloat(categoryPromoFormData.discount_percentage),
        category_name: categories.find(c => c.category_id === parseInt(categoryPromoFormData.category_id))?.category_name || '',
        is_active: true
      };
      setCategoryPromotions(prev => [...prev, newCategoryPromo]);
      toast({
        title: "Category Promotion Created",
        description: "New category promotion has been successfully created.",
      });
    }

    resetCategoryPromoForm();
  };

  const resetPromoForm = () => {
    setPromoFormData({
      code: '',
      description: '',
      type: 'percentage_discount',
      value: '',
      minimum_order_amount: '',
      max_uses: '',
      start_date: '',
      end_date: ''
    });
    setEditingPromo(null);
    setIsPromoDialogOpen(false);
  };

  const resetCategoryPromoForm = () => {
    setCategoryPromoFormData({
      category_id: '',
      discount_percentage: '',
      start_date: '',
      end_date: '',
      description: ''
    });
    setEditingCategoryPromo(null);
    setIsCategoryPromoDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="promo-codes" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="promo-codes" className="flex items-center gap-2">
            <Gift className="w-4 h-4" />
            Promo Codes
          </TabsTrigger>
          <TabsTrigger value="category-promotions" className="flex items-center gap-2">
            <Percent className="w-4 h-4" />
            Category Promotions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="promo-codes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Promo Codes</CardTitle>
              <Dialog open={isPromoDialogOpen} onOpenChange={setIsPromoDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => resetPromoForm()}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Promo Code
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {editingPromo ? 'Edit Promo Code' : 'Add New Promo Code'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handlePromoSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="code">Code</Label>
                      <Input
                        id="code"
                        value={promoFormData.code}
                        onChange={(e) => setPromoFormData(prev => ({ ...prev, code: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={promoFormData.description}
                        onChange={(e) => setPromoFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select value={promoFormData.type} onValueChange={(value: 'percentage_discount' | 'fixed_amount_discount' | 'free_shipping') => setPromoFormData(prev => ({ ...prev, type: value }))}>
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
                        value={promoFormData.value}
                        onChange={(e) => setPromoFormData(prev => ({ ...prev, value: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="min_order">Minimum Order Amount</Label>
                      <Input
                        id="min_order"
                        type="number"
                        step="0.01"
                        value={promoFormData.minimum_order_amount}
                        onChange={(e) => setPromoFormData(prev => ({ ...prev, minimum_order_amount: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="max_uses">Max Uses (optional)</Label>
                      <Input
                        id="max_uses"
                        type="number"
                        value={promoFormData.max_uses}
                        onChange={(e) => setPromoFormData(prev => ({ ...prev, max_uses: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="start_date">Start Date</Label>
                        <Input
                          id="start_date"
                          type="date"
                          value={promoFormData.start_date}
                          onChange={(e) => setPromoFormData(prev => ({ ...prev, start_date: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="end_date">End Date</Label>
                        <Input
                          id="end_date"
                          type="date"
                          value={promoFormData.end_date}
                          onChange={(e) => setPromoFormData(prev => ({ ...prev, end_date: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button type="submit" className="flex-1">
                        {editingPromo ? 'Update' : 'Create'} Promo Code
                      </Button>
                      <Button type="button" variant="outline" onClick={resetPromoForm}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
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
                        onClick={() => {
                          setEditingPromo(promo);
                          setPromoFormData({
                            code: promo.code,
                            description: promo.description,
                            type: promo.type,
                            value: promo.value.toString(),
                            minimum_order_amount: promo.minimum_order_amount.toString(),
                            max_uses: promo.max_uses?.toString() || '',
                            start_date: promo.start_date,
                            end_date: promo.end_date
                          });
                          setIsPromoDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setPromoCodes(prev => prev.filter(p => p.promo_code_id !== promo.promo_code_id));
                          toast({
                            title: "Promo Code Deleted",
                            description: "Promo code has been successfully deleted.",
                          });
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="category-promotions">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Category Promotions</CardTitle>
              <Dialog open={isCategoryPromoDialogOpen} onOpenChange={setIsCategoryPromoDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => resetCategoryPromoForm()}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category Promotion
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {editingCategoryPromo ? 'Edit Category Promotion' : 'Add New Category Promotion'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleCategoryPromoSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={categoryPromoFormData.category_id} onValueChange={(value) => setCategoryPromoFormData(prev => ({ ...prev, category_id: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category.category_id} value={category.category_id.toString()}>
                              {category.category_name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="discount">Discount Percentage</Label>
                      <Input
                        id="discount"
                        type="number"
                        step="0.01"
                        value={categoryPromoFormData.discount_percentage}
                        onChange={(e) => setCategoryPromoFormData(prev => ({ ...prev, discount_percentage: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="promo_description">Description</Label>
                      <Textarea
                        id="promo_description"
                        value={categoryPromoFormData.description}
                        onChange={(e) => setCategoryPromoFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={2}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="promo_start_date">Start Date</Label>
                        <Input
                          id="promo_start_date"
                          type="date"
                          value={categoryPromoFormData.start_date}
                          onChange={(e) => setCategoryPromoFormData(prev => ({ ...prev, start_date: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="promo_end_date">End Date</Label>
                        <Input
                          id="promo_end_date"
                          type="date"
                          value={categoryPromoFormData.end_date}
                          onChange={(e) => setCategoryPromoFormData(prev => ({ ...prev, end_date: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button type="submit" className="flex-1">
                        {editingCategoryPromo ? 'Update' : 'Create'} Promotion
                      </Button>
                      <Button type="button" variant="outline" onClick={resetCategoryPromoForm}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
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
                        onClick={() => {
                          setEditingCategoryPromo(promo);
                          setCategoryPromoFormData({
                            category_id: promo.category_id.toString(),
                            discount_percentage: promo.discount_percentage.toString(),
                            start_date: promo.start_date,
                            end_date: promo.end_date,
                            description: promo.description
                          });
                          setIsCategoryPromoDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setCategoryPromotions(prev => prev.filter(p => p.category_promo_id !== promo.category_promo_id));
                          toast({
                            title: "Category Promotion Deleted",
                            description: "Category promotion has been successfully deleted.",
                          });
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromotionsManager;
