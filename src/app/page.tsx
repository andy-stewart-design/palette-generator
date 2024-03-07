// todo: export for figma button
// todo: style hsl sliders
// todo: fix keyIndex issue with bright colors

import ColorPicker from "@/components/ColorPicker";
import ColorGrid from "@/components/ColorGrid";
import NumberInput from "@/components/NumberInput";
import ExportButton from "@/components/ExportButton";
import { generateSpectrum } from "@/utlis/generate-spectrum";
import type { ServerSideComponentProp } from "@/types/server-components";
import classes from "./page.module.css";

type PageProps = ServerSideComponentProp<
  {},
  { color?: string; steps?: string; anchor?: string }
>;

export default async function Home({ searchParams }: PageProps) {
  const hexParam = searchParams.color ? `#${searchParams.color}` : "#4aa5b7";
  const stepsParam = searchParams.steps ? Number(searchParams.steps) : 11;
  const indexParam = searchParams.anchor;

  const colorObject = await generateSpectrum(hexParam, stepsParam, indexParam);
  const { colors, keyColor, keyIndex } = colorObject;

  const colorStyles = colors.reduce((acc, color, index) => {
    const key = `--color-primary-${index + 1}00`;
    const style = { [key]: color };
    return { ...acc, ...style };
  }, {});

  return (
    <main
      className={classes.main}
      style={{
        "--color-primary": colors[keyIndex],
        "--color-primary-dark": colors[colors.length - 1],
        ...colorStyles,
      }}
    >
      <header className={classes.header}>
        <section className={classes.section}>
          <ColorPicker currentColor={keyColor} />
        </section>
        <section className={classes.section}>
          <NumberInput defaultValue={stepsParam} />
        </section>
        <div className={classes.spacer} />
        <section className={classes.section}>
          <ExportButton colors={colors} />
        </section>
      </header>
      <ColorGrid colors={colors} keyIndex={keyIndex} />
    </main>
  );
}
