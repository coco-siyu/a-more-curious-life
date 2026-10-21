(() => {
  const BOOKS = [
    {
      id: 'answer', title: 'The Answer Is No', author: 'Fredrik Backman', genre: 'Fiction',
      moods: ['Comfort reads', 'Funny'], rating: 4.3, ratings: '8.1k',
      tags: ['Short stories', 'Humour', 'Grumpy hearts'],
      blurb: 'A small, wry story about a man who simply wants to be left alone — and the neighbours who, inconveniently, refuse to let him.',
      pullQuote: 'Saying no can be the kindest yes to yourself.', finished: '02 Feb 2024',
      note: 'Read in a single sitting with tea going cold beside me. Backman makes stubbornness feel tender.',
      moments: ['The dry, perfect jokes', 'A surprising softness', 'Neighbours as family'],
      quotes: ['“Some people are like cats. They want to be alone, together.”', '“He was not unfriendly. He was simply busy being himself.”'],
      aboutAuthor: 'Fredrik Backman is a Swedish author and columnist, best known for A Man Called Ove. His stories find warmth hidden inside cranky, lonely people.',
      cover: { bg: 'oklch(0.72 0.12 20)', fg: 'oklch(0.45 0.18 30)', accent: 'oklch(0.3 0.08 250)', motif: '☕' }
    },
    {
      id: 'hyunam', title: 'Welcome to the Hyunam-Dong Bookshop', author: 'Hwang Bo-reum', genre: 'Fiction',
      moods: ['Comfort reads', 'Human nature'], rating: 4.6, ratings: '12.4k',
      tags: ['Contemporary fiction', 'Healing', 'Everyday life', 'Bookshops'],
      blurb: 'A gentle, heartwarming novel about a woman who leaves a busy life behind to open a small bookshop in a quiet Seoul neighbourhood. A story about new beginnings, human connection and the simple, meaningful moments that make life feel full.',
      pullQuote: 'A quiet reminder that a slower life can also be a rich and meaningful one.', finished: '12 Mar 2024',
      note: 'This book felt like a warm hug. It made me want to live more slowly, be more present, and surround myself with good people and good books.',
      moments: ['The quiet friendships', 'How books bring people together', 'The beauty in ordinary days', 'A hopeful, gentle ending'],
      quotes: ['“A good life is one where you can say you\'re doing okay today.”', '“Books let you live many lives in one.”'],
      aboutAuthor: 'Hwang Bo-reum is a South Korean writer who worked as a software engineer before turning to essays and fiction. This debut novel became a word-of-mouth bestseller.',
      cover: { bg: 'oklch(0.32 0.08 265)', fg: 'oklch(0.85 0.13 80)', accent: 'oklch(0.7 0.15 60)', motif: '🏮' }
    },
    {
      id: 'wilde', title: 'Emily Wilde\'s Compendium of Lost Tales', author: 'Heather Fawcett', genre: 'Fantasy',
      moods: ['Cosy fantasy', 'Adventure'], rating: 4.4, ratings: '6.7k',
      tags: ['Faeries', 'Academia', 'Footnotes'],
      blurb: 'The cantankerous dryadologist Emily Wilde ventures into the faerie realms to find a door home for a certain exiled king — and maybe her own heart.',
      pullQuote: 'Scholarship is a kind of love letter to the unknown.', finished: '28 Apr 2024',
      note: 'Pure delight — footnotes, foxes, and faeries. Made me want to keep a field journal of my own.',
      moments: ['Emily\'s prickly honesty', 'Shadow the dog', 'Snowy mountain villages'],
      quotes: ['“I am not good with people. Faeries are easier.”', '“There is no map to the heart, only footnotes.”'],
      aboutAuthor: 'Heather Fawcett is a Canadian author with a background in archaeology. Her Emily Wilde series blends scholarly whimsy with Celtic folklore.',
      cover: { bg: 'oklch(0.25 0.05 250)', fg: 'oklch(0.88 0.08 85)', accent: 'oklch(0.65 0.15 330)', motif: '✿' }
    },
    {
      id: 'correspondent', title: 'The Correspondent', author: 'Virginia Evans', genre: 'Fiction',
      moods: ['Human nature', 'Reflective'], rating: 4.5, ratings: '9.2k',
      tags: ['Epistolary', 'Ageing', 'Letters'],
      blurb: 'Told entirely through letters, a retired lawyer writes to friends, strangers and authors — and slowly writes her way towards forgiveness.',
      pullQuote: 'Every letter is a small act of hope.', finished: '15 Jun 2024',
      note: 'I started writing letters again after this one. Quietly devastating and so, so wise.',
      moments: ['Letters to dead authors', 'A slowly thawing heart', 'The final envelope'],
      quotes: ['“To write to someone is to believe they will still be there.”', '“I have been lonely, but never without words.”'],
      aboutAuthor: 'Virginia Evans is an American novelist whose work explores memory, solitude and the long reach of the written word.',
      cover: { bg: 'oklch(0.9 0.03 80)', fg: 'oklch(0.3 0.03 50)', accent: 'oklch(0.6 0.12 35)', motif: '✉' }
    },
    {
      id: 'mabel', title: 'Mad Mabel', author: 'Katie Lumsden', genre: 'Mystery',
      moods: ['Gothic', 'Page-turner'], rating: 4.0, ratings: '3.1k',
      tags: ['Victorian', 'Gothic', 'Unreliable narrator'],
      blurb: 'A young woman takes a position at a remote house, where a mysterious relative is kept upstairs and nobody will speak of why.',
      pullQuote: 'Every house keeps one room locked.', finished: '30 Oct 2024',
      note: 'Perfect October reading. Candlelit, creaky, and sharper than it first appears.',
      moments: ['The locked attic', 'Letters in the margins', 'That final twist'],
      quotes: ['“Madness, they said, as though it were a place one could visit.”'],
      aboutAuthor: 'Katie Lumsden is a British novelist and BookTuber known for her love of 19th-century literature, which she reworks with a modern eye.',
      cover: { bg: 'oklch(0.2 0.03 240)', fg: 'oklch(0.8 0.14 75)', accent: 'oklch(0.55 0.18 25)', motif: '❀' }
    },
    {
      id: 'assassin', title: 'The Retired Assassin\'s Guide to Gardening', author: 'Richard Osman', genre: 'Mystery',
      moods: ['Funny', 'Comfort reads'], rating: 4.2, ratings: '5.5k',
      tags: ['Cosy crime', 'Gardens', 'Second acts'],
      blurb: 'A former hitman tries to grow prize-winning roses in a sleepy English village — but old habits, and old enemies, keep sprouting up.',
      pullQuote: 'Everything needs pruning eventually.', finished: '18 Nov 2024',
      note: 'Laughed out loud on the train. Cosy crime with a surprisingly tender core about starting over.',
      moments: ['Rose-show rivalries', 'The vicar\'s suspicions', 'Found family in the allotment'],
      quotes: ['“It\'s never too late to learn to grow something instead.”'],
      aboutAuthor: 'Richard Osman is a British TV presenter and author of the bestselling Thursday Murder Club series, beloved for its warmth and wit.',
      cover: { bg: 'oklch(0.35 0.08 155)', fg: 'oklch(0.9 0.06 90)', accent: 'oklch(0.55 0.18 25)', motif: '🌹' }
    },
    {
      id: 'mink', title: 'A Psalm for the Wild-Built', author: 'Becky Chambers', genre: 'Fantasy',
      moods: ['Cosy fantasy', 'Reflective', 'Human nature'], rating: 4.5, ratings: '14.8k',
      tags: ['Hopepunk', 'Robots', 'Tea'],
      blurb: 'A tea monk and a curious robot travel through the wilderness asking the oldest question: what do people need?',
      pullQuote: 'You don\'t have to earn your place in the world.', finished: '04 Jan 2025',
      note: 'A balm. I\'ll be giving this to everyone who feels tired.',
      moments: ['Mosscap\'s questions', 'Tea for strangers', 'The forest at dawn'],
      quotes: ['“You keep asking why your work is not enough, and I don\'t know how to answer that.”'],
      aboutAuthor: 'Becky Chambers is an American science-fiction author whose hopeful, character-driven stories have won the Hugo Award.',
      cover: { bg: 'oklch(0.55 0.08 140)', fg: 'oklch(0.95 0.03 90)', accent: 'oklch(0.75 0.12 70)', motif: '🍵' }
    },
    {
      id: 'braiding', title: 'Braiding Sweetgrass', author: 'Robin Wall Kimmerer', genre: 'Non-fiction',
      moods: ['Reflective', 'Human nature'], rating: 4.7, ratings: '21k',
      tags: ['Nature', 'Indigenous wisdom', 'Essays'],
      blurb: 'A botanist and member of the Citizen Potawatomi Nation weaves science and story into a meditation on gratitude and reciprocity with the land.',
      pullQuote: 'All flourishing is mutual.', finished: '22 Feb 2025',
      note: 'Slow reading, a chapter each morning. Changed how I look at my little balcony garden.',
      moments: ['The strawberry gift', 'Learning plant names', 'The honorable harvest'],
      quotes: ['“Knowing that you love the earth changes you.”', '“All flourishing is mutual.”'],
      aboutAuthor: 'Robin Wall Kimmerer is a mother, scientist, professor and enrolled member of the Citizen Potawatomi Nation.',
      cover: { bg: 'oklch(0.42 0.07 60)', fg: 'oklch(0.92 0.05 90)', accent: 'oklch(0.65 0.13 130)', motif: '🌾' }
    }
  ];

  const FILTERS = ['All books', 'Fiction', 'Comfort reads', 'Human nature'];
  const MORE_FILTERS = ['Fantasy', 'Mystery', 'Non-fiction', 'Cosy fantasy', 'Reflective', 'Funny', 'Gothic'];
  const STATUS_OPTIONS = ['Want to read', 'Reading', 'Read', 'Re-reading'];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = {
    filterRow: document.getElementById('primaryFilters'), moreMenu: document.getElementById('moreFilters'),
    bookRow: document.getElementById('bookRow'), emptyShelf: document.getElementById('emptyShelf'),
    shuffle: document.getElementById('shuffleBook'), journal: document.getElementById('journal'),
    journalBook: document.getElementById('journalBook'), largeCover: document.getElementById('largeCover'),
    title: document.getElementById('journalTitle'), author: document.getElementById('summaryAuthor'),
    stars: document.getElementById('summaryStars'), rating: document.getElementById('summaryRating'),
    tags: document.getElementById('summaryTags'), blurb: document.getElementById('summaryBlurb'),
    quote: document.getElementById('summaryQuote'), statusButton: document.getElementById('statusButton'),
    statusLabel: document.getElementById('statusLabel'), statusMenu: document.getElementById('statusMenu'),
    panel: document.getElementById('journalPanel'), searchToggle: document.querySelector('.search-toggle'),
    searchWrap: document.querySelector('.book-search'), searchInput: document.getElementById('bookSearch')
  };
  let filter = 'All books';
  let selectedId = 'hyunam';
  let activeTab = 'notes';
  let query = '';
  let statuses = {};
  try { statuses = JSON.parse(localStorage.getItem('amcl-reading-statuses') || '{}'); } catch (_) {}

  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[char]);

  const matchesFilter = (book) => filter === 'All books' || book.genre === filter || book.moods.includes(filter);
  const visibleBooks = () => BOOKS.filter((book) => {
    const text = `${book.title} ${book.author}`.toLowerCase();
    return matchesFilter(book) && text.includes(query.toLowerCase().trim());
  });
  const getSelectedBook = () => BOOKS.find((book) => book.id === selectedId) || BOOKS[0];

  const coverMarkup = (book) => `
    <div class="cover-art" style="--cover-bg:${book.cover.bg};--cover-fg:${book.cover.fg};--cover-accent:${book.cover.accent}">
      <span class="cover-title">${escapeHtml(book.title)}</span>
      <span class="cover-motif" aria-hidden="true">${escapeHtml(book.cover.motif)}</span>
      <span class="cover-author">${escapeHtml(book.author)}</span>
    </div>`;

  const setFilter = (nextFilter) => {
    filter = nextFilter;
    elements.moreMenu.hidden = true;
    renderMoreMenu();
    renderFilters();
    renderShelf();
  };

  const renderFilters = () => {
    elements.filterRow.replaceChildren();
    FILTERS.forEach((label) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `filter-pill${filter === label ? ' is-active' : ''}`;
      button.textContent = label;
      button.setAttribute('aria-pressed', String(filter === label));
      button.addEventListener('click', () => setFilter(label));
      elements.filterRow.appendChild(button);
    });

    const wrapper = document.createElement('div');
    wrapper.className = 'more-filter-wrap';
    const moreButton = document.createElement('button');
    moreButton.type = 'button';
    moreButton.className = `more-button${MORE_FILTERS.includes(filter) ? ' is-active' : ''}`;
    moreButton.setAttribute('aria-haspopup', 'menu');
    moreButton.setAttribute('aria-expanded', String(!elements.moreMenu.hidden));
    moreButton.innerHTML = `<span>${escapeHtml(MORE_FILTERS.includes(filter) ? filter : 'More')}</span><span aria-hidden="true">⌄</span>`;
    moreButton.addEventListener('click', () => {
      const willOpen = elements.moreMenu.hidden;
      elements.moreMenu.hidden = !willOpen;
      moreButton.setAttribute('aria-expanded', String(willOpen));
    });
    wrapper.append(moreButton, elements.moreMenu);
    elements.filterRow.appendChild(wrapper);
  };

  const renderMoreMenu = () => {
    elements.moreMenu.replaceChildren();
    elements.moreMenu.setAttribute('role', 'menu');
    MORE_FILTERS.forEach((label) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('role', 'menuitem');
      button.className = filter === label ? 'is-active' : '';
      button.textContent = label;
      button.addEventListener('click', () => setFilter(label));
      elements.moreMenu.appendChild(button);
    });
  };

  const renderShelf = () => {
    const books = visibleBooks();
    elements.bookRow.replaceChildren();
    elements.emptyShelf.hidden = books.length > 0;
    books.forEach((book) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'shelf-book';
      button.dataset.book = book.id;
      button.setAttribute('aria-pressed', String(book.id === selectedId));
      button.setAttribute('aria-label', `Open ${book.title} by ${book.author}`);
      button.innerHTML = `<span class="cover-wrap" aria-hidden="true">${coverMarkup(book)}</span><span class="shelf-title">${escapeHtml(book.title)}</span><span class="shelf-author">${escapeHtml(book.author)}</span>`;
      button.addEventListener('click', () => selectBook(book.id));
      elements.bookRow.appendChild(button);
    });
  };

  const renderStars = (rating) => {
    elements.stars.replaceChildren();
    for (let index = 1; index <= 5; index += 1) {
      const star = document.createElement('span');
      star.textContent = '★';
      if (rating < index - .25) star.className = rating >= index - .75 ? 'half' : 'dim';
      elements.stars.appendChild(star);
    }
  };

  const renderStatusMenu = (book) => {
    elements.statusMenu.replaceChildren();
    const current = statuses[book.id] || 'Want to read';
    elements.statusLabel.textContent = current;
    STATUS_OPTIONS.forEach((label) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('role', 'menuitem');
      button.className = current === label ? 'is-current' : '';
      button.textContent = label;
      button.addEventListener('click', () => {
        statuses[book.id] = label;
        try { localStorage.setItem('amcl-reading-statuses', JSON.stringify(statuses)); } catch (_) {}
        elements.statusLabel.textContent = label;
        elements.statusMenu.hidden = true;
        elements.statusButton.setAttribute('aria-expanded', 'false');
        renderStatusMenu(book);
        elements.statusButton.focus();
      });
      elements.statusMenu.appendChild(button);
    });
  };

  const renderTab = (book) => {
    const tabButton = document.querySelector(`[data-tab="${activeTab}"]`);
    document.querySelectorAll('[data-tab]').forEach((button) => button.setAttribute('aria-selected', String(button === tabButton)));
    elements.panel.setAttribute('aria-labelledby', tabButton.id);
    if (activeTab === 'notes') {
      elements.panel.innerHTML = `<p class="finished">Finished ${escapeHtml(book.finished)}</p><p>${escapeHtml(book.note)} <span class="heart">♥</span></p><p>Moments I loved:</p><ul>${book.moments.map((moment) => `<li>${escapeHtml(moment)}</li>`).join('')}</ul>`;
    } else if (activeTab === 'quotes') {
      elements.panel.innerHTML = `<ul class="quote-list">${book.quotes.map((quote) => `<li>${escapeHtml(quote)}</li>`).join('')}</ul>`;
    } else {
      elements.panel.innerHTML = `<p class="author-name">${escapeHtml(book.author)}</p><p>${escapeHtml(book.aboutAuthor)}</p>`;
    }
    elements.panel.classList.remove('is-changing');
    void elements.panel.offsetWidth;
    elements.panel.classList.add('is-changing');
  };

  const renderJournal = () => {
    const book = getSelectedBook();
    elements.largeCover.innerHTML = coverMarkup(book);
    elements.title.textContent = book.title;
    elements.author.textContent = book.author;
    elements.rating.textContent = `${book.rating} (${book.ratings} ratings)`;
    renderStars(book.rating);
    elements.tags.innerHTML = book.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('');
    elements.blurb.textContent = book.blurb;
    elements.quote.textContent = `“${book.pullQuote}”`;
    renderStatusMenu(book);
    renderTab(book);
    elements.journalBook.classList.remove('is-turning');
    void elements.journalBook.offsetWidth;
    elements.journalBook.classList.add('is-turning');
  };

  const selectBook = (id, options = {}) => {
    if (id === selectedId && !options.force) return;
    selectedId = id;
    activeTab = 'notes';
    renderShelf();
    renderJournal();
    if (options.scroll) elements.journal.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
  };

  renderMoreMenu();
  renderFilters();
  renderShelf();
  renderJournal();

  elements.shuffle.addEventListener('click', () => {
    const visible = visibleBooks();
    const pool = visible.filter((book) => book.id !== selectedId);
    const fallback = BOOKS.filter((book) => book.id !== selectedId);
    const choices = pool.length ? pool : fallback;
    if (!choices.length) return;
    selectBook(choices[Math.floor(Math.random() * choices.length)].id, { scroll: true });
  });

  elements.statusButton.addEventListener('click', () => {
    const open = elements.statusMenu.hidden;
    elements.statusMenu.hidden = !open;
    elements.statusButton.setAttribute('aria-expanded', String(open));
  });

  document.querySelectorAll('[data-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      activeTab = button.dataset.tab;
      renderTab(getSelectedBook());
    });
    button.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      const tabs = [...document.querySelectorAll('[data-tab]')];
      const offset = event.key === 'ArrowRight' ? 1 : -1;
      const next = tabs[(tabs.indexOf(button) + offset + tabs.length) % tabs.length];
      next.focus();
      next.click();
    });
  });

  elements.searchToggle.addEventListener('click', () => {
    const open = elements.searchWrap.hidden;
    elements.searchWrap.hidden = !open;
    elements.searchToggle.setAttribute('aria-expanded', String(open));
    if (open) elements.searchInput.focus();
  });
  elements.searchInput.addEventListener('input', () => {
    query = elements.searchInput.value;
    renderShelf();
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.more-filter-wrap')) {
      elements.moreMenu.hidden = true;
      document.querySelector('.more-button')?.setAttribute('aria-expanded', 'false');
    }
    if (!event.target.closest('.status-picker')) {
      elements.statusMenu.hidden = true;
      elements.statusButton.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    elements.moreMenu.hidden = true;
    document.querySelector('.more-button')?.setAttribute('aria-expanded', 'false');
    elements.statusMenu.hidden = true;
    elements.statusButton.setAttribute('aria-expanded', 'false');
  });
})();
