// Cozy Corner Cafe - JavaScript Functionality
// Agent 1: Full-Stack Developer - Interactive features and form handling

import { isValidEmail, validateInput } from './utils.js';
import { showNotification } from './ui.js';

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    mobileMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const bars = mobileMenu.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            bar.style.transform = navMenu.classList.contains('active') 
                ? `rotate(${index === 0 ? '45deg' : index === 1 ? '0deg' : '-45deg'}) translate(${index === 1 ? '0' : index === 0 ? '6px, 6px' : '-6px, 6px'})`
                : 'none';
            bar.style.opacity = navMenu.classList.contains('active') && index === 1 ? '0' : '1';
        });
    });

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                const bars = mobileMenu.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });
    });

    // Navbar Background on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(139, 69, 19, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(139, 69, 19, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Menu Filtering System
    const menuFilters = document.querySelectorAll('.menu-filter');
    const menuItems = document.querySelectorAll('.menu-item');

    menuFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            menuFilters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.classList.remove('hidden');
                    item.style.display = 'block';
                    // Animate in
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    // Hide after animation
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        // Simulate form submission
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });

    // Form Input Validation
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });

        input.addEventListener('input', function() {
            // Remove error styling on input
            this.style.borderColor = '';
            const errorMsg = this.parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        });
    });

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Menu Item Hover Effects
    const menuItemsHover = document.querySelectorAll('.menu-item');
    menuItemsHover.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && scrolled < hero.offsetHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Loading Animation
    window.addEventListener('load', function() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const ctaButton = document.querySelector('.cta-button');

        // Trigger animations
        setTimeout(() => {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 300);

        setTimeout(() => {
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 600);

        setTimeout(() => {
            ctaButton.style.opacity = '1';
            ctaButton.style.transform = 'translateY(0)';
        }, 900);
    });
});

// Utility Functions







// Performance Optimization
// Debounce function for scroll events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const navbar = document.getElementById('navbar');
    
    if (scrolled > 50) {
        navbar.style.background = 'rgba(139, 69, 19, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(139, 69, 19, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);