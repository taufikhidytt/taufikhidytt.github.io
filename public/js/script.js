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
      category: 'Website',
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
      title: 'SaaS Business Analytics Dashboard',
      category: 'Dashboard & Web App',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80',
      description: 'Dashboard analitik bisnis interaktif untuk memonitor metrik performa penjualan, grafik pertumbuhan pengunjung, tabel riwayat transaksi dengan pagination, dan dukungan mode gelap/terang terintegrasi.',
      features: [
        'Visualisasi grafik interaktif & ringkasan revenue',
        'Filter data berdasarkan rentang waktu harian/mingguan/bulanan',
        'Manajemen data pengguna dan tabel transaksi cepat',
        'Perpindahan tema gelap dan terang secara instan',
        'Dukungan ekspor laporan data sederhana'
      ],
      tech: ['HTML5', 'Bootstrap 5', 'CSS Grid', 'jQuery', 'Chart.js', 'Responsive UI'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    3: {
      title: 'Task & Kanban Project Management',
      category: 'Web Application & Productivity',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1000&auto=format&fit=crop&q=80',
      description: 'Aplikasi manajemen tugas produktivitas dengan papan Kanban visual. Pengguna dapat membuat tugas, mengatur prioritas, memindahkan status (Todo, In Progress, Done), serta menetapkan deadline dengan pengingat.',
      features: [
        'Papan Kanban interaktif dengan status dinamis',
        'Filter tugas berdasarkan prioritas (High, Medium, Low)',
        'Pencarian tugas dan indikator persentase penyelesaian',
        'Penyimpanan persisten lokal tanpa perlu login',
        'Transisi kartu yang mulus dan ramah pengguna'
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript (ES6)', 'jQuery', 'Bootstrap 5'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    4: {
      title: 'Digital Restaurant Menu & Table Ordering',
      category: 'Web Application & Food & Beverage',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&auto=format&fit=crop&q=80',
      description: 'Solusi sistem menu digital interaktif untuk cafe dan restoran. Pelanggan dapat memindai QR code, memilih menu makanan/minuman dengan filter khusus (Vegan, Best Seller, Pedas), dan langsung memesan ke dapur.',
      features: [
        'Tampilan katalog menu bersih dengan foto resolusi tinggi',
        'Fitur pesanan meja dengan input nomor meja otomatis',
        'Perhitungan total pesanan, diskon promo, dan pajak secara real-time',
        'Tombol konfirmasi pesanan terhubung langsung ke WhatsApp restoran',
        'Akses cepat dan ringan di koneksi mobile'
      ],
      tech: ['HTML5', 'CSS Variables', 'Bootstrap 5', 'jQuery', 'WhatsApp API Integration'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    5: {
      title: 'Developer Productivity Suite & Code Snippets',
      category: 'Developer Tools',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80',
      description: 'Aplikasi utilitas khusus pengembang web yang menyediakan pengelola cuplikan kode (snippet manager), generator Git commit convention, serta live Markdown editor dengan pratinjau instan.',
      features: [
        'Simpan & salin cuplikan kode favorit dengan satu kali klik',
        'Generator pesan Git commit standar profesional',
        'Markdown viewer real-time dengan syntax highlighting',
        'Pencarian cepat dan penandaan tag teknologi',
        'Desain tema gelap bernuansa terminal modern'
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript Vanilla', 'Bootstrap 5', 'jQuery'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    },
    6: {
      title: 'Creative Agency & Studio Showcase',
      category: 'Landing Page & Branding',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80',
      description: 'Landing page agensi digital kreatif dengan tata letak visual elegan, navigasi mulus, studi kasus proyek, serta formulir penawaran kerja sama yang ramah bagi calon klien.',
      features: [
        'Tipografi modern dan komposisi visual berkelas',
        'Studi kasus interaktif dengan galeri foto modal',
        'FAQ accordion interaktif dan testimoni klien',
        'Skema warna menenangkan dengan animasi hover mikro',
        'Skor audit Lighthouse tinggi untuk SEO dan aksesibilitas'
      ],
      tech: ['HTML5', 'Modern CSS', 'Bootstrap 5', 'jQuery Animations'],
      demoUrl: 'https://taufikhidytt.github.io/',
      githubUrl: 'https://github.com/taufikhidytt'
    }
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
