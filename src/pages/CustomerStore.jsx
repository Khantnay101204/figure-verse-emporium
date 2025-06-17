
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/customer/Header';
import CategoryCarousel from '@/components/customer/CategoryCarousel';
import ProductFilters from '@/components/customer/ProductFilters';
import NewlyArrivedProducts from '@/components/customer/NewlyArrivedProducts';
import PopularProducts from '@/components/customer/PopularProducts';
import Footer from '@/components/customer/Footer';
import Cart from '@/components/customer/Cart';

const CustomerStore = () => {
  const [currentView, setCurrentView] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user] = useState(null); // For demo purposes

  const [products] = useState([
    {
      product_id: 1,
      product_name: 'Premium Action Figure Set',
      price: 89.99,
      category_id: 1,
      category_name: 'Action Figures',
      image_url: '/placeholder.svg',
      stock_quantity: 25,
      description: 'High-quality action figure with multiple accessories'
    },
    {
      product_id: 2,
      product_name: 'Anime Character Collectible',
      price: 124.99,
      category_id: 2,
      category_name: 'Anime Figures',
      image_url: '/placeholder.svg',
      stock_quantity: 15,
      description: 'Limited edition anime character figure'
    },
    {
      product_id: 3,
      product_name: 'Vintage Gaming Hero',
      price: 79.99,
      category_id: 6,
      category_name: 'Gaming',
      image_url: '/placeholder.svg',
      stock_quantity: 30,
      description: 'Retro gaming character collectible'
    },
    {
      product_id: 4,
      product_name: 'Limited Edition Statue',
      price: 199.99,
      category_id: 4,
      category_name: 'Limited Edition',
      image_url: '/placeholder.svg',
      stock_quantity: 5,
      description: 'Exclusive limited edition collectible statue'
    },
    {
      product_id: 5,
      product_name: 'Classic Superhero Figure',
      price: 64.99,
      category_id: 1,
      category_name: 'Action Figures',
      image_url: '/placeholder.svg',
      stock_quantity: 40,
      description: 'Classic superhero action figure'
    },
    {
      product_id: 6,
      product_name: 'Rare Collectible Card Set',
      price: 149.99,
      category_id: 3,
      category_name: 'Collectibles',
      image_url: '/placeholder.svg',
      stock_quantity: 12,
      description: 'Rare trading card collection'
    }
  ]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handlePriceRangeChange = (min, max) => {
    setPriceRange({ min, max });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === null || product.category_id === selectedCategory;
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    const matchesSearch = searchQuery === '' || 
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesPrice && matchesSearch;
  });

  const renderProductGrid = (productsToShow) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {productsToShow.map((product) => (
        <Card key={product.product_id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="relative mb-4">
              <img
                src={product.image_url}
                alt={product.product_name}
                className="w-full h-48 object-cover rounded-md"
              />
              {product.stock_quantity <= 10 && (
                <Badge className="absolute top-2 right-2 bg-red-500">
                  Low Stock
                </Badge>
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">{product.product_name}</h3>
              <p className="text-sm text-gray-600">{product.category_name}</p>
              <p className="text-sm text-gray-500">{product.description}</p>
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
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        onSearch={handleSearch}
        onCartClick={() => setIsCartOpen(true)}
        onProfileClick={() => console.log('Profile clicked')}
        onNotificationsClick={() => console.log('Notifications clicked')}
        onAuthClick={() => console.log('Auth clicked')}
        user={user}
      />

      <main className="container mx-auto px-4 py-8">
        {currentView === 'all' && (
          <>
            <CategoryCarousel onCategorySelect={handleCategorySelect} />
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
              <div className="lg:col-span-1">
                <ProductFilters
                  selectedCategory={selectedCategory}
                  priceRange={priceRange}
                  onCategoryChange={setSelectedCategory}
                  onPriceRangeChange={handlePriceRangeChange}
                />
              </div>
              
              <div className="lg:col-span-3">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">All Products</h2>
                  <p className="text-gray-600">
                    {filteredProducts.length} products found
                  </p>
                </div>
                {renderProductGrid(filteredProducts)}
              </div>
            </div>
          </>
        )}

        {currentView === 'newly-arrived' && (
          <NewlyArrivedProducts />
        )}

        {currentView === 'popular' && (
          <PopularProducts />
        )}
      </main>

      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default CustomerStore;
