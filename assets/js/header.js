document.write(`
  <header>
    <!-- Main Navigation -->
    <nav class="main-nav">
      <!-- Left: Logo (always visible) -->
      <div class="nav-left">
        <a href="index.html" class="logo header-logo">
          <span class="logo-brown">HABITI</span><span class="logo-white">QUE</span>
        </a>
      </div>
      
      <!-- Center: Navigation Links -->
      <div class="nav-center" id="home">
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="blog-index.html">Blogs</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      
      <!-- Right: Desktop Icons and Hamburger -->
      <div class="nav-right">
        <!-- Desktop Right Icons -->
        <div class="right-icons">
          <div class="icon login-icon">
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <span>Login</span>
            </a>
          </div>
          <div class="icon favorite-icon">
            <a href="#" onclick="openWishlistModal(event)">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>Favorites</span>
            </a>
          </div>
          <div class="icon cart-icon" onclick="openCart()">
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
              <span>Cart</span>
            </a>
          </div>
        </div>
        <!-- Hamburger Icon (visible on tablet and mobile) -->
        <div class="hamburger">
          <a href="javascript:void(0);">
            <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" fill="currentColor" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
            <span>Menu</span>
          </a>
        </div>
      </div>
    </nav>
    
    <!-- Sidebar Navigation -->
    <nav class="sidebar">
      <div class="sidebar-header">
        <a href="index.html" class="logo sidebar-logo">
          <span class="logo-brown">HABITI</span><span class="logo-white">QUE</span>
        </a>
        <div class="close-btn">
          <a href="javascript:void(0);">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
              <span>Close</span>
              </a>
        </div>
      </div>
      <div class="sidebar-content">
        <ul class="sidebar-menu">
          <li><a href="index.html">Home</a></li> 
          <li><a href="blog-index.html">Blog</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
        <!-- Mobile Navigation Icons -->
        <div class="mobile-nav-right">
          <div class="icon login-icon">
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <span>Login</span>
            </a>
          </div>
          <div class="icon favorite-icon">
            <a href="#" onclick="openWishlistModal(event)">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>Favorites</span>
            </a>
          </div>
          <div class="icon cart-icon" onclick="openCart()">
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
              <span>Cart</span>
            </a>
          </div>
                       <div class="sdebarFooter-icons">
               <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
               <a href="https://instagram.com/habitique"><i class="fa-brands fa-instagram"></i></a>
               <a href="https://pinterest.com/habitique"><i class="fa-brands fa-pinterest-p"></i></a>
               <a href="https://X.com/habitique"><i class="fa-brands fa-twitter"></i></a>
               <a href="https://youTube.com/habitique"><i class="fa-brands fa-youtube"></i></a>
             </div>
           </div>
        </div>
      </div>
    </nav>
    
    <!-- Sign In Modal -->
    <div id="signin-modal" class="modal hidden">
      <div class="modal-content">
        <div class="image-section">
          <a href="index.html" class="logo modal-logo">
            <span class="logo-brown">HABITI</span><span class="logo-white">QUE</span>
          </a>
          <img src="assets/images/Sign-in-Image.jpg" alt="Interior design with comfortable chairs">
        </div>
        <div class="form-section">
          <button class="close-modal" id="closeModal">&times;</button>
          <h1>SIGN IN</h1>
          <form id="signin-form">
            <label for="email">EMAIL</label>
            <input type="email" id="email" placeholder="example@mail.com" required>
            <div id="email-error" class="error-message">Please enter a valid email address</div>
            <label for="password">PASSWORD</label>
            <div class="password-container">
              <input type="password" id="password" placeholder="********" required>
              <span class="toggle-password" onclick="togglePasswordVisibility('password', this)">
                <i class="fa-solid fa-eye"></i>
              </span>
            </div>
            <div id="password-error" class="error-message">Please enter your password</div>
            <button type="submit" id="submit-btn">
              SIGN IN <span class="right-arrow">→  </span>
            </button>
          </form>
        <div class="register-link">
          Don't have an account? <a href="#" id="open-register-modal"><i class="fa-solid fa-right-to-bracket"></i> Register</a>
        </div>

        </div>
      </div>
    </div>
  </header>


<!-- Register Modal -->
<div id="register-modal" class="modal hidden">
      <div class="modal-content">
        <div class="image-section">
          <a href="index.html" class="logo modal-logo">
            <span class="logo-brown">HABITI</span><span class="logo-white">QUE</span>
          </a>
          <img src="assets/images/RegisterImg.webp"alt="Interior design with modern furniture">
        </div>
        <div class="form-section">
          <button class="close-modal" id="closeRegisterModal">&times;</button>
          <!-- <h1>REGISTER</h1> -->
          <form id="register-form">
            <label for="full-name">FULL NAME</label>
            <input type="text" id="full-name" placeholder="John Doe" required>
            <div id="name-error" class="error-message">Please enter your full name</div>

            <label for="register-email">EMAIL</label>
            <input type="email" id="register-email" placeholder="example@mail.com" required>
            <div id="register-email-error" class="error-message">Please enter a valid email address</div>

            <label for="register-password">PASSWORD</label>
            <div class="password-container">
              <input type="password" id="register-password" placeholder="********" required>
              <span class="toggle-password" onclick="togglePasswordVisibility('register-password', this)">
                <i class="fa-solid fa-eye"></i>
              </span>
            </div>
            <div id="register-password-error" class="error-message">Please create a strong password</div>

            <label for="confirm-password">CONFIRM PASSWORD</label>
            <div class="password-container">
              <input type="password" id="confirm-password" placeholder="********" required>
              <span class="toggle-password" onclick="togglePasswordVisibility('confirm-password', this)">
                <i class="fa-solid fa-eye"></i>
              </span>
            </div>
            <div id="confirm-password-error" class="error-message">Passwords do not match</div>

            <button type="submit" id="register-submit-btn">
              REGISTER <span class="right-arrow">→</span>
            </button>
          </form>
          <div class="login-link">
            Already have an account? 
            <a href="#" id="open-login-modal">
              <i class="fa-solid fa-right-to-bracket"></i> Sign In
            </a>
          </div>
        </div>
      </div>
    </div>





    <!-- Wishlist Overlay -->
    <div id="wishlist-overlay" class="hidden"></div>
    
    <!-- Wishlist Panel -->
    <div id="wishlist-panel" class="hidden">
      <div class="wishlist-header">
        <h2>Your Wish List</h2>
        <button onclick="closeWishlistModal()">× </button>
      </div>
      <div class="wishlist-content">
        <!-- Wishlist items will be injected here -->
      </div>
      <div class="wishlist-footer">
        <!-- Additional footer content if needed -->
      </div>
    </div>

<!-- Cart Overlay -->
<div id="cart-overlay" class="cart-overlay hidden" onclick="closeCart()"></div>

<!-- Cart Panel -->
<div id="cart-panel" class="cart-panel hidden">
  <div class="cart-header">
    <h2>Your Cart</h2>
    <button class="close-btn" onclick="closeCart()">&times;</button>
  </div>
  <div class="cart-content">
    <p>Your cart is empty.</p>
  </div>
  <div class="cart-footer">
    <div class="cart-summary">
      <p>Subtotal: <span id="cart-subtotal">$0.00</span></p>
      <p>Shipping: <span id="cart-shipping">$0.00</span></p>
      <p>Tax: <span id="cart-tax">$0.00</span></p>
      <hr>
      <p class="total">Total: <span id="cart-total">$0.00</span></p>
    </div>
    <button class="checkout-btn" onclick="checkoutModal.open()">Checkout</button>
  </div>
</div>

<!-- ==================== CHECKOUT MODAL ==================== -->
<div id="checkoutModal-overlay" class="checkoutModal-overlay" onclick="checkoutModal.close()"></div>

<div id="checkoutModal" class="checkoutModal">
  <!-- Close Button (X) -->
  <button class="checkoutModal-close" onclick="checkoutModal.close()">&times;</button>

  <!-- Steps Indicator -->


  <!-- Step 1: Shipping Information -->
  <div class="checkoutModal-step" id="checkoutModal-step1">
    <h2>Ship ping Information</h2>
    <form onsubmit="return false;" class="checkoutModal-form">
      <div class="checkoutModal-formGroup">
        <label for="checkoutModal-firstName">First Name</label>
        <input type="text" id="checkoutModal-firstName" required>
      </div>
      <div class="checkoutModal-formGroup">
        <label for="checkoutModal-lastName">Last Name</label>
        <input type="text" id="checkoutModal-lastName" required>
      </div>
      <div class="checkoutModal-formGroup">
        <label for="checkoutModal-email">Email Address</label>
        <input type="email" id="checkoutModal-email" required>
      </div>
      <div class="checkoutModal-formGroup">
        <label for="checkoutModal-phone">Phone Number</label>
        <input type="tel" id="checkoutModal-phone" required>
      </div>
      <div class="checkoutModal-formGroup">
        <label for="checkoutModal-address">Street Address</label>
        <input type="text" id="checkoutModal-address" required>
      </div>
      <div class="checkoutModal-formGroup">
        <label for="checkoutModal-city">City</label>
        <input type="text" id="checkoutModal-city" required>
      </div>
      <div class="checkoutModal-formGroup">
        <label for="checkoutModal-state">State</label>
        <input type="text" id="checkoutModal-state" required>
      </div>
      <div class="checkoutModal-formGroup">
        <label for="checkoutModal-zip">ZIP Code</label>
        <input type="text" id="checkoutModal-zip" required>
      </div>
      <!-- Instead of goToStep(2), we validate the form first -->
      <button type="button" class="checkoutModal-btnPrimary" onclick="checkoutModal.validateShippingForm()">
        Continue to Payment
      </button>
    </form>
  </div>

  <!-- Step 2: Payment Information -->
  <div class="checkoutModal-step" id="checkoutModal-step2">
    <h2>Payment Information</h2>
    <form onsubmit="return false;" class="checkoutModal-form">
      <div class="checkoutModal-formGroup">
        <label>Select your payment method:</label>
        <div class="checkoutModal-paymentOptions">
          <label>
            <input type="radio" name="checkoutModal-paymentMethod" value="Credit Card" checked required> 
            <span>Credit/Debit Card</span>
          </label>
          <label>
            <input type="radio" name="checkoutModal-paymentMethod" value="PayPal" required> 
            <span>PayPal</span>
          </label>
          <label>
            <input type="radio" name="checkoutModal-paymentMethod" value="Bank Transfer" required> 
            <span>Bank Transfer</span>
          </label>
        </div>
      </div>
      <!-- Example if you want more fields: 
      <div class="checkoutModal-formGroup">
        <label for="checkoutModal-cardNumber">Card Number</label>
        <input type="text" id="checkoutModal-cardNumber" required>
      </div>
      -->
      <button type="button" class="checkoutModal-btnSecondary" onclick="checkoutModal.goToStep(1)">Back</button>
      <!-- Instead of goToStep(3), we validate the Payment form first -->
      <button type="button" class="checkoutModal-btnPrimary" onclick="checkoutModal.validatePaymentForm()">
        Continue to Review
      </button>
    </form>
  </div>

  <!-- Step 3: Review Order -->
  <div class="checkoutModal-step" id="checkoutModal-step3">
    <h2>Review Your Order</h2>
    <p>Please confirm your details and click "Place Order".</p>
    <div class="checkoutModal-summary">
      <div id="checkoutModal-shippingReview" class="checkoutModal-reviewSection">
        <!-- Shipping details will be populated here -->
      </div>
      <div id="checkoutModal-paymentReview" class="checkoutModal-reviewSection">
        <!-- Payment details will be populated here -->
      </div>
    </div>
    <button type="button" class="checkoutModal-btnSecondary" onclick="checkoutModal.goToStep(2)">Back</button>
    <button type="button" class="checkoutModal-btnPrimary" onclick="checkoutModal.placeOrder()">Place Order</button>
  </div>

  <!-- Step 4: Success Screen -->
  <div class="checkoutModal-step" id="checkoutModal-step4">
    <div class="checkoutModal-success">
      <div class="checkoutModal-successIcon">✔</div>
      <h2>PAYMENT SUCCESS!</h2>
      <p>Your order has been placed successfully. We’ll get your items shipped ASAP!</p>
      <button class="checkoutModal-btnPrimary" onclick="checkoutModal.close()">Back to Home</button>
    </div>
  </div>

  <!-- Optional: Cart Summary -->
  <div class="checkoutModal-cartSummary">
    <h3>Your Cart</h3>
    <div id="checkoutModal-cartItems"></div>
    <hr>
    <p>Subtotal: <span id="checkoutModal-subtotal">$0.00</span></p>
    <p>Shipping: <span id="checkoutModal-shipping">$0.00</span></p>
    <p>Tax: <span id="checkoutModal-tax">$0.00</span></p>
    <strong>Total: <span id="checkoutModal-total">$0.00</span></strong>
  </div>
</div>
<!-- ==================== END CHECKOUT MODAL ==================== -->



 `);