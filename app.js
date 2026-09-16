(() => {
  const scene = document.getElementById('scene');
  const intro = document.getElementById('intro');
  const enterButton = document.getElementById('enterButton');
  const hits = document.querySelectorAll('[data-object]');

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
    try { sessionStorage.setItem('amcl-intro-seen', '1'); } catch (_) {}
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
  if (seen) intro?.classList.add('is-hidden');
  else window.setTimeout(hideIntro, 2100);
})();
