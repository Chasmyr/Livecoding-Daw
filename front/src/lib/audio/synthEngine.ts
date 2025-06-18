import * as Tone from "tone";

export type SynthEngine = {
  osc1: Tone.Oscillator;
  osc2: Tone.Oscillator;
  osc1Gain: Tone.Gain;
  osc2Gain: Tone.Gain;
  ampEnv: Tone.Gain;
  adsr: {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
  };
  filters: {
    highpass: Tone.Filter;
    lowpass: Tone.Filter;
  };
  effects: {
    distortion: Tone.Distortion;
    bitcrusher: Tone.BitCrusher;
    delay: Tone.FeedbackDelay;
    chorus: Tone.Chorus;
    reverb: Tone.Reverb;
    eq: {
      low: Tone.EQ3;
    };
  };
  noise: {
    generator: Tone.Noise;
    gain: Tone.Gain;
  };
  output: Tone.Gain;
  triggerNote: (note: string) => void;
  triggerRelease: () => void;
};

export function createSynthEngine(): SynthEngine {
  // --- Oscillateurs
  const osc1 = new Tone.Oscillator({ type: "sine" }).start();
  const osc2 = new Tone.Oscillator({ type: "sawtooth" }).start();
  const osc1Gain = new Tone.Gain(0.5);
  const osc2Gain = new Tone.Gain(0.5);
  const ampEnv = new Tone.Gain(0);

  osc1.connect(osc1Gain);
  osc2.connect(osc2Gain);

  const mergeOsc = new Tone.Gain();
  osc1Gain.connect(mergeOsc);
  osc2Gain.connect(mergeOsc);
  mergeOsc.connect(ampEnv);

  // Valeurs par défaut de l’enveloppe
  const adsr = {
    attack: 0.02,   // 20 ms, assez rapide sans clic
    decay: 0.2,
    sustain: 0.5,
    release: 0.2,   // 300 ms, assez doux pour éviter un cut sec
  };

  // --- Filtres
  const highpass = new Tone.Filter({ type: "highpass", frequency: 20, Q: 1 });
  const lowpass = new Tone.Filter({ type: "lowpass", frequency: 20000, Q: 1 });

  // --- Effets
  const distortion = new Tone.Distortion(0);
  distortion.wet.value = 0;

  const bitcrusher = new Tone.BitCrusher(4);
  bitcrusher.wet.value = 0;

  const delay = new Tone.FeedbackDelay(0.25, 0.3);
  delay.wet.value = 0;

  const chorus = new Tone.Chorus(4, 2.5, 0.5).start();
  chorus.wet.value = 0;

  const reverb = new Tone.Reverb({
    decay: 4,
    preDelay: 0.01,
    wet: 0.2,
  });
  reverb.wet.value = 0;

  const eq = new Tone.EQ3({
    low: 0,
    mid: 0,
    high: 0,
    lowFrequency: 400,
    highFrequency: 2500,
  });

  // --- Noise
  const noise = new Tone.Noise("white").start();
  noise.volume.value = -60;
  const noiseGain = new Tone.Gain(0);

  noise.connect(noiseGain);
  noiseGain.chain(
    highpass,
    lowpass,
    distortion,
    bitcrusher,
    delay,
    chorus,
    reverb,
    eq
  );

  // --- Sortie
  const output = new Tone.Gain(1);
  eq.connect(output);
  output.connect(Tone.getDestination());

  // Routing oscillateurs → effets
  ampEnv.chain(
    highpass,
    lowpass,
    distortion,
    bitcrusher,
    delay,
    chorus,
    reverb,
    eq,
    output
  );

  // Note trigger
  const triggerNote = (note: string) => {
    const now = Tone.now();
    const freq = Tone.Frequency(note).toFrequency();

    osc1.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq, now);

    // Stop toute enveloppe prévue
    ampEnv.gain.cancelScheduledValues(now);

    // Si le gain est > 0 (note précédente encore en release), on part de sa valeur actuelle
    ampEnv.gain.setValueAtTime(ampEnv.gain.value, now);

    // Nouvelle attaque
    ampEnv.gain.linearRampToValueAtTime(1, now + adsr.attack);
    ampEnv.gain.linearRampToValueAtTime(
      adsr.sustain,
      now + adsr.attack + adsr.decay
    );
  };

  const triggerRelease = () => {
    const now = Tone.now();

    // On annule toute release programmée
    ampEnv.gain.cancelScheduledValues(now);

    // On part de la valeur actuelle pour une libération douce
    ampEnv.gain.setValueAtTime(ampEnv.gain.value, now);
    ampEnv.gain.linearRampToValueAtTime(0, now + adsr.release);
  };

  return {
    osc1,
    osc2,
    osc1Gain,
    osc2Gain,
    ampEnv,
    adsr,
    filters: { highpass, lowpass },
    effects: {
      distortion,
      bitcrusher,
      delay,
      chorus,
      reverb,
      eq: { low: eq },
    },
    noise: {
      generator: noise,
      gain: noiseGain,
    },
    output,
    triggerNote,
    triggerRelease,
  };
}
