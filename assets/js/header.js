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
          <li><a href="blog-index.html">Blogs</a></li>
          <li><a href="#">Decors</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="contact.html">Contact us</a></li>
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
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>Favorites</span>
            </a>
          </div>
          <div class="icon cart-icon">
            <a href="cart.html">
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
          <li><a href="blog-index.html">Blog</a></li>
          <li><a href="#">Decors</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="contact.html">Contact us</a></li>
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
            <a href="#">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span>Favorites</span>
            </a>
          </div>
          <div class="icon cart-icon">
            <a href="cart.html">
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
            Don't have an account? <a href="#">Register here</a>
          </div>
        </div>
      </div>
    </div>
  </header>
`);

// /*--------------------------------------------------
//   Modal Functionality
// --------------------------------------------------*/
// function openSigninModal() {
//   const modal = document.getElementById('signin-modal');
//   if (modal) {
//     modal.classList.remove('hidden');
//     // You can add code here to disable page scrolling if desired.
//   }
// }

// function closeSigninModal() {
//   const modal = document.getElementById('signin-modal');
//   if (modal) {
//     modal.classList.add('hidden');
//     // Re-enable scrolling here if you disabled it.
//   }
// }

// /* Bind event to all login icons (desktop and sidebar) */
// document.querySelectorAll('.login-icon a').forEach(icon => {
//   icon.addEventListener('click', function(e) {
//     e.preventDefault();
//     openSigninModal();
//   });
// });

// /* Bind close events */
// const closeBtn = document.getElementById('closeModal');
// if (closeBtn) {
//   closeBtn.addEventListener('click', function(e) {
//     e.preventDefault();
//     closeSigninModal();
//   });
// }
// window.addEventListener('click', function(e) {
//   const modal = document.getElementById('signin-modal');
//   if (e.target === modal) {
//     closeSigninModal();
//   }
// });
