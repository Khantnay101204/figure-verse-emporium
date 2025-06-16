
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Eye, Package, Truck, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Order {
  order_id: number;
  user_id: number;
  username: string;
  order_date: string;
  total_amount: number;
  status: string;
  shipping_address: string;
  tracking_number: string | null;
  shipping_cost: number;
  discount_amount: number;
  items: OrderItem[];
}

interface OrderItem {
  order_item_id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
}

const OrdersManager = () => {
  const { toast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  const [orders, setOrders] = useState<Order[]>([
    {
      order_id: 1,
      user_id: 1,
      username: 'john_doe',
      order_date: '2024-06-15T10:30:00Z',
      total_amount: 74.97,
      status: 'Pending',
      shipping_address: '123 Main St, Anytown, USA 12345',
      tracking_number: null,
      shipping_cost: 9.99,
      discount_amount: 5.00,
      items: [
        {
          order_item_id: 1,
          product_name: 'Dragon Ball Z Goku Figure',
          quantity: 2,
          unit_price: 29.99
        },
        {
          order_item_id: 2,
          product_name: 'Marvel Spider-Man Figure',
          quantity: 1,
          unit_price: 24.99
        }
      ]
    },
    {
      order_id: 2,
      user_id: 2,
      username: 'jane_smith',
      order_date: '2024-06-14T14:15:00Z',
      total_amount: 54.98,
      status: 'Shipped',
      shipping_address: '456 Oak Ave, Another City, USA 67890',
      tracking_number: 'TRK123456789',
      shipping_cost: 9.99,
      discount_amount: 0,
      items: [
        {
          order_item_id: 3,
          product_name: 'Marvel Spider-Man Figure',
          quantity: 2,
          unit_price: 24.99
        }
      ]
    }
  ]);

  const [trackingNumber, setTrackingNumber] = useState('');

  const statusColors = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Processing': 'bg-blue-100 text-blue-800',
    'Shipped': 'bg-green-100 text-green-800',
    'Delivered': 'bg-gray-100 text-gray-800',
    'Cancelled': 'bg-red-100 text-red-800'
  };

  const statusIcons = {
    'Pending': Package,
    'Processing': Package,
    'Shipped': Truck,
    'Delivered': CheckCircle,
    'Cancelled': Package
  };

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status.toLowerCase() === statusFilter);

  const handleStatusUpdate = (orderId: number, newStatus: string) => {
    setOrders(prev => prev.map(order => 
      order.order_id === orderId 
        ? { ...order, status: newStatus }
        : order
    ));
    toast({
      title: "Order Status Updated",
      description: `Order #${orderId} status changed to ${newStatus}`,
    });
  };

  const handleTrackingUpdate = (orderId: number) => {
    if (!trackingNumber.trim()) return;
    
    setOrders(prev => prev.map(order => 
      order.order_id === orderId 
        ? { ...order, tracking_number: trackingNumber }
        : order
    ));
    
    toast({
      title: "Tracking Number Added",
      description: `Tracking number ${trackingNumber} added to order #${orderId}`,
    });
    
    setTrackingNumber('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Orders Management</CardTitle>
            <div className="flex items-center gap-2">
              <Label htmlFor="status-filter">Filter by status:</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status-filter" className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOrders.map(order => {
              const StatusIcon = statusIcons[order.status as keyof typeof statusIcons];
              return (
                <div key={order.order_id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-semibold">Order #{order.order_id}</h3>
                        <p className="text-sm text-gray-600">by {order.username}</p>
                        <p className="text-xs text-gray-500">{formatDate(order.order_date)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusIcon className="w-4 h-4" />
                        <Badge className={statusColors[order.status as keyof typeof statusColors]}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">${order.total_amount.toFixed(2)}</p>
                      {order.discount_amount > 0 && (
                        <p className="text-sm text-green-600">-${order.discount_amount.toFixed(2)} discount</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <Select 
                        value={order.status} 
                        onValueChange={(value) => handleStatusUpdate(order.order_id, value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Processing">Processing</SelectItem>
                          <SelectItem value="Shipped">Shipped</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Tracking Number</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          placeholder={order.tracking_number || "Enter tracking number"}
                          value={order.tracking_number || trackingNumber}
                          onChange={(e) => setTrackingNumber(e.target.value)}
                          disabled={!!order.tracking_number}
                        />
                        {!order.tracking_number && (
                          <Button
                            size="sm"
                            onClick={() => handleTrackingUpdate(order.order_id)}
                            disabled={!trackingNumber.trim()}
                          >
                            Add
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-end">
                      <Dialog open={isDialogOpen && selectedOrder?.order_id === order.order_id} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedOrder(order);
                              setIsDialogOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Order #{order.order_id} Details</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="font-medium">Customer</Label>
                                <p className="text-sm">{order.username}</p>
                              </div>
                              <div>
                                <Label className="font-medium">Order Date</Label>
                                <p className="text-sm">{formatDate(order.order_date)}</p>
                              </div>
                            </div>

                            <div>
                              <Label className="font-medium">Shipping Address</Label>
                              <p className="text-sm text-gray-600">{order.shipping_address}</p>
                            </div>

                            <div>
                              <Label className="font-medium">Order Items</Label>
                              <div className="mt-2 space-y-2">
                                {order.items.map(item => (
                                  <div key={item.order_item_id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                    <div>
                                      <p className="font-medium">{item.product_name}</p>
                                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium">${(item.unit_price * item.quantity).toFixed(2)}</p>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="border-t pt-4">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span>Subtotal:</span>
                                  <span>${(order.total_amount - order.shipping_cost + order.discount_amount).toFixed(2)}</span>
                                </div>
                                {order.discount_amount > 0 && (
                                  <div className="flex justify-between text-green-600">
                                    <span>Discount:</span>
                                    <span>-${order.discount_amount.toFixed(2)}</span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span>Shipping:</span>
                                  <span>${order.shipping_cost.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg border-t pt-2">
                                  <span>Total:</span>
                                  <span>${order.total_amount.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p className="truncate">Shipping: {order.shipping_address}</p>
                    <p className="mt-1">
                      Items: {order.items.reduce((sum, item) => sum + item.quantity, 0)} • 
                      Shipping: ${order.shipping_cost.toFixed(2)}
                      {order.tracking_number && ` • Tracking: ${order.tracking_number}`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersManager;
