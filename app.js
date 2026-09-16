(() => {
  const scene = document.getElementById('scene');
  const intro = document.getElementById('intro');
  const enterButton = document.getElementById('enterButton');
  const hits = document.querySelectorAll('[data-object]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Keep the README's direct-file option working while using clean routes on a server.
  if (window.location.protocol === 'file:') {
    hits.forEach((hit) => hit.setAttribute('href', `${hit.dataset.object}/index.html`));
  }

  const activate = (name) => scene?.setAttribute('data-active', name);
  const clear = () => scene?.removeAttribute('data-active');

  hits.forEach((hit) => {
    const name = hit.dataset.object;
    hit.addEventListener('mouseenter', () => activate(name));
    hit.addEventListener('mouseleave', clear);
    hit.addEventListener('focus', () => activate(name));
    hit.addEventListener('blur', clear);
  });

  const hideIntro = () => {
    intro?.classList.add('is-hidden');
    intro?.setAttribute('aria-hidden', 'true');
    intro?.removeAttribute('aria-modal');
    if (scene) {
      scene.removeAttribute('inert');
      scene.removeAttribute('aria-hidden');
    }
    hits.forEach((hit) => hit.removeAttribute('tabindex'));
    if (document.activeElement && intro?.contains(document.activeElement)) {
      document.activeElement.blur();
    }
    try { sessionStorage.setItem('amcl-intro-seen', '1'); } catch (_) {}
  };

  const showIntro = () => {
    if (scene) {
      scene.setAttribute('inert', '');
      scene.setAttribute('aria-hidden', 'true');
    }
    hits.forEach((hit) => hit.setAttribute('tabindex', '-1'));
    enterButton?.focus({ preventScroll: true });
  };

  enterButton?.addEventListener('click', hideIntro);
  intro?.addEventListener('click', (e) => {
    if (e.target === intro || e.target.classList.contains('intro-paper')) hideIntro();
  });
  window.addEventListener('keydown', (e) => {
    if (!intro?.classList.contains('is-hidden') && (e.key === 'Enter' || e.key === 'Escape' || e.key === ' ')) hideIntro();
  });

  let seen = false;
  try { seen = sessionStorage.getItem('amcl-intro-seen') === '1'; } catch (_) {}
  if (seen || reduceMotion) hideIntro();
  else {
    showIntro();
    window.setTimeout(hideIntro, 1500);
  }
})();
