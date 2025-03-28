document.addEventListener('DOMContentLoaded', function() {
  // Utility Functions
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


  // Navigation & Sidebar
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

  //   // Toggle dropdown menus inside the sidebar
  //   navElements.dropdownToggles.forEach(toggle => {
  //     toggle.addEventListener('click', function(e) {
  //       e.preventDefault();
  //       this.classList.toggle('active');
  //       const dropdown = this.nextElementSibling;
  //       if (dropdown) dropdown.classList.toggle('show');
  //     });
  //   });

  //   // Desktop: Show/hide dropdowns on hover (for nav-links)
  //   if (window.innerWidth >= 993) {
  //     document.querySelectorAll('.nav-links .has-dropdown').forEach(item => {
  //       item.addEventListener('mouseenter', function() {
  //         const dropdown = this.querySelector('.dropdown');
  //         if (dropdown) dropdown.style.display = 'block';
  //       });
  //       item.addEventListener('mouseleave', function() {
  //         const dropdown = this.querySelector('.dropdown');
  //         if (dropdown) dropdown.style.display = '';
  //       });
  //     });
  //   }
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

  // Card Interactivity
  function initCards() {
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', function() {
        const category = this.classList[1];
        console.log(`User clicked on ${category ? category.replace('-', ' ') : 'card'}`);
      });
    });
  }

  // Promo Banner System
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


  // featured products section
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

    itemData.forEach(product => {
      const itemCard = document.createElement('div');
      itemCard.className = 'item';
      itemCard.id = 'prod-' + product.id;
      
      const swatchesHTML = product.colors.map((colorOption, index) => {
        const activeClass = index === product.defaultColorIndex ? 'active' : '';
        return `
          <div 
            class="swatch ${activeClass}" 
            id="color-${product.id}-${index}" 
            style="background-color: ${colorOption.color}" 
            data-index="${index}"
          >
            <div class="swatch-indicator"></div>
          </div>
        `;
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

    // Heart button toggle
    document.querySelectorAll('.heart-btn').forEach(button => {
      button.addEventListener('click', function() { 
        this.classList.toggle('liked'); 
      });
    });

    // Color swatch interaction
    document.querySelectorAll('.swatch').forEach(swatch => {
      swatch.addEventListener('click', function() {
        const productId = this.id.split('-')[1];
        const colorIndex = parseInt(this.getAttribute('data-index'), 10);
        const product = itemData.find(item => item.id == productId);
        
        // Remove active class from all swatches in this product's swatches
        document.querySelectorAll(`#swatches-${productId} .swatch`).forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked swatch
        this.classList.add('active');
        
        // Update product image
        const imageElement = document.getElementById(`img-${productId}`);
        imageElement.src = product.colors[colorIndex].image;
      });
    });
  }


// === Global Wishlist Functionality ===

// Global array to hold wishlist items (loaded from localStorage if available)
let wishList = JSON.parse(localStorage.getItem('wishList')) || [];

/**
 * Saves the current wishList array to localStorage.
 */
function saveWishlist() {
  localStorage.setItem('wishList', JSON.stringify(wishList));
}

/**
 * Updates the wishlist modal UI based on the wishList array.
 */
function updateWishlistUI() {
  const wishlistContent = document.querySelector('#wishlist-panel .wishlist-content');
  const wishlistFooter = document.querySelector('#wishlist-panel .wishlist-footer');
  if (!wishlistContent) return;
  wishlistContent.innerHTML = '';

  if (wishList.length === 0) {
    wishlistContent.innerHTML = '<p>Your wish list is empty.</p>';
    if (wishlistFooter) wishlistFooter.style.display = 'none';
    return;
  } else {
    if (wishlistFooter) wishlistFooter.style.display = 'block';
  }

  wishList.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'wishlist-item';
    // Only change: display total price (unit price * quantity)
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="wishlist-item-img"/>
      <div class="item-details">
        <h4>${item.name}</h4>
        <p>$${(item.price * item.quantity).toFixed(2)}</p>
        <div class="quantity-control">
          <button class="quantity-btn" onclick="decreaseWishlistQuantity('${item.id}')">-</button>
          <span> Qty: ${item.quantity} </span>
          <button class="quantity-btn" onclick="increaseWishlistQuantity('${item.id}')">+</button>
        </div>
      </div>
      <button class="remove-btn" onclick="removeFromWishlist('${item.id}')">Remove</button>
    `;
    wishlistContent.appendChild(itemDiv);
  });
}


/**
 * Adds or updates a product in the wishlist.
 * Called when a user clicks a product’s heart button.
 * @param {number} prodId - The product id.
 * @param {string} productName - The product name.
 * @param {number} productPrice - The product price.
 * @param {string} productImage - The image URL (of the currently selected color).
 */
function addToWishlist(prodId, productName, productPrice, productImage) {
  const existingIndex = wishList.findIndex(item => item.id == prodId);
  if (existingIndex > -1) {
    wishList[existingIndex].quantity++;
  } else {
    wishList.push({
      id: prodId,
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1
    });
  }
  saveWishlist();
}

/**
 * Increases the quantity of a wishlist item.
 */
window.increaseWishlistQuantity = function(prodId) {
  const index = wishList.findIndex(item => item.id == prodId);
  if (index > -1) {
    wishList[index].quantity++;
    saveWishlist();
    updateWishlistUI();
  }
};

/**
 * Decreases the quantity of a wishlist item.
 * If quantity reaches zero, the item is removed.
 */
window.decreaseWishlistQuantity = function(prodId) {
  const index = wishList.findIndex(item => item.id == prodId);
  if (index > -1) {
    wishList[index].quantity--;
    if (wishList[index].quantity <= 0) {
      wishList.splice(index, 1);
      const heartBtn = document.getElementById(`prod-${prodId}-fav`);
      if (heartBtn) heartBtn.classList.remove('liked');
    }
    saveWishlist();
    updateWishlistUI();
  }
};

/**
 * Removes an item from the wishlist.
 */
window.removeFromWishlist = function(prodId) {
  wishList = wishList.filter(item => item.id != prodId);
  const heartBtn = document.getElementById(`prod-${prodId}-fav`);
  if (heartBtn) heartBtn.classList.remove('liked');
  saveWishlist();
  updateWishlistUI();
};

/**
 * Opens the wishlist modal.
 */
window.openWishlistModal = function(event) {
  if (event) event.preventDefault();
  updateWishlistUI();
  const wishlistPanel = document.getElementById('wishlist-panel');
  const wishlistOverlay = document.getElementById('wishlist-overlay');
  if (wishlistPanel && wishlistOverlay) {
    wishlistPanel.classList.remove('hidden');
    wishlistOverlay.classList.remove('hidden');
    wishlistPanel.classList.add('active');
    wishlistOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

/**
 * Closes the wishlist modal.
 */
window.closeWishlistModal = function() {
  const wishlistPanel = document.getElementById('wishlist-panel');
  const wishlistOverlay = document.getElementById('wishlist-overlay');
  if (wishlistPanel && wishlistOverlay) {
    wishlistPanel.classList.remove('active');
    wishlistOverlay.classList.remove('active');
    setTimeout(() => {
      wishlistPanel.classList.add('hidden');
      wishlistOverlay.classList.add('hidden');
    }, 400);
    document.body.style.overflow = '';
  }
};

// Load wishlist on page load
window.addEventListener('DOMContentLoaded', function() {
  wishList = JSON.parse(localStorage.getItem('wishList')) || [];
  updateWishlistUI();

  // === Build Product Cards with Heart Button Data Attributes ===
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
  
  itemsContainer.innerHTML = ''; // Clear existing content

  // Build product cards
  itemData.forEach(product => {
    const itemCard = document.createElement('div');
    itemCard.className = 'item';
    itemCard.id = 'prod-' + product.id;
    // Set the default selected color index
    itemCard.setAttribute('data-selected-color', product.defaultColorIndex);
    
    const swatchesHTML = product.colors.map((colorOption, index) => {
      const activeClass = index === product.defaultColorIndex ? 'active' : '';
      return `
        <div 
          class="swatch ${activeClass}" 
          id="prod-${product.id}-swatch-${index}" 
          style="background-color: ${colorOption.color}" 
          data-index="${index}" 
          data-product-id="${product.id}">
          <div class="swatch-indicator"></div>
        </div>
      `;
    }).join('');
    
    const defaultImage = product.colors[product.defaultColorIndex].image;
    itemCard.innerHTML = `
      <div class="item-pic">
        <img src="${defaultImage}" alt="${product.name}" id="prod-${product.id}-img">
      </div>
      <div class="item-name">${product.name}</div>
      <div class="item-maker">${product.brand}</div>
      <div class="item-cost">$${product.price.toFixed(2)}</div>
      <div class="color-swatches" id="prod-${product.id}-swatches">
        ${swatchesHTML}
      </div>
      <button class="heart-btn" id="prod-${product.id}-fav" 
        data-product-name="${product.name}" 
        data-product-price="${product.price}" 
        data-product-image="${defaultImage}">
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path fill="#777" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
        </svg>
      </button>
    `;
    itemsContainer.appendChild(itemCard);
  });

  // Color swatch interaction: update selected color and product image
  document.querySelectorAll('.swatch').forEach(swatch => {
    swatch.addEventListener('click', function() {
      const productId = this.getAttribute('data-product-id');
      const colorIndex = parseInt(this.getAttribute('data-index'), 10);
      const product = itemData.find(item => item.id == productId);
      
      // Update active swatch
      document.querySelectorAll(`#prod-${productId}-swatches .swatch`).forEach(s => s.classList.remove('active'));
      this.classList.add('active');
      
      // Update product card data attribute
      const productCard = document.getElementById(`prod-${productId}`);
      productCard.setAttribute('data-selected-color', colorIndex);
      
      // Update product image
      const imageElement = document.getElementById(`prod-${productId}-img`);
      imageElement.src = product.colors[colorIndex].image;
      
      // Also update the heart button's data-product-image attribute
      const heartBtn = document.getElementById(`prod-${productId}-fav`);
      if (heartBtn) {
        heartBtn.setAttribute('data-product-image', product.colors[colorIndex].image);
      }
    });
  });

  // Attach heart button toggling logic to all heart buttons
  document.querySelectorAll('.heart-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const prodId = parseInt(this.id.split('-')[1], 10);
      // Toggle the liked state
      if (this.classList.contains('liked')) {
        // If already liked, remove from wishlist
        removeFromWishlist(prodId);
      } else {
        // Get product data from button attributes
        const productName = this.getAttribute('data-product-name');
        const productPrice = parseFloat(this.getAttribute('data-product-price'));
        const productImage = this.getAttribute('data-product-image');
        addToWishlist(prodId, productName, productPrice, productImage);
      }
      this.classList.toggle('liked');
    });
  });
});



  // Animations for blogs (Intersection Observer)
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

  // Modal Toggle (Updated for All Login Icons)
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
        // signinModal.style.position = 'relative';
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
  

function initRegisterModal() {
  const registerModal = document.getElementById('register-modal');
  const modalContent = registerModal.querySelector('.modal-content');
  const signinModal = document.getElementById('signin-modal');

  // Open Register Modal
  document.querySelectorAll('#open-register-modal').forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
  
      // Hide the Sign In modal if it's open
      if (signinModal && !signinModal.classList.contains('hidden')) {
        signinModal.classList.add('hidden');
        const signinOverlay = document.getElementById('signin-overlay');
        if (signinOverlay) signinOverlay.remove();
      }
  
      // Disable scrolling and open the register modal
      utils.disableScroll();
        
      let overlay = document.getElementById('register-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'register-overlay';
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
    
      registerModal.style.zIndex = '9999';
      registerModal.classList.remove('hidden');
    });
  });

  // Open Login Modal from Register Modal
  document.querySelectorAll('#open-login-modal').forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      // Hide the Register modal
      registerModal.classList.add('hidden');
      const registerOverlay = document.getElementById('register-overlay');
      if (registerOverlay) registerOverlay.remove();

      // Open the Sign In modal
      if (signinModal) {
        // Disable scrolling
        utils.disableScroll();
        
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

        signinModal.style.zIndex = '9999';
        signinModal.classList.remove('hidden');
      }
    });
  });

  // Prevent clicks inside modal content from closing the modal
  if (modalContent) {
    modalContent.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
    
  // Close modal and restore scroll
  function closeRegisterModalAndCleanup(e) {
    if (e) e.preventDefault();
    utils.enableScroll();
    const overlay = document.getElementById('register-overlay');
    if (overlay) overlay.remove();
    registerModal.classList.add('hidden');
  }
    
  // Bind close button
  const closeRegisterBtn = document.getElementById('closeRegisterModal');
  if (closeRegisterBtn) {
    closeRegisterBtn.addEventListener('click', closeRegisterModalAndCleanup);
  }
    
  // Close modal when clicking outside modal content
  window.addEventListener('click', function(e) {
    if (e.target === registerModal) {
      closeRegisterModalAndCleanup(e);
    }
  });
    
  // Close modal on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !registerModal.classList.contains('hidden')) {
      closeRegisterModalAndCleanup(e);
    }
  });

  // 🔹 Toggle password visibility (using event listeners, no inline onclick)
  document.querySelectorAll('.toggle-password').forEach(toggle => {
    toggle.addEventListener('click', function() {
      // Find the input field in the same parent container
      const input = this.parentElement.querySelector('input');
      if (!input) return;
      const icon = this.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
        this.setAttribute('aria-pressed', 'true');
      } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
        this.setAttribute('aria-pressed', 'false');
      }
    });
  });

  // (Rest of the existing code for password validation, form submission, etc. remains the same)
  // ... [keep the rest of the function as it was in your original script]
}
  
  // Ensure validateEmail exists
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

  // function initSmoothScroll() {
  //   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  //     anchor.addEventListener('click', function (e) {
  //       e.preventDefault();
  //       const target = document.querySelector(this.getAttribute('href'));
  //       if (target) target.scrollIntoView({ behavior: 'smooth' });
  //     });
  //   });
  // }

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
    initRegisterModal();
    loadGoogleFonts();
    // initSmoothScroll();
    initSectionReveal();
    // togglePasswordVisibility();
  }

  init();
});





// ==================== CART FUNCTIONALITY ====================

// Global array to hold cart items (loaded from localStorage if available)
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

/**
 * Saves the current cartItems array to localStorage.
 */
function saveCart() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

/**
 * Converts a price string (e.g., "$125.00") into a float (125.00).
 */
function parsePrice(priceString) {
  // Remove any non-numeric or decimal characters (like $, commas, etc.)
  return parseFloat(priceString.replace(/[^0-9.-]+/g, '')) || 0;
}

/**
 * Adds a product to the cart.
 * @param {string} productName - The name of the product.
 * @param {string} productPrice - The price of the product.
 * @param {string} productImage - The path to the product image.
 * @param {Event} event - The event object (optional).
 */
function addToCart(productName, productPrice, productImage, event) {
  if (event) event.stopPropagation();

  // Validate required parameters
  if (!productName || !productPrice || !productImage) {
    console.error('addToCart: Missing product information:', productName, productPrice, productImage);
    return;
  }

  // Check if product is already in the cart
  const existingItemIndex = cartItems.findIndex(item => item.name === productName);
  if (existingItemIndex > -1) {
    cartItems[existingItemIndex].quantity++;
  } else {
    cartItems.push({
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1
    });
  }
  
  saveCart();
  updateCartUI();
  openCart();
}

/**
 * Calculates subtotal, shipping, tax, and total based on cartItems.
 */
function calculateCartSummary() {
  let subtotal = 0;
  cartItems.forEach(item => {
    const priceValue = parsePrice(item.price);
    subtotal += (priceValue * item.quantity);
  });
  // Example shipping & tax
  const shipping = cartItems.length > 0 ? 30.0 : 0; 
  const tax = subtotal * 0.08; 
  const total = subtotal + shipping + tax;
  return { subtotal, shipping, tax, total };
}

/**
 * Updates the cart panel UI based on cartItems array,
 * and updates totals in both the cart panel and checkout modal.
 */
function updateCartUI() {
  const cartContent = document.querySelector('#cart-panel .cart-content');
  const cartFooter = document.querySelector('#cart-panel .cart-footer');
  
  // Clear existing content
  cartContent.innerHTML = '';

  if (cartItems.length === 0) {
    cartContent.innerHTML = '<p>Your cart is empty.</p>';
    if (cartFooter) cartFooter.style.display = 'none';
  } else {
    if (cartFooter) cartFooter.style.display = 'block';
  }
  
  // Build cart item elements
  cartItems.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img"/>
      <div class="item-details">
        <h4>${item.name}</h4>
        <p>${item.price}</p>
        <div class="quantity-control">
          <button class="quantity-btn" onclick="decreaseQuantity('${item.name}')">-</button>
          <span> Qty: ${item.quantity} </span>
          <button class="quantity-btn" onclick="increaseQuantity('${item.name}')">+</button>
        </div>
      </div>
      <button class="remove-btn" onclick="removeFromCart('${item.name}')">Remove</button>
    `;
    cartContent.appendChild(itemDiv);
  });

  // Calculate totals
  const { subtotal, shipping, tax, total } = calculateCartSummary();

  // 1) Update totals in the cart panel
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartShippingEl = document.getElementById('cart-shipping');
  const cartTaxEl = document.getElementById('cart-tax');
  const cartTotalEl = document.getElementById('cart-total');

  if (cartSubtotalEl) cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (cartShippingEl) cartShippingEl.textContent = `$${shipping.toFixed(2)}`;
  if (cartTaxEl) cartTaxEl.textContent = `$${tax.toFixed(2)}`;
  if (cartTotalEl) cartTotalEl.textContent = `$${total.toFixed(2)}`;

  // 2) Update totals in the checkout modal
  const modalSubtotalEl = document.getElementById('checkoutModal-subtotal');
  const modalShippingEl = document.getElementById('checkoutModal-shipping');
  const modalTaxEl = document.getElementById('checkoutModal-tax');
  const modalTotalEl = document.getElementById('checkoutModal-total');

  if (modalSubtotalEl) modalSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (modalShippingEl) modalShippingEl.textContent = `$${shipping.toFixed(2)}`;
  if (modalTaxEl) modalTaxEl.textContent = `$${tax.toFixed(2)}`;
  if (modalTotalEl) modalTotalEl.textContent = `$${total.toFixed(2)}`;
}

/**
 * Increases the quantity of a product in the cart.
 */
function increaseQuantity(productName) {
  const index = cartItems.findIndex(item => item.name === productName);
  if (index > -1) {
    cartItems[index].quantity++;
    saveCart();
    updateCartUI();
  }
}

/**
 * Decreases the quantity of a product in the cart.
 */
function decreaseQuantity(productName) {
  const index = cartItems.findIndex(item => item.name === productName);
  if (index > -1) {
    cartItems[index].quantity--;
    if (cartItems[index].quantity <= 0) {
      cartItems.splice(index, 1);
    }
    saveCart();
    updateCartUI();
  }
}

/**
 * Removes a product from the cart.
 */
function removeFromCart(productName) {
  cartItems = cartItems.filter(item => item.name !== productName);
  saveCart();
  updateCartUI();
}

/**
 * Opens the cart panel.
 */
function openCart() {
  const cartPanel = document.getElementById('cart-panel');
  const cartOverlay = document.getElementById('cart-overlay');
  cartPanel.classList.remove('hidden');
  cartOverlay.classList.remove('hidden');
  cartPanel.classList.add('active');
  cartOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/**
 * Closes the cart panel.
 */
function closeCart() {
  const cartPanel = document.getElementById('cart-panel');
  const cartOverlay = document.getElementById('cart-overlay');
  cartPanel.classList.remove('active');
  cartOverlay.classList.remove('active');
  setTimeout(() => {
    cartPanel.classList.add('hidden');
    cartOverlay.classList.add('hidden');
  }, 400);
  document.body.style.overflow = '';
}

/**
 * Loads the cart items from localStorage on page load.
 */
function loadCart() {
  let storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  // Filter out any invalid items
  cartItems = storedItems.filter(item => item && item.name && item.price && item.image);
  saveCart();
  updateCartUI();
}

// Initialize cart on DOM load
window.addEventListener('DOMContentLoaded', loadCart);

// ==================== CHECKOUT MODAL FUNCTIONALITY ====================
(function() {
  let currentStep = 1;
  window.checkoutModal = {
    open: function() {
      document.getElementById('checkoutModal-overlay').classList.add('active');
      document.getElementById('checkoutModal').classList.add('active');
      this.goToStep(1);
    },
    close: function() {
      document.getElementById('checkoutModal-overlay').classList.remove('active');
      document.getElementById('checkoutModal').classList.remove('active');
    },
    goToStep: function(step) {
      currentStep = step;
      document.querySelectorAll('.checkoutModal-step').forEach(s => s.classList.remove('active'));
      document.querySelectorAll('.checkoutModal-stepIndicator').forEach(ind => ind.classList.remove('active'));
      const stepDiv = document.getElementById(`checkoutModal-step${step}`);
      if (stepDiv) stepDiv.classList.add('active');
      const indicator = document.querySelector(`.checkoutModal-stepIndicator[data-step="${step}"]`);
      if (indicator) indicator.classList.add('active');
      if (step === 3) this.fillReviewData();
    },

    /**
     * Validate Shipping Form (Step 1)
     */
    validateShippingForm: function() {
      const shippingForm = document.querySelector('#checkoutModal-step1 .checkoutModal-form');
      if (shippingForm.checkValidity()) {
        shippingForm.reportValidity(); // triggers any built-in messages if needed
        this.goToStep(2);
      } else {
        shippingForm.reportValidity();
      }
    },

    /**
     * Validate Payment Form (Step 2)
     */
    validatePaymentForm: function() {
      const paymentForm = document.querySelector('#checkoutModal-step2 .checkoutModal-form');
      if (paymentForm.checkValidity()) {
        paymentForm.reportValidity();
        this.goToStep(3);
      } else {
        paymentForm.reportValidity();
      }
    },

    fillReviewData: function() {
      const shippingHTML = `
        <h4>Shipping Details</h4>
        <p><strong>Name:</strong> ${document.getElementById('checkoutModal-firstName').value} ${document.getElementById('checkoutModal-lastName').value}</p>
        <p><strong>Email:</strong> ${document.getElementById('checkoutModal-email').value}</p>
        <p><strong>Phone:</strong> ${document.getElementById('checkoutModal-phone').value}</p>
        <p><strong>Address:</strong> ${document.getElementById('checkoutModal-address').value}, 
          ${document.getElementById('checkoutModal-city').value}, 
          ${document.getElementById('checkoutModal-state').value} 
          ${document.getElementById('checkoutModal-zip').value}
        </p>
      `;
      document.getElementById('checkoutModal-shippingReview').innerHTML = shippingHTML;
      
      const paymentMethod = document.querySelector('input[name="checkoutModal-paymentMethod"]:checked')?.value || 'N/A';
      const paymentHTML = `
        <h4>Payment Details</h4>
        <p><strong>Method:</strong> ${paymentMethod}</p>
      `;
      document.getElementById('checkoutModal-paymentReview').innerHTML = paymentHTML;
    },

    validateShippingForm: function() {
      const shippingForm = document.querySelector('#checkoutModal-step1 .checkoutModal-form');
      if (shippingForm.checkValidity()) {
        shippingForm.reportValidity();
        this.goToStep(2);
      } else {
        shippingForm.reportValidity();
      }
    },

    validatePaymentForm: function() {
      const paymentForm = document.querySelector('#checkoutModal-step2 .checkoutModal-form');
      if (paymentForm.checkValidity()) {
        paymentForm.reportValidity();
        this.goToStep(3);
      } else {
        paymentForm.reportValidity();
      }
    },

    placeOrder: function() {
      // Move to success screen
      this.goToStep(4);
      // Optionally clear the cart or do further logic here
      // cartItems = [];
      // saveCart();
      // updateCartUI();
    }
  };
})();
