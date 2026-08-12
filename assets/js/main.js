(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.site-nav');
  var progress = document.querySelector('.scroll-progress');
  var backToTop = document.querySelector('.back-to-top');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav-link]'));
  var navSections = navLinks.map(function (link) {
    return document.getElementById(link.getAttribute('data-nav-link'));
  }).filter(Boolean);
  var scrollFrame = null;

  if (!header || !toggle || !nav) return;

  var email = ['ninhktran', 'gmail.com'].join('@');
  document.querySelectorAll('[data-email-link]').forEach(function (link) {
    link.href = 'mailto:' + email;
  });

  function closeMenu() {
    header.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    var open = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) closeMenu();
  });

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenu();
  });

  function updateScrollState() {
    header.classList.toggle('is-scrolled', window.scrollY > 18);
    if (backToTop) backToTop.hidden = window.scrollY < 500;

    if (progress) {
      var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = 'scaleX(' + (maxScroll > 0 ? window.scrollY / maxScroll : 0) + ')';
    }

    var marker = window.scrollY + header.offsetHeight + 100;
    var activeId = '';
    navSections.forEach(function (section) {
      if (section.offsetTop <= marker) activeId = section.id;
    });

    navLinks.forEach(function (link) {
      var isActive = link.getAttribute('data-nav-link') === activeId;
      link.classList.toggle('is-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });

    scrollFrame = null;
  }

  function requestScrollState() {
    if (scrollFrame === null) scrollFrame = window.requestAnimationFrame(updateScrollState);
  }

  window.addEventListener('scroll', requestScrollState, { passive: true });
  window.addEventListener('resize', requestScrollState, { passive: true });
  updateScrollState();
}());
