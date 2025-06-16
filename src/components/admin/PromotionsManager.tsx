
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Gift, Percent } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PromoCodeForm from './PromoCodeForm';
import CategoryPromotionForm from './CategoryPromotionForm';
import PromoCodesList from './PromoCodesList';
import CategoryPromotionsList from './CategoryPromotionsList';
import {
  PromoCode,
  CategoryPromotion,
  Category,
  PromoFormData,
  CategoryPromoFormData
} from './types';

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

  const categories: Category[] = [
    { category_id: 1, category_name: 'Anime Figures' },
    { category_id: 2, category_name: 'Marvel Figures' },
    { category_id: 3, category_name: 'DC Figures' }
  ];

  const [promoFormData, setPromoFormData] = useState<PromoFormData>({
    code: '',
    description: '',
    type: 'percentage_discount',
    value: '',
    minimum_order_amount: '',
    max_uses: '',
    start_date: '',
    end_date: ''
  });

  const [categoryPromoFormData, setCategoryPromoFormData] = useState<CategoryPromoFormData>({
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

  const handleEditPromo = (promo: PromoCode) => {
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
  };

  const handleEditCategoryPromo = (promo: CategoryPromotion) => {
    setEditingCategoryPromo(promo);
    setCategoryPromoFormData({
      category_id: promo.category_id.toString(),
      discount_percentage: promo.discount_percentage.toString(),
      start_date: promo.start_date,
      end_date: promo.end_date,
      description: promo.description
    });
    setIsCategoryPromoDialogOpen(true);
  };

  const handleDeletePromo = (promoId: number) => {
    setPromoCodes(prev => prev.filter(p => p.promo_code_id !== promoId));
    toast({
      title: "Promo Code Deleted",
      description: "Promo code has been successfully deleted.",
    });
  };

  const handleDeleteCategoryPromo = (promoId: number) => {
    setCategoryPromotions(prev => prev.filter(p => p.category_promo_id !== promoId));
    toast({
      title: "Category Promotion Deleted",
      description: "Category promotion has been successfully deleted.",
    });
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
                  <PromoCodeForm
                    formData={promoFormData}
                    setFormData={setPromoFormData}
                    onSubmit={handlePromoSubmit}
                    onCancel={resetPromoForm}
                    isEditing={!!editingPromo}
                  />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <PromoCodesList
                promoCodes={promoCodes}
                onEdit={handleEditPromo}
                onDelete={handleDeletePromo}
              />
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
                  <CategoryPromotionForm
                    formData={categoryPromoFormData}
                    setFormData={setCategoryPromoFormData}
                    onSubmit={handleCategoryPromoSubmit}
                    onCancel={resetCategoryPromoForm}
                    isEditing={!!editingCategoryPromo}
                    categories={categories}
                  />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <CategoryPromotionsList
                categoryPromotions={categoryPromotions}
                onEdit={handleEditCategoryPromo}
                onDelete={handleDeleteCategoryPromo}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromotionsManager;
