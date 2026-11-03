const museums = [
  {
    id: 'takht-jamshid',
    title: 'تخت جمشید',
    era: 'hakhamaneshi',
    eraLabel: 'هخامنشی',
    icon: '👑',
    location: 'فارس - مرودشت',
    description: 'پایتخت باشکوه امپراتوری هخامنشی؛ نماد هنر، معماری و قدرت ایران باستان.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/نقش_برجسته_های_زیبای_تاریخی_تخت_جمشید.jpg/800px-نقش_برجسته_های_زیبای_تاریخی_تخت_جمشید.jpg', // تصویر از ویکی‌مدیا [citation:20]
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/آرامگاه_حافظ_شیرازی.jpg/800px-آرامگاه_حافظ_شیرازی.jpg', // تصویر از ویکی‌مدیا [citation:21]
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/سعدیه_یا_آرامگاه_سعدی_شیراز_ایران-Tomb_of_Saadi_shiraz_iran_04.jpg/800px-سعدیه_یا_آرامگاه_سعدی_شیراز_ایران-Tomb_of_Saadi_shiraz_iran_04.jpg', // تصویر از ویکی‌مدیا [citation:22]
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
    image: '', // متأسفانه در نتایج جستجو تصویر مستقیمی از شاهچراغ در ویکی‌مدیا یافت نشد. می‌توانید از تور مجازی عکس بگیرید یا بعداً اضافه کنید.
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/نقش_رستم.JPG/800px-نقش_رستم.JPG', // تصویر از ویکی‌مدیا [citation:23]
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/A_store_in_Vakil_Bazaar_in_shiraz_credit_to_Ghazal_kohandel_یک_مغازه_در_بازار_وکیل_شیراز_عکاس_غزاله_کهن_دل.jpg/800px-A_store_in_Vakil_Bazaar_in_shiraz_credit_to_Ghazal_kohandel_یک_مغازه_در_بازار_وکیل_شیراز_عکاس_غزاله_کهن_دل.jpg', // تصویر از ویکی‌مدیا [citation:24]
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/موزه_فرش_در_حمام_وکیل_شیراز_سال_۲۰۰۹_میلادی_مصطفی_معراجی_06.jpg/800px-موزه_فرش_در_حمام_وکیل_شیراز_سال_۲۰۰۹_میلادی_مصطفی_معراجی_06.jpg', // تصویر از ویکی‌مدیا [citation:25]
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/مسجد_وکیل_شیراز،مجموعه_ای_در_خور_توجه_و_مرمت2.jpg/800px-مسجد_وکیل_شیراز،مجموعه_ای_در_خور_توجه_و_مرمت2.jpg', // تصویر از ویکی‌مدیا [citation:26]
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Naranjestan_%2827%29.jpg/800px-Naranjestan_%2827%29.jpg', // تصویر از ویکی‌مدیا [citation:27]
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/خانه_زینت_الملک.jpg/800px-خانه_زینت_الملک.jpg', // تصویر از ویکی‌مدیا [citation:28]
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
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Arg_of_Karim_Khan_ارگ_کریم_خان_زند_در_شیراز_25.jpg/800px-Arg_of_Karim_Khan_ارگ_کریم_خان_زند_در_شیراز_25.jpg', // تصویر از ویکی‌مدیا [citation:29]
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
    image: '', // برای این مورد و موارد زیر در جستجوی فعلی تصویر مستقیم از کامنز پیدا نشد.
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
];
