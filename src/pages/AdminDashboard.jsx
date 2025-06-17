import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Package, Tag, ShoppingCart, Gift, Percent } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import PromoCodesList from '@/components/admin/PromoCodesList';
import PromoCodeForm from '@/components/admin/PromoCodeForm';
import CategoryPromotionsList from '@/components/admin/CategoryPromotionsList';
import CategoryPromotionForm from '@/components/admin/CategoryPromotionForm';
import CategoriesManager from '@/components/admin/CategoriesManager';
import ProductsManager from '@/components/admin/ProductsManager';
import OrdersManager from '@/components/admin/OrdersManager';
import { useToast } from '@/hooks/use-toast';

const AdminDashboard = () => {
  const { toast } = useToast();
  const location = useLocation();
  
  // Promo Codes State
  const [promoCodes, setPromoCodes] = useState([
    {
      promo_code_id: 1,
      code: 'WELCOME20',
      description: 'Welcome discount for new customers',
      type: 'percentage_discount',
      value: 20,
      minimum_order_amount: 50,
      max_uses: 100,
      uses_count: 25,
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      is_active: true
    },
    {
      promo_code_id: 2,
      code: 'FREESHIP',
      description: 'Free shipping on all orders',
      type: 'free_shipping',
      value: 0,
      minimum_order_amount: 75,
      max_uses: null,
      uses_count: 156,
      start_date: '2024-01-01',
      end_date: '2024-12-31',
      is_active: true
    }
  ]);

  const [categoryPromotions, setCategoryPromotions] = useState([
    {
      category_promo_id: 1,
      category_name: 'Action Figures',
      discount_percentage: 15,
      description: 'Special discount on all action figures',
      start_date: '2024-01-15',
      end_date: '2024-02-15',
      is_active: true
    },
    {
      category_promo_id: 2,
      category_name: 'Anime Figures',
      discount_percentage: 25,
      description: 'Anime figure sale',
      start_date: '2024-01-10',
      end_date: '2024-01-31',
      is_active: true
    }
  ]);

  const [categories] = useState([
    { category_id: 1, category_name: 'Action Figures' },
    { category_id: 2, category_name: 'Anime Figures' },
    { category_id: 3, category_name: 'Collectibles' },
    { category_id: 4, category_name: 'Limited Edition' },
    { category_id: 5, category_name: 'Vintage' },
    { category_id: 6, category_name: 'Gaming' }
  ]);

  // Form States
  const [promoFormData, setPromoFormData] = useState({
    code: '',
    description: '',
    type: 'percentage_discount',
    value: '',
    minimum_order_amount: '',
    max_uses: '',
    start_date: '',
    end_date: ''
  });

  const [categoryPromoFormData, setCategoryPromoFormData] = useState({
    category_id: '',
    discount_percentage: '',
    description: '',
    start_date: '',
    end_date: ''
  });

  const [editingPromo, setEditingPromo] = useState(null);
  const [editingCategoryPromo, setEditingCategoryPromo] = useState(null);
  const [promoDialogOpen, setPromoDialogOpen] = useState(false);
  const [categoryPromoDialogOpen, setCategoryPromoDialogOpen] = useState(false);

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
  };

  const resetCategoryPromoForm = () => {
    setCategoryPromoFormData({
      category_id: '',
      discount_percentage: '',
      description: '',
      start_date: '',
      end_date: ''
    });
    setEditingCategoryPromo(null);
  };

  const handlePromoSubmit = (e) => {
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
        title: "Success",
        description: "Promo code updated successfully"
      });
    } else {
      const newPromo = {
        promo_code_id: Date.now(),
        ...promoFormData,
        value: parseFloat(promoFormData.value),
        minimum_order_amount: parseFloat(promoFormData.minimum_order_amount),
        max_uses: promoFormData.max_uses ? parseInt(promoFormData.max_uses) : null,
        uses_count: 0,
        is_active: true
      };
      setPromoCodes(prev => [...prev, newPromo]);
      toast({
        title: "Success",
        description: "Promo code created successfully"
      });
    }
    
    resetPromoForm();
    setPromoDialogOpen(false);
  };

  const handleCategoryPromoSubmit = (e) => {
    e.preventDefault();
    
    const selectedCategory = categories.find(cat => cat.category_id === parseInt(categoryPromoFormData.category_id));
    
    if (editingCategoryPromo) {
      setCategoryPromotions(prev => prev.map(promo => 
        promo.category_promo_id === editingCategoryPromo.category_promo_id 
          ? { 
              ...promo, 
              category_name: selectedCategory.category_name,
              discount_percentage: parseFloat(categoryPromoFormData.discount_percentage),
              description: categoryPromoFormData.description,
              start_date: categoryPromoFormData.start_date,
              end_date: categoryPromoFormData.end_date
            }
          : promo
      ));
      toast({
        title: "Success",
        description: "Category promotion updated successfully"
      });
    } else {
      const newCategoryPromo = {
        category_promo_id: Date.now(),
        category_name: selectedCategory.category_name,
        discount_percentage: parseFloat(categoryPromoFormData.discount_percentage),
        description: categoryPromoFormData.description,
        start_date: categoryPromoFormData.start_date,
        end_date: categoryPromoFormData.end_date,
        is_active: true
      };
      setCategoryPromotions(prev => [...prev, newCategoryPromo]);
      toast({
        title: "Success",
        description: "Category promotion created successfully"
      });
    }
    
    resetCategoryPromoForm();
    setCategoryPromoDialogOpen(false);
  };

  const handlePromoEdit = (promo) => {
    setEditingPromo(promo);
    setPromoFormData({
      code: promo.code,
      description: promo.description,
      type: promo.type,
      value: promo.value.toString(),
      minimum_order_amount: promo.minimum_order_amount.toString(),
      max_uses: promo.max_uses ? promo.max_uses.toString() : '',
      start_date: promo.start_date,
      end_date: promo.end_date
    });
    setPromoDialogOpen(true);
  };

  const handleCategoryPromoEdit = (promo) => {
    setEditingCategoryPromo(promo);
    const category = categories.find(cat => cat.category_name === promo.category_name);
    setCategoryPromoFormData({
      category_id: category ? category.category_id.toString() : '',
      discount_percentage: promo.discount_percentage.toString(),
      description: promo.description,
      start_date: promo.start_date,
      end_date: promo.end_date
    });
    setCategoryPromoDialogOpen(true);
  };

  const handlePromoDelete = (promoId) => {
    setPromoCodes(prev => prev.filter(promo => promo.promo_code_id !== promoId));
    toast({
      title: "Success",
      description: "Promo code deleted successfully"
    });
  };

  const handleCategoryPromoDelete = (promoId) => {
    setCategoryPromotions(prev => prev.filter(promo => promo.category_promo_id !== promoId));
    toast({
      title: "Success",
      description: "Category promotion deleted successfully"
    });
  };

  const navItems = [
    { path: '/admin/products', label: 'Products', icon: Package },
    { path: '/admin/categories', label: 'Categories', icon: Tag },
    { path: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { path: '/admin/promo-codes', label: 'Promo Codes', icon: Percent },
    { path: '/admin/promotions', label: 'Promotions', icon: Gift },
  ];

  const getCurrentSection = () => {
    const path = location.pathname;
    if (path === '/admin' || path === '/admin/products') return 'products';
    if (path === '/admin/categories') return 'categories';
    if (path === '/admin/orders') return 'orders';
    if (path === '/admin/promo-codes') return 'promo-codes';
    if (path === '/admin/promotions') return 'promotions';
    return 'products';
  };

  const renderContent = () => {
    const section = getCurrentSection();
    
    switch (section) {
      case 'products':
        return <ProductsManager />;
      case 'categories':
        return <CategoriesManager />;
      case 'orders':
        return <OrdersManager />;
      case 'promo-codes':
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Promo Codes</CardTitle>
                <CardDescription>Manage discount codes and special offers</CardDescription>
              </div>
              <Dialog open={promoDialogOpen} onOpenChange={setPromoDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => { resetPromoForm(); setPromoDialogOpen(true); }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Promo Code
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{editingPromo ? 'Edit' : 'Create'} Promo Code</DialogTitle>
                    <DialogDescription>
                      {editingPromo ? 'Update the promo code details' : 'Add a new promotional discount code'}
                    </DialogDescription>
                  </DialogHeader>
                  <PromoCodeForm
                    formData={promoFormData}
                    setFormData={setPromoFormData}
                    onSubmit={handlePromoSubmit}
                    onCancel={() => { resetPromoForm(); setPromoDialogOpen(false); }}
                    isEditing={!!editingPromo}
                  />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <PromoCodesList
                promoCodes={promoCodes}
                onEdit={handlePromoEdit}
                onDelete={handlePromoDelete}
              />
            </CardContent>
          </Card>
        );
      case 'promotions':
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Category Promotions</CardTitle>
                <CardDescription>Manage category-wide promotional discounts</CardDescription>
              </div>
              <Dialog open={categoryPromoDialogOpen} onOpenChange={setCategoryPromoDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => { resetCategoryPromoForm(); setCategoryPromoDialogOpen(true); }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Category Promotion
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{editingCategoryPromo ? 'Edit' : 'Create'} Category Promotion</DialogTitle>
                    <DialogDescription>
                      {editingCategoryPromo ? 'Update the category promotion details' : 'Add a new category-wide promotion'}
                    </DialogDescription>
                  </DialogHeader>
                  <CategoryPromotionForm
                    formData={categoryPromoFormData}
                    setFormData={setCategoryPromoFormData}
                    onSubmit={handleCategoryPromoSubmit}
                    onCancel={() => { resetCategoryPromoForm(); setCategoryPromoDialogOpen(false); }}
                    isEditing={!!editingCategoryPromo}
                    categories={categories}
                  />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <CategoryPromotionsList
                categoryPromotions={categoryPromotions}
                onEdit={handleCategoryPromoEdit}
                onDelete={handleCategoryPromoDelete}
              />
            </CardContent>
          </Card>
        );
      default:
        return <ProductsManager />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your store products, orders, and promotions</p>
        </div>

        {/* Horizontal Navigation with spacing */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <nav className="flex space-x-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path === '/admin/products' && location.pathname === '/admin');
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    isActive
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
