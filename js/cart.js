// cart.js - Manages cart logic, operations, and UI updates

/**
 * Cart Module - Handles all cart-related functionality
 */

class Cart {
    constructor() {
        this.items = [];
        this.taxRate = 0.05; // 5% tax
        this.discountThreshold = 50; // Discount threshold
        this.discountRate = 0.10; // 10% discount
        this.init();
    }

    /**
     * Initialize cart from localStorage
     */
    init() {
        const savedCart = Storage.load('cart');
        if (savedCart && Array.isArray(savedCart)) {
            this.items = savedCart;
        }
        this.render();
    }

    /**
     * Add item to cart
     * @param {string} productId - The product ID to add
     * @param {number} quantity - Quantity to add (default: 1)
     */
    addItem(productId, quantity = 1) {
        const product = Product.getProductFromDOM(productId);
        
        if (!product) {
            console.error('Product not found:', productId);
            return;
        }

        // Check stock availability
        if (product.stock !== undefined) {
            const existingItem = this.items.find(item => item.id === productId);
            const currentCartQty = existingItem ? existingItem.quantity : 0;
            
            if (currentCartQty + quantity > product.stock) {
                this.showNotification(`Only ${product.stock} available in stock`);
                return;
            }
        }

        const existingItem = this.items.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.category,
                image: product.image,
                description: product.description,
                quantity: quantity
            });
        }

        this.save();
        this.render();
        this.showNotification(quantity > 1 ? `${quantity} items added to cart!` : 'Item added to cart!');
    }

    /**
     * Remove item from cart
     * @param {string} productId - The product ID to remove
     */
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        this.render();
        this.showNotification('Item removed from cart');
    }

    /**
     * Update item quantity
     * @param {string} productId - The product ID to update
     * @param {number} change - The quantity change (+1 or -1)
     */
    updateQuantity(productId, change) {
        const item = this.items.find(item => item.id === productId);
        
        if (!item) return;
        
        // Check stock if increasing quantity
        if (change > 0) {
            const product = Product.getProductById(productId);
            if (product && product.stock !== undefined) {
                if (item.quantity + change > product.stock) {
                    this.showNotification(`Only ${product.stock} available in stock`);
                    return;
                }
            }
        }
        
        item.quantity += change;
        
        if (item.quantity <= 0) {
            this.removeItem(productId);
            return;
        }
        
        this.save();
        this.render();
    }

    /**
     * Clear all items from cart
     */
    clearCart() {
        this.items = [];
        this.save();
        this.render();
        this.closeCartModal();
    }

    /**
     * Save cart to localStorage
     */
    save() {
        Storage.save('cart', this.items);
    }

    /**
     * Calculate subtotal
     * @returns {number} Subtotal amount
     */
    getSubtotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    /**
     * Calculate tax
     * @returns {number} Tax amount
     */
    getTax() {
        return this.getSubtotal() * this.taxRate;
    }

    /**
     * Calculate discount
     * @returns {number} Discount amount
     */
    getDiscount() {
        const subtotal = this.getSubtotal();
        if (subtotal >= this.discountThreshold) {
            return subtotal * this.discountRate;
        }
        return 0;
    }

    /**
     * Calculate total
     * @returns {number} Total amount
     */
    getTotal() {
        return this.getSubtotal() + this.getTax() - this.getDiscount();
    }

    /**
     * Get total quantity of items in cart
     * @returns {number} Total quantity
     */
    getTotalQuantity() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    /**
     * Render cart UI
     */
    render() {
        this.renderCartBadge();
        this.renderCartItems();
        this.renderCartSummary();
    }

    /**
     * Render cart badge in navbar
     */
    renderCartBadge() {
        const cartBadge = document.getElementById('cartBadge');
        const totalQuantity = this.getTotalQuantity();
        
        if (cartBadge) {
            if (totalQuantity > 0) {
                cartBadge.textContent = totalQuantity;
                cartBadge.style.display = 'flex';
            } else {
                cartBadge.textContent = '';
            }
        }
    }

    /**
     * Render cart items list
     */
    renderCartItems() {
        const cartItemsContainer = document.getElementById('cartItems');
        
        if (!cartItemsContainer) return;
        
        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Your cart is empty</p>
                    <a href="#products" class="btn btn-primary" onclick="cart.closeCartModal()">
                        Browse Products
                    </a>
                </div>
            `;
            return;
        }

        cartItemsContainer.innerHTML = this.items.map(item => {
            const product = new Product(
                item.id,
                item.name,
                item.price,
                item.category,
                item.image,
                item.description
            );
            return product.renderCartItem(item.quantity);
        }).join('');
    }

    /**
     * Render cart summary
     */
    renderCartSummary() {
        const cartSummaryContainer = document.getElementById('cartSummary');
        
        if (!cartSummaryContainer) return;

        const subtotal = this.getSubtotal();
        const tax = this.getTax();
        const discount = this.getDiscount();
        const total = this.getTotal();

        cartSummaryContainer.innerHTML = `
            <div class="cart-summary-line">
                <span>Subtotal</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="cart-summary-line">
                <span>Tax (5%)</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            ${discount > 0 ? `
                <div class="cart-summary-line discount">
                    <span><i class="fas fa-tag"></i> Discount (10%)</span>
                    <span>-$${discount.toFixed(2)}</span>
                </div>
            ` : ''}
            <div class="cart-summary-line total">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
            <button class="btn btn-primary checkout-btn" onclick="cart.goToCheckout()">
                Proceed to Checkout
            </button>
        `;
    }

    /**
     * Open cart modal
     */
    openCartModal() {
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            cartModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    /**
     * Close cart modal
     */
    closeCartModal() {
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            cartModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    /**
     * Toggle cart modal
     */
    toggleCartModal() {
        const cartModal = document.getElementById('cartModal');
        if (cartModal && cartModal.classList.contains('active')) {
            this.closeCartModal();
        } else {
            this.openCartModal();
        }
    }

    /**
     * Navigate to checkout/order summary page
     */
    goToCheckout() {
        if (this.items.length === 0) {
            this.showNotification('Your cart is empty');
            return;
        }
        
        // Check if user is logged in (if auth module is available)
        if (typeof auth !== 'undefined' && !auth.isLoggedIn()) {
            this.showNotification('Please login to proceed to checkout');
            if (auth.showLoginModal) {
                setTimeout(() => auth.showLoginModal(), 500);
            }
            return;
        }
        
        // Save cart state and navigate
        this.save();
        window.location.href = 'checkout.html';
    }

    /**
     * Show notification toast
     * @param {string} message - Notification message
     */
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }
}

// Create global cart instance
const cart = new Cart();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Cart;
}

