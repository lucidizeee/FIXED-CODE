// @title After the impact
// @by Eign0x
// Track 05 | 172 BPM | 160 cycles | 03:43.26
// Paste this entire file into Strudel, then Play from cycle 0.
// Export: start 0, end 160. Leave START_CYCLE = 0 and LOOP = false.

const BPM = 172;
const END = 160;
const LEVEL = 0.68;
const START_CYCLE = 0;
const LOOP = false;
setcps(BPM / 240);

await samples({
  ai_raw: 'breaks165/000_RAWCLN.WAV',
  ai_kick: 'jazz/000_BD.wav',
  ai_snare: 'jazz/007_SN.wav',
  ai_hat: 'jazz/003_HH.wav',
  ai_open: 'jazz/004_OH.wav',
  ai_metal: 'metal/003_3.wav'
}, 'https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/');

const kick = p => s(p).lpf(2300).gain(0.80).orbit(1);
const snare = p => s(p).hpf(165).lpf(8100).gain(0.54)
  .room(0.055).roomsize(1.1).roomlp(3100).orbit(1);
const hat = p => s(p).end(0.28).hpf(4500)
  .gain('0.19 0.095 0.15 0.08').pan('0.47 0.53')
  .swingBy(0.10, 4).orbit(1);
const raw = p => s('ai_raw').slice(16, p)
  .speed(BPM * 1.4228798185941043 / 240).clip(0.95)
  .hpf(700).lpf(7300).gain(0.25).orbit(1);
const rawA = raw('0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15');
const rawB = raw('0 1 ~ 3 4 5 6 7 8 9 10 ~ 12 13 14 15');
const rawTurn = raw('0 1 2 3 4 5 6 7 8 9 10 11 12 13 [14 14] ~');
const breakbed = arrange([3, rawA], [1, rawB], [3, rawA], [1, rawTurn]);

const ka = kick('<[ai_kick ~ ~ ~ ~ ~ ~ ai_kick ~ ~ ai_kick ~ ~ ~ ~ ~] [ai_kick ~ ~ ~ ~ ~ ai_kick ~ ~ ~ ~ ~ ~ ai_kick ~ ~]>');
const kb = kick('<[ai_kick ~ ~ ~ ~ ai_kick ~ ~ ~ ~ ai_kick ~ ~ ~ ~ ~] [ai_kick ~ ~ ~ ~ ~ ~ ~ ~ ai_kick ~ ~ ~ ~ ai_kick ~]>');
const backbeat = snare('~ ai_snare ~ ai_snare');
const ghost = snare('<[~ ~ ~ ai_snare ~ ~ ~ ~] [~ ~ ~ ~ ~ ~ ~ ai_snare]>').gain(0.075);
const hatsA = hat('ai_hat ~ ai_hat ai_hat ai_hat ~ ai_hat ~');
const hatsB = hat('ai_hat*8');
const open = s('<[~ ~ ~ ~ ~ ~ ~ ai_open] [~ ~ ~ ~ ~ ~ ~ ~]>')
  .end(0.23).clip(0.75).hpf(4800).gain(0.095).pan(0.57).orbit(1);
const kitA = stack(ka, backbeat, hatsA, ghost);
const kitB = stack(kb, backbeat, hatsB, open);
const turn = stack(
  kick('ai_kick ~ ~ ~ ~ ai_kick ~ ~'),
  snare('~ ai_snare ~ [ai_snare ai_snare]').gain('0.51 0.52 0.19'),
  hat('ai_hat*4')
);
const drumsA = arrange([4, kitA], [3, kitB], [1, turn]);
const drumsB = stack(arrange([4, kitB], [3, kitA], [1, turn]), breakbed);
const soft = stack(
  kick('ai_kick ~ ~ ~').gain(0.48),
  hat('~ ai_hat ~ ai_hat').gain(0.085)
);
const half = stack(
  kick('ai_kick ~ ~ ~ ~ ai_kick ~ ~').gain(0.60),
  snare('~ ~ ai_snare ~').gain(0.37),
  hatsA.mul(gain(0.60))
);

// D minor, but the bass walks D -> C -> Bb -> A instead of repeating track 02.
const roots = mini('<d1 c2 bb1 a1>').slow(4);
const lowA = roots.struct('x@2 ~ ~ x ~ x ~');
const lowB = roots.struct('x ~ ~ x@2 ~ x ~');
const sub = p => note(p).s('sine').lpf(110).pan(0.5)
  .attack(0.015).decay(0.10).sustain(0.82).release(0.09)
  .clip(0.85).gain(0.98).orbit(2);
const body = p => note(p).s('triangle').hpf(115).lpf(590)
  .attack(0.022).decay(0.17).sustain(0.56).release(0.08)
  .clip(0.80).gain(0.25).orbit(2);
const edge = p => note(p).s('supersaw').unison(3).detune(0.14).spread(0.20)
  .hpf(170).lpf(sine.range(450, 820).slow(8)).lpq(0.50)
  .attack(0.016).decay(0.18).sustain(0.40).release(0.08)
  .clip(0.74).distort(0.24).gain(0.19).orbit(2);
const bassA = stack(sub(lowA), body(lowA));
const bassB = stack(sub(lowB), body(lowB), edge(lowB));

const harmony = mini('<[d3,f3,a3,e4] [c3,f3,a3,d4] [bb2,d3,f3,c4] [a2,d3,e3,b3]>').slow(4);
const piano = p => note(p).s('sine').fm(0.70).fmh(2)
  .fmdecay(0.24).fmsustain(0.08).hpf(230).lpf(1900)
  .attack(0.018).decay(0.58).sustain(0.17).release(0.55).clip(0.82)
  .gain(0.17).room(0.22).roomsize(3).roomlp(1900).orbit(3);
const keys = piano(harmony.struct('x@2 ~ ~ ~ x@2 ~'));
const keysLong = piano(harmony.struct('x@6 ~ ~')).gain(0.18);
const pad = note(harmony).s('triangle').hpf(320).lpf(900)
  .attack(0.85).release(1.0).clip(0.88).gain(0.066)
  .room(0.26).roomsize(3).roomlp(1800).orbit(3);
const lead = p => note(p).s('sine').fm(0.22).fmh(2)
  .hpf(250).lpf(1550).attack(0.045).decay(0.30).sustain(0.26)
  .release(0.32).clip(0.82).gain(0.20)
  .delay(0.11).delaytime(60 / BPM * 1.5).delayfeedback(0.19)
  .room(0.20).roomsize(3).roomlp(1900).orbit(3);
const lineA = lead(mini('<[e4 ~ d4@2 ~ a3 ~ ~] [d4 ~ c4@2 ~ a3 ~ ~] [c4 ~ bb3@2 ~ f3 ~ ~] [b3 ~ a3@2 ~ e3 ~ ~]>').slow(4));
const lineB = lead(mini('<[a3 ~ d4 ~ f4 ~ e4 ~] [a3 ~ c4 ~ e4 ~ d4 ~] [f3 ~ bb3 ~ d4 ~ c4 ~] [e3 ~ a3 ~ b3 ~ a3 ~]>').slow(4));
const ticks = s('ai_metal ~ ~ ~ ~ ~ ~ ~').slow(2).speed(0.64).end(0.45)
  .hpf(1200).lpf(2300).gain(0.045).pan('0.40 0.60')
  .room(0.10).roomsize(1.6).orbit(4);
const lift = s('pink*4').hpf(2500).lpf(saw.range(2800, 5400).slow(8))
  .attack(0.025).decay(0.13).sustain(0).release(0.04)
  .gain(saw.range(0.006, 0.035).slow(8)).orbit(4);

// Return to track 02's emotional side; the last drop still moves.
const song = arrange(
  [8, stack(keysLong, pad, ticks)],                                // 000-008 | 00:00.00
  [8, stack(soft, keys, lineA)],                                   // 008-016 | 00:11.16
  [16, stack(drumsA, bassA, keys)],                               // 016-032 | 00:22.33
  [16, stack(drumsA, bassA, lineA, pad)],                         // 032-048 | 00:44.65
  [16, stack(drumsB, bassB, keys, ticks)],                        // 048-064 | 01:06.98
  [16, stack(half, sub(roots.struct('x@3 ~')).gain(0.71), keysLong, lineA)], // 064-080 | 01:29.30
  [8, stack(drumsA.hpf(950).mul(gain(0.45)), keys, lift)],        // 080-088 | 01:51.63
  [16, stack(drumsB, bassB, lineB, keys.mul(gain(0.70)))],        // 088-104 | 02:02.79
  [16, stack(drumsB, bassA, lineA, pad)],                       // 104-120 | 02:25.12
  [16, stack(drumsA, bassA, keys)],                            // 120-136 | 02:47.44
  [8, stack(half, sub(lowA).gain(0.71), lineA, pad)],           // 136-144 | 03:09.77
  [8, stack(soft, piano('[d3,f3,a3,e4]').slow(4), lead('e4 d4 a3 ~').slow(8))], // 144-152 | 03:20.93
  [8, stack(piano('[d3,f3,a3,e4]').slow(4).gain(0.13), lead('d4 ~ ~ ~').slow(8))] // 152-160 | 03:32.09
);

const fade = signal(t => {
  const pos = LOOP ? Number(t) % END : Number(t);
  return LEVEL * Math.max(0, Math.min(1, (END - pos) / 16));
});
song.postgain(fade)
  .filterWhen(t => Number(t) >= 0 && (LOOP || Number(t) < END))
  .early(START_CYCLE)
