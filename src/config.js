// ---- Everything you are likely to change lives in this file ----
const INK = '#252D35';
const CREAM = '#F3F0E8';

export const CONFIG = {
  pageSeconds: 30,      // time each page of 10 students stays on screen
  bannerSeconds: 5,     // level / section title card
  perPage: 10,          // 5 per column x 2 columns
  refreshMinutes: 60,   // how often to re-read Google Sheets
  reloadHours: 12,      // full page reload, keeps the TV healthy all day
  testReadyAt: 70,      // % where the card turns green

  levels: [
    { key: 'beginner', name: 'Beginner', belts: ['white', 'yellow', 'orange'] },
    { key: 'intermediate', name: 'Intermediate', belts: ['green', 'blue', 'purple', 'brown'] },
    { key: 'advanced', name: 'Advanced', belts: ['red', 'silver', 'gold', 'black'] },
  ],

  // Extra pages that rotate in after the levels. Put images in /public/images
  // and set image: '/images/your-file.jpg'. Set enabled: false to hide a page.
  extraPages: [
    { key: 'student-of-month', enabled: false, title: 'Student of the Month', subtitle: 'December', image: null, caption: 'Congratulations!' },
    { key: 'recent-testers', enabled: false, title: 'Recent Belt Testers', subtitle: 'Newly promoted', image: null, caption: 'Great job testing!' },
  ],
};

export const COLORS = { ink: INK, cream: CREAM };

const SILVER = 'linear-gradient(90deg,#6B7280 0%,#9B9FA6 25%,#F8FAFC 50%,#CBD5E1 75%,#6B7280 100%)';
const GOLD = 'linear-gradient(0deg,#6F4E16 0%,#C49A35 22%,#FFF1A8 42%,#D4AF37 55%,#F8E5A0 77%,#9B7423 100%)';

export const BELTS = {
  white:  { label: 'WHITE',  bg: '#FFFFFF', fg: INK },
  yellow: { label: 'YELLOW', bg: '#FFE100', fg: INK },
  orange: { label: 'ORANGE', bg: '#FF7D0C', fg: INK },
  green:  { label: 'GREEN',  bg: '#00FF00', fg: INK },
  blue:   { label: 'BLUE',   bg: '#0021FF', fg: CREAM },
  purple: { label: 'PURPLE', bg: '#8800FF', fg: CREAM },
  brown:  { label: 'BROWN',  bg: '#914400', fg: CREAM },
  red:    { label: 'RED',    bg: '#FF0004', fg: CREAM },
  silver: { label: 'SILVER', bg: SILVER,    fg: INK },
  gold:   { label: 'GOLD',   bg: GOLD,      fg: INK },
  black:  { label: 'BLACK',  bg: '#000000', fg: '#FFFFFF' },
};
