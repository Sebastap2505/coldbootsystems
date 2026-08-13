document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Theme toggle (dark "workshop" look is the default; light is opt-in) ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  themeToggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight) {
      root.removeAttribute('data-theme');
      try { localStorage.setItem('theme', 'dark'); } catch (e) {}
    } else {
      root.setAttribute('data-theme', 'light');
      try { localStorage.setItem('theme', 'light'); } catch (e) {}
    }
  });

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile hamburger menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  const closeMenu = () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  };
  const toggleMenu = () => {
    const isOpen = navLinks.classList.toggle('active');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  };

  hamburger.addEventListener('click', toggleMenu);
  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  });
  window.addEventListener('resize', () => { if (window.innerWidth >= 1024) closeMenu(); });

  /* ---------- Reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.visible)').forEach((el) => el.classList.add('visible'));
  }, 2500);

  /* ---------- Términos y condiciones modal ---------- */
  const menuTerminosBtn = document.getElementById('menuTerminosBtn');
  const terminosModal = document.getElementById('terminosModal');
  const closeTerminos = document.getElementById('closeTerminos');
  const formTerminos = document.getElementById('formTerminos');

  menuTerminosBtn.addEventListener('click', () => terminosModal.classList.add('active'));

  closeTerminos.addEventListener('click', () => {
    terminosModal.classList.remove('active');
    formTerminos.reset();
  });

  const SUPABASE_URL = 'https://almidqagfbducznvnbjf.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_qTk1_HbeclOQ5ljG0DaE8Q_h0w5BjcE';
  const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  formTerminos.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btnSubmit = document.getElementById('btnAceptarTerminos');
    btnSubmit.textContent = 'Auditando y registrando...';
    btnSubmit.disabled = true;

    const nombre = document.getElementById('clienteNombre').value;
    const tel = document.getElementById('clienteTel').value;
    let clientIp = 'No detectada';

    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const ipData = await response.json();
      clientIp = ipData.ip;
    } catch (err) {
      try {
        const resBackup = await fetch('https://ipapi.co/json/');
        const dataBackup = await resBackup.json();
        clientIp = dataBackup.ip;
      } catch (err2) {
        clientIp = 'IP Bloqueada/Privada';
      }
    }

    const clientDevice = navigator.userAgent || 'Dispositivo Desconocido';

    const { error } = await supabaseClient
      .from('registros_aceptacion')
      .insert([
        {
          nombre_cliente: nombre,
          whatsapp: tel,
          acepto_terminos: true,
          version_contrato: '1.0',
          ip_address: clientIp,
          device_info: clientDevice,
        },
      ]);

    if (error) {
      alert('Hubo un error de conexión. Por favor intenta de nuevo.');
      btnSubmit.textContent = 'Acepto los Términos';
      btnSubmit.disabled = false;
    } else {
      const msjConfirmacion = `Hola, soy ${nombre}. Acabo de leer y aceptar los Términos y Condiciones en la página web oficial para el diagnóstico de mi equipo.`;
      window.open(`https://wa.me/522205338533?text=${encodeURIComponent(msjConfirmacion)}`, '_blank');

      formTerminos.reset();
      terminosModal.classList.remove('active');
      btnSubmit.textContent = 'Acepto los Términos';
      btnSubmit.disabled = false;
    }
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Fix anchor scroll on initial load ---------- */
  if (window.location.hash) {
    window.addEventListener('load', () => {
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView({ behavior: 'instant' });
    });
  }
});
