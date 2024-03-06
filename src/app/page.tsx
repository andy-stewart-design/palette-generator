// todo: export for figma button
// todo: adjust lightest and darkest color
// todo: fix keyIndex issue with bright colors <- this might be fixed

import ColorPicker from "@/components/ColorPicker";
import ColorGrid from "@/components/ColorGrid";
import { generateSpectrum } from "@/utlis/generate-spectrum";
import type { ServerSideComponentProp } from "@/types/server-components";
import classes from "./page.module.css";
import NumberInput from "@/components/NumberInput";

type PageProps = ServerSideComponentProp<
  {},
  { color?: string; steps?: string; anchor?: string }
>;

export default async function Home({ searchParams }: PageProps) {
  const hexParam = searchParams.color ? `#${searchParams.color}` : "#4aa5b7";
  const numStepsParam = searchParams.steps ? Number(searchParams.steps) : 11;
  const keyIndexParam = searchParams.anchor;

  const colorObject = await generateSpectrum(
    hexParam,
    numStepsParam,
    keyIndexParam
  );
  const { colors, keyColor, keyIndex } = colorObject;

  return (
    <main
      className={classes.main}
      style={{ "--color-primary": colors[keyIndex], "--button-bg": colors[6] }}
    >
      <header className={classes.header}>
        <section className={classes.section}>
          <ColorPicker currentColor={keyColor} />
        </section>
        <section className={classes.section}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <label style={{ fontSize: "13px", fontWeight: 500 }}>Stops</label>
            <NumberInput defaultValue={numStepsParam} />
          </div>
        </section>
      </header>
      <ColorGrid colors={colors} keyIndex={keyIndex} />
    </main>
  );
}
