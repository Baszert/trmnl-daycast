# Daycast for TRMNL

Today's weather, at a glance. How warm it is now, when the rain comes, and how the day unfolds hour by hour in one clean chart. Anywhere on Earth, in 12 languages.

## What you see

- **Top left:** the place (bold) and date, the temperature now (large) with an icon for the weather right now, one sentence ("Rain from 01:00", "Partly cloudy", "Grey and dry", "Showers", "Snow", "Thunderstorms") and the high, low and feels-like temperature.
- **Top right:** wind, rain over the next 24 hours, and the next sunrise or sunset, as small spaced capitals over bold values.
- **The chart:** a weather icon every three hours between thin separators, one smooth temperature line through the hourly values (a monotone curve that never overshoots a peak) with open points and the temperature at each icon, rain per hour as a shaded area under a dotted scale line ("3 mm/h"), and now as a black pill on the time axis. The line always spans at least 10 degrees, so small changes stay small.
- **No forecast:** a calm message with a cloud, and another try at the next refresh.

The type is Inter at fixed sizes on every screen, after the style of Weather Curve (DWD).

## Screens

All four sizes. Half vertical and quadrant show the next 12 hours. On the TRMNL X everything is 1.3 times larger, with grey separators and a grey rain area (dots on black-and-white screens); on color screens the temperature line is red and the rain blue.

## Settings

- **Location:** city search or `lat,lon`
- **Place name:** optional, shown at the top
- **Language:** auto (follows your TRMNL account), English, Nederlands, Deutsch, Français, Español, Italiano, Português, Svenska, Dansk, Norsk, Polski, Suomi
- **Units:** auto (°F and inches for US English), metric, imperial
- **Wind:** auto (Beaufort in Dutch, m/s in the Nordic languages, mph for imperial, km/h otherwise), Beaufort, km/h, m/s, mph
- **Clock:** auto (12-hour for US English), 24-hour, 12-hour

## Data

[Open-Meteo](https://open-meteo.com), free, through the polling URL: hourly temperature, feels-like temperature, precipitation, cloud cover, weather code and wind, plus sunrise and sunset, in the local time zone. Everything else is drawn in the page.

## Development

The script lives in `dev/weer.js` and the Liquid and CSS in `dev/shared.src.liquid`. Build `src/shared.liquid`:

```bash
node dev/build.mjs
```

Preview 12 places with today's forecast on every screen type:

```bash
cd dev && npm install && cd ..
node dev/preview.mjs
```

Then serve `preview/` and open it; add `?scenario=0&device=x&view=full&bare=1` for one clean screen, `dev/shoot.sh` makes screenshots. Earlier design studies are in `concept/`.

Publish with `LANG=en_US.UTF-8 trmnlp push`.

## Links and license

- This is a TRMNL plugin (private plugin id 506012); the code here is what runs on TRMNL.
- Code: [MIT](LICENSE). Photos, images, maps and data belong to their sources, credited above and on the screen.
