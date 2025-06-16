
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Package, Eye } from 'lucide-react';

interface OrderItem {
  product_name: string;
  quantity: number;
  price: number;
}

interface Order {
  order_id: number;
  order_date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  items: OrderItem[];
}

interface OrderHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ isOpen, onClose }) => {
  const [orders] = useState<Order[]>([
    {
      order_id: 12345,
      order_date: '2024-01-15T10:30:00Z',
      status: 'shipped',
      total_amount: 304.97,
      items: [
        { product_name: 'Premium Action Figure Set', quantity: 2, price: 89.99 },
        { product_name: 'Anime Character Collectible', quantity: 1, price: 124.99 }
      ]
    },
    {
      order_id: 12344,
      order_date: '2024-01-10T14:20:00Z',
      status: 'delivered',
      total_amount: 199.99,
      items: [
        { product_name: 'Limited Edition Figure', quantity: 1, price: 199.99 }
      ]
    },
    {
      order_id: 12343,
      order_date: '2024-01-05T16:45:00Z',
      status: 'delivered',
      total_amount: 159.98,
      items: [
        { product_name: 'Gaming Hero Figure', quantity: 2, price: 79.99 }
      ]
    }
  ]);

  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center">
            <Package className="w-5 h-5 mr-2" />
            Order History
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No orders found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.order_id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        Order #{order.order_id}
                      </CardTitle>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{new Date(order.order_date).toLocaleDateString()}</span>
                      <span className="font-semibold text-primary">
                        ${order.total_amount.toFixed(2)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleOrderDetails(order.order_id)}
                      className="w-full mb-3"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {expandedOrder === order.order_id ? 'Hide Details' : 'View Details'}
                    </Button>
                    
                    {expandedOrder === order.order_id && (
                      <div className="space-y-2 border-t pt-3">
                        <h4 className="font-medium text-sm">Items:</h4>
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.product_name} x{item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
