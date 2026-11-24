# Dojo Leaderboard (React + Vite)

## 1. Run it locally
1. Install Node 18+ from nodejs.org.
2. In this folder: `npm install` then `npm run dev`, open the URL it prints.
   With no `.env` file it runs on sample data, so you can see the cycling right away.

## 2. Connect Google Sheets
1. Share your sheet: **Share → General access → Anyone with the link → Viewer**.
2. Copy the sheet ID from its URL: `docs.google.com/spreadsheets/d/<THIS PART>/edit`.
3. Go to console.cloud.google.com, create a project, then **APIs & Services → Library → Google Sheets API → Enable**.
4. **APIs & Services → Credentials → Create credentials → API key**. Click the key and set:
   - API restrictions: **Google Sheets API** only
   - Website restrictions: your deployed site URL (and `http://localhost:5173/*` while testing)
5. Copy `.env.example` to `.env` and fill in `VITE_SHEET_ID`, `VITE_SHEETS_API_KEY`, and `VITE_SHEET_TAB` (the tab name).
6. Restart `npm run dev`.

Sheet columns, row 1 = headers: A Name ("Brian W"), B Belt Level, C Progress ("70%"), D Focus (not used yet).

## 3. Change timings, colors, focus text, extra pages
Edit `src/config.js`.

## 4. Deploy
`npm run build` creates `dist/`. Upload it to Netlify, Vercel, or Cloudflare Pages
(add the three `VITE_` values in their Environment Variables settings before building).
Update the API key's website restriction to that URL.

## 5. TV setup (mini PC)
- Windows mini PC: put a shortcut in `shell:startup` with target
  `"C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --noerrdialogs --disable-infobars https://YOUR-SITE-URL`
- Set Windows display to 3840x2160 (or 1920x1080), Power & sleep to Never, and turn off the TV's overscan / "picture size: screen fit".
- The page scales itself to any resolution.
