// checkout.js - Handles checkout/order summary page functionality

/**
 * Checkout Module - Manages order summary and confirmation
 */

class Checkout {
    constructor() {
        this.init();
    }

    /**
     * Initialize checkout page
     */
    init() {
        // Check authentication
        if (typeof auth !== 'undefined' && !auth.isLoggedIn()) {
            this.showAuthRequired();
            return;
        }
        
        this.renderOrderItems();
        this.renderOrderSummary();
        
        // Check if cart is empty
        if (cart.items.length === 0) {
            this.showEmptyCart();
        }
    }

    /**
     * Show authentication required message
     */
    showAuthRequired() {
        const checkoutContent = document.getElementById('checkoutContent');
        
        if (!checkoutContent) return;
        
        checkoutContent.innerHTML = `
            <div class="empty-checkout">
                <i class="fas fa-lock"></i>
                <h3>Authentication Required</h3>
                <p>Please login or sign up to proceed with checkout.</p>
                <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1rem;">
                    <a href="index.html" class="btn btn-primary">
                        <i class="fas fa-sign-in-alt"></i> Go to Login
                    </a>
                </div>
            </div>
        `;
    }

    /**
     * Render order items on checkout page
     */
    renderOrderItems() {
        const orderItemsContainer = document.getElementById('orderItems');
        
        if (!orderItemsContainer) return;
        
        if (cart.items.length === 0) {
            orderItemsContainer.innerHTML = '';
            return;
        }

        orderItemsContainer.innerHTML = cart.items.map(item => {
            const product = new Product(
                item.id,
                item.name,
                item.price,
                item.category,
                item.image,
                item.description
            );
            return product.renderOrderSummary(item.quantity);
        }).join('');
    }

    /**
     * Render order summary on checkout page
     */
    renderOrderSummary() {
        const orderSummaryContainer = document.getElementById('orderSummaryDetails');
        
        if (!orderSummaryContainer) return;

        const subtotal = cart.getSubtotal();
        const tax = cart.getTax();
        const discount = cart.getDiscount();
        const total = cart.getTotal();

        orderSummaryContainer.innerHTML = `
            <div class="order-summary-line">
                <span>Subtotal</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="order-summary-line">
                <span>Tax (5%)</span>
                <span>$${tax.toFixed(2)}</span>
            </div>
            ${discount > 0 ? `
                <div class="order-summary-line discount">
                    <span><i class="fas fa-tag"></i> Discount (10%)</span>
                    <span>-$${discount.toFixed(2)}</span>
                </div>
            ` : ''}
            <div class="order-summary-line total">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
        `;
    }

    /**
     * Show empty cart message
     */
    showEmptyCart() {
        const checkoutContent = document.getElementById('checkoutContent');
        
        if (!checkoutContent) return;
        
        checkoutContent.innerHTML = `
            <div class="empty-checkout">
                <i class="fas fa-shopping-bag"></i>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <a href="index.html#products" class="btn btn-primary">
                    <i class="fas fa-shopping-cart"></i> Start Shopping
                </a>
            </div>
        `;
    }

    /**
     * Confirm order (simulates order confirmation)
     */
    confirmOrder() {
        if (cart.items.length === 0) {
            cart.showNotification('Your cart is empty');
            return;
        }

        // Check authentication
        if (typeof auth !== 'undefined' && !auth.isLoggedIn()) {
            cart.showNotification('Please login to confirm order');
            return;
        }

        // Save order to history
        if (typeof auth !== 'undefined' && auth.isLoggedIn()) {
            this.saveOrderToHistory();
        }

        // Show success message
        const successMessage = document.getElementById('successMessage');
        const checkoutContent = document.getElementById('checkoutContent');
        
        if (successMessage && checkoutContent) {
            checkoutContent.style.display = 'none';
            successMessage.classList.add('show');
            
            // Clear cart after confirmation
            setTimeout(() => {
                cart.clearCart();
            }, 1000);
        }
    }

    /**
     * Save order to order history
     */
    saveOrderToHistory() {
        if (typeof auth === 'undefined' || !auth.isLoggedIn()) return;

        const order = {
            id: Date.now().toString(),
            userId: auth.getCurrentUser().id,
            items: [...cart.items],
            subtotal: cart.getSubtotal(),
            tax: cart.getTax(),
            discount: cart.getDiscount(),
            total: cart.getTotal(),
            date: new Date().toISOString()
        };

        const orderHistory = Storage.load('orderHistory') || [];
        orderHistory.unshift(order); // Add to beginning
        Storage.save('orderHistory', orderHistory);
    }
}

// Create global checkout instance
const checkout = new Checkout();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Checkout;
}

