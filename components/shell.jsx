// ============ Icons & Logo ============
const Icon = ({ name, size = 18, ...rest }) => {
  const s = { width: size, height: size, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    arrow: <path d="M5 12h14M13 5l7 7-7 7" />,
    arrowDown: <path d="M12 5v14M5 12l7 7 7-7" />,
    arrowUpRight: <path d="M7 17L17 7M9 7h8v8" />,
    chevDown: <path d="M6 9l6 6 6-6" />,
    chevRight: <path d="M9 6l6 6-6 6" />,
    plus: <path d="M12 5v14M5 12h14" />,
    close: <path d="M6 6l12 12M18 6L6 18" />,
    menu: <><path d="M4 7h16" /><path d="M4 17h16" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></>,
    moon: <path d="M21 13A9 9 0 0 1 11 3a7 7 0 1 0 10 10z" />,
    facebook: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" /></>,
    twitter: <path d="M22 5.8a8.5 8.5 0 0 1-2.4.7 4.2 4.2 0 0 0 1.8-2.3 8.4 8.4 0 0 1-2.6 1 4.2 4.2 0 0 0-7.2 3.8A12 12 0 0 1 3 4.8a4.2 4.2 0 0 0 1.3 5.6 4.2 4.2 0 0 1-1.9-.5v.1a4.2 4.2 0 0 0 3.4 4.1 4.3 4.3 0 0 1-1.9.1 4.2 4.2 0 0 0 3.9 2.9A8.5 8.5 0 0 1 2 18.6a12 12 0 0 0 6.5 1.9c7.8 0 12.1-6.5 12.1-12.1v-.6A8.6 8.6 0 0 0 22 5.8z" />,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 1 1 4 0v4M12 13v4" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></>,
    phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4 13 13 0 0 0 2.5.6 2 2 0 0 1 1.7 2z" />,
    pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    users: <><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 14 0" /><path d="M16 4a4 4 0 0 1 0 8M22 21a7 7 0 0 0-5-6.7" /></>,
    book: <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14zM4 19.5V21h16" />,
    medal: <><circle cx="12" cy="15" r="6" /><path d="M8 9L5 3h14l-3 6M9 21l3-2 3 2" /></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5z" /><path d="m3 13 9 5 9-5M3 18l9 5 9-5" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></>,
    bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10 21a2 2 0 0 0 4 0" /></>,
    edit: <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />,
    trash: <><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /></>,
    filter: <path d="M22 3H2l8 9.5v7l4 2v-9z" />,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" /></>,
    check: <path d="M5 12l4 4 10-10" />,
    quote: <path d="M3 21c0-6 4-9 8-9V8c-5 0-9 4-9 9v4h1zM14 21c0-6 4-9 8-9V8c-5 0-9 4-9 9v4h1z" />,
    flask: <path d="M9 2v6L4 18a3 3 0 0 0 3 5h10a3 3 0 0 0 3-5l-5-10V2M8 2h8" />,
    heart: <path d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.65-9.5 9-9.5 9z" />,
    globe: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></>,
    shield: <path d="M12 2l9 4v6c0 5-4 9-9 11-5-2-9-6-9-11V6l9-4z" />,
    sparkle: <path d="M12 2v6M12 16v6M2 12h6M16 12h6M5 5l4 4M15 15l4 4M5 19l4-4M15 9l4-4" />,
    upload: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" /></>,
    eye: <><path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
    logout: <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />,
    star: <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z" />,
    flag: <path d="M4 22V4a1 1 0 0 1 .4-.8C5.5 2.4 7 2 9 2c3 0 5 2 8 2 1.5 0 2.7-.2 3.6-.7A.5.5 0 0 1 21 4v10.5a1 1 0 0 1-.4.8c-1.1.8-2.6 1.2-4.6 1.2-3 0-5-2-8-2-1.6 0-2.9.3-4 .8" />,
    refresh: <path d="M21 12a9 9 0 1 1-2.6-6.4M21 3v6h-6" />,
    home: <path d="M3 10.5 12 3l9 7.5M5 9.5V21h5v-6h4v6h5V9.5" />,
    message: <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    compass: <><circle cx="12" cy="12" r="10" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2z" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>,
    shoppingBag: <><path d="M6 7h12l1.5 13a2 2 0 0 1-2 2H6.5a2 2 0 0 1-2-2L6 7z" /><path d="M9 10V6a3 3 0 0 1 6 0v4" /></>,
    monitor: <><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5-9 9" /></>,
    link: <><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></>,
    inbox: <><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.5 5 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6L18.5 5a2 2 0 0 0-1.8-1H7.3a2 2 0 0 0-1.8 1z" /></>,
    send: <path d="m22 2-11 11M22 2 15 22l-4-9-9-4 20-7z" />,
    exchange: <path d="M7 10H21l-4-4M17 14H3l4 4" />,
    health: <path d="M12 21s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.65-9.5 9-9.5 9zM12 10v5M9.5 12.5h5" />,
    handshake: <path d="m11 17 2 2a2 2 0 1 0 3-3l-4.5-4.5M13 13l2.5 2.5a2 2 0 1 0 3-3L14 8a4 4 0 0 0-5.7 0L6 10.3M2 8l4-4 4 3.5M2 16l4 4" />,
    megaphone: <path d="m3 11 18-6v14L3 13v-2zM6 13.5V19a2 2 0 0 0 4 0v-4" />,
    award: <><circle cx="12" cy="9" r="6" /><path d="M8.5 14 7 22l5-3 5 3-1.5-8" /></>,
    cpu: <><rect x="5" y="5" width="14" height="14" rx="2" /><rect x="9" y="9" width="6" height="6" /><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" /></>,
  };
  // Alias de compatibilidad: nombres alternos que se usan en las páginas.
  paths.x = paths.close;
  paths.mapPin = paths.pin;
  return <svg viewBox="0 0 24 24" {...s} {...rest}>{paths[name] || null}</svg>;
};

// ============ Helper: Normalizar URLs de imagen (Drive → thumbnail) ============
// Detecta links de Google Drive ("Compartir → Copiar enlace") en cualquiera
// de sus formatos y los convierte al endpoint público de thumbnails que sí
// permite hot-linking sin autenticación. URLs externas se devuelven sin
// cambios. Vacíos se devuelven tal cual. Requiere que el archivo en Drive
// esté compartido como "Cualquier persona con el enlace puede ver".
const IMG = (src) => {
  if (!src) return src;
  const s = String(src);
  let m = s.match(/\/file\/d\/([a-zA-Z0-9_-]{20,})/);                 // /file/d/<ID>/view
  if (!m) m = s.match(/[?&]id=([a-zA-Z0-9_-]{20,})/);                  // open?id=<ID>  uc?id=<ID>
  if (!m) m = s.match(/^https:\/\/drive\.google\.com\/d\/([a-zA-Z0-9_-]{20,})/); // forma corta
  if (m) return 'https://drive.google.com/thumbnail?id=' + m[1] + '&sz=w800';
  return s;
};
const isDriveUrl = (src) => {
  if (!src) return false;
  const s = String(src);
  return /drive\.google\.com/.test(s) || /^[a-zA-Z0-9_-]{20,}$/.test(s);
};
window.IMG = IMG;
window.isDriveUrl = isDriveUrl;

// ============ Logo (PNG oficial SOCIEM-UNA) ============
const LOGO_URL = "assets/logos/logo_SOCIEM-UNA.png";

// Mapa de códigos de comité → archivo PNG en assets/logos
const COMITE_LOGO = {
  'SCOME': 'SCOME.png',
  'SCOPH': 'SCOPH.png',
  'SCORP': 'SCORP.png',
  'SCORA': 'SCORA.png',
  'SCOPE': 'SCOPE.png',
  'SCOPE-IN': 'SCOPE.png',
  'SCOPE-OUT': 'SCOPE.png',
  'SCORE': 'SCORE.png',
  'CPC': 'CPC.png',
  'CPPC': 'CPPC.png',
  'CPA': 'CPA.png',
  'CPAIS': 'CPAIS.png',
  'CPDII': 'CPDII.png',
  'CPRII': 'CPRII.png',
  'D.S.E': 'DSE.png',
  'DSE': 'DSE.png',
  'D.S.NTP': 'DSNT.png',
  'DSNT': 'DSNT.png',
  'D.S.P': 'DSP.png',
  'DSP': 'DSP.png',
};
const comiteLogoUrl = (code) => COMITE_LOGO[code] ? `assets/logos/${COMITE_LOGO[code]}` : null;

const Logo = ({ size = 36, mono = false }) => (
  <img
    src={LOGO_URL}
    alt="SOCIEM-UNA"
    width={size}
    height={size}
    style={{ width: size, height: size, objectFit: 'contain', display: 'block', filter: mono ? 'grayscale(1) brightness(1.6)' : 'none' }}
  />
);

const ComiteLogo = ({ code, size = 40 }) => {
  const url = comiteLogoUrl(code);
  if (!url) return null;
  return (
    <img
      src={url}
      alt={code}
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: 'contain', display: 'block' }}
    />
  );
};

// Versión liviana (≈100 KB) de los logos de comité para tiras y rejillas. Los
// PNG de assets/logos miden 3375 px y quedan solo para el certificado impreso.
const comiteLogoSm = (code) => COMITE_LOGO[code] ? `assets/logos/sm/${COMITE_LOGO[code]}` : null;

// Wordmark: los colores viven en css/home.css (.wordmark) para que respondan
// al tema; `inverse` lo fuerza a blanco sobre superficies siempre oscuras.
const Wordmark = ({ inverse = false }) => (
  <div className={`wordmark ${inverse ? 'is-inverse' : ''}`}>
    <span className="wordmark-name">SOCIEM</span>
    <span className="wordmark-sub">UNA · PUNO</span>
  </div>
);

// ============ Navbar ============
// Lista plana: la usan el menú móvil y cualquier página que necesite el mapa
// del sitio. La barra de escritorio usa NAV_GROUPS para no amontonar diez
// enlaces a 1280px.
const NAV_ITEMS = [
  { id: 'home', label: 'Inicio' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'directorio', label: 'Directorio' },
  { id: 'comites', label: 'Comités' },
  { id: 'eventos', label: 'Eventos' },
  { id: 'noticias', label: 'Noticias' },
  { id: 'tienda', label: 'Tienda' },
  { id: 'certificados', label: 'Certificados' },
  { id: 'miembros', label: 'Miembros' },
  { id: 'contacto', label: 'Contacto' },
];

const NAV_GROUPS = [
  { id: 'home', label: 'Inicio' },
  { id: 'sociedad', label: 'Sociedad', children: [
    { id: 'nosotros', label: 'Nosotros', desc: 'Historia, misión y filiación', icon: 'compass' },
    { id: 'directorio', label: 'Directorio', desc: 'Junta directiva de la gestión', icon: 'award' },
    { id: 'comites', label: 'Comités', desc: 'IFMSA, SOCIMEP y divisiones', icon: 'layers' },
    { id: 'miembros', label: 'Miembros', desc: 'Quienes hacen SOCIEM', icon: 'users' },
  ] },
  { id: 'eventos', label: 'Eventos' },
  { id: 'noticias', label: 'Noticias' },
  { id: 'certificados', label: 'Certificados' },
  { id: 'tienda', label: 'Tienda' },
  { id: 'contacto', label: 'Contacto' },
];

const SHELL_REDES = [
  { href: 'https://www.facebook.com/share/1Ag5jhmu7K/', icon: 'facebook', label: 'Facebook de SOCIEM-UNA', externo: true },
  { href: 'https://www.instagram.com/sociem_una_puno', icon: 'instagram', label: 'Instagram de SOCIEM-UNA', externo: true },
  { href: 'mailto:sociem.una@gmail.com', icon: 'mail', label: 'Escribir a SOCIEM-UNA por correo' },
];

const RedesLinks = ({ className = '' }) => (
  <div className={`redes ${className}`}>
    {SHELL_REDES.map(r => (
      <a key={r.icon} href={r.href} aria-label={r.label} className="icon-btn"
         {...(r.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        <Icon name={r.icon} size={16} />
      </a>
    ))}
  </div>
);

const Navbar = ({ page, setPage, theme, toggleTheme }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);     // menú móvil
  const [drop, setDrop] = React.useState(null);      // grupo desplegado por clic/teclado
  const [overHero, setOverHero] = React.useState(page === 'home');
  const dropRef = React.useRef(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cambiar de página cierra todo y vuelve a mirar si la página arranca con
  // una imagen bajo la nav (hero del home o PageHero): ahí los links van en
  // blanco aunque el tema sea claro.
  React.useEffect(() => {
    setOpen(false); setDrop(null);
    const mirar = () => setOverHero(!!document.querySelector('main .home-hero, main .page-hero'));
    mirar();
    const t1 = setTimeout(mirar, 120), t2 = setTimeout(mirar, 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [page]);

  // Menú móvil abierto: bloquea el scroll del fondo. Escape cierra todo.
  React.useEffect(() => {
    document.body.classList.toggle('nav-sheet-open', open);
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); setDrop(null); } };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.classList.remove('nav-sheet-open'); };
  }, [open]);

  // Clic fuera del desplegable lo cierra.
  React.useEffect(() => {
    if (!drop) return;
    const onDoc = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDrop(null); };
    document.addEventListener('pointerdown', onDoc);
    return () => document.removeEventListener('pointerdown', onDoc);
  }, [drop]);

  // El blur suelta el :focus-within, que si no deja el desplegable abierto.
  const go = (id) => (e) => { e.preventDefault(); if (e.currentTarget.blur) e.currentTarget.blur(); setPage(id); setOpen(false); setDrop(null); };

  const cls = ['nav', scrolled || open ? 'scrolled' : '', overHero && !scrolled && !open ? 'on-hero' : '', open ? 'menu-open' : ''].join(' ');

  return (
    <>
      <nav className={cls} aria-label="Principal">
        <div className="nav-inner">
          <a className="nav-brand" href="#/" onClick={go('home')} aria-label="SOCIEM-UNA · Inicio">
            <Logo size={38} />
            <Wordmark />
          </a>

          <div className="nav-links">
            {NAV_GROUPS.map(g => g.children ? (
              <div key={g.id} ref={dropRef} className={`nav-group ${drop === g.id ? 'open' : ''}`}>
                <button type="button"
                  className={`nav-link nav-group-btn ${g.children.some(c => c.id === page) ? 'active' : ''}`}
                  aria-expanded={drop === g.id} aria-haspopup="true"
                  onClick={() => setDrop(d => d === g.id ? null : g.id)}>
                  {g.label} <Icon name="chevDown" size={14} />
                </button>
                <div className="nav-drop" role="menu">
                  {g.children.map(c => (
                    <a key={c.id} role="menuitem" href={'#/' + c.id} onClick={go(c.id)}
                       className={`nav-drop-item ${page === c.id ? 'active' : ''}`}>
                      <span className="nav-drop-ico"><Icon name={c.icon} size={18} /></span>
                      <span className="nav-drop-txt">
                        <span className="nav-drop-label">{c.label}</span>
                        <span className="nav-drop-desc">{c.desc}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={g.id} className={`nav-link ${page === g.id ? 'active' : ''}`}
                 aria-current={page === g.id ? 'page' : undefined}
                 href={'#/' + g.id} onClick={go(g.id)}>
                {g.label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <button className="icon-btn nav-theme nav-cta-secondary" onClick={toggleTheme}
                    aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}>
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} />
            </button>
            <a className="btn btn-gold nav-join" href="#/registro" onClick={go('registro')}>
              Únete <Icon name="arrowUpRight" size={14} />
            </a>
            <button className="hamburger" onClick={() => setOpen(o => !o)}
                    aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="nav-sheet">
              <Icon name={open ? 'close' : 'menu'} size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Menú móvil a pantalla completa (DESIGN.md › Navigation pública). */}
      <div id="nav-sheet" className={`nav-sheet ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="nav-sheet-inner">
          <ol className="nav-sheet-links">
            {NAV_ITEMS.map((item, i) => (
              <li key={item.id} style={{ '--i': i }}>
                <a href={'#/' + item.id} onClick={go(item.id)} className={page === item.id ? 'active' : ''}
                   tabIndex={open ? 0 : -1}>
                  <span className="nav-sheet-num mono">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
          <div className="nav-sheet-foot">
            <a className="btn btn-gold nav-sheet-cta" href="#/registro" onClick={go('registro')} tabIndex={open ? 0 : -1}>
              Únete a SOCIEM-UNA <Icon name="arrowUpRight" size={14} />
            </a>
            <div className="nav-sheet-row">
              <RedesLinks />
              <button className="icon-btn" onClick={toggleTheme} tabIndex={open ? 0 : -1}
                      aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}>
                <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} />
              </button>
            </div>
            <p className="caption">Filial oficial de IFMSA-Perú y SOCIMEP · UNA Puno</p>
          </div>
        </div>
      </div>
    </>
  );
};

// ============ Footer ============
const SHELL_FOOTER_COLS = [
  { title: 'Sociedad', links: [['nosotros', 'Nosotros'], ['directorio', 'Directorio'], ['comites', 'Comités'], ['miembros', 'Miembros']] },
  { title: 'Participa', links: [['eventos', 'Eventos'], ['actividades', 'Actividades'], ['noticias', 'Noticias'], ['registro', 'Únete']] },
  { title: 'Servicios', links: [['certificados', 'Verificar certificado'], ['tienda', 'Tienda'], ['contacto', 'Contacto'], ['admin', 'Acceso interno']] },
];
// Orden de la franja: IFMSA, SOCIMEP y divisiones de soporte.
const SHELL_FOOTER_LOGOS = ['SCOME', 'SCOPH', 'SCORP', 'SCORA', 'SCOPE', 'SCORE', 'CPC', 'CPPC', 'CPA', 'CPAIS', 'CPDII', 'CPRII', 'DSE', 'DSNT', 'DSP'];

const Footer = ({ setPage }) => {
  const go = (id) => (e) => { e.preventDefault(); setPage(id); };
  return (
    <footer className="footer site-footer">
      {/* Franja de comités: marquee sutil, se pausa al hover (styles.css). */}
      <div className="footer-logos" aria-label="Comités y divisiones de SOCIEM-UNA">
        <div className="marquee">
          <div className="marquee-track">
            {SHELL_FOOTER_LOGOS.concat(SHELL_FOOTER_LOGOS).map((c, i) => (
              <a key={i} href="#/comites" onClick={go('comites')} className="footer-logo"
                 aria-hidden={i >= SHELL_FOOTER_LOGOS.length} tabIndex={i >= SHELL_FOOTER_LOGOS.length ? -1 : 0} title={c}>
                <img src={comiteLogoSm(c)} alt={i < SHELL_FOOTER_LOGOS.length ? c : ''} width="44" height="44" loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#/" onClick={go('home')} className="footer-brand-mark" aria-label="SOCIEM-UNA · Inicio">
              <Logo size={52} />
              <Wordmark inverse />
            </a>
            <p>
              Sociedad Científica de Estudiantes de Medicina de la Universidad Nacional del Altiplano.
              Filial oficial de IFMSA-Perú y SOCIMEP.
            </p>
            <RedesLinks className="footer-redes" />
          </div>
          {SHELL_FOOTER_COLS.map(col => (
            <div key={col.title} className="footer-col">
              <h4>{col.title}</h4>
              <ul>
                {col.links.map(([id, label]) => (
                  <li key={id}><a href={'#/' + id} onClick={go(id)}>{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
          <div className="footer-col">
            <h4>Contacto</h4>
            <ul>
              <li className="footer-txt">Facultad de Medicina Humana<br />Av. Floral 1153, Puno</li>
              <li><a href="mailto:sociem.una@gmail.com">sociem.una@gmail.com</a></li>
              <li><a href="https://forms.gle/Lk5QrJPaEaQVxLvF8" target="_blank" rel="noopener noreferrer">Formulario de inscripción <Icon name="arrowUpRight" size={12} /></a></li>
            </ul>
          </div>
        </div>

        {/* Wordmark gigante: firma visual del cierre, decorativo. */}
        <div className="footer-word" aria-hidden="true">SOCIEM<em>una</em></div>

        <div className="footer-legal">
          <span>© {new Date().getFullYear()} SOCIEM-UNA · Todos los derechos reservados</span>
          <span className="mono">PUNO · 3 827 MSNM · 15°50′S 70°01′O</span>
          <span>Filial · IFMSA-Perú · SOCIMEP · UNA Puno</span>
        </div>
      </div>
    </footer>
  );
};

// ============ Barra "Próximo evento" ============
// El "now playing" del sitio (DESIGN.md): píldora flotante abajo con el
// evento más cercano y su cuenta regresiva. Si no hay evento futuro, si la API
// falla o si el visitante la cerró (sessionStorage, por evento), no aparece.
const SHELL_EVBAR_KEY = 'sociem_evbar_cerrado';

// fecha "2026-06-25" (o ISO de Sheets) + hora "17:00" → ms, en hora de Lima.
const evbarHora = (fecha, hora) => {
  const d = String(fecha || '').slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) return null;
  const m = String(hora || '').match(/(\d{1,2}):(\d{2})/);
  const t = Date.parse(`${d}T${m ? m[1].padStart(2, '0') : '00'}:${m ? m[2] : '00'}:00-05:00`);
  return isNaN(t) ? null : t;
};

const evbarProximo = (lista, ahora) => (lista || [])
  .filter(ev => ev && ev.titulo && !/FINALIZADO|CANCELADO/i.test(String(ev.estado || '')))
  .map(ev => {
    const fecha = ev.fecha || ev.fecha_inicio;
    const ini = evbarHora(fecha, ev.hora_inicio);
    if (ini == null) return null;
    const finH = evbarHora(fecha, ev.hora_fin);
    // Sin hora de fin: dos horas; sin hora alguna: todo el día.
    const fin = finH && finH > ini ? finH : ev.hora_inicio ? ini + 2 * 3600e3 : ini + 24 * 3600e3;
    return { ev, ini, fin };
  })
  .filter(x => x && x.fin > ahora)
  .sort((a, b) => a.ini - b.ini)[0] || null;

const evbarCuenta = (ms) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), x = s % 60;
  const p = (n) => String(n).padStart(2, '0');
  return (d ? d + 'd ' : '') + p(h) + ':' + p(m) + ':' + p(x);
};

const NextEventBar = ({ page }) => {
  const [prox, setProx] = React.useState(null);
  const [cerrado, setCerrado] = React.useState(() => { try { return sessionStorage.getItem(SHELL_EVBAR_KEY) || ''; } catch (e) { return ''; } });
  const [ahora, setAhora] = React.useState(Date.now());

  React.useEffect(() => {
    if (!window.SOCIEM_API) return;
    let vivo = true;
    window.SOCIEM_API.get('eventos', 'list').then(r => {
      if (!vivo || !r || !r.ok) return;
      const lista = Array.isArray(r.data) ? r.data : Array.isArray(r.items) ? r.items : [];
      setProx(evbarProximo(lista, Date.now()));
    }).catch(() => {});
    return () => { vivo = false; };
  }, []);

  React.useEffect(() => {
    if (!prox) return;
    const t = setInterval(() => setAhora(Date.now()), 1000);
    return () => clearInterval(t);
  }, [prox]);

  const id = prox ? String(prox.ev.id || prox.ev.titulo) : '';
  // En #/eventos sobra (ya está la lista) y en admin no va nunca.
  const visible = !!prox && ahora < prox.fin && cerrado !== id && page !== 'eventos' && page !== 'admin';

  // El footer reserva sitio para que la barra no tape la línea legal.
  React.useEffect(() => {
    document.body.classList.toggle('con-evbar', visible);
    return () => document.body.classList.remove('con-evbar');
  }, [visible]);

  if (!visible) return null;

  const { ev, ini } = prox;
  const enCurso = ahora >= ini;
  const flyer = IMG(ev.flyer_url) || 'assets/eventos/evento-default.jpg';
  let fecha = '';
  try { fecha = new Date(ini).toLocaleDateString('es-PE', { weekday: 'short', day: '2-digit', month: 'short', timeZone: 'America/Lima' }); } catch (e) {}
  const cerrar = () => { try { sessionStorage.setItem(SHELL_EVBAR_KEY, id); } catch (e) {} setCerrado(id); };

  return (
    <aside className="evbar" aria-label="Próximo evento">
      <a className="evbar-thumb" href="#/eventos" tabIndex={-1} aria-hidden="true">
        <img src={flyer} alt="" onError={(e) => { const el = e.currentTarget; if (!el.dataset.fb) { el.dataset.fb = '1'; el.src = 'assets/eventos/evento-default.jpg'; } else { el.style.visibility = 'hidden'; } }} />
      </a>
      <div className="evbar-info">
        <div className="evbar-kicker">
          {enCurso ? <><span className="live-dot" /> En curso</> : 'Próximo evento'}
          <span className="evbar-fecha">{fecha}{ev.hora_inicio ? ' · ' + ev.hora_inicio : ''}</span>
        </div>
        <a className="evbar-title" href="#/eventos" title={ev.titulo}>{ev.titulo}</a>
      </div>
      {!enCurso && <div className="evbar-count mono" title="Tiempo para el inicio">{evbarCuenta(ini - ahora)}</div>}
      <a className="btn btn-primary btn-sm evbar-cta" href="#/eventos">
        Inscribirme <Icon name="arrowUpRight" size={13} />
      </a>
      <button className="evbar-close" onClick={cerrar} aria-label="Ocultar el próximo evento">
        <Icon name="close" size={15} />
      </button>
    </aside>
  );
};

// Tarjeta de error de red: distingue "falló la carga" de "no hay datos".
// Las páginas la muestran cuando la API devuelve ok:false o lanza.
const LoadErrorCard = ({ onRetry, children }) => (
  <div className="card load-error" role="alert">
    <span className="halo halo-violet load-error-halo" aria-hidden="true" />
    <img className="load-error-img" src="assets/mascota/mascota-error.png?v=3" alt=""
         onError={(e) => { e.currentTarget.style.display = 'none'; }} />
    <div className="eyebrow muted">Se cortó la señal</div>
    <p className="load-error-msg">
      {children || 'No pudimos cargar la información. Revisa tu conexión e inténtalo de nuevo.'}
    </p>
    {onRetry && (
      <button className="btn btn-primary" onClick={onRetry}>
        <Icon name="refresh" size={14} /> Reintentar
      </button>
    )}
  </div>
);

// Página 404: la mascota busca la página perdida y ofrece rutas de rescate.
const NotFoundPage = ({ intento }) => (
  <section className="nf">
    <span className="halo halo-violet nf-halo" aria-hidden="true" />
    <div className="container nf-inner">
      <div className="nf-visual" aria-hidden="true">
        <span className="nf-num">404</span>
        <img
          className="nf-mascota"
          src="assets/mascota/mascota-404.png?v=3" alt=""
          onError={(e) => { if (!e.currentTarget.dataset.alt) { e.currentTarget.dataset.alt = '1'; e.currentTarget.src = 'assets/mascota/mascota-error.png?v=3'; } else { e.currentTarget.style.display = 'none'; } }}
        />
      </div>
      <div className="eyebrow">Error 404 · Página no encontrada</div>
      <h1 className="h1 nf-title">Buscamos por todo el altiplano y <em>esta página no aparece</em>.</h1>
      <p className="lede nf-lede">
        {intento ? <>La dirección <code className="nf-code mono">#/{intento}</code> no existe o fue movida.</> : 'La dirección que escribiste no existe o fue movida.'}
      </p>
      <div className="nf-actions">
        <a className="btn btn-primary" href="#/home"><Icon name="home" size={15} /> Volver al inicio</a>
        <a className="btn btn-ghost" href="#/eventos">Ver eventos</a>
      </div>
      <div className="chip-row nf-chips">
        <a className="chip" href="#/noticias">Noticias</a>
        <a className="chip" href="#/comites">Comités</a>
        <a className="chip" href="#/certificados">Verificar certificado</a>
        <a className="chip" href="#/contacto">Escríbenos</a>
      </div>
    </div>
  </section>
);


// ============ PageHero ============
// Cabecera nocturna de las páginas internas (DESIGN.md › Hero). La imagen del
// set "Noche Altiplánica" va a sangre bajo la nav; si aún no existe cae a
// `fallback` y, si tampoco, queda el degradado de fondo.
const PageHero = ({ img, fallback = 'assets/hero/hero-altiplano.jpg', eyebrow, title, lede, children, align = 'left' }) => (
  <section className="page-hero">
    <div className="page-hero-bg" aria-hidden="true">
      {img && <img src={img} alt="" onError={(e) => { const el = e.currentTarget; if (fallback && !el.dataset.fb) { el.dataset.fb = '1'; el.src = fallback; } else { el.style.display = 'none'; } }} />}
      <div className="hero-grain" />
    </div>
    <div className="container" style={{ textAlign: align, width: '100%' }}>
      {eyebrow && <div className="eyebrow fade-up">{eyebrow}</div>}
      <h1 className="h1 fade-up d1" style={{ marginTop: 16, maxWidth: align === 'center' ? 860 : 820, marginLeft: align === 'center' ? 'auto' : 0, marginRight: align === 'center' ? 'auto' : 0 }}>{title}</h1>
      {lede && <p className="lede fade-up d2" style={{ marginTop: 20, marginLeft: align === 'center' ? 'auto' : 0, marginRight: align === 'center' ? 'auto' : 0 }}>{lede}</p>}
      {children && <div className="fade-up d3" style={{ marginTop: 28 }}>{children}</div>}
    </div>
  </section>
);

// ============ useReveal ============
// Activa .reveal → .is-in al entrar en viewport. Basta llamarlo una vez por
// página: observa todos los .reveal del documento, incluidos los que llegan
// después con datos de la API.
const useReveal = (deps = []) => {
  React.useEffect(() => {
    if (!('IntersectionObserver' in window)) { document.querySelectorAll('.reveal').forEach(n => n.classList.add('is-in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    const scan = () => document.querySelectorAll('.reveal:not(.is-in)').forEach(n => io.observe(n));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, deps);
};


Object.assign(window, { Icon, Logo, ComiteLogo, comiteLogoUrl, comiteLogoSm, Wordmark, Navbar, NextEventBar, Footer, NAV_ITEMS, NAV_GROUPS, RedesLinks, LoadErrorCard, NotFoundPage, PageHero, useReveal });
