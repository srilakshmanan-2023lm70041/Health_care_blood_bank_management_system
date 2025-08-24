// Blood Management System JavaScript

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    
    // Initialize the application
    initApp();
});

// Sample patient data
const patients = [
    {
        id: 1,
        name: "Sarah Johnson",
        age: 28,
        bloodGroup: "O+",
        hospital: "City General Hospital",
        urgency: "critical",
        urgencyText: "Critical",
        condition: "Severe blood loss from accident",
        unitsNeeded: 3,
        contact: "+1 (555) 123-4567"
    },
    {
        id: 2,
        name: "Michael Chen",
        age: 45,
        bloodGroup: "A-",
        hospital: "Memorial Medical Center",
        urgency: "high",
        urgencyText: "High",
        condition: "Surgery scheduled for tomorrow",
        unitsNeeded: 2,
        contact: "+1 (555) 234-5678"
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        age: 32,
        bloodGroup: "B+",
        hospital: "St. Mary's Hospital",
        urgency: "medium",
        urgencyText: "Medium",
        condition: "Chemotherapy treatment",
        unitsNeeded: 1,
        contact: "+1 (555) 345-6789"
    },
    {
        id: 4,
        name: "David Thompson",
        age: 56,
        bloodGroup: "AB+",
        hospital: "Regional Medical Center",
        urgency: "high",
        urgencyText: "High",
        condition: "Heart surgery complications",
        unitsNeeded: 4,
        contact: "+1 (555) 456-7890"
    },
    {
        id: 5,
        name: "Lisa Wang",
        age: 29,
        bloodGroup: "O-",
        hospital: "University Hospital",
        urgency: "critical",
        urgencyText: "Critical",
        condition: "Emergency delivery complications",
        unitsNeeded: 2,
        contact: "+1 (555) 567-8901"
    },
    {
        id: 6,
        name: "Robert Davis",
        age: 38,
        bloodGroup: "A+",
        hospital: "Community Health Center",
        urgency: "low",
        urgencyText: "Low",
        condition: "Regular transfusion needed",
        unitsNeeded: 1,
        contact: "+1 (555) 678-9012"
    }
];

// Current patient for donation
let currentPatient = null;

// Initialize the application
function initApp() {
    // Check if user is logged in
    if (!checkAuth()) {
        return;
    }
    
    // Display user information
    displayUserInfo();
    
    renderPatients();
    setupEventListeners();
    setupSmoothScrolling();
}

// Display user information
function displayUserInfo() {
    const username = localStorage.getItem('username') || 'User';
    const userDisplay = document.getElementById('user-display');
    if (userDisplay) {
        userDisplay.textContent = username;
    }
}

// Check authentication
function checkAuth() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return false;
    }
    
    return true;
}

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    
    window.location.href = 'login.html';
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Donation form submission
    const donationForm = document.getElementById('donation-form');
    if (donationForm) {
        donationForm.addEventListener('submit', handleDonationSubmit);
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Close modal when clicking outside
    const modal = document.getElementById('donation-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeDonationModal();
            }
        });
        
        // Ensure close button works
        const closeBtn = modal.querySelector('button[onclick="closeDonationModal()"]');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeDonationModal);
        }
        
        // Ensure cancel button works
        const cancelBtn = modal.querySelector('button[onclick="closeDonationModal()"]');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', closeDonationModal);
        }
    }
}

// Setup smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
}

// Render patients in the donate section
function renderPatients() {
    const patientsGrid = document.getElementById('patients-grid');
    if (!patientsGrid) return;

    patientsGrid.innerHTML = patients.map(patient => `
        <div class="patient-card ${patient.urgency}" data-aos="fade-up" data-aos-delay="${patient.id * 100}">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-xl font-bold text-gray-800 mb-1">${patient.name}</h3>
                    <p class="text-gray-600">Age: ${patient.age} years</p>
                </div>
                <span class="blood-group ${getBloodGroupClass(patient.bloodGroup)}">${patient.bloodGroup}</span>
            </div>
            
            <div class="space-y-3 mb-6">
                <div class="flex items-center text-gray-700">
                    <i class="fas fa-hospital text-primary-500 mr-3 w-5"></i>
                    <span class="text-sm">${patient.hospital}</span>
                </div>
                <div class="flex items-start text-gray-700">
                    <i class="fas fa-info-circle text-primary-500 mr-3 w-5 mt-1"></i>
                    <span class="text-sm">${patient.condition}</span>
                </div>
                <div class="flex items-center text-gray-700">
                    <i class="fas fa-tint text-primary-500 mr-3 w-5"></i>
                    <span class="text-sm"><strong>${patient.unitsNeeded}</strong> units needed</span>
                </div>
                <div class="flex items-center text-gray-700">
                    <i class="fas fa-phone text-primary-500 mr-3 w-5"></i>
                    <span class="text-sm">${patient.contact}</span>
                </div>
            </div>
            
            <div class="flex justify-between items-center pt-4 border-t border-gray-100">
                <span class="urgency-${patient.urgency} text-sm">
                    <i class="fas fa-exclamation-triangle mr-1"></i>${patient.urgencyText} Priority
                </span>
                <button onclick="openDonationModal(${patient.id})" class="btn-primary text-sm px-4 py-2">
                    <i class="fas fa-heart mr-2"></i>Donate Now
                </button>
            </div>
        </div>
    `).join('');
}

// Get CSS class for blood group styling
function getBloodGroupClass(bloodGroup) {
    const group = bloodGroup.toLowerCase().replace('+', '-positive').replace('-', '-negative');
    return group;
}

// Open donation modal
function openDonationModal(patientId) {
    currentPatient = patients.find(p => p.id === patientId);
    const modal = document.getElementById('donation-modal');
    
    if (modal && currentPatient) {
        // Pre-fill blood group if it matches patient's need
        const bloodGroupSelect = document.getElementById('blood-group');
        if (bloodGroupSelect) {
            bloodGroupSelect.value = currentPatient.bloodGroup;
        }
        
        modal.classList.remove('hidden');
        modal.classList.add('modal-enter');
        
        // Add patient info to modal
        const modalTitle = modal.querySelector('h3');
        if (modalTitle) {
            modalTitle.innerHTML = `Donation Form - ${currentPatient.name}`;
        }
    }
}

// Close donation modal
function closeDonationModal() {
    console.log('Closing modal...'); // Debug log
    const modal = document.getElementById('donation-modal');
    if (modal) {
        // Remove all animation classes first
        modal.classList.remove('modal-enter', 'modal-exit');
        // Hide modal immediately
        modal.classList.add('hidden');
        currentPatient = null;
        
        // Reset form
        const form = document.getElementById('donation-form');
        if (form) {
            form.reset();
        }
        
        console.log('Modal closed successfully'); // Debug log
    } else {
        console.log('Modal element not found'); // Debug log
    }
}

// Handle donation form submission
function handleDonationSubmit(e) {
    e.preventDefault();
    
    if (!currentPatient) {
        showNotification('Error: No patient selected', 'error');
        return;
    }

    const formData = new FormData(e.target);
    const donationData = {
        donorName: formData.get('donorName'),
        donorEmail: formData.get('donorEmail'),
        donorPhone: formData.get('donorPhone'),
        bloodGroup: formData.get('bloodGroup'),
        donorMessage: formData.get('donorMessage'),
        patient: currentPatient
    };

    // Simulate email sending (in real app, this would use EmailJS or similar)
    simulateEmailSending(donationData);
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
    };

    // Simulate email sending
    simulateContactEmailSending(contactData);
}

// Simulate email sending for donation
function simulateEmailSending(donationData) {
    // Show loading state
    const submitBtn = document.querySelector('#donation-form button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    submitBtn.disabled = true;

    // Simulate API call delay
    setTimeout(() => {
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Show success message
        showNotification('Donation request sent successfully! We will contact you soon.', 'success');
        
        // Close modal
        closeDonationModal();
        
        // Log donation data (in real app, this would be sent to server)
        console.log('Donation Data:', donationData);
        
        // Email details for donation form
        const emailDetails = {
            subject: `Blood Donation Request - ${donationData.patient.name}`,
            to: 'admin@healthcarebloodbank.org',
            content: `
                New Blood Donation Request
                
                Patient Details:
                - Name: ${donationData.patient.name}
                - Hospital: ${donationData.patient.hospital}
                - Blood Group: ${donationData.patient.bloodGroup}
                - Urgency: ${donationData.patient.urgencyText}
                - Units Needed: ${donationData.patient.unitsNeeded}
                
                Donor Details:
                - Name: ${donationData.donorName}
                - Email: ${donationData.donorEmail}
                - Phone: ${donationData.donorPhone}
                - Blood Group: ${donationData.bloodGroup}
                - Message: ${donationData.donorMessage || 'No message provided'}
                
                Please contact the donor to arrange the donation.
            `
        };
        
        console.log('Email Details:', emailDetails);
        
        // Here you would integrate with EmailJS, SendGrid, or similar service
        // Example with EmailJS:
        /*
        emailjs.send('service_id', 'template_id', {
            to_email: emailDetails.to,
            subject: emailDetails.subject,
            message: emailDetails.content
        });
        */
        
    }, 2000);
}

// Simulate email sending for contact form
function simulateContactEmailSending(contactData) {
    const submitBtn = document.querySelector('#contact-form button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        showNotification('Message sent successfully! We will get back to you soon.', 'success');
        
        // Reset form
        document.getElementById('contact-form').reset();
        
        console.log('Contact Data:', contactData);
        
        // Email details for contact form
        const emailDetails = {
            subject: `Contact Form Message - ${contactData.name}`,
            to: 'admin@healthcarebloodbank.org',
            content: `
                New Contact Form Message
                
                From: ${contactData.name}
                Email: ${contactData.email}
                
                Message:
                ${contactData.message}
                
                Please respond to this inquiry as soon as possible.
            `
        };
        
        console.log('Contact Email Details:', emailDetails);
        
        // Here you would integrate with EmailJS, SendGrid, or similar service
        // Example with EmailJS:
        /*
        emailjs.send('service_id', 'template_id', {
            to_email: emailDetails.to,
            subject: emailDetails.subject,
            message: emailDetails.content
        });
        */
        
    }, 2000);
}

// Show notification toast
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification-toast');
    existingNotifications.forEach(n => n.remove());
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification-toast fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 z-50 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`;
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to statistics cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to patient cards
    const patientCards = document.querySelectorAll('.patient-card');
    patientCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on the donate button
            if (!e.target.closest('button')) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });

    // Add floating animation to hero elements
    const heroElements = document.querySelectorAll('#home h1, #home p, #home button');
    heroElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
        element.classList.add('floating');
    });
});

// Add window scroll effects
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('#home');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
    
    // Add scroll-based animations
    const elements = document.querySelectorAll('.patient-card, .stat-card');
    elements.forEach(element => {
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;
        const elementVisible = 150;
        
        if (scrolled > elementTop - window.innerHeight + elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeDonationModal();
    }
});

// Add click outside modal to close
document.addEventListener('click', function(e) {
    const modal = document.getElementById('donation-modal');
    if (modal && !modal.classList.contains('hidden') && e.target === modal) {
        closeDonationModal();
    }
});

// Add touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could be used for navigation
            console.log('Swipe up detected');
        } else {
            // Swipe down - could be used for navigation
            console.log('Swipe down detected');
        }
    }
}

// Add performance optimizations
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll handler
const optimizedScrollHandler = debounce(function() {
    // Scroll-based effects here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Add service worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
} 