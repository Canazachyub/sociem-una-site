// ============================================================================
// pages-3.jsx — Páginas públicas nuevas (backend v6)
//   • EventosPage   → lista de eventos + inscripción (asistencias.registrar)
//   • RegistroPage  → solicitud de acceso con validación por correo
// ============================================================================
const { useState: u3State, useEffect: u3Effect } = React;
const API = () => window.SOCIEM_API;

// ── Helpers ──────────────────────────────────────────────────────────────────
const EVENTO_TIPO_COLOR = {
  PONENCIA: 'var(--violet-600)', TALLER: '#2EC4B6', CURSO: '#D4AF37',
  REUNION: '#807A8C', CAMPANA: '#C8102E', CONGRESO: '#E63946', WEBINAR: '#2E7D32'
};
const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'set', 'oct', 'nov', 'dic'];

function fmtFechaEvento(f) {
  if (!f) return { dia: '--', mes: '', full: '' };
  const s = String(f).slice(0, 10);
  const m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return { dia: s, mes: '', full: s };
  return { dia: m[3], mes: MESES[parseInt(m[2], 10) - 1] || '', full: `${m[3]} ${MESES[parseInt(m[2], 10) - 1]} ${m[1]}` };
}
function modalidadIcon(mod) {
  return mod === 'PRESENCIAL' ? 'mapPin' : mod === 'HIBRIDO' ? 'layers' : 'monitor';
}

// ── Modal de inscripción ─────────────────────────────────────────────────────
const InscripcionModal = ({ evento, onClose }) => {
  const [nombre, setNombre] = u3State('');
  const [email, setEmail] = u3State('');
  const [dni, setDni] = u3State('');
  const [estado, setEstado] = u3State('form'); // form | enviando | ok | error
  const [resp, setResp] = u3State(null);
  const [msg, setMsg] = u3State('');

  const submit = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim()) { setMsg('Ingresa tu nombre y correo'); return; }
    if (dni && dni.length !== 8) { setMsg('El DNI debe tener 8 dígitos'); return; }
    setEstado('enviando'); setMsg('');
    try {
      const r = await API().post('asistencias', 'registrar', { evento_id: evento.id, nombre, email, dni, metodo: 'FORM' });
      if (r && r.ok) { setResp(r.data); setEstado('ok'); }
      else { setMsg((r && r.error) || 'No se pudo registrar'); setEstado('error'); }
    } catch (err) { setMsg(String(err)); setEstado('error'); }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(20,12,32,.55)', display: 'grid', placeItems: 'center', zIndex: 1000, padding: 20 }}>
      <div className="card" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 440, padding: '32px 30px', position: 'relative' }}>
        <button onClick={onClose} aria-label="Cerrar" style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--fg-muted)' }}>
          <Icon name="x" size={18} />
        </button>
        {estado === 'ok' ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: 99, background: '#2E7D32', color: '#fff', display: 'grid', placeItems: 'center', margin: '0 auto 16px' }}>
              <Icon name="check" size={26} />
            </div>
            <h3 className="serif" style={{ fontSize: 22 }}>¡Inscripción confirmada!</h3>
            <p className="small mt-2" style={{ color: 'var(--fg-muted)' }}>Te esperamos en <b>{evento.titulo}</b>.</p>
            {evento.link_acceso && (
              <a href={evento.link_acceso} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ marginTop: 18, display: 'inline-flex' }}>
                <Icon name="arrowUpRight" size={15} /> Ir al enlace del evento
              </a>
            )}
          </div>
        ) : (
          <>
            <div className="mono small" style={{ color: EVENTO_TIPO_COLOR[evento.tipo] || 'var(--violet-600)' }}>{evento.tipo}</div>
            <h3 className="serif mt-1" style={{ fontSize: 22, lineHeight: 1.25 }}>{evento.titulo}</h3>
            <p className="small mt-2" style={{ color: 'var(--fg-muted)' }}>{fmtFechaEvento(evento.fecha).full} · {evento.hora_inicio}</p>
            <form onSubmit={submit} className="grid gap-4 mt-6">
              <div className="field"><label>Nombre completo</label><input className="input" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" /></div>
              <div className="field"><label>Correo electrónico</label><input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@ejemplo.com" /></div>
              <div className="field"><label>DNI <span style={{ color: 'var(--fg-muted)', fontWeight: 400 }}>(recomendado: valida tu asistencia y certificado)</span></label><input className="input" inputMode="numeric" maxLength={8} value={dni} onChange={(e) => setDni(e.target.value.replace(/\D/g, ''))} placeholder="12345678" /></div>
              {msg && <div className="small" style={{ color: '#C8102E' }}>{msg}</div>}
              <button type="submit" className="btn btn-primary" disabled={estado === 'enviando'}>
                {estado === 'enviando' ? 'Registrando…' : 'Confirmar inscripción'}
              </button>
              <p className="small" style={{ color: 'var(--fg-muted)', textAlign: 'center' }}>Si aprobaste las validaciones, recibirás tu reconocimiento por correo.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

// ── Tarjeta de evento ────────────────────────────────────────────────────────
const EventoCard = ({ ev, onInscribir }) => {
  const color = EVENTO_TIPO_COLOR[ev.tipo] || 'var(--violet-600)';
  const fecha = fmtFechaEvento(ev.fecha);
  const flyer = window.IMG(ev.flyer_url) || 'assets/eventos/evento-default.jpg';
  const finalizado = String(ev.estado) === 'FINALIZADO' || String(ev.estado) === 'CANCELADO';
  return (
    <div className="card card-hover" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', aspectRatio: '16/10', background: 'var(--bg-soft)' }}>
        {flyer ? <img src={flyer} alt={ev.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} />
          : <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', background: `linear-gradient(135deg, ${color}22, ${color}08)` }}><Icon name="calendar" size={40} /></div>}
        <div style={{ position: 'absolute', top: 12, left: 12, background: '#fff', borderRadius: 12, padding: '6px 12px', textAlign: 'center', boxShadow: '0 4px 14px rgba(0,0,0,.12)' }}>
          <div className="serif" style={{ fontSize: 22, fontWeight: 600, lineHeight: 1, color }}>{fecha.dia}</div>
          <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', color: 'var(--fg-muted)' }}>{fecha.mes}</div>
        </div>
        <div style={{ position: 'absolute', top: 12, right: 12, background: color, color: '#fff', borderRadius: 99, padding: '4px 12px', fontSize: 11, fontWeight: 600, letterSpacing: '.04em' }}>{ev.tipo}</div>
      </div>
      <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.35 }}>{ev.titulo}</h3>
        {ev.ponente_nombre && <div className="small mt-2" style={{ color: 'var(--fg-muted)' }}><Icon name="user" size={13} /> {ev.ponente_nombre}</div>}
        <div className="small mt-1" style={{ color: 'var(--fg-muted)', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <span><Icon name="clock" size={13} /> {ev.hora_inicio}{ev.hora_fin ? `–${ev.hora_fin}` : ''}</span>
          <span><Icon name={modalidadIcon(ev.modalidad)} size={13} /> {ev.modalidad}</span>
        </div>
        {ev.descripcion && <p className="small mt-3" style={{ color: 'var(--fg-muted)', flex: 1 }}>{String(ev.descripcion).slice(0, 120)}{String(ev.descripcion).length > 120 ? '…' : ''}</p>}
        <button className="btn btn-primary" style={{ marginTop: 16 }} disabled={finalizado} onClick={() => onInscribir(ev)}>
          {finalizado ? 'Evento finalizado' : <><Icon name="check" size={15} /> Inscribirme</>}
        </button>
      </div>
    </div>
  );
};

// ── Página de Eventos ────────────────────────────────────────────────────────
const EventosPage = () => {
  const [items, setItems] = u3State(null);
  const [insc, setInsc] = u3State(null);
  const [filtro, setFiltro] = u3State('TODOS');

  const [fallo, setFallo] = u3State(false);
  const cargar = () => {
    setFallo(false); setItems(null);
    API().get('eventos', 'list')
      .then((r) => { if (r && r.ok) setItems(r.data || []); else setFallo(true); })
      .catch(() => setFallo(true));
  };
  u3Effect(cargar, []);

  const tipos = ['TODOS'].concat(items ? Array.from(new Set(items.map((e) => e.tipo).filter(Boolean))) : []);
  const visibles = (items || []).filter((e) => filtro === 'TODOS' || e.tipo === filtro)
    .sort((a, b) => String(b.fecha).localeCompare(String(a.fecha)));

  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 24px 80px' }}>
      <div className="flex items-center" style={{ gap: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 380px' }}>
          <div className="mono small" style={{ color: 'var(--violet-600)' }}>ACTIVIDADES SOCIEM-UNA</div>
          <h1 className="serif mt-2" style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.05 }}>Eventos y ponencias</h1>
          <p className="mt-3" style={{ color: 'var(--fg-muted)', maxWidth: 560 }}>Inscríbete a nuestras ponencias, talleres y campañas. Al asistir y completar las validaciones acumulas puntos y recibes tu reconocimiento.</p>
        </div>
        <img src="assets/mascota/mascota-megafono.png?v=3" alt="Mascota de SOCIEM-UNA anunciando eventos" style={{ width: 170, flexShrink: 0 }} onError={(e) => { e.currentTarget.outerHTML = ''; }} />
      </div>

      {tipos.length > 1 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 28 }}>
          {tipos.map((t) => (
            <button key={t} onClick={() => setFiltro(t)} className="chip" style={{
              padding: '7px 16px', borderRadius: 99, border: '1px solid var(--border)', cursor: 'pointer',
              background: filtro === t ? 'var(--violet-600)' : 'transparent', color: filtro === t ? '#fff' : 'var(--fg)',
              fontSize: 13, fontWeight: 500
            }}>{t === 'TODOS' ? 'Todos' : t}</button>
          ))}
        </div>
      )}

      {fallo ? (
        <LoadErrorCard onRetry={cargar}>No pudimos cargar los eventos. Revisa tu conexión e inténtalo de nuevo.</LoadErrorCard>
      ) : items === null ? (
        <p className="mt-8" style={{ color: 'var(--fg-muted)' }}>Cargando eventos…</p>
      ) : visibles.length === 0 ? (
        <div className="card mt-8" style={{ padding: 48, textAlign: 'center' }}>
          <img src="assets/mascota/mascota-megafono.png?v=3" alt="" style={{ width: 150, margin: '0 auto', display: 'block' }} onError={(e) => { e.currentTarget.outerHTML = ''; }} />
          <p className="mt-3" style={{ color: 'var(--fg-muted)' }}>Aún no hay eventos publicados. ¡Pronto anunciaremos los próximos!</p>
        </div>
      ) : (
        <div className="grid mt-8" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {visibles.map((ev) => <EventoCard key={ev.id} ev={ev} onInscribir={setInsc} />)}
        </div>
      )}

      {insc && <InscripcionModal evento={insc} onClose={() => setInsc(null)} />}
    </section>
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
      <label>Fotografía {carpeta === 'asesores' ? '' : '(para credencial y felicitaciones)'}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 84, height: 84, borderRadius: 14, background: 'var(--bg-soft)', overflow: 'hidden', display: 'grid', placeItems: 'center', flexShrink: 0, border: '1px solid var(--border)' }}>
          {thumb ? <img src={thumb} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Icon name="user" size={28} />}
        </div>
        <div>
          <label className="btn btn-ghost" style={{ cursor: 'pointer', display: 'inline-flex' }}>
            {subiendo ? 'Subiendo…' : thumb ? 'Cambiar foto' : 'Subir foto'}
            <input type="file" accept="image/*" onChange={onPick} disabled={subiendo} style={{ display: 'none' }} />
          </label>
          <div className="small mt-1" style={{ color: 'var(--fg-muted)' }}>JPG/PNG · máx 10 MB</div>
          {error && <div className="small mt-1" style={{ color: '#C8102E' }}>{error}</div>}
        </div>
      </div>
    </div>
  );
};

// Repetidor de campos "Otros".
const OtrosFields = ({ items, onChange }) => (
  <div className="field">
    <label>Otros datos (opcional)</label>
    <p className="small" style={{ color: 'var(--fg-muted)', marginTop: -4, marginBottom: 8 }}>Agrega lo que creas necesario: talla de polo, intereses de investigación, alergias, link a tu CTI/ORCID…</p>
    {items.map((it, i) => (
      <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input className="input" placeholder="Campo (ej. Talla)" value={it.campo} onChange={(e) => onChange(items.map((x, j) => j === i ? { ...x, campo: e.target.value } : x))} style={{ flex: '0 0 38%' }} />
        <input className="input" placeholder="Valor (ej. M)" value={it.valor} onChange={(e) => onChange(items.map((x, j) => j === i ? { ...x, valor: e.target.value } : x))} style={{ flex: 1 }} />
        <button type="button" onClick={() => onChange(items.filter((_, j) => j !== i))} className="icon-btn" aria-label="Quitar"><Icon name="x" size={14} /></button>
      </div>
    ))}
    <button type="button" className="btn-link" onClick={() => onChange([...items, { campo: '', valor: '' }])}><Icon name="plus" size={14} /> Añadir campo</button>
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
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
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
      <section style={{ maxWidth: 560, margin: '0 auto', padding: '140px 24px 100px', textAlign: 'center' }}>
        <img src="assets/mascota/mascota-formulario.png?v=3" alt="" style={{ width: 160, margin: '0 auto 8px', display: 'block' }} onError={(e) => { e.currentTarget.outerHTML = ''; }} />
        <h1 className="serif" style={{ fontSize: 32 }}>Revisa tu correo</h1>
        <p className="mt-3" style={{ color: 'var(--fg-muted)' }}>Enviamos un enlace a <b>{f.email}</b> para validar tus datos. Tras validarlo, el Consejo Ejecutivo revisará tu registro.</p>
        <button className="btn btn-ghost mt-6" onClick={onBack} style={{ marginTop: 24 }}>Volver</button>
      </section>
    );
  }

  const titulo = modo === 'NUEVO' ? 'Nuevo miembro · Convocatoria 2026' : modo === 'ACTUAL' ? 'Actualizar mis datos de miembro' : 'Registro de asesor / docente';
  return (
    <section style={{ maxWidth: 720, margin: '0 auto', padding: '120px 24px 80px' }}>
      <button className="btn-link" onClick={onBack} style={{ marginBottom: 16 }}><Icon name="arrow" size={14} style={{ transform: 'rotate(180deg)' }} /> Volver</button>
      <div className="mono small" style={{ color: 'var(--violet-600)' }}>ÚNETE A SOCIEM-UNA</div>
      <h1 className="serif mt-2" style={{ fontSize: 'clamp(28px, 4.5vw, 42px)', lineHeight: 1.08 }}>{titulo}</h1>
      {modo === 'ACTUAL' && <p className="mt-3" style={{ color: 'var(--fg-muted)' }}>Si ya eres miembro, completa tus datos y actualizaremos tu ficha existente (te identificamos por tu correo).</p>}

      <div className="card mt-8" style={{ padding: '32px 30px' }}>
        <form onSubmit={submit} className="grid gap-5">
          <div className="field"><label>Apellidos y Nombres * <span className="small" style={{ color: 'var(--fg-muted)' }}>(MAYÚSCULA — para tu credencial)</span></label>
            <input className="input" value={f.nombres} onChange={(e) => setF((p) => ({ ...p, nombres: e.target.value.toUpperCase() }))} /></div>
          <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="field"><label>Correo electrónico *</label><input className="input" type="email" value={f.email} onChange={set('email')} /></div>
            <div className="field"><label>Celular / WhatsApp *</label><input className="input" value={f.telefono} onChange={set('telefono')} /></div>
          </div>
          {!esAsesor && (
            <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="field"><label>DNI *</label><input className="input" value={f.dni} onChange={set('dni')} /></div>
              <div className="field"><label>Código universitario *</label><input className="input" value={f.codigo_universitario} onChange={set('codigo_universitario')} /></div>
            </div>
          )}
          <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="field"><label>Cumpleaños <span className="small" style={{ color: 'var(--fg-muted)' }}>(Ej. 9 de septiembre)</span></label><input className="input" value={f.cumpleanos} onChange={set('cumpleanos')} /></div>
            {!esAsesor
              ? <div className="field"><label>Año de estudios en FMH 2026 *</label>
                  <select className="input" value={f.anio_estudios} onChange={set('anio_estudios')}>{ANIOS_FMH.map((a) => <option key={a}>{a}</option>)}</select></div>
              : <div className="field"><label>Especialidad / Área</label><input className="input" value={f.especialidad} onChange={set('especialidad')} /></div>}
          </div>
          {esAsesor && <div className="field"><label>Institución</label><input className="input" value={f.institucion} onChange={set('institucion')} /></div>}
          {!esAsesor && (
            <div className="grid gap-5" style={{ gridTemplateColumns: '1fr 1fr' }}>
              <div className="field"><label>Carrera</label>
                <select className="input" value={f.carrera} onChange={set('carrera')}>{CARRERAS_SALUD.map((c) => <option key={c}>{c}</option>)}</select></div>
              <div className="field"><label>Comité de interés</label>
                <select className="input" value={f.comite_interes} onChange={set('comite_interes')}>{COMITES_REG.map((c) => <option key={c} value={c}>{c || '— Sin preferencia —'}</option>)}</select></div>
            </div>
          )}

          <FotoUploader value={f.foto_url} thumb={f.foto_thumb} carpeta={carpeta}
            onUploaded={(d) => setF((p) => ({ ...p, foto_url: d.url, foto_thumb: d.thumb }))} />

          <OtrosFields items={otros} onChange={setOtros} />

          <div className="field"><label>{esAsesor ? 'Cuéntanos sobre ti / líneas de asesoría' : 'Comentario (opcional)'}</label>
            <textarea className="input" rows={2} value={f.motivo} onChange={set('motivo')} style={{ resize: 'vertical' }} /></div>

          {!esAsesor && (
            <label className="flex items-center gap-2" style={{ alignItems: 'flex-start' }}>
              <input type="checkbox" checked={f.acepta} onChange={(e) => setF((p) => ({ ...p, acepta: e.target.checked }))} style={{ marginTop: 4 }} />
              <span className="small" style={{ color: 'var(--fg-muted)' }}>Acepto los términos: participación activa y responsable, incorporación al grupo oficial de WhatsApp, y evaluación del Consejo Ejecutivo ante conductas que afecten a la sociedad.</span>
            </label>
          )}
          {msg && <div className="small" style={{ color: '#C8102E' }}>{msg}</div>}
          <button type="submit" className="btn btn-primary" disabled={estado === 'enviando'}>
            {estado === 'enviando' ? 'Enviando…' : 'Enviar registro'}
          </button>
        </form>
      </div>
    </section>
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
  if (modo) return <UneteForm modo={modo} onBack={() => setModo(null)} />;
  return (
    <section style={{ maxWidth: 1000, margin: '0 auto', padding: '120px 24px 80px' }}>
      <div className="flex items-center" style={{ gap: 28, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 420px' }}>
          <div className="mono small" style={{ color: 'var(--violet-600)' }}>ÚNETE A SOCIEM-UNA</div>
          <h1 className="serif mt-2" style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.05 }}>¿Cómo quieres sumarte?</h1>
          <p className="mt-3" style={{ color: 'var(--fg-muted)', maxWidth: 560 }}>Elige tu caso. Te enviaremos un correo para validar tu dirección y la directiva revisará tu solicitud.</p>
        </div>
        <img src="assets/mascota/mascota-hero.png?v=3" alt="Mascota de SOCIEM-UNA dándote la bienvenida" style={{ width: 190, flexShrink: 0 }} onError={(e) => { e.currentTarget.outerHTML = ''; }} />
      </div>
      <div className="grid mt-10" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, marginTop: 40 }}>
        {RUTAS.map((r) => (
          <button key={r.modo} onClick={() => setModo(r.modo)} className="card card-hover" style={{ padding: '32px 28px', textAlign: 'left', cursor: 'pointer', border: '1px solid var(--border)' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--violet-50)', color: 'var(--violet-700)', display: 'grid', placeItems: 'center' }}><Icon name={r.icon} size={22} /></div>
            <h3 className="serif mt-4" style={{ fontSize: 22 }}>{r.titulo}</h3>
            <p className="small mt-2" style={{ color: 'var(--fg-muted)' }}>{r.desc}</p>
            <div className="btn-link mt-4" style={{ marginTop: 16 }}>Empezar <Icon name="arrow" size={14} /></div>
          </button>
        ))}
      </div>
    </section>
  );
};

// ── Página pública para RENDIR un test (link ?test=<token>) ──────────────────
const LETRAS = ['A', 'B', 'C', 'D'];
const EvaluacionPublica = ({ token }) => {
  const [estado, setEstado] = u3State('cargando'); // cargando|error|form|enviando|result
  const [test, setTest] = u3State(null);
  const [email, setEmail] = u3State('');
  const [dniTest, setDniTest] = u3State('');
  const [resp, setResp] = u3State({});
  const [msg, setMsg] = u3State('');
  const [res, setRes] = u3State(null);

  u3Effect(() => {
    API().get('evaluaciones', 'getPublic', { token }).then((r) => {
      if (r && r.ok) { setTest(r.data); setEstado('form'); }
      else { setMsg((r && r.error) || 'Test no disponible'); setEstado('error'); }
    }).catch((e) => { setMsg(String(e)); setEstado('error'); });
  }, [token]);

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim()) { setMsg('Ingresa el correo con el que te inscribiste'); return; }
    setMsg(''); setEstado('enviando');
    try {
      const r = await API().post('evaluaciones', 'submit', { token, email, dni: dniTest, respuestas: JSON.stringify(resp) });
      if (r && r.ok) { setRes(r.data); setEstado('result'); }
      else { setMsg((r && r.error) || 'No se pudo enviar'); setEstado('form'); }
    } catch (err) { setMsg(String(err)); setEstado('form'); }
  };

  const wrap = (inner) => <section style={{ maxWidth: 640, margin: '0 auto', padding: '120px 24px 80px' }}>{inner}</section>;
  if (estado === 'cargando') return wrap(<p style={{ color: 'var(--fg-muted)' }}>Cargando test…</p>);
  if (estado === 'error') return wrap(
    <div className="card" style={{ padding: 40, textAlign: 'center' }}>
      <Icon name="lock" size={32} /><h2 className="serif mt-3" style={{ fontSize: 24 }}>Test no disponible</h2>
      <p className="small mt-2" style={{ color: 'var(--fg-muted)' }}>{msg}</p>
    </div>
  );
  if (estado === 'result') return wrap(
    <div className="card" style={{ padding: 44, textAlign: 'center' }}>
      {res.aprobado
        ? <img src="assets/mascota/mascota-certificado.png?v=3" alt="" style={{ width: 160, margin: '0 auto 10px', display: 'block' }} onError={(e) => { e.currentTarget.outerHTML = ''; }} />
        : <div style={{ width: 64, height: 64, borderRadius: 99, margin: '0 auto 18px', display: 'grid', placeItems: 'center', background: '#C8102E', color: '#fff' }}><Icon name="x" size={28} /></div>}
      <h2 className="serif" style={{ fontSize: 26 }}>{res.aprobado ? '¡Aprobado!' : 'No alcanzaste la nota'}</h2>
      <p className="mt-2" style={{ fontSize: 18 }}>Puntaje: <b>{res.puntaje_obtenido}</b> / {res.maximo}</p>
      <p className="small mt-3" style={{ color: 'var(--fg-muted)' }}>{res.aprobado ? 'Tu validación quedó registrada. Si completas ambas validaciones recibirás tu reconocimiento por correo.' : 'Puedes intentarlo de nuevo si el test aún lo permite.'}</p>
    </div>
  );

  return wrap(
    <>
      <div className="mono small" style={{ color: 'var(--violet-600)' }}>VALIDACIÓN · SOCIEM-UNA</div>
      <h1 className="serif mt-2" style={{ fontSize: 'clamp(26px,4vw,38px)', lineHeight: 1.1 }}>{test.titulo}</h1>
      {test.descripcion && <p className="mt-2" style={{ color: 'var(--fg-muted)' }}>{test.descripcion}</p>}
      <form onSubmit={submit} className="card mt-6" style={{ padding: '28px 26px' }}>
        <div className="grid col-2 gap-4">
          <div className="field"><label>Correo (el de tu inscripción) *</label><input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <div className="field"><label>DNI <span style={{ color: 'var(--fg-muted)', fontWeight: 400 }}>(opcional)</span></label><input className="input" inputMode="numeric" maxLength={8} value={dniTest} onChange={(e) => setDniTest(e.target.value.replace(/\D/g, ''))} placeholder="12345678" /></div>
        </div>
        <div className="grid gap-5 mt-6">
          {test.preguntas.map((q, i) => {
            const opciones = ['opcion_a', 'opcion_b', 'opcion_c', 'opcion_d'].map((k, j) => ({ letra: LETRAS[j], texto: q[k] })).filter((o) => o.texto);
            return (
              <div key={q.id} className="card" style={{ padding: '18px 20px', background: 'var(--bg-soft)' }}>
                <div style={{ fontWeight: 600 }}>{i + 1}. {q.enunciado}</div>
                {q.tipo === 'TEXTO' ? (
                  <input className="input mt-3" value={resp[q.id] || ''} onChange={(e) => setResp((p) => ({ ...p, [q.id]: e.target.value }))} placeholder="Tu respuesta" />
                ) : (
                  <div className="grid gap-2 mt-3">
                    {opciones.map((o) => (
                      <label key={o.letra} className="flex items-center gap-2" style={{ cursor: 'pointer' }}>
                        <input type="radio" name={q.id} checked={resp[q.id] === o.letra} onChange={() => setResp((p) => ({ ...p, [q.id]: o.letra }))} />
                        <span>{o.texto}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {msg && <div className="small mt-4" style={{ color: '#C8102E' }}>{msg}</div>}
        <button type="submit" className="btn btn-primary mt-6" disabled={estado === 'enviando'}>{estado === 'enviando' ? 'Enviando…' : 'Enviar respuestas'}</button>
      </form>
    </>
  );
};

// ── TIENDA pública (catálogo + carrito → pedidos.crear) ──────────────────────
const TiendaPage = () => {
  const [items, setItems] = u3State(null);
  const [cart, setCart] = u3State([]); // [{id,nombre,precio,cant,stock}]
  const [co, setCo] = u3State(false);  // modal checkout
  const [f, setF] = u3State({ nombre: '', email: '', telefono: '', metodo_pago: 'YAPE' });
  const [estado, setEstado] = u3State('idle');
  const [okData, setOkData] = u3State(null);
  const [msg, setMsg] = u3State('');

  const [fallo, setFallo] = u3State(false);
  const cargar = () => {
    setFallo(false); setItems(null);
    API().get('productos', 'list')
      .then((r) => { if (r && r.ok) setItems(r.items || r.data || []); else setFallo(true); })
      .catch(() => setFallo(true));
  };
  u3Effect(cargar, []);

  const add = (p) => setCart((c) => {
    const ex = c.find((x) => x.id === p.id);
    if (ex) return c.map((x) => x.id === p.id ? { ...x, cant: Math.min(x.cant + 1, Number(p.stock) || 99) } : x);
    return [...c, { id: p.id, nombre: p.nombre, precio: Number(p.precio), cant: 1, stock: Number(p.stock) || 99 }];
  });
  const setCant = (id, d) => setCart((c) => c.map((x) => x.id === id ? { ...x, cant: Math.max(1, Math.min(x.cant + d, x.stock)) } : x));
  const quitar = (id) => setCart((c) => c.filter((x) => x.id !== id));
  const total = cart.reduce((s, x) => s + x.precio * x.cant, 0);

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

  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 24px 80px' }}>
      <div className="mono small" style={{ color: 'var(--violet-600)' }}>TIENDA SOCIEM-UNA</div>
      <h1 className="serif mt-2" style={{ fontSize: 'clamp(32px,5vw,52px)', lineHeight: 1.05 }}>Merchandising oficial</h1>
      <p className="mt-3" style={{ color: 'var(--fg-muted)', maxWidth: 540 }}>Apoya a la sociedad llevando contigo nuestra identidad. Haz tu pedido y coordinamos la entrega.</p>
      <div style={{ aspectRatio: '21/7', borderRadius: 20, overflow: 'hidden', marginTop: 28, background: 'var(--bg-soft)' }}>
        <img src="assets/tienda/banner-tienda.jpg" alt="Merchandising de SOCIEM-UNA: polo, tomatodo, libreta y stickers" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.parentElement.style.display = 'none'; }} />
      </div>

      {fallo ? <LoadErrorCard onRetry={cargar}>No pudimos cargar la tienda. Revisa tu conexión e inténtalo de nuevo.</LoadErrorCard>
        : items === null ? <p className="mt-8" style={{ color: 'var(--fg-muted)' }}>Cargando productos…</p>
        : items.length === 0 ? <div className="card mt-8" style={{ padding: 48, textAlign: 'center', color: 'var(--fg-muted)' }}><img src="assets/mascota/mascota-carrito.png?v=3" alt="" style={{ width: 150, margin: '0 auto', display: 'block' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} /><p className="mt-3">Aún no hay productos disponibles. Vuelve pronto.</p></div>
        : (
          <div className="grid mt-8" style={{ gridTemplateColumns: '1fr 320px', gap: 32, alignItems: 'start' }}>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: 20 }}>
              {items.map((p) => {
                const img = window.IMG(p.imagen_url);
                const sin = Number(p.stock) <= 0;
                return (
                  <div key={p.id} className="card card-hover" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ aspectRatio: '1/1', background: 'var(--bg-soft)' }}>
                      {img ? <img src={img} alt={p.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} /> : <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}><Icon name="shoppingBag" size={32} /></div>}
                    </div>
                    <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 600 }}>{p.nombre}</h3>
                      {p.descripcion && <p className="small mt-1" style={{ color: 'var(--fg-muted)', flex: 1 }}>{String(p.descripcion).slice(0, 70)}</p>}
                      <div className="flex justify-between items-center mt-3">
                        <span className="serif" style={{ fontSize: 20, fontWeight: 600 }}>S/ {Number(p.precio).toFixed(2)}</span>
                        <button className="btn btn-primary" style={{ padding: '8px 14px' }} disabled={sin} onClick={() => add(p)}>{sin ? 'Agotado' : 'Agregar'}</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <aside className="card" style={{ padding: '22px 22px', position: 'sticky', top: 100 }}>
              <h3 className="serif" style={{ fontSize: 20 }}>Tu pedido</h3>
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center' }}>
                  <img src="assets/mascota/mascota-carrito.png?v=3" alt="" style={{ width: 110, margin: '10px auto 0', display: 'block' }} onError={(e) => { e.currentTarget.outerHTML = ''; }} />
                  <p className="small mt-2" style={{ color: 'var(--fg-muted)' }}>Tu carrito está vacío. Agrega un producto para empezar.</p>
                </div>
              ) : (
                <>
                  <div className="grid gap-3 mt-4">
                    {cart.map((x) => (
                      <div key={x.id} className="flex justify-between items-center" style={{ gap: 8 }}>
                        <div style={{ flex: 1 }}><div className="small" style={{ fontWeight: 600 }}>{x.nombre}</div><div className="small" style={{ color: 'var(--fg-muted)' }}>S/ {x.precio.toFixed(2)}</div></div>
                        <div className="flex items-center gap-1">
                          <button className="icon-btn" aria-label={'Quitar una unidad de ' + x.nombre} style={{ width: 26, height: 26 }} onClick={() => setCant(x.id, -1)}>−</button>
                          <span style={{ minWidth: 18, textAlign: 'center' }}>{x.cant}</span>
                          <button className="icon-btn" aria-label={'Añadir una unidad de ' + x.nombre} style={{ width: 26, height: 26 }} onClick={() => setCant(x.id, 1)}>+</button>
                          <button className="icon-btn" aria-label={'Quitar ' + x.nombre + ' del pedido'} style={{ width: 26, height: 26 }} onClick={() => quitar(x.id)}><Icon name="x" size={12} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4" style={{ paddingTop: 14, borderTop: '1px solid var(--border)', fontWeight: 700 }}>
                    <span>Total</span><span>S/ {total.toFixed(2)}</span>
                  </div>
                  <button className="btn btn-primary mt-4" style={{ width: '100%' }} onClick={() => setCo(true)}>Realizar pedido</button>
                </>
              )}
            </aside>
          </div>
        )}

      {co && (
        <div onClick={() => { setCo(false); setOkData(null); }} style={{ position: 'fixed', inset: 0, background: 'rgba(20,12,32,.55)', display: 'grid', placeItems: 'center', zIndex: 1000, padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} className="card" style={{ width: '100%', maxWidth: 440, padding: '30px 28px' }}>
            {okData ? (
              <div style={{ textAlign: 'center' }}>
                <img src="assets/mascota/mascota-tienda.png?v=3" alt="" style={{ width: 140, margin: '0 auto 6px', display: 'block' }} onError={(e) => { e.currentTarget.src = 'assets/mascota/mascota-certificado.png?v=3'; e.currentTarget.onerror = null; }} />
                <h3 className="serif" style={{ fontSize: 22 }}>¡Pedido recibido!</h3>
                <p className="small mt-2" style={{ color: 'var(--fg-muted)' }}>Código <b>{okData.codigo}</b> · Total S/ {okData.total}. Te contactaremos para coordinar el pago y la entrega.</p>
                <button className="btn btn-ghost mt-5" onClick={() => { setCo(false); setOkData(null); }}>Cerrar</button>
              </div>
            ) : (
              <>
                <h3 className="serif" style={{ fontSize: 22 }}>Datos de contacto</h3>
                <form onSubmit={comprar} className="grid gap-4 mt-5">
                  <div className="field"><label>Nombre completo *</label><input className="input" value={f.nombre} onChange={(e) => setF((p) => ({ ...p, nombre: e.target.value }))} /></div>
                  <div className="field"><label>Correo *</label><input className="input" type="email" value={f.email} onChange={(e) => setF((p) => ({ ...p, email: e.target.value }))} /></div>
                  <div className="field"><label>Celular / WhatsApp</label><input className="input" value={f.telefono} onChange={(e) => setF((p) => ({ ...p, telefono: e.target.value }))} /></div>
                  <div className="field"><label>Método de pago</label>
                    <select className="input" value={f.metodo_pago} onChange={(e) => setF((p) => ({ ...p, metodo_pago: e.target.value }))}>
                      <option>YAPE</option><option>PLIN</option><option>EFECTIVO</option><option>TRANSFERENCIA</option>
                    </select>
                  </div>
                  {msg && <div className="small" style={{ color: '#C8102E' }}>{msg}</div>}
                  <div className="flex justify-between mt-2" style={{ fontWeight: 700 }}><span>Total</span><span>S/ {total.toFixed(2)}</span></div>
                  <button type="submit" className="btn btn-primary" disabled={estado === 'enviando'}>{estado === 'enviando' ? 'Enviando…' : 'Confirmar pedido'}</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

// ── NOTICIAS / DIARIO CIENTÍFICO (público) ───────────────────────────────────
const doiHref = (d) => { const s = String(d || '').trim(); if (!s) return ''; return /^https?:\/\//.test(s) ? s : 'https://doi.org/' + s; };

const _tipoNoticia = (n) => String(n.tipo) === 'PAPER' ? 'CLUB DE REVISTAS' : (n.tipo || 'NOTICIA');
const _renderMd = (md, base) => String(md).split(/\n+/).map((linea, i) => {
  const t = linea.trim();
  if (!t) return null;
  if (t.startsWith('## ')) return <h4 key={i} className="serif mt-5" style={{ fontSize: base ? 24 : 18 }}>{t.slice(3)}</h4>;
  return <p key={i} className="mt-3" style={{ color: 'var(--fg-soft)', lineHeight: 1.7, fontSize: base ? 17 : 14.5 }}>{t}</p>;
});
const _hayContenido = (n) => n.contenido_md && String(n.contenido_md).trim() && !/^##\s*Contenido\.{3}/.test(String(n.contenido_md).trim());

// Tarjeta compacta del listado → "Leer más" abre el detalle (#/noticias/slug).
const NoticiaCard = ({ n }) => {
  const portada = window.IMG(n.imagen_portada);
  const href = '#/noticias/' + (n.slug || n.id);
  const esPaper = String(n.tipo) === 'PAPER';
  return (
    <article className="card card-hover" style={{ padding: 0, overflow: 'hidden', marginBottom: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: portada ? '220px 1fr' : '1fr' }}>
        {portada && <a href={href} style={{ background: 'var(--bg-soft)', display: 'block' }}><img src={portada} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: 170 }} onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} /></a>}
        <div style={{ padding: '24px 28px' }}>
          <div className="flex items-center gap-3" style={{ flexWrap: 'wrap' }}>
            <span className="badge" style={{ background: esPaper ? '#EDE3F7' : 'var(--bg-soft)', color: esPaper ? 'var(--violet-700)' : 'var(--fg-muted)' }}>{_tipoNoticia(n)}</span>
            {n.comite_relacionado && <span className="mono small" style={{ color: 'var(--fg-muted)' }}>{n.comite_relacionado}</span>}
            <span className="mono small" style={{ color: 'var(--fg-muted)' }}>{String(n.fecha_publicacion).slice(0, 10)}</span>
          </div>
          <a href={href} style={{ color: 'inherit' }}><h3 className="serif mt-3" style={{ fontSize: 24, lineHeight: 1.2 }}>{n.titulo}</h3></a>
          {n.autor_nombre && <div className="small mt-1" style={{ color: 'var(--fg-muted)' }}><Icon name="user" size={13} /> {n.autor_nombre}</div>}
          {n.resumen && <p className="mt-3" style={{ color: 'var(--fg-soft)', lineHeight: 1.6 }}>{String(n.resumen).slice(0, 220)}{String(n.resumen).length > 220 ? '…' : ''}</p>}
          <a className="btn-link mt-4" href={href} style={{ marginTop: 14, display: 'inline-flex' }}>Leer más <Icon name="arrow" size={14} /></a>
        </div>
      </div>
    </article>
  );
};

// Vista de detalle: la publicación completa, con portada grande, cuerpo,
// análisis crítico, preguntas de discusión y acciones.
const NoticiaDetalle = ({ n }) => {
  const portada = window.IMG(n.imagen_portada);
  const preguntas = String(n.preguntas || '').split('\n').map((x) => x.trim()).filter(Boolean);
  const esPaper = String(n.tipo) === 'PAPER';
  return (
    <article>
      <a className="btn-link" href="#/noticias"><Icon name="arrow" size={14} style={{ transform: 'rotate(180deg)' }} /> Volver a noticias</a>
      {portada && (
        <div style={{ aspectRatio: '21/9', borderRadius: 20, overflow: 'hidden', background: 'var(--bg-soft)', marginTop: 18 }}>
          <img src={portada} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} />
        </div>
      )}
      <div className="flex items-center gap-3 mt-6" style={{ flexWrap: 'wrap', marginTop: 26 }}>
        <span className="badge" style={{ background: esPaper ? '#EDE3F7' : 'var(--bg-soft)', color: esPaper ? 'var(--violet-700)' : 'var(--fg-muted)' }}>{_tipoNoticia(n)}</span>
        {n.comite_relacionado && <span className="mono small" style={{ color: 'var(--fg-muted)' }}>{n.comite_relacionado}</span>}
        <span className="mono small" style={{ color: 'var(--fg-muted)' }}>{String(n.fecha_publicacion).slice(0, 10)}</span>
      </div>
      <h1 className="serif mt-3" style={{ fontSize: 'clamp(30px, 4.5vw, 46px)', lineHeight: 1.12 }}>{n.titulo}</h1>
      {n.autor_nombre && <div className="mt-2" style={{ color: 'var(--fg-muted)' }}><Icon name="user" size={14} /> {n.autor_nombre}</div>}

      {n.resumen && <p className="lede mt-6" style={{ fontSize: 19, lineHeight: 1.6, color: 'var(--fg-soft)', borderLeft: '3px solid var(--violet-300)', paddingLeft: 16 }}>{n.resumen}</p>}

      {n.cita && (
        <div className="card mt-6" style={{ padding: '18px 22px', background: 'var(--bg-soft)' }}>
          <div className="mono small" style={{ color: 'var(--fg-muted)' }}>REFERENCIA</div>
          <p className="small mt-1" style={{ fontStyle: 'italic' }}>{n.cita} {n.doi && <a href={doiHref(n.doi)} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--violet-600)', fontStyle: 'normal' }}>· DOI {n.doi}</a>}</p>
        </div>
      )}

      {_hayContenido(n) && <div className="mt-4">{_renderMd(n.contenido_md, true)}</div>}

      {n.comentario && (
        <div className="mt-8" style={{ marginTop: 34 }}>
          <div className="mono small" style={{ color: 'var(--fg-muted)' }}>COMENTARIO / ANÁLISIS CRÍTICO</div>
          <p className="mt-2" style={{ color: 'var(--fg-soft)', lineHeight: 1.7, fontSize: 17 }}>{n.comentario}</p>
        </div>
      )}

      {preguntas.length > 0 && (
        <div className="card mt-8" style={{ padding: '24px 28px', marginTop: 34 }}>
          <div className="mono small" style={{ color: 'var(--violet-600)' }}>PREGUNTAS PARA DISCUSIÓN</div>
          <ol style={{ marginTop: 12, paddingLeft: 20 }}>{preguntas.map((q, i) => <li key={i} style={{ marginBottom: 10, lineHeight: 1.55 }}>{q}</li>)}</ol>
        </div>
      )}

      <div className="flex gap-3 mt-8" style={{ flexWrap: 'wrap', marginTop: 30 }}>
        {n.pdf_url && <a className="btn btn-primary" href={n.pdf_url} target="_blank" rel="noopener noreferrer"><Icon name="arrowUpRight" size={15} /> Leer el paper (PDF)</a>}
        {n.cta_url && <a className="btn btn-gold" href={n.cta_url} target={/^https?:/.test(String(n.cta_url)) ? '_blank' : undefined} rel="noopener noreferrer">{n.cta_label || 'Más información'} <Icon name="arrow" size={14} /></a>}
        <a className="btn btn-ghost" href="#/noticias">Más publicaciones</a>
      </div>
    </article>
  );
};

const NoticiasPage = ({ slug }) => {
  const [items, setItems] = u3State(null);
  const [filtro, setFiltro] = u3State('TODOS');
  const [fallo, setFallo] = u3State(false);
  const cargar = () => {
    setFallo(false); setItems(null);
    API().get('noticias', 'list')
      .then((r) => { if (r && r.ok) setItems(r.items || r.data || []); else setFallo(true); })
      .catch(() => setFallo(true));
  };
  u3Effect(cargar, []);

  // ── Vista de DETALLE (#/noticias/<slug>) ──
  if (slug) {
    const n = (items || []).find((x) => String(x.slug) === String(slug) || String(x.id) === String(slug));
    return (
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '110px 24px 80px' }}>
        {fallo ? <LoadErrorCard onRetry={cargar}>No pudimos cargar la publicación. Revisa tu conexión e inténtalo de nuevo.</LoadErrorCard>
          : items === null ? <p style={{ color: 'var(--fg-muted)' }}>Cargando publicación…</p>
          : !n ? (
            <div className="card" style={{ padding: 48, textAlign: 'center', color: 'var(--fg-muted)' }}>
              <img src="assets/mascota/mascota-404.png?v=3" alt="" style={{ width: 160, margin: '0 auto', display: 'block' }} onError={(e) => { e.currentTarget.src = 'assets/mascota/mascota-error.png?v=3'; e.currentTarget.onerror = null; }} />
              <p className="mt-3">No encontramos esa publicación. <a href="#/noticias" style={{ color: 'var(--violet-600)' }}>Ver todas las noticias</a></p>
            </div>
          )
          : <NoticiaDetalle n={n} />}
      </section>
    );
  }

  // ── Vista de LISTADO ──
  const tipos = ['TODOS', 'PAPER', 'NOTICIA', 'COMUNICADO'];
  // Orden defensivo en cliente (el backend desplegado aún puede ordenar mal
  // fechas tipo Date de Sheets hasta el próximo redeploy).
  const visibles = (items || [])
    .filter((n) => filtro === 'TODOS' || String(n.tipo || 'NOTICIA') === filtro)
    .sort((a, b) => new Date(b.fecha_publicacion) - new Date(a.fecha_publicacion));
  return (
    <section style={{ maxWidth: 860, margin: '0 auto', padding: '120px 24px 80px' }}>
      <div className="flex items-center" style={{ gap: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 380px' }}>
          <div className="mono small" style={{ color: 'var(--violet-600)' }}>DIARIO CIENTÍFICO · SOCIEM-UNA</div>
          <h1 className="serif mt-2" style={{ fontSize: 'clamp(32px,5vw,52px)', lineHeight: 1.05 }}>Noticias & Club de Revistas</h1>
          <p className="mt-3" style={{ color: 'var(--fg-muted)', maxWidth: 600 }}>Publicaciones, análisis crítico de papers y novedades de la sociedad. Abre cualquier publicación para leerla completa, descargar el PDF y ver las preguntas de discusión.</p>
        </div>
        <img src="assets/mascota/mascota-lectura.png?v=3" alt="Mascota de SOCIEM-UNA leyendo un artículo científico" style={{ width: 170, flexShrink: 0 }} onError={(e) => { e.currentTarget.outerHTML = ''; }} />
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 28 }}>
        {tipos.map((t) => (
          <button key={t} onClick={() => setFiltro(t)} style={{ padding: '7px 16px', borderRadius: 99, border: '1px solid var(--border)', cursor: 'pointer', background: filtro === t ? 'var(--violet-600)' : 'transparent', color: filtro === t ? '#fff' : 'var(--fg)', fontSize: 13, fontWeight: 500 }}>{t === 'TODOS' ? 'Todo' : t === 'PAPER' ? 'Club de Revistas' : t}</button>
        ))}
      </div>

      <div className="mt-8">
        {fallo ? <LoadErrorCard onRetry={cargar}>No pudimos cargar las publicaciones. Revisa tu conexión e inténtalo de nuevo.</LoadErrorCard>
          : items === null ? <p style={{ color: 'var(--fg-muted)' }}>Cargando…</p>
          : visibles.length === 0 ? <div className="card" style={{ padding: 48, textAlign: 'center', color: 'var(--fg-muted)' }}><img src="assets/mascota/mascota-investiga.png?v=3" alt="" style={{ width: 150, margin: '0 auto', display: 'block' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} /><p className="mt-3">Aún no hay publicaciones.</p></div>
          : visibles.map((n) => <NoticiaCard key={n.id} n={n} />)}
      </div>
    </section>
  );
};

Object.assign(window, { EventosPage, RegistroPage, EvaluacionPublica, TiendaPage, NoticiasPage });
