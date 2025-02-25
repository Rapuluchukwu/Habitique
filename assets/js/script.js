// Toggle dropdown menus
function toggleDropdown(element) {
  // Get the parent list item
  const parentLi = element.parentElement;

  // Get the dropdown submenu (next element after the link)
  const dropdown = parentLi.querySelector('.dropdown');

  // Toggle dropdown-open class on the parent li
  parentLi.classList.toggle('dropdown-open');

  // Toggle show class on the dropdown
  dropdown.classList.toggle('show');

  // Close any other open dropdowns at the same level
  const siblingItems = parentLi.parentElement.children;
  for (let i = 0; i < siblingItems.length; i++) {
    const sibling = siblingItems[i];
    if (sibling !== parentLi && sibling.classList.contains('dropdown-open')) {
      sibling.classList.remove('dropdown-open');
      sibling.querySelector('.dropdown').classList.remove('show');
    }
  }

  // Prevent event from bubbling up
  event.stopPropagation();
  return false;
}

// Show sidebar
function showSidebar() {
  document.querySelector('.sidebar').classList.add('active');
  document.querySelector('.sidebar-overlay').classList.add('active');

  // Determine which sidebar content to show based on screen width
  if (window.innerWidth < 768) {
    document.querySelector('.sidebar-mobile').style.display = 'block';
    document.querySelector('.sidebar-tablet').style.display = 'none';
  } else {
    document.querySelector('.sidebar-mobile').style.display = 'none';
    document.querySelector('.sidebar-tablet').style.display = 'block';
  }
}

// Hide sidebar
function hideSidebar() {
  document.querySelector('.sidebar').classList.remove('active');
  document.querySelector('.sidebar-overlay').classList.remove('active');
}

// Close dropdowns when clicking outside
document.addEventListener('click', function (event) {
  // Close all dropdowns when clicking outside
  const dropdowns = document.querySelectorAll('.dropdown.show');
  const dropdownParents = document.querySelectorAll('.dropdown-open');

  if (!event.target.closest('.has-dropdown')) {
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('show');
    });

    dropdownParents.forEach(parent => {
      parent.classList.remove('dropdown-open');
    });
  }
});

// Update sidebar display on window resize
window.addEventListener('resize', function () {
  if (document.querySelector('.sidebar').classList.contains('active')) {
    if (window.innerWidth < 768) {
      document.querySelector('.sidebar-mobile').style.display = 'block';
      document.querySelector('.sidebar-tablet').style.display = 'none';
    } else if (window.innerWidth < 1024) {
      document.querySelector('.sidebar-mobile').style.display = 'none';
      document.querySelector('.sidebar-tablet').style.display = 'block';
    } else {
      // On large screens, hide the sidebar completely
      hideSidebar();
    }
  }
});


// Carousel functionality
document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;

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

  // Auto-advance slides
  let slideInterval = setInterval(() => {
    changeSlide(currentSlide + 1);
  }, 5000); // Change slide every 5 seconds

  // Pause auto-advance when interacting with carousel
  const carousel = document.querySelector('.carousel');
  carousel.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });

  carousel.addEventListener('mouseleave', () => {
    slideInterval = setInterval(() => {
      changeSlide(currentSlide + 1);
    }, 5000);
  });
});


// Simple JavaScript to enhance interactivity
document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('click', function () {
      const category = this.classList[1];
      console.log(`User clicked on ${category.replace('-', ' ')}`);
      // Here you could add navigation to category pages
      // window.location.href = `/${category}.html`;
    });
  });
});


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
              image: "assets/images/Chair-group1-pink.jpg"
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
              image: "assets/images/Chair-group2-blue.jpg"
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
              image: "assets/images/Chair-group3-navy.jpg"
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

// Duplicate items for second row
const secondRowItems = itemData.map(item => {
  return {
      ...item,
      id: item.id + 100 // Add 100 to create new IDs for second row
  };
});

const allItems = [...itemData, ...secondRowItems];

// Function to show products
function showItems() {
  const itemsContainer = document.getElementById('shopItems');
  
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

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
  showItems();
});