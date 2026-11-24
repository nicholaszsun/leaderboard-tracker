import { useEffect, useState } from 'react';
import { CONFIG } from '../config';
import { parseRows } from '../lib/students';

const ID = import.meta.env.VITE_SHEET_ID;
const KEY = import.meta.env.VITE_SHEETS_API_KEY;
const TAB = import.meta.env.VITE_SHEET_TAB || 'Sheet1';

async function fetchRows() {
  const range = encodeURIComponent(`${TAB}!A2:D`); // skips the header row
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${ID}/values/${range}?key=${KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sheets API ${res.status}`);
  return (await res.json()).values ?? [];
}

// Sample data so the project runs before the sheet is connected
function sampleRows() {
  const N = ['Brian', 'Nicholas', 'Anna', 'Natalie', 'Collin', 'Wilson', 'Chuan', 'Sam', 'Kai', 'Kalon', 'Mia', 'Leo', 'Ava'];
  const B = ['White', 'Yellow', 'Orange', 'Green', 'Blue', 'Purple', 'Brown', 'Red', 'Silver', 'Gold', 'Black'];
  return Array.from({ length: 64 }, (_, i) => [
    `${N[i % N.length]} ${String.fromCharCode(65 + ((i * 7) % 26))}`,
    B[i % 11],
    `${(i * 37) % 101}%`,
  ]);
}

// Keeps the last good data if a refresh fails, so the TV never goes blank
export function useSheet() {
  const [state, setState] = useState({ data: null, at: null, error: null });

  useEffect(() => {
    let alive = true;
    let loaded = false;
    let retry;
    const load = async () => {
      try {
        const rows = ID && KEY ? await fetchRows() : sampleRows();
        loaded = true;
        if (alive) setState({ data: parseRows(rows), at: new Date(), error: null });
      } catch (e) {
        console.error(e);
        if (alive) setState((s) => ({ ...s, error: e.message }));
        if (!loaded) retry = setTimeout(load, 30000);
      }
    };
    load();
    const id = setInterval(load, CONFIG.refreshMinutes * 60000);
    const reload = setTimeout(() => window.location.reload(), CONFIG.reloadHours * 3600000);
    return () => { alive = false; clearInterval(id); clearTimeout(retry); clearTimeout(reload); };
  }, []);

  return state;
}
