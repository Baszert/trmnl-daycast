/* Daycast: the next day at a glance. The temperature now, one sentence about the weather, wind, rain and
   the sun, and a calm chart: weather icons, one smooth temperature line, rain per hour and the night.
   Open-Meteo comes in through the polling URL; the page draws. Edit this file, then run: node dev/build.mjs */
!function () {
  var H = 36e5;

  /* ---------- text ---------- */
  var L = {
    en: { sunny: 'Sunny', partly: 'Partly cloudy', grey: 'Grey and dry', showers: 'Showers', wet: 'Wet', rainFrom: 'Rain from {t}', snow: 'Snow', snowFrom: 'Snow from {t}', storm: 'Thunderstorms', fog: 'Foggy',
      sub: 'High {a}, low {b} · feels like {c}', wind: 'Wind', rain: 'Rain', rise: 'Sunrise', set: 'Sunset', dry: 'dry', dirs: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'], setup: 'Set your location in the plugin settings' },
    nl: { sunny: 'Zonnig', partly: 'Wisselend bewolkt', grey: 'Grijs en droog', showers: 'Buien', wet: 'Nat', rainFrom: 'Regen vanaf {t}', snow: 'Sneeuw', snowFrom: 'Sneeuw vanaf {t}', storm: 'Onweer', fog: 'Mistig',
      sub: 'Max {a}, min {b} · voelt als {c}', wind: 'Wind', rain: 'Neerslag', rise: 'Zon op', set: 'Zon onder', dry: 'droog', dirs: ['N', 'NO', 'O', 'ZO', 'Z', 'ZW', 'W', 'NW'], setup: 'Stel je locatie in bij de plugin-instellingen' },
    de: { sunny: 'Sonnig', partly: 'Wechselnd bewölkt', grey: 'Grau und trocken', showers: 'Schauer', wet: 'Nass', rainFrom: 'Regen ab {t}', snow: 'Schnee', snowFrom: 'Schnee ab {t}', storm: 'Gewitter', fog: 'Neblig',
      sub: 'Max {a}, min {b} · gefühlt {c}', wind: 'Wind', rain: 'Niederschlag', rise: 'Sonne auf', set: 'Sonne unter', dry: 'trocken', dirs: ['N', 'NO', 'O', 'SO', 'S', 'SW', 'W', 'NW'], setup: 'Standort in den Plugin-Einstellungen festlegen' },
    fr: { sunny: 'Ensoleillé', partly: 'Variable', grey: 'Gris et sec', showers: 'Averses', wet: 'Humide', rainFrom: 'Pluie dès {t}', snow: 'Neige', snowFrom: 'Neige dès {t}', storm: 'Orages', fog: 'Brumeux',
      sub: 'Max {a}, min {b} · ressenti {c}', wind: 'Vent', rain: 'Pluie', rise: 'Lever', set: 'Coucher', dry: 'sec', dirs: ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'], setup: 'Indiquez votre lieu dans les réglages du plugin' },
    es: { sunny: 'Soleado', partly: 'Nubes y claros', grey: 'Gris y seco', showers: 'Chubascos', wet: 'Lluvioso', rainFrom: 'Lluvia desde las {t}', snow: 'Nieve', snowFrom: 'Nieve desde las {t}', storm: 'Tormentas', fog: 'Niebla',
      sub: 'Máx {a}, mín {b} · sensación {c}', wind: 'Viento', rain: 'Lluvia', rise: 'Amanecer', set: 'Atardecer', dry: 'seco', dirs: ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'], setup: 'Indica tu ubicación en los ajustes del plugin' },
    it: { sunny: 'Soleggiato', partly: 'Variabile', grey: 'Grigio e asciutto', showers: 'Rovesci', wet: 'Piovoso', rainFrom: 'Pioggia dalle {t}', snow: 'Neve', snowFrom: 'Neve dalle {t}', storm: 'Temporali', fog: 'Nebbia',
      sub: 'Max {a}, min {b} · percepita {c}', wind: 'Vento', rain: 'Pioggia', rise: 'Alba', set: 'Tramonto', dry: 'asciutto', dirs: ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'], setup: 'Imposta la posizione nelle impostazioni del plugin' },
    pt: { sunny: 'Ensolarado', partly: 'Sol e nuvens', grey: 'Cinzento e seco', showers: 'Aguaceiros', wet: 'Chuvoso', rainFrom: 'Chuva a partir das {t}', snow: 'Neve', snowFrom: 'Neve a partir das {t}', storm: 'Trovoada', fog: 'Nevoeiro',
      sub: 'Máx {a}, mín {b} · sensação {c}', wind: 'Vento', rain: 'Chuva', rise: 'Nascer', set: 'Pôr do sol', dry: 'seco', dirs: ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'], setup: 'Defina a localização nas definições do plugin' },
    sv: { sunny: 'Soligt', partly: 'Växlande molnighet', grey: 'Grått och torrt', showers: 'Skurar', wet: 'Blött', rainFrom: 'Regn från {t}', snow: 'Snö', snowFrom: 'Snö från {t}', storm: 'Åska', fog: 'Dimma',
      sub: 'Max {a}, min {b} · känns som {c}', wind: 'Vind', rain: 'Nederbörd', rise: 'Soluppgång', set: 'Solnedgång', dry: 'torrt', dirs: ['N', 'NO', 'O', 'SO', 'S', 'SV', 'V', 'NV'], setup: 'Ange din plats i pluginens inställningar' },
    da: { sunny: 'Solrigt', partly: 'Skiftende skydække', grey: 'Gråt og tørt', showers: 'Byger', wet: 'Vådt', rainFrom: 'Regn fra {t}', snow: 'Sne', snowFrom: 'Sne fra {t}', storm: 'Torden', fog: 'Tåget',
      sub: 'Maks {a}, min {b} · føles som {c}', wind: 'Vind', rain: 'Nedbør', rise: 'Solopgang', set: 'Solnedgang', dry: 'tørt', dirs: ['N', 'NØ', 'Ø', 'SØ', 'S', 'SV', 'V', 'NV'], setup: 'Angiv din placering i pluginnets indstillinger' },
    nb: { sunny: 'Sol', partly: 'Skiftende skydekke', grey: 'Grått og tørt', showers: 'Byger', wet: 'Vått', rainFrom: 'Regn fra {t}', snow: 'Snø', snowFrom: 'Snø fra {t}', storm: 'Torden', fog: 'Tåke',
      sub: 'Maks {a}, min {b} · føles som {c}', wind: 'Vind', rain: 'Nedbør', rise: 'Soloppgang', set: 'Solnedgang', dry: 'tørt', dirs: ['N', 'NØ', 'Ø', 'SØ', 'S', 'SV', 'V', 'NV'], setup: 'Angi stedet ditt i innstillingene for pluginen' },
    pl: { sunny: 'Słonecznie', partly: 'Zmienne zachmurzenie', grey: 'Szaro i sucho', showers: 'Przelotne opady', wet: 'Mokro', rainFrom: 'Deszcz od {t}', snow: 'Śnieg', snowFrom: 'Śnieg od {t}', storm: 'Burze', fog: 'Mgła',
      sub: 'Maks. {a}, min. {b} · odczuwalna {c}', wind: 'Wiatr', rain: 'Opady', rise: 'Wschód', set: 'Zachód', dry: 'sucho', dirs: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'], setup: 'Ustaw lokalizację w ustawieniach wtyczki' },
    fi: { sunny: 'Aurinkoista', partly: 'Puolipilvistä', grey: 'Harmaata ja poutaa', showers: 'Sadekuuroja', wet: 'Sateista', rainFrom: 'Sadetta klo {t} alkaen', snow: 'Lunta', snowFrom: 'Lunta klo {t} alkaen', storm: 'Ukkosta', fog: 'Sumuista',
      sub: 'Ylin {a}, alin {b} · tuntuu kuin {c}', wind: 'Tuuli', rain: 'Sade', rise: 'Aurinko nousee', set: 'Aurinko laskee', dry: 'poutaa', dirs: ['P', 'KO', 'I', 'KA', 'E', 'LO', 'L', 'LU'], setup: 'Aseta sijainti laajennuksen asetuksissa' }
  };
  var LANG_NAMES = { english: 'en', nederlands: 'nl', dutch: 'nl', deutsch: 'de', german: 'de', francais: 'fr', french: 'fr', espanol: 'es', spanish: 'es', italiano: 'it', italian: 'it', portugues: 'pt', portuguese: 'pt', svenska: 'sv', swedish: 'sv', dansk: 'da', danish: 'da', norsk: 'nb', norwegian: 'nb', no: 'nb', nn: 'nb', polski: 'pl', polish: 'pl', suomi: 'fi', finnish: 'fi' };

  /* ---------- weather icons: one line style in a 24-unit box ---------- */
  var CL = 'M7 15h10.5a4 4 0 0 0 .4-8 6 6 0 0 0-11.6 1.6A3.3 3.3 0 0 0 7 15z';
  var ICONS = {
    sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/>',
    moon: '<path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z"/>',
    partSun: '<path d="M8.5 3v1.6M3 8.5h1.6M4.6 4.6l1.1 1.1M12.4 4.6l-1.1 1.1"/><path d="M5.9 11.4A3.6 3.6 0 0 1 11.6 6.8"/><path d="M9 20h9a3.6 3.6 0 0 0 .3-7.2 5.2 5.2 0 0 0-10 1.4A2.9 2.9 0 0 0 9 20z"/>',
    partMoon: '<path d="M11.5 7.5A4.5 4.5 0 0 1 5.7 3.2a5 5 0 1 0 5.8 4.3z"/><path d="M9 20h9a3.6 3.6 0 0 0 .3-7.2 5.2 5.2 0 0 0-10 1.4A2.9 2.9 0 0 0 9 20z"/>',
    cloud: '<path d="M7 18.5h10.5a4 4 0 0 0 .4-8 6 6 0 0 0-11.6 1.6A3.3 3.3 0 0 0 7 18.5z"/>',
    fog: '<path d="M4 9h16M6 13h12M4 17h16"/>',
    drizzle: '<path d="' + CL + '"/><path d="M9 18.5v1.5M15 18.5v1.5"/>',
    rain: '<path d="' + CL + '"/><path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3"/>',
    snow: '<path d="' + CL + '"/><circle cx="8" cy="19" r=".6"/><circle cx="12" cy="20.5" r=".6"/><circle cx="16" cy="19" r=".6"/>',
    storm: '<path d="' + CL + '"/><path d="M12.5 15l-2 3.5h3l-2 3.5"/>',
    wind: '<path d="M2.5 9h11a2.6 2.6 0 1 0-2.6-2.6M2.5 14h15a2.6 2.6 0 1 1-2.6 2.6"/>',
    drop: '<path d="M12 3.5s-6 6.6-6 10.6a6 6 0 0 0 12 0c0-4-6-10.6-6-10.6z"/>',
    sunrise: '<path d="M3 18h18M7 18a5 5 0 0 1 10 0M12 4v4M9.5 6.5L12 4l2.5 2.5M4.5 13l1.4.8M19.5 13l-1.4.8"/>',
    sunset: '<path d="M3 18h18M7 18a5 5 0 0 1 10 0M12 4v4M9.5 5.5L12 8l2.5-2.5M4.5 13l1.4.8M19.5 13l-1.4.8"/>'
  };
  function kind(code, day, cc) {
    if (code >= 95) return 'storm';
    if ((code >= 71 && code <= 77) || code === 85 || code === 86) return 'snow';
    if (code >= 61 || (code >= 80 && code <= 82)) return 'rain';
    if (code >= 51) return 'drizzle';
    if (code === 45 || code === 48) return 'fog';
    if (cc < 20) return day ? 'sun' : 'moon';
    if (cc < 70) return day ? 'partSun' : 'partMoon';
    return 'cloud';
  }

  /* ---------- helpers ---------- */
  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim(); }
  function fill(s, o) { return s.replace(/\{(\w)\}/g, function (m, k) { return o[k]; }); }
  function f(n) { return Math.round(n * 10) / 10; }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function el(tag, at, parent) { var e = document.createElementNS('http://www.w3.org/2000/svg', tag); for (var k in at) e.setAttribute(k, at[k]); if (parent) parent.appendChild(e); return e; }
  function put(root, k, v) { root.querySelectorAll('[data-wx="' + k + '"]').forEach(function (n) { n.textContent = v || ''; (n.closest('.wx-stat') || n).classList.toggle('hidden', !v); }); }
  var BFT = [1, 6, 12, 20, 29, 39, 50, 62, 75, 89, 103, 118];
  function bft(kmh) { var i = BFT.findIndex(function (v) { return kmh < v; }); return i < 0 ? 12 : i; }

  /* ---------- the model ---------- */
  function build(D, now, cfg) {
    var T = L[cfg.lang], hrs = D.h, off = (D.off || 0) * 1000, n = hrs.time.length;
    var hourly = function (k, t) { return hrs[k][clamp(Math.round((t / 1000 - hrs.time[0]) / 3600), 0, n - 1)]; };
    var at = function (k, t) { var x = (t / 1000 - hrs.time[0]) / 3600, i = clamp(Math.floor(x), 0, n - 2), a = hrs[k][i], b = hrs[k][i + 1]; return a + (b - a) * clamp(x - i, 0, 1); };
    var temp = function (c) { return cfg.imp ? c * 9 / 5 + 32 : c; };
    var deg = function (c) { return Math.round(temp(c)) + '°'; };
    var clock = function (t) { var d = new Date(t + off), h = d.getUTCHours(), m = pad(d.getUTCMinutes()); return cfg.h12 ? ((h + 11) % 12 + 1) + ':' + m + (h < 12 ? ' am' : ' pm') : pad(h) + ':' + m; };
    var hourLabel = function (t) { var h = new Date(t + off).getUTCHours(); return cfg.h12 ? ((h + 11) % 12 + 1) + (h < 12 ? 'a' : 'p') : pad(h); };
    var dec = function (v, k) { return v.toLocaleString(cfg.locale, { minimumFractionDigits: k, maximumFractionDigits: k }); };
    var sr = (D.d.sunrise || []).map(function (s) { return s * 1000; }), ss = (D.d.sunset || []).map(function (s) { return s * 1000; });
    var isDay = function (t) { for (var i = 0; i < sr.length; i++) if (t >= sr[i] && t < ss[i]) return true; return false; };
    var t0 = Math.floor(now / H) * H, t1 = t0 + 24 * H;

    // the sentence: what the next 24 hours bring
    var wetH = [], snowH = 0, storm = false, cs = 0, mm = 0, fog = 0, tmin = 1e9, tmax = -1e9;
    for (var t = t0; t < t1; t += H) {
      var p = hourly('precipitation', t), c = hourly('weather_code', t), tv = hourly('temperature_2m', t);
      mm += p; cs += hourly('cloud_cover', t) / 24; tmin = Math.min(tmin, tv); tmax = Math.max(tmax, tv);
      if (p >= 0.2) { wetH.push(t); if ((c >= 71 && c <= 77) || c === 85 || c === 86) snowH++; }
      if (c >= 95 && t < t0 + 12 * H) storm = true;
      if ((c === 45 || c === 48) && t < t0 + 6 * H) fog++;
    }
    var snowy = snowH > wetH.length / 2, title;
    if (storm) title = T.storm;
    else if (wetH.length && wetH[0] <= now + H) title = snowy ? T.snow : wetH.length > 12 ? T.wet : T.showers;
    else if (wetH.length) title = fill(snowy ? T.snowFrom : T.rainFrom, { t: clock(wetH[0]) });
    else if (fog >= 3) title = T.fog;
    else title = cs < 25 ? T.sunny : cs < 65 ? T.partly : T.grey;

    var wk = at('wind_speed_10m', now), wind = cfg.wind === 'bft' ? bft(wk) + ' Bft' : cfg.wind === 'ms' ? Math.round(wk / 3.6) + ' m/s' : cfg.wind === 'mph' ? Math.round(wk / 1.609) + ' mph' : Math.round(wk) + ' km/h';
    var rain = mm < 0.1 ? T.dry : cfg.imp ? dec(mm / 25.4, mm / 25.4 < 1 ? 2 : 1) + ' in' : dec(mm, mm < 10 ? 1 : 0) + ' mm';
    var sun = null;
    for (var i = 0; i < sr.length && !sun; i++) { if (sr[i] > now) sun = [T.rise, sr[i], 'sunrise']; else if (ss[i] > now) sun = [T.set, ss[i], 'sunset']; }
    var day = new Intl.DateTimeFormat(cfg.locale, { weekday: 'long', day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(now + off)).replace('.', '');
    return {
      now: now, t0: t0, off: off, at: at, hourly: hourly, isDay: isDay, temp: temp, deg: deg, hourLabel: hourLabel, sunIcon: sun ? sun[2] : 'sunrise',
      tmin: temp(tmin), tmax: temp(tmax), maxmm: 0,
      text: {
        kicker: [cfg.place, day].filter(Boolean).join(' · '),
        temp: deg(at('temperature_2m', now)), title: title,
        sub: fill(T.sub, { a: deg(tmax), b: deg(tmin), c: deg(at('apparent_temperature', now)) }),
        wind: wind + ' ' + T.dirs[Math.round(at('wind_direction_10m', now) / 45) % 8], windl: T.wind,
        rain: rain, rainl: T.rain,
        sun: sun ? clock(sun[1]) : '', sunl: sun ? sun[0] : ''
      }
    };
  }

  /* ---------- drawing ---------- */
  var VIEW = {
    full: { hours: 24, every: 3, icon: 28, gap: 64, rain: 22, label: true },
    half_horizontal: { hours: 24, every: 3, icon: 18, gap: 4, rain: 10, label: true },
    half_vertical: { hours: 12, every: 2, icon: 24, gap: 34, rain: 18, label: true },
    quadrant: { hours: 12, every: 3, icon: 20, gap: 16, rain: 10, label: true }
  };
  function palette(root) {
    var cls = (root.closest('.screen') || {}).className || '';
    return { bits: /screen--1bit/.test(cls) ? 1 : /screen--2bit/.test(cls) ? 2 : /screen--color-/.test(cls) ? 0 : 4 };
  }
  function draw(root, M, P, lg) {
    var svg = root.querySelector('.wx-svg'), W = Math.round(root.clientWidth), HH = Math.round(root.clientHeight), view = root.dataset.view, V = VIEW[view] || VIEW.full;
    if (!W || !HH) return;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + HH); svg.setAttribute('width', W); svg.setAttribute('height', HH);
    svg.setAttribute('font-family', '"Inter Variable", Inter, "Helvetica Neue", Arial, sans-serif');
    svg.innerHTML = '';
    var u = lg ? 1.3 : 1, pad0 = parseFloat(getComputedStyle(root).getPropertyValue('--pad')) || 20;
    var t0 = M.t0, t1 = t0 + V.hours * H, X0 = pad0, X1 = W - pad0, X = function (t) { return X0 + (t - t0) / (t1 - t0) * (X1 - X0); };
    var text = function (x, y, s, cls) { var e = el('text', { x: f(x), y: f(y), class: cls, fill: '#000', 'text-anchor': 'middle' }, svg); e.textContent = s; return e; };
    var defs = el('defs', {}, svg), np = el('pattern', { id: 'wx-n', width: 5, height: 5, patternUnits: 'userSpaceOnUse' }, defs);
    el('rect', { width: 5, height: 5, fill: '#fff' }, np); el('rect', { x: 1, y: 1, width: 1, height: 1, fill: '#000' }, np);
    var NIGHT = P.bits === 1 ? 'url(#wx-n)' : '#ececec';

    // vertical rhythm: below the words (the big number reaches below its box)
    var box = root.getBoundingClientRect(), z = box.width / W || 1, head = root.querySelector('.wx-head').getBoundingClientRect(), tEl = root.querySelector('[data-wx="temp"]');
    var below = (head.bottom - box.top) / z;
    if (tEl) { var tr = tEl.getBoundingClientRect(); below = Math.max(below, (tr.top - box.top) / z + parseFloat(getComputedStyle(tEl).fontSize) * 0.95); }
    var iconY = below + (V.gap + V.icon / 2) * u, chartTop = iconY + (V.icon / 2 + 22) * u;
    var rainBot = HH - pad0 - (V.icon < 22 ? 18 : 22) * u, rainTop = rainBot - V.rain * u, chartBot = rainTop - (V.icon < 22 ? 6 : 14) * u;

    // night
    var nb = null;
    for (var t = t0; t <= t1; t += 6e5) {
      var dk = !M.isDay(t);
      if (dk && nb === null) nb = t;
      if ((!dk || t + 6e5 > t1) && nb !== null) { el('rect', { x: f(X(nb)), y: f(iconY - (V.icon / 2 + 10) * u), width: f(X(Math.min(t, t1)) - X(nb)), height: f(rainBot - iconY + (V.icon / 2 + 10) * u), fill: NIGHT, rx: f(8 * u) }, svg); nb = null; }
    }
    // icons
    var start = t0 + (V.every === 3 ? 2 : 1) * H;
    for (t = start; t < t1; t += V.every * H) {
      var cc = 0, code = 0;
      for (var q = -1; q <= 1; q++) { cc += M.hourly('cloud_cover', t + q * H) / 3; code = Math.max(code, M.hourly('weather_code', t + q * H)); }
      var s = V.icon * u, g = el('g', { transform: 'translate(' + f(X(t) - s / 2) + ' ' + f(iconY - s / 2) + ') scale(' + f(s / 24) + ')', fill: 'none', stroke: '#000', 'stroke-width': f(1.9 * u / (s / 24)), 'stroke-linecap': 'round', 'stroke-linejoin': 'round', class: 'wx-icon wx-icon--' + kind(code, M.isDay(t), cc) }, svg);
      g.innerHTML = ICONS[kind(code, M.isDay(t), cc)];
    }
    // temperature: a monotone cubic through the hourly values (Fritsch and Carlson): smooth, never past a peak
    var temps = []; for (t = t0; t <= t1; t += H) temps.push([t, M.temp(M.hourly('temperature_2m', t))]);
    var lo = Math.min.apply(null, temps.map(function (p) { return p[1]; })), hi = Math.max.apply(null, temps.map(function (p) { return p[1]; }));
    var span = Math.max(hi - lo, M.temp(10) - M.temp(0)), mid = (hi + lo) / 2, TY = function (v) { return chartBot - (v - mid + span / 2) / span * (chartBot - chartTop); };
    var pts = temps.map(function (p) { return [X(p[0]), TY(p[1])]; }), n = pts.length, dl = [], m = [], i;
    for (i = 0; i < n - 1; i++) dl.push((pts[i + 1][1] - pts[i][1]) / (pts[i + 1][0] - pts[i][0]));
    for (i = 0; i < n; i++) m.push(i === 0 ? dl[0] : i === n - 1 ? dl[n - 2] : dl[i - 1] * dl[i] <= 0 ? 0 : (dl[i - 1] + dl[i]) / 2);
    for (i = 0; i < n - 1; i++) { if (!dl[i]) { m[i] = m[i + 1] = 0; continue; } var a2 = m[i] / dl[i], b2 = m[i + 1] / dl[i], h2 = a2 * a2 + b2 * b2; if (h2 > 9) { var k3 = 3 / Math.sqrt(h2); m[i] = k3 * a2 * dl[i]; m[i + 1] = k3 * b2 * dl[i]; } }
    var d = 'M' + f(pts[0][0]) + ' ' + f(pts[0][1]);
    for (i = 0; i < n - 1; i++) { var dx = (pts[i + 1][0] - pts[i][0]) / 3; d += ' C' + f(pts[i][0] + dx) + ' ' + f(pts[i][1] + m[i] * dx) + ' ' + f(pts[i + 1][0] - dx) + ' ' + f(pts[i + 1][1] - m[i + 1] * dx) + ' ' + f(pts[i + 1][0]) + ' ' + f(pts[i + 1][1]); }
    el('path', { d: d, fill: 'none', stroke: '#000', 'stroke-width': f(3 * u), 'stroke-linejoin': 'round', 'stroke-linecap': 'round', class: 'wx-temp' }, svg);
    for (t = start; t < t1; t += V.every * H) {
      var tv = M.temp(M.hourly('temperature_2m', t));
      el('circle', { cx: f(X(t)), cy: f(TY(tv)), r: f(3.5 * u), fill: '#fff', stroke: '#000', 'stroke-width': f(2.2 * u), class: 'wx-dot' }, svg);
      text(X(t), TY(tv) - 12 * u, Math.round(tv) + '°', 't1');
    }
    // now
    el('line', { x1: f(X(M.now)), y1: f(iconY - (V.icon / 2 + 10) * u), x2: f(X(M.now)), y2: f(rainBot), stroke: '#000', 'stroke-width': f(1.5 * u), 'stroke-dasharray': f(2 * u) + ' ' + f(3 * u) }, svg);
    // rain per hour, then the hours
    var maxmm = 0; for (t = t0; t < t1; t += H) maxmm = Math.max(maxmm, M.hourly('precipitation', t));
    for (t = t0; t < t1; t += H) {
      var mm = M.hourly('precipitation', t), bh = mm < 0.05 ? 0 : Math.max(2 * u, Math.min(1, mm / Math.max(2, maxmm)) * (rainBot - rainTop));
      if (bh) el('rect', { x: f(X(t) + 1.5 * u), y: f(rainBot - bh), width: f((X1 - X0) / V.hours - 3 * u), height: f(bh), fill: '#000', rx: f(1.5 * u), class: 'wx-rain' }, svg);
    }
    el('line', { x1: f(X0), y1: f(rainBot + 0.5), x2: f(X1), y2: f(rainBot + 0.5), stroke: '#000', 'stroke-width': f(1.5 * u) }, svg);
    for (t = t0 + H; t < t1; t += H) {
      var hr = new Date(t + M.off).getUTCHours(), x = X(t), major = hr % V.every === 0;
      el('line', { x1: f(x), y1: f(rainBot), x2: f(x), y2: f(rainBot + (major ? 7 : 4) * u), stroke: '#000', 'stroke-width': f(1.3 * u) }, svg);
      if (major) text(x, rainBot + (V.icon < 22 ? 16 : 20) * u, M.hourLabel(t), 't2');
    }
  }

  /* ---------- per-root rendering ---------- */
  function render(root) {
    var ds = root.dataset, loc = String(ds.locale || 'en'), lang = norm(ds.lang);
    if (!lang || lang === 'auto') lang = norm(loc).slice(0, 2);
    lang = L[lang] ? lang : LANG_NAMES[lang] || 'en';
    var locale = norm(loc).slice(0, 2) === lang ? loc : lang, us = /en-us/i.test(loc);
    var clock = norm(ds.clock), units = norm(ds.units), wind = norm(ds.wind);
    var imp = units === 'imperial' || (units !== 'metric' && us);
    var cfg = { lang: lang, locale: locale, h12: clock === '12' || (clock !== '24' && us), imp: imp, place: ds.place || '',
      wind: wind && wind !== 'auto' ? wind : imp ? 'mph' : lang === 'nl' ? 'bft' : lang === 'nb' || lang === 'sv' || lang === 'da' || lang === 'fi' ? 'ms' : 'kmh' };
    var D = null;
    try { D = JSON.parse(root.querySelector('.wx-data').textContent); } catch (e) { }
    if (!D || !D.h || !D.h.time) { put(root, 'title', L[lang].setup); return; }
    var now = parseInt(ds.ts, 10) * 1000 || Date.now();
    var M = build(D, now, cfg);
    for (var k in M.text) put(root, k, M.text[k]);
    root.querySelectorAll('[data-wx-icon="sun"]').forEach(function (s) { s.innerHTML = ICONS[M.sunIcon]; });
    draw(root, M, palette(root), !!root.closest('.screen--lg'));
  }
  function run() { document.querySelectorAll('.wx').forEach(function (r) { try { render(r); } catch (e) { console.error(e); } }); }
  window.DAYCAST = { run: run };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else setTimeout(run, 0);
  window.addEventListener('load', run);
  if (document.fonts) document.fonts.ready.then(run);
  setTimeout(run, 300); setTimeout(run, 1200);
}();
