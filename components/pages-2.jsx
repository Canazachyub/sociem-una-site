// ============ MIEMBROS · datos reales con fotos disponibles ============
// Mientras el backend Apps Script no esté conectado, esta lista cubre las
// 21 fotos ingestadas en site/assets/miembros/ + cargos del directorio sin
// foto. Cuando se cablee el backend, esto pasa a venir de:
//   window.api.get('miembros','publicList')
const REAL_MEMBERS = [
  // Consejo Ejecutivo y comités con foto disponible
  { nombre: 'Yessica Ruth Puma',                  cargo: 'Presidencia · SCOPE-IN',     comite: 'SCOPE-IN', comiteColor: 'var(--c-scopein)', year: '6°', semester: 'I-2026', foto: 'assets/miembros/yessica-ruth-puma.png' },
  { nombre: 'Rosario Frisancho De La Cruz',       cargo: 'VPI/VPM · CPRII',            comite: 'CPRII',    comiteColor: 'var(--c-cprii)',   year: '6°', semester: 'I-2026', foto: 'assets/miembros/rosario-frisancho-de-la-cruz.jpg' },
  { nombre: 'Ana Patricia Gutierrez Peralta',     cargo: 'Vicepresidencia de Actividades', comite: 'SCOME', comiteColor: 'var(--c-scome)',   year: '5°', semester: 'I-2026', foto: 'assets/miembros/ana-patricia-gutierrez-peralta.jpg' },
  { nombre: 'Liz Katherin Ari Tito',              cargo: 'Vicepresidencia Externa',    comite: 'CPRII',    comiteColor: 'var(--c-cprii)',   year: '5°', semester: 'I-2026', foto: 'assets/miembros/liz-katherin-ari-tito.jpg' },
  { nombre: 'Liliana Talia Perez Mogrovejo',      cargo: 'Fiscalía',                   comite: 'SCORP',    comiteColor: 'var(--c-scorp)',   year: '5°', semester: 'I-2026', foto: 'assets/miembros/liliana-talia-perez-mogrovejo.jpg' },
  { nombre: 'Marvin Fernando Cruz Maron',         cargo: 'Delegado · SCOPE-OUT · DSE', comite: 'SCOPE-OUT',comiteColor: 'var(--c-scopeout)',year: '6°', semester: 'I-2026', foto: 'assets/miembros/marvin-fernando-cruz-maron.jpg' },
  { nombre: 'Milagros Vanessa Lupaca Guevara',    cargo: 'Coord. SCOME · CPPC',        comite: 'SCOME',    comiteColor: 'var(--c-scome)',   year: '5°', semester: 'I-2026', foto: 'assets/miembros/milagros-vanessa-lupaca-guevara.jpeg' },
  { nombre: 'Francis Ibeth Vilca Luque',          cargo: 'Coord. SCOPH',               comite: 'SCOPH',    comiteColor: 'var(--c-scoph)',   year: '5°', semester: 'I-2026', foto: 'assets/miembros/francis-ibeth-vilca-luque.jpg' },
  { nombre: 'Evelyn Daysi Kanqui Vilca',          cargo: 'Coord. SCORA',               comite: 'SCORA',    comiteColor: 'var(--c-scora)',   year: '4°', semester: 'I-2026', foto: 'assets/miembros/evelyn-daysi-kanqui-vilca.png' },
  { nombre: 'Eliane Leslie Torres Paco',          cargo: 'Coord. SCORP',               comite: 'SCORP',    comiteColor: 'var(--c-scorp)',   year: '4°', semester: 'I-2026', foto: 'assets/miembros/eliane-leslie-torres-paco.jpg' },
  { nombre: 'Nidia Gianina Quispe Isidro',        cargo: 'Coord. CPA',                 comite: 'CPA',      comiteColor: 'var(--c-cpa)',     year: '4°', semester: 'I-2026', foto: 'assets/miembros/nidia-giannina-quispe-isidro.jpg' },
  { nombre: 'Mirella Martinez Mendoza',           cargo: 'Coord. CPAIS',               comite: 'CPAIS',    comiteColor: 'var(--c-cpais)',   year: '5°', semester: 'I-2026', foto: 'assets/miembros/mirella-martinez-mendoza.jpeg' },
  { nombre: 'Katherin Lizbet Quispe Chambi',      cargo: 'Coord. CPDII',               comite: 'CPDII',    comiteColor: 'var(--c-cpdii)',   year: '5°', semester: 'I-2026', foto: 'assets/miembros/katherin-lizbet-quispe-chambi.jpg' },
  { nombre: 'Yubert Fernando Canaza Chique',      cargo: 'Coord. DSNT',                comite: 'DSNT',     comiteColor: 'var(--violet-700)',year: '5°', semester: 'I-2026', foto: 'assets/miembros/yubert-fernando-canaza-chique.png' },
  // Miembros activos (galería abierta)
  { nombre: 'Abraham Condori',                    cargo: 'Miembro Activo',             comite: 'SCOPH',    comiteColor: 'var(--c-scoph)',   year: '3°', semester: 'I-2026', foto: 'assets/miembros/abraham-condori.jpg' },
  { nombre: 'Cristian Lupaca Arocutipa',          cargo: 'Miembro Activo',             comite: 'SCORE',    comiteColor: 'var(--c-score)',   year: '4°', semester: 'I-2026', foto: 'assets/miembros/cristian-lupaca-arocutipa.jpg' },
  { nombre: 'Edward Blanco Vela',                 cargo: 'Miembro Activo',             comite: 'CPC',      comiteColor: 'var(--c-cpc)',     year: '3°', semester: 'I-2026', foto: 'assets/miembros/edward-blanco-vela.jpg' },
  { nombre: 'Karen Yadira Garcia Charrez',        cargo: 'Miembro Activa',             comite: 'SCORA',    comiteColor: 'var(--c-scora)',   year: '3°', semester: 'I-2026', foto: 'assets/miembros/karen-yadira-garcia-charrez.jpg' },
  { nombre: 'Lucero Quispe Pilco',                cargo: 'Miembro Activa',             comite: 'SCOME',    comiteColor: 'var(--c-scome)',   year: '2°', semester: 'I-2026', foto: 'assets/miembros/lucero-quispe-pilco.jpeg' },
  { nombre: 'Yashira Hancco',                     cargo: 'Miembro Activa',             comite: 'SCORP',    comiteColor: 'var(--c-scorp)',   year: '2°', semester: 'I-2026', foto: 'assets/miembros/yashira-hancco.jpg' },
  { nombre: 'Yasmine Marilyn Cruz Pari',          cargo: 'Miembro Activa',             comite: 'CPDII',    comiteColor: 'var(--c-cpdii)',   year: '3°', semester: 'I-2026', foto: 'assets/miembros/yasmine-marilyn-cruz-pari.jpg' },
];

const MiembrosPage = () => {
  const [filterYear, setFilterYear] = React.useState('todos');
  const [filterComite, setFilterComite] = React.useState('todos');
  const [live, setLive] = React.useState(null);

  React.useEffect(() => {
    if (!window.SOCIEM_API) return;
    window.SOCIEM_API.get('miembros', 'publicList').then(r => {
      const items = r && r.ok ? (r.items || r.data) : null;
      if (Array.isArray(items) && items.length > 0) {
        const adapted = items.map(x => ({
          nombre: ((x.nombres || '') + ' ' + (x.apellidos || '')).trim() || x.nombre || 'Miembro',
          cargo: x.cargo || 'Miembro Activo',
          comite: x.comite_interes_1 || x.comite || 'SCOME',
          comiteColor: x.comite_color || 'var(--violet-600)',
          foto: IMG(x.foto_url) || null,
          year: x.semestre ? Math.ceil(Number(x.semestre) / 2) + '°' : '—',
          semester: x.semestre ? (Number(x.semestre) % 2 === 1 ? 'I-2026' : 'II-2026') : 'I-2026'
        }));
        setLive(adapted);
      }
    });
  }, []);

  const source = live && live.length > 0 ? live : REAL_MEMBERS;
  const comitesUnicos = Array.from(new Set(source.map(m => m.comite))).sort();
  const filtered = source.filter(m =>
    (filterYear === 'todos' || m.year === filterYear) &&
    (filterComite === 'todos' || m.comite === filterComite)
  );
  return (
    <div className="page-fade">
      <section style={{ paddingTop: 64, paddingBottom: 32 }}>
        <div className="container">
          <div className="eyebrow">Miembros · Periodo 2026</div>
          <h1 className="h-display mt-6" style={{ fontSize: 'clamp(44px, 5.5vw, 72px)' }}>
            {source.length} miembros,<br/>una sola sociedad.
          </h1>
          <p className="lede mt-6">Galería pública del equipo de SOCIEM-UNA, gestión 2026: la directiva, los comités y las divisiones que hacen posible la sociedad.</p>
        </div>
      </section>

      <section style={{ paddingTop: 32 }}>
        <div className="container">
          <div className="card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Icon name="filter" size={16} style={{ color: 'var(--fg-muted)' }} />
            <div className="mono small">FILTROS</div>
            <select className="select" style={{ padding: '8px 14px' }} value={filterYear} onChange={e => setFilterYear(e.target.value)}>
              <option value="todos">Año académico</option>
              {['1°','2°','3°','4°','5°','6°'].map(y => <option key={y}>{y}</option>)}
            </select>
            <select className="select" style={{ padding: '8px 14px' }} value={filterComite} onChange={e => setFilterComite(e.target.value)}>
              <option value="todos">Comité</option>
              {comitesUnicos.map(c => <option key={c}>{c}</option>)}
            </select>
            <span className="small" style={{ marginLeft: 'auto', color: 'var(--fg-muted)' }}>{filtered.length} miembros</span>
          </div>

          <div className="grid col-4 gap-6 mt-8" style={{ marginTop: 32 }}>
            {filtered.map((m, i) => (
              <div key={i} className="card card-hover" style={{ padding: '20px 18px', textAlign: 'center' }}>
                <div className="avatar" style={{ background: m.foto ? 'var(--bg-soft)' : `linear-gradient(135deg, ${m.comiteColor} 0%, var(--violet-300) 100%)` }}>
                  {m.foto ? (
                    <img src={m.foto} alt={m.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-serif)', fontSize: 32, color: '#fff', fontWeight: 600 }}>
                      {m.nombre.split(' ').map(s => s[0]).slice(0, 2).join('')}
                    </div>
                  )}
                  {comiteLogoUrl(m.comite) && (
                    <span className="avatar-badge" title={m.comite}>
                      <img src={comiteLogoUrl(m.comite)} alt={m.comite} />
                    </span>
                  )}
                </div>
                <div className="serif mt-4" style={{ fontSize: 17, lineHeight: 1.2, minHeight: 42 }}>{m.nombre}</div>
                <div className="small mt-2" style={{ color: 'var(--fg-muted)' }}>{m.cargo}</div>
                <div className="comite-chip mt-4" style={{ color: m.comiteColor, borderColor: 'currentColor', justifyContent: 'center' }}>
                  <span style={{ width: 6, height: 6, borderRadius: 99, background: m.comiteColor }} />{m.comite}
                </div>
                <div className="flex justify-between mt-4 mono small" style={{ color: 'var(--fg-muted)', fontSize: 11 }}>
                  <span>{m.year} año</span><span>{m.semester}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <a className="fab" href="#/registro">
        <Icon name="plus" size={16} /> Inscríbete
      </a>
    </div>
  );
};

// ============ ACTIVIDADES ============
// Bitácora viva: combina eventos + noticias reales del backend, ordenados
// por fecha. Sin datos ficticios.
const ActividadesPage = () => {
  const [tag, setTag] = React.useState('todos');
  const [items, setItems] = React.useState(null);
  const [fallo, setFallo] = React.useState(false);

  const cargar = () => {
    if (!window.SOCIEM_API) { setItems([]); return; }
    setFallo(false); setItems(null);
    Promise.all([
      window.SOCIEM_API.get('eventos', 'list'),
      window.SOCIEM_API.get('noticias', 'list')
    ]).then(([eR, nR]) => {
      if (!(eR && eR.ok) && !(nR && nR.ok)) { setItems([]); setFallo(true); return; }
      const evs = ((eR && eR.ok && eR.data) || []).map(e => ({
        tag: e.comite_organizador || 'SOCIEM', fecha: String(e.fecha || ''),
        title: e.titulo, body: e.descripcion, tipo: 'EVENTO', go: '#/eventos'
      }));
      const nots = ((nR && nR.ok && (nR.items || nR.data)) || []).map(n => ({
        tag: n.comite_relacionado || n.categoria || 'SOCIEM', fecha: String(n.fecha_publicacion || ''),
        title: n.titulo, body: n.resumen, tipo: 'PUBLICACIÓN', go: '#/noticias'
      }));
      setItems([...evs, ...nots].sort((a, b) => b.fecha.localeCompare(a.fecha)));
    }).catch(() => { setItems([]); setFallo(true); });
  };
  React.useEffect(cargar, []);

  const MESES = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
  const fmtDia = (f) => { const m = String(f).match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? m[3] + ' ' + MESES[Number(m[2]) - 1] : ''; };
  const fmtAnio = (f) => String(f).slice(0, 4);
  const tags = ['todos'].concat(Array.from(new Set((items || []).map(i => i.tag).filter(Boolean))).sort());
  const filtered = (items || []).filter(i => tag === 'todos' || i.tag === tag);

  return (
    <div className="page-fade">
      <section style={{ paddingTop: 64, paddingBottom: 32 }}>
        <div className="container">
          <div className="eyebrow">Actividades · Bitácora</div>
          <h1 className="h-display mt-6" style={{ fontSize: 'clamp(44px, 5.5vw, 72px)' }}>
            Lo que estamos<br/>construyendo.
          </h1>
        </div>
      </section>

      <section style={{ paddingTop: 16 }}>
        <div className="container">
          {fallo ? <LoadErrorCard onRetry={cargar}>No pudimos cargar las actividades. Revisa tu conexión e inténtalo de nuevo.</LoadErrorCard>
          : items === null ? <p style={{ color: 'var(--fg-muted)' }}>Cargando actividades…</p>
          : items.length === 0 ? (
            <div className="card" style={{ padding: 48, textAlign: 'center', color: 'var(--fg-muted)' }}>
              <img src="assets/mascota/mascota-investiga.png?v=3" alt="" style={{ width: 150, margin: '0 auto', display: 'block' }} onError={(e) => { e.currentTarget.outerHTML = ''; }} />
              <p className="mt-3">Aún no hay actividades registradas. Visita <a href="#/eventos" style={{ color: 'var(--violet-600)' }}>Eventos</a> para las próximas fechas.</p>
            </div>
          ) : (
          <>
          {tags.length > 2 && (
            <div className="flex gap-2 mb-8" style={{ flexWrap: 'wrap' }}>
              {tags.map(t => (
                <button key={t} className={`comite-chip ${tag === t ? 'active' : ''}`}
                  onClick={() => setTag(t)}
                  style={{ cursor: 'pointer', background: tag === t ? 'var(--violet-600)' : 'var(--bg-soft)', color: tag === t ? '#fff' : 'var(--fg-soft)', borderColor: tag === t ? 'var(--violet-600)' : 'var(--border)' }}>
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
          )}

          <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 0 }}>
            {filtered.map((it, i) => (
              <article key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: 32, padding: '32px 0', borderTop: '1px solid var(--border)', borderBottom: i === filtered.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div>
                  <div className="serif" style={{ fontSize: 36, color: 'var(--violet-700)', lineHeight: 1 }}>{fmtDia(it.fecha)}</div>
                  <div className="mono small mt-2" style={{ color: 'var(--fg-muted)' }}>{fmtAnio(it.fecha)}</div>
                </div>
                <div>
                  <span className="comite-chip" style={{ color: 'var(--violet-600)', borderColor: 'currentColor' }}>
                    <span style={{ width: 6, height: 6, borderRadius: 99, background: 'var(--violet-600)' }} />{it.tag} · {it.tipo}
                  </span>
                  <h3 className="serif mt-4" style={{ fontSize: 30, lineHeight: 1.15 }}>{it.title}</h3>
                  {it.body && <p className="mt-4" style={{ color: 'var(--fg-soft)', maxWidth: '70ch' }}>{String(it.body).slice(0, 220)}</p>}
                </div>
                <a className="btn-link" href={it.go} style={{ alignSelf: 'center' }}>Ver <Icon name="arrow" size={14} /></a>
              </article>
            ))}
          </div>
          </>
          )}
        </div>
      </section>
    </div>
  );
};

// ============ CONTACTO ============
// Mapa Leaflet real apuntando a la Facultad de Medicina Humana · UNA Puno.
// Coordenadas aproximadas Av. Floral, Ciudad Universitaria UNA: -15.8264, -70.0143
const UnaPunoMap = () => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || !window.L) return;
    const map = window.L.map(ref.current, { scrollWheelZoom: false }).setView([-15.8264, -70.0143], 16);
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap', maxZoom: 19
    }).addTo(map);
    window.L.marker([-15.8264, -70.0143])
      .addTo(map)
      .bindPopup('<b>SOCIEM-UNA</b><br/>Facultad de Medicina Humana<br/>Av. Floral 1153 · UNA Puno')
      .openPopup();
    return () => map.remove();
  }, []);
  return <div ref={ref} style={{ height: 280, borderRadius: 16, marginTop: 48, overflow: 'hidden', border: '1px solid var(--border)' }} />;
};

const ContactoPage = () => {
  const [info, setInfo] = React.useState(null);
  const [msg, setMsg] = React.useState({ nombre: '', email: '', asunto: 'Información general', mensaje: '' });
  const [envio, setEnvio] = React.useState('idle'); // idle | enviando | ok | error
  const [envioErr, setEnvioErr] = React.useState('');
  React.useEffect(() => {
    if (!window.SOCIEM_API) return;
    window.SOCIEM_API.get('puno','info').then(r => {
      if (r && r.ok && r.data) setInfo(r.data);
    }).catch(() => {});
  }, []);
  const enviar = async (e) => {
    e.preventDefault();
    if (!msg.nombre.trim() || !msg.email.trim() || !msg.mensaje.trim()) { setEnvioErr('Completa nombre, email y mensaje.'); setEnvio('error'); return; }
    setEnvio('enviando'); setEnvioErr('');
    try {
      const r = await window.SOCIEM_API.post('contacto', 'enviar', {
        nombre: msg.nombre, email: msg.email, mensaje: '[' + msg.asunto + '] ' + msg.mensaje
      });
      if (r && r.ok) { setEnvio('ok'); setMsg({ nombre: '', email: '', asunto: 'Información general', mensaje: '' }); }
      else { setEnvio('error'); setEnvioErr((r && r.error) || 'No se pudo enviar. Inténtalo de nuevo.'); }
    } catch (err) { setEnvio('error'); setEnvioErr('Sin conexión con el servidor. Inténtalo de nuevo.'); }
  };
  const email     = (info && info.email_contacto)  || 'sociem.una@gmail.com';
  const facebook  = (info && info.url_facebook)    || 'https://www.facebook.com/share/1Ag5jhmu7K/';
  const instagram = (info && info.url_instagram)   || 'https://www.instagram.com/sociem_una_puno';
  return (
  <div className="page-fade">
    <section style={{ paddingTop: 64 }}>
      <div className="container">
        <div className="grid" style={{ gridTemplateColumns: '1fr 1.1fr', gap: 80 }}>
          <div>
            <div className="eyebrow">Contacto</div>
            <h1 className="h-display mt-6" style={{ fontSize: 'clamp(44px, 5vw, 64px)' }}>Hablemos.</h1>
            <p className="lede mt-6">¿Quieres colaborar con SOCIEM-UNA, invitarnos a un evento, o sumarte como aliado institucional? Escríbenos.</p>

            <div className="grid mt-12" style={{ gap: 18, marginTop: 48 }}>
              <div className="flex gap-4 items-center">
                <div className="icon-btn" style={{ background: 'var(--violet-50)', color: 'var(--violet-700)' }}><Icon name="mail" size={16} /></div>
                <div>
                  <div className="mono small" style={{ color: 'var(--fg-muted)' }}>EMAIL</div>
                  <a href={'mailto:' + email} style={{ fontWeight: 500 }}>{email}</a>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="icon-btn" style={{ background: 'var(--violet-50)', color: 'var(--violet-700)' }}><Icon name="pin" size={16} /></div>
                <div>
                  <div className="mono small" style={{ color: 'var(--fg-muted)' }}>UBICACIÓN</div>
                  <div style={{ fontWeight: 500 }}>Av. Floral 1153, Puno · FMH UNA</div>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="icon-btn" style={{ background: 'var(--violet-50)', color: 'var(--violet-700)' }}><Icon name="phone" size={16} /></div>
                <div>
                  <div className="mono small" style={{ color: 'var(--fg-muted)' }}>TELÉFONO</div>
                  <div style={{ fontWeight: 500 }}>+51 (51) 365-3000 anx. Medicina</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-10" style={{ marginTop: 48 }}>
              <a className="icon-btn" aria-label="Facebook de SOCIEM-UNA" href={facebook} target="_blank" rel="noopener noreferrer"><Icon name="facebook" size={15} /></a>
              <a className="icon-btn" aria-label="Instagram de SOCIEM-UNA" href={instagram} target="_blank" rel="noopener noreferrer"><Icon name="instagram" size={15} /></a>
              <a className="icon-btn" aria-label="Escribir por correo" href={'mailto:' + email}><Icon name="mail" size={15} /></a>
            </div>

            <UnaPunoMap />
          </div>

          <div className="card" style={{ padding: '40px 44px' }}>
            <h2 className="serif" style={{ fontSize: 32 }}>Escríbenos</h2>
            <p className="small mt-2">Tu mensaje llega directo al correo institucional de la sociedad.</p>
            {envio === 'ok' ? (
              <div className="mt-8" style={{ marginTop: 32, textAlign: 'center', padding: '32px 0' }}>
                <img src="assets/mascota/mascota-formulario.png?v=3" alt="" style={{ width: 140, margin: '0 auto 6px', display: 'block' }} onError={(e) => { e.currentTarget.outerHTML = ''; }} />
                <h3 className="serif mt-3" style={{ fontSize: 24 }}>Mensaje enviado</h3>
                <p className="small mt-2" style={{ color: 'var(--fg-muted)' }}>Gracias por escribirnos. Te responderemos al correo que indicaste.</p>
                <button className="btn mt-4" style={{ marginTop: 16 }} onClick={() => setEnvio('idle')}>Enviar otro mensaje</button>
              </div>
            ) : (
            <form className="grid mt-8 gap-4" style={{ marginTop: 32 }} onSubmit={enviar}>
              <div className="grid col-2 gap-4">
                <div className="field"><label>Nombre</label><input className="input" placeholder="Tu nombre completo" value={msg.nombre} onChange={(e) => setMsg({ ...msg, nombre: e.target.value })} required /></div>
                <div className="field"><label>Email</label><input className="input" type="email" placeholder="tu@email.com" value={msg.email} onChange={(e) => setMsg({ ...msg, email: e.target.value })} required /></div>
              </div>
              <div className="field"><label>Asunto</label>
                <select className="select" value={msg.asunto} onChange={(e) => setMsg({ ...msg, asunto: e.target.value })}><option>Quiero colaborar</option><option>Invitación a evento</option><option>Aliado institucional</option><option>Información general</option></select>
              </div>
              <div className="field"><label>Mensaje</label><textarea className="textarea" placeholder="Cuéntanos en qué podemos ayudarte..." value={msg.mensaje} onChange={(e) => setMsg({ ...msg, mensaje: e.target.value })} required /></div>
              {envio === 'error' && envioErr && <p className="small" style={{ color: '#B3323A' }}>{envioErr}</p>}
              <button className="btn btn-primary mt-4" style={{ marginTop: 8, justifyContent: 'center' }} disabled={envio === 'enviando'}>
                {envio === 'enviando' ? 'Enviando…' : <>Enviar mensaje <Icon name="arrow" size={14} /></>}
              </button>
            </form>
            )}
          </div>
        </div>
      </div>
    </section>
  </div>
  );
};

// ============ ADMIN ============
// Login real contra Apps Script (route=auth&action=login). El usuario
// "admin" por defecto y su password se generan al ejecutar
// bootstrap_admin() en el editor de Apps Script (te llega por mail).
const AdminLogin = ({ onLogin }) => {
  const [user, setUser] = React.useState('admin');
  const [pass, setPass] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!user || !pass) { setError('Ingresa usuario y contraseña'); return; }
    setError(''); setLoading(true);
    if (!window.SOCIEM_API) {
      // Sin api.js, modo demo (para no romper en local sin red)
      setLoading(false); onLogin({ username: user, mock: true }); return;
    }
    const r = await window.SOCIEM_API.login(user, pass);
    setLoading(false);
    if (r && r.ok) {
      onLogin(r.user || { username: user });
    } else {
      const code = r && r.code ? r.code : '';
      setError(
        code === 'CREDENCIALES_INVALIDAS' ? 'Usuario o contraseña incorrectos' :
        code === 'CREDENCIALES_FALTANTES' ? 'Faltan credenciales' :
        (r && r.error) || 'No se pudo conectar al servidor'
      );
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--bg-soft)', padding: 24 }}>
      <div className="card" style={{ width: '100%', maxWidth: 420, padding: '44px 40px' }}>
        <div className="flex items-center gap-3 mb-8">
          <Logo size={40} /><Wordmark />
        </div>
        <img src="assets/mascota/mascota-laptop.png?v=3" alt="" style={{ width: 120, margin: '0 auto 10px', display: 'block' }} onError={(e) => { e.currentTarget.outerHTML = ''; }} />
        <div className="mono small">ACCESO INTERNO</div>
        <h1 className="serif mt-2" style={{ fontSize: 30 }}>Panel administrativo</h1>
        <p className="small mt-2">Ingresa con tus credenciales SOCIEM-UNA.</p>
        <form className="grid mt-8 gap-4" onSubmit={submit}>
          <div className="field"><label>Usuario</label><input className="input" value={user} onChange={e => setUser(e.target.value)} placeholder="admin" autoComplete="username" /></div>
          <div className="field">
            <label>Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input className="input" type={showPass ? 'text' : 'password'} value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••••" autoComplete="current-password" style={{ width: '100%', paddingRight: 40 }} />
              <button type="button" onClick={() => setShowPass(s => !s)} aria-label="Mostrar contraseña" style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--fg-muted)' }}>
                <Icon name="eye" size={16} />
              </button>
            </div>
          </div>
          {error && (
            <div className="small" style={{ color: 'var(--red)', padding: '8px 12px', background: 'rgba(200,16,46,.06)', borderRadius: 8 }}>
              {error}
            </div>
          )}
          <button className="btn btn-primary mt-4" type="submit" disabled={loading} style={{ justifyContent: 'center', opacity: loading ? 0.6 : 1 }}>
            <Icon name="lock" size={14} /> {loading ? 'Ingresando…' : 'Iniciar sesión'}
          </button>
          <span className="small mt-2" style={{ textAlign: 'center', color: 'var(--fg-muted)' }}>¿Olvidaste tu contraseña? Pídele al superadministrador que la restablezca desde Usuarios.</span>
        </form>
      </div>
    </div>
  );
};

// ============ ADMIN DASHBOARD · CRUD funcional contra el backend ============

// Navegación COMPLETA del panel, declarada en un solo lugar. Las secciones
// implementadas en pages-4.jsx se referencian por nombre (string) y se
// resuelven contra window en el momento de renderizar — sin splices en
// runtime ni dependencia del orden de carga de los <script>.
const ADMIN_NAV = [
  { section: 'Principal', items: [
    { id: 'dashboard',  label: 'Dashboard',     icon: 'grid' },
    { id: 'miembros',   label: 'Miembros',      icon: 'users' },
  ]},
  { section: 'Operación', items: [
    { id: 'solicitudes', label: 'Solicitudes',  icon: 'inbox' },
    { id: 'eventos',     label: 'Eventos',      icon: 'calendar' },
    { id: 'evaluaciones',label: 'Evaluaciones', icon: 'edit' },
    { id: 'certificados',label: 'Certificados', icon: 'medal' },
    { id: 'personas',    label: 'Personas',     icon: 'users' },
  ]},
  { section: 'Tienda', items: [
    { id: 'productos',  label: 'Productos',     icon: 'shoppingBag' },
    { id: 'pedidos',    label: 'Pedidos',       icon: 'inbox' },
  ]},
  { section: 'Gestión', items: [
    { id: 'directorio', label: 'Directorio',    icon: 'medal' },
    { id: 'comites',    label: 'Comités',       icon: 'layers' },
    { id: 'noticias',   label: 'Noticias / Diario', icon: 'book' },
    { id: 'formularios',label: 'Formularios',   icon: 'edit' },
    { id: 'sorteos',    label: 'Sorteos',       icon: 'sparkle' },
  ]},
  { section: 'Sistema', items: [
    { id: 'config',     label: 'Configuración', icon: 'settings' },
    { id: 'usuarios',   label: 'Usuarios',      icon: 'lock' },
  ]},
];
window.ADMIN_NAV = ADMIN_NAV;

const COMITES_OPCIONES = ['SCOPE-IN','SCOPE-OUT','SCOME','SCORE','SCOPH','SCORA','SCORP','CPC','CPA','CPPC','CPAIS','CPRII','CPDII'];
const CONSEJOS_OPCIONES = [
  { value: 'EJECUTIVO',          label: 'Consejo Ejecutivo' },
  { value: 'COMITES_IFMSA',      label: 'Comités IFMSA' },
  { value: 'COMITES_SOCIMEP',    label: 'Comités SOCIMEP' },
  { value: 'DIVISIONES_SOPORTE', label: 'Divisiones de Soporte' },
];

// Wrapper minimalista alrededor de window.SOCIEM_API que lanza Error en !ok.
// Las mutaciones (post) se deduplican mientras están en vuelo: un doble clic
// en "Guardar" o "Eliminar" reutiliza la petición pendiente en vez de
// disparar un POST duplicado al backend.
const _postsEnVuelo = {};
const adminApi = {
  async get(route, action, params) {
    const r = await window.SOCIEM_API.get(route, action, params);
    if (!r || r.ok === false) {
      const err = new Error((r && r.error) || 'Sin respuesta del servidor');
      err.code = r && r.code; throw err;
    }
    return r;
  },
  post(route, action, body) {
    const clave = route + '.' + action + '.' + ((body && (body.id || body.codigo)) || '');
    if (_postsEnVuelo[clave]) return _postsEnVuelo[clave];
    _postsEnVuelo[clave] = (async () => {
      try {
        const r = await window.SOCIEM_API.post(route, action, body);
        if (!r || r.ok === false) {
          const err = new Error((r && r.error) || 'Sin respuesta del servidor');
          err.code = r && r.code; throw err;
        }
        return r;
      } finally { delete _postsEnVuelo[clave]; }
    })();
    return _postsEnVuelo[clave];
  }
};

// Hook de notificaciones tipo toast
const useToast = () => {
  const [list, setList] = React.useState([]);
  const push = (msg, kind = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setList(t => [...t, { id, msg, kind }]);
    setTimeout(() => setList(t => t.filter(x => x.id !== id)), 4200);
  };
  const node = (
    <div style={{ position:'fixed', bottom:24, right:24, display:'flex', flexDirection:'column', gap:8, zIndex:10000, maxWidth:400 }}>
      {list.map(t => (
        <div key={t.id} style={{
          background:'var(--bg)', padding:'14px 18px', borderRadius:12,
          boxShadow:'0 8px 24px rgba(0,0,0,.15)',
          borderLeft: '4px solid ' + (t.kind==='error'?'var(--red)':t.kind==='ok'?'#1F6B3A':'var(--violet-600)'),
          fontSize:14
        }}>{t.msg}</div>
      ))}
    </div>
  );
  return { push, node };
};

// Modal reutilizable
const AdminModal = ({ open, onClose, title, children, footer, wide }) => {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position:'fixed', inset:0, background:'rgba(15,10,30,.55)', display:'grid', placeItems:'center', zIndex:9000, padding:24 }}>
      <div onClick={e => e.stopPropagation()} className="card" style={{ width:'100%', maxWidth: wide ? 720 : 520, padding:0, maxHeight:'90vh', display:'flex', flexDirection:'column' }}>
        <div className="flex justify-between items-center" style={{ padding:'22px 28px', borderBottom:'1px solid var(--border)' }}>
          <h2 className="serif" style={{ fontSize:22, margin:0 }}>{title}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Cerrar"><Icon name="close" size={16} /></button>
        </div>
        <div style={{ padding:'24px 28px', overflow:'auto', flex:1 }}>{children}</div>
        {footer && <div className="flex justify-end gap-3" style={{ padding:'18px 28px', borderTop:'1px solid var(--border)' }}>{footer}</div>}
      </div>
    </div>
  );
};

const AdminField = ({ label, children, hint, span }) => (
  <div className="field" style={{ marginBottom: 14, gridColumn: span ? '1 / -1' : 'auto' }}>
    <label style={{ display:'block', marginBottom:6, fontSize:13, fontWeight:500 }}>{label}</label>
    {children}
    {hint && <div className="small" style={{ color:'var(--fg-muted)', fontSize:12, marginTop:4 }}>{hint}</div>}
  </div>
);

// Input de imagen con detección automática de Drive + preview en vivo.
// Acepta:
//   - Link "Compartir" de Drive: https://drive.google.com/file/d/<ID>/view?usp=sharing
//   - URL de imagen directa (https://...)
//   - Ruta relativa (assets/miembros/foo.jpg)
// El valor se almacena tal cual; al renderizar se normaliza con IMG().
// Para que las imágenes de Drive sean visibles públicamente, el archivo
// debe estar compartido como "Cualquier persona con el enlace puede ver".
const DriveImageInput = ({ value, onChange, placeholder, hint }) => {
  const isDrive = !!(value && /drive\.google\.com/.test(String(value)));
  const preview = IMG(value);
  const [errored, setErrored] = React.useState(false);
  React.useEffect(() => { setErrored(false); }, [value]);
  return (
    <div>
      <input
        className="input"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || 'https://drive.google.com/file/d/... o URL directa'}
      />
      <div style={{ marginTop:12, display:'flex', alignItems:'flex-start', gap:14 }}>
        {value ? (
          errored ? (
            <div style={{ width:96, height:96, borderRadius:12, background:'#fee', border:'1px solid #fcc', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--red)', fontSize:11, textAlign:'center', padding:8, flexShrink:0 }}>
              No carga · revisa permisos
            </div>
          ) : (
            <img
              src={preview}
              alt="Vista previa"
              style={{ width:96, height:96, objectFit:'cover', borderRadius:12, border:'1px solid var(--border)', flexShrink:0, background:'var(--bg-soft)' }}
              onError={() => setErrored(true)}
            />
          )
        ) : (
          <div style={{ width:96, height:96, borderRadius:12, background:'var(--bg-soft)', border:'1px dashed var(--border)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--fg-muted)', fontSize:11, flexShrink:0 }}>
            Vista previa
          </div>
        )}
        <div className="small" style={{ color:'var(--fg-muted)', flex:1, lineHeight:1.5, fontSize:12 }}>
          {isDrive
            ? <span><strong style={{ color:'var(--violet-700)' }}>✓ Link de Google Drive detectado</strong> — se servirá vía endpoint thumbnail. <strong>Importante:</strong> el archivo debe estar compartido como “Cualquier persona con el enlace puede ver”.</span>
            : value
              ? 'URL externa o ruta local. Se usará tal cual.'
              : <span>Pega aquí el link de Drive (botón “Compartir” → “Copiar enlace”) o una URL pública de imagen.</span>}
        </div>
      </div>
      {hint && <div className="small" style={{ color:'var(--fg-muted)', fontSize:12, marginTop:8 }}>{hint}</div>}
    </div>
  );
};

const EstadoBadge = ({ value }) => {
  const styles = {
    ACTIVO:    { bg:'#E8F5EC', fg:'#1F6B3A', bd:'#C8E6CD' },
    PENDIENTE: { bg:'#FBF4DD', fg:'#8C7321', bd:'#F0E2B0' },
    INACTIVO:  { bg:'#FAEAEA', fg:'#8C2121', bd:'#F0BBBB' },
    EGRESADO:  { bg:'#E8EEF5', fg:'#21478C', bd:'#BBCCF0' },
  };
  const s = styles[value] || styles.PENDIENTE;
  return <span className="badge" style={{ background:s.bg, color:s.fg, borderColor:s.bd }}><span className="badge-dot" />{value || '—'}</span>;
};

// Exporta helpers admin para que pages-4.jsx (secciones nuevas) los reutilice.
Object.assign(window, { adminApi, useToast, AdminModal, AdminField, DriveImageInput, EstadoBadge });

// ───── Sección: Miembros (CRUD completo) ─────
const AdminSectionMiembros = ({ toast }) => {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');
  const [filterEstado, setFilterEstado] = React.useState('');
  const [editing, setEditing] = React.useState(null);

  const reload = async () => {
    setLoading(true);
    try { const r = await adminApi.get('miembros','list'); setItems(r.items || r.data || []); }
    catch (e) { toast.push('Error: ' + e.message, 'error'); }
    setLoading(false);
  };
  React.useEffect(() => { reload(); }, []);

  const save = async () => {
    try {
      const isNew = !editing.id;
      const payload = { ...editing };
      if (!isNew) ['_user','_lang','timestamp_form','id'].forEach(k => delete payload[k]);
      payload.id = editing.id; // re-añade id si update
      if (isNew) delete payload.id;
      const action = isNew ? 'create' : 'update';
      await adminApi.post('miembros', action, payload);
      toast.push(isNew ? 'Miembro creado' : 'Miembro actualizado', 'ok');
      setEditing(null); reload();
    } catch (e) { toast.push(e.message, 'error'); }
  };
  const remove = async (m) => {
    if (!confirm('¿Eliminar a ' + (m.nombres||'') + ' ' + (m.apellidos||'') + '?')) return;
    try { await adminApi.post('miembros','delete',{ id: m.id }); toast.push('Eliminado','ok'); reload(); }
    catch (e) { toast.push(e.message,'error'); }
  };
  const approve = async (m) => {
    try { await adminApi.post('miembros','approve',{ id: m.id }); toast.push('Aprobado','ok'); reload(); }
    catch (e) { toast.push(e.message,'error'); }
  };
  const reject = async (m) => {
    const motivo = prompt('Motivo del rechazo (opcional):') || '';
    try { await adminApi.post('miembros','reject',{ id: m.id, motivo }); toast.push('Rechazado','ok'); reload(); }
    catch (e) { toast.push(e.message,'error'); }
  };

  const filtered = items.filter(m => {
    if (filterEstado && m.estado !== filterEstado) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return [m.nombres, m.apellidos, m.email, m.comite_interes_1, m.codigo_universitario]
      .some(v => String(v||'').toLowerCase().includes(q));
  });

  return (
    <>
      <div className="flex justify-between items-center mb-6" style={{ flexWrap:'wrap', gap:12 }}>
        <div className="flex gap-3 items-center" style={{ flex:1, minWidth:280 }}>
          <div style={{ position:'relative', flex:1, maxWidth:420 }}>
            <input className="input" placeholder="Buscar por nombre, email, comité..." value={search} onChange={e=>setSearch(e.target.value)} style={{ paddingLeft:42, width:'100%' }} />
            <Icon name="search" size={16} style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', color:'var(--fg-muted)' }} />
          </div>
          <select className="select" value={filterEstado} onChange={e=>setFilterEstado(e.target.value)}>
            <option value="">Todos los estados</option>
            <option>ACTIVO</option><option>PENDIENTE</option><option>INACTIVO</option><option>EGRESADO</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost" onClick={reload} style={{ padding:'10px 16px' }}>Recargar</button>
          <button className="btn btn-primary" onClick={() => setEditing({ estado:'ACTIVO', publico:false, semestre:1 })} style={{ padding:'10px 16px' }}>
            <Icon name="plus" size={14} /> Nuevo miembro
          </button>
        </div>
      </div>

      {loading ? (
        <div className="card" style={{ padding:32, textAlign:'center', color:'var(--fg-muted)' }}>Cargando…</div>
      ) : items.length === 0 ? (
        <div className="card" style={{ padding:48, textAlign:'center' }}>
          <p style={{ marginBottom:16, color:'var(--fg-soft)' }}>No hay miembros registrados aún.</p>
          <button className="btn btn-primary" onClick={() => setEditing({ estado:'ACTIVO', publico:false, semestre:1 })}>Agregar el primero</button>
        </div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr><th>Nombre</th><th>Email</th><th>Código</th><th>Comité</th><th>Sem.</th><th>Estado</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.length === 0 && <tr><td colSpan={7} style={{ color:'var(--fg-muted)', padding:20 }}>Sin resultados para tu búsqueda o filtro.</td></tr>}
            {filtered.map(m => (
              <tr key={m.id}>
                <td><strong>{((m.nombres||'') + ' ' + (m.apellidos||'')).trim() || '—'}</strong></td>
                <td className="small" style={{ color:'var(--fg-soft)' }}>{m.email}</td>
                <td className="mono small">{m.codigo_universitario || '—'}</td>
                <td><span className="comite-chip">{m.comite_interes_1 || '—'}</span></td>
                <td>{m.semestre || '—'}</td>
                <td><EstadoBadge value={m.estado} /></td>
                <td>
                  <div className="flex gap-2">
                    {m.estado === 'PENDIENTE' && (<>
                      <button className="icon-btn" title="Aprobar" onClick={()=>approve(m)} style={{ width:28, height:28, color:'#1F6B3A' }}><Icon name="check" size={13} /></button>
                      <button className="icon-btn" title="Rechazar" onClick={()=>reject(m)} style={{ width:28, height:28, color:'var(--red)' }}><Icon name="close" size={13} /></button>
                    </>)}
                    <button className="icon-btn" title="Editar" onClick={()=>setEditing(m)} style={{ width:28, height:28 }}><Icon name="edit" size={13} /></button>
                    <button className="icon-btn" title="Eliminar" onClick={()=>remove(m)} style={{ width:28, height:28 }}><Icon name="trash" size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="flex justify-between items-center mt-6" style={{ marginTop:16 }}>
        <span className="small" style={{ color:'var(--fg-muted)' }}>Mostrando {filtered.length} de {items.length}</span>
      </div>

      <AdminModal
        open={!!editing} onClose={()=>setEditing(null)} wide
        title={editing && editing.id ? 'Editar miembro' : 'Nuevo miembro'}
        footer={<>
          <button className="btn btn-ghost" onClick={()=>setEditing(null)}>Cancelar</button>
          <button className="btn btn-primary" onClick={save}>Guardar</button>
        </>}
      >
        {editing && (
          <div className="grid col-2 gap-4">
            <AdminField label="Nombres *"><input className="input" value={editing.nombres||''} onChange={e=>setEditing({...editing, nombres:e.target.value})} /></AdminField>
            <AdminField label="Apellidos *"><input className="input" value={editing.apellidos||''} onChange={e=>setEditing({...editing, apellidos:e.target.value})} /></AdminField>
            <AdminField label="Email *"><input className="input" type="email" value={editing.email||''} onChange={e=>setEditing({...editing, email:e.target.value})} /></AdminField>
            <AdminField label="DNI"><input className="input" value={editing.dni||''} onChange={e=>setEditing({...editing, dni:e.target.value})} /></AdminField>
            <AdminField label="Código universitario *"><input className="input" value={editing.codigo_universitario||''} onChange={e=>setEditing({...editing, codigo_universitario:e.target.value})} /></AdminField>
            <AdminField label="Teléfono"><input className="input" value={editing.telefono||''} onChange={e=>setEditing({...editing, telefono:e.target.value})} /></AdminField>
            <AdminField label="Semestre *"><input className="input" type="number" min="1" max="14" value={editing.semestre||''} onChange={e=>setEditing({...editing, semestre:Number(e.target.value)})} /></AdminField>
            <AdminField label="Estado">
              <select className="select" value={editing.estado||'PENDIENTE'} onChange={e=>setEditing({...editing, estado:e.target.value})}>
                <option>PENDIENTE</option><option>ACTIVO</option><option>INACTIVO</option><option>EGRESADO</option>
              </select>
            </AdminField>
            <AdminField label="Comité interés 1 *">
              <select className="select" value={editing.comite_interes_1||''} onChange={e=>setEditing({...editing, comite_interes_1:e.target.value})}>
                <option value="">— Selecciona —</option>
                {COMITES_OPCIONES.map(c => <option key={c}>{c}</option>)}
              </select>
            </AdminField>
            <AdminField label="Comité interés 2">
              <select className="select" value={editing.comite_interes_2||''} onChange={e=>setEditing({...editing, comite_interes_2:e.target.value})}>
                <option value="">—</option>
                {COMITES_OPCIONES.map(c => <option key={c}>{c}</option>)}
              </select>
            </AdminField>
            <AdminField span label="Foto del miembro" hint="Pega un link de Google Drive o una URL directa.">
              <DriveImageInput value={editing.foto_url||''} onChange={v => setEditing({...editing, foto_url:v})} />
            </AdminField>
            <AdminField label="Visible en galería pública">
              <label className="flex items-center gap-2" style={{ marginTop:8 }}>
                <input type="checkbox" checked={!!editing.publico} onChange={e=>setEditing({...editing, publico:e.target.checked})} />
                <span className="small">Mostrar en /miembros</span>
              </label>
            </AdminField>
            <AdminField label="Observaciones"><input className="input" value={editing.observaciones||''} onChange={e=>setEditing({...editing, observaciones:e.target.value})} /></AdminField>
          </div>
        )}
      </AdminModal>
    </>
  );
};

// ───── Sección: Directorio (CRUD) ─────
const AdminSectionDirectorio = ({ toast }) => {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [editing, setEditing] = React.useState(null);
  const [filterConsejo, setFilterConsejo] = React.useState('');

  const reload = async () => {
    setLoading(true);
    try { const r = await adminApi.get('directorio','list'); setItems(Array.isArray(r.data) ? r.data : []); }
    catch (e) { toast.push('Error: ' + e.message, 'error'); }
    setLoading(false);
  };
  React.useEffect(() => { reload(); }, []);

  const save = async () => {
    try {
      const isNew = !editing.id;
      await adminApi.post('directorio', isNew?'create':'update', editing);
      toast.push(isNew?'Cargo creado':'Cargo actualizado','ok');
      setEditing(null); reload();
    } catch (e) { toast.push(e.message, 'error'); }
  };
  const remove = async (d) => {
    if (!confirm('¿Eliminar este cargo?')) return;
    try { await adminApi.post('directorio','delete',{ id:d.id }); toast.push('Eliminado','ok'); reload(); }
    catch (e) { toast.push(e.message,'error'); }
  };
  const filtered = filterConsejo ? items.filter(i => i.consejo === filterConsejo) : items;

  return (
    <>
      <div className="flex justify-between items-center mb-6" style={{ flexWrap:'wrap', gap:12 }}>
        <select className="select" value={filterConsejo} onChange={e=>setFilterConsejo(e.target.value)}>
          <option value="">Todos los consejos ({items.length})</option>
          {CONSEJOS_OPCIONES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
        <div className="flex gap-2">
          <button className="btn btn-ghost" onClick={reload} style={{ padding:'10px 16px' }}>Recargar</button>
          <button className="btn btn-primary" onClick={() => setEditing({ consejo:'EJECUTIVO', activo:true, gestion:'2026', orden:0 })} style={{ padding:'10px 16px' }}>
            <Icon name="plus" size={14} /> Nuevo cargo
          </button>
        </div>
      </div>

      {loading ? <div className="card" style={{ padding:32, textAlign:'center' }}>Cargando…</div> :
       filtered.length === 0 ? (
         <div className="card" style={{ padding:48, textAlign:'center', color:'var(--fg-muted)' }}>
           <p>No hay cargos. Si recién corriste el bootstrap, ejecuta <code>bootstrap_seedDirectorio()</code> en el editor de Apps Script.</p>
         </div>
       ) : (
        <table className="admin-table">
          <thead><tr><th></th><th>Cargo</th><th>Persona</th><th>Consejo</th><th>Activo</th><th></th></tr></thead>
          <tbody>
            {filtered.map(d => (
              <tr key={d.id}>
                <td>
                  {d.foto_url ? (
                    <img src={IMG(d.foto_url)} alt={d.nombre_completo} style={{ width:36, height:36, borderRadius:99, objectFit:'cover' }} onError={e => { e.currentTarget.style.display='none'; }} />
                  ) : (
                    <div style={{ width:36, height:36, borderRadius:99, background:'var(--violet-100)', color:'var(--violet-700)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:600 }}>
                      {(d.nombre_completo||'?').split(' ').map(s=>s[0]).slice(0,2).join('')}
                    </div>
                  )}
                </td>
                <td><strong>{d.cargo_nombre}</strong><br/><span className="mono small" style={{ color:'var(--fg-muted)' }}>{d.cargo_codigo}</span></td>
                <td>{d.nombre_completo || <span style={{ color:'var(--fg-muted)' }}>—</span>}</td>
                <td><span className="badge">{d.consejo}</span></td>
                <td>{d.activo === true ? '✓' : '✗'}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="icon-btn" title="Editar" onClick={()=>setEditing(d)} style={{ width:28, height:28 }}><Icon name="edit" size={13} /></button>
                    <button className="icon-btn" title="Eliminar" onClick={()=>remove(d)} style={{ width:28, height:28 }}><Icon name="trash" size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       )}

      <AdminModal
        open={!!editing} onClose={()=>setEditing(null)} wide
        title={editing && editing.id ? 'Editar cargo del directorio' : 'Nuevo cargo'}
        footer={<>
          <button className="btn btn-ghost" onClick={()=>setEditing(null)}>Cancelar</button>
          <button className="btn btn-primary" onClick={save}>Guardar</button>
        </>}
      >
        {editing && (
          <div className="grid col-2 gap-4">
            <AdminField label="Consejo *">
              <select className="select" value={editing.consejo||'EJECUTIVO'} onChange={e=>setEditing({...editing, consejo:e.target.value})}>
                {CONSEJOS_OPCIONES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </AdminField>
            <AdminField label="Código *" hint="Ej: PRESIDENCIA, SCOPH, DSNT">
              <input className="input" value={editing.cargo_codigo||''} onChange={e=>setEditing({...editing, cargo_codigo:e.target.value})} />
            </AdminField>
            <AdminField label="Nombre del cargo *"><input className="input" value={editing.cargo_nombre||''} onChange={e=>setEditing({...editing, cargo_nombre:e.target.value})} /></AdminField>
            <AdminField label="Nombre completo *"><input className="input" value={editing.nombre_completo||''} onChange={e=>setEditing({...editing, nombre_completo:e.target.value})} /></AdminField>
            <AdminField span label="Foto del cargo" hint="Pega un link de Google Drive (Compartir → Copiar enlace) o una URL directa.">
              <DriveImageInput value={editing.foto_url||''} onChange={v => setEditing({...editing, foto_url:v})} />
            </AdminField>
            <AdminField label="Email"><input className="input" type="email" value={editing.email||''} onChange={e=>setEditing({...editing, email:e.target.value})} /></AdminField>
            <AdminField label="Color (hex)"><input className="input" value={editing.color_hex||''} onChange={e=>setEditing({...editing, color_hex:e.target.value})} placeholder="#7B1FA2" /></AdminField>
            <AdminField label="Instagram"><input className="input" value={editing.instagram||''} onChange={e=>setEditing({...editing, instagram:e.target.value})} /></AdminField>
            <AdminField label="LinkedIn"><input className="input" value={editing.linkedin||''} onChange={e=>setEditing({...editing, linkedin:e.target.value})} /></AdminField>
            <AdminField label="WhatsApp" hint="Sólo dígitos. Si es Perú sin código país, asume +51.">
              <input
                className="input"
                value={editing.whatsapp || ''}
                onChange={e => setEditing({ ...editing, whatsapp: e.target.value.replace(/[^0-9+]/g, '') })}
                placeholder="999888777 o +51999888777"
              />
            </AdminField>
            <AdminField label="Orden"><input className="input" type="number" value={editing.orden||0} onChange={e=>setEditing({...editing, orden:Number(e.target.value)})} /></AdminField>
            <AdminField label="Gestión"><input className="input" value={editing.gestion||'2026'} onChange={e=>setEditing({...editing, gestion:e.target.value})} /></AdminField>
            <AdminField span label="Descripción"><input className="input" value={editing.descripcion||''} onChange={e=>setEditing({...editing, descripcion:e.target.value})} /></AdminField>
            <AdminField label="Activo">
              <label className="flex items-center gap-2" style={{ marginTop:8 }}>
                <input type="checkbox" checked={editing.activo !== false} onChange={e=>setEditing({...editing, activo:e.target.checked})} />
                <span className="small">Visible en el sitio</span>
              </label>
            </AdminField>
          </div>
        )}
      </AdminModal>
    </>
  );
};

// ───── Sección: Comités (CRUD completo) ─────
const TIPOS_COMITE = ['IFMSA', 'SOCIMEP', 'DIVISION_SOPORTE'];

const AdminSectionComites = ({ toast }) => {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [editing, setEditing] = React.useState(null);
  const [filterTipo, setFilterTipo] = React.useState('');

  const reload = async () => {
    setLoading(true);
    try { const r = await adminApi.get('comites','list'); setItems(r.items || r.data || []); }
    catch (e) { toast.push('Error: ' + e.message, 'error'); }
    setLoading(false);
  };
  React.useEffect(() => { reload(); }, []);

  const save = async () => {
    try {
      const isNew = !editing._original;
      // Backend usa `codigo` como llave primaria (la hoja `comites` no tiene `id`).
      // Para create se manda todo. Para update se manda `codigo` como identificador.
      const payload = { ...editing };
      delete payload._original;
      // objetivos llega como textarea multilínea → convertir a "a|b|c"
      if (typeof payload.objetivos === 'string' && payload.objetivos.indexOf('\n') >= 0) {
        payload.objetivos = payload.objetivos.split('\n').map(s => s.trim()).filter(Boolean).join('|');
      }
      const action = isNew ? 'create' : 'update';
      // En update, el backend espera `codigo` (no `id`).
      if (!isNew) payload.codigo = editing._original.codigo;
      await adminApi.post('comites', action, payload);
      toast.push(isNew ? 'Comité creado' : 'Comité actualizado', 'ok');
      setEditing(null); reload();
    } catch (e) { toast.push(e.message, 'error'); }
  };
  const remove = async (c) => {
    if (!confirm('¿Desactivar comité ' + c.codigo + '?')) return;
    try { await adminApi.post('comites','delete',{ codigo: c.codigo }); toast.push('Desactivado','ok'); reload(); }
    catch (e) { toast.push(e.message,'error'); }
  };

  const filtered = filterTipo ? items.filter(i => i.tipo === filterTipo) : items;

  return (
    <>
      <div className="flex justify-between items-center mb-6" style={{ flexWrap:'wrap', gap:12 }}>
        <select className="select" value={filterTipo} onChange={e=>setFilterTipo(e.target.value)}>
          <option value="">Todos los tipos ({items.length})</option>
          {TIPOS_COMITE.map(t => <option key={t}>{t}</option>)}
        </select>
        <div className="flex gap-2">
          <button className="btn btn-ghost" onClick={reload} style={{ padding:'10px 16px' }}>Recargar</button>
          <button className="btn btn-primary" onClick={() => setEditing({ tipo:'IFMSA', activo:true, color_hex:'#7B1FA2', icono:'layers' })} style={{ padding:'10px 16px' }}>
            <Icon name="plus" size={14} /> Nuevo comité
          </button>
        </div>
      </div>

      {loading ? <div className="card" style={{ padding:32, textAlign:'center' }}>Cargando…</div> :
       filtered.length === 0 ? (
         <div className="card" style={{ padding:48, textAlign:'center', color:'var(--fg-muted)' }}>
           <p>Sin comités. Ejecuta <code>bootstrap_seedComites()</code> en el editor de Apps Script.</p>
         </div>
       ) : (
        <table className="admin-table">
          <thead><tr><th>Código</th><th>Nombre completo</th><th>Tipo</th><th>Activo</th><th></th></tr></thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.codigo}>
                <td><strong style={{ color:c.color_hex }}>{c.codigo}</strong></td>
                <td>{c.nombre_completo}<br/><span className="small" style={{ color:'var(--fg-muted)' }}>{c.nombre_corto || ''}</span></td>
                <td><span className="badge">{c.tipo}</span></td>
                <td>{c.activo === true ? '✓' : '✗'}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="icon-btn" title="Editar" onClick={()=>setEditing({...c, _original:{ codigo:c.codigo }})} style={{ width:28, height:28 }}><Icon name="edit" size={13} /></button>
                    <button className="icon-btn" title="Desactivar" onClick={()=>remove(c)} style={{ width:28, height:28 }}><Icon name="trash" size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       )}

      <AdminModal
        open={!!editing} onClose={()=>setEditing(null)} wide
        title={editing && editing._original ? 'Editar comité ' + editing._original.codigo : 'Nuevo comité'}
        footer={<>
          <button className="btn btn-ghost" onClick={()=>setEditing(null)}>Cancelar</button>
          <button className="btn btn-primary" onClick={save}>Guardar</button>
        </>}
      >
        {editing && (
          <div className="grid col-2 gap-4">
            <AdminField label="Código *" hint="Ej: SCOPH, CPC, DSNT (no se puede cambiar después)">
              <input className="input" value={editing.codigo||''} onChange={e=>setEditing({...editing, codigo:e.target.value})} disabled={!!editing._original} />
            </AdminField>
            <AdminField label="Tipo *">
              <select className="select" value={editing.tipo||'IFMSA'} onChange={e=>setEditing({...editing, tipo:e.target.value})}>
                {TIPOS_COMITE.map(t => <option key={t}>{t}</option>)}
              </select>
            </AdminField>
            <AdminField span label="Nombre completo *"><input className="input" value={editing.nombre_completo||''} onChange={e=>setEditing({...editing, nombre_completo:e.target.value})} /></AdminField>
            <AdminField label="Nombre corto"><input className="input" value={editing.nombre_corto||''} onChange={e=>setEditing({...editing, nombre_corto:e.target.value})} /></AdminField>
            <AdminField label="Ícono del sitio" hint="Nombres válidos: flask, heart, globe, health, exchange, book, edit, handshake, megaphone, award, layers, cpu"><input className="input" value={editing.icono||''} onChange={e=>setEditing({...editing, icono:e.target.value})} /></AdminField>
            <AdminField label="Color (hex) *"><input className="input" value={editing.color_hex||''} onChange={e=>setEditing({...editing, color_hex:e.target.value})} placeholder="#7B1FA2" /></AdminField>
            <AdminField label="ID coordinador" hint="UUID del cargo en directorio"><input className="input" value={editing.coordinador_id||''} onChange={e=>setEditing({...editing, coordinador_id:e.target.value})} /></AdminField>
            <AdminField span label="Descripción"><textarea className="textarea" value={editing.descripcion||''} onChange={e=>setEditing({...editing, descripcion:e.target.value})} rows={3} /></AdminField>
            <AdminField span label="Objetivos / Líneas de acción" hint="Una por línea — se guardan como lista separada por |">
              <textarea
                className="textarea"
                value={(editing.objetivos || '').replace(/\|/g, '\n')}
                onChange={e=>setEditing({...editing, objetivos:e.target.value})}
                rows={5}
                placeholder={"Formación continua\nInvestigación científica\nProyección comunitaria\nCooperación nacional"}
              />
            </AdminField>
            <AdminField label="Activo">
              <label className="flex items-center gap-2" style={{ marginTop:8 }}>
                <input type="checkbox" checked={editing.activo !== false} onChange={e=>setEditing({...editing, activo:e.target.checked})} />
                <span className="small">Visible en el sitio</span>
              </label>
            </AdminField>
          </div>
        )}
      </AdminModal>
    </>
  );
};

// ───── Sección: Noticias / Actividades ─────
const AdminSectionNoticias = ({ toast, user }) => {
  const [items, setItems] = React.useState([]);
  const [editing, setEditing] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const reload = async () => {
    setLoading(true);
    try { const r = await adminApi.get('noticias','list'); setItems(r.items || r.data || []); }
    catch (e) { toast.push(e.message,'error'); }
    setLoading(false);
  };
  React.useEffect(() => { reload(); }, []);
  const save = async () => {
    try {
      const payload = { ...editing };
      if (!payload.autor_id) payload.autor_id = (user && user.username) || 'admin';
      await adminApi.post('noticias', payload.id ? 'update' : 'create', payload);
      toast.push('Guardado','ok'); setEditing(null); reload();
    } catch (e) { toast.push(e.message,'error'); }
  };
  const togglePublish = async (n) => {
    try { await adminApi.post('noticias', n.publicado ? 'unpublish' : 'publish', { id:n.id }); toast.push(n.publicado?'Despublicado':'Publicado','ok'); reload(); }
    catch (e) { toast.push(e.message,'error'); }
  };
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="serif" style={{ fontSize:22 }}>Actividades · Noticias</h3>
        <div className="flex gap-2">
          <button className="btn btn-ghost" onClick={reload}>Recargar</button>
          <button className="btn btn-primary" onClick={() => setEditing({ categoria:'EVENTO', publicado:false })}><Icon name="plus" size={14} /> Nueva</button>
        </div>
      </div>
      {loading ? <div className="card" style={{ padding:32, textAlign:'center' }}>Cargando…</div> :
       items.length === 0 ? <div className="card" style={{ padding:32, textAlign:'center', color:'var(--fg-muted)' }}>Sin noticias.</div> : (
        <table className="admin-table">
          <thead><tr><th>Título</th><th>Categoría</th><th>Fecha</th><th>Publicado</th><th></th></tr></thead>
          <tbody>
            {items.map(n => (
              <tr key={n.id}>
                <td><strong>{n.titulo}</strong></td>
                <td><span className="badge">{n.categoria}</span></td>
                <td className="mono small">{n.fecha_publicacion ? new Date(n.fecha_publicacion).toLocaleDateString() : '—'}</td>
                <td>{n.publicado === true ? '✓' : '✗'}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="icon-btn" title={n.publicado?'Despublicar':'Publicar'} onClick={()=>togglePublish(n)} style={{ width:28, height:28 }}><Icon name="eye" size={13} /></button>
                    <button className="icon-btn" title="Editar" onClick={()=>setEditing(n)} style={{ width:28, height:28 }}><Icon name="edit" size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       )}
      <AdminModal open={!!editing} onClose={()=>setEditing(null)} wide
        title={editing && editing.id ? 'Editar noticia' : 'Nueva noticia'}
        footer={<>
          <button className="btn btn-ghost" onClick={()=>setEditing(null)}>Cancelar</button>
          <button className="btn btn-primary" onClick={save}>Guardar</button>
        </>}>
        {editing && (
          <>
            <AdminField label="Título *"><input className="input" value={editing.titulo||''} onChange={e=>setEditing({...editing, titulo:e.target.value})} /></AdminField>
            <AdminField label="Resumen *"><input className="input" value={editing.resumen||''} onChange={e=>setEditing({...editing, resumen:e.target.value})} /></AdminField>
            <AdminField label="Categoría *">
              <select className="select" value={editing.categoria||'EVENTO'} onChange={e=>setEditing({...editing, categoria:e.target.value})}>
                <option>EVENTO</option><option>ACADEMICO</option><option>INVESTIGACION</option><option>INSTITUCIONAL</option><option>INTERCAMBIO</option>
              </select>
            </AdminField>
            <AdminField label="Imagen de portada">
              <DriveImageInput value={editing.imagen_portada||''} onChange={v => setEditing({...editing, imagen_portada:v})} />
            </AdminField>
            <AdminField label="Contenido (Markdown) *"><textarea className="textarea" value={editing.contenido_md||''} onChange={e=>setEditing({...editing, contenido_md:e.target.value})} rows={8} /></AdminField>
            <AdminField label="Tags (separados por coma)"><input className="input" value={editing.tags||''} onChange={e=>setEditing({...editing, tags:e.target.value})} /></AdminField>
          </>
        )}
      </AdminModal>
    </>
  );
};

// ───── Sección: Formularios (CRUD para landing público) ─────
// Cada fila aquí aparece en la sección "Inscripciones" del landing como
// una card con flyer + descripción + CTA al link externo (Google Form,
// WhatsApp, Typeform, etc.). Pensado para convocatorias, cursos, sorteos.
const TIPOS_FORMULARIO = ['INSCRIPCION', 'EVENTO', 'CONVOCATORIA', 'ENCUESTA', 'OTRO'];

const AdminSectionFormularios = ({ toast }) => {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [editing, setEditing] = React.useState(null);
  const [importing, setImporting] = React.useState(false);
  const [importResult, setImportResult] = React.useState(null);

  const reload = async () => {
    setLoading(true);
    try { const r = await adminApi.get('formularios','list'); setItems(Array.isArray(r.data) ? r.data : []); }
    catch (e) { toast.push('Error: ' + e.message, 'error'); }
    setLoading(false);
  };
  React.useEffect(() => { reload(); }, []);

  const save = async () => {
    try {
      const isNew = !editing.id;
      await adminApi.post('formularios', isNew?'create':'update', editing);
      toast.push(isNew?'Formulario creado':'Formulario actualizado','ok');
      setEditing(null); reload();
    } catch (e) { toast.push(e.message,'error'); }
  };
  const remove = async (f) => {
    if (!confirm('¿Desactivar el formulario "' + f.titulo + '"?')) return;
    try { await adminApi.post('formularios','delete',{ id:f.id }); toast.push('Desactivado','ok'); reload(); }
    catch (e) { toast.push(e.message,'error'); }
  };
  const importarFromGoogleForm = async () => {
    setImporting(true);
    try {
      const r = await adminApi.post('miembros','importFromForm', {});
      setImportResult(r);
      toast.push(`Importados: ${r.insertados||0} · Duplicados: ${r.duplicados||0} · Errores: ${(r.errores||[]).length}`, 'ok');
    } catch (e) { toast.push(e.message, 'error'); setImportResult({ error: e.message }); }
    setImporting(false);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6" style={{ flexWrap:'wrap', gap:12 }}>
        <div>
          <h3 className="serif" style={{ fontSize:22 }}>Formularios &amp; Convocatorias</h3>
          <p className="small" style={{ color:'var(--fg-muted)', marginTop:4 }}>Cada uno aparece en la sección <strong>“Inscripciones”</strong> del landing público.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost" onClick={reload} style={{ padding:'10px 16px' }}>Recargar</button>
          <button className="btn btn-primary" onClick={() => setEditing({ tipo:'INSCRIPCION', destacado:false, activo:true, cta_label:'Inscríbete' })} style={{ padding:'10px 16px' }}>
            <Icon name="plus" size={14} /> Nuevo formulario
          </button>
        </div>
      </div>

      {loading ? <div className="card" style={{ padding:32, textAlign:'center' }}>Cargando…</div> :
       items.length === 0 ? (
         <div className="card" style={{ padding:48, textAlign:'center', color:'var(--fg-muted)' }}>
           <p style={{ marginBottom:16 }}>No hay formularios publicados aún.</p>
           <button className="btn btn-primary" onClick={() => setEditing({ tipo:'INSCRIPCION', destacado:false, activo:true, cta_label:'Inscríbete' })}>Publicar el primero</button>
         </div>
       ) : (
        <table className="admin-table">
          <thead><tr><th></th><th>Título</th><th>Tipo</th><th>Fecha límite</th><th>Activo</th><th></th></tr></thead>
          <tbody>
            {items.map(f => (
              <tr key={f.id}>
                <td>
                  {f.imagen_url ? (
                    <img src={IMG(f.imagen_url)} alt="" style={{ width:48, height:48, objectFit:'cover', borderRadius:8 }} onError={e => { e.currentTarget.style.display='none'; }} />
                  ) : (
                    <div style={{ width:48, height:48, borderRadius:8, background:'var(--bg-soft)' }} />
                  )}
                </td>
                <td>
                  <strong>{f.titulo}</strong>
                  {f.destacado && <span className="badge badge-gold" style={{ marginLeft:8 }}>★</span>}
                  <br/>
                  <a href={f.url} target="_blank" rel="noopener noreferrer" className="small" style={{ color:'var(--violet-600)' }}>{String(f.url||'').slice(0,60)}</a>
                </td>
                <td><span className="badge">{f.tipo}</span></td>
                <td className="mono small">{f.fecha_limite ? new Date(f.fecha_limite).toLocaleDateString() : '—'}</td>
                <td>{f.activo === true ? '✓' : '✗'}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="icon-btn" title="Editar" onClick={()=>setEditing(f)} style={{ width:28, height:28 }}><Icon name="edit" size={13} /></button>
                    <button className="icon-btn" title="Desactivar" onClick={()=>remove(f)} style={{ width:28, height:28 }}><Icon name="trash" size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       )}

      <div className="card mt-8" style={{ padding:'24px 28px', marginTop:32, background:'var(--bg-soft)' }}>
        <h4 className="serif" style={{ fontSize:18, marginBottom:8 }}>Importación desde Google Form de inscripción</h4>
        <p className="small" style={{ color:'var(--fg-soft)', marginBottom:16 }}>Lee la hoja <code>respuestas_form</code> e inserta nuevos miembros con estado <strong>PENDIENTE</strong>. Sólo para sincronizar con el form oficial de membresía.</p>
        <button className="btn btn-ghost" onClick={importarFromGoogleForm} disabled={importing}>
          {importing ? 'Importando…' : 'Importar respuestas a miembros'}
        </button>
        {importResult && (
          <pre style={{ marginTop:16, padding:14, fontSize:11, background:'var(--bg)', borderRadius:8, overflow:'auto', maxHeight:240, border:'1px solid var(--border)' }}>{JSON.stringify(importResult, null, 2)}</pre>
        )}
      </div>

      <AdminModal
        open={!!editing} onClose={()=>setEditing(null)} wide
        title={editing && editing.id ? 'Editar formulario' : 'Nuevo formulario / convocatoria'}
        footer={<>
          <button className="btn btn-ghost" onClick={()=>setEditing(null)}>Cancelar</button>
          <button className="btn btn-primary" onClick={save}>Guardar</button>
        </>}
      >
        {editing && (
          <div className="grid col-2 gap-4">
            <AdminField span label="Título *" hint="Ej: Curso Taller Pulso de Vida — Dominando Venas y Arterias">
              <input className="input" value={editing.titulo||''} onChange={e=>setEditing({...editing, titulo:e.target.value})} />
            </AdminField>
            <AdminField span label="URL del formulario externo *" hint="Google Form, WhatsApp, Typeform, etc.">
              <input className="input" type="url" value={editing.url||''} onChange={e=>setEditing({...editing, url:e.target.value})} placeholder="https://forms.gle/..." />
            </AdminField>
            <AdminField span label="Imagen / Flyer" hint="Pega un link de Google Drive (Compartir → Copiar enlace) o URL pública.">
              <DriveImageInput value={editing.imagen_url||''} onChange={v => setEditing({...editing, imagen_url:v})} />
            </AdminField>
            <AdminField label="Tipo *">
              <select className="select" value={editing.tipo||'INSCRIPCION'} onChange={e=>setEditing({...editing, tipo:e.target.value})}>
                {TIPOS_FORMULARIO.map(t => <option key={t}>{t}</option>)}
              </select>
            </AdminField>
            <AdminField label="Comité relacionado (opcional)">
              <select className="select" value={editing.comite_relacionado||''} onChange={e=>setEditing({...editing, comite_relacionado:e.target.value})}>
                <option value="">— Sin comité —</option>
                {COMITES_OPCIONES.map(c => <option key={c}>{c}</option>)}
              </select>
            </AdminField>
            <AdminField label="Fecha de inicio (opcional)">
              <input className="input" type="date" value={editing.fecha_inicio||''} onChange={e=>setEditing({...editing, fecha_inicio:e.target.value})} />
            </AdminField>
            <AdminField label="Fecha límite (opcional)">
              <input className="input" type="date" value={editing.fecha_limite||''} onChange={e=>setEditing({...editing, fecha_limite:e.target.value})} />
            </AdminField>
            <AdminField label="Texto del botón">
              <input className="input" value={editing.cta_label||'Inscríbete'} onChange={e=>setEditing({...editing, cta_label:e.target.value})} placeholder="Inscríbete" />
            </AdminField>
            <AdminField label="Destacado">
              <label className="flex items-center gap-2" style={{ marginTop:8 }}>
                <input type="checkbox" checked={!!editing.destacado} onChange={e=>setEditing({...editing, destacado:e.target.checked})} />
                <span className="small">Aparece primero en el landing</span>
              </label>
            </AdminField>
            <AdminField span label="Descripción">
              <textarea className="textarea" value={editing.descripcion||''} onChange={e=>setEditing({...editing, descripcion:e.target.value})} rows={4} placeholder="Para qué es el formulario, ponente, fecha, modalidad, requisitos..." />
            </AdminField>
            <AdminField label="Activo">
              <label className="flex items-center gap-2" style={{ marginTop:8 }}>
                <input type="checkbox" checked={editing.activo !== false} onChange={e=>setEditing({...editing, activo:e.target.checked})} />
                <span className="small">Visible en el sitio</span>
              </label>
            </AdminField>
          </div>
        )}
      </AdminModal>
    </>
  );
};

// ───── Sección: Sorteos (CRUD + realizar sorteo aleatorio) ─────
const ESTADOS_SORTEO = ['ABIERTO', 'CERRADO', 'REALIZADO', 'ARCHIVADO'];

const AdminSectionSorteos = ({ toast }) => {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [editing, setEditing] = React.useState(null);
  const [running, setRunning] = React.useState(null);     // sorteo siendo "realizado"
  const [winners, setWinners] = React.useState(null);     // resultado mostrado en modal

  const reload = async () => {
    setLoading(true);
    try { const r = await adminApi.get('sorteos','list'); setItems(Array.isArray(r.data) ? r.data : []); }
    catch (e) { toast.push('Error: ' + e.message, 'error'); }
    setLoading(false);
  };
  React.useEffect(() => { reload(); }, []);

  const openEdit = async (s) => {
    if (!s) {
      setEditing({ estado:'ABIERTO', activo:true, cantidad_ganadores:1, _participantes_text:'' });
      return;
    }
    // cargar detalle completo (incluye participantes para autenticado)
    try {
      const r = await adminApi.get('sorteos','get', { id: s.id });
      const full = r.data || r;
      setEditing({
        ...full,
        _participantes_text: (full.participantes || []).join('\n')
      });
    } catch (e) { toast.push(e.message,'error'); }
  };

  const save = async () => {
    try {
      const isNew = !editing.id;
      const participantes = (editing._participantes_text || '')
        .split('\n').map(s => s.trim()).filter(Boolean);
      const payload = { ...editing, participantes };
      delete payload._participantes_text;
      delete payload.participantes_json;
      delete payload.ganadores;
      delete payload.total_participantes;
      await adminApi.post('sorteos', isNew?'create':'update', payload);
      toast.push(isNew?'Sorteo creado':'Sorteo actualizado','ok');
      setEditing(null); reload();
    } catch (e) { toast.push(e.message,'error'); }
  };

  const importarMiembros = async () => {
    if (!editing || !editing.id) {
      toast.push('Guarda el sorteo primero antes de importar miembros', 'error');
      return;
    }
    const merge = confirm('¿Fusionar con la lista actual? (Cancelar = reemplazar)');
    try {
      const r = await adminApi.post('sorteos','importarMiembros', {
        id: editing.id, soloActivos: true, merge: merge
      });
      toast.push(`Total participantes: ${r.data.total_participantes} (importados: ${r.data.importados})`, 'ok');
      // recargar el editing con nuevos participantes
      const fresh = await adminApi.get('sorteos','get', { id: editing.id });
      setEditing(prev => ({
        ...prev,
        _participantes_text: ((fresh.data || fresh).participantes || []).join('\n')
      }));
    } catch (e) { toast.push(e.message,'error'); }
  };

  const realizar = async (s) => {
    if (!confirm(`¿Realizar sorteo "${s.titulo}" ahora? Se elegirán ${s.cantidad_ganadores} ganador(es) al azar.`)) return;
    setRunning(s.id);
    try {
      const r = await adminApi.post('sorteos','realizar', { id: s.id });
      setWinners({ titulo: s.titulo, ganadores: r.data.ganadores, total: r.data.total_participantes });
      toast.push('Sorteo realizado · ' + (r.data.ganadores || []).length + ' ganador(es)', 'ok');
      reload();
    } catch (e) { toast.push(e.message,'error'); }
    setRunning(null);
  };

  const remove = async (s) => {
    if (!confirm('¿Desactivar el sorteo "' + s.titulo + '"?')) return;
    try { await adminApi.post('sorteos','delete',{ id:s.id }); toast.push('Desactivado','ok'); reload(); }
    catch (e) { toast.push(e.message,'error'); }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6" style={{ flexWrap:'wrap', gap:12 }}>
        <div>
          <h3 className="serif" style={{ fontSize:22 }}>Sorteos</h3>
          <p className="small" style={{ color:'var(--fg-muted)', marginTop:4 }}>Crea sorteos, agrega participantes (manual o desde miembros) y realiza el sorteo aleatorio.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost" onClick={reload} style={{ padding:'10px 16px' }}>Recargar</button>
          <button className="btn btn-primary" onClick={() => openEdit(null)} style={{ padding:'10px 16px' }}>
            <Icon name="plus" size={14} /> Nuevo sorteo
          </button>
        </div>
      </div>

      {loading ? <div className="card" style={{ padding:32, textAlign:'center' }}>Cargando…</div> :
       items.length === 0 ? (
         <div className="card" style={{ padding:48, textAlign:'center', color:'var(--fg-muted)' }}>
           <p style={{ marginBottom:16 }}>No hay sorteos creados aún.</p>
           <button className="btn btn-primary" onClick={() => openEdit(null)}>Crear el primero</button>
         </div>
       ) : (
        <table className="admin-table">
          <thead><tr><th>Título</th><th>Estado</th><th>Participantes</th><th>Ganadores</th><th>Realizado</th><th></th></tr></thead>
          <tbody>
            {items.map(s => (
              <tr key={s.id}>
                <td><strong>{s.titulo}</strong></td>
                <td><EstadoBadge value={s.estado === 'ABIERTO' ? 'PENDIENTE' : s.estado === 'REALIZADO' ? 'ACTIVO' : 'INACTIVO'} /></td>
                <td>{s.total_participantes || 0}</td>
                <td>
                  {Array.isArray(s.ganadores) && s.ganadores.length > 0
                    ? <span className="small">{s.ganadores.slice(0,3).join(', ')}{s.ganadores.length > 3 ? ` +${s.ganadores.length-3}` : ''}</span>
                    : <span className="small" style={{ color:'var(--fg-muted)' }}>—</span>}
                </td>
                <td className="mono small">{s.fecha_realizado ? new Date(s.fecha_realizado).toLocaleString().slice(0,16) : '—'}</td>
                <td>
                  <div className="flex gap-2">
                    {s.estado !== 'REALIZADO' && (
                      <button className="icon-btn" title="Realizar sorteo" disabled={running===s.id} onClick={()=>realizar(s)} style={{ width:28, height:28, color:'var(--violet-700)' }}>
                        <Icon name="sparkle" size={13} />
                      </button>
                    )}
                    <button className="icon-btn" title="Editar" onClick={()=>openEdit(s)} style={{ width:28, height:28 }}><Icon name="edit" size={13} /></button>
                    <button className="icon-btn" title="Desactivar" onClick={()=>remove(s)} style={{ width:28, height:28 }}><Icon name="trash" size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       )}

      {/* Modal crear/editar sorteo */}
      <AdminModal
        open={!!editing} onClose={()=>setEditing(null)} wide
        title={editing && editing.id ? 'Editar sorteo' : 'Nuevo sorteo'}
        footer={<>
          <button className="btn btn-ghost" onClick={()=>setEditing(null)}>Cancelar</button>
          {editing && editing.id && (
            <button className="btn btn-ghost" onClick={importarMiembros}>Importar miembros activos</button>
          )}
          <button className="btn btn-primary" onClick={save}>Guardar</button>
        </>}
      >
        {editing && (
          <div className="grid col-2 gap-4">
            <AdminField span label="Título *"><input className="input" value={editing.titulo||''} onChange={e=>setEditing({...editing, titulo:e.target.value})} /></AdminField>
            <AdminField span label="Imagen / Flyer">
              <DriveImageInput value={editing.imagen_url||''} onChange={v => setEditing({...editing, imagen_url:v})} />
            </AdminField>
            <AdminField label="Estado">
              <select className="select" value={editing.estado||'ABIERTO'} onChange={e=>setEditing({...editing, estado:e.target.value})}>
                {ESTADOS_SORTEO.map(s => <option key={s}>{s}</option>)}
              </select>
            </AdminField>
            <AdminField label="Cantidad de ganadores *">
              <input className="input" type="number" min="1" value={editing.cantidad_ganadores||1} onChange={e=>setEditing({...editing, cantidad_ganadores:Number(e.target.value)})} />
            </AdminField>
            <AdminField label="Fecha inicio">
              <input className="input" type="datetime-local" value={editing.fecha_inicio||''} onChange={e=>setEditing({...editing, fecha_inicio:e.target.value})} />
            </AdminField>
            <AdminField label="Fecha fin (cierre de inscripciones)">
              <input className="input" type="datetime-local" value={editing.fecha_fin||''} onChange={e=>setEditing({...editing, fecha_fin:e.target.value})} />
            </AdminField>
            <AdminField label="Comité relacionado">
              <select className="select" value={editing.comite_relacionado||''} onChange={e=>setEditing({...editing, comite_relacionado:e.target.value})}>
                <option value="">— Sin comité —</option>
                {COMITES_OPCIONES.map(c => <option key={c}>{c}</option>)}
              </select>
            </AdminField>
            <AdminField label="Activo">
              <label className="flex items-center gap-2" style={{ marginTop:8 }}>
                <input type="checkbox" checked={editing.activo !== false} onChange={e=>setEditing({...editing, activo:e.target.checked})} />
                <span className="small">Visible en el sitio</span>
              </label>
            </AdminField>
            <AdminField span label="Descripción">
              <textarea className="textarea" value={editing.descripcion||''} onChange={e=>setEditing({...editing, descripcion:e.target.value})} rows={3} />
            </AdminField>
            <AdminField span label={`Participantes (un nombre por línea — total: ${(editing._participantes_text||'').split('\n').filter(s=>s.trim()).length})`} hint="Botón “Importar miembros activos” en el footer puebla esta lista desde la hoja miembros.">
              <textarea className="textarea" rows={10} value={editing._participantes_text||''} onChange={e=>setEditing({...editing, _participantes_text:e.target.value})} placeholder={"Yessica Ruth Puma\nMarvin Fernando Cruz Maron\n..."} style={{ fontFamily:'var(--font-mono)', fontSize:12 }} />
            </AdminField>
          </div>
        )}
      </AdminModal>

      {/* Modal de resultado de sorteo */}
      <AdminModal
        open={!!winners} onClose={()=>setWinners(null)}
        title={'🎉 Sorteo realizado'}
        footer={<button className="btn btn-primary" onClick={()=>setWinners(null)}>Listo</button>}
      >
        {winners && (
          <div style={{ textAlign:'center', padding:'12px 0' }}>
            <p style={{ marginBottom:16, color:'var(--fg-soft)' }}>De {winners.total} participantes en <strong>{winners.titulo}</strong>:</p>
            <div className="grid gap-3" style={{ marginTop:24 }}>
              {(winners.ganadores || []).map((g, i) => (
                <div key={i} className="card" style={{ padding:'18px 20px', background:'linear-gradient(135deg, var(--violet-50) 0%, var(--bg) 100%)', border:'2px solid var(--violet-300)' }}>
                  <div className="mono small" style={{ color:'var(--violet-700)' }}>GANADOR {i + 1}</div>
                  <div className="serif" style={{ fontSize:24, marginTop:6 }}>{g}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </AdminModal>
    </>
  );
};

// ───── Sección: Configuración ─────
const AdminSectionConfig = ({ toast }) => {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [editing, setEditing] = React.useState(null);
  const reload = async () => {
    setLoading(true);
    try { const r = await adminApi.get('admin','configList'); setItems(Array.isArray(r.data) ? r.data : []); }
    catch (e) { toast.push(e.message,'error'); }
    setLoading(false);
  };
  React.useEffect(() => { reload(); }, []);
  const save = async () => {
    try {
      await adminApi.post('admin','configUpdate', { clave: editing.clave, valor: editing.valor });
      toast.push('Configuración guardada','ok'); setEditing(null); reload();
    } catch (e) { toast.push(e.message,'error'); }
  };
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="serif" style={{ fontSize:22 }}>Variables del sitio</h3>
          <p className="small" style={{ color:'var(--fg-muted)' }}>Edita correos, URLs y otras claves de la hoja <code>config</code>.</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-ghost" onClick={reload}>Recargar</button>
          <button className="btn btn-primary" onClick={() => setEditing({ clave:'', valor:'' })}><Icon name="plus" size={14} /> Nueva clave</button>
        </div>
      </div>
      {loading ? <div className="card" style={{ padding:32, textAlign:'center' }}>Cargando…</div> :
       items.length === 0 ? <div className="card" style={{ padding:32, textAlign:'center' }}>Sin configuración.</div> : (
        <table className="admin-table">
          <thead><tr><th>Clave</th><th>Valor</th><th></th></tr></thead>
          <tbody>
            {items.map(c => (
              <tr key={c.clave}>
                <td><strong className="mono">{c.clave}</strong></td>
                <td className="small" style={{ wordBreak:'break-all' }}>{String(c.valor||'').slice(0,140)}</td>
                <td><button className="icon-btn" onClick={()=>setEditing({...c})} style={{ width:28, height:28 }}><Icon name="edit" size={13} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
       )}
      <AdminModal open={!!editing} onClose={()=>setEditing(null)}
        title="Configuración"
        footer={<>
          <button className="btn btn-ghost" onClick={()=>setEditing(null)}>Cancelar</button>
          <button className="btn btn-primary" onClick={save}>Guardar</button>
        </>}>
        {editing && (<>
          <AdminField label="Clave *"><input className="input" value={editing.clave||''} onChange={e=>setEditing({...editing, clave:e.target.value})} /></AdminField>
          <AdminField label="Valor *"><textarea className="textarea" value={editing.valor||''} onChange={e=>setEditing({...editing, valor:e.target.value})} rows={4} /></AdminField>
        </>)}
      </AdminModal>
    </>
  );
};

// ───── Sección: Usuarios admin ─────
const AdminSectionUsuarios = ({ toast }) => {
  const [items, setItems] = React.useState([]);
  const [editing, setEditing] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const reload = async () => {
    setLoading(true);
    try { const r = await adminApi.get('admin','usuariosList'); setItems(Array.isArray(r.data) ? r.data : []); }
    catch (e) { toast.push(e.message,'error'); }
    setLoading(false);
  };
  React.useEffect(() => { reload(); }, []);
  const save = async () => {
    try {
      const action = editing.id ? 'usuarioUpdate' : 'usuarioCreate';
      await adminApi.post('admin', action, editing);
      toast.push(editing.id?'Usuario actualizado':'Usuario creado','ok');
      setEditing(null); reload();
    } catch (e) { toast.push(e.message,'error'); }
  };
  const reset = async (u) => {
    const newPassword = prompt('Nueva contraseña para ' + u.username + ' (mín 8 caracteres):');
    if (!newPassword) return;
    try { await adminApi.post('admin','usuarioResetPassword',{ id:u.id, newPassword }); toast.push('Password reseteada','ok'); }
    catch (e) { toast.push(e.message,'error'); }
  };
  const remove = async (u) => {
    if (!confirm('¿Desactivar a ' + u.username + '?')) return;
    try { await adminApi.post('admin','usuarioDelete',{ id:u.id }); toast.push('Desactivado','ok'); reload(); }
    catch (e) { toast.push(e.message,'error'); }
  };
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="serif" style={{ fontSize:22 }}>Usuarios admin</h3>
        <button className="btn btn-primary" onClick={() => setEditing({ rol:'EDITOR', activo:true })}><Icon name="plus" size={14} /> Nuevo usuario</button>
      </div>
      {loading ? <div className="card" style={{ padding:32, textAlign:'center' }}>Cargando…</div> :
        <table className="admin-table">
          <thead><tr><th>Usuario</th><th>Nombre</th><th>Rol</th><th>Activo</th><th>Último login</th><th></th></tr></thead>
          <tbody>
            {items.map(u => (
              <tr key={u.id}>
                <td><strong className="mono">{u.username}</strong></td>
                <td>{u.nombre}</td>
                <td><span className="badge">{u.rol}</span></td>
                <td>{u.activo === true ? '✓' : '✗'}</td>
                <td className="mono small">{u.ultimo_login ? new Date(u.ultimo_login).toLocaleString().slice(0,16) : '—'}</td>
                <td>
                  <div className="flex gap-2">
                    <button className="icon-btn" title="Editar" onClick={()=>setEditing(u)} style={{ width:28, height:28 }}><Icon name="edit" size={13} /></button>
                    <button className="icon-btn" title="Reset password" onClick={()=>reset(u)} style={{ width:28, height:28 }}><Icon name="lock" size={13} /></button>
                    <button className="icon-btn" title="Desactivar" onClick={()=>remove(u)} style={{ width:28, height:28 }}><Icon name="trash" size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>}
      <AdminModal open={!!editing} onClose={()=>setEditing(null)}
        title={editing && editing.id ? 'Editar usuario' : 'Nuevo usuario'}
        footer={<>
          <button className="btn btn-ghost" onClick={()=>setEditing(null)}>Cancelar</button>
          <button className="btn btn-primary" onClick={save}>Guardar</button>
        </>}>
        {editing && (
          <>
            <AdminField label="Username *"><input className="input" value={editing.username||''} onChange={e=>setEditing({...editing, username:e.target.value})} disabled={!!editing.id} /></AdminField>
            <AdminField label="Nombre *"><input className="input" value={editing.nombre||''} onChange={e=>setEditing({...editing, nombre:e.target.value})} /></AdminField>
            <AdminField label="Rol *">
              <select className="select" value={editing.rol||'EDITOR'} onChange={e=>setEditing({...editing, rol:e.target.value})}>
                <option>SUPER_ADMIN</option><option>EDITOR</option><option>MODERADOR</option>
              </select>
            </AdminField>
            {!editing.id && (
              <AdminField label="Password inicial *" hint="Mínimo 8 caracteres">
                <input className="input" type="password" value={editing.password||''} onChange={e=>setEditing({...editing, password:e.target.value})} />
              </AdminField>
            )}
            <AdminField label="Activo">
              <label className="flex items-center gap-2"><input type="checkbox" checked={editing.activo !== false} onChange={e=>setEditing({...editing, activo:e.target.checked})} /><span className="small">Habilitado</span></label>
            </AdminField>
          </>
        )}
      </AdminModal>
    </>
  );
};

const ADMIN_SECTIONS = {
  dashboard:   { title: 'Dashboard',                component: 'AdminDashV6' },
  miembros:    { title: 'Miembros',                 Component: AdminSectionMiembros },
  solicitudes: { title: 'Solicitudes de acceso',    component: 'AdminSolicitudes' },
  eventos:     { title: 'Eventos',                  component: 'AdminEventos' },
  evaluaciones:{ title: 'Evaluaciones',             component: 'AdminEvaluaciones' },
  certificados:{ title: 'Certificados',             component: 'AdminCertificados' },
  personas:    { title: 'Personas',                 component: 'AdminPersonas' },
  productos:   { title: 'Tienda · Productos',       component: 'AdminProductos' },
  pedidos:     { title: 'Tienda · Pedidos',         component: 'AdminPedidos' },
  directorio:  { title: 'Directorio institucional', Component: AdminSectionDirectorio },
  comites:     { title: 'Comités',                  Component: AdminSectionComites },
  noticias:    { title: 'Noticias / Diario científico', component: 'AdminNoticias' },
  formularios: { title: 'Formularios & Convocatorias', Component: AdminSectionFormularios },
  sorteos:     { title: 'Sorteos',                  Component: AdminSectionSorteos },
  config:      { title: 'Configuración',            Component: AdminSectionConfig },
  usuarios:    { title: 'Usuarios admin',           Component: AdminSectionUsuarios },
};
window.ADMIN_SECTIONS = ADMIN_SECTIONS;

const AdminDashboard = ({ onLogout, user }) => {
  const [active, setActive] = React.useState('dashboard');
  const toast = useToast();
  const Current = ADMIN_SECTIONS[active] || ADMIN_SECTIONS.dashboard;
  // Las secciones de pages-4 se declaran por nombre y se resuelven aquí.
  const CurrentComp = Current.Component || window[Current.component];
  const userInitials = ((user && (user.nombre || user.username)) || 'AD')
    .split(' ').map(s => s[0]).filter(Boolean).slice(0,2).join('').toUpperCase();

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand"><Logo size={32} /><Wordmark inverse /></div>
        <nav className="admin-nav">
          {ADMIN_NAV.map(group => (
            <div key={group.section}>
              <div className="admin-nav-section">{group.section}</div>
              {group.items.map(it => (
                <a key={it.id} href="#" className={active === it.id ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActive(it.id); }}>
                  <Icon name={it.icon} size={16} />
                  <span style={{ flex: 1 }}>{it.label}</span>
                </a>
              ))}
            </div>
          ))}
        </nav>
        <div style={{ position: 'absolute', bottom: 24, left: 16, right: 16 }}>
          <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }} style={{ display: 'flex', gap: 12, padding: '10px 12px', borderRadius: 8, color: '#807A8C', fontSize: 13, alignItems: 'center' }}>
            <Icon name="logout" size={14} /> Cerrar sesión
          </a>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-topbar">
          <div>
            <div className="mono small" style={{ color: 'var(--fg-muted)' }}>SOCIEM-UNA · ADMIN</div>
            <div className="serif" style={{ fontSize: 22, marginTop: 2 }}>{Current.title}</div>
          </div>
          <div className="flex gap-3 items-center">
            <span className="small" style={{ color: 'var(--fg-muted)' }}>{user ? (user.username + ' · ' + (user.rol || '')) : ''}</span>
            <div style={{ width: 36, height: 36, borderRadius: 99, background: 'var(--violet-600)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 13 }}>{userInitials}</div>
          </div>
        </div>

        <div className="admin-content">
          {CurrentComp
            ? <CurrentComp toast={toast} user={user} go={setActive} />
            : <div className="card" style={{ padding: 32, color: 'var(--fg-muted)' }}>Esta sección no está disponible: no cargó <code>components/pages-4.jsx</code>. Recarga la página.</div>}
        </div>
      </main>

      {toast.node}
    </div>
  );
};

const AdminPage = () => {
  // Hidrata sesión desde localStorage si ya hay token
  const initialUser = (typeof window !== 'undefined' && window.SOCIEM_API && window.SOCIEM_API.currentUser)
    ? window.SOCIEM_API.currentUser() : null;
  const [user, setUser] = React.useState(initialUser);

  const handleLogout = () => {
    if (window.SOCIEM_API && window.SOCIEM_API.logout) window.SOCIEM_API.logout();
    setUser(null);
  };

  return user
    ? <AdminDashboard onLogout={handleLogout} user={user} />
    : <AdminLogin onLogin={(u) => setUser(u || { username: 'admin' })} />;
};

Object.assign(window, { MiembrosPage, ActividadesPage, ContactoPage, AdminPage });
