/*
    Web3 Freelance Developer Portfolio - Interaction Logic
    Author: Antigravity
    Technology: Vanilla JavaScript (ES6+)
*/

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.classList.add(savedTheme === 'dark' ? 'navbar-dark' : 'navbar-light');
    }
    updateThemeIcon(savedTheme);


    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        const navbar = document.querySelector('.navbar');
        if (theme === 'dark') {
            icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
            if (navbar) {
                navbar.classList.add('navbar-dark');
                navbar.classList.remove('navbar-light');
            }
        } else {
            icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
            if (navbar) {
                navbar.classList.add('navbar-light');
                navbar.classList.remove('navbar-dark');
            }
        }
    }


    // RTL Toggle
    const rtlToggle = document.getElementById('rtl-toggle');
    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const currentDir = htmlElement.getAttribute('dir') || 'ltr';
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
            htmlElement.setAttribute('dir', newDir);
            localStorage.setItem('dir', newDir);
            updateRTLLabel(newDir);
        });
    }

    function updateRTLLabel(dir) {
        if (!rtlToggle) return;
        rtlToggle.innerText = dir === 'ltr' ? 'RTL' : 'LTR';
    }

    // Load saved direction
    const savedDir = localStorage.getItem('dir') || 'ltr';
    htmlElement.setAttribute('dir', savedDir);
    updateRTLLabel(savedDir);

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-left');
    animateElements.forEach(el => observer.observe(el));

    // Smooth Scrolling for Nav Links & Back to Top
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Project Modal Logic (Bootstrap 5 already handles data-bs-toggle="modal")
    // We can add custom data population for dynamic modals if needed
    const projectModals = document.querySelectorAll('.project-card-link');
    projectModals.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.dataset.title;
            const desc = this.dataset.description;
            const tech = this.dataset.tech;
            
            const modalTitle = document.getElementById('projectModalLabel');
            const modalBody = document.querySelector('#projectModal .modal-body');
            
            if(modalTitle && modalBody) {
                modalTitle.innerText = title;
                modalBody.innerHTML = `
                    <p>${desc}</p>
                    <hr>
                    <h6>Tech Stack:</h6>
                    <p class="text-info">${tech}</p>
                `;
            }
        });
    });

    // Password Visibility Toggle
    const togglePasswords = document.querySelectorAll('.password-toggle');
    togglePasswords.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
            } else {
                input.type = 'password';
                icon.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
            }
        });
    });
});
