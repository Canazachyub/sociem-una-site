// ============ App ============
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "editorial",
  "cardStyle": "shadow",
  "theme": "light"
}/*EDITMODE-END*/;

const PAGES = ['home', 'nosotros', 'directorio', 'comites', 'miembros', 'eventos', 'noticias', 'tienda', 'registro', 'actividades', 'certificados', 'contacto', 'admin'];
// Parsea el hash en { page, sub }: "#/noticias/mi-slug" → page noticias, sub
// "mi-slug". Un hash que no corresponde a ninguna página muestra el 404.
const parseHash = () => {
  try {
    const h = window.location.hash.replace(/^#\/?/, '');
    if (!h) return { page: 'home', sub: '' };
    const partes = h.split('/');
    if (PAGES.indexOf(partes[0]) >= 0) return { page: partes[0], sub: partes.slice(1).join('/') };
    return { page: '404', sub: h };
  } catch (e) { return { page: 'home', sub: '' }; }
};

const App = () => {
  // Deep-linking por hash: #/tienda, #/eventos… sobreviven a la recarga y
  // cualquier <a href="#/pagina"> del sitio navega sin código extra.
  const [ruta, setRuta] = useState(parseHash);
  const page = ruta.page, sub = ruta.sub;
  const setPage = (p) => {
    setRuta({ page: p, sub: '' });
    try { if (window.location.hash !== '#/' + p) window.location.hash = '/' + p; } catch (e) {}
  };
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const onHash = () => setRuta(parseHash());
    window.addEventListener('hashchange', onHash);
    window.goPage = setPage; // navegación global para CTAs fuera del Navbar
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // Link público de test: ?test=<token> abre la página de evaluación.
  const testToken = (() => { try { return new URLSearchParams(window.location.search).get('test'); } catch (e) { return null; } })();
  if (testToken) return <EvaluacionPublica token={testToken} />;

  // Apply theme + card style to body
  useEffect(() => {
    document.body.dataset.theme = tweaks.theme;
    document.body.dataset.cards = tweaks.cardStyle;
  }, [tweaks.theme, tweaks.cardStyle]);

  const toggleTheme = () => setTweak('theme', tweaks.theme === 'dark' ? 'light' : 'dark');

  // Scroll to top on page change
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [page]);

  const isAdmin = page === 'admin';

  return (
    <>
      {!isAdmin && <Navbar page={page} setPage={setPage} theme={tweaks.theme} toggleTheme={toggleTheme} />}
      <main key={page}>
        {page === 'home' && <HomePage heroVariant={tweaks.heroVariant} />}
        {page === 'nosotros' && <NosotrosPage />}
        {page === 'directorio' && <DirectorioPage />}
        {page === 'comites' && <ComitesPage />}
        {page === 'miembros' && <MiembrosPage />}
        {page === 'eventos' && <EventosPage />}
        {page === 'noticias' && <NoticiasPage slug={sub} />}
        {page === '404' && <NotFoundPage intento={sub} />}
        {page === 'tienda' && <TiendaPage />}
        {page === 'registro' && <RegistroPage />}
        {page === 'actividades' && <ActividadesPage />}
        {/* sub = código del certificado: es la ruta que abre el QR impreso */}
        {page === 'certificados' && <CertificadosPage sub={sub} />}
        {page === 'contacto' && <ContactoPage />}
        {page === 'admin' && <AdminPage />}
      </main>
      {!isAdmin && <Footer setPage={setPage} />}

      <TweaksPanel title="Tweaks · SOCIEM-UNA">
        <TweakSection title="Página activa">
          <TweakSelect
            label="Vista actual"
            value={page}
            onChange={(v) => setPage(v)}
            options={[
              { value: 'home', label: 'Home' },
              { value: 'nosotros', label: 'Nosotros' },
              { value: 'directorio', label: 'Directorio' },
              { value: 'comites', label: 'Comités' },
              { value: 'miembros', label: 'Miembros' },
              { value: 'eventos', label: 'Eventos' },
              { value: 'noticias', label: 'Noticias' },
              { value: 'tienda', label: 'Tienda' },
              { value: 'registro', label: 'Registro' },
              { value: 'actividades', label: 'Actividades' },
              { value: 'certificados', label: 'Certificados' },
              { value: 'contacto', label: 'Contacto' },
              { value: 'admin', label: 'Admin (login)' },
            ]}
          />
        </TweakSection>

        <TweakSection title="Hero del Home" subtitle="3 variaciones">
          <TweakRadio
            value={tweaks.heroVariant}
            onChange={(v) => { setTweak('heroVariant', v); setPage('home'); }}
            options={[
              { value: 'editorial', label: 'Editorial' },
              { value: 'modern', label: 'Moderno' },
              { value: 'vibrant', label: 'Vibrante' },
            ]}
          />
        </TweakSection>

        <TweakSection title="Estilo de cards">
          <TweakRadio
            value={tweaks.cardStyle}
            onChange={(v) => setTweak('cardStyle', v)}
            options={[
              { value: 'hairline', label: 'Bordes finos' },
              { value: 'shadow', label: 'Sombras' },
              { value: 'neumorphic', label: 'Neumórfico' },
            ]}
          />
        </TweakSection>

        <TweakSection title="Tema">
          <TweakRadio
            value={tweaks.theme}
            onChange={(v) => setTweak('theme', v)}
            options={[
              { value: 'light', label: 'Claro' },
              { value: 'dark', label: 'Oscuro' },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
