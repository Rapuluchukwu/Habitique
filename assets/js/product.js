
// Navigate to product page
function goToProductPage() {
  window.location.href = "OfficeProduct-details.html";
}

// Update quantity: updates both the displayed value and the cart in localStorage.
function updateQuantity(button, change, productId) {
  const input = document.querySelector(`input[data-id="${productId}"]`);
  let currentValue = parseInt(input.value, 10);
  currentValue += change;
  if (currentValue < 1) currentValue = 1;
  input.value = currentValue;

  // Update the cart in localStorage.
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = cart.find(item => item.id === productId);
  if (product) {
    product.quantity = currentValue;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartSummary();
  }
}

// Update cart summary by computing subtotal and total from the cart items.
function updateCartSummary() {
  const summaryContainer = document.querySelector('.cart-summary');
  if (!summaryContainer) return;
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let subtotal = 0;
  cart.forEach(product => {
    subtotal += product.price * product.quantity;
  });
  let total = subtotal; // Adjust if you plan to include taxes or shipping.
  summaryContainer.innerHTML = `
    <div class="summary-row">
      <span>Subtotal</span>
      <span>$${subtotal.toFixed(2)}</span>
    </div>
    <div class="summary-row total">
      <span>Total</span>
      <span>$${total.toFixed(2)}</span>
    </div>
  `;
}

// When the DOM is ready, attach listeners and load dynamic content.
document.addEventListener('DOMContentLoaded', function() {
  // If on product detail page, set up the add-to-cart functionality.
  const addToCartBtn = document.querySelector('.add-to-cart-button');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
      // Gather product details from the page.
      const productTitle = document.querySelector('.product-title').innerText;
      const productPriceText = document.querySelector('.sale-price').innerText;
      // Parse price as a number.
      const productPrice = parseFloat(productPriceText.replace(/[^0-9\.]+/g, ""));
      const productImage = document.querySelector('.product-gallery .main-image img').src;
      // For demonstration, use a timestamp as a unique ID.
      const productId = Date.now().toString();
      
      // Create a product object.
      const product = {
        id: productId,
        title: productTitle,
        price: productPrice,
        image: productImage,
        quantity: 1
      };

      // Retrieve existing cart (or initialize as an empty array).
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      // Check if the product already exists in the cart (using title here for demo).
      const existingProduct = cart.find(item => item.title === productTitle);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push(product);
      }

      // Save the updated cart and redirect to the cart page.
      localStorage.setItem('cart', JSON.stringify(cart));
      window.location.href = 'cart.html';
    });
  }

  // If on the cart page, dynamically load cart items and update the summary.
  const cartItemsContainer = document.querySelector('.cart-items');
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = '';
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach(product => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <div class="item-image">
          <img src="${product.image}" alt="${product.title}" />
        </div>
        <div class="item-details">
          <h2 class="item-name">${product.title}</h2>
          <div class="item-price">$${product.price.toFixed(2)}</div>
          <div class="item-quantity">
            <button class="quantity-btn" onclick="updateQuantity(this, -1, '${product.id}')">-</button>
            <input type="number" class="quantity-input" value="${product.quantity}" min="1" data-id="${product.id}" />
            <button class="quantity-btn" onclick="updateQuantity(this, 1, '${product.id}')">+</button>
          </div>
          <!-- <div class="item-notes">
            <input type="text" placeholder="Eg: Please double check before packing." />
          </div> -->
        </div>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
    updateCartSummary();
  }
});