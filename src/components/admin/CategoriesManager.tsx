
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Category {
  category_id: number;
  category_name: string;
  description: string;
}

const CategoriesManager = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [categories, setCategories] = useState<Category[]>([
    {
      category_id: 1,
      category_name: 'Anime Figures',
      description: 'Action figures from popular anime series'
    },
    {
      category_id: 2,
      category_name: 'Marvel Figures',
      description: 'Superhero figures from Marvel universe'
    },
    {
      category_id: 3,
      category_name: 'DC Figures',
      description: 'Superhero figures from DC Comics'
    }
  ]);

  const [formData, setFormData] = useState({
    category_name: '',
    description: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCategory) {
      setCategories(prev => prev.map(category => 
        category.category_id === editingCategory.category_id
          ? { ...category, ...formData }
          : category
      ));
      toast({
        title: "Category Updated",
        description: "Category has been successfully updated.",
      });
    } else {
      const newCategory: Category = {
        category_id: Math.max(...categories.map(c => c.category_id)) + 1,
        ...formData
      };
      setCategories(prev => [...prev, newCategory]);
      toast({
        title: "Category Created",
        description: "New category has been successfully created.",
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      category_name: '',
      description: ''
    });
    setEditingCategory(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      category_name: category.category_name,
      description: category.description
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (categoryId: number) => {
    setCategories(prev => prev.filter(category => category.category_id !== categoryId));
    toast({
      title: "Category Deleted",
      description: "Category has been successfully deleted.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Categories Management</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => resetForm()}>
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="category_name">Category Name</Label>
                  <Input
                    id="category_name"
                    value={formData.category_name}
                    onChange={(e) => handleInputChange('category_name', e.target.value)}
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
                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    {editingCategory ? 'Update' : 'Create'} Category
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map(category => (
              <Card key={category.category_id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{category.category_name}</CardTitle>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(category)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(category.category_id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesManager;
