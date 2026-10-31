// Builds preview/index.html: the real templates with today's Open-Meteo forecast for places around the world.
// Usage: node dev/preview.mjs
import fs from 'node:fs';
import path from 'node:path';
import { Liquid } from 'liquidjs';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
// [label, lat, lon, place, locale]
const S = [
  ['Utrecht', 52.0907, 5.1214, 'Utrecht', 'nl'],
  ['Bergen', 60.3913, 5.3221, 'Bergen', 'nb'],
  ['Reykjavík', 64.1466, -21.9426, 'Reykjavík', 'en'],
  ['New York, 12-hour, °F', 40.7128, -74.006, 'New York', 'en-US'],
  ['Denver', 39.7392, -104.9903, 'Denver', 'en-US'],
  ['München', 48.1351, 11.582, 'München', 'de'],
  ['Paris', 48.8566, 2.3522, 'Paris', 'fr'],
  ['Madrid', 40.4168, -3.7038, 'Madrid', 'es'],
  ['Roma', 41.9028, 12.4964, 'Roma', 'it'],
  ['Sydney', -33.8688, 151.2093, 'Sydney', 'en-AU'],
  ['Tromsø', 69.6492, 18.9553, 'Tromsø', 'nb'],
  ['Singapore', 1.3521, 103.8198, 'Singapore', 'en']
];
const url = (lat, lon) => read('src/settings.yml').match(/polling_url: '(.*)'/)[1].replace(/\{\{ lat_lon \| split: "," \| first \| strip \}\}/, lat).replace(/\{\{ lat_lon \| split: "," \| last \| strip \}\}/, lon);
const engine = new Liquid();
const shared = read('src/shared.liquid').replace(/<script>[\s\S]*?<\/script>/, '');
const out = [];
for (const [label, lat, lon, place, locale] of S) {
  const meteo = await fetch(url(lat, lon)).then((r) => r.json());
  if (!meteo.hourly) console.log(label, 'no data:', JSON.stringify(meteo).slice(0, 120));
  await new Promise((r) => setTimeout(r, 400));
  const ctx = Object.assign({}, meteo, { trmnl: { system: { timestamp_utc: Math.floor(Date.now() / 1000) }, user: { locale }, plugin_settings: { instance_name: 'Daycast',
    custom_fields_values: { lat_lon: `${lat},${lon}`, place_name: place, language: 'auto', clock: 'auto', units: 'auto', wind: 'auto' } } } });
  const html = {};
  for (const v of ['full', 'half_horizontal', 'half_vertical', 'quadrant']) html[v] = await engine.parseAndRender(shared + '\n' + read('src/' + v + '.liquid'), ctx);
  out.push({ label, html });
}
fs.mkdirSync(path.join(root, 'preview'), { recursive: true });
fs.copyFileSync(path.join(root, 'dev/weer.js'), path.join(root, 'preview/weer.js'));
const page = read('dev/preview.template.html').replace('/*DATA*/null', () => JSON.stringify(out).replace(/<\/script/g, '<\\/script'));
fs.writeFileSync(path.join(root, 'preview/index.html'), page);
console.log(`preview/index.html: ${out.length} places`);
