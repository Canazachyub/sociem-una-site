// ============================================================================
// pages-4.jsx — Secciones nuevas del panel admin (backend v6)
//   Dashboard mejorado · Solicitudes · Eventos · Evaluaciones · Personas
//   Tienda (productos, pedidos) · Noticias / Diario científico
//   Reutiliza helpers expuestos por pages-2 (window.adminApi, AdminModal, …).
//   Presentación: piezas Ax* (cabecera, toolbar, tabla, vacío, skeleton) con
//   las clases .ax-* de css/admin2.css. Las usa también pages-5.jsx.
// ============================================================================
const { adminApi: aApi, AdminModal: AM, AdminField: AF } = window;
const u4 = React;

// ───────────────────────── Piezas de presentación ─────────────────────────
// Ojo: los <script type="text/babel"> comparten el ámbito global, así que todo
// nombre de primer nivel lleva el prefijo Ax/ax para no chocar con otras hojas.

const axSi = (v) => String(v).toUpperCase() === 'SI';
const axTxt = (v) => (v == null ? '' : String(v));

// Estado → badge semántico (DESIGN.md › Badges). Nada de colores inline: el
// tono sale de las clases .badge-* del núcleo, que ya resuelven claro/oscuro.
const AX_TONO = {
  ACTIVO: 'green', APROBADO: 'green', PAGADO: 'green', ENTREGADO: 'green',
  EMITIDO: 'green', PUBLICADO: 'green', VALIDO: 'green', EN_CURSO: 'green',
  PENDIENTE: 'warn', BORRADOR: 'warn', CERRADO: 'warn',
  PROGRAMADO: 'violet', EGRESADO: 'violet',
  INACTIVO: 'red', RECHAZADO: 'red', CANCELADO: 'red', ANULADO: 'red', SUSPENDIDO: 'red',
};
const AxEstado = ({ value, label, onClick, title }) => {
  const v = axTxt(value).toUpperCase();
  const tono = AX_TONO[v];
  const cls = 'badge' + (tono ? ' badge-' + tono : '') + (onClick ? ' ax-badge-btn' : '');
  const txt = label || axTxt(value).replace(/_/g, ' ') || '—';
  return onClick
    ? <button type="button" className={cls} onClick={onClick} title={title}><span className="badge-dot" />{txt}</button>
    : <span className={cls}><span className="badge-dot" />{txt}</span>;
};

// Cabecera de sección (vocabulario .adm-page-* de css/admin.css): título con
// cifra, una línea de contexto y acciones a la derecha.
const AxHead = ({ eyebrow, title, count, desc, children }) => (
  <div className="adm-page-head">
    <div className="ax-head-txt">
      {eyebrow && <div className="adm-overline">{eyebrow}</div>}
      {title && (
        <h2 className="adm-page-title">
          {title}
          {count != null && <span className="ax-count mono">{count}</span>}
        </h2>
      )}
      {desc && <p className="adm-page-sub">{desc}</p>}
    </div>
    {children && <div className="adm-page-actions">{children}</div>}
  </div>
);

// Toolbar: buscador píldora + chips de filtro + lo que venga a la derecha.
const AxToolbar = ({ children }) => <div className="adm-toolbar">{children}</div>;

const AxSearch = ({ value, onChange, placeholder, icon }) => (
  <div className="adm-search ax-search">
    <span className="adm-search-ico"><Icon name={icon || 'search'} size={16} /></span>
    <input className="input" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder || 'Buscar…'} aria-label={placeholder || 'Buscar'} />
    {value && <button type="button" className="ax-search-x" onClick={() => onChange('')} aria-label="Limpiar búsqueda"><Icon name="close" size={13} /></button>}
  </div>
);

// opts: [{ v, l, n? }] — n es el conteo opcional que se muestra en la chip.
const AxChips = ({ value, onChange, opts }) => (
  <div className="adm-filters" role="group" aria-label="Filtros">
    {opts.map(o => (
      <button key={o.v} type="button" className={'chip' + (value === o.v ? ' active' : '')} aria-pressed={value === o.v} onClick={() => onChange(o.v)}>
        {o.l}{o.n != null && <span className="ax-chip-n mono">{o.n}</span>}
      </button>
    ))}
  </div>
);

// Tabla Green Deck: envoltura con scroll horizontal propio en móvil.
const AxTable = ({ children, compact }) => (
  <div className={'adm-table-wrap' + (compact ? ' ax-table-compact' : '')}>
    <table className="admin-table adm-table">{children}</table>
  </div>
);

// Miniatura de 40px (radio 6px) o avatar redondo.
const AxThumb = ({ src, icon, round }) => (
  <div className={'adm-row-thumb' + (round ? ' round' : '')}>
    {src ? <img src={src} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.display = 'none'; }} /> : <Icon name={icon || 'image'} size={16} />}
  </div>
);

// Botón de acción de fila: icono con tooltip nativo y aria-label.
const AxIconBtn = ({ icon, label, onClick, tone, disabled }) => (
  <button type="button" className={'adm-icon-btn' + (tone === 'danger' ? ' danger' : '')} title={label} aria-label={label} onClick={onClick} disabled={disabled}>
    <Icon name={icon} size={15} />
  </button>
);

// Estado vacío con mascota (una por vista, DESIGN.md › Mascota).
const AxEmpty = ({ img, title, children, action }) => (
  <div className="adm-empty">
    <img src={'assets/mascota/' + (img || 'mascota-lectura') + '.png?v=3'} alt="" className="adm-empty-img" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
    {title && <h3>{title}</h3>}
    {children && <p>{children}</p>}
    {action}
  </div>
);

// Skeleton de carga con la forma de la vista: tabla o rejilla de KPIs.
const AxSkeleton = ({ rows = 6, kpis }) => (
  <div className="ax-skel" aria-busy="true" aria-label="Cargando">
    {kpis ? (
      <div className="adm-kpi-grid">{Array.from({ length: kpis }).map((_, i) => <div key={i} className="skeleton ax-skel-kpi" />)}</div>
    ) : (
      <>
        <div className="ax-skel-bar"><div className="skeleton ax-skel-search" /><div className="skeleton ax-skel-chip" /><div className="skeleton ax-skel-chip" /></div>
        {Array.from({ length: rows }).map((_, i) => <div key={i} className="skeleton adm-skel-row" style={{ opacity: 1 - i * 0.12 }} />)}
      </>
    )}
  </div>
);

// Error de carga con reintento (usa LoadErrorCard del shell si existe).
const AxFallo = ({ msg, onRetry }) => (
  typeof LoadErrorCard === 'function'
    ? <LoadErrorCard onRetry={onRetry}>{msg ? 'No se pudo cargar: ' + msg : null}</LoadErrorCard>
    : <div className="adm-error">{msg}</div>
);

// Fila "vacía" dentro de una tabla filtrada.
const AxSinCoincidencias = ({ cols, onClear }) => (
  <tr className="ax-row-empty"><td colSpan={cols}>
    Ningún registro coincide con el filtro.{onClear && <> <button type="button" className="ax-linkbtn" onClick={onClear}>Quitar filtros</button></>}
  </td></tr>
);

// Widget: sube una foto a Drive (carpeta por tipo) con preview.
const AdminFoto = ({ value, thumb, carpeta, onChange }) => {
  const [up, setUp] = u4.useState(false);
  const [e, setE] = u4.useState('');
  const pick = async (ev) => {
    const file = ev.target.files && ev.target.files[0]; if (!file) return;
    setUp(true); setE('');
    try { const r = await window.SOCIEM_API.uploadFile(file, carpeta || 'eventos');
      if (r && r.ok) onChange(r.data); else setE((r && r.error) || 'Error'); }
    catch (err) { setE(String(err)); }
    setUp(false);
  };
  const show = thumb || (value ? window.IMG(value) : '');
  return (
    <div className="adm-img-input">
      <div className={'adm-img-preview' + (up ? ' ax-subiendo' : '')}>
        {show ? <img src={show} alt="" /> : <Icon name="image" size={22} />}
      </div>
      <div className="adm-img-input-main">
        <label className="btn btn-secondary btn-sm ax-file-btn">
          <Icon name="upload" size={14} /> {up ? 'Subiendo…' : show ? 'Cambiar imagen' : 'Subir imagen'}
          <input type="file" accept="image/*" onChange={pick} disabled={up} hidden />
        </label>
        <div className="adm-hint">JPG o PNG · se guarda en Drive</div>
        {e && <div className="ax-err">{e}</div>}
      </div>
    </div>
  );
};

// Input genérico
const TInput = (p) => <input className="input" {...p} />;
const TSelect = ({ value, onChange, opts }) => <select className="input" value={value} onChange={onChange}>{opts.map(o => typeof o === 'string' ? <option key={o} value={o}>{o}</option> : <option key={o.v} value={o.v}>{o.l}</option>)}</select>;

// ───────────────────────── DASHBOARD mejorado ─────────────────────────
const AdminDashV6 = ({ go }) => {
  const [d, setD] = u4.useState(null);
  const [err, setErr] = u4.useState('');
  const cargar = () => { setErr(''); aApi.get('admin', 'dashboard').then(r => setD(r.data || {})).catch(e => setErr(e.message)); };
  u4.useEffect(() => { cargar(); }, []);
  if (err) return <AxFallo msg={err} onRetry={cargar} />;
  if (!d) return <AxSkeleton kpis={9} />;
  const grupos = [
    { t: 'Requiere atención', items: [
      { l:'Solicitudes pendientes', v:d.solicitudes_pendientes, to:'solicitudes', ic:'inbox', alerta:d.solicitudes_pendientes>0 },
      { l:'Pedidos pendientes', v:d.pedidos_pendientes, to:'pedidos', ic:'shoppingBag', alerta:d.pedidos_pendientes>0 },
    ] },
    { t: 'Comunidad', items: [
      { l:'Personas', v:d.personas, to:'personas', ic:'users' },
      { l:'Miembros activos', v:d.miembros, to:'miembros', ic:'medal', tono:'is-gold' },
    ] },
    { t: 'Actividad', items: [
      { l:'Eventos', v:d.eventos, to:'eventos', ic:'calendar', tono:'is-info' },
      { l:'Próximos eventos', v:d.eventos_proximos, to:'eventos', ic:'clock', tono:'is-info' },
      { l:'Noticias', v:d.noticias, to:'noticias', ic:'book' },
    ] },
    { t: 'Correo', items: [
      { l:'Correos en cola', v:d.correos_pendientes, ic:'mail' },
      { l:'Cuota correo hoy', v:d.cuota_correo, ic:'send', tono:'is-green' },
    ] },
  ];
  const pendientes = (Number(d.solicitudes_pendientes) || 0) + (Number(d.pedidos_pendientes) || 0);
  return (
    <div className="ax-dash">
      <div className="adm-hello">
        <div className="adm-hello-row">
          <div>
            <div className="adm-overline">Panel de control</div>
            <h2>Resumen de la <em>sociedad</em></h2>
            <p>{pendientes ? `Tienes ${pendientes} pendiente(s) por revisar.` : 'Todo al día: no hay solicitudes ni pedidos pendientes.'}</p>
          </div>
          <img src="assets/mascota/mascota-laptop.png?v=3" alt="" className="adm-hello-mascota" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </div>
      </div>
      {grupos.map(g => (
        <div key={g.t} className="ax-kpi-group">
          <div className="adm-overline muted">{g.t}</div>
          <div className="adm-kpi-grid">
            {g.items.map((s, i) => {
              const Tag = s.to ? 'button' : 'div';
              // Pendientes en ámbar si hay algo que revisar; en verde si no.
              const tono = s.alerta !== undefined ? (s.alerta ? 'is-warn' : 'is-green') : (s.tono || '');
              return (
                <Tag key={i} type={s.to ? 'button' : undefined} className={'adm-kpi ' + tono + (s.to ? ' adm-kpi-link' : '')} onClick={s.to ? () => go(s.to) : undefined}>
                  <span className="adm-kpi-ico"><Icon name={s.ic} size={18} /></span>
                  <div className="adm-kpi-num">{s.v ?? 0}</div>
                  <div className="adm-kpi-label">{s.l}</div>
                  {s.alerta ? <div className="adm-kpi-foot ax-kpi-alerta"><span className="badge-dot" /> Revisar ahora</div>
                    : s.to ? <div className="adm-kpi-foot ax-kpi-ver">Ver sección <Icon name="arrow" size={12} /></div> : null}
                </Tag>
              );
            })}
          </div>
        </div>
      ))}
      <div className="adm-panel ax-kpi-group">
        <div className="adm-panel-head"><h3>Accesos rápidos</h3></div>
        <div className="adm-quick">
          {[
            { to:'eventos', ic:'plus', l:'Nuevo evento' },
            { to:'solicitudes', ic:'inbox', l:'Revisar solicitudes' },
            { to:'evaluaciones', ic:'check', l:'Evaluaciones' },
            { to:'certificados', ic:'medal', l:'Certificados' },
            { to:'personas', ic:'users', l:'Personas' },
            { to:'noticias', ic:'book', l:'Publicar noticia' },
          ].map(a => (
            <button key={a.to + a.l} type="button" className="adm-quick-item" onClick={() => go(a.to)}>
              <span className="adm-quick-ico"><Icon name={a.ic} size={16} /></span>{a.l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ───────────────────────── SOLICITUDES ─────────────────────────
const AdminSolicitudes = ({ toast }) => {
  const [items, setItems] = u4.useState(null);
  const [fallo, setFallo] = u4.useState('');
  const [ver, setVer] = u4.useState(null);
  const [q, setQ] = u4.useState('');
  const [fil, setFil] = u4.useState('TODOS');
  const load = () => { setFallo(''); return aApi.get('solicitudes', 'list').then(r => setItems(r.items || r.data || [])).catch(e => { toast.push(e.message, 'error'); setFallo(e.message); }); };
  u4.useEffect(() => { load(); }, []);
  const accion = async (s, act) => {
    try { await aApi.post('solicitudes', act, { id: s.id }); toast.push(act === 'aprobar' ? 'Aprobado · persona creada' : 'Rechazado', 'ok'); setVer(null); load(); }
    catch (e) { toast.push(e.message, 'error'); }
  };
  if (fallo && !items) return <AxFallo msg={fallo} onRetry={load} />;
  if (!items) return <AxSkeleton />;
  const extra = (s) => { try { return JSON.parse(s.extra_json || '{}'); } catch (e) { return {}; } };
  const est = (s) => axTxt(s.estado || 'PENDIENTE').toUpperCase();
  const n = (e) => items.filter(s => est(s) === e).length;
  const filtrados = items.filter(s => (fil === 'TODOS' || est(s) === fil)
    && (!q || (axTxt(s.nombres) + ' ' + axTxt(s.apellidos) + ' ' + axTxt(s.email) + ' ' + axTxt(s.dni)).toLowerCase().includes(q.toLowerCase())));
  const validado = (s) => axSi(s.email_validado);
  return (
    <>
      <AxHead title="Solicitudes" count={items.length} desc="Quienes pidieron unirse desde el formulario público. Solo se aprueban correos validados." />
      {items.length === 0 ? (
        <AxEmpty img="mascota-formulario" title="Sin solicitudes por ahora">Cuando alguien envíe el formulario de registro, aparecerá aquí para revisarlo.</AxEmpty>
      ) : (
        <>
          <AxToolbar>
            <AxSearch value={q} onChange={setQ} placeholder="Buscar por nombre, correo o DNI" />
            <AxChips value={fil} onChange={setFil} opts={[
              { v:'TODOS', l:'Todas', n:items.length }, { v:'PENDIENTE', l:'Pendientes', n:n('PENDIENTE') },
              { v:'APROBADO', l:'Aprobadas', n:n('APROBADO') }, { v:'RECHAZADO', l:'Rechazadas', n:n('RECHAZADO') },
            ]} />
          </AxToolbar>
          <AxTable>
            <thead><tr><th>Solicitante</th><th>Tipo</th><th>Correo</th><th>Estado</th><th className="ax-th-act"></th></tr></thead>
            <tbody>
              {filtrados.length === 0 && <AxSinCoincidencias cols={5} onClear={() => { setQ(''); setFil('TODOS'); }} />}
              {filtrados.map(s => (
                <tr key={s.id} className="ax-row-click" onClick={() => setVer(s)}>
                  <td>
                    <div className="adm-cell-main">
                      <AxThumb src={s.foto_url ? window.IMG(s.foto_url) : ''} icon="user" round />
                      <div className="ax-cell-txt"><strong>{s.nombres} {s.apellidos}</strong><span className="adm-cell-sub mono">{s.dni || 'sin DNI'}</span></div>
                    </div>
                  </td>
                  <td><span className="badge">{s.tipo_solicitante}{s.subtipo ? ' · ' + s.subtipo : ''}</span></td>
                  <td>
                    <div className="ax-cell-txt"><span>{s.email}</span>
                      <span className={'adm-cell-sub ' + (validado(s) ? 'ax-ok' : '')}>{validado(s) ? <><Icon name="check" size={12} /> Correo validado</> : 'Sin validar'}</span></div>
                  </td>
                  <td><AxEstado value={s.estado || 'PENDIENTE'} /></td>
                  <td className="ax-td-act"><AxIconBtn icon="eye" label="Ver solicitud" onClick={(e) => { e.stopPropagation(); setVer(s); }} /></td>
                </tr>
              ))}
            </tbody>
          </AxTable>
        </>
      )}
      <AM open={!!ver} onClose={() => setVer(null)} title="Solicitud de acceso" wide
        footer={ver && ver.estado !== 'APROBADO' && (
          <>
            <button className="btn btn-secondary ax-btn-danger" onClick={() => accion(ver, 'rechazar')}>Rechazar</button>
            <button className="btn btn-primary" disabled={!validado(ver)} onClick={() => accion(ver, 'aprobar')}><Icon name="check" size={14} /> Aprobar y crear persona</button>
          </>
        )}>
        {ver && (
          <div className="ax-perfil">
            <div className="ax-perfil-foto">
              {ver.foto_url ? <img src={window.IMG(ver.foto_url)} alt="" /> : <Icon name="user" size={32} />}
            </div>
            <div className="ax-perfil-body">
              <div className="ax-perfil-name">{ver.nombres} {ver.apellidos}</div>
              <div className="ax-perfil-badges">
                <AxEstado value={ver.estado || 'PENDIENTE'} />
                {validado(ver) ? <span className="badge badge-green"><Icon name="check" size={11} /> Correo validado</span> : <span className="badge badge-red">Correo sin validar</span>}
              </div>
              <dl className="ax-dl">
                <dt>Correo</dt><dd>{ver.email || '—'}</dd>
                <dt>DNI</dt><dd className="mono">{ver.dni || '—'}</dd>
                <dt>Código univ.</dt><dd className="mono">{ver.codigo_universitario || '—'}</dd>
                <dt>Celular</dt><dd className="mono">{ver.telefono || '—'}</dd>
                <dt>Cumpleaños</dt><dd>{ver.cumpleanos || '—'}</dd>
                <dt>Carrera</dt><dd>{ver.carrera || '—'}</dd>
                <dt>Año FMH</dt><dd>{ver.anio_estudios || '—'}</dd>
                <dt>Comité</dt><dd>{ver.comite_interes || '—'}</dd>
                {ver.motivo && <><dt>Comentario</dt><dd>{ver.motivo}</dd></>}
                {Object.entries(extra(ver)).map(([k, v]) => <u4.Fragment key={k}><dt>{k}</dt><dd>{String(v)}</dd></u4.Fragment>)}
              </dl>
              {!validado(ver) && <div className="ax-alert ax-alert-warn"><Icon name="shield" size={15} /> El correo aún no se ha validado; no se puede aprobar.</div>}
            </div>
          </div>
        )}
      </AM>
    </>
  );
};

// ───────────────────────── EVENTOS ─────────────────────────
const EV_TIPOS = ['PONENCIA','REUNION','TALLER','CURSO','CAMPANA','CONGRESO','WEBINAR'];
const EV_MOD = ['VIRTUAL','PRESENCIAL','HIBRIDO'];
const EV_ESTADO = ['PROGRAMADO','EN_CURSO','FINALIZADO','CANCELADO'];
const vacioEvento = { titulo:'', tipo:'PONENCIA', descripcion:'', comite_organizador:'', ponente_nombre:'', fecha:'', hora_inicio:'', hora_fin:'', modalidad:'VIRTUAL', lugar:'', plataforma:'', link_acceso:'', flyer_url:'', puntaje_base:'5', requiere_evaluacion:'SI', cupo:'', estado:'PROGRAMADO' };

const AdminEventos = ({ toast }) => {
  const [items, setItems] = u4.useState(null);
  const [fallo, setFallo] = u4.useState('');
  const [ed, setEd] = u4.useState(null);
  const [asis, setAsis] = u4.useState(null);
  const [lista, setLista] = u4.useState(''); // DNI o correo para pasar lista
  const [marcando, setMarcando] = u4.useState(false);
  const [q, setQ] = u4.useState('');
  const [fil, setFil] = u4.useState('TODOS');
  const load = () => { setFallo(''); return aApi.get('eventos', 'list').then(r => setItems(r.items || r.data || [])).catch(e => { toast.push(e.message,'error'); setFallo(e.message); }); };
  u4.useEffect(() => { load(); }, []);
  const recargarAsis = async (ev) => {
    const r = await aApi.get('eventos','conAsistencia',{ id: ev.id });
    setAsis({ ev, ...r.data });
  };
  // Pasar lista: marca entrada (1) o salida (2) por DNI o correo.
  const checkin = async (fase) => {
    const valor = lista.trim();
    if (!valor) { toast.push('Escribe un DNI o un correo', 'error'); return; }
    setMarcando(true);
    try {
      const esDni = /^\d{6,}$/.test(valor);
      const r = await aApi.post('asistencias', 'checkin', { evento_id: asis.ev.id, [esDni ? 'dni' : 'email']: valor, fase: String(fase) });
      toast.push(`${fase === 1 ? 'Entrada' : 'Salida'} marcada: ${r.data.nombre || valor}`, 'ok');
      setLista('');
      await recargarAsis(asis.ev);
    } catch (e) { toast.push(e.message, 'error'); }
    setMarcando(false);
  };
  const toggleVal = async (a, fase) => {
    try {
      await aApi.post('asistencias', 'toggleValidacion', { id: a.id, fase: String(fase) });
      await recargarAsis(asis.ev);
    } catch (e) { toast.push(e.message, 'error'); }
  };
  const save = async () => {
    if (!ed.titulo || !ed.fecha) { toast.push('Título y fecha requeridos','error'); return; }
    try { await aApi.post('eventos', ed.id ? 'update' : 'create', ed); toast.push('Guardado','ok'); setEd(null); load(); }
    catch (e) { toast.push(e.message,'error'); }
  };
  const verAsis = async (ev) => {
    try { const r = await aApi.get('eventos','conAsistencia',{ id:ev.id }); setAsis({ ev, ...r.data }); }
    catch (e) { toast.push(e.message,'error'); }
  };
  const certificados = async (ev) => {
    try { const r = await aApi.post('asistencias','emitirCertificados',{ evento_id:ev.id }); toast.push(`${r.data.encolados} certificados en cola (cuota ${r.data.cuota_restante})`,'ok'); }
    catch (e) { toast.push(e.message,'error'); }
  };
  if (fallo && !items) return <AxFallo msg={fallo} onRetry={load} />;
  if (!items) return <AxSkeleton />;
  const set = (k) => (e) => setEd(p => ({ ...p, [k]: e.target.value }));
  const est = (ev) => axTxt(ev.estado).toUpperCase();
  const n = (e) => items.filter(ev => est(ev) === e).length;
  const filtrados = items.filter(ev => (fil === 'TODOS' || est(ev) === fil)
    && (!q || (axTxt(ev.titulo) + ' ' + axTxt(ev.ponente_nombre) + ' ' + axTxt(ev.comite_organizador)).toLowerCase().includes(q.toLowerCase())));
  const asistentes = asis ? (asis.asistentes || []) : [];
  const v1 = asistentes.filter(a => axSi(a.validacion_1_ok)).length;
  const v2 = asistentes.filter(a => axSi(a.validacion_2_ok)).length;
  const nuevoBtn = <button className="btn btn-primary" onClick={() => setEd({ ...vacioEvento })}><Icon name="plus" size={14} /> Nuevo evento</button>;
  return (
    <>
      <AxHead title="Eventos" count={items.length} desc="Programa actividades, pasa lista y encola los certificados de quienes asistieron.">{nuevoBtn}</AxHead>
      {items.length === 0 ? (
        <AxEmpty img="mascota-megafono" title="Aún no hay eventos" action={nuevoBtn}>Crea el primero: ponencia, taller, campaña o congreso.</AxEmpty>
      ) : (
        <>
          <AxToolbar>
            <AxSearch value={q} onChange={setQ} placeholder="Buscar evento, ponente o comité" />
            <AxChips value={fil} onChange={setFil} opts={[{ v:'TODOS', l:'Todos', n:items.length }].concat(EV_ESTADO.map(e => ({ v:e, l:e.charAt(0) + e.slice(1).toLowerCase().replace('_', ' '), n:n(e) })))} />
          </AxToolbar>
          <AxTable>
            <thead><tr><th>Evento</th><th>Tipo</th><th>Fecha</th><th>Estado</th><th className="ax-th-act">Acciones</th></tr></thead>
            <tbody>
              {filtrados.length === 0 && <AxSinCoincidencias cols={5} onClear={() => { setQ(''); setFil('TODOS'); }} />}
              {filtrados.map(ev => (
                <tr key={ev.id}>
                  <td>
                    <div className="adm-cell-main">
                      <AxThumb src={ev.flyer_url ? window.IMG(ev.flyer_url) : ''} icon="calendar" />
                      <div className="ax-cell-txt"><strong className="ax-clamp">{ev.titulo}</strong><span className="adm-cell-sub">{[ev.ponente_nombre, ev.comite_organizador].filter(Boolean).join(' · ') || '—'}</span></div>
                    </div>
                  </td>
                  <td><span className="badge">{ev.tipo}</span></td>
                  <td className="mono ax-fecha">{ev.fecha}{ev.hora_inicio && <span className="adm-cell-sub">{ev.hora_inicio}{ev.hora_fin ? '–' + ev.hora_fin : ''}</span>}</td>
                  <td><AxEstado value={ev.estado} /></td>
                  <td className="ax-td-act">
                    <div className="adm-actions">
                      <AxIconBtn icon="users" label="Asistencia y pasar lista" onClick={() => verAsis(ev)} />
                      <AxIconBtn icon="medal" label="Encolar certificados por correo" onClick={() => certificados(ev)} />
                      <AxIconBtn icon="edit" label="Editar evento" onClick={() => setEd({ ...ev })} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </AxTable>
        </>
      )}

      <AM open={!!ed} onClose={() => setEd(null)} title={ed && ed.id ? 'Editar evento' : 'Nuevo evento'} wide
        footer={<><button className="btn btn-secondary" onClick={() => setEd(null)}>Cancelar</button><button className="btn btn-primary" onClick={save}>Guardar</button></>}>
        {ed && (
          <div className="adm-form-grid">
            <div className="ax-form-sec">Datos generales</div>
            <div className="adm-span-2"><AF label="Título *"><TInput value={ed.titulo} onChange={set('titulo')} /></AF></div>
            <AF label="Tipo"><TSelect value={ed.tipo} onChange={set('tipo')} opts={EV_TIPOS} /></AF>
            <AF label="Estado"><TSelect value={ed.estado} onChange={set('estado')} opts={EV_ESTADO} /></AF>
            <div className="adm-span-2"><AF label="Descripción"><textarea className="input" rows={3} value={ed.descripcion} onChange={set('descripcion')} /></AF></div>
            <AF label="Ponente"><TInput value={ed.ponente_nombre} onChange={set('ponente_nombre')} /></AF>
            <AF label="Comité organizador"><TInput value={ed.comite_organizador} onChange={set('comite_organizador')} /></AF>
            <div className="ax-form-sec">Fecha y lugar</div>
            <div className="adm-span-2 ax-form-3">
              <AF label="Fecha * (AAAA-MM-DD)"><TInput value={ed.fecha} onChange={set('fecha')} placeholder="2026-07-15" /></AF>
              <AF label="Hora inicio"><TInput value={ed.hora_inicio} onChange={set('hora_inicio')} placeholder="20:00" /></AF>
              <AF label="Hora fin"><TInput value={ed.hora_fin} onChange={set('hora_fin')} placeholder="21:30" /></AF>
            </div>
            <AF label="Modalidad"><TSelect value={ed.modalidad} onChange={set('modalidad')} opts={EV_MOD} /></AF>
            <AF label="Plataforma / Lugar"><TInput value={ed.plataforma} onChange={set('plataforma')} placeholder="Zoom, Meet, Auditorio…" /></AF>
            <div className="adm-span-2"><AF label="Enlace de acceso"><TInput value={ed.link_acceso} onChange={set('link_acceso')} placeholder="https://… o link de WhatsApp" /></AF></div>
            <div className="ax-form-sec">Puntaje y cupo</div>
            <div className="adm-span-2 ax-form-3">
              <AF label="Puntaje base"><TInput value={ed.puntaje_base} onChange={set('puntaje_base')} /></AF>
              <AF label="Cupo"><TInput value={ed.cupo} onChange={set('cupo')} /></AF>
              <AF label="¿Requiere evaluación?"><TSelect value={ed.requiere_evaluacion} onChange={set('requiere_evaluacion')} opts={['SI','NO']} /></AF>
            </div>
            <div className="adm-span-2"><AF label="Flyer del evento"><AdminFoto value={ed.flyer_url} carpeta="eventos" onChange={(d) => setEd(p => ({ ...p, flyer_url:d.url }))} /></AF></div>
          </div>
        )}
      </AM>

      <AM open={!!asis} onClose={() => { setAsis(null); setLista(''); }} title={asis ? 'Asistencia · ' + asis.ev.titulo : ''} wide>
        {asis && (
          <>
            {/* Pasar lista: DNI o correo → marcar entrada/salida. Si no estaba
                inscrito pero existe en personas, se registra al vuelo. */}
            <div className="adm-fieldset ax-fs ax-mb2">
              <div className="adm-fieldset-title">Pasar lista</div>
              <div className="ax-lista">
                <div className="adm-search ax-search-grow">
                  <span className="adm-search-ico"><Icon name="user" size={16} /></span>
                  <input className="input" placeholder="DNI o correo del asistente" aria-label="DNI o correo del asistente"
                    value={lista} onChange={e => setLista(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); checkin(1); } }} autoFocus />
                </div>
                <button className="btn btn-primary" disabled={marcando} onClick={() => checkin(1)}><Icon name="check" size={14} /> Entrada</button>
                <button className="btn btn-secondary" disabled={marcando} onClick={() => checkin(2)}><Icon name="logout" size={14} /> Salida</button>
              </div>
              <div className="adm-hint">Enter = marcar entrada. Con ambas validaciones en ✓ el certificado queda habilitado.</div>
            </div>
            <div className="ax-stats">
              <div className="ax-stat"><span className="ax-stat-n">{asis.total ?? asistentes.length}</span><span className="label muted">Registrados</span></div>
              <div className="ax-stat"><span className="ax-stat-n">{v1}</span><span className="label muted">Entrada ✓</span></div>
              <div className="ax-stat"><span className="ax-stat-n">{v2}</span><span className="label muted">Salida ✓</span></div>
            </div>
            <div className="adm-hint ax-mb">Haz clic en Entrada / Salida para corregir a mano.</div>
            <AxTable compact>
              <thead><tr><th>Nombre</th><th>DNI</th><th className="ax-th-c">Entrada</th><th className="ax-th-c">Salida</th><th className="ax-th-c">Cert.</th></tr></thead>
              <tbody>
                {asistentes.length === 0 && <tr className="ax-row-empty"><td colSpan={5}>Aún no hay asistentes. Pasa lista arriba con DNI o correo.</td></tr>}
                {asistentes.map(a => (
                  <tr key={a.id}>
                    <td><div className="ax-cell-txt"><strong>{a.nombre}</strong><span className="adm-cell-sub">{a.email}</span></div></td>
                    <td className="mono">{a.dni || '—'}</td>
                    <td className="ax-td-c"><button type="button" className={'ax-val' + (axSi(a.validacion_1_ok) ? ' is-on' : '')} aria-label="Alternar validación de entrada" title="Alternar entrada" onClick={() => toggleVal(a, 1)}>{axSi(a.validacion_1_ok) ? <Icon name="check" size={14} /> : '—'}</button></td>
                    <td className="ax-td-c"><button type="button" className={'ax-val' + (axSi(a.validacion_2_ok) ? ' is-on' : '')} aria-label="Alternar validación de salida" title="Alternar salida" onClick={() => toggleVal(a, 2)}>{axSi(a.validacion_2_ok) ? <Icon name="check" size={14} /> : '—'}</button></td>
                    <td className="ax-td-c">{axSi(a.certificado_enviado) ? <span className="badge badge-gold">Enviado</span> : <span className="adm-cell-sub">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </AxTable>
          </>
        )}
      </AM>
    </>
  );
};

// ───────────────────────── EVALUACIONES ─────────────────────────
const vacioEval = { evento_id:'', orden:'1', titulo:'', descripcion:'', puntaje:'2', nota_minima:'1', intentos_max:'2', fecha_apertura:'', fecha_cierre:'', activo:'NO' };
const vacioPreg = { evaluacion_id:'', orden:'1', enunciado:'', tipo:'OPCION_MULTIPLE', opcion_a:'', opcion_b:'', opcion_c:'', opcion_d:'', respuesta_correcta:'A', puntaje:'1' };

const AdminEvaluaciones = ({ toast }) => {
  const [items, setItems] = u4.useState(null);
  const [fallo, setFallo] = u4.useState('');
  const [eventos, setEventos] = u4.useState([]);
  const [ed, setEd] = u4.useState(null);
  const [preg, setPreg] = u4.useState(null); // {evaluacion, lista, editP}
  const [q, setQ] = u4.useState('');
  const [fil, setFil] = u4.useState('TODOS');
  const load = () => { setFallo(''); return aApi.get('evaluaciones','list').then(r => setItems(r.items || r.data || [])).catch(e => { toast.push(e.message,'error'); setFallo(e.message); }); };
  u4.useEffect(() => { load(); aApi.get('eventos','list').then(r => setEventos(r.items || r.data || [])).catch(()=>{}); }, []);
  const save = async () => {
    if (!ed.evento_id || !ed.titulo) { toast.push('Evento y título requeridos','error'); return; }
    try { await aApi.post('evaluaciones', ed.id ? 'update' : 'create', ed); toast.push('Guardado','ok'); setEd(null); load(); }
    catch (e) { toast.push(e.message,'error'); }
  };
  const toggle = async (ev) => { try { const r = await aApi.post('evaluaciones','toggle',{ id:ev.id }); toast.push(r.data.activo?'Habilitado':'Deshabilitado','ok'); load(); } catch (e) { toast.push(e.message,'error'); } };
  const copiarLink = (ev) => {
    const url = `${location.origin}${location.pathname}?test=${ev.link_token}`;
    navigator.clipboard ? navigator.clipboard.writeText(url).then(() => toast.push('Link copiado','ok')) : toast.push(url,'info');
  };
  const abrirPreg = async (ev) => {
    try { const r = await aApi.get('preguntas','list',{ evaluacion_id:ev.id }); setPreg({ evaluacion:ev, lista:r.items||r.data||[], editP:null }); }
    catch (e) { toast.push(e.message,'error'); }
  };
  const guardarPreg = async () => {
    const ep = preg.editP;
    if (!ep.enunciado) { toast.push('Enunciado requerido','error'); return; }
    try { await aApi.post('preguntas', ep.id ? 'update' : 'create', { ...ep, evaluacion_id: preg.evaluacion.id });
      const r = await aApi.get('preguntas','list',{ evaluacion_id: preg.evaluacion.id });
      setPreg(p => ({ ...p, lista:r.items||r.data||[], editP:null })); toast.push('Pregunta guardada','ok'); }
    catch (e) { toast.push(e.message,'error'); }
  };
  if (fallo && !items) return <AxFallo msg={fallo} onRetry={load} />;
  if (!items) return <AxSkeleton />;
  const set = (k) => (e) => setEd(p => ({ ...p, [k]: e.target.value }));
  const setP = (k) => (e) => setPreg(p => ({ ...p, editP:{ ...p.editP, [k]: e.target.value } }));
  const tituloEvento = (id) => { const e = eventos.find(x => String(x.id)===String(id)); return e ? e.titulo : id; };
  const activos = items.filter(ev => axSi(ev.activo)).length;
  const filtrados = items.filter(ev => (fil === 'TODOS' || (fil === 'SI') === axSi(ev.activo))
    && (!q || (axTxt(ev.titulo) + ' ' + axTxt(tituloEvento(ev.evento_id))).toLowerCase().includes(q.toLowerCase())));
  const nuevoBtn = <button className="btn btn-primary" onClick={() => setEd({ ...vacioEval })}><Icon name="plus" size={14} /> Nueva evaluación</button>;
  return (
    <>
      <AxHead title="Evaluaciones" count={items.length} desc="Pre-test y post-test de cada evento. El link público solo responde mientras el test esté activo.">{nuevoBtn}</AxHead>
      {items.length === 0 ? (
        <AxEmpty img="mascota-investiga" title="Sin evaluaciones todavía" action={nuevoBtn}>Crea un pre-test o post-test y enlázalo a un evento para validar la asistencia.</AxEmpty>
      ) : (
        <>
          <AxToolbar>
            <AxSearch value={q} onChange={setQ} placeholder="Buscar test o evento" />
            <AxChips value={fil} onChange={setFil} opts={[{ v:'TODOS', l:'Todas', n:items.length }, { v:'SI', l:'Activas', n:activos }, { v:'NO', l:'Cerradas', n:items.length - activos }]} />
          </AxToolbar>
          <AxTable>
            <thead><tr><th>Test</th><th>Evento</th><th className="ax-th-c">Orden</th><th>Estado</th><th className="ax-th-act">Acciones</th></tr></thead>
            <tbody>
              {filtrados.length === 0 && <AxSinCoincidencias cols={5} onClear={() => { setQ(''); setFil('TODOS'); }} />}
              {filtrados.map(ev => (
                <tr key={ev.id}>
                  <td><div className="adm-cell-main"><span className="ax-orden mono">{ev.orden}</span><strong className="ax-clamp">{ev.titulo}</strong></div></td>
                  <td><span className="ax-clamp ax-soft">{tituloEvento(ev.evento_id)}</span></td>
                  <td className="ax-td-c"><span className="badge badge-violet">{String(ev.orden) === '2' ? 'Post' : 'Pre'}</span></td>
                  <td><AxEstado value={axSi(ev.activo) ? 'ACTIVO' : 'CERRADO'} onClick={() => toggle(ev)} title="Clic para habilitar o cerrar" /></td>
                  <td className="ax-td-act">
                    <div className="adm-actions">
                      <AxIconBtn icon="link" label="Copiar link público" onClick={() => copiarLink(ev)} />
                      <AxIconBtn icon="layers" label="Preguntas" onClick={() => abrirPreg(ev)} />
                      <AxIconBtn icon="edit" label="Editar evaluación" onClick={() => setEd({ ...ev })} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </AxTable>
        </>
      )}

      <AM open={!!ed} onClose={() => setEd(null)} title={ed && ed.id ? 'Editar evaluación' : 'Nueva evaluación'} wide
        footer={<><button className="btn btn-secondary" onClick={() => setEd(null)}>Cancelar</button><button className="btn btn-primary" onClick={save}>Guardar</button></>}>
        {ed && (
          <div className="adm-form-grid">
            <div className="adm-span-2"><AF label="Evento *"><TSelect value={ed.evento_id} onChange={set('evento_id')} opts={[{v:'',l:'— elige —'}].concat(eventos.map(e => ({ v:e.id, l:e.titulo })))} /></AF></div>
            <AF label="Título"><TInput value={ed.titulo} onChange={set('titulo')} placeholder="Validación 1 — Pre-test" /></AF>
            <AF label="Orden (1 ó 2)"><TSelect value={ed.orden} onChange={set('orden')} opts={['1','2']} /></AF>
            <div className="adm-span-2"><AF label="Descripción"><TInput value={ed.descripcion} onChange={set('descripcion')} /></AF></div>
            <div className="adm-span-2 ax-form-3">
              <AF label="Puntaje"><TInput value={ed.puntaje} onChange={set('puntaje')} /></AF>
              <AF label="Nota mínima"><TInput value={ed.nota_minima} onChange={set('nota_minima')} /></AF>
              <AF label="Intentos máx"><TInput value={ed.intentos_max} onChange={set('intentos_max')} /></AF>
            </div>
            <AF label="Apertura (opcional)"><TInput value={ed.fecha_apertura} onChange={set('fecha_apertura')} placeholder="2026-07-15T20:00:00" /></AF>
            <AF label="Cierre (opcional)"><TInput value={ed.fecha_cierre} onChange={set('fecha_cierre')} placeholder="2026-07-16T23:59:00" /></AF>
            <div className="adm-span-2 adm-note"><Icon name="shield" size={15} /> El link público se genera al crear. Habilita o cierra desde la tabla. La respuesta correcta nunca se envía al alumno.</div>
          </div>
        )}
      </AM>

      <AM open={!!preg} onClose={() => setPreg(null)} title={preg ? 'Preguntas · ' + preg.evaluacion.titulo : ''} wide
        footer={!(preg && preg.editP) && <button className="btn btn-primary" onClick={() => setPreg(p => ({ ...p, editP:{ ...vacioPreg, orden:String((p.lista.length)+1) } }))}><Icon name="plus" size={14} /> Añadir pregunta</button>}>
        {preg && !preg.editP && (
          <div className="ax-qlist">
            {preg.lista.length === 0 && <div className="ax-row-empty ax-pad">Sin preguntas. Añade la primera con el botón de abajo.</div>}
            {preg.lista.map(q => (
              <div key={q.id} className="ax-q">
                <span className="ax-orden mono">{q.orden}</span>
                <div className="ax-q-body">
                  <div className="ax-q-txt">{q.enunciado}</div>
                  <div className="ax-q-meta"><span className="badge">{axTxt(q.tipo).replace('_', ' ')}</span><span className="badge badge-green">Correcta: {q.respuesta_correcta}</span><span className="caption">{q.puntaje} pt</span></div>
                </div>
                <AxIconBtn icon="edit" label="Editar pregunta" onClick={() => setPreg(p => ({ ...p, editP:{ ...q } }))} />
              </div>
            ))}
          </div>
        )}
        {preg && preg.editP && (
          <div className="adm-form-grid">
            <div className="adm-span-2"><AF label="Enunciado"><textarea className="input" rows={3} value={preg.editP.enunciado} onChange={setP('enunciado')} /></AF></div>
            <AF label="Tipo"><TSelect value={preg.editP.tipo} onChange={setP('tipo')} opts={['OPCION_MULTIPLE','VF','TEXTO']} /></AF>
            <AF label="Orden"><TInput value={preg.editP.orden} onChange={setP('orden')} /></AF>
            {preg.editP.tipo === 'OPCION_MULTIPLE' && (
              <>
                <AF label="Opción A"><TInput value={preg.editP.opcion_a} onChange={setP('opcion_a')} /></AF>
                <AF label="Opción B"><TInput value={preg.editP.opcion_b} onChange={setP('opcion_b')} /></AF>
                <AF label="Opción C"><TInput value={preg.editP.opcion_c} onChange={setP('opcion_c')} /></AF>
                <AF label="Opción D"><TInput value={preg.editP.opcion_d} onChange={setP('opcion_d')} /></AF>
              </>
            )}
            <AF label="Respuesta correcta"><TInput value={preg.editP.respuesta_correcta} onChange={setP('respuesta_correcta')} placeholder={preg.editP.tipo==='VF'?'Verdadero / Falso':'A, B, C o D'} /></AF>
            <AF label="Puntaje"><TInput value={preg.editP.puntaje} onChange={setP('puntaje')} /></AF>
            <div className="adm-span-2 ax-form-actions"><button className="btn btn-secondary" onClick={() => setPreg(p => ({ ...p, editP:null }))}>Cancelar</button><button className="btn btn-primary" onClick={guardarPreg}>Guardar pregunta</button></div>
          </div>
        )}
      </AM>
    </>
  );
};

// ───────────────────────── PERSONAS ─────────────────────────
const PER_TIPOS = ['ESTUDIANTE','ASESOR','DOCENTE','ADMINISTRATIVO','EXTERNO'];
const PER_ESTADOS = ['ACTIVO','INACTIVO','EGRESADO','SUSPENDIDO'];
const vacioPersona = { tipo:'ESTUDIANTE', nombres:'', apellidos:'', dni:'', email:'', telefono:'', whatsapp:'', carrera:'Medicina Humana', semestre:'', codigo_universitario:'', foto_url:'', bio:'', orcid:'', cti_vitae_url:'', estado:'ACTIVO', origen_registro:'ADMIN' };

const AdminPersonas = ({ toast }) => {
  const [items, setItems] = u4.useState(null);
  const [fallo, setFallo] = u4.useState('');
  const [ed, setEd] = u4.useState(null);
  const [q, setQ] = u4.useState('');
  const [tipo, setTipo] = u4.useState('TODOS');
  const load = () => { setFallo(''); return aApi.get('personas','list').then(r => setItems(r.items || r.data || [])).catch(e => { toast.push(e.message,'error'); setFallo(e.message); }); };
  u4.useEffect(() => { load(); }, []);
  const save = async () => {
    if (!ed.nombres || !ed.email) { toast.push('Nombres y correo requeridos','error'); return; }
    try { await aApi.post('personas', ed.id ? 'update' : 'create', ed); toast.push('Guardado','ok'); setEd(null); load(); }
    catch (e) { toast.push(e.message,'error'); }
  };
  const del = async (p) => { if (!confirm('¿Marcar como INACTIVO a '+p.nombres+'?')) return; try { await aApi.post('personas','update',{ id:p.id, estado:'INACTIVO' }); toast.push('Inactivado','ok'); load(); } catch (e) { toast.push(e.message,'error'); } };
  if (fallo && !items) return <AxFallo msg={fallo} onRetry={load} />;
  if (!items) return <AxSkeleton />;
  const set = (k) => (e) => setEd(p => ({ ...p, [k]: e.target.value }));
  const filtrados = items.filter(p => (tipo==='TODOS'||p.tipo===tipo) && (!q || (axTxt(p.nombres)+' '+axTxt(p.apellidos)+' '+axTxt(p.email)).toLowerCase().includes(q.toLowerCase())));
  const nTipo = (t) => items.filter(p => p.tipo === t).length;
  const nuevoBtn = <button className="btn btn-primary" onClick={() => setEd({ ...vacioPersona })}><Icon name="plus" size={14} /> Nueva persona</button>;
  return (
    <>
      <AxHead title="Personas" count={items.length} desc="Registro único de estudiantes, asesores y externos. Inactivar no borra el historial.">{nuevoBtn}</AxHead>
      {items.length === 0 ? (
        <AxEmpty img="mascota-birrete" title="Aún no hay personas" action={nuevoBtn}>Se crean al aprobar solicitudes o a mano desde aquí.</AxEmpty>
      ) : (
        <>
          <AxToolbar>
            <AxSearch value={q} onChange={setQ} placeholder="Buscar por nombre o correo" />
            <AxChips value={tipo} onChange={setTipo} opts={[{ v:'TODOS', l:'Todos', n:items.length }].concat(PER_TIPOS.map(t => ({ v:t, l:t.charAt(0) + t.slice(1).toLowerCase(), n:nTipo(t) })))} />
          </AxToolbar>
          <AxTable>
            <thead><tr><th>Nombre</th><th>Tipo</th><th>Correo</th><th>Estado</th><th className="ax-th-act">Acciones</th></tr></thead>
            <tbody>
              {filtrados.length === 0 && <AxSinCoincidencias cols={5} onClear={() => { setQ(''); setTipo('TODOS'); }} />}
              {filtrados.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="adm-cell-main">
                      <AxThumb src={p.foto_url ? window.IMG(p.foto_url) : ''} icon="user" round />
                      <div className="ax-cell-txt"><strong>{p.nombres} {p.apellidos}</strong>{p.dni && <span className="adm-cell-sub mono">DNI {p.dni}</span>}</div>
                    </div>
                  </td>
                  <td><span className="badge">{p.tipo}</span></td>
                  <td className="ax-soft">{p.email}</td>
                  <td><AxEstado value={p.estado} /></td>
                  <td className="ax-td-act">
                    <div className="adm-actions">
                      <AxIconBtn icon="edit" label="Editar persona" onClick={() => setEd({ ...p })} />
                      <AxIconBtn icon="trash" label="Marcar como inactiva" tone="danger" onClick={() => del(p)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </AxTable>
        </>
      )}

      <AM open={!!ed} onClose={() => setEd(null)} title={ed && ed.id ? 'Editar persona' : 'Nueva persona'} wide
        footer={<><button className="btn btn-secondary" onClick={() => setEd(null)}>Cancelar</button><button className="btn btn-primary" onClick={save}>Guardar</button></>}>
        {ed && (
          <div className="adm-form-grid">
            <div className="adm-span-2"><AF label="Foto"><AdminFoto value={ed.foto_url} carpeta={ed.tipo==='ASESOR'||ed.tipo==='DOCENTE'?'asesores':'miembros'} onChange={(d) => setEd(p => ({ ...p, foto_url:d.url }))} /></AF></div>
            <AF label="Tipo"><TSelect value={ed.tipo} onChange={set('tipo')} opts={PER_TIPOS} /></AF>
            <AF label="Estado"><TSelect value={ed.estado} onChange={set('estado')} opts={PER_ESTADOS} /></AF>
            <AF label="Nombres *"><TInput value={ed.nombres} onChange={set('nombres')} /></AF>
            <AF label="Apellidos"><TInput value={ed.apellidos} onChange={set('apellidos')} /></AF>
            <AF label="Correo *"><TInput value={ed.email} onChange={set('email')} /></AF>
            <AF label="WhatsApp"><TInput value={ed.whatsapp} onChange={set('whatsapp')} placeholder="51951000000" /></AF>
            <div className="adm-span-2 ax-form-3">
              <AF label="DNI"><TInput value={ed.dni} onChange={set('dni')} /></AF>
              <AF label="Código univ."><TInput value={ed.codigo_universitario} onChange={set('codigo_universitario')} /></AF>
              <AF label="Semestre"><TInput value={ed.semestre} onChange={set('semestre')} /></AF>
            </div>
            <div className="adm-span-2"><AF label="Carrera"><TInput value={ed.carrera} onChange={set('carrera')} /></AF></div>
            <div className="adm-span-2"><AF label="Bio / descripción"><textarea className="input" rows={3} value={ed.bio} onChange={set('bio')} /></AF></div>
            <AF label="ORCID"><TInput value={ed.orcid} onChange={set('orcid')} placeholder="0000-0000-0000-0000" /></AF>
            <AF label="CTI Vitae (URL)"><TInput value={ed.cti_vitae_url} onChange={set('cti_vitae_url')} /></AF>
          </div>
        )}
      </AM>
    </>
  );
};

// ───────────────────────── TIENDA · Productos ─────────────────────────
const PROD_CAT = ['POLO','TOMATODO','STICKER','KIT','LIBRO','OTRO'];
const vacioProd = { nombre:'', descripcion:'', categoria:'POLO', precio:'', stock:'', imagen_url:'', destacado:'NO', activo:'SI' };
const AdminProductos = ({ toast }) => {
  const [items, setItems] = u4.useState(null);
  const [fallo, setFallo] = u4.useState('');
  const [ed, setEd] = u4.useState(null);
  const [q, setQ] = u4.useState('');
  const [cat, setCat] = u4.useState('TODOS');
  const load = () => { setFallo(''); return aApi.get('productos','list').then(r => setItems(r.items || r.data || [])).catch(e => { toast.push(e.message,'error'); setFallo(e.message); }); };
  u4.useEffect(() => { load(); }, []);
  const save = async () => {
    if (!ed.nombre || !ed.precio) { toast.push('Nombre y precio requeridos','error'); return; }
    try { await aApi.post('productos', ed.id ? 'update' : 'create', ed); toast.push('Guardado','ok'); setEd(null); load(); }
    catch (e) { toast.push(e.message,'error'); }
  };
  const del = async (p) => { if (!confirm('¿Desactivar '+p.nombre+'?')) return; try { await aApi.post('productos','delete',{ id:p.id }); toast.push('Desactivado','ok'); load(); } catch (e) { toast.push(e.message,'error'); } };
  if (fallo && !items) return <AxFallo msg={fallo} onRetry={load} />;
  if (!items) return <AxSkeleton />;
  const set = (k) => (e) => setEd(p => ({ ...p, [k]: e.target.value }));
  const usadas = PROD_CAT.filter(c => items.some(p => p.categoria === c));
  const filtrados = items.filter(p => (cat === 'TODOS' || p.categoria === cat) && (!q || axTxt(p.nombre).toLowerCase().includes(q.toLowerCase())));
  const nuevoBtn = <button className="btn btn-primary" onClick={() => setEd({ ...vacioProd })}><Icon name="plus" size={14} /> Nuevo producto</button>;
  return (
    <>
      <AxHead title="Productos" count={items.length} desc="Catálogo de la tienda: polos, tomatodos, stickers y kits.">{nuevoBtn}</AxHead>
      {items.length === 0 ? (
        <AxEmpty img="mascota-tienda" title="La tienda está vacía" action={nuevoBtn}>Agrega el primer producto con su foto, precio y stock.</AxEmpty>
      ) : (
        <>
          <AxToolbar>
            <AxSearch value={q} onChange={setQ} placeholder="Buscar producto" />
            <AxChips value={cat} onChange={setCat} opts={[{ v:'TODOS', l:'Todos', n:items.length }].concat(usadas.map(c => ({ v:c, l:c.charAt(0) + c.slice(1).toLowerCase(), n:items.filter(p => p.categoria === c).length })))} />
          </AxToolbar>
          <AxTable>
            <thead><tr><th>Producto</th><th>Categoría</th><th className="ax-th-num">Precio</th><th className="ax-th-num">Stock</th><th>Estado</th><th className="ax-th-act">Acciones</th></tr></thead>
            <tbody>
              {filtrados.length === 0 && <AxSinCoincidencias cols={6} onClear={() => { setQ(''); setCat('TODOS'); }} />}
              {filtrados.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="adm-cell-main">
                      <AxThumb src={p.imagen_url ? window.IMG(p.imagen_url) : ''} icon="shoppingBag" />
                      <div className="ax-cell-txt"><strong className="ax-clamp">{p.nombre}</strong>{axSi(p.destacado) && <span className="adm-cell-sub ax-gold"><Icon name="star" size={11} /> Destacado</span>}</div>
                    </div>
                  </td>
                  <td><span className="badge">{p.categoria}</span></td>
                  <td className="adm-num">S/ {Number(p.precio).toFixed(2)}</td>
                  <td className={'adm-num' + (Number(p.stock) <= 0 && axTxt(p.stock) !== '' ? ' ax-num-warn' : '')}>{p.stock}</td>
                  <td><AxEstado value={axSi(p.activo) ? 'ACTIVO' : 'INACTIVO'} /></td>
                  <td className="ax-td-act">
                    <div className="adm-actions">
                      <AxIconBtn icon="edit" label="Editar producto" onClick={() => setEd({ ...p })} />
                      <AxIconBtn icon="trash" label="Quitar de la tienda" tone="danger" onClick={() => del(p)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </AxTable>
        </>
      )}
      <AM open={!!ed} onClose={() => setEd(null)} title={ed && ed.id ? 'Editar producto' : 'Nuevo producto'} wide
        footer={<><button className="btn btn-secondary" onClick={() => setEd(null)}>Cancelar</button><button className="btn btn-primary" onClick={save}>Guardar</button></>}>
        {ed && (
          <div className="adm-form-grid">
            <div className="adm-span-2"><AF label="Imagen"><AdminFoto value={ed.imagen_url} carpeta="productos" onChange={(d) => setEd(p => ({ ...p, imagen_url:d.url }))} /></AF></div>
            <div className="adm-span-2"><AF label="Nombre *"><TInput value={ed.nombre} onChange={set('nombre')} /></AF></div>
            <div className="adm-span-2"><AF label="Descripción"><textarea className="input" rows={3} value={ed.descripcion} onChange={set('descripcion')} /></AF></div>
            <div className="adm-span-2 ax-form-3">
              <AF label="Categoría"><TSelect value={ed.categoria} onChange={set('categoria')} opts={PROD_CAT} /></AF>
              <AF label="Precio (S/)"><TInput value={ed.precio} onChange={set('precio')} inputMode="decimal" /></AF>
              <AF label="Stock"><TInput value={ed.stock} onChange={set('stock')} inputMode="numeric" /></AF>
            </div>
            <AF label="Destacado"><TSelect value={ed.destacado} onChange={set('destacado')} opts={['SI','NO']} /></AF>
            <AF label="Activo"><TSelect value={ed.activo} onChange={set('activo')} opts={['SI','NO']} /></AF>
          </div>
        )}
      </AM>
    </>
  );
};

// ───────────────────────── TIENDA · Pedidos ─────────────────────────
const PED_ESTADOS = ['PENDIENTE','PAGADO','ENTREGADO','CANCELADO'];
const AdminPedidos = ({ toast }) => {
  const [items, setItems] = u4.useState(null);
  const [fallo, setFallo] = u4.useState('');
  const [ver, setVer] = u4.useState(null);
  const [q, setQ] = u4.useState('');
  const [fil, setFil] = u4.useState('TODOS');
  const load = () => { setFallo(''); return aApi.get('pedidos','list').then(r => setItems(r.items || r.data || [])).catch(e => { toast.push(e.message,'error'); setFallo(e.message); }); };
  u4.useEffect(() => { load(); }, []);
  const cambiar = async (ped, estado) => { try { await aApi.post('pedidos','updateEstado',{ id:ped.id, estado }); toast.push('Actualizado','ok'); load(); setVer(v => v && { ...v, estado }); } catch (e) { toast.push(e.message,'error'); } };
  if (fallo && !items) return <AxFallo msg={fallo} onRetry={load} />;
  if (!items) return <AxSkeleton />;
  const est = (p) => axTxt(p.estado).toUpperCase();
  const filtrados = items.filter(p => (fil === 'TODOS' || est(p) === fil)
    && (!q || (axTxt(p.codigo) + ' ' + axTxt(p.comprador_nombre) + ' ' + axTxt(p.email)).toLowerCase().includes(q.toLowerCase())));
  return (
    <>
      <AxHead title="Pedidos" count={items.length} desc="Compras hechas en la tienda. Cambia el estado al confirmar el pago o la entrega." />
      {items.length === 0 ? (
        <AxEmpty img="mascota-carrito" title="Sin pedidos todavía">Cuando alguien compre en la tienda, el pedido aparecerá aquí.</AxEmpty>
      ) : (
        <>
          <AxToolbar>
            <AxSearch value={q} onChange={setQ} placeholder="Buscar por código o comprador" />
            <AxChips value={fil} onChange={setFil} opts={[{ v:'TODOS', l:'Todos', n:items.length }].concat(PED_ESTADOS.map(e => ({ v:e, l:e.charAt(0) + e.slice(1).toLowerCase(), n:items.filter(p => est(p) === e).length })))} />
          </AxToolbar>
          <AxTable>
            <thead><tr><th>Código</th><th>Comprador</th><th className="ax-th-num">Total</th><th>Pago</th><th>Estado</th><th className="ax-th-act"></th></tr></thead>
            <tbody>
              {filtrados.length === 0 && <AxSinCoincidencias cols={6} onClear={() => { setQ(''); setFil('TODOS'); }} />}
              {filtrados.map(p => (
                <tr key={p.id} className="ax-row-click" onClick={() => setVer(p)}>
                  <td className="mono ax-code">{p.codigo}</td>
                  <td><div className="ax-cell-txt"><strong>{p.comprador_nombre}</strong><span className="adm-cell-sub">{p.email}</span></div></td>
                  <td className="adm-num">S/ {Number(p.total).toFixed(2)}</td>
                  <td className="ax-soft">{p.metodo_pago || '—'}</td>
                  <td><AxEstado value={p.estado} /></td>
                  <td className="ax-td-act"><AxIconBtn icon="eye" label="Ver pedido" onClick={(e) => { e.stopPropagation(); setVer(p); }} /></td>
                </tr>
              ))}
            </tbody>
          </AxTable>
        </>
      )}
      <AM open={!!ver} onClose={() => setVer(null)} title={ver ? 'Pedido ' + ver.codigo : ''} wide>
        {ver && (
          <>
            <div className="adm-fieldset ax-fs ax-pedido-head ax-mb2">
              <div className="ax-cell-txt"><strong>{ver.comprador_nombre}</strong><span className="adm-cell-sub">{[ver.email, ver.telefono].filter(Boolean).join(' · ')}</span></div>
              <AxEstado value={ver.estado} />
            </div>
            <AxTable compact>
              <thead><tr><th>Producto</th><th className="ax-th-num">Cant.</th><th className="ax-th-num">P. unit.</th><th className="ax-th-num">Subtotal</th></tr></thead>
              <tbody>{(ver.items || []).map(it => <tr key={it.id}><td>{it.nombre_producto}</td><td className="adm-num">{it.cantidad}</td><td className="adm-num">S/ {Number(it.precio_unitario).toFixed(2)}</td><td className="adm-num">S/ {Number(it.subtotal).toFixed(2)}</td></tr>)}</tbody>
            </AxTable>
            <div className="ax-pedido-foot">
              <div className="ax-total"><span className="label muted">Total</span><span className="ax-total-n mono">S/ {Number(ver.total).toFixed(2)}</span></div>
              <div className="ax-pedido-estado"><span className="label muted">Estado</span><TSelect value={ver.estado} onChange={(e) => cambiar(ver, e.target.value)} opts={PED_ESTADOS} /></div>
            </div>
          </>
        )}
      </AM>
    </>
  );
};

// ───────────────────────── NOTICIAS / DIARIO CIENTÍFICO ─────────────────────
// Widget para subir archivos (PDF de papers) a Drive.
const AdminArchivo = ({ value, carpeta, onChange }) => {
  const [up, setUp] = u4.useState(false); const [e, setE] = u4.useState('');
  const pick = async (ev) => {
    const file = ev.target.files && ev.target.files[0]; if (!file) return;
    setUp(true); setE('');
    try { const r = await window.SOCIEM_API.uploadFile(file, carpeta || 'papers'); if (r && r.ok) onChange(r.data.url); else setE((r && r.error) || 'Error'); }
    catch (err) { setE(String(err)); }
    setUp(false);
  };
  return (
    <div className="ax-archivo">
      <label className="btn btn-secondary btn-sm ax-file-btn"><Icon name="upload" size={14} /> {up ? 'Subiendo…' : value ? 'Cambiar PDF' : 'Subir PDF'}<input type="file" accept=".pdf,application/pdf" onChange={pick} disabled={up} hidden /></label>
      {value && <a className="btn-link ax-archivo-link" href={value} target="_blank" rel="noopener noreferrer"><Icon name="link" size={13} /> Ver PDF</a>}
      {e && <span className="ax-err">{e}</span>}
    </div>
  );
};

const NOT_TIPOS = ['PAPER', 'NOTICIA', 'COMUNICADO', 'EVENTO'];
const slugify = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
const hoyISO = () => { try { return new Date().toISOString().slice(0, 10); } catch (e) { return ''; } };

const AdminNoticias = ({ toast }) => {
  const [items, setItems] = u4.useState(null);
  const [fallo, setFallo] = u4.useState('');
  const [ed, setEd] = u4.useState(null);
  const [q, setQ] = u4.useState('');
  const [fil, setFil] = u4.useState('TODOS');
  const load = () => { setFallo(''); return aApi.get('noticias', 'list').then(r => setItems(r.items || r.data || [])).catch(e => { toast.push(e.message, 'error'); setFallo(e.message); }); };
  u4.useEffect(() => { load(); }, []);
  const nuevo = () => setEd({ tipo: 'PAPER', titulo: '', slug: '', autor_nombre: '', resumen: '', comentario: '', cita: '', doi: '', pdf_url: '', preguntas: '', imagen_portada: '', comite_relacionado: '', categoria: '', fecha_publicacion: hoyISO(), destacado: 'NO', publicado: 'NO' });
  const save = async () => {
    if (!ed.titulo) { toast.push('Título requerido', 'error'); return; }
    const payload = { ...ed, slug: ed.slug || slugify(ed.titulo) };
    try { await aApi.post('noticias', ed.id ? 'update' : 'create', payload); toast.push('Guardado', 'ok'); setEd(null); load(); }
    catch (e) { toast.push(e.message, 'error'); }
  };
  const togglePub = async (n) => { try { await aApi.post('noticias', isTrueS(n.publicado) ? 'unpublish' : 'publish', { id: n.id }); toast.push(isTrueS(n.publicado) ? 'Despublicado' : 'Publicado', 'ok'); load(); } catch (e) { toast.push(e.message, 'error'); } };
  function isTrueS(v) { return String(v).toUpperCase() === 'SI'; }
  if (fallo && !items) return <AxFallo msg={fallo} onRetry={load} />;
  if (!items) return <AxSkeleton />;
  const set = (k) => (e) => setEd(p => ({ ...p, [k]: e.target.value }));
  const esPaper = ed && ed.tipo === 'PAPER';
  const tipoDe = (n) => axTxt(n.tipo || 'NOTICIA').toUpperCase();
  const filtrados = items.filter(n => (fil === 'TODOS' || (fil === 'BORRADOR' ? !isTrueS(n.publicado) : tipoDe(n) === fil))
    && (!q || (axTxt(n.titulo) + ' ' + axTxt(n.autor_nombre)).toLowerCase().includes(q.toLowerCase())));
  const nuevoBtn = <button className="btn btn-primary" onClick={nuevo}><Icon name="plus" size={14} /> Nueva publicación</button>;
  return (
    <>
      <AxHead title="Publicaciones" count={items.length} desc="Papers del club de revistas, noticias y comunicados. Se guardan como borrador hasta publicarlos.">{nuevoBtn}</AxHead>
      {items.length === 0 ? (
        <AxEmpty img="mascota-lectura" title="Nada publicado aún" action={nuevoBtn}>Comparte el primer paper comentado o una noticia de la sociedad.</AxEmpty>
      ) : (
        <>
          <AxToolbar>
            <AxSearch value={q} onChange={setQ} placeholder="Buscar título o autor" />
            <AxChips value={fil} onChange={setFil} opts={[{ v:'TODOS', l:'Todas', n:items.length }]
              .concat(NOT_TIPOS.map(t => ({ v:t, l:t.charAt(0) + t.slice(1).toLowerCase(), n:items.filter(n => tipoDe(n) === t).length })).filter(o => o.n))
              .concat([{ v:'BORRADOR', l:'Borradores', n:items.filter(n => !isTrueS(n.publicado)).length }])} />
          </AxToolbar>
          <AxTable>
            <thead><tr><th>Título</th><th>Tipo</th><th>Fecha</th><th>Estado</th><th className="ax-th-act"></th></tr></thead>
            <tbody>
              {filtrados.length === 0 && <AxSinCoincidencias cols={5} onClear={() => { setQ(''); setFil('TODOS'); }} />}
              {filtrados.map(n => (
                <tr key={n.id}>
                  <td>
                    <div className="adm-cell-main">
                      <AxThumb src={n.imagen_portada ? window.IMG(n.imagen_portada) : ''} icon="book" />
                      <div className="ax-cell-txt"><strong className="ax-clamp">{n.titulo}</strong><span className="adm-cell-sub">{n.autor_nombre || 'Sin autor'}{isTrueS(n.destacado) && <> · <span className="ax-gold">Destacado</span></>}</span></div>
                    </div>
                  </td>
                  <td><span className={'badge' + (tipoDe(n) === 'PAPER' ? ' badge-violet' : '')}>{tipoDe(n)}</span></td>
                  <td className="mono ax-fecha">{String(n.fecha_publicacion).slice(0, 10)}</td>
                  <td><AxEstado value={isTrueS(n.publicado) ? 'PUBLICADO' : 'BORRADOR'} onClick={() => togglePub(n)} title={isTrueS(n.publicado) ? 'Clic para despublicar' : 'Clic para publicar'} /></td>
                  <td className="ax-td-act"><AxIconBtn icon="edit" label="Editar publicación" onClick={() => setEd({ ...n })} /></td>
                </tr>
              ))}
            </tbody>
          </AxTable>
        </>
      )}

      <AM open={!!ed} onClose={() => setEd(null)} title={ed && ed.id ? 'Editar publicación' : 'Nueva publicación'} wide
        footer={<><button className="btn btn-secondary" onClick={() => setEd(null)}>Cancelar</button><button className="btn btn-primary" onClick={save}>Guardar</button></>}>
        {ed && (
          <div className="adm-form-grid">
            <AF label="Tipo"><TSelect value={ed.tipo} onChange={set('tipo')} opts={NOT_TIPOS} /></AF>
            <AF label="Fecha de publicación"><TInput value={ed.fecha_publicacion} onChange={set('fecha_publicacion')} placeholder="2026-07-01" /></AF>
            <div className="adm-span-2"><AF label="Título *"><TInput value={ed.titulo} onChange={set('titulo')} /></AF></div>
            <AF label="Autor / quien comenta"><TInput value={ed.autor_nombre} onChange={set('autor_nombre')} /></AF>
            <AF label="Comité relacionado"><TInput value={ed.comite_relacionado} onChange={set('comite_relacionado')} placeholder="CPC, SCORE…" /></AF>
            <div className="adm-span-2"><AF label="Resumen"><textarea className="input" rows={3} value={ed.resumen} onChange={set('resumen')} /></AF></div>

            {esPaper && (
              <div className="adm-span-2 adm-fieldset ax-fs ax-fieldset-stack">
                <div className="adm-fieldset-title">Club de revistas</div>
                <AF label="Cita del paper (Vancouver/APA)"><textarea className="input" rows={2} value={ed.cita} onChange={set('cita')} placeholder="Autor A, Autor B. Título. Revista. Año;Vol(N):pp." /></AF>
                <AF label="DOI / enlace"><TInput value={ed.doi} onChange={set('doi')} placeholder="10.xxxx/xxxx o URL" /></AF>
                <AF label="PDF del paper"><AdminArchivo value={ed.pdf_url} carpeta="papers" onChange={(url) => setEd(p => ({ ...p, pdf_url: url }))} /></AF>
                <AF label="Comentario / análisis crítico"><textarea className="input" rows={4} value={ed.comentario} onChange={set('comentario')} placeholder="Tu lectura crítica: fortalezas, limitaciones, aplicabilidad…" /></AF>
                <AF label="Preguntas para discusión (una por línea)"><textarea className="input" rows={3} value={ed.preguntas} onChange={set('preguntas')} placeholder={'¿Qué diseño metodológico usaron?\n¿El tamaño muestral es suficiente?'} /></AF>
              </div>
            )}

            <div className="adm-span-2"><AF label="Imagen de portada"><AdminFoto value={ed.imagen_portada} carpeta="eventos" onChange={(d) => setEd(p => ({ ...p, imagen_portada: d.url }))} /></AF></div>
            <AF label="Categoría / tags"><TInput value={ed.categoria} onChange={set('categoria')} /></AF>
            <AF label="Destacado"><TSelect value={ed.destacado} onChange={set('destacado')} opts={['SI', 'NO']} /></AF>
            <div className="adm-span-2 adm-note"><Icon name="eye" size={15} /> Se guarda como BORRADOR. Publícalo desde la tabla cuando esté listo.</div>
          </div>
        )}
      </AM>
    </>
  );
};

// ───────────────────────── Registro en el panel ─────────────────────────
// La navegación y el mapa de secciones se declaran completos en pages-2.jsx
// (ADMIN_NAV / ADMIN_SECTIONS); estas secciones se referencian allí por
// nombre y se resuelven contra window al renderizar. Aquí solo se exportan.
// Las piezas Ax* se exportan también para que pages-5 (certificados) las use.
Object.assign(window, {
  AdminSolicitudes, AdminEventos, AdminEvaluaciones, AdminPersonas, AdminProductos, AdminPedidos, AdminNoticias, AdminDashV6,
  AxEstado, AxHead, AxToolbar, AxSearch, AxChips, AxTable, AxThumb, AxIconBtn, AxEmpty, AxSkeleton, AxFallo,
});
