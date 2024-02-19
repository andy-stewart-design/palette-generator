import Color from "@andystewartdesign/colorjs.io";
import SearchInput from "@/components/SearchInput";
import NumberInput from "@/components/NumberInput";
import { range } from "@/utlis/arrays";
import { ServerSideComponentProp } from "@/types/server-components";

type PageProps = ServerSideComponentProp<
  {},
  { color?: string; steps?: string }
>;

export default function Home({ searchParams }: PageProps) {
  const colorParam =
    searchParams.color && decodeURIComponent(searchParams.color);
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

  // console.log({ numSteps });

  let keyIndex: number | undefined;

  for (let i = 0; i < range(numSteps).length; i++) {
    const spread = lightnessRange / numSteps;
    const lower = Math.floor(i * spread) + lightnessMin;
    const upper = Math.floor((i + 1) * spread) + lightnessMin;

    if (keyLightnessRounded <= upper && keyLightnessRounded >= lower) {
      keyIndex = i;
      break;
    }
  }

  if (!keyIndex) {
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

  // console.log(lightnessValues);

  return (
    <main style={{ display: "grid", gap: "1rem" }}>
      <section style={{ display: "flex", gap: "1rem" }}>
        <SearchInput />
        <NumberInput />
      </section>
      <section style={{ display: "flex", gap: "0.25rem" }}>
        {lightnessValues.map((lightness, index) => {
          const bgColor = new Color("hsluv", [
            keyHue,
            keySaturation,
            lightness,
          ]);
          return (
            <div
              key={lightness}
              style={{
                position: "relative",
                display: "grid",
                placeItems: "center",
                backgroundColor: bgColor.to("srgb").toString(),
                flex: "1 0 0",
                minHeight: "160px",
                boxSizing: "border-box",
                borderRadius: "0.75rem",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  left: "0.5rem",
                  fontSize: "0.75rem",
                  background: "white",
                  padding: "0.25rem",
                  borderRadius: "0.25rem",
                  boxShadow: `0 3px 12px -2px rgba(0 0 0 / ${
                    0.6 / (index + 1) + 0.1
                  })`,
                }}
              >
                {bgColor.to("srgb").toString({ format: "hex" })}
              </span>
              {index === keyIndex && (
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    background: "white",
                    borderRadius: "100vmax",
                    boxShadow: `0 3px 12px -2px rgba(0 0 0 / ${
                      0.6 / (index + 1) + 0.1
                    })`,
                  }}
                />
              )}
            </div>
          );
        })}
      </section>
    </main>
  );
}
