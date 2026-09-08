// ============ CERTIFICADOS ============
//
// Tres piezas que comparten una sola lámina:
//   · CertificadoHoja  — el diseño A4 horizontal, en milímetros, con colores
//     literales (nunca variables de tema: en modo oscuro el papel sigue siendo
//     blanco).
//   · CertificadosPage — público. Busca por DNI o por código y deja descargar.
//     La ruta #/certificados/<codigo> es la que abre el QR impreso.
//   · AdminCertificados — emite desde un evento, importa una lista pegada de
//     Excel, imprime en lote y encola los correos.
//
// El PDF sale del diálogo de impresión del navegador (Guardar como PDF): es
// vectorial, pesa poco y no obliga a cargar jsPDF/html2canvas en un sitio que
// se sirve sin build.

// ───────────────────────── QR ─────────────────────────
// qrcode-generator expone el global `qrcode`. Si no cargó, el hueco del QR
// muestra el código en texto: el certificado sigue siendo verificable a mano.
const CertQR = ({ text, mm = 24 }) => {
  const svg = React.useMemo(() => {
    try {
      if (typeof qrcode !== 'function') return '';
      const qr = qrcode(0, 'M');
      qr.addData(String(text || ''));
      qr.make();
      return qr.createSvgTag({ cellSize: 2, margin: 0, scalable: true });
    } catch (e) { return ''; }
  }, [text]);

  if (!svg) {
    return (
      <div style={{ width: mm + 'mm', height: mm + 'mm', border: '0.4mm solid #D5B6EC', display: 'grid', placeItems: 'center', fontSize: '2.2mm', color: '#582682', textAlign: 'center', padding: '1mm', boxSizing: 'border-box' }}>
        Verifica con el código
      </div>
    );
  }
  return <div className="cert-qr" style={{ width: mm + 'mm', height: mm + 'mm' }} dangerouslySetInnerHTML={{ __html: svg }} />;
};

// ───────────────────────── Utilidades de formato ─────────────────────────

const CERT_MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
  'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre'];

// Acepta lo que venga de Sheets: ISO, dd/mm/aaaa, un rango escrito a mano
// ("12 y 13 de setiembre") o texto libre. Lo que no reconoce, lo devuelve tal
// cual — el certificado nunca debe quedar con una fecha inventada.
// Año de dos dígitos → siglo actual. En la base real las fechas vienen como
// "25.04.26", así que sin esto el certificado imprimiría el año 26.
const certAnio = (a) => (String(a).length <= 2 ? 2000 + Number(a) : Number(a));

// dd/mm/aaaa, dd-mm-aa y dd.mm.aa — los tres separadores que aparecen en las
// hojas de los comités.
const CERT_DMY = /^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/;

// Última defensa: una celda con formato de fecha llega desde Apps Script como
// "Fri May 01 2026 00:00:00 GMT-0500 (hora estándar de Perú)". Los componentes
// se leen del propio texto en vez de construir un Date, porque parsearlo
// cambiaría el día en un navegador con otro huso.
const CERT_MESES_EN = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
const CERT_JSDATE = /^[A-Za-z]{3}\s+([A-Za-z]{3})\s+(\d{1,2})\s+(\d{4})/;

// Devuelve {d, m, a} desde cualquiera de los formatos conocidos, o null.
const certPartesFecha = (v) => {
  const s = String(v || '').trim();
  if (!s) return null;
  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return { d: Number(iso[3]), m: Number(iso[2]), a: Number(iso[1]) };
  const dmy = s.match(CERT_DMY);
  if (dmy) return { d: Number(dmy[1]), m: Number(dmy[2]), a: certAnio(dmy[3]) };
  const js = s.match(CERT_JSDATE);
  if (js && CERT_MESES_EN[js[1]] !== undefined) return { d: Number(js[2]), m: CERT_MESES_EN[js[1]] + 1, a: Number(js[3]) };
  return null;
};

const certFecha = (v) => {
  const p = certPartesFecha(v);
  if (!p) return String(v || '').trim();
  return `${p.d} de ${CERT_MESES[p.m - 1] || ''} de ${p.a}`;
};

const certFechaCorta = (v) => {
  const p = certPartesFecha(v);
  if (!p) return String(v || '').trim();
  return `${String(p.d).padStart(2, '0')}/${String(p.m).padStart(2, '0')}/${p.a}`;
};

const CERT_ROLES = ['PARTICIPANTE', 'PONENTE', 'ORGANIZADOR', 'MODERADOR', 'JURADO', 'ASESOR', 'STAFF'];
const CERT_TIPOS = ['SOCIEM', 'COLABORATIVA'];

// "en calidad de ponente" / "en calidad de participante"
const certRolTexto = (rol) => String(rol || 'PARTICIPANTE').toLowerCase();

// La columna se llena a mano ("SOLO SOCIEM", "Colaborativa", "colab. con
// SOCIMEP"…), así que basta con detectar la raíz "colab".
const certEsColaborativa = (v) => /COLAB/.test(String(v || '').toUpperCase());

// En las hojas de los comités la celda COMITÉ suele traer varios códigos
// pegados con guiones: "SCOPE-CPRII", "SCOPH-SCORE-SCOME-CPC-SCOPE-CPRII-CPPC".
// Se parten por cualquier separador, reensamblando SCOPE-IN / SCOPE-OUT, que
// son códigos con guion propio.
const certComites = (v) => {
  const partes = String(v || '').toUpperCase().split(/[^A-Z0-9]+/).filter(Boolean);
  const out = [];
  for (let i = 0; i < partes.length; i++) {
    const par = partes[i] + '-' + (partes[i + 1] || '');
    if (par === 'SCOPE-IN' || par === 'SCOPE-OUT') { out.push(par); i++; }
    else out.push(partes[i]);
  }
  return out.filter((c, i) => out.indexOf(c) === i);
};

// "SCOME", "SCOME y CPRII", "SCOPH, SCORE y SCOME"
const certComitesTexto = (v) => {
  const l = certComites(v);
  if (l.length <= 1) return l[0] || '';
  return l.slice(0, -1).join(', ') + ' y ' + l[l.length - 1];
};

// Para el logo de la cabecera: el primero de la lista que tenga uno.
const certComiteLogo = (v) => {
  if (typeof comiteLogoUrl !== 'function') return null;
  const l = certComites(v);
  for (let i = 0; i < l.length; i++) {
    const u = comiteLogoUrl(l[i]);
    if (u) return u;
  }
  return null;
};

// ───────────────────────── La lámina ─────────────────────────

const CertificadoHoja = ({ cert, cfg }) => {
  const c = cert || {};
  const conf = cfg || {};
  const base = (conf.SITIO_URL || 'https://sociemunapuno.com').replace(/\/+$/, '');
  const link = `${base}/#/certificados/${encodeURIComponent(c.codigo || '')}`;
  const comites = certComites(c.comite);
  const logosComites = comites
    .map(cod => ({ cod, url: typeof comiteLogoUrl === 'function' ? comiteLogoUrl(cod) : null }))
    .filter(l => l.url);
  const anulado = String(c.estado || '').toUpperCase() === 'ANULADO';

  return (
    <div className="cert-hoja">
      {/* Marco: doble filete violeta con esquinas doradas */}
      <div className="cert-marco" />
      <div className="cert-marco-int" />

      {anulado && <div className="cert-anulado">ANULADO</div>}

      <div className="cert-cuerpo">
        <header className="cert-head">
          <img src="assets/logos/logo_SOCIEM-UNA.png" alt="" className="cert-logo" />
          <div className="cert-head-txt">
            <div className="cert-inst">Sociedad Científica de Estudiantes de Medicina</div>
            <div className="cert-uni">Universidad Nacional del Altiplano · Puno</div>
            <div className="cert-filial">Filial oficial IFMSA-Perú · SOCIMEP</div>
          </div>
          {/* Escudos institucionales: se configuran en la hoja `config` para
              poder cambiarlos sin tocar el código. */}
          <div className="cert-head-inst">
            {[conf.CERT_LOGO_UNIVERSIDAD, conf.CERT_LOGO_FACULTAD].filter(Boolean).map((u, i) => (
              <img key={i} src={typeof IMG === 'function' ? IMG(u) : u} alt="" className="cert-logo-inst" />
            ))}
            {!conf.CERT_LOGO_UNIVERSIDAD && !conf.CERT_LOGO_FACULTAD && <div className="cert-logo" />}
          </div>
        </header>

        {/* Todos los comités que organizaron, no solo el primero. */}
        {logosComites.length > 0 && (
          <div className={'cert-comites' + (logosComites.length > 5 ? ' cert-comites-muchos' : '')}>
            {logosComites.map(l => <img key={l.cod} src={l.url} alt={l.cod} title={l.cod} />)}
          </div>
        )}

        <div className="cert-titulo">Certificado</div>
        <div className="cert-otorga">otorgan el presente a:</div>

        <div className="cert-nombre">{c.nombres || '—'}</div>
        {(c.dni || c.dni_masked) && (
          <div className="cert-dni">DNI {c.dni || c.dni_masked}</div>
        )}

        <p className="cert-texto">
          Por su participación en calidad de <b>{certRolTexto(c.rol)}</b> en
          {' '}<span className="cert-actividad">«{c.actividad || '—'}»</span>
          {/* "actividad colaborativa" solo cuando lo es: lo normal es que la
              organice SOCIEM sola, y decirlo cada vez sería ruido. */}
          {comites.length
            ? <>, {certEsColaborativa(c.tipo_actividad) ? 'actividad colaborativa' : 'actividad'} organizada por {comites.length > 1 ? 'los comités' : 'el comité'} <b>{certComitesTexto(c.comite)}</b></>
            : (certEsColaborativa(c.tipo_actividad) ? <>, actividad colaborativa</> : null)}
          {c.fecha ? <>, realizada el <b>{certFecha(c.fecha)}</b></> : null}
          {c.valido_por ? <>; válido por <b>{c.valido_por}</b></> : null}.
        </p>

        <footer className="cert-pie">
          <div className="cert-pie-qr">
            <CertQR text={link} mm={22} />
            <div className="cert-pie-qr-txt">
              <div className="cert-codigo">{c.codigo || '—'}</div>
              <div className="cert-verif">Verifica en {base.replace(/^https?:\/\//, '')}/#/certificados</div>
            </div>
          </div>

          <div className="cert-firma">
            {conf.CERT_FIRMA_IMG
              ? <img src={typeof IMG === 'function' ? IMG(conf.CERT_FIRMA_IMG) : conf.CERT_FIRMA_IMG} alt="" className="cert-firma-img" />
              : <div className="cert-firma-hueco" />}
            <div className="cert-firma-linea" />
            <div className="cert-firma-nombre">{conf.CERT_FIRMA_NOMBRE || 'Presidencia SOCIEM-UNA'}</div>
            <div className="cert-firma-cargo">{conf.CERT_FIRMA_CARGO || 'Sociedad Científica de Estudiantes de Medicina'}</div>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Escala la hoja (297 mm de ancho fijo) al ancho disponible en pantalla.
// En impresión no interviene: allí manda @page.
const CertEscala = ({ children }) => {
  const ref = React.useRef(null);
  const [k, setK] = React.useState(0.4);
  React.useEffect(() => {
    const calc = () => {
      if (!ref.current) return;
      const px297 = 297 * 96 / 25.4;
      setK(Math.min(1, ref.current.clientWidth / px297));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);
  const px210 = 210 * 96 / 25.4;
  return (
    <div ref={ref} style={{ width: '100%', overflow: 'hidden' }}>
      <div style={{ width: '297mm', transform: `scale(${k})`, transformOrigin: 'top left', marginBottom: `${(k - 1) * px210}px` }}>
        {children}
      </div>
    </div>
  );
};

// Monta las hojas como hijo directo de <body> para que la regla de impresión
// pueda esconder el resto del sitio sin pelear con el árbol de React.
const CertPrintPortal = ({ certs, cfg }) => {
  if (!certs || !certs.length) return null;
  return ReactDOM.createPortal(
    <div className="cert-print-root">
      {certs.map((c, i) => <CertificadoHoja key={(c.codigo || c.id || '') + i} cert={c} cfg={cfg} />)}
    </div>,
    document.body
  );
};

// Hook: pinta las hojas, espera a que el navegador las tenga y abre el diálogo.
const useImpresion = () => {
  const [cola, setCola] = React.useState([]);
  React.useEffect(() => {
    if (!cola.length) return;
    // Dos frames: uno para montar el portal, otro para que el layout en mm
    // esté resuelto antes de que el navegador capture la página.
    const t = setTimeout(() => {
      window.print();
      setCola([]);
    }, 250);
    return () => clearTimeout(t);
  }, [cola]);
  return { cola, imprimir: (lista) => setCola(Array.isArray(lista) ? lista : [lista]) };
};

// Config pública cacheada por sesión (firma, URL del sitio).
const useCertConfig = () => {
  const [cfg, setCfg] = React.useState(window.__CERT_CFG || {});
  React.useEffect(() => {
    if (window.__CERT_CFG) return;
    let vivo = true;
    (async () => {
      try {
        const r = await window.SOCIEM_API.get('config', 'publica');
        const data = (r && r.data) || {};
        window.__CERT_CFG = data;
        if (vivo) setCfg(data);
      } catch (e) { /* la lámina tiene defaults */ }
    })();
    return () => { vivo = false; };
  }, []);
  return cfg;
};

// ───────────────────────── Página pública ─────────────────────────

const CertificadosPage = ({ sub }) => {
  const cfg = useCertConfig();
  const { cola, imprimir } = useImpresion();
  const [q, setQ] = React.useState(sub || '');
  const [cargando, setCargando] = React.useState(false);
  const [error, setError] = React.useState('');
  const [resultados, setResultados] = React.useState(null);
  const [abierto, setAbierto] = React.useState(null);

  const buscar = React.useCallback(async (texto) => {
    const t = String(texto || '').trim();
    if (!t) { setError('Escribe tu DNI o el código del certificado.'); return; }
    setCargando(true); setError(''); setResultados(null); setAbierto(null);
    try {
      const soloDigitos = t.replace(/\D/g, '');
      const esDni = /^\d{8}$/.test(soloDigitos) && !/[a-zA-Z]/.test(t);
      if (esDni) {
        const r = await window.SOCIEM_API.get('certificados', 'buscar', { dni: soloDigitos });
        const items = (r && (r.items || r.data)) || [];
        if (!r || r.ok === false) throw new Error((r && r.error) || 'No se pudo consultar');
        setResultados(items);
        if (!items.length) setError('No hay certificados registrados con ese DNI. Si participaste hace poco, puede que aún no estén emitidos.');
        else if (items.length === 1) setAbierto(items[0]);
      } else {
        const r = await window.SOCIEM_API.get('certificados', 'verificar', { codigo: t.toUpperCase() });
        if (!r || r.ok === false) throw new Error((r && r.error) || 'Código no encontrado');
        const cert = r.data && r.data.certificado;
        setResultados(cert ? [cert] : []);
        setAbierto(cert || null);
        if (cert && r.data.valido === false) setError('Este certificado fue ANULADO por la organización.');
      }
    } catch (e) {
      setError(e.message || 'No se pudo consultar. Revisa tu conexión e inténtalo de nuevo.');
    } finally { setCargando(false); }
  }, []);

  // El QR entra por #/certificados/<codigo>: consulta sola al abrir.
  React.useEffect(() => {
    if (sub) { setQ(sub); buscar(sub); }
  }, [sub, buscar]);

  return (
    <>
      <section className="section" style={{ paddingBottom: 24 }}>
        <div className="container">
          <div className="mono small" style={{ color: 'var(--fg-muted)', letterSpacing: '.18em' }}>SOCIEM-UNA</div>
          <h1 className="serif" style={{ fontSize: 'clamp(32px, 5vw, 48px)', margin: '8px 0 12px' }}>Certificados</h1>
          <p style={{ color: 'var(--fg-muted)', maxWidth: 620, lineHeight: 1.6 }}>
            Consulta y descarga los certificados de las actividades de la sociedad.
            Busca con tu <b>DNI</b> para ver todos los tuyos, o con el <b>código</b> impreso
            en el certificado para verificar su autenticidad.
          </p>

          <div className="card" style={{ padding: 20, marginTop: 26, maxWidth: 620 }}>
            <form onSubmit={(e) => { e.preventDefault(); buscar(q); }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 8 }}>DNI o código de certificado</label>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <input
                  className="input"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="12345678  ·  SOC-2026-K7M2Q9"
                  style={{ flex: '1 1 240px', minWidth: 0 }}
                  autoComplete="off"
                />
                <button className="btn btn-primary" type="submit" disabled={cargando}>
                  <Icon name="search" size={15} /> {cargando ? 'Buscando…' : 'Buscar'}
                </button>
              </div>
            </form>
            {error && (
              <div style={{ marginTop: 14, padding: '11px 14px', borderRadius: 10, background: 'var(--violet-50)', color: 'var(--violet-800)', fontSize: 13.5, lineHeight: 1.5 }}>
                {error}
              </div>
            )}
          </div>
        </div>
      </section>

      {resultados && resultados.length > 1 && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <h2 className="serif" style={{ fontSize: 22, marginBottom: 14 }}>
              {resultados.length} certificados encontrados
            </h2>
            <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
              {resultados.map(c => (
                <button
                  key={c.codigo}
                  className="card"
                  onClick={() => setAbierto(c)}
                  style={{ padding: 18, textAlign: 'left', cursor: 'pointer', border: abierto && abierto.codigo === c.codigo ? '2px solid var(--violet-600)' : undefined }}
                >
                  <div className="mono small" style={{ color: 'var(--fg-muted)' }}>{c.codigo}</div>
                  <div className="serif" style={{ fontSize: 17, margin: '6px 0 4px', lineHeight: 1.3 }}>{c.actividad}</div>
                  <div className="small" style={{ color: 'var(--fg-muted)' }}>
                    {[c.rol, c.comite, certFechaCorta(c.fecha)].filter(Boolean).join(' · ')}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {abierto && (
        <section className="section" style={{ paddingTop: resultados && resultados.length > 1 ? 24 : 0 }}>
          <div className="container">
            <div className="flex justify-between items-center" style={{ flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
              <div>
                <div className="mono small" style={{ color: 'var(--fg-muted)' }}>{abierto.codigo}</div>
                <h2 className="serif" style={{ fontSize: 24, margin: '4px 0 0' }}>{abierto.nombres}</h2>
              </div>
              <div className="flex gap-3">
                <button className="btn btn-primary" onClick={() => imprimir([abierto])}>
                  <Icon name="download" size={15} /> Descargar PDF
                </button>
              </div>
            </div>

            <div style={{ background: 'var(--bg-soft)', padding: 'clamp(8px, 2vw, 24px)', borderRadius: 14 }}>
              <CertEscala><CertificadoHoja cert={abierto} cfg={cfg} /></CertEscala>
            </div>

            <p className="small" style={{ color: 'var(--fg-muted)', marginTop: 12, maxWidth: 620, lineHeight: 1.5 }}>
              El botón abre el diálogo de impresión: elige <b>Guardar como PDF</b> y
              tamaño <b>A4 horizontal</b>. El código y el QR permiten a cualquiera
              comprobar que este certificado es auténtico.
            </p>
          </div>
        </section>
      )}

      <CertPrintPortal certs={cola} cfg={cfg} />
    </>
  );
};

// ───────────────────────── Admin ─────────────────────────

// Convierte lo que el admin pega desde Excel (TSV) o un CSV en filas del
// modelo. Reconoce la cabecera por nombre — sin tildes ni mayúsculas — y si no
// hay cabecera asume el orden del formato acordado.
const CERT_CABECERAS = {
  FECHA: 'fecha', FECHAS: 'fecha', DIA: 'fecha', DIAS: 'fecha',
  NOMBREYAPELLIDOS: 'nombres', NOMBRESYAPELLIDOS: 'nombres', APELLIDOSYNOMBRES: 'nombres',
  NOMBRE: 'nombres', NOMBRES: 'nombres', PARTICIPANTE: 'nombres', APELLIDOSYNOMBRE: 'nombres',
  DNI: 'dni', DOCUMENTO: 'dni', NDOCUMENTO: 'dni',
  ACTIVIDAD: 'actividad', EVENTO: 'actividad', CURSO: 'actividad',
  SOLOSOCIEMOCOLABORATIVA: 'tipo_actividad', SOLOSOCIEMOCOLABORATIVO: 'tipo_actividad',
  SOCIEMOCOLABORATIVA: 'tipo_actividad', TIPO: 'tipo_actividad',
  TIPODEACTIVIDAD: 'tipo_actividad', TIPOACTIVIDAD: 'tipo_actividad',
  COLABORATIVA: 'tipo_actividad', ORGANIZACION: 'tipo_actividad',
  COMITE: 'comite', COMITEORGANIZADOR: 'comite',
  ROL: 'rol', CONDICION: 'rol', CALIDAD: 'rol', PARTICIPACION: 'rol',
  VALIDOPOR: 'valido_por', VALIDEZ: 'valido_por', HORAS: 'valido_por', HORASACADEMICAS: 'valido_por',
  EMAIL: 'email', CORREO: 'email', CORREOELECTRONICO: 'email',
  OBSERVACION: 'observacion', OBSERVACIONES: 'observacion', NOTA: 'observacion',
};
// Orden del formato acordado con la directiva, para cuando se pega sin títulos.
const CERT_ORDEN_DEFECTO = ['nombres', 'fecha', 'dni', 'actividad', 'tipo_actividad', 'comite', 'rol', 'valido_por'];

const certNormTxt = (s) => String(s || '')
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toUpperCase().replace(/[^A-Z]/g, '');

// Los títulos reales del Excel llevan la aclaración dentro del paréntesis
// —"FECHA (DÍA, MES, AÑO)", "ROL (Ponente, organizador, participante)"— y al
// normalizarlos enteros no coincidían con nada: la columna se perdía en
// silencio. Se prueba primero sin el paréntesis y solo después con el título
// completo, por si alguien tituló la columna con paréntesis a propósito.
const certCampoDeCabecera = (celda) => {
  const sinParentesis = String(celda || '').split('(')[0];
  return CERT_CABECERAS[certNormTxt(sinParentesis)] || CERT_CABECERAS[certNormTxt(celda)] || null;
};

// ¿La celda es un dato y no un título de columna? Fechas y documentos.
const certPareceDato = (celda) => {
  const s = String(celda || '').trim();
  if (!s) return false;
  if (/^\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4}$/.test(s)) return true;
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return true;
  if (/^\d{7,9}$/.test(s)) return true;
  return false;
};

const certParsearPegado = (texto) => {
  const lineas = String(texto || '').replace(/\r/g, '').split('\n').filter(l => l.trim());
  if (!lineas.length) return { filas: [], campos: [], conCabecera: false };
  const sep = lineas[0].indexOf('\t') >= 0 ? '\t' : (lineas[0].indexOf(';') >= 0 ? ';' : ',');
  const celdas = lineas.map(l => l.split(sep).map(c => c.trim().replace(/^"(.*)"$/, '$1')));

  // Ojo con el falso positivo: una fila de datos con "PARTICIPANTE" y "4 horas"
  // mapea dos columnas y se haría pasar por cabecera, tragándose a esa persona.
  // Una cabecera nunca trae fechas ni documentos, así que eso desempata.
  const posibles = celdas[0].map(certCampoDeCabecera);
  const conCabecera = posibles.filter(Boolean).length >= 2 && !celdas[0].some(certPareceDato);
  const campos = conCabecera ? posibles : CERT_ORDEN_DEFECTO;
  let cuerpo = conCabecera ? celdas.slice(1) : celdas;

  // Las hojas de los comités llevan a la izquierda el número de fila (1, 2,
  // 3…). Con cabecera esa columna simplemente no mapea y se ignora sola, pero
  // sin cabecera correría todo el orden un puesto y los nombres caerían en la
  // fecha. Un correlativo nunca pasa de 4 dígitos, así que no choca con el DNI.
  if (!conCabecera && cuerpo.length && cuerpo.every(f => /^\d{1,4}$/.test(String(f[0] || '').trim()))) {
    cuerpo = cuerpo.map(f => f.slice(1));
  }

  const filas = cuerpo.map(fila => {
    const o = {};
    campos.forEach((campo, i) => { if (campo) o[campo] = fila[i] || ''; });
    return o;
  }).filter(o => String(o.nombres || '').trim());

  return { filas, campos, conCabecera };
};

// Mutaciones que llevan una lista (importar, enviar correos) van por POST real.
// adminApi.post viaja por query string —el workaround CORS de api.js— y ahí un
// array se serializaría como "[object Object]" además de reventar el largo de
// la URL. Si el POST cae por CORS (defecto de despliegues viejos de Apps
// Script), se reintenta por GET con el array en JSON, que el backend sabe leer;
// eso solo alcanza para lotes chicos, y se avisa cuando no cabe.
const certPostLista = async (action, body) => {
  let r = await window.SOCIEM_API.upload('certificados', action, body);
  if (r && r.ok === false && /fetch|network|cors|failed/i.test(String(r.error || ''))) {
    const plano = {};
    Object.keys(body).forEach(k => {
      plano[k] = Array.isArray(body[k]) ? JSON.stringify(body[k]) : body[k];
    });
    const largo = Object.keys(plano).reduce((n, k) => n + String(plano[k]).length, 0);
    if (largo > 6000) {
      throw new Error('El envío directo falló y la lista es demasiado grande para el método alternativo. Importa en tandas de ~50 filas.');
    }
    r = await window.SOCIEM_API.get('certificados', action, plano);
  }
  if (!r || r.ok === false) {
    const e = new Error((r && r.error) || 'Sin respuesta del servidor');
    e.code = r && r.code;
    throw e;
  }
  return r;
};

const AdminCertificados = ({ toast }) => {
  const cfg = useCertConfig();
  const { cola, imprimir } = useImpresion();
  const [items, setItems] = React.useState([]);
  const [cargando, setCargando] = React.useState(true);
  const [fallo, setFallo] = React.useState('');
  const [busca, setBusca] = React.useState('');
  const [sel, setSel] = React.useState({});
  const [modal, setModal] = React.useState(null); // 'nuevo' | 'evento' | 'importar' | 'ver'
  const [editando, setEditando] = React.useState(null);
  const [verCert, setVerCert] = React.useState(null);
  const [guardando, setGuardando] = React.useState(false);

  const recargar = React.useCallback(async () => {
    setCargando(true); setFallo('');
    try {
      const r = await adminApi.get('certificados', 'list');
      setItems(r.items || r.data || []);
    } catch (e) {
      setFallo(e.message || 'No se pudo cargar');
    } finally { setCargando(false); }
  }, []);
  React.useEffect(() => { recargar(); }, [recargar]);

  const filtrados = React.useMemo(() => {
    const q = busca.trim().toLowerCase();
    if (!q) return items;
    return items.filter(c => [c.nombres, c.dni, c.actividad, c.comite, c.codigo, c.rol]
      .some(v => String(v || '').toLowerCase().indexOf(q) >= 0));
  }, [items, busca]);

  const seleccionados = React.useMemo(
    () => filtrados.filter(c => sel[c.id]),
    [filtrados, sel]
  );
  const todosMarcados = filtrados.length > 0 && filtrados.every(c => sel[c.id]);

  const guardarUno = async () => {
    if (!editando) return;
    if (!String(editando.nombres || '').trim() || !String(editando.actividad || '').trim()) {
      toast.push('Nombre y actividad son obligatorios', 'error'); return;
    }
    setGuardando(true);
    try {
      await adminApi.post('certificados', editando.id ? 'update' : 'create', editando);
      toast.push(editando.id ? 'Certificado actualizado' : 'Certificado emitido', 'ok');
      setModal(null); setEditando(null); recargar();
    } catch (e) {
      toast.push(e.message || 'No se pudo guardar', 'error');
    } finally { setGuardando(false); }
  };

  const anular = async (c) => {
    const motivo = window.prompt(`Anular el certificado ${c.codigo} de ${c.nombres}.\n\nMotivo (queda registrado):`, '');
    if (motivo === null) return;
    try {
      await adminApi.post('certificados', 'anular', { id: c.id, motivo });
      toast.push('Certificado anulado', 'ok'); recargar();
    } catch (e) { toast.push(e.message || 'No se pudo anular', 'error'); }
  };

  const reactivar = async (c) => {
    try {
      await adminApi.post('certificados', 'reactivar', { id: c.id });
      toast.push('Certificado reactivado', 'ok'); recargar();
    } catch (e) { toast.push(e.message || 'No se pudo reactivar', 'error'); }
  };

  const enviarCorreos = async () => {
    if (!seleccionados.length) { toast.push('Marca al menos un certificado', 'error'); return; }
    const conEmail = seleccionados.filter(c => String(c.email || '').trim()).length;
    if (!window.confirm(`Se encolarán ${conEmail} correos (de ${seleccionados.length} seleccionados; el resto no tiene email).\n\n¿Continuar?`)) return;
    try {
      const r = await certPostLista('enviarCorreos', { ids: seleccionados.map(c => c.id) });
      const d = r.data || {};
      toast.push(`${d.encolados} correos encolados${d.sin_email ? ` · ${d.sin_email} sin email` : ''}`, 'ok');
    } catch (e) { toast.push(e.message || 'No se pudo encolar', 'error'); }
  };

  return (
    <>
      <div className="flex justify-between items-center" style={{ flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
        <input
          className="input"
          placeholder="Buscar por nombre, DNI, actividad o código…"
          value={busca}
          onChange={e => setBusca(e.target.value)}
          style={{ maxWidth: 340 }}
        />
        <div className="flex gap-3" style={{ flexWrap: 'wrap' }}>
          <button className="btn" onClick={() => { setEditando({ rol: 'PARTICIPANTE' }); setModal('nuevo'); }}>
            <Icon name="plus" size={15} /> Nuevo
          </button>
          <button className="btn" onClick={() => setModal('importar')}>
            <Icon name="edit" size={15} /> Importar lista
          </button>
          <button className="btn btn-primary" onClick={() => setModal('evento')}>
            <Icon name="calendar" size={15} /> Emitir desde evento
          </button>
        </div>
      </div>

      {seleccionados.length > 0 && (
        <div className="card" style={{ padding: '12px 18px', marginBottom: 14, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <b style={{ fontSize: 14 }}>{seleccionados.length} seleccionados</b>
          <button className="btn" onClick={() => imprimir(seleccionados)}>
            <Icon name="download" size={14} /> Imprimir / PDF
          </button>
          <button className="btn" onClick={enviarCorreos}>
            <Icon name="mail" size={14} /> Enviar por correo
          </button>
          <button className="btn" onClick={() => setSel({})}>Limpiar</button>
        </div>
      )}

      {fallo && <div className="card" style={{ padding: 20, color: 'var(--red)' }}>{fallo}</div>}

      {cargando ? (
        <div className="card" style={{ padding: 32, color: 'var(--fg-muted)' }}>Cargando certificados…</div>
      ) : !filtrados.length ? (
        <div className="card" style={{ padding: 32, color: 'var(--fg-muted)' }}>
          {items.length ? 'Ningún certificado coincide con la búsqueda.' : 'Todavía no hay certificados emitidos. Empieza con “Emitir desde evento” o “Importar lista”.'}
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: 'auto' }}>
          <table className="admin-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ width: 36 }}>
                  <input
                    type="checkbox"
                    checked={todosMarcados}
                    onChange={e => {
                      const n = { ...sel };
                      filtrados.forEach(c => { if (e.target.checked) n[c.id] = true; else delete n[c.id]; });
                      setSel(n);
                    }}
                  />
                </th>
                <th>Código</th>
                <th>Nombre</th>
                <th>DNI</th>
                <th>Actividad</th>
                <th>Tipo</th>
                <th>Comité</th>
                <th>Rol</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th style={{ width: 130 }}></th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map(c => (
                <tr key={c.id} style={{ opacity: String(c.estado).toUpperCase() === 'ANULADO' ? 0.55 : 1 }}>
                  <td>
                    <input type="checkbox" checked={!!sel[c.id]}
                      onChange={e => setSel(s => { const n = { ...s }; if (e.target.checked) n[c.id] = true; else delete n[c.id]; return n; })} />
                  </td>
                  <td className="mono small">{c.codigo}</td>
                  <td style={{ fontWeight: 500 }}>{c.nombres}</td>
                  <td className="mono small">{c.dni}</td>
                  <td style={{ maxWidth: 260 }}>{c.actividad}</td>
                  <td className="small">{certEsColaborativa(c.tipo_actividad) ? 'Colaborativa' : 'SOCIEM'}</td>
                  <td className="small">{c.comite}</td>
                  <td className="small">{c.rol}</td>
                  <td className="small">{certFechaCorta(c.fecha)}</td>
                  <td>
                    <span className="badge" style={String(c.estado).toUpperCase() === 'ANULADO'
                      ? { background: '#FAEAEA', color: '#8C2121', borderColor: '#F0BBBB' }
                      : { background: '#E8F5EC', color: '#1F6B3A', borderColor: '#C8E6CD' }}>
                      <span className="badge-dot" />{c.estado || 'EMITIDO'}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button className="icon-btn" title="Ver" onClick={() => { setVerCert(c); setModal('ver'); }}><Icon name="search" size={14} /></button>
                      <button className="icon-btn" title="Editar" onClick={() => { setEditando({ ...c }); setModal('nuevo'); }}><Icon name="edit" size={14} /></button>
                      {String(c.estado).toUpperCase() === 'ANULADO'
                        ? <button className="icon-btn" title="Reactivar" onClick={() => reactivar(c)}><Icon name="check" size={14} /></button>
                        : <button className="icon-btn" title="Anular" onClick={() => anular(c)}><Icon name="trash" size={14} /></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Alta / edición individual */}
      <AdminModal
        open={modal === 'nuevo'}
        onClose={() => { setModal(null); setEditando(null); }}
        title={editando && editando.id ? 'Editar certificado' : 'Nuevo certificado'}
        wide
        footer={<>
          <button className="btn" onClick={() => { setModal(null); setEditando(null); }}>Cancelar</button>
          <button className="btn btn-primary" onClick={guardarUno} disabled={guardando}>{guardando ? 'Guardando…' : 'Guardar'}</button>
        </>}
      >
        {editando && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 18px' }}>
            <AdminField label="Nombre y apellidos" span>
              <input className="input" value={editando.nombres || ''} onChange={e => setEditando({ ...editando, nombres: e.target.value })} />
            </AdminField>
            <AdminField label="DNI">
              <input className="input" value={editando.dni || ''} onChange={e => setEditando({ ...editando, dni: e.target.value })} maxLength={12} />
            </AdminField>
            <AdminField label="Fecha de la actividad" hint="dd/mm/aaaa, aaaa-mm-dd o texto libre para rangos">
              <input className="input" value={editando.fecha || ''} onChange={e => setEditando({ ...editando, fecha: e.target.value })} />
            </AdminField>
            <AdminField label="Actividad" span>
              <input className="input" value={editando.actividad || ''} onChange={e => setEditando({ ...editando, actividad: e.target.value })} />
            </AdminField>
            <AdminField label="Solo SOCIEM o colaborativa">
              <select className="input" value={certEsColaborativa(editando.tipo_actividad) ? 'COLABORATIVA' : 'SOCIEM'}
                onChange={e => setEditando({ ...editando, tipo_actividad: e.target.value })}>
                <option value="SOCIEM">Solo SOCIEM</option>
                <option value="COLABORATIVA">Colaborativa</option>
              </select>
            </AdminField>
            <AdminField label="Comité">
              <input className="input" value={editando.comite || ''} onChange={e => setEditando({ ...editando, comite: e.target.value.toUpperCase() })} placeholder="SCOPE-IN, SCORA…" />
            </AdminField>
            <AdminField label="Rol">
              <select className="input" value={editando.rol || 'PARTICIPANTE'} onChange={e => setEditando({ ...editando, rol: e.target.value })}>
                {CERT_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </AdminField>
            <AdminField label="Válido por" hint="Ej.: 5 Puntos IFMSA · 8 horas académicas">
              <input className="input" value={editando.valido_por || ''} onChange={e => setEditando({ ...editando, valido_por: e.target.value })} />
            </AdminField>
            <AdminField label="Email" hint="Para el envío del certificado">
              <input className="input" value={editando.email || ''} onChange={e => setEditando({ ...editando, email: e.target.value })} />
            </AdminField>
            {editando.codigo && (
              <AdminField label="Código" span hint="Se genera solo y no cambia: es lo que verifica el QR">
                <input className="input mono" value={editando.codigo} readOnly disabled />
              </AdminField>
            )}
          </div>
        )}
      </AdminModal>

      {modal === 'evento' && (
        <CertEmitirEvento
          onClose={() => setModal(null)}
          onListo={(r) => { setModal(null); recargar(); toast.push(`${r.creados} certificados emitidos${r.ya_tenian ? ` · ${r.ya_tenian} ya tenían` : ''}`, 'ok'); }}
          toast={toast}
        />
      )}

      {modal === 'importar' && (
        <CertImportar
          onClose={() => setModal(null)}
          onListo={(r) => { setModal(null); recargar(); toast.push(`${r.creados} certificados creados${r.omitidos && r.omitidos.length ? ` · ${r.omitidos.length} omitidos` : ''}`, 'ok'); }}
          toast={toast}
        />
      )}

      <AdminModal
        open={modal === 'ver'}
        onClose={() => { setModal(null); setVerCert(null); }}
        title={verCert ? verCert.codigo : ''}
        wide
        footer={<>
          <button className="btn" onClick={() => { setModal(null); setVerCert(null); }}>Cerrar</button>
          <button className="btn btn-primary" onClick={() => imprimir([verCert])}><Icon name="download" size={15} /> Imprimir / PDF</button>
        </>}
      >
        {verCert && <CertEscala><CertificadoHoja cert={verCert} cfg={cfg} /></CertEscala>}
      </AdminModal>

      <CertPrintPortal certs={cola} cfg={cfg} />
    </>
  );
};

// ── Emitir desde un evento (usa las validaciones de asistencia que ya existen)
const CertEmitirEvento = ({ onClose, onListo, toast }) => {
  const [eventos, setEventos] = React.useState([]);
  const [form, setForm] = React.useState({ evento_id: '', rol: 'PARTICIPANTE', valido_por: '', tipo_actividad: 'SOCIEM', incluir_no_validados: 'NO' });
  const [cargando, setCargando] = React.useState(true);
  const [emitiendo, setEmitiendo] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      try {
        const r = await adminApi.get('eventos', 'list');
        setEventos(r.items || r.data || []);
      } catch (e) { toast.push(e.message || 'No se pudieron cargar los eventos', 'error'); }
      finally { setCargando(false); }
    })();
  }, [toast]);

  const emitir = async () => {
    if (!form.evento_id) { toast.push('Elige un evento', 'error'); return; }
    setEmitiendo(true);
    try {
      const r = await adminApi.post('certificados', 'emitirDesdeEvento', form);
      onListo(r.data || {});
    } catch (e) {
      toast.push(e.message || 'No se pudo emitir', 'error');
    } finally { setEmitiendo(false); }
  };

  const ev = eventos.find(e => String(e.id) === String(form.evento_id));

  return (
    <AdminModal
      open
      onClose={onClose}
      title="Emitir certificados desde un evento"
      wide
      footer={<>
        <button className="btn" onClick={onClose}>Cancelar</button>
        <button className="btn btn-primary" onClick={emitir} disabled={emitiendo || !form.evento_id}>
          {emitiendo ? 'Emitiendo…' : 'Emitir'}
        </button>
      </>}
    >
      <p className="small" style={{ color: 'var(--fg-muted)', marginTop: 0, lineHeight: 1.55 }}>
        Toma la lista de asistencia del evento y crea un certificado por persona.
        Por defecto solo entran quienes tienen <b>entrada y salida validadas</b> —
        es decir, quienes rindieron el pretest y el postest o pasaron lista dos veces.
        A quien ya tenga certificado de esa actividad no se le duplica.
      </p>

      <AdminField label="Evento">
        {cargando
          ? <div className="small" style={{ color: 'var(--fg-muted)' }}>Cargando eventos…</div>
          : (
            <select className="input" value={form.evento_id} onChange={e => setForm({ ...form, evento_id: e.target.value })}>
              <option value="">— Elige un evento —</option>
              {eventos.map(e => (
                <option key={e.id} value={e.id}>
                  {certFechaCorta(e.fecha)} · {e.titulo}
                </option>
              ))}
            </select>
          )}
      </AdminField>

      {ev && (
        <div style={{ background: 'var(--bg-soft)', padding: '12px 16px', borderRadius: 10, marginBottom: 14, fontSize: 13.5, lineHeight: 1.6 }}>
          <b>{ev.titulo}</b><br />
          <span style={{ color: 'var(--fg-muted)' }}>
            {[certFecha(ev.fecha), ev.comite_organizador, ev.modalidad].filter(Boolean).join(' · ')}
          </span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 18px' }}>
        <AdminField label="Rol de los asistentes">
          <select className="input" value={form.rol} onChange={e => setForm({ ...form, rol: e.target.value })}>
            {CERT_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </AdminField>
        <AdminField label="Válido por" hint="Ej.: 5 Puntos IFMSA · 8 horas académicas">
          <input className="input" value={form.valido_por} onChange={e => setForm({ ...form, valido_por: e.target.value })} />
        </AdminField>
        <AdminField label="Solo SOCIEM o colaborativa" span>
          <select className="input" value={form.tipo_actividad} onChange={e => setForm({ ...form, tipo_actividad: e.target.value })}>
            <option value="SOCIEM">Solo SOCIEM</option>
            <option value="COLABORATIVA">Colaborativa</option>
          </select>
        </AdminField>
      </div>

      <label style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 13.5, marginTop: 4, cursor: 'pointer' }}>
        <input
          type="checkbox"
          checked={form.incluir_no_validados === 'SI'}
          onChange={e => setForm({ ...form, incluir_no_validados: e.target.checked ? 'SI' : 'NO' })}
          style={{ marginTop: 3 }}
        />
        <span>
          Incluir también a quienes <b>no</b> completaron las dos validaciones
          <span className="small" style={{ display: 'block', color: 'var(--fg-muted)' }}>
            Úsalo solo si la asistencia se controló fuera del sistema.
          </span>
        </span>
      </label>
    </AdminModal>
  );
};

// ── Importar una lista pegada desde Excel
const CertImportar = ({ onClose, onListo, toast }) => {
  const [texto, setTexto] = React.useState('');
  const [comunes, setComunes] = React.useState({ actividad: '', comite: '', fecha: '', valido_por: '', rol: '', tipo_actividad: '' });
  const [subiendo, setSubiendo] = React.useState(false);

  const parsed = React.useMemo(() => certParsearPegado(texto), [texto]);

  // Los campos "comunes" rellenan lo que la lista no traiga: lo normal es
  // pegar solo nombres y DNI y que la actividad sea la misma para todos.
  const filasFinales = React.useMemo(() => parsed.filas.map(f => {
    const o = { ...f };
    Object.keys(comunes).forEach(k => {
      if (String(comunes[k] || '').trim() && !String(o[k] || '').trim()) o[k] = comunes[k];
    });
    return o;
  }), [parsed.filas, comunes]);

  const sinActividad = filasFinales.filter(f => !String(f.actividad || '').trim()).length;

  const importar = async () => {
    if (!filasFinales.length) { toast.push('No hay filas para importar', 'error'); return; }
    if (sinActividad) { toast.push('Falta la actividad en ' + sinActividad + ' fila(s)', 'error'); return; }
    setSubiendo(true);
    try {
      const r = await certPostLista('importar', { filas: filasFinales });
      onListo(r.data || {});
    } catch (e) {
      toast.push(e.message || 'No se pudo importar', 'error');
    } finally { setSubiendo(false); }
  };

  return (
    <AdminModal
      open
      onClose={onClose}
      title="Importar lista de certificados"
      wide
      footer={<>
        <button className="btn" onClick={onClose}>Cancelar</button>
        <button className="btn btn-primary" onClick={importar} disabled={subiendo || !filasFinales.length}>
          {subiendo ? 'Importando…' : `Importar ${filasFinales.length || ''}`}
        </button>
      </>}
    >
      <p className="small" style={{ color: 'var(--fg-muted)', marginTop: 0, lineHeight: 1.55 }}>
        Copia las filas desde Excel y pégalas aquí. Se reconocen las columnas
        <b> NOMBRES Y APELLIDOS · FECHA · DNI · ACTIVIDAD · SOLO SOCIEM O COLABORATIVA ·
        COMITÉ · ROL · VÁLIDO POR</b> (más EMAIL y OBSERVACIÓN). Si pegas sin fila
        de títulos, se asume ese mismo orden.
      </p>

      <AdminField label="Pega aquí la lista">
        <textarea
          className="input"
          rows={8}
          value={texto}
          onChange={e => setTexto(e.target.value)}
          placeholder={'NOMBRES Y APELLIDOS\tFECHA\tDNI\tACTIVIDAD\tSOLO SOCIEM O COLABORATIVA\tCOMITÉ\tROL\tVÁLIDO POR\nMaría Quispe Mamani\t12/09/2026\t72345678\tTaller de sutura\tSOLO SOCIEM\tSCOME\tPARTICIPANTE\t5 Puntos IFMSA'}
          style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.6, whiteSpace: 'pre', overflowX: 'auto' }}
        />
      </AdminField>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 4 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>Valores para toda la lista</div>
        <div className="small" style={{ color: 'var(--fg-muted)', marginBottom: 12 }}>
          Se aplican solo a las filas que no traigan ese dato.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 18px' }}>
          <AdminField label="Actividad" span>
            <input className="input" value={comunes.actividad} onChange={e => setComunes({ ...comunes, actividad: e.target.value })} />
          </AdminField>
          <AdminField label="Fecha">
            <input className="input" value={comunes.fecha} onChange={e => setComunes({ ...comunes, fecha: e.target.value })} placeholder="12/09/2026" />
          </AdminField>
          <AdminField label="Comité">
            <input className="input" value={comunes.comite} onChange={e => setComunes({ ...comunes, comite: e.target.value.toUpperCase() })} />
          </AdminField>
          <AdminField label="Solo SOCIEM o colaborativa">
            <select className="input" value={comunes.tipo_actividad} onChange={e => setComunes({ ...comunes, tipo_actividad: e.target.value })}>
              <option value="">— de la lista —</option>
              <option value="SOCIEM">Solo SOCIEM</option>
              <option value="COLABORATIVA">Colaborativa</option>
            </select>
          </AdminField>
          <AdminField label="Rol">
            <select className="input" value={comunes.rol} onChange={e => setComunes({ ...comunes, rol: e.target.value })}>
              <option value="">— de la lista —</option>
              {CERT_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </AdminField>
          <AdminField label="Válido por">
            <input className="input" value={comunes.valido_por} onChange={e => setComunes({ ...comunes, valido_por: e.target.value })} placeholder="8 horas académicas" />
          </AdminField>
        </div>
      </div>

      {texto.trim() && (
        <div style={{ marginTop: 8 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
            Vista previa · {filasFinales.length} fila(s)
            {parsed.conCabecera ? ' · cabecera detectada' : ' · sin cabecera, orden por defecto'}
          </div>
          {sinActividad > 0 && (
            <div style={{ padding: '10px 14px', borderRadius: 8, background: '#FAEAEA', color: '#8C2121', fontSize: 13, marginBottom: 10 }}>
              Falta la actividad en {sinActividad} fila(s). Complétala arriba en “Valores para toda la lista”.
            </div>
          )}
          <div style={{ maxHeight: 220, overflow: 'auto', border: '1px solid var(--border)', borderRadius: 8 }}>
            <table className="admin-table" style={{ width: '100%', fontSize: 12.5 }}>
              <thead>
                <tr><th>Nombre</th><th>Fecha</th><th>DNI</th><th>Actividad</th><th>Tipo</th><th>Comité</th><th>Rol</th><th>Válido por</th></tr>
              </thead>
              <tbody>
                {filasFinales.slice(0, 40).map((f, i) => (
                  <tr key={i}>
                    <td>{f.nombres}</td>
                    <td className="small">{f.fecha}</td>
                    <td className="mono small">{f.dni}</td>
                    <td className="small">{f.actividad}</td>
                    <td className="small">{certEsColaborativa(f.tipo_actividad) ? 'Colaborativa' : 'SOCIEM'}</td>
                    <td className="small">{f.comite}</td>
                    <td className="small">{f.rol || 'PARTICIPANTE'}</td>
                    <td className="small">{f.valido_por}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filasFinales.length > 40 && (
            <div className="small" style={{ color: 'var(--fg-muted)', marginTop: 6 }}>
              …y {filasFinales.length - 40} más.
            </div>
          )}
        </div>
      )}
    </AdminModal>
  );
};

Object.assign(window, {
  CertificadosPage, AdminCertificados, CertificadoHoja, CertEscala,
  CertPrintPortal, certParsearPegado, certFecha, certFechaCorta,
  certEsColaborativa, certComites, certComitesTexto,
});
