// auth.js - Mock authentication system

/**
 * Authentication Module - Handles user signup, login, and session management
 */

class Auth {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    /**
     * Initialize authentication - check for existing session
     */
    init() {
        const savedUser = Storage.load('currentUser');
        if (savedUser) {
            this.currentUser = savedUser;
            this.updateUI();
        }
    }

    /**
     * Sign up a new user
     * @param {string} name - User's name
     * @param {string} email - User's email
     * @param {string} password - User's password
     * @returns {boolean} Success status
     */
    signup(name, email, password) {
        if (!name || !email || !password) {
            return { success: false, message: 'All fields are required' };
        }

        if (password.length < 6) {
            return { success: false, message: 'Password must be at least 6 characters' };
        }

        // Check if user already exists
        const users = Storage.load('users') || [];
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email already registered' };
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: password, // In real app, this would be hashed
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        Storage.save('users', users);

        // Auto login after signup
        this.login(email, password);
        return { success: true, message: 'Account created successfully!' };
    }

    /**
     * Log in a user
     * @param {string} email - User's email
     * @param {string} password - User's password
     * @returns {boolean} Success status
     */
    login(email, password) {
        const users = Storage.load('users') || [];
        const user = users.find(u => u.email === email.trim().toLowerCase() && u.password === password);

        if (!user) {
            return { success: false, message: 'Invalid email or password' };
        }

        // Set current user (without password)
        this.currentUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        };

        Storage.save('currentUser', this.currentUser);
        this.updateUI();
        return { success: true, message: 'Login successful!' };
    }

    /**
     * Log out current user
     */
    logout() {
        this.currentUser = null;
        Storage.clear('currentUser');
        this.updateUI();
    }

    /**
     * Check if user is logged in
     * @returns {boolean} Login status
     */
    isLoggedIn() {
        return this.currentUser !== null;
    }

    /**
     * Get current user
     * @returns {Object|null} Current user object or null
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * Update UI based on auth state
     */
    updateUI() {
        const authButtons = document.getElementById('authButtons');
        const userInfo = document.getElementById('userInfo');
        const loginModal = document.getElementById('loginModal');
        const signupModal = document.getElementById('signupModal');

        if (this.isLoggedIn()) {
            // Show user info, hide login buttons
            if (authButtons) authButtons.style.display = 'none';
            if (userInfo) {
                userInfo.style.display = 'flex';
                const userName = userInfo.querySelector('.user-name');
                if (userName) userName.textContent = this.currentUser.name;
            }
            // Close modals
            if (loginModal) loginModal.classList.remove('active');
            if (signupModal) signupModal.classList.remove('active');
        } else {
            // Show login buttons, hide user info
            if (authButtons) authButtons.style.display = 'flex';
            if (userInfo) userInfo.style.display = 'none';
        }
    }

    /**
     * Show login modal
     */
    showLoginModal() {
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    /**
     * Show signup modal
     */
    showSignupModal() {
        const signupModal = document.getElementById('signupModal');
        if (signupModal) {
            signupModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    /**
     * Close auth modals
     */
    closeAuthModals() {
        const loginModal = document.getElementById('loginModal');
        const signupModal = document.getElementById('signupModal');
        
        if (loginModal) loginModal.classList.remove('active');
        if (signupModal) signupModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Create global auth instance
const auth = new Auth();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Auth;
}

