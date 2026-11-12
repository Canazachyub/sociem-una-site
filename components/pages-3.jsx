// ============================================================================
// pages-3.jsx — Páginas públicas (backend v6) · Noche Altiplánica
//   • EventosPage       → próximo evento destacado + cartelera + inscripción
//   • RegistroPage      → Únete: 3 rutas + formulario con validación por correo
//   • EvaluacionPublica → test público por token (?test=<token>)
//   • TiendaPage        → catálogo + carrito → pedidos.crear
//   • NoticiasPage      → diario científico: destacada, grid y artículo
//   Estilos en css/eventos.css (prefijos p3-, ev-, rg-, evp-, tn-, nt-).
//   Ojo: los <script type="text/babel"> comparten el ámbito global, por eso
//   los helpers nuevos llevan prefijo p3/P3.
// ============================================================================
const { useState: u3State, useEffect: u3Effect } = React;
const API = () => window.SOCIEM_API;

// ── Helpers ──────────────────────────────────────────────────────────────────
// Acentos por tipo de evento, aclarados para que contrasten sobre la noche.
const EVENTO_TIPO_COLOR = {
  PONENCIA: '#A46BE0', TALLER: '#4FC7BC', CURSO: '#E2B84E',
  REUNION: '#B9B1C8', CAMPANA: '#F07A7E', CONGRESO: '#F2667A', WEBINAR: '#5FCB8F'
};
const p3TipoColor = (t) => EVENTO_TIPO_COLOR[t] || '#A46BE0';
const P3_TIPO_LABEL = { CAMPANA: 'Campaña', REUNION: 'Reunión', HIBRIDO: 'Híbrido' };
const p3Titulo = (t) => P3_TIPO_LABEL[t] || (String(t || '').charAt(0) + String(t || '').slice(1).toLowerCase());
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'set', 'oct', 'nov', 'dic'];
const P3_MESES_LARGO = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre'];
const P3_DIAS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];

function fmtFechaEvento(f) {
  if (!f) return { dia: '--', mes: '', full: '', dow: '', mesLargo: '' };
  const s = String(f).slice(0, 10);
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return { dia: s, mes: '', full: s, dow: '', mesLargo: '' };
  const mi = parseInt(m[2], 10) - 1;
  const dow = P3_DIAS[new Date(+m[1], mi, +m[3]).getDay()] || '';
  return { dia: m[3], mes: MESES[mi] || '', full: `${m[3]} ${MESES[mi]} ${m[1]}`, dow, mesLargo: P3_MESES_LARGO[mi] || '', anio: m[1] };
}
function modalidadIcon(mod) {
  return mod === 'PRESENCIAL' ? 'mapPin' : mod === 'HIBRIDO' ? 'layers' : 'monitor';
}
// Fecha+hora local del evento (null si la fecha no se puede leer).
function p3Momento(ev, campoHora) {
  const m = String(ev.fecha || '').slice(0, 10).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  const h = String(ev[campoHora] || '').match(/(\d{1,2}):(\d{2})/);
  if (!h) return null;
  return new Date(+m[1], +m[2] - 1, +m[3], +h[1], +h[2]);
}
function p3Inicio(ev) {
  const t = p3Momento(ev, 'hora_inicio');
  if (t) return t;
  const m = String(ev.fecha || '').slice(0, 10).match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
}
function p3Fin(ev) {
  const fin = p3Momento(ev, 'hora_fin');
  if (fin) return fin;
  const ini = p3Momento(ev, 'hora_inicio');
  if (ini) return new Date(ini.getTime() + 2 * 3600 * 1000);
  const d = p3Inicio(ev);
  return d ? new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59) : null;
}
// Estado visible del evento: proximo | en-curso | pasado | finalizado | cancelado.
function p3EstadoEvento(ev, ahora) {
  const st = String(ev.estado || '').toUpperCase();
  if (st === 'CANCELADO') return 'cancelado';
  if (st === 'FINALIZADO') return 'finalizado';
  if (st === 'EN_CURSO') return 'en-curso';
  const ini = p3Inicio(ev), fin = p3Fin(ev);
  if (ini && fin && ahora >= ini && ahora <= fin) return 'en-curso';
  if (fin && ahora > fin) return 'pasado';
  return 'proximo';
}
const p3Hora = (ev) => (ev.hora_inicio || '') + (ev.hora_fin ? `–${ev.hora_fin}` : '');

// Reloj compartido: re-renderiza cada `ms`.
const p3UseAhora = (ms = 1000) => {
  const [t, setT] = u3State(() => Date.now());
  u3Effect(() => { const id = setInterval(() => setT(Date.now()), ms); return () => clearInterval(id); }, [ms]);
  return t;
};

// <img> que cae a un respaldo y, si tampoco existe, se oculta.
const P3Img = ({ src, fallback, alt = '', className, eager }) => (
  <img src={src || fallback} alt={alt} className={className} loading={eager ? undefined : 'lazy'}
    onError={(e) => {
      const el = e.currentTarget;
      if (fallback && !el.dataset.fb && el.getAttribute('src') !== fallback) { el.dataset.fb = '1'; el.src = fallback; }
      else el.style.visibility = 'hidden';
    }} />
);

// Mascota (búho). `alterna` es el archivo de respaldo si la primera no existe.
const P3Mascota = ({ name, alterna, className = 'p3-mascota', alt = '' }) => (
  <img src={`assets/mascota/${name}.png?v=3`} alt={alt} className={className}
    onError={(e) => {
      const el = e.currentTarget;
      if (alterna && !el.dataset.fb) { el.dataset.fb = '1'; el.src = `assets/mascota/${alterna}.png?v=3`; }
      else el.style.display = 'none';
    }} />
);

// Diálogo oscuro (nivel 3). En móvil se vuelve hoja inferior; `side` = cajón lateral.
// Los nombres de clase evitan la palabra "modal" a propósito: styles.css fuerza
// anchos con [class*="modal"] > div en móvil.
const P3Dialog = ({ onClose, children, label, side, wide }) => {
  u3Effect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, []);
  return (
    <div className={'p3-scrim' + (side ? ' is-side' : '')} onClick={onClose}>
      <div className={'p3-dialog' + (wide ? ' is-wide' : '')} role="dialog" aria-modal="true" aria-label={label} onClick={(e) => e.stopPropagation()}>
        <button type="button" className="icon-btn p3-dialog-x" onClick={onClose} aria-label="Cerrar"><Icon name="x" size={16} /></button>
        {children}
      </div>
    </div>
  );
};

// Rejilla de tarjetas fantasma mientras carga.
const P3SkelGrid = ({ n = 6, ratio = '16/10', className = 'grid-auto' }) => (
  <div className={className} aria-busy="true" aria-label="Cargando">
    {Array.from({ length: n }).map((_, i) => (
      <div key={i} className="p3-skel-card">
        <div className="skeleton" style={{ aspectRatio: ratio, borderRadius: '12px 12px 0 0' }} />
        <div className="p3-skel-body">
          <div className="skeleton p3-skel-line" style={{ width: '40%' }} />
          <div className="skeleton p3-skel-line is-lg" style={{ width: '85%' }} />
          <div className="skeleton p3-skel-line" style={{ width: '60%' }} />
        </div>
      </div>
    ))}
  </div>
);

// Estado vacío con mascota.
const P3Vacio = ({ mascota, titulo, children, accion }) => (
  <div className="p3-vacio card">
    <P3Mascota name={mascota} />
    {titulo && <h3 className="h3">{titulo}</h3>}
    {children && <p>{children}</p>}
    {accion}
  </div>
);

// ── Modal de inscripción ─────────────────────────────────────────────────────
const InscripcionModal = ({ evento, onClose }) => {
  const [nombre, setNombre] = u3State('');
  const [email, setEmail] = u3State('');
  const [dni, setDni] = u3State('');
  const [estado, setEstado] = u3State('form'); // form | enviando | ok | error
  const [resp, setResp] = u3State(null);
  const [msg, setMsg] = u3State('');
  const [intento, setIntento] = u3State(false);

  const submit = async (e) => {
    e.preventDefault();
    setIntento(true);
    if (!nombre.trim() || !email.trim()) { setMsg('Ingresa tu nombre y correo'); return; }
    if (dni && dni.length !== 8) { setMsg('El DNI debe tener 8 dígitos'); return; }
    setEstado('enviando'); setMsg('');
    try {
      const r = await API().post('asistencias', 'registrar', { evento_id: evento.id, nombre, email, dni, metodo: 'FORM' });
      if (r && r.ok) { setResp(r.data); setEstado('ok'); }
      else { setMsg((r && r.error) || 'No se pudo registrar'); setEstado('error'); }
    } catch (err) { setMsg(String(err)); setEstado('error'); }
  };

  const fecha = fmtFechaEvento(evento.fecha);
  const malNombre = intento && !nombre.trim();
  const malEmail = intento && !email.trim();
  const malDni = intento && dni && dni.length !== 8;

  return (
    <P3Dialog onClose={onClose} label={'Inscripción a ' + evento.titulo}>
      {estado === 'ok' ? (
        <div className="p3-estado" role="status">
          <P3Mascota name="mascota-certificado" alt="Mascota de SOCIEM-UNA celebrando tu inscripción" />
          <span className="badge badge-green"><Icon name="check" size={12} /> Inscripción confirmada</span>
          <h3 className="h3">¡Nos vemos en el evento!</h3>
          <p>Te esperamos en <b>{evento.titulo}</b>{fecha.full ? <> el <span className="mono">{fecha.full}</span></> : null}.</p>
          <div className="p3-estado-ctas">
            {evento.link_acceso && (
              <a href={evento.link_acceso} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <Icon name="arrowUpRight" size={15} /> Ir al enlace del evento
              </a>
            )}
            <button type="button" className="btn btn-secondary" onClick={onClose}>Listo</button>
          </div>
        </div>
      ) : estado === 'error' ? (
        <div className="p3-estado" role="alert">
          <P3Mascota name="mascota-error" alt="" />
          <span className="badge badge-red">No se pudo registrar</span>
          <h3 className="h3">Algo salió mal</h3>
          <p className="p3-estado-msg">{msg || 'Inténtalo de nuevo en unos segundos.'}</p>
          <div className="p3-estado-ctas">
            <button type="button" className="btn btn-primary" onClick={() => setEstado('form')}><Icon name="refresh" size={14} /> Intentar de nuevo</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      ) : estado === 'enviando' ? (
        <div className="p3-estado" role="status" aria-live="polite">
          <P3Mascota name="mascota-formulario" alt="" />
          <div className="p3-spin" />
          <h3 className="h3">Registrando tu inscripción…</h3>
          <p>Esto toma solo unos segundos.</p>
        </div>
      ) : (
        <>
          <div className="ev-dlg-head" style={{ '--tipo': p3TipoColor(evento.tipo) }}>
            <div className="ev-cal is-static" aria-hidden="true">
              <span className="ev-cal-mes">{fecha.mes}</span>
              <span className="ev-cal-dia">{fecha.dia}</span>
            </div>
            <div style={{ minWidth: 0 }}>
              <div className="ev-tipo-label">{p3Titulo(evento.tipo)}</div>
              <h3 className="ev-dlg-title">{evento.titulo}</h3>
              <div className="ev-dlg-meta mono">{fecha.dow} {fecha.full}{evento.hora_inicio ? ` · ${evento.hora_inicio}` : ''}</div>
            </div>
          </div>
          <form onSubmit={submit} className="p3-form" noValidate>
            <div className={'field' + (malNombre ? ' is-invalid' : '')}>
              <label htmlFor="ins-nombre">Nombre completo</label>
              <input id="ins-nombre" className="input" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" autoComplete="name" aria-invalid={malNombre || undefined} />
              {malNombre && <span className="p3-err">Escribe tu nombre.</span>}
            </div>
            <div className={'field' + (malEmail ? ' is-invalid' : '')}>
              <label htmlFor="ins-email">Correo electrónico</label>
              <input id="ins-email" className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" autoComplete="email" aria-invalid={malEmail || undefined} />
              {malEmail && <span className="p3-err">Necesitamos tu correo.</span>}
            </div>
            <div className={'field' + (malDni ? ' is-invalid' : '')}>
              <label htmlFor="ins-dni">DNI <span className="p3-opt">recomendado</span></label>
              <input id="ins-dni" className="input mono" inputMode="numeric" maxLength={8} value={dni} onChange={(e) => setDni(e.target.value.replace(/\D/g, ''))} placeholder="12345678" aria-invalid={malDni || undefined} />
              <span className={malDni ? 'p3-err' : 'p3-hint'}>{malDni ? `Faltan ${8 - dni.length} dígitos.` : 'Valida tu asistencia y tu certificado.'}</span>
            </div>
            {msg && <div className="p3-alert" role="alert"><Icon name="flag" size={14} /> {msg}</div>}
            <button type="submit" className="btn btn-primary w-full">
              <Icon name="check" size={15} /> Confirmar inscripción
            </button>
            <p className="p3-foot">Si apruebas las validaciones, recibirás tu reconocimiento por correo.</p>
          </form>
        </>
      )}
    </P3Dialog>
  );
};

// ── Cuenta regresiva (en mono) ───────────────────────────────────────────────
const P3Countdown = ({ target }) => {
  const ahora = p3UseAhora(1000);
  if (!target) return null;
  const falta = target.getTime() - ahora;
  if (falta <= 0) return null;
  let s = Math.floor(falta / 1000);
  const d = Math.floor(s / 86400); s %= 86400;
  const h = Math.floor(s / 3600); s %= 3600;
  const m = Math.floor(s / 60); s %= 60;
  const celdas = [[d, d === 1 ? 'día' : 'días'], [h, 'horas'], [m, 'min'], [s, 'seg']];
  return (
    <div className="ev-count" role="timer" aria-label={`Faltan ${d} días, ${h} horas y ${m} minutos`}>
      {celdas.map(([v, l]) => (
        <div className="ev-count-cell" key={l}>
          <span className="ev-count-num mono">{String(v).padStart(2, '0')}</span>
          <span className="ev-count-lbl">{l}</span>
        </div>
      ))}
    </div>
  );
};

// ── Próximo evento destacado ─────────────────────────────────────────────────
const EvDestacado = ({ ev, ahora, onInscribir }) => {
  const fecha = fmtFechaEvento(ev.fecha);
  const est = p3EstadoEvento(ev, ahora);
  const flyer = window.IMG(ev.flyer_url) || 'assets/eventos/evento-default.jpg';
  const lugar = ev.modalidad === 'PRESENCIAL' ? ev.lugar : (ev.plataforma || ev.lugar);
  return (
    <div className="ev-feature reveal" style={{ '--tipo': p3TipoColor(ev.tipo) }}>
      <div className="ev-feature-media">
        <P3Img src={flyer} fallback="assets/eventos/evento-default.jpg" alt={'Flyer de ' + ev.titulo} eager />
        <span className="ev-tipo-pill">{p3Titulo(ev.tipo)}</span>
      </div>
      <div className="ev-feature-body">
        <div className="halo halo-gold ev-feature-halo" aria-hidden="true" />
        <div className="eyebrow ev-feature-eyebrow">
          {est === 'en-curso' ? <><span className="live-dot" /> En curso ahora</> : 'Próximo evento'}
        </div>
        <div className="ev-feature-date">
          <span className="ev-feature-dia">{fecha.dia}</span>
          <span className="ev-feature-mes">
            <span className="ev-feature-mes-l">{fecha.mesLargo}</span>
            <span className="mono">{fecha.dow}{ev.hora_inicio ? ` · ${p3Hora(ev)}` : ''}</span>
          </span>
        </div>
        <h2 className="ev-feature-title">{ev.titulo}</h2>
        <div className="ev-feature-meta">
          {ev.ponente_nombre && <span><Icon name="user" size={14} /> {ev.ponente_nombre}</span>}
          <span><Icon name={modalidadIcon(ev.modalidad)} size={14} /> {p3Titulo(ev.modalidad || 'VIRTUAL')}{lugar ? ` · ${lugar}` : ''}</span>
          {ev.cupo && <span><Icon name="users" size={14} /> Cupo <span className="mono">{ev.cupo}</span></span>}
        </div>
        {est !== 'en-curso' && <P3Countdown target={p3Inicio(ev)} />}
        <div className="ev-feature-ctas">
          <button type="button" className="btn btn-gold" onClick={() => onInscribir(ev)}>
            Inscribirme <Icon name="arrowUpRight" size={15} />
          </button>
          {est === 'en-curso' && ev.link_acceso && (
            <a className="btn btn-secondary" href={ev.link_acceso} target="_blank" rel="noopener noreferrer"><Icon name="monitor" size={15} /> Entrar ahora</a>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Tarjeta de evento ────────────────────────────────────────────────────────
const EventoCard = ({ ev, onInscribir, ahora, i = 0 }) => {
  const fecha = fmtFechaEvento(ev.fecha);
  const flyer = window.IMG(ev.flyer_url) || 'assets/eventos/evento-default.jpg';
  const finalizado = String(ev.estado) === 'FINALIZADO' || String(ev.estado) === 'CANCELADO';
  const est = p3EstadoEvento(ev, ahora || Date.now());
  const desc = ev.descripcion ? String(ev.descripcion) : '';
  return (
    <article className={'card card-hover ev-card reveal' + (est === 'pasado' || finalizado ? ' is-past' : '')}
      style={{ '--tipo': p3TipoColor(ev.tipo), transitionDelay: `${Math.min(i, 8) * 60}ms` }}>
      <div className="card-media ev-card-media">
        <P3Img src={flyer} fallback="assets/eventos/evento-default.jpg" alt={'Flyer de ' + ev.titulo} />
        <div className="ev-cal" aria-label={`${fecha.dia} de ${fecha.mesLargo}`}>
          <span className="ev-cal-mes">{fecha.mes}</span>
          <span className="ev-cal-dia">{fecha.dia}</span>
          <span className="ev-cal-dow">{fecha.dow}</span>
        </div>
        <span className="ev-tipo-pill">{p3Titulo(ev.tipo)}</span>
        {est === 'en-curso' && <span className="ev-live"><span className="live-dot" /> En curso</span>}
        {!finalizado && (
          <button type="button" className="action-circle" aria-label={'Inscribirme en ' + ev.titulo} onClick={() => onInscribir(ev)}>
            <Icon name="arrowUpRight" size={20} />
          </button>
        )}
      </div>
      <div className="ev-card-body">
        <div className="ev-badges">
          <span className="badge ev-mod"><Icon name={modalidadIcon(ev.modalidad)} size={12} /> {p3Titulo(ev.modalidad || 'VIRTUAL')}</span>
          {ev.cupo && <span className="badge badge-gold"><Icon name="users" size={12} /> Cupo {ev.cupo}</span>}
          {String(ev.estado) === 'CANCELADO' && <span className="badge badge-red">Cancelado</span>}
          {String(ev.estado) === 'FINALIZADO' && <span className="badge">Finalizado</span>}
        </div>
        <h3 className="ev-card-title">{ev.titulo}</h3>
        <div className="ev-meta">
          {ev.ponente_nombre && <span><Icon name="user" size={13} /> {ev.ponente_nombre}</span>}
          {ev.hora_inicio && <span><Icon name="clock" size={13} /> <span className="mono">{p3Hora(ev)}</span></span>}
        </div>
        {desc && <p className="ev-card-desc">{desc.slice(0, 120)}{desc.length > 120 ? '…' : ''}</p>}
        <button type="button" className={'btn ev-card-cta ' + (finalizado ? 'btn-secondary' : 'btn-primary')} disabled={finalizado} onClick={() => onInscribir(ev)}>
          {finalizado ? (String(ev.estado) === 'CANCELADO' ? 'Evento cancelado' : 'Evento finalizado') : <><Icon name="check" size={15} /> Inscribirme</>}
        </button>
      </div>
    </article>
  );
};

// ── Página de Eventos ────────────────────────────────────────────────────────
const EventosPage = () => {
  const [items, setItems] = u3State(null);
  const [insc, setInsc] = u3State(null);
  const [filtro, setFiltro] = u3State('TODOS');
  const [modFiltro, setModFiltro] = u3State('TODAS');
  const ahora = p3UseAhora(60000);
  useReveal();

  const [fallo, setFallo] = u3State(false);
  const cargar = () => {
    setFallo(false); setItems(null);
    API().get('eventos', 'list')
      .then((r) => { if (r && r.ok) setItems(r.data || []); else setFallo(true); })
      .catch(() => setFallo(true));
  };
  u3Effect(cargar, []);

  const todos = items || [];
  const tipos = ['TODOS'].concat(Array.from(new Set(todos.map((e) => e.tipo).filter(Boolean))));
  const mods = ['TODAS'].concat(['PRESENCIAL', 'VIRTUAL', 'HIBRIDO'].filter((m) => todos.some((e) => e.modalidad === m)));
  const tIni = (e) => { const d = p3Inicio(e); return d ? d.getTime() : 0; };
  const vigente = (e) => { const s = p3EstadoEvento(e, ahora); return s === 'proximo' || s === 'en-curso'; };

  // Destacado: el evento vigente más cercano (si hay uno en curso, ese).
  const destacado = todos.filter(vigente).sort((a, b) => {
    const ca = p3EstadoEvento(a, ahora) === 'en-curso' ? 0 : 1, cb = p3EstadoEvento(b, ahora) === 'en-curso' ? 0 : 1;
    return ca - cb || tIni(a) - tIni(b);
  })[0];

  const filtrados = todos.filter((e) => (filtro === 'TODOS' || e.tipo === filtro) && (modFiltro === 'TODAS' || e.modalidad === modFiltro));
  const proximos = filtrados.filter((e) => vigente(e) && e !== destacado).sort((a, b) => tIni(a) - tIni(b));
  const anteriores = filtrados.filter((e) => !vigente(e)).sort((a, b) => String(b.fecha).localeCompare(String(a.fecha)));
  const hayFiltro = filtro !== 'TODOS' || modFiltro !== 'TODAS';

  return (
    <div className="ev-page">
      <PageHero img="assets/banners/eventos-banner.jpg" fallback="assets/hero/hero-altiplano.jpg"
        eyebrow="Actividades SOCIEM-UNA"
        title={<>Eventos que encienden <em>la noche</em></>}
        lede="Ponencias, talleres, cursos y campañas. Inscríbete, asiste y completa las validaciones para sumar puntos y recibir tu reconocimiento.">
        {items && items.length > 0 && (
          <div className="ev-hero-stats mono">
            <span><b>{todos.filter(vigente).length}</b> próximos</span>
            <span><b>{todos.length}</b> en total</span>
          </div>
        )}
      </PageHero>

      <div className="container ev-body">
        {fallo ? (
          <LoadErrorCard onRetry={cargar}>No pudimos cargar los eventos. Revisa tu conexión e inténtalo de nuevo.</LoadErrorCard>
        ) : items === null ? (
          <>
            <div className="skeleton ev-feature-skel" />
            <P3SkelGrid n={6} />
          </>
        ) : todos.length === 0 ? (
          <P3Vacio mascota="mascota-megafono" titulo="Pronto anunciaremos lo que viene">
            Aún no hay eventos publicados. Vuelve en unos días o síguenos en redes para enterarte primero.
          </P3Vacio>
        ) : (
          <>
            {destacado && <EvDestacado ev={destacado} ahora={ahora} onInscribir={setInsc} />}

            {(tipos.length > 2 || mods.length > 2) && (
              <div className="ev-filtros reveal">
                {tipos.length > 2 && (
                  <div className="chip-row" role="group" aria-label="Filtrar por tipo de evento">
                    {tipos.map((t) => (
                      <button key={t} type="button" className="chip" aria-pressed={filtro === t} onClick={() => setFiltro(t)}>
                        {t !== 'TODOS' && <span className="ev-chip-dot" style={{ '--tipo': p3TipoColor(t) }} />}
                        {t === 'TODOS' ? 'Todos' : p3Titulo(t)}
                      </button>
                    ))}
                  </div>
                )}
                {mods.length > 2 && (
                  <div className="chip-row" role="group" aria-label="Filtrar por modalidad">
                    {mods.map((m) => (
                      <button key={m} type="button" className="chip" aria-pressed={modFiltro === m} onClick={() => setModFiltro(m)}>
                        {m !== 'TODAS' && <Icon name={modalidadIcon(m)} size={13} />}
                        {m === 'TODAS' ? 'Toda modalidad' : p3Titulo(m)}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {proximos.length === 0 && anteriores.length === 0 ? (
              hayFiltro ? (
                <div className="p3-vacio card">
                  <h3 className="h3">Nada con esos filtros</h3>
                  <p>Prueba con otro tipo o modalidad.</p>
                  <button type="button" className="btn btn-secondary" onClick={() => { setFiltro('TODOS'); setModFiltro('TODAS'); }}>Quitar filtros</button>
                </div>
              ) : null
            ) : (
              <>
                {proximos.length > 0 && (
                  <div className="ev-bloque">
                    <div className="ev-bloque-head reveal"><h2 className="h2">Próximos <em>encuentros</em></h2><span className="mono ev-bloque-n">{proximos.length}</span></div>
                    <div className="grid-auto ev-grid">
                      {proximos.map((ev, i) => <EventoCard key={ev.id} ev={ev} i={i} ahora={ahora} onInscribir={setInsc} />)}
                    </div>
                  </div>
                )}
                {anteriores.length > 0 && (
                  <div className="ev-bloque">
                    <div className="ev-bloque-head reveal"><h2 className="h2">Eventos <em>anteriores</em></h2><span className="mono ev-bloque-n">{anteriores.length}</span></div>
                    <div className="grid-auto ev-grid">
                      {anteriores.map((ev, i) => <EventoCard key={ev.id} ev={ev} i={i} ahora={ahora} onInscribir={setInsc} />)}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {insc && <InscripcionModal evento={insc} onClose={() => setInsc(null)} />}
    </div>
  );
};

// ── ÚNETE: hub de 3 rutas + formularios self-service ─────────────────────────
const COMITES_REG = ['', 'SCOPE-IN', 'SCOPE-OUT', 'SCOME', 'SCORE', 'SCOPH', 'SCORA', 'SCORP', 'CPC', 'CPA', 'CPPC', 'CPAIS', 'CPRII', 'CPDII'];
const ANIOS_FMH = ['1ero', '2do', '3ero', '4to', '5to', '6to', '7mo'];
const CARRERAS_SALUD = ['Medicina Humana', 'Enfermería', 'Nutrición Humana', 'Odontología', 'Obstetricia', 'Psicología', 'Tecnología Médica', 'Biología'];

// Subida de foto a Drive con previsualización.
const FotoUploader = ({ value, thumb, carpeta, onUploaded }) => {
  const [subiendo, setSubiendo] = u3State(false);
  const [error, setError] = u3State('');
  const onPick = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { setError('La imagen supera 10 MB'); return; }
    setError(''); setSubiendo(true);
    try {
      const r = await API().uploadFile(file, carpeta);
      if (r && r.ok && r.data) onUploaded(r.data);
      else setError((r && r.error) || 'No se pudo subir');
    } catch (err) { setError(String(err)); }
    setSubiendo(false);
  };
  return (
    <div className="field">
      <label>Fotografía {carpeta === 'asesores' ? '' : <span className="p3-opt">para credencial y felicitaciones</span>}</label>
      <div className={'rg-foto' + (thumb ? ' has-foto' : '')}>
        <div className="rg-foto-thumb">
          {thumb ? <img src={thumb} alt="Vista previa de tu foto" /> : <Icon name="user" size={30} />}
          {subiendo && <div className="rg-foto-cargando"><div className="p3-spin is-sm" /></div>}
        </div>
        <div className="rg-foto-txt">
          <label className="btn btn-secondary btn-sm rg-foto-btn">
            <Icon name="upload" size={14} /> {subiendo ? 'Subiendo…' : thumb ? 'Cambiar foto' : 'Subir foto'}
            <input type="file" accept="image/*" onChange={onPick} disabled={subiendo} className="p3-sr" />
          </label>
          <span className="p3-hint">JPG o PNG · máx. 10 MB · rostro de frente y buena luz</span>
          {thumb && !subiendo && <span className="rg-foto-ok"><Icon name="check" size={13} /> Foto subida</span>}
          {error && <span className="p3-err">{error}</span>}
        </div>
      </div>
    </div>
  );
};

// Repetidor de campos "Otros".
const OtrosFields = ({ items, onChange }) => (
  <div className="field">
    <label>Otros datos <span className="p3-opt">opcional</span></label>
    <p className="p3-hint rg-otros-hint">Agrega lo que creas necesario: talla de polo, intereses de investigación, alergias, link a tu CTI/ORCID…</p>
    {items.map((it, i) => (
      <div key={i} className="rg-otro-row">
        <input className="input" aria-label="Campo" placeholder="Campo (ej. Talla)" value={it.campo} onChange={(e) => onChange(items.map((x, j) => j === i ? { ...x, campo: e.target.value } : x))} />
        <input className="input" aria-label="Valor" placeholder="Valor (ej. M)" value={it.valor} onChange={(e) => onChange(items.map((x, j) => j === i ? { ...x, valor: e.target.value } : x))} />
        <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="icon-btn" aria-label="Quitar campo"><Icon name="x" size={14} /></button>
      </div>
    ))}
    <button type="button" className="btn-link rg-otros-add" onClick={() => onChange([...items, { campo: '', valor: '' }])}><Icon name="plus" size={14} /> Añadir campo</button>
  </div>
);

// Imagen lateral del flujo Únete (camino andino hacia un arco de luz).
const RgVisual = ({ children, mascota }) => (
  <div className="rg-visual">
    <P3Img src="assets/hero/registro.jpg" fallback="assets/hero/hero-altiplano.jpg" alt="Camino andino que lleva a un arco de luz bajo el cielo nocturno" eager />
    <div className="hero-grain" />
    {mascota && <P3Mascota name="mascota-hero" className="rg-visual-mascota" alt="Mascota de SOCIEM-UNA dándote la bienvenida" />}
    <div className="rg-visual-caption">{children}</div>
  </div>
);

// Formulario unificado. modo: 'NUEVO' | 'ACTUAL' | 'ASESOR'
const UneteForm = ({ modo, onBack }) => {
  const esAsesor = modo === 'ASESOR';
  const carpeta = esAsesor ? 'asesores' : 'miembros';
  const [f, setF] = u3State({
    nombres: '', email: '', dni: '', codigo_universitario: '', telefono: '', cumpleanos: '',
    anio_estudios: '1ero', carrera: 'Medicina Humana', comite_interes: '', institucion: '',
    especialidad: '', motivo: '', foto_url: '', foto_thumb: '', acepta: false
  });
  const [otros, setOtros] = u3State([]);
  const [estado, setEstado] = u3State('form');
  const [msg, setMsg] = u3State('');
  const [intento, setIntento] = u3State(false);
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  u3Effect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [estado === 'ok']);

  const submit = async (e) => {
    e.preventDefault();
    setIntento(true);
    if (!f.nombres.trim() || !f.email.trim()) { setMsg('Apellidos/Nombres y correo son obligatorios'); return; }
    if (!esAsesor && !f.acepta) { setMsg('Debes aceptar los términos y condiciones'); return; }
    setEstado('enviando'); setMsg('');
    const extra = {};
    otros.filter((o) => o.campo.trim()).forEach((o) => { extra[o.campo.trim()] = o.valor; });
    if (esAsesor) { if (f.institucion) extra['Institución'] = f.institucion; if (f.especialidad) extra['Especialidad'] = f.especialidad; }
    const payload = {
      tipo_solicitante: esAsesor ? 'ASESOR' : 'ESTUDIANTE',
      subtipo: modo,
      nombres: f.nombres, apellidos: '', email: f.email, dni: f.dni, telefono: f.telefono,
      cumpleanos: f.cumpleanos, codigo_universitario: f.codigo_universitario,
      anio_estudios: f.anio_estudios, carrera: f.carrera,
      universidad: 'Universidad Nacional del Altiplano', comite_interes: f.comite_interes,
      foto_url: f.foto_url, motivo: f.motivo, acepta_terminos: (esAsesor || f.acepta) ? 'SI' : 'NO',
      extra_json: JSON.stringify(extra)
    };
    try {
      const r = await API().post('solicitudes', 'crear', payload);
      if (r && r.ok) setEstado('ok');
      else { setMsg((r && r.error) || 'No se pudo enviar'); setEstado('form'); }
    } catch (err) { setMsg(String(err)); setEstado('form'); }
  };

  if (estado === 'ok') {
    return (
      <div className="container rg-ok">
        <div className="card rg-ok-card">
          <div className="halo halo-gold rg-ok-halo" aria-hidden="true" />
          <P3Mascota name="mascota-formulario" alt="Mascota de SOCIEM-UNA con tu formulario enviado" />
          <span className="badge badge-green"><Icon name="check" size={12} /> Registro enviado</span>
          <h1 className="h2">Revisa tu <em>correo</em></h1>
          <p>Enviamos un enlace a <b className="mono">{f.email}</b> para validar tus datos. Tras validarlo, el Consejo Ejecutivo revisará tu registro.</p>
          <ol className="rg-ok-pasos">
            <li className="is-done"><span>1</span> Enviaste tus datos</li>
            <li className="is-now"><span>2</span> Abre el enlace del correo</li>
            <li><span>3</span> La directiva revisa tu solicitud</li>
          </ol>
          <p className="p3-hint">¿No llega? Revisa spam o promociones.</p>
          <button type="button" className="btn btn-secondary" onClick={onBack}>Volver</button>
        </div>
      </div>
    );
  }

  const titulo = modo === 'NUEVO' ? <>Nuevo <em>miembro</em></> : modo === 'ACTUAL' ? <>Actualiza tu <em>ficha</em></> : <>Asesor <em>o docente</em></>;
  const sub = modo === 'NUEVO' ? 'II Convocatoria SOCIEM-UNA 2026' : modo === 'ACTUAL' ? 'Miembro actual' : 'Registro de asesor / docente';
  const malNombre = intento && !f.nombres.trim();
  const malEmail = intento && !f.email.trim();
  const malAcepta = intento && !esAsesor && !f.acepta;

  // Pasos visibles: cada sección se marca completa con lo esencial.
  const pasos = [
    { id: 'rg-s1', t: 'Identidad', ok: !!(f.nombres.trim() && f.email.trim() && f.telefono.trim()) },
    { id: 'rg-s2', t: esAsesor ? 'Trayectoria' : 'Formación', ok: esAsesor ? !!(f.especialidad || f.institucion) : !!f.anio_estudios },
    { id: 'rg-s3', t: 'Foto y extras', ok: !!f.foto_url },
    { id: 'rg-s4', t: 'Confirmación', ok: esAsesor || f.acepta },
  ];
  const ir = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  return (
    <div className="container rg-form-page">
      <div className="rg-form-grid">
        <aside className="rg-form-side">
          <button type="button" className="btn-link rg-back" onClick={onBack}><Icon name="arrow" size={14} style={{ transform: 'rotate(180deg)' }} /> Elegir otro caso</button>
          <RgVisual>
            <span className="eyebrow">{sub}</span>
            <p className="rg-quote">Cada dato nos ayuda a <em>conocerte</em>.</p>
          </RgVisual>
          <ol className="rg-steps" aria-label="Secciones del formulario">
            {pasos.map((p, i) => (
              <li key={p.id}>
                <button type="button" className={'rg-step' + (p.ok ? ' is-done' : '')} onClick={() => ir(p.id)}>
                  <span className="rg-step-n">{p.ok ? <Icon name="check" size={13} /> : i + 1}</span>
                  <span>{p.t}</span>
                </button>
              </li>
            ))}
          </ol>
        </aside>

        <div className="rg-form-main">
          <div className="eyebrow">Únete a SOCIEM-UNA</div>
          <h1 className="h1 rg-form-title">{titulo}</h1>
          {modo === 'ACTUAL' && <p className="lede">Si ya eres miembro, completa tus datos y actualizaremos tu ficha existente (te identificamos por tu correo).</p>}

          <form onSubmit={submit} className="card rg-card" noValidate>
            <fieldset className="rg-fs" id="rg-s1">
              <legend><span className="rg-fs-n mono">01</span> Identidad</legend>
              <div className={'field' + (malNombre ? ' is-invalid' : '')}>
                <label htmlFor="rg-nombres">Apellidos y nombres * <span className="p3-opt">en mayúscula, para tu credencial</span></label>
                <input id="rg-nombres" className="input" value={f.nombres} autoComplete="name" aria-invalid={malNombre || undefined}
                  onChange={(e) => setF((p) => ({ ...p, nombres: e.target.value.toUpperCase() }))} />
                {malNombre && <span className="p3-err">Este campo es obligatorio.</span>}
              </div>
              <div className="rg-grid2">
                <div className={'field' + (malEmail ? ' is-invalid' : '')}>
                  <label htmlFor="rg-email">Correo electrónico *</label>
                  <input id="rg-email" className="input" type="email" value={f.email} onChange={set('email')} autoComplete="email" aria-invalid={malEmail || undefined} />
                  {malEmail ? <span className="p3-err">Lo usamos para validar tu registro.</span> : <span className="p3-hint">Te llegará un enlace de validación.</span>}
                </div>
                <div className="field"><label htmlFor="rg-tel">Celular / WhatsApp *</label><input id="rg-tel" className="input mono" inputMode="tel" value={f.telefono} onChange={set('telefono')} autoComplete="tel" /></div>
              </div>
              {!esAsesor && (
                <div className="rg-grid2">
                  <div className="field"><label htmlFor="rg-dni">DNI *</label><input id="rg-dni" className="input mono" inputMode="numeric" value={f.dni} onChange={set('dni')} /></div>
                  <div className="field"><label htmlFor="rg-cod">Código universitario *</label><input id="rg-cod" className="input mono" value={f.codigo_universitario} onChange={set('codigo_universitario')} /></div>
                </div>
              )}
            </fieldset>

            <fieldset className="rg-fs" id="rg-s2">
              <legend><span className="rg-fs-n mono">02</span> {esAsesor ? 'Trayectoria' : 'Formación'}</legend>
              <div className="rg-grid2">
                <div className="field"><label htmlFor="rg-cumple">Cumpleaños <span className="p3-opt">ej. 9 de septiembre</span></label><input id="rg-cumple" className="input" value={f.cumpleanos} onChange={set('cumpleanos')} /></div>
                {!esAsesor
                  ? <div className="field"><label htmlFor="rg-anio">Año de estudios en FMH 2026 *</label>
                      <select id="rg-anio" className="input" value={f.anio_estudios} onChange={set('anio_estudios')}>{ANIOS_FMH.map((a) => <option key={a}>{a}</option>)}</select></div>
                  : <div className="field"><label htmlFor="rg-esp">Especialidad / Área</label><input id="rg-esp" className="input" value={f.especialidad} onChange={set('especialidad')} /></div>}
              </div>
              {esAsesor && <div className="field"><label htmlFor="rg-inst">Institución</label><input id="rg-inst" className="input" value={f.institucion} onChange={set('institucion')} /></div>}
              {!esAsesor && (
                <div className="rg-grid2">
                  <div className="field"><label htmlFor="rg-carrera">Carrera</label>
                    <select id="rg-carrera" className="input" value={f.carrera} onChange={set('carrera')}>{CARRERAS_SALUD.map((c) => <option key={c}>{c}</option>)}</select></div>
                  <div className="field"><label htmlFor="rg-comite">Comité de interés</label>
                    <select id="rg-comite" className="input" value={f.comite_interes} onChange={set('comite_interes')}>{COMITES_REG.map((c) => <option key={c} value={c}>{c || '— Sin preferencia —'}</option>)}</select></div>
                </div>
              )}
            </fieldset>

            <fieldset className="rg-fs" id="rg-s3">
              <legend><span className="rg-fs-n mono">03</span> Foto y extras</legend>
              <FotoUploader value={f.foto_url} thumb={f.foto_thumb} carpeta={carpeta}
                onUploaded={(d) => setF((p) => ({ ...p, foto_url: d.url, foto_thumb: d.thumb }))} />
              <OtrosFields items={otros} onChange={setOtros} />
              <div className="field"><label htmlFor="rg-motivo">{esAsesor ? 'Cuéntanos sobre ti / líneas de asesoría' : 'Comentario'} {!esAsesor && <span className="p3-opt">opcional</span>}</label>
                <textarea id="rg-motivo" className="textarea" rows={3} value={f.motivo} onChange={set('motivo')} /></div>
            </fieldset>

            <fieldset className="rg-fs" id="rg-s4">
              <legend><span className="rg-fs-n mono">04</span> Confirmación</legend>
              {!esAsesor && (
                <label className={'rg-acepta' + (f.acepta ? ' is-on' : '') + (malAcepta ? ' is-invalid' : '')}>
                  <input type="checkbox" checked={f.acepta} onChange={(e) => setF((p) => ({ ...p, acepta: e.target.checked }))} />
                  <span>Acepto los términos: participación activa y responsable, incorporación al grupo oficial de WhatsApp, y evaluación del Consejo Ejecutivo ante conductas que afecten a la sociedad.</span>
                </label>
              )}
              {msg && <div className="p3-alert" role="alert"><Icon name="flag" size={14} /> {msg}</div>}
              <button type="submit" className="btn btn-primary rg-submit" disabled={estado === 'enviando'}>
                {estado === 'enviando' ? <><span className="p3-spin is-sm is-ink" /> Enviando…</> : <>Enviar registro <Icon name="send" size={15} /></>}
              </button>
              <p className="p3-hint">Al enviar recibirás un correo para validar tu dirección.</p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

// Hub: elige ruta
const RUTAS = [
  { modo: 'NUEVO', icon: 'sparkle', titulo: 'Nuevo miembro', desc: 'II Convocatoria SOCIEM-UNA 2026. Súmate a la familia y crece con nosotros.' },
  { modo: 'ACTUAL', icon: 'users', titulo: 'Miembro actual', desc: 'Ya perteneces a SOCIEM-UNA. Completa o actualiza tu ficha y tu foto.' },
  { modo: 'ASESOR', icon: 'medal', titulo: 'Asesor / Docente', desc: 'Docentes y asesores que acompañan nuestras actividades e investigación.' },
];

const RegistroPage = () => {
  const [modo, setModo] = u3State(null);
  useReveal();
  u3Effect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [modo]);
  if (modo) return <UneteForm modo={modo} onBack={() => setModo(null)} />;
  return (
    <div className="container rg-hub">
      <RgVisual mascota>
        <span className="eyebrow">Convocatoria 2026</span>
        <p className="rg-quote">La ciencia también se hace <em>desde el altiplano</em>.</p>
      </RgVisual>
      <div className="rg-hub-main">
        <div className="eyebrow fade-up">Únete a SOCIEM-UNA</div>
        <h1 className="h1 fade-up d1 rg-hub-title">¿Cómo quieres <em>sumarte</em>?</h1>
        <p className="lede fade-up d2">Elige tu caso. Te enviaremos un correo para validar tu dirección y la directiva revisará tu solicitud.</p>
        <div className="rg-rutas">
          {RUTAS.map((r, i) => (
            <button key={r.modo} type="button" onClick={() => setModo(r.modo)} className="rg-ruta reveal" style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="rg-ruta-ico"><Icon name={r.icon} size={22} /></span>
              <span className="rg-ruta-txt">
                <span className="rg-ruta-t">{r.titulo}</span>
                <span className="rg-ruta-d">{r.desc}</span>
              </span>
              <span className="action-circle rg-ruta-go" aria-hidden="true"><Icon name="arrowUpRight" size={18} /></span>
            </button>
          ))}
        </div>
        <ol className="rg-pasos reveal" aria-label="Cómo funciona">
          <li><span className="mono">01</span> Eliges tu caso</li>
          <li><span className="mono">02</span> Completas tus datos</li>
          <li><span className="mono">03</span> Validas tu correo</li>
          <li><span className="mono">04</span> La directiva te confirma</li>
        </ol>
      </div>
    </div>
  );
};

// ── Página pública para RENDIR un test (link ?test=<token>) ──────────────────
// Se muestra sola, sin Navbar: barra mínima con marca y progreso.
const LETRAS = ['A', 'B', 'C', 'D'];
const EvaluacionPublica = ({ token }) => {
  const [estado, setEstado] = u3State('cargando'); // cargando|error|form|enviando|result
  const [test, setTest] = u3State(null);
  const [email, setEmail] = u3State('');
  const [dniTest, setDniTest] = u3State('');
  const [resp, setResp] = u3State({});
  const [msg, setMsg] = u3State('');
  const [res, setRes] = u3State(null);
  const [intento, setIntento] = u3State(false);

  u3Effect(() => {
    API().get('evaluaciones', 'getPublic', { token }).then((r) => {
      if (r && r.ok) { setTest(r.data); setEstado('form'); }
      else { setMsg((r && r.error) || 'Test no disponible'); setEstado('error'); }
    }).catch((e) => { setMsg(String(e)); setEstado('error'); });
  }, [token]);
  u3Effect(() => { if (estado === 'result') window.scrollTo({ top: 0, behavior: 'smooth' }); }, [estado]);

  const submit = async (e) => {
    e.preventDefault();
    setIntento(true);
    if (!email.trim()) { setMsg('Ingresa el correo con el que te inscribiste'); return; }
    setMsg(''); setEstado('enviando');
    try {
      const r = await API().post('evaluaciones', 'submit', { token, email, dni: dniTest, respuestas: JSON.stringify(resp) });
      if (r && r.ok) { setRes(r.data); setEstado('result'); }
      else { setMsg((r && r.error) || 'No se pudo enviar'); setEstado('form'); }
    } catch (err) { setMsg(String(err)); setEstado('form'); }
  };

  const preguntas = (test && test.preguntas) || [];
  const total = preguntas.length;
  const respondidas = preguntas.filter((q) => String(resp[q.id] || '').trim()).length;
  const pct = total ? Math.round((respondidas * 100) / total) : 0;
  const enExamen = estado === 'form' || estado === 'enviando';

  const wrap = (inner) => (
    <div className="evp-page">
      <header className="evp-top">
        <div className="evp-top-in">
          <a className="evp-brand" href={window.location.pathname} aria-label="Ir al sitio de SOCIEM-UNA"><Logo size={30} /><Wordmark /></a>
          {enExamen && total > 0 && (
            <div className="evp-top-prog" aria-live="polite">
              <span className="mono">{respondidas}/{total}</span>
              <div className="evp-bar" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={respondidas} aria-label="Preguntas respondidas">
                <span style={{ width: pct + '%' }} />
              </div>
            </div>
          )}
        </div>
      </header>
      <main className="evp-main">{inner}</main>
    </div>
  );

  if (estado === 'cargando') return wrap(
    <div aria-busy="true" aria-label="Cargando test">
      <div className="skeleton p3-skel-line" style={{ width: 160 }} />
      <div className="skeleton evp-skel-title" />
      <div className="skeleton evp-skel-card" />
      <div className="skeleton evp-skel-card" />
    </div>
  );
  if (estado === 'error') return wrap(
    <div className="card evp-result">
      <P3Mascota name="mascota-error" />
      <span className="badge badge-red"><Icon name="lock" size={12} /> Test no disponible</span>
      <h1 className="h2">Este test no está <em>abierto</em></h1>
      <p>{msg}</p>
      <a className="btn btn-secondary" href={window.location.pathname}>Ir al sitio</a>
    </div>
  );
  if (estado === 'result') {
    const max = Number(res.maximo) || 0;
    const nota = Number(res.puntaje_obtenido) || 0;
    const rpct = max ? Math.max(0, Math.min(100, Math.round((nota * 100) / max))) : 0;
    return wrap(
      <div className={'card evp-result ' + (res.aprobado ? 'is-ok' : 'is-fail')}>
        {res.aprobado && (
          <div className="evp-stars" aria-hidden="true">{Array.from({ length: 8 }).map((_, i) => <span key={i} />)}</div>
        )}
        <div className={'halo ' + (res.aprobado ? 'halo-gold' : 'halo-violet') + ' evp-result-halo'} aria-hidden="true" />
        <P3Mascota name={res.aprobado ? 'mascota-certificado' : 'mascota-error'} alt={res.aprobado ? 'Mascota de SOCIEM-UNA celebrando' : ''} />
        <span className={'badge ' + (res.aprobado ? 'badge-green' : 'badge-red')}>{res.aprobado ? 'Aprobado' : 'No aprobado'}</span>
        <h1 className="h1">{res.aprobado ? <>¡Lo <em>lograste</em>!</> : <>Casi, <em>sigue</em> intentando</>}</h1>
        <div className="evp-score mono">{res.puntaje_obtenido}<span>/ {res.maximo}</span></div>
        <div className="evp-bar is-lg" aria-hidden="true"><span style={{ width: rpct + '%' }} /></div>
        <p>{res.aprobado ? 'Tu validación quedó registrada. Si completas ambas validaciones recibirás tu reconocimiento por correo.' : 'Puedes intentarlo de nuevo si el test aún lo permite.'}</p>
        <a className="btn btn-secondary" href={window.location.pathname}>Ir al sitio de SOCIEM-UNA</a>
      </div>
    );
  }

  const malEmail = intento && !email.trim();
  return wrap(
    <>
      <div className="evp-head">
        <div className="eyebrow">Validación · SOCIEM-UNA</div>
        <h1 className="h1 evp-title">{test.titulo}</h1>
        {test.descripcion && <p className="lede">{test.descripcion}</p>}
        <div className="evp-chips">
          <span className="badge badge-violet"><Icon name="book" size={12} /> {total} {total === 1 ? 'pregunta' : 'preguntas'}</span>
          <span className="badge"><Icon name="check" size={12} /> Una respuesta por pregunta</span>
        </div>
      </div>
      <form onSubmit={submit} noValidate>
        <div className="card evp-id">
          <div className="evp-q-n mono">Tus datos</div>
          <div className="rg-grid2">
            <div className={'field' + (malEmail ? ' is-invalid' : '')}>
              <label htmlFor="evp-email">Correo (el de tu inscripción) *</label>
              <input id="evp-email" className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" aria-invalid={malEmail || undefined} />
              {malEmail && <span className="p3-err">Lo necesitamos para registrar tu nota.</span>}
            </div>
            <div className="field">
              <label htmlFor="evp-dni">DNI <span className="p3-opt">opcional</span></label>
              <input id="evp-dni" className="input mono" inputMode="numeric" maxLength={8} value={dniTest} onChange={(e) => setDniTest(e.target.value.replace(/\D/g, ''))} placeholder="12345678" />
            </div>
          </div>
        </div>

        <ol className="evp-lista">
          {preguntas.map((q, i) => {
            const opciones = ['opcion_a', 'opcion_b', 'opcion_c', 'opcion_d'].map((k, j) => ({ letra: LETRAS[j], texto: q[k] })).filter((o) => o.texto);
            const hecha = !!String(resp[q.id] || '').trim();
            return (
              <li key={q.id} className={'card evp-q' + (hecha ? ' is-done' : '')}>
                <div className="evp-q-n mono">Pregunta {String(i + 1).padStart(2, '0')} <span>/ {String(total).padStart(2, '0')}</span>{hecha && <Icon name="check" size={13} />}</div>
                <h2 className="evp-q-t" id={'evp-q-' + q.id}>{q.enunciado}</h2>
                {q.tipo === 'TEXTO' ? (
                  <input className="input" aria-labelledby={'evp-q-' + q.id} value={resp[q.id] || ''} onChange={(e) => setResp((p) => ({ ...p, [q.id]: e.target.value }))} placeholder="Tu respuesta" />
                ) : (
                  <div className="evp-opts" role="radiogroup" aria-labelledby={'evp-q-' + q.id}>
                    {opciones.map((o) => {
                      const sel = resp[q.id] === o.letra;
                      return (
                        <label key={o.letra} className={'evp-opt' + (sel ? ' is-sel' : '')}>
                          <input type="radio" className="p3-sr" name={q.id} checked={sel} onChange={() => setResp((p) => ({ ...p, [q.id]: o.letra }))} />
                          <span className="evp-letra mono">{o.letra}</span>
                          <span className="evp-opt-txt">{o.texto}</span>
                          <span className="evp-opt-check" aria-hidden="true"><Icon name="check" size={14} /></span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <div className="evp-submit">
          <div className="evp-submit-txt">
            <span className="mono">{respondidas} de {total}</span> respondidas
            {respondidas < total && <span className="p3-hint"> · puedes enviar aunque falten</span>}
          </div>
          {msg && <div className="p3-alert" role="alert"><Icon name="flag" size={14} /> {msg}</div>}
          <button type="submit" className="btn btn-primary" disabled={estado === 'enviando'}>
            {estado === 'enviando' ? <><span className="p3-spin is-sm is-ink" /> Enviando…</> : <>Enviar respuestas <Icon name="send" size={15} /></>}
          </button>
        </div>
      </form>
    </>
  );
};

// ── TIENDA pública (catálogo + carrito → pedidos.crear) ──────────────────────
const P3_CAT_LABEL = { POLO: 'Polos', TOMATODO: 'Tomatodos', STICKER: 'Stickers', KIT: 'Kits', LIBRO: 'Libros', OTRO: 'Otros' };
// Foto local de respaldo por categoría (si la de Drive no carga).
const P3_CAT_IMG = { POLO: 'assets/tienda/polo.jpg', TOMATODO: 'assets/tienda/tomatodo.jpg', KIT: 'assets/tienda/kit.jpg' };
const p3Soles = (n) => Number(n || 0).toFixed(2);

// Panel del pedido: se usa en la columna lateral (desktop) y en el cajón (móvil).
const TnCartPanel = ({ cart, total, setCant, quitar, onCheckout }) => {
  const unidades = cart.reduce((s, x) => s + x.cant, 0);
  return (
    <div className="tn-cart">
      <div className="tn-cart-head">
        <h3 className="h3">Tu pedido</h3>
        {cart.length > 0 && <span className="badge badge-violet">{unidades} {unidades === 1 ? 'ítem' : 'ítems'}</span>}
      </div>
      {cart.length === 0 ? (
        <div className="tn-cart-vacio">
          <P3Mascota name="mascota-carrito" alt="" />
          <p>Tu carrito está vacío. Agrega un producto para empezar.</p>
        </div>
      ) : (
        <>
          <ul className="tn-cart-list">
            {cart.map((x) => (
              <li key={x.id} className="tn-cart-row">
                <div className="tn-cart-thumb">{x.img ? <P3Img src={x.img} alt="" /> : <Icon name="shoppingBag" size={18} />}</div>
                <div className="tn-cart-info">
                  <div className="tn-cart-name">{x.nombre}</div>
                  <div className="mono tn-cart-unit">S/ {p3Soles(x.precio)}</div>
                </div>
                <div className="tn-step">
                  <button type="button" aria-label={'Quitar una unidad de ' + x.nombre} onClick={() => setCant(x.id, -1)} disabled={x.cant <= 1}>−</button>
                  <span className="mono">{x.cant}</span>
                  <button type="button" aria-label={'Añadir una unidad de ' + x.nombre} onClick={() => setCant(x.id, 1)} disabled={x.cant >= x.stock}>+</button>
                </div>
                <button type="button" className="tn-cart-del" aria-label={'Quitar ' + x.nombre + ' del pedido'} onClick={() => quitar(x.id)}><Icon name="trash" size={14} /></button>
              </li>
            ))}
          </ul>
          <div className="tn-total">
            <span>Total</span>
            <span className="tn-precio mono">S/ <b>{p3Soles(total)}</b></span>
          </div>
          <button type="button" className="btn btn-primary w-full" onClick={onCheckout}>Realizar pedido <Icon name="arrow" size={14} /></button>
          <p className="p3-hint tn-cart-nota">Coordinamos el pago (Yape, Plin, efectivo o transferencia) y la entrega contigo.</p>
        </>
      )}
    </div>
  );
};

const TiendaPage = () => {
  const [items, setItems] = u3State(null);
  const [cart, setCart] = u3State([]); // [{id,nombre,precio,cant,stock,img}]
  const [co, setCo] = u3State(false);  // modal checkout
  const [f, setF] = u3State({ nombre: '', email: '', telefono: '', metodo_pago: 'YAPE' });
  const [estado, setEstado] = u3State('idle');
  const [okData, setOkData] = u3State(null);
  const [msg, setMsg] = u3State('');
  const [cat, setCat] = u3State('TODAS');
  const [drawer, setDrawer] = u3State(false); // cajón del pedido en móvil
  const [aviso, setAviso] = u3State('');      // toast "agregado"
  useReveal();

  const [fallo, setFallo] = u3State(false);
  const cargar = () => {
    setFallo(false); setItems(null);
    API().get('productos', 'list')
      .then((r) => { if (r && r.ok) setItems(r.items || r.data || []); else setFallo(true); })
      .catch(() => setFallo(true));
  };
  u3Effect(cargar, []);
  u3Effect(() => { if (!aviso) return; const id = setTimeout(() => setAviso(''), 1800); return () => clearTimeout(id); }, [aviso]);

  const add = (p) => {
    setCart((c) => {
      const ex = c.find((x) => x.id === p.id);
      if (ex) return c.map((x) => x.id === p.id ? { ...x, cant: Math.min(x.cant + 1, Number(p.stock) || 99) } : x);
      return [...c, { id: p.id, nombre: p.nombre, precio: Number(p.precio), cant: 1, stock: Number(p.stock) || 99, img: window.IMG(p.imagen_url) || P3_CAT_IMG[p.categoria] || '' }];
    });
    setAviso(p.nombre);
  };
  const setCant = (id, d) => setCart((c) => c.map((x) => x.id === id ? { ...x, cant: Math.max(1, Math.min(x.cant + d, x.stock)) } : x));
  const quitar = (id) => setCart((c) => c.filter((x) => x.id !== id));
  const total = cart.reduce((s, x) => s + x.precio * x.cant, 0);
  const unidades = cart.reduce((s, x) => s + x.cant, 0);

  const comprar = async (e) => {
    e.preventDefault();
    if (!f.nombre || !f.email) { setMsg('Nombre y correo requeridos'); return; }
    setMsg(''); setEstado('enviando');
    try {
      const r = await API().post('pedidos', 'crear', { ...f, items: JSON.stringify(cart.map((x) => ({ producto_id: x.id, cantidad: x.cant }))) });
      if (r && r.ok) { setOkData(r.data); setCart([]); }
      else { setMsg((r && r.error) || 'No se pudo crear el pedido'); }
    } catch (err) { setMsg(String(err)); }
    setEstado('idle');
  };

  const lista = items || [];
  const cats = ['TODAS'].concat(Array.from(new Set(lista.map((p) => p.categoria).filter(Boolean))));
  const visibles = lista.filter((p) => cat === 'TODAS' || p.categoria === cat);
  const cerrarCo = () => { setCo(false); setOkData(null); };
  const panel = <TnCartPanel cart={cart} total={total} setCant={setCant} quitar={quitar} onCheckout={() => { setDrawer(false); setCo(true); }} />;

  return (
    <div className="tn-page">
      <PageHero img="assets/banners/tienda-banner.jpg" fallback="assets/tienda/banner-tienda.jpg"
        eyebrow="Tienda SOCIEM-UNA"
        title={<>Lleva el altiplano <em>contigo</em></>}
        lede="Merchandising oficial. Cada compra apoya nuestras campañas e investigación. Haz tu pedido y coordinamos la entrega.">
        <div className="tn-hero-chips">
          <span className="badge"><Icon name="heart" size={12} /> Apoyas a la sociedad</span>
          <span className="badge"><Icon name="pin" size={12} /> Entrega en la FMH</span>
          <span className="badge"><Icon name="phone" size={12} /> Yape · Plin</span>
        </div>
      </PageHero>

      <div className="container tn-body">
        {fallo ? <LoadErrorCard onRetry={cargar}>No pudimos cargar la tienda. Revisa tu conexión e inténtalo de nuevo.</LoadErrorCard>
          : items === null ? <P3SkelGrid n={8} ratio="1/1" className="tn-grid" />
          : items.length === 0 ? (
            <P3Vacio mascota="mascota-carrito" titulo="La vitrina está vacía">Aún no hay productos disponibles. Vuelve pronto.</P3Vacio>
          ) : (
            <>
              {cats.length > 2 && (
                <div className="chip-row tn-cats reveal" role="group" aria-label="Filtrar por categoría">
                  {cats.map((c) => (
                    <button key={c} type="button" className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>
                      {c === 'TODAS' ? 'Todo' : (P3_CAT_LABEL[c] || p3Titulo(c))}
                    </button>
                  ))}
                </div>
              )}
              <div className="tn-layout">
                <div className="tn-grid">
                  {visibles.map((p, i) => {
                    const img = window.IMG(p.imagen_url);
                    const sin = Number(p.stock) <= 0;
                    const enCart = cart.find((x) => x.id === p.id);
                    const stock = Number(p.stock);
                    return (
                      <article key={p.id} className={'card card-hover tn-card reveal' + (sin ? ' is-out' : '')} style={{ transitionDelay: `${Math.min(i, 8) * 60}ms` }}>
                        <div className="card-media tn-card-media">
                          <div className="tn-card-ph" aria-hidden="true"><Icon name="shoppingBag" size={36} /></div>
                          <P3Img src={img || P3_CAT_IMG[p.categoria]} fallback={P3_CAT_IMG[p.categoria]} alt={p.nombre} />
                          {String(p.destacado) === 'SI' && <span className="badge badge-gold tn-dest"><Icon name="star" size={11} /> Destacado</span>}
                          {sin && <span className="tn-agotado">Agotado</span>}
                          {!sin && (
                            <button type="button" className="action-circle" aria-label={'Agregar ' + p.nombre + ' al pedido'} onClick={() => add(p)}>
                              <Icon name="plus" size={20} />
                            </button>
                          )}
                        </div>
                        <div className="tn-card-body">
                          {p.categoria && <span className="tn-cat">{P3_CAT_LABEL[p.categoria] || p.categoria}</span>}
                          <h3 className="tn-card-title">{p.nombre}</h3>
                          {p.descripcion && <p className="tn-card-desc">{String(p.descripcion).slice(0, 70)}</p>}
                          {!sin && stock > 0 && stock <= 5 && <span className="tn-stock">Quedan {stock}</span>}
                          <div className="tn-card-foot">
                            <span className="tn-precio mono">S/ <b>{p3Soles(p.precio)}</b></span>
                            <button type="button" className={'btn btn-sm ' + (enCart ? 'btn-primary' : 'btn-secondary')} disabled={sin} onClick={() => add(p)}>
                              {sin ? 'Agotado' : enCart ? <><Icon name="check" size={13} /> {enCart.cant}</> : <><Icon name="plus" size={13} /> Agregar</>}
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
                <aside className="card tn-aside" aria-label="Tu pedido">{panel}</aside>
              </div>
            </>
          )}
      </div>

      {/* Barra del pedido en móvil: abre el cajón */}
      {cart.length > 0 && !drawer && !co && (
        <button type="button" className="tn-cartbar" onClick={() => setDrawer(true)}>
          <span className="tn-cartbar-n mono">{unidades}</span>
          <span>Ver pedido</span>
          <span className="tn-cartbar-total mono">S/ {p3Soles(total)}</span>
        </button>
      )}
      {aviso && <div className="p3-toast" role="status"><Icon name="check" size={14} /> {aviso} agregado al pedido</div>}

      {drawer && <P3Dialog side onClose={() => setDrawer(false)} label="Tu pedido">{panel}</P3Dialog>}

      {co && (
        <P3Dialog onClose={cerrarCo} label="Confirmar pedido">
          {okData ? (
            <div className="p3-estado" role="status">
              <P3Mascota name="mascota-tienda" alterna="mascota-certificado" alt="Mascota de SOCIEM-UNA con tu pedido" />
              <span className="badge badge-green"><Icon name="check" size={12} /> Pedido recibido</span>
              <h3 className="h3">¡Gracias por tu apoyo!</h3>
              <div className="tn-ok-code">
                <span className="label muted">Código</span>
                <span className="mono">{okData.codigo}</span>
                <span className="label muted">Total</span>
                <span className="tn-precio mono">S/ <b>{okData.total}</b></span>
              </div>
              <p>Te contactaremos para coordinar el pago y la entrega.</p>
              <button type="button" className="btn btn-secondary" onClick={cerrarCo}>Cerrar</button>
            </div>
          ) : (
            <>
              <div className="eyebrow">Paso final</div>
              <h3 className="h3 tn-co-title">Datos de contacto</h3>
              <ul className="tn-co-resumen">
                {cart.map((x) => <li key={x.id}><span>{x.cant} × {x.nombre}</span><span className="mono">S/ {p3Soles(x.precio * x.cant)}</span></li>)}
              </ul>
              <form onSubmit={comprar} className="p3-form" noValidate>
                <div className="field"><label htmlFor="tn-nombre">Nombre completo *</label><input id="tn-nombre" className="input" autoComplete="name" value={f.nombre} onChange={(e) => setF((p) => ({ ...p, nombre: e.target.value }))} /></div>
                <div className="field"><label htmlFor="tn-email">Correo *</label><input id="tn-email" className="input" type="email" autoComplete="email" value={f.email} onChange={(e) => setF((p) => ({ ...p, email: e.target.value }))} /></div>
                <div className="field"><label htmlFor="tn-tel">Celular / WhatsApp</label><input id="tn-tel" className="input mono" inputMode="tel" autoComplete="tel" value={f.telefono} onChange={(e) => setF((p) => ({ ...p, telefono: e.target.value }))} /></div>
                <div className="field">
                  <label>Método de pago</label>
                  <div className="chip-row tn-pago" role="radiogroup" aria-label="Método de pago">
                    {['YAPE', 'PLIN', 'EFECTIVO', 'TRANSFERENCIA'].map((m) => (
                      <button key={m} type="button" role="radio" aria-checked={f.metodo_pago === m} aria-pressed={f.metodo_pago === m} className="chip"
                        onClick={() => setF((p) => ({ ...p, metodo_pago: m }))}>{p3Titulo(m)}</button>
                    ))}
                  </div>
                </div>
                {msg && <div className="p3-alert" role="alert"><Icon name="flag" size={14} /> {msg}</div>}
                <div className="tn-total"><span>Total</span><span className="tn-precio mono">S/ <b>{p3Soles(total)}</b></span></div>
                <button type="submit" className="btn btn-primary w-full" disabled={estado === 'enviando'}>
                  {estado === 'enviando' ? <><span className="p3-spin is-sm is-ink" /> Enviando…</> : 'Confirmar pedido'}
                </button>
              </form>
            </>
          )}
        </P3Dialog>
      )}
    </div>
  );
};

// ── NOTICIAS / DIARIO CIENTÍFICO (público) ───────────────────────────────────
const doiHref = (d) => { const s = String(d || '').trim(); if (!s) return ''; return /^https?:\/\//.test(s) ? s : 'https://doi.org/' + s; };

const _tipoNoticia = (n) => String(n.tipo) === 'PAPER' ? 'CLUB DE REVISTAS' : (n.tipo || 'NOTICIA');
const _renderMd = (md, base) => String(md).split(/\n+/).map((linea, i) => {
  const t = linea.trim();
  if (!t) return null;
  if (t.startsWith('## ')) return <h2 key={i} className={base ? 'nt-h' : 'nt-h is-sm'}>{t.slice(3)}</h2>;
  return <p key={i} className={base ? 'nt-p' : 'nt-p is-sm'}>{t}</p>;
});
const _hayContenido = (n) => n.contenido_md && String(n.contenido_md).trim() && !/^##\s*Contenido\.{3}/.test(String(n.contenido_md).trim());
const p3FechaNoticia = (n) => fmtFechaEvento(n.fecha_publicacion).full;
// Minutos de lectura aproximados (200 palabras/min).
const p3Lectura = (n) => {
  const txt = [n.resumen, _hayContenido(n) ? n.contenido_md : '', n.comentario, n.preguntas].filter(Boolean).join(' ');
  const palabras = txt.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palabras / 200));
};
const NT_FALLBACK = 'assets/noticias/noticia-default.jpg';

const NtMeta = ({ n, lectura }) => {
  const esPaper = String(n.tipo) === 'PAPER';
  return (
    <div className="nt-meta">
      <span className={'badge ' + (esPaper ? 'badge-violet' : 'badge-gold')}>{_tipoNoticia(n)}</span>
      {n.comite_relacionado && <span className="mono">{n.comite_relacionado}</span>}
      <span className="mono">{p3FechaNoticia(n)}</span>
      {lectura && <span className="mono">{p3Lectura(n)} min de lectura</span>}
    </div>
  );
};

// Tarjeta del listado: toda la tarjeta es un enlace al detalle (#/noticias/slug).
const NoticiaCard = ({ n, i = 0 }) => {
  const portada = window.IMG(n.imagen_portada);
  const href = '#/noticias/' + (n.slug || n.id);
  const resumen = n.resumen ? String(n.resumen) : '';
  return (
    <article className="card card-hover nt-card reveal" style={{ transitionDelay: `${Math.min(i, 8) * 60}ms` }}>
      <div className="card-media nt-card-media">
        <P3Img src={portada} fallback={NT_FALLBACK} alt="" />
        <span className="action-circle" aria-hidden="true"><Icon name="arrowUpRight" size={20} /></span>
      </div>
      <div className="nt-card-body">
        <NtMeta n={n} />
        <h3 className="nt-card-title"><a href={href} className="p3-stretch">{n.titulo}</a></h3>
        {resumen && <p className="nt-card-desc">{resumen}</p>}
        {n.autor_nombre && <div className="nt-autor-sm"><Icon name="user" size={13} /> {n.autor_nombre}</div>}
      </div>
    </article>
  );
};

// Noticia destacada: grande, imagen a la izquierda.
const NtDestacada = ({ n }) => {
  const portada = window.IMG(n.imagen_portada);
  const href = '#/noticias/' + (n.slug || n.id);
  const resumen = n.resumen ? String(n.resumen) : '';
  return (
    <article className="card card-hover nt-feature reveal">
      <div className="nt-feature-media">
        <P3Img src={portada} fallback={NT_FALLBACK} alt="" eager />
        <span className="badge badge-gold nt-feature-tag"><Icon name="star" size={11} /> Destacada</span>
      </div>
      <div className="nt-feature-body">
        <NtMeta n={n} lectura />
        <h2 className="nt-feature-title"><a href={href} className="p3-stretch">{n.titulo}</a></h2>
        {resumen && <p className="nt-feature-desc">{resumen.slice(0, 260)}{resumen.length > 260 ? '…' : ''}</p>}
        <div className="nt-feature-foot">
          {n.autor_nombre && <span className="nt-autor"><span className="nt-avatar">{String(n.autor_nombre).trim().charAt(0)}</span>{n.autor_nombre}</span>}
          <span className="btn-link">Leer publicación <Icon name="arrow" size={14} /></span>
        </div>
      </div>
    </article>
  );
};

// Barra para compartir: nativo si existe, WhatsApp, Facebook, X y copiar enlace.
const NtShare = ({ titulo }) => {
  const [copiado, setCopiado] = u3State(false);
  const url = window.location.href;
  const nativo = typeof navigator !== 'undefined' && !!navigator.share;
  const copiar = async () => {
    try { await navigator.clipboard.writeText(url); setCopiado(true); setTimeout(() => setCopiado(false), 2000); }
    catch (e) { window.prompt('Copia el enlace:', url); }
  };
  const enc = encodeURIComponent;
  return (
    <div className="nt-share">
      <span className="label muted">Compartir</span>
      <div className="nt-share-btns">
        {nativo && <button type="button" className="icon-btn" aria-label="Compartir" onClick={() => navigator.share({ title: titulo, url }).catch(() => {})}><Icon name="send" size={16} /></button>}
        <a className="icon-btn" href={'https://wa.me/?text=' + enc(titulo + ' ' + url)} target="_blank" rel="noopener noreferrer" aria-label="Compartir por WhatsApp"><Icon name="message" size={16} /></a>
        <a className="icon-btn" href={'https://www.facebook.com/sharer/sharer.php?u=' + enc(url)} target="_blank" rel="noopener noreferrer" aria-label="Compartir en Facebook"><Icon name="facebook" size={16} /></a>
        <a className="icon-btn" href={'https://twitter.com/intent/tweet?text=' + enc(titulo) + '&url=' + enc(url)} target="_blank" rel="noopener noreferrer" aria-label="Compartir en X"><Icon name="twitter" size={16} /></a>
        <button type="button" className={'icon-btn' + (copiado ? ' is-ok' : '')} aria-label="Copiar enlace" onClick={copiar}><Icon name={copiado ? 'check' : 'link'} size={16} /></button>
        {copiado && <span className="nt-copiado" role="status">Enlace copiado</span>}
      </div>
    </div>
  );
};

// Vista de detalle: artículo editorial con portada a sangre, cuerpo a 68ch,
// análisis crítico, preguntas de discusión, acciones y compartir.
const NoticiaDetalle = ({ n }) => {
  const portada = window.IMG(n.imagen_portada);
  const preguntas = String(n.preguntas || '').split('\n').map((x) => x.trim()).filter(Boolean);
  return (
    <article className="nt-art">
      <header className="nt-cover">
        <div className="nt-cover-bg" aria-hidden="true">
          <P3Img src={portada} fallback={NT_FALLBACK} alt="" eager />
          <div className="hero-grain" />
        </div>
        <div className="nt-cover-head">
          <a className="btn-link nt-back" href="#/noticias"><Icon name="arrow" size={14} style={{ transform: 'rotate(180deg)' }} /> Noticias</a>
          <NtMeta n={n} lectura />
          <h1 className="nt-art-title">{n.titulo}</h1>
          {n.autor_nombre && (
            <div className="nt-autor"><span className="nt-avatar">{String(n.autor_nombre).trim().charAt(0)}</span><span>Por <b>{n.autor_nombre}</b></span></div>
          )}
        </div>
      </header>

      <div className="nt-art-body">
        {n.resumen && <p className="nt-lede">{n.resumen}</p>}

        {n.cita && (
          <aside className="nt-ref">
            <div className="label muted">Referencia</div>
            <p>{n.cita} {n.doi && <a href={doiHref(n.doi)} target="_blank" rel="noopener noreferrer" className="mono">DOI {n.doi} <Icon name="arrowUpRight" size={12} /></a>}</p>
          </aside>
        )}

        {_hayContenido(n) && <div className="nt-contenido">{_renderMd(n.contenido_md, true)}</div>}

        {n.comentario && (
          <section className="nt-bloque">
            <div className="label">Comentario · análisis crítico</div>
            <p className="nt-p">{n.comentario}</p>
          </section>
        )}

        {preguntas.length > 0 && (
          <section className="nt-preguntas">
            <div className="label">Preguntas para discusión</div>
            <ol>{preguntas.map((q, i) => <li key={i}><span className="mono">{String(i + 1).padStart(2, '0')}</span><span>{q}</span></li>)}</ol>
          </section>
        )}

        <div className="nt-acciones">
          {n.pdf_url && <a className="btn btn-primary" href={n.pdf_url} target="_blank" rel="noopener noreferrer"><Icon name="arrowUpRight" size={15} /> Leer el paper (PDF)</a>}
          {n.cta_url && <a className="btn btn-gold" href={n.cta_url} target={/^https?:/.test(String(n.cta_url)) ? '_blank' : undefined} rel="noopener noreferrer">{n.cta_label || 'Más información'} <Icon name="arrow" size={14} /></a>}
          <a className="btn btn-secondary" href="#/noticias">Más publicaciones</a>
        </div>

        <NtShare titulo={n.titulo} />
      </div>
    </article>
  );
};

const NoticiasPage = ({ slug }) => {
  const [items, setItems] = u3State(null);
  const [filtro, setFiltro] = u3State('TODOS');
  const [fallo, setFallo] = u3State(false);
  useReveal();
  const cargar = () => {
    setFallo(false); setItems(null);
    API().get('noticias', 'list')
      .then((r) => { if (r && r.ok) setItems(r.items || r.data || []); else setFallo(true); })
      .catch(() => setFallo(true));
  };
  u3Effect(cargar, []);
  u3Effect(() => { window.scrollTo({ top: 0 }); }, [slug]);

  // ── Vista de DETALLE (#/noticias/<slug>) ──
  if (slug) {
    const n = (items || []).find((x) => String(x.slug) === String(slug) || String(x.id) === String(slug));
    if (n) return <NoticiaDetalle n={n} />;
    return (
      <div className="container nt-estado">
        {fallo ? <LoadErrorCard onRetry={cargar}>No pudimos cargar la publicación. Revisa tu conexión e inténtalo de nuevo.</LoadErrorCard>
          : items === null ? (
            <div aria-busy="true" aria-label="Cargando publicación">
              <div className="skeleton nt-skel-cover" />
              <div className="nt-skel-body">
                <div className="skeleton p3-skel-line is-lg" style={{ width: '90%' }} />
                <div className="skeleton p3-skel-line" />
                <div className="skeleton p3-skel-line" />
                <div className="skeleton p3-skel-line" style={{ width: '70%' }} />
              </div>
            </div>
          )
          : (
            <P3Vacio mascota="mascota-404" titulo="No encontramos esa publicación"
              accion={<a className="btn btn-primary" href="#/noticias">Ver todas las noticias</a>}>
              Puede que se haya movido o que el enlace esté incompleto.
            </P3Vacio>
          )}
      </div>
    );
  }

  // ── Vista de LISTADO ──
  const tipos = ['TODOS', 'PAPER', 'NOTICIA', 'COMUNICADO'];
  // Orden defensivo en cliente (el backend desplegado aún puede ordenar mal
  // fechas tipo Date de Sheets hasta el próximo redeploy).
  const visibles = (items || [])
    .filter((n) => filtro === 'TODOS' || String(n.tipo || 'NOTICIA') === filtro)
    .sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion));
  const destacada = visibles.find((n) => String(n.destacado) === 'SI') || visibles[0];
  const resto = visibles.filter((n) => n !== destacada);

  return (
    <div className="nt-page">
      <PageHero img="assets/banners/noticias-banner.jpg" fallback="assets/hero/hero-altiplano.jpg"
        eyebrow="Diario científico · SOCIEM-UNA"
        title={<>Noticias y <em>club de revistas</em></>}
        lede="Publicaciones, análisis crítico de papers y novedades de la sociedad. Abre cualquiera para leerla completa, descargar el PDF y ver las preguntas de discusión." />

      <div className="container nt-body">
        <div className="chip-row nt-filtros" role="group" aria-label="Filtrar publicaciones">
          {tipos.map((t) => (
            <button key={t} type="button" className="chip" aria-pressed={filtro === t} onClick={() => setFiltro(t)}>
              {t === 'TODOS' ? 'Todo' : t === 'PAPER' ? 'Club de Revistas' : p3Titulo(t)}
            </button>
          ))}
        </div>

        {fallo ? <LoadErrorCard onRetry={cargar}>No pudimos cargar las publicaciones. Revisa tu conexión e inténtalo de nuevo.</LoadErrorCard>
          : items === null ? (
            <>
              <div className="skeleton nt-feature-skel" />
              <P3SkelGrid n={3} />
            </>
          )
          : visibles.length === 0 ? (
            <P3Vacio mascota="mascota-investiga" titulo="Aún no hay publicaciones">
              {filtro === 'TODOS' ? 'Pronto compartiremos noticias y análisis de papers.' : 'Prueba con otra categoría.'}
            </P3Vacio>
          ) : (
            <>
              {destacada && <NtDestacada n={destacada} />}
              {resto.length > 0 && (
                <div className="grid-auto nt-grid">
                  {resto.map((n, i) => <NoticiaCard key={n.id} n={n} i={i} />)}
                </div>
              )}
            </>
          )}
      </div>
    </div>
  );
};

Object.assign(window, { EventosPage, RegistroPage, EvaluacionPublica, TiendaPage, NoticiasPage });
