(() => {
  const scene = document.getElementById('scene');
  const hits = [...document.querySelectorAll('[data-object]')];
  const dockLinks = [...document.querySelectorAll('[data-chapter]')];
  const peek = document.getElementById('chapterPeek');
  const peekIndex = document.getElementById('peekIndex');
  const peekTitle = document.getElementById('peekTitle');
  const peekText = document.getElementById('peekText');
  const peekLink = document.getElementById('peekLink');
  const toast = document.getElementById('welcomeToast');
  const guide = document.getElementById('guideButton');
  const closeWelcome = document.getElementById('closeWelcome');
  const touchMode = matchMedia('(hover: none), (pointer: coarse)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const chapters = {
    work: { num: '01 / IDEAS IN PRACTICE', title: 'Things I make', text: 'Data, design and projects with purpose.', url: 'work/' },
    reading: { num: '02 / THE BOOKSHELF', title: 'Between the pages', text: 'Books that have stayed with me.', url: 'reading/' },
    travel: { num: '03 / FAR & NEAR', title: 'Somewhere new', text: 'Travel notes, places and little discoveries.', url: 'travel/' },
    lizzy: { num: '04 / THE EVERYDAY', title: 'Life with Lizzy', text: 'A little cat, ordinary wonders and small joys.', url: 'lizzy/' }
  };

  const target = (name) => location.protocol === 'file:' ? `${name}/index.html` : chapters[name].url;
  [...hits, ...dockLinks].forEach((link) => {
    link.href = target(link.dataset.object || link.dataset.chapter);
  });

  let active = null;
  const activate = (name) => {
    const data = chapters[name];
    if (!data) return;
    active = name;
    scene.dataset.active = name;
    peek.classList.add('is-visible');
    peekIndex.textContent = data.num;
    peekTitle.textContent = data.title;
    peekText.textContent = data.text;
    peekLink.href = target(name);
    dockLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.chapter === name));
    hits.forEach((link) => link.setAttribute('aria-current', link.dataset.object === name ? 'true' : 'false'));
    peek.setAttribute('aria-hidden', 'false');
  };

  const clear = () => {
    active = null;
    scene.removeAttribute('data-active');
    peek.classList.remove('is-visible');
    peek.setAttribute('aria-hidden', 'true');
    dockLinks.forEach((link) => link.classList.remove('is-active'));
    hits.forEach((link) => link.removeAttribute('aria-current'));
  };

  const attach = (link, name) => {
    link.addEventListener('mouseenter', () => { if (!touchMode.matches) activate(name); });
    link.addEventListener('mouseleave', () => { if (!touchMode.matches && !peek.matches(':hover')) clear(); });
    link.addEventListener('focus', () => { if (!touchMode.matches) activate(name); });
    link.addEventListener('click', (event) => {
      if (touchMode.matches && active !== name) {
        event.preventDefault();
        activate(name);
      }
    });
  };

  hits.forEach((link) => attach(link, link.dataset.object));
  dockLinks.forEach((link) => attach(link, link.dataset.chapter));
  peek.addEventListener('mouseleave', () => {
    if (!touchMode.matches && !document.querySelector('[data-object]:hover,[data-chapter]:hover')) clear();
  });
  closeWelcome.addEventListener('click', () => toast.classList.remove('is-visible'));
  guide.addEventListener('click', () => {
    toast.classList.toggle('is-visible');
    if (toast.classList.contains('is-visible')) closeWelcome.focus();
  });
  document.getElementById('peekClose').addEventListener('click', clear);
  document.addEventListener('pointerdown', (event) => {
    if (touchMode.matches && !event.target.closest('.object-hit,.chapter-dock,.chapter-peek,.welcome-toast')) clear();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      toast.classList.remove('is-visible');
      clear();
      guide.focus();
    }
    if (['1', '2', '3', '4'].includes(event.key) && !event.altKey && !event.ctrlKey && !event.metaKey && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
      const name = { 1: 'work', 2: 'reading', 3: 'travel', 4: 'lizzy' }[event.key];
      activate(name);
      dockLinks.find((link) => link.dataset.chapter === name)?.focus();
    }
  });

  let seen = false;
  try {
    seen = sessionStorage.getItem('amcl-welcome-seen') === '1';
    sessionStorage.setItem('amcl-welcome-seen', '1');
  } catch (_) {}
  if (!seen) {
    toast.classList.add('is-visible');
    if (!reducedMotion) setTimeout(() => toast.classList.remove('is-visible'), 4200);
  }
  peek.setAttribute('aria-hidden', 'true');
})();
