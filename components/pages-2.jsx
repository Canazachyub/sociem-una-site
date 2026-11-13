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

// Iniciales para avatares sin foto ("Ana Patricia" → "AP").
const p2Iniciales = (txt) => String(txt || '').split(/\s+/).filter(Boolean).map(s => s[0]).slice(0, 2).join('').toUpperCase() || '?';
// "PENDIENTE" → "Pendiente" (solo presentación; el valor real no cambia).
const p2Titulo = (txt) => { const s = String(txt || '').replace(/_/g, ' ').toLowerCase(); return s.charAt(0).toUpperCase() + s.slice(1); };

// Tarjeta de miembro estilo Green Deck: foto cuadrada que escala al hover,
// logo del comité en la esquina y, si la foto no carga, las iniciales.
const MiembroCard = ({ m }) => {
  const [rota, setRota] = React.useState(false);
  const logo = comiteLogoUrl(m.comite);
  return (
    <article className="card pm-card">
      <div className="avatar">
        {m.foto && !rota
          ? <img src={m.foto} alt={m.nombre} loading="lazy" onError={() => setRota(true)} />
          : <div className="pm-initials" aria-hidden="true">{p2Iniciales(m.nombre)}</div>}
        {logo && (
          <span className="avatar-badge" title={m.comite}>
            <img src={logo} alt={m.comite} />
          </span>
        )}
      </div>
      <div className="pm-name">{m.nombre}</div>
      <div className="pm-role">{m.cargo}</div>
      <div className="pm-foot">
        <span className="pm-comite"><span className="adm-dot" style={{ background: m.comiteColor }} />{m.comite}</span>
        <span className="mono">{m.year} · {m.semester}</span>
      </div>
    </article>
  );
};

const MiembrosPage = () => {
  const [filterYear, setFilterYear] = React.useState('todos');
  const [filterComite, setFilterComite] = React.useState('todos');
  const [q, setQ] = React.useState('');
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
  const colorDe = (c) => { const m = source.find(x => x.comite === c); return m ? m.comiteColor : 'var(--primary)'; };
  const texto = q.trim().toLowerCase();
  const filtered = source.filter(m =>
    (filterYear === 'todos' || m.year === filterYear) &&
    (filterComite === 'todos' || m.comite === filterComite) &&
    (!texto || (m.nombre + ' ' + m.cargo + ' ' + m.comite).toLowerCase().includes(texto))
  );
  return (
    <div className="page-fade">
      <PageHero
        img="assets/banners/directorio-banner.jpg"
        eyebrow="Miembros · Periodo 2026"
        title={<>{source.length} miembros, <em>una sola sociedad.</em></>}
        lede="Galería pública del equipo de SOCIEM-UNA, gestión 2026: la directiva, los comités y las divisiones que hacen posible la sociedad."
      />

      <section className="p2-section">
        <div className="container">
          <div className="pm-toolbar">
            <AdmSearch value={q} onChange={setQ} placeholder="Buscar por nombre o cargo" />
            <select className="select adm-select" aria-label="Año académico" value={filterYear} onChange={e => setFilterYear(e.target.value)}>
              <option value="todos">Todos los años</option>
              {['1°','2°','3°','4°','5°','6°'].map(y => <option key={y} value={y}>{y} año</option>)}
            </select>
            <span className="adm-toolbar-spacer" />
            <span className="adm-count">{filtered.length} de {source.length}</span>
          </div>
          <AdmChips
            value={filterComite}
            onChange={setFilterComite}
            options={[{ value: 'todos', label: 'Todos los comités' }].concat(comitesUnicos.map(c => ({ value: c, label: c, dot: colorDe(c) })))}
          />

          {filtered.length === 0 ? (
            <AdmEmpty img="assets/mascota/mascota-investiga.png?v=3" title="Nadie con esos filtros"
              action={<button className="btn btn-ghost" onClick={() => { setQ(''); setFilterYear('todos'); setFilterComite('todos'); }}>Limpiar filtros</button>}>
              Prueba con otro comité, otro año o un nombre distinto.
            </AdmEmpty>
          ) : (
            <div className="pm-grid">
              {filtered.map((m, i) => <MiembroCard key={m.nombre + i} m={m} />)}
            </div>
          )}
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
  const partes = (f) => { const m = String(f).match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? { dia: m[3], mes: MESES[Number(m[2]) - 1], anio: m[1] } : { dia: '—', mes: '', anio: '' }; };
  const tags = ['todos'].concat(Array.from(new Set((items || []).map(i => i.tag).filter(Boolean))).sort());
  const filtered = (items || []).filter(i => tag === 'todos' || i.tag === tag);

  return (
    <div className="page-fade">
      <PageHero
        img="assets/banners/eventos-banner.jpg"
        eyebrow="Actividades · Bitácora"
        title={<>Lo que estamos <em>construyendo.</em></>}
        lede="Eventos y publicaciones de la sociedad, del más reciente al más antiguo."
      />

      <section className="p2-section">
        <div className="container">
          {fallo ? <LoadErrorCard onRetry={cargar}>No pudimos cargar las actividades. Revisa tu conexión e inténtalo de nuevo.</LoadErrorCard>
          : items === null ? (
            <div className="pa-list" aria-busy="true" aria-label="Cargando actividades">
              {[0, 1, 2, 3].map(i => <div key={i} className="skeleton pa-skel" />)}
            </div>
          ) : items.length === 0 ? (
            <AdmEmpty img="assets/mascota/mascota-investiga.png?v=3" title="Aún no hay actividades registradas"
              action={<a className="btn btn-primary" href="#/eventos">Ver próximos eventos</a>}>
              Cuando publiquemos eventos o noticias aparecerán aquí, en orden cronológico.
            </AdmEmpty>
          ) : (
          <>
          {tags.length > 2 && (
            <AdmChips value={tag} onChange={setTag}
              options={tags.map(t => ({ value: t, label: t === 'todos' ? 'Todo' : t }))} />
          )}

          <div className="pa-list">
            {filtered.map((it, i) => {
              const p = partes(it.fecha);
              return (
                <article key={i} className="pa-item">
                  <div className="pa-date">
                    <strong>{p.dia}</strong>
                    <span>{p.mes}</span>
                    <em>{p.anio}</em>
                  </div>
                  <div className="pa-main">
                    <div className="pa-tags">
                      <span className={'badge ' + (it.tipo === 'EVENTO' ? 'badge-violet' : '')}>{it.tipo}</span>
                      <span className="pa-tag">{it.tag}</span>
                    </div>
                    <h3 className="pa-title">{it.title}</h3>
                    {it.body && <p className="pa-desc">{String(it.body).slice(0, 220)}</p>}
                  </div>
                  <a className="action-circle pa-go" href={it.go} aria-label={'Ver ' + (it.title || 'actividad')}>
                    <Icon name="arrowUpRight" size={18} />
                  </a>
                </article>
              );
            })}
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
// Teselas de OSM oscurecidas por CSS (.osm-dark). CARTO dark_all ya no sirve
// sin API key: responde 200 con una tesela que dice "API KEY REQUIRED", así
// que ni siquiera dispara tileerror.
const UnaPunoMap = () => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!ref.current || !window.L) return;
    const L = window.L;
    const centro = [-15.8264, -70.0143];
    const map = L.map(ref.current, { scrollWheelZoom: false }).setView(centro, 16);
    ref.current.classList.add('osm-dark');
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>', maxZoom: 19
    }).addTo(map);
    const pin = L.divIcon({ className: 'pc-pin-wrap', html: '<span class="pc-pin"></span>', iconSize: [18, 18], iconAnchor: [9, 9], popupAnchor: [0, -12] });
    L.marker(centro, { icon: pin })
      .addTo(map)
      .bindPopup('<strong>SOCIEM-UNA</strong><br/>Facultad de Medicina Humana<br/>Av. Floral 1153 · UNA Puno')
      .openPopup();
    return () => map.remove();
  }, []);
  return <div ref={ref} className="pc-map" role="region" aria-label="Mapa de la Facultad de Medicina Humana, UNA Puno" />;
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
  const comoLlegar = 'https://www.google.com/maps/dir/?api=1&destination=-15.8264,-70.0143';
  // El @ visible sale de la URL configurada, para que nunca contradiga al enlace.
  const igMatch = String(instagram).match(/instagram\.com\/([^/?#]+)/);
  const igHandle = igMatch ? '@' + igMatch[1] : 'Síguenos';
  return (
  <div className="page-fade">
    <PageHero
      img="assets/banners/contacto-banner.jpg"
      eyebrow="Contacto"
      title={<>Hablemos, <em>desde Puno.</em></>}
      lede="¿Quieres colaborar con SOCIEM-UNA, invitarnos a un evento o sumarte como aliado institucional? Escríbenos."
    />

    <section className="p2-section">
      <div className="container">
        <div className="pc-layout">
          <div className="card pc-form">
            {envio === 'ok' ? (
              <div className="pc-success" role="status">
                <img src="assets/mascota/mascota-formulario.png?v=3" alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <div className="adm-overline">Recibido</div>
                <h2 className="mt-2">Mensaje enviado</h2>
                <p className="small mt-2">Gracias por escribirnos. Te responderemos al correo que indicaste.</p>
                <button className="btn btn-ghost mt-6" onClick={() => setEnvio('idle')}>Enviar otro mensaje</button>
              </div>
            ) : (
            <>
              <div className="adm-overline">Formulario</div>
              <h2 className="mt-2">Escríbenos</h2>
              <p className="small mt-2">Tu mensaje llega directo al correo institucional de la sociedad.</p>
              <form className="adm-form-grid pc-fields" onSubmit={enviar}>
                <div className="adm-field">
                  <label className="adm-field-label" htmlFor="pc-nombre">Nombre</label>
                  <input id="pc-nombre" className="input" placeholder="Tu nombre completo" autoComplete="name" value={msg.nombre} onChange={(e) => setMsg({ ...msg, nombre: e.target.value })} required />
                </div>
                <div className="adm-field">
                  <label className="adm-field-label" htmlFor="pc-email">Email</label>
                  <input id="pc-email" className="input" type="email" placeholder="tu@email.com" autoComplete="email" value={msg.email} onChange={(e) => setMsg({ ...msg, email: e.target.value })} required />
                </div>
                <div className="adm-field adm-span-2">
                  <label className="adm-field-label" htmlFor="pc-asunto">Asunto</label>
                  <select id="pc-asunto" className="select" value={msg.asunto} onChange={(e) => setMsg({ ...msg, asunto: e.target.value })}><option>Quiero colaborar</option><option>Invitación a evento</option><option>Aliado institucional</option><option>Información general</option></select>
                </div>
                <div className="adm-field adm-span-2">
                  <label className="adm-field-label" htmlFor="pc-mensaje">Mensaje</label>
                  <textarea id="pc-mensaje" className="textarea" placeholder="Cuéntanos en qué podemos ayudarte..." value={msg.mensaje} onChange={(e) => setMsg({ ...msg, mensaje: e.target.value })} required />
                </div>
                {envio === 'error' && envioErr && (
                  <div className="adm-error adm-span-2" role="alert"><Icon name="close" size={14} /><span>{envioErr}</span></div>
                )}
                <div className="adm-span-2 pc-submit">
                  <button className="btn btn-primary" disabled={envio === 'enviando'}>
                    {envio === 'enviando' ? <><span className="adm-spinner" /> Enviando…</> : <>Enviar mensaje <Icon name="arrow" size={14} /></>}
                  </button>
                </div>
              </form>
            </>
            )}
          </div>

          <aside className="pc-side">
            <div className="adm-overline muted">Canales directos</div>
            <div className="pc-channels">
              <a className="pc-channel" href={'mailto:' + email}>
                <span className="pc-channel-ico"><Icon name="mail" size={18} /></span>
                <span className="pc-channel-txt"><span className="label">Email</span><strong>{email}</strong></span>
                <Icon name="arrowUpRight" size={16} className="pc-channel-go" />
              </a>
              <a className="pc-channel" href={comoLlegar} target="_blank" rel="noopener noreferrer">
                <span className="pc-channel-ico gold"><Icon name="pin" size={18} /></span>
                <span className="pc-channel-txt"><span className="label">Ubicación</span><strong>Av. Floral 1153, Puno · FMH UNA</strong></span>
                <Icon name="arrowUpRight" size={16} className="pc-channel-go" />
              </a>
              <div className="pc-channel">
                <span className="pc-channel-ico"><Icon name="phone" size={18} /></span>
                <span className="pc-channel-txt"><span className="label">Teléfono</span><strong>+51 (51) 365-3000 anx. Medicina</strong></span>
              </div>
              <a className="pc-channel" href={facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook de SOCIEM-UNA">
                <span className="pc-channel-ico"><Icon name="facebook" size={18} /></span>
                <span className="pc-channel-txt"><span className="label">Facebook</span><strong>SOCIEM-UNA Puno</strong></span>
                <Icon name="arrowUpRight" size={16} className="pc-channel-go" />
              </a>
              <a className="pc-channel" href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram de SOCIEM-UNA">
                <span className="pc-channel-ico"><Icon name="instagram" size={18} /></span>
                <span className="pc-channel-txt"><span className="label">Instagram</span><strong>{igHandle}</strong></span>
                <Icon name="arrowUpRight" size={16} className="pc-channel-go" />
              </a>
            </div>
          </aside>
        </div>

        <div className="pc-map-wrap">
          <UnaPunoMap />
          <div className="pc-map-cap">
            <div>
              <div className="adm-overline muted">Dónde estamos</div>
              <div className="pc-map-addr">Facultad de Medicina Humana · Ciudad Universitaria, UNA Puno</div>
            </div>
            <a className="btn btn-ghost btn-sm" href={comoLlegar} target="_blank" rel="noopener noreferrer">Cómo llegar <Icon name="arrowUpRight" size={14} /></a>
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
  const [mayus, setMayus] = React.useState(false);

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
  // Aviso de Bloq Mayús: la causa más común de "contraseña incorrecta".
  const leerMayus = (e) => { if (e.getModifierState) setMayus(e.getModifierState('CapsLock')); };
  const userMal = !!error && !user;
  const passMal = !!error && !!user;

  return (
    <div className="adm-login">
      <aside className="adm-login-art">
        <img
          src="assets/hero/admin-login.jpg" alt=""
          onError={(e) => { const el = e.currentTarget; if (!el.dataset.fb) { el.dataset.fb = '1'; el.src = 'assets/hero/hero-altiplano.jpg'; } else { el.style.display = 'none'; } }}
        />
        <div className="hero-grain" aria-hidden="true" />
        <div className="adm-login-art-inner">
          <a className="adm-login-brand" href="#/home" aria-label="Volver al sitio de SOCIEM-UNA">
            <Logo size={40} /><Wordmark inverse />
          </a>
          <div className="adm-login-quote">
            <div className="adm-overline">Panel interno</div>
            <h2>La ciencia se organiza <em>desde el altiplano.</em></h2>
            <p>Eventos, certificados, miembros y tienda de SOCIEM-UNA en un solo lugar.</p>
          </div>
        </div>
      </aside>

      <main className="adm-login-panel">
        <div className="adm-login-box">
          <img className="adm-login-mascota" src="assets/mascota/mascota-laptop.png?v=3" alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <div className="adm-overline">Acceso interno</div>
          <h1>Panel administrativo</h1>
          <p className="adm-login-sub">Ingresa con tus credenciales SOCIEM-UNA.</p>
          <form className="adm-login-form" onSubmit={submit} noValidate>
            <div className="adm-field">
              <label className="adm-field-label" htmlFor="adm-user">Usuario</label>
              <input id="adm-user" className={'input' + (userMal ? ' is-invalid' : '')} value={user}
                onChange={e => { setUser(e.target.value); if (error) setError(''); }}
                placeholder="admin" autoComplete="username" aria-invalid={userMal} />
            </div>
            <div className="adm-field">
              <label className="adm-field-label" htmlFor="adm-pass">Contraseña</label>
              <div className="adm-pass">
                <input id="adm-pass" className={'input' + (passMal ? ' is-invalid' : '')} type={showPass ? 'text' : 'password'} value={pass}
                  onChange={e => { setPass(e.target.value); if (error) setError(''); }}
                  onKeyUp={leerMayus} onKeyDown={leerMayus}
                  placeholder="••••••••••" autoComplete="current-password" aria-invalid={passMal} />
                <button type="button" className="adm-pass-toggle" onClick={() => setShowPass(s => !s)}
                  aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'} aria-pressed={showPass}>
                  <Icon name={showPass ? 'close' : 'eye'} size={16} />
                </button>
              </div>
              {mayus && <div className="adm-hint adm-caps"><Icon name="lock" size={12} /> Bloq Mayús está activado</div>}
            </div>
            {error && (
              <div className="adm-error" role="alert"><Icon name="close" size={14} /><span>{error}</span></div>
            )}
            <button className="btn btn-primary" type="submit" disabled={loading}>
              {loading ? <><span className="adm-spinner" /> Ingresando…</> : <><Icon name="lock" size={14} /> Iniciar sesión</>}
            </button>
          </form>
          <div className="adm-login-foot">
            <span>¿Olvidaste tu contraseña? Pídele al superadministrador que la restablezca desde Usuarios.</span>
            <a href="#/home">← Volver al sitio</a>
          </div>
        </div>
      </main>
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

// Hook de notificaciones tipo toast: abajo al centro, en surface-3.
// Firma estable { push(msg, kind), node }: kind = 'ok' | 'error' | 'info'.
const useToast = () => {
  const [list, setList] = React.useState([]);
  const push = (msg, kind = 'info') => {
    const id = Math.random().toString(36).slice(2);
    setList(t => [...t, { id, msg, kind }]);
    setTimeout(() => setList(t => t.filter(x => x.id !== id)), 4200);
  };
  const node = (
    <div className="adm-toast-stack" role="status" aria-live="polite">
      {list.map(t => {
        const k = t.kind === 'error' ? 'err' : t.kind === 'ok' ? 'ok' : 'info';
        return (
          <div key={t.id} className={'adm-toast ' + k}>
            <span className="adm-toast-ico"><Icon name={k === 'err' ? 'close' : k === 'ok' ? 'check' : 'bell'} size={13} /></span>
            <span>{t.msg}</span>
          </div>
        );
      })}
    </div>
  );
  return { push, node };
};

// Modal reutilizable: surface-3, cabecera y pie fijos, cuerpo con scroll.
// Solo cierra con clic en el fondo si el clic también EMPEZÓ en el fondo
// (seleccionar texto y soltar fuera no debe descartar un formulario).
const AdminModal = ({ open, onClose, title, children, footer, wide }) => {
  const abajoEnFondo = React.useRef(false);
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);
  if (!open) return null;
  return (
    <div className="adm-modal-backdrop"
      onMouseDown={e => { abajoEnFondo.current = e.target === e.currentTarget; }}
      onClick={e => { if (abajoEnFondo.current && e.target === e.currentTarget) onClose(); }}>
      <div className={'adm-modal' + (wide ? ' wide' : '')} role="dialog" aria-modal="true" aria-label={typeof title === 'string' ? title : undefined}>
        <div className="adm-modal-head">
          <h3>{title}</h3>
          <button type="button" className="adm-icon-btn" onClick={onClose} aria-label="Cerrar"><Icon name="close" size={16} /></button>
        </div>
        <div className="adm-modal-body">{children}</div>
        {footer && <div className="adm-modal-foot">{footer}</div>}
      </div>
    </div>
  );
};

// Campo de formulario: label en versales, hint gris. Un " *" al final del
// label se dibuja como marca de obligatorio. `span` ocupa las dos columnas.
const AdminField = ({ label, children, hint, span }) => {
  const txt = typeof label === 'string' ? label : null;
  const req = !!(txt && /\s\*$/.test(txt));
  return (
    <div className={'adm-field' + (span ? ' adm-span-2' : '')}>
      {label != null && label !== '' && (
        <label className="adm-field-label">
          {req ? txt.replace(/\s\*$/, '') : label}{req && <span className="req" aria-hidden="true">*</span>}
        </label>
      )}
      {children}
      {hint && <div className="adm-hint">{hint}</div>}
    </div>
  );
};

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
    <div className="adm-img-field">
      <input
        className="input"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || 'https://drive.google.com/file/d/... o URL directa'}
      />
      <div className="adm-img-input">
        {value ? (
          errored ? (
            <div className="adm-img-preview is-error"><Icon name="image" size={18} /><span>No carga</span></div>
          ) : (
            <div className="adm-img-preview"><img src={preview} alt="Vista previa" onError={() => setErrored(true)} /></div>
          )
        ) : (
          <div className="adm-img-preview is-empty"><Icon name="image" size={20} /></div>
        )}
        <div className="adm-hint adm-img-input-main">
          {errored
            ? <span className="adm-txt-err">No se pudo cargar la imagen: revisa la URL o que el archivo de Drive esté compartido como “Cualquier persona con el enlace puede ver”.</span>
            : isDrive
              ? <span><strong className="adm-txt-ok">Link de Google Drive detectado.</strong> Se servirá vía endpoint thumbnail. <strong>Importante:</strong> el archivo debe estar compartido como “Cualquier persona con el enlace puede ver”.</span>
              : value
                ? 'URL externa o ruta local. Se usará tal cual.'
                : <span>Pega aquí el link de Drive (botón “Compartir” → “Copiar enlace”) o una URL pública de imagen.</span>}
        </div>
      </div>
      {hint && <div className="adm-hint">{hint}</div>}
    </div>
  );
};

// Badge de estado semántico: verde = vigente/aprobado, ámbar = pendiente,
// rojo = inactivo/anulado, violeta = egresado/realizado. Lo desconocido va neutro.
const ESTADO_TONO = {
  ACTIVO: 'green', APROBADO: 'green', APROBADA: 'green', PAGADO: 'green', PUBLICADO: 'green', EMITIDO: 'green',
  VALIDO: 'green', ENTREGADO: 'green', CONFIRMADO: 'green', ABIERTO: 'green', ACTIVA: 'green',
  PENDIENTE: 'warn', BORRADOR: 'warn', EN_PROCESO: 'warn', POR_PAGAR: 'warn', PROGRAMADO: 'warn',
  INACTIVO: 'red', RECHAZADO: 'red', RECHAZADA: 'red', ANULADO: 'red', CANCELADO: 'red', ELIMINADO: 'red', INACTIVA: 'red',
  EGRESADO: 'violet', REALIZADO: 'violet', FINALIZADO: 'violet',
};
const EstadoBadge = ({ value }) => {
  const tono = ESTADO_TONO[String(value || '').toUpperCase()];
  return <span className={'badge' + (tono ? ' badge-' + tono : '')}><span className="badge-dot" />{value ? String(value).replace(/_/g, ' ') : '—'}</span>;
};

// ───── Piezas reutilizables del panel (también las usan pages-4/pages-5) ─────
// Cabecera de sección: título opcional, descripción y acciones a la derecha.
const AdmPageHead = ({ overline, title, sub, actions }) => (
  <div className="adm-page-head">
    <div>
      {overline && <div className="adm-overline">{overline}</div>}
      {title && <h2 className="adm-page-title">{title}</h2>}
      {sub && <p className="adm-page-sub">{sub}</p>}
    </div>
    {actions && <div className="adm-page-actions">{actions}</div>}
  </div>
);

// Buscador píldora con lupa. Props extra van al <input>.
const AdmSearch = ({ value, onChange, placeholder, ...rest }) => (
  <label className="adm-search">
    <span className="adm-search-ico" aria-hidden="true"><Icon name="search" size={16} /></span>
    <input className="input" type="search" value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder || 'Buscar…'} aria-label={placeholder || 'Buscar'} {...rest} />
  </label>
);

// Fila de chips de filtro. options: [{ value, label, count?, dot? }].
const AdmChips = ({ options, value, onChange }) => (
  <div className="adm-filters">
    {options.map(o => (
      <button key={String(o.value)} type="button" className={'chip' + (value === o.value ? ' active' : '')}
        aria-pressed={value === o.value} onClick={() => onChange(o.value)}>
        {o.dot && <span className="adm-dot" style={{ background: o.dot }} />}
        {o.label}
        {o.count != null && <span className="adm-chip-count">{o.count}</span>}
      </button>
    ))}
  </div>
);

// Estado vacío con mascota (img={false} la quita).
const AdmEmpty = ({ title, children, action, img }) => (
  <div className="adm-empty">
    {img !== false && (
      <img className="adm-empty-img" src={img || 'assets/mascota/mascota-lectura.png?v=3'} alt=""
        onError={(e) => { e.currentTarget.style.display = 'none'; }} />
    )}
    {title && <h3>{title}</h3>}
    {children && <p>{children}</p>}
    {action}
  </div>
);

// Filas skeleton mientras carga una tabla.
const AdmSkeleton = ({ rows = 5 }) => (
  <div className="adm-table-wrap adm-skel" aria-busy="true" aria-label="Cargando">
    <div className="adm-skel-head" />
    {Array.from({ length: rows }).map((_, i) => <div key={i} className="skeleton adm-skel-row" />)}
  </div>
);

// Miniatura de fila (40px). Si la imagen falla o no hay, iniciales.
const AdmThumb = ({ src, name, round, contain }) => {
  const [rota, setRota] = React.useState(false);
  React.useEffect(() => { setRota(false); }, [src]);
  const cls = 'adm-row-thumb' + (round ? ' round' : '') + (contain ? ' contain' : '');
  return (
    <span className={cls} aria-hidden="true">
      {src && !rota ? <img src={src} alt="" loading="lazy" onError={() => setRota(true)} /> : p2Iniciales(name)}
    </span>
  );
};

// Booleano como badge: "Sí" verde / "No" neutro. Solo true estricto es Sí.
const AdmBool = ({ value, si = 'Sí', no = 'No' }) => (
  value === true
    ? <span className="badge badge-green"><span className="badge-dot" />{si}</span>
    : <span className="badge"><span className="badge-dot" />{no}</span>
);

// Botón de icono para acciones de fila.
const AdmIconBtn = ({ icon, title, onClick, tone, disabled }) => (
  <button type="button" className={'adm-icon-btn' + (tone ? ' ' + tone : '')} title={title} aria-label={title} onClick={onClick} disabled={disabled}>
    <Icon name={icon} size={15} />
  </button>
);

// Exporta helpers admin para que pages-4.jsx (secciones nuevas) los reutilice.
Object.assign(window, {
  adminApi, useToast, AdminModal, AdminField, DriveImageInput, EstadoBadge,
  AdmPageHead, AdmSearch, AdmChips, AdmEmpty, AdmSkeleton, AdmThumb, AdmBool, AdmIconBtn
});

// Acciones estándar de la cabecera de sección: Recargar + Nuevo.
const p2Acciones = (reload, nuevo, txtNuevo) => (
  <>
    <button className="btn btn-ghost btn-sm" onClick={reload}><Icon name="refresh" size={14} /> Recargar</button>
    {nuevo && <button className="btn btn-primary btn-sm" onClick={nuevo}><Icon name="plus" size={14} /> {txtNuevo}</button>}
  </>
);
const p2Pie = (onCancel, onSave) => (
  <>
    <button className="btn btn-ghost" onClick={onCancel}>Cancelar</button>
    <button className="btn btn-primary" onClick={onSave}>Guardar</button>
  </>
);

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
  const nuevo = () => setEditing({ estado:'ACTIVO', publico:false, semestre:1 });
  const ESTADOS = ['ACTIVO','PENDIENTE','INACTIVO','EGRESADO'];

  return (
    <>
      <AdmPageHead
        sub="Padrón de la sociedad: aprueba inscripciones, edita datos y decide quién aparece en la galería pública."
        actions={p2Acciones(reload, nuevo, 'Nuevo miembro')} />

      <div className="adm-toolbar">
        <AdmSearch value={search} onChange={setSearch} placeholder="Buscar por nombre, email, comité..." />
        <AdmChips value={filterEstado} onChange={setFilterEstado}
          options={[{ value:'', label:'Todos', count: items.length }].concat(ESTADOS.map(e => ({ value:e, label:p2Titulo(e), count: items.filter(m => m.estado === e).length })))} />
        <span className="adm-toolbar-spacer" />
        <span className="adm-count">Mostrando {filtered.length} de {items.length}</span>
      </div>

      {loading ? <AdmSkeleton /> : items.length === 0 ? (
        <AdmEmpty title="No hay miembros registrados aún"
          action={<button className="btn btn-primary" onClick={nuevo}><Icon name="plus" size={14} /> Agregar el primero</button>}>
          Registra al primer miembro a mano o importa las respuestas del formulario de inscripción desde Formularios.
        </AdmEmpty>
      ) : (
        <div className="adm-table-wrap">
          <table className="admin-table adm-table">
            <thead>
              <tr><th>Miembro</th><th>Código</th><th>Comité</th><th className="adm-num">Sem.</th><th>Estado</th><th><span className="adm-sr">Acciones</span></th></tr>
            </thead>
            <tbody>
              {filtered.length === 0 && <tr><td colSpan={6} className="adm-td-empty">Sin resultados para tu búsqueda o filtro.</td></tr>}
              {filtered.map(m => {
                const nombre = ((m.nombres||'') + ' ' + (m.apellidos||'')).trim();
                return (
                  <tr key={m.id}>
                    <td>
                      <div className="adm-cell-main">
                        <AdmThumb src={IMG(m.foto_url)} name={nombre} round />
                        <div>
                          <div className="adm-cell-title">{nombre || '—'}</div>
                          <div className="adm-cell-sub">{m.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="adm-mono">{m.codigo_universitario || '—'}</td>
                    <td>{m.comite_interes_1 ? <span className="comite-chip">{m.comite_interes_1}</span> : '—'}</td>
                    <td className="adm-num">{m.semestre || '—'}</td>
                    <td><EstadoBadge value={m.estado} /></td>
                    <td className="adm-actions">
                      {m.estado === 'PENDIENTE' && (<>
                        <AdmIconBtn icon="check" title="Aprobar" tone="ok" onClick={() => approve(m)} />
                        <AdmIconBtn icon="close" title="Rechazar" tone="danger" onClick={() => reject(m)} />
                      </>)}
                      <AdmIconBtn icon="edit" title="Editar" onClick={() => setEditing(m)} />
                      <AdmIconBtn icon="trash" title="Eliminar" tone="danger" onClick={() => remove(m)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <AdminModal
        open={!!editing} onClose={()=>setEditing(null)} wide
        title={editing && editing.id ? 'Editar miembro' : 'Nuevo miembro'}
        footer={p2Pie(() => setEditing(null), save)}
      >
        {editing && (
          <div className="adm-form-grid">
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
              <label className="adm-switch">
                <input type="checkbox" checked={!!editing.publico} onChange={e=>setEditing({...editing, publico:e.target.checked})} />
                <span>Mostrar en /miembros</span>
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
  const nuevo = () => setEditing({ consejo:'EJECUTIVO', activo:true, gestion:'2026', orden:0 });
  const consejoLabel = (v) => (CONSEJOS_OPCIONES.find(c => c.value === v) || {}).label || v || '—';

  return (
    <>
      <AdmPageHead
        sub="Cargos de la directiva que se publican en la página Directorio, agrupados por consejo."
        actions={p2Acciones(reload, nuevo, 'Nuevo cargo')} />

      <div className="adm-toolbar">
        <AdmChips value={filterConsejo} onChange={setFilterConsejo}
          options={[{ value:'', label:'Todos los consejos', count: items.length }].concat(CONSEJOS_OPCIONES.map(c => ({ value:c.value, label:c.label, count: items.filter(i => i.consejo === c.value).length })))} />
      </div>

      {loading ? <AdmSkeleton /> :
       filtered.length === 0 ? (
         items.length === 0 ? (
           <AdmEmpty title="No hay cargos"
             action={<button className="btn btn-primary" onClick={nuevo}><Icon name="plus" size={14} /> Nuevo cargo</button>}>
             Si recién corriste el bootstrap, ejecuta <code>bootstrap_seedDirectorio()</code> en el editor de Apps Script.
           </AdmEmpty>
         ) : <AdmEmpty img={false} title="Sin cargos en este consejo">Elige otro consejo o crea un cargo nuevo.</AdmEmpty>
       ) : (
        <div className="adm-table-wrap">
          <table className="admin-table adm-table">
            <thead><tr><th>Cargo</th><th>Persona</th><th>Consejo</th><th>Activo</th><th><span className="adm-sr">Acciones</span></th></tr></thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id}>
                  <td>
                    <div className="adm-cell-main">
                      <AdmThumb src={IMG(d.foto_url)} name={d.nombre_completo} round />
                      <div>
                        <div className="adm-cell-title">{d.cargo_nombre}</div>
                        <div className="adm-cell-sub adm-mono">{d.cargo_codigo}</div>
                      </div>
                    </div>
                  </td>
                  <td>{d.nombre_completo || <span className="adm-muted">—</span>}</td>
                  <td><span className="badge">{consejoLabel(d.consejo)}</span></td>
                  <td><AdmBool value={d.activo} /></td>
                  <td className="adm-actions">
                    <AdmIconBtn icon="edit" title="Editar" onClick={() => setEditing(d)} />
                    <AdmIconBtn icon="trash" title="Eliminar" tone="danger" onClick={() => remove(d)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       )}

      <AdminModal
        open={!!editing} onClose={()=>setEditing(null)} wide
        title={editing && editing.id ? 'Editar cargo del directorio' : 'Nuevo cargo'}
        footer={p2Pie(() => setEditing(null), save)}
      >
        {editing && (
          <div className="adm-form-grid">
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
              <label className="adm-switch">
                <input type="checkbox" checked={editing.activo !== false} onChange={e=>setEditing({...editing, activo:e.target.checked})} />
                <span>Visible en el sitio</span>
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
  const nuevo = () => setEditing({ tipo:'IFMSA', activo:true, color_hex:'#7B1FA2', icono:'layers' });

  return (
    <>
      <AdmPageHead
        sub="Comités IFMSA, SOCIMEP y divisiones de soporte: nombre, color, objetivos y visibilidad."
        actions={p2Acciones(reload, nuevo, 'Nuevo comité')} />

      <div className="adm-toolbar">
        <AdmChips value={filterTipo} onChange={setFilterTipo}
          options={[{ value:'', label:'Todos los tipos', count: items.length }].concat(TIPOS_COMITE.map(t => ({ value:t, label:p2Titulo(t), count: items.filter(i => i.tipo === t).length })))} />
      </div>

      {loading ? <AdmSkeleton /> :
       filtered.length === 0 ? (
         <AdmEmpty title="Sin comités">
           {items.length === 0 ? <>Ejecuta <code>bootstrap_seedComites()</code> en el editor de Apps Script.</> : 'No hay comités de este tipo.'}
         </AdmEmpty>
       ) : (
        <div className="adm-table-wrap">
          <table className="admin-table adm-table">
            <thead><tr><th>Comité</th><th>Nombre completo</th><th>Tipo</th><th>Activo</th><th><span className="adm-sr">Acciones</span></th></tr></thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.codigo}>
                  <td>
                    <div className="adm-cell-main">
                      <AdmThumb src={comiteLogoUrl(c.codigo)} name={c.codigo} contain />
                      <div>
                        <div className="adm-cell-title adm-cell-code">
                          <span className="adm-dot" style={{ background: c.color_hex || 'var(--fg-muted)' }} />{c.codigo}
                        </div>
                        {c.nombre_corto && <div className="adm-cell-sub">{c.nombre_corto}</div>}
                      </div>
                    </div>
                  </td>
                  <td><span className="adm-clip">{c.nombre_completo}</span></td>
                  <td><span className="badge">{String(c.tipo || '—').replace(/_/g, ' ')}</span></td>
                  <td><AdmBool value={c.activo} /></td>
                  <td className="adm-actions">
                    <AdmIconBtn icon="edit" title="Editar" onClick={() => setEditing({...c, _original:{ codigo:c.codigo }})} />
                    <AdmIconBtn icon="trash" title="Desactivar" tone="danger" onClick={() => remove(c)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       )}

      <AdminModal
        open={!!editing} onClose={()=>setEditing(null)} wide
        title={editing && editing._original ? 'Editar comité ' + editing._original.codigo : 'Nuevo comité'}
        footer={p2Pie(() => setEditing(null), save)}
      >
        {editing && (
          <div className="adm-form-grid">
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
            <AdminField label="Color (hex) *">
              <div className="adm-color-row">
                <span className="adm-color-swatch" style={{ background: editing.color_hex || 'transparent' }} aria-hidden="true" />
                <input className="input" value={editing.color_hex||''} onChange={e=>setEditing({...editing, color_hex:e.target.value})} placeholder="#7B1FA2" />
              </div>
            </AdminField>
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
              <label className="adm-switch">
                <input type="checkbox" checked={editing.activo !== false} onChange={e=>setEditing({...editing, activo:e.target.checked})} />
                <span>Visible en el sitio</span>
              </label>
            </AdminField>
          </div>
        )}
      </AdminModal>
    </>
  );
};

// ───── Sección: Noticias / Actividades ─────
// (Heredada: el panel usa hoy AdminNoticias de pages-4; se conserva por compatibilidad.)
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
  const nueva = () => setEditing({ categoria:'EVENTO', publicado:false });
  return (
    <>
      <AdmPageHead title="Actividades · Noticias" actions={p2Acciones(reload, nueva, 'Nueva')} />
      {loading ? <AdmSkeleton /> :
       items.length === 0 ? <AdmEmpty title="Sin noticias" /> : (
        <div className="adm-table-wrap">
          <table className="admin-table adm-table">
            <thead><tr><th>Título</th><th>Categoría</th><th>Fecha</th><th>Publicado</th><th><span className="adm-sr">Acciones</span></th></tr></thead>
            <tbody>
              {items.map(n => (
                <tr key={n.id}>
                  <td>
                    <div className="adm-cell-main">
                      <AdmThumb src={IMG(n.imagen_portada)} name={n.titulo} />
                      <div className="adm-cell-title adm-clip">{n.titulo}</div>
                    </div>
                  </td>
                  <td><span className="badge">{n.categoria}</span></td>
                  <td className="adm-mono">{n.fecha_publicacion ? new Date(n.fecha_publicacion).toLocaleDateString() : '—'}</td>
                  <td><AdmBool value={n.publicado} /></td>
                  <td className="adm-actions">
                    <AdmIconBtn icon="eye" title={n.publicado ? 'Despublicar' : 'Publicar'} onClick={() => togglePublish(n)} />
                    <AdmIconBtn icon="edit" title="Editar" onClick={() => setEditing(n)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       )}
      <AdminModal open={!!editing} onClose={()=>setEditing(null)} wide
        title={editing && editing.id ? 'Editar noticia' : 'Nueva noticia'}
        footer={p2Pie(() => setEditing(null), save)}>
        {editing && (
          <div className="adm-form-grid">
            <AdminField span label="Título *"><input className="input" value={editing.titulo||''} onChange={e=>setEditing({...editing, titulo:e.target.value})} /></AdminField>
            <AdminField span label="Resumen *"><input className="input" value={editing.resumen||''} onChange={e=>setEditing({...editing, resumen:e.target.value})} /></AdminField>
            <AdminField label="Categoría *">
              <select className="select" value={editing.categoria||'EVENTO'} onChange={e=>setEditing({...editing, categoria:e.target.value})}>
                <option>EVENTO</option><option>ACADEMICO</option><option>INVESTIGACION</option><option>INSTITUCIONAL</option><option>INTERCAMBIO</option>
              </select>
            </AdminField>
            <AdminField label="Tags (separados por coma)"><input className="input" value={editing.tags||''} onChange={e=>setEditing({...editing, tags:e.target.value})} /></AdminField>
            <AdminField span label="Imagen de portada">
              <DriveImageInput value={editing.imagen_portada||''} onChange={v => setEditing({...editing, imagen_portada:v})} />
            </AdminField>
            <AdminField span label="Contenido (Markdown) *"><textarea className="textarea" value={editing.contenido_md||''} onChange={e=>setEditing({...editing, contenido_md:e.target.value})} rows={8} /></AdminField>
          </div>
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
  const nuevo = () => setEditing({ tipo:'INSCRIPCION', destacado:false, activo:true, cta_label:'Inscríbete' });

  return (
    <>
      <AdmPageHead
        sub={<>Cada uno aparece en la sección <strong>“Inscripciones”</strong> del landing público.</>}
        actions={p2Acciones(reload, nuevo, 'Nuevo formulario')} />

      {loading ? <AdmSkeleton rows={4} /> :
       items.length === 0 ? (
         <AdmEmpty img="assets/mascota/mascota-formulario.png?v=3" title="No hay formularios publicados aún"
           action={<button className="btn btn-primary" onClick={nuevo}><Icon name="plus" size={14} /> Publicar el primero</button>}>
           Publica una convocatoria, curso o encuesta con su flyer y el enlace al formulario externo.
         </AdmEmpty>
       ) : (
        <div className="adm-table-wrap">
          <table className="admin-table adm-table">
            <thead><tr><th>Formulario</th><th>Tipo</th><th>Fecha límite</th><th>Activo</th><th><span className="adm-sr">Acciones</span></th></tr></thead>
            <tbody>
              {items.map(f => (
                <tr key={f.id}>
                  <td>
                    <div className="adm-cell-main">
                      <AdmThumb src={IMG(f.imagen_url)} name={f.titulo} />
                      <div className="adm-min0">
                        <div className="adm-cell-title">
                          {f.titulo}
                          {f.destacado && <span className="badge badge-gold adm-ml"><Icon name="star" size={10} /> Destacado</span>}
                        </div>
                        <a href={f.url} target="_blank" rel="noopener noreferrer" className="adm-cell-sub adm-link adm-clip">{String(f.url||'').slice(0,60)}</a>
                      </div>
                    </div>
                  </td>
                  <td><span className="badge">{f.tipo}</span></td>
                  <td className="adm-mono">{f.fecha_limite ? new Date(f.fecha_limite).toLocaleDateString() : '—'}</td>
                  <td><AdmBool value={f.activo} /></td>
                  <td className="adm-actions">
                    <AdmIconBtn icon="edit" title="Editar" onClick={() => setEditing(f)} />
                    <AdmIconBtn icon="trash" title="Desactivar" tone="danger" onClick={() => remove(f)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       )}

      <div className="adm-panel adm-section">
        <div className="adm-panel-head">
          <div>
            <div className="adm-overline">Sincronización</div>
            <h3 className="mt-2">Importación desde Google Form de inscripción</h3>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={importarFromGoogleForm} disabled={importing}>
            {importing ? <><span className="adm-spinner" /> Importando…</> : <><Icon name="download" size={14} /> Importar respuestas a miembros</>}
          </button>
        </div>
        <p className="adm-page-sub">Lee la hoja <code>respuestas_form</code> e inserta nuevos miembros con estado <strong>PENDIENTE</strong>. Sólo para sincronizar con el form oficial de membresía.</p>
        {importResult && (
          <pre className="adm-pre">{JSON.stringify(importResult, null, 2)}</pre>
        )}
      </div>

      <AdminModal
        open={!!editing} onClose={()=>setEditing(null)} wide
        title={editing && editing.id ? 'Editar formulario' : 'Nuevo formulario / convocatoria'}
        footer={p2Pie(() => setEditing(null), save)}
      >
        {editing && (
          <div className="adm-form-grid">
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
              <label className="adm-switch">
                <input type="checkbox" checked={!!editing.destacado} onChange={e=>setEditing({...editing, destacado:e.target.checked})} />
                <span>Aparece primero en el landing</span>
              </label>
            </AdminField>
            <AdminField span label="Descripción">
              <textarea className="textarea" value={editing.descripcion||''} onChange={e=>setEditing({...editing, descripcion:e.target.value})} rows={4} placeholder="Para qué es el formulario, ponente, fecha, modalidad, requisitos..." />
            </AdminField>
            <AdminField label="Activo">
              <label className="adm-switch">
                <input type="checkbox" checked={editing.activo !== false} onChange={e=>setEditing({...editing, activo:e.target.checked})} />
                <span>Visible en el sitio</span>
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
      <AdmPageHead
        sub="Crea sorteos, agrega participantes (manual o desde miembros) y realiza el sorteo aleatorio."
        actions={p2Acciones(reload, () => openEdit(null), 'Nuevo sorteo')} />

      {loading ? <AdmSkeleton rows={4} /> :
       items.length === 0 ? (
         <AdmEmpty title="No hay sorteos creados aún"
           action={<button className="btn btn-primary" onClick={() => openEdit(null)}><Icon name="plus" size={14} /> Crear el primero</button>}>
           Arma la lista de participantes y deja que el azar elija a los ganadores.
         </AdmEmpty>
       ) : (
        <div className="adm-table-wrap">
          <table className="admin-table adm-table">
            <thead><tr><th>Sorteo</th><th>Estado</th><th className="adm-num">Participantes</th><th>Ganadores</th><th>Realizado</th><th><span className="adm-sr">Acciones</span></th></tr></thead>
            <tbody>
              {items.map(s => (
                <tr key={s.id}>
                  <td>
                    <div className="adm-cell-main">
                      <AdmThumb src={IMG(s.imagen_url)} name={s.titulo} />
                      <div className="adm-cell-title">{s.titulo}</div>
                    </div>
                  </td>
                  <td><EstadoBadge value={s.estado} /></td>
                  <td className="adm-num">{s.total_participantes || 0}</td>
                  <td>
                    {Array.isArray(s.ganadores) && s.ganadores.length > 0
                      ? <span className="adm-gold-txt"><Icon name="star" size={12} /> {s.ganadores.slice(0,3).join(', ')}{s.ganadores.length > 3 ? ` +${s.ganadores.length-3}` : ''}</span>
                      : <span className="adm-muted">—</span>}
                  </td>
                  <td className="adm-mono">{s.fecha_realizado ? new Date(s.fecha_realizado).toLocaleString().slice(0,16) : '—'}</td>
                  <td className="adm-actions">
                    {s.estado !== 'REALIZADO' && (
                      <AdmIconBtn icon="sparkle" title="Realizar sorteo" tone="accent" disabled={running===s.id} onClick={() => realizar(s)} />
                    )}
                    <AdmIconBtn icon="edit" title="Editar" onClick={() => openEdit(s)} />
                    <AdmIconBtn icon="trash" title="Desactivar" tone="danger" onClick={() => remove(s)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       )}

      {/* Modal crear/editar sorteo */}
      <AdminModal
        open={!!editing} onClose={()=>setEditing(null)} wide
        title={editing && editing.id ? 'Editar sorteo' : 'Nuevo sorteo'}
        footer={<>
          <button className="btn btn-ghost" onClick={()=>setEditing(null)}>Cancelar</button>
          {editing && editing.id && (
            <button className="btn btn-ghost" onClick={importarMiembros}><Icon name="users" size={14} /> Importar miembros activos</button>
          )}
          <button className="btn btn-primary" onClick={save}>Guardar</button>
        </>}
      >
        {editing && (
          <div className="adm-form-grid">
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
              <label className="adm-switch">
                <input type="checkbox" checked={editing.activo !== false} onChange={e=>setEditing({...editing, activo:e.target.checked})} />
                <span>Visible en el sitio</span>
              </label>
            </AdminField>
            <AdminField span label="Descripción">
              <textarea className="textarea" value={editing.descripcion||''} onChange={e=>setEditing({...editing, descripcion:e.target.value})} rows={3} />
            </AdminField>
            <AdminField span label={`Participantes (un nombre por línea — total: ${(editing._participantes_text||'').split('\n').filter(s=>s.trim()).length})`} hint="Botón “Importar miembros activos” en el footer puebla esta lista desde la hoja miembros.">
              <textarea className="textarea adm-mono-area" rows={10} value={editing._participantes_text||''} onChange={e=>setEditing({...editing, _participantes_text:e.target.value})} placeholder={"Yessica Ruth Puma\nMarvin Fernando Cruz Maron\n..."} />
            </AdminField>
          </div>
        )}
      </AdminModal>

      {/* Modal de resultado de sorteo */}
      <AdminModal
        open={!!winners} onClose={()=>setWinners(null)}
        title="Sorteo realizado"
        footer={<button className="btn btn-primary" onClick={()=>setWinners(null)}>Listo</button>}
      >
        {winners && (
          <div className="adm-winners">
            <p>De <strong>{winners.total}</strong> participantes en <strong>{winners.titulo}</strong>:</p>
            <div className="adm-winners-list">
              {(winners.ganadores || []).map((g, i) => (
                <div key={i} className="adm-winner" style={{ animationDelay: (i * 120) + 'ms' }}>
                  <span className="adm-winner-n">{i + 1}</span>
                  <div>
                    <div className="adm-overline adm-gold-txt">Ganador {i + 1}</div>
                    <div className="adm-winner-name">{g}</div>
                  </div>
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
  const [q, setQ] = React.useState('');
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
  const texto = q.trim().toLowerCase();
  const visibles = texto ? items.filter(c => (String(c.clave) + ' ' + String(c.valor || '')).toLowerCase().includes(texto)) : items;
  return (
    <>
      <AdmPageHead
        sub={<>Edita correos, URLs y otras claves de la hoja <code>config</code>.</>}
        actions={p2Acciones(reload, () => setEditing({ clave:'', valor:'' }), 'Nueva clave')} />
      {!loading && items.length > 0 && (
        <div className="adm-toolbar">
          <AdmSearch value={q} onChange={setQ} placeholder="Buscar clave o valor" />
          <span className="adm-toolbar-spacer" />
          <span className="adm-count">{visibles.length} claves</span>
        </div>
      )}
      {loading ? <AdmSkeleton /> :
       items.length === 0 ? <AdmEmpty img={false} title="Sin configuración" /> : (
        <div className="adm-table-wrap">
          <table className="admin-table adm-table">
            <thead><tr><th>Clave</th><th>Valor</th><th><span className="adm-sr">Acciones</span></th></tr></thead>
            <tbody>
              {visibles.length === 0 && <tr><td colSpan={3} className="adm-td-empty">Ninguna clave coincide.</td></tr>}
              {visibles.map(c => (
                <tr key={c.clave}>
                  <td><span className="adm-mono adm-key">{c.clave}</span></td>
                  <td className="adm-val">{String(c.valor||'').slice(0,140)}</td>
                  <td className="adm-actions"><AdmIconBtn icon="edit" title="Editar" onClick={() => setEditing({...c})} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       )}
      <AdminModal open={!!editing} onClose={()=>setEditing(null)}
        title="Configuración"
        footer={p2Pie(() => setEditing(null), save)}>
        {editing && (<>
          <AdminField label="Clave *"><input className="input adm-mono" value={editing.clave||''} onChange={e=>setEditing({...editing, clave:e.target.value})} /></AdminField>
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
      // AdminCtrl atiende el alta/edición de usuarios como create/update
      // (usuarioCreate/usuarioUpdate respondían ACCION_INVALIDA).
      const action = editing.id ? 'update' : 'create';
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
      <AdmPageHead
        sub="Cuentas con acceso a este panel. Solo el superadministrador puede crear usuarios o restablecer contraseñas."
        actions={p2Acciones(reload, () => setEditing({ rol:'EDITOR', activo:true }), 'Nuevo usuario')} />
      {loading ? <AdmSkeleton rows={3} /> :
       items.length === 0 ? <AdmEmpty img={false} title="Sin usuarios" /> : (
        <div className="adm-table-wrap">
          <table className="admin-table adm-table">
            <thead><tr><th>Usuario</th><th>Rol</th><th>Activo</th><th>Último login</th><th><span className="adm-sr">Acciones</span></th></tr></thead>
            <tbody>
              {items.map(u => (
                <tr key={u.id}>
                  <td>
                    <div className="adm-cell-main">
                      <AdmThumb name={u.nombre || u.username} round />
                      <div>
                        <div className="adm-cell-title">{u.nombre || u.username}</div>
                        <div className="adm-cell-sub adm-mono">{u.username}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={'badge ' + (u.rol === 'SUPER_ADMIN' ? 'badge-gold' : 'badge-violet')}>{String(u.rol || '—').replace(/_/g, ' ')}</span></td>
                  <td><AdmBool value={u.activo} /></td>
                  <td className="adm-mono">{u.ultimo_login ? new Date(u.ultimo_login).toLocaleString().slice(0,16) : '—'}</td>
                  <td className="adm-actions">
                    <AdmIconBtn icon="edit" title="Editar" onClick={() => setEditing(u)} />
                    <AdmIconBtn icon="lock" title="Reset password" onClick={() => reset(u)} />
                    <AdmIconBtn icon="trash" title="Desactivar" tone="danger" onClick={() => remove(u)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       )}
      <AdminModal open={!!editing} onClose={()=>setEditing(null)}
        title={editing && editing.id ? 'Editar usuario' : 'Nuevo usuario'}
        footer={p2Pie(() => setEditing(null), save)}>
        {editing && (
          <div className="adm-form-grid">
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
              <label className="adm-switch"><input type="checkbox" checked={editing.activo === undefined || editing.activo === true || /^(SI|TRUE|1|X)$/i.test(String(editing.activo))} onChange={e=>setEditing({...editing, activo:e.target.checked ? 'SI' : 'NO'})} /><span>Habilitado</span></label>
            </AdminField>
          </div>
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

// Shell del panel: sidebar 248px (off-canvas en móvil con overlay), topbar
// sticky con migas, salto rápido a secciones y "Ver sitio".
const AdminDashboard = ({ onLogout, user }) => {
  const [active, setActive] = React.useState('dashboard');
  const [navOpen, setNavOpen] = React.useState(false);
  const [jump, setJump] = React.useState('');
  const toast = useToast();
  const Current = ADMIN_SECTIONS[active] || ADMIN_SECTIONS.dashboard;
  // Las secciones de pages-4 se declaran por nombre y se resuelven aquí.
  const CurrentComp = Current.Component || window[Current.component];
  const userInitials = ((user && (user.nombre || user.username)) || 'AD')
    .split(' ').map(s => s[0]).filter(Boolean).slice(0,2).join('').toUpperCase();
  const userName = (user && (user.nombre || user.username)) || 'Administrador';
  const grupo = (ADMIN_NAV.find(g => g.items.some(i => i.id === active)) || {}).section || 'Panel';

  const ir = (id) => {
    setActive(id); setNavOpen(false); setJump('');
    try { window.scrollTo({ top: 0 }); } catch (e) {}
  };
  // Esc cierra el menú lateral en móvil.
  React.useEffect(() => {
    if (!navOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setNavOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navOpen]);

  const todas = ADMIN_NAV.reduce((acc, g) => acc.concat(g.items.map(i => ({ ...i, section: g.section }))), []);
  const qj = jump.trim().toLowerCase();
  const matches = qj ? todas.filter(i => (i.label + ' ' + i.section).toLowerCase().includes(qj)).slice(0, 6) : [];

  const hora = new Date().getHours();
  const saludo = hora < 12 ? 'Buenos días' : hora < 19 ? 'Buenas tardes' : 'Buenas noches';
  const hoy = new Date().toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long' });

  return (
    <div className="admin-shell">
      <aside className={'admin-sidebar' + (navOpen ? ' open' : '')} aria-label="Navegación del panel">
        <div className="brand">
          <Logo size={34} />
          <div className="adm-brand-txt"><strong>SOCIEM-UNA</strong><span>Panel interno</span></div>
          <button type="button" className="adm-icon-btn adm-burger adm-sidebar-close" onClick={() => setNavOpen(false)} aria-label="Cerrar menú">
            <Icon name="close" size={16} />
          </button>
        </div>
        <nav className="admin-nav">
          {ADMIN_NAV.map(group => (
            <div key={group.section}>
              <div className="admin-nav-section">{group.section}</div>
              {group.items.map(it => (
                <a key={it.id} href="#" className={active === it.id ? 'active' : ''} aria-current={active === it.id ? 'page' : undefined}
                  onClick={(e) => { e.preventDefault(); ir(it.id); }}>
                  <span className="adm-nav-ico"><Icon name={it.icon} size={18} /></span>
                  <span className="adm-nav-label">{it.label}</span>
                </a>
              ))}
            </div>
          ))}
        </nav>
        <div className="adm-user">
          <span className="adm-avatar">{userInitials}</span>
          <span className="adm-user-txt">
            <strong>{userName}</strong>
            <span>{user && user.rol ? String(user.rol).replace(/_/g, ' ').toLowerCase() : 'Sesión activa'}</span>
          </span>
          <button type="button" className="adm-icon-btn danger" onClick={onLogout} title="Cerrar sesión" aria-label="Cerrar sesión">
            <Icon name="logout" size={16} />
          </button>
        </div>
      </aside>
      <div className={'adm-overlay' + (navOpen ? ' open' : '')} onClick={() => setNavOpen(false)} aria-hidden="true" />

      <main className="admin-main">
        <header className="admin-topbar">
          <div className="adm-topbar-left">
            <button type="button" className="icon-btn adm-burger" onClick={() => setNavOpen(true)} aria-label="Abrir menú" aria-expanded={navOpen}>
              <Icon name="menu" size={18} />
            </button>
            <div className="adm-topbar-title">
              <div className="adm-crumb">{grupo}</div>
              <h1>{Current.title}</h1>
            </div>
          </div>
          <div className="adm-topbar-right">
            <div className="adm-jump adm-hide-md">
              <AdmSearch value={jump} onChange={setJump} placeholder="Ir a una sección…"
                onKeyDown={(e) => { if (e.key === 'Enter' && matches[0]) ir(matches[0].id); if (e.key === 'Escape') setJump(''); }} />
              {qj && (
                <div className="adm-jump-list" role="listbox">
                  {matches.length === 0
                    ? <div className="adm-jump-none">Sin coincidencias</div>
                    : matches.map(m => (
                      <button key={m.id} type="button" role="option" className="adm-jump-item"
                        onMouseDown={(e) => e.preventDefault()} onClick={() => ir(m.id)}>
                        <Icon name={m.icon} size={15} /><span>{m.label}</span><em>{m.section}</em>
                      </button>
                    ))}
                </div>
              )}
            </div>
            <a className="btn btn-ghost btn-sm adm-hide-sm" href="#/home" target="_blank" rel="noopener noreferrer">
              Ver sitio <Icon name="arrowUpRight" size={14} />
            </a>
            <span className="adm-avatar adm-hide-sm" title={userName}>{userInitials}</span>
          </div>
        </header>

        <div className="admin-content">
          <div key={active} className="page-fade">
            {active === 'dashboard' && (
              <div className="adm-hello">
                <div className="adm-overline">{hoy}</div>
                <h2>{saludo}, <em>{String(userName).split(' ')[0]}</em>.</h2>
                <p>Este es el pulso de SOCIEM-UNA: indicadores del día y accesos a lo que más se usa.</p>
              </div>
            )}
            {CurrentComp
              ? <CurrentComp toast={toast} user={user} go={ir} />
              : <AdmEmpty img="assets/mascota/mascota-error.png?v=3" title="Sección no disponible">
                  No cargó <code>components/pages-4.jsx</code>. Recarga la página.
                </AdmEmpty>}
          </div>
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
