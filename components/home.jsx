// ============ HOME — Noche Altiplánica ============
// Landing de SOCIEM-UNA. Un solo hero nocturno (se retiraron las variantes
// editorial/moderno/vibrante del TweaksPanel) y secciones que se revelan al
// hacer scroll con useReveal(). Todo el estilo vive en css/home.css; aquí solo
// quedan estilos inline para variables (--c color de comité, --i escalonado).
//
// Ojo con los nombres: cada .jsx corre como script clásico y comparte el
// ámbito global, así que todo lo de este archivo lleva prefijo Home/HOME_.

// Ilustraciones propias (set "Noche Altiplánica"). Las nuevas pueden no
// existir todavía: cada <img> cae a un asset que sí está en el repo.
const HOME_HERO_IMG = 'assets/hero/hero-noche.jpg';
const HOME_HERO_FALLBACK = 'assets/hero/hero-altiplano.jpg';

// onError en dos pasos: primero el respaldo, luego ocultar.
const homeFallback = (fb) => (e) => {
  const el = e.currentTarget;
  if (fb && !el.dataset.fb) { el.dataset.fb = '1'; el.src = fb; }
  else { el.style.visibility = 'hidden'; }
};
const homeHide = (e) => { e.currentTarget.style.display = 'none'; };

// Color de identidad por comité (tokens de styles.css). Las divisiones de
// soporte no tienen token: usan el turquesa/oro de su logo.
const HOME_COLOR = {
  'SCOME': 'var(--c-scome)', 'SCOPH': 'var(--c-scoph)', 'SCORP': 'var(--c-scorp)', 'SCORA': 'var(--c-scora)',
  'SCOPE': 'var(--c-scopein)', 'SCOPE-IN': 'var(--c-scopein)', 'SCOPE-OUT': 'var(--c-scopeout)', 'SCORE': 'var(--c-score)',
  'CPC': 'var(--c-cpc)', 'CPPC': 'var(--c-cppc)', 'CPA': 'var(--c-cpa)', 'CPAIS': 'var(--c-cpais)',
  'CPDII': 'var(--c-cpdii)', 'CPRII': 'var(--c-cprii)',
  'DSE': '#2EC4B6', 'DSNT': '#2EC4B6', 'DSP': 'var(--gold)',
};
const homeColor = (code) => HOME_COLOR[String(code || '').toUpperCase()] || 'var(--primary)';

// Cabecera de sección reutilizable: overline, titular (admite <em>) y enlace.
const HomeHead = ({ eyebrow, title, lede, link, linkLabel, center = false }) => (
  <div className={`home-head reveal ${center ? 'is-center' : ''}`}>
    <div>
      <div className="eyebrow">{eyebrow}</div>
      <h2 className="h2 home-head-title">{title}</h2>
      {lede && <p className="lede home-head-lede">{lede}</p>}
    </div>
    {link && <a className="btn-link home-head-link" href={link}>{linkLabel} <Icon name="arrow" size={14} /></a>}
  </div>
);

// ====== Animated counter ======
const AnimatedNum = ({ to, suffix = '' }) => {
  const [n, setN] = React.useState(0);
  const ref = React.useRef(null);
  const fired = React.useRef(false); // ya animó una vez (el observer ya disparó)
  React.useEffect(() => {
    let raf;
    const dur = 1400;
    const animar = () => {
      const start = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(eased * to));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    // Anima apenas hay dato (to > 0): esperar al IntersectionObserver dejaba
    // el contador clavado en 0 cuando la API respondía con el elemento ya
    // visible o fuera del viewport. El observer solo aporta el retardo
    // estético del primer render sin datos.
    if (fired.current || to > 0) { fired.current = true; animar(); return () => cancelAnimationFrame(raf); }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { fired.current = true; animar(); obs.disconnect(); }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => { obs.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
};

// =============== HERO ===============
// Imagen a sangre bajo la nav: el tercio izquierdo es cielo limpio para el
// texto y la estudiante queda a la derecha (object-position la conserva en
// móvil). Unas pocas estrellas titilan encima del cielo pintado.
const HOME_STARS = [[6, 14, 0], [14, 32, 1.2], [22, 9, 2.1], [31, 22, .6], [9, 52, 1.8], [38, 6, 2.8], [44, 38, .9], [27, 46, 3.3], [18, 66, 2.4], [48, 18, 1.5], [3, 74, .3], [35, 60, 3.9]];

const HomeHero = () => {
  // No se usa href="#id": con el router por hash eso abriría el 404.
  const bajar = () => { const el = document.getElementById('home-kpis'); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  return (
    <section className="home-hero" aria-label="Presentación">
      <div className="home-hero-bg" aria-hidden="true">
        <img src={HOME_HERO_IMG} alt="" onError={homeFallback(HOME_HERO_FALLBACK)} />
        <div className="hero-grain" />
      </div>
      <div className="home-hero-stars" aria-hidden="true">
        {HOME_STARS.map((s, i) => <i key={i} style={{ left: s[0] + '%', top: s[1] + '%', animationDelay: s[2] + 's' }} />)}
      </div>

      <div className="container home-hero-inner">
        <div className="home-hero-copy">
          <div className="home-hero-pill fade-up">
            <span className="home-hero-pill-dot" /> Gestión 2026 · Filial oficial IFMSA-Perú y SOCIMEP
          </div>
          <h1 className="h-display home-hero-title fade-up d1">
            Ciencia médica <em>desde el altiplano</em>.
          </h1>
          <p className="lede home-hero-lede fade-up d2">
            Somos la Sociedad Científica de Estudiantes de Medicina de la UNA Puno: investigamos,
            hacemos salud pública y abrimos puertas al mundo desde los 3 827 metros.
          </p>
          <div className="home-hero-ctas fade-up d3">
            <a className="btn btn-gold" href="#/registro">Únete a SOCIEM-UNA <Icon name="arrowUpRight" size={14} /></a>
            <a className="btn btn-ghost" href="#/nosotros">Conócenos</a>
          </div>
          <ul className="home-hero-data fade-up d4">
            <li><span>Fundada</span>1992</li>
            <li><span>Altitud</span>3 827 msnm</li>
            <li><span>Red</span>IFMSA · SOCIMEP</li>
          </ul>
        </div>
      </div>

      {/* Sin mascota flotante: el búho ya vive dentro de la ilustración del hero (una mascota por vista). */}
      <button type="button" className="home-hero-scroll" onClick={bajar} aria-label="Bajar al contenido">
        <Icon name="arrowDown" size={18} />
      </button>
    </section>
  );
};

// ====== KPIs (contadores conectados a la API) ======
const HOME_KPIS = [
  { k: 'anios', label: 'Años de trayectoria', suffix: '+', icon: 'star', gold: true },
  { k: 'miembros', label: 'Miembros activos', icon: 'users' },
  { k: 'comites', label: 'Comités y divisiones', icon: 'layers' },
  { k: 'eventos', label: 'Eventos registrados', suffix: '+', icon: 'calendar' },
];

const HomeKpis = () => {
  const [c, setC] = React.useState({ anios: 0, miembros: 0, comites: 0, eventos: 0 });
  const lenOf = (r) => r && (r.total || (Array.isArray(r.items) && r.items.length) || (Array.isArray(r.data) && r.data.length)) || 0;
  React.useEffect(() => {
    if (!window.SOCIEM_API) return;
    const API = window.SOCIEM_API;
    Promise.all([
      API.get('miembros', 'publicList'),
      API.get('comites', 'list'),
      API.get('eventos', 'list'),
      API.get('puno', 'info')
    ]).then(([mR, cR, eR, pR]) => {
      const fund = pR && pR.data && pR.data.fundacion ? parseInt(String(pR.data.fundacion).slice(0, 4), 10) : null;
      const anios = fund ? (new Date().getFullYear() - fund) : 0;
      setC({ anios, miembros: lenOf(mR), comites: lenOf(cR), eventos: lenOf(eR) });
    }).catch(() => {});
  }, []);
  return (
    <section id="home-kpis" className="home-kpis">
      <div className="container">
        <div className="home-kpi-grid">
          {HOME_KPIS.map((k, i) => (
            <div key={k.k} className="reveal" style={{ '--i': i }}>
              <div className={`home-kpi ${k.gold ? 'is-gold' : ''}`}>
                <span className={`halo ${k.gold ? 'halo-gold' : 'halo-violet'} home-kpi-halo`} aria-hidden="true" />
                <span className="home-kpi-ico"><Icon name={k.icon} size={18} /></span>
                <div className="counter-num"><AnimatedNum to={c[k.k]} suffix={k.suffix || ''} /></div>
                <div className="counter-label">{k.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ====== Quiénes somos: misión, visión, valores ======
const HOME_IDENTIDAD = [
  { icon: 'flask', title: 'Misión', color: 'var(--primary)', body: 'Fomentar la investigación científica, la educación médica continua y el liderazgo estudiantil en la Facultad de Medicina Humana de la UNA Puno, contribuyendo a la salud regional y nacional.' },
  { icon: 'sparkle', title: 'Visión', color: 'var(--gold)', body: 'Ser referente nacional de sociedades científicas estudiantiles, reconocida por la calidad de sus proyectos, su impacto comunitario y la formación integral de sus miembros para el 2030.' },
  { icon: 'shield', title: 'Valores', color: 'var(--info)', body: 'Excelencia académica, ética, vocación de servicio, trabajo colaborativo, compromiso social y respeto por la diversidad cultural del altiplano.' },
];

const HomeQuienes = () => (
  <section className="home-about">
    <div className="container home-about-grid">
      <div className="home-about-intro reveal">
        <div className="eyebrow">¿Quiénes somos?</div>
        <h2 className="h2 home-head-title">Futuros médicos que <em>investigan</em> para su tierra.</h2>
        <p className="lede home-head-lede">
          Desde 1992 formamos líderes en investigación, salud pública y cooperación internacional
          en la Facultad de Medicina Humana de la Universidad Nacional del Altiplano.
        </p>
        <figure className="home-about-fig">
          <img src="assets/banners/nosotros-banner.jpg" alt="" loading="lazy" onError={homeFallback('assets/hero/nosotros-identidad.jpg')} />
          <figcaption className="mono">FMH · UNA PUNO · DESDE 1992</figcaption>
        </figure>
        <a className="btn-link" href="#/nosotros">Conoce nuestra historia <Icon name="arrow" size={14} /></a>
      </div>
      <div className="home-about-cards">
        {HOME_IDENTIDAD.map((v, i) => (
          <div key={v.title} className="reveal" style={{ '--i': i }}>
            <article className="card home-feature" style={{ '--c': v.color }}>
              <span className="home-feature-halo" aria-hidden="true" />
              <span className="home-feature-ico"><Icon name={v.icon} size={22} /></span>
              <div>
                <h3 className="h3">{v.title}</h3>
                <p>{v.body}</p>
              </div>
            </article>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ====== Qué hacemos: constelación de los cuatro ejes ======
// Gráfico orbital: SOCIEM al centro, los cuatro ejes en las diagonales y sus
// comités como satélites unidos por líneas de luz. Todo se posiciona en un
// lienzo cuadrado de 0–100 (SVG para las líneas, HTML absoluto en % para los
// nodos), así escala igual en desktop y móvil. El eje activo rota solo cada
// HOME_ORBITA_MS hasta que el visitante interactúa.
const HOME_PILARES = [
  { icon: 'flask', title: 'Investigación', color: '#A46BE0', ang: -135,
    body: 'Proyectos, club de revistas y publicaciones científicas desde el pregrado.',
    datos: 'Club de revistas · proyectos · papers', comites: ['CPC', 'CPPC', 'SCORE'] },
  { icon: 'health', title: 'Salud pública', color: '#3FB97A', ang: -45,
    body: 'Campañas y proyectos comunitarios de promoción y prevención en Puno.',
    datos: 'Campañas · ferias · prevención', comites: ['SCOPH', 'CPAIS', 'SCORA'] },
  { icon: 'exchange', title: 'Intercambios', color: '#5BB5D5', ang: 45,
    body: 'Rotaciones clínicas y de investigación en el extranjero con IFMSA.',
    datos: 'Rotaciones clínicas · investigación', comites: ['SCOPE', 'SCORE'] },
  { icon: 'book', title: 'Educación médica', color: '#E2B84E', ang: 135,
    body: 'Cursos, talleres y entrenamientos que complementan la formación.',
    datos: 'Cursos · talleres · entrenamientos', comites: ['SCOME', 'CPA', 'DSE'] },
];
const HOME_ORBITA_MS = 4500;

// Punto polar en el lienzo 0–100 (0° = derecha, sentido horario).
const homePolar = (cx, cy, r, deg) => {
  const a = deg * Math.PI / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
};
// Geometría fija: ejes a r=25 del centro y satélites abiertos en abanico
// hacia afuera, a r=18 de su eje.
const HOME_ORBITA = HOME_PILARES.map(p => {
  const [x, y] = homePolar(50, 50, 25, p.ang);
  const n = p.comites.length;
  const sats = p.comites.map((c, k) => {
    const abre = n === 1 ? 0 : -52 + (104 / (n - 1)) * k;
    const [sx, sy] = homePolar(x, y, 18, p.ang + abre);
    return { code: c, x: sx, y: sy };
  });
  return { ...p, x, y, sats };
});

const HomeQueHacemos = () => {
  const [activo, setActivo] = React.useState(0);
  const [pausa, setPausa] = React.useState(false);
  React.useEffect(() => {
    const quieto = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (pausa || quieto) return;
    const t = setInterval(() => setActivo(a => (a + 1) % HOME_ORBITA.length), HOME_ORBITA_MS);
    return () => clearInterval(t);
  }, [pausa]);
  const elegir = (i) => { setActivo(i); setPausa(true); };
  const p = HOME_ORBITA[activo];

  return (
    <section className="home-pilares">
      <div className="container">
        <HomeHead eyebrow="Qué hacemos" title={<>Cuatro ejes, <em>una sola</em> sociedad.</>}
          lede="Cada comité empuja uno de estos frentes. Tú eliges dónde sumar."
          link="#/comites" linkLabel="Ver todos los comités" />

        <div className="home-orbita-wrap reveal" onMouseLeave={() => setPausa(false)}>
          <div className="home-orbita" style={{ '--c': p.color }}>
            <span className="home-orbita-glow" aria-hidden="true" />
            <svg className="home-orbita-svg" viewBox="0 0 100 100" aria-hidden="true">
              <defs>
                {HOME_ORBITA.map((e, i) => (
                  <linearGradient key={i} id={`home-rayo-${i}`} gradientUnits="userSpaceOnUse" x1="50" y1="50" x2={e.x} y2={e.y}>
                    <stop offset="0" stopColor="#fff" stopOpacity=".05" />
                    <stop offset="1" stopColor={e.color} stopOpacity=".9" />
                  </linearGradient>
                ))}
              </defs>
              <circle className="home-orbita-ring r1" cx="50" cy="50" r="25" />
              <circle className="home-orbita-ring r2" cx="50" cy="50" r="44" />
              <circle className="home-orbita-ring r3" cx="50" cy="50" r="12" />
              {HOME_ORBITA.map((e, i) => (
                <g key={e.title} className={`home-orbita-rama ${i === activo ? 'is-on' : ''}`} style={{ '--c': e.color }}>
                  <line className="home-orbita-rayo" x1="50" y1="50" x2={e.x} y2={e.y} stroke={`url(#home-rayo-${i})`} />
                  <line className="home-orbita-flujo" x1="50" y1="50" x2={e.x} y2={e.y} />
                  {e.sats.map(s => (
                    <line key={s.code} className="home-orbita-hilo" x1={e.x} y1={e.y} x2={s.x} y2={s.y} />
                  ))}
                </g>
              ))}
            </svg>

            <div className="home-orbita-nucleo">
              <span className="home-orbita-pulso" aria-hidden="true" />
              <img src="assets/logos/sm/logo_SOCIEM-UNA.png" alt="SOCIEM-UNA" />
            </div>

            {HOME_ORBITA.map((e, i) => (
              <React.Fragment key={e.title}>
                <button type="button"
                  className={`home-orbita-eje ${e.y > 50 ? 'lbl-arriba' : ''} ${i === activo ? 'is-on' : ''}`}
                  style={{ left: e.x + '%', top: e.y + '%', '--c': e.color }}
                  onMouseEnter={() => elegir(i)} onFocus={() => elegir(i)} onClick={() => elegir(i)}
                  aria-pressed={i === activo} aria-label={e.title}>
                  <Icon name={e.icon} size={22} />
                  <span className="home-orbita-eje-lbl">{e.title}</span>
                </button>
                {e.sats.map(s => (
                  <a key={e.title + s.code} href="#/comites"
                    className={`home-orbita-sat ${i === activo ? 'is-on' : ''}`}
                    style={{ left: s.x + '%', top: s.y + '%', '--c': homeColor(s.code) }}
                    title={s.code} onMouseEnter={() => elegir(i)}>
                    <img src={comiteLogoSm(s.code)} alt={s.code} loading="lazy" onError={homeHide} />
                  </a>
                ))}
              </React.Fragment>
            ))}
          </div>

          <div className="home-orbita-panel" style={{ '--c': p.color }} aria-live="polite">
            <div className="home-orbita-tabs" role="tablist" aria-label="Ejes de trabajo">
              {HOME_ORBITA.map((e, i) => (
                <button key={e.title} type="button" role="tab" aria-selected={i === activo}
                  className={`home-orbita-tab ${i === activo ? 'is-on' : ''}`} style={{ '--c': e.color }}
                  onClick={() => elegir(i)}>
                  <span className="mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className="home-orbita-tab-bar">{i === activo && !pausa && <i key={activo} />}</span>
                </button>
              ))}
            </div>
            <div key={activo} className="home-orbita-detalle">
              <span className="home-orbita-ico"><Icon name={p.icon} size={26} /></span>
              <div className="eyebrow home-orbita-over">Eje {String(activo + 1).padStart(2, '0')} · {p.datos}</div>
              <h3 className="home-orbita-titulo">{p.title}</h3>
              <p className="home-orbita-body">{p.body}</p>
              <div className="home-orbita-comites">
                {p.comites.map(c => (
                  <a key={c} href="#/comites" className="home-orbita-comite" style={{ '--c': homeColor(c) }}>
                    <img src={comiteLogoSm(c)} alt="" loading="lazy" onError={homeHide} />
                    <span>{c}</span>
                  </a>
                ))}
              </div>
              <a className="btn btn-primary home-orbita-cta" href="#/comites">Sumarme a {p.title.toLowerCase()} <Icon name="arrowUpRight" size={14} /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ====== Comités: rejilla visual de logos ======
// Lista fija (instantánea, sin esperar a la API) con el orden de las tres
// familias. Los nombres siguen la hoja `comites` del backend.
const HOME_COMITES = [
  ['SCOME', 'Educación Médica', 'IFMSA'], ['SCOPH', 'Salud Pública', 'IFMSA'],
  ['SCORP', 'Derechos Humanos y Paz', 'IFMSA'], ['SCORA', 'Salud Sexual y Reproductiva', 'IFMSA'],
  ['SCOPE-IN', 'Intercambios · Entrantes', 'IFMSA'], ['SCOPE-OUT', 'Intercambios · Salientes', 'IFMSA'],
  ['SCORE', 'Intercambio de Investigación', 'IFMSA'],
  ['CPC', 'Científico', 'SOCIMEP'], ['CPPC', 'Publicaciones Científicas', 'SOCIMEP'],
  ['CPA', 'Académico', 'SOCIMEP'], ['CPAIS', 'Atención Integral en Salud', 'SOCIMEP'],
  ['CPDII', 'Difusión e Imagen Institucional', 'SOCIMEP'], ['CPRII', 'Relaciones Interinstitucionales', 'SOCIMEP'],
  ['DSE', 'Entrenamientos', 'DIVISIONES'], ['DSNT', 'Nuevas Tecnologías', 'DIVISIONES'], ['DSP', 'Proyectos', 'DIVISIONES'],
];
const HOME_FAMILIAS = [['TODOS', 'Todos'], ['IFMSA', 'IFMSA'], ['SOCIMEP', 'SOCIMEP'], ['DIVISIONES', 'Divisiones']];

const HomeComites = () => {
  const [fam, setFam] = React.useState('TODOS');
  const lista = HOME_COMITES.filter(c => fam === 'TODOS' || c[2] === fam);
  return (
    <section className="home-comites">
      <div className="container">
        <HomeHead eyebrow="Comités y divisiones" title={<>Dieciséis equipos, <em>un mismo cielo</em>.</>}
          lede="Comités permanentes de IFMSA y SOCIMEP, y divisiones de soporte que sostienen todo lo demás."
          link="#/comites" linkLabel="Conocer los comités" />
        <div className="chip-row home-comites-filtro reveal" role="group" aria-label="Filtrar por red">
          {HOME_FAMILIAS.map(([id, label]) => (
            <button key={id} type="button" className={`chip ${fam === id ? 'active' : ''}`} aria-pressed={fam === id} onClick={() => setFam(id)}>
              {label}
            </button>
          ))}
        </div>
        <div className="home-comite-grid">
          {lista.map(([code, nombre, familia]) => (
            <a key={code} className="home-comite" href="#/comites" style={{ '--c': homeColor(code) }} title={`${code} · ${nombre}`}>
              <span className="home-comite-logo">
                <img src={comiteLogoSm(code)} alt="" width="64" height="64" loading="lazy" onError={homeHide} />
              </span>
              <span className="home-comite-code">{code}</span>
              <span className="home-comite-name">{nombre}</span>
              <span className="home-comite-fam mono">{familia === 'DIVISIONES' ? 'DIVISIÓN' : familia}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// ====== Filiación ======
const HOME_FILIACION = [
  { name: 'IFMSA-Perú', sub: 'International Federation of Medical Students’ Associations', icon: 'globe', dato: 'Filial desde 2015', oficial: true },
  { name: 'SOCIMEP', sub: 'Sociedad Científica Médico Estudiantil Peruana', icon: 'flask', dato: 'Filial desde 1992', oficial: true },
  { name: 'UNA Puno', sub: 'Universidad Nacional del Altiplano', icon: 'book', dato: 'Casa de estudios' },
  { name: 'FMH-UNA', sub: 'Facultad de Medicina Humana', icon: 'medal', dato: 'Sede de la sociedad' },
];

const HomeFiliacion = () => (
  <section className="home-filiacion">
    <div className="container">
      <HomeHead center eyebrow="Filiación oficial" title={<>Conectados a la red médico-estudiantil <em>más activa</em>.</>} />
      <div className="home-fil-grid">
        {HOME_FILIACION.map((p, i) => (
          <div key={p.name} className="reveal" style={{ '--i': i }}>
            <div className="card home-fil">
              {p.oficial && <span className="badge badge-gold home-fil-badge"><Icon name="star" size={10} /> Filial oficial</span>}
              <span className="home-fil-ico"><Icon name={p.icon} size={22} /></span>
              <div className="home-fil-name">{p.name}</div>
              <div className="home-fil-sub">{p.sub}</div>
              <div className="home-fil-dato mono">{p.dato}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ====== Inscripciones / Convocatorias activas ======
// Se conecta al backend (route=formularios&action=list). Si no hay datos
// (sheet vacía o backend offline) la sección se oculta automáticamente.
const HomeInscripciones = () => {
  const [items, setItems] = React.useState(null);
  React.useEffect(() => {
    if (!window.SOCIEM_API) return;
    window.SOCIEM_API.get('formularios', 'list').then(r => {
      if (r && r.ok && Array.isArray(r.data)) setItems(r.data);
    }).catch(() => {});
  }, []);
  if (!items || items.length === 0) return null;
  const fmtFecha = (s) => {
    if (!s) return '';
    // "2026-03-31" a secas se lee como medianoche UTC y en Lima salía el día
    // anterior: se ancla al mediodía local.
    const d = /^\d{4}-\d{2}-\d{2}$/.test(String(s)) ? new Date(s + 'T12:00:00') : new Date(s);
    try { return d.toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }); }
    catch (e) { return s; }
  };
  // Solo presentación: una fecha límite pasada se marca como cerrada.
  const vencida = (s) => { const t = Date.parse(String(s || '').slice(0, 10) + 'T23:59:59-05:00'); return !isNaN(t) && t < Date.now(); };
  return (
    <section className="home-insc">
      <div className="container">
        <HomeHead eyebrow="Inscripciones · Convocatorias" title={<>Súmate a <em>lo que viene</em>.</>}
          lede="Cursos, talleres, eventos y campañas con inscripción abierta." />
        <div className="home-card-grid">
          {items.map((f, i) => {
            const cerrada = f.fecha_limite && vencida(f.fecha_limite);
            const destacado = f.destacado === true || String(f.destacado).toUpperCase() === 'SI';
            return (
              <div key={f.id || i} className="reveal" style={{ '--i': i }}>
                <article className="card card-hover home-insc-card">
                  {f.imagen_url && (
                    <div className="card-media home-media-43">
                      <img src={IMG(f.imagen_url)} alt="" loading="lazy" onError={homeFallback('assets/forms/inscripcion.jpg')} />
                    </div>
                  )}
                  <div className="home-card-body">
                    <div className="home-badges">
                      {f.tipo && <span className="badge">{f.tipo}</span>}
                      {destacado && <span className="badge badge-gold"><Icon name="star" size={10} /> Destacado</span>}
                      {f.comite_relacionado && <span className="comite-chip" style={{ '--c': homeColor(f.comite_relacionado) }}><span className="home-dot" />{f.comite_relacionado}</span>}
                    </div>
                    <h3 className="home-card-title">{f.titulo}</h3>
                    {f.descripcion && (
                      <p className="home-card-desc">{String(f.descripcion).slice(0, 160)}{String(f.descripcion).length > 160 ? '…' : ''}</p>
                    )}
                    {f.fecha_limite && (
                      <div className={`home-insc-fecha mono ${cerrada ? 'is-cerrada' : ''}`}>
                        <Icon name="calendar" size={13} /> {cerrada ? 'Cerró' : 'Cierra'}: {fmtFecha(f.fecha_limite)}
                      </div>
                    )}
                    <div className="home-grow" />
                    <a className="btn btn-primary home-insc-cta" href={f.url} target="_blank" rel="noopener noreferrer">
                      {f.cta_label || 'Inscríbete'} <Icon name="arrowUpRight" size={14} />
                    </a>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ====== Actividades recientes (noticias) ======
// 100% desde Google Sheets (noticias.list). Si no hay noticias, se oculta.
// Tarjetas estilo Green Deck: imagen arriba y action circle al hover.
const HomeActividades = () => {
  const [items, setItems] = React.useState(null); // null = cargando
  React.useEffect(() => {
    if (!window.SOCIEM_API) { setItems([]); return; }
    const adaptNoticia = (n) => ({
      tag:   n.comite_relacionado || n.categoria || 'INSTITUCIONAL',
      title: n.titulo,
      href:  '#/noticias/' + (n.slug || n.id),
      date:  n.fecha_publicacion ? new Date(n.fecha_publicacion).toLocaleDateString('es-PE', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase() : '',
      img:   IMG(n.imagen_portada) || 'assets/noticias/noticia-default.jpg'
    });
    window.SOCIEM_API.get('noticias', 'list', { limit: 4 }).then(r => {
      const list = r && (Array.isArray(r.items) ? r.items : Array.isArray(r.data) ? r.data : []);
      setItems((list || []).slice(0, 4).map(adaptNoticia));
    }).catch(() => setItems([]));
  }, []);
  if (items !== null && items.length === 0) return null; // sin noticias → no se muestra
  return (
    <section className="home-news">
      <div className="container">
        <HomeHead eyebrow="Actividades recientes" title={<>Lo que pasa <em>en SOCIEM</em>.</>}
          link="#/noticias" linkLabel="Ver todas las noticias" />
        <div className="home-news-grid">
          {items === null
            ? [0, 1, 2, 3].map(i => <div key={i} className="skeleton home-news-sk" />)
            : items.map((it, i) => (
              <div key={it.href + i} className="reveal" style={{ '--i': i }}>
                <a className="card card-hover home-news-card" href={it.href}>
                  <div className="card-media home-media-45">
                    <img src={it.img} alt="" loading="lazy" onError={homeFallback('assets/noticias/noticia-default.jpg')} />
                    <span className="action-circle" aria-hidden="true"><Icon name="arrowUpRight" size={20} /></span>
                  </div>
                  <div className="home-card-body">
                    <span className="comite-chip" style={{ '--c': homeColor(it.tag) }}><span className="home-dot" />{String(it.tag).replace(/_/g, ' ')}</span>
                    <h3 className="home-card-title">{it.title}</h3>
                    {it.date && <div className="home-card-meta mono">{it.date}</div>}
                  </div>
                </a>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

// ====== Bandas: Tienda y Certificados ======
const HomeBandas = () => {
  const [codigo, setCodigo] = React.useState('');
  // Abre la misma ruta que el QR impreso: #/certificados/<DNI o código>, y
  // CertificadosPage consulta sola al montar.
  const verificar = (e) => {
    e.preventDefault();
    const c = codigo.trim();
    window.location.hash = c ? '/certificados/' + encodeURIComponent(c) : '/certificados';
  };
  return (
    <section className="home-bandas">
      <div className="container home-bandas-grid">
        <div className="reveal">
          <a className="home-banda is-tienda" href="#/tienda">
            <img className="home-banda-bg" src="assets/banners/tienda-banner.jpg" alt="" loading="lazy" onError={homeFallback('assets/tienda/banner-tienda.jpg')} />
            <div className="home-banda-body">
              <div className="eyebrow">Tienda oficial</div>
              <h3 className="home-banda-title">Lleva el altiplano <em>puesto</em>.</h3>
              <p>Polos, tomatodos y kits de la sociedad. Lo recaudado financia proyectos y campañas.</p>
              <span className="btn btn-primary">Ir a la tienda <Icon name="shoppingBag" size={15} /></span>
            </div>
          </a>
        </div>
        <div className="reveal" style={{ '--i': 1 }}>
          <div className="home-banda is-cert">
            <img className="home-banda-bg" src="assets/banners/certificados-banner.jpg" alt="" loading="lazy" onError={homeFallback('assets/fondos/fondo-constelacion.jpg')} />
            <div className="home-banda-body">
              <div className="eyebrow home-gold">Certificados verificables</div>
              <h3 className="home-banda-title">Tu esfuerzo, <em>con sello</em>.</h3>
              <p>Cada certificado lleva un código y un QR. Búscalo con tu DNI o comprueba un código.</p>
              <form className="home-cert-form" onSubmit={verificar} role="search">
                <label className="home-sr" htmlFor="home-cert-code">DNI o código del certificado</label>
                <Icon name="shield" size={16} className="home-cert-ico" />
                <input id="home-cert-code" className="input mono" value={codigo} onChange={(e) => setCodigo(e.target.value)}
                       placeholder="DNI o código · SOC-2026-K7M2Q9" autoComplete="off" spellCheck="false" />
                <button type="submit" className="btn btn-primary">Verificar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ====== CTA final ======
const HomeCTA = () => (
  <section className="home-cta-wrap">
    <div className="container">
      <div className="cta-band home-cta reveal">
        <span className="home-cta-stars" aria-hidden="true" />
        <img className="home-cta-mascota" src="assets/mascota/mascota-hero.png?v=3" alt="" onError={homeHide} />
        <div className="home-cta-body">
          <div className="eyebrow home-gold">Inscripciones 2026</div>
          <h2 className="home-cta-title">El altiplano necesita médicos <em>investigadores</em>.</h2>
          <p className="lede">Empieza tu camino en SOCIEM: comités IFMSA, SOCIMEP y divisiones de soporte te esperan.</p>
          <div className="home-cta-actions">
            <a className="btn btn-gold" href="#/registro">Inscríbete ahora <Icon name="arrowUpRight" size={14} /></a>
            <a className="btn btn-ghost" href="#/contacto">Escríbenos</a>
          </div>
          <ul className="home-cta-facts mono">
            <li>EST. 1992 · REFUND. 2000</li>
            <li>ANIVERSARIO · 09 NOV</li>
            <li>PERIODO · ENE — DIC</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

const HomePage = () => {
  useReveal();
  return (
    <div className="page-fade home">
      <HomeHero />
      <HomeKpis />
      <HomeQuienes />
      <HomeQueHacemos />
      <HomeComites />
      <HomeInscripciones />
      <HomeActividades />
      <HomeBandas />
      <HomeFiliacion />
      <HomeCTA />
    </div>
  );
};

Object.assign(window, { HomePage, AnimatedNum });
