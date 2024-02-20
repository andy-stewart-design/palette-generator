import Color from "@andystewartdesign/colorjs.io";
import SearchInput from "@/components/SearchInput";
import NumberInput from "@/components/NumberInput";
import ColorCard from "@/components/ColorCard";
import { range } from "@/utlis/arrays";
import { ServerSideComponentProp } from "@/types/server-components";

type PageProps = ServerSideComponentProp<
  {},
  { color?: string; steps?: string; anchor?: string }
>;

const idents = range(20).map((i) => crypto.randomUUID());

export default function Home({ searchParams }: PageProps) {
  const colorParam =
    searchParams.color && decodeURIComponent(searchParams.color);
  const anchorPointParam =
    searchParams.anchor !== undefined ? Number(searchParams.anchor) : undefined;

  // const hex = colorParam ?? "#4aa5b7";
  const hex = colorParam ?? "#6a5de9";
  const keyColor = new Color(hex);
  const keyHue = keyColor.hsluv.h;
  const keySaturation = keyColor.hsluv.s;
  const keyLightness = keyColor.hsluv.l;
  const keyLightnessRounded = Math.ceil(keyLightness);

  const numSteps = searchParams.steps ? Number(searchParams.steps) : 11;
  const lightnessMin = keyLightnessRounded < 12 ? keyLightnessRounded : 12;
  const lightnessMax = keyLightnessRounded > 92 ? keyLightnessRounded : 92;
  const lightnessRange = lightnessMax - lightnessMin;

  let keyIndex = anchorPointParam !== undefined ? anchorPointParam : undefined;

  if (keyIndex === undefined) {
    for (let i = 0; i < range(numSteps).length; i++) {
      const spread = lightnessRange / numSteps;
      const lower = Math.floor(i * spread) + lightnessMin;
      const upper = Math.floor((i + 1) * spread) + lightnessMin;

      if (keyLightnessRounded <= upper && keyLightnessRounded >= lower) {
        keyIndex = i;
        break;
      }
    }
  }

  if (keyIndex === undefined) {
    console.error("Key index not found");
    return null;
  }

  const numStepsBeforeKey = keyIndex;
  const lowerRange = range(numStepsBeforeKey).map((index) => {
    const differential = keyLightness - lightnessMin;
    const step = differential / numStepsBeforeKey;
    return index * step + lightnessMin;
  });

  const numStepsAfterKey = numSteps - keyIndex - 1;
  const upperRange = range(numStepsAfterKey).map((index) => {
    const differential = lightnessMax - keyLightness;
    const step = differential / numStepsAfterKey;
    return (index + 1) * step + keyLightness;
  });

  const lightnessValues = [...lowerRange, keyLightness, ...upperRange];

  return (
    <main style={{ display: "grid", gap: "1rem", padding: "2rem" }}>
      <section style={{ display: "flex", gap: "1rem" }}>
        <SearchInput placeholder={hex} />
        <NumberInput />
      </section>
      <section style={{ display: "flex", gap: "0.25rem" }}>
        {lightnessValues.map((lightness, index) => (
          <ColorCard
            key={idents[index]}
            hue={keyHue}
            saturation={keySaturation}
            lightness={lightness}
            index={index}
            keyIndex={keyIndex!}
          />
        ))}
      </section>
    </main>
  );
}
