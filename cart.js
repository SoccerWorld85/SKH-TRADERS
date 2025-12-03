/**
 * Cart Management Module
 * Handles shopping cart operations with localStorage
 * Security: Uses CSRF tokens and sanitization
 */

class CartManager {
  constructor() {
    this.cartStorageKey = 'skh_traders_cart';
    this.csrfTokenKey = 'skh_traders_csrf';
    this.initCSRFToken();
  }

  // Generate and store CSRF token for form submissions
  initCSRFToken() {
    if (!sessionStorage.getItem(this.csrfTokenKey)) {
      const token = this.generateToken();
      sessionStorage.setItem(this.csrfTokenKey, token);
    }
  }

  // Generate secure random token
  generateToken() {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  // Get CSRF token
  getCSRFToken() {
    return sessionStorage.getItem(this.csrfTokenKey);
  }

  // Get cart from localStorage
  getCart() {
    try {
      const cart = localStorage.getItem(this.cartStorageKey);
      return cart ? JSON.parse(cart) : [];
    } catch (e) {
      console.error('Error reading cart:', e);
      return [];
    }
  }

  // Save cart to localStorage
  saveCart(cart) {
    try {
      localStorage.setItem(this.cartStorageKey, JSON.stringify(cart));
      this.notifyCartUpdated();
    } catch (e) {
      console.error('Error saving cart:', e);
      alert('Failed to save cart. Your storage might be full.');
    }
  }

  // Add product to cart with quantity validation
  addToCart(product, quantity = 1) {
    // Validate inputs
    quantity = parseInt(quantity) || 1;
    if (quantity < 1) {
      alert('Quantity must be at least 1');
      return false;
    }
    if (quantity > 1000) {
      alert('Quantity cannot exceed 1000');
      return false;
    }

    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image
      });
    }

    this.saveCart(cart);
    return true;
  }

  // Remove product from cart
  removeFromCart(productId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.id !== productId);
    this.saveCart(cart);
  }

  // Update product quantity
  updateQuantity(productId, quantity) {
    quantity = parseInt(quantity) || 0;
    if (quantity < 0) {
      this.removeFromCart(productId);
      return;
    }
    if (quantity > 1000) {
      alert('Quantity cannot exceed 1000');
      return;
    }

    const cart = this.getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
      if (quantity === 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.saveCart(cart);
      }
    }
  }

  // Get cart total
  getCartTotal() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Get cart item count
  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }

  // Clear cart
  clearCart() {
    localStorage.removeItem(this.cartStorageKey);
    this.notifyCartUpdated();
  }

  // Notify listeners of cart update
  notifyCartUpdated() {
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  }
}

/**
 * Order Management Module
 * Handles order submission with security
 */
class OrderManager {
  constructor() {
    this.cartManager = new CartManager();
    this.ordersStorageKey = 'skh_traders_orders';
  }

  // Sanitize user input
  sanitizeInput(input) {
    if (!input) return '';
    return String(input)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  // Validate email format
  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Validate phone number (basic check)
  validatePhone(phone) {
    const re = /^[0-9\+\-\s\(\)]{7,20}$/;
    return re.test(phone);
  }

  // Validate address
  validateAddress(address) {
    return address && address.trim().length >= 5 && address.trim().length <= 200;
  }

  // Create order object with sanitized data
  createOrder(formData) {
    const errors = [];

    // Validate CSRF token
    if (formData.csrf !== this.cartManager.getCSRFToken()) {
      errors.push('Security token mismatch. Please refresh and try again.');
    }

    // Validate required fields
    if (!this.sanitizeInput(formData.fullName) || formData.fullName.trim().length < 2) {
      errors.push('Full name must be at least 2 characters');
    }

    if (!this.validateEmail(formData.email)) {
      errors.push('Invalid email address');
    }

    if (!this.validatePhone(formData.phone)) {
      errors.push('Invalid phone number');
    }

    if (!this.validateAddress(formData.address)) {
      errors.push('Address must be between 5 and 200 characters');
    }

    if (!this.sanitizeInput(formData.city) || formData.city.trim().length < 2) {
      errors.push('City must be at least 2 characters');
    }

    if (!this.sanitizeInput(formData.postalCode) || formData.postalCode.trim().length < 2) {
      errors.push('Postal code is invalid');
    }

    if (errors.length > 0) {
      return { success: false, errors };
    }

    const cart = this.cartManager.getCart();
    if (cart.length === 0) {
      return { success: false, errors: ['Cart is empty'] };
    }

    const order = {
      id: this.generateOrderId(),
      timestamp: new Date().toISOString(),
      customer: {
        fullName: this.sanitizeInput(formData.fullName),
        email: this.sanitizeInput(formData.email),
        phone: this.sanitizeInput(formData.phone),
        address: this.sanitizeInput(formData.address),
        city: this.sanitizeInput(formData.city),
        postalCode: this.sanitizeInput(formData.postalCode),
        country: this.sanitizeInput(formData.country || 'Pakistan')
      },
      items: cart,
      total: this.cartManager.getCartTotal(),
      status: 'pending'
    };

    return { success: true, order };
  }

  // Generate unique order ID
  generateOrderId() {
    return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }

  // Save order to localStorage
  saveOrder(order) {
    try {
      const orders = this.getOrders();
      orders.push(order);
      localStorage.setItem(this.ordersStorageKey, JSON.stringify(orders));
    } catch (e) {
      console.error('Error saving order:', e);
    }
  }

  // Get all orders from localStorage
  getOrders() {
    try {
      const orders = localStorage.getItem(this.ordersStorageKey);
      return orders ? JSON.parse(orders) : [];
    } catch (e) {
      console.error('Error reading orders:', e);
      return [];
    }
  }

  // Format order data for WhatsApp message
  formatOrderForWhatsApp(order) {
    let message = `*SKH Traders - New Order*\n\n`;
    message += `Order ID: ${order.id}\n`;
    message += `Date: ${new Date(order.timestamp).toLocaleString()}\n\n`;
    
    message += `*Customer Details:*\n`;
    message += `Name: ${order.customer.fullName}\n`;
    message += `Email: ${order.customer.email}\n`;
    message += `Phone: ${order.customer.phone}\n`;
    message += `Address: ${order.customer.address}\n`;
    message += `City: ${order.customer.city}\n`;
    message += `Postal Code: ${order.customer.postalCode}\n`;
    message += `Country: ${order.customer.country}\n\n`;

    message += `*Order Items:*\n`;
    order.items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Qty: ${item.quantity} x Rs. ${item.price.toFixed(2)}\n`;
      message += `   Subtotal: Rs. ${(item.quantity * item.price).toFixed(2)}\n\n`;
    });

    message += `*Total Amount: Rs. ${order.total.toFixed(2)}*\n\n`;
    message += `Please confirm this order.`;

    return encodeURIComponent(message);
  }

  // Format order data for email
  formatOrderForEmail(order) {
    let html = `
      <h2>SKH Traders - Order Confirmation</h2>
      <p><strong>Order ID:</strong> ${order.id}</p>
      <p><strong>Date:</strong> ${new Date(order.timestamp).toLocaleString()}</p>
      
      <h3>Customer Details</h3>
      <p>
        <strong>Name:</strong> ${order.customer.fullName}<br>
        <strong>Email:</strong> ${order.customer.email}<br>
        <strong>Phone:</strong> ${order.customer.phone}<br>
        <strong>Address:</strong> ${order.customer.address}<br>
        <strong>City:</strong> ${order.customer.city}<br>
        <strong>Postal Code:</strong> ${order.customer.postalCode}<br>
        <strong>Country:</strong> ${order.customer.country}
      </p>
      
      <h3>Order Items</h3>
      <table border="1" cellpadding="10" cellspacing="0" style="width: 100%; border-collapse: collapse;">
        <tr style="background-color: #f0f0f0;">
          <th>Product</th>
          <th>Quantity</th>
          <th>Price (Rs.)</th>
          <th>Subtotal (Rs.)</th>
        </tr>
    `;

    order.items.forEach(item => {
      const subtotal = item.quantity * item.price;
      html += `
        <tr>
          <td>${item.name}</td>
          <td>${item.quantity}</td>
          <td>${item.price.toFixed(2)}</td>
          <td>${subtotal.toFixed(2)}</td>
        </tr>
      `;
    });

    html += `
      </table>
      <h3>Total Amount: Rs. ${order.total.toFixed(2)}</h3>
      <p>Thank you for your order!</p>
    `;

    return html;
  }

  // Generate mailto link for customer confirmation
  generateEmailLink(order) {
    const subject = `Order Confirmation - ${order.id}`;
    const body = this.formatOrderForEmail(order)
      .replace(/<[^>]*>/g, '') // Remove HTML tags
      .replace(/&nbsp;/g, ' ');

    return `mailto:${order.customer.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  // Generate WhatsApp link to business number
  generateWhatsAppLink(order, businessPhone = '+923248787858') {
    const message = this.formatOrderForWhatsApp(order);
    return `https://wa.me/${businessPhone.replace(/\D/g, '')}?text=${message}`;
  }
}

// Export for use in HTML
const cartManager = new CartManager();
const orderManager = new OrderManager();
