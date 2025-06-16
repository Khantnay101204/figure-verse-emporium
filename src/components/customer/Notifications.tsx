
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Bell, Package, Truck, CheckCircle } from 'lucide-react';

interface Notification {
  id: number;
  type: 'order' | 'shipping' | 'delivery' | 'promotion';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface NotificationsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'order',
      title: 'Order Confirmed',
      message: 'Your order #12345 has been confirmed and is being processed.',
      timestamp: '2024-01-15T10:30:00Z',
      isRead: false
    },
    {
      id: 2,
      type: 'shipping',
      title: 'Order Shipped',
      message: 'Your order #12344 has been shipped and is on its way!',
      timestamp: '2024-01-14T15:45:00Z',
      isRead: false
    },
    {
      id: 3,
      type: 'delivery',
      title: 'Order Delivered',
      message: 'Your order #12343 has been successfully delivered.',
      timestamp: '2024-01-13T14:20:00Z',
      isRead: true
    },
    {
      id: 4,
      type: 'promotion',
      title: 'Special Offer',
      message: '20% off on all anime figures this weekend!',
      timestamp: '2024-01-12T09:00:00Z',
      isRead: true
    }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'shipping':
        return <Truck className="w-5 h-5 text-orange-500" />;
      case 'delivery':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'promotion':
        return <Bell className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            <h2 className="text-lg font-semibold">Notifications</h2>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="w-full"
            >
              Mark All as Read
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-center py-8">
                <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No notifications</p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      !notification.isRead ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      {getIcon(notification.type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-sm">{notification.title}</h3>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(notification.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
