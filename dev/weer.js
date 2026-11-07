/* Daycast: the next day at a glance. The temperature now, one sentence about the weather, wind, rain and
   the sun, and a calm chart: weather icons, one smooth temperature line, rain per hour and the night.
   Open-Meteo comes in through the polling URL; the page draws. Edit this file, then run: node dev/build.mjs */
!function () {
  var H = 36e5;

  /* ---------- text ---------- */
  var L = {
    en: { none: 'No forecast right now', retry: 'Next try at the next refresh.', updated: 'Updated', sunny: 'Sunny', partly: 'Partly cloudy', grey: 'Grey and dry', showers: 'Showers', wet: 'Wet', rainFrom: 'Rain from {t}', snow: 'Snow', snowFrom: 'Snow from {t}', storm: 'Thunderstorms', fog: 'Foggy',
      sub: 'High {a}, low {b} · feels like {c}', wind: 'Wind', rain: 'Rain', rise: 'Sunrise', set: 'Sunset', dry: 'dry', dirs: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'], setup: 'Set your location in the plugin settings' },
    nl: { none: 'Even geen weerbericht', retry: 'Bij de volgende verversing proberen we het opnieuw.', updated: 'Bijgewerkt', sunny: 'Zonnig', partly: 'Wisselend bewolkt', grey: 'Grijs en droog', showers: 'Buien', wet: 'Nat', rainFrom: 'Regen vanaf {t}', snow: 'Sneeuw', snowFrom: 'Sneeuw vanaf {t}', storm: 'Onweer', fog: 'Mistig',
      sub: 'Max {a}, min {b} · voelt als {c}', wind: 'Wind', rain: 'Neerslag', rise: 'Zon op', set: 'Zon onder', dry: 'droog', dirs: ['N', 'NO', 'O', 'ZO', 'Z', 'ZW', 'W', 'NW'], setup: 'Stel je locatie in bij de plugin-instellingen' },
    de: { none: 'Gerade keine Vorhersage', retry: 'Beim nächsten Aktualisieren versuchen wir es wieder.', updated: 'Aktualisiert', sunny: 'Sonnig', partly: 'Wechselnd bewölkt', grey: 'Grau und trocken', showers: 'Schauer', wet: 'Nass', rainFrom: 'Regen ab {t}', snow: 'Schnee', snowFrom: 'Schnee ab {t}', storm: 'Gewitter', fog: 'Neblig',
      sub: 'Max {a}, min {b} · gefühlt {c}', wind: 'Wind', rain: 'Niederschlag', rise: 'Sonne auf', set: 'Sonne unter', dry: 'trocken', dirs: ['N', 'NO', 'O', 'SO', 'S', 'SW', 'W', 'NW'], setup: 'Standort in den Plugin-Einstellungen festlegen' },
    fr: { none: 'Pas de prévisions pour l’instant', retry: 'Nouvel essai à la prochaine actualisation.', updated: 'Mis à jour', sunny: 'Ensoleillé', partly: 'Variable', grey: 'Gris et sec', showers: 'Averses', wet: 'Humide', rainFrom: 'Pluie dès {t}', snow: 'Neige', snowFrom: 'Neige dès {t}', storm: 'Orages', fog: 'Brumeux',
      sub: 'Max {a}, min {b} · ressenti {c}', wind: 'Vent', rain: 'Pluie', rise: 'Lever', set: 'Coucher', dry: 'sec', dirs: ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'], setup: 'Indiquez votre lieu dans les réglages du plugin' },
    es: { none: 'Sin previsión por ahora', retry: 'Lo intentamos de nuevo en la próxima actualización.', updated: 'Actualizado', sunny: 'Soleado', partly: 'Nubes y claros', grey: 'Gris y seco', showers: 'Chubascos', wet: 'Lluvioso', rainFrom: 'Lluvia desde las {t}', snow: 'Nieve', snowFrom: 'Nieve desde las {t}', storm: 'Tormentas', fog: 'Niebla',
      sub: 'Máx {a}, mín {b} · sensación {c}', wind: 'Viento', rain: 'Lluvia', rise: 'Amanecer', set: 'Atardecer', dry: 'seco', dirs: ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'], setup: 'Indica tu ubicación en los ajustes del plugin' },
    it: { none: 'Nessuna previsione al momento', retry: 'Riproviamo al prossimo aggiornamento.', updated: 'Aggiornato', sunny: 'Soleggiato', partly: 'Variabile', grey: 'Grigio e asciutto', showers: 'Rovesci', wet: 'Piovoso', rainFrom: 'Pioggia dalle {t}', snow: 'Neve', snowFrom: 'Neve dalle {t}', storm: 'Temporali', fog: 'Nebbia',
      sub: 'Max {a}, min {b} · percepita {c}', wind: 'Vento', rain: 'Pioggia', rise: 'Alba', set: 'Tramonto', dry: 'asciutto', dirs: ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'], setup: 'Imposta la posizione nelle impostazioni del plugin' },
    pt: { none: 'Sem previsão de momento', retry: 'Tentamos de novo na próxima atualização.', updated: 'Atualizado', sunny: 'Ensolarado', partly: 'Sol e nuvens', grey: 'Cinzento e seco', showers: 'Aguaceiros', wet: 'Chuvoso', rainFrom: 'Chuva a partir das {t}', snow: 'Neve', snowFrom: 'Neve a partir das {t}', storm: 'Trovoada', fog: 'Nevoeiro',
      sub: 'Máx {a}, mín {b} · sensação {c}', wind: 'Vento', rain: 'Chuva', rise: 'Nascer', set: 'Pôr do sol', dry: 'seco', dirs: ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'], setup: 'Defina a localização nas definições do plugin' },
    sv: { none: 'Ingen prognos just nu', retry: 'Vi försöker igen vid nästa uppdatering.', updated: 'Uppdaterad', sunny: 'Soligt', partly: 'Växlande molnighet', grey: 'Grått och torrt', showers: 'Skurar', wet: 'Blött', rainFrom: 'Regn från {t}', snow: 'Snö', snowFrom: 'Snö från {t}', storm: 'Åska', fog: 'Dimma',
      sub: 'Max {a}, min {b} · känns som {c}', wind: 'Vind', rain: 'Nederbörd', rise: 'Soluppgång', set: 'Solnedgång', dry: 'torrt', dirs: ['N', 'NO', 'O', 'SO', 'S', 'SV', 'V', 'NV'], setup: 'Ange din plats i pluginens inställningar' },
    da: { none: 'Ingen prognose lige nu', retry: 'Vi prøver igen ved næste opdatering.', updated: 'Opdateret', sunny: 'Solrigt', partly: 'Skiftende skydække', grey: 'Gråt og tørt', showers: 'Byger', wet: 'Vådt', rainFrom: 'Regn fra {t}', snow: 'Sne', snowFrom: 'Sne fra {t}', storm: 'Torden', fog: 'Tåget',
      sub: 'Maks {a}, min {b} · føles som {c}', wind: 'Vind', rain: 'Nedbør', rise: 'Solopgang', set: 'Solnedgang', dry: 'tørt', dirs: ['N', 'NØ', 'Ø', 'SØ', 'S', 'SV', 'V', 'NV'], setup: 'Angiv din placering i pluginnets indstillinger' },
    nb: { none: 'Ingen varsel akkurat nå', retry: 'Vi prøver igjen ved neste oppdatering.', updated: 'Oppdatert', sunny: 'Sol', partly: 'Skiftende skydekke', grey: 'Grått og tørt', showers: 'Byger', wet: 'Vått', rainFrom: 'Regn fra {t}', snow: 'Snø', snowFrom: 'Snø fra {t}', storm: 'Torden', fog: 'Tåke',
      sub: 'Maks {a}, min {b} · føles som {c}', wind: 'Vind', rain: 'Nedbør', rise: 'Soloppgang', set: 'Solnedgang', dry: 'tørt', dirs: ['N', 'NØ', 'Ø', 'SØ', 'S', 'SV', 'V', 'NV'], setup: 'Angi stedet ditt i innstillingene for pluginen' },
    pl: { none: 'Brak prognozy', retry: 'Spróbujemy ponownie przy następnym odświeżeniu.', updated: 'Zaktualizowano', sunny: 'Słonecznie', partly: 'Zmienne zachmurzenie', grey: 'Szaro i sucho', showers: 'Przelotne opady', wet: 'Mokro', rainFrom: 'Deszcz od {t}', snow: 'Śnieg', snowFrom: 'Śnieg od {t}', storm: 'Burze', fog: 'Mgła',
      sub: 'Maks. {a}, min. {b} · odczuwalna {c}', wind: 'Wiatr', rain: 'Opady', rise: 'Wschód', set: 'Zachód', dry: 'sucho', dirs: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'], setup: 'Ustaw lokalizację w ustawieniach wtyczki' },
    fi: { none: 'Ei ennustetta juuri nyt', retry: 'Yritämme uudelleen seuraavalla päivityksellä.', updated: 'Päivitetty', sunny: 'Aurinkoista', partly: 'Puolipilvistä', grey: 'Harmaata ja poutaa', showers: 'Sadekuuroja', wet: 'Sateista', rainFrom: 'Sadetta klo {t} alkaen', snow: 'Lunta', snowFrom: 'Lunta klo {t} alkaen', storm: 'Ukkosta', fog: 'Sumuista',
      sub: 'Ylin {a}, alin {b} · tuntuu kuin {c}', wind: 'Tuuli', rain: 'Sade', rise: 'Aurinko nousee', set: 'Aurinko laskee', dry: 'poutaa', dirs: ['P', 'KO', 'I', 'KA', 'E', 'LO', 'L', 'LU'], setup: 'Aseta sijainti laajennuksen asetuksissa' }
  };
  var LANG_NAMES = { english: 'en', nederlands: 'nl', dutch: 'nl', deutsch: 'de', german: 'de', francais: 'fr', french: 'fr', espanol: 'es', spanish: 'es', italiano: 'it', italian: 'it', portugues: 'pt', portuguese: 'pt', svenska: 'sv', swedish: 'sv', dansk: 'da', danish: 'da', norsk: 'nb', norwegian: 'nb', no: 'nb', nn: 'nb', polski: 'pl', polish: 'pl', suomi: 'fi', finnish: 'fi' };

  /* ---------- weather icons: one line style in a 24-unit box ---------- */
  var CL = 'M7 15h10.5a4 4 0 0 0 .4-8 6 6 0 0 0-11.6 1.6A3.3 3.3 0 0 0 7 15z';
  var ICONS = {
    sun: '<circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/>',
    moon: '<path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z"/>',
    partSun: '<path d="M8.5 3v1.6M3 8.5h1.6M4.6 4.6l1.1 1.1M12.4 4.6l-1.1 1.1"/><path d="M5.9 11.4A3.6 3.6 0 0 1 11.6 6.8"/><path fill="#fff" d="M9 20h9a3.6 3.6 0 0 0 .3-7.2 5.2 5.2 0 0 0-10 1.4A2.9 2.9 0 0 0 9 20z"/>',
    partMoon: '<path d="M11.5 7.5A4.5 4.5 0 0 1 5.7 3.2a5 5 0 1 0 5.8 4.3z"/><path fill="#fff" d="M9 20h9a3.6 3.6 0 0 0 .3-7.2 5.2 5.2 0 0 0-10 1.4A2.9 2.9 0 0 0 9 20z"/>',
    cloud: '<path fill="#fff" d="M7 18.5h10.5a4 4 0 0 0 .4-8 6 6 0 0 0-11.6 1.6A3.3 3.3 0 0 0 7 18.5z"/>',
    fog: '<path d="M4 9h16M6 13h12M4 17h16"/>',
    drizzle: '<path fill="#fff" d="' + CL + '"/><path d="M9 18.5v1.5M15 18.5v1.5"/>',
    rain: '<path fill="#fff" d="' + CL + '"/><path d="M8 18l-1 3M12 18l-1 3M16 18l-1 3"/>',
    snow: '<path fill="#fff" d="' + CL + '"/><circle cx="8" cy="19" r=".6"/><circle cx="12" cy="20.5" r=".6"/><circle cx="16" cy="19" r=".6"/>',
    storm: '<path fill="#fff" d="' + CL + '"/><path d="M12.5 15l-2 3.5h3l-2 3.5"/>',
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
    var day = new Intl.DateTimeFormat(cfg.locale, { weekday: 'long', day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(now + off)).replace(/\.$/, '');
    return {
      now: now, t0: t0, off: off, at: at, hourly: hourly, isDay: isDay, temp: temp, deg: deg, hourLabel: hourLabel, sunIcon: sun ? sun[2] : 'sunrise', nowIcon: kind(hourly('weather_code', now), isDay(now), hourly('cloud_cover', now)), mmUnit: cfg.imp ? 'in/h' : 'mm/h', imp: cfg.imp, locale: cfg.locale,
      tmin: temp(tmin), tmax: temp(tmax), maxmm: 0,
      text: {
        place: cfg.place, date: day, updated: T.updated + ' ' + clock(now),
        temp: deg(at('temperature_2m', now)), title: title,
        sub: fill(T.sub, { a: deg(tmax), b: deg(tmin), c: deg(at('apparent_temperature', now)) }),
        wind: wind + ' ' + T.dirs[Math.round(at('wind_direction_10m', now) / 45) % 8], windl: T.wind,
        rain: rain, rainl: T.rain,
        sun: sun ? clock(sun[1]) : '', sunl: sun ? sun[0] : ''
      }
    };
  }

  /* ---------- drawing: Inter at fixed sizes, hairlines, rain as a shaded area, a pill for now ---------- */
  var FONT = "var(--framework-typeface, 'Inter Variable'), 'Inter Variable', Inter, sans-serif";
  var VIEW = {
    full: { hours: 24, every: 3, icon: 26, gap: 30, rain: 40, val: 22, hour: 17, legend: true },
    half_horizontal: { hours: 24, every: 3, icon: 18, gap: 10, rain: 16, val: 16, hour: 14 },
    half_vertical: { hours: 12, every: 2, icon: 22, gap: 26, rain: 30, val: 19, hour: 15 },
    quadrant: { hours: 12, every: 3, icon: 18, gap: 10, rain: 14, val: 16, hour: 14 }
  };
  function palette(root) {
    var cls = (root.closest('.screen') || {}).className || '';
    return { bits: /screen--1bit/.test(cls) ? 1 : /screen--2bit/.test(cls) ? 2 : /screen--color-/.test(cls) && !/color-full/.test(cls) ? 0 : 4 };
  }
  // dark mode turns the framework's text white on black: ink follows the text colour, paper is the background
  function paper(root) { return root.closest('.screen--dark-mode') ? '#000' : '#fff'; }
  // monotone cubic through the points (same as d3.curveMonotoneX): flat runs stay flat, never past a peak
  function monotone(pts) {
    var n = pts.length, t = new Array(n), i, sg = function (v) { return v < 0 ? -1 : 1; };
    for (i = 1; i < n - 1; i++) {
      var h0 = pts[i][0] - pts[i - 1][0], h1 = pts[i + 1][0] - pts[i][0], s0 = (pts[i][1] - pts[i - 1][1]) / h0, s1 = (pts[i + 1][1] - pts[i][1]) / h1, p = (s0 * h1 + s1 * h0) / (h0 + h1);
      t[i] = (sg(s0) + sg(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
    }
    var edge = function (a, b, tb) { var h = b[0] - a[0]; return h ? (3 * (b[1] - a[1]) / h - tb) / 2 : tb; };
    t[0] = edge(pts[0], pts[1], t[1] || 0); t[n - 1] = edge(pts[n - 2], pts[n - 1], t[n - 2] || 0);
    var d = 'M' + f(pts[0][0]) + ' ' + f(pts[0][1]);
    for (i = 0; i < n - 1; i++) { var dx = (pts[i + 1][0] - pts[i][0]) / 3; d += 'C' + f(pts[i][0] + dx) + ' ' + f(pts[i][1] + dx * t[i]) + ' ' + f(pts[i + 1][0] - dx) + ' ' + f(pts[i + 1][1] - dx * t[i + 1]) + ' ' + f(pts[i + 1][0]) + ' ' + f(pts[i + 1][1]); }
    return d;
  }
  function draw(root, M, P, lg) {
    var svg = root.querySelector('.wx-svg'), W = Math.round(root.clientWidth), HH = Math.round(root.clientHeight), view = root.dataset.view, V = Object.assign({}, VIEW[view] || VIEW.full);
    if (W < 320 * (lg ? 1.3 : 1)) { V.hours = 12; V.every = 3; V.icon = Math.min(V.icon, 18); V.val = Math.min(V.val, 15); V.hour = Math.min(V.hour, 14); }
    if (!W || !HH) return;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + HH); svg.setAttribute('width', W); svg.setAttribute('height', HH);
    svg.innerHTML = '';
    var u = lg ? 1.3 : 1, pad0 = parseFloat(getComputedStyle(root).getPropertyValue('--pad')) || 24, INK = 'currentColor', PAPER = paper(root), GRAY = '#aaa';
    var t0 = M.t0, t1 = t0 + V.hours * H, X0 = pad0, X1 = W - pad0, X = function (t) { return X0 + (t - t0) / (t1 - t0) * (X1 - X0); };
    var txt = function (x, y, s, size, weight, anchor, fillc) { var e = el('text', { x: f(x), y: f(y), 'font-family': FONT, 'font-size': f(size * u), 'font-weight': weight || 400, fill: fillc || INK, 'text-anchor': anchor || 'middle' }, svg); e.textContent = s; return e; };
    var gray = P.bits === 4 || P.bits === 2;
    var defs = el('defs', {}, svg), dots = el('pattern', { id: 'wx-dots-' + view, width: 2, height: 2, patternUnits: 'userSpaceOnUse' }, defs);
    el('rect', { width: 1, height: 1, fill: INK }, dots);
    var SHADE = gray ? GRAY : 'url(#wx-dots-' + view + ')';

    // vertical rhythm: words on top, the footer at the bottom, the chart in between
    var box = root.getBoundingClientRect(), z = box.width / W || 1, head = root.querySelector('.wx-head').getBoundingClientRect(), tEl = root.querySelector('[data-wx="temp"]');
    var below = (head.bottom - box.top) / z;
    if (tEl) { var tr = tEl.getBoundingClientRect(); below = Math.max(below, (tr.top - box.top) / z + parseFloat(getComputedStyle(tEl).fontSize) * 0.9); }
    var foot = root.querySelector('.wx-foot'), footTop = foot && foot.offsetParent ? (foot.getBoundingClientRect().top - box.top) / z : HH - pad0 + 6 * u;
    var base = footTop - (V.hour + (foot && foot.offsetParent ? 38 : 22)) * u, rainTop = base - V.rain * u, iconY = below + (V.gap + V.icon / 2) * u, chartTop = iconY + (V.icon / 2 + V.val + 10) * u, chartBot = rainTop - 8 * u;
    if (foot && foot.offsetParent) {   // a quiet rule above the footer: light grey, or sparse dots without grey
      var fy = Math.floor(footTop - 11 * u) + 0.5;
      el('line', { x1: f(X0), y1: fy, x2: f(X1), y2: fy, stroke: (P.bits === 4 || P.bits === 2) ? '#ccc' : INK, 'stroke-width': 1, 'stroke-dasharray': (P.bits === 4 || P.bits === 2) ? '' : '1 4' }, svg);
    }

    // hairlines between the three-hour steps
    var start = t0 + (V.every === 3 ? 2 : 1) * H;
    for (var t = start + V.every * H / 2; t < t1; t += V.every * H) {
      var gx = Math.floor(X(t)) + 0.5;
      el('line', { x1: gx, y1: f(iconY - V.icon / 2 * u), x2: gx, y2: f(base), stroke: gray ? GRAY : INK, 'stroke-width': 1, 'stroke-dasharray': gray ? '' : '1 3' }, svg);
    }
    // rain: a shaded area under a dotted scale line
    var mm = [], maxmm = 0; for (t = t0; t <= t1; t += H) { var v = Math.max(0, M.hourly('precipitation', t)); mm.push([X(t), v]); maxmm = Math.max(maxmm, v); }
    var scale = M.imp ? Math.max(0.1, Math.ceil(maxmm / 25.4 * 10) / 10) * 25.4 : Math.max(2, Math.ceil(maxmm));
    var ry = function (v) { return base - Math.min(1, v / scale) * (base - rainTop); };
    if (maxmm >= 0.05) el('path', { d: monotone(mm.map(function (p) { return [p[0], ry(p[1])]; })) + 'L' + f(X1) + ' ' + f(base) + 'L' + f(X0) + ' ' + f(base) + 'Z', fill: SHADE, class: 'wx-rain' }, svg);
    for (var x = X0; x < X1; x += 4 * u) el('rect', { x: f(x), y: f(rainTop), width: 1, height: 1, fill: INK }, svg);
    if (V.legend) {
      var lab = (M.imp ? (scale / 25.4).toLocaleString(M.locale) : scale) + ' ' + M.mmUnit, lg2 = txt(X1 - 5 * u, rainTop + 17 * u, lab, 13, 500, 'end'), lw = lg2.getComputedTextLength() + 10 * u;
      svg.insertBefore(el('rect', { x: f(X1 - lw), y: f(rainTop + 3 * u), width: f(lw), height: f(19 * u), fill: PAPER }, svg), lg2);
    }
    el('rect', { x: f(X0), y: f(base), width: f(X1 - X0), height: 1, fill: INK }, svg);

    // temperature: one smooth line, open points with their values every three hours
    var temps = []; for (t = t0; t <= t1; t += H) temps.push([t, M.temp(M.hourly('temperature_2m', t))]);
    var lo = Math.min.apply(null, temps.map(function (p) { return p[1]; })), hi = Math.max.apply(null, temps.map(function (p) { return p[1]; }));
    var span = Math.max(hi - lo, M.temp(10) - M.temp(0)), mid = (hi + lo) / 2;
    // tall slots: at most 14 px per degree, centred, so the line stays calm
    var room = chartBot - chartTop, perDeg = Math.min(room / span, 14 * u * (M.imp ? 5 / 9 : 1)), cy = (chartTop + chartBot) / 2;
    var TY = function (v) { return cy - (v - mid) * perDeg; };
    el('path', { d: monotone(temps.map(function (p) { return [X(p[0]), TY(p[1])]; })), fill: 'none', stroke: INK, 'stroke-width': f(2.5 * u), 'stroke-linejoin': 'round', 'stroke-linecap': 'round', class: 'wx-temp' }, svg);
    for (t = start; t < t1; t += V.every * H) {
      var tv = M.temp(M.hourly('temperature_2m', t)), px = X(t), py = TY(tv);
      el('circle', { cx: f(px), cy: f(py), r: f(4.5 * u), fill: PAPER, stroke: INK, 'stroke-width': f(2 * u), class: 'wx-dot' }, svg);
      txt(clamp(px, X0 + 12 * u, X1 - 12 * u), py - 12 * u, Math.round(tv) + '°', V.val, 600);
      var cc = 0, code = 0;
      for (var q = -1; q <= 1; q++) { cc += M.hourly('cloud_cover', t + q * H) / 3; code = Math.max(code, M.hourly('weather_code', t + q * H)); }
      var s2 = V.icon * u, k = kind(code, M.isDay(t), cc), g = el('g', { transform: 'translate(' + f(px - s2 / 2) + ' ' + f(iconY - s2 / 2) + ') scale(' + f(s2 / 24) + ')', fill: 'none', stroke: INK, 'stroke-width': f(2 * u / (s2 / 24)), 'stroke-linecap': 'round', 'stroke-linejoin': 'round', class: 'wx-icon wx-icon--' + k }, svg);
      g.innerHTML = ICONS[k].replace(/#fff/g, PAPER);
    }
    // hours below the base line, now in a black pill
    var nx = X(M.now), pillH = (V.hour + 9) * u, pillY = base + 8 * u;
    for (t = t0 + H; t < t1; t += H) {
      var hr = new Date(t + M.off).getUTCHours(), hx = X(t);
      if (hr % V.every === 0 && Math.abs(hx - nx) > 34 * u) txt(hx, pillY + pillH / 2 + V.hour * 0.36 * u, M.hourLabel(t), V.hour, 600);
    }
    var nl = txt(nx, pillY + pillH / 2 + V.hour * 0.36 * u, M.hourLabel(M.now), V.hour, 600, 'middle', PAPER), pw = Math.max(30 * u, nl.getComputedTextLength() + pillH * 0.7);
    var px0 = clamp(nx - pw / 2, X0 - 2, X1 - pw + 2);
    nl.setAttribute('x', f(px0 + pw / 2));
    svg.insertBefore(el('rect', { x: f(px0), y: f(pillY), width: f(pw), height: f(pillH), rx: f(pillH / 2), fill: INK }, svg), nl);
    el('line', { x1: f(nx), y1: f(iconY - V.icon / 2 * u), x2: f(nx), y2: f(pillY), stroke: INK, 'stroke-width': f(1.5 * u), 'stroke-dasharray': f(2 * u) + ' ' + f(3 * u) }, svg);
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
    if (!D || !D.h || !D.h.time) {   // no forecast: say so calmly, with a cloud
      put(root, 'title', ds.ll ? L[lang].none : L[lang].setup); put(root, 'sub', ds.ll ? L[lang].retry : '');
      put(root, 'place', cfg.place);
      root.querySelectorAll('[data-wx-icon="now"]').forEach(function (s) { s.innerHTML = ICONS.cloud.replace(/#fff/g, paper(root)); });
      root.querySelectorAll('.wx-stats, .wx-temp, .wx-date').forEach(function (n) { n.classList.add('hidden'); });
      return;
    }
    var now = parseInt(ds.ts, 10) * 1000 || Date.now();
    var M = build(D, now, cfg);
    for (var k in M.text) put(root, k, M.text[k]);
    root.querySelectorAll('[data-wx-icon="now"]').forEach(function (s) { s.innerHTML = ICONS[M.nowIcon].replace(/#fff/g, paper(root)); });
    // narrow slots (portrait mashups): the header stacks, and very narrow ones simplify
    var cw = root.clientWidth, kk = root.closest('.screen--lg') ? 1.3 : 1;
    root.classList.toggle('wx--narrow', cw > 0 && cw < 600 * kk);
    root.classList.toggle('wx--tiny', cw > 0 && cw < 320 * kk);
    draw(root, M, palette(root), !!root.closest('.screen--lg'));
  }
  function run() { document.querySelectorAll('.wx').forEach(function (r) { try { render(r); } catch (e) { console.error(e); } }); }
  window.DAYCAST = { run: run };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else setTimeout(run, 0);
  window.addEventListener('load', run);
  if (document.fonts) document.fonts.ready.then(run);
  setTimeout(run, 300); setTimeout(run, 1200);
}();
