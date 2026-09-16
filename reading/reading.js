(() => {
  const books = [
    {
      id: 'answer', eyebrow: 'A short story', title: 'The Answer Is No',
      author: 'Fredrik Backman · translated by Elizabeth DeNoma', year: '2024',
      publisher: 'Amazon Original Stories', format: 'Kindle edition · 68 pages',
      language: 'English', rating: '5 / 5', dateRead: 'January 5, 2026',
      description: 'A habitual people-pleaser tries one small no and discovers how a single refusal can rearrange an entire life.', note: '',
      cover: '../assets/books/the-answer-is-no.jpg', goodreads: 'https://www.goodreads.com/book/show/219876684'
    },
    {
      id: 'hyunam', eyebrow: 'A novel', title: 'Welcome to the Hyunam-Dong Bookshop',
      author: 'Hwang Bo-Reum · translated by Shanna Tan', year: '2024',
      publisher: 'Bloomsbury Publishing', format: 'Hardcover · 307 pages',
      language: 'English', rating: '5 / 5', dateRead: '',
      description: 'After leaving a life that no longer fits, Yeongju opens a neighborhood bookshop and slowly builds a place where tired people can rest, read, and begin again.', note: '',
      cover: '../assets/books/welcome-to-hyunam-dong.jpg', goodreads: 'https://www.goodreads.com/book/show/133938826'
    },
    {
      id: 'emily', eyebrow: 'Emily Wilde · book three', title: 'Emily Wilde’s Compendium of Lost Tales',
      author: 'Heather Fawcett', year: '2025', publisher: 'Del Rey',
      format: 'Hardcover · 358 pages', language: 'English', rating: '4 / 5', dateRead: 'August 27, 2025',
      description: 'Scholar Emily Wilde enters a faerie realm as its reluctant queen and must use her knowledge of stories to untangle a curse threatening the kingdom.', note: '',
      cover: '../assets/books/emily-wildes-compendium.jpg', goodreads: 'https://www.goodreads.com/book/show/211721797'
    },
    {
      id: 'correspondent', eyebrow: 'A novel in letters', title: 'The Correspondent',
      author: 'Virginia Evans', year: '2025', publisher: 'Crown Publishing',
      format: 'Hardcover · 285 pages', language: 'English', rating: '5 / 5', dateRead: 'May 26, 2026',
      description: 'Letters and emails reveal the sharp mind, guarded heart, old griefs, and unexpected connections of Sybil Van Antwerp.', note: '',
      cover: '../assets/books/the-correspondent.jpg', goodreads: 'https://www.goodreads.com/book/show/223001257'
    },
    {
      id: 'anxious', eyebrow: 'A novel', title: 'Anxious People',
      author: 'Fredrik Backman', year: '2019', publisher: 'Atria Publishing',
      format: 'Hardcover · 336 pages', language: 'English', rating: '5 / 5', dateRead: 'September 29, 2025',
      description: 'A failed bank robbery becomes an accidental hostage situation, bringing eight anxious strangers together at an apartment viewing.',
      note: 'I enjoyed this book. The beginning hooked me right away and the ending wrapped things up perfectly. Backman does such a great job with characters—I could clearly picture their faces, emotions, and little quirks.',
      cover: '../assets/books/anxious-people.jpg', goodreads: 'https://www.goodreads.com/book/show/49127718'
    },
    {
      id: 'therapy', eyebrow: 'Psychology · memoir', title: 'Maybe You Should Talk to Someone',
      author: 'Lori Gottlieb', year: '2019', publisher: 'Harper',
      format: 'Hardcover · 415 pages', language: 'English', rating: '5 / 5', dateRead: '',
      description: 'A therapist follows five lives—including her own—through the revealing, complicated, and deeply human work that happens inside the therapy room.', note: '',
      cover: '../assets/books/maybe-you-should-talk-to-someone.jpg', goodreads: 'https://www.goodreads.com/book/show/37570546'
    }
  ];

  const stage = document.querySelector('.reading-stage');
  const cards = [...document.querySelectorAll('.book-cover')];
  const detail = document.getElementById('bookDetail');
  const dismiss = document.querySelector('.reading-dismiss');
  const closeButton = document.querySelector('.book-detail__close');
  const navButtons = [...document.querySelectorAll('[data-direction]')];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fields = {
    cover: document.getElementById('detailCover'), eyebrow: document.getElementById('detailEyebrow'),
    title: document.getElementById('detailTitle'), author: document.getElementById('detailAuthor'),
    year: document.getElementById('detailYear'), publisher: document.getElementById('detailPublisher'),
    format: document.getElementById('detailFormat'), language: document.getElementById('detailLanguage'),
    rating: document.getElementById('detailRating'), date: document.getElementById('detailDate'),
    dateRow: document.getElementById('detailDateRow'), description: document.getElementById('detailDescription'),
    note: document.getElementById('detailNote'), link: document.getElementById('detailLink'),
    position: document.getElementById('detailPosition')
  };
  let activeIndex = -1;
  let opener = null;
  let transitionToken = 0;

  const fillDetail = (book, index) => {
    fields.cover.src = book.cover;
    fields.cover.alt = `${book.title} book cover`;
    ['eyebrow', 'title', 'year', 'publisher', 'format', 'language', 'rating', 'description'].forEach((key) => {
      fields[key].textContent = book[key];
    });
    fields.author.textContent = `by ${book.author}`;
    fields.link.href = book.goodreads;
    fields.position.textContent = `${String(index + 1).padStart(2, '0')} / ${String(books.length).padStart(2, '0')}`;
    fields.dateRow.hidden = !book.dateRead;
    fields.date.textContent = book.dateRead;
    fields.note.hidden = !book.note;
    fields.note.textContent = book.note ? `“${book.note}”` : '';
  };

  const selectCard = (index) => cards.forEach((card, cardIndex) => {
    const selected = cardIndex === index;
    card.classList.toggle('is-active', selected);
    card.setAttribute('aria-expanded', String(selected));
  });

  const animateCover = (card, direction = 'in') => {
    if (reduceMotion || !card || !fields.cover?.animate) return Promise.resolve();
    const source = direction === 'in' ? card.getBoundingClientRect() : fields.cover.getBoundingClientRect();
    const destination = direction === 'in' ? fields.cover.getBoundingClientRect() : card.getBoundingClientRect();
    if (!source.width || !destination.width) return Promise.resolve();

    const flight = document.createElement('img');
    flight.className = 'book-flight';
    flight.src = fields.cover.src;
    flight.alt = '';
    flight.setAttribute('aria-hidden', 'true');
    document.body.appendChild(flight);
    fields.cover.classList.add('is-transitioning');

    const rotation = getComputedStyle(card).getPropertyValue('--book-rotate').trim() || '0deg';
    const animation = flight.animate([
      {
        left: `${source.left}px`, top: `${source.top}px`, width: `${source.width}px`, height: `${source.height}px`,
        transform: direction === 'in' ? `rotate(${rotation})` : 'rotate(0deg)', opacity: .82
      },
      {
        left: `${destination.left}px`, top: `${destination.top}px`, width: `${destination.width}px`, height: `${destination.height}px`,
        transform: direction === 'in' ? 'rotate(0deg)' : `rotate(${rotation})`, opacity: 1
      }
    ], { duration: 430, easing: 'cubic-bezier(.22, .82, .2, 1)', fill: 'forwards' });

    return animation.finished.catch(() => {}).finally(() => {
      flight.remove();
      fields.cover.classList.remove('is-transitioning');
    });
  };

  const openBook = (index, options = {}) => {
    const { preserveOpener = false, keyboardActivation = false, animateFromCard = true } = options;
    const nextIndex = (index + books.length) % books.length;
    const wasOpen = activeIndex >= 0;
    if (!preserveOpener) opener = cards[nextIndex];
    const token = ++transitionToken;
    activeIndex = nextIndex;
    fillDetail(books[activeIndex], activeIndex);
    selectCard(activeIndex);
    stage?.classList.add('is-open');
    detail?.setAttribute('aria-hidden', 'false');
    dismiss?.setAttribute('tabindex', '-1');

    if (!wasOpen && stage) {
      const stageRect = stage.getBoundingClientRect();
      const stageCenter = stageRect.top + stageRect.height / 2;
      if (stageCenter < 170 || stageCenter > window.innerHeight - 170) {
        stage.scrollIntoView({ block: 'center', behavior: 'auto' });
      }
    }

    if (wasOpen && !animateFromCard) {
      detail?.animate([
        { opacity: .68, transform: 'translate(-50%, -50%) scale(.992)' },
        { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }
      ], { duration: 220, easing: 'ease-out' });
    } else if (animateFromCard) {
      requestAnimationFrame(() => {
        if (token === transitionToken) animateCover(cards[activeIndex], 'in');
      });
    }

    if (keyboardActivation) window.setTimeout(() => closeButton?.focus({ preventScroll: true }), reduceMotion ? 0 : 180);
  };

  const finishClose = () => {
    stage?.classList.remove('is-open');
    detail?.setAttribute('aria-hidden', 'true');
    dismiss?.setAttribute('tabindex', '-1');
    selectCard(-1);
    activeIndex = -1;
    if (opener instanceof HTMLElement) opener.focus({ preventScroll: true });
  };

  const closeBook = () => {
    if (activeIndex < 0) return;
    const token = ++transitionToken;
    const activeCard = cards[activeIndex];
    animateCover(activeCard, 'out').then(() => {
      if (token === transitionToken) finishClose();
    });
  };

  cards.forEach((card, index) => card.addEventListener('click', (event) => {
    if (activeIndex === index) {
      closeBook();
      return;
    }
    openBook(index, { keyboardActivation: event.detail === 0 });
  }));
  dismiss?.addEventListener('click', closeBook);
  closeButton?.addEventListener('click', closeBook);
  navButtons.forEach((button) => button.addEventListener('click', () => {
    openBook(activeIndex + (button.dataset.direction === 'next' ? 1 : -1), { preserveOpener: true, animateFromCard: false });
  }));
  window.addEventListener('keydown', (event) => {
    if (activeIndex < 0) return;
    if (event.key === 'Escape') closeBook();
    if (event.key === 'ArrowRight') openBook(activeIndex + 1, { preserveOpener: true, animateFromCard: false });
    if (event.key === 'ArrowLeft') openBook(activeIndex - 1, { preserveOpener: true, animateFromCard: false });
  });
})();
