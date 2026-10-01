(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pins = [...document.querySelectorAll('.map-pin')];
  const card = document.querySelector('#map-card');
  const tripData = {
    italy: {
      title: 'Italy, slowly', season: 'Winter 2025/26',
      place: 'Rome · Florence · Venice · Dolomites · Milan',
      photo: 'photo--italy', alt: 'Lake Como, Italy', href: '#italy-note'
    },
    yellowstone: {
      title: 'When the earth breathes', season: 'Summer 2024',
      place: 'Mammoth · Lamar Valley · Old Faithful',
      photo: 'photo--yellowstone', alt: 'Yellowstone geothermal basin', href: '#stories'
    },
    'new-york': {
      title: 'The city after rain', season: 'Autumn 2024',
      place: 'Flatiron · Chelsea · West Village',
      photo: 'photo--new-york', alt: 'New York City after rain', href: '#stories'
    },
    bali: {
      title: 'A future field note', season: 'Someday',
      place: 'A blank page, for now',
      photo: 'photo--blank', alt: 'An unmarked place on the atlas', href: '#closing-title'
    }
  };

  const renderTrip = (pin) => {
    const trip = tripData[pin.dataset.trip];
    if (!trip || !card) return;

    pins.forEach((item) => {
      const active = item === pin;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });

    card.classList.add('is-changing');
    window.setTimeout(() => {
      const photo = card.querySelector('[data-card-photo]');
      photo.className = `map-card__photo ${trip.photo}`;
      photo.setAttribute('aria-label', trip.alt);
      card.querySelector('[data-card-title]').textContent = trip.title;
      card.querySelector('[data-card-season]').textContent = trip.season;
      card.querySelector('[data-card-place]').textContent = trip.place;
      card.querySelector('a').href = trip.href;
      card.classList.remove('is-changing');
    }, reduceMotion ? 0 : 130);
  };

  pins.forEach((pin) => {
    pin.setAttribute('aria-pressed', String(pin.classList.contains('is-active')));
    pin.addEventListener('click', () => renderTrip(pin));
  });

  const stops = {
    Rome: 'Rome · 41.90° N, 12.49° E',
    Florence: 'Florence · 43.77° N, 11.25° E',
    Venice: 'Venice · 45.44° N, 12.32° E',
    Dolomites: 'Dolomites · 46.54° N, 11.87° E',
    Milan: 'Milan · 45.46° N, 9.19° E'
  };
  const routeItems = [...document.querySelectorAll('.route-list li')];
  const caption = document.querySelector('[data-stop-caption]');

  routeItems.forEach((item, index) => {
    item.querySelector('button').addEventListener('click', () => {
      routeItems.forEach((entry) => entry.classList.toggle('is-active', entry === item));
      if (caption) caption.textContent = stops[item.dataset.stop];
      const dots = [...document.querySelectorAll('.route-photo svg circle')];
      dots.forEach((dot, dotIndex) => {
        dot.style.fill = dotIndex === index ? 'var(--rust)' : 'var(--paper-bright)';
        dot.setAttribute('r', dotIndex === index ? '8' : '5');
      });
    });
  });

  const dialog = document.querySelector('.note-dialog');
  const dialogTitle = document.querySelector('#dialog-title');
  document.querySelectorAll('[data-note]').forEach((button) => {
    button.addEventListener('click', () => {
      dialogTitle.textContent = button.dataset.note;
      if (typeof dialog.showModal === 'function') dialog.showModal();
    });
  });
  document.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  document.querySelector('.dialog-done')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .13 });
    revealItems.forEach((item) => observer.observe(item));
  }
})();
