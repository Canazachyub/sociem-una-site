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

const Wordmark = ({ inverse = false }) => (
  <div style={{ lineHeight: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
    <span style={{ fontFamily: 'var(--font-serif)', fontSize: 19, fontWeight: 600, letterSpacing: '-0.02em', color: inverse ? '#fff' : 'inherit' }}>SOCIEM</span>
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9.5, letterSpacing: '0.18em', color: inverse ? 'rgba(255,255,255,.6)' : 'var(--fg-muted)' }}>UNA · PUNO</span>
  </div>
);

// ============ Navbar ============
const NAV_ITEMS = [
  { id: 'home', label: 'Inicio' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'directorio', label: 'Directorio' },
  { id: 'comites', label: 'Comités' },
  { id: 'eventos', label: 'Eventos' },
  { id: 'noticias', label: 'Noticias' },
  { id: 'tienda', label: 'Tienda' },
  { id: 'miembros', label: 'Miembros' },
  { id: 'contacto', label: 'Contacto' },
];

const Navbar = ({ page, setPage, theme, toggleTheme }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a className="nav-brand" onClick={(e) => { e.preventDefault(); setPage('home'); }} href="#">
            <Logo size={36} />
            <Wordmark />
          </a>
          <div className="nav-links">
            {NAV_ITEMS.map(item => (
              <a key={item.id} className={`nav-link ${page === item.id ? 'active' : ''}`}
                 href="#" onClick={(e) => { e.preventDefault(); setPage(item.id); }}>
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button className="icon-btn nav-cta-secondary" onClick={toggleTheme} aria-label="Toggle theme" style={{ width: 38, height: 38 }}>
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={16} />
            </button>
            <a className="btn btn-primary" href="#" onClick={(e) => { e.preventDefault(); setPage('registro'); }}>
              Únete <Icon name="arrowUpRight" size={14} />
            </a>
            <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
              <Icon name={open ? 'close' : 'menu'} size={20} />
            </button>
          </div>
        </div>
      </nav>
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {NAV_ITEMS.map(item => (
          <a key={item.id} href="#" onClick={(e) => { e.preventDefault(); setPage(item.id); setOpen(false); }}>
            {item.label}
          </a>
        ))}
        <a href="#" onClick={(e) => { e.preventDefault(); setPage('registro'); setOpen(false); }} style={{ marginTop: 24, color: 'var(--violet-600)' }}>
          Únete a SOCIEM-UNA →
        </a>
      </div>
    </>
  );
};

// ============ Footer ============
const Footer = ({ setPage }) => (
  <footer className="footer">
    <div className="container">
      <div className="grid" style={{ gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 48 }}>
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Logo size={44} />
            <Wordmark inverse />
          </div>
          <p style={{ color: '#B8B1C5', fontSize: 14.5, maxWidth: 320, lineHeight: 1.6 }}>
            Sociedad Científica de Estudiantes de Medicina de la Universidad Nacional del Altiplano. Filial oficial de IFMSA-Perú y SOCIMEP.
          </p>
          <div className="flex gap-3 mt-6">
            <a href="https://www.facebook.com/share/1Ag5jhmu7K/" target="_blank" rel="noopener noreferrer" aria-label="Facebook de SOCIEM-UNA" className="icon-btn" style={{ background: 'rgba(255,255,255,.08)', color: '#fff' }}><Icon name="facebook" size={15} /></a>
            <a href="https://www.instagram.com/sociem_una_puno" target="_blank" rel="noopener noreferrer" aria-label="Instagram de SOCIEM-UNA" className="icon-btn" style={{ background: 'rgba(255,255,255,.08)', color: '#fff' }}><Icon name="instagram" size={15} /></a>
            <a href="mailto:sociem.una@gmail.com" aria-label="Escribir a SOCIEM-UNA por correo" className="icon-btn" style={{ background: 'rgba(255,255,255,.08)', color: '#fff' }}><Icon name="mail" size={15} /></a>
          </div>
        </div>
        <div>
          <h4>Sociedad</h4>
          <div className="flex" style={{ flexDirection: 'column', gap: 12 }}>
            <a href="#" onClick={(e) => { e.preventDefault(); setPage('nosotros'); }}>Nosotros</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setPage('directorio'); }}>Directorio</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setPage('comites'); }}>Comités</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setPage('miembros'); }}>Miembros</a>
          </div>
        </div>
        <div>
          <h4>Recursos</h4>
          <div className="flex" style={{ flexDirection: 'column', gap: 12 }}>
            <a href="#" onClick={(e) => { e.preventDefault(); setPage('actividades'); }}>Actividades</a>
            <a href="https://forms.gle/Lk5QrJPaEaQVxLvF8" target="_blank" rel="noopener noreferrer">Inscripción</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setPage('contacto'); }}>Contacto</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setPage('admin'); }}>Acceso interno</a>
          </div>
        </div>
        <div>
          <h4>Contacto</h4>
          <div className="flex" style={{ flexDirection: 'column', gap: 12, color: '#B8B1C5', fontSize: 14 }}>
            <span>Universidad Nacional<br />del Altiplano</span>
            <span>Facultad de Medicina Humana<br />Av. Floral 1153, Puno</span>
            <a href="mailto:sociem.una@gmail.com">sociem.una@gmail.com</a>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 64, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,.08)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, fontSize: 13, color: '#807A8C' }}>
        <span>© 2026 SOCIEM-UNA · Todos los derechos reservados</span>
        <span>Filial · IFMSA-Perú · SOCIMEP · UNA Puno</span>
      </div>
    </div>
  </footer>
);

// Tarjeta de error de red: distingue "falló la carga" de "no hay datos".
// Las páginas la muestran cuando la API devuelve ok:false o lanza.
const LoadErrorCard = ({ onRetry, children }) => (
  <div className="card mt-8" style={{ padding: 40, textAlign: 'center' }}>
    <img src="assets/mascota/mascota-error.png?v=3" alt="" style={{ width: 130, margin: '0 auto 4px', display: 'block' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
    <p className="mt-3" style={{ color: 'var(--fg-muted)', maxWidth: 420, margin: '12px auto 0' }}>
      {children || 'No pudimos cargar la información. Revisa tu conexión e inténtalo de nuevo.'}
    </p>
    {onRetry && (
      <button className="btn btn-primary" style={{ marginTop: 18 }} onClick={onRetry}>
        <Icon name="refresh" size={14} /> Reintentar
      </button>
    )}
  </div>
);

// Página 404: la mascota busca la página perdida y ofrece rutas de rescate.
const NotFoundPage = ({ intento }) => (
  <section style={{ maxWidth: 720, margin: '0 auto', padding: '130px 24px 100px', textAlign: 'center' }}>
    <img
      src="assets/mascota/mascota-404.png?v=3" alt="Mascota de SOCIEM-UNA buscando la página con una lupa"
      style={{ width: 210, margin: '0 auto 8px', display: 'block' }}
      onError={(e) => { if (!e.currentTarget.dataset.alt) { e.currentTarget.dataset.alt = '1'; e.currentTarget.src = 'assets/mascota/mascota-error.png?v=3'; } else { e.currentTarget.style.display = 'none'; } }}
    />
    <div className="mono small" style={{ color: 'var(--violet-600)', letterSpacing: '0.14em' }}>ERROR 404</div>
    <h1 className="serif mt-2" style={{ fontSize: 'clamp(34px, 5vw, 54px)', lineHeight: 1.05 }}>
      Buscamos por todo el altiplano y esta página no aparece.
    </h1>
    <p className="mt-4" style={{ color: 'var(--fg-muted)', maxWidth: '48ch', margin: '16px auto 0' }}>
      {intento ? <>La dirección <code style={{ background: 'var(--bg-soft)', padding: '2px 8px', borderRadius: 6 }}>#/{intento}</code> no existe o fue movida.</> : 'La dirección que escribiste no existe o fue movida.'}
    </p>
    <div className="flex justify-center gap-3 mt-8" style={{ marginTop: 32, flexWrap: 'wrap' }}>
      <a className="btn btn-primary" href="#/home">Volver al inicio</a>
      <a className="btn btn-ghost" href="#/eventos">Ver eventos</a>
      <a className="btn btn-ghost" href="#/noticias">Leer noticias</a>
      <a className="btn btn-ghost" href="#/contacto">Escríbenos</a>
    </div>
  </section>
);

Object.assign(window, { Icon, Logo, ComiteLogo, comiteLogoUrl, Wordmark, Navbar, Footer, NAV_ITEMS, LoadErrorCard, NotFoundPage });
