// @title Pressure fracture
// @by Eign0x
// Track 04 | 182 BPM | 144 cycles | 03:09.89
// Paste this entire file into Strudel, then Play from cycle 0.
// Export: start 0, end 144. Leave START_CYCLE = 0 and LOOP = false.

const BPM = 182;
const END = 144;
const LEVEL = 0.65;
const START_CYCLE = 0;
const LOOP = false;
setcps(BPM / 240);

await samples({
  pf_raw: 'breaks165/000_RAWCLN.WAV',
  pf_kick: 'bd/BT0AADA.wav',
  pf_snare: 'sd/rytm-01-classic.wav',
  pf_hard: 'sd/rytm-00-hard.wav',
  pf_hat: 'hh/000_hh3closedhh.wav',
  pf_metal: 'metal/003_3.wav'
}, 'https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/');

const raw = p => s('pf_raw').slice(16, p)
  .speed(BPM * 1.4228798185941043 / 240).clip(0.96)
  .hpf(135).lpf(9800).gain(0.70).orbit(1);
const kick = p => s(p).end(0.43).lpf(1550).gain(0.77).orbit(1);
const snare = p => s(p).hpf(200).lpf(8200).gain(0.31).orbit(1);
const hat = p => s(p).end(0.07).hpf(5600)
  .gain('0.42 0.19 0.32 0.17').pan('0.47 0.53').orbit(1);

const straight = raw('0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15');
const chopA = raw('0 1 2 3 4 5 6 7 0 9 10 11 12 13 [14 14] 15');
const chopB = raw('0 1 2 ~ 4 5 [6 6] 7 8 9 10 11 12 13 14 ~');
const fillA = raw('0 1 2 3 4 5 6 7 8 9 [10 10] 11 12 [13 13] [14 14] ~');
const fillB = raw('0 1 2 3 4 5 6 7 8 ~ 10 11 12 [12 12] [14 15] ~');
const breaksA = arrange([3, straight], [1, chopA], [3, chopB], [1, fillA]);
const breaksB = arrange([2, chopA], [2, straight], [3, chopB], [1, fillB]);
const kA = kick('<[pf_kick ~ ~ ~ ~ ~ pf_kick ~ ~ ~ pf_kick ~ ~ ~ ~ ~] [pf_kick ~ ~ ~ ~ ~ ~ ~ ~ pf_kick ~ ~ ~ ~ pf_kick ~]>');
const kB = kick('<[pf_kick ~ ~ ~ ~ ~ ~ pf_kick ~ ~ pf_kick ~ ~ ~ ~ ~] [pf_kick ~ ~ pf_kick ~ ~ ~ ~ ~ ~ pf_kick ~ ~ ~ ~ ~]>');
const backbeat = snare('~ pf_snare ~ pf_snare');
const hatsA = hat('pf_hat ~ pf_hat pf_hat pf_hat ~ pf_hat ~');
const hatsB = hat('pf_hat*8');
const hardTurn = s('~ ~ ~ ~ ~ ~ pf_hard [pf_hard pf_hard]')
  .end(0.38).hpf(600).lpf(6000).gain('0.13 0.10 0.065').orbit(1);
const drumsA = stack(breaksA, kA, backbeat, hatsA);
const drumsB = stack(breaksB, kB, backbeat, hatsB);
const lastBar = stack(fillB, kick('pf_kick ~ ~ ~'), backbeat, hardTurn);
const drumsPeak = arrange([4, drumsB], [3, drumsA], [1, lastBar]);
const half = stack(
  kick('pf_kick ~ ~ ~ ~ pf_kick ~ ~').gain(0.67),
  snare('~ ~ pf_snare ~').gain(0.38),
  straight.hpf(2500).gain(0.105)
);

// F / Gb friction, with short rests that leave the kick exposed.
const lowA = '<[f1 ~ ~ f1 ~ ab1 gb1 ~] [f1@2 ~ f1 ~ eb1 f1 ~]>';
const lowB = '<[f1 ~ f1 ~ ~ gb1 f1 ~] [eb1@2 ~ f1 ~ ~ ab1 gb1]>';
const lowC = '<[f1@3 ~ ~ f1 gb1 ~] [f1 ~ ~ eb1 ~ gb1 f1 ~]>';
const sub = p => note(p).s('sine').lpf(110).pan(0.5)
  .attack(0.007).decay(0.09).sustain(0.80).release(0.060)
  .clip(0.82).gain(0.95).orbit(2);
const reese = p => note(p).s('supersaw').unison(3).detune(0.22).spread(0.25)
  .hpf(120).lpf(sine.range(430, 1100).slow(4)).lpq(0.70)
  .lpenv(1.45).lpattack(0.010).lpdecay(0.14).lpsustain(0.18)
  .attack(0.007).decay(0.13).sustain(0.54).release(0.060)
  .clip(0.72).distort(0.62).gain(0.31).orbit(2);
const bassA = stack(sub(lowA), reese(lowA));
const bassB = stack(sub(lowB), reese(lowB).lpf(1250).lpenv(1.65));
const bassC = stack(sub(lowC), reese(lowC).lpf(1450).gain(0.29));

const stab = p => note(p).s('supersaw').unison(2).detune(0.09).spread(0.32)
  .hpf(400).lpf(1500).attack(0.008).decay(0.13).sustain(0.10)
  .release(0.11).clip(0.55).distort(0.20).gain(0.12)
  .delay(0.075).delaytime(60 / BPM * 0.75).delayfeedback(0.14)
  .room(0.10).roomsize(1.8).roomlp(2100).orbit(3);
const hook = stab('<[~ f3 ~ ~ ~ gb3 ~ eb3] [~ f3 ~ ~ ab3 ~ gb3 ~]>');
const hookAnswer = stab('<[~ ~ f3 ~ ~ eb3 ~ ~] [~ ~ gb3 ~ f3 ~ ~ ~]>').slow(2);
const air = note('<[f3,c4] [gb3,db4] [eb3,bb3] [f3,c4]>').slow(4)
  .s('triangle').hpf(330).lpf(800).attack(0.50).release(0.65)
  .clip(0.86).gain(0.09).room(0.22).roomsize(2.5).roomlp(1800).orbit(3);
const metal = p => s(p).speed('<0.68 0.82 0.72 0.92>').end(0.50)
  .hpf(950).lpf(3300).gain(0.11).pan('0.35 0.65')
  .room(0.09).roomsize(1.4).roomlp(2500).orbit(4);
const ticks = metal('pf_metal ~ ~ ~ ~ ~ pf_metal ~').slow(2);
const impact = metal('pf_metal').slow(8).speed(0.48).gain(0.15).end(0.80);
const rise = s('pink*8').hpf(1600).lpf(saw.range(1800, 6800).slow(8))
  .attack(0.010).decay(0.055).sustain(0).release(0.022)
  .gain(saw.range(0.006, 0.052).slow(8)).orbit(4);
const ramp = arrange(
  [4, stack(straight.hpf(1600).gain(0.22), snare('~ pf_snare ~ pf_snare').gain(0.13))],
  [2, stack(chopB.hpf(1100).gain(0.30), snare('pf_snare*4').gain(0.11))],
  [1, stack(fillA.hpf(1000).gain(0.32), snare('pf_snare*8').gain(0.08))],
  [1, stack(raw('0 ~ ~ ~ 4 ~ ~ ~ 8 ~ ~ ~ 12 ~ ~ ~').hpf(1900).gain(0.19), hookAnswer)]
);

const song = arrange(
  [8, stack(straight.hpf(2100).gain(0.18), ticks, hookAnswer, air)], // 000-008 | 00:00.00
  [8, stack(ramp, rise, air)],                                     // 008-016 | 00:10.55
  [16, stack(drumsA, bassA, impact)],                              // 016-032 | 00:21.10
  [8, stack(drumsB, bassA, hook)],                                 // 032-040 | 00:42.20
  [16, stack(drumsB, bassB, hookAnswer, ticks)],                    // 040-056 | 00:52.75
  [8, stack(half, sub('f1@3 ~').slow(2).gain(0.70), air, ticks)],   // 056-064 | 01:13.85
  [8, stack(ramp, rise, hookAnswer)],                              // 064-072 | 01:24.40
  [16, stack(drumsPeak, bassB, hook, impact)],                      // 072-088 | 01:34.95
  [8, stack(drumsA, bassC, hookAnswer)],                            // 088-096 | 01:56.04
  [16, stack(drumsB, bassA, ticks)],                               // 096-112 | 02:06.59
  [16, stack(drumsPeak, bassC, hook, impact)],                     // 112-128 | 02:27.69
  [8, stack(drumsA, sub(lowA).gain(0.78), hookAnswer)],             // 128-136 | 02:48.79
  [8, stack(straight.hpf(1900).gain(0.22), air, ticks)]             // 136-144 | 02:59.34
);

const fade = signal(t => {
  const pos = LOOP ? Number(t) % END : Number(t);
  return LEVEL * Math.max(0, Math.min(1, (END - pos) / 8));
});
song.postgain(fade)
  .filterWhen(t => Number(t) >= 0 && (LOOP || Number(t) < END))
  .early(START_CYCLE)
