// ============ NOSOTROS ============
const NosotrosPage = () => {
  const [info, setInfo] = React.useState(null);

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
    { num: '01', icon: 'compass', title: 'Misión', body: 'Fomentar la investigación científica, la educación médica continua y el liderazgo estudiantil entre los miembros de la Facultad de Medicina Humana de la UNA Puno, contribuyendo al desarrollo de la salud regional y nacional con un enfoque humanista, ético y comprometido con las comunidades del altiplano.' },
    { num: '02', icon: 'eye',     title: 'Visión', body: 'Ser la sociedad científica estudiantil de medicina referente del sur del Perú al 2030, reconocida por la calidad de su producción académica, la solidez de sus proyectos de proyección social y la formación integral de profesionales de salud líderes en sus comunidades.' },
    { num: '03', icon: 'heart',   title: 'Valores', body: 'Excelencia académica, ética profesional, vocación de servicio, trabajo colaborativo, compromiso social, identidad institucional, respeto por la diversidad cultural andina y aymara, transparencia en la gestión, y formación humanista en el ejercicio de la medicina.' },
  ];

  const hitos = [
    { year: '1992', dot: 'var(--violet-600)', title: 'Fundación de SOCIEM-UNA',    body: 'El 09 de noviembre se funda la sociedad en la Facultad de Medicina Humana de la UNA Puno como expresión estudiantil del compromiso con la investigación científica, la educación médica y la proyección social.' },
    { year: '1992', dot: 'var(--gold)',       title: 'Afiliación a SOCIMEP',        body: 'Ese mismo año SOCIEM-UNA se incorpora a la Sociedad Científica Médico Estudiantil del Perú, red nacional de sociedades científicas de medicina.' },
    { year: '2000', dot: 'var(--violet-500)', title: 'Refundación',                 body: 'El 19 de agosto, tras un periodo de reorganización, SOCIEM-UNA se refunda consolidando su estructura de comités permanentes y ampliando su alcance regional.' },
    { year: '2015', dot: 'var(--c-scopein)',  title: 'Afiliación a IFMSA-Perú',     body: 'Paso de proyección internacional: SOCIEM-UNA se afilia a IFMSA-Perú, capítulo nacional de la International Federation of Medical Students Associations, incorporando los comités SCOPE, SCOME, SCORE, SCOPH, SCORA y SCORP.' },
    { year: '2026', dot: 'var(--violet-700)', title: 'Gestión vigente',             body: '13 comités activos (7 IFMSA + 6 SOCIMEP), 3 divisiones de soporte y un periodo de gestión del 01 de enero al 31 de diciembre.' },
  ];

  return (
    <div className="page-fade">
      {/* HERO */}
      <section style={{ paddingTop: 96, paddingBottom: 56 }}>
        <div className="container-tight">
          <div className="eyebrow fade-up">Nosotros · Historia · Identidad</div>
          <h1 className="h-display mt-6 fade-up d1" style={{ fontSize: 'clamp(52px, 6.4vw, 92px)', letterSpacing: '-0.025em', lineHeight: 1.02 }}>
            Más de 30 años formando<br/>
            <em style={{ fontStyle: 'italic', color: 'var(--violet-600)' }}>investigadores</em> en el altiplano.
          </h1>
          <p className="lede mt-8 fade-up d2" style={{ marginTop: 32, fontSize: 22, maxWidth: '64ch' }}>
            SOCIEM-UNA fue fundada el 09 de noviembre de 1992 como expresión estudiantil del compromiso con la investigación científica, la educación médica y la proyección social en la Facultad de Medicina Humana de la Universidad Nacional del Altiplano de Puno. Ese mismo año se afilió a SOCIMEP. Tras un periodo de reorganización, fue refundada el 19 de agosto del 2000, y en 2015 da el paso a la red internacional al afiliarse a IFMSA-Perú.
          </p>
        </div>
      </section>

      {/* IMAGEN PANORÁMICA */}
      <section style={{ paddingTop: 16 }}>
        <div className="container">
          <div style={{ aspectRatio: '21/8', borderRadius: 28, overflow: 'hidden', position: 'relative' }} className="fade-up">
            <img src="assets/hero/nosotros-identidad.jpg" alt="Ilustración: estudiantes de medicina frente al lago Titicaca" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,.35) 100%)' }} />
            <div className="mono small" style={{ position: 'absolute', left: 28, bottom: 22, color: '#fff', letterSpacing: '0.08em' }}>SOCIEM-UNA · PUNO · 3.827 m s.n.m.</div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ paddingTop: 80, paddingBottom: 40 }}>
        <div className="container">
          <div className="grid col-3 gap-6">
            {stats.map((s, i) => (
              <div key={i} className={`card fade-up d${i+1}`} style={{ padding: '36px 32px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--violet-500), var(--violet-700))' }} />
                <div className="serif" style={{ fontSize: 72, lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--violet-700)', fontWeight: 600 }}>{s.num}</div>
                <div className="h3 mt-4" style={{ fontFamily: 'var(--font-serif)', fontSize: 22 }}>{s.label}</div>
                <div className="small mt-2" style={{ color: 'var(--fg-muted)' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IDENTIDAD INSTITUCIONAL */}
      <section style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="container">
          <div className="grid" style={{ gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: 100 }}>
              <div className="eyebrow">Datos clave</div>
              <h2 className="h2 mt-4" style={{ letterSpacing: '-0.02em' }}>Identidad institucional</h2>
              <p className="mt-6" style={{ color: 'var(--fg-soft)', maxWidth: '36ch', lineHeight: 1.6 }}>
                Información oficial de la Sociedad Científica de Estudiantes de Medicina de la UNA Puno, gestión 2026.
              </p>
              <div className="mono small mt-6" style={{ color: 'var(--fg-muted)', letterSpacing: '0.08em' }}>
                {info ? '· DATOS DESDE BACKEND' : '· DATOS ESTÁTICOS'}
              </div>
              <img src="assets/mascota/mascota-investiga.png?v=3" alt="Mascota de SOCIEM-UNA investigando con su microscopio" style={{ width: 170, marginTop: 28 }} onError={(e) => { e.currentTarget.outerHTML = ''; }} />
            </div>
            <div className="grid col-2 gap-4">
              {identidad.map((it, i) => (
                <div key={i} className="card" style={{ padding: '22px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--violet-50)', color: 'var(--violet-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon name={it.icon} size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="mono small" style={{ color: 'var(--fg-muted)', letterSpacing: '0.06em' }}>{it.label.toUpperCase()}</div>
                    <div className="serif mt-2" style={{ fontSize: 20, lineHeight: 1.25 }}>{it.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MISIÓN · VISIÓN · VALORES */}
      <section style={{ background: 'var(--bg-soft)', paddingTop: 96, paddingBottom: 96 }}>
        <div className="container">
          <div className="eyebrow">Principios rectores</div>
          <h2 className="h2 mt-4 mb-8" style={{ letterSpacing: '-0.02em', maxWidth: '20ch' }}>Lo que nos mueve cada día.</h2>
          <div className="grid col-3 gap-8 mt-12">
            {principios.map((v, i) => (
              <div key={i} className={`card fade-up d${i+1}`} style={{ padding: '40px 36px', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: 'var(--violet-600)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={v.icon} size={22} />
                  </div>
                  <div className="serif" style={{ fontSize: 56, color: 'var(--violet-200)', lineHeight: 1, fontStyle: 'italic', fontWeight: 500 }}>{v.num}</div>
                </div>
                <h3 className="serif mt-8" style={{ fontSize: 38, letterSpacing: '-0.02em', lineHeight: 1.05 }}>{v.title}</h3>
                <p className="mt-4" style={{ color: 'var(--fg-soft)', lineHeight: 1.7, fontSize: 15 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ paddingTop: 96, paddingBottom: 64 }}>
        <div className="container">
          <div className="grid" style={{ gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }}>
            <div style={{ position: 'sticky', top: 100 }}>
              <div className="eyebrow">Historia</div>
              <h2 className="h2 mt-4" style={{ letterSpacing: '-0.02em' }}>Hitos institucionales</h2>
              <p className="mt-6" style={{ color: 'var(--fg-soft)', maxWidth: '36ch', lineHeight: 1.6 }}>
                Cinco momentos que definen la trayectoria de SOCIEM-UNA, desde su fundación en 1992 hasta la gestión vigente del 2026.
              </p>
            </div>
            <div className="timeline">
              {hitos.map((t, i) => (
                <div key={i} className={`timeline-item fade-up d${Math.min(i+1, 3)}`} style={{ position: 'relative', paddingLeft: 36, paddingBottom: 40, borderLeft: '2px solid var(--border)' }}>
                  <span style={{ position: 'absolute', left: -9, top: 4, width: 16, height: 16, borderRadius: 99, background: t.dot, border: '3px solid var(--bg)', boxShadow: '0 0 0 2px var(--border)' }} />
                  <div className="mono small" style={{ color: t.dot, fontWeight: 700, letterSpacing: '0.1em' }}>{t.year}</div>
                  <h3 className="serif mt-2" style={{ fontSize: 26, letterSpacing: '-0.01em' }}>{t.title}</h3>
                  <p className="mt-3" style={{ color: 'var(--fg-soft)', maxWidth: '60ch', lineHeight: 1.65 }}>{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CIERRE / CTA */}
      <section style={{ paddingTop: 64, paddingBottom: 120 }}>
        <div className="container-tight">
          <div className="card" style={{ padding: '64px 56px', textAlign: 'center', background: 'linear-gradient(135deg, var(--violet-700) 0%, var(--violet-600) 100%)', color: '#fff', borderColor: 'transparent' }}>
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,.7)' }}>Únete a la siguiente generación</div>
            <h2 className="serif mt-4" style={{ fontSize: 'clamp(36px, 4vw, 56px)', letterSpacing: '-0.02em', lineHeight: 1.05, color: '#fff' }}>
              Más de tres décadas de medicina, investigación y altiplano.
            </h2>
            <p className="lede mt-6" style={{ color: 'rgba(255,255,255,.85)', maxWidth: '52ch', margin: '24px auto 0' }}>
              Si compartes nuestra vocación por la ciencia, el servicio comunitario y la formación médica integral, hay un comité esperándote en SOCIEM-UNA.
            </p>
            <div className="flex" style={{ justifyContent: 'center', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
              <a className="btn btn-primary" href="#/comites" style={{ background: '#fff', color: 'var(--violet-700)' }}>
                Conoce los comités <Icon name="arrowUpRight" size={14} />
              </a>
              <a className="btn btn-ghost" href="#/directorio" style={{ borderColor: 'rgba(255,255,255,.3)', color: '#fff' }}>
                Ver el directorio 2026
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============ DIRECTORIO · Gestión 2026 ============
// Datos oficiales (PARTE 3.2 + PARTE 11.3 del documento técnico).
// Los `foto` apuntan a archivos reales en site/assets/miembros/ (ver _mapping.json).

// NOTA: el directorio (Consejo Ejecutivo, Comités y Divisiones) ahora se carga
// 100% desde Google Sheets vía `directorio.listGrouped`. Ya no hay datos
// estáticos locales — todo se edita en el Sheet.

const MemberCard = ({ code, cargo, nombre, desc, accent, foto, instagram, linkedin, email }) => (
  <div className="card card-hover member-card">
    {foto ? (
      <div className="avatar">
        <img src={foto} alt={nombre || cargo} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        {comiteLogoUrl(code) && (
          <span className="avatar-badge" title={code}>
            <img src={comiteLogoUrl(code)} alt={code} />
          </span>
        )}
      </div>
    ) : (
      <div className="avatar img-ph" style={{ background: `linear-gradient(135deg, ${accent || 'var(--violet-200)'} 0%, var(--violet-50) 100%)` }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontSize: 36, color: 'rgba(255,255,255,.85)', fontWeight: 600 }}>
          {(nombre || code).split(' ').map(s => s[0]).slice(0, 2).join('')}
        </div>
        {comiteLogoUrl(code) && (
          <span className="avatar-badge" title={code}>
            <img src={comiteLogoUrl(code)} alt={code} />
          </span>
        )}
      </div>
    )}
    <div className="comite-chip" style={{ color: accent || 'var(--violet-600)', borderColor: 'currentColor' }}>
      <span style={{ width: 7, height: 7, borderRadius: 99, background: accent || 'var(--violet-600)' }} />
      {code}
    </div>
    {nombre && <h3 className="serif mt-4" style={{ fontSize: 19, lineHeight: 1.2 }}>{nombre}</h3>}
    <div className={nombre ? 'small mt-2' : 'serif mt-4'} style={{ fontSize: nombre ? 13 : 21, color: nombre ? 'var(--fg-muted)' : 'inherit', fontWeight: nombre ? 500 : 400 }}>{cargo}</div>
    {desc && <p className="small mt-2" style={{ color: 'var(--fg-soft)', minHeight: 36 }}>{desc}</p>}
    {(instagram || linkedin || email) && (
      <div className="socials">
        {instagram && <a className="icon-btn" aria-label={'Instagram de ' + (nombre || cargo)} href={/^https?:/.test(instagram) ? instagram : 'https://instagram.com/' + String(instagram).replace(/^@/, '')} target="_blank" rel="noopener noreferrer"><Icon name="instagram" size={14} /></a>}
        {linkedin && <a className="icon-btn" aria-label={'LinkedIn de ' + (nombre || cargo)} href={linkedin} target="_blank" rel="noopener noreferrer"><Icon name="linkedin" size={14} /></a>}
        {email && <a className="icon-btn" aria-label={'Correo de ' + (nombre || cargo)} href={'mailto:' + email}><Icon name="mail" size={14} /></a>}
      </div>
    )}
  </div>
);

const ComiteCard = ({ code, name, color, coord, coord_foto }) => {
  var initials = (coord || code).split(' ').filter(Boolean).map(function (s) { return s[0]; }).slice(0, 2).join('').toUpperCase();
  var hasCoord = coord && !/por designar/i.test(coord) && coord !== '—';
  return (
    <div className="card card-hover" style={{ padding: '28px 26px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: color }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {comiteLogoUrl(code) && <ComiteLogo code={code} size={44} />}
          <div className="serif" style={{ fontSize: 28, color, fontWeight: 600, letterSpacing: '-0.02em' }}>{code}</div>
        </div>
        <div style={{ width: 38, height: 38, borderRadius: 99, background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="arrowUpRight" size={16} />
        </div>
      </div>
      <h3 className="mt-6" style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.4 }}>{name}</h3>
      <div className="mono small mt-4" style={{ color: 'var(--fg-muted)', letterSpacing: '0.08em' }}>RESPONSABLE</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
        {coord_foto ? (
          <img src={coord_foto} alt={coord || ''} style={{ width: 36, height: 36, borderRadius: 10, objectFit: 'cover', objectPosition: 'center 25%', border: `1.5px solid ${color}` }} />
        ) : (
          <div style={{ width: 36, height: 36, borderRadius: 10, background: hasCoord ? color : 'var(--bg-soft)', color: hasCoord ? '#fff' : 'var(--fg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em' }}>{hasCoord ? initials : '·'}</div>
        )}
        <div className="small" style={{ fontWeight: 600, color: hasCoord ? 'var(--fg)' : 'var(--fg-muted)', lineHeight: 1.3 }}>
          {hasCoord ? coord : 'Por designar'}
        </div>
      </div>
    </div>
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
  color: r.color_hex || 'var(--violet-600)',
  name: r.descripcion || r.cargo_nombre,
  coord: r.nombre_completo,
  coord_foto: IMG(r.foto_url) || null,
  coord_whatsapp: r.whatsapp || ''
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

const DirectorioPage = () => {
  const [tab, setTab] = React.useState('ejecutivo');
  const [live, setLive] = React.useState(null);
  const [cargando, setCargando] = React.useState(true);
  const [fallo, setFallo] = React.useState(false);

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
  const vacio = (arr) => !cargando && arr.length === 0;

  return (
    <div className="page-fade">
      <section style={{ paddingTop: 64, paddingBottom: 32 }}>
        <div className="container">
          <div className="flex items-center" style={{ gap: 28, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 480px' }}>
              <div className="eyebrow">Directorio · Periodo 2026</div>
              <h1 className="h-display mt-6" style={{ fontSize: 'clamp(44px, 5.5vw, 72px)' }}>
                Las personas detrás de SOCIEM-UNA.
              </h1>
              <p className="lede mt-6" style={{ maxWidth: '60ch' }}>
                Consejo Ejecutivo, Consejo Directivo y Divisiones de Soporte. Estructura completa del directorio para el periodo del 01 de enero al 31 de diciembre de 2026.
              </p>
            </div>
            <img src="assets/mascota/mascota-birrete.png?v=3" alt="Mascota de SOCIEM-UNA presentando el organigrama" style={{ width: 185, flexShrink: 0 }} onError={(e) => { e.currentTarget.outerHTML = ''; }} />
          </div>

          <div className="mt-10" style={{ marginTop: 48 }}>
            <div className="tabs">
              <button className={`tab ${tab === 'ejecutivo' ? 'active' : ''}`} onClick={() => setTab('ejecutivo')}>Consejo Ejecutivo</button>
              <button className={`tab ${tab === 'directivo' ? 'active' : ''}`} onClick={() => setTab('directivo')}>Consejo Directivo</button>
              <button className={`tab ${tab === 'divisiones' ? 'active' : ''}`} onClick={() => setTab('divisiones')}>Divisiones de Soporte</button>
            </div>
          </div>
        </div>
      </section>

      {fallo && !cargando && (
        <section style={{ paddingTop: 16 }}><div className="container">
          <LoadErrorCard onRetry={cargar}>No pudimos cargar el directorio. Revisa tu conexión e inténtalo de nuevo.</LoadErrorCard>
        </div></section>
      )}

      {tab === 'ejecutivo' && (
        <section style={{ paddingTop: 32 }}>
          <div className="container">
            <div className="flex justify-between mb-8 items-center" style={{ flexWrap: 'wrap', gap: 12 }}>
              <h2 className="h3" style={{ fontFamily: 'var(--font-serif)', fontSize: 28 }}>Consejo Ejecutivo{ejecutivo.length ? ` · ${ejecutivo.length} cargos` : ''}</h2>
              <span className="badge badge-violet">PERIODO 2026</span>
            </div>
            {cargando ? <p style={{ color: 'var(--fg-muted)' }}>Cargando directorio…</p>
              : vacio(ejecutivo) ? <p style={{ color: 'var(--fg-muted)' }}>Aún no hay cargos del Consejo Ejecutivo en la base de datos.</p>
              : <div className="grid col-3 gap-6">
                  {ejecutivo.map((m, i) => <MemberCard key={i} {...m} accent="var(--violet-500)" />)}
                </div>}
          </div>
        </section>
      )}

      {tab === 'directivo' && (
        <>
          <section style={{ paddingTop: 32 }}>
            <div className="container">
              <div className="flex justify-between mb-8 items-center" style={{ flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <span className="badge">IFMSA{comitesIfmsa.length ? ` · ${comitesIfmsa.length} comités` : ''}</span>
                  <h2 className="serif mt-2" style={{ fontSize: 28 }}>Comités IFMSA</h2>
                </div>
                <a className="btn-link" href="#/comites">Ver detalles <Icon name="arrow" size={14} /></a>
              </div>
              {cargando ? <p style={{ color: 'var(--fg-muted)' }}>Cargando…</p>
                : vacio(comitesIfmsa) ? <p style={{ color: 'var(--fg-muted)' }}>Sin comités IFMSA cargados.</p>
                : <div className="grid col-4 gap-4">
                    {comitesIfmsa.map((c, i) => <ComiteCard key={i} {...c} />)}
                  </div>}
            </div>
          </section>
          <section>
            <div className="container">
              <div className="flex justify-between mb-8 items-center" style={{ flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <span className="badge badge-gold">SOCIMEP{comitesSocimep.length ? ` · ${comitesSocimep.length} comités` : ''}</span>
                  <h2 className="serif mt-2" style={{ fontSize: 28 }}>Comités SOCIMEP</h2>
                </div>
                <a className="btn-link" href="#/comites">Ver detalles <Icon name="arrow" size={14} /></a>
              </div>
              {cargando ? <p style={{ color: 'var(--fg-muted)' }}>Cargando…</p>
                : vacio(comitesSocimep) ? <p style={{ color: 'var(--fg-muted)' }}>Sin comités SOCIMEP cargados.</p>
                : <div className="grid col-3 gap-4">
                    {comitesSocimep.map((c, i) => <ComiteCard key={i} {...c} />)}
                  </div>}
            </div>
          </section>
        </>
      )}

      {tab === 'divisiones' && (
        <section style={{ paddingTop: 32 }}>
          <div className="container">
            <h2 className="serif mb-8" style={{ fontSize: 28 }}>Divisiones de Soporte</h2>
            {cargando ? <p style={{ color: 'var(--fg-muted)' }}>Cargando…</p>
              : vacio(divisiones) ? <p style={{ color: 'var(--fg-muted)' }}>Sin divisiones cargadas.</p>
              : <div className="grid col-3 gap-6">
              {divisiones.map((d, i) => (
                <div key={i} className="card" style={{ padding: '36px 32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    {comiteLogoUrl(d.code) && <ComiteLogo code={d.code} size={48} />}
                    <div className="mono small" style={{ color: 'var(--gold)', fontWeight: 600 }}>{d.code}</div>
                  </div>
                  <h3 className="serif mt-4" style={{ fontSize: 26 }}>{d.name}</h3>
                  <p className="mt-4" style={{ color: 'var(--fg-soft)' }}>{d.desc}</p>
                  <div className="flex items-center gap-3 mt-6" style={{ paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                    {d.coord_foto ? (
                      <img src={d.coord_foto} alt={d.coord} style={{ width: 40, height: 40, borderRadius: 99, objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: 40, height: 40, borderRadius: 99, background: 'var(--violet-100)', color: 'var(--violet-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 13 }}>
                        {(d.coord || '?').split(' ').map(s => s[0]).slice(0, 2).join('')}
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <div className="mono small" style={{ color: 'var(--fg-muted)', fontSize: 10 }}>COORDINACIÓN</div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{d.coord || 'Por designar'}</div>
                    </div>
                  </div>
                  {(d.instagram || d.email) && (
                    <div className="flex gap-2 mt-4">
                      {d.instagram && <a className="icon-btn" aria-label={'Instagram de ' + d.name} href={/^https?:/.test(d.instagram) ? d.instagram : 'https://instagram.com/' + String(d.instagram).replace(/^@/, '')} target="_blank" rel="noopener noreferrer"><Icon name="instagram" size={14} /></a>}
                      {d.email && <a className="icon-btn" aria-label={'Correo de ' + d.name} href={'mailto:' + d.email}><Icon name="mail" size={14} /></a>}
                    </div>
                  )}
                </div>
              ))}
            </div>}
          </div>
        </section>
      )}
    </div>
  );
};

// ============ COMITÉS ============
// Wired al backend: ?route=comites&action=list devuelve los 16 comités
// (filtramos IFMSA + SOCIMEP, omitimos DIVISIONES_SOPORTE que tienen su
// propia tab en /directorio). El coordinador se resuelve cruzando contra
// directorio.list por cargo_codigo === comite.codigo.

const adaptComitePublic = (r) => ({
  code: r.codigo,
  color: r.color_hex || 'var(--violet-600)',
  name: r.nombre_completo || r.nombre_corto || r.codigo,
  shortName: r.nombre_corto || r.codigo,
  group: r.tipo === 'IFMSA' ? 'IFMSA-Perú' : (r.tipo === 'SOCIMEP' ? 'SOCIMEP' : r.tipo),
  descripcion: r.descripcion || '',
  objetivos: String(r.objetivos || '').split('|').map(s => s.trim()).filter(Boolean),
  // el backend v6 ya resuelve el coordinador dentro de comites.list
  coord: r.coordinador_nombre || '',
  coord_foto: IMG(r.coordinador_foto) || '',
  coord_whatsapp: r.coordinador_whatsapp || ''
});

const ComitesPage = () => {
  const [active, setActive] = React.useState(0);
  const [all, setAll] = React.useState(null); // null = cargando
  const [fallo, setFallo] = React.useState(false);
  const [eventos, setEventos] = React.useState([]);

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
      setAll([...ifmsa, ...socimep]);
    }).catch(() => { setAll([]); setFallo(true); });
  };
  React.useEffect(cargar, []);

  if (all === null) return <div className="page-fade container" style={{ padding:64, color:'var(--fg-muted)' }}>Cargando comités…</div>;
  if (fallo) return <div className="page-fade container" style={{ padding:64 }}><LoadErrorCard onRetry={cargar}>No pudimos cargar los comités. Revisa tu conexión e inténtalo de nuevo.</LoadErrorCard></div>;
  if (all.length === 0) return <div className="page-fade container" style={{ padding:64, color:'var(--fg-muted)' }}>Aún no hay comités en la base de datos.</div>;
  const safeIdx = Math.min(Math.max(active, 0), all.length - 1);
  const c = all[safeIdx];
  return (
    <div className="page-fade">
      <section style={{ paddingTop: 64, paddingBottom: 32 }}>
        <div className="container">
          <div className="eyebrow">Comités · {all.length} frentes de trabajo</div>
          <h1 className="h-display mt-6" style={{ fontSize: 'clamp(44px, 5.5vw, 72px)' }}>
            Cada comité, una <em style={{ fontStyle: 'italic', color: 'var(--violet-600)' }}>causa</em>.
          </h1>
        </div>
      </section>

      <section style={{ paddingTop: 16 }}>
        <div className="container">
          <div className="grid" style={{ gridTemplateColumns: '280px 1fr', gap: 48, alignItems: 'start' }}>
            <aside className="card" style={{ padding: 16, position: 'sticky', top: 100 }}>
              <div className="mono small" style={{ padding: '8px 12px', color: 'var(--fg-muted)' }}>IFMSA-PERÚ</div>
              {all.filter(x => x.group === 'IFMSA-Perú').map((cc) => {
                const idx = all.indexOf(cc);
                return (
                  <button key={cc.code} onClick={() => setActive(idx)} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10,
                    width: '100%', textAlign: 'left',
                    background: safeIdx === idx ? 'var(--bg-soft)' : 'transparent',
                    fontWeight: safeIdx === idx ? 600 : 500, fontSize: 14
                  }}>
                    <span style={{ width: 8, height: 8, borderRadius: 99, background: cc.color }} />
                    {cc.code}
                  </button>
                );
              })}
              <div className="mono small mt-4" style={{ padding: '8px 12px', color: 'var(--fg-muted)' }}>SOCIMEP</div>
              {all.filter(x => x.group === 'SOCIMEP').map((cc) => {
                const idx = all.indexOf(cc);
                return (
                  <button key={cc.code} onClick={() => setActive(idx)} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10,
                    width: '100%', textAlign: 'left',
                    background: safeIdx === idx ? 'var(--bg-soft)' : 'transparent',
                    fontWeight: safeIdx === idx ? 600 : 500, fontSize: 14
                  }}>
                    <span style={{ width: 8, height: 8, borderRadius: 99, background: cc.color }} />
                    {cc.code}
                  </button>
                );
              })}
            </aside>

            <div>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ height: 8, background: c.color }} />
                <div style={{ padding: '40px 44px' }}>
                  <div className="flex items-center gap-4" style={{ flexWrap: 'wrap' }}>
                    {comiteLogoUrl(c.code) && <ComiteLogo code={c.code} size={64} />}
                    <span className="comite-chip" style={{ color: c.color, borderColor: 'currentColor' }}>
                      <span style={{ width: 7, height: 7, borderRadius: 99, background: c.color }} />{c.code}
                    </span>
                    <span className="badge">{c.group}</span>
                  </div>
                  <h2 className="serif mt-6" style={{ fontSize: 44, lineHeight: 1.05 }}>{c.name}</h2>
                  <p className="lede mt-6">
                    {c.descripcion || `Comité dedicado a generar espacios de formación, investigación y proyección para sus miembros, alineado a los lineamientos de ${c.group} y al plan estratégico de SOCIEM-UNA 2026.`}
                  </p>

                  <div className="grid col-2 gap-8 mt-12" style={{ marginTop: 48 }}>
                    <div>
                      <div className="eyebrow">Líneas de acción</div>
                      <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: 'none' }}>
                        {((c.objetivos && c.objetivos.length > 0) ? c.objetivos : ['Formación continua','Investigación científica','Proyección comunitaria','Cooperación nacional']).map((l, i) => (
                          <li key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                            <Icon name="check" size={18} style={{ color: c.color, marginTop: 2 }} />
                            <span>{l}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="eyebrow">Eventos del comité</div>
                      {(() => {
                        const propios = eventos
                          .filter(e => String(e.comite_organizador || '') === String(c.code))
                          .sort((a, b) => String(b.fecha).localeCompare(String(a.fecha)))
                          .slice(0, 4);
                        if (propios.length === 0) return (
                          <p className="small mt-4" style={{ color: 'var(--fg-muted)' }}>
                            Este comité aún no tiene eventos publicados. <a href="#/eventos" style={{ color: 'var(--violet-600)' }}>Ver todos los eventos</a>
                          </p>
                        );
                        return (
                          <ul style={{ marginTop: 16, paddingLeft: 0, listStyle: 'none' }}>
                            {propios.map((e, i) => (
                              <li key={e.id || i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                                <Icon name="calendar" size={18} style={{ color: 'var(--fg-muted)', marginTop: 2 }} />
                                <span>{e.titulo}<span className="mono small" style={{ color: 'var(--fg-muted)' }}> · {String(e.fecha).slice(0, 10)}</span></span>
                              </li>
                            ))}
                          </ul>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="card mt-12" style={{ padding: 28, background: 'var(--bg-soft)', marginTop: 48 }}>
                    <div className="flex items-center gap-6" style={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
                      <div className="flex items-center gap-4">
                        {c.coord_foto ? (
                          <img src={c.coord_foto} alt={c.coord} style={{ width: 56, height: 56, borderRadius: 99, objectFit: 'cover', border: `2px solid ${c.color}` }} />
                        ) : (
                          <div style={{ width: 56, height: 56, borderRadius: 99, background: c.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontWeight: 600 }}>
                            {(c.coord || '?').split(' ').map(s => s[0]).slice(0, 2).join('')}
                          </div>
                        )}
                        <div>
                          <div className="mono small">RESPONSABLE 2026</div>
                          <div className="serif mt-2" style={{ fontSize: 20, lineHeight: 1.2 }}>{c.coord || 'Por designar'}</div>
                        </div>
                      </div>
                      {(() => {
                        const wa = whatsappLink(c.coord_whatsapp, `Hola ${c.coord || ''}, me interesa sumarme al comité ${c.code}`);
                        const url = wa || 'https://forms.gle/Lk5QrJPaEaQVxLvF8';
                        return (
                          <a className="btn btn-primary" href={url} target="_blank" rel="noopener noreferrer">
                            {wa ? `WhatsApp ${c.coord || ''}` : 'Sumarme al comité'} <Icon name="arrowUpRight" size={14} />
                          </a>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Object.assign(window, { NosotrosPage, DirectorioPage, ComitesPage, MemberCard, ComiteCard });
