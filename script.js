// Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        const themeIcon = themeToggle.querySelector('i');

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'light';
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
        }

        // Mobile Menu Toggle
        const mobileMenu = document.getElementById('mobileMenu');
        const navLinks = document.querySelector('.nav-links');

        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            const isOpen = navLinks.classList.contains('active');
            icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
            mobileMenu.setAttribute('aria-label', isOpen ? 'Close mobile navigation menu' : 'Open mobile navigation menu');
            mobileMenu.setAttribute('aria-expanded', isOpen);
        });

        // Smooth Scrolling
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
                
                // Close mobile menu when nav link is clicked
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const mobileMenuIcon = mobileMenu.querySelector('i');
                    mobileMenuIcon.className = 'fas fa-bars';
                    mobileMenu.setAttribute('aria-label', 'Open mobile navigation menu');
                    mobileMenu.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Active Navigation Link
        const navLinksArray = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinksArray.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Typewriter Effect
        const typewriter = document.getElementById('typewriter');
        const texts = ['UI Designer', 'Problem Solver', 'Code Enthusiast', 'Creative Thinker'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typewriter.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriter.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            const speed = isDeleting ? 50 : 100;
            setTimeout(typeEffect, speed);
        }

        typeEffect();

        // Intersection Observer for Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe all elements with fade-in class
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Form Submission
        const contactForm = document.querySelector('.contact-form');
        const successModal = document.getElementById('successModal');
        const closeModalBtn = document.getElementById('closeModal');
        const modalName = document.getElementById('modalName');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Show success modal
            modalName.textContent = name;
            showModal();
            
            // Reset form
            contactForm.reset();
        });

        function showModal() {
            successModal.classList.add('show');
            successModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            closeModalBtn.focus();
        }

        function hideModal() {
            successModal.classList.remove('show');
            setTimeout(() => {
                successModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }

        // Close modal events
        closeModalBtn.addEventListener('click', hideModal);

        // Close modal when clicking outside
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                hideModal();
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && successModal.classList.contains('show')) {
                hideModal();
            }
        });

        // Parallax Effect for Hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero-content');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        });

        // Add hover effects to project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Update footer year automatically
        function updateFooterYear() {
            const currentYear = new Date().getFullYear();
            const yearElement = document.getElementById('currentYear');
            if (yearElement) {
                yearElement.textContent = currentYear;
            }
        }

        // Update year on page load
        updateFooterYear();

        // Hero button functionality
        const viewWorkBtn = document.getElementById('viewWorkBtn');
        const downloadCvBtn = document.getElementById('downloadCvBtn');

        // View My Work button - scroll to projects section
        viewWorkBtn.addEventListener('click', () => {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });

        // Download CV button - you can replace this URL with your actual CV
        downloadCvBtn.addEventListener('click', () => {
            // Option 1: Direct download (replace with your CV URL)
            window.open('./cv.pdf', '_blank');
        });
