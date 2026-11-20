/**
 * Abisayo Idowu, AICMC — Legal Portfolio
 * Client Interactions & Accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation on Scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Active Section Navigation Spy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // 3. Mobile Navigation Drawer Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      const isExpanded = mobileBtn.getAttribute('aria-expanded') === 'true';
      mobileBtn.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
        mobileBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 4. Consultation Form Submission Feedback
  const contactForm = document.getElementById('consultation-form');
  const formSuccessAlert = document.getElementById('form-success-alert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = 'TRANSMITTING INQUIRY...';

      // Simulate formal dispatch
      setTimeout(() => {
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'INQUIRY TRANSMITTED';

        if (formSuccessAlert) {
          formSuccessAlert.style.display = 'block';
          formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          setTimeout(() => {
            formSuccessAlert.style.display = 'none';
            submitBtn.textContent = originalText;
          }, 6000);
        } else {
          alert('Thank you for reaching out. Abisayo Idowu, AICMC will review your inquiry and respond within 24 hours.');
          submitBtn.textContent = originalText;
        }
      }, 1000);
    });
  }

  // 5. Copy Phone & Email Utility
  window.copyToClipboard = function(text, label) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label} copied to clipboard!`);
    }).catch(err => {
      console.error('Copy failed', err);
    });
  };

  function showToast(msg) {
    let toast = document.getElementById('site-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'site-toast';
      toast.style.position = 'fixed';
      toast.style.bottom = '24px';
      toast.style.right = '24px';
      toast.style.backgroundColor = '#0b1320';
      toast.style.color = '#ffffff';
      toast.style.border = '1px solid #c59b27';
      toast.style.padding = '12px 20px';
      toast.style.fontSize = '0.85rem';
      toast.style.fontFamily = 'var(--font-sans)';
      toast.style.letterSpacing = '0.05em';
      toast.style.zIndex = '9999';
      toast.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
      toast.style.transition = 'opacity 0.3s ease';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    setTimeout(() => {
      toast.style.opacity = '0';
    }, 3000);
  }
});
