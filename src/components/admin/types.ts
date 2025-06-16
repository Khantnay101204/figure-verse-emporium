
export interface PromoCode {
  promo_code_id: number;
  code: string;
  description: string;
  type: 'percentage_discount' | 'fixed_amount_discount' | 'free_shipping';
  value: number;
  minimum_order_amount: number;
  max_uses: number | null;
  uses_count: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
}

export interface CategoryPromotion {
  category_promo_id: number;
  category_id: number;
  category_name: string;
  discount_percentage: number;
  start_date: string;
  end_date: string;
  description: string;
  is_active: boolean;
}

export interface Category {
  category_id: number;
  category_name: string;
}

export interface PromoFormData {
  code: string;
  description: string;
  type: 'percentage_discount' | 'fixed_amount_discount' | 'free_shipping';
  value: string;
  minimum_order_amount: string;
  max_uses: string;
  start_date: string;
  end_date: string;
}

export interface CategoryPromoFormData {
  category_id: string;
  discount_percentage: string;
  start_date: string;
  end_date: string;
  description: string;
}
