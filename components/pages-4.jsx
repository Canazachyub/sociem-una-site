// ============================================================================
// pages-4.jsx — Secciones nuevas del panel admin (backend v6)
//   Dashboard mejorado · Solicitudes · Eventos · Evaluaciones · Personas
//   Reutiliza helpers expuestos por pages-2 (window.adminApi, AdminModal, …).
// ============================================================================
const { adminApi: aApi, AdminModal: AM, AdminField: AF, EstadoBadge: EB } = window;
const u4 = React;

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
    <div style={{ display:'flex', alignItems:'center', gap:14 }}>
      <div style={{ width:72, height:72, borderRadius:10, background:'var(--bg-soft)', overflow:'hidden', display:'grid', placeItems:'center', flexShrink:0, border:'1px solid var(--border)' }}>
        {show ? <img src={show} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : <Icon name="image" size={22} />}
      </div>
      <div>
        <label className="btn btn-ghost" style={{ cursor:'pointer', display:'inline-flex' }}>
          {up ? 'Subiendo…' : show ? 'Cambiar' : 'Subir imagen'}
          <input type="file" accept="image/*" onChange={pick} disabled={up} style={{ display:'none' }} />
        </label>
        {e && <div className="small" style={{ color:'var(--red)', marginTop:4 }}>{e}</div>}
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
  u4.useEffect(() => { aApi.get('admin', 'dashboard').then(r => setD(r.data || {})).catch(e => setErr(e.message)); }, []);
  if (err) return <div className="card" style={{ padding:24, color:'var(--red)' }}>Error: {err}</div>;
  if (!d) return <div className="card" style={{ padding:24, color:'var(--fg-muted)' }}>Cargando KPIs…</div>;
  const kpis = [
    { l:'Personas', v:d.personas, to:'personas', ic:'users' },
    { l:'Miembros activos', v:d.miembros, to:'miembros', ic:'medal' },
    { l:'Eventos', v:d.eventos, to:'eventos', ic:'calendar' },
    { l:'Próximos eventos', v:d.eventos_proximos, to:'eventos', ic:'clock' },
    { l:'Solicitudes pendientes', v:d.solicitudes_pendientes, to:'solicitudes', ic:'inbox', alerta:d.solicitudes_pendientes>0 },
    { l:'Pedidos pendientes', v:d.pedidos_pendientes, to:'pedidos', ic:'shoppingBag', alerta:d.pedidos_pendientes>0 },
    { l:'Noticias', v:d.noticias, to:'noticias', ic:'book' },
    { l:'Correos en cola', v:d.correos_pendientes, ic:'mail' },
    { l:'Cuota correo hoy', v:d.cuota_correo, ic:'send' },
  ];
  return (
    <>
      <div className="grid gap-4 mb-8" style={{ gridTemplateColumns:'repeat(auto-fill, minmax(200px,1fr))' }}>
        {kpis.map((s,i) => (
          <div key={i} className="card" style={{ padding:'18px 20px', cursor:s.to?'pointer':'default', borderLeft: s.alerta?'3px solid var(--red)':'3px solid transparent' }} onClick={() => s.to && go(s.to)}>
            <div className="flex justify-between items-center"><div className="mono small" style={{ color:'var(--fg-muted)' }}>{s.l.toUpperCase()}</div><Icon name={s.ic} size={15} /></div>
            <div className="serif mt-2" style={{ fontSize:34, color: s.alerta?'var(--red)':'inherit' }}>{s.v ?? 0}</div>
          </div>
        ))}
      </div>
      <div className="card" style={{ padding:'22px 26px' }}>
        <div className="flex items-center" style={{ gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 380px' }}>
            <div className="mono small" style={{ color:'var(--fg-muted)' }}>ACCESOS RÁPIDOS</div>
            <div className="flex gap-3 mt-4" style={{ flexWrap:'wrap' }}>
              <button className="btn btn-primary" onClick={() => go('eventos')}><Icon name="plus" size={14} /> Nuevo evento</button>
              <button className="btn btn-ghost" onClick={() => go('solicitudes')}>Revisar solicitudes</button>
              <button className="btn btn-ghost" onClick={() => go('evaluaciones')}>Gestionar evaluaciones</button>
              <button className="btn btn-ghost" onClick={() => go('personas')}>Personas</button>
            </div>
          </div>
          <img src="assets/mascota/mascota-laptop.png?v=3" alt="" style={{ width: 110, flexShrink: 0 }} onError={(e) => { e.currentTarget.outerHTML = ''; }} />
        </div>
      </div>
    </>
  );
};

// ───────────────────────── SOLICITUDES ─────────────────────────
const AdminSolicitudes = ({ toast }) => {
  const [items, setItems] = u4.useState(null);
  const [ver, setVer] = u4.useState(null);
  const load = () => aApi.get('solicitudes', 'list').then(r => setItems(r.items || r.data || [])).catch(e => toast.push(e.message, 'error'));
  u4.useEffect(() => { load(); }, []);
  const accion = async (s, act) => {
    try { await aApi.post('solicitudes', act, { id: s.id }); toast.push(act === 'aprobar' ? 'Aprobado · persona creada' : 'Rechazado', 'ok'); setVer(null); load(); }
    catch (e) { toast.push(e.message, 'error'); }
  };
  if (!items) return <div className="card" style={{ padding:24, color:'var(--fg-muted)' }}>Cargando…</div>;
  const extra = (s) => { try { return JSON.parse(s.extra_json || '{}'); } catch (e) { return {}; } };
  return (
    <>
      <table className="admin-table">
        <thead><tr><th>Solicitante</th><th>Tipo</th><th>Correo</th><th>Validado</th><th>Estado</th><th></th></tr></thead>
        <tbody>
          {items.length === 0 && <tr><td colSpan={6} style={{ color:'var(--fg-muted)', padding:20 }}>Sin solicitudes.</td></tr>}
          {items.map(s => (
            <tr key={s.id}>
              <td><strong>{s.nombres} {s.apellidos}</strong></td>
              <td><span className="badge">{s.tipo_solicitante}{s.subtipo ? '·'+s.subtipo : ''}</span></td>
              <td className="small">{s.email}</td>
              <td>{String(s.email_validado).toUpperCase() === 'SI' ? <span style={{ color:'#1F6B3A' }}>✓</span> : <span style={{ color:'var(--fg-muted)' }}>—</span>}</td>
              <td><EB value={s.estado} /></td>
              <td><button className="btn-link" onClick={() => setVer(s)}>Ver</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <AM open={!!ver} onClose={() => setVer(null)} title="Solicitud de acceso" wide
        footer={ver && ver.estado !== 'APROBADO' && (
          <>
            <button className="btn btn-ghost" onClick={() => accion(ver, 'rechazar')} style={{ color:'var(--red)' }}>Rechazar</button>
            <button className="btn btn-primary" disabled={String(ver.email_validado).toUpperCase() !== 'SI'} onClick={() => accion(ver, 'aprobar')}>Aprobar y crear persona</button>
          </>
        )}>
        {ver && (
          <div className="grid gap-4" style={{ gridTemplateColumns:'120px 1fr' }}>
            <div style={{ width:120, height:120, borderRadius:12, overflow:'hidden', background:'var(--bg-soft)', display:'grid', placeItems:'center' }}>
              {ver.foto_url ? <img src={window.IMG(ver.foto_url)} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : <Icon name="user" size={32} />}
            </div>
            <div className="grid gap-2" style={{ alignContent:'start' }}>
              <div><strong>{ver.nombres} {ver.apellidos}</strong></div>
              <div className="small"><b>Correo:</b> {ver.email} {String(ver.email_validado).toUpperCase()==='SI' ? '· validado ✓' : '· SIN validar'}</div>
              <div className="small"><b>DNI:</b> {ver.dni || '—'} · <b>Código:</b> {ver.codigo_universitario || '—'}</div>
              <div className="small"><b>Celular:</b> {ver.telefono || '—'} · <b>Cumpleaños:</b> {ver.cumpleanos || '—'}</div>
              <div className="small"><b>Carrera:</b> {ver.carrera || '—'} · <b>Año FMH:</b> {ver.anio_estudios || '—'}</div>
              <div className="small"><b>Comité:</b> {ver.comite_interes || '—'}</div>
              {ver.motivo && <div className="small"><b>Comentario:</b> {ver.motivo}</div>}
              {Object.keys(extra(ver)).length > 0 && (
                <div className="small"><b>Otros:</b><ul style={{ margin:'4px 0 0', paddingLeft:18 }}>{Object.entries(extra(ver)).map(([k,v]) => <li key={k}>{k}: {String(v)}</li>)}</ul></div>
              )}
              {String(ver.email_validado).toUpperCase() !== 'SI' && <div className="small" style={{ color:'var(--red)' }}>⚠ El correo aún no se ha validado; no se puede aprobar.</div>}
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
  const [ed, setEd] = u4.useState(null);
  const [asis, setAsis] = u4.useState(null);
  const [lista, setLista] = u4.useState(''); // DNI o correo para pasar lista
  const [marcando, setMarcando] = u4.useState(false);
  const load = () => aApi.get('eventos', 'list').then(r => setItems(r.items || r.data || [])).catch(e => toast.push(e.message,'error'));
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
  if (!items) return <div className="card" style={{ padding:24, color:'var(--fg-muted)' }}>Cargando…</div>;
  const set = (k) => (e) => setEd(p => ({ ...p, [k]: e.target.value }));
  return (
    <>
      <div className="flex justify-end mb-4"><button className="btn btn-primary" onClick={() => setEd({ ...vacioEvento })}><Icon name="plus" size={14} /> Nuevo evento</button></div>
      <table className="admin-table">
        <thead><tr><th>Evento</th><th>Tipo</th><th>Fecha</th><th>Estado</th><th></th></tr></thead>
        <tbody>
          {items.length === 0 && <tr><td colSpan={5} style={{ color:'var(--fg-muted)', padding:20 }}>Sin eventos.</td></tr>}
          {items.map(ev => (
            <tr key={ev.id}>
              <td><strong>{ev.titulo}</strong><div className="small" style={{ color:'var(--fg-muted)' }}>{ev.ponente_nombre}</div></td>
              <td><span className="badge">{ev.tipo}</span></td>
              <td className="small">{ev.fecha} {ev.hora_inicio}</td>
              <td><span className="badge">{ev.estado}</span></td>
              <td className="flex gap-2">
                <button className="btn-link" onClick={() => verAsis(ev)}>Asistencia</button>
                <button className="btn-link" onClick={() => certificados(ev)}>Certificados</button>
                <button className="btn-link" onClick={() => setEd({ ...ev })}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AM open={!!ed} onClose={() => setEd(null)} title={ed && ed.id ? 'Editar evento' : 'Nuevo evento'} wide
        footer={<><button className="btn btn-ghost" onClick={() => setEd(null)}>Cancelar</button><button className="btn btn-primary" onClick={save}>Guardar</button></>}>
        {ed && (
          <div className="grid gap-3">
            <AF label="Título *"><TInput value={ed.titulo} onChange={set('titulo')} /></AF>
            <div className="grid gap-3" style={{ gridTemplateColumns:'1fr 1fr' }}>
              <AF label="Tipo"><TSelect value={ed.tipo} onChange={set('tipo')} opts={EV_TIPOS} /></AF>
              <AF label="Estado"><TSelect value={ed.estado} onChange={set('estado')} opts={EV_ESTADO} /></AF>
            </div>
            <AF label="Descripción"><textarea className="input" rows={2} value={ed.descripcion} onChange={set('descripcion')} /></AF>
            <div className="grid gap-3" style={{ gridTemplateColumns:'1fr 1fr' }}>
              <AF label="Ponente"><TInput value={ed.ponente_nombre} onChange={set('ponente_nombre')} /></AF>
              <AF label="Comité organizador"><TInput value={ed.comite_organizador} onChange={set('comite_organizador')} /></AF>
            </div>
            <div className="grid gap-3" style={{ gridTemplateColumns:'1fr 1fr 1fr' }}>
              <AF label="Fecha * (YYYY-MM-DD)"><TInput value={ed.fecha} onChange={set('fecha')} placeholder="2026-07-15" /></AF>
              <AF label="Hora inicio"><TInput value={ed.hora_inicio} onChange={set('hora_inicio')} placeholder="20:00" /></AF>
              <AF label="Hora fin"><TInput value={ed.hora_fin} onChange={set('hora_fin')} placeholder="21:30" /></AF>
            </div>
            <div className="grid gap-3" style={{ gridTemplateColumns:'1fr 1fr' }}>
              <AF label="Modalidad"><TSelect value={ed.modalidad} onChange={set('modalidad')} opts={EV_MOD} /></AF>
              <AF label="Plataforma / Lugar"><TInput value={ed.plataforma} onChange={set('plataforma')} placeholder="Zoom, Meet, Auditorio…" /></AF>
            </div>
            <AF label="Enlace de acceso"><TInput value={ed.link_acceso} onChange={set('link_acceso')} placeholder="https://… o link de WhatsApp" /></AF>
            <div className="grid gap-3" style={{ gridTemplateColumns:'1fr 1fr 1fr' }}>
              <AF label="Puntaje base"><TInput value={ed.puntaje_base} onChange={set('puntaje_base')} /></AF>
              <AF label="Cupo"><TInput value={ed.cupo} onChange={set('cupo')} /></AF>
              <AF label="¿Requiere evaluación?"><TSelect value={ed.requiere_evaluacion} onChange={set('requiere_evaluacion')} opts={['SI','NO']} /></AF>
            </div>
            <AF label="Flyer del evento"><AdminFoto value={ed.flyer_url} carpeta="eventos" onChange={(d) => setEd(p => ({ ...p, flyer_url:d.url }))} /></AF>
          </div>
        )}
      </AM>

      <AM open={!!asis} onClose={() => { setAsis(null); setLista(''); }} title={asis ? 'Asistencia · ' + asis.ev.titulo : ''} wide>
        {asis && (
          <>
            {/* Pasar lista: DNI o correo → marcar entrada/salida. Si no estaba
                inscrito pero existe en personas, se registra al vuelo. */}
            <div className="card mb-4" style={{ padding:'14px 16px', background:'var(--bg-soft)' }}>
              <div className="mono small" style={{ color:'var(--violet-600)' }}>PASAR LISTA</div>
              <div className="flex gap-2 mt-2" style={{ flexWrap:'wrap' }}>
                <input className="input" style={{ flex:'1 1 220px' }} placeholder="DNI o correo del asistente"
                  value={lista} onChange={e => setLista(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); checkin(1); } }} autoFocus />
                <button className="btn btn-primary" disabled={marcando} onClick={() => checkin(1)}><Icon name="check" size={14} /> Entrada</button>
                <button className="btn btn-gold" disabled={marcando} onClick={() => checkin(2)}><Icon name="logout" size={14} /> Salida</button>
              </div>
              <div className="small mt-2" style={{ color:'var(--fg-muted)' }}>Enter = marcar entrada. Con ambas validaciones en ✓ el certificado queda habilitado.</div>
            </div>
            <div className="small mb-4" style={{ color:'var(--fg-muted)' }}>{asis.total} asistente(s) registrados. Haz clic en Val.1 / Val.2 para corregir a mano.</div>
            <table className="admin-table">
              <thead><tr><th>Nombre</th><th>Correo</th><th>DNI</th><th>Val.1</th><th>Val.2</th><th>Cert.</th></tr></thead>
              <tbody>
                {asis.asistentes.length === 0 && <tr><td colSpan={6} style={{ color:'var(--fg-muted)', padding:16 }}>Aún no hay asistentes.</td></tr>}
                {asis.asistentes.map(a => (
                  <tr key={a.id}><td>{a.nombre}</td><td className="small">{a.email}</td><td className="mono small">{a.dni || '—'}</td>
                    <td><button className="icon-btn" aria-label="Alternar validación de entrada" title="Alternar entrada" style={{ width:30, height:30, color: String(a.validacion_1_ok).toUpperCase()==='SI' ? '#1F6B3A' : 'var(--fg-muted)' }} onClick={() => toggleVal(a, 1)}>{String(a.validacion_1_ok).toUpperCase()==='SI'?'✓':'—'}</button></td>
                    <td><button className="icon-btn" aria-label="Alternar validación de salida" title="Alternar salida" style={{ width:30, height:30, color: String(a.validacion_2_ok).toUpperCase()==='SI' ? '#1F6B3A' : 'var(--fg-muted)' }} onClick={() => toggleVal(a, 2)}>{String(a.validacion_2_ok).toUpperCase()==='SI'?'✓':'—'}</button></td>
                    <td>{String(a.certificado_enviado).toUpperCase()==='SI'?'✓':'—'}</td></tr>
                ))}
              </tbody>
            </table>
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
  const [eventos, setEventos] = u4.useState([]);
  const [ed, setEd] = u4.useState(null);
  const [preg, setPreg] = u4.useState(null); // {evaluacion, lista, editP}
  const load = () => aApi.get('evaluaciones','list').then(r => setItems(r.items || r.data || [])).catch(e => toast.push(e.message,'error'));
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
  if (!items) return <div className="card" style={{ padding:24, color:'var(--fg-muted)' }}>Cargando…</div>;
  const set = (k) => (e) => setEd(p => ({ ...p, [k]: e.target.value }));
  const setP = (k) => (e) => setPreg(p => ({ ...p, editP:{ ...p.editP, [k]: e.target.value } }));
  const tituloEvento = (id) => { const e = eventos.find(x => String(x.id)===String(id)); return e ? e.titulo : id; };
  return (
    <>
      <div className="flex justify-end mb-4"><button className="btn btn-primary" onClick={() => setEd({ ...vacioEval })}><Icon name="plus" size={14} /> Nueva evaluación</button></div>
      <table className="admin-table">
        <thead><tr><th>Test</th><th>Evento</th><th>Orden</th><th>Estado</th><th>Link</th><th></th></tr></thead>
        <tbody>
          {items.length === 0 && <tr><td colSpan={6} style={{ color:'var(--fg-muted)', padding:20 }}>Sin evaluaciones.</td></tr>}
          {items.map(ev => (
            <tr key={ev.id}>
              <td><strong>{ev.titulo}</strong></td>
              <td className="small">{tituloEvento(ev.evento_id)}</td>
              <td>{ev.orden}</td>
              <td><button className="badge" style={{ cursor:'pointer', background: String(ev.activo).toUpperCase()==='SI'?'#E8F5EC':'#FAEAEA', color:String(ev.activo).toUpperCase()==='SI'?'#1F6B3A':'#8C2121' }} onClick={() => toggle(ev)}>{String(ev.activo).toUpperCase()==='SI'?'ACTIVO':'CERRADO'}</button></td>
              <td><button className="btn-link" onClick={() => copiarLink(ev)}><Icon name="link" size={13} /> copiar</button></td>
              <td className="flex gap-2"><button className="btn-link" onClick={() => abrirPreg(ev)}>Preguntas</button><button className="btn-link" onClick={() => setEd({ ...ev })}>Editar</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <AM open={!!ed} onClose={() => setEd(null)} title={ed && ed.id ? 'Editar evaluación' : 'Nueva evaluación'} wide
        footer={<><button className="btn btn-ghost" onClick={() => setEd(null)}>Cancelar</button><button className="btn btn-primary" onClick={save}>Guardar</button></>}>
        {ed && (
          <div className="grid gap-3">
            <AF label="Evento *"><TSelect value={ed.evento_id} onChange={set('evento_id')} opts={[{v:'',l:'— elige —'}].concat(eventos.map(e => ({ v:e.id, l:e.titulo })))} /></AF>
            <div className="grid gap-3" style={{ gridTemplateColumns:'2fr 1fr' }}>
              <AF label="Título"><TInput value={ed.titulo} onChange={set('titulo')} placeholder="Validación 1 — Pre-test" /></AF>
              <AF label="Orden (1 ó 2)"><TSelect value={ed.orden} onChange={set('orden')} opts={['1','2']} /></AF>
            </div>
            <AF label="Descripción"><TInput value={ed.descripcion} onChange={set('descripcion')} /></AF>
            <div className="grid gap-3" style={{ gridTemplateColumns:'1fr 1fr 1fr' }}>
              <AF label="Puntaje"><TInput value={ed.puntaje} onChange={set('puntaje')} /></AF>
              <AF label="Nota mínima"><TInput value={ed.nota_minima} onChange={set('nota_minima')} /></AF>
              <AF label="Intentos máx"><TInput value={ed.intentos_max} onChange={set('intentos_max')} /></AF>
            </div>
            <div className="grid gap-3" style={{ gridTemplateColumns:'1fr 1fr' }}>
              <AF label="Apertura (opcional)"><TInput value={ed.fecha_apertura} onChange={set('fecha_apertura')} placeholder="2026-07-15T20:00:00" /></AF>
              <AF label="Cierre (opcional)"><TInput value={ed.fecha_cierre} onChange={set('fecha_cierre')} placeholder="2026-07-16T23:59:00" /></AF>
            </div>
            <div className="small" style={{ color:'var(--fg-muted)' }}>El link público se genera al crear. Habilita/deshabilita desde la tabla. La respuesta correcta nunca se envía al alumno.</div>
          </div>
        )}
      </AM>

      <AM open={!!preg} onClose={() => setPreg(null)} title={preg ? 'Preguntas · ' + preg.evaluacion.titulo : ''} wide
        footer={<button className="btn btn-primary" onClick={() => setPreg(p => ({ ...p, editP:{ ...vacioPreg, orden:String((p.lista.length)+1) } }))}><Icon name="plus" size={14} /> Añadir pregunta</button>}>
        {preg && !preg.editP && (
          <div className="grid gap-3">
            {preg.lista.length === 0 && <div className="small" style={{ color:'var(--fg-muted)' }}>Sin preguntas. Añade la primera abajo.</div>}
            {preg.lista.map(q => (
              <div key={q.id} className="card" style={{ padding:'12px 16px' }}>
                <div className="flex justify-between"><strong className="small">{q.orden}. {q.enunciado}</strong><button className="btn-link" onClick={() => setPreg(p => ({ ...p, editP:{ ...q } }))}>Editar</button></div>
                <div className="small" style={{ color:'var(--fg-muted)', marginTop:4 }}>{q.tipo} · correcta: {q.respuesta_correcta}</div>
              </div>
            ))}
          </div>
        )}
        {preg && preg.editP && (
          <div className="grid gap-3">
            <AF label="Enunciado"><textarea className="input" rows={2} value={preg.editP.enunciado} onChange={setP('enunciado')} /></AF>
            <div className="grid gap-3" style={{ gridTemplateColumns:'1fr 1fr' }}>
              <AF label="Tipo"><TSelect value={preg.editP.tipo} onChange={setP('tipo')} opts={['OPCION_MULTIPLE','VF','TEXTO']} /></AF>
              <AF label="Orden"><TInput value={preg.editP.orden} onChange={setP('orden')} /></AF>
            </div>
            {preg.editP.tipo === 'OPCION_MULTIPLE' && (
              <div className="grid gap-3" style={{ gridTemplateColumns:'1fr 1fr' }}>
                <AF label="A"><TInput value={preg.editP.opcion_a} onChange={setP('opcion_a')} /></AF>
                <AF label="B"><TInput value={preg.editP.opcion_b} onChange={setP('opcion_b')} /></AF>
                <AF label="C"><TInput value={preg.editP.opcion_c} onChange={setP('opcion_c')} /></AF>
                <AF label="D"><TInput value={preg.editP.opcion_d} onChange={setP('opcion_d')} /></AF>
              </div>
            )}
            <div className="grid gap-3" style={{ gridTemplateColumns:'1fr 1fr' }}>
              <AF label="Respuesta correcta"><TInput value={preg.editP.respuesta_correcta} onChange={setP('respuesta_correcta')} placeholder={preg.editP.tipo==='VF'?'Verdadero / Falso':'A, B, C o D'} /></AF>
              <AF label="Puntaje"><TInput value={preg.editP.puntaje} onChange={setP('puntaje')} /></AF>
            </div>
            <div className="flex justify-end gap-2"><button className="btn btn-ghost" onClick={() => setPreg(p => ({ ...p, editP:null }))}>Cancelar</button><button className="btn btn-primary" onClick={guardarPreg}>Guardar pregunta</button></div>
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
  const [ed, setEd] = u4.useState(null);
  const [q, setQ] = u4.useState('');
  const [tipo, setTipo] = u4.useState('TODOS');
  const load = () => aApi.get('personas','list').then(r => setItems(r.items || r.data || [])).catch(e => toast.push(e.message,'error'));
  u4.useEffect(() => { load(); }, []);
  const save = async () => {
    if (!ed.nombres || !ed.email) { toast.push('Nombres y correo requeridos','error'); return; }
    try { await aApi.post('personas', ed.id ? 'update' : 'create', ed); toast.push('Guardado','ok'); setEd(null); load(); }
    catch (e) { toast.push(e.message,'error'); }
  };
  const del = async (p) => { if (!confirm('¿Marcar como INACTIVO a '+p.nombres+'?')) return; try { await aApi.post('personas','update',{ id:p.id, estado:'INACTIVO' }); toast.push('Inactivado','ok'); load(); } catch (e) { toast.push(e.message,'error'); } };
  if (!items) return <div className="card" style={{ padding:24, color:'var(--fg-muted)' }}>Cargando…</div>;
  const set = (k) => (e) => setEd(p => ({ ...p, [k]: e.target.value }));
  const filtrados = items.filter(p => (tipo==='TODOS'||p.tipo===tipo) && (!q || (S(p.nombres)+' '+S(p.apellidos)+' '+S(p.email)).toLowerCase().includes(q.toLowerCase())));
  function S(v){ return v==null?'':String(v); }
  return (
    <>
      <div className="flex justify-between items-center mb-4" style={{ flexWrap:'wrap', gap:10 }}>
        <div className="flex gap-2 items-center">
          <input className="input" placeholder="Buscar…" value={q} onChange={e=>setQ(e.target.value)} style={{ width:200 }} />
          <TSelect value={tipo} onChange={e=>setTipo(e.target.value)} opts={['TODOS'].concat(PER_TIPOS)} />
        </div>
        <button className="btn btn-primary" onClick={() => setEd({ ...vacioPersona })}><Icon name="plus" size={14} /> Nueva persona</button>
      </div>
      <table className="admin-table">
        <thead><tr><th></th><th>Nombre</th><th>Tipo</th><th>Correo</th><th>Estado</th><th></th></tr></thead>
        <tbody>
          {filtrados.length === 0 && <tr><td colSpan={6} style={{ color:'var(--fg-muted)', padding:20 }}>Sin resultados.</td></tr>}
          {filtrados.map(p => (
            <tr key={p.id}>
              <td><div style={{ width:36, height:36, borderRadius:8, overflow:'hidden', background:'var(--bg-soft)', display:'grid', placeItems:'center' }}>{p.foto_url ? <img src={window.IMG(p.foto_url)} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : <Icon name="user" size={16} />}</div></td>
              <td><strong>{p.nombres} {p.apellidos}</strong></td>
              <td><span className="badge">{p.tipo}</span></td>
              <td className="small">{p.email}</td>
              <td><EB value={p.estado} /></td>
              <td className="flex gap-2"><button className="btn-link" onClick={() => setEd({ ...p })}>Editar</button><button className="btn-link" style={{ color:'var(--red)' }} onClick={() => del(p)}>Inactivar</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <AM open={!!ed} onClose={() => setEd(null)} title={ed && ed.id ? 'Editar persona' : 'Nueva persona'} wide
        footer={<><button className="btn btn-ghost" onClick={() => setEd(null)}>Cancelar</button><button className="btn btn-primary" onClick={save}>Guardar</button></>}>
        {ed && (
          <div className="grid gap-3">
            <div className="grid gap-3" style={{ gridTemplateColumns:'1fr 1fr' }}>
              <AF label="Tipo"><TSelect value={ed.tipo} onChange={set('tipo')} opts={PER_TIPOS} /></AF>
              <AF label="Estado"><TSelect value={ed.estado} onChange={set('estado')} opts={PER_ESTADOS} /></AF>
            </div>
            <div className="grid gap-3" style={{ gridTemplateColumns:'1fr 1fr' }}>
              <AF label="Nombres *"><TInput value={ed.nombres} onChange={set('nombres')} /></AF>
              <AF label="Apellidos"><TInput value={ed.apellidos} onChange={set('apellidos')} /></AF>
            </div>
            <div className="grid gap-3" style={{ gridTemplateColumns:'1fr 1fr' }}>
              <AF label="Correo *"><TInput value={ed.email} onChange={set('email')} /></AF>
              <AF label="WhatsApp"><TInput value={ed.whatsapp} onChange={set('whatsapp')} placeholder="51951000000" /></AF>
            </div>
            <div className="grid gap-3" style={{ gridTemplateColumns:'1fr 1fr 1fr' }}>
              <AF label="DNI"><TInput value={ed.dni} onChange={set('dni')} /></AF>
              <AF label="Código univ."><TInput value={ed.codigo_universitario} onChange={set('codigo_universitario')} /></AF>
              <AF label="Semestre"><TInput value={ed.semestre} onChange={set('semestre')} /></AF>
            </div>
            <AF label="Carrera"><TInput value={ed.carrera} onChange={set('carrera')} /></AF>
            <AF label="Bio / descripción"><textarea className="input" rows={2} value={ed.bio} onChange={set('bio')} /></AF>
            <div className="grid gap-3" style={{ gridTemplateColumns:'1fr 1fr' }}>
              <AF label="ORCID"><TInput value={ed.orcid} onChange={set('orcid')} placeholder="0000-0000-0000-0000" /></AF>
              <AF label="CTI Vitae (URL)"><TInput value={ed.cti_vitae_url} onChange={set('cti_vitae_url')} /></AF>
            </div>
            <AF label="Foto"><AdminFoto value={ed.foto_url} carpeta={ed.tipo==='ASESOR'||ed.tipo==='DOCENTE'?'asesores':'miembros'} onChange={(d) => setEd(p => ({ ...p, foto_url:d.url }))} /></AF>
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
  const [ed, setEd] = u4.useState(null);
  const load = () => aApi.get('productos','list').then(r => setItems(r.items || r.data || [])).catch(e => toast.push(e.message,'error'));
  u4.useEffect(() => { load(); }, []);
  const save = async () => {
    if (!ed.nombre || !ed.precio) { toast.push('Nombre y precio requeridos','error'); return; }
    try { await aApi.post('productos', ed.id ? 'update' : 'create', ed); toast.push('Guardado','ok'); setEd(null); load(); }
    catch (e) { toast.push(e.message,'error'); }
  };
  const del = async (p) => { if (!confirm('¿Desactivar '+p.nombre+'?')) return; try { await aApi.post('productos','delete',{ id:p.id }); toast.push('Desactivado','ok'); load(); } catch (e) { toast.push(e.message,'error'); } };
  if (!items) return <div className="card" style={{ padding:24, color:'var(--fg-muted)' }}>Cargando…</div>;
  const set = (k) => (e) => setEd(p => ({ ...p, [k]: e.target.value }));
  return (
    <>
      <div className="flex justify-end mb-4"><button className="btn btn-primary" onClick={() => setEd({ ...vacioProd })}><Icon name="plus" size={14} /> Nuevo producto</button></div>
      <table className="admin-table">
        <thead><tr><th></th><th>Producto</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Estado</th><th></th></tr></thead>
        <tbody>
          {items.length === 0 && <tr><td colSpan={7} style={{ color:'var(--fg-muted)', padding:20 }}>Sin productos.</td></tr>}
          {items.map(p => (
            <tr key={p.id}>
              <td><div style={{ width:36, height:36, borderRadius:8, overflow:'hidden', background:'var(--bg-soft)', display:'grid', placeItems:'center' }}>{p.imagen_url ? <img src={window.IMG(p.imagen_url)} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : <Icon name="shoppingBag" size={15} />}</div></td>
              <td><strong>{p.nombre}</strong></td>
              <td><span className="badge">{p.categoria}</span></td>
              <td>S/ {Number(p.precio).toFixed(2)}</td>
              <td>{p.stock}</td>
              <td><EB value={String(p.activo).toUpperCase()==='SI'?'ACTIVO':'INACTIVO'} /></td>
              <td className="flex gap-2"><button className="btn-link" onClick={() => setEd({ ...p })}>Editar</button><button className="btn-link" style={{ color:'var(--red)' }} onClick={() => del(p)}>Quitar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <AM open={!!ed} onClose={() => setEd(null)} title={ed && ed.id ? 'Editar producto' : 'Nuevo producto'} wide
        footer={<><button className="btn btn-ghost" onClick={() => setEd(null)}>Cancelar</button><button className="btn btn-primary" onClick={save}>Guardar</button></>}>
        {ed && (
          <div className="grid gap-3">
            <AF label="Nombre *"><TInput value={ed.nombre} onChange={set('nombre')} /></AF>
            <AF label="Descripción"><textarea className="input" rows={2} value={ed.descripcion} onChange={set('descripcion')} /></AF>
            <div className="grid gap-3" style={{ gridTemplateColumns:'1fr 1fr 1fr' }}>
              <AF label="Categoría"><TSelect value={ed.categoria} onChange={set('categoria')} opts={PROD_CAT} /></AF>
              <AF label="Precio (S/)"><TInput value={ed.precio} onChange={set('precio')} /></AF>
              <AF label="Stock"><TInput value={ed.stock} onChange={set('stock')} /></AF>
            </div>
            <div className="grid gap-3" style={{ gridTemplateColumns:'1fr 1fr' }}>
              <AF label="Destacado"><TSelect value={ed.destacado} onChange={set('destacado')} opts={['SI','NO']} /></AF>
              <AF label="Activo"><TSelect value={ed.activo} onChange={set('activo')} opts={['SI','NO']} /></AF>
            </div>
            <AF label="Imagen"><AdminFoto value={ed.imagen_url} carpeta="productos" onChange={(d) => setEd(p => ({ ...p, imagen_url:d.url }))} /></AF>
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
  const [ver, setVer] = u4.useState(null);
  const load = () => aApi.get('pedidos','list').then(r => setItems(r.items || r.data || [])).catch(e => toast.push(e.message,'error'));
  u4.useEffect(() => { load(); }, []);
  const cambiar = async (ped, estado) => { try { await aApi.post('pedidos','updateEstado',{ id:ped.id, estado }); toast.push('Actualizado','ok'); load(); setVer(v => v && { ...v, estado }); } catch (e) { toast.push(e.message,'error'); } };
  if (!items) return <div className="card" style={{ padding:24, color:'var(--fg-muted)' }}>Cargando…</div>;
  return (
    <>
      <table className="admin-table">
        <thead><tr><th>Código</th><th>Comprador</th><th>Total</th><th>Pago</th><th>Estado</th><th></th></tr></thead>
        <tbody>
          {items.length === 0 && <tr><td colSpan={6} style={{ color:'var(--fg-muted)', padding:20 }}>Sin pedidos.</td></tr>}
          {items.map(p => (
            <tr key={p.id}>
              <td className="mono small">{p.codigo}</td>
              <td><strong>{p.comprador_nombre}</strong><div className="small" style={{ color:'var(--fg-muted)' }}>{p.email}</div></td>
              <td>S/ {Number(p.total).toFixed(2)}</td>
              <td className="small">{p.metodo_pago || '—'}</td>
              <td><span className="badge">{p.estado}</span></td>
              <td><button className="btn-link" onClick={() => setVer(p)}>Ver</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <AM open={!!ver} onClose={() => setVer(null)} title={ver ? 'Pedido ' + ver.codigo : ''} wide>
        {ver && (
          <>
            <div className="small mb-3"><b>{ver.comprador_nombre}</b> · {ver.email} · {ver.telefono}</div>
            <table className="admin-table">
              <thead><tr><th>Producto</th><th>Cant.</th><th>P. unit.</th><th>Subtotal</th></tr></thead>
              <tbody>{(ver.items || []).map(it => <tr key={it.id}><td>{it.nombre_producto}</td><td>{it.cantidad}</td><td>S/ {Number(it.precio_unitario).toFixed(2)}</td><td>S/ {Number(it.subtotal).toFixed(2)}</td></tr>)}</tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
              <div style={{ fontWeight:700 }}>Total: S/ {Number(ver.total).toFixed(2)}</div>
              <div className="flex gap-2 items-center"><span className="small">Estado:</span><TSelect value={ver.estado} onChange={(e) => cambiar(ver, e.target.value)} opts={PED_ESTADOS} /></div>
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
    <div className="flex items-center gap-3" style={{ flexWrap: 'wrap' }}>
      <label className="btn btn-ghost" style={{ cursor: 'pointer' }}>{up ? 'Subiendo…' : value ? 'Cambiar PDF' : 'Subir PDF'}<input type="file" accept=".pdf,application/pdf" onChange={pick} disabled={up} style={{ display: 'none' }} /></label>
      {value && <a className="btn-link" href={value} target="_blank" rel="noopener noreferrer"><Icon name="link" size={13} /> ver PDF</a>}
      {e && <span className="small" style={{ color: 'var(--red)' }}>{e}</span>}
    </div>
  );
};

const NOT_TIPOS = ['PAPER', 'NOTICIA', 'COMUNICADO', 'EVENTO'];
const slugify = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60);
const hoyISO = () => { try { return new Date().toISOString().slice(0, 10); } catch (e) { return ''; } };

const AdminNoticias = ({ toast }) => {
  const [items, setItems] = u4.useState(null);
  const [ed, setEd] = u4.useState(null);
  const load = () => aApi.get('noticias', 'list').then(r => setItems(r.items || r.data || [])).catch(e => toast.push(e.message, 'error'));
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
  if (!items) return <div className="card" style={{ padding: 24, color: 'var(--fg-muted)' }}>Cargando…</div>;
  const set = (k) => (e) => setEd(p => ({ ...p, [k]: e.target.value }));
  const esPaper = ed && ed.tipo === 'PAPER';
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="small" style={{ color: 'var(--fg-muted)' }}>Publica papers (club de revistas), noticias y comunicados.</div>
        <button className="btn btn-primary" onClick={nuevo}><Icon name="plus" size={14} /> Nueva publicación</button>
      </div>
      <table className="admin-table">
        <thead><tr><th>Título</th><th>Tipo</th><th>Autor</th><th>Fecha</th><th>Estado</th><th></th></tr></thead>
        <tbody>
          {items.length === 0 && <tr><td colSpan={6} style={{ color: 'var(--fg-muted)', padding: 20 }}>Sin publicaciones.</td></tr>}
          {items.map(n => (
            <tr key={n.id}>
              <td><strong>{n.titulo}</strong></td>
              <td><span className="badge">{n.tipo || 'NOTICIA'}</span></td>
              <td className="small">{n.autor_nombre || '—'}</td>
              <td className="small">{String(n.fecha_publicacion).slice(0, 10)}</td>
              <td><button className="badge" style={{ cursor: 'pointer', background: isTrueS(n.publicado) ? '#E8F5EC' : '#FAEAEA', color: isTrueS(n.publicado) ? '#1F6B3A' : '#8C2121' }} onClick={() => togglePub(n)}>{isTrueS(n.publicado) ? 'PUBLICADO' : 'BORRADOR'}</button></td>
              <td><button className="btn-link" onClick={() => setEd({ ...n })}>Editar</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <AM open={!!ed} onClose={() => setEd(null)} title={ed && ed.id ? 'Editar publicación' : 'Nueva publicación'} wide
        footer={<><button className="btn btn-ghost" onClick={() => setEd(null)}>Cancelar</button><button className="btn btn-primary" onClick={save}>Guardar</button></>}>
        {ed && (
          <div className="grid gap-3">
            <div className="grid gap-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <AF label="Tipo"><TSelect value={ed.tipo} onChange={set('tipo')} opts={NOT_TIPOS} /></AF>
              <AF label="Fecha de publicación"><TInput value={ed.fecha_publicacion} onChange={set('fecha_publicacion')} placeholder="2026-07-01" /></AF>
            </div>
            <AF label="Título *"><TInput value={ed.titulo} onChange={set('titulo')} /></AF>
            <div className="grid gap-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <AF label="Autor / quien comenta"><TInput value={ed.autor_nombre} onChange={set('autor_nombre')} /></AF>
              <AF label="Comité relacionado"><TInput value={ed.comite_relacionado} onChange={set('comite_relacionado')} placeholder="CPC, SCORE…" /></AF>
            </div>
            <AF label="Resumen"><textarea className="input" rows={3} value={ed.resumen} onChange={set('resumen')} /></AF>

            {esPaper && (
              <div className="card" style={{ padding: '16px 18px', background: 'var(--bg-soft)' }}>
                <div className="mono small mb-3" style={{ color: 'var(--violet-700)' }}>CLUB DE REVISTAS</div>
                <AF label="Cita del paper (Vancouver/APA)"><textarea className="input" rows={2} value={ed.cita} onChange={set('cita')} placeholder="Autor A, Autor B. Título. Revista. Año;Vol(N):pp." /></AF>
                <div className="grid gap-3" style={{ gridTemplateColumns: '1fr' }}>
                  <AF label="DOI / enlace"><TInput value={ed.doi} onChange={set('doi')} placeholder="10.xxxx/xxxx o URL" /></AF>
                </div>
                <AF label="PDF del paper"><AdminArchivo value={ed.pdf_url} carpeta="papers" onChange={(url) => setEd(p => ({ ...p, pdf_url: url }))} /></AF>
                <AF label="Comentario / análisis crítico"><textarea className="input" rows={4} value={ed.comentario} onChange={set('comentario')} placeholder="Tu lectura crítica: fortalezas, limitaciones, aplicabilidad…" /></AF>
                <AF label="Preguntas para discusión (una por línea)"><textarea className="input" rows={3} value={ed.preguntas} onChange={set('preguntas')} placeholder={'¿Qué diseño metodológico usaron?\n¿El tamaño muestral es suficiente?'} /></AF>
              </div>
            )}

            <AF label="Imagen de portada"><AdminFoto value={ed.imagen_portada} carpeta="eventos" onChange={(d) => setEd(p => ({ ...p, imagen_portada: d.url }))} /></AF>
            <div className="grid gap-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <AF label="Categoría / tags"><TInput value={ed.categoria} onChange={set('categoria')} /></AF>
              <AF label="Destacado"><TSelect value={ed.destacado} onChange={set('destacado')} opts={['SI', 'NO']} /></AF>
            </div>
            <div className="small" style={{ color: 'var(--fg-muted)' }}>Se guarda como BORRADOR. Publícalo desde la tabla cuando esté listo.</div>
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
Object.assign(window, { AdminSolicitudes, AdminEventos, AdminEvaluaciones, AdminPersonas, AdminProductos, AdminPedidos, AdminNoticias, AdminDashV6 });
