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
  // --- Instruments
  const synth = new Tone.Synth({ oscillator: { type: "sawtooth" } });

  const noise = new Tone.Noise("white");
  noise.volume.value = -60;
  noise.start();

  const noiseGain = new Tone.Gain(0);

  // --- Filtres
  const highpass = new Tone.Filter({ type: "highpass", frequency: 200, Q: 1 });
  const lowpass = new Tone.Filter({ type: "lowpass", frequency: 18000, Q: 1 });

  // --- Effets
  const distortion = new Tone.Distortion(0.4);
  const bitcrusher = new Tone.BitCrusher(4);
  const delay = new Tone.FeedbackDelay("8n", 0.3);
  delay.wet.value = 0;

  const chorus = new Tone.Chorus(4, 2.5, 0.5).start();
  chorus.wet.value = 0;

  const reverb = new Tone.Reverb({ decay: 4, wet: 0.2 });

  const eq = new Tone.EQ3({
    low: 0,
    mid: 0,
    high: 0,
    lowFrequency: 400,
    highFrequency: 2500,
  });

  // --- Routing
  const output = new Tone.Gain();

  // Synth chain
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

  // Noise chain
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
    filters: {
      highpass,
      lowpass,
    },
    effects: {
      distortion,
      bitcrusher,
      delay,
      chorus,
      reverb,
      eq: {
        low: eq,
      },
    },
    noise: {
      generator: noise,
      gain: noiseGain,
    },
    output,
  };
}
