// Init loader
window.addEventListener('load', () => {
  document.getElementById('loader')?.classList.add('hidden');
});

// Music controls
(function(){
  const audio = document.getElementById('bgm');
  const btn = document.getElementById('music-toggle');
  if(!audio || !btn) return;

  let isSupported = true;
  let autoplayAttempted = false;

  function play(){
    if(!isSupported) return;
    audio.play().catch((err)=>{
      console.log('Autoplay blocked:', err);
      isSupported = false;
      // Don't hide button, let user click to play
      btn.classList.add('autoplay-blocked');
      btn.title = 'Klik untuk memutar musik';
    });
    btn.classList.remove('paused');
  }

  function pause(){ audio.pause(); btn.classList.add('paused'); }

  btn.addEventListener('click', () => {
    if(!isSupported) return;
    if(audio.paused) play(); else pause();
  });

  audio.addEventListener('error', () => {
    isSupported = false;
    btn.style.display = 'none';
  });

  // Try autoplay immediately when page loads
  function tryAutoplay() {
    if (autoplayAttempted) return;
    autoplayAttempted = true;

    // Small delay to ensure audio element is ready
    setTimeout(() => {
      play();
    }, 100);
  }

  // Attempt autoplay on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryAutoplay);
  } else {
    tryAutoplay();
  }

  // Fallback: Auto-play after first user interaction if autoplay failed
  window.addEventListener('scroll', () => {
    if (audio.paused && isSupported) play();
  }, { once: true });

  window.addEventListener('click', () => {
    if (audio.paused && isSupported) play();
  }, { once: true });
})();

// Countdown (reads target from <body data-countdown="...")
(function(){
  const body = document.body;
  const ds = body?.dataset?.countdown;
  const target = new Date(ds || '2025-11-19T10:00:00+07:00').getTime();
  const $d = document.getElementById('cd-days');
  const $h = document.getElementById('cd-hours');
  const $m = document.getElementById('cd-mins');
  const $s = document.getElementById('cd-secs');
  if(!$d||!$h||!$m||!$s || isNaN(target)) return;
  const tick = () => {
    const now = Date.now();
    let diff = Math.max(0, target - now);
    const days = Math.floor(diff / (1000*60*60*24)); diff -= days*(1000*60*60*24);
    const hrs  = Math.floor(diff / (1000*60*60)); diff -= hrs*(1000*60*60);
    const mins = Math.floor(diff / (1000*60)); diff -= mins*(1000*60);
    const secs = Math.floor(diff / 1000);
    $d.textContent = String(days);
    $h.textContent = String(hrs).padStart(2,'0');
    $m.textContent = String(mins).padStart(2,'0');
    $s.textContent = String(secs).padStart(2,'0');
  };
  tick();
  setInterval(tick, 1000);
})();

// Guest name support (from ?to=Nama or ?id=guestId with assets/guests.json)
(async function(){
  try{
    const el = document.getElementById('guest-name');
    if(!el) return;
    const span = el.querySelector('span');
    const params = new URLSearchParams(location.search);
    let name = params.get('to');
    const id = params.get('id');
    if((!name || name.trim()==='') && id){
      const res = await fetch('assets/guests.json').catch(()=>null);
      if(res && res.ok){
        const data = await res.json();
        const item = Array.isArray(data) ? data.find(g=>String(g.id)===String(id)) : (data && data[id]);
        name = item?.name || (typeof item === 'string' ? item : undefined);
      }
    }
    if(name && span){
      span.textContent = name;
      el.hidden = false;
    }
  }catch(e){ /* ignore */ }
})();

// Copy bank number
(function(){
  document.addEventListener('click', (e) => {
    const t = e.target;
    if(!(t instanceof HTMLElement)) return;
    const copy = t.getAttribute('data-copy');
    if(!copy) return;
    navigator.clipboard.writeText(copy).then(() => {
      const original = t.textContent;
      t.textContent = 'Disalin!';
      setTimeout(()=>{ t.textContent = original; }, 1200);
    });
  });
})();

// Responsive Animations System
(function(){
  // Intersection Observer for scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');

        // Trigger letter-by-letter animation for couple names
        const letterElements = entry.target.querySelectorAll('.letter-animate');
        letterElements.forEach((letter, index) => {
          setTimeout(() => {
            letter.style.animationDelay = `${index * 0.1}s`;
            letter.classList.add('animate');
          }, index * 100);
        });

        // Trigger typewriter effect for quotes
        const typewriterElements = entry.target.querySelectorAll('.animate-typewriter');
        typewriterElements.forEach((element) => {
          // Reset animation
          element.style.width = '0';
          element.style.animation = 'none';

          // Start typewriter animation after a delay
          setTimeout(() => {
            element.style.animation = 'typewriter 3s steps(40, end) 1s both';
          }, 500);
        });
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  function initScrollAnimations() {
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.section-invite, .section-details, .section-countdown, .section-location');
    animateElements.forEach(el => {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });

    // Detail cards slide animations
    const detailCards = document.querySelectorAll('.detail-card');
    detailCards.forEach((card, index) => {
      if (index % 2 === 0) {
        card.classList.add('animate-slide-left');
      } else {
        card.classList.add('animate-slide-right');
      }
      observer.observe(card);
    });

    // Countdown items scale animation
    const countdownItems = document.querySelectorAll('.cd-item');
    countdownItems.forEach(item => {
      item.classList.add('animate-scale');
      observer.observe(item);
    });

    // Cards scale animation
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.classList.add('animate-scale');
      observer.observe(card);
    });
  }

  // Mouse movement parallax effect
  function initParallaxEffect() {
    document.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;

      // Subtle parallax for floating particles
      const hero = document.querySelector('.hero');
      if (hero) {
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        hero.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    });
  }

  // Enhanced hover interactions
  function initHoverEffects() {
    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      btn.addEventListener('mouseenter', function(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.left = e.offsetX + 'px';
        ripple.style.top = e.offsetY + 'px';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Card tilt effect
    const cards = document.querySelectorAll('.card, .detail-card, .gift-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });

      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });
  }

  // Dynamic countdown animation
  function initCountdownAnimation() {
    const countdownItems = document.querySelectorAll('.cd-item span');
    let lastValues = {};

    function animateNumber(element, newValue) {
      const id = element.id;
      const oldValue = lastValues[id] || 0;

      if (oldValue !== newValue) {
        element.style.transform = 'scale(1.2)';
        element.style.color = 'var(--gold)';

        setTimeout(() => {
          element.style.transform = 'scale(1)';
          element.style.color = '';
        }, 200);

        lastValues[id] = newValue;
      }
    }

    // Watch for countdown changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' || mutation.type === 'characterData') {
          const element = mutation.target;
          if (element.tagName === 'SPAN' && element.id && element.id.startsWith('cd-')) {
            animateNumber(element, parseInt(element.textContent) || 0);
          }
        }
      });
    });

    countdownItems.forEach(item => {
      observer.observe(item, { childList: true, characterData: true, subtree: true });
    });
  }

  // Initialize all responsive animations
  function init() {
    // Wait for page load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    initScrollAnimations();
    initParallaxEffect();
    initHoverEffects();
    initCountdownAnimation();
    initScrollProgress();
    initGuestPersonalization();
    initElegantInteractions();

    // Add floating animation to decorative elements
    const decorativeElements = document.querySelectorAll('.gold-accent::before, .decorative-border::before');
    decorativeElements.forEach(el => {
      el.classList.add('float-animation');
    });
  }

  // Guest Name Personalization
  function initGuestPersonalization() {
    // Get guest name from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('nama') || urlParams.get('name');

    if (guestName) {
      const guestNameElement = document.getElementById('guest-name');
      const guestNameText = document.getElementById('guest-name-text');

      if (guestNameElement && guestNameText) {
        // Decode and format the name
        const decodedName = decodeURIComponent(guestName).trim();
        guestNameText.textContent = decodedName;
        guestNameElement.hidden = false;

        // Add animation class
        guestNameElement.classList.add('animate-fade-in-up');
      }
    }
  }

  // Enhanced Elegant Interactions
  function initElegantInteractions() {
    // Smooth scroll for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', () => {
        const nextSection = document.querySelector('.section-invite');
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });

      // Auto-hide scroll indicator after scrolling
      let scrollTimeout;
      const hideScrollIndicator = () => {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.pointerEvents = 'none';
        setTimeout(() => {
          scrollIndicator.style.display = 'none';
        }, 300);
      };

      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(hideScrollIndicator, 1000); // Hide after 1 second of no scrolling
        }
      });
    }

    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.card, .detail-card, .location-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });

    // Letter animation trigger on page load
    const coupleLetters = document.querySelectorAll('.letter-animate');
    coupleLetters.forEach((letter, index) => {
      setTimeout(() => {
        letter.classList.add('animate');
      }, 1000 + (index * 100));
    });
  }

  // Scroll progress indicator
  function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress-bar');

    function updateProgress() {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
      }
    }

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call
  }

  init();
})();