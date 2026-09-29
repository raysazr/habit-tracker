# Personal Productivity OS

A local-first productivity and habit tracker built with Next.js, React and TypeScript. Data is kept in this browser's `localStorage`; there is no account or server database configuration. Use **Backup data** to download a JSON copy, and **Import backup** to restore it on this or another device.

## Run locally

1. Install Node.js 18 or newer.
2. Run `npm install`.
3. Run `npm run dev` and open the local address printed by Next.js.

Use `npm run build` to create a production build and `npm start` to serve it. The default timezone for date labels and heatmap entries is Asia/Kolkata. The application starts with an empty history; the built-in list contains habit definitions only, not activity records.

## Data model

The browser stores a versioned JSON object under `productivity-os-v1`: habit definitions; date-keyed status, journal, and study-session records; career applications; client tasks; and cybersecurity modules. Each habit state is explicitly one of `Done`, `Not done`, or `N/A`; a missing state remains unreported. Study time is the sum of the explicitly entered focused session durations.

Monthly exports are genuine editable OOXML Word documents (`.docx`) generated in the browser. They summarize saved records and preserve missing days as missing. The app does not currently sync data between browsers; keep a backup if you clear browser storage.
