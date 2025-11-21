// ===================================
// HIVPD_23 Research Project - Main JavaScript
// ===================================

(function() {
  'use strict';

  // ===================================
  // DOM Elements
  // ===================================

  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const themeToggle = document.getElementById('themeToggle');
  const backToTop = document.getElementById('backToTop');
  const chartControls = document.querySelectorAll('.chart-btn');
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  const expandButtons = document.querySelectorAll('.expand-btn');

  // ===================================
  // Navigation Scroll Effect
  // ===================================

  function handleScroll() {
    // Add scrolled class to navbar
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Show/hide back to top button
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
  }

  // ===================================
  // Update Active Navigation Link
  // ===================================

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ===================================
  // Smooth Scrolling for Navigation Links
  // ===================================

  function initSmoothScroll() {
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });

          // Close mobile menu if open
          if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
          }
        }
      });
    });
  }

  // ===================================
  // Mobile Navigation Toggle
  // ===================================

  function initMobileNav() {
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
          navMenu.classList.remove('active');
          navToggle.classList.remove('active');
        }
      });
    }
  }

  // ===================================
  // Theme Toggle (Dark/Light Mode)
  // ===================================

  function initThemeToggle() {
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
      });
    }
  }

  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    }
  }

  // ===================================
  // Back to Top Button
  // ===================================

  function initBackToTop() {
    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  // ===================================
  // Animated Counters
  // ===================================

  function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  }

  function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animated');
          animateCounter(entry.target);
        }
      });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
  }

  // ===================================
  // Chart View Switching
  // ===================================

  function initChartControls() {
    chartControls.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        chartControls.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        // Hide all chart views
        const chartViews = document.querySelectorAll('.chart-view');
        chartViews.forEach(view => view.classList.remove('active'));

        // Show selected chart view
        const chartType = button.getAttribute('data-chart');
        const selectedView = document.getElementById(`${chartType}-view`);
        if (selectedView) {
          selectedView.classList.add('active');
        }
      });
    });
  }

  // ===================================
  // Accordion Functionality
  // ===================================

  function initAccordion() {
    accordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        const isActive = accordionItem.classList.contains('active');

        // Toggle current item
        accordionItem.classList.toggle('active');

        // Optional: Close other accordion items (comment out for multiple open)
        // accordionHeaders.forEach(otherHeader => {
        //   if (otherHeader !== header) {
        //     otherHeader.parentElement.classList.remove('active');
        //   }
        // });
      });
    });
  }

  // ===================================
  // Expandable Criteria Items
  // ===================================

  function initExpandButtons() {
    expandButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const criteriaItem = button.closest('.criteria-item');
        criteriaItem.classList.toggle('expanded');
      });
    });
  }

  // ===================================
  // Load Demographics Data
  // ===================================

  async function loadDemographicsData() {
    try {
      const response = await fetch('data/demographics.json');
      const data = await response.json();

      // Update total participants
      const totalElement = document.getElementById('totalParticipants');
      if (totalElement) {
        totalElement.textContent = data.totalParticipants;
      }

      // Populate sites table
      populateSitesTable(data.siteLocations);

      return data;
    } catch (error) {
      console.error('Error loading demographics data:', error);
      return null;
    }
  }

  // ===================================
  // Populate Sites Table
  // ===================================

  function populateSitesTable(sites) {
    const tableBody = document.getElementById('sitesTableBody');
    if (!tableBody || !sites) return;

    tableBody.innerHTML = '';

    sites.forEach(site => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${site.site}</td>
        <td>${site.city}</td>
        <td><strong>${site.participants}</strong></td>
        <td><span class="status-badge">${site.status}</span></td>
      `;
      tableBody.appendChild(row);
    });
  }

  // ===================================
  // Intersection Observer for Animations
  // ===================================

  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.goal-card, .stat-card, .data-card, .funder-card');

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(element);
    });
  }

  // ===================================
  // Keyboard Navigation Support
  // ===================================

  function initKeyboardNav() {
    // Allow keyboard navigation for accordion
    accordionHeaders.forEach(header => {
      header.setAttribute('role', 'button');
      header.setAttribute('tabindex', '0');

      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          header.click();
        }
      });
    });

    // Allow keyboard navigation for chart controls
    chartControls.forEach(button => {
      button.setAttribute('tabindex', '0');
    });

    // Allow keyboard navigation for expand buttons
    expandButtons.forEach(button => {
      button.setAttribute('tabindex', '0');

      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          button.click();
        }
      });
    });
  }

  // ===================================
  // Handle External Link Security
  // ===================================

  function secureExternalLinks() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
      // Add security attributes if not already present
      if (!link.getAttribute('rel')) {
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  // ===================================
  // Loading Animation
  // ===================================

  function hideLoadingAnimation() {
    // Add a loading screen if needed
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 300);
    }
  }

  // ===================================
  // Error Handling for Failed Loads
  // ===================================

  function handleLoadError(error) {
    console.error('Failed to load resource:', error);
    // You could show a user-friendly error message here
  }

  // ===================================
  // Initialize All Functions
  // ===================================

  async function init() {
    try {
      // Load data first
      await loadDemographicsData();

      // Initialize all interactive features
      initSmoothScroll();
      initMobileNav();
      initThemeToggle();
      initBackToTop();
      initCounters();
      initChartControls();
      initAccordion();
      initExpandButtons();
      initScrollAnimations();
      initKeyboardNav();
      secureExternalLinks();

      // Add scroll event listener
      window.addEventListener('scroll', handleScroll, { passive: true });

      // Initial scroll check
      handleScroll();

      // Hide loading animation
      hideLoadingAnimation();

      console.log('HIVPD_23 website initialized successfully');
    } catch (error) {
      handleLoadError(error);
    }
  }

  // ===================================
  // Start when DOM is ready
  // ===================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ===================================
  // Handle Window Resize
  // ===================================

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Close mobile menu on resize to desktop
      if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    }, 250);
  }, { passive: true });

})();
