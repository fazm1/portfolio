// Theme Management
function initTheme() {
    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    const html = document.documentElement;
    
    if (savedTheme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        updateLogo('dark');
    } else {
        html.removeAttribute('data-theme');
        updateLogo('light');
    }
}

function updateLogo(theme) {
    const logos = document.querySelectorAll('.logo img');
    logos.forEach(logo => {
        const currentSrc = logo.getAttribute('src');
        if (theme === 'dark') {
            // Switch to 2.png for dark mode
            if (currentSrc.includes('1.png')) {
                logo.setAttribute('src', currentSrc.replace('1.png', '2.png'));
            }
        } else {
            // Switch to 1.png for light mode
            if (currentSrc.includes('2.png')) {
                logo.setAttribute('src', currentSrc.replace('2.png', '1.png'));
            }
        }
    });
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        updateLogo('light');
    } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateLogo('dark');
    }
}

function updateLogo(theme) {
    const logos = document.querySelectorAll('.logo img');
    logos.forEach(logo => {
        const currentSrc = logo.getAttribute('src');
        if (theme === 'dark') {
            // Switch to 2.png for dark mode
            if (currentSrc.includes('1.png')) {
                logo.setAttribute('src', currentSrc.replace('1.png', '2.png'));
            }
        } else {
            // Switch to 1.png for light mode
            if (currentSrc.includes('2.png')) {
                logo.setAttribute('src', currentSrc.replace('2.png', '1.png'));
            }
        }
    });
}

// Initialize theme on page load (before DOMContentLoaded to prevent flash)
initTheme();

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Set up theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Set active state for current page
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        // Normalize current page name
        let normalizedCurrent = currentPage.toLowerCase();
        if (normalizedCurrent === '' || normalizedCurrent === 'index.html' || normalizedCurrent.endsWith('/')) {
            normalizedCurrent = 'index.html';
        }
        
        const navLinks = document.querySelectorAll('.navbar ul li a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkPath = link.getAttribute('href');
            const linkPage = linkPath.split('/').pop().toLowerCase();
            
            // Normalize link page name
            let normalizedLink = linkPage;
            if (normalizedLink === '' || normalizedLink === 'index.html') {
                normalizedLink = 'index.html';
            }
            
            // Check if current page matches the link
            if (normalizedCurrent === normalizedLink) {
                link.classList.add('active');
            }
        });
    }
    
    setActiveNavLink();
    
    const navbar = document.querySelector('.navbar');
    const nav = navbar ? (navbar.querySelector('nav') || navbar.querySelector('ul')) : null;
    
    // Create hamburger menu button for mobile if it doesn't exist
    let hamburger = document.querySelector('.hamburger');
    
    if (!hamburger && nav) {
        hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.setAttribute('aria-label', 'Toggle menu');
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        
        // Insert hamburger after logo or at the end of navbar
        const logo = navbar.querySelector('.logo');
        if (logo && logo.nextSibling) {
            navbar.insertBefore(hamburger, logo.nextSibling);
        } else {
            navbar.appendChild(hamburger);
        }
    }
    
    // Toggle menu function
    function toggleMenu() {
        if (hamburger && nav) {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        }
    }
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }
    
    // Handle window resize
    function handleResize() {
        if (window.innerWidth > 768 && nav) {
            nav.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        }
    }
    
    window.addEventListener('resize', handleResize);

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const hamburger = document.querySelector('.hamburger');
        const nav = document.querySelector('.navbar nav') || document.querySelector('.navbar ul');
        
        if (hamburger && nav && window.innerWidth <= 768) {
            if (!hamburger.contains(event.target) && !nav.contains(event.target)) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            }
        }
    });

    // Smooth scroll for anchor links
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

    // Add fade-in animation on scroll
    // const observerOptions = {
    //     threshold: 0.1,
    //     rootMargin: '0px 0px -50px 0px'
    // };

    // const observer = new IntersectionObserver(function(entries) {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             entry.target.style.opacity = '1';
    //             entry.target.style.transform = 'translateY(0)';
    //         }
    //     });
    // }, observerOptions);

    // Observe all project cards and sections
    // document.querySelectorAll('.project, .Card section').forEach(el => {
    //     el.style.opacity = '0';
    //     el.style.transform = 'translateY(20px)';
    //     el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    //     observer.observe(el);
    // });
});
