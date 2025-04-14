document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.createElement('div');
  mobileMenu.classList.add('mobile-menu');
  mobileMenu.innerHTML = `
    <nav class="mobile-nav">
      <a href="#recursos" class="mobile-nav-link">Recursos</a>
      <a href="#beneficios" class="mobile-nav-link">Benefícios</a>
      <a href="#precos" class="mobile-nav-link">Preços</a>
      <a href="#sobre" class="mobile-nav-link">Sobre</a>
      <a href="#demo" class="mobile-nav-link">Solicitar Demo</a>
    </nav>
  `;
  document.querySelector('.header').appendChild(mobileMenu);

  mobileMenuToggle.addEventListener('click', function() {
    const expanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !expanded);
    
    if (!expanded) {
      mobileMenu.style.display = 'block';
      setTimeout(() => {
        mobileMenu.classList.add('mobile-menu-active');
      }, 10);
    } else {
      mobileMenu.classList.remove('mobile-menu-active');
      setTimeout(() => {
        mobileMenu.style.display = 'none';
      }, 300);
    }

    // Toggle hamburger animation
    this.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('mobile-menu-active');
      setTimeout(() => {
        mobileMenu.style.display = 'none';
      }, 300);
      mobileMenuToggle.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Testimonial slider
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.dot');
  const prevButton = document.querySelector('.testimonial-prev');
  const nextButton = document.querySelector('.testimonial-next');
  let currentIndex = 0;

  function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonialCards[index].classList.add('active');
    dots[index].classList.add('active');
    currentIndex = index;
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showTestimonial(index);
    });
  });

  prevButton.addEventListener('click', () => {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) newIndex = testimonialCards.length - 1;
    showTestimonial(newIndex);
  });

  nextButton.addEventListener('click', () => {
    let newIndex = currentIndex + 1;
    if (newIndex >= testimonialCards.length) newIndex = 0;
    showTestimonial(newIndex);
  });

  // Auto-rotate testimonials
  let testimonialInterval = setInterval(() => {
    let newIndex = currentIndex + 1;
    if (newIndex >= testimonialCards.length) newIndex = 0;
    showTestimonial(newIndex);
  }, 5000);

  // Pause auto-rotation when hovering over testimonials
  const testimonialSlider = document.querySelector('.testimonials-slider');
  testimonialSlider.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
  });

  testimonialSlider.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(() => {
      let newIndex = currentIndex + 1;
      if (newIndex >= testimonialCards.length) newIndex = 0;
      showTestimonial(newIndex);
    }, 5000);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add shadow to header on scroll
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  // Add CSS for mobile menu and scroll effects
  const style = document.createElement('style');
  style.textContent = `
    .mobile-menu {
      display: none;
      position: fixed;
      top: 4rem;
      left: 0;
      right: 0;
      background-color: white;
      border-bottom: 1px solid var(--border);
      padding: 1rem;
      transform: translateY(-100%);
      transition: transform 0.3s ease;
      z-index: 30;
      box-shadow: var(--shadow);
    }
    
    .mobile-menu-active {
      transform: translateY(0);
    }
    
    .mobile-nav {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .mobile-nav-link {
      font-size: 1rem;
      font-weight: 500;
      padding: 0.5rem 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
      opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }
    
    .header-scrolled {
      box-shadow: var(--shadow-md);
    }
  `;
  document.head.appendChild(style);

  // Animate elements on scroll
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.module-card, .benefit-item, .pricing-card');
    
    elements.forEach(element => {
      // Add initial styles
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      
      // Create observer
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, 100);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(element);
    });
  };
  
  // Run animations
  animateOnScroll();
});