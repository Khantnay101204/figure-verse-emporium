
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category_id: number;
  category_name: string;
  image_url: string;
}

interface Category {
  category_id: number;
  category_name: string;
}

const ProductsManager = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Mock data - replace with actual API calls
  const [products, setProducts] = useState<Product[]>([
    {
      product_id: 1,
      name: 'Dragon Ball Z Goku Figure',
      description: 'High-quality Goku action figure with detailed sculpting',
      price: 29.99,
      stock_quantity: 50,
      category_id: 1,
      category_name: 'Anime Figures',
      image_url: '/placeholder.svg'
    },
    {
      product_id: 2,
      name: 'Marvel Spider-Man Figure',
      description: 'Amazing Spider-Man collectible figure',
      price: 24.99,
      stock_quantity: 30,
      category_id: 2,
      category_name: 'Marvel Figures',
      image_url: '/placeholder.svg'
    }
  ]);

  const [categories] = useState<Category[]>([
    { category_id: 1, category_name: 'Anime Figures' },
    { category_id: 2, category_name: 'Marvel Figures' },
    { category_id: 3, category_name: 'DC Figures' }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    category_id: '',
    image_url: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev.map(product => 
        product.product_id === editingProduct.product_id
          ? {
              ...product,
              ...formData,
              price: parseFloat(formData.price),
              stock_quantity: parseInt(formData.stock_quantity),
              category_id: parseInt(formData.category_id),
              category_name: categories.find(c => c.category_id === parseInt(formData.category_id))?.category_name || ''
            }
          : product
      ));
      toast({
        title: "Product Updated",
        description: "Product has been successfully updated.",
      });
    } else {
      // Create new product
      const newProduct: Product = {
        product_id: Math.max(...products.map(p => p.product_id)) + 1,
        ...formData,
        price: parseFloat(formData.price),
        stock_quantity: parseInt(formData.stock_quantity),
        category_id: parseInt(formData.category_id),
        category_name: categories.find(c => c.category_id === parseInt(formData.category_id))?.category_name || ''
      };
      setProducts(prev => [...prev, newProduct]);
      toast({
        title: "Product Created",
        description: "New product has been successfully created.",
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      stock_quantity: '',
      category_id: '',
      image_url: ''
    });
    setEditingProduct(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock_quantity: product.stock_quantity.toString(),
      category_id: product.category_id.toString(),
      image_url: product.image_url
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (productId: number) => {
    setProducts(prev => prev.filter(product => product.product_id !== productId));
    toast({
      title: "Product Deleted",
      description: "Product has been successfully deleted.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Products Management</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock_quantity}
                    onChange={(e) => handleInputChange('stock_quantity', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category_id} onValueChange={(value) => handleInputChange('category_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.category_id} value={category.category_id.toString()}>
                          {category.category_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image_url}
                    onChange={(e) => handleInputChange('image_url', e.target.value)}
                  />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingProduct ? 'Update' : 'Create'} Product
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.map(product => (
              <div key={product.product_id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.category_name}</p>
                    <p className="text-sm text-gray-500">{product.description}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="font-medium">${product.price}</span>
                      <span className="text-sm text-gray-600">Stock: {product.stock_quantity}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(product)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(product.product_id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsManager;
