import * as Tone from "tone";

export type MasterEngine = {
  input: Tone.Gain;
  limiter: Tone.Limiter;
  volume: Tone.Volume;
};

export function createMasterEngine(): MasterEngine {
  const input = new Tone.Gain();
  const limiter = new Tone.Limiter(-1);
  const volume = new Tone.Volume(0);

  input.chain(limiter, volume, Tone.getDestination());

  return { input, limiter, volume };
}
