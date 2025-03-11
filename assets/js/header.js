
document.write(`
  <header>
    <!-- Main Navigation -->
    <nav class="main-nav">
      <!-- Left: Logo (always visible) -->
      <div class="nav-left">
        <a href="index.html" class="logo" id="logo">
          <span class="logo-brown">HABITI</span><span class="logo-white">QUE</span>
        </a>
      </div>

      <!-- Center: Nav Links -->
      <div class="nav-center" id="home">
        <ul class="nav-links">
          <li><a href="blog-index.html">Blogs</a></li>
          <li class="has-dropdown">
            <a href="javascript:void(0);" class="dropdown-toggle">
              Catalog <span class="arrow-icon"></span>
            </a>
            <ul class="dropdown">
              <li class="has-dropdown">
                <a href="javascript:void(0);" class="dropdown-toggle">
                  Furniture <span class="arrow-icon"></span>
                </a>
                <ul class="dropdown">
                  <li class="has-dropdown">
                    <a href="javascript:void(0);" class="dropdown-toggle">
                      Home Furniture <span class="arrow-icon"></span>
                    </a>
                    <ul class="dropdown">
                      <li><a href="">Bedroom Furniture</a></li>
                      <li><a href="">Sitting room Furniture</a></li>
                      <li><a href="">Kitchen Furniture</a></li>
                      <li><a href="">Dining Furniture</a></li>
                      <li><a href="">Bathroom Furniture</a></li>
                      <li><a href="">Front Porch Furniture</a></li>
                    </ul>
                  </li>
                  <li><a href="#">Office Furniture</a></li>
                </ul>
              </li>
              <li class="has-dropdown">
                <a href="javascript:void(0);" class="dropdown-toggle">
                  Decors <span class="arrow-icon"></span>
                </a>
                <ul class="dropdown">
                  <li><a href="#">Home Decors</a></li>
                  <li><a href="#">Office Decors</a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li><a href="about.html">About</a></li>
          <li><a href="contact.html">Contact us</a></li>
        </ul>
      </div>

      <!-- Search Bar -->
      <div class="nav-search">
        <input type="text" placeholder="I'm looking for.... " class="search-input">
        <button class="search-btn">
          <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="currentColor">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </button>
      </div>

      <!-- Right: Icons and Hamburger -->
      <div class="nav-right">
        <!-- Right icons (Login, Favorites & Cart) -->
        <div class="right-icons">
          <div id="openSigninModal" class="icon login-icon">
            <a href="">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor">
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <span>Login</span>
            </a>
          </div>
          <div class="icon favorite-icon">
            <a href="">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor">
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>Favorites</span>
            </a>
          </div>
          <div class="icon cart-icon">
            <a href="">
              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor">
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
              <span>Shop</span>
            </a>
          </div>
        </div>

        <!-- Hamburger icon (shown on tablet and mobile only) -->
        <div class="hamburger">
          <a href="javascript:void(0);">
            <svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 0 24 24" width="26" fill="currentColor">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </a>
        </div>
      </div>
    </nav>

    <!-- Sidebar Navigation -->
    <nav class="sidebar">
      <div class="sidebar-header">
        <a href="index.html" class="logo">
          <span class="logo-brown">HABITI</span><span class="logo-white">QUE</span>
        </a>
        <!-- Close Button -->
        <div class="close-btn">
          <a href="javascript:void(0);">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" fill="currentColor">
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </a>
        </div>
      </div>
      <div class="sidebar-content">
        <div class="sidebar-search">
          <input type="text" placeholder="I'm looking for.... " class="search-input1">
          <button class="search-btn2">
            <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" fill="currentColor">
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>
        </div>
        <!-- Sidebar Menu -->
        <ul class="sidebar-menu">
          <li><a href="blog-index.html">Blog</a></li>
          <li class="has-dropdown">
            <a href="javascript:void(0);" class="dropdown-toggle">
              Catalog <span class="arrow-icon"></span>
            </a>
            <ul class="dropdown">
              <li class="has-dropdown">
                <a href="javascript:void(0);" class="dropdown-toggle">
                  Furniture <span class="arrow-icon"></span>
                </a>
                <ul class="dropdown">
                  <li class="has-dropdown">
                    <a href="javascript:void(0);" class="dropdown-toggle">
                      Home Furniture <span class="arrow-icon"></span>
                    </a>
                    <ul class="dropdown">
                      <li><a href="">Bedroom Furniture</a></li>
                      <li><a href="">Sitting room Furniture</a></li>
                      <li><a href="">Kitchen Furniture</a></li>
                      <li><a href="">Dining Furniture</a></li>
                      <li><a href="">Bathroom Furniture</a></li>
                      <li><a href="">Front Porch Furniture</a></li>
                    </ul>
                  </li>
                  <li><a href="#">Office Furniture</a></li>
                </ul>
              </li>
              <li class="has-dropdown">
                <a href="javascript:void(0);" class="dropdown-toggle">
                  Decors <span class="arrow-icon"></span>
                </a>
                <ul class="dropdown">
                  <li><a href="#">Home Decors</a></li>
                  <li><a href="#">Office Decors</a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li><a href="about.html">About</a></li>
          <li><a href="contact.html">Contact us</a></li>
        </ul>
      </div>
    </nav>
    <!-- Add overlay div for sidebar -->
    <div class="sidebar-overlay"></div>





         <!-- Sign In Modal (hidden by default) -->
  <div id="signin-modal" class="modal hidden">
    <button class="close-modal" id="closeModal">&times;</button>
    <div class="modal-content">
      <!-- Left Section: Image -->
      <div class="image-section">
        <div class="logo"><span>HABITI</span>QUE</div>
        <img src="assets/images/Sign-in-Image.jpg" alt="Interior design with comfortable chairs">
      </div>
      <!-- Right Section: Sign In Form -->
      <div class="form-section">
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
            SIGN IN <span class="right-arrow">→</span>
          </button>
        </form>
        <div class="register-link">
          Don't have an account? <a href="#"  >Register here</a>
        </div>
      </div>
    </div>
  </div>



  <!-- Register form-->
  
  </header>
  `);