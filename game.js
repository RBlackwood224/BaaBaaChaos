/* Baa Baa Chaos — a silly sheep-herding game for 1–2 players */
'use strict';
(() => {

// ================= TEXTS =================
const T = {
  hu: { name:'MAGYAR', sub:'Tereld haza a barikat!', join:'Nyomd meg a HOPP gombot a csatlakozáshoz!', tapJoin:'Érintsd meg a képernyőt!',
    p:'Játékos', waiting:'Várakozik…', lang:'Nyelv', time:'Időlimit', on:'BE', off:'KI', lvl:'Pálya', start:'INDULÁS!',
    clear:'SZUPER!', clearSub:'Minden bari otthon van!', next:'HOPP = tovább', timeup:'Lement a nap!', timeupSub:'A gazdák elaludtak… zzz',
    retry:'HOPP = még egyszer', pause:'SZÜNET', resume:'Folytatás', restart:'Pálya újra', menu:'Főmenü',
    hopp:'HOPP!', fart:'PUKI!', baa:'BEEE!', oops:'HUPSZ!', squish:'CUPP!', pop:'PUKK!', boing:'BOING!', bonk:'BUMM!', help:'SEGÍTS!',
    yelp:'AÚÚÚ!', ribbit:'BREKEKE!', cluck:'KOT-KOT!', disco:'DISZKÓ!', hihi:'HIHI!', cough:'KÖH-KÖH!', wolf:'FARKAS!', yum:'NYAMM!', splash:'LOCCS!',
    ctrl:'Mozgás: kar / WASD / nyilak · HOPP: A / Space / Enter · Szünet: Esc · Hang: M · Teljes képernyő: F',
    touch:'Bal oldal: mozgás · Jobb oldal: HOPP', btn:'HOPP', tapStart:'Érints meg bárhol az indításhoz!', rotate:'Fordítsd el a telefont!', fs:'Teljes képernyő',
    thump:'DUMM!', strike:'TAROLÁS!', egg:'TOJÁS! +10', egg0:'TOJÁS!', yawn:'ÁÁÁSÍT…', hifive:'PACSI!', bell:'KOLOMP!', gold:'ARANYBARI!', stink:'BÜDI!',
    sticker:'Új matrica!', stickers:'Matricák', back:'HOPP = vissza', woof:'VAU!', saved:'MEGMENTVE!', locked:'Teljesíts pályákat a matricákért!',
    names:['Béla','Pamacs','Gombóc','Bolyhos','Mazsola','Panni','Zserbó','Bodri','Csutka','Berci','Géza','Fánk','Pihe','Kuki','Cukor','Babóca'] },
  fr: { name:'FRANÇAIS', sub:'Ramène les moutons à la bergerie !', join:'Appuie sur HOP pour rejoindre !', tapJoin:'Touche l’écran !',
    p:'Joueur', waiting:'En attente…', lang:'Langue', time:'Limite de temps', on:'OUI', off:'NON', lvl:'Niveau', start:'C’EST PARTI !',
    clear:'SUPER !', clearSub:'Tous les moutons sont rentrés !', next:'HOP = suivant', timeup:'Le soleil est couché !', timeupSub:'Les fermiers dorment… zzz',
    retry:'HOP = on recommence', pause:'PAUSE', resume:'Reprendre', restart:'Recommencer', menu:'Menu',
    hopp:'HOP HOP!', fart:'PROUT!', baa:'BÊÊÊ!', oops:'OUPS!', squish:'SPLOTCH!', pop:'POP!', boing:'BOING!', bonk:'BONK!', help:'AU SECOURS!',
    yelp:'AÏE AÏE!', ribbit:'CROA!', cluck:'COT-COT!', disco:'DISCO!', hihi:'HIHI!', cough:'KOF KOF!', wolf:'LE LOUP!', yum:'MIAM!', splash:'PLOUF!',
    ctrl:'Bouger : stick / WASD / flèches · HOP : A / Espace / Entrée · Pause : Échap · Son : M · Plein écran : F',
    touch:'Gauche : bouger · Droite : HOP', btn:'HOP', tapStart:'Touche n’importe où pour jouer !', rotate:'Tourne ton téléphone !', fs:'Plein écran',
    thump:'BOUM!', strike:'STRIKE!', egg:'ŒUF! +10', egg0:'ŒUF!', yawn:'BÂÂÂILLE…', hifive:'TOPE LÀ!', bell:'CLOCHE!', gold:'MOUTON D’OR!', stink:'BEURK!',
    sticker:'Nouvel autocollant !', stickers:'Autocollants', back:'HOP = retour', woof:'OUAF!', saved:'SAUVÉ!', locked:'Termine des niveaux pour gagner des autocollants !',
    names:['Pompon','Frisette','Caramel','Nuage','Bouclette','Choupette','Biscotte','Barnabé','Flocon','Praline','Gribouille','Noisette','Doudou','Câlin','Mimi','Titou'] },
  en: { name:'ENGLISH', sub:'Herd the sheep back home!', join:'Press HUP to join!', tapJoin:'Tap the screen!',
    p:'Player', waiting:'Waiting…', lang:'Language', time:'Time limit', on:'ON', off:'OFF', lvl:'Level', start:'LET’S GO!',
    clear:'AWESOME!', clearSub:'All the sheep are home!', next:'HUP = next', timeup:'The sun went down!', timeupSub:'The farmers fell asleep… zzz',
    retry:'HUP = try again', pause:'PAUSED', resume:'Resume', restart:'Restart level', menu:'Main menu',
    hopp:'HUP HUP!', fart:'PFFRT!', baa:'BAAA!', oops:'WHOOPS!', squish:'SQUISH!', pop:'POP!', boing:'BOING!', bonk:'BONK!', help:'HELP!',
    yelp:'YELP!', ribbit:'RIBBIT!', cluck:'BAWK!', disco:'DISCO!', hihi:'HEHE!', cough:'COUGH!', wolf:'WOLF!', yum:'YUM!', splash:'SPLASH!',
    ctrl:'Move: stick / WASD / arrows · HUP: A / Space / Enter · Pause: Esc · Sound: M · Fullscreen: F',
    touch:'Left side: move · Right side: HUP', btn:'HUP', tapStart:'Tap anywhere to start!', rotate:'Turn your phone sideways!', fs:'Fullscreen',
    thump:'THUD!', strike:'STRIKE!', egg:'EGG! +10', egg0:'EGG!', yawn:'YAAAWN…', hifive:'HIGH FIVE!', bell:'BELL!', gold:'GOLDEN SHEEP!', stink:'PEE-YEW!',
    sticker:'New sticker!', stickers:'Stickers', back:'HUP = back', woof:'WOOF!', saved:'SAVED!', locked:'Finish levels to earn stickers!',
    names:['Fluffy','Woolly','Cupcake','Dolly','Marshmallow','Biscuit','Noodle','Pickles','Cloud','Lambert','Muffin','Bubbles','Button','Pudding','Snowy','Jellybean'] }
};
const LANGS = ['hu', 'fr', 'en'];

// ================= STORAGE =================
const store = {
  get(k, d) { try { const v = localStorage.getItem('bbc_' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('bbc_' + k, JSON.stringify(v)); } catch (e) {} }
};
let LANG = store.get('lang', 'hu'); if (!T[LANG]) LANG = 'hu';
let TIMELIMIT = store.get('time', true);
let BEST = store.get('best', 1);
let STICKERS = store.get('stickers', []); if (!Array.isArray(STICKERS)) STICKERS = [];
let STARS = store.get('stars', {}); if (typeof STARS !== 'object' || !STARS) STARS = {};
const tr = k => (T[LANG] && T[LANG][k]) || T.en[k] || k;

// ================= CANVAS =================
const W = 320, H = 180, FX0 = 8, FY0 = 32, FX1 = 312, FY1 = 174;
const cv = document.getElementById('game'), ctx = cv.getContext('2d');
const wc = document.createElement('canvas'); wc.width = W; wc.height = H; const g = wc.getContext('2d');
const nc = document.createElement('canvas'); nc.width = W; nc.height = H; const ng = nc.getContext('2d');
let S = 1, OX = 0, OY = 0, DPR = 1;
function viewSize() { const vv = window.visualViewport; return vv ? { w: Math.round(vv.width), h: Math.round(vv.height) } : { w: innerWidth, h: innerHeight }; }
function resize() {
  DPR = Math.min(2, window.devicePixelRatio || 1);
  const vs = viewSize(); cv.style.width = vs.w + 'px'; cv.style.height = vs.h + 'px';
  cv.width = Math.floor(vs.w * DPR); cv.height = Math.floor(vs.h * DPR);
  const s = Math.min(cv.width / W, cv.height / H);
  S = s >= 3 ? Math.floor(s) : s;
  OX = Math.floor((cv.width - W * S) / 2); OY = Math.floor((cv.height - H * S) / 2);
}
addEventListener('resize', resize); addEventListener('orientationchange', () => setTimeout(resize, 250));
if (window.visualViewport) visualViewport.addEventListener('resize', resize);
setInterval(() => { const vs = viewSize(); if (Math.abs(Math.floor(vs.w * DPR) - cv.width) > 2 || Math.abs(Math.floor(vs.h * DPR) - cv.height) > 2) resize(); }, 500);
resize();
const FONT = '"Arial Rounded MT Bold","Trebuchet MS","Verdana",system-ui,sans-serif';

// ================= HELPERS =================
const R = Math.random, rnd = (a, b) => a + R() * (b - a), pick = a => a[Math.floor(R() * a.length)];
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function pixCircle(c, cx, cy, r, col) {
  c.fillStyle = col; cx = Math.round(cx); cy = Math.round(cy); r = Math.max(1, Math.round(r));
  for (let dy = -r; dy <= r; dy++) { const h = Math.floor(Math.sqrt(r * r - dy * dy)); c.fillRect(cx - h, cy + dy, h * 2 + 1, 1); }
}
function pixEllipse(c, cx, cy, rx, ry, col) {
  c.fillStyle = col; cx = Math.round(cx); cy = Math.round(cy);
  for (let dy = -ry; dy <= ry; dy++) { const h = Math.floor(rx * Math.sqrt(Math.max(0, 1 - (dy * dy) / (ry * ry)))); c.fillRect(cx - h, cy + dy, h * 2 + 1, 1); }
}

// ================= SPRITES =================
function sprite(rows, pal) {
  const h = rows.length, w = rows[0].length, c = document.createElement('canvas'); c.width = w; c.height = h;
  const x = c.getContext('2d');
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const ch = rows[j][i]; if (ch === '.' || !pal[ch]) continue; x.fillStyle = pal[ch]; x.fillRect(i, j, 1, 1); }
  return c;
}
function flip(c) { const f = document.createElement('canvas'); f.width = c.width; f.height = c.height; const x = f.getContext('2d'); x.translate(c.width, 0); x.scale(-1, 1); x.drawImage(c, 0, 0); return f; }
const pair = c => [c, flip(c)];

const SHEEP_BODY = [
  "...WWW.WWW......",
  "..WWWWWWWWW.....",
  ".WWWWWWWWWWW.KK.",
  "WWWWWWWWWWWWKKKP",
  "WWWWWWWWWWWKKEKK",
  "WWWWWWWWWWWKKKKK",
  "GWWWWWWWWWWWKKK.",
  ".GWWWWWWWWWWG...",
  "..GGGGGGGGGG....",
];
const SHEEP_LEGS = [["...K.K...K.K....", "...K.K...K.K...."], ["..K...K.K...K...", "..K...K.K...K..."]];
const TINTS = { white: ['#ffffff', '#c9cfe0'], green: ['#d6f7ad', '#a3cf7d'], blue: ['#c8e8ff', '#90b6d9'], lav: ['#ecdfff', '#b9a6dd'],
  gold: ['#ffe066', '#d9a22c'], pink: ['#ffc4e1', '#e08fb7'], yellow: ['#fff19c', '#d9bf5c'], cyan: ['#b0fff1', '#70cfbf'], orange: ['#ffd099', '#db9d5e'] };
const DISCO = ['pink', 'yellow', 'cyan', 'orange'];
const TYPE_TINT = { n: 'white', f: 'white', q: 'white', s: 'white', g: 'gold' };

const FARMER_TOP = [
  "....YYYY....",
  "...YYYYYY...",
  "..YRRRRRRY..",
  "YYYYYYYYYYYY",
  "...BBBBBB...",
  "...SKSSKS...",
  "...SSSSSS...",
  "....SMMS....",
  "..CCCCCCCC..",
  ".CCOCCCCOCC.",
  ".SCOOOOOOCS.",
  "..SOOOOOOS..",
  "...OOOOOO...",
];
const FARMER_LEGS = [["...OO..OO...", "...OO..OO...", "...KK..KK..."], ["..OO....OO..", "..OO....OO..", "..KK....KK.."], ["...OO..OO...", "....OO.OO...", "....KK.KK..."]];
const PCOL = ['#e5484d', '#3fb45e'];

const WOLF_TOP = [
  "..............DD....",
  ".............DLLD...",
  "..DDDDDDDDDDDLLLLD..",
  ".DLLLLLLLLLLDLLYLLD.",
  "TDLLLLLLLLLLLLLLLLLK",
  "TTLLLLLLLLLLLLLWWW..",
  "T.DLLLLLLLLLLLD.....",
  "..DLLLLLLLLLLLD.....",
];
const WOLF_LEGS = [["...D.D.....D.D......", "...D.D.....D.D......", "...K.K.....K.K......"], ["..D...D...D...D.....", "..D...D...D...D.....", "..K...K...K...K....."]];
const CHICK = ["...RR....", "..WWWW...", "..WKWWY..", "..WWWW...", "WWWWWWW..", "WWWWWWWW.", ".WWWWWW.."];
const CHICK_LEGS = [["..Y..Y..."], ["...YY...."]];
const FROG = [".E...E.", "GKGGGKG", "GGGGGGG", ".GGGGG.", "G.....G"];
const BANANA = ["Y......", "YY....Y", ".YYYYYY", "..BYYB."];
const DOG_TOP = ["..........DD.", ".........DDDD", "D.......DDKDN", ".DWWWWWWDDDD.", "..WWWWWWWT...", "..WDDDDDW...."];
const DOG_LEGS = [["..D.D..D.D..."], [".D...DD...D.."]];
const BELL = ["..H..", ".YYY.", ".YYY.", "YYYYY", "..K.."];

const SPR = { sheep: {}, farmer: [], wolf: [], chick: [], frog: null, banana: null };
for (const k in TINTS) {
  SPR.sheep[k] = [0, 1].map(f => [false, true].map(closed => pair(sprite(SHEEP_BODY.concat(SHEEP_LEGS[f]),
    { W: TINTS[k][0], G: TINTS[k][1], K: '#3b2a3f', E: closed ? '#3b2a3f' : '#ffffff', P: '#ff9fbf' }))));
}
for (let p = 0; p < 2; p++) {
  SPR.farmer[p] = [0, 1, 2].map(f => [false, true].map(closed => {
    const rows = FARMER_TOP.slice(); if (closed) rows[5] = "...S-SS-S...";
    return sprite(rows.concat(FARMER_LEGS[f]), { Y: '#f6cf55', R: PCOL[p], B: '#7a4a2c', S: '#f6c49c', K: '#2a2233', M: '#c4473f', C: PCOL[p], O: '#3d69b8', '-': '#7a4a3a' });
  }));
}
SPR.wolf = [0, 1].map(f => pair(sprite(WOLF_TOP.concat(WOLF_LEGS[f]), { D: '#5b5f73', L: '#9aa0b5', Y: '#ffe14d', K: '#222', W: '#fff', T: '#5b5f73' })));
SPR.chick = [0, 1].map(f => pair(sprite(CHICK.concat(CHICK_LEGS[f]), { R: '#e8443a', W: '#fff', K: '#222', Y: '#f5b82e' })));
SPR.frog = sprite(FROG, { E: '#fff', G: '#4cc24a', K: '#1b3a1b' });
SPR.banana = sprite(BANANA, { Y: '#ffd93b', B: '#6b4a1f' });
SPR.dog = [0, 1].map(f => pair(sprite(DOG_TOP.concat(DOG_LEGS[f]), { D: '#3a2a2a', W: '#ffffff', K: '#ffffff', N: '#111', T: '#ff7a9a' })));
SPR.bell = sprite(BELL, { H: '#8a5a2b', Y: '#ffc93b', K: '#8a5a2b' });

// stickers: a sheep wearing something silly
const STICKER_N = 12;
SPR.stickers = [];
for (let i = 0; i < STICKER_N; i++) {
  const c = document.createElement('canvas'); c.width = 24; c.height = 20; const x = c.getContext('2d');
  pixCircle(x, 12, 10, 9, ['#ffd1e3', '#d1f0ff', '#e8ffd1', '#fff2c2', '#e8dcff', '#ffe0c7'][i % 6]);
  const base = i === 11 ? 'pink' : 'white';
  if (i === 7) { x.fillStyle = '#8e44ad'; x.fillRect(3, 7, 9, 8); }
  x.drawImage(SPR.sheep[base][0][0][0], 4, 6);
  const F = (col, a, b, w, h) => { x.fillStyle = col; x.fillRect(a, b, w, h); };
  switch (i) {
    case 0: F('#222', 15, 3, 5, 4); F('#222', 14, 7, 7, 1); F('#d23', 15, 6, 5, 1); break; // top hat
    case 1: F('#111', 15, 9, 5, 2); F('#111', 13, 9, 2, 1); break; // sunglasses
    case 2: F('#ffd23f', 15, 5, 5, 3); F('#ffd23f', 15, 4, 1, 1); F('#ffd23f', 17, 4, 1, 1); F('#ffd23f', 19, 4, 1, 1); F('#e33', 17, 6, 1, 1); break; // crown
    case 3: F('#ff5aa0', 17, 2, 1, 1); F('#5ad1ff', 16, 3, 3, 2); F('#ffe066', 15, 5, 5, 2); F('#fff', 17, 1, 1, 1); break; // party hat
    case 4: F('#e33', 13, 13, 2, 3); F('#e33', 16, 13, 2, 3); F('#a11', 15, 14, 1, 1); break; // bow tie
    case 5: F('#ff6b8b', 15, 5, 3, 1); F('#ff6b8b', 16, 4, 1, 3); F('#ffe066', 16, 5, 1, 1); break; // flower
    case 6: F('#e33', 13, 12, 6, 2); F('#fff', 14, 12, 1, 2); F('#fff', 16, 12, 1, 2); F('#e33', 14, 14, 2, 3); break; // scarf
    case 7: F('#ffd23f', 15, 6, 4, 1); break; // superhero cape + band
    case 8: F('#333', 15, 6, 5, 1); F('#333', 14, 7, 2, 4); F('#333', 19, 7, 2, 4); F('#e33', 14, 9, 2, 2); break; // headphones
    case 9: F('#fff', 15, 1, 5, 5); F('#ddd', 15, 6, 5, 1); F('#fff', 14, 2, 1, 3); F('#fff', 20, 2, 1, 3); break; // chef hat
    case 10: F('#fff', 9, 2, 1, 5); pixCircle(x, 9, 2, 2, '#ff3b6b'); break; // balloon
    case 11: F('#ff5a7a', 5, 7, 2, 6); F('#ffd93b', 7, 7, 2, 6); F('#7cff6b', 9, 7, 2, 6); F('#5ad1ff', 11, 7, 2, 6); F('#c58bff', 13, 7, 2, 4); break; // rainbow
  }
  SPR.stickers.push(c);
}

// ================= AUDIO =================
let AC = null, master = null, sfxG = null, musG = null, noiseBuf = null, muted = store.get('muted', false);
function initAudio() {
  if (AC) { if (AC.state === 'suspended') AC.resume(); return; }
  try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
  master = AC.createGain(); master.gain.value = muted ? 0 : 0.8; master.connect(AC.destination);
  sfxG = AC.createGain(); sfxG.gain.value = 0.75; sfxG.connect(master);
  musG = AC.createGain(); musG.gain.value = 0.2; musG.connect(master);
  noiseBuf = AC.createBuffer(1, AC.sampleRate, AC.sampleRate);
  const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
}
function setMute(m) { muted = m; store.set('muted', m); if (master) master.gain.value = m ? 0 : 0.8; }
function osc(type, f, t0, dur, vol, dest) {
  const o = AC.createOscillator(), gn = AC.createGain(); o.type = type; o.frequency.setValueAtTime(f, t0);
  gn.gain.setValueAtTime(0.0001, t0); gn.gain.exponentialRampToValueAtTime(vol, t0 + 0.01); gn.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(gn); gn.connect(dest || sfxG); o.start(t0); o.stop(t0 + dur + 0.05); return o;
}
function noise(t0, dur, vol, ft, freq, q) {
  const s = AC.createBufferSource(); s.buffer = noiseBuf; s.loop = true;
  const f = AC.createBiquadFilter(); f.type = ft; f.frequency.setValueAtTime(freq, t0); f.Q.value = q || 1;
  const gn = AC.createGain(); gn.gain.setValueAtTime(0.0001, t0); gn.gain.exponentialRampToValueAtTime(vol, t0 + 0.01); gn.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  s.connect(f); f.connect(gn); gn.connect(sfxG); s.start(t0, Math.random() * 0.5); s.stop(t0 + dur + 0.05); return { f, g: gn };
}
function lfo(target, rate, depth, t0, dur) { const l = AC.createOscillator(); l.frequency.value = rate; const lg = AC.createGain(); lg.gain.value = depth; l.connect(lg); lg.connect(target); l.start(t0); l.stop(t0 + dur + 0.05); }
const SFX = new Proxy({
  baa(p = 1) {
    const t0 = AC.currentTime, f0 = (250 + Math.random() * 70) * p, o = AC.createOscillator(); o.type = 'sawtooth';
    o.frequency.setValueAtTime(f0 * 1.1, t0); o.frequency.linearRampToValueAtTime(f0, t0 + 0.08); o.frequency.linearRampToValueAtTime(f0 * 0.9, t0 + 0.55);
    lfo(o.frequency, 7 + Math.random() * 3, f0 * 0.07, t0, 0.6);
    const bp = AC.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1100 * p; bp.Q.value = 1.4;
    const gn = AC.createGain(); gn.gain.setValueAtTime(0.0001, t0); gn.gain.exponentialRampToValueAtTime(0.7, t0 + 0.04); gn.gain.setValueAtTime(0.6, t0 + 0.38); gn.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.62);
    lfo(gn.gain, 9, 0.25, t0, 0.6);
    o.connect(bp); bp.connect(gn); gn.connect(sfxG); o.start(t0); o.stop(t0 + 0.65);
  },
  fart(big = 1) {
    const t0 = AC.currentTime, d = 0.3 + 0.45 * big, o = AC.createOscillator(); o.type = 'sawtooth';
    o.frequency.setValueAtTime(95 + Math.random() * 30, t0); o.frequency.exponentialRampToValueAtTime(42, t0 + d);
    lfo(o.frequency, 20 + Math.random() * 12, 35, t0, d);
    const lp = AC.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 520; lp.Q.value = 5;
    const gn = AC.createGain(); gn.gain.setValueAtTime(0.0001, t0); gn.gain.exponentialRampToValueAtTime(0.9, t0 + 0.03); gn.gain.setValueAtTime(0.75, t0 + d * 0.7); gn.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
    o.connect(lp); lp.connect(gn); gn.connect(sfxG); o.start(t0); o.stop(t0 + d + 0.05);
    noise(t0, d * 0.8, 0.18, 'lowpass', 350, 1);
  },
  boing() { const t0 = AC.currentTime, o = osc('sine', 150, t0, 0.45, 0.5); o.frequency.exponentialRampToValueAtTime(620, t0 + 0.12); o.frequency.exponentialRampToValueAtTime(240, t0 + 0.42); lfo(o.frequency, 18, 40, t0, 0.45); },
  thump() { const t0 = AC.currentTime, o = osc('sine', 140, t0, 0.3, 0.6); o.frequency.exponentialRampToValueAtTime(45, t0 + 0.25); noise(t0, 0.15, 0.35, 'lowpass', 400, 1); },
  clap() { const t0 = AC.currentTime; noise(t0, 0.08, 0.6, 'bandpass', 1800, 1.2); noise(t0 + 0.03, 0.1, 0.4, 'bandpass', 1200, 1); [784, 988, 1175].forEach((f, i) => osc('square', f, t0 + 0.08 + i * 0.06, 0.1, 0.13)); },
  bell() { const t0 = AC.currentTime; [0, 0.18, 0.36].forEach(d => { osc('triangle', 1568, t0 + d, 0.3, 0.2); osc('sine', 2350, t0 + d, 0.2, 0.08); }); },
  woof() { const t0 = AC.currentTime; for (let i = 0; i < 2; i++) { const o = osc('sawtooth', 260, t0 + i * 0.18, 0.12, 0.3); o.frequency.exponentialRampToValueAtTime(140, t0 + i * 0.18 + 0.1); noise(t0 + i * 0.18, 0.08, 0.2, 'bandpass', 700, 2); } },
  yawn() { const t0 = AC.currentTime, o = osc('triangle', 380, t0, 0.9, 0.2); o.frequency.linearRampToValueAtTime(520, t0 + 0.3); o.frequency.linearRampToValueAtTime(240, t0 + 0.85); },
  egg() { const t0 = AC.currentTime; osc('square', 523, t0, 0.08, 0.15); osc('square', 1047, t0 + 0.09, 0.2, 0.15); },
  gold() { const t0 = AC.currentTime; [784, 988, 1175, 1568, 1976].forEach((f, i) => osc('triangle', f, t0 + i * 0.07, 0.25, 0.2)); },
  pop() { const t0 = AC.currentTime; noise(t0, 0.12, 0.7, 'highpass', 1400, 0.7); osc('square', 900, t0, 0.06, 0.2); },
  inflate() { const t0 = AC.currentTime, o = osc('sine', 260, t0, 0.9, 0.3); o.frequency.exponentialRampToValueAtTime(950, t0 + 0.85); },
  hopp() { const t0 = AC.currentTime, a = osc('square', 560, t0, 0.09, 0.16); a.frequency.exponentialRampToValueAtTime(420, t0 + 0.08); const b = osc('square', 660, t0 + 0.11, 0.13, 0.16); b.frequency.exponentialRampToValueAtTime(380, t0 + 0.23); },
  whoosh() { const t0 = AC.currentTime, n = noise(t0, 0.5, 0.35, 'bandpass', 400, 3); n.f.frequency.exponentialRampToValueAtTime(3000, t0 + 0.45); const o = osc('triangle', 300, t0, 0.5, 0.2); o.frequency.exponentialRampToValueAtTime(1300, t0 + 0.45); },
  squelch() { const t0 = AC.currentTime, o = osc('sine', 320, t0, 0.28, 0.45); o.frequency.exponentialRampToValueAtTime(70, t0 + 0.25); noise(t0, 0.22, 0.3, 'lowpass', 600, 2); },
  splash() { noise(AC.currentTime, 0.3, 0.3, 'highpass', 2000, 0.5); },
  cluck() { const t0 = AC.currentTime; for (let i = 0; i < 3; i++) { const o = osc('square', 700 + Math.random() * 300, t0 + i * 0.09, 0.06, 0.13); o.frequency.exponentialRampToValueAtTime(420, t0 + i * 0.09 + 0.05); } },
  ribbit() { const t0 = AC.currentTime; for (let i = 0; i < 2; i++) { const o = osc('sawtooth', 170, t0 + i * 0.14, 0.1, 0.25); o.frequency.linearRampToValueAtTime(270, t0 + i * 0.14 + 0.08); } },
  howl() { const t0 = AC.currentTime, o = osc('sine', 320, t0, 1.3, 0.3); o.frequency.linearRampToValueAtTime(640, t0 + 0.45); o.frequency.linearRampToValueAtTime(470, t0 + 1.2); lfo(o.frequency, 6, 12, t0, 1.3); },
  yelp() { const t0 = AC.currentTime; for (let i = 0; i < 3; i++) { const o = osc('triangle', 900, t0 + i * 0.13, 0.1, 0.3); o.frequency.exponentialRampToValueAtTime(1500, t0 + i * 0.13 + 0.08); } },
  snore() { const t0 = AC.currentTime, n = noise(t0, 1.1, 0.35, 'lowpass', 260, 4); n.g.gain.cancelScheduledValues(t0); n.g.gain.setValueAtTime(0.0001, t0); n.g.gain.exponentialRampToValueAtTime(0.35, t0 + 0.5); n.g.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.05); },
  bonk() { const t0 = AC.currentTime, o = osc('square', 220, t0, 0.18, 0.3); o.frequency.exponentialRampToValueAtTime(70, t0 + 0.16); noise(t0, 0.08, 0.3, 'lowpass', 800, 1); },
  cough() { const t0 = AC.currentTime; noise(t0, 0.1, 0.4, 'bandpass', 900, 2); noise(t0 + 0.16, 0.1, 0.4, 'bandpass', 800, 2); },
  ding() { const t0 = AC.currentTime; osc('triangle', 988, t0, 0.15, 0.25); osc('triangle', 1319, t0 + 0.08, 0.25, 0.25); },
  blip() { osc('square', 880, AC.currentTime, 0.05, 0.1); },
  join() { const t0 = AC.currentTime;[523, 659, 784].forEach((f, i) => osc('square', f, t0 + i * 0.07, 0.1, 0.15)); },
  fanfare() { const t0 = AC.currentTime;[523, 659, 784, 1047, 784, 1047].forEach((f, i) => { osc('square', f, t0 + i * 0.12, i === 5 ? 0.6 : 0.14, 0.18); osc('triangle', f / 2, t0 + i * 0.12, 0.14, 0.2); }); },
  sad() { const t0 = AC.currentTime;[392, 370, 349, 330].forEach((f, i) => { const o = osc('sawtooth', f, t0 + i * 0.35, i === 3 ? 0.9 : 0.32, 0.15); if (i === 3) lfo(o.frequency, 6, 8, t0 + i * 0.35, 0.9); }); }
}, { get(tg, k) { return (...a) => { if (!AC || muted) return; try { tg[k](...a); } catch (e) {} }; } });

// music
const MEL = [72,-1,76,-1,79,-1,76,-1,81,79,76,-1,74,-1,-1,-1, 72,-1,76,-1,79,-1,84,-1,83,81,79,-1,79,-1,-1,-1,
  77,-1,81,-1,84,-1,81,-1,79,-1,76,-1,74,76,77,-1, 76,-1,74,-1,72,-1,74,-1,76,-1,74,-1,72,-1,-1,-1];
const BASSR = [48, 48, 53, 55];
const MUS = { on: false, step: 0, next: 0 };
function mnote(type, m, t0, d, v) { osc(type, 440 * Math.pow(2, (m - 69) / 12), t0, d, v, musG); }
function musicTick() {
  if (!AC || !MUS.on) return;
  const night = L && L.th && L.th.night, tempo = night ? 0.16 : 0.13;
  if (MUS.next < AC.currentTime) MUS.next = AC.currentTime + 0.05;
  while (MUS.next < AC.currentTime + 0.2) {
    const s = MUS.step % 64, m = MEL[s], t0 = MUS.next;
    if (m > 0) mnote(night ? 'triangle' : 'square', m, t0, tempo * 0.9, 0.12);
    if (s % 4 === 0) { const r = BASSR[Math.floor(s / 16)]; mnote('triangle', (s % 8 === 0) ? r : r + 7, t0, tempo * 1.8, 0.3); }
    MUS.step++; MUS.next += tempo;
  }
}

// ================= INPUT =================
const keys = {}, keyHit = {};
const KB = {
  kb1: { up: ['KeyW'], down: ['KeyS'], left: ['KeyA'], right: ['KeyD'], act: ['Space', 'KeyF', 'KeyE', 'KeyQ'] },
  kb2: { up: ['ArrowUp'], down: ['ArrowDown'], left: ['ArrowLeft'], right: ['ArrowRight'], act: ['Enter', 'NumpadEnter', 'ShiftRight', 'ControlRight', 'Numpad0', 'KeyL'] }
};
let pauseReq = false;
addEventListener('keydown', e => {
  if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(e.code)) e.preventDefault();
  if (!keys[e.code]) {
    if (e.code === 'Escape' || e.code === 'KeyP') pauseReq = true;
    if (e.code === 'KeyM') setMute(!muted);
    if (e.code === 'KeyF' && state === 'title') toggleFS();
  }
  keys[e.code] = true; keyHit[e.code] = true; initAudio(); usingTouch = false; touchToKeyboard();
});
addEventListener('keyup', e => { keys[e.code] = false; });
addEventListener('blur', () => { for (const k in keys) keys[k] = false; });
function touchToKeyboard() {
  const p = players.find(p => p.dev === 'touch'); if (!p) return;
  const free = ['kb1', 'kb2'].find(k => !players.some(q => q.dev === k)); if (!free) return;
  p.dev = free; if (L && L.farmers) for (const f of L.farmers) if (f.dev === 'touch') f.dev = free;
}
const isFS = () => !!(document.fullscreenElement || document.webkitFullscreenElement);
function lockLandscape() { try { screen.orientation && screen.orientation.lock && screen.orientation.lock('landscape').catch(() => {}); } catch (e) {} }
function enterFS() {
  const el = document.documentElement;
  try {
    if (el.requestFullscreen) el.requestFullscreen({ navigationUI: 'hide' }).then(lockLandscape).catch(() => {});
    else if (el.webkitRequestFullscreen) { el.webkitRequestFullscreen(); lockLandscape(); }
  } catch (e) {}
}
function exitFS() { try { if (document.exitFullscreen) document.exitFullscreen().catch(() => {}); else if (document.webkitExitFullscreen) document.webkitExitFullscreen(); } catch (e) {} }
function toggleFS() { if (isFS()) exitFS(); else enterFS(); }
const canFS = () => !!(document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen);
const isPortrait = () => usingTouch && innerHeight > innerWidth * 1.05;

// pointer / touch
let usingTouch = !!(window.matchMedia && matchMedia('(pointer: coarse)').matches && !matchMedia('(any-pointer: fine)').matches);
let lastMouse = false;
const ptr = { joyId: null, jx0: 0, jy0: 0, jx: 0, jy: 0, actQueued: false };
let HITS = [];
function toCanvas(cxp, cyp) { const r = cv.getBoundingClientRect(); return { x: (cxp - r.left) * cv.width / (r.width || 1), y: (cyp - r.top) * cv.height / (r.height || 1) }; }
const JOY_R = () => Math.min(cv.width, cv.height) * 0.13;
function onDown(id, cxp, cyp, isMouse) {
  initAudio(); usingTouch = !isMouse; lastMouse = isMouse;
  const p = toCanvas(cxp, cyp), dx = p.x, dy = p.y;
  for (let i = HITS.length - 1; i >= 0; i--) { const h = HITS[i]; if (dx >= h.x && dx <= h.x + h.w && dy >= h.y && dy <= h.y + h.h) { h.fn(); return true; } }
  if (isPortrait()) return true;
  if (state === 'album') { state = 'title'; SFX.blip(); return true; }
  if (state === 'title') {
    if (isMouse) { if (!players.length) joinDevice('kb1'); return true; }
    if (!players.some(p => p.dev === 'touch') && players.length < 2) joinDevice('touch');
    else if (players.some(p => p.dev === 'touch') && !isMouse) { if (canFS() && !isFS()) enterFS(); menuIdx = 4; startGame(); }
    return true;
  }
  if (state === 'clear' || state === 'timeup') { ptr.actQueued = true; return true; }
  if (state !== 'play' || isMouse) return true;
  if (dx < cv.width * 0.55) { if (ptr.joyId === null) { ptr.joyId = id; ptr.jx0 = ptr.jx = dx; ptr.jy0 = ptr.jy = dy; } }
  else ptr.actQueued = true;
  return true;
}
function onMove(id, cxp, cyp) { if (id === ptr.joyId) { const q = toCanvas(cxp, cyp); ptr.jx = q.x; ptr.jy = q.y; const r = JOY_R(), ox = ptr.jx - ptr.jx0, oy = ptr.jy - ptr.jy0, d = Math.hypot(ox, oy); if (d > r * 1.4) { ptr.jx0 += ox / d * (d - r * 1.4); ptr.jy0 += oy / d * (d - r * 1.4); } } }
function onUp(id) { if (id === ptr.joyId) ptr.joyId = null; }
if (window.PointerEvent) {
  cv.addEventListener('pointerdown', e => { if (onDown(e.pointerId, e.clientX, e.clientY, e.pointerType === 'mouse')) e.preventDefault(); try { cv.setPointerCapture(e.pointerId); } catch (er) {} });
  cv.addEventListener('pointermove', e => onMove(e.pointerId, e.clientX, e.clientY));
  cv.addEventListener('pointerup', e => onUp(e.pointerId)); cv.addEventListener('pointercancel', e => onUp(e.pointerId));
} else {
  cv.addEventListener('touchstart', e => { e.preventDefault(); for (const t of e.changedTouches) onDown(t.identifier, t.clientX, t.clientY, false); }, { passive: false });
  cv.addEventListener('touchmove', e => { e.preventDefault(); for (const t of e.changedTouches) onMove(t.identifier, t.clientX, t.clientY); }, { passive: false });
  const te = e => { for (const t of e.changedTouches) onUp(t.identifier); };
  cv.addEventListener('touchend', te); cv.addEventListener('touchcancel', te);
  cv.addEventListener('mousedown', e => onDown('m', e.clientX, e.clientY, true));
}
cv.addEventListener('contextmenu', e => e.preventDefault());

const DEVS = ['kb1', 'kb2', 'gp0', 'gp1', 'gp2', 'gp3', 'touch'];
const dev = {}; DEVS.forEach(d => dev[d] = { x: 0, y: 0, act: false, actP: false, nx: 0, ny: 0, nxP: 0, nyP: 0, pause: false, pauseP: false, ok: false });
function pollInput() {
  const pads = navigator.getGamepads ? navigator.getGamepads() : [];
  for (const id of DEVS) {
    const d = dev[id]; let x = 0, y = 0, act = false, pause = false, ok = true;
    if (id[0] === 'k') {
      const m = KB[id], any = l => l.some(c => keys[c]);
      if (any(m.left)) x -= 1; if (any(m.right)) x += 1; if (any(m.up)) y -= 1; if (any(m.down)) y += 1;
      const hit = m.act.some(c => keyHit[c]); act = any(m.act) || hit; if (hit && dev[id].act && !any(m.act)) dev[id].act = false;
    } else if (id === 'touch') {
      if (ptr.joyId !== null) { const r = JOY_R(), ox = ptr.jx - ptr.jx0, oy = ptr.jy - ptr.jy0, d = Math.hypot(ox, oy); if (d > r * 0.15) { const k = Math.min(1, d / r); x = ox / d * k; y = oy / d * k; } }
      act = ptr.actQueued; ptr.actQueued = false;
    } else {
      const gp = pads[+id[2]];
      if (!gp || !gp.connected) ok = false;
      else {
        x = gp.axes[0] || 0; y = gp.axes[1] || 0; if (Math.hypot(x, y) < 0.25) { x = 0; y = 0; }
        const b = i => gp.buttons[i] && gp.buttons[i].pressed;
        if (b(14)) x = -1; if (b(15)) x = 1; if (b(12)) y = -1; if (b(13)) y = 1;
        act = b(0) || b(1) || b(2) || b(3); pause = b(9) || b(8);
      }
    }
    const m = Math.hypot(x, y); if (m > 1) { x /= m; y /= m; }
    d.ok = ok; d.x = x; d.y = y;
    d.actP = act && !d.act; d.act = id === 'touch' ? false : act;
    if (id === 'touch') d.actP = act;
    d.pauseP = pause && !d.pause; d.pause = pause;
    if (id === 'kb2') for (const k in keyHit) keyHit[k] = false;
    const nx = x > 0.6 ? 1 : x < -0.6 ? -1 : 0, ny = y > 0.6 ? 1 : y < -0.6 ? -1 : 0;
    d.nxP = (nx !== d.nx) ? nx : 0; d.nyP = (ny !== d.ny) ? ny : 0; d.nx = nx; d.ny = ny;
  }
}

// ================= GAME STATE =================
let state = 'title', menuIdx = 4, players = [], startLevel = 1, L = null, pauseIdx = 0, TT = 0;
const THEMES = {
  meadow: { sky: ['#7fd0ff', '#d2f1ff'], hill: '#9ad77a', grass: '#79c653', tuft: '#5ead45', light: '#94d86c', flowers: 35, mud: 0 },
  flowers: { sky: ['#8ad6ff', '#ffe6f4'], hill: '#a8dc84', grass: '#7fcb58', tuft: '#62b148', light: '#9cdc72', flowers: 140, mud: 0 },
  farm: { sky: ['#9fd8ff', '#fff1cf'], hill: '#b5cf6e', grass: '#8cbf53', tuft: '#6fa543', light: '#a3d066', flowers: 12, mud: 9 },
  night: { sky: ['#0f1640', '#2b3a7a'], hill: '#24504a', grass: '#3e7a4c', tuft: '#2f6139', light: '#4b8a58', flowers: 20, mud: 0, night: true }
};
const LEVELS = [
  { sheep: 'nnn', theme: 'meadow', pen: 'R', time: 120, events: ['dance'], ban: 0, pie: 0, pud: 0 },
  { sheep: 'nnnf', theme: 'meadow', pen: 'R', time: 110, events: ['dance', 'chicken'], ban: 1, pie: 0, pud: 0 },
  { sheep: 'nnfsn', theme: 'flowers', pen: 'L', time: 110, events: ['dance', 'chicken', 'balloon', 'frog', 'bell'], ban: 2, pie: 1, pud: 1 },
  { sheep: 'nqfsn', theme: 'flowers', pen: 'R', time: 120, events: ['rocket', 'dance', 'balloon', 'frog', 'rain', 'chicken', 'bell'], ban: 2, pie: 1, pud: 1 },
  { sheep: 'nqfsnn', theme: 'meadow', pen: 'B', time: 130, events: ['rocket', 'dance', 'chicken', 'rain', 'escape', 'bell'], wolf: true, ban: 2, pie: 2, pud: 1 },
  { sheep: 'nqffsn', theme: 'farm', pen: 'L', time: 130, events: ['rocket', 'balloon', 'chicken', 'frog', 'escape', 'rain', 'bell'], wolf: true, dog: true, ban: 2, pie: 4, pud: 3 },
  { sheep: 'nqfssn', theme: 'night', pen: 'R', time: 140, events: ['rocket', 'dance', 'frog', 'escape', 'balloon', 'bell'], wolf: true, dog: true, ban: 1, pie: 1, pud: 1 },
  { sheep: 'nqqffsn', theme: 'farm', pen: 'B', time: 150, events: ['rocket', 'dance', 'balloon', 'chicken', 'frog', 'rain', 'escape', 'bell'], wolf: true, dog: true, ban: 3, pie: 3, pud: 2 }
];
function levelDef(n) {
  if (n <= LEVELS.length) return LEVELS[n - 1];
  const k = n - LEVELS.length, base = LEVELS[4 + (k - 1) % 4];
  const d = Object.assign({}, base); let sh = base.sheep; const extra = 'nqfs';
  for (let i = 0; i < k && sh.length < 10; i++) sh += extra[i % 4];
  d.sheep = sh; d.time = base.time + Math.min(60, k * 8); return d;
}
function makePen(side) {
  let p;
  if (side === 'R') p = { x: FX1 - 74, y: 76, w: 64, h: 60, gate: 'L' };
  else if (side === 'L') p = { x: FX0 + 10, y: 76, w: 64, h: 60, gate: 'R' };
  else p = { x: W / 2 - 34, y: FY1 - 56, w: 68, h: 52, gate: 'T' };
  const { x, y, w, h } = p, G = 14; const walls = []; let gate;
  const seg = (x1, y1, x2, y2) => ({ x1, y1, x2, y2 });
  walls.push(seg(x, y + h, x + w, y + h)); // bottom (front)
  if (p.gate === 'T') {
    const cx = x + w / 2; walls.push(seg(x, y, cx - G, y), seg(cx + G, y, x + w, y), seg(x, y, x, y + h), seg(x + w, y, x + w, y + h)); gate = seg(cx - G, y, cx + G, y);
  } else {
    const cy = y + h / 2, gx = p.gate === 'L' ? x : x + w, ox = p.gate === 'L' ? x + w : x;
    walls.push(seg(x, y, x + w, y), seg(ox, y, ox, y + h), seg(gx, y, gx, cy - G), seg(gx, cy + G, gx, y + h)); gate = seg(gx, cy - G, gx, cy + G);
  }
  p.walls = walls; p.gateSeg = gate; return p;
}
function collideSeg(e, s, r) {
  const dx = s.x2 - s.x1, dy = s.y2 - s.y1, l2 = dx * dx + dy * dy;
  let u = ((e.x - s.x1) * dx + (e.y - s.y1) * dy) / l2; u = clamp(u, 0, 1);
  const px = s.x1 + u * dx, py = s.y1 + u * dy; let ox = e.x - px, oy = e.y - py; const d = Math.hypot(ox, oy);
  if (d < r) {
    if (d < 0.001) { ox = 0; oy = -1; } else { ox /= d; oy /= d; }
    e.x = px + ox * r; e.y = py + oy * r; const vn = e.vx * ox + e.vy * oy; if (vn < 0) { e.vx -= vn * ox; e.vy -= vn * oy; } return true;
  }
  return false;
}
function inPenArea(x, y, pen, m) { return x > pen.x - m && x < pen.x + pen.w + m && y > pen.y - m && y < pen.y + pen.h + m; }
function freeSpot(pen, avoid, m = 18) {
  for (let i = 0; i < 200; i++) {
    const x = rnd(FX0 + 10, FX1 - 10), y = rnd(FY0 + 10, FY1 - 6);
    if (inPenArea(x, y, pen, m)) continue;
    if (avoid.some(a => Math.hypot(a.x - x, a.y - y) < 22)) continue;
    return { x, y };
  }
  return { x: W / 2, y: H / 2 };
}
function makeSheep(type, x, y, id) {
  return { id, type, tint: TYPE_TINT[type], x, y, vx: 0, vy: 0, z: 0, vz: 0, state: 'wander', t: 0, wt: rnd(0.5, 2), wdir: rnd(0, 6.28),
    face: R() < 0.5 ? 1 : -1, anim: 0, penned: false, fartCd: rnd(1, 3), baaCd: 0, touchCd: 0, scared: 0, selfT: rnd(6, 13), pitch: rnd(0.85, 1.25),
    inflate: 0, ra: 0, landBoing: false, name: '', follow: null, followT: 0, wet: 0, puddleCd: 2, fly: false, towBy: null, yawnT: 2.5 };
}
function makeFarmer(p, i, x, y) {
  return { idx: i, dev: p.dev, x, y, vx: 0, vy: 0, z: 0, vz: 0, face: 1, anim: 0, stun: 0, slip: 0, svx: 0, svy: 0, spin: 0, slow: 0, rain: 0, frog: 0,
    shoutCd: 0, shout: 0, pieCd: 0, sleep: false, moving: false, stinky: 0, boost: 0, bell: 0, hopping: false, hvx: 0, hvy: 0, lastAct: -9, pudCd: 0, tow: null };
}
function buildScene(def, n, demo) {
  const th = THEMES[def.theme], pen = makePen(def.pen);
  const S0 = { n, def, th, pen, demo, sheep: [], farmers: [], bananas: [], pies: [], puddles: [], wolf: null, wolfCd: rnd(14, 20), chickens: [], frogs: [], clouds: [],
    farts: [], parts: [], texts: [], fireflies: [], bells: [], dog: null, hiCd: 0, newSticker: -1, stars: 0, time: 0, timeMax: 1, tt: 0, eventT: rnd(5, 8), gateClosed: false, gateAnim: 0, shake: 0, banner: demo ? 0 : 2.4, escapes: 0, clearT: 0 };
  const startX = def.pen === 'L' ? W / 2 + 30 : def.pen === 'R' ? W / 2 - 40 : W / 2;
  const startY = def.pen === 'B' ? 70 : 104;
  if (!demo) players.forEach((p, i) => S0.farmers.push(makeFarmer(p, i, startX + (i ? 18 : -18) * (players.length > 1 ? 1 : 0), startY)));
  const avoid = S0.farmers.map(f => ({ x: f.x, y: f.y }));
  let types = [...def.sheep];
  if (!demo && n >= 2 && R() < 0.45) { const k = types.indexOf('n'); if (k >= 0) types[k] = 'g'; }
  const names = tr('names').slice().sort(() => R() - 0.5);
  types.forEach((t, i) => { const sp = freeSpot(pen, avoid, 20); avoid.push(sp); const sh = makeSheep(t, sp.x, sp.y, i); sh.name = names[i % names.length]; S0.sheep.push(sh); });
  if (def.dog) S0.dog = { x: W / 2, y: FY0 + 6, vx: 0, vy: 0, face: 1, anim: 0, target: null, napT: rnd(14, 20), nap: 0, woofT: 3, lick: 0 };
  for (let i = 0; i < (def.pud || 0); i++) { const sp = freeSpot(pen, avoid, 16); avoid.push(sp); S0.puddles.push({ x: sp.x, y: sp.y, rx: Math.round(rnd(8, 12)), ry: Math.round(rnd(3, 5)) }); }
  for (let i = 0; i < (def.pie || 0); i++) { const sp = freeSpot(pen, avoid, 14); avoid.push(sp); S0.pies.push({ x: sp.x, y: sp.y }); }
  for (let i = 0; i < (def.ban || 0); i++) { const sp = freeSpot(pen, avoid, 14); avoid.push(sp); S0.bananas.push({ x: sp.x, y: sp.y, gone: false, rt: 0 }); }
  if (th.night) for (let i = 0; i < 14; i++) S0.fireflies.push({ x: rnd(FX0, FX1), y: rnd(FY0, FY1), a: rnd(0, 6.28), s: rnd(0.5, 1.5) });
  S0.bg = buildBG(th, pen, n * 977 + 13);
  S0.timeMax = S0.time = def.time * (players.length < 2 ? 1.25 : 1);
  return S0;
}
function loadLevel(n) {
  L = buildScene(levelDef(n), n, false); state = 'play';
  if (n > BEST) { BEST = n; store.set('best', BEST); }
}
function makeDemo() {
  L = buildScene({ sheep: 'nnfqsnn', theme: 'meadow', pen: 'R', time: 999, events: ['dance', 'balloon', 'rocket', 'chicken'], ban: 0, pie: 0, pud: 0 }, 1, true);
  L.eventT = 2;
}

// ================= BACKGROUND =================
function buildBG(th, pen, seed) {
  const c = document.createElement('canvas'); c.width = W; c.height = H; const b = c.getContext('2d'); const r = mulberry32(seed);
  const gr = b.createLinearGradient(0, 0, 0, 28); gr.addColorStop(0, th.sky[0]); gr.addColorStop(1, th.sky[1]); b.fillStyle = gr; b.fillRect(0, 0, W, 28);
  if (th.night) { b.fillStyle = '#fff'; for (let i = 0; i < 40; i++) b.fillRect(Math.floor(r() * W), Math.floor(r() * 20), 1, 1); }
  else { b.fillStyle = '#ffffff'; for (let i = 0; i < 4; i++) { const cx = r() * W, cy = 5 + r() * 8; pixCircle(b, cx, cy, 3, '#fff'); pixCircle(b, cx + 4, cy - 1, 4, '#fff'); pixCircle(b, cx + 9, cy, 3, '#fff'); } }
  for (let x = 0; x < W; x++) { const hy = 20 + Math.sin(x * 0.03 + r() * 0.05) * 3 + Math.sin(x * 0.011 + seed) * 3; b.fillStyle = th.hill; b.fillRect(x, Math.round(hy), 1, 30); }
  b.fillStyle = th.grass; b.fillRect(0, 27, W, H - 27);
  for (let i = 0; i < (th.mud || 0); i++) { const x = r() * W, y = FY0 + r() * (FY1 - FY0); pixEllipse(b, x, y, Math.round(8 + r() * 10), Math.round(3 + r() * 3), '#9b7448'); pixEllipse(b, x + 1, y, Math.round(5 + r() * 5), 2, '#86613a'); }
  for (let i = 0; i < 700; i++) { const x = Math.floor(r() * W), y = 27 + Math.floor(r() * (H - 27)); b.fillStyle = r() < 0.55 ? th.tuft : th.light; b.fillRect(x, y, 1, 1); if (r() < 0.3) { b.fillRect(x + 2, y, 1, 1); b.fillRect(x + 1, y + 1, 1, 1); } }
  const FC = ['#ff6b8b', '#ffe066', '#ffffff', '#b98bff', '#ff9d4d', '#6bd0ff'];
  for (let i = 0; i < th.flowers; i++) {
    const x = Math.floor(r() * W), y = FY0 + Math.floor(r() * (FY1 - FY0)); if (inPenArea(x, y, pen, 4)) continue;
    b.fillStyle = FC[Math.floor(r() * FC.length)]; b.fillRect(x - 1, y, 3, 1); b.fillRect(x, y - 1, 1, 3); b.fillStyle = th.night ? '#cdb24a' : '#ffd23f'; b.fillRect(x, y, 1, 1);
  }
  // hedge
  for (let x = -4; x < W + 6; x += 7) { const yy = 27 + Math.floor(r() * 3); pixCircle(b, x, yy, 5, '#3f8f3a'); pixCircle(b, x - 1, yy - 1, 3, '#54a64a'); }
  // side bushes
  for (let i = 0; i < 4; i++) { [3, W - 3].forEach(x => { const y = FY0 + 20 + i * 34 + r() * 10; pixCircle(b, x, y, 7, '#3f8f3a'); pixCircle(b, x + (x < W / 2 ? 1 : -1), y - 2, 4, '#54a64a'); }); }
  // pen floor
  const { x, y, w, h } = pen; b.fillStyle = th.night ? '#5c6a3e' : '#c9d27a'; b.fillRect(x + 1, y + 1, w - 1, h - 1);
  b.fillStyle = th.night ? '#7c7a46' : '#e8d58a';
  for (let i = 0; i < 90; i++) b.fillRect(x + 2 + Math.floor(r() * (w - 4)), y + 2 + Math.floor(r() * (h - 4)), 2, 1);
  // hay pile and trough
  const hx = pen.gate === 'L' ? x + w - 14 : x + 14, hy = y + 14;
  pixCircle(b, hx, hy, 7, '#e2b94a'); pixCircle(b, hx - 1, hy - 2, 5, '#f3d06a'); b.fillStyle = '#c99a32'; for (let i = 0; i < 8; i++) b.fillRect(hx - 6 + Math.floor(r() * 12), hy - 4 + Math.floor(r() * 8), 1, 2);
  b.fillStyle = '#8a5a2b'; b.fillRect(hx - 8, y + h - 14, 16, 5); b.fillStyle = '#6fb7ff'; b.fillRect(hx - 7, y + h - 13, 14, 2);
  return c;
}

// ================= FX =================
function addText(x, y, txt, col = '#fff', size = 1) { if (!L) return; L.texts.push({ x, y, txt, col, size, life: 1.3, max: 1.3 }); }
function puff(x, y, col, n, spd, life, size = 1, type = 'dot', grav = 0) {
  for (let i = 0; i < n; i++) { const a = rnd(0, 6.28), s = rnd(0.3, 1) * spd; L.parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life, max: life, col, size, type, grav, rot: rnd(0, 6) }); }
}
function part(o) { o.max = o.life; L.parts.push(o); }
function updFx(dt) {
  if (!L) return;
  for (let i = L.parts.length - 1; i >= 0; i--) {
    const p = L.parts[i]; p.life -= dt; if (p.life <= 0) { L.parts.splice(i, 1); continue; }
    p.vy += (p.grav || 0) * dt; p.x += p.vx * dt; p.y += p.vy * dt; if (p.type !== 'foot') { p.vx *= (1 - dt * 1.5); if (!p.grav) p.vy *= (1 - dt * 1.5); }
    p.rot += dt * 8;
  }
  for (let i = L.texts.length - 1; i >= 0; i--) { const t = L.texts[i]; t.life -= dt; t.y -= dt * 12; if (t.life <= 0) L.texts.splice(i, 1); }
  L.shake = Math.max(0, L.shake - dt);
}

// ================= SHEEP =================
const freeSheep = () => L.sheep.filter(s => !s.penned && s.state !== 'grabbed' && s.z < 3);
const sheepSpeed = s => (s.type === 'q' ? 80 : s.type === 'g' ? 88 : 58) * (s.wet > 0 ? 0.6 : 1);
function wake(s) { s.state = 'wander'; s.vz = 150; s.scared = 1; s.yawnT = 3; SFX.baa(1.35); addText(s.x, s.y - 18, tr('baa'), '#fff'); }
function goSleep(s) { s.state = 'sleep'; s.t = rnd(9, 12); s.yawnT = 2.5; }
function goRocket(s) { s.state = 'rocket'; s.t = 2.2; s.ra = rnd(0, 6.28); SFX.whoosh(); addText(s.x, s.y - 18, 'WHEEE!', '#9fe0ff'); }
function goDance(s, t, quiet) { s.state = 'dance'; s.t = t || 4.5; s.danceCd = s.t + 4; if (!quiet) addText(s.x, s.y - 18, tr('disco'), '#ff8de0'); }
function popBalloon(s) {
  s.state = 'wander'; s.inflate = 0; s.vz = 0; s.landBoing = true; SFX.pop(); addText(s.x, s.y - s.z - 18, tr('pop'), '#fff');
  puff(s.x, s.y - s.z - 6, '#fff', 14, 60, 0.6, 2); if (s.towBy) { s.towBy.tow = null; s.towBy = null; }
}
function launch(s, vx, vy, vz) { s.state = 'wander'; s.vx = vx; s.vy = vy; s.vz = vz; s.z = Math.max(s.z, 1); s.fly = true; s.landBoing = true; s.scared = 0.6; }
function scatterFrom(x, y, r, power, except) {
  for (const o of L.sheep) {
    if (o === except || o.penned || o.state === 'grabbed' || o.state === 'balloon') continue;
    const dx = o.x - x, dy = o.y - y, d = Math.hypot(dx, dy) || 1; if (d > r) continue;
    if (o.state === 'sleep') { wake(o); continue; }
    if (['dance', 'dizzy', 'munch', 'splash', 'follow'].includes(o.state)) o.state = 'wander';
    const k = power * (1.3 - d / r); o.vx += dx / d * k; o.vy += dy / d * k; if (o.z === 0) o.vz = 80; o.scared = 0.7;
  }
}
function doFart(s, f, big) {
  SFX.fart(big ? 1 : 0.55);
  const c = { x: s.x - s.face * 7, y: s.y - 3, age: 0, max: 2.4, hit: new Set(), seeds: [0, 1, 2, 3, 4, 5].map(() => [rnd(-6, 6), rnd(-4, 2), rnd(0.7, 1.2)]) };
  if (f) { c.hit.add(f); f.stun = big ? 1.6 : 1.0; f.vx = f.vy = 0; f.tow && popBalloon(f.tow); addText(f.x, f.y - 26, tr('cough'), '#c8f78a', 0.8); }
  L.farts.push(c); addText(s.x, s.y - 18, tr('fart'), '#a8f060', 1.25);
  scatterFrom(c.x, c.y, 42, 120, s);
  s.vx += s.face * 90; if (s.z === 0) s.vz = 100; L.shake = 0.15;
}
function onPenned(s) {
  SFX.ding(); SFX.baa(1.2); addText(s.x, s.y - 20, s.name || tr('baa'), '#ffd6ec', 1);
  for (let i = 0; i < 6; i++) part({ x: s.x + rnd(-6, 6), y: s.y - 10, vx: rnd(-10, 10), vy: rnd(-30, -15), life: 1, col: '#ff6b9b', type: 'heart', size: 1 });
  if (s.type === 'g') { SFX.gold(); addText(s.x, s.y - 32, tr('gold'), '#ffe066', 1.4); puff(s.x, s.y - 8, '#ffe066', 24, 80, 1, 1, 'star'); L.shake = 0.2; }
  if (s.state === 'follow') s.state = 'wander';
}
function updSheep(s, dt) {
  s.t -= dt; s.danceCd = (s.danceCd || 0) - dt; s.fartCd -= dt; s.baaCd -= dt; s.touchCd -= dt; s.scared = Math.max(0, s.scared - dt); s.selfT -= dt; s.wet -= dt; s.puddleCd -= dt; s.followT -= dt;
  if (s.state === 'grabbed') return;
  if (s.state !== 'balloon') {
    if (s.z > 0 || s.vz > 0) {
      s.vz -= 420 * dt; s.z += s.vz * dt;
      if (s.z <= 0) {
        s.z = 0;
        if (s.vz < -110) { s.vz = -s.vz * 0.35; if (s.landBoing) { SFX.boing(); addText(s.x, s.y - 16, tr('boing'), '#ffe37a', 0.9); s.landBoing = false; } puff(s.x, s.y, '#e8e2c8', 5, 25, 0.4); }
        else { s.vz = 0; s.fly = false; }
      }
    }
  }
  if (s.type === 'g' && R() < dt * 6) part({ x: s.x + rnd(-7, 7), y: s.y - 6 - s.z + rnd(-4, 4), vx: 0, vy: -8, life: 0.6, col: '#fff7b0', type: 'star' });
  if (s.wet > 0 && R() < dt * 6) part({ x: s.x + rnd(-5, 5), y: s.y - 4 - s.z, vx: 0, vy: 30, life: 0.3, col: '#7ec8ff', type: 'drop' });
  let dvx = 0, dvy = 0;
  switch (s.state) {
    case 'sleep':
      if (s.t <= 0) wake(s);
      if (R() < dt * 0.8) addText(s.x + 6, s.y - 14, 'z', '#cfd8ff', 0.7);
      s.yawnT -= dt;
      if (s.yawnT <= 0 && !s.penned) {
        s.yawnT = 3;
        const near = L.sheep.find(o => o !== s && !o.penned && (o.state === 'wander') && dist(o, s) < 20);
        if (near) { goSleep(near); SFX.yawn(); addText(near.x, near.y - 18, tr('yawn'), '#cfd8ff', 0.9); }
      }
      break;
    case 'dance': {
      if (s.t <= 0) s.state = 'wander';
      if (R() < dt * 4) part({ x: s.x + rnd(-6, 6), y: s.y - 12, vx: rnd(-8, 8), vy: -22, life: 1, col: pick(['#ff6bd5', '#ffe066', '#6bf0ff']), type: 'note' });
      s.z = Math.abs(Math.sin(L.tt * 9 + s.id)) * 3; s.face = Math.sin(L.tt * 4 + s.id) > 0 ? 1 : -1;
      if (s.t > 1) for (const o of L.sheep) if (o !== s && !o.penned && o.state === 'wander' && !(o.danceCd > 0) && dist(o, s) < 13) goDance(o, s.t, true);
      break;
    }
    case 'dizzy': if (s.t <= 0) s.state = 'wander'; break;
    case 'munch': if (s.t <= 0) { s.state = 'balloon'; s.t = 7; s.inflate = 0; SFX.inflate(); } break;
    case 'splash':
      if (s.t <= 0) { s.state = 'wander'; s.puddleCd = 7; }
      if (s.z === 0 && R() < dt * 2.5) { s.vz = 60; puff(s.x, s.y, '#9fd8ff', 6, 40, 0.5, 1, 'dot', 120); SFX.splash(); }
      break;
    case 'follow': {
      const ld = s.follow;
      if (!ld || s.followT <= 0 || (ld.state && (ld.state === 'grabbed' || ld.penned === undefined && false))) { s.state = 'wander'; s.follow = null; break; }
      const dx = ld.x - s.x, dy = ld.y - s.y, d = Math.hypot(dx, dy) || 1;
      if (d > 11) { const sp = Math.min(85, (d - 9) * 4); dvx = dx / d * sp; dvy = dy / d * sp; }
      if (R() < dt * 1.5) part({ x: s.x, y: s.y - 14, vx: rnd(-5, 5), vy: -15, life: 0.8, col: '#ff6b9b', type: 'heart' });
      break;
    }
    case 'balloon': {
      s.inflate = Math.min(1, s.inflate + dt * 1.4); s.z += (17 - s.z) * dt * 1.2;
      const f = s.towBy;
      if (f) {
        if (f.stun > 0 || f.slip > 0 || !L.farmers.includes(f)) { f.tow = null; s.towBy = null; }
        else { s.x += (f.x - s.x) * Math.min(1, dt * 3); s.y += (f.y - 4 - s.y) * Math.min(1, dt * 3); s.vx = s.vy = 0; s.t = Math.max(s.t, 1.5); }
      }
      if (!s.towBy) { dvx = Math.sin(L.tt * 0.9 + s.id) * 14; dvy = Math.cos(L.tt * 0.7 + s.id) * 6; }
      if (s.t <= 0) popBalloon(s); break;
    }
    case 'rocket':
      s.ra += (R() - 0.5) * dt * 16; s.vx = Math.cos(s.ra) * 125; s.vy = Math.sin(s.ra) * 125;
      if (R() < dt * 30) part({ x: s.x - s.face * 7, y: s.y - 4, vx: rnd(-5, 5), vy: rnd(-5, 5), life: 0.5, col: '#e8e8e8', type: 'smoke', size: 2 });
      if (s.t <= 0) s.state = 'wander'; break;
    default: {
      let fx = 0, fy = 0;
      const away = (x, y, R0, w0 = 1) => { const dx = s.x - x, dy = s.y - y, d = Math.hypot(dx, dy); if (d < R0 && d > 0.01) { const w = (1 - d / R0) * w0; fx += dx / d * w; fy += dy / d * w; } };
      for (const f of L.farmers) away(f.x, f.y, f.stinky > 0 ? 66 : 44);
      for (const c of L.chickens) away(c.x, c.y, 32);
      for (const c of L.farts) if (c.age < 1.6) away(c.x, c.y, 34, 1.4);
      if (L.dog && L.dog.nap <= 0) away(L.dog.x, L.dog.y, 34, 1.1);
      const fm = Math.hypot(fx, fy);
      if (fm > 0.02) {
        const spd = sheepSpeed(s) * Math.min(1, 0.45 + fm) * (s.scared > 0 ? 1.35 : 1);
        dvx = fx / fm * spd; dvy = fy / fm * spd;
        if (s.state !== 'flee') { s.state = 'flee'; if (R() < 0.35 && s.z === 0) s.vz = 70; if (s.baaCd <= 0 && R() < 0.5) { SFX.baa(s.pitch); s.baaCd = 1.8; } }
      } else {
        if (s.state === 'flee') s.state = 'wander';
        s.wt -= dt; if (s.wt <= 0) { s.wt = rnd(1.2, 3.5); s.wdir = R() < 0.35 ? null : rnd(0, 6.28); }
        if (s.wdir !== null) { const ws = s.penned ? 6 : 11; dvx = Math.cos(s.wdir) * ws; dvy = Math.sin(s.wdir) * ws; }
        if (!s.penned) {
          // disco magnet
          let best = null, bd = 64; for (const o of L.sheep) if (o.state === 'dance' && !o.penned) { const d = dist(o, s); if (d < bd) { bd = d; best = o; } }
          if (best && !(s.danceCd > 0)) { const dx = best.x - s.x, dy = best.y - s.y, d = Math.hypot(dx, dy) || 1; dvx = dx / d * 28; dvy = dy / d * 28; }
          // puddle love
          if (s.puddleCd <= 0 && s.z === 0) for (const p of L.puddles) { const qx = (s.x - p.x) / p.rx, qy = (s.y - p.y) / p.ry; if (qx * qx + qy * qy < 1) { s.state = 'splash'; s.t = 4; addText(s.x, s.y - 18, tr('splash'), '#9fd8ff', 0.9); break; } }
        }
      }
      for (const o of L.sheep) { if (o === s || o.state === 'grabbed') continue; const dx = s.x - o.x, dy = s.y - o.y, d2 = dx * dx + dy * dy; if (d2 < 100 && d2 > 0.01) { const d = Math.sqrt(d2); dvx += dx / d * (10 - d) * 3; dvy += dy / d * (10 - d) * 3; } }
      if (!s.penned && s.selfT <= 0 && s.state === 'wander' && state !== 'clear') {
        s.selfT = rnd(9, 16);
        if (s.type === 's') goSleep(s); else if (s.type === 'q' && R() < 0.6) goRocket(s); else if (s.type === 'f') doFart(s, null, false);
      }
    }
  }
  if (s.state !== 'rocket' && !s.fly) { const k = Math.min(1, dt * (s.state === 'flee' || s.state === 'follow' ? 7 : 4)); s.vx += (dvx - s.vx) * k; s.vy += (dvy - s.vy) * k; }
  if (s.state === 'sleep' || s.state === 'dance' || s.state === 'munch' || s.state === 'splash') { const k = Math.max(0, 1 - dt * 8); s.vx *= k; s.vy *= k; }
  if (s.state === 'dizzy') { const k = Math.max(0, 1 - dt * 3); s.vx *= k; s.vy *= k; }
  if (s.fly) { s.vx *= (1 - dt * 0.5); s.vy *= (1 - dt * 0.5); }
  s.x += s.vx * dt; s.y += s.vy * dt;
  let hit = false;
  if (s.z < 6) {
    for (const sg of L.pen.walls) if (collideSeg(s, sg, 4)) hit = true;
    if (s.penned || L.gateClosed) if (collideSeg(s, L.pen.gateSeg, 4)) hit = true;
  }
  if (s.x < FX0) { s.x = FX0; s.vx = Math.abs(s.vx) * 0.5; hit = true; } if (s.x > FX1) { s.x = FX1; s.vx = -Math.abs(s.vx) * 0.5; hit = true; }
  if (s.y < FY0) { s.y = FY0; s.vy = Math.abs(s.vy) * 0.5; hit = true; } if (s.y > FY1) { s.y = FY1; s.vy = -Math.abs(s.vy) * 0.5; hit = true; }
  if (hit && s.state === 'rocket') {
    s.state = 'dizzy'; s.t = 3; s.vx *= -0.3; s.vy *= -0.3; s.vz = 80; SFX.bonk(); addText(s.x, s.y - 18, tr('bonk'), '#ffb347', 1.1); L.shake = 0.2;
    puff(s.x, s.y - 6, '#ffe066', 8, 50, 0.5, 1, 'star');
  }
  const p = L.pen;
  if (!s.penned && s.z < 6 && s.x > p.x + 6 && s.x < p.x + p.w - 6 && s.y > p.y + 8 && s.y < p.y + p.h - 3) { s.penned = true; if (s.state === 'rocket' || s.state === 'splash') s.state = 'wander'; onPenned(s); }
  if (Math.abs(s.vx) > 2 && s.state !== 'dance') s.face = s.vx > 0 ? 1 : -1;
  s.anim += Math.hypot(s.vx, s.vy) * dt * 0.25;
}

// ================= FARMERS =================
function shout(f) {
  f.shoutCd = 0.5; f.shout = 0.3; f.lastAct = L.tt; SFX.hopp(); addText(f.x, f.y - 24, tr('hopp'), f.idx === 0 ? '#ffd0d0' : '#d0ffd8', 1);
  part({ x: f.x, y: f.y - 4, vx: 0, vy: 0, life: 0.35, col: '#ffffff', type: 'ring', size: 1 });
  if (f.tow) { popBalloon(f.tow); }
  for (const s of L.sheep) {
    if (s.state === 'grabbed') continue;
    const dx = s.x - f.x, dy = s.y - f.y, d = Math.hypot(dx, dy) || 1; if (d > 52) continue;
    if (s.state === 'sleep') { wake(s); continue; }
    if (s.state === 'follow') continue;
    if (['dance', 'dizzy', 'munch', 'splash'].includes(s.state)) s.state = 'wander';
    if (s.state === 'balloon') { if (!s.towBy) popBalloon(s); continue; }
    const k = 130 * (1.3 - d / 52); s.vx += dx / d * k; s.vy += dy / d * k; if (s.z === 0) s.vz = 80; s.scared = 0.7;
  }
  if (L.wolf && L.wolf.state !== 'flee' && dist(L.wolf, f) < 56) scareWolf(L.wolf, f);
  for (const c of L.chickens) if (dist(c, f) < 40) { c.vx *= 1.6; SFX.cluck(); }
  if (f.frog > 0) dropFrog(f);
  // high five
  const o = L.farmers.find(x => x !== f);
  if (o && L.hiCd <= 0 && Math.abs(o.lastAct - f.lastAct) < 0.4 && dist(o, f) < 18) {
    L.hiCd = 4; f.boost = o.boost = 5; f.vz = o.vz = 120; SFX.clap();
    const mx = (f.x + o.x) / 2, my = (f.y + o.y) / 2 - 14; addText(mx, my - 10, tr('hifive'), '#fff07a', 1.5);
    puff(mx, my, '#ffe066', 20, 90, 0.9, 1, 'star'); puff(mx, my, '#ffffff', 10, 60, 0.6, 1, 'star');
  }
}
function thump(f) {
  SFX.thump(); addText(f.x, f.y - 24, tr('thump'), '#8ff07a', 1); L.shake = 0.12;
  part({ x: f.x, y: f.y - 2, vx: 0, vy: 0, life: 0.4, col: '#c8ffb0', type: 'ring', size: 1 }); puff(f.x, f.y, '#e8e2c8', 8, 40, 0.5);
  scatterFrom(f.x, f.y, 62, 150, null);
  if (L.wolf && L.wolf.state !== 'flee' && dist(L.wolf, f) < 50) scareWolf(L.wolf, f);
}
function dropFrog(f) { f.frog = 0; f.hopping = false; L.frogs.push({ x: f.x, y: f.y, z: 16, vz: 60, state: 'away', tx: f.x + rnd(-60, 60), ty: f.y + rnd(-40, 40), hopT: 0.3, face: 1 }); SFX.ribbit(); addText(f.x, f.y - 26, tr('ribbit'), '#8ff07a', 0.9); }
function updFarmer(f, dt) {
  const inp = dev[f.dev] || { x: 0, y: 0, actP: false };
  f.stun -= dt; f.slip -= dt; f.slow -= dt; f.rain -= dt; f.shoutCd -= dt; f.shout -= dt; f.pieCd -= dt; f.stinky -= dt; f.boost -= dt; f.bell -= dt; f.pudCd -= dt;
  if (f.z > 0 || f.vz > 0) { f.vz -= 420 * dt; f.z += f.vz * dt; if (f.z < 0) { f.z = 0; f.vz = 0; if (f.hopping) { f.hopping = false; thump(f); } } }
  if (f.frog > 0) { f.frog -= dt; if (f.frog <= 0) dropFrog(f); else if (R() < dt * 0.6) { SFX.ribbit(); addText(f.x, f.y - 28, tr('ribbit'), '#8ff07a', 0.8); } }
  if (f.stinky > 0 && R() < dt * 5) part({ x: f.x + rnd(-4, 4), y: f.y - 16, vx: rnd(-3, 3), vy: -12, life: 0.9, col: '#9bc94a', type: 'stink' });
  if (f.boost > 0 && R() < dt * 20) part({ x: f.x + rnd(-3, 3), y: f.y - rnd(0, 12), vx: 0, vy: -6, life: 0.5, col: '#fff07a', type: 'star' });
  f.moving = false;
  if (f.stun > 0) { f.vx *= 0.85; f.vy *= 0.85; }
  else if (f.slip > 0) { f.vx = f.svx; f.vy = f.svy; f.spin += dt * 22; if (R() < dt * 20) puff(f.x, f.y, '#e8e2c8', 1, 10, 0.4); if (f.slip - dt <= 0) { f.stun = 0.5; } }
  else if (f.frog > 0) {
    // frog on head: farmer can only hop
    f.spin = 0;
    if (f.z === 0 && f.vz === 0) { f.vx = f.vy = 0; if (Math.hypot(inp.x, inp.y) > 0.2) { f.vz = 120; f.hopping = true; f.hvx = inp.x * 95; f.hvy = inp.y * 95; } }
    else { f.vx = f.hvx; f.vy = f.hvy; }
    if (inp.actP && f.shoutCd <= 0) shout(f);
  }
  else {
    let sp = 64; if (f.slow > 0) sp *= 0.5; if (f.rain > 0) sp *= 0.8; if (f.boost > 0) sp *= 1.45;
    f.vx = inp.x * sp; f.vy = inp.y * sp; f.spin = 0;
    if (inp.actP && f.shoutCd <= 0) shout(f);
  }
  f.x = clamp(f.x + f.vx * dt, FX0, FX1); f.y = clamp(f.y + f.vy * dt, FY0, FY1);
  const spd = Math.hypot(f.vx, f.vy);
  if (spd > 4) { f.moving = true; f.anim += spd * dt * 0.14; if (Math.abs(f.vx) > 3) f.face = f.vx > 0 ? 1 : -1; if ((f.slow > 0 || f.stinky > 0) && R() < dt * 8) part({ x: f.x + rnd(-2, 2), y: f.y, vx: 0, vy: 0, life: 2, col: '#6b4a24', type: 'foot' }); }
  if (f.stun <= 0 && f.slip <= 0 && f.z < 2) {
    for (const b of L.bananas) if (!b.gone && Math.hypot(b.x - f.x, b.y - f.y) < 6) {
      b.gone = true; b.rt = 10; let dx = f.vx, dy = f.vy, m = Math.hypot(dx, dy); if (m < 1) { dx = f.face; dy = 0; m = 1; }
      f.svx = dx / m * 120; f.svy = dy / m * 120; f.slip = 1.0; f.tow && popBalloon(f.tow); SFX.whoosh(); addText(f.x, f.y - 24, tr('oops'), '#ffe66b', 1.1);
    }
  }
  if (f.pieCd <= 0 && f.z < 2) for (const p of L.pies) if (Math.hypot(p.x - f.x, p.y - f.y) < 6) {
    f.slow = 2.5; f.stinky = 9; f.pieCd = 2; SFX.squelch(); addText(f.x, f.y - 24, tr('squish'), '#c99a5a', 1); setTimeout(() => L && addText(f.x, f.y - 30, tr('stink'), '#b5e061', 0.9), 400); puff(p.x, p.y, '#6b4a24', 6, 30, 0.5);
  }
  for (const p of L.puddles) {
    const dx = (f.x - p.x) / p.rx, dy = (f.y - p.y) / p.ry;
    if (dx * dx + dy * dy < 1 && f.moving && f.z < 2) {
      if (R() < dt * 10) puff(f.x, f.y - 1, '#9fd8ff', 3, 35, 0.4, 1, 'dot', 120);
      if (f.pudCd <= 0 && f.slip <= 0 && f.stun <= 0) { f.pudCd = 2.5; f.svx = f.vx * 1.3; f.svy = f.vy * 1.3; f.slip = 0.35; SFX.splash(); addText(f.x, f.y - 22, tr('splash'), '#9fd8ff', 0.8); }
    }
  }
  for (const c of L.farts) if (c.age < 1.7 && !c.hit.has(f) && Math.hypot(c.x - f.x, c.y - f.y) < 12 && f.stun <= 0) { c.hit.add(f); f.stun = 0.8; f.tow && popBalloon(f.tow); SFX.cough(); addText(f.x, f.y - 26, tr('cough'), '#c8f78a', 0.8); }
  for (const s of L.sheep) {
    if (s.state === 'grabbed') continue;
    if (s.state === 'balloon') { if (!f.tow && !s.towBy && f.stun <= 0 && Math.hypot(s.x - f.x, s.y - f.y) < 10) { f.tow = s; s.towBy = f; SFX.blip(); } continue; }
    if (s.z < 5 && Math.hypot(s.x - f.x, s.y - f.y) < (f.slip > 0 ? 11 : 9)) touchSheep(f, s);
  }
  for (let i = L.chickens.length - 1; i >= 0; i--) {
    const c = L.chickens[i]; if (f.stun > 0 || Math.hypot(c.x - f.x, c.y - f.y) > 10) continue;
    L.chickens.splice(i, 1); SFX.cluck(); SFX.egg(); if (TIMELIMIT && !L.demo) { L.time = Math.min(L.timeMax, L.time + 10); addText(c.x, c.y - 18, tr('egg'), '#fff8e0', 1.2); } else addText(c.x, c.y - 18, tr('egg0'), '#fff8e0', 1.2);
    L.eggs = L.eggs || []; L.eggs.push({ x: c.x, y: c.y, t: 4 }); puff(c.x, c.y - 4, '#ffffff', 16, 70, 1.2, 1, 'feather', 30);
  }
  for (let i = L.bells.length - 1; i >= 0; i--) {
    const b = L.bells[i]; if (f.stun > 0 || Math.hypot(b.x - f.x, b.y - f.y) > 9) continue;
    L.bells.splice(i, 1); f.bell = 6; SFX.bell(); addText(f.x, f.y - 26, tr('bell'), '#ffe066', 1.3);
    const fs = freeSheep().filter(s => !['balloon', 'munch'].includes(s.state)).sort((a, b) => dist(a, f) - dist(b, f));
    let lead = f; for (const s of fs) { s.state = 'follow'; s.follow = lead; s.followT = 6; lead = s; }
  }
  if (L.dog && dist(L.dog, f) < 10 && L.dog.lick <= 0) { L.dog.lick = 3; SFX.woof(); addText(L.dog.x, L.dog.y - 14, tr('woof'), '#fff', 0.9); for (let k = 0; k < 4; k++) part({ x: f.x + rnd(-4, 4), y: f.y - 16, vx: rnd(-8, 8), vy: -18, life: 1, col: '#ff6b9b', type: 'heart' }); }
  if (L.wolf && L.wolf.state !== 'flee' && dist(L.wolf, f) < 11) scareWolf(L.wolf, f);
}
function touchSheep(f, s) {
  const dx = s.x - f.x, dy = s.y - f.y, d = Math.hypot(dx, dy) || 1;
  if (f.slip > 0 && !s.penned) { // banana bowling
    if (s.fly) return;
    launch(s, f.svx * 1.25, f.svy * 1.25, 150); SFX.boing(); addText(s.x, s.y - 20, tr('strike'), '#ffe066', 1.2); puff(s.x, s.y - 6, '#ffe066', 8, 50, 0.5, 1, 'star'); return;
  }
  if (s.state === 'dizzy') { s.vx = f.vx * 1.05 + dx / d * 10; s.vy = f.vy * 1.05 + dy / d * 10; return; }
  if (s.state === 'follow') return;
  s.vx += dx / d * 25; s.vy += dy / d * 25;
  if (s.touchCd > 0) return; s.touchCd = 0.9;
  if (s.state === 'sleep') { wake(s); return; }
  if (s.state === 'splash') { s.state = 'wander'; s.puddleCd = 6; }
  const farty = s.type === 'f' || R() < 0.12;
  if (farty && s.fartCd <= 0 && f.stun <= 0) { doFart(s, f, s.type === 'f'); s.fartCd = 4; return; }
  if (s.baaCd <= 0) { SFX.baa(s.pitch); addText(s.x, s.y - 18, tr('baa'), '#fff'); s.baaCd = 1.2; if (s.z === 0) s.vz = 90; }
}

// ================= WOLF / CRITTERS =================
function spawnWolf() {
  const left = R() < 0.5;
  L.wolf = { x: left ? -12 : W + 12, y: rnd(FY0 + 20, FY1 - 10), state: 'sneak', face: left ? 1 : -1, anim: 0, t: 0, target: null, carry: null, helpT: 0, exitX: 0 };
  SFX.howl(); addText(left ? 40 : W - 40, L.wolf.y - 20, tr('wolf'), '#ff6060', 1.4); L.flash = 1;
}
function scareWolf(w, f) {
  if (w.state === 'flee') return;
  if (!f && L.farmers.length) f = L.farmers.reduce((a, b) => dist(a, w) < dist(b, w) ? a : b);
  SFX.yelp(); addText(w.x, w.y - 22, tr('yelp'), '#ffb0b0', 1.2); puff(w.x, w.y - 8, '#ffe066', 10, 60, 0.6, 1, 'star'); L.shake = 0.25;
  if (w.carry) {
    const s = w.carry; s.z = 10; s.vz = 180; s.vx = rnd(-40, 40); s.vy = rnd(-30, 30); s.landBoing = true; w.carry = null; SFX.baa(1.3);
    if (f && state === 'play') { s.state = 'follow'; s.follow = f; s.followT = 7; addText(s.x, s.y - 34, tr('saved'), '#ffd6ec', 1.1); } else s.state = 'wander';
  }
  w.state = 'flee'; w.exitX = w.x < W / 2 ? -40 : W + 40; w.face = w.exitX < 0 ? -1 : 1; w.sad = false;
}
function updWolf(w, dt) {
  w.t += dt; w.anim += dt * 8;
  const moveTo = (tx, ty, sp) => { const dx = tx - w.x, dy = ty - w.y, d = Math.hypot(dx, dy) || 1; w.x += dx / d * sp * dt; w.y += dy / d * sp * dt; if (Math.abs(dx) > 1) w.face = dx > 0 ? 1 : -1; return d; };
  if (w.state === 'sneak') {
    if (!w.target || w.target.penned || w.target.state === 'grabbed' || w.target.state === 'follow' || w.target.z > 4) { const fs = freeSheep(); w.target = fs.length ? fs.reduce((a, b) => dist(a, w) < dist(b, w) ? a : b) : null; }
    if (!w.target) { w.state = 'flee'; w.sad = true; w.exitX = w.x < W / 2 ? -40 : W + 40; return; }
    if (L.dog && L.dog.nap <= 0 && dist(L.dog, w) < 22) { SFX.woof(); addText(L.dog.x, L.dog.y - 14, tr('woof'), '#fff'); scareWolf(w); return; }
    if (moveTo(w.target.x, w.target.y, 40 + Math.min(12, L.n)) < 9) {
      const s = w.target; s.state = 'grabbed'; w.carry = s; w.state = 'carry'; w.exitX = w.x < W / 2 ? FX0 - 4 : FX1 + 4; SFX.baa(1.5); addText(s.x, s.y - 22, tr('help'), '#ffffff', 1.1);
    }
  } else if (w.state === 'carry') {
    moveTo(w.exitX, w.y, 22); const s = w.carry; s.x = w.x + w.face * 4; s.y = w.y + 1; s.z = 12;
    w.helpT -= dt; if (w.helpT <= 0) { w.helpT = 1.6; SFX.baa(1.5); addText(s.x, s.y - 30, tr('help'), '#ffffff', 1); }
    if (Math.abs(w.x - w.exitX) < 2) {
      s.state = 'wander'; s.x = clamp(s.x, FX0 + 4, FX1 - 4); s.z = 10; s.vz = 170; s.vx = (w.exitX < W / 2 ? 1 : -1) * 70; s.landBoing = true; w.carry = null;
      SFX.bonk(); addText(w.x, w.y - 20, tr('bonk'), '#ffb347'); puff(w.x, w.y - 8, '#ffe066', 6, 40, 0.5, 1, 'star');
      w.state = 'flee'; w.sad = true; w.exitX = w.exitX < W / 2 ? -40 : W + 40;
    }
  } else if (w.state === 'flee') {
    moveTo(w.exitX, w.y, w.sad ? 60 : 150); if (R() < dt * 25) puff(w.x - w.face * 8, w.y, '#e8e2c8', 1, 15, 0.4, 2, 'smoke');
    if (w.x < -30 || w.x > W + 30) { L.wolf = null; L.wolfCd = rnd(14, 22); }
  }
}
function updCritters(dt) {
  for (let i = L.chickens.length - 1; i >= 0; i--) {
    const c = L.chickens[i]; c.t += dt; c.x += c.vx * dt; c.y += Math.sin(c.t * 9) * 40 * dt; c.y = clamp(c.y, FY0, FY1);
    c.cl -= dt; if (c.cl <= 0) { c.cl = rnd(0.5, 0.9); SFX.cluck(); if (R() < 0.4) addText(c.x, c.y - 14, tr('cluck'), '#fff', 0.8); }
    if (R() < dt * 6) part({ x: c.x, y: c.y - 5, vx: rnd(-15, 15), vy: rnd(-20, -5), life: 1.2, col: '#ffffff', type: 'feather', grav: 30 });
    if (c.x < -20 || c.x > W + 20) L.chickens.splice(i, 1);
  }
  for (let i = L.frogs.length - 1; i >= 0; i--) {
    const fr = L.frogs[i];
    if (fr.z > 0 || fr.vz > 0) { fr.vz -= 300 * dt; fr.z += fr.vz * dt; if (fr.z < 0) { fr.z = 0; fr.vz = 0; } }
    fr.hopT -= dt;
    let tx = fr.tx, ty = fr.ty;
    if (fr.state === 'hop') { if (!fr.target || !L.farmers.includes(fr.target)) { fr.state = 'away'; continue; } tx = fr.target.x; ty = fr.target.y; }
    const dx = tx - fr.x, dy = ty - fr.y, d = Math.hypot(dx, dy) || 1;
    if (fr.z > 0) { fr.x += dx / d * 45 * dt; fr.y += dy / d * 45 * dt; fr.face = dx > 0 ? 1 : -1; }
    else if (fr.hopT <= 0) { fr.hopT = 0.55; fr.vz = 75; }
    if (fr.state === 'hop' && d < 10 && fr.target.frog <= 0) { fr.target.frog = 6; SFX.ribbit(); addText(fr.target.x, fr.target.y - 28, tr('ribbit'), '#8ff07a', 1); L.frogs.splice(i, 1); continue; }
    if (fr.state === 'away' && (d < 4 || fr.x < -10 || fr.x > W + 10)) L.frogs.splice(i, 1);
  }
  for (let i = L.clouds.length - 1; i >= 0; i--) {
    const c = L.clouds[i]; c.t -= dt; c.x += (c.f.x - c.x) * dt * 3; c.y = c.f.y - 30;
    c.f.rain = Math.max(c.f.rain, 0.1);
    for (const sh of L.sheep) if (!sh.penned && Math.abs(sh.x - c.x) < 26 && Math.abs(sh.y - c.f.y) < 22) sh.wet = 3;
    if (R() < dt * 30) part({ x: c.x + rnd(-7, 7), y: c.y + 3, vx: 0, vy: 90, life: 0.25, col: '#7ec8ff', type: 'drop' });
    if (c.t <= 0) L.clouds.splice(i, 1);
  }
  for (const c of L.farts) c.age += dt; L.farts = L.farts.filter(c => c.age < c.max);
  for (const b of L.bananas) if (b.gone) { b.rt -= dt; if (b.rt <= 0) { const sp = freeSpot(L.pen, L.farmers, 14); b.x = sp.x; b.y = sp.y; b.gone = false; } }
  if (L.eggs) { for (const e of L.eggs) e.t -= dt; L.eggs = L.eggs.filter(e => e.t > 0); }
  for (const b of L.bells) b.t -= dt; L.bells = L.bells.filter(b => b.t > 0);
  L.hiCd -= dt;
  if (L.dog) updDog(L.dog, dt);
  for (const ff of L.fireflies) { ff.a += dt * ff.s; ff.x += Math.cos(ff.a) * 8 * dt; ff.y += Math.sin(ff.a * 1.3) * 6 * dt; }
}
function updDog(d, dt) {
  d.lick -= dt; d.woofT -= dt; d.napT -= dt;
  if (d.nap > 0) { d.nap -= dt; if (R() < dt * 0.8) addText(d.x + 5, d.y - 10, 'z', '#cfd8ff', 0.7); return; }
  if (d.napT <= 0 && state === 'play') { d.napT = rnd(16, 24); d.nap = 4; addText(d.x, d.y - 14, tr('yawn'), '#cfd8ff', 0.8); return; }
  const fs = freeSheep().filter(s => s.state !== 'follow');
  if (!d.target || d.target.penned || !fs.includes(d.target)) d.target = fs.length ? pick(fs) : null;
  let tx = W / 2, ty = FY0 + 8;
  if (d.target) {
    const gs = L.pen.gateSeg, gx = (gs.x1 + gs.x2) / 2, gy = (gs.y1 + gs.y2) / 2, s = d.target;
    const dx = s.x - gx, dy = s.y - gy, dd = Math.hypot(dx, dy) || 1; tx = s.x + dx / dd * 22; ty = s.y + dy / dd * 22;
  }
  tx = clamp(tx, FX0, FX1); ty = clamp(ty, FY0, FY1);
  const dx = tx - d.x, dy = ty - d.y, dd = Math.hypot(dx, dy);
  const sp = dd > 3 ? Math.min(52, dd * 3) : 0; d.vx += ((dd ? dx / dd : 0) * sp - d.vx) * Math.min(1, dt * 5); d.vy += ((dd ? dy / dd : 0) * sp - d.vy) * Math.min(1, dt * 5);
  d.x += d.vx * dt; d.y += d.vy * dt; if (Math.abs(d.vx) > 2) d.face = d.vx > 0 ? 1 : -1; d.anim += Math.hypot(d.vx, d.vy) * dt * 0.3;
  if (d.woofT <= 0 && d.target && dist(d, d.target) < 30) { d.woofT = rnd(3, 6); SFX.woof(); addText(d.x, d.y - 14, tr('woof'), '#fff', 0.8); }
}
function runEvent(ev) {
  const fs = freeSheep().filter(s => s.state === 'wander' || s.state === 'flee');
  switch (ev) {
    case 'rocket': if (fs.length) goRocket(pick(fs)); break;
    case 'sleep': if (fs.length) goSleep(pick(fs)); break;
    case 'dance': if (fs.length) goDance(pick(fs)); break;
    case 'bell': if (!L.bells.length && !L.demo) { const sp = freeSpot(L.pen, L.farmers, 16); L.bells.push({ x: sp.x, y: sp.y, t: 14 }); SFX.bell(); } break;
    case 'balloon': if (fs.length) { const s = pick(fs); s.state = 'munch'; s.t = 1; addText(s.x, s.y - 18, tr('yum'), '#ffe066'); } break;
    case 'chicken': { const left = R() < 0.5; L.chickens.push({ x: left ? -8 : W + 8, y: rnd(FY0 + 10, FY1 - 10), vx: left ? 75 : -75, t: 0, cl: 0 }); break; }
    case 'rain': if (L.farmers.length) { const f = pick(L.farmers); L.clouds.push({ f, x: f.x, y: f.y - 30, t: 6 }); } break;
    case 'frog': if (L.farmers.length) { const f = pick(L.farmers); if (f.frog > 0) break; const sp = { x: clamp(f.x + rnd(-70, 70), FX0, FX1), y: clamp(f.y + rnd(30, 60) * (f.y < H / 2 ? 1 : -1), FY0, FY1) }; L.frogs.push({ x: sp.x, y: sp.y, z: 0, vz: 0, state: 'hop', target: f, hopT: 0.4, face: 1 }); SFX.ribbit(); } break;
    case 'escape': {
      const pens = L.sheep.filter(s => s.penned && s.state !== 'grabbed');
      if (pens.length >= 2 && pens.length < L.sheep.length && L.escapes < 2 && !L.demo) {
        const s = pick(pens), p = L.pen; L.escapes++; s.penned = false; s.state = 'wander'; s.vz = 190; s.landBoing = true;
        if (p.gate === 'T') { s.vx = (s.x < p.x + p.w / 2 ? -1 : 1) * 60; s.vy = 0; } else { s.vy = (s.y < p.y + p.h / 2 ? -1 : 1) * 60; s.vx = 0; }
        SFX.baa(1.7); setTimeout(() => SFX.baa(1.8), 180); addText(s.x, s.y - 20, tr('hihi'), '#ffe8a0', 1.1);
      }
      break;
    }
  }
}

// ================= UPDATE =================
function updWorld(dt) {
  L.tt += dt;
  for (const f of L.farmers) updFarmer(f, dt);
  for (const s of L.sheep) updSheep(s, dt);
  if (L.wolf) updWolf(L.wolf, dt);
  updCritters(dt);
  if (L.flash) L.flash = Math.max(0, L.flash - dt * 2);
  if (L.banner > 0) L.banner -= dt;
}
function updEvents(dt) {
  L.eventT -= dt;
  if (L.eventT <= 0) { L.eventT = L.demo ? rnd(2.5, 4.5) : rnd(6, 10) * (L.n < 3 ? 1.4 : 1); if (L.def.events.length) runEvent(pick(L.def.events)); }
  if (L.def.wolf && !L.wolf) { L.wolfCd -= dt; if (L.wolfCd <= 0 && freeSheep().length) spawnWolf(); }
}
function updPlay(dt) {
  if (L.banner <= 0 && TIMELIMIT) { L.time -= dt; if (L.time <= 0) { L.time = 0; toTimeup(); return; } }
  updWorld(dt); updEvents(dt);
  if (L.sheep.every(s => s.penned && s.state !== 'grabbed' && s.z < 1)) toClear();
}
function toClear() {
  state = 'clear'; L.clearT = 0; L.gateClosed = true; SFX.fanfare(); L.wolf && scareWolf(L.wolf);
  const fr = L.time / L.timeMax; L.stars = !TIMELIMIT ? 3 : fr > 0.45 ? 3 : fr > 0.2 ? 2 : 1;
  if ((STARS[L.n] || 0) < L.stars) { STARS[L.n] = L.stars; store.set('stars', STARS); }
  const st = (L.n - 1) % STICKER_N; if (!STICKERS.includes(st)) { STICKERS.push(st); store.set('stickers', STICKERS); L.newSticker = st; }
  for (const f of L.farmers) { f.frog = 0; f.tow = null; }
  if (L.n + 1 > BEST) { BEST = L.n + 1; store.set('best', BEST); }
}
function toTimeup() { state = 'timeup'; L.clearT = 0; SFX.sad(); for (const f of L.farmers) { f.sleep = true; f.vx = f.vy = 0; } for (const s of L.sheep) if (s.state !== 'grabbed') { s.state = 'dance'; s.t = 999; } }
function anyActP() { return players.some(p => dev[p.dev].actP) || dev.touch.actP; }
function updClear(dt) {
  L.clearT += dt; L.tt += dt; L.gateAnim = Math.min(1, L.gateAnim + dt * 3);
  for (const s of L.sheep) { if (s.z === 0 && R() < dt * 2) s.vz = rnd(80, 140); if (s.z > 0 || s.vz > 0) { s.vz -= 420 * dt; s.z += s.vz * dt; if (s.z < 0) { s.z = 0; s.vz = 0; } } }
  for (const f of L.farmers) { if (f.z === 0 && R() < dt * 2.5) f.vz = 110; if (f.z > 0 || f.vz > 0) { f.vz -= 420 * dt; f.z += f.vz * dt; if (f.z < 0) { f.z = 0; f.vz = 0; } } }
  if (L.wolf) updWolf(L.wolf, dt);
  if (L.clearT < 3 && R() < dt * 40) part({ x: rnd(0, W), y: -4, vx: rnd(-10, 10), vy: rnd(30, 60), life: 3, col: pick(['#ff5a7a', '#ffd93b', '#5ad1ff', '#7cff6b', '#c58bff']), type: 'conf' });
  if (L.clearT > 2.4 && anyActP()) { SFX.blip(); loadLevel(L.n + 1); }
}
function updTimeup(dt) {
  L.clearT += dt; L.tt += dt;
  for (const s of L.sheep) if (s.state === 'dance') updSheep(s, dt);
  if (Math.floor(L.clearT / 1.8) !== Math.floor((L.clearT - dt) / 1.8)) SFX.snore();
  if (R() < dt * 2) for (const f of L.farmers) addText(f.x + 6, f.y - 14, 'z', '#cfd8ff', 0.8);
  if (L.clearT > 1.5 && anyActP()) { SFX.blip(); loadLevel(L.n); }
}
function joinDevice(id) {
  if (players.some(p => p.dev === id) || players.length >= 2) return;
  players.push({ dev: id }); SFX.join(); initAudio(); MUS.on = true;
}
function menuAct(dir) {
  SFX.blip();
  if (menuIdx === 0) { const i = LANGS.indexOf(LANG); LANG = LANGS[(i + (dir || 1) + LANGS.length) % LANGS.length]; store.set('lang', LANG); }
  else if (menuIdx === 1) { TIMELIMIT = !TIMELIMIT; store.set('time', TIMELIMIT); }
  else if (menuIdx === 2) { startLevel = ((startLevel - 1 + (dir || 1) + BEST) % BEST) + 1; }
  else if (menuIdx === 3 && !dir) { state = 'album'; }
  else if (menuIdx === 4 && !dir) startGame();
}
function startGame() { if (!players.length) return; initAudio(); MUS.on = true; loadLevel(startLevel); }
function updTitle(dt) {
  TT += dt; L.tt += dt;
  for (const id of DEVS) {
    const d = dev[id]; if (!d.ok) continue; const joined = players.some(p => p.dev === id);
    if (d.actP) { if (!joined && players.length < 2) joinDevice(id); else if (joined) menuAct(0); }
    if (joined || !players.length) {
      if (d.nyP) { menuIdx = clamp(menuIdx + d.nyP, 0, 4); SFX.blip(); }
      if (d.nxP && menuIdx < 3) menuAct(d.nxP);
    }
  }
  updWorld(dt); updEvents(dt);
  for (const s of L.sheep) if (s.penned && R() < dt * 0.08) { s.penned = false; s.vz = 180; s.vx = -60; s.landBoing = true; }
}
const PAUSE_ITEMS = ['resume', 'restart', 'fs', 'menu'];
function pauseAct() {
  SFX.blip(); const it = PAUSE_ITEMS[pauseIdx];
  if (it === 'resume') state = L._prev || 'play'; else if (it === 'restart') loadLevel(L.n); else if (it === 'fs') toggleFS(); else { players = []; makeDemo(); state = 'title'; menuIdx = 4; }
}
function updPause() {
  for (const p of players) { const d = dev[p.dev]; if (d.nyP) { pauseIdx = clamp(pauseIdx + d.nyP, 0, PAUSE_ITEMS.length - 1); SFX.blip(); } if (d.actP) { pauseAct(); return; } }
}
function update(dt) {
  if (ptr.actQueued) ptr.actFlash = 0.15; ptr.actFlash = (ptr.actFlash || 0) - dt;
  pollInput(); musicTick();
  if (isPortrait() && state === 'play') { L._prev = 'play'; state = 'pause'; pauseIdx = 0; ptr.joyId = null; }
  const padPause = players.some(p => dev[p.dev].pauseP);
  if ((pauseReq || padPause) && state !== 'album') {
    pauseReq = false;
    if (state === 'pause') state = L._prev || 'play';
    else if (state === 'play' || state === 'clear' || state === 'timeup') { L._prev = state; state = 'pause'; pauseIdx = 0; SFX.blip(); }
  }
  switch (state) {
    case 'title': updTitle(dt); break;
    case 'album': TT += dt; L.tt += dt; updWorld(dt); if (DEVS.some(id => dev[id].ok && dev[id].actP) || pauseReq) { pauseReq = false; state = 'title'; SFX.blip(); } break;
    case 'play': updPlay(dt); break;
    case 'clear': updClear(dt); break;
    case 'timeup': updTimeup(dt); break;
    case 'pause': updPause(dt); return;
  }
  updFx(dt);
}
document.addEventListener('visibilitychange', () => { if (document.hidden && state === 'play') { L._prev = 'play'; state = 'pause'; pauseIdx = 0; } });

// ================= RENDER (WORLD) =================
function drawSpr(img, x, y, z = 0) { g.drawImage(img, Math.round(x - img.width / 2), Math.round(y - img.height - z)); }
function shadow(x, y, w, z) {
  const k = Math.max(0.35, 1 - z / 30), a = Math.max(2, Math.round(w / 2 * k)); g.fillStyle = 'rgba(25,50,20,0.28)';
  g.fillRect(Math.round(x - a + 1), Math.round(y - 2), a * 2 - 2, 3); g.fillRect(Math.round(x - a), Math.round(y - 1), a * 2, 1);
}
function star(x, y, col = '#ffe066') { g.fillStyle = col; g.fillRect(Math.round(x), Math.round(y - 1), 1, 3); g.fillRect(Math.round(x - 1), Math.round(y), 3, 1); }
function dizzyStars(x, y) { for (let k = 0; k < 3; k++) { const a = L.tt * 6 + k * 2.09; star(x + Math.cos(a) * 6, y + Math.sin(a) * 2); } }
const sunC = document.createElement('canvas'); sunC.width = 26; sunC.height = 26;
function sunPos() { const p = L.demo || !TIMELIMIT ? 0.5 : 1 - L.time / L.timeMax; return { p, x: 14 + p * 292, y: 14 - Math.sin(p * Math.PI) * 6 }; }
function drawSun() {
  const sp = sunPos(), p = sp.p, x = 13, y = 13; const g = sunC.getContext('2d'); g.clearRect(0, 0, 26, 26);
  if (L.th.night) { pixCircle(g, x, y, 6, '#fff7d6'); g.globalCompositeOperation = 'destination-out'; pixCircle(g, x + 3, y - 2, 5, '#000'); g.globalCompositeOperation = 'source-over'; return; }
  const low = p > 0.75;
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4 + L.tt * 0.8; g.fillStyle = low ? '#ff9a3c' : '#ffd23f'; g.fillRect(Math.round(x + Math.cos(a) * 9), Math.round(y + Math.sin(a) * 9), 2, 2); }
  pixCircle(g, x, y, 6, low ? '#ffae4a' : '#ffe14d');
  g.fillStyle = '#5a3a1a'; g.fillRect(Math.round(x - 3), Math.round(y - 2), 1, 2); g.fillRect(Math.round(x + 2), Math.round(y - 2), 1, 2);
  if (low) { g.fillRect(Math.round(x - 1), Math.round(y + 2), 3, 1); g.fillStyle = '#7ec8ff'; g.fillRect(Math.round(x + 5), Math.round(y - 3), 1, 2); }
  else { g.fillRect(Math.round(x - 2), Math.round(y + 2), 5, 1); g.fillRect(Math.round(x - 3), Math.round(y + 1), 1, 1); g.fillRect(Math.round(x + 3), Math.round(y + 1), 1, 1); }
}
function fenceH(x1, x2, y) {
  g.fillStyle = '#9c6a3a'; g.fillRect(x1, y - 7, x2 - x1 + 1, 2); g.fillRect(x1, y - 3, x2 - x1 + 1, 2);
  g.fillStyle = '#c48a4e'; g.fillRect(x1, y - 7, x2 - x1 + 1, 1); g.fillRect(x1, y - 3, x2 - x1 + 1, 1);
  for (let x = x1; x <= x2; x += 8) { g.fillStyle = '#7a4f28'; g.fillRect(x, y - 9, 2, 10); g.fillStyle = '#a8743f'; g.fillRect(x, y - 9, 1, 9); }
  g.fillStyle = '#7a4f28'; g.fillRect(x2 - 1, y - 9, 2, 10);
}
function fenceV(x, y1, y2) {
  g.fillStyle = '#9c6a3a'; g.fillRect(x - 1, y1 - 7, 2, y2 - y1 + 2); g.fillStyle = '#c48a4e'; g.fillRect(x - 1, y1 - 7, 1, y2 - y1 + 2);
  for (let y = y1; y <= y2; y += 8) { g.fillStyle = '#7a4f28'; g.fillRect(x - 1, y - 9, 2, 10); g.fillStyle = '#a8743f'; g.fillRect(x - 1, y - 9, 1, 9); }
}
function drawWall(s) { if (s.y1 === s.y2) fenceH(Math.min(s.x1, s.x2), Math.max(s.x1, s.x2), s.y1); else fenceV(s.x1, Math.min(s.y1, s.y2), Math.max(s.y1, s.y2)); }
function drawGate() {
  const s = L.pen.gateSeg;
  if (L.gateClosed) { g.fillStyle = '#d9a35c'; if (s.y1 === s.y2) { g.fillRect(s.x1, s.y1 - 7, s.x2 - s.x1, 2); g.fillRect(s.x1, s.y1 - 3, s.x2 - s.x1, 2); } else { g.fillRect(s.x1 - 1, s.y1 - 7, 2, s.y2 - s.y1); } return; }
  // inviting arrows outside the gate
  const ph = (L.tt * 2) % 1, col = '#fff36b';
  for (let k = 0; k < 3; k++) {
    const o = (2 - k) * 7 + ph * 7, a = 1 - ((k * 7 + ph * 7) / 21) * 0.2;
    g.globalAlpha = Math.max(0.15, 0.9 - k * 0.25) * a; g.fillStyle = col;
    if (L.pen.gate === 'L') { const cx = s.x1 - o - 4, cy = (s.y1 + s.y2) / 2 - 3; for (let i = 0; i < 4; i++) { g.fillRect(cx + i, cy - 3 + i, 2, 1); g.fillRect(cx + i, cy + 3 - i, 2, 1); } }
    else if (L.pen.gate === 'R') { const cx = s.x1 + o + 4, cy = (s.y1 + s.y2) / 2 - 3; for (let i = 0; i < 4; i++) { g.fillRect(cx - i, cy - 3 + i, 2, 1); g.fillRect(cx - i, cy + 3 - i, 2, 1); } }
    else { const cx = (s.x1 + s.x2) / 2, cy = s.y1 - o - 6; for (let i = 0; i < 4; i++) { g.fillRect(cx - 3 + i, cy + i, 1, 2); g.fillRect(cx + 3 - i, cy + i, 1, 2); } }
  }
  g.globalAlpha = 1;
}
function drawSheep(s) {
  let tint = s.tint; if (s.state === 'dance') tint = DISCO[Math.floor(L.tt * 6 + s.id) % 4];
  const moving = Math.hypot(s.vx, s.vy) > 3 && s.z < 1, fr = moving ? Math.floor(s.anim) % 2 : 0;
  const closed = s.state === 'sleep' || (state === 'timeup' && false);
  const img = SPR.sheep[tint][fr][closed ? 1 : 0][s.face > 0 ? 0 : 1];
  if (s.state === 'grabbed') {
    g.save(); g.translate(Math.round(s.x), Math.round(s.y - s.z - 6)); g.rotate(Math.sin(L.tt * 14) * 0.4 + Math.PI); g.drawImage(img, -8, -6); g.restore(); return;
  }
  if (s.state === 'balloon' || s.state === 'munch') {
    const k = 1 + 0.7 * s.inflate + (s.state === 'munch' ? Math.abs(Math.sin(L.tt * 14)) * 0.08 : 0), w = 16 * k, h = 11 * k;
    g.drawImage(img, Math.round(s.x - w / 2), Math.round(s.y - h - s.z), Math.round(w), Math.round(h));
    if (s.state === 'balloon') {
      g.fillStyle = '#ffffff'; g.fillRect(Math.round(s.x - w / 4), Math.round(s.y - h - s.z + 2), 2, 2);
      const ex = s.towBy ? s.towBy.x + 3 : s.x + Math.sin(L.tt * 2 + s.id) * 2, ey = s.towBy ? s.towBy.y - 9 : s.y - 2;
      g.fillStyle = '#f2f2f2'; const n = 10; for (let i = 0; i <= n; i++) { const t = i / n, px = s.x + (ex - s.x) * t + Math.sin(t * 6 + L.tt * 4) * 1.2, py = (s.y - s.z) + (ey - (s.y - s.z)) * t; g.fillRect(Math.round(px), Math.round(py), 1, 1); }
      if (!s.towBy) { g.fillStyle = '#ff5a7a'; g.fillRect(Math.round(ex) - 1, Math.round(ey), 3, 2); }
    }
    return;
  }
  if (s.state === 'rocket') { g.save(); g.translate(Math.round(s.x), Math.round(s.y - 5 - s.z)); g.rotate(Math.sin(L.tt * 30) * 0.15); g.drawImage(img, -8, -6); g.restore(); }
  else drawSpr(img, s.x, s.y, s.z);
  if (s.state === 'dizzy') dizzyStars(s.x, s.y - 14 - s.z);
  if (s.state === 'sleep') { g.fillStyle = '#6a5acd'; g.fillRect(Math.round(s.x + s.face * 4) - 2, Math.round(s.y - 13), 5, 2); g.fillStyle = '#fff'; g.fillRect(Math.round(s.x + s.face * 4) + 3, Math.round(s.y - 14), 1, 1); }
}
function drawFarmer(f) {
  const fr = f.moving ? 1 + (Math.floor(f.anim) % 2) : 0, closed = f.sleep || f.stun > 0.6;
  const img = SPR.farmer[f.idx][f.sleep ? 0 : fr][closed ? 1 : 0];
  let x = f.x, y = f.y;
  if (f.sleep) { g.save(); g.translate(Math.round(x), Math.round(y - 3)); g.rotate(Math.PI / 2 * (f.idx ? -1 : 1)); g.drawImage(img, -6, -8); g.restore(); return; }
  if (f.stun > 0) x += Math.sin(L.tt * 25) * 1.2;
  if (f.slip > 0) { g.save(); g.translate(Math.round(x), Math.round(y - 8 - f.z)); g.rotate(f.spin); g.drawImage(img, -6, -8); g.restore(); }
  else drawSpr(img, x, y, f.z);
  if (f.stun > 0) dizzyStars(f.x, y - 18 - f.z);
  if (f.shout > 0) { g.fillStyle = '#2a2233'; g.fillRect(Math.round(x) - 1, Math.round(y - 9 - f.z), 2, 2); }
  if (f.frog > 0) { const bob = Math.abs(Math.sin(L.tt * 6)) * 1; g.drawImage(SPR.frog, Math.round(x - 3), Math.round(y - 20 - f.z - bob)); }
  if (f.bell > 0) g.drawImage(SPR.bell, Math.round(x + 5), Math.round(y - 11 - f.z + Math.sin(L.tt * 18) * 1));
}
function drawWolf(w) {
  const img = SPR.wolf[Math.floor(w.anim) % 2][w.face > 0 ? 0 : 1];
  drawSpr(img, w.x, w.y, 0);
  if (w.state === 'flee' && !w.sad) { g.fillStyle = '#ff5050'; g.fillRect(Math.round(w.x - w.face * 9), Math.round(w.y - 9), 2, 2); }
  if (w.state === 'sneak' && Math.floor(L.tt * 3) % 2) { g.fillStyle = '#ff4040'; g.fillRect(Math.round(w.x) - 1, Math.round(w.y - 20), 2, 4); g.fillRect(Math.round(w.x) - 1, Math.round(w.y - 15), 2, 1); }
}
function drawFart(c) {
  const a = 1 - c.age / c.max, rr = 3 + Math.min(1, c.age * 2) * 6;
  g.globalAlpha = a * 0.75;
  for (const sd of c.seeds) pixCircle(g, c.x + sd[0] * (0.6 + c.age), c.y + sd[1] * (0.6 + c.age) - c.age * 3, rr * sd[2] * 0.6, '#a6e05a');
  g.globalAlpha = a * 0.5; for (const sd of c.seeds) pixCircle(g, c.x + sd[0] * (0.6 + c.age) - 1, c.y + sd[1] * (0.6 + c.age) - c.age * 3 - 1, rr * sd[2] * 0.35, '#d4ff8a');
  g.globalAlpha = 1;
}
function drawParticles() {
  for (const p of L.parts) {
    const a = clamp(p.life / p.max, 0, 1); g.globalAlpha = p.type === 'foot' ? a * 0.6 : Math.min(1, a * 1.5); g.fillStyle = p.col;
    const x = Math.round(p.x), y = Math.round(p.y);
    switch (p.type) {
      case 'ring': { const r = 6 + (1 - a) * 46; g.globalAlpha = a * 0.8; g.strokeStyle = p.col; g.lineWidth = 1; g.beginPath(); g.ellipse(p.x, p.y, r, r * 0.55, 0, 0, 7); g.stroke(); break; }
      case 'star': star(x, y, p.col); break;
      case 'note': g.fillRect(x, y, 2, 2); g.fillRect(x + 1, y - 3, 1, 3); g.fillRect(x + 2, y - 3, 1, 1); break;
      case 'heart': g.fillRect(x - 1, y, 1, 1); g.fillRect(x + 1, y, 1, 1); g.fillRect(x - 1, y + 1, 3, 1); g.fillRect(x, y + 2, 1, 1); break;
      case 'smoke': pixCircle(g, x, y, (p.size || 2) * (1.5 - a), p.col); break;
      case 'conf': if (Math.sin(p.rot) > 0) g.fillRect(x, y, 2, 1); else g.fillRect(x, y, 1, 2); break;
      case 'drop': g.fillRect(x, y, 1, 2); break;
      case 'feather': g.fillRect(x, y, 2, 1); break;
      case 'stink': { const o = Math.round(Math.sin(p.rot) * 1.5); g.fillRect(x + o, y, 1, 2); g.fillRect(x - o, y - 2, 1, 2); break; }
      case 'foot': g.fillRect(x, y, 2, 1); break;
      default: g.fillRect(x, y, p.size || 1, p.size || 1);
    }
  }
  g.globalAlpha = 1;
}
function drawNight() {
  ng.globalCompositeOperation = 'source-over'; ng.clearRect(0, 0, W, H); ng.fillStyle = 'rgba(6,10,36,0.7)'; ng.fillRect(0, 0, W, H);
  ng.globalCompositeOperation = 'destination-out';
  const hole = (x, y, r, a = 1) => { const gr = ng.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, `rgba(0,0,0,${a})`); gr.addColorStop(0.55, `rgba(0,0,0,${a * 0.75})`); gr.addColorStop(1, 'rgba(0,0,0,0)'); ng.fillStyle = gr; ng.beginPath(); ng.arc(x, y, r, 0, 7); ng.fill(); };
  for (const f of L.farmers) hole(f.x, f.y - 6, 52);
  const p = L.pen; hole(p.x + p.w / 2, p.y + p.h / 2, 40, 0.8);
  for (const s of L.sheep) hole(s.x, s.y - 5 - s.z, 11, 0.55);
  for (const ff of L.fireflies) hole(ff.x, ff.y, 7, 0.7);
  if (L.dog) hole(L.dog.x, L.dog.y - 4, 14, 0.6);
  g.drawImage(nc, 0, 0);
  for (const ff of L.fireflies) { g.fillStyle = (Math.sin(L.tt * 4 + ff.a * 3) > 0) ? '#fff59a' : '#c9e85a'; g.fillRect(Math.round(ff.x), Math.round(ff.y), 1, 1); }
}
function renderWorld() {
  g.drawImage(L.bg, 0, 0);
  for (const p of L.puddles) { pixEllipse(g, p.x, p.y, p.rx, p.ry, '#5aa9e6'); pixEllipse(g, p.x - 2, p.y - 1, Math.round(p.rx * 0.5), 1, '#a8dcff'); }
  for (const p of L.pies) { pixEllipse(g, p.x, p.y, 5, 2, '#6b4a24'); pixEllipse(g, p.x, p.y - 1, 3, 1, '#86602f'); if (Math.floor(L.tt * 2 + p.x) % 3 === 0) { g.fillStyle = '#222'; g.fillRect(Math.round(p.x + 2 + Math.sin(L.tt * 9) * 3), Math.round(p.y - 5 + Math.cos(L.tt * 7) * 2), 1, 1); } }
  for (const b of L.bananas) if (!b.gone) g.drawImage(SPR.banana, Math.round(b.x - 3), Math.round(b.y - 3));
  if (L.eggs) for (const e of L.eggs) { pixEllipse(g, e.x, e.y - 2, 2, 3, '#fffaf0'); g.fillStyle = '#e8dcc0'; g.fillRect(Math.round(e.x) + 1, Math.round(e.y) - 1, 1, 2); }
  for (const b of L.bells) { const bob = Math.sin(L.tt * 5) * 1.5; shadow(b.x, b.y, 6, 2); if (Math.floor(L.tt * 4) % 2) { g.fillStyle = '#fff7b0'; star(b.x + 5, b.y - 9 + bob, '#fff7b0'); } g.drawImage(SPR.bell, Math.round(b.x - 2), Math.round(b.y - 8 + bob)); if (b.t < 4 && Math.floor(L.tt * 8) % 2) g.clearRect(0, 0, 0, 0); }
  const front = L.pen.walls[0];
  for (let i = 1; i < L.pen.walls.length; i++) drawWall(L.pen.walls[i]);
  drawGate();
  // shadows
  for (const s of L.sheep) if (s.state !== 'grabbed') shadow(s.x, s.y, 14 * (1 + 0.5 * s.inflate), s.z);
  for (const f of L.farmers) if (!f.sleep) shadow(f.x, f.y, 10, f.z);
  if (L.wolf) shadow(L.wolf.x, L.wolf.y, 16, 0);
  for (const c of L.chickens) shadow(c.x, c.y, 7, 0);
  for (const fr of L.frogs) shadow(fr.x, fr.y, 6, fr.z);
  if (L.dog) shadow(L.dog.x, L.dog.y, 11, 0);
  // sorted entities
  const ents = [];
  for (const s of L.sheep) if (s.state !== 'grabbed') ents.push([s.y + (s.state === 'balloon' ? 40 : 0), () => drawSheep(s)]);
  for (const f of L.farmers) ents.push([f.y, () => drawFarmer(f)]);
  if (L.wolf) { const w = L.wolf; ents.push([w.y, () => { drawWolf(w); if (w.carry) drawSheep(w.carry); }]); }
  for (const c of L.chickens) ents.push([c.y, () => drawSpr(SPR.chick[Math.floor(c.t * 10) % 2][c.vx > 0 ? 0 : 1], c.x, c.y, Math.abs(Math.sin(c.t * 12)) * 2)]);
  for (const fr of L.frogs) ents.push([fr.y, () => drawSpr(SPR.frog, fr.x, fr.y, fr.z)]);
  if (L.dog) { const d = L.dog; ents.push([d.y, () => { const mv = Math.hypot(d.vx, d.vy) > 4 && d.nap <= 0; drawSpr(SPR.dog[mv ? Math.floor(d.anim) % 2 : 0][d.face > 0 ? 0 : 1], d.x, d.y, mv ? Math.abs(Math.sin(d.anim * 3.14)) * 1.5 : 0); }]); }
  ents.sort((a, b) => a[0] - b[0]); for (const e of ents) e[1]();
  drawWall(front);
  for (const c of L.farts) drawFart(c);
  drawParticles();
  for (const c of L.clouds) { pixCircle(g, c.x - 5, c.y, 4, '#8a93a8'); pixCircle(g, c.x + 1, c.y - 2, 5, '#9aa3b8'); pixCircle(g, c.x + 6, c.y, 4, '#8a93a8'); g.fillStyle = '#3a3f50'; g.fillRect(Math.round(c.x - 2), Math.round(c.y - 1), 1, 1); g.fillRect(Math.round(c.x + 3), Math.round(c.y - 1), 1, 1); g.fillRect(Math.round(c.x - 1), Math.round(c.y + 2), 4, 1); }
  if (L.th.night) drawNight();
  if (!L.demo && TIMELIMIT && L.time < L.timeMax * 0.25 && state !== 'clear') { g.globalAlpha = (1 - L.time / (L.timeMax * 0.25)) * 0.28; g.fillStyle = '#ff7a2a'; g.fillRect(0, 0, W, H); g.globalAlpha = 1; }
  if (state === 'timeup') { g.globalAlpha = Math.min(0.55, L.clearT * 0.4); g.fillStyle = '#0c1440'; g.fillRect(0, 0, W, H); g.globalAlpha = 1; }
  if (L.flash > 0) { g.globalAlpha = L.flash * 0.3; g.fillStyle = '#ff2020'; g.fillRect(0, 0, W, H); g.globalAlpha = 1; }
}

// ================= RENDER (UI) =================
function txt(s, x, y, size, col, align = 'center', outline = true) {
  ctx.font = `900 ${Math.round(size)}px ${FONT}`; ctx.textAlign = align; ctx.textBaseline = 'middle';
  if (outline) { ctx.lineJoin = 'round'; ctx.lineWidth = Math.max(2, size * 0.24); ctx.strokeStyle = '#2a1d33'; ctx.strokeText(s, x, y); }
  ctx.fillStyle = col; ctx.fillText(s, x, y);
}
const sx = x => OX + x * S, sy = y => OY + y * S;
function pill(x, y, w, h, col = 'rgba(42,29,51,0.72)') { ctx.fillStyle = col; const r = h / 2; ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.fill(); }
function addHit(x, y, w, h, fn) { HITS.push({ x, y, w, h, fn }); }
function renderTexts() {
  for (const t of L.texts) {
    const a = clamp(t.life / t.max, 0, 1), age = t.max - t.life, pop = age < 0.12 ? 0.6 + age / 0.12 * 0.5 : 1.1 - Math.min(0.1, (age - 0.12));
    ctx.globalAlpha = Math.min(1, a * 2); ctx.font = `900 ${Math.round(7 * S * t.size)}px ${FONT}`; const hw = ctx.measureText(t.txt).width / 2 / S + 3;
    txt(t.txt, sx(clamp(t.x, hw, W - hw)), sy(clamp(t.y, 8, H - 6)), 7 * S * t.size * pop, t.col); ctx.globalAlpha = 1;
  }
}
function renderHUD() {
  const u = S;
  // sheep counter
  const n = L.sheep.length, k = Math.max(1, Math.round(u * 0.9)), iw = 16 * k, gap = 3 * k, tw = n * (iw + gap) + gap * 2;
  pill(sx(4), sy(3), tw, 15 * k);
  ctx.imageSmoothingEnabled = false;
  L.sheep.forEach((s, i) => {
    const img = SPR.sheep[s.tint][0][0][0]; ctx.globalAlpha = s.penned ? 1 : 0.28;
    const bob = s.penned ? Math.abs(Math.sin(L.tt * 4 + i)) * k : 0;
    ctx.drawImage(img, sx(4) + gap * 1.5 + i * (iw + gap), sy(4.5) + 1 * k - bob, iw, 11 * k);
  });
  ctx.globalAlpha = 1;
  // level
  const lt = `${tr('lvl')} ${L.n}`; ctx.font = `900 ${Math.round(7 * u)}px ${FONT}`; const lw = ctx.measureText(lt).width + 12 * u;
  pill(sx(W - 4) - lw - (usingTouch ? 18 * u : 0), sy(3), lw, 13 * u); txt(lt, sx(W - 4) - lw / 2 - (usingTouch ? 18 * u : 0), sy(9.5), 7 * u, '#fff3b0');
  // player markers
  for (const f of L.farmers) {
    if (f.sleep) continue; const x = sx(f.x), y = sy(f.y - 21 - f.z) - (f.frog > 0 ? 6 * u : 0);
    ctx.fillStyle = PCOL[f.idx]; ctx.beginPath(); ctx.moveTo(x - 3 * u, y - 3 * u); ctx.lineTo(x + 3 * u, y - 3 * u); ctx.lineTo(x, y); ctx.fill();
    if (L.farmers.length > 1) txt(String(f.idx + 1), x, y - 7 * u, 6 * u, '#fff');
  }
  if (L.banner > 0 && state === 'play') {
    const a = Math.min(1, L.banner * 2); ctx.globalAlpha = a;
    txt(`${tr('lvl')} ${L.n}`, cv.width / 2, sy(H * 0.4), 22 * u, '#fff3b0'); txt(tr('sub'), cv.width / 2, sy(H * 0.4) + 18 * u, 9 * u, '#ffffff');
    ctx.globalAlpha = 1;
  }
}
function renderTouch() {
  if (!usingTouch || !players.some(p => p.dev === 'touch')) return;
  const u = S, m = Math.min(cv.width, cv.height), r = m * 0.12, cx = cv.width - r - m * 0.07, cy = cv.height - r - m * 0.07;
  if (state === 'play') {
    // joystick
    const jr = JOY_R();
    const bx = ptr.joyId !== null ? ptr.jx0 : m * 0.07 + jr, by = ptr.joyId !== null ? ptr.jy0 : cv.height - m * 0.07 - jr;
    ctx.globalAlpha = ptr.joyId !== null ? 0.55 : 0.3; ctx.fillStyle = '#2a1d33'; ctx.beginPath(); ctx.arc(bx, by, jr, 0, 7); ctx.fill();
    ctx.lineWidth = m * 0.008; ctx.strokeStyle = '#ffffff'; ctx.stroke();
    let kx = bx, ky = by; if (ptr.joyId !== null) { const ox = ptr.jx - bx, oy = ptr.jy - by, d = Math.hypot(ox, oy), k = Math.min(1, jr / (d || 1)); kx = bx + ox * k; ky = by + oy * k; }
    ctx.globalAlpha = ptr.joyId !== null ? 0.9 : 0.55; ctx.fillStyle = '#f6cf55'; ctx.beginPath(); ctx.arc(kx, ky, jr * 0.45, 0, 7); ctx.fill(); ctx.lineWidth = m * 0.01; ctx.strokeStyle = '#2a1d33'; ctx.stroke();
    ctx.globalAlpha = 1;
    // HOPP button
    const pressed = ptr.actFlash > 0;
    ctx.globalAlpha = 0.88; ctx.fillStyle = pressed ? '#ff7a7e' : '#e5484d'; ctx.beginPath(); ctx.arc(cx, cy, r * (pressed ? 0.92 : 1), 0, 7); ctx.fill();
    ctx.lineWidth = r * 0.12; ctx.strokeStyle = '#2a1d33'; ctx.stroke(); ctx.globalAlpha = 1;
    txt(tr('btn'), cx, cy, r * 0.5, '#fff');
  }
  if (state === 'play' || state === 'clear' || state === 'timeup') {
    const b = 14 * u, bx = sx(W - 4) - b, by = sy(3);
    pill(bx, by, b, 13 * u); ctx.fillStyle = '#fff'; ctx.fillRect(bx + b * 0.33, by + 3.5 * u, 2 * u, 6 * u); ctx.fillRect(bx + b * 0.55, by + 3.5 * u, 2 * u, 6 * u);
    addHit(bx - 4 * u, by - 4 * u, b + 8 * u, 21 * u, () => { L._prev = state; state = 'pause'; pauseIdx = 0; ptr.joyId = null; });
  }
}
function renderRotate() {
  ctx.fillStyle = '#1b1426'; ctx.fillRect(0, 0, cv.width, cv.height);
  const cx = cv.width / 2, cy = cv.height * 0.42, m = Math.min(cv.width, cv.height), a = Math.sin(performance.now() / 500) * 0.5 - 0.6;
  ctx.save(); ctx.translate(cx, cy); ctx.rotate(a); ctx.fillStyle = '#f6cf55'; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = m * 0.015;
  const w = m * 0.26, h = m * 0.46; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(-w / 2, -h / 2, w, h, m * 0.04) : ctx.rect(-w / 2, -h / 2, w, h); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#79c653'; ctx.fillRect(-w / 2 + m * 0.02, -h / 2 + m * 0.04, w - m * 0.04, h - m * 0.08); ctx.font = `${Math.round(m * 0.12)}px sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('🐑', 0, 0);
  ctx.restore();
  txt(tr('rotate'), cx, cv.height * 0.75, m * 0.075, '#fff07a');
}
function renderTitle() {
  const u = S, cx = cv.width / 2;
  ctx.fillStyle = 'rgba(20,12,35,0.28)'; ctx.fillRect(OX, OY, W * S, H * S);
  const words = ['BAA BAA', 'CHAOS!'], cols = ['#ffffff', '#fff07a', '#ffb3d9', '#9fe7ff'];
  words.forEach((wd, wi) => {
    const size = (wi ? 30 : 24) * u; ctx.font = `900 ${Math.round(size)}px ${FONT}`; const full = ctx.measureText(wd).width; let x = cx - full / 2;
    for (let i = 0; i < wd.length; i++) {
      const ch = wd[i], cw = ctx.measureText(ch).width, bob = Math.sin(TT * 4 + i * 0.6 + wi) * 3 * u, rot = Math.sin(TT * 3 + i) * 0.08;
      ctx.save(); ctx.translate(x + cw / 2, sy(wi ? 50 : 26) + bob); ctx.rotate(rot); txt(ch, 0, 0, size, cols[(i + wi) % cols.length]); ctx.restore(); x += cw;
    }
  });
  txt(tr('sub'), cx, sy(70), 8 * u, '#ffffff');
  // player slots
  for (let i = 0; i < 2; i++) {
    const p = players[i], x = cx + (i ? 6 : -6) * u + (i ? 0 : -86 * u), w = 80 * u, y = sy(80);
    pill(x, y, w, 15 * u, p ? (i ? 'rgba(63,180,94,0.85)' : 'rgba(229,72,77,0.85)') : 'rgba(42,29,51,0.6)');
    const label = p ? `${tr('p')} ${i + 1}  ✔` : (Math.floor(TT * 2) % 2 ? tr('waiting') : `${tr('p')} ${i + 1}`);
    txt(label, x + w / 2, y + 7.5 * u, 7 * u, '#ffffff');
  }
  const touchJoined = usingTouch && players.some(p => p.dev === 'touch');
  if (touchJoined) { const pulse = 1 + Math.sin(TT * 6) * 0.06; ctx.save(); ctx.translate(cx, sy(101)); ctx.scale(pulse, pulse); pill(-75 * u, -7 * u, 150 * u, 14 * u, 'rgba(229,72,77,0.92)'); txt(tr('tapStart'), 0, 0, 7.5 * u, '#ffffff'); ctx.restore(); }
  else if (players.length < 2) txt(usingTouch && !players.length ? tr('tapJoin') : tr('join'), cx, sy(101), 6 * u, Math.floor(TT * 2.5) % 2 ? '#fff07a' : '#ffffff');
  // menu
  const items = [`${tr('lang')}:  ◀ ${tr('name')} ▶`, `${tr('time')}:  ◀ ${TIMELIMIT ? tr('on') : tr('off')} ▶`, `${tr('lvl')}:  ◀ ${startLevel} ▶`, `${tr('stickers')}  ${STICKERS.length}/${STICKER_N}`, tr('start')];
  items.forEach((it, i) => {
    const y = sy(112 + i * 12), sel = i === menuIdx, size = (i === 4 ? 10 : 6.5) * u;
    ctx.font = `900 ${Math.round(size)}px ${FONT}`; const w = ctx.measureText(it).width + 18 * u;
    if (sel) pill(cx - w / 2, y - 6.5 * u, w, 13 * u, i === 4 ? (players.length ? 'rgba(229,72,77,0.95)' : 'rgba(120,100,130,0.8)') : 'rgba(255,255,255,0.22)');
    txt(it, cx, y, size, sel ? '#ffffff' : '#e8dcff');
    addHit(cx - w / 2, y - 6.5 * u, w, 13 * u, () => {
      initAudio(); if (!players.length) joinDevice(lastMouse ? 'kb1' : 'touch');
      if (i === 4 && usingTouch && canFS() && !isFS()) enterFS();
      menuIdx = i; if (i < 3) menuAct(1); else menuAct(0);
    });
  });
  txt(usingTouch ? tr('touch') : tr('ctrl'), cx, sy(173), 4.6 * u, '#d8ccef', 'center', true);
  // language flags (tap)
  LANGS.forEach((lg, i) => {
    const bw = 22 * u, bx = sx(W - 4) - (3 - i) * (bw + 3 * u), by = sy(4);
    pill(bx, by, bw, 11 * u, lg === LANG ? 'rgba(255,240,122,0.9)' : 'rgba(42,29,51,0.6)');
    txt(lg.toUpperCase(), bx + bw / 2, by + 5.5 * u, 6 * u, lg === LANG ? '#2a1d33' : '#fff', 'center', false);
    addHit(bx, by, bw, 11 * u, () => { LANG = lg; store.set('lang', LANG); SFX.blip(); });
  });
  // sound toggle
  const mb = 13 * u, mx = sx(4), my = sy(4); pill(mx, my, mb * 1.6, 11 * u); txt(muted ? '🔇' : '🔊', mx + mb * 0.8, my + 5.5 * u, 7 * u, '#fff', 'center', false);
  addHit(mx, my, mb * 1.6, 11 * u, () => { initAudio(); setMute(!muted); });
  if (canFS()) { const fx = mx + mb * 1.6 + 3 * u; pill(fx, my, mb * 1.6, 11 * u); txt(isFS() ? '⤢' : '⛶', fx + mb * 0.8, my + 5.5 * u, 8 * u, '#fff', 'center', false); addHit(fx, my, mb * 1.6, 11 * u, toggleFS); }
}
function renderAlbum() {
  const u = S, cx = cv.width / 2;
  ctx.fillStyle = 'rgba(20,12,35,0.75)'; ctx.fillRect(0, 0, cv.width, cv.height);
  txt(tr('stickers'), cx, sy(22), 16 * u, '#fff07a');
  ctx.imageSmoothingEnabled = false;
  const cols = 6, cw = 44 * u, ch = 44 * u, x0 = cx - cols * cw / 2;
  for (let i = 0; i < STICKER_N; i++) {
    const c = i % cols, r = Math.floor(i / cols), x = x0 + c * cw + cw / 2, y = sy(62) + r * ch, own = STICKERS.includes(i), sz = 40 * u;
    ctx.save(); ctx.translate(x, y); ctx.rotate(own ? Math.sin(TT * 2 + i) * 0.06 : 0);
    if (own) ctx.drawImage(SPR.stickers[i], -sz / 2, -sz * 20 / 48, sz, sz * 20 / 24);
    else { ctx.globalAlpha = 0.35; ctx.filter = 'brightness(0)'; ctx.drawImage(SPR.stickers[i], -sz / 2, -sz * 20 / 48, sz, sz * 20 / 24); ctx.filter = 'none'; ctx.globalAlpha = 1; txt('?', 0, 0, 14 * u, '#ffffff'); }
    ctx.restore();
  }
  if (!STICKERS.length) txt(tr('locked'), cx, sy(150), 7 * u, '#ffffff');
  if (Math.floor(TT * 2) % 2) txt(usingTouch ? '👆' : tr('back'), cx, sy(166), 7 * u, '#ffe0f0');
}
function renderState() {
  const u = S, cx = cv.width / 2;
  if (state === 'clear') {
    const pop = Math.min(1, L.clearT * 3), wob = Math.sin(L.tt * 6) * 0.04;
    ctx.save(); ctx.translate(cx, sy(70)); ctx.rotate(wob); ctx.scale(pop, pop); txt(tr('clear'), 0, 0, 34 * u, '#fff07a'); ctx.restore();
    txt(tr('clearSub'), cx, sy(94), 10 * u, '#ffffff');
    for (let i = 0; i < 3; i++) {
      const appear = clamp((L.clearT - 0.5 - i * 0.35) * 4, 0, 1), on = i < L.stars, sc = appear * (1 + Math.max(0, 0.4 - (L.clearT - 0.5 - i * 0.35)) * 2);
      if (appear <= 0) continue; ctx.save(); ctx.translate(cx + (i - 1) * 26 * u, sy(116) - (i === 1 ? 4 * u : 0)); ctx.scale(sc, sc); txt('★', 0, 0, 24 * u, on ? '#ffd93b' : 'rgba(255,255,255,0.25)', 'center', on); ctx.restore();
    }
    if (L.newSticker >= 0 && L.clearT > 1.6) {
      const k = Math.min(1, (L.clearT - 1.6) * 3), sz = 24 * 2.2 * u * k, bx = sx(W - 46), by = sy(108);
      ctx.save(); ctx.translate(bx, by); ctx.rotate(Math.sin(L.tt * 3) * 0.12); ctx.imageSmoothingEnabled = false;
      ctx.drawImage(SPR.stickers[L.newSticker], -sz / 2, -sz * 20 / 48, sz, sz * 20 / 24); ctx.restore();
      txt(tr('sticker'), bx, by + 30 * u, 7 * u, '#fff07a');
    }
    if (L.clearT > 2.4 && Math.floor(L.tt * 2.5) % 2) txt(usingTouch ? '👆' : tr('next'), cx, sy(140), 8 * u, '#ffe0f0');
  }
  if (state === 'timeup') {
    txt(tr('timeup'), cx, sy(72), 20 * u, '#ffc27a'); txt(tr('timeupSub'), cx, sy(94), 9 * u, '#dfe6ff');
    if (L.clearT > 1.5 && Math.floor(L.tt * 2.5) % 2) txt(usingTouch ? '👆' : tr('retry'), cx, sy(114), 8 * u, '#ffffff');
  }
  if (state === 'pause') {
    ctx.fillStyle = 'rgba(20,12,35,0.6)'; ctx.fillRect(0, 0, cv.width, cv.height);
    txt(tr('pause'), cx, sy(58), 22 * u, '#fff07a');
    PAUSE_ITEMS.forEach((it, i) => {
      const y = sy(86 + i * 16), sel = i === pauseIdx, s = tr(it); ctx.font = `900 ${Math.round(9 * u)}px ${FONT}`; const w = ctx.measureText(s).width + 22 * u;
      if (sel) pill(cx - w / 2, y - 7 * u, w, 14 * u, 'rgba(229,72,77,0.9)'); txt(s, cx, y, 9 * u, '#fff');
      addHit(cx - w / 2, y - 7 * u, w, 14 * u, () => { pauseIdx = i; pauseAct(); });
    });
  }
}
function render() {
  HITS = [];
  ctx.fillStyle = '#1b1426'; ctx.fillRect(0, 0, cv.width, cv.height);
  if (!L) return;
  renderWorld();
  const sh = L.shake > 0 ? (R() - 0.5) * L.shake * 10 * S : 0;
  ctx.imageSmoothingEnabled = false; ctx.drawImage(wc, OX + sh, OY + sh * 0.5, W * S, H * S);
  renderTexts();
  const blitSun = () => { drawSun(); const sp = sunPos(); ctx.drawImage(sunC, sx(sp.x - 13), sy(sp.y - 13), 26 * S, 26 * S); };
  if (isPortrait()) { renderRotate(); return; }
  if (state === 'title') { blitSun(); renderTitle(); }
  else if (state === 'album') { blitSun(); renderAlbum(); }
  else { renderHUD(); blitSun(); renderState(); renderTouch(); }
}

// ================= LOOP =================
makeDemo();
let last = performance.now();
function frame(now) { let dt = (now - last) / 1000; last = now; if (dt > 0.05) dt = 0.05; if (dt < 0) dt = 0; update(dt); render(); requestAnimationFrame(frame); }
requestAnimationFrame(frame);

if (/[?&]debug\b/.test(location.search)) window.BBC = { get L() { return L; }, get state() { return state; }, loadLevel, runEvent, spawnWolf, joinDevice, startGame, players: () => players, toClear, toTimeup, set state(v) { state = v; } };
})();
