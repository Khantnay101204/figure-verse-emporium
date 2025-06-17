
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

const Cart = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState([
    {
      product_id: 1,
      product_name: 'Premium Action Figure Set',
      price: 89.99,
      quantity: 2,
      image_url: '/placeholder.svg'
    },
    {
      product_id: 2,
      product_name: 'Anime Character Collectible',
      price: 124.99,
      quantity: 1,
      image_url: '/placeholder.svg'
    }
  ]);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(items => items.filter(item => item.product_id !== productId));
    } else {
      setCartItems(items =>
        items.map(item =>
          item.product_id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Shopping Cart
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product_id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <img
                      src={item.image_url}
                      alt={item.product_name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.product_name}</h3>
                      <p className="text-primary font-semibold">${item.price}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <Badge variant="outline">{item.quantity}</Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total:</span>
                <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
              </div>
              <Button className="w-full">Proceed to Checkout</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
