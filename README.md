# Hami MiniMarket - Fresh Local Produce Website

## Project Overview
Hami MiniMarket is a modern, responsive website for a local fresh produce market. The website showcases fresh fruits and vegetables with an emphasis on local sourcing, quality, and community connection.

## 🎯 Project Purpose
- Create a professional website for Hami MiniMarket
- Showcase fresh, locally-sourced fruits and vegetables
- Provide contact information and product catalog
- Build community connection through quality produce presentation

## 🛠️ Tech Stack
- **HTML5** - Semantic structure and content
- **CSS3** - Styling, responsive design, and animations
- **JavaScript (ES6+)** - Interactive features, async/await, modular architecture
- **JSON** - Local product data storage (`data/products.json`)
- **localStorage API** - Client-side cart persistence
- **Fetch API** - Loading products from JSON file
- **Font Awesome** - Icons and visual elements
- **Google Fonts** - Typography (Poppins font family)

## 🚀 Features

### Week 2 - Product Catalog
- Responsive layout (mobile and desktop)
- Product catalog (8+ items: name, image, price, category)
- Real-time search by product name
- Category filter (Fruits/Vegetables)
- Price filter (≤ selected price)
- Add to Cart button + navbar cart counter (localStorage)
- Contact form with client-side validation

### Week 3 - Modular Shopping Cart System
- **Modular Code Architecture**:
  - `product.js` - Product rendering and management
  - `cart.js` - Cart logic and operations
  - `storage.js` - localStorage management
  - `checkout.js` - Order summary functionality
- **Cart Modal/Sidebar**:
  - Slide-in cart modal from right
  - View all cart items with images
  - Update quantities (+/- buttons)
  - Remove individual items
  - Clear entire cart
- **Persistent Storage**:
  - Cart saved in browser localStorage
  - Automatically loads on page refresh
  - Cart counter in navbar
- **Order Summary Page**:
  - Dedicated checkout page (`checkout.html`)
  - Display all items with details
  - Subtotal, tax (5%), and total calculation
  - Confirm order button
- **Discount System**:
  - 10% discount for orders over $50
  - Automatically applied at checkout
- **Toast Notifications**:
  - Slide-in notifications for cart actions
  - Success messages for add/remove/update
- **Animations**:
  - Fade-in cart items
  - Slide-out cart modal
  - Smooth transitions

### Week 4 - Complete Shopping Experience ⭐ FINAL PROJECT!
- **Product Data Source**:
  - Products loaded from `data/products.json` (local JSON file)
  - Dynamic product rendering from JSON data
  - No external APIs - all data is local
- **Enhanced Product Management**:
  - Async/await for loading products
  - Product data fetched on page load
  - Error handling for failed product loads
- **Complete Checkout Flow**:
  - Order summary with subtotal, tax (5%), discount (10% over $50), and total
  - "Confirm Order" button triggers success state
  - Cart automatically cleared after order confirmation
  - "Order Confirmed!" success message with continue shopping option
- **Mobile-First Responsive Design**:
  - Fully responsive on mobile, tablet, and desktop
  - Touch-friendly buttons and interactions
  - Optimized layouts for all screen sizes
- **Accessibility Features**:
  - Semantic HTML5 markup
  - ARIA labels where appropriate
  - Keyboard navigation support
  - Alt text for all images
  - Readable typography and contrast
- **Polish & Professional UI**:
  - Consistent branding (colors, fonts, logo)
  - Smooth animations and transitions
  - Loading states for product fetching
  - Empty states for cart and search results
  - Professional spacing and layout

## 📱 Setup & Run Instructions

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (required for loading JSON files due to CORS)

### Option 1: Live Server (Recommended)
1. Clone or download this repository
2. Open the project folder in VS Code (or your preferred editor)
3. Install the "Live Server" extension (if using VS Code)
4. Right-click on `index.html` and select "Open with Live Server"
5. The website will open in your browser at `http://localhost:5500` (or similar)

### Option 2: Python HTTP Server
1. Open terminal/command prompt in the project directory
2. Run: `python -m http.server 8000` (Python 3) or `python -m SimpleHTTPServer 8000` (Python 2)
3. Open browser and navigate to `http://localhost:8000`

### Option 3: Node.js HTTP Server
1. Install Node.js if not already installed
2. Install `http-server` globally: `npm install -g http-server`
3. Run: `http-server` in the project directory
4. Open browser and navigate to the provided URL

### Option 4: Direct File (Limited)
- **Note**: Opening `index.html` directly may not work due to CORS restrictions when loading JSON
- Use a local server (Options 1-3) for full functionality

### Deployment
- **GitHub Pages**: Push to GitHub → Settings → Pages → Deploy from main branch
- **Netlify**: Drag and drop the project folder or connect GitHub repo
- **Vercel**: Connect GitHub repo and deploy
- **Other Platforms**: Upload all files maintaining the folder structure

## 📁 Project Structure
```
web2/
├── index.html              # Landing + product catalog (search & filters)
├── checkout.html           # Order summary and checkout page
├── styles.css              # Styles and responsive rules
├── script.js               # Search, filters, UI interactions, product loading
├── data/
│   └── products.json       # Product data (name, category, price, image, description, id)
├── js/
│   ├── storage.js          # localStorage operations
│   ├── auth.js             # Mock authentication system (signup/login)
│   ├── product.js          # Product rendering, JSON loading, management
│   ├── cart.js             # Cart logic and operations
│   └── checkout.js         # Checkout page functionality
├── order-history.html      # Order history page for logged-in users
├── README.md               # Documentation (this file)
├── picture1.jpg .. picture11.jpg  # Product images
```

## 📊 Data Source
- **Product Data**: All products are stored in `data/products.json`
- **Format**: JSON array with product objects containing:
  - `id`: Unique product identifier (string)
  - `name`: Product name (string)
  - `category`: Product category - "Fruit" or "Vegetable" (string)
  - `price`: Product price in USD (number)
  - `image`: Image filename (string)
  - `description`: Product description (string)
- **Loading**: Products are loaded asynchronously using the Fetch API on page load
- **No External APIs**: All product data is local - no external API calls required

## 🎨 Design Features
- **Color Scheme**: Fresh greens and natural tones
- **Typography**: Modern Poppins font family
- **Layout**: Grid-based responsive design
- **Icons**: Font Awesome icons for visual appeal
- **Animations**: Smooth hover effects and transitions

## 📞 Contact Information
- **Location**: Somalia, Mogadishu, Wartanabada
- **Phone**: (+252) 61-1-63-52-73
- **Email**: maryamabdimohamed63@gmail.com

## 🌟 Key Sections
1. **Hero Section** - Welcome message and call-to-action
2. **Products** - Fresh produce showcase with descriptions
3. **About** - Company mission and values
4. **Contact** - Contact form and business information
5. **Footer** - Social links and additional information

## 🔧 Technical Implementation
- HTML5 (semantic structure)
- CSS Grid/Flexbox, media queries
- JavaScript (DOM manipulation, filter logic, localStorage)
- Accessibility-friendly labels and alt text
- Cross-browser responsive design

## 🧪 How to Test the Cart (Week 3)

### Testing the Cart System
1. **Add Items**:
   - Click "Add to Cart" on any product
   - Cart modal should slide in from right
   - Toast notification appears

2. **Update Quantities**:
   - In cart modal, use +/- buttons to change quantity
   - Total updates automatically
   - Toast notification appears

3. **Remove Items**:
   - Click trash icon to remove individual items
   - Or "Clear Cart" to remove all
   - Toast notification appears

4. **Persistent Storage**:
   - Add items to cart
   - Refresh page (F5)
   - Items should still be in cart

5. **Checkout**:
   - Click "Proceed to Checkout" in cart modal
   - Review order on checkout page
   - See subtotal, tax (5%), and total
   - If total > $50, see 10% discount applied
   - Click "Confirm Order" to complete

6. **Discount System**:
   - Add items totaling over $50
   - Go to checkout
   - See 10% discount applied automatically

### localStorage Usage
The cart uses `localStorage.getItem('cart')` and `localStorage.setItem('cart')` to persist cart data across page refreshes. Open browser DevTools (F12) → Application → Local Storage to view saved cart data.

## 📸 Screenshots
_Add screenshots of your application here:_
- Homepage/Product listing
- Cart modal
- Checkout page
- Mobile responsive views
- Order confirmation screen

## 💭 Reflection

### What I Learned
This Week 4 final project was an excellent culmination of the HamiSkills Web Development track. I successfully combined all the skills learned in Weeks 1-3 into a complete, professional shopping experience.

**Key Achievements:**
- **Data Management**: Implemented dynamic product loading from JSON, moving away from hardcoded HTML to a more maintainable data-driven approach
- **Modular Architecture**: Maintained clean separation of concerns with dedicated modules for products, cart, storage, and checkout
- **Async JavaScript**: Gained experience with async/await and Fetch API for loading data
- **User Experience**: Created a polished, accessible interface with smooth animations, loading states, and clear feedback
- **Responsive Design**: Ensured the application works seamlessly across all device sizes

**Challenges Overcome:**
- Initially struggled with CORS when loading JSON files - solved by using a local server
- Ensuring cart persistence works correctly across page navigation
- Implementing proper error handling for failed product loads
- Making the filter system work with dynamically loaded products

**Skills Developed:**
- Modern JavaScript (ES6+, async/await, Fetch API)
- JSON data management
- Modular code organization
- Error handling and user feedback
- Responsive design principles
- Accessibility best practices

**Future Improvements:**
- Add user authentication for order history
- Implement a backend API for product management
- Add payment integration
- Include product reviews and ratings
- Add quantity selector on product cards
- Implement order history for logged-in users

This project demonstrates a complete understanding of front-end web development fundamentals and provides a solid foundation for building more complex applications.

## 📈 Future Enhancements
- User authentication and order history
- Backend API with database (Node/Express, Flask, or FastAPI)
- Payment integration (Stripe, PayPal)
- Reviews and ratings system
- Newsletter subscription
- Product recommendations
- Order tracking
- Admin dashboard for product management

## 📤 Deployment
- GitHub Pages: push repo → Settings → Pages → Deploy from main branch
- Netlify: drag-and-drop folder or connect repo (build command not required)

## 📝 How to Run Locally
1. Clone/download the repo
2. Open `index.html` in any modern browser
3. Or use a live server extension for auto-reload

## 💼 LinkedIn Post Templates

### Week 2 Post
I just completed Week 2 of the HamiSkills Web Dev track! Built a responsive product catalog for Hami MiniMarket with real-time search, category and price filters, plus an Add to Cart and navbar counter (no backend yet). Learned a lot about DOM manipulation, event handling, and localStorage. Live demo/repo: <your link>

### Week 3 Post ⭐ NEW!
🚀 Week 3 complete! Built a modular shopping cart system for Hami MiniMarket using separation of concerns:
✅ product.js - Product rendering
✅ cart.js - Cart logic & operations  
✅ storage.js - localStorage management
✅ checkout.js - Order summary

Features: Slide-in cart modal, persistent storage, 10% discount for orders over $50, toast notifications, and smooth animations. Clean, scalable code architecture with modular JavaScript modules. #WebDevelopment #JavaScript #LocalStorage #SeparationOfConcerns

Live demo: <your link>

---

## ✅ Week 4 Deliverables Checklist

### Required Deliverables
- [x] ✅ **Product Source**: Local data file `data/products.json` (no external APIs)
- [x] ✅ **Product Listing UI**: Responsive product grid/list with name, category, price, image
- [x] ✅ **Modular Cart System**: Reusable modules (`product.js`, `cart.js`, `storage.js`)
- [x] ✅ **Cart Features**: Add to Cart, update quantity, remove item, cart counter in navbar
- [x] ✅ **Cart UI**: Sidebar/modal cart interface
- [x] ✅ **Persistence**: Cart saved to `localStorage` and restored on page load
- [x] ✅ **Checkout Flow**: Order summary with subtotal, tax, discount, total
- [x] ✅ **Order Confirmation**: "Confirm Order" button → success state → clear cart
- [x] ✅ **Polish & Accessibility**: Mobile-first responsive, consistent branding, readable typography, accessible markup
- [x] ✅ **Repo & README**: Clear structure, `data/products.json`, comprehensive README with features, tech stack, setup steps, data source, screenshots section, reflection

### Optional Extra Credit (Implemented! ⭐)
- [x] ✅ **Authentication (Mock)**: Signup/login system that gates checkout
  - User registration and login with localStorage
  - Session persistence across page refreshes
  - Authentication required to proceed to checkout
  - User info displayed in navbar when logged in
- [x] ✅ **UX Extras**: Enhanced user experience features
  - **Quantity Selector**: Select quantity before adding to cart on product cards
  - **Low-Stock Badges**: Visual indicators for products with ≤5 items in stock
  - **Out of Stock**: Products with 0 stock are disabled and show "Out of Stock" badge
  - **Stock Validation**: Prevents adding more items than available in stock
  - **Order History**: View past orders for logged-in users (`order-history.html`)
  - **Toast Animations**: Already implemented in Week 3
  - **Discount System**: Already implemented (10% off orders over $50)
- [ ] Custom backend: REST API serving products and saving orders (Future)
- [ ] SPA/frameworks: React or Vue implementation (Future)
- [ ] Deployment: Live demo link (Ready for deployment)

---

## 📋 Week-by-Week Progress

### Week 1 - Landing Page ✅
- Hero section with call-to-action
- About section
- Contact section with form
- Responsive navigation
- Footer with social links

### Week 2 - Product Catalog ✅
- Product grid with 8+ items
- Real-time search functionality
- Category filter (Fruits/Vegetables)
- Price filter
- Add to Cart buttons
- Navbar cart counter

### Week 3 - Modular Cart System ✅
- Modular JavaScript architecture
- Cart modal/sidebar
- Quantity management
- Persistent localStorage
- Order summary page
- Discount system
- Toast notifications

### Week 4 - Complete Shopping Experience ✅
- Products loaded from JSON
- Dynamic product rendering
- Complete checkout flow
- Order confirmation
- Professional polish
- Comprehensive documentation
- **Extra Credit Features**:
  - Mock authentication (signup/login)
  - Quantity selector on product cards
  - Low-stock and out-of-stock badges
  - Stock validation
  - Order history for logged-in users

---

**Developer**: Maryan Abdi Mohamed  
**Project**: Week 4 Final Project – Complete Hami MiniMarket Web App  
**Date**: January 2025  
**Platform**: HamiSkills Internship – Web Development Track  
**Organization**: [HamiSkills](https://github.com/HamiSkills)
#   W e b - W e e k _ 0 4  
 