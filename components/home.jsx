// ============ HOME — 3 variants ============

// Ilustraciones propias (generadas para SOCIEM-UNA, en assets/hero/).
// Sin hotlinks a bancos de imágenes externos.
const HERO_IMG = "assets/hero/hero-altiplano.jpg";      // altiplano + ciencia
const HERO_IMG_2 = "assets/hero/nosotros-identidad.jpg"; // estudiantes frente al lago
const HERO_IMG_3 = "assets/hero/hero-altiplano.jpg";

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

// ====== Counter section ======
const CounterSection = () => {
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
    <section style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="counter-grid">
          <div className="counter-item"><div className="counter-num"><AnimatedNum to={c.anios} suffix="+" /></div><div className="counter-label">Años de trayectoria</div></div>
          <div className="counter-item"><div className="counter-num"><AnimatedNum to={c.miembros} /></div><div className="counter-label">Miembros activos</div></div>
          <div className="counter-item"><div className="counter-num"><AnimatedNum to={c.comites} /></div><div className="counter-label">Comités y divisiones</div></div>
          <div className="counter-item"><div className="counter-num"><AnimatedNum to={c.eventos} suffix="+" /></div><div className="counter-label">Eventos registrados</div></div>
        </div>
      </div>
    </section>
  );
};

// ====== Filiación strip ======
const FiliacionRow = () => (
  <section style={{ paddingTop: 64, paddingBottom: 64, background: 'linear-gradient(rgba(247,245,251,.93), rgba(247,245,251,.93)), url(assets/fondos/fondo-textil.jpg) center/cover, var(--bg-soft)' }}>
    <div className="container">
      <div className="text-center mb-8">
        <div className="eyebrow">Filiación oficial</div>
        <h2 className="serif mt-4" style={{ fontSize: 32, maxWidth: 540, margin: '14px auto 0' }}>
          Conectados a la red científica más activa de medicina estudiantil
        </h2>
      </div>
      <div className="grid col-4 mt-12" style={{ gap: 0, alignItems: 'center', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        {[
          { name: 'IFMSA-Perú', sub: 'International Federation' },
          { name: 'SOCIMEP', sub: 'Sociedad Científica Médico Estudiantil del Perú' },
          { name: 'UNA Puno', sub: 'Universidad Nacional del Altiplano' },
          { name: 'FMH-UNA', sub: 'Facultad de Medicina Humana' },
        ].map((p, i) => (
          <div key={i} style={{ padding: '40px 24px', borderRight: i < 3 ? '1px solid var(--border)' : 'none', textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: 99, margin: '0 auto 14px', background: 'var(--violet-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--violet-700)' }}>
              <Icon name={['globe','flask','book','medal'][i]} size={22} />
            </div>
            <div className="serif" style={{ fontSize: 19, fontWeight: 600 }}>{p.name}</div>
            <div className="small mt-2" style={{ fontSize: 12 }}>{p.sub}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ====== Activities carousel ======
// 100% desde Google Sheets (noticias.list). Si no hay noticias, se oculta.
const ActivitiesCarousel = () => {
  const [items, setItems] = React.useState(null); // null = cargando
  React.useEffect(() => {
    if (!window.SOCIEM_API) { setItems([]); return; }
    const adaptNoticia = (n) => ({
      tag:      n.comite_relacionado || n.categoria || 'INSTITUCIONAL',
      tagColor: 'var(--violet-600)',
      title:    n.titulo,
      href:     '#/noticias/' + (n.slug || n.id),
      date:     n.fecha_publicacion ? new Date(n.fecha_publicacion).toLocaleDateString('es-PE', { day:'2-digit', month:'short', year:'numeric' }).toUpperCase() : '',
      img:      IMG(n.imagen_portada) || 'assets/noticias/noticia-default.jpg'
    });
    window.SOCIEM_API.get('noticias','list', { limit: 4 }).then(r => {
      const list = r && (Array.isArray(r.items) ? r.items : Array.isArray(r.data) ? r.data : []);
      setItems((list || []).slice(0, 4).map(adaptNoticia));
    }).catch(() => setItems([]));
  }, []);
  if (items !== null && items.length === 0) return null; // sin noticias → no se muestra
  return (
    <section>
      <div className="container">
        <div className="flex justify-between items-center mb-8" style={{ flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div className="eyebrow">Actividades recientes</div>
            <h2 className="h2 mt-4">Lo que pasa en SOCIEM</h2>
          </div>
          <a className="btn-link" href="#/noticias">Ver todas las actividades <Icon name="arrow" size={14} /></a>
        </div>
        <div className="grid col-4 gap-6">
          {(items || []).map((it, i) => (
            <article key={i} className="card card-hover" style={{ overflow: 'hidden', cursor: 'pointer' }} onClick={() => { window.location.hash = it.href.slice(1); }}>
              <div style={{ aspectRatio: '4/5', overflow: 'hidden', background: 'var(--bg-soft)' }}>
                {it.img
                  ? <img src={it.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .6s' }} onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} onMouseEnter={e => e.currentTarget.style.transform='scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform=''}/>
                  : <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', background: `linear-gradient(135deg, ${it.tagColor}22, ${it.tagColor}08)` }}><Icon name="calendar" size={32} /></div>}
              </div>
              <div style={{ padding: '20px 22px 24px' }}>
                <div className="comite-chip" style={{ color: it.tagColor, borderColor: 'currentColor' }}>
                  <span style={{ width: 7, height: 7, borderRadius: 99, background: it.tagColor }} />
                  {it.tag}
                </div>
                <h3 className="serif mt-4" style={{ fontSize: 21, lineHeight: 1.25 }}>{it.title}</h3>
                <div className="mono small mt-4" style={{ color: 'var(--fg-muted)' }}>{it.date}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ====== Quiénes somos (3 columns) ======
const QuienesSomos = () => (
  <section>
    <div className="container">
      <div className="grid" style={{ gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>
        <div style={{ position: 'sticky', top: 100 }}>
          <div className="eyebrow">¿Quiénes somos?</div>
          <h2 className="h2 mt-4">Una comunidad de futuros médicos comprometidos con la ciencia y la sociedad.</h2>
          <p className="lede mt-6">Desde el altiplano puneño formamos líderes en investigación, salud pública y cooperación internacional.</p>
          <a className="btn btn-ghost mt-8" href="#/nosotros" style={{ marginTop: 32 }}>Conoce más <Icon name="arrow" size={14} /></a>
        </div>
        <div className="grid gap-6">
          {[
            { icon: 'flask', title: 'Misión', body: 'Fomentar la investigación científica, la educación médica continua y el liderazgo estudiantil entre los miembros de la Facultad de Medicina Humana de la UNA Puno, contribuyendo al desarrollo de la salud regional y nacional.' },
            { icon: 'sparkle', title: 'Visión', body: 'Ser referente nacional de sociedades científicas estudiantiles, reconocida por la calidad de sus proyectos, su impacto comunitario y la formación integral de sus miembros para el 2030.' },
            { icon: 'shield', title: 'Valores', body: 'Excelencia académica, ética profesional, vocación de servicio, trabajo colaborativo, compromiso social, identidad institucional y respeto por la diversidad cultural del altiplano.' },
          ].map((v, i) => (
            <div key={i} className="card" style={{ padding: '32px 32px' }}>
              <div className="flex gap-6 items-center" style={{ alignItems: 'flex-start' }}>
                <div style={{ width: 52, height: 52, flexShrink: 0, borderRadius: 14, background: 'var(--violet-50)', color: 'var(--violet-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={v.icon} size={22} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 className="serif" style={{ fontSize: 26 }}>{v.title}</h3>
                  <p className="mt-4" style={{ color: 'var(--fg-soft)', lineHeight: 1.6 }}>{v.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ====== Inscripciones / Convocatorias activas ======
// Se conecta al backend (route=formularios&action=list). Si no hay datos
// (sheet vacía o backend offline) la sección se oculta automáticamente.
const InscripcionesSection = () => {
  const [items, setItems] = React.useState(null);
  React.useEffect(() => {
    if (!window.SOCIEM_API) return;
    window.SOCIEM_API.get('formularios','list').then(r => {
      if (r && r.ok && Array.isArray(r.data)) setItems(r.data);
    }).catch(() => {});
  }, []);
  if (!items || items.length === 0) return null;
  const fmtFecha = (s) => {
    if (!s) return '';
    try { return new Date(s).toLocaleDateString('es-PE', { day:'2-digit', month:'short', year:'numeric' }); }
    catch (e) { return s; }
  };
  return (
    <section style={{ background: 'var(--bg-soft)' }}>
      <div className="container">
        <div className="flex justify-between items-end mb-8" style={{ flexWrap:'wrap', gap:16 }}>
          <div>
            <div className="eyebrow">Inscripciones · Convocatorias</div>
            <h2 className="h2 mt-4">Súmate a lo que viene</h2>
            <p className="lede mt-4" style={{ maxWidth:'52ch' }}>Cursos, talleres, eventos y campañas con inscripción abierta. Click en una tarjeta para abrir el formulario o link de inscripción.</p>
          </div>
        </div>
        <div className="grid col-3 gap-6">
          {items.map((f, i) => (
            <article key={f.id || i} className="card card-hover" style={{ overflow:'hidden', display:'flex', flexDirection:'column' }}>
              {f.imagen_url && (
                <div style={{ aspectRatio:'4/3', overflow:'hidden', background:'var(--bg-soft)' }}>
                  <img src={IMG(f.imagen_url)} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e => { e.currentTarget.style.opacity = 0.3; }} />
                </div>
              )}
              <div style={{ padding:'22px 24px', display:'flex', flexDirection:'column', flex:1 }}>
                <div className="flex items-center gap-2" style={{ flexWrap:'wrap' }}>
                  <span className="badge">{f.tipo}</span>
                  {f.destacado && <span className="badge badge-gold">★ Destacado</span>}
                  {f.comite_relacionado && <span className="comite-chip" style={{ fontSize:11 }}>{f.comite_relacionado}</span>}
                </div>
                <h3 className="serif mt-4" style={{ fontSize:22, lineHeight:1.25 }}>{f.titulo}</h3>
                {f.descripcion && (
                  <p className="small mt-3" style={{ color:'var(--fg-soft)', lineHeight:1.55 }}>{String(f.descripcion).slice(0, 200)}{String(f.descripcion).length > 200 ? '…' : ''}</p>
                )}
                {f.fecha_limite && (
                  <div className="mono small mt-4" style={{ color: 'var(--red)', fontWeight: 600 }}>
                    <Icon name="calendar" size={12} style={{ verticalAlign:'middle', marginRight:6 }} />
                    Cierra: {fmtFecha(f.fecha_limite)}
                  </div>
                )}
                <div style={{ flex:1 }} />
                <a className="btn btn-primary mt-6" href={f.url} target="_blank" rel="noopener noreferrer" style={{ marginTop:20, justifyContent:'center' }}>
                  {f.cta_label || 'Inscríbete'} <Icon name="arrowUpRight" size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ====== CTA Final ======
const CTASection = () => (
  <section className="cta-band" style={{ background: 'var(--violet-900)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'url(assets/fondos/fondo-constelacion.jpg) center/cover', opacity: .3, pointerEvents: 'none' }} />
    <div className="container text-center" style={{ position: 'relative' }}>
      <img src="assets/mascota/mascota-hero.png?v=3" alt="Mascota de SOCIEM-UNA saludando" style={{ width: 150, margin: '0 auto 12px', display: 'block' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      <div className="eyebrow" style={{ color: 'var(--gold-soft)' }}>Únete</div>
      <h2 className="serif mt-4" style={{ fontSize: 'clamp(40px, 5vw, 64px)', lineHeight: 1.05, color: '#fff', maxWidth: 720, margin: '14px auto 0' }}>
        El altiplano necesita médicos investigadores. Empieza tu camino con SOCIEM.
      </h2>
      <p className="lede mt-6" style={{ color: 'rgba(255,255,255,.75)', margin: '24px auto 0' }}>
        Inscripciones abiertas para el periodo 2026. Acceso a comités IFMSA, SOCIMEP y divisiones de soporte.
      </p>
      <div className="flex justify-center gap-4 mt-10" style={{ marginTop: 40, flexWrap: 'wrap' }}>
        <a className="btn btn-gold" href="#/registro">
          Inscríbete ahora <Icon name="arrowUpRight" size={14} />
        </a>
        <a className="btn btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.3)' }} href="#/contacto">
          Escríbenos
        </a>
      </div>
      <div className="flex justify-center gap-6 mt-12" style={{ marginTop: 56, color: 'rgba(255,255,255,.6)', fontSize: 13 }}>
        <span className="mono">EST. 1992 · REFUND. 2000</span>
        <span>·</span>
        <span className="mono">ANIVERSARIO · 09 NOV</span>
        <span>·</span>
        <span className="mono">PERIODO · 01 ENE — 31 DIC</span>
      </div>
    </div>
  </section>
);

// =============== HERO VARIANTS ===============

// (1) EDITORIAL — magazine-style asymmetric
const HeroEditorial = () => (
  <section style={{ paddingTop: 56, paddingBottom: 80 }}>
    <div className="container">
      <div className="grid" style={{ gridTemplateColumns: '1.05fr .95fr', gap: 64, alignItems: 'center' }}>
        <div>
          <div className="eyebrow fade-up">Vol. IX · 2026 · Puno, Perú</div>
          <h1 className="h-display mt-6 fade-up d1" style={{ marginTop: 24 }}>
            Ciencia médica<br/>
            <em style={{ fontStyle: 'italic', color: 'var(--violet-600)' }}>desde el altiplano</em>.
          </h1>
          <p className="lede mt-8 fade-up d2" style={{ marginTop: 32 }}>
            Sociedad Científica de Estudiantes de Medicina · Universidad Nacional del Altiplano · Filial oficial de IFMSA-Perú y SOCIMEP.
          </p>
          <div className="flex gap-4 mt-10 fade-up d3" style={{ marginTop: 40, flexWrap: 'wrap' }}>
            <a className="btn btn-primary" href="#/registro">
              Únete a SOCIEM-UNA <Icon name="arrowUpRight" size={14} />
            </a>
            <a className="btn btn-ghost" href="#/nosotros">Conócenos</a>
          </div>
          <div className="flex gap-8 mt-12 fade-up d4" style={{ marginTop: 56, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
            <div>
              <div className="mono small" style={{ color: 'var(--fg-muted)' }}>FUNDADA</div>
              <div className="serif" style={{ fontSize: 22, marginTop: 4 }}>09 · NOV · 1992</div>
            </div>
            <div>
              <div className="mono small" style={{ color: 'var(--fg-muted)' }}>SEDE</div>
              <div className="serif" style={{ fontSize: 22, marginTop: 4 }}>FMH · UNA Puno</div>
            </div>
            <div>
              <div className="mono small" style={{ color: 'var(--fg-muted)' }}>RED</div>
              <div className="serif" style={{ fontSize: 22, marginTop: 4 }}>IFMSA · SOCIMEP</div>
            </div>
          </div>
        </div>
        <div className="fade-up d2" style={{ position: 'relative' }}>
          <div className="hero-img-wrap">
            <img src={HERO_IMG} alt="Microscopio en laboratorio" />
            <div className="hero-grain" />
          </div>
          {/* Overlay floating quote */}
          <div className="card" style={{ position: 'absolute', left: -32, bottom: 40, maxWidth: 280, padding: 22 }}>
            <Icon name="quote" size={22} style={{ color: 'var(--violet-600)' }} />
            <p className="serif mt-4" style={{ fontSize: 18, lineHeight: 1.35, fontStyle: 'italic' }}>
              "La medicina del futuro nace en aulas que se atreven a investigar."
            </p>
            <div className="mono small mt-4" style={{ color: 'var(--fg-muted)' }}>— Lema 2026</div>
          </div>
          {/* corner badge */}
          <div style={{ position: 'absolute', right: -16, top: 24, background: 'var(--gold)', color: 'var(--ink-900)', padding: '8px 14px', borderRadius: 99, fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em' }}>
            FILIAL OFICIAL
          </div>
          {/* mascota asomándose */}
          <img src="assets/mascota/mascota-hero.png?v=3" alt="Mascota de SOCIEM-UNA" style={{ position: 'absolute', right: -24, bottom: -14, width: 128, filter: 'drop-shadow(0 10px 22px rgba(26,22,34,.25))' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </div>
      </div>
    </div>
  </section>
);

// (2) MODERN — clean centered, big serif, single image below
const HeroModern = () => (
  <section style={{ paddingTop: 80, paddingBottom: 0 }}>
    <div className="container text-center">
      <div className="eyebrow fade-up">SOCIEM-UNA · Periodo 2026</div>
      <h1 className="h-display mt-6 fade-up d1" style={{ marginTop: 24, maxWidth: 920, margin: '24px auto 0' }}>
        Formamos los médicos<br/>
        <span style={{ color: 'var(--violet-600)' }}>investigadores</span> del altiplano.
      </h1>
      <p className="lede mt-8 fade-up d2" style={{ margin: '32px auto 0', textAlign: 'center' }}>
        Sociedad Científica de Estudiantes de Medicina de la UNA Puno. Filial oficial de IFMSA-Perú y SOCIMEP.
      </p>
      <div className="flex justify-center gap-4 mt-10 fade-up d3" style={{ marginTop: 40, flexWrap: 'wrap' }}>
        <a className="btn btn-primary" href="#/registro">
          Únete a SOCIEM-UNA <Icon name="arrowUpRight" size={14} />
        </a>
        <a className="btn btn-ghost" href="#">Conócenos</a>
      </div>
    </div>
    <div className="container mt-16 fade-up d4" style={{ marginTop: 80 }}>
      <div style={{ aspectRatio: '21/9', borderRadius: 28, overflow: 'hidden', position: 'relative' }}>
        <img src={HERO_IMG_2} alt="Estudiantes de medicina" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(26,22,34,.6) 100%)' }} />
        <div style={{ position: 'absolute', left: 32, bottom: 28, color: '#fff' }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: '0.16em', opacity: .7 }}>PUNO · 3,827 MSNM</div>
          <div className="serif mt-2" style={{ fontSize: 22 }}>"Ciencia médica desde el altiplano"</div>
        </div>
      </div>
    </div>
  </section>
);

// (3) VIBRANT — bold violet bg, large type, energetic
const HeroVibrant = () => (
  <section style={{ background: 'linear-gradient(135deg, #6B2D9E 0%, #421C62 100%)', color: '#fff', paddingTop: 96, paddingBottom: 96, position: 'relative', overflow: 'hidden' }}>
    {/* Decorative shapes */}
    <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,162,74,.25) 0%, transparent 70%)' }} />
    <div style={{ position: 'absolute', bottom: -80, left: -80, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,136,220,.25) 0%, transparent 70%)' }} />
    <div className="container" style={{ position: 'relative' }}>
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        <div>
          <div className="flex items-center gap-3 fade-up" style={{ background: 'rgba(255,255,255,.1)', padding: '6px 14px', borderRadius: 99, width: 'max-content', backdropFilter: 'blur(8px)' }}>
            <span style={{ width: 8, height: 8, borderRadius: 99, background: 'var(--gold)' }} />
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.14em' }}>INSCRIPCIONES ABIERTAS · 2026</span>
          </div>
          <h1 className="h-display mt-6 fade-up d1" style={{ marginTop: 24, color: '#fff' }}>
            Sé parte de la <em style={{ color: 'var(--gold-soft)', fontStyle: 'italic' }}>generación</em> que cambiará la medicina del Perú.
          </h1>
          <p className="lede mt-8 fade-up d2" style={{ marginTop: 32, color: 'rgba(255,255,255,.75)', maxWidth: '52ch' }}>
            Investigación, salud pública, derechos humanos, intercambios internacionales. 13 comités, 3 divisiones de soporte, una sola sociedad.
          </p>
          <div className="flex gap-4 mt-10 fade-up d3" style={{ marginTop: 40, flexWrap: 'wrap' }}>
            <a className="btn btn-gold" href="#/registro">
              Únete a SOCIEM-UNA <Icon name="arrowUpRight" size={14} />
            </a>
            <a className="btn btn-ghost" style={{ color: '#fff', borderColor: 'rgba(255,255,255,.3)' }} href="#/nosotros">
              Conócenos
            </a>
          </div>
        </div>
        <div className="fade-up d2" style={{ position: 'relative' }}>
          <div style={{ borderRadius: 28, overflow: 'hidden', aspectRatio: '4/5' }}>
            <img src={HERO_IMG_3} alt="Estetoscopio" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {/* Floating stat cards */}
          <div style={{ position: 'absolute', bottom: 32, left: -28, background: '#fff', color: 'var(--ink-900)', padding: '18px 22px', borderRadius: 18, boxShadow: '0 20px 50px rgba(0,0,0,.3)' }}>
            <div className="mono small" style={{ color: 'var(--fg-muted)' }}>COMITÉS Y DIVISIONES</div>
            <div className="serif" style={{ fontSize: 36, color: 'var(--violet-700)', marginTop: 4 }}>16</div>
          </div>
          <div style={{ position: 'absolute', top: 24, right: -20, background: 'var(--gold)', color: 'var(--ink-900)', padding: '14px 20px', borderRadius: 18, boxShadow: '0 20px 50px rgba(0,0,0,.3)' }}>
            <div className="mono small">FUNDADA EN</div>
            <div className="serif" style={{ fontSize: 28, marginTop: 2 }}>1992 · Puno</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HomePage = ({ heroVariant }) => {
  const Hero = heroVariant === 'modern' ? HeroModern : heroVariant === 'vibrant' ? HeroVibrant : HeroEditorial;
  return (
    <div className="page-fade">
      <Hero />
      <CounterSection />
      <QuienesSomos />
      <FiliacionRow />
      <InscripcionesSection />
      <ActivitiesCarousel />
      <CTASection />
    </div>
  );
};

Object.assign(window, { HomePage });
