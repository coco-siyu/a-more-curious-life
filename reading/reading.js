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
  const backgroundRegions = [
    document.querySelector('.reading-topbar'),
    document.querySelector('.reading-intro'),
    document.querySelector('.reading-books'),
    document.querySelector('.reading-footer')
  ].filter(Boolean);
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

  const openBook = (index, preserveOpener = false) => {
    if (!preserveOpener) opener = document.activeElement;
    activeIndex = (index + books.length) % books.length;
    fillDetail(books[activeIndex], activeIndex);
    selectCard(activeIndex);
    if (!preserveOpener) stage?.scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
    stage?.classList.add('is-open');
    detail?.setAttribute('aria-hidden', 'false');
    dismiss?.setAttribute('tabindex', '0');
    backgroundRegions.forEach((region) => region.setAttribute('inert', ''));
    document.body.classList.add('reading-modal-open');
    if (!preserveOpener) window.setTimeout(() => closeButton?.focus({ preventScroll: true }), reduceMotion ? 0 : 260);
  };

  const closeBook = () => {
    stage?.classList.remove('is-open');
    detail?.setAttribute('aria-hidden', 'true');
    dismiss?.setAttribute('tabindex', '-1');
    backgroundRegions.forEach((region) => region.removeAttribute('inert'));
    document.body.classList.remove('reading-modal-open');
    selectCard(-1);
    activeIndex = -1;
    if (opener instanceof HTMLElement) opener.focus({ preventScroll: true });
  };

  cards.forEach((card, index) => card.addEventListener('click', () => openBook(index)));
  dismiss?.addEventListener('click', closeBook);
  closeButton?.addEventListener('click', closeBook);
  navButtons.forEach((button) => button.addEventListener('click', () => {
    openBook(activeIndex + (button.dataset.direction === 'next' ? 1 : -1), true);
  }));
  window.addEventListener('keydown', (event) => {
    if (activeIndex < 0) return;
    if (event.key === 'Escape') closeBook();
    if (event.key === 'ArrowRight') openBook(activeIndex + 1, true);
    if (event.key === 'ArrowLeft') openBook(activeIndex - 1, true);
    if (event.key === 'Tab') {
      const focusable = [...detail.querySelectorAll('button, a[href]')].filter((element) => !element.hasAttribute('disabled'));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
  });
})();
