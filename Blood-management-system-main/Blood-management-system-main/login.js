// Login functionality for Healthcare Blood Bank

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'index.html';
        return;
    }

    setupLoginForm();
    setupPasswordToggle();
});

// Setup login form
function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
        
        // Also add a click listener to the submit button as backup
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent form submission
                
                // Get form data directly
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                
                // Handle login directly
                if (username === '123' && password === '123') {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('username', username);
                    
                    // alert('Login successful! Redirecting to main application...');
                    window.location.href = 'index.html';
                } else {
                    // alert('Invalid username or password. Please try again.');
                    document.getElementById('password').value = '';
                    document.getElementById('password').focus();
                }
            });
        }
        

        
    }
}

// Setup password toggle
function setupPasswordToggle() {
    const toggleBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.className = type === 'password' ? 'fas fa-eye' : 'fas fa-eye-slash';
            }
        });
    }
}

// Handle login submission
function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
    // Simple authentication (in real app, this would be server-side)
    if (username === '123' && password === '123') {
        // Login successful
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        
        // Show immediate success message
        // alert('Login successful! Redirecting to main application...');
        
        // Redirect immediately without delay
        window.location.href = 'index.html';
        
    } else {
        // Login failed - show immediate error
        // alert('Invalid username or password. Please try again.');
        
        // Clear password field
        document.getElementById('password').value = '';
        document.getElementById('password').focus();
    }
}

// Show notification
function showNotification(message, type = 'error') {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    
    if (notification && notificationMessage) {
        // Set message and type
        notificationMessage.textContent = message;
        
        // Update notification style based on type
        if (type === 'success') {
            notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 z-50';
        } else {
            notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 z-50';
        }
        
        // Show notification
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Hide notification after 5 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
        }, 5000);
    }
}



// Add some visual feedback for form interactions
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('ring-2', 'ring-red-500');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('ring-2', 'ring-red-500');
        });
    });
    
    // Add loading state to submit button
    const submitBtn = document.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Signing In...';
            this.disabled = true;
            
            // Re-enable after a delay (in case of validation errors)
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-sign-in-alt mr-2"></i>Sign In';
                this.disabled = false;
            }, 3000);
        });
    }
});

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        const submitBtn = document.querySelector('button[type="submit"]');
        if (submitBtn && !submitBtn.disabled) {
            submitBtn.click();
        }
    }
});

// Add some animations
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('login-form');
    if (form) {
        form.style.opacity = '0';
        form.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            form.style.transition = 'all 0.6s ease-out';
            form.style.opacity = '1';
            form.style.transform = 'translateY(0)';
        }, 100);
    }
}); 