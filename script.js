// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Validation
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Name validation function
function validateName(name) {
    if (name.trim().length < 2) {
        return 'Name must be at least 2 characters long';
    }
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
        return 'Name can only contain letters and spaces';
    }
    return '';
}

// Email validation function
function validateEmail(email) {
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
}

// Message validation function
function validateMessage(message) {
    if (message.trim().length < 10) {
        return 'Message must be at least 10 characters long';
    }
    return '';
}

// Real-time validation
nameInput.addEventListener('blur', () => {
    const error = validateName(nameInput.value);
    nameError.textContent = error;
    if (error) {
        nameInput.style.borderColor = '#E74C3C';
    } else {
        nameInput.style.borderColor = '#2E8B57';
    }
});

emailInput.addEventListener('blur', () => {
    const error = validateEmail(emailInput.value);
    emailError.textContent = error;
    if (error) {
        emailInput.style.borderColor = '#E74C3C';
    } else {
        emailInput.style.borderColor = '#2E8B57';
    }
});

messageInput.addEventListener('blur', () => {
    const error = validateMessage(messageInput.value);
    messageError.textContent = error;
    if (error) {
        messageInput.style.borderColor = '#E74C3C';
    } else {
        messageInput.style.borderColor = '#2E8B57';
    }
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous errors
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    
    // Reset border colors
    nameInput.style.borderColor = '#E0E0E0';
    emailInput.style.borderColor = '#E0E0E0';
    messageInput.style.borderColor = '#E0E0E0';
    
    // Validate all fields
    const nameValidation = validateName(nameInput.value);
    const emailValidation = validateEmail(emailInput.value);
    const messageValidation = validateMessage(messageInput.value);
    
    let hasErrors = false;
    
    if (nameValidation) {
        nameError.textContent = nameValidation;
        nameInput.style.borderColor = '#E74C3C';
        hasErrors = true;
    }
    
    if (emailValidation) {
        emailError.textContent = emailValidation;
        emailInput.style.borderColor = '#E74C3C';
        hasErrors = true;
    }
    
    if (messageValidation) {
        messageError.textContent = messageValidation;
        messageInput.style.borderColor = '#E74C3C';
        hasErrors = true;
    }
    
    if (!hasErrors) {
        // Show success message
        showSuccessMessage();
        // Reset form
        contactForm.reset();
    }
});

// Success message function
function showSuccessMessage() {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Message Sent!';
    submitButton.style.background = '#27AE60';
    
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.style.background = '';
    }, 3000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.product-card, .feature, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Remove any unwanted click effects on product cards
// Only the Add to Cart button should be clickable

// Loading animation for page
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Product Search and Filter Functionality
let allProducts = [];

function filterProducts() {
    const searchInput = document.getElementById('productSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    
    if (!searchInput || !categoryFilter || !priceFilter) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    const selectedPrice = priceFilter.value;

    // Filter products based on criteria
    const filteredProducts = allProducts.filter(product => {
        const productName = product.name.toLowerCase();
        const matchesSearch = !searchTerm || productName.includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesPrice = selectedPrice === 'all' || product.price <= parseFloat(selectedPrice);
        
        return matchesSearch && matchesCategory && matchesPrice;
    });

    // Render filtered products
    renderProducts(filteredProducts);
}

function initProductFilters() {
    const searchInput = document.getElementById('productSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const clearFilters = document.getElementById('clearFilters');

    if (!searchInput || !categoryFilter || !priceFilter || !clearFilters) return;

    // Event listeners
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    priceFilter.addEventListener('change', filterProducts);

    // Clear filters
    clearFilters.addEventListener('click', () => {
        searchInput.value = '';
        categoryFilter.value = 'all';
        priceFilter.value = 'all';
        filterProducts();
    });
}

// Load products and initialize page
async function initProducts() {
    try {
        // Load products from JSON
        allProducts = await Product.loadProducts();
        
        if (allProducts.length === 0) {
            const productsGrid = document.querySelector('.products-grid');
            if (productsGrid) {
                productsGrid.innerHTML = `
                    <div class="no-results-message" style="grid-column: 1 / -1;">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h3>Failed to load products</h3>
                        <p>Please refresh the page or check your connection</p>
                    </div>
                `;
            }
            return;
        }

        // Render all products initially
        renderProducts(allProducts);
        
        // Initialize filters
        initProductFilters();
    } catch (error) {
        console.error('Error initializing products:', error);
        const productsGrid = document.querySelector('.products-grid');
        if (productsGrid) {
            productsGrid.innerHTML = `
                <div class="no-results-message" style="grid-column: 1 / -1;">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h3>Error loading products</h3>
                    <p>${error.message}</p>
                </div>
            `;
        }
    }
}

// Initialize products when page loads
document.addEventListener('DOMContentLoaded', () => {
    initProducts();
});

// Cart functionality - now using modular cart.js
// This function is called from HTML onclick handlers
// Adds 1 item to cart - quantity can be changed in cart modal
function addToCart(productId) {
    const product = Product.getProductById(productId);
    
    if (!product) {
        cart.showNotification('Product not found');
        return;
    }
    
    // Check stock availability
    if (product.stock !== undefined && product.stock === 0) {
        cart.showNotification('This product is out of stock');
        return;
    }
    
    cart.addItem(productId, 1);
    cart.openCartModal(); // Open cart modal when adding item
}