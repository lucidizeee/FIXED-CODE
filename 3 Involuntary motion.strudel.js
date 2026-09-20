// @title Involuntary motion
// @by Eign0x
// Track 03 | 176 BPM | 152 cycles | 03:27.27
// Paste this entire file into Strudel, then Play from cycle 0.
// Export: start 0, end 152. Leave START_CYCLE = 0 and LOOP = false.

const BPM = 176;
const END = 152;
const LEVEL = 0.56;
const START_CYCLE = 0;
const LOOP = false;
setcps(BPM / 240);

await samples({
  im_raw: 'breaks165/000_RAWCLN.WAV',
  im_kick: 'jazz/000_BD.wav',
  im_snare: 'jazz/007_SN.wav',
  im_hat: 'jazz/003_HH.wav',
  im_open: 'jazz/004_OH.wav',
  im_metal: 'metal/003_3.wav'
}, 'https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/');

// The jazz kit carries the backbeat; the chopped break supplies motion.
const raw = p => s('im_raw').slice(16, p)
  .speed(BPM * 1.4228798185941043 / 240).clip(0.97)
  .hpf(380).lpf(8500).gain(0.40).orbit(1);
const kick = p => s(p).end(0.82).lpf(2100).gain(0.79).orbit(1);
const snare = p => s(p).hpf(175).lpf(8500).gain(0.51)
  .room(0.045).roomsize(1.1).roomlp(3300).orbit(1);
const hat = p => s(p).end(0.30).hpf(4800)
  .gain('0.18 0.10 0.15 0.09').pan('0.46 0.54')
  .swingBy(0.08, 4).orbit(1);

const rawA = raw('0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15');
const rawB = raw('0 1 2 3 4 5 6 ~ 8 9 10 11 12 13 [14 14] 15');
const rawTurn = raw('0 1 2 3 4 5 6 7 8 9 ~ 11 12 [13 13] 14 ~');
const breakA = arrange([3, rawA], [1, rawB], [3, rawA], [1, rawTurn]);
const breakB = arrange([2, rawB], [2, rawA], [3, rawB], [1, rawTurn]);

const ka = kick('<[im_kick ~ ~ ~ ~ ~ im_kick ~ ~ ~ im_kick ~ ~ ~ ~ ~] [im_kick ~ ~ ~ ~ ~ ~ im_kick ~ ~ im_kick ~ ~ ~ ~ ~]>');
const kb = kick('<[im_kick ~ ~ ~ ~ ~ ~ ~ ~ ~ im_kick ~ ~ im_kick ~ ~] [im_kick ~ ~ im_kick ~ ~ ~ ~ ~ ~ im_kick ~ ~ ~ ~ ~]>');
const backbeat = snare('~ im_snare ~ im_snare');
const ghost = snare('<[~ ~ ~ ~ ~ ~ ~ ~] [~ ~ ~ im_snare ~ ~ ~ ~]>').gain(0.085);
const hatsA = hat('im_hat ~ im_hat im_hat im_hat ~ im_hat im_hat');
const hatsB = hat('im_hat*8');
const open = s('<[~ ~ ~ ~ ~ ~ ~ im_open] [~ ~ ~ ~ ~ ~ ~ ~]>')
  .end(0.22).clip(0.70).hpf(5000).gain(0.095).pan(0.57).orbit(1);
const kitA = stack(ka, backbeat, ghost, hatsA);
const kitB = stack(kb, backbeat, hatsB, open);
const turn = stack(
  kick('im_kick ~ ~ ~ ~ ~ im_kick ~'),
  snare('~ im_snare ~ [im_snare im_snare]').gain('0.48 0.49 0.20'),
  hat('im_hat*4'), rawTurn
);
const drumsA = stack(arrange([6, kitA], [2, kitB]), breakA);
const drumsB = arrange([4, stack(kitB, breakB)], [3, stack(kitA, rawB)], [1, turn]);
const pocket = stack(
  kick('im_kick ~ ~ ~ ~ im_kick ~ ~').gain(0.61),
  snare('~ ~ im_snare ~').gain(0.40),
  hat('~ im_hat ~ im_hat').gain(0.10),
  rawA.hpf(2300).gain(0.10)
);

// G minor: a short bass answer follows the gap in the kick.
const roots = mini('<g1 eb1 c2 d2>').slow(4);
const lowA = roots.struct('x ~ ~ x ~ x@2 ~');
const lowB = roots.struct('x@3 ~ x ~ x ~');
const sub = p => note(p).s('sine').lpf(110).pan(0.5)
  .attack(0.009).decay(0.11).sustain(0.80).release(0.070)
  .clip(0.84).gain(0.94).orbit(2);
const reese = p => note(p).s('supersaw').unison(3).detune(0.16).spread(0.24)
  .hpf(125).lpf(sine.range(430, 850).slow(8)).lpq(0.60)
  .lpenv(1.05).lpattack(0.012).lpdecay(0.20).lpsustain(0.20)
  .attack(0.012).decay(0.16).sustain(0.48).release(0.075)
  .clip(0.75).distort(0.32).gain(0.24).orbit(2);
const bassA = stack(sub(lowA), reese(lowA));
const bassB = stack(sub(lowB), reese(lowB).lpf(1100).lpenv(1.35));

const harmony = mini('<[g3,bb3,d4,a4] [eb3,g3,bb3,d4] [c3,eb3,g3,d4] [d3,f3,a3,c4]>').slow(4);
const keys = p => note(p).s('sine').fm(0.65).fmh(2)
  .fmdecay(0.20).fmsustain(0.08).hpf(260).lpf(1850)
  .attack(0.015).decay(0.48).sustain(0.16).release(0.42).clip(0.78)
  .gain(0.15).room(0.19).roomsize(2.7).roomlp(1900).orbit(3);
const chords = keys(harmony.struct('x ~ ~ x ~ ~ ~ x'));
const chordsLong = keys(harmony.struct('x@5 ~ x ~')).gain(0.17);
const pad = note(harmony).s('triangle').hpf(330).lpf(900)
  .attack(0.72).release(0.85).clip(0.88).gain(0.065)
  .room(0.24).roomsize(2.7).roomlp(1800).orbit(3);
const lead = p => note(p).s('sine').fm(0.32).fmh(2)
  .hpf(300).lpf(1650).attack(0.020).decay(0.28).sustain(0.20)
  .release(0.24).clip(0.80).gain(0.19)
  .delay(0.10).delaytime(60 / BPM * 1.5).delayfeedback(0.18)
  .room(0.16).roomsize(2.7).roomlp(1900).orbit(3);
const call = lead(mini('<[d4 ~ bb3 ~ a3@2 ~ ~] [bb3 ~ g3 ~ f3@2 ~ ~] [g3 ~ eb3 ~ d3@2 ~ ~] [a3 ~ f3 ~ e3@2 ~ ~]>').slow(4));
const answer = lead(mini('<[~ a3 bb3 ~ d4 ~ c4 ~] [~ f3 g3 ~ bb3 ~ a3 ~] [~ d3 eb3 ~ g3 ~ f3 ~] [~ e3 f3 ~ a3 ~ g3 ~]>').slow(4));
const metal = s('im_metal ~ ~ ~ ~ ~ ~ ~').slow(2).speed(0.76).end(0.52)
  .hpf(1000).lpf(2600).gain(0.070).pan('0.38 0.62')
  .room(0.12).roomsize(1.6).orbit(4);
const lift = s('pink*4').hpf(2300).lpf(saw.range(2500, 6200).slow(8))
  .attack(0.018).decay(0.10).sustain(0).release(0.04)
  .gain(saw.range(0.008, 0.045).slow(8)).orbit(4);

// Phrase changes are written; only the last bar of a phrase has a busy fill.
const song = arrange(
  [8, stack(chordsLong, pad, metal)],                                  // 000-008 | 00:00.00
  [8, stack(kitA.mul(gain(0.58)), rawA.hpf(1700).gain(0.17), chords)],   // 008-016 | 00:10.91
  [16, stack(drumsA, bassA, chords)],                                 // 016-032 | 00:21.82
  [16, stack(drumsB, bassA, call)],                                   // 032-048 | 00:43.64
  [16, stack(drumsA, bassB, chords, metal)],                          // 048-064 | 01:05.45
  [8, stack(pocket, sub(roots.struct('x@3 ~')).gain(0.69), chordsLong)],// 064-072 | 01:27.27
  [8, stack(pocket, pad, answer, lift)],                              // 072-080 | 01:38.18
  [16, stack(drumsB, bassB, answer, chords.mul(gain(0.72)))],           // 080-096 | 01:49.09
  [16, stack(drumsA, bassA, call, metal)],                            // 096-112 | 02:10.91
  [16, stack(drumsB, bassB, chordsLong)],                            // 112-128 | 02:32.73
  [16, stack(drumsA, sub(lowA).gain(0.78), pad, answer)],             // 128-144 | 02:54.55
  [8, stack(chordsLong, pad, rawA.hpf(2300).gain(0.11))]              // 144-152 | 03:16.36
);

const fade = signal(t => {
  const pos = LOOP ? Number(t) % END : Number(t);
  return LEVEL * Math.max(0, Math.min(1, (END - pos) / 8));
});
song.postgain(fade)
  .filterWhen(t => Number(t) >= 0 && (LOOP || Number(t) < END))
  .early(START_CYCLE)
