document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.createElement('div');
  mobileMenu.classList.add('mobile-menu');
  mobileMenu.innerHTML = `
    <nav class="mobile-nav">
      <a href="#funcionalidades" class="mobile-nav-link">Funcionalidades</a>
      <a href="#depoimentos" class="mobile-nav-link">Depoimentos</a>
      <a href="#planos" class="mobile-nav-link">Planos</a>
      <a href="#contato" class="mobile-nav-link">Contato</a>
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
      setTimeout(() => {  function() {
      mobileMenu.classList.remove('mobile-menu-active');
      setTimeout(() => {
        mobileMenu.style.display = 'none';
      }, 300);
      mobileMenuToggle.classList.remove('active');
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
    });
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
      background-color: var(--background);
      border-bottom: 1px solid var(--border);
      padding: 1rem;
      transform: translateY(-100%);
      transition: transform 0.3s ease;
      z-index: 30;
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
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  `;
  document.head.appendChild(style);

  // Add animation to features cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
  });

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
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  featureCards.forEach(card => {
    observer.observe(card);
  });

  // Also animate testimonial cards
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  testimonialCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });

  // And pricing cards
  const pricingCards = document.querySelectorAll('.pricing-card');
  pricingCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
});