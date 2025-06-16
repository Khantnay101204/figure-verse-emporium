
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ShoppingCart, Bell, User, LogIn } from 'lucide-react';

interface HeaderProps {
  currentView: 'all' | 'newly-arrived' | 'popular';
  onViewChange: (view: 'all' | 'newly-arrived' | 'popular') => void;
  onSearch: (query: string) => void;
  onCartClick: () => void;
  onProfileClick: () => void;
  onNotificationsClick: () => void;
  onAuthClick: () => void;
  user: any;
}

const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onSearch,
  onCartClick,
  onProfileClick,
  onNotificationsClick,
  onAuthClick,
  user
}) => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-primary">FigureVerse</h1>
            
            <nav className="flex space-x-6">
              <button
                onClick={() => onViewChange('all')}
                className={`text-sm font-medium transition-colors ${
                  currentView === 'all' 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => onViewChange('newly-arrived')}
                className={`text-sm font-medium transition-colors ${
                  currentView === 'newly-arrived' 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                Newly Arrived
              </button>
              <button
                onClick={() => onViewChange('popular')}
                className={`text-sm font-medium transition-colors ${
                  currentView === 'popular' 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                Popular Products
              </button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search products..."
                className="pl-10 w-64"
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>

            <Button variant="ghost" size="sm" onClick={onCartClick}>
              <ShoppingCart className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="sm" onClick={onNotificationsClick}>
              <Bell className="w-5 h-5" />
            </Button>

            {user ? (
              <Button variant="ghost" size="sm" onClick={onProfileClick}>
                <User className="w-5 h-5" />
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={onAuthClick}>
                <LogIn className="w-5 h-5" />
                <span className="ml-2">Sign In</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
