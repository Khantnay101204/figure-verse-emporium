
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import CategoryCarousel from '@/components/customer/CategoryCarousel';
import ProductFilters from '@/components/customer/ProductFilters';
import ProductGrid from '@/components/customer/ProductGrid';
import PopularProducts from '@/components/customer/PopularProducts';
import Profile from '@/components/customer/Profile';
import Footer from '@/components/customer/Footer';

const CustomerStore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItemCount] = useState(3);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handlePriceRangeChange = (min, max) => {
    setPriceRange({ min, max });
  };

  const handleOrderHistory = () => {
    console.log('Opening order history...');
    setIsProfileOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold text-gray-900">FigureVerse</span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search figures..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Navigation - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/admin">
                <Button variant="ghost">Admin</Button>
              </Link>
              <Button variant="ghost" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
              <Button variant="ghost" onClick={() => setIsProfileOpen(true)}>
                <User className="w-5 h-5" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search figures..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex space-x-4">
                  <Link to="/admin" className="flex-1">
                    <Button variant="outline" className="w-full">Admin</Button>
                  </Link>
                  <Button variant="outline" className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => setIsProfileOpen(true)}>
                    <User className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Category Carousel */}
      <CategoryCarousel onCategorySelect={handleCategorySelect} />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Popular Products Section */}
        <div className="mb-12">
          <PopularProducts />
        </div>

        {/* Products Section with Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ProductFilters
                selectedCategory={selectedCategory}
                priceRange={priceRange}
                onCategoryChange={setSelectedCategory}
                onPriceRangeChange={handlePriceRangeChange}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <ProductGrid
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              priceRange={priceRange}
            />
          </div>
        </div>
      </div>

      {/* Profile Sidebar */}
      <Profile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onOrderHistoryClick={handleOrderHistory}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CustomerStore;
