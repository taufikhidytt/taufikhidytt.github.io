/**
 * Taufik Hidayat - Profile & Portfolio Scripts
 * Technologies: Vanilla JavaScript, jQuery, Bootstrap 5
 * Features: Dark/Light Mode, Typewriter, Scrollspy, Filtering, Modals, Form Validation
 */

$(document).ready(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. THEME SWITCHER (Dark / Light Mode)
     -------------------------------------------------------------------------- */
  const THEME_KEY = 'taufik_portfolio_theme';
  const $html = $('html');
  const $themeToggleBtn = $('#theme-toggle-btn');
  const $themeIcon = $('#theme-icon');

  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Default to Dark Mode as requested for calming modern navy palette
      setTheme('dark');
    }
  }

  function setTheme(theme) {
    $html.attr('data-bs-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    if (theme === 'light') {
      $themeIcon.removeClass('bi-moon-stars-fill').addClass('bi-sun-fill text-warning');
      $themeToggleBtn.attr('title', 'Beralih ke Mode Gelap');
    } else {
      $themeIcon.removeClass('bi-sun-fill text-warning').addClass('bi-moon-stars-fill');
      $themeToggleBtn.attr('title', 'Beralih ke Mode Terang');
    }
  }

  $themeToggleBtn.on('click', function () {
    const currentTheme = $html.attr('data-bs-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  });

  initTheme();

  /* --------------------------------------------------------------------------
     2. NAVBAR SCROLL EFFECT & READING PROGRESS
     -------------------------------------------------------------------------- */
  const $navbar = $('.custom-navbar');
  const $scrollProgress = $('#scroll-progress');
  const $scrollTopBtn = $('#btn-scroll-top');

  $(window).on('scroll', function () {
    const scrollTop = $(window).scrollTop();
    const docHeight = $(document).height() - $(window).height();
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    // Update reading progress bar
    $scrollProgress.css('width', scrollPercent + '%');

    // Navbar style on scroll
    if (scrollTop > 50) {
      $navbar.addClass('scrolled');
    } else {
      $navbar.removeClass('scrolled');
    }

    // Scroll to top button visibility
    if (scrollTop > 350) {
      $scrollTopBtn.addClass('show');
    } else {
      $scrollTopBtn.removeClass('show');
    }

    // Active nav link based on scroll position
    updateActiveNavLink();
  });

  // Scroll to top action
  $scrollTopBtn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 600);
  });

  /* --------------------------------------------------------------------------
     3. SMOOTH NAVIGATION & SCROLLSPY
     -------------------------------------------------------------------------- */
  $('.nav-link, .scroll-trigger').on('click', function (e) {
    const targetHref = $(this).attr('href');
    if (targetHref && targetHref.startsWith('#')) {
      e.preventDefault();
      const $target = $(targetHref);
      if ($target.length) {
        // Close mobile navbar collapse if open
        const $navbarCollapse = $('.navbar-collapse');
        if ($navbarCollapse.hasClass('show')) {
          $('.navbar-toggler').trigger('click');
        }

        const offsetTop = $target.offset().top - 70;
        $('html, body').animate({ scrollTop: offsetTop }, 600);
      }
    }
  });

  function updateActiveNavLink() {
    const scrollPos = $(window).scrollTop() + 100;
    $('section[id]').each(function () {
      const sectionTop = $(this).offset().top;
      const sectionHeight = $(this).outerHeight();
      const sectionId = $(this).attr('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        $('.custom-navbar .nav-link').removeClass('active');
        $(`.custom-navbar .nav-link[href="#${sectionId}"]`).addClass('active');
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. HERO TYPEWRITER EFFECT
     -------------------------------------------------------------------------- */
  const roles = [
    'Web Developer',
    'Full Stack Developer',
    'IT Enthusiast'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const deleteSpeed = 40;
  const pauseTime = 1800;

  function typeRole() {
    const currentRole = roles[roleIndex];
    const $typewriter = $('#typewriter-text');

    if (!$typewriter.length) return;

    if (isDeleting) {
      $typewriter.text(currentRole.substring(0, charIndex - 1));
      charIndex--;
    } else {
      $typewriter.text(currentRole.substring(0, charIndex + 1));
      charIndex++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 300;
    }

    setTimeout(typeRole, delay);
  }

  typeRole();

  /* --------------------------------------------------------------------------
     5. ANIMATED NUMBER COUNTERS
     -------------------------------------------------------------------------- */
  let countersTriggered = false;

  function runCounters() {
    if (countersTriggered) return;
    const $statsSection = $('#stats-section');
    if (!$statsSection.length) return;

    const elementTop = $statsSection.offset().top;
    const elementBottom = elementTop + $statsSection.outerHeight();
    const viewportTop = $(window).scrollTop();
    const viewportBottom = viewportTop + $(window).height();

    if (elementBottom > viewportTop && elementTop < viewportBottom) {
      countersTriggered = true;
      $('.stat-number').each(function () {
        const $this = $(this);
        const targetValue = parseInt($this.attr('data-target'), 10) || 0;
        const suffix = $this.attr('data-suffix') || '';

        $({ countNum: 0 }).animate(
          { countNum: targetValue },
          {
            duration: 1800,
            easing: 'swing',
            step: function () {
              $this.text(Math.floor(this.countNum) + suffix);
            },
            complete: function () {
              $this.text(targetValue + suffix);
            }
          }
        );
      });
    }
  }

  $(window).on('scroll', runCounters);
  runCounters();

  /* --------------------------------------------------------------------------
     6. SKILLS PROGRESS BARS TRIGGER
     -------------------------------------------------------------------------- */
  let skillsTriggered = false;

  function animateSkillBars() {
    if (skillsTriggered) return;
    const $skillsSection = $('#keahlian');
    if (!$skillsSection.length) return;

    const top = $skillsSection.offset().top;
    const bottom = top + $skillsSection.outerHeight();
    const viewTop = $(window).scrollTop();
    const viewBottom = viewTop + $(window).height();

    if (bottom > viewTop && top < viewBottom) {
      skillsTriggered = true;
      $('.progress-bar-custom').each(function () {
        const percent = $(this).attr('data-progress');
        $(this).css('width', percent + '%');
      });
    }
  }

  $(window).on('scroll', animateSkillBars);
  animateSkillBars();

  /* --------------------------------------------------------------------------
     7. TIMELINE TAB SWITCHING (Experience vs Education)
     -------------------------------------------------------------------------- */
  $('.timeline-nav-btn').on('click', function () {
    const targetGroup = $(this).attr('data-timeline');

    $('.timeline-nav-btn').removeClass('active');
    $(this).addClass('active');

    if (targetGroup === 'all') {
      $('.timeline-group').fadeIn(300);
    } else {
      $('.timeline-group').hide();
      $(`.timeline-group[data-group="${targetGroup}"]`).fadeIn(350);
    }
  });

  /* --------------------------------------------------------------------------
     8. PORTFOLIO FILTERING (jQuery)
     -------------------------------------------------------------------------- */
  $('.portfolio-filter-btn').on('click', function () {
    $('.portfolio-filter-btn').removeClass('active');
    $(this).addClass('active');

    const filter = $(this).attr('data-filter');
    const $items = $('.project-col');

    if (filter === 'all') {
      $items.stop(true, true).fadeIn(350);
    } else {
      $items.stop(true, true).each(function () {
        if ($(this).attr('data-category') === filter) {
          $(this).fadeIn(350);
        } else {
          $(this).fadeOut(200);
        }
      });
    }
  });

  /* --------------------------------------------------------------------------
     9. PROJECT DETAIL MODAL DATA
     -------------------------------------------------------------------------- */
  const projectsData = {
    1: {
      title: 'Slicing UI Flutter',
      category: 'APP',
      image: 'public/assets/images/project-image11.png',
      description: 'Platform toko online modern dan responsif dengan fitur katalog produk terstruktur, filter kategori dinamis, keranjang belanja interaktif (cart), kalkulator ongkir otomatis, dan sistem checkout mulus.',
      features: [
        'Katalog produk responsif dengan pencarian instan',
        'Manajemen keranjang belanja dengan penyimpanan LocalStorage',
        'Simulasi pembayaran & invoice terstruktur',
        'Panel ringkasan pesanan & notifikasi interaktif',
        'Desain mobile-friendly yang dioptimalkan untuk performa tinggi'
      ],
      tech: ['HTML5', 'CSS3', 'Bootstrap 5', 'jQuery', 'Vanilla JS', 'LocalStorage API'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    2: {
      title: 'Dashboard Order & Delivery',
      category: 'Dashboard Statistik',
      image: 'public/assets/images/img-inti-dashboard.png',
      description: 'Dashboard analitik bisnis interaktif dengan grafik pengiriman, pemantauan trafik real-time dan manajemen tabel pengiriman.',
      features: [
        'Visualisasi grafik interaktif & ringkasan revenue',
        'Filter data berdasarkan rentang waktu',
        'Manajemen data pengguna dan tabel transaksi cepat',
        'Mengetahui rata rata perpindahan status delivery',
        'Menyajian perangkingan driver sebagai bahan penilaian dari order dan pengiriman yang berhasil'
      ],
      tech: ['Bootstrap', 'Chart.js', 'jQuery', 'HTML', 'CSS'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    3: {
      title: 'Operations Management System',
      category: 'Website',
      image: 'public/assets/images/img-inti-login.PNG',
      description: 'Website operasional yang didalamnya terdiri dari order & delivery, booking ruang meeting, booking kendaraan, inventory GA Team.',
      features: [
        'Pendataan yang lebih terstruktur dan keterbukaan akses',
        'Realtime data yang tersedia',
        'Analisa dari data yang tersedia dengan bentuk dashboard chart',
        'Kemudahan user untuk penggunaan',
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap', 'Ajax', 'PHP', 'Codeigniter 3', 'MySql'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    4: {
      title: 'Work Order Management System',
      category: 'Website',
      image: 'public/assets/images/img-regis-login.PNG',
      description: 'System berfokus untuk request client, mendistribusikan, dan memantau perintah kerja sesuai dengan request client.',
      features: [
        'Kemudahan akses',
        'Pendataan terpusat',
        'Assignment langsung ke engineer',
        'Fitur diskusi langsung dengan client room diskusi website',
        'Laporan lebih terintegritas',
        'Management waktu deadline lebih terarah'
      ],
      tech: ['HTML', 'CSS', 'Bootstrap', 'jQuery', 'Javascript', 'Ajax', 'PHP', 'Codeigniter 3', 'MySql'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    5: {
      title: 'Dashboard Calendar Work Order Management System',
      category: 'Dashboard Statistik',
      image: 'public/assets/images/img-regis-dashboard.PNG',
      description: 'Dashboard calendar bisnis interaktif dengan tiketing pada setiap tanggal request, pemantauan aktifitas real-time dan manajemen tabel pekerjaan.',
      features: [
        'Simpan & salin cuplikan kode favorit dengan satu kali klik',
        'Generator pesan Git commit standar profesional',
        'Markdown viewer real-time dengan syntax highlighting',
        'Pencarian cepat dan penandaan tag teknologi',
        'Desain tema gelap bernuansa terminal modern'
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'jQuery', 'Chart.js'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    6: {
      title: 'Inquiry System',
      category: 'Website',
      image: 'public/assets/images/img-inq-login.PNG',
      description: 'System inquiry bertujuan untuk memusatkan seluruh inquiry dari client dalam satu platform dari sales to sales cabang dan sales to purchase.',
      features: [
        'Sebagai penghubung sales to sales cabang',
        'Media komunikasi terpusat antar sales to purchase',
        'Akses yang mudah dan penggunan lebih sederhana',
        'Laporan yang lebih dinamis',
      ],
      tech: ['HTML', 'CSS', 'Bootstrap', 'jQuery Javascript', 'Ajax', 'PHP', 'Codeigniter 3', 'MySql'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    7: {
      title: 'Landing Page Recruitment',
      category: 'Landing Page',
      image: 'public/assets/images/img-hr-landing.png',
      description: 'Website recruitment halaman untuk user public yang ingin mencari informasi opportunity karir serta cabang-cabang.',
      features: [
        'UI yang lebih simple',
        'Warna yang lebih stabil',
        'Akses yang mudah dan penggunan lebih sederhana',
      ],
      tech: ['HTML', 'CSS', 'Bootstrap', 'jQuery Javascript', 'Ajax', 'PHP', 'Codeigniter 3', 'MySql'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    8: {
      title: 'Recruitment System',
      category: 'Website',
      image: 'public/assets/images/img-hr-login.PNG',
      description: 'Recruitment system untuk internal dan cabang mengelola kebutuhan posisi yang dibutuhkan dengan final berada di HR untuk mengelolanya.',
      features: [
        'Akses yang mudah dan penggunan lebih sederhana',
        'Data terpusat antar bagian',
        'Keterbukaan data yang jelas',
        'Record data yang dapat menjadi laporan yang lebih dinamis dan jelas',
      ],
      tech: ['HTML', 'CSS', 'Bootstrap', 'jQuery Javascript', 'Ajax', 'PHP', 'Codeigniter 3', 'MySql'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    9: {
      title: 'Recruitment System',
      category: 'Website',
      image: 'public/assets/images/img-crm-login.PNG',
      description: 'Customer Relationship Management System adalah sistem yang digunakan untuk mengelola hubungan dan interaksi dengan client, pengelolaan kebutuhan client, tindak lanjut permintaan, hingga pemantauan layanan dan riwayat komunikasi.',
      features: [
        'Mengelola data kontak dan informasi pelanggan dan calon pelanggan',
        'Mengelola proses dan peluang penjualan',
        'Mengelola tugas, jadwal, dan aktivitas tindak lanjut',
        'Mendokumentasikan komunikasi dengan pelanggan',
        'Laporan dan dashboard statistik untuk mengambil keputusan dan penilaian',
      ],
      tech: ['HTML', 'CSS', 'Bootstrap', 'jQuery Javascript', 'Ajax', 'PHP', 'Laravel 12', 'MySql'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    10: {
      title: 'Dashboard CRM',
      category: 'Dashboard Statistik',
      image: 'public/assets/images/img-crm-dashboard1.png',
      description: 'Dashboard CRM untuk menampilkan ringkasan informasi client, status permintaan, penugasan pekerjaan, serta aktivitas dan performa tim dalam satu tampilan terpusat.',
      features: [
        'Mengelola data kontak dan informasi pelanggan dan calon pelanggan',
        'Mengelola proses dan peluang penjualan',
        'Mengelola tugas, jadwal, dan aktivitas tindak lanjut',
        'Mendokumentasikan komunikasi dengan pelanggan',
        'Laporan dan dashboard statistik untuk mengambil keputusan dan penilaian',
      ],
      tech: ['HTML', 'CSS', 'Bootstrap', 'jQuery Javascript', 'Ajax', 'Chart.js', 'PHP', 'Laravel 12', 'MySql'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    11: {
      title: 'Dashboard CRM',
      category: 'Dashboard Statistik',
      image: 'public/assets/images/img-crm-dashboard2.png',
      description: 'Dashboard CRM untuk menampilkan ringkasan informasi client, status permintaan, penugasan pekerjaan, serta aktivitas dan performa tim dalam satu tampilan terpusat.',
      features: [
        'Mengelola data kontak dan informasi pelanggan dan calon pelanggan',
        'Mengelola proses dan peluang penjualan',
        'Mengelola tugas, jadwal, dan aktivitas tindak lanjut',
        'Mendokumentasikan komunikasi dengan pelanggan',
        'Laporan dan dashboard statistik untuk mengambil keputusan dan penilaian',
      ],
      tech: ['HTML', 'CSS', 'Bootstrap', 'jQuery Javascript', 'Ajax', 'Chart.js', 'PHP', 'Laravel 12', 'MySql'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    12: {
      title: 'Dashboard CRM',
      category: 'Dashboard Statistik',
      image: 'public/assets/images/img-crm-dashboard3.png',
      description: 'Dashboard CRM untuk menampilkan ringkasan informasi client, status permintaan, penugasan pekerjaan, serta aktivitas dan performa tim dalam satu tampilan terpusat.',
      features: [
        'Mengelola data kontak dan informasi pelanggan dan calon pelanggan',
        'Mengelola proses dan peluang penjualan',
        'Mengelola tugas, jadwal, dan aktivitas tindak lanjut',
        'Mendokumentasikan komunikasi dengan pelanggan',
        'Laporan dan dashboard statistik untuk mengambil keputusan dan penilaian',
      ],
      tech: ['HTML', 'CSS', 'Bootstrap', 'jQuery Javascript', 'Ajax', 'Chart.js', 'PHP', 'Laravel 12', 'MySql'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    13: {
      title: 'Dashboard CRM',
      category: 'Dashboard Statistik',
      image: 'public/assets/images/img-crm-dashboard4.png',
      description: 'Dashboard CRM untuk menampilkan ringkasan informasi client, status permintaan, penugasan pekerjaan, serta aktivitas dan performa tim dalam satu tampilan terpusat.',
      features: [
        'Mengelola data kontak dan informasi pelanggan dan calon pelanggan',
        'Mengelola proses dan peluang penjualan',
        'Mengelola tugas, jadwal, dan aktivitas tindak lanjut',
        'Mendokumentasikan komunikasi dengan pelanggan',
        'Laporan dan dashboard statistik untuk mengambil keputusan dan penilaian',
      ],
      tech: ['HTML', 'CSS', 'Bootstrap', 'jQuery Javascript', 'Ajax', 'Chart.js', 'PHP', 'Laravel 12', 'MySql'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    14: {
      title: 'Marketplace Website',
      category: 'Website',
      image: 'public/assets/images/project-image04.png',
      description: 'System ini untuk sarana latihan dan belajar membuat marketplace sendiri dengan kebutuhan kebutuhan pengembangan diri sendiri.',
      features: [
        'Project untuk belajar dan explore',
        'Mengelola barang dan peluang penjualan',
        'Mengelola transaksi penjualan',
        'Mendokumentasikan dalam bentuk laporan',
      ],
      tech: ['Wordpress'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    15: {
      title: 'Landing Page',
      category: 'Landing Page',
      image: 'public/assets/images/project-image02.png',
      description: 'Website landing page untuk membuat halaman antar muka dengan menjadikan halaman utama',
      features: [
        'Project untuk belajar dan explore',
        'Membentuk layout yang minimalis',
        'Mengelola perpaduan warna dan gambar',
      ],
      tech: ['HTML', 'CSS', 'Bootstrap', 'Javascript', 'jQuery'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    16: {
      title: 'Website Portofolio',
      category: 'Landing Page',
      image: 'public/assets/images/project-image03.png',
      description: 'Website Portofolio yang dikhususkan untuk menampilkan project project serta data diri dan experiance agar memudahkan untuk mengaksesenya',
      features: [
        'Project untuk showcase project, experiance, perkenalan diri',
        'Membentuk layout yang minimalis',
        'Akses yang mudah',
      ],
      tech: ['HTML', 'CSS', 'Bootstrap'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    17: {
      title: 'Website Pendataan Penggajian',
      category: 'Website',
      image: 'public/assets/images/project-image01.png',
      description: 'Website ini platform berbasis web yang digunakan untuk mengelola, mencatat, dan memantau data penggajian karyawan secara terpusat, mulai dari data karyawan, komponen gaji. Project ini sebagai bentuk project latihan untuk mengembangkan diri',
      features: [
        'Project untuk belajar dan mengembangkan diri',
        'Master data penggajian',
        'Transaction penggajian',
        'Laporan record data penggajian',
      ],
      tech: ['HTML', 'CSS', 'Bootstrap', 'Javascript', 'PHP', 'Codeigniter 3', 'MySql'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    18: {
      title: 'Website CMS',
      category: 'Website',
      image: 'public/assets/images/project-image10.png',
      description: 'Website CMS ini project freelance yang di gunakan untuk memperkenalkan usaha kepada calon customer.',
      features: [
        'Akses lebih mudah',
        'Monolith arsitektur',
        'Pendataan lebih dinamis',
        'Konten berita update',
      ],
      tech: ['HTML', 'CSS', 'Bootstrap', 'Javascript', 'jQuery', 'Ajax', 'PHP', 'Codeigniter 3', 'MySql'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    19: {
      title: 'Website Travel',
      category: 'Website',
      image: 'public/assets/images/project-image05.png',
      description: 'Website ini dibangun dan dibentuk sebagai hasil akhir dari course dari <a href="https://buildwithangga.com/" target="_blank">buildwithangga.com</a>.',
      features: [
        'Project latihan dan explore',
        'Mengelola data lebih sederhana',
        'Akses yang mudah',
        'Monolith arsitektur',
      ],
      tech: ['HTML', 'CSS', 'Bootstrap', 'Javascript', 'PHP', 'Laravel 7', 'MySql'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    20: {
      title: 'Website CMS BAZNAS Kota Tangerang',
      category: 'Website',
      image: 'public/assets/images/project-image07.png',
      description: 'Website atau platform yang digunakan untuk membuat, mengelola, memperbarui, dan mempublikasikan konten digital melalui satu sistem terpusat tanpa harus mengubah kode program secara langsung untuk setiap pembaruan konten.',
      features: [
        'Management konten berita lebih dinamis',
        'Mengelola informasi lebih sederhana',
        'Akses yang mudah',
        'Monolith arsitektur',
      ],
      tech: ['HTML', 'CSS', 'Bootstrap', 'Javascript', 'jQuery', 'Ajax', 'PHP', 'Codeigniter 3', 'MySql'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    21: {
      title: 'Website CMS Diskominfo Kota Tangerang',
      category: 'Website',
      image: 'public/assets/images/project-image08.png',
      description: 'Website atau platform yang digunakan untuk membuat, mengelola, memperbarui, dan mempublikasikan konten digital melalui satu sistem terpusat tanpa harus mengubah kode program secara langsung untuk setiap pembaruan konten.',
      features: [
        'Management konten berita lebih dinamis',
        'Mengelola informasi lebih sederhana',
        'Akses yang mudah',
        'Monolith arsitektur',
      ],
      tech: ['HTML', 'CSS', 'Bootstrap', 'Javascript', 'jQuery', 'Ajax', 'PHP', 'Codeigniter 3', 'MySql'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    22: {
      title: 'Website CMS Dinkes Kota Tangerang',
      category: 'Website',
      image: 'public/assets/images/project-image09.png',
      description: 'Website atau platform yang digunakan untuk membuat, mengelola, memperbarui, dan mempublikasikan konten digital melalui satu sistem terpusat tanpa harus mengubah kode program secara langsung untuk setiap pembaruan konten.',
      features: [
        'Management konten berita lebih dinamis',
        'Mengelola informasi lebih sederhana',
        'Akses yang mudah',
        'Monolith arsitektur',
      ],
      tech: ['HTML', 'CSS', 'Bootstrap', 'Javascript', 'jQuery', 'Ajax', 'PHP', 'Codeigniter 3', 'MySql'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    23: {
      title: 'Inventory System',
      category: 'Website',
      image: 'public/assets/images/project-image06.png',
      description: 'Website inventory ini dibuat untuk bahan belajar dengan studi kasus inventory.',
      features: [
        'Project belajar dan explore',
        'Manajemen gudang penyimpanan',
        'Akses yang mudah',
        'Monolith arsitektur',
      ],
      tech: ['HTML', 'CSS', 'Bootstrap', 'Javascript', 'PHP', 'Laravel 7', 'MySql'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
  };

  // Open Project Detail Modal
  $('.btn-project-detail').on('click', function (e) {
    e.preventDefault();
    const projectId = $(this).attr('data-project-id');
    const project = projectsData[projectId];

    if (!project) return;

    $('#modal-project-title').text(project.title);
    $('#modal-project-category').text(project.category);
    $('#modal-project-img').attr('src', project.image).attr('alt', project.title);
    $('#modal-project-desc').text(project.description);

    // Render features
    const $featuresList = $('#modal-project-features');
    $featuresList.empty();
    project.features.forEach(function (feat) {
      $featuresList.append(`<li><i class="bi bi-check-circle-fill text-info me-2"></i>${feat}</li>`);
    });

    // Render tech stack
    const $techStack = $('#modal-project-tech');
    $techStack.empty();
    project.tech.forEach(function (t) {
      $techStack.append(`<span class="tech-tag">${t}</span>`);
    });

    // Update buttons
    $('#modal-demo-btn').attr('href', project.demoUrl);
    $('#modal-github-btn').attr('href', project.githubUrl);

    // Show Bootstrap modal
    const projectModal = new bootstrap.Modal(document.getElementById('projectDetailModal'));
    projectModal.show();
  });

  /* --------------------------------------------------------------------------
     10. CERTIFICATE VIEW MODAL
     -------------------------------------------------------------------------- */
  const certData = {
    1: {
      title: 'Belajar Dasar Pemograman Web',
      issuer: 'Dicoding Academy',
      date: '2020',
      description: 'Sertifikasi kompetensi tingkat dasar dalam membangun aplikasi web modern yang menerapkan prinsip responsive terhadap tampilan web dan mobile.',
      skills: ['HTML', 'CSS', 'JavaScript']
    },
    2: {
      title: 'Fullstack Web Developer',
      issuer: 'Buildwithangga.com',
      date: '2020',
      description: 'Sertifikasi penguasaan web programming, flexbox, CSS grid, semantic HTML5, dan desain antarmuka adaptif untuk multi-perangkat. Dengan project akhir membuat e-ticketing',
      skills: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'PHP', 'Laravel', 'MySql']
    },
    3: {
      title: 'Fudamental of Flutter',
      issuer: 'Course-Net.com',
      date: '2023',
      description: 'Dasar fudamental dari Flutter dengan pengenalan widget dan arsitektur dart dan flutter.',
      skills: ['Dart', 'Flutter']
    },
    4: {
      title: 'Bootcamp Fullstack Web Developer',
      issuer: 'Rakamin Academy',
      date: '2024',
      description: 'Fondasi komprehensif pengembangan web dengan javascript, manipulasi Document Object Model (DOM), penanganan event asinkron, dan integrasi antarmuka berbasis standar industri. Dengan project akhir membuat e-commerce',
      skills: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'Express Js', 'React Js', 'DOM Manipulation', 'REST API', 'MySql']
    }
  };

  $('.btn-cert-detail').on('click', function (e) {
    e.preventDefault();
    const certId = $(this).attr('data-cert-id');
    const cert = certData[certId];
    if (!cert) return;

    $('#modal-cert-title').text(cert.title);
    $('#modal-cert-issuer').text(cert.issuer);
    $('#modal-cert-date').text(cert.date);
    $('#modal-cert-desc').text(cert.description);

    const $skillsList = $('#modal-cert-skills');
    $skillsList.empty();
    cert.skills.forEach(function (sk) {
      $skillsList.append(`<span class="tech-tag">${sk}</span>`);
    });

    const certModal = new bootstrap.Modal(document.getElementById('certDetailModal'));
    certModal.show();
  });

  /* --------------------------------------------------------------------------
     11. INTERACTIVE CONTACT FORM & VALIDATION
     -------------------------------------------------------------------------- */
  const $contactForm = $('#contact-form');
  const $formAlert = $('#form-alert');
  const $messageInput = $('#contact-message');
  const $charCount = $('#char-count');

  // Character counter for message input
  $messageInput.on('input', function () {
    const len = $(this).val().length;
    $charCount.text(len);
  });

  $contactForm.on('submit', function (e) {
    e.preventDefault();

    const name = $('#contact-name').val().trim();
    const email = $('#contact-email').val().trim();
    const subject = $('#contact-subject').val().trim();
    const message = $messageInput.val().trim();

    // Validation
    if (!name || !email || !subject || !message) {
      showFormAlert('danger', 'Harap lengkapi semua kolom formulir sebelum mengirim pesan.');
      return;
    }

    // Email regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormAlert('warning', 'Format alamat email tidak valid. Harap periksa kembali.');
      return;
    }

    // Submit state animation
    const $submitBtn = $('#btn-submit-contact');
    const originalBtnHtml = $submitBtn.html();
    $submitBtn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2" role="status"></span>Mengirim Pesan...');

    setTimeout(function () {
      $submitBtn.prop('disabled', false).html(originalBtnHtml);
      $contactForm[0].reset();
      $charCount.text('0');

      showFormAlert('success', `Terima kasih, <strong>${name}</strong>! Pesan Anda telah berhasil dikirim. Saya akan segera menghubungi Anda melalui <strong>${email}</strong>.`);

      // Also trigger a bootstrap toast
      showToast('Pesan Terkirim!', `Halo ${name}, pesan Anda berhasil dikirim ke hidytt.taufik@gmail.com.`);
    }, 1200);
  });

  function showFormAlert(type, message) {
    $formAlert.html(`
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <div>${message}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `).fadeIn(200);
  }

  /* --------------------------------------------------------------------------
     12. QUICK COPY EMAIL ACTION & TOAST
     -------------------------------------------------------------------------- */
  $('.btn-copy-email').on('click', function (e) {
    e.preventDefault();
    const emailToCopy = 'hidytt.taufik@gmail.com';

    if (navigator.clipboard) {
      navigator.clipboard.writeText(emailToCopy).then(function () {
        showToast('Email Disalin!', 'Alamat email hidytt.taufik@gmail.com berhasil disalin ke clipboard.');
      }).catch(function () {
        fallbackCopyText(emailToCopy);
      });
    } else {
      fallbackCopyText(emailToCopy);
    }
  });

  function fallbackCopyText(text) {
    const $temp = $('<input>');
    $('body').append($temp);
    $temp.val(text).select();
    document.execCommand('copy');
    $temp.remove();
    showToast('Email Disalin!', 'Alamat email ' + text + ' berhasil disalin.');
  }

  function showToast(title, body) {
    $('#toast-title').text(title);
    $('#toast-body').html(body);
    const toastElem = document.getElementById('liveToast');
    const toast = new bootstrap.Toast(toastElem, { delay: 4000 });
    toast.show();
  }

  /* --------------------------------------------------------------------------
     13. SCROLL REVEAL ANIMATIONS
     -------------------------------------------------------------------------- */
  function checkReveal() {
    const windowBottom = $(window).scrollTop() + $(window).height() - 50;

    $('.reveal-fade').each(function () {
      const elementTop = $(this).offset().top;
      if (windowBottom > elementTop) {
        $(this).addClass('active');
      }
    });
  }

  $(window).on('scroll', checkReveal);
  checkReveal();

  console.log('Taufik Hidayat Portfolio initialized successfully.');
});
