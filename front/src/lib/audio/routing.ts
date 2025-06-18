import * as Tone from "tone";

export function routeToMaster(instrumentOutput: Tone.Gain, masterInput: Tone.Gain) {
  instrumentOutput.connect(masterInput);
}
