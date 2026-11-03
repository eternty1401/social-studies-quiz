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
  },
  {
    id: 'hafezieh',
    title: 'حافظیه',
    era: 'eslami',
    eraLabel: 'تاریخی',
    icon: '📜',
    location: 'فارس - شیراز',
    description: 'آرامگاه لسان‌الغیب، شاعر بزرگ ایرانی؛ محبوب‌ترین جاذبه تاریخی و فرهنگی شیراز.',
    image: '',
    tourUrl: 'https://www.panoman.ir/vt/shiraz/hafezieh/',
    color: '#10b981'
  },
  {
    id: 'sadieh',
    title: 'آرامگاه سعدی',
    era: 'eslami',
    eraLabel: 'تاریخی',
    icon: '✒️',
    location: 'فارس - شیراز',
    description: 'آرامگاه استاد سخن، سعدی شیرازی؛ مکان زیارتی و فرهنگی با معماری چشم‌نواز.',
    image: '',
    tourUrl: 'https://www.panoman.ir/vt/shiraz/sadieh/',
    color: '#0ea5e9'
  },
  {
    id: 'shahe-cheragh',
    title: 'شاهچراغ',
    era: 'eslami',
    eraLabel: 'مذهبی',
    icon: '🕌',
    location: 'فارس - شیراز',
    description: 'زیارتگاه احمد بن موسی (ع)؛ شاهکاری از کاشی‌کاری و آینه‌کاری در قلب شیراز.',
    image: '',
    tourUrl: 'https://www.panoman.ir/vt/shiraz/shahe-cheragh/',
    color: '#14b8a6'
  },
  {
    id: 'naghshe-rostam',
    title: 'نقش رستم',
    era: 'hakhamaneshi',
    eraLabel: 'هخامنشی',
    icon: '⛰️',
    location: 'فارس - مرودشت',
    description: 'مجموعه‌ای از آرامگاه‌های صخره‌ای و نقش‌برجسته‌های باستانی از دوره هخامنشی و ساسانی.',
    image: '',
    tourUrl: 'https://www.panoman.ir/vt/naghshe-rostam/index.htm',
    color: '#f97316'
  },
  {
    id: 'vakil-bazaar',
    title: 'بازار وکیل',
    era: 'eslami',
    eraLabel: 'زندیه',
    icon: '🛍️',
    location: 'فارس - شیراز',
    description: 'بازار سنتی باشکوه به جا مانده از دوران کریم‌خان زند؛ مرکز تجارت و هنر قدیم شیراز.',
    image: '',
    tourUrl: 'https://www.panoman.ir/vt/shiraz/vakil-bazaar/',
    color: '#eab308'
  },
  {
    id: 'vakil-bath',
    title: 'حمام وکیل',
    era: 'eslami',
    eraLabel: 'زندیه',
    icon: '💧',
    location: 'فارس - شیراز',
    description: 'حمام تاریخی با معماری بی‌نظیر و ستون‌های سنگی؛ نمونه‌ای از معماری اصیل زندیه.',
    image: '',
    tourUrl: 'https://www.panoman.ir/vt/shiraz/vakil-bath/',
    color: '#06b6d4'
  },
  {
    id: 'vakil-mosque',
    title: 'مسجد وکیل',
    era: 'eslami',
    eraLabel: 'زندیه',
    icon: '🕌',
    location: 'فارس - شیراز',
    description: 'مسجدی با شکوه از دوره زندیه که کاشی‌کاری‌های زیبای آن زبانزد عام و خاص است.',
    image: '',
    tourUrl: 'https://www.panoman.ir/vt/shiraz/vakil-mosque/',
    color: '#8b5cf6'
  },
  {
    id: 'ghavam-orangery',
    title: 'نارنجستان قوام',
    era: 'eslami',
    eraLabel: 'قاجار',
    icon: '🍊',
    location: 'فارس - شیراز',
    description: 'عمارتی زیبا در دل باغی پر از درختان نارنج؛ شاهکار معماری دوره قاجار.',
    image: '',
    tourUrl: 'https://www.panoman.ir/vt/shiraz/ghavam-orangery/',
    color: '#f59e0b'
  },
  {
    id: 'zinat-almolk-house',
    title: 'خانه زینت‌الملک',
    era: 'eslami',
    eraLabel: 'قاجار',
    icon: '🏛️',
    location: 'فارس - شیراز',
    description: 'خانه‌ای تاریخی با معماری ایرانی-اسلامی و تزئینات چشم‌نواز در قلب شیراز.',
    image: '',
    tourUrl: 'https://www.panoman.ir/vt/shiraz/zinat-almolk-house/',
    color: '#ec4899'
  },
  {
    id: 'arg-e-karimkhan',
    title: 'ارگ کریم‌خان',
    era: 'eslami',
    eraLabel: 'زندیه',
    icon: '🏰',
    location: 'فارس - شیراز',
    description: 'قلعه‌ای باشکوه از دوران کریم‌خان زند؛ مرکز حکومت و اقامتگاه او در شیراز.',
    image: '',
    tourUrl: 'https://www.panoman.ir/vt/shiraz/arg-e-karimkhan/',
    color: '#f43f5e'
  },
  {
    id: 'naghshe-jahan',
    title: 'میدان نقش جهان',
    era: 'eslami',
    eraLabel: 'صفویه',
    icon: '🕌',
    location: 'اصفهان',
    description: 'میدان بزرگ و باشکوه دوره صفویه؛ یکی از بزرگترین میدان‌های تاریخی جهان.',
    image: '',
    tourUrl: 'https://www.panoman.ir/vt/isfahan/naghshe-jahan/',
    color: '#6366f1'
  },
  {
    id: 'milad-tower',
    title: 'برج میلاد',
    era: 'moaser',
    eraLabel: 'معاصر',
    icon: '🗼',
    location: 'تهران',
    description: 'بلندترین برج ایران؛ نماد مدرن تهران با چشم‌اندازی بی‌نظیر از پایتخت.',
    image: '',
    tourUrl: 'https://www.panoman.ir/vt/tehran/milad/',
    color: '#475569'
  },
  {
    id: 'kamal-almolk-house',
    title: 'خانه کمال‌الملک',
    era: 'eslami',
    eraLabel: 'قاجار',
    icon: '🎨',
    location: 'اصفهان - کاشان',
    description: 'خانه تاریخی نقاش بزرگ ایران، محمد غفاری (کمال‌الملک)؛ نگین معماری کاشان.',
    image: '',
    tourUrl: 'https://www.panoman.ir/vt/kashan/kamal-almolk/',
    color: '#84cc16'
  },
  {
    id: 'blackdate-tour',
    title: 'تور مجازی بافت تاریخی',
    era: 'eslami',
    eraLabel: 'تاریخی',
    icon: '🧭',
    location: 'ایران',
    description: 'مجموعه‌ای از تورهای ۳۶۰ درجه از جاذبه‌های تاریخی و گردشگری ایران.',
    image: '',
    tourUrl: 'https://blackdate.ir/vtour/index.htm',
    color: '#a855f7'
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
