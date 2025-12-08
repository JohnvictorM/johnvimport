/* ------------------------------------------------
   ✅ TYPING TAGLINE ANIMATION
-------------------------------------------------*/
const taglines = [
  "Innovating. Leading. Transforming.",
  "Building the Future.",
  "Empowering Growth.",
  "Driving Digital Excellence."
];

let taglineIndex = 0;
let charIndex = 0;
let currentText = "";

function type() {
  const typedText = document.getElementById("typed-text");
  if (!typedText) return;
  
  if (charIndex < taglines[taglineIndex].length) {
    currentText += taglines[taglineIndex].charAt(charIndex);
    typedText.textContent = currentText;
    charIndex++;
    setTimeout(type, 90);
  } else {
    setTimeout(erase, 2000);
  }
}

function erase() {
  const typedText = document.getElementById("typed-text");
  if (!typedText) return;
  
  if (charIndex > 0) {
    currentText = currentText.slice(0, -1);
    typedText.textContent = currentText;
    charIndex--;
    setTimeout(erase, 50);
  } else {
    taglineIndex = (taglineIndex + 1) % taglines.length;
    setTimeout(type, 500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, 1000);
});

/* ------------------------------------------------
   ✅ SCROLL FADE-IN ANIMATION
-------------------------------------------------*/
const faders = document.querySelectorAll(".fade-in");
const appearOptions = { 
  threshold: 0.15,  // Lower threshold for mobile
  rootMargin: "0px 0px -50px 0px"  // Trigger slightly before element is fully visible
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

/* ------------------------------------------------
   ✅ BACK TO TOP BUTTON (Mobile Optimized)
-------------------------------------------------*/
const backToTop = document.getElementById("backToTop");

if (backToTop) {
  // Show button after scrolling 200px on mobile, 300px on desktop
  const scrollThreshold = window.innerWidth <= 768 ? 200 : 300;
  
  window.addEventListener("scroll", () => {
    if (window.scrollY > scrollThreshold) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* ------------------------------------------------
   ✅ SMOOTH SCROLL FOR NAV LINKS (Mobile Fix)
-------------------------------------------------*/
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      // Account for fixed header height
      const headerOffset = window.innerWidth <= 768 ? 120 : 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});

/* ------------------------------------------------
   ✅ PREVENT HORIZONTAL SCROLL ON MOBILE
-------------------------------------------------*/
function preventHorizontalScroll() {
  const body = document.body;
  const html = document.documentElement;
  
  // Ensure no element causes horizontal scroll
  body.style.overflowX = 'hidden';
  html.style.overflowX = 'hidden';
}

document.addEventListener('DOMContentLoaded', preventHorizontalScroll);

/* ------------------------------------------------
   ✅ OPTIMIZED IMAGE LOADING (Performance)
-------------------------------------------------*/
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Uncomment if you add data-src attributes to images for lazy loading
// document.addEventListener('DOMContentLoaded', lazyLoadImages);

/* ------------------------------------------------
   ✅ TOUCH DEVICE DETECTION & OPTIMIZATION
-------------------------------------------------*/
function detectTouchDevice() {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (isTouchDevice) {
    document.body.classList.add('touch-device');
    
    // Remove hover effects on touch devices for better performance
    const style = document.createElement('style');
    style.textContent = `
      .touch-device .experience-box:hover,
      .touch-device .social-card:hover,
      .touch-device .photo-card:hover {
        transform: none;
      }
    `;
    document.head.appendChild(style);
  }
}

document.addEventListener('DOMContentLoaded', detectTouchDevice);

/* ------------------------------------------------
   ✅ VIEWPORT HEIGHT FIX FOR MOBILE BROWSERS
-------------------------------------------------*/
function setVH() {
  // Fix for mobile browsers where 100vh includes address bar
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

/* ------------------------------------------------
   ✅ FORM SUBMISSION HANDLER (Contact Form)
-------------------------------------------------*/
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Basic validation
    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Show success message
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '✓ Message Sent!';
    submitBtn.style.background = 'linear-gradient(90deg, #00ff88, #00cc66)';
    
    // Reset form
    this.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
    }, 3000);
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', { name, email, message });
  });
}

/* ------------------------------------------------
   ✅ PERFORMANCE OPTIMIZATION - Debounce Scroll
-------------------------------------------------*/
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Debounced scroll handler for better performance
const handleScroll = debounce(() => {
  // Add any scroll-based functionality here
}, 100);

window.addEventListener('scroll', handleScroll, { passive: true });

/* ------------------------------------------------
   ✅ RESPONSIVE NAV MENU HEIGHT FIX
-------------------------------------------------*/
function adjustNavOnScroll() {
  const header = document.querySelector('header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Hide header on scroll down, show on scroll up (mobile only)
    if (window.innerWidth <= 768) {
      if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', adjustNavOnScroll);

/* ------------------------------------------------
   ✅ ORIENTATION CHANGE HANDLER
-------------------------------------------------*/
window.addEventListener('orientationchange', () => {
  // Reload layout after orientation change
  setTimeout(() => {
    window.scrollTo(0, window.scrollY + 1);
    window.scrollTo(0, window.scrollY - 1);
  }, 100);
});

/* ------------------------------------------------
   ✅ PREVENT IMAGE DRAG ON MOBILE
-------------------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.setAttribute('draggable', 'false');
    img.addEventListener('contextmenu', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
      }
    });
  });
});

/* ------------------------------------------------
   ✅ ACCESSIBILITY - Focus Management
-------------------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
  // Add focus visible for keyboard navigation
  document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });
  
  document.body.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });
});

/* ------------------------------------------------
   ✅ ERROR HANDLING & FALLBACKS
-------------------------------------------------*/
window.addEventListener('error', (e) => {
  console.error('Error occurred:', e.error);
  // Prevent complete page failure on JS errors
}, true);

// Service Worker Registration (Optional - for PWA)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('/sw.js')
    //   .then(reg => console.log('SW registered:', reg))
    //   .catch(err => console.log('SW registration failed:', err));
  });
}

console.log('✅ Portfolio JavaScript loaded successfully!');
/* ------------------------------------------------
   ✅ MOBILE MENU TOGGLE - PUSH HERO DOWN
-------------------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const hero = document.querySelector('.hero');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');

    if (navMenu.classList.contains('active')) {
      hero.classList.add('menu-open');
    } else {
      hero.classList.remove('menu-open');
    }
  });
});
// ✅ Hamburger toggle for mobile menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const heroSection = document.querySelector('.hero');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Push hero down visually (only on mobile)
    if (window.innerWidth <= 768) {
      heroSection.classList.toggle('menu-open');
    }
  });
}


/* =========================================
   MOBILE MENU TOGGLE - SINGLE & CLEAN
========================================= */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const hero = document.querySelector('.hero');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isActive = navMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open', isActive);

      // Push hero down only on mobile
      if (window.innerWidth <= 768) {
        hero.classList.toggle('menu-open', isActive);
      }

      // Change icon
      hamburger.innerHTML = isActive 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });
  }

  // Close menu when clicking a link
  document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
      hero.classList.remove('menu-open');
      hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
});
const form = document.getElementById("contact-form");
const submitBtn = form.querySelector("button");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const result = await response.json();
    console.log(result);

    if (result.success) {
      alert("✅ Message sent successfully!");
      form.reset();
    } else {
      alert("❌ Error: " + result.message);
    }
  } catch (error) {
    alert("❌ Network Error. Try again later.");
    console.error(error);
  }

  submitBtn.textContent = "Send Message";
  submitBtn.disabled = false;
});

