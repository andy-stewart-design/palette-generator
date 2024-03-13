import { formatHex, converter } from "culori";
import { range } from "@/utils/arrays";
import { getColorName } from "@/utils/get-color-name";

const okhsl = converter("okhsl");

export async function generateSpectrum(
  hex: string,
  steps: number,
  anchor: string | undefined
) {
  const keyColor = okhsl(hex);
  if (!keyColor) throw new Error("Invalid color");

  const keyHue = keyColor.h ?? 0;
  const keySaturation = keyColor.s;
  const keyLightness = keyColor.l;

  const numSteps = steps ? steps : 11;
  const lightnessDark = keyLightness < 0.12 ? keyLightness : 0.12;
  const lightnessBright = keyLightness > 0.94 ? keyLightness : 0.94;
  const lightnessRange = lightnessBright - lightnessDark;

  let keyIndex = anchor ? parseInt(anchor) : undefined;

  if (keyIndex === undefined) {
    const stepArray = range(numSteps).reverse();

    const lightnessRanges = stepArray.map((index) => {
      const spread = lightnessRange / numSteps;
      const lower = index * spread + lightnessDark;
      const upper = (index + 1) * spread + lightnessDark;
      return [upper, lower];
    });

    lightnessRanges.forEach(([upper, lower], index) => {
      if (keyLightness >= lower && keyLightness <= upper) {
        keyIndex = index;
      }
    });
  }

  if (keyIndex === undefined) keyIndex = 0;

  const numStepsBeforeKey = keyIndex;
  const lowerRange = range(numStepsBeforeKey).map((index) => {
    const differential = lightnessBright - keyLightness;
    const step = differential / numStepsBeforeKey;
    return lightnessBright - index * step;
  });

  const numStepsAfterKey = numSteps - keyIndex - 1;
  const upperRange = range(numStepsAfterKey).map((index) => {
    const differential = keyLightness - lightnessDark;
    const step = differential / numStepsAfterKey;
    return keyLightness - (index + 1) * step;
  });

  const lightnessValues = [...lowerRange, keyLightness, ...upperRange];

  const colors = lightnessValues.map((lightness) => {
    return formatHex({
      mode: "okhsl",
      h: keyHue,
      s: keySaturation,
      l: lightness,
    });
  });

  // CUSTOM PROPS (WILL BE MADE INTO OWN FUNCTION)

  const primaryDesaturated = formatHex({
    mode: "okhsl",
    h: keyHue,
    s: 0,
    l: keyColor.l,
  });

  const primaryMedium = formatHex({
    mode: "okhsl",
    h: keyHue,
    s: 0.8,
    l: 0.6,
  });

  // ---------------------------------------------

  const name = (await getColorName(colors[keyIndex])) as string;

  return {
    colors,
    keyColor: {
      hex,
      raw: keyColor,
      name,
    },
    keyIndex,
    cssVars: {
      "--color-primary-desaturated": primaryDesaturated,
      "--color-primary-medium": primaryMedium,
    },
  };
}
