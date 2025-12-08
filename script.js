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
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
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
   ✅ BACK TO TOP BUTTON
-------------------------------------------------*/
const backToTop = document.getElementById("backToTop");

if (backToTop) {
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
   ✅ SMOOTH SCROLL FOR NAV LINKS
-------------------------------------------------*/
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
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
  
  body.style.overflowX = 'hidden';
  html.style.overflowX = 'hidden';
}

document.addEventListener('DOMContentLoaded', preventHorizontalScroll);

/* ------------------------------------------------
   ✅ TOUCH DEVICE DETECTION & OPTIMIZATION
-------------------------------------------------*/
function detectTouchDevice() {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  if (isTouchDevice) {
    document.body.classList.add('touch-device');
    
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
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);
window.addEventListener('orientationchange', setVH);

/* ------------------------------------------------
   ✅ WEB3FORMS CONTACT FORM SUBMISSION
-------------------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("contact-form");
  
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector("button[type='submit']");
      const originalText = submitBtn.textContent;

      // Disable button and show loading state
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";

      try {
        const formData = new FormData(form);
        
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });

        const result = await response.json();

        if (result.success) {
          // Success message
          submitBtn.textContent = "✓ Message Sent!";
          submitBtn.style.background = "linear-gradient(90deg, #00ff88, #00cc66)";
          
          // Reset form
          form.reset();
          
          // Show alert
          alert("✅ Thank you! Your message has been sent successfully. I'll get back to you soon!");
          
        } else {
          // Error from Web3Forms
          submitBtn.textContent = "✗ Failed";
          submitBtn.style.background = "linear-gradient(90deg, #ff4444, #cc0000)";
          alert("❌ Error: " + (result.message || "Failed to send message. Please try again."));
        }
      } catch (error) {
        // Network error
        console.error("Form submission error:", error);
        submitBtn.textContent = "✗ Error";
        submitBtn.style.background = "linear-gradient(90deg, #ff4444, #cc0000)";
        alert("❌ Network error. Please check your internet connection and try again.");
      } finally {
        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.opacity = "1";
          submitBtn.style.background = "";
        }, 3000);
      }
    });
  }
});

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
}, true);

/* ------------------------------------------------
   ✅ MOBILE MENU TOGGLE
-------------------------------------------------*/
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const hero = document.querySelector('.hero');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isActive = navMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open', isActive);

      if (window.innerWidth <= 768) {
        hero.classList.toggle('menu-open', isActive);
      }

      hamburger.innerHTML = isActive 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking a link
    document.querySelectorAll('#navMenu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        hero.classList.remove('menu-open');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }
});

console.log('✅ Portfolio JavaScript loaded successfully!');