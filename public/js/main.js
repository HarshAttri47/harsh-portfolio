const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
 
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});
 
function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  follower.style.left = followerX + 'px';
  follower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();
 
const hoverTargets = document.querySelectorAll('a, button, .project-card, input, textarea');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});
 
// ===== NAV SCROLL =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});
 
// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});
 
// ===== REVEAL ON SCROLL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, entry.target.dataset.delay || 0);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
 
document.querySelectorAll('.reveal').forEach((el, i) => {
  // Stagger siblings
  const parent = el.parentElement;
  const siblings = [...parent.querySelectorAll('.reveal')];
  const idx = siblings.indexOf(el);
  el.style.transitionDelay = (idx * 0.08) + 's';
  revealObserver.observe(el);
});
 
// ===== SKILL BARS ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach((bar, i) => {
        setTimeout(() => bar.classList.add('animated'), i * 120);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
 
document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));
 
// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
 
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--accent)' : '';
      });
    }
  });
}, { threshold: 0.4 });
 
sections.forEach(s => sectionObserver.observe(s));
 
// ===== CONTACT FORM =====
// ===== EMAILJS INIT =====
emailjs.init('vbglDjrTPtXrvy8rN');

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').textContent = 'Sending...';

  const templateParams = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };

  try {
    await emailjs.send('service_x779esl', 'template_481atnt', templateParams);
    formSuccess.classList.add('show');
    contactForm.reset();
    submitBtn.querySelector('.btn-text').textContent = 'Send Message';
    submitBtn.disabled = false;
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  } catch (err) {
    console.error('EmailJS error:', err);
    submitBtn.querySelector('.btn-text').textContent = 'Try Again';
    submitBtn.disabled = false;
  }
});
 
// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
 
// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 50);
});
 