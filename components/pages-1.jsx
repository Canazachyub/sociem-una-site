// ============ Piezas compartidas de las páginas públicas (Noche Altiplánica) ============
// Estilos en css/publico.css. Los nombres llevan prefijo Pub/pub porque todos
// los .jsx comparten el ámbito global del navegador.

// Logos de comité en versión liviana (assets/logos/sm). Los originales pesan
// varios MB y aquí se muestran a 40–72 px.
const pubLogoSm = (code) => {
  const url = comiteLogoUrl(code);
  return url ? url.replace('assets/logos/', 'assets/logos/sm/') : null;
};

// Iniciales para cuando no hay foto.
const pubIniciales = (txt) => String(txt || '?').split(' ').filter(Boolean).map(s => s[0]).slice(0, 2).join('').toUpperCase();

// Color de comité: el del Sheet; si no hay, el token --c-<código>; si no, el primario.
const pubColorComite = (hex, code) => hex || `var(--c-${String(code || '').toLowerCase().replace(/[^a-z]/g, '')}, var(--primary))`;

// URL de Instagram a partir de @usuario o de un link completo.
const pubInstagramUrl = (ig) => /^https?:/.test(ig) ? ig : 'https://instagram.com/' + String(ig).replace(/^@/, '');

// Redes de una persona (iconos circulares). Devuelve null si no hay ninguna.
const PubRedes = ({ quien, instagram, linkedin, email, className = 'socials' }) => {
  if (!(instagram || linkedin || email)) return null;
  return (
    <div className={className}>
      {instagram && <a className="icon-btn" aria-label={'Instagram de ' + quien} href={pubInstagramUrl(instagram)} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}><Icon name="instagram" size={15} /></a>}
      {linkedin && <a className="icon-btn" aria-label={'LinkedIn de ' + quien} href={linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}><Icon name="linkedin" size={15} /></a>}
      {email && <a className="icon-btn" aria-label={'Correo de ' + quien} href={'mailto:' + email} onClick={(e) => e.stopPropagation()}><Icon name="mail" size={15} /></a>}
    </div>
  );
};

// Estado vacío con la mascota (una sola por vista).
const PubVacio = ({ img = 'assets/mascota/mascota-lectura.png?v=3', titulo, children }) => (
  <div className="pub-vacio">
    <img src={img} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
    {titulo && <h3 className="h3">{titulo}</h3>}
    {children && <p>{children}</p>}
  </div>
);

// Cabecera de sección: overline, título con acento y extra a la derecha.
const PubSecHead = ({ eyebrow, title, children }) => (
  <div className="pub-sec-head">
    <div>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="h2">{title}</h2>
    </div>
    {children && <div className="pub-sec-head-extra">{children}</div>}
  </div>
);

// Rejilla de esqueletos mientras llega la API.
const PubSkeletonGrid = ({ n = 8, className = 'pub-members', alto = 300 }) => (
  <div className={className} aria-busy="true" aria-label="Cargando">
    {Array.from({ length: n }).map((_, i) => <div key={i} className="skeleton" style={{ height: alto }} />)}
  </div>
);

// ============ NOSOTROS ============
const NosotrosPage = () => {
  const [info, setInfo] = React.useState(null);
  useReveal();

  React.useEffect(() => {
    if (!window.SOCIEM_API) return;
    try {
      const p = window.SOCIEM_API.get('puno', 'info');
      if (p && typeof p.then === 'function') {
        p.then(r => { if (r && r.ok && r.data) setInfo(r.data); }).catch(() => {});
      }
    } catch (_) { /* fallback estático */ }
  }, []);

  const dato = (k, fallback) => (info && info[k]) ? info[k] : fallback;

  // Años calculados desde la fecha real de fundación (config del backend).
  const anioFund = parseInt(String(dato('fundacion', '1992')).slice(0, 4), 10) || 1992;
  const anios = new Date().getFullYear() - anioFund;
  const stats = [
    { num: anios + '+', label: 'Años de trayectoria', sub: 'Desde ' + anioFund + ' en el altiplano' },
    { num: '13',  label: 'Comités permanentes',   sub: '7 IFMSA · 6 SOCIMEP' },
    { num: '3',   label: 'Divisiones de soporte', sub: 'Entrenamientos · Proyectos · Tecnologías' },
  ];

  const identidad = [
    { label: 'Aniversario',        value: dato('aniversario',        '09 de noviembre'),                    icon: 'star' },
    { label: 'Fundación',          value: dato('fundacion',          '09 nov 1992 · Puno'),                 icon: 'flag' },
    { label: 'Refundación',        value: dato('refundacion',        '19 ago 2000'),                        icon: 'refresh' },
    { label: 'Periodo de gestión', value: dato('periodo_gestion',    '01 ENE — 31 DIC'),                    icon: 'calendar' },
    { label: 'Casa de estudios',   value: dato('casa_estudios',      'UNA Puno · FMH'),                     icon: 'home' },
    { label: 'Filiación nacional', value: dato('filiacion',          'SOCIMEP (1992) · IFMSA-Perú (2015)'), icon: 'globe' },
    { label: 'Sede',               value: dato('sede',               'Av. Floral · Puno'),                  icon: 'pin' },
    { label: 'Idioma de trabajo',  value: dato('idioma',             'Español · Quechua · Aymara'),         icon: 'message' },
  ];

  const principios = [
    { num: '01', icon: 'compass', tono: 'violet', title: 'Misión', body: 'Fomentar la investigación científica, la educación médica continua y el liderazgo estudiantil entre los miembros de la Facultad de Medicina Humana de la UNA Puno, contribuyendo al desarrollo de la salud regional y nacional con un enfoque humanista, ético y comprometido con las comunidades del altiplano.' },
    { num: '02', icon: 'eye',     tono: 'gold',   title: 'Visión', body: 'Ser la sociedad científica estudiantil de medicina referente del sur del Perú al 2030, reconocida por la calidad de su producción académica, la solidez de sus proyectos de proyección social y la formación integral de profesionales de salud líderes en sus comunidades.' },
    { num: '03', icon: 'heart',   tono: 'violet', title: 'Valores', body: 'Excelencia académica, ética profesional, vocación de servicio, trabajo colaborativo, compromiso social, identidad institucional, respeto por la diversidad cultural andina y aymara, transparencia en la gestión, y formación humanista en el ejercicio de la medicina.' },
  ];

  const hitos = [
    { year: '1992', title: 'Fundación de SOCIEM-UNA',    body: 'El 09 de noviembre se funda la sociedad en la Facultad de Medicina Humana de la UNA Puno como expresión estudiantil del compromiso con la investigación científica, la educación médica y la proyección social.' },
    { year: '1992', title: 'Afiliación a SOCIMEP',        body: 'Ese mismo año SOCIEM-UNA se incorpora a la Sociedad Científica Médico Estudiantil del Perú, red nacional de sociedades científicas de medicina.' },
    { year: '2000', title: 'Refundación',                 body: 'El 19 de agosto, tras un periodo de reorganización, SOCIEM-UNA se refunda consolidando su estructura de comités permanentes y ampliando su alcance regional.' },
    { year: '2015', title: 'Afiliación a IFMSA-Perú',     body: 'Paso de proyección internacional: SOCIEM-UNA se afilia a IFMSA-Perú, capítulo nacional de la International Federation of Medical Students Associations, incorporando los comités SCOPE, SCOME, SCORE, SCOPH, SCORA y SCORP.' },
    { year: '2026', title: 'Gestión vigente', actual: true, body: '13 comités activos (7 IFMSA + 6 SOCIMEP), 3 divisiones de soporte y un periodo de gestión del 01 de enero al 31 de diciembre.' },
  ];

  // Las dos redes a las que pertenece la sociedad, con los comités que aporta cada una.
  const filiaciones = [
    { anio: '1992', red: 'SOCIMEP', alcance: 'Red nacional', badge: 'badge-gold', texto: 'Sociedad Científica Médico Estudiantil del Perú. Le da a SOCIEM-UNA sus comités permanentes de investigación, capacitación y proyección.', comites: ['CPC', 'CPPC', 'CPA', 'CPAIS', 'CPDII', 'CPRII'] },
    { anio: '2015', red: 'IFMSA-Perú', alcance: 'Red internacional', badge: 'badge-violet', texto: 'Capítulo nacional de la International Federation of Medical Students Associations. Abre los intercambios y los comités internacionales.', comites: ['SCOME', 'SCOPH', 'SCORP', 'SCORA', 'SCOPE', 'SCORE'] },
  ];

  return (
    <div className="page-fade pub">
      <PageHero
        img="assets/banners/nosotros-banner.jpg"
        fallback="assets/hero/nosotros-identidad.jpg"
        eyebrow="Nosotros · Historia · Identidad"
        title={<>{anios} años formando <em>investigadores</em> en el altiplano.</>}
        lede="Somos la Sociedad Científica de Estudiantes de Medicina de la Universidad Nacional del Altiplano: ciencia, educación médica y servicio a las comunidades a 3 827 m s.n.m."
      >
        <div className="pub-hero-actions">
          <a className="btn btn-primary" href="#/comites">Conoce los comités <Icon name="arrowUpRight" size={14} /></a>
          <a className="btn btn-ghost" href="#/directorio">Directorio 2026</a>
        </div>
        <div className="pub-hero-facts mono">
          <span>FUNDADA EN {anioFund}</span><span>PUNO · PERÚ</span><span>SOCIMEP · IFMSA-PERÚ</span>
        </div>
      </PageHero>

      {/* CIFRAS */}
      <section className="pub-sec pub-sec-tight">
        <div className="container">
          <div className="pub-stats reveal">
            {stats.map((s, i) => (
              <div key={i} className="pub-stat">
                <span className="halo halo-gold pub-stat-halo" aria-hidden="true" />
                <div className="pub-stat-num">{s.num}</div>
                <div className="pub-stat-label">{s.label}</div>
                <div className="caption">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATO */}
      <section className="pub-sec">
        <div className="container">
          <div className="pub-relato">
            <div className="reveal">
              <div className="eyebrow">Nuestra historia</div>
              <h2 className="h2 mt-4">Una sociedad nacida <em>desde el altiplano</em>.</h2>
              <p className="pub-relato-texto">
                SOCIEM-UNA fue fundada el 09 de noviembre de 1992 como expresión estudiantil del compromiso con la investigación científica, la educación médica y la proyección social en la Facultad de Medicina Humana de la Universidad Nacional del Altiplano de Puno.
              </p>
              <p className="pub-relato-texto">
                Ese mismo año se afilió a SOCIMEP. Tras un periodo de reorganización, fue refundada el 19 de agosto del 2000, y en 2015 dio el paso a la red internacional al afiliarse a IFMSA-Perú.
              </p>
            </div>
            <figure className="pub-relato-img reveal">
              <img src="assets/hero/nosotros-identidad.jpg" alt="Ilustración: estudiantes de medicina frente al lago Titicaca" loading="lazy" />
              <figcaption className="mono">SOCIEM-UNA · PUNO · 3 827 m s.n.m.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* MISIÓN · VISIÓN · VALORES */}
      <section className="pub-sec">
        <div className="container">
          <div className="reveal">
            <PubSecHead eyebrow="Principios rectores" title={<>Lo que nos <em>mueve</em> cada día.</>} />
          </div>
          <div className="pub-principios reveal">
            {principios.map((v, i) => (
              <article key={i} className={`card pub-feature pub-feature-${v.tono}`}>
                <span className={`halo halo-${v.tono} pub-feature-halo`} aria-hidden="true" />
                <div className="pub-feature-top">
                  <span className="pub-icon-disc"><Icon name={v.icon} size={22} /></span>
                  <span className="pub-feature-num">{v.num}</span>
                </div>
                <h3 className="pub-feature-title">{v.title}</h3>
                <p className="pub-feature-body">{v.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* LÍNEA DE TIEMPO */}
      <section className="pub-sec">
        <div className="container">
          <div className="pub-split">
            <div className="pub-split-aside reveal">
              <div className="eyebrow">Historia</div>
              <h2 className="h2 mt-4">Hitos <em>institucionales</em></h2>
              <p className="pub-aside-texto">
                Cinco momentos que definen la trayectoria de SOCIEM-UNA, desde su fundación en {anioFund} hasta la gestión vigente.
              </p>
            </div>
            <ol className="timeline pub-timeline">
              {hitos.map((t, i) => (
                <li key={i} className={`timeline-item reveal${t.actual ? ' pub-hito-actual' : ''}`}>
                  <div className="pub-hito-year mono">{t.year}{t.actual && <span className="badge badge-violet">Hoy</span>}</div>
                  <h3 className="pub-hito-title">{t.title}</h3>
                  <p className="pub-hito-body">{t.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* IDENTIDAD INSTITUCIONAL */}
      <section className="pub-sec">
        <div className="container">
          <div className="pub-split">
            <div className="pub-split-aside reveal">
              <div className="eyebrow">Datos clave</div>
              <h2 className="h2 mt-4">Identidad <em>institucional</em></h2>
              <p className="pub-aside-texto">
                Información oficial de la Sociedad Científica de Estudiantes de Medicina de la UNA Puno.
              </p>
              <div className="caption mono pub-fuente">{info ? '· DATOS DESDE BACKEND' : '· DATOS ESTÁTICOS'}</div>
              <img className="pub-aside-mascota" src="assets/mascota/mascota-investiga.png?v=3" alt="Mascota de SOCIEM-UNA investigando con su microscopio" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
            <div className="pub-datos reveal">
              {identidad.map((it, i) => (
                <div key={i} className="pub-dato">
                  <span className="pub-icon-disc pub-icon-disc-sm"><Icon name={it.icon} size={18} /></span>
                  <div className="pub-dato-txt">
                    <div className="label muted">{it.label}</div>
                    <div className="pub-dato-valor">{it.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FILIACIÓN */}
      <section className="pub-sec">
        <div className="container">
          <div className="reveal">
            <PubSecHead eyebrow="Filiación" title={<>Parte de dos <em>redes</em> de estudiantes de medicina.</>} />
          </div>
          <div className="pub-filiaciones reveal">
            {filiaciones.map((f) => (
              <article key={f.red} className="card pub-filiacion">
                <div className="pub-filiacion-top">
                  <span className={`badge ${f.badge}`}>{f.alcance}</span>
                  <span className="pub-filiacion-anio mono">DESDE {f.anio}</span>
                </div>
                <h3 className="pub-filiacion-red">{f.red}</h3>
                <p className="pub-filiacion-texto">{f.texto}</p>
                <div className="pub-filiacion-logos">
                  {f.comites.map(code => pubLogoSm(code) && (
                    <a key={code} href="#/comites" className="pub-logo-disc pub-logo-disc-sm" title={code}>
                      <img src={pubLogoSm(code)} alt={code} loading="lazy" />
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CIERRE / CTA */}
      <section className="pub-sec pub-sec-last">
        <div className="container">
          <div className="cta-band pub-cta reveal">
            <span className="halo halo-gold pub-cta-halo" aria-hidden="true" />
            <div className="eyebrow pub-cta-eyebrow">Únete a la siguiente generación</div>
            <h2 className="h2 pub-cta-title">Más de tres décadas de medicina, investigación y <em>altiplano</em>.</h2>
            <p className="pub-cta-texto">
              Si compartes nuestra vocación por la ciencia, el servicio comunitario y la formación médica integral, hay un comité esperándote en SOCIEM-UNA.
            </p>
            <div className="pub-hero-actions pub-cta-actions">
              <a className="btn pub-btn-light" href="#/comites">Conoce los comités <Icon name="arrowUpRight" size={14} /></a>
              <a className="btn btn-ghost pub-btn-ghost-light" href="#/directorio">Ver el directorio 2026</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============ DIRECTORIO · Gestión 2026 ============
// NOTA: el directorio (Consejo Ejecutivo, Comités y Divisiones) se carga
// 100% desde Google Sheets vía `directorio.listGrouped`. Ya no hay datos
// estáticos locales — todo se edita en el Sheet.

// Tarjeta de persona estilo Green Deck: foto cuadrada, nombre en blanco,
// cargo en muted, insignia del comité y redes al hover. Props estables (se
// usa también desde otras páginas).
const MemberCard = ({ code, cargo, nombre, desc, accent, foto, instagram, linkedin, email }) => {
  const logo = pubLogoSm(code);
  return (
    <article className="card card-hover member-card pub-member" style={{ '--accent': accent || 'var(--primary)' }}>
      <div className={`avatar${foto ? '' : ' pub-avatar-vacio'}`}>
        {foto
          ? <img src={foto} alt={nombre || cargo} loading="lazy" />
          : <span className="pub-avatar-ini" aria-hidden="true">{pubIniciales(nombre || code)}</span>}
        {logo && (
          <span className="avatar-badge" title={code}>
            <img src={logo} alt={code} />
          </span>
        )}
      </div>
      {code && (
        <div className="pub-member-code">
          <span className="pub-dot" />{code}
        </div>
      )}
      {nombre
        ? <>
            <h3 className="pub-member-name">{nombre}</h3>
            <div className="pub-member-cargo">{cargo}</div>
          </>
        : <h3 className="pub-member-name">{cargo}</h3>}
      {desc && <p className="pub-member-desc">{desc}</p>}
      <PubRedes quien={nombre || cargo} instagram={instagram} linkedin={linkedin} email={email} />
    </article>
  );
};

// Tarjeta de comité: halo del color del comité en la esquina, logo en círculo
// y coordinador con foto. Si recibe `onOpen`, la tarjeta entera abre el detalle.
const ComiteCard = ({ code, name, color, coord, coord_foto, group, onOpen }) => {
  const hasCoord = coord && !/por designar/i.test(coord) && coord !== '—' && String(coord).trim() !== '';
  const logo = pubLogoSm(code);
  const abrir = onOpen ? {
    role: 'button', tabIndex: 0, 'aria-label': `Ver el comité ${code}`,
    onClick: onOpen,
    onKeyDown: (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(); } },
  } : {};
  return (
    <article className="card card-hover pub-comite" style={{ '--cc': color || 'var(--primary)' }} {...abrir}>
      <span className="pub-comite-halo" aria-hidden="true" />
      <div className="pub-comite-top">
        <span className="pub-logo-disc">
          {logo ? <img src={logo} alt={code} loading="lazy" /> : <span className="pub-logo-txt">{code}</span>}
        </span>
        <span className="action-circle pub-comite-go" aria-hidden="true"><Icon name="arrowUpRight" size={18} /></span>
      </div>
      <div className="pub-comite-code"><span className="pub-dot" />{code}{group && <span className="pub-comite-group">{group}</span>}</div>
      <h3 className="pub-comite-name">{name}</h3>
      <div className="pub-coord">
        {coord_foto
          ? <img className="pub-coord-foto" src={coord_foto} alt={coord || ''} loading="lazy" />
          : <span className={`pub-coord-foto pub-coord-ini${hasCoord ? '' : ' is-vacio'}`}>{hasCoord ? pubIniciales(coord) : '·'}</span>}
        <div className="pub-coord-txt">
          <div className="label muted">Coordinación</div>
          <div className={`pub-coord-name${hasCoord ? '' : ' is-vacio'}`}>{hasCoord ? coord : 'Por designar'}</div>
        </div>
      </div>
    </article>
  );
};


// Helper WhatsApp: construye un wa.me link. Si no hay número, devuelve null.
// Limpia formato (espacios, +, guiones, paréntesis); asume Perú si no hay código.
function whatsappLink(numero, mensaje) {
  if (!numero) return null;
  let n = String(numero).replace(/[^0-9]/g, '');
  if (!n) return null;
  if (n.length === 9) n = '51' + n;
  const txt = encodeURIComponent(mensaje || 'Hola, me interesa sumarme al comité ');
  return `https://wa.me/${n}?text=${txt}`;
}

// Adaptadores: fila Sheet → shape que usan las cards.
// Fuente única de verdad = Google Sheets. IMG() normaliza Drive URLs.
// Si foto_url viene vacío, la card muestra iniciales (sin respaldo local).
const adaptEjecutivo = (r) => ({
  code: r.cargo_codigo,
  cargo: r.cargo_nombre,
  nombre: r.nombre_completo,
  foto: IMG(r.foto_url) || null,
  desc: r.descripcion || '',
  instagram: r.instagram || '',
  linkedin: r.linkedin || '',
  email: r.email || ''
});
const adaptComite = (r) => ({
  code: r.cargo_codigo,
  color: pubColorComite(r.color_hex, r.cargo_codigo),
  name: r.descripcion || r.cargo_nombre,
  cargo: r.cargo_nombre || '',
  coord: r.nombre_completo,
  coord_foto: IMG(r.foto_url) || null,
  coord_whatsapp: r.whatsapp || '',
  instagram: r.instagram || '',
  linkedin: r.linkedin || '',
  email: r.email || ''
});
const adaptDivision = (r) => ({
  code: r.cargo_codigo,
  name: r.cargo_nombre,
  coord: r.nombre_completo || '',
  coord_foto: IMG(r.foto_url) || null,
  desc: r.descripcion || '',
  instagram: r.instagram || '',
  email: r.email || ''
});

// ¿La fila tiene una persona asignada de verdad?
const pubTienePersona = (n) => !!(n && String(n).trim() && !/por designar/i.test(n) && n !== '—');

// Tarjeta grande de la presidencia: encabeza el directorio.
const PubLeadCard = ({ m }) => (
  <article className="card pub-lead">
    <span className="halo halo-violet pub-lead-halo" aria-hidden="true" />
    <div className={`pub-lead-foto${m.foto ? '' : ' pub-avatar-vacio'}`}>
      {m.foto ? <img src={m.foto} alt={m.nombre || m.cargo} /> : <span className="pub-avatar-ini" aria-hidden="true">{pubIniciales(m.nombre || m.code)}</span>}
    </div>
    <div className="pub-lead-txt">
      <span className="badge badge-gold"><Icon name="star" size={12} /> {m.cargo || 'Presidencia'}</span>
      <h3 className="pub-lead-name">{pubTienePersona(m.nombre) ? m.nombre : 'Por designar'}</h3>
      <div className="pub-lead-sub">Consejo Ejecutivo · Gestión 2026</div>
      {m.desc && <p className="pub-lead-desc">{m.desc}</p>}
      <PubRedes quien={m.nombre || m.cargo} instagram={m.instagram} linkedin={m.linkedin} email={m.email} className="pub-lead-redes" />
    </div>
  </article>
);

const DirectorioPage = () => {
  const [filtro, setFiltro] = React.useState('todos');
  const [live, setLive] = React.useState(null);
  const [cargando, setCargando] = React.useState(true);
  const [fallo, setFallo] = React.useState(false);
  useReveal();

  const cargar = () => {
    if (!window.SOCIEM_API) { setCargando(false); return; }
    setFallo(false); setCargando(true);
    window.SOCIEM_API.get('directorio', 'listGrouped').then(r => {
      if (r && r.ok && r.data) setLive(r.data);
      else { setLive({}); setFallo(true); }
    }).catch(() => { setLive({}); setFallo(true); }).finally(() => setCargando(false));
  };
  React.useEffect(cargar, []);

  const ejecutivo      = (live && live.EJECUTIVO || []).map(adaptEjecutivo);
  const comitesIfmsa   = (live && live.COMITES_IFMSA || []).map(adaptComite);
  const comitesSocimep = (live && live.COMITES_SOCIMEP || []).map(adaptComite);
  const divisiones     = (live && live.DIVISIONES_SOPORTE || []).map(adaptDivision);

  // Jerarquía: la presidencia (no la vicepresidencia) va destacada; si el
  // Sheet no la marca, encabeza el primer cargo según su orden.
  let idxLead = ejecutivo.findIndex(m => /presiden/i.test(m.cargo || '') && !/vice/i.test(m.cargo || ''));
  if (idxLead < 0 && ejecutivo.length) idxLead = 0;
  const lead = idxLead >= 0 ? ejecutivo[idxLead] : null;
  const consejo = ejecutivo.filter((_, i) => i !== idxLead);

  const grupos = [
    { key: 'ejecutivo',  label: 'Consejo Ejecutivo', n: ejecutivo.length },
    { key: 'ifmsa',      label: 'Comités IFMSA',     n: comitesIfmsa.length },
    { key: 'socimep',    label: 'Comités SOCIMEP',   n: comitesSocimep.length },
    { key: 'divisiones', label: 'Divisiones',        n: divisiones.length },
  ];
  const total = grupos.reduce((s, g) => s + g.n, 0);
  const ver = (k) => filtro === 'todos' || filtro === k;
  const sinNada = !cargando && !fallo && total === 0;

  // Coordinador de comité como tarjeta de persona, con la insignia del comité.
  const coordCard = (c, i) => (
    <MemberCard key={c.code || i} code={c.code} accent={c.color}
      nombre={pubTienePersona(c.coord) ? c.coord : ''}
      cargo={pubTienePersona(c.coord) ? (c.cargo || ('Coordinación ' + c.code)) : (c.cargo || c.code) + ' · por designar'}
      foto={c.coord_foto} instagram={c.instagram} linkedin={c.linkedin} email={c.email} />
  );

  const vacioGrupo = (txt) => <p className="pub-vacio-linea">{txt}</p>;

  return (
    <div className="page-fade pub">
      <PageHero
        img="assets/banners/directorio-banner.jpg"
        eyebrow="Directorio · Gestión 2026"
        title={<>Las personas detrás de <em>SOCIEM-UNA</em>.</>}
        lede="Consejo Ejecutivo, coordinaciones de comités y Divisiones de Soporte del periodo del 01 de enero al 31 de diciembre de 2026."
      >
        {!cargando && total > 0 && (
          <div className="pub-hero-facts mono">
            <span>{ejecutivo.length} CARGOS EJECUTIVOS</span>
            <span>{comitesIfmsa.length + comitesSocimep.length} COMITÉS</span>
            <span>{divisiones.length} DIVISIONES</span>
          </div>
        )}
      </PageHero>

      {/* Filtros por grupo */}
      <div className="pub-filtros">
        <div className="container">
          <div className="chip-row" role="toolbar" aria-label="Filtrar el directorio">
            <button className={`chip${filtro === 'todos' ? ' active' : ''}`} aria-pressed={filtro === 'todos'} onClick={() => setFiltro('todos')}>
              Todos{!cargando && total ? <span className="pub-chip-n">{total}</span> : null}
            </button>
            {grupos.map(g => (
              <button key={g.key} className={`chip${filtro === g.key ? ' active' : ''}`} aria-pressed={filtro === g.key} onClick={() => setFiltro(g.key)}>
                {g.label}{!cargando && g.n ? <span className="pub-chip-n">{g.n}</span> : null}
              </button>
            ))}
          </div>
        </div>
      </div>

      {fallo && !cargando && (
        <section className="pub-sec pub-sec-tight"><div className="container">
          <LoadErrorCard onRetry={cargar}>No pudimos cargar el directorio. Revisa tu conexión e inténtalo de nuevo.</LoadErrorCard>
        </div></section>
      )}

      {cargando && (
        <section className="pub-sec pub-sec-tight">
          <div className="container">
            <div className="skeleton pub-lead-skel" />
            <PubSkeletonGrid n={8} />
          </div>
        </section>
      )}

      {sinNada && (
        <section className="pub-sec pub-sec-tight"><div className="container">
          <PubVacio titulo="El directorio aún está en blanco">Todavía no hay cargos cargados para esta gestión. Vuelve pronto.</PubVacio>
        </div></section>
      )}

      {!cargando && !fallo && total > 0 && (
        <>
          {ver('ejecutivo') && (
            <section className="pub-sec pub-sec-tight">
              <div className="container">
                <div className="reveal">
                  <PubSecHead eyebrow="Consejo Ejecutivo" title={<>Quienes <em>conducen</em> la gestión</>}>
                    <span className="badge badge-violet">Periodo 2026</span>
                  </PubSecHead>
                </div>
                {ejecutivo.length === 0 ? vacioGrupo('Aún no hay cargos del Consejo Ejecutivo en la base de datos.') : (
                  <>
                    {lead && <div className="reveal"><PubLeadCard m={lead} /></div>}
                    {consejo.length > 0 && (
                      <div className="pub-members reveal">
                        {consejo.map((m, i) => <MemberCard key={i} {...m} accent="var(--primary)" />)}
                      </div>
                    )}
                  </>
                )}
              </div>
            </section>
          )}

          {ver('ifmsa') && (
            <section className="pub-sec pub-sec-tight">
              <div className="container">
                <div className="reveal">
                  <PubSecHead eyebrow={`IFMSA-Perú${comitesIfmsa.length ? ' · ' + comitesIfmsa.length + ' comités' : ''}`} title={<>Coordinaciones de comités <em>IFMSA</em></>}>
                    <a className="btn-link" href="#/comites">Ver los comités <Icon name="arrow" size={14} /></a>
                  </PubSecHead>
                </div>
                {comitesIfmsa.length === 0 ? vacioGrupo('Sin comités IFMSA cargados.') : (
                  <div className="pub-members reveal">{comitesIfmsa.map(coordCard)}</div>
                )}
              </div>
            </section>
          )}

          {ver('socimep') && (
            <section className="pub-sec pub-sec-tight">
              <div className="container">
                <div className="reveal">
                  <PubSecHead eyebrow={`SOCIMEP${comitesSocimep.length ? ' · ' + comitesSocimep.length + ' comités' : ''}`} title={<>Coordinaciones de comités <em>SOCIMEP</em></>}>
                    <a className="btn-link" href="#/comites">Ver los comités <Icon name="arrow" size={14} /></a>
                  </PubSecHead>
                </div>
                {comitesSocimep.length === 0 ? vacioGrupo('Sin comités SOCIMEP cargados.') : (
                  <div className="pub-members reveal">{comitesSocimep.map(coordCard)}</div>
                )}
              </div>
            </section>
          )}

          {ver('divisiones') && (
            <section className="pub-sec pub-sec-tight pub-sec-last">
              <div className="container">
                <div className="reveal">
                  <PubSecHead eyebrow="Divisiones de Soporte" title={<>El equipo que <em>sostiene</em> todo</>} />
                </div>
                {divisiones.length === 0 ? vacioGrupo('Sin divisiones cargadas.') : (
                  <div className="pub-members reveal">
                    {divisiones.map((d, i) => (
                      <MemberCard key={d.code || i} code={d.code} accent="var(--gold)"
                        nombre={pubTienePersona(d.coord) ? d.coord : ''}
                        cargo={pubTienePersona(d.coord) ? d.name : d.name + ' · por designar'}
                        desc={d.desc} foto={d.coord_foto} instagram={d.instagram} email={d.email} />
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

// ============ COMITÉS ============
// Wired al backend: ?route=comites&action=list devuelve los comités IFMSA,
// SOCIMEP y las divisiones de soporte. El backend v6 ya resuelve el
// coordinador dentro de comites.list.

const PUB_GRUPOS_COMITE = ['IFMSA-Perú', 'SOCIMEP', 'División de soporte'];
const pubGrupoComite = (tipo) => tipo === 'IFMSA' ? 'IFMSA-Perú'
  : tipo === 'SOCIMEP' ? 'SOCIMEP'
  : /DIVISION/i.test(String(tipo || '')) ? 'División de soporte' : tipo;

const adaptComitePublic = (r) => ({
  code: r.codigo,
  color: pubColorComite(r.color_hex, r.codigo),
  name: r.nombre_completo || r.nombre_corto || r.codigo,
  shortName: r.nombre_corto || r.codigo,
  group: pubGrupoComite(r.tipo),
  descripcion: r.descripcion || '',
  objetivos: String(r.objetivos || '').split('|').map(s => s.trim()).filter(Boolean),
  // el backend v6 ya resuelve el coordinador dentro de comites.list
  coord: r.coordinador_nombre || '',
  coord_foto: IMG(r.coordinador_foto) || '',
  coord_whatsapp: r.coordinador_whatsapp || ''
});

// Detalle de un comité en hoja flotante (Esc cierra, ← → navegan).
// Ojo: sin "modal" en el nombre de clase — styles.css tiene una regla móvil
// genérica sobre [class*="modal"] > div que rompería la maqueta.
const PubComiteDetalle = ({ c, eventos, onClose, onPrev, onNext, pos, total }) => {
  const panelRef = React.useRef(null);
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow; };
  }, [onClose, onPrev, onNext]);
  // Al cambiar de comité, el panel vuelve arriba y toma el foco.
  React.useEffect(() => { if (panelRef.current) { panelRef.current.scrollTop = 0; panelRef.current.focus(); } }, [c.code]);

  const propios = eventos
    .filter(e => String(e.comite_organizador || '') === String(c.code))
    .sort((a, b) => String(b.fecha).localeCompare(String(a.fecha)))
    .slice(0, 4);
  const hasCoord = pubTienePersona(c.coord);
  const wa = whatsappLink(c.coord_whatsapp, `Hola ${c.coord || ''}, me interesa sumarme al comité ${c.code}`);
  const url = wa || 'https://forms.gle/Lk5QrJPaEaQVxLvF8';
  const logo = pubLogoSm(c.code);

  return (
    <div className="pub-sheet-backdrop" onClick={onClose}>
      <div className="pub-sheet" ref={panelRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="pub-sheet-title"
        style={{ '--cc': c.color }} onClick={(e) => e.stopPropagation()}>
        <span className="pub-sheet-halo" aria-hidden="true" />
        <div className="pub-sheet-bar">
          <span className="caption mono">{pos + 1} / {total}</span>
          <div className="pub-sheet-nav">
            <button className="icon-btn" aria-label="Comité anterior" onClick={onPrev}><Icon name="arrow" size={16} style={{ transform: 'rotate(180deg)' }} /></button>
            <button className="icon-btn" aria-label="Comité siguiente" onClick={onNext}><Icon name="arrow" size={16} /></button>
            <button className="icon-btn" aria-label="Cerrar" onClick={onClose}><Icon name="close" size={16} /></button>
          </div>
        </div>

        <header className="pub-sheet-head">
          <span className="pub-logo-disc pub-logo-disc-lg">
            {logo ? <img src={logo} alt={c.code} /> : <span className="pub-logo-txt">{c.code}</span>}
          </span>
          <div className="pub-sheet-head-txt">
            <div className="pub-sheet-chips">
              <span className="pub-comite-code"><span className="pub-dot" />{c.code}</span>
              {c.group && <span className="badge">{c.group}</span>}
            </div>
            <h2 className="h2" id="pub-sheet-title">{c.name}</h2>
          </div>
        </header>

        {c.descripcion && <p className="lede pub-sheet-lede">{c.descripcion}</p>}

        <div className="pub-sheet-cols">
          {c.objetivos && c.objetivos.length > 0 && (
            <div>
              <div className="eyebrow">Líneas de acción</div>
              <ul className="pub-lista">
                {c.objetivos.map((l, i) => (
                  <li key={i}><Icon name="check" size={18} className="pub-lista-ico" /><span>{l}</span></li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <div className="eyebrow">Eventos del comité</div>
            {propios.length === 0 ? (
              <p className="pub-sheet-nota">
                Este comité aún no tiene eventos publicados. <a className="btn-link" href="#/eventos" onClick={onClose}>Ver todos los eventos <Icon name="arrow" size={14} /></a>
              </p>
            ) : (
              <ul className="pub-lista">
                {propios.map((e, i) => (
                  <li key={e.id || i}>
                    <Icon name="calendar" size={18} className="pub-lista-ico is-muted" />
                    <span>{e.titulo}<span className="mono caption"> · {String(e.fecha).slice(0, 10)}</span></span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="pub-sheet-coord">
          <div className="pub-coord">
            {c.coord_foto
              ? <img className="pub-coord-foto pub-coord-foto-lg" src={c.coord_foto} alt={c.coord} />
              : <span className={`pub-coord-foto pub-coord-foto-lg pub-coord-ini${hasCoord ? '' : ' is-vacio'}`}>{hasCoord ? pubIniciales(c.coord) : '·'}</span>}
            <div className="pub-coord-txt">
              <div className="label muted">Coordinación 2026</div>
              <div className="pub-coord-name pub-coord-name-lg">{hasCoord ? c.coord : 'Por designar'}</div>
            </div>
          </div>
          <a className="btn btn-primary" href={url} target="_blank" rel="noopener noreferrer">
            {wa ? `Escribir a ${String(c.coord || '').split(' ')[0] || 'coordinación'}` : 'Sumarme al comité'} <Icon name="arrowUpRight" size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

const ComitesPage = () => {
  const [active, setActive] = React.useState(null); // código del comité abierto
  const [filtro, setFiltro] = React.useState('todos');
  const [all, setAll] = React.useState(null); // null = cargando
  const [fallo, setFallo] = React.useState(false);
  const [eventos, setEventos] = React.useState([]);
  useReveal();

  React.useEffect(() => {
    if (!window.SOCIEM_API) return;
    window.SOCIEM_API.get('eventos', 'list').then(r => {
      if (r && r.ok) setEventos(r.data || []);
    }).catch(() => {});
  }, []);

  const cargar = () => {
    if (!window.SOCIEM_API) { setAll([]); return; }
    setFallo(false); setAll(null);
    window.SOCIEM_API.get('comites','list').then(cR => {
      if (!(cR && cR.ok)) { setAll([]); setFallo(true); return; }
      const items = (cR.items || cR.data) || [];
      const ifmsa = items.filter(x => x.tipo === 'IFMSA').map(adaptComitePublic);
      const socimep = items.filter(x => x.tipo === 'SOCIMEP').map(adaptComitePublic);
      const divisiones = items.filter(x => /DIVISION/i.test(String(x.tipo || ''))).map(adaptComitePublic);
      setAll([...ifmsa, ...socimep, ...divisiones]);
    }).catch(() => { setAll([]); setFallo(true); });
  };
  React.useEffect(cargar, []);

  const lista = all || [];
  const grupos = PUB_GRUPOS_COMITE.map(g => ({ g, n: lista.filter(x => x.group === g).length })).filter(x => x.n > 0);
  const visibles = filtro === 'todos' ? lista : lista.filter(x => x.group === filtro);

  // Navegación del detalle dentro de lo que se está viendo (respeta el filtro).
  const idx = visibles.findIndex(x => x.code === active);
  const abierto = idx >= 0 ? visibles[idx] : null;
  const cerrar = React.useCallback(() => setActive(null), []);
  const mover = (d) => { if (visibles.length) setActive(visibles[(idx + d + visibles.length) % visibles.length].code); };

  const nComites = lista.filter(x => x.group !== 'División de soporte').length;

  return (
    <div className="page-fade pub">
      <PageHero
        img="assets/banners/comites-banner.jpg"
        eyebrow={all && all.length ? `Comités · ${nComites} frentes de trabajo` : 'Comités'}
        title={<>Cada comité, una <em>causa</em>.</>}
        lede="Comités permanentes de IFMSA-Perú y SOCIMEP, y las divisiones que los sostienen. Elige uno para ver sus líneas de acción, sus eventos y a quién escribir para sumarte."
      />

      {all && all.length > 0 && grupos.length > 1 && (
        <div className="pub-filtros">
          <div className="container">
            <div className="chip-row" role="toolbar" aria-label="Filtrar comités por red">
              <button className={`chip${filtro === 'todos' ? ' active' : ''}`} aria-pressed={filtro === 'todos'} onClick={() => setFiltro('todos')}>
                Todos<span className="pub-chip-n">{lista.length}</span>
              </button>
              {grupos.map(({ g, n }) => (
                <button key={g} className={`chip${filtro === g ? ' active' : ''}`} aria-pressed={filtro === g} onClick={() => setFiltro(g)}>
                  {g}<span className="pub-chip-n">{n}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <section className="pub-sec pub-sec-tight pub-sec-last">
        <div className="container">
          {all === null ? (
            <PubSkeletonGrid n={8} className="pub-comites" alto={250} />
          ) : fallo ? (
            <LoadErrorCard onRetry={cargar}>No pudimos cargar los comités. Revisa tu conexión e inténtalo de nuevo.</LoadErrorCard>
          ) : all.length === 0 ? (
            <PubVacio titulo="Aún no hay comités publicados">Cuando se registren en la base de datos aparecerán aquí.</PubVacio>
          ) : (
            <div className="pub-comites reveal">
              {visibles.map(cc => (
                <ComiteCard key={cc.code} {...cc} group={filtro === 'todos' ? cc.group : ''} onOpen={() => setActive(cc.code)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {abierto && (
        <PubComiteDetalle c={abierto} eventos={eventos} pos={idx} total={visibles.length}
          onClose={cerrar} onPrev={() => mover(-1)} onNext={() => mover(1)} />
      )}
    </div>
  );
};

Object.assign(window, { NosotrosPage, DirectorioPage, ComitesPage, MemberCard, ComiteCard });
