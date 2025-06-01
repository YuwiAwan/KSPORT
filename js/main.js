// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Product Carousel
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtns = document.querySelectorAll('.prev-btn');
  const nextBtns = document.querySelectorAll('.next-btn');
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Handle wrapping around the carousel
    if (index >= slides.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = slides.length - 1;
    } else {
      currentSlide = index;
    }
    
    slides[currentSlide].classList.add('active');
  }

  // Set up event listeners for carousel navigation
  prevBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showSlide(currentSlide - 1);
    });
  });

  nextBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showSlide(currentSlide + 1);
    });
  });

  // Auto slide change (optional)
  let autoSlide = setInterval(() => {
    showSlide(currentSlide + 1);
  }, 5000);

  // Pause auto slide on hover
  const carousel = document.querySelector('.product-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoSlide);
    });
    
    carousel.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => {
        showSlide(currentSlide + 1);
      }, 5000);
    });
  }

  // Add smooth scrolling for navigation
  const navLinks2 = document.querySelectorAll('.nav-link');
  
  navLinks2.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        if (targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 100,
              behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
              hamburger.classList.remove('active');
              navLinks.classList.remove('active');
            }
          }
        }
      }
    });
  });

  // Add animation on scroll
  const animateOnScroll = () => {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        section.classList.add('fade-in');
      }
    });
  };

  // Add fade-in class to CSS
  const style = document.createElement('style');
  style.innerHTML = `
    section {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    section.fade-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    .hero {
      opacity: 1;
      transform: none;
    }
  `;
  document.head.appendChild(style);

  // Initial check for animations
  animateOnScroll();
  
  // Check for animations on scroll
  window.addEventListener('scroll', animateOnScroll);
});