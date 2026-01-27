document.addEventListener('DOMContentLoaded', function() {

    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    

    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    

    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 30px var(--shadow)';
        } else {
            navbar.style.boxShadow = '0 4px 20px var(--shadow)';
        }
    });
    

    document.querySelectorAll('.project-card').forEach(card => {
        const images = card.querySelectorAll('.project-img');
        const dots = card.querySelectorAll('.dot');
        const prevBtn = card.querySelector('.prev');
        const nextBtn = card.querySelector('.next');
        
        let currentIndex = 0;
        let carouselInterval;
        
        function showImage(index) {
            images.forEach(img => img.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            images[index].classList.add('active');
            dots[index].classList.add('active');
            
            currentIndex = index;
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                let nextIndex = (currentIndex + 1) % images.length;
                showImage(nextIndex);
                resetCarousel();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                let prevIndex = (currentIndex - 1 + images.length) % images.length;
                showImage(prevIndex);
                resetCarousel();
            });
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showImage(index);
                resetCarousel();
            });
        });
        
        function startCarousel() {
            carouselInterval = setInterval(() => {
                let nextIndex = (currentIndex + 1) % images.length;
                showImage(nextIndex);
            }, 5000);
        }
        
        function stopCarousel() {
            clearInterval(carouselInterval);
        }
        
        function resetCarousel() {
            stopCarousel();
            startCarousel();
        }
        
        startCarousel();
        
        card.addEventListener('mouseenter', stopCarousel);
        card.addEventListener('mouseleave', startCarousel);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 80;
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
            submitBtn.style.background = '#10b981';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
            
            alert(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you at ${email} soon.`);
            
            this.reset();
        });
    }
    

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }
        });
        
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                
                if (entry.target.classList.contains('skill-card')) {
                    const progressBar = entry.target.querySelector('.progress-bar');
                    if (progressBar) {
                        const progress = progressBar.getAttribute('data-progress');
                        setTimeout(() => {
                            progressBar.style.width = progress + '%';
                        }, 200);
                    }
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });

    function animateCounter(element, target, duration = 2000) {
        let current = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    

    document.querySelectorAll('.project-img').forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.95);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                cursor: pointer;
                animation: fadeIn 0.3s ease;
            `;
            
            const modalImg = document.createElement('img');
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            modalImg.style.cssText = `
                max-width: 95%;
                max-height: 95%;
                object-fit: contain;
                border-radius: 10px;
                box-shadow: 0 25px 100px rgba(0,0,0,0.5);
            `;
            
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            closeBtn.style.cssText = `
                position: absolute;
                top: 30px;
                right: 30px;
                background: white;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                font-size: 1.5rem;
                cursor: pointer;
                color: #333;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            closeBtn.addEventListener('mouseenter', () => {
                closeBtn.style.transform = 'scale(1.1) rotate(90deg)';
                closeBtn.style.background = '#f44336';
                closeBtn.style.color = 'white';
            });
            
            closeBtn.addEventListener('mouseleave', () => {
                closeBtn.style.transform = 'scale(1) rotate(0deg)';
                closeBtn.style.background = 'white';
                closeBtn.style.color = '#333';
            });
            
            modal.appendChild(modalImg);
            modal.appendChild(closeBtn);
            document.body.appendChild(modal);
            
            
            document.body.style.overflow = 'hidden';
            
            const closeModal = () => {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.body.style.overflow = '';
                }, 300);
            };
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
            
            closeBtn.addEventListener('click', closeModal);
            
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', handleEscape);
                }
            };
            document.addEventListener('keydown', handleEscape);
        });
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    

    const formInputs = document.querySelectorAll('form input, form textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--accent)';
            this.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = 'var(--border)';
            this.style.transform = 'translateY(0)';
            
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.style.borderColor = '#ff6b6b';
            } else if (this.type === 'email' && this.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.value)) {
                    this.style.borderColor = '#ff6b6b';
                } else {
                    this.style.borderColor = '#10b981';
                }
            } else if (this.value.trim() !== '') {
                this.style.borderColor = '#10b981';
            }
        });
        
        if (input.type === 'email') {
            input.addEventListener('input', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && emailRegex.test(this.value)) {
                    this.style.borderColor = '#10b981';
                } else if (this.value) {
                    this.style.borderColor = '#ff6b6b';
                }
            });
        }
    });

    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        let particlesArray = [];
        const numberOfParticles = 80;
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width || this.x < 0) {
                    this.speedX = -this.speedX;
                }
                
                if (this.y > canvas.height || this.y < 0) {
                    this.speedY = -this.speedY;
                }
            }
            
            draw() {
                const theme = document.documentElement.getAttribute('data-theme');
                const color = theme === 'dark' ? '111, 134, 255' : '79, 109, 245';
                
                ctx.fillStyle = `rgba(${color}, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        function init() {
            particlesArray = [];
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
                
                for (let j = i + 1; j < particlesArray.length; j++) {
                    const dx = particlesArray[i].x - particlesArray[j].x;
                    const dy = particlesArray[i].y - particlesArray[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 120) {
                        const theme = document.documentElement.getAttribute('data-theme');
                        const color = theme === 'dark' ? '111, 134, 255' : '79, 109, 245';
                        
                        ctx.strokeStyle = `rgba(${color}, ${0.2 - distance / 600})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        init();
        animate();
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });
    }
    

    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle && heroTitle.querySelector('.text-gradient')) {
        const textElement = heroTitle.querySelector('.text-gradient');
        const originalText = textElement.textContent;
        textElement.textContent = '';
        
        let charIndex = 0;
        function typeWriter() {
            if (charIndex < originalText.length) {
                textElement.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 50);
            }
        }
        
        setTimeout(typeWriter, 500);
    }
    
  
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero::before, .hero::after');
        
        parallaxElements.forEach((el, index) => {
            const speed = 0.5 + (index * 0.2);
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    

    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    

    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    

    console.log(
        '%c🚀 Welcome to Ridmi\'s Portfolio! %c\n' +
        '%cLooking for a Business Analyst? Let\'s connect! 💼\n' +
        '%cEmail: jayawardhanaridmi0125@gmail.com\n' +
        '%cLinkedIn: linkedin.com/in/ridmi-jayawardhana-6a9579274',
        'color: #4f6df5; font-size: 24px; font-weight: bold;',
        '',
        'color: #6f86ff; font-size: 14px;',
        'color: #4b5563; font-size: 12px;',
        'color: #4b5563; font-size: 12px;'
    );
});
