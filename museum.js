// ═══════════════════════════════════════════════
//  🏛️ داده‌های موزه‌ها
//  برای افزودن موزه جدید، فقط یک آبجکت
//  جدید به این آرایه اضافه کن. تمام!
// ═══════════════════════════════════════════════
const museums = [
  {
    id: 'takht-jamshid',
    title: 'تخت جمشید',
    era: 'hakhamaneshi',
    eraLabel: 'هخامنشی',
    icon: '👑',
    location: 'فارس - مرودشت',
    description: 'پایتخت باشکوه امپراتوری هخامنشی؛ نماد هنر، معماری و قدرت ایران باستان.',
    image: '',
    tourUrl: 'https://share.google/MqniBykn7iXyYh6Xd',
    color: '#f59e0b'
  }

  // 👇 برای افزودن موزه بعدی، این الگو رو کپی کن:
  // ,{
  //   id: 'اسم-انگلیسی-بدون-فاصله',
  //   title: 'نام مکان',
  //   era: 'hakhamaneshi | ashkani | sasani | eslami | moaser',
  //   eraLabel: 'دوره به فارسی',
  //   icon: '🏛️',
  //   location: 'استان - شهر',
  //   description: 'یک جمله توضیح جذاب...',
  //   image: 'آدرس-عکس-اختیاری',
  //   tourUrl: 'لینک-تور-۳۶۰-درجه',
  //   color: '#6366f1'
  // }
];

// ═══════════════════════════════════════════════
//  🎨 رنگ پیش‌فرض بر اساس دوره (اگه رنگ نده)
// ═══════════════════════════════════════════════
const eraColors = {
  hakhamaneshi: '#f59e0b',
  ashkani:      '#10b981',
  sasani:       '#ec4899',
  eslami:       '#06b6d4',
  moaser:       '#8b5cf6'
};

// ═══════════════════════════════════════════════
//  🖼️ رندر کارت‌ها
// ═══════════════════════════════════════════════
function renderMuseums(filter = 'all') {
  const grid = document.getElementById('museumGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const list = museums.filter(m => filter === 'all' || m.era === filter);

  if (!list.length) {
    grid.innerHTML = '<p style="text-align:center;grid-column:1/-1;opacity:.7;padding:40px 0;font-weight:700">موزه‌ای در این دسته یافت نشد.</p>';
    return;
  }

  list.forEach((m, i) => {
    const card = document.createElement('article');
    card.className = 'museum-card';
    card.style.setProperty('--card-color', m.color || eraColors[m.era] || '#6366f1');
    card.style.animationDelay = `${i * 80}ms`;

    card.innerHTML = `
      <div class="card-image">
        <div class="card-image-fallback">${m.icon}</div>
        ${m.image ? `<img src="${m.image}" alt="${m.title}" loading="lazy" onerror="this.remove()">` : ''}
        <span class="card-badge">${m.icon} ${m.eraLabel}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${m.title}</h3>
        <p class="card-location">📍 ${m.location}</p>
        <p class="card-desc">${m.description}</p>
        <a href="${m.tourUrl}" target="_blank" rel="noopener noreferrer" class="tour-btn">
          <span class="tour-icon">🔄</span>
          شروع تور ۳۶۰ درجه
        </a>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ═══════════════════════════════════════════════
//  🎯 فیلترها
// ═══════════════════════════════════════════════
const filtersBox = document.getElementById('filters');
if (filtersBox) {
  filtersBox.addEventListener('click', (e) => {
    const chip = e.target.closest('.filter-chip');
    if (!chip) return;
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    renderMuseums(chip.dataset.filter);
  });
}

// 🚀 شروع
renderMuseums();
