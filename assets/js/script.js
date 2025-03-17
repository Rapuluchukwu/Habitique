document.addEventListener('DOMContentLoaded', function() {
  // Common utility functions
  const utils = {
    toggleElement: function(element, addClass = true, className = 'active') {
      if (addClass) {
        element.classList.add(className);
      } else {
        element.classList.remove(className);
      }
    },
    
    createTimer: function(callback, delay) {
      return setTimeout(callback, delay);
    }
  };

  // ===== Navigation & Sidebar functionality =====
  const navElements = {
    hamburger: document.querySelector('.hamburger a'),
    closeBtn: document.querySelector('.close-btn a'),
    sidebar: document.querySelector('.sidebar'),
    overlay: document.querySelector('.sidebar-overlay'),
    dropdownToggles: document.querySelectorAll('.dropdown-toggle'),
    // mainNav: document.querySelector('.main-nav'),
    heroSection: document.querySelector('.carousel')
  };
  
  // Toggle sidebar function
  function toggleSidebar() {
    console.log("Toggle sidebar called");
    navElements.sidebar.classList.toggle('active');
    navElements.overlay.classList.toggle('active');
    // document.body.classList.toggle('no-scroll');
  }
  
  // Event listeners for sidebar
  if (navElements.hamburger) {
    navElements.hamburger.addEventListener('click', function(e) {
      e.preventDefault();
      toggleSidebar();
    });
  }
  
  if (navElements.closeBtn) {
    navElements.closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      toggleSidebar();
    });
  }
  
  if (navElements.overlay) navElements.overlay.addEventListener('click', toggleSidebar);
  
  // Handle dropdown toggling
  navElements.dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Toggle active class on the clicked toggle
      this.classList.toggle('active');
      
      // Find the parent li and the dropdown within it
      const parent = this.closest('.has-dropdown');
      const dropdown = parent.querySelector('.dropdown');
      
      // In sidebar - show/hide the dropdown
      if (parent.closest('.sidebar-menu')) {
        if (dropdown.classList.contains('show')) {
          dropdown.classList.remove('show');
        } else {
          // First, close any open dropdowns at the same level
          const siblings = parent.parentNode.querySelectorAll('.dropdown.show');
          siblings.forEach(sibling => {
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
  
  // For desktop: Handle hover effects
  if (window.innerWidth >= 993) {
    const mainNavItems = document.querySelectorAll('.nav-links .has-dropdown');
    
    mainNavItems.forEach(item => {
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
  
  // Update nav styles on scroll
  function updateNavStyles() {
    if (!navElements.mainNav || !navElements.heroSection) return;
    
    const heroBottom = navElements.heroSection.getBoundingClientRect().bottom;
    
    if (heroBottom <= 0) {
      // Past hero section - white background with black text
      navElements.mainNav.classList.add('scrolled');
      navElements.mainNav.classList.remove('in-hero');
    } else {
      // Still in hero section - transparent background with white text
      navElements.mainNav.classList.remove('scrolled');
      navElements.mainNav.classList.add('in-hero');
    }
  }
  
  // Run on initial load and scroll
  if (navElements.mainNav && navElements.heroSection) {
    updateNavStyles();
    window.addEventListener('scroll', updateNavStyles);
  }


window.addEventListener("scroll", function () {
  const hamburger = document.querySelector(".hamburger svg");
  const carousel = document.querySelector(".carousel");
  const carouselHeight = carousel.offsetHeight;

  if (window.scrollY > carouselHeight) {
    hamburger.style.fill = "black";
  } else {
    hamburger.style.fill = "currentColor"; 
  }
});


  // ===== Carousel functionality =====
  function initCarousel() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (!slides.length || !dots.length) return;
    
    let currentSlide = 0;
    let slideInterval;

    // Function to change slide
    function changeSlide(n) {
      // Remove active class from current slide and dot
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');

      // Update current slide index
      currentSlide = (n + slides.length) % slides.length;

      // Add active class to new slide and dot
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    }

    // Set up dot click events
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        changeSlide(index);
      });
    });

    // Start auto-advance
    function startSlideTimer() {
      slideInterval = setInterval(() => {
        changeSlide(currentSlide + 1);
      }, 5000); // Change slide every 5 seconds
    }
    
    // Start initial timer
    startSlideTimer();

    // Pause auto-advance when interacting with carousel
    const carousel = document.querySelector('.carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
      });

      carousel.addEventListener('mouseleave', () => {
        startSlideTimer();
      });
    }
  }
  
  initCarousel();

  // ===== Testimonials carousel functionality =====
function initTestimonialsCarousel() {
  const testimonialsCarousel = document.querySelector('.testimonials-carousel');
  const testimonialsTrack = document.querySelector('.testimonials-track');
  const leftArrow = document.querySelector('.carousel-arrow-left');
  const rightArrow = document.querySelector('.carousel-arrow-right');
  const slides = document.querySelectorAll('.testimonial-slide');
  
  if (!testimonialsCarousel || !testimonialsTrack || !slides.length) return;
  
  // Calculate slide width including margin
  const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(slides[0]).marginRight);
  
  // When the user hovers over the carousel, pause the scroll
  testimonialsCarousel.addEventListener('mouseenter', () => {
    testimonialsTrack.style.animationPlayState = 'paused';
  });
  
  // When the user moves the mouse away, resume the scroll
  testimonialsCarousel.addEventListener('mouseleave', () => {
    if (!testimonialsTrack.classList.contains('manual-scroll')) {
      testimonialsTrack.style.animationPlayState = 'running';
    }
  });
  
  // Remove default animation to enable manual scrolling
  function enableManualScrolling() {
    // Stop the automatic animation
    testimonialsTrack.style.animation = 'none';
    // Mark as being manually scrolled
    testimonialsTrack.classList.add('manual-scroll');
  }
  
  // Current index of the first visible slide
  let currentIndex = 0;
  const totalSlides = slides.length;
  
  // Function to scroll to a specific slide
  function scrollToSlide(index) {
    // Enable manual scrolling if not already enabled
    if (!testimonialsTrack.classList.contains('manual-scroll')) {
      enableManualScrolling();
    }
    
    // Ensure index is within bounds with wrapping
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    
    currentIndex = index;
    
    // Calculate position and apply transform
    const position = -slideWidth * currentIndex;
    testimonialsTrack.style.transition = 'transform 0.5s ease';
    testimonialsTrack.style.transform = `translateX(${position}px)`;
  }
  
  // Handle left arrow click
  leftArrow.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent the carousel click event from firing
    scrollToSlide(currentIndex - 1);
  });
  
  // Handle right arrow click
  rightArrow.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent the carousel click event from firing
    scrollToSlide(currentIndex + 1);
  });
  
  // Reset to auto-animation after period of inactivity
  let resetTimer;
  
  function resetToAutoScroll() {
    clearTimeout(resetTimer);
    resetTimer = setTimeout(() => {
      if (testimonialsTrack.classList.contains('manual-scroll')) {
        // Remove manual scroll class
        testimonialsTrack.classList.remove('manual-scroll');
        
        // Reset transform and transition
        testimonialsTrack.style.transition = 'none';
        testimonialsTrack.style.transform = '';
        
        // Force reflow
        void testimonialsTrack.offsetWidth;
        
        // Restart animation
        testimonialsTrack.style.animation = 'scrollTestimonials 40s linear infinite';
        testimonialsTrack.style.animationPlayState = 'running';
      }
    }, 5000); // Reset after 5 seconds of inactivity
  }
  
  // Set up the reset timer after clicks
  leftArrow.addEventListener('click', resetToAutoScroll);
  rightArrow.addEventListener('click', resetToAutoScroll);
  
  // Clone slides for infinite scrolling when in manual mode
  function cloneSlides() {
    // Clone the first few slides and append them to the end
    const slidesToClone = Math.min(3, slides.length);
    for (let i = 0; i < slidesToClone; i++) {
      const clone = slides[i].cloneNode(true);
      clone.classList.add('clone');
      testimonialsTrack.appendChild(clone);
    }
    
    // Clone the last few slides and prepend them to the beginning
    for (let i = slides.length - 1; i >= Math.max(0, slides.length - slidesToClone); i--) {
      const clone = slides[i].cloneNode(true);
      clone.classList.add('clone');
      testimonialsTrack.insertBefore(clone, testimonialsTrack.firstChild);
    }
    
    // Adjust the initial position to account for prepended clones
    currentIndex = slidesToClone;
    testimonialsTrack.style.transform = `translateX(${-slideWidth * currentIndex}px)`;
  }
  
  // Handle transition end to create infinite scroll effect
  testimonialsTrack.addEventListener('transitionend', () => {
    if (!testimonialsTrack.classList.contains('manual-scroll')) return;
    
    // If we've scrolled past the original slides, jump to the appropriate clone
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

initTestimonialsCarousel();

// ===== Card interactivity =====
function initCards() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('click', function() {
      const category = this.classList[1];
      console.log(`User clicked on ${category ? category.replace('-', ' ') : 'card'}`);
      // Here you could add navigation to category pages
      // window.location.href = `/${category}.html`;
    });
  });
}

initCards();

  // ===== Promo Banner System (Unified) =====
const bannerConfig = {
  initialDelay: 1000,          // 1 second after page load
  displayDuration: 10000,      // Show for 10 seconds
  repeatInterval: 60000,       // Reappear every 1 minute
  userHasShoppedKey: 'user_has_shopped'
};

function initPromoBanner() {
  // Check for both possible banner implementations
  const promoBanner = document.getElementById('promo-banner');
  const promoNotification = document.getElementById('promo-notification');
  const promoOverlay = document.getElementById('promo-overlay');
  
  let activeBanner = null;
  let bannerTimer;
  let repeatTimer;
  
  // Select which banner implementation to use
  if (promoBanner) {
    activeBanner = promoBanner;
    const closeBannerBtn = document.getElementById('close-banner');
    const shopNowBtn = document.getElementById('shop-now-btn');
    
    // Handle close button
    if (closeBannerBtn) {
      closeBannerBtn.addEventListener('click', () => {
        hideBanner();
      });
    }
    
    // Handle shop now button
    if (shopNowBtn) {
      shopNowBtn.addEventListener('click', () => {
        // Set flag that user has "shopped"
        sessionStorage.setItem(bannerConfig.userHasShoppedKey, 'true');
        hideBanner();
        
        // In a real implementation, redirect would go here
        console.log('User clicked Shop Now button!');
      });
    }
  } else if (promoNotification) {
    activeBanner = promoNotification;
  }
  
  // If no banner is found, exit
  if (!activeBanner) return;
  
  // Show the banner and overlay
  function showBanner() {
    // Check if user has "shopped" for the complex banner
    if (promoBanner && sessionStorage.getItem(bannerConfig.userHasShoppedKey) === 'true') {
      return; // Don't show banner if user has already shopped
    }
    
    // Show the overlay first
    if (promoOverlay) {
      promoOverlay.classList.add('show');
    }
    
    // Then show the banner
    activeBanner.classList.add('show');
    if (promoBanner) activeBanner.classList.add('visible');
    
    // Hide banner after displayDuration
    bannerTimer = setTimeout(() => {
      hideBanner();
    }, bannerConfig.displayDuration);
  }
  
  // Hide the banner and overlay
  function hideBanner() {
    // Hide the banner
    activeBanner.classList.remove('show');
    if (promoBanner) activeBanner.classList.remove('visible');
    
    // Hide the overlay
    if (promoOverlay) {
      promoOverlay.classList.remove('show');
    }
    
    clearTimeout(bannerTimer);
  }
  
  // Initial display after delay
  setTimeout(() => {
    showBanner();
    
    // Set up repeating timer
    repeatTimer = setInterval(() => {
      // For complex banner, only show if user hasn't shopped yet
      if (promoBanner && sessionStorage.getItem(bannerConfig.userHasShoppedKey) === 'true') {
        clearInterval(repeatTimer);
      } else {
        showBanner();
      }
    }, bannerConfig.repeatInterval);
  }, bannerConfig.initialDelay);
}

initPromoBanner();


  // ===== Shop Items functionality =====
  function initShopItems() {
    // Product data with color variants
    const itemData = [
      {
          id: 101,
          name: "Martha Wicker Chair",
          brand: "Society Social",
          price: 38.00,
          colors: [
              {
                  color: "#ffffff",
                  image: "assets/images/Chair-group1-white.jpg"
              },
              {
                  color: "#c82333",
                  image: "assets/images/Chair-group1-red.jpg"
              },
              {
                  color: "#d63384",
                  image: "assets/images/Chair-group1-purple.jpg"
              }
          ],
          defaultColorIndex: 0
      },
      {
          id: 102,    
          name: "Velvet Lounge Chair",
          brand: "Chaddock",
          price: 38.00,
          colors: [
              {
                  color: "#0d6efd",
                  image: "assets/images/Chair-group2.blue.jpg"
              },
              {
                  color: "#dc3545",
                  image: "assets/images/Chair-group2-red.jpg"
              },
              {
                  color: "#b0860f",
                  image: "assets/images/Chair-group2-gold.jpg"
              }
          ],
          defaultColorIndex: 0
      },
      {
          id: 103,
          name: "Alfred Christensen Lounge Chair",
          brand: "The Expert Vintage",
          price: 38.00,
          colors: [
              {
                  color: "#1a1a5e",
                  image: "assets/images/Chair-group3-blue.jpg"
              },
              {
                  color: "#6d1a1a",
                  image: "assets/images/Chair-group3-brown.jpg"
              },
              {
                  color: "#d63384",
                  image: "assets/images/Chair-group3-pink.jpg"
              }
          ],
          defaultColorIndex: 0
      },
      {
          id: 104,
          name: "Tired Man Lounge Chair",
          brand: "The Expert Vintage",
          price: 38.00,
          colors: [
              {
                  color: "#218380",
                  image: "assets/images/Chair-group4-teal.jpg"
              },
              {
                  color: "#9c27b0",
                  image: "assets/images/Chair-group4-purple.jpg"
              }
          ],
          defaultColorIndex: 0
      }
    ];

    const itemsContainer = document.getElementById('shopItems');
    if (!itemsContainer) return;
    
    // Duplicate items for second row
    const secondRowItems = itemData.map(item => {
      return {
          ...item,
          id: item.id + 100 // Add 100 to create new IDs for second row
      };
    });

    const allItems = [...itemData, ...secondRowItems];
    
    // Render items to the container
    allItems.forEach(product => {
        const itemCard = document.createElement('div');
        itemCard.className = 'item';
        itemCard.id = 'prod-' + product.id;
        
        // Create color options HTML
        let swatchesHTML = '';
        product.colors.forEach((colorOption, index) => {
            const activeClass = index === product.defaultColorIndex ? 'active' : '';
            swatchesHTML += `<div class="swatch ${activeClass}" id="color-${product.id}-${index}" style="background-color: ${colorOption.color}" data-index="${index}"></div>`;
        });
        
        // Get default image from the default color
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
    
    // Add event listeners to heart buttons
    document.querySelectorAll('.heart-btn').forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('liked');
        });
    });
    
    // Add event listeners to color swatches
    document.querySelectorAll('.swatch').forEach(swatch => {
        swatch.addEventListener('click', function() {
            const productId = this.id.split('-')[1];
            const colorIndex = parseInt(this.getAttribute('data-index'));
            const product = allItems.find(item => item.id == productId);
            
            // Update active swatch
            document.querySelectorAll(`#swatches-${productId} .swatch`).forEach(s => {
                s.classList.remove('active');
            });
            this.classList.add('active');
            
            // Update product image
            const imageElement = document.getElementById(`img-${productId}`);
            imageElement.src = product.colors[colorIndex].image;
        });
    });
  }
  
  initShopItems();

  // ===== Animation functionality =====
  function initAnimations() {
    const leftSlideCards = document.querySelectorAll('.slide-from-left');
    const rightSlideCards = document.querySelectorAll('.slide-from-right');
    
    if (!leftSlideCards.length && !rightSlideCards.length) return;
    
    // Add the CSS animations to the stylesheet
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes slideInFromLeft {
        from {
          opacity: 0;
          transform: translateX(-100px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes slideInFromRight {
        from {
          opacity: 0;
          transform: translateX(100px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
    `;
    document.head.appendChild(style);
    
    // Create the intersection observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // If the element is in the viewport
        if (entry.isIntersecting) {
          const target = entry.target;
          
          // Determine which animation to apply based on the class
          if (target.classList.contains('slide-from-left')) {
            target.style.animation = 'slideInFromLeft 0.8s forwards';
          } else if (target.classList.contains('slide-from-right')) {
            target.style.animation = 'slideInFromRight 0.8s forwards';
          }
          
          // Unobserve the element after it's animated
          observer.unobserve(target);
        }
      });
    }, {
      root: null, // Use the viewport as the root
      threshold: 0.1, // Trigger when 10% of the element is visible
      rootMargin: '0px 0px -50px 0px' // Adjust when the animation triggers
    });
    
    // Add a slight delay between each card animation
    const allCards = [...leftSlideCards, ...rightSlideCards].sort((a, b) => {
      // Sort by vertical position to animate cards in order of appearance
      return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
    });
    
    allCards.forEach((card, index) => {
      // Set a delay based on the card's position
      card.style.animationDelay = `${0.15 * index}s`;
      
      // Observe the card
      observer.observe(card);
    });
  }
  
  initAnimations();
});


// --------------------------------------------------------------------------------------
   // Modal toggle functionality
document.getElementById('openSigninModal').addEventListener('click', function(e) {
  e.preventDefault();
  e.stopPropagation(); // Prevent the click from bubbling up to the window listener
  document.getElementById('signin-modal').classList.remove('hidden');
});

// Prevent clicks within modal-content from closing the modal
document.querySelector('.modal-content').addEventListener('click', function(e) {
  e.stopPropagation();
});

document.getElementById('closeModal').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('signin-modal').classList.add('hidden');
});

// Close modal when clicking on the overlay only
window.addEventListener('click', function(e) {
  const modal = document.getElementById('signin-modal');
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});


// Register form modal
// Toggle password visibility using Font Awesome icons
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

// Validate password, update strength bar and checkmark indicators
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
  for (let key in requirements) {
    if (requirements[key]) validCount++;
  }
  const strengthPercent = (validCount / 4) * 100;
  const strengthBarFill = document.getElementById('strength-bar-fill');
  strengthBarFill.style.width = strengthPercent + '%';
  if (strengthPercent <= 50) {
    strengthBarFill.style.backgroundColor = 'red';
  } else if (strengthPercent < 100) {
    strengthBarFill.style.backgroundColor = 'orange';
  } else {
    strengthBarFill.style.backgroundColor = 'green';
  }
  return validCount === 4;
}

// Validate email using regex
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Real-time validations
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

// Form submission handler with simulated loading state
document.getElementById('register-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const termsChecked = document.getElementById('terms').checked;
  let isValid = true;
  
  if (!firstName.trim()) {
    document.getElementById('first-name-error').style.display = 'block';
    isValid = false;
  }
  if (!lastName.trim()) {
    document.getElementById('last-name-error').style.display = 'block';
    isValid = false;
  }
  if (!validateEmail(email)) {
    document.getElementById('email-error').style.display = 'block';
    isValid = false;
  }
  if (!validatePassword(password)) {
    document.getElementById('password-error').style.display = 'block';
    isValid = false;
  }
  if (password !== confirmPassword) {
    document.getElementById('confirm-password-error').style.display = 'block';
    isValid = false;
  }
  if (!termsChecked) {
    alert('You must agree to the Terms of Service and Privacy Policy.');
    isValid = false;
  }
  
  if (isValid) {
    const submitBtn = document.getElementById('submit-btn');
    const spinner = document.getElementById('spinner');
    submitBtn.disabled = true;
    spinner.style.display = 'inline-block';
    setTimeout(function() {
      alert('Registration successful!');
      submitBtn.disabled = false;
      spinner.style.display = 'none';
      // Typically, form data would be sent to the server here.
    }, 2000);
  }
});



// About
 // Add Google Fonts dynamically
 const fontLink = document.createElement('link');
 fontLink.rel = 'stylesheet';
 fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display:wght@400;500;700&display=swap';
 document.head.appendChild(fontLink);
 
 // Smooth scroll for navigation
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
     e.preventDefault();
     document.querySelector(this.getAttribute('href')).scrollIntoView({
       behavior: 'smooth'
     });
   });
 });
 
 // Reveal animations on scroll
 document.addEventListener('DOMContentLoaded', () => {
  const habitiqueSections = document.querySelectorAll('section');
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  habitiqueSections.forEach(section => observer.observe(section));
});







