
import React, { useState } from 'react';
import Header from '@/components/customer/Header';
import CategoryCarousel from '@/components/customer/CategoryCarousel';
import ProductGrid from '@/components/customer/ProductGrid';
import ProductFilters from '@/components/customer/ProductFilters';
import NewlyArrivedProducts from '@/components/customer/NewlyArrivedProducts';
import PopularProducts from '@/components/customer/PopularProducts';
import Footer from '@/components/customer/Footer';
import Cart from '@/components/customer/Cart';
import Profile from '@/components/customer/Profile';
import Notifications from '@/components/customer/Notifications';
import OrderHistory from '@/components/customer/OrderHistory';
import AuthModal from '@/components/customer/AuthModal';

const CustomerStore = () => {
  const [currentView, setCurrentView] = useState<'all' | 'newly-arrived' | 'popular'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleViewChange = (view: 'all' | 'newly-arrived' | 'popular') => {
    setCurrentView(view);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange({ min, max });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentView={currentView}
        onViewChange={handleViewChange}
        onSearch={handleSearch}
        onCartClick={() => setIsCartOpen(true)}
        onProfileClick={() => setIsProfileOpen(true)}
        onNotificationsClick={() => setIsNotificationsOpen(true)}
        onAuthClick={() => setIsAuthModalOpen(true)}
        user={user}
      />

      <main className="container mx-auto px-4 py-8">
        <CategoryCarousel onCategorySelect={handleCategorySelect} />
        
        <div className="flex gap-8 mt-8">
          <div className="w-64 flex-shrink-0">
            <ProductFilters
              selectedCategory={selectedCategory}
              priceRange={priceRange}
              onCategoryChange={setSelectedCategory}
              onPriceRangeChange={handlePriceRangeChange}
            />
          </div>
          
          <div className="flex-1">
            {currentView === 'all' && (
              <ProductGrid
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                priceRange={priceRange}
              />
            )}
            {currentView === 'newly-arrived' && <NewlyArrivedProducts />}
            {currentView === 'popular' && <PopularProducts />}
          </div>
        </div>
      </main>

      <Footer />

      {/* Modals and Sidebars */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Profile 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)}
        onOrderHistoryClick={() => {
          setIsProfileOpen(false);
          setIsOrderHistoryOpen(true);
        }}
      />
      <Notifications isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
      <OrderHistory isOpen={isOrderHistoryOpen} onClose={() => setIsOrderHistoryOpen(false)} />
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={setUser}
      />
    </div>
  );
};

export default CustomerStore;
