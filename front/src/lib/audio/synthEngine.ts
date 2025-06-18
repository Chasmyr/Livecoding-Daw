import * as Tone from "tone";

export type SynthEngine = {
  synth: Tone.Synth;
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
};

export function createSynthEngine(): SynthEngine {
  const synth = new Tone.Synth({ oscillator: { type: "sawtooth" } });

  const noise = new Tone.Noise("white");
  noise.volume.value = -60;
  noise.start();
  const noiseGain = new Tone.Gain(0); // noise désactivé

  // Filtres
  const highpass = new Tone.Filter({ type: "highpass", frequency: 20, Q: 1 });
  const lowpass = new Tone.Filter({ type: "lowpass", frequency: 20000, Q: 1 });

  // Effets (initialisés mais désactivés par défaut)
  const distortion = new Tone.Distortion(0); // 0 = pas de distorsion
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

  // Sortie
  const output = new Tone.Gain(1);
  output.connect(Tone.getDestination());

  // Routing Synth
  synth.chain(
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

  // Routing Noise
  noise.connect(noiseGain);
  noiseGain.chain(
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

  return {
    synth,
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
  };
}
