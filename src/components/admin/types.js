
// Type definitions for admin components using JSDoc

/**
 * @typedef {Object} Category
 * @property {number} category_id
 * @property {string} category_name
 */

/**
 * @typedef {Object} CategoryPromotion
 * @property {number} category_promo_id
 * @property {string} category_name
 * @property {number} discount_percentage
 * @property {string} description
 * @property {string} start_date
 * @property {string} end_date
 * @property {boolean} is_active
 */

/**
 * @typedef {Object} CategoryPromoFormData
 * @property {string} category_id
 * @property {string} discount_percentage
 * @property {string} description
 * @property {string} start_date
 * @property {string} end_date
 */

/**
 * @typedef {Object} PromoCode
 * @property {number} promo_code_id
 * @property {string} code
 * @property {string} description
 * @property {'percentage_discount' | 'fixed_amount_discount' | 'free_shipping'} type
 * @property {number} value
 * @property {number} minimum_order_amount
 * @property {number|null} max_uses
 * @property {number} uses_count
 * @property {string} start_date
 * @property {string} end_date
 * @property {boolean} is_active
 */

/**
 * @typedef {Object} PromoFormData
 * @property {string} code
 * @property {string} description
 * @property {'percentage_discount' | 'fixed_amount_discount' | 'free_shipping'} type
 * @property {string} value
 * @property {string} minimum_order_amount
 * @property {string} max_uses
 * @property {string} start_date
 * @property {string} end_date
 */

// Export empty object to make this a proper module
export {};
