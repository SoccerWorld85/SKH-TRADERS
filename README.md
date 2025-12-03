# SKH Traders - E-Commerce Site

A fully functional e-commerce platform for SKH Traders, specializing in premium quality seeds and spices.

## 🚀 Quick Start

### Run Locally

```bash
cd 'd:\hadi\.git\SKH-TRADERS'
http-server -p 3000 -c-1
```

Then open in your browser: **http://localhost:3000**

**Alternative (with Python 3):**
```bash
cd 'd:\hadi\.git\SKH-TRADERS'
python -m http.server 3000
```

**Alternative (VS Code Live Server):**
- Install VS Code "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

---

## 📋 Features

### 1. **Multi-Page Site Structure**
- **index.html** - Homepage with introduction and featured services
- **products.html** - Full product catalog with search & filtering
- **cart.html** - Shopping cart with quantity management
- **checkout.html** - Secure order form with validation

### 2. **Product Management**
- 7 premium products (seeds & spices)
- Product categories: Seeds, Spices
- Product details with images, descriptions, and benefits
- Fully expandable product database in `products.js`

### 3. **Search & Filtering**
- Real-time search by product name, description, or category
- Filter by category (All, Seeds, Spices)
- Live product count and relevance sorting

### 4. **Shopping Cart**
- Add products with custom quantities
- Update quantities on-the-fly (increment/decrement)
- Remove items individually or clear entire cart
- Persistent cart using browser localStorage
- Cart badge showing total items (real-time updates)
- Order summary with subtotal and total

### 5. **Secure Checkout**
- Complete address form with validation:
  - Full name (minimum 2 characters)
  - Email format validation
  - Phone number validation
  - Detailed address (5-200 characters)
  - City, postal code, country
- CSRF token protection (session-based)
- Input sanitization to prevent XSS attacks
- Form error messages for failed validation

### 6. **Order Submission & Delivery**
- Orders automatically sent to WhatsApp (Business Number)
- Order confirmation sent via Email
- Order format includes:
  - Order ID with timestamp
  - Customer details
  - Itemized list with quantities and prices
  - Total amount
  - Delivery instructions
- Orders saved locally in browser history

### 7. **Security Features**
- ✅ CSRF Token Validation
- ✅ Input Sanitization (XSS Prevention)
- ✅ Email & Phone Validation
- ✅ Address Length Validation
- ✅ Secure WhatsApp & Email Links
- ✅ No backend required (client-side only)
- ✅ LocalStorage for persistent data

### 8. **Responsive Design**
- Mobile-first responsive layout
- Works on phones, tablets, and desktops
- Optimized touch interactions
- Flexible grid layouts

---

## 🔧 Technical Architecture

### Core Files

| File | Purpose |
|------|---------|
| `index.html` | Homepage with services overview |
| `products.html` | Product listing with search/filter |
| `cart.html` | Shopping cart management |
| `checkout.html` | Order form and submission |
| `style.css` | All styling (single file) |
| `cart.js` | Cart & order management logic |
| `products.js` | Product database & utilities |

### JavaScript Modules

**`cart.js`** - Cart & Order Management
- `CartManager` class: Handles cart operations, CSRF tokens
- `OrderManager` class: Validates form data, creates orders, formats messages

**`products.js`** - Product Data & Search
- Product database with 7 items
- Search functionality across name/description/category
- Category filtering utilities

### Data Storage
- **localStorage**: Persistent cart and order history
- **sessionStorage**: CSRF tokens (session-based)

---

## 🛒 User Flow

```
Home (index.html)
    ↓
Products Page (products.html)
    ├─ Search products
    ├─ Filter by category
    └─ Add to cart (quantity selector)
    ↓
Shopping Cart (cart.html)
    ├─ View all items
    ├─ Update quantities
    ├─ Remove items
    └─ Proceed to checkout
    ↓
Checkout (checkout.html)
    ├─ Fill address form
    ├─ Validate inputs
    └─ Submit order
    ↓
Order Submission
    ├─ CSRF validation ✓
    ├─ Input sanitization ✓
    ├─ Open WhatsApp link ✓
    ├─ Open Email link ✓
    └─ Save to browser history ✓
```

---

## 📦 Product Database

### Seeds Category
- Fennel Seeds (saunf) - Rs. 350
- Carom Seeds (ajwain) - Rs. 400
- Coriander Seeds - Rs. 300
- Cumin Seeds (zeera) - Rs. 280

### Spices Category
- Turmeric Powder - Rs. 450
- Red Chillies (whole) - Rs. 500
- Black Pepper (powdered) - Rs. 520

**To add more products**, edit `products.js` and add to the `PRODUCTS` array.

---

## 🔒 Security Implementation

### CSRF Protection
- Session-based tokens generated using `crypto.getRandomValues()`
- Tokens stored in `sessionStorage` (session lifetime)
- Validated on form submission

### Input Validation
- **Email**: RFC standard regex validation
- **Phone**: 7-20 characters with common separators
- **Address**: 5-200 characters minimum
- **Full Name**: 2+ characters
- **Postal Code**: 2+ characters

### Input Sanitization
All user inputs are escaped to prevent XSS:
- HTML special chars converted to entities
- Safe for display and storage

### No Backend Exposure
- All order processing happens client-side
- Orders sent via secure WhatsApp API links
- Email links use secure `mailto:` protocol
- No sensitive data sent to third-party servers

---

## 📱 WhatsApp & Email Integration

### WhatsApp
- Order details sent to: **+92 324 8787858**
- Format: Structured message with order ID, items, total
- Link opens WhatsApp Web/App automatically
- No real backend required - uses WhatsApp API

### Email
- Sends to customer's provided email
- Format: Professional HTML invoice
- Link opens default email client
- Includes all order details

---

## 🎨 Customization

### Change Business Phone Number
Edit in `checkout.html`, line ~305:
```javascript
const whatsappLink = orderManager.generateWhatsAppLink(order, '+923248787858');
```

### Add/Edit Products
Edit `products.js` and add to `PRODUCTS` array:
```javascript
{
  id: 'unique-id',
  name: 'Product Name',
  category: 'Seeds', // or 'Spices'
  price: 350,
  image: './attached_assets/generated_images/image.png',
  description: 'Full description...',
  benefits: ['Benefit 1', 'Benefit 2'],
  inStock: true
}
```

### Change Colors
Edit `:root` variables in `style.css`:
```css
:root {
    --primary-color: #2D7A3E;  /* Main brand color */
    --primary-dark: #1f5428;    /* Dark variant */
    --accent-color: #4a9c5c;    /* Highlights */
    /* ... etc ... */
}
```

---

## ✨ Features Breakdown

| Feature | Status | Security |
|---------|--------|----------|
| Search Products | ✅ Complete | Safe |
| Filter by Category | ✅ Complete | Safe |
| Add to Cart | ✅ Complete | Safe |
| Cart Persistence | ✅ Complete | LocalStorage |
| Quantity Management | ✅ Complete | Client-side |
| Address Form | ✅ Complete | Validated |
| Email Validation | ✅ Complete | Regex |
| Phone Validation | ✅ Complete | Regex |
| CSRF Protection | ✅ Complete | Token-based |
| Input Sanitization | ✅ Complete | XSS Prevention |
| WhatsApp Integration | ✅ Complete | API Links |
| Email Integration | ✅ Complete | Mailto Links |
| Order History | ✅ Complete | LocalStorage |
| Mobile Responsive | ✅ Complete | Responsive CSS |

---

## 🚀 Deployment

### Local Testing
```bash
http-server -p 3000 -c-1
```

### Production Deployment
- Upload all files to web host
- Works on any static hosting (GitHub Pages, Netlify, Vercel, etc.)
- No backend server required
- CDN-friendly (no dynamic content)

### Before Going Live
1. Update WhatsApp business number in `checkout.html`
2. Update company details in `index.html#contact`
3. Add your products to `products.js`
4. Test all cart/checkout flows
5. Verify WhatsApp & Email links work

---

## 📞 Support Contact

**WhatsApp:** +92 324 8787858  
**Email:** shazib.mehar3@gmail.com  
**Address:** Sanat Road, Street # 4, Gujranwala, Punjab, Pakistan

---

## 📝 License

© 2025 SKH Traders. All rights reserved.

---

## ❓ FAQ

**Q: Where are orders stored?**  
A: Orders are saved in browser localStorage for history. To receive live orders, use WhatsApp/Email which open automatically.

**Q: Can customers edit orders after submission?**  
A: Orders are immutable after checkout. Customers must contact via WhatsApp/Email to modify.

**Q: Is payment processing included?**  
A: No. This is an order form. Add payment gateway (Stripe, Jazz Cash, etc.) as needed.

**Q: Can I add product variants (colors, sizes)?**  
A: Yes! Extend the product object in `products.js` with additional fields.

**Q: How many products can I add?**  
A: Unlimited. Edit `products.js` - no database required.

---

## 🐛 Troubleshooting

**Images not loading?**
- Ensure images are in `attached_assets/generated_images/`
- Check file paths match exactly in `products.js`

**Cart not saving?**
- Check browser localStorage is enabled
- Try different browser if localStorage is disabled

**WhatsApp link not working?**
- Ensure phone number format is correct
- WhatsApp must be installed on device
- Or use WhatsApp Web at web.whatsapp.com

**Form validation failing?**
- Check browser console for error messages
- Ensure all required fields are filled
- Email must be valid format
- Phone must be 7-20 characters

---

## 🎉 You're All Set!

Your e-commerce site is ready. Start by:
1. Opening `http://localhost:3000`
2. Browse products on products.html
3. Add items to cart
4. Proceed to checkout
5. Test WhatsApp & Email delivery

Happy selling! 🚀
