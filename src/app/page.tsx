// TODO: Add more granular key color selection support
// - Add ability to set key color
// - Add ability to lock and unlock key color
// - Add key color controls to sidebar
// -Note: I will likely need to keep track of `automatedKeyColor`, `currentKeyColor`, and `keyColorisLocked`

// TODO: Update export options
// - Add modal to handle export options
// - Add export modes: CSS Variables, Tailwind (v4+ & v3), Figma, Swift UI?
// - For CSS/TW, add ability to select color mode

// TODO: Add color accessibility grid
// TODO: Improve performance of saturated yellow hues
// TODO: Add ability to do color palettes as well as color spectra

import ColorPicker from "@/components/ColorPicker";
import ColorGrid from "@/components/ColorGrid";
import NumberInput from "@/components/NumberInput";
import ExportButton from "@/components/ExportButton";
import { generateSpectrum } from "@/utils/generate-spectrum";
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
  const { colors, keyColor, keyIndex, cssVars } = colorObject;

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
        "--color-primary-dark": colors.at(-2)!,
        "--color-primary-darker": colors.at(-1)!,
        ...cssVars,
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
