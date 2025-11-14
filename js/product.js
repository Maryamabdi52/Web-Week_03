// product.js - Handles product rendering and product-related operations

/**
 * Product Module - Manages product data and rendering
 */

// Global products array to store loaded products
let productsData = [];

class Product {
    constructor(id, name, price, category, image, description, stock = 999) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.image = image;
        this.description = description;
        this.stock = stock;
    }

    /**
     * Load products from JSON file
     * @returns {Promise<Array>} Array of Product objects
     */
    static async loadProducts() {
        try {
            const response = await fetch('data/products.json');
            if (!response.ok) {
                throw new Error('Failed to load products');
            }
            const data = await response.json();
            productsData = data.map(item => new Product(
                item.id,
                item.name,
                item.price,
                item.category,
                item.image,
                item.description,
                item.stock || 999
            ));
            return productsData;
        } catch (error) {
            console.error('Error loading products:', error);
            return [];
        }
    }

    /**
     * Get all products
     * @returns {Array} Array of Product objects
     */
    static getProducts() {
        return productsData;
    }

    /**
     * Get product by ID
     * @param {string} productId - The product ID
     * @returns {Product|null} Product object or null
     */
    static getProductById(productId) {
        return productsData.find(p => p.id === productId) || null;
    }

    /**
     * Get product data from DOM (fallback for backward compatibility)
     * @param {string} productId - The product ID
     * @returns {Product|null} Product object or null
     */
    static getProductFromDOM(productId) {
        // First try to get from productsData
        const product = Product.getProductById(productId);
        if (product) return product;

        // Fallback to DOM if product not found in data
        const productCard = document.querySelector(`[data-id="${productId}"]`);
        
        if (!productCard) return null;
        
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseFloat(productCard.getAttribute('data-price'));
        const productCategory = productCard.getAttribute('data-category');
        const productImage = productCard.querySelector('img').src;
        const productDescription = productCard.querySelector('p').textContent;
        
        return new Product(
            productId,
            productName,
            productPrice,
            productCategory,
            productImage,
            productDescription
        );
    }

    /**
     * Render product card HTML
     * @returns {string} HTML string for product card
     */
    renderProductCard() {
        const nameSlug = this.name.toLowerCase().replace(/\s+/g, '');
        const isLowStock = this.stock <= 5;
        const isOutOfStock = this.stock === 0;
        
        return `
            <div class="product-card" data-name="${nameSlug}" data-category="${this.category}" data-price="${this.price}" data-id="${this.id}" data-stock="${this.stock}">
                <div class="product-image">
                    <img src="${this.image}" alt="${this.name}">
                    ${isOutOfStock ? '<span class="stock-badge out-of-stock">Out of Stock</span>' : ''}
                    ${isLowStock && !isOutOfStock ? `<span class="stock-badge low-stock">Low Stock (${this.stock} left)</span>` : ''}
                </div>
                <div class="product-info">
                    <h3>${this.name}</h3>
                    <p>${this.description}</p>
                    <div class="price-category">
                        <span class="price">$${this.price.toFixed(2)}</span>
                        <span class="product-category">${this.category}</span>
                    </div>
                    <button class="add-to-cart-btn" onclick="addToCart('${this.id}')" ${isOutOfStock ? 'disabled' : ''}>
                        <i class="fas fa-shopping-cart"></i> ${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Render cart item to HTML
     * @returns {string} HTML string for cart item
     */
    renderCartItem(quantity) {
        return `
            <div class="cart-item" data-id="${this.id}">
                <div class="cart-item-image">
                    <img src="${this.image}" alt="${this.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${this.name}</h4>
                    <p class="cart-item-price">$${this.price.toFixed(2)}</p>
                    <div class="cart-item-controls">
                        <button class="quantity-btn decrease" onclick="cart.updateQuantity('${this.id}', -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">${quantity}</span>
                        <button class="quantity-btn increase" onclick="cart.updateQuantity('${this.id}', 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-item-btn" onclick="cart.removeItem('${this.id}')" title="Remove item">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                    <p class="cart-item-total">$${(this.price * quantity).toFixed(2)}</p>
                </div>
            </div>
        `;
    }

    /**
     * Render order summary item
     * @param {number} quantity - Item quantity
     * @returns {string} HTML string for order summary item
     */
    renderOrderSummary(quantity) {
        return `
            <div class="order-item" data-id="${this.id}">
                <div class="order-item-image">
                    <img src="${this.image}" alt="${this.name}">
                </div>
                <div class="order-item-details">
                    <h4>${this.name}</h4>
                    <p>Quantity: ${quantity}</p>
                    <p class="order-item-total">$${(this.price * quantity).toFixed(2)}</p>
                </div>
            </div>
        `;
    }
}

/**
 * Render all products to the products grid
 * @param {Array} products - Array of Product objects to render
 */
function renderProducts(products) {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;

    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-results-message" style="grid-column: 1 / -1;">
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }

    productsGrid.innerHTML = products.map(product => product.renderProductCard()).join('');
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Product;
}

