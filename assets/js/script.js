document.addEventListener('DOMContentLoaded', function() {
  // ====================================================
  // Utility Functions
  // ====================================================
  const utils = {
    toggleClass: (element, className = 'active') => element.classList.toggle(className),
    addClass: (element, className = 'active') => element.classList.add(className),
    removeClass: (element, className = 'active') => element.classList.remove(className),
    
    // Disable page scrolling while preserving current scroll position
    disableScroll: function() {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-scroll-position', scrollY);
    },
    
    // Re-enable scrolling and restore the previous scroll position
    enableScroll: function() {
      const scrollY = parseInt(document.body.getAttribute('data-scroll-position') || '0', 10);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    }
  };

  // ====================================================
  // Navigation & Sidebar
  // ====================================================
  function initNavigation() {
    const navElements = {
      hamburger: document.querySelector('.hamburger a'),
      closeBtn: document.querySelector('.close-btn a'),
      sidebar: document.querySelector('.sidebar'),
      overlay: document.querySelector('.sidebar-overlay') || (() => {
        // Create overlay if not present
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
        return overlay;
      })(),
      dropdownToggles: document.querySelectorAll('.sidebar .dropdown-toggle')
    };

    // Toggle sidebar and overlay with scroll control
    function toggleSidebar(e) {
      if (e) e.preventDefault();
      [navElements.sidebar, navElements.overlay].forEach(el => el && el.classList.toggle('active'));
      if (navElements.sidebar.classList.contains('active')) {
        utils.disableScroll();
      } else {
        utils.enableScroll();
      }
    }

    if (navElements.hamburger) navElements.hamburger.addEventListener('click', toggleSidebar);
    if (navElements.closeBtn) navElements.closeBtn.addEventListener('click', toggleSidebar);
    if (navElements.overlay) navElements.overlay.addEventListener('click', toggleSidebar);

    // Toggle dropdown menus inside the sidebar
    navElements.dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('active');
        const dropdown = this.nextElementSibling;
        if (dropdown) dropdown.classList.toggle('show');
      });
    });

    // Desktop: Show/hide dropdowns on hover (for nav-links)
    if (window.innerWidth >= 993) {
      document.querySelectorAll('.nav-links .has-dropdown').forEach(item => {
        item.addEventListener('mouseenter', function() {
          const dropdown = this.querySelector('.dropdown');
          if (dropdown) dropdown.style.display = 'block';
        });
        item.addEventListener('mouseleave', function() {
          const dropdown = this.querySelector('.dropdown');
          if (dropdown) dropdown.style.display = '';
        });
      });
    }
  }

  // ====================================================
  // Main Carousel
  // ====================================================
  function initCarousel() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevArrow = document.querySelector('.prev');
    const nextArrow = document.querySelector('.next');
    const carousel = document.querySelector('.carousel');
    let currentSlide = 0;
    let intervalId;
    let touchStartX = 0;
    let touchEndX = 0;
    if (!carousel || slides.length === 0) return;

    function goToSlide(slideIndex) {
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      currentSlide = slideIndex;
      if (currentSlide >= slides.length) currentSlide = 0;
      if (currentSlide < 0) currentSlide = slides.length - 1;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    }

    function goToNextSlide() { goToSlide(currentSlide + 1); }
    function goToPrevSlide() { goToSlide(currentSlide - 1); }
    
    function startAutoSlide() { intervalId = setInterval(goToNextSlide, 5000); }
    function resetAutoSlide() {
      clearInterval(intervalId);
      startAutoSlide();
    }

    function handleTouchStart(e) { touchStartX = e.touches[0].clientX; }
    function handleTouchMove(e) { touchEndX = e.touches[0].clientX; }
    function handleTouchEnd() {
      const touchDiff = touchStartX - touchEndX;
      if (touchDiff > 50) { goToNextSlide(); resetAutoSlide(); }
      else if (touchDiff < -50) { goToPrevSlide(); resetAutoSlide(); }
      touchStartX = 0; touchEndX = 0;
    }

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => { goToSlide(index); resetAutoSlide(); });
    });
    if (prevArrow) prevArrow.addEventListener('click', () => { goToPrevSlide(); resetAutoSlide(); });
    if (nextArrow) nextArrow.addEventListener('click', () => { goToNextSlide(); resetAutoSlide(); });
    carousel.addEventListener('touchstart', handleTouchStart, false);
    carousel.addEventListener('touchmove', handleTouchMove, false);
    carousel.addEventListener('touchend', handleTouchEnd, false);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { goToPrevSlide(); resetAutoSlide(); }
      else if (e.key === 'ArrowRight') { goToNextSlide(); resetAutoSlide(); }
    });
    startAutoSlide();
  }

  // ====================================================
  // Testimonials Carousel
  // ====================================================
  function initTestimonialsCarousel() {
    const testimonialsCarousel = document.querySelector('.testimonials-carousel');
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const leftArrow = document.querySelector('.carousel-arrow-left');
    const rightArrow = document.querySelector('.carousel-arrow-right');
    const slides = document.querySelectorAll('.testimonial-slide');
    if (!testimonialsCarousel || !testimonialsTrack || slides.length === 0) return;

    const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(slides[0]).marginRight, 10);

    testimonialsCarousel.addEventListener('mouseenter', () => {
      testimonialsTrack.style.animationPlayState = 'paused';
    });
    testimonialsCarousel.addEventListener('mouseleave', () => {
      if (!testimonialsTrack.classList.contains('manual-scroll')) {
        testimonialsTrack.style.animationPlayState = 'running';
      }
    });

    function enableManualScrolling() {
      testimonialsTrack.style.animation = 'none';
      testimonialsTrack.classList.add('manual-scroll');
    }

    let currentIndex = 0;
    const totalSlides = slides.length;
    function scrollToSlide(index) {
      if (!testimonialsTrack.classList.contains('manual-scroll')) enableManualScrolling();
      if (index < 0) index = totalSlides - 1;
      if (index >= totalSlides) index = 0;
      currentIndex = index;
      const position = -slideWidth * currentIndex;
      testimonialsTrack.style.transition = 'transform 0.5s ease';
      testimonialsTrack.style.transform = `translateX(${position}px)`;
    }

    if (leftArrow) {
      leftArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        scrollToSlide(currentIndex - 1);
        resetToAutoScroll();
      });
    }
    if (rightArrow) {
      rightArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        scrollToSlide(currentIndex + 1);
        resetToAutoScroll();
      });
    }

    let resetTimer;
    function resetToAutoScroll() {
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        if (testimonialsTrack.classList.contains('manual-scroll')) {
          testimonialsTrack.classList.remove('manual-scroll');
          testimonialsTrack.style.transition = 'none';
          testimonialsTrack.style.transform = '';
          void testimonialsTrack.offsetWidth;
          testimonialsTrack.style.animation = 'scrollTestimonials 40s linear infinite';
          testimonialsTrack.style.animationPlayState = 'running';
        }
      }, 5000);
    }

    // Reset after arrow clicks
    leftArrow && leftArrow.addEventListener('click', resetToAutoScroll);
    rightArrow && rightArrow.addEventListener('click', resetToAutoScroll);

    function cloneSlides() {
      const slidesToClone = Math.min(3, slides.length);
      for (let i = 0; i < slidesToClone; i++) {
        const clone = slides[i].cloneNode(true);
        clone.classList.add('clone');
        testimonialsTrack.appendChild(clone);
      }
      for (let i = slides.length - 1; i >= Math.max(0, slides.length - slidesToClone); i--) {
        const clone = slides[i].cloneNode(true);
        clone.classList.add('clone');
        testimonialsTrack.insertBefore(clone, testimonialsTrack.firstChild);
      }
      currentIndex = slidesToClone;
      testimonialsTrack.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
    }
    cloneSlides();

    testimonialsTrack.addEventListener('transitionend', () => {
      if (!testimonialsTrack.classList.contains('manual-scroll')) return;
      if (currentIndex >= totalSlides) {
        currentIndex = 0;
        testimonialsTrack.style.transition = 'none';
        testimonialsTrack.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
      } else if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
        testimonialsTrack.style.transition = 'none';
        testimonialsTrack.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
      }
    });
  }

  // ====================================================
  // Card Interactivity
  // ====================================================
  function initCards() {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', function() {
        const category = this.classList[1];
        console.log(`User clicked on ${category ? category.replace('-', ' ') : 'card'}`);
      });
    });
  }

  // ====================================================
  // Promo Banner System
  // ====================================================
  function initPromoBanner() {
    const bannerConfig = {
      initialDelay: 1000,
      displayDuration: 10000,
      repeatInterval: 60000,
      userHasShoppedKey: 'user_has_shopped'
    };
    const promoBanner = document.getElementById('promo-banner');
    const promoNotification = document.getElementById('promo-notification');
    const promoOverlay = document.getElementById('promo-overlay');
    const activeBanner = promoBanner || promoNotification;
    if (!activeBanner) return;
    let bannerTimer, repeatTimer;

    if (promoBanner) {
      const closeBannerBtn = document.getElementById('close-banner');
      const shopNowBtn = document.getElementById('shop-now-btn');
      if (closeBannerBtn) {
        closeBannerBtn.addEventListener('click', hideBanner);
      }
      if (shopNowBtn) {
        shopNowBtn.addEventListener('click', () => {
          sessionStorage.setItem(bannerConfig.userHasShoppedKey, 'true');
          hideBanner();
          console.log('User clicked Shop Now button!');
        });
      }
    }

    function showBanner() {
      if (promoBanner && sessionStorage.getItem(bannerConfig.userHasShoppedKey) === 'true') return;
      if (promoOverlay) promoOverlay.classList.add('show');
      activeBanner.classList.add('show');
      if (promoBanner) activeBanner.classList.add('visible');
      bannerTimer = setTimeout(hideBanner, bannerConfig.displayDuration);
    }

    function hideBanner() {
      activeBanner.classList.remove('show');
      if (promoBanner) activeBanner.classList.remove('visible');
      if (promoOverlay) promoOverlay.classList.remove('show');
      clearTimeout(bannerTimer);
    }

    setTimeout(() => {
      showBanner();
      repeatTimer = setInterval(() => {
        if (promoBanner && sessionStorage.getItem(bannerConfig.userHasShoppedKey) === 'true') {
          clearInterval(repeatTimer);
        } else {
          showBanner();
        }
      }, bannerConfig.repeatInterval);
    }, bannerConfig.initialDelay);
  }

  // ====================================================
  // Shop Items Functionality
  // ====================================================
  function initShopItems() {
    const itemData = [
      {
        id: 101,
        name: "Martha Wicker Chair",
        brand: "Society Social",
        price: 38.00,
        colors: [
          { color: "#ffffff", image: "assets/images/Chair-group1-white.jpg" },
          { color: "#c82333", image: "assets/images/Chair-group1-red.jpg" },
          { color: "#d63384", image: "assets/images/Chair-group1-purple.jpg" }
        ],
        defaultColorIndex: 0
      },
      {
        id: 102,
        name: "Velvet Lounge Chair",
        brand: "Chaddock",
        price: 38.00,
        colors: [
          { color: "#0d6efd", image: "assets/images/Chair-group2.blue.png" },
          { color: "#dc3545", image: "assets/images/Chair-group2-red.png" },
          { color: "#b0860f", image: "assets/images/Chair-group2-gold.png" }
        ],
        defaultColorIndex: 0
      },
      {
        id: 103,
        name: "Alfred Christensen Lounge Chair",
        brand: "The Expert Vintage",
        price: 38.00,
        colors: [
          { color: "#1a1a5e", image: "assets/images/Chair-group3-blue.png" },
          { color: "#6d1a1a", image: "assets/images/Chair-group3-brown.png" },
          { color: "#d63384", image: "assets/images/Chair-group3-pink.png" }
        ],
        defaultColorIndex: 0
      },
      {
        id: 104,
        name: "Tired Man Lounge Chair",
        brand: "The Expert Vintage",
        price: 38.00,
        colors: [
          { color: "#218380", image: "assets/images/Chair-group4-teal.png" },
          { color: "#9c27b0", image: "assets/images/Chair-group4-purple.png" }
        ],
        defaultColorIndex: 0
      }
    ];
    const itemsContainer = document.getElementById('shopItems');
    if (!itemsContainer) return;
    // Duplicate items for a second row by offsetting IDs
    const secondRowItems = itemData.map(item => ({ ...item, id: item.id + 100 }));
    const allItems = [...itemData, ...secondRowItems];

    allItems.forEach(product => {
      const itemCard = document.createElement('div');
      itemCard.className = 'item';
      itemCard.id = 'prod-' + product.id;
      
      const swatchesHTML = product.colors.map((colorOption, index) => {
        const activeClass = index === product.defaultColorIndex ? 'active' : '';
        return `<div class="swatch ${activeClass}" id="color-${product.id}-${index}" style="background-color: ${colorOption.color}" data-index="${index}"></div>`;
      }).join('');
      
      const defaultImage = product.colors[product.defaultColorIndex].image;
      itemCard.innerHTML = `
        <div class="item-pic">
          <img src="${defaultImage}" alt="${product.name}" id="img-${product.id}">
        </div>
        <div class="item-name">${product.name}</div>
        <div class="item-maker">${product.brand}</div>
        <div class="item-cost">$${product.price.toFixed(2)}</div>
        <div class="color-swatches" id="swatches-${product.id}">
          ${swatchesHTML}
        </div>
        <button class="heart-btn" id="fav-${product.id}">
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path fill="#777" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
          </svg>
        </button>
      `;
      itemsContainer.appendChild(itemCard);
    });

    document.querySelectorAll('.heart-btn').forEach(button => {
      button.addEventListener('click', function() { this.classList.toggle('liked'); });
    });
    document.querySelectorAll('.swatch').forEach(swatch => {
      swatch.addEventListener('click', function() {
        const productId = this.id.split('-')[1];
        const colorIndex = parseInt(this.getAttribute('data-index'), 10);
        const product = allItems.find(item => item.id == productId);
        document.querySelectorAll(`#swatches-${productId} .swatch`).forEach(s => s.classList.remove('active'));
        this.classList.add('active');
        const imageElement = document.getElementById(`img-${productId}`);
        imageElement.src = product.colors[colorIndex].image;
      });
    });
  }

  // ====================================================
  // Animations (Intersection Observer)
  // ====================================================
  function initAnimations() {
    const leftSlideCards = document.querySelectorAll('.slide-from-left');
    const rightSlideCards = document.querySelectorAll('.slide-from-right');
    if (!leftSlideCards.length && !rightSlideCards.length) return;
    
    // Append keyframe definitions for slide animations
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes slideInFromLeft {
        from { opacity: 0; transform: translateX(-100px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes slideInFromRight {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
      }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('slide-from-left')) {
            entry.target.style.animation = 'slideInFromLeft 0.8s forwards';
          } else if (entry.target.classList.contains('slide-from-right')) {
            entry.target.style.animation = 'slideInFromRight 0.8s forwards';
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const allCards = [...leftSlideCards, ...rightSlideCards].sort((a, b) =>
      a.getBoundingClientRect().top - b.getBoundingClientRect().top
    );
    allCards.forEach((card, index) => {
      card.style.animationDelay = `${0.15 * index}s`;
      observer.observe(card);
    });
  }

  // ====================================================
  // Modal Toggle (Updated for All Login Icons)
  // ====================================================
  function initModal() {
    const signinModal = document.getElementById('signin-modal');
    const modalContent = document.querySelector('.modal-content');
    
    // Bind event to all login icons (desktop and sidebar)
    document.querySelectorAll('.login-icon a').forEach(icon => {
      icon.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        // Disable page scrolling
        utils.disableScroll();
        // Create and append overlay if it doesn't exist
        let overlay = document.getElementById('signin-overlay');
        if (!overlay) {
          overlay = document.createElement('div');
          overlay.id = 'signin-overlay';
          overlay.style.position = 'fixed';
          overlay.style.top = '0';
          overlay.style.left = '0';
          overlay.style.width = '100%';
          overlay.style.height = '100%';
          overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
          overlay.style.zIndex = '9998';
          document.body.appendChild(overlay);
        } else {
          overlay.classList.remove('hidden');
        }
        // Ensure modal appears above the overlay
        signinModal.style.position = 'relative';
        signinModal.style.zIndex = '9999';
        signinModal.classList.remove('hidden');
      });
    });
    
    function togglePasswordVisibility(inputId, toggleElem) {
      const input = document.getElementById(inputId);
      const icon = toggleElem.querySelector('i');
    
      if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
      }
    }


    if (modalContent) {
      modalContent.addEventListener('click', function(e) { 
        e.stopPropagation(); 
      });
    }
    
    // Close modal and restore scroll
    function closeModalAndCleanup(e) {
      if (e) e.preventDefault();
      utils.enableScroll();
      const overlay = document.getElementById('signin-overlay');
      if (overlay) overlay.remove();
      signinModal.classList.add('hidden');
    }
    
    const closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn && signinModal) {
      closeModalBtn.addEventListener('click', closeModalAndCleanup);
    }
    
    window.addEventListener('click', function(e) {
      if (e.target === signinModal) {
        closeModalAndCleanup();
      }
    });
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !signinModal.classList.contains('hidden')) {
        closeModalAndCleanup();
      }
    });
  }
  

  // ====================================================
  // Additional Features
  // ====================================================
  function loadGoogleFonts() {
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@400;500;700&display=swap';
    document.head.appendChild(fontLink);
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  function initSectionReveal() {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observerInstance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    sections.forEach(section => observer.observe(section));
  }

  // ====================================================
  // Initialize All Features
  // ====================================================
  function init() {
    initNavigation();
    initCarousel();
    initTestimonialsCarousel();
    initCards();
    initPromoBanner();
    initShopItems();
    initAnimations();
    initModal();
    loadGoogleFonts();
    initSmoothScroll();
    initSectionReveal();
    togglePasswordVisibility();
  }

  init();
});
