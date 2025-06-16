
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Package, Tag, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryPromotionsList from '@/components/admin/CategoryPromotionsList';
import CategoryPromotionForm from '@/components/admin/CategoryPromotionForm';
import PromoCodesList from '@/components/admin/PromoCodesList';
import PromoCodeForm from '@/components/admin/PromoCodeForm';

const AdminDashboard = () => {
  const [showCategoryPromoForm, setShowCategoryPromoForm] = useState(false);
  const [showPromoCodeForm, setShowPromoCodeForm] = useState(false);
  const [editingCategoryPromo, setEditingCategoryPromo] = useState(null);
  const [editingPromoCode, setEditingPromoCode] = useState(null);

  // Mock data
  const [categoryPromotions, setCategoryPromotions] = useState([
    {
      category_promo_id: 1,
      category_name: 'Action Figures',
      discount_percentage: 15,
      description: 'Summer sale on all action figures',
      start_date: '2024-06-01',
      end_date: '2024-08-31',
      is_active: true
    }
  ]);

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
    }
  ]);

  const [categoryPromoFormData, setCategoryPromoFormData] = useState({
    category_id: '',
    discount_percentage: '',
    description: '',
    start_date: '',
    end_date: ''
  });

  const [promoCodeFormData, setPromoCodeFormData] = useState({
    code: '',
    description: '',
    type: 'percentage_discount',
    value: '',
    minimum_order_amount: '',
    max_uses: '',
    start_date: '',
    end_date: ''
  });

  const categories = [
    { category_id: 1, category_name: 'Action Figures' },
    { category_id: 2, category_name: 'Anime Figures' },
    { category_id: 3, category_name: 'Collectibles' }
  ];

  const handleCategoryPromoSubmit = (e) => {
    e.preventDefault();
    console.log('Category promotion form submitted:', categoryPromoFormData);
    setShowCategoryPromoForm(false);
    setCategoryPromoFormData({
      category_id: '',
      discount_percentage: '',
      description: '',
      start_date: '',
      end_date: ''
    });
  };

  const handlePromoCodeSubmit = (e) => {
    e.preventDefault();
    console.log('Promo code form submitted:', promoCodeFormData);
    setShowPromoCodeForm(false);
    setPromoCodeFormData({
      code: '',
      description: '',
      type: 'percentage_discount',
      value: '',
      minimum_order_amount: '',
      max_uses: '',
      start_date: '',
      end_date: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">FigureVerse Admin</span>
            </Link>
          </div>
          <nav className="flex space-x-4">
            <Link to="/store">
              <Button variant="ghost">Customer Store</Button>
            </Link>
            <Link to="/">
              <Button variant="ghost">Home</Button>
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+10% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Promotions</CardTitle>
              <Tag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">3 ending this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,345</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="category-promotions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="category-promotions">Category Promotions</TabsTrigger>
            <TabsTrigger value="promo-codes">Promo Codes</TabsTrigger>
          </TabsList>

          <TabsContent value="category-promotions" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Category Promotions</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Manage category-wide promotions and discounts
                  </p>
                </div>
                <Button onClick={() => setShowCategoryPromoForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Promotion
                </Button>
              </CardHeader>
              <CardContent>
                {showCategoryPromoForm ? (
                  <CategoryPromotionForm
                    formData={categoryPromoFormData}
                    setFormData={setCategoryPromoFormData}
                    onSubmit={handleCategoryPromoSubmit}
                    onCancel={() => setShowCategoryPromoForm(false)}
                    isEditing={false}
                    categories={categories}
                  />
                ) : (
                  <CategoryPromotionsList
                    categoryPromotions={categoryPromotions}
                    onEdit={(promo) => {
                      setEditingCategoryPromo(promo);
                      setShowCategoryPromoForm(true);
                    }}
                    onDelete={(id) => console.log('Delete category promotion:', id)}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="promo-codes" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Promo Codes</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Create and manage discount codes for customers
                  </p>
                </div>
                <Button onClick={() => setShowPromoCodeForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Promo Code
                </Button>
              </CardHeader>
              <CardContent>
                {showPromoCodeForm ? (
                  <PromoCodeForm
                    formData={promoCodeFormData}
                    setFormData={setPromoCodeFormData}
                    onSubmit={handlePromoCodeSubmit}
                    onCancel={() => setShowPromoCodeForm(false)}
                    isEditing={false}
                  />
                ) : (
                  <PromoCodesList
                    promoCodes={promoCodes}
                    onEdit={(promo) => {
                      setEditingPromoCode(promo);
                      setShowPromoCodeForm(true);
                    }}
                    onDelete={(id) => console.log('Delete promo code:', id)}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
