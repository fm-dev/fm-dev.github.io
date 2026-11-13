(() => {
  const messages = {
    "page.title": {"en":"Muhammad Fajri Afriyansyah | Web & Backend Developer","id":"Muhammad Fajri Afriyansyah | Pengembang Web & Backend"},
    "page.description": {"en":"Software developer working with .NET, Node.js, and SQL Server. View Fajri’s projects, work experience, and GitHub contributions.","id":"Pengembang perangkat lunak dengan .NET, Node.js, dan SQL Server. Lihat proyek, pengalaman kerja, dan kontribusi GitHub Fajri."},
    "page.socialDescription": {"en":"APIs, business applications, and automation with .NET and Node.js. Projects and experience by Muhammad Fajri Afriyansyah.","id":"API, aplikasi bisnis, dan otomatisasi dengan .NET dan Node.js. Proyek dan pengalaman Muhammad Fajri Afriyansyah."},
    "nav.skip": {"en":"Skip to content","id":"Lewati ke konten"},
    "nav.home": {"en":"MFA, back to home","id":"MFA, kembali ke beranda"},
    "nav.main": {"en":"Main navigation","id":"Navigasi utama"},
    "nav.projects": {"en":"Projects","id":"Proyek"},
    "nav.experience": {"en":"Experience","id":"Pengalaman"},
    "nav.about": {"en":"About","id":"Tentang"},
    "nav.skills": {"en":"Skills","id":"Keahlian"},
    "nav.contact": {"en":"Contact me","id":"Hubungi saya"},
    "nav.menu": {"en":"Menu","id":"Menu"},
    "nav.language": {"en":"Language","id":"Bahasa"},
    "hero.title": {"en":"Web & backend developer.","id":"Pengembang web & backend."},
    "hero.lead": {"en":"APIs, business applications, and automation with .NET and Node.js. Informatics Engineering, 2020–2024.","id":"API, aplikasi bisnis, dan otomatisasi dengan .NET dan Node.js. Teknik Informatika, 2020–2024."},
    "hero.projects": {"en":"View projects","id":"Lihat proyek"},
    "hero.portrait": {"en":"Portrait of Muhammad Fajri Afriyansyah","id":"Foto Muhammad Fajri Afriyansyah"},
    "projects.production": {"en":"A website in production.","id":"Situs yang telah digunakan."},
    "projects.internship": {"en":"Contributed during my internship at PT. Inovindo Digital Media.","id":"Berkontribusi selama magang di PT. Inovindo Digital Media."},
    "projects.academy": {"en":"Training and internship programs, presented online. I contributed to the website during my programmer internship at Inovindo.","id":"Program pelatihan dan magang yang tersedia secara online. Saya berkontribusi pada situs ini selama magang sebagai programmer di Inovindo."},
    "projects.technologies": {"en":"Technologies","id":"Teknologi"},
    "projects.period": {"en":"Period","id":"Periode"},
    "date.march2023": {"en":"Mar 2023","id":"Mar 2023"},
    "date.june2023": {"en":"Jun 2023","id":"Jun 2023"},
    "date.to": {"en":"to","id":"hingga"},
    "projects.visit": {"en":"Visit website","id":"Kunjungi situs"},
    "projects.academyPreview": {"en":"Preview Inovindo Academy, opens website in a new tab","id":"Pratinjau Inovindo Academy, membuka situs di tab baru"},
    "projects.academyAlt": {"en":"Inovindo Academy homepage with its training and internship introduction and featured programs.","id":"Halaman utama Inovindo Academy dengan pengenalan pelatihan, magang, dan program unggulan."},
    "projects.jobsTitle": {"en":"A freelance job portal.","id":"Proyek lepas portal lowongan kerja."},
    "projects.jobsLead": {"en":"Bursa Kerja Khusus for SMKN 2 Pekanbaru.","id":"Bursa Kerja Khusus untuk SMKN 2 Pekanbaru."},
    "projects.jobs": {"en":"A freelance project for the Bursa Kerja Khusus (BKK) at SMKN 2 Pekanbaru. The portal helps vocational school graduates find job vacancies and apply for available positions.","id":"Proyek lepas untuk Bursa Kerja Khusus (BKK) SMKN 2 Pekanbaru. Portal ini membantu lulusan SMK mencari lowongan kerja dan melamar posisi yang tersedia."},
    "projects.platform": {"en":"Platform","id":"Platform"},
    "projects.webApp": {"en":"Web application","id":"Aplikasi web"},
    "projects.type": {"en":"Project type","id":"Jenis proyek"},
    "projects.freelance": {"en":"Freelance","id":"Proyek lepas"},
    "projects.purpose": {"en":"Purpose","id":"Tujuan"},
    "projects.jobPurpose": {"en":"Job listings and applications","id":"Lowongan dan lamaran kerja"},
    "projects.jobsPreview": {"en":"Preview BKK SMKN 2 Pekanbaru, opens website in a new tab","id":"Pratinjau BKK SMKN 2 Pekanbaru, membuka situs di tab baru"},
    "projects.jobsAlt": {"en":"BKK SMKN 2 Pekanbaru homepage with its job portal introduction and applicant, company, and vacancy statistics.","id":"Halaman utama BKK SMKN 2 Pekanbaru dengan pengenalan portal kerja serta statistik pelamar, perusahaan, dan lowongan."},
    "projects.kosTitle": {"en":"A freelance boarding house website.","id":"Proyek lepas situs indekos."},
    "projects.kosLead": {"en":"Room information and visit enquiries for Kos Uni Salma.","id":"Informasi kamar dan permintaan kunjungan ke Kos Uni Salma."},
    "projects.kos": {"en":"A freelance website for a boarding house in Air Jamban, Mandau, Riau. Visitors can explore room options, facilities, and photos, compare rental costs, and arrange a visit through WhatsApp.","id":"Proyek lepas situs indekos di Air Jamban, Mandau, Riau. Pengunjung dapat melihat pilihan kamar, fasilitas, dan foto, membandingkan biaya sewa, serta mengatur kunjungan melalui WhatsApp."},
    "projects.website": {"en":"Website","id":"Situs web"},
    "projects.roomPurpose": {"en":"Room information and visit enquiries","id":"Informasi kamar dan permintaan kunjungan"},
    "projects.kosPreview": {"en":"Preview Kos Uni Salma, opens website in a new tab","id":"Pratinjau Kos Uni Salma, membuka situs di tab baru"},
    "projects.kosAlt": {"en":"Kos Uni Salma homepage showing its boarding house introduction, room information, and property photo.","id":"Halaman utama Kos Uni Salma yang menampilkan pengenalan indekos, informasi kamar, dan foto properti."},
    "projects.more": {"en":"Web application projects.","id":"Proyek aplikasi web."},
    "projects.moreLead": {"en":"Data management, mapping, and a home service marketplace.","id":"Pengelolaan data, pemetaan, dan lokapasar jasa rumah tangga."},
    "projects.driverTitle": {"en":"Driver data management system","id":"Sistem pengelolaan data pengemudi"},
    "projects.driver": {"en":"A driver services and data management system. I designed the project, implemented the application with ASP.NET, and built the Oracle database.","id":"Sistem layanan dan pengelolaan data pengemudi. Saya merancang proyek, mengembangkan aplikasi dengan ASP.NET, dan membangun basis data Oracle."},
    "date.driver": {"en":"September 2020 to January 2023","id":"September 2020 hingga Januari 2023"},
    "projects.contribution": {"en":"Contribution","id":"Kontribusi"},
    "projects.design": {"en":"Design and implementation","id":"Perancangan dan implementasi"},
    "projects.gisTitle": {"en":"Pekanbaru traffic GIS","id":"SIG lalu lintas Pekanbaru"},
    "projects.gis": {"en":"A web-based map of traffic congestion in Pekanbaru. My contributions included the project proposal, field surveys, CodeIgniter 3 development, and Leaflet integration.","id":"Peta kemacetan lalu lintas Pekanbaru berbasis web. Kontribusi saya meliputi proposal proyek, survei lapangan, pengembangan dengan CodeIgniter 3, dan integrasi Leaflet."},
    "date.gis": {"en":"October 2020 to January 2023","id":"Oktober 2020 hingga Januari 2023"},
    "projects.webGis": {"en":"Web GIS","id":"SIG berbasis web"},
    "projects.surveys": {"en":"Field surveys and development","id":"Survei lapangan dan pengembangan"},
    "projects.marketTitle": {"en":"Home service marketplace","id":"Lokapasar jasa rumah tangga"},
    "projects.market": {"en":"An e-commerce website for home services. I designed the website and implemented it using CodeIgniter 3.","id":"Situs e-commerce untuk jasa rumah tangga. Saya merancang dan mengembangkan situs menggunakan CodeIgniter 3."},
    "date.market": {"en":"June 2022","id":"Juni 2022"},
    "experience.title": {"en":"Work experience.","id":"Pengalaman kerja."},
    "experience.lead": {"en":"Software and backend development, from internship to full-time work.","id":"Pengembangan perangkat lunak dan backend, dari magang hingga kerja penuh waktu."},
    "experience.software": {"en":"Software Developer","id":"Pengembang Perangkat Lunak"},
    "date.mitra": {"en":"Jan 2026 to Oct 2026","id":"Jan 2026 hingga Okt 2026"},
    "experience.fullTime": {"en":"Full-time","id":"Penuh waktu"},
    "experience.mitra1": {"en":"Developed APIs and backend features using .NET and Node.js, managed data, and optimized SQL Server queries.","id":"Mengembangkan API dan fitur backend dengan .NET dan Node.js, mengelola data, serta mengoptimalkan kueri SQL Server."},
    "experience.mitra2": {"en":"Built and maintained SharePoint SPFx web parts and internal tools, and automated workflows with Power Automate.","id":"Membangun dan memelihara web part SharePoint SPFx serta alat internal, dan mengotomatiskan alur kerja dengan Power Automate."},
    "experience.mitra3": {"en":"Participated in daily sprint meetings with frontend and backend developers, QA engineers, and product owners. Used Azure DevOps for version control, CI/CD pipelines, and task management.","id":"Mengikuti rapat sprint harian bersama pengembang frontend dan backend, tim QA, serta product owner. Menggunakan Azure DevOps untuk kontrol versi, pipeline CI/CD, dan pengelolaan tugas."},
    "experience.backend": {"en":"Backend Developer","id":"Pengembang Backend"},
    "date.inhealth": {"en":"Feb 2025 to Dec 2025","id":"Feb 2025 hingga Des 2025"},
    "experience.contract": {"en":"Contract","id":"Kontrak"},
    "experience.jakarta": {"en":"South Jakarta","id":"Jakarta Selatan"},
    "experience.inhealth1": {"en":"Developed and maintained the Cervia application using C# and ASP.NET Core.","id":"Mengembangkan dan memelihara aplikasi Cervia menggunakan C# dan ASP.NET Core."},
    "experience.inhealth2": {"en":"Built RESTful APIs and wrote LINQ queries for SQL Server.","id":"Membangun RESTful API dan menulis kueri LINQ untuk SQL Server."},
    "experience.inhealth3": {"en":"Worked with frontend, QA, and product teams on unit testing, debugging, performance optimization, and data security.","id":"Bekerja sama dengan tim frontend, QA, dan produk dalam pengujian unit, debugging, optimasi performa, serta keamanan data."},
    "experience.earlier": {"en":"Earlier development roles.","id":"Pengalaman pengembangan sebelumnya."},
    "experience.earlierLead": {"en":"Application maintenance, web development, and an industry internship.","id":"Pemeliharaan aplikasi, pengembangan web, dan magang industri."},
    "experience.programmer": {"en":"Programmer","id":"Programmer"},
    "date.sumatra": {"en":"Oct 2024 to Jan 2025","id":"Okt 2024 hingga Jan 2025"},
    "experience.sumatra1": {"en":"Maintained existing applications, fixed bugs, and added features to systems already in use.","id":"Memelihara aplikasi, memperbaiki bug, dan menambahkan fitur pada sistem yang telah digunakan."},
    "experience.sumatra2": {"en":"Developed web and full-stack applications with Laravel and CodeIgniter 3, mobile apps with React Native, and backend services with ASP.NET Core Web API.","id":"Mengembangkan aplikasi web dan full-stack dengan Laravel dan CodeIgniter 3, aplikasi seluler dengan React Native, serta layanan backend dengan ASP.NET Core Web API."},
    "experience.sumatra3": {"en":"Collaborated with the team on troubleshooting and debugging to maintain system performance and reliability.","id":"Bekerja sama dengan tim dalam pemecahan masalah dan debugging untuk menjaga performa serta keandalan sistem."},
    "date.inovindo": {"en":"Mar 2023 to Jun 2023","id":"Mar 2023 hingga Jun 2023"},
    "experience.internship": {"en":"Internship","id":"Magang"},
    "experience.bandung": {"en":"Bandung, West Java","id":"Bandung, Jawa Barat"},
    "experience.inovindo1": {"en":"Contributed to the development of Inovindoacademy.com using Laravel 9 and ASP.NET.","id":"Berkontribusi dalam pengembangan Inovindoacademy.com menggunakan Laravel 9 dan ASP.NET."},
    "experience.inovindo2": {"en":"Designed and built an internship management application with daily reporting and project progress tracking.","id":"Merancang dan membangun aplikasi pengelolaan magang dengan laporan harian serta pemantauan kemajuan proyek."},
    "experience.inovindo3": {"en":"Collaborated with the team to maintain website functionality and quality while following web development best practices.","id":"Bekerja sama dengan tim untuk menjaga fungsi dan kualitas situs dengan mengikuti praktik pengembangan web yang baik."},
    "experience.inovindoTools": {"en":"Laravel 9 / ASP.NET / Internship management","id":"Laravel 9 / ASP.NET / Pengelolaan magang"},
    "experience.preview": {"en":"View project preview","id":"Lihat pratinjau proyek"},
    "experience.linkedin": {"en":"View LinkedIn profile","id":"Lihat profil LinkedIn"},
    "experience.onsite": {"en":"All positions were on-site.","id":"Seluruh pekerjaan dilakukan di kantor."},
    "github.title": {"en":"GitHub contributions.","id":"Kontribusi GitHub."},
    "github.lead": {"en":"A calendar of my GitHub contributions.","id":"Kalender kontribusi GitHub saya."},
    "github.profile": {"en":"View @fm-dev","id":"Lihat @fm-dev"},
    "github.summary": {"en":"GitHub contributions","id":"Kontribusi GitHub"},
    "github.last": {"en":"Last 12 months","id":"12 bulan terakhir"},
    "github.noScript": {"en":"Enable JavaScript to load the contribution calendar, or view my GitHub profile.","id":"Aktifkan JavaScript untuk memuat kalender kontribusi, atau lihat profil GitHub saya."},
    "github.retry": {"en":"Try again","id":"Coba lagi"},
    "github.calendar": {"en":"GitHub contribution calendar. Scroll horizontally to view more dates.","id":"Kalender kontribusi GitHub. Gulir secara horizontal untuk melihat tanggal lainnya."},
    "github.hint": {"en":"Hover, tap, or use arrow keys to explore contributions.","id":"Arahkan kursor, ketuk, atau gunakan tombol panah untuk menjelajahi kontribusi."},
    "github.intensity": {"en":"Contribution intensity from less to more","id":"Intensitas kontribusi dari sedikit hingga banyak"},
    "github.less": {"en":"Less","id":"Sedikit"},
    "github.more": {"en":"More","id":"Banyak"},
    "github.note": {"en":"Activity shown on my GitHub profile. Updates may take about an hour to appear.","id":"Aktivitas yang ditampilkan di profil GitHub saya. Pembaruan dapat memerlukan waktu sekitar satu jam."},
    "github.loading": {"en":"Loading GitHub contributions…","id":"Memuat kontribusi GitHub…"},
    "github.error": {"en":"GitHub activity is unavailable right now. Please try again or view my GitHub profile.","id":"Aktivitas GitHub belum tersedia saat ini. Silakan coba lagi atau lihat profil GitHub saya."},
    "github.keyboard": {"en":"Use arrow keys to explore days.","id":"Gunakan tombol panah untuk menjelajahi hari."},
    "github.total": {"en":"{count} {contributions} {period}","id":"{count} kontribusi {period}"},
    "github.lastPeriod": {"en":"in the last 12 months","id":"dalam 12 bulan terakhir"},
    "github.yearPeriod": {"en":"in {year}","id":"pada {year}"},
    "github.day": {"en":"{count} {contributions} on {date}","id":"{count} kontribusi pada {date}"},
    "about.title": {"en":"Engineering background.","id":"Latar belakang pendidikan."},
    "about.intro": {"en":"I develop","id":"Saya mengembangkan"},
    "about.backend": {"en":"backend services","id":"layanan backend"},
    "about.body": {"en":", web applications, and workflow automation. I studied Informatics Engineering at Politeknik Caltex Riau from 2020 to 2024.","id":", aplikasi web, dan otomatisasi alur kerja. Saya menempuh pendidikan Teknik Informatika di Politeknik Caltex Riau dari 2020 hingga 2024."},
    "about.major": {"en":"Informatics Engineering (D4)","id":"Teknik Informatika (D4)"},
    "date.education": {"en":"2020 to 2024","id":"2020 hingga 2024"},
    "about.earlier": {"en":"Earlier education","id":"Pendidikan sebelumnya"},
    "about.school": {"en":"SMAN 3 Mandau, Natural Sciences, 2016 to 2018.","id":"SMAN 3 Mandau, Ilmu Pengetahuan Alam, 2016 hingga 2018."},
    "about.quote": {"en":"“Focus on doing your best rather than being the best. The results are a bonus.”","id":"“Fokuslah melakukan yang terbaik, bukan menjadi yang terbaik. Hasil adalah bonus.”"},
    "about.community": {"en":"Community & research","id":"Pengabdian & penelitian"},
    "about.orderTitle": {"en":"Order management application","id":"Aplikasi pengelolaan pesanan"},
    "about.order": {"en":"Co-authored research with Shumaya Resty Ramadhani on prototyping, user acceptance, and usability for the Disebut Kopi application.","id":"Menulis penelitian bersama Shumaya Resty Ramadhani mengenai prototipe, penerimaan pengguna, dan kegunaan aplikasi Disebut Kopi."},
    "about.publication": {"en":"Read publication","id":"Baca publikasi"},
    "date.publication": {"en":"November 2024","id":"November 2024"},
    "about.thinkingTitle": {"en":"Computational thinking","id":"Berpikir komputasional"},
    "about.thinking": {"en":"Supported computational thinking training for SMAN 5 Pekanbaru students alongside lecturers from Politeknik Caltex Riau.","id":"Mendukung pelatihan berpikir komputasional bagi siswa SMAN 5 Pekanbaru bersama dosen Politeknik Caltex Riau."},
    "about.activity": {"en":"View activity","id":"Lihat kegiatan"},
    "date.activity": {"en":"25 November 2021","id":"25 November 2021"},
    "about.organizationsTitle": {"en":"Campus organizations","id":"Organisasi kampus"},
    "about.organizations": {"en":"Provided web development mentoring at Caltex Techno Scientist and served on the Timeline Coordinator System team for the ITSA General Assembly.","id":"Memberikan pendampingan pengembangan web di Caltex Techno Scientist dan menjadi anggota tim Timeline Coordinator System pada Musyawarah Besar ITSA."},
    "skills.title": {"en":"Development tools.","id":"Perangkat pengembangan."},
    "skills.lead": {"en":"Technologies I use across backend, web, mobile, and automation work.","id":"Teknologi yang saya gunakan untuk pengembangan backend, web, seluler, dan otomatisasi."},
    "skills.backend": {"en":"Backend & desktop","id":"Backend & desktop"},
    "skills.web": {"en":"Web & mobile","id":"Web & seluler"},
    "skills.data": {"en":"Data & delivery","id":"Data & pengiriman aplikasi"},
    "skills.integration": {"en":"Integration & automation","id":"Integrasi & otomatisasi"},
    "skills.design": {"en":"Design & video","id":"Desain & video"},
    "contact.title": {"en":"Discuss your next project.","id":"Diskusikan proyek Anda berikutnya."},
    "contact.lead": {"en":"For development work, collaboration, or a role on your team.","id":"Untuk pengembangan aplikasi, kolaborasi, atau bergabung dengan tim Anda."},
    "footer.role": {"en":"Web & backend developer","id":"Pengembang web & backend"},
    "footer.portfolio": {"en":"Portfolio","id":"Portofolio"},
    "footer.github": {"en":"GitHub activity","id":"Aktivitas GitHub"},
    "footer.social": {"en":"Social links","id":"Tautan media sosial"},
    "footer.connect": {"en":"Connect","id":"Terhubung"},
    "footer.cv": {"en":"View CV","id":"Lihat CV"},
    "footer.top": {"en":"Back to top","id":"Kembali ke atas"},
    "footer.credit": {"en":"Product names and logos are trademarks of their owners.","id":"Nama dan logo produk merupakan merek dagang milik pemiliknya."},
    "theme.darkAction": {"en":"Switch to dark mode","id":"Beralih ke mode gelap"},
    "theme.lightAction": {"en":"Switch to light mode","id":"Beralih ke mode terang"},
    "theme.dark": {"en":"Dark mode","id":"Mode gelap"},
    "theme.light": {"en":"Light mode","id":"Mode terang"}
  };

  const root = document.documentElement;
  let language;
  try { language = localStorage.getItem('language'); } catch { /* Storage can be blocked. */ }
  if (language !== 'id' && language !== 'en') {
    language = navigator.language?.toLowerCase().startsWith('id') ? 'id' : 'en';
  }

  function t(key, values = {}) {
    const message = messages[key]?.[language] ?? messages[key]?.en ?? key;
    return message.replace(/\{(\w+)\}/g, (match, name) => values[name] ?? match);
  }

  function translatePage() {
    root.lang = language;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      element.textContent = t(element.dataset.i18n);
    });
    for (const attribute of ['alt', 'aria-label', 'content']) {
      document.querySelectorAll(`[data-i18n-${attribute}]`).forEach(element => {
        element.setAttribute(attribute, t(element.getAttribute(`data-i18n-${attribute}`)));
      });
    }
    document.querySelectorAll('[data-language]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
    document.querySelector('.mo-wh__text').removeAttribute('aria-label');
  }

  window.portfolioI18n = { t, get language() { return language; } };
  translatePage();
  const switcher = document.querySelector('.language-switch');
  switcher.hidden = false;
  let moments;
  // Animation modules may fail on file:// or a slow connection; language switching stays available.
  import('../assets/moments/moments.js').then(async runtime => {
    await runtime.ready;
    moments = runtime;
  }).catch(() => { /* Keep the translated text readable without animation. */ });

  switcher.addEventListener('click', event => {
    const button = event.target.closest('[data-language]');
    if (!button || button.dataset.language === language) return;
    moments?.unmountAll();
    language = button.dataset.language;
    try { localStorage.setItem('language', language); } catch { /* Keep the in-page choice. */ }
    translatePage();
    document.dispatchEvent(new Event('languagechange'));
    moments?.mountAll();
  });

})();
