document.addEventListener('DOMContentLoaded', function() {
  // -------------------------
  // Utility functions
  // -------------------------
  const utils = {
    toggleClass: (element, className = 'active') => element.classList.toggle(className),
    addClass: (element, className = 'active') => element.classList.add(className),
    removeClass: (element, className = 'active') => element.classList.remove(className)
  };

  // -------------------------
  // Navigation & Sidebar
  // -------------------------
  function initNavigation() {
    const navElements = {
      hamburger: document.querySelector('.hamburger a'),
      closeBtn: document.querySelector('.close-btn a'),
      sidebar: document.querySelector('.sidebar'),
      overlay: document.querySelector('.sidebar-overlay'),
      dropdownToggles: document.querySelectorAll('.dropdown-toggle'),
      heroSection: document.querySelector('.carousel')
    };

    function toggleSidebar(e) {
      if (e) e.preventDefault();
      [navElements.sidebar, navElements.overlay].forEach(el => el && el.classList.toggle('active'));
    }

    if (navElements.hamburger) {
      navElements.hamburger.addEventListener('click', toggleSidebar);
    }
    if (navElements.closeBtn) {
      navElements.closeBtn.addEventListener('click', toggleSidebar);
    }
    if (navElements.overlay) {
      navElements.overlay.addEventListener('click', toggleSidebar);
    }

    // Handle sidebar dropdown toggles
    navElements.dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('active');
        const parent = this.closest('.has-dropdown');
        const dropdown = parent.querySelector('.dropdown');
        if (parent.closest('.sidebar-menu')) {
          if (dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
          } else {
            // Close any open dropdowns at the same level
            parent.parentNode.querySelectorAll('.dropdown.show').forEach(sibling => {
              if (sibling !== dropdown) {
                sibling.classList.remove('show');
                const siblingToggle = sibling.parentNode.querySelector('.dropdown-toggle');
                if (siblingToggle) siblingToggle.classList.remove('active');
              }
            });
            dropdown.classList.add('show');
          }
        }
      });
    });

    // Desktop: Show/hide dropdowns on hover
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

    // Change hamburger icon color on scroll (only affects the icon, not main-nav)
    window.addEventListener("scroll", function () {
      const hamburgerIcon = document.querySelector(".hamburger svg");
      const carousel = document.querySelector(".carousel");
      if (!hamburgerIcon || !carousel) return;
      const carouselHeight = carousel.offsetHeight;
      hamburgerIcon.style.fill = window.scrollY > carouselHeight ? "black" : "currentColor";
    });
  }

  // -------------------------
  // Main Carousel
  // -------------------------
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

  // -------------------------
  // Testimonials Carousel
  // -------------------------
  function initTestimonialsCarousel() {
    const testimonialsCarousel = document.querySelector('.testimonials-carousel');
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const leftArrow = document.querySelector('.carousel-arrow-left');
    const rightArrow = document.querySelector('.carousel-arrow-right');
    const slides = document.querySelectorAll('.testimonial-slide');
    if (!testimonialsCarousel || !testimonialsTrack || slides.length === 0) return;

    const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(slides[0]).marginRight);
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

    // Also set up the reset timer after arrow clicks
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

  // -------------------------
  // Card Interactivity
  // -------------------------
  function initCards() {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', function() {
        const category = this.classList[1];
        console.log(`User clicked on ${category ? category.replace('-', ' ') : 'card'}`);
      });
    });
  }

  // -------------------------
  // Promo Banner System
  // -------------------------
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

  // -------------------------
  // Shop Items Functionality
  // -------------------------
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
          { color: "#0d6efd", image: "assets/images/Chair-group2.blue.jpg" },
          { color: "#dc3545", image: "assets/images/Chair-group2-red.jpg" },
          { color: "#b0860f", image: "assets/images/Chair-group2-gold.jpg" }
        ],
        defaultColorIndex: 0
      },
      {
        id: 103,
        name: "Alfred Christensen Lounge Chair",
        brand: "The Expert Vintage",
        price: 38.00,
        colors: [
          { color: "#1a1a5e", image: "assets/images/Chair-group3-blue.jpg" },
          { color: "#6d1a1a", image: "assets/images/Chair-group3-brown.jpg" },
          { color: "#d63384", image: "assets/images/Chair-group3-pink.jpg" }
        ],
        defaultColorIndex: 0
      },
      {
        id: 104,
        name: "Tired Man Lounge Chair",
        brand: "The Expert Vintage",
        price: 38.00,
        colors: [
          { color: "#218380", image: "assets/images/Chair-group4-teal.jpg" },
          { color: "#9c27b0", image: "assets/images/Chair-group4-purple.jpg" }
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
        const colorIndex = parseInt(this.getAttribute('data-index'));
        const product = allItems.find(item => item.id == productId);
        document.querySelectorAll(`#swatches-${productId} .swatch`).forEach(s => s.classList.remove('active'));
        this.classList.add('active');
        const imageElement = document.getElementById(`img-${productId}`);
        imageElement.src = product.colors[colorIndex].image;
      });
    });
  }

  // -------------------------
  // Animations (Intersection Observer)
  // -------------------------
  function initAnimations() {
    const leftSlideCards = document.querySelectorAll('.slide-from-left');
    const rightSlideCards = document.querySelectorAll('.slide-from-right');
    if (!leftSlideCards.length && !rightSlideCards.length) return;
    // Append keyframe definitions
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

  // -------------------------
  // Modal Toggle
  // -------------------------
  function initModal() {
    const signinModal = document.getElementById('signin-modal');
    const openSigninModal = document.getElementById('openSigninModal');
    const closeModal = document.getElementById('closeModal');
    const modalContent = document.querySelector('.modal-content');
    if (openSigninModal && signinModal) {
      openSigninModal.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        signinModal.classList.remove('hidden');
      });
    }
    if (modalContent) {
      modalContent.addEventListener('click', function(e) { e.stopPropagation(); });
    }
    if (closeModal && signinModal) {
      closeModal.addEventListener('click', function(e) {
        e.preventDefault();
        signinModal.classList.add('hidden');
      });
    }
    window.addEventListener('click', function(e) {
      if (e.target === signinModal) {
        signinModal.classList.add('hidden');
      }
    });
  }

  // -------------------------
  // Register Form Functionality
  // -------------------------
  function initRegisterForm() {
    function togglePasswordVisibility(inputId, toggleElement) {
      const passwordInput = document.getElementById(inputId);
      const icon = toggleElement.querySelector('i');
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
        toggleElement.setAttribute('aria-pressed', 'true');
      } else {
        passwordInput.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
        toggleElement.setAttribute('aria-pressed', 'false');
      }
    }
    function validatePassword(password) {
      const requirements = {
        length: password.length >= 8,
        number: /[0-9]/.test(password),
        case: /[A-Z]/.test(password) && /[a-z]/.test(password),
        symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
      };
      document.getElementById('req-length').querySelector('.checkmark').classList.toggle('valid', requirements.length);
      document.getElementById('req-number').querySelector('.checkmark').classList.toggle('valid', requirements.number);
      document.getElementById('req-case').querySelector('.checkmark').classList.toggle('valid', requirements.case);
      document.getElementById('req-symbol').querySelector('.checkmark').classList.toggle('valid', requirements.symbol);
      let validCount = 0;
      for (let key in requirements) { if (requirements[key]) validCount++; }
      const strengthPercent = (validCount / 4) * 100;
      const strengthBarFill = document.getElementById('strength-bar-fill');
      strengthBarFill.style.width = strengthPercent + '%';
      strengthBarFill.style.backgroundColor = strengthPercent <= 50 ? 'red' : (strengthPercent < 100 ? 'orange' : 'green');
      return validCount === 4;
    }
    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    document.getElementById('password').addEventListener('input', function() {
      validatePassword(this.value);
      document.getElementById('password-error').style.display = 'none';
      const confirmPassword = document.getElementById('confirm-password').value;
      if (confirmPassword) {
        document.getElementById('confirm-password-error').style.display =
          this.value === confirmPassword ? 'none' : 'block';
      }
    });
    document.getElementById('confirm-password').addEventListener('input', function() {
      const password = document.getElementById('password').value;
      document.getElementById('confirm-password-error').style.display =
        this.value === password ? 'none' : 'block';
    });
    document.getElementById('email').addEventListener('input', function() {
      document.getElementById('email-error').style.display = 'none';
    });
    document.getElementById('first-name').addEventListener('input', function() {
      document.getElementById('first-name-error').style.display = 'none';
    });
    document.getElementById('last-name').addEventListener('input', function() {
      document.getElementById('last-name-error').style.display = 'none';
    });
    document.getElementById('register-form').addEventListener('submit', function(e) {
      e.preventDefault();
      const firstName = document.getElementById('first-name').value;
      const lastName = document.getElementById('last-name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      const termsChecked = document.getElementById('terms').checked;
      let isValid = true;
      if (!firstName.trim()) { document.getElementById('first-name-error').style.display = 'block'; isValid = false; }
      if (!lastName.trim()) { document.getElementById('last-name-error').style.display = 'block'; isValid = false; }
      if (!validateEmail(email)) { document.getElementById('email-error').style.display = 'block'; isValid = false; }
      if (!validatePassword(password)) { document.getElementById('password-error').style.display = 'block'; isValid = false; }
      if (password !== confirmPassword) { document.getElementById('confirm-password-error').style.display = 'block'; isValid = false; }
      if (!termsChecked) { alert('You must agree to the Terms of Service and Privacy Policy.'); isValid = false; }
      if (isValid) {
        const submitBtn = document.getElementById('submit-btn');
        const spinner = document.getElementById('spinner');
        submitBtn.disabled = true;
        spinner.style.display = 'inline-block';
        setTimeout(function() {
          alert('Registration successful!');
          submitBtn.disabled = false;
          spinner.style.display = 'none';
        }, 2000);
      }
    });
  }

  // -------------------------
  // Additional Features
  // -------------------------
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
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
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

  // -------------------------
  // Initialize All Features
  // -------------------------
  function init() {
    initNavigation();
    initCarousel();
    initTestimonialsCarousel();
    initCards();
    initPromoBanner();
    initShopItems();
    initAnimations();
    initModal();
    initRegisterForm();
    loadGoogleFonts();
    initSmoothScroll();
    initSectionReveal();
  }

  init();
});
