/**
 * SOCIEM-UNA API client
 *
 * Cliente liviano para el backend Apps Script. Expone window.SOCIEM_API.
 *
 * - GET con query string + token automático desde localStorage
 * - POST con Content-Type: text/plain (evita preflight CORS en Apps Script)
 * - Si la red falla, devuelve { ok:false, error } y el componente cae a su
 *   data estática.
 */
(function () {
  var URL = 'https://script.google.com/macros/s/AKfycbzEheTkZUXFOwaDZB3LXyXq9tdk4ckdQJLazWC-Vc04hRP2UTJmBh5AR55TvCLnCYYJ/exec';

  function token() {
    try { return localStorage.getItem('sociem_token') || ''; } catch (e) { return ''; }
  }

  function lang() {
    try { return localStorage.getItem('sociem_lang') || 'es'; } catch (e) { return 'es'; }
  }

  async function get(route, action, params) {
    params = params || {};
    var qs = new URLSearchParams({ route: route, action: action, lang: lang() });
    Object.keys(params).forEach(function (k) {
      if (params[k] !== undefined && params[k] !== null) qs.set(k, params[k]);
    });
    var t = token();
    if (t) qs.set('token', t);
    try {
      var r = await fetch(URL + '?' + qs.toString(), { redirect: 'follow' });
      return await r.json();
    } catch (err) {
      console.warn('[SOCIEM_API.get]', route, action, err);
      return { ok: false, error: String(err) };
    }
  }

  async function post(route, action, body) {
    body = body || {};
    // ⚠️ WORKAROUND CORS — Apps Script Web App tiene un defecto conocido:
    // sus respuestas POST a veces NO incluyen el header
    // Access-Control-Allow-Origin (sin importar el Content-Type del request).
    // Las respuestas GET sí lo tienen (porque pasan por el redirect a
    // googleusercontent.com que añade los headers CORS).
    //
    // Como `handleRequest` en el backend lee `params` indistintamente
    // del método (GET → e.parameter ; POST → e.postData o e.parameter),
    // mandar las mutaciones por GET funciona end-to-end.
    //
    // Trade-off: los datos viajan en la query string. Para login de admin
    // sobre HTTPS es aceptable (no atraviesa proxies internos en claro y
    // no se cachea por el navegador thanks al _t timestamp). Reconsiderar
    // si en el futuro se manejan datos altamente sensibles.
    body._t = Date.now(); // anti-caché y forza nueva request
    return get(route, action, body);
  }

  // POST real (cuerpo grande, ej. fotos base64). Usa Content-Type text/plain
  // implícito (string body) → "simple request", sin preflight CORS. Apps Script
  // responde por el redirect a googleusercontent que sí incluye headers CORS.
  async function upload(route, action, body) {
    body = body || {};
    body.route = route; body.action = action; body.lang = lang();
    var t = token();
    if (t) body.token = t;
    try {
      var r = await fetch(URL, { method: 'POST', body: JSON.stringify(body), redirect: 'follow' });
      return await r.json();
    } catch (err) {
      console.warn('[SOCIEM_API.upload]', route, action, err);
      return { ok: false, error: String(err) };
    }
  }

  // Lee un File del input y lo sube a Drive vía archivos.subir.
  // Devuelve { ok, data:{ id, url, thumb } }.
  async function uploadFile(file, carpeta) {
    if (!file) return { ok: false, error: 'sin archivo' };
    var dataUrl = await new Promise(function (res, rej) {
      var fr = new FileReader();
      fr.onload = function () { res(fr.result); };
      fr.onerror = rej;
      fr.readAsDataURL(file);
    });
    var base64 = String(dataUrl).split(',')[1] || '';
    return upload('archivos', 'subir', {
      nombre: file.name, mime: file.type || 'image/jpeg', carpeta: carpeta || 'miembros', data: base64
    });
  }

  // Login → guarda token + user en localStorage.
  // Va por POST real (upload) para que las credenciales viajen en el cuerpo
  // y no en la query string (historial del navegador, logs de proxy).
  // Si el POST falla a nivel de red/CORS (defecto conocido de Apps Script en
  // despliegues antiguos), cae una sola vez al método GET anterior para no
  // dejar a nadie fuera del panel.
  async function login(username, password) {
    var r = await upload('auth', 'login', { username: username, password: password });
    if (r && r.ok === false && /fetch|network|cors/i.test(String(r.error || ''))) {
      console.warn('[SOCIEM_API.login] POST bloqueado, usando fallback GET');
      r = await post('auth', 'login', { username: username, password: password });
    }
    if (r && r.ok && r.token) {
      try {
        localStorage.setItem('sociem_token', r.token);
        if (r.user) localStorage.setItem('sociem_user', JSON.stringify(r.user));
      } catch (e) {}
    }
    return r;
  }

  function logout() {
    var t = token();
    try {
      localStorage.removeItem('sociem_token');
      localStorage.removeItem('sociem_user');
    } catch (e) {}
    if (t) post('auth', 'logout', {}); // best-effort, no esperamos
  }

  function currentUser() {
    try {
      var raw = localStorage.getItem('sociem_user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  window.SOCIEM_API = {
    URL: URL,
    get: get, post: post, upload: upload, uploadFile: uploadFile,
    login: login, logout: logout, currentUser: currentUser
  };
})();
