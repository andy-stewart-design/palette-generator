// TODO: Add more granular key color selection support
// - Add key color controls to sidebar

// TODO: Update export options
// - Add modal to handle export options
// - Add export modes: CSS Variables, Tailwind (v4+ & v3), Figma, Swift UI?
// - For CSS/TW, add ability to select color mode

// TODO: Establish Design System
// TODO: Add color accessibility grid
// TODO: Add ability to do color palettes as well as color spectra
// TODO: Improve performance of saturated yellow hues

import Providers from "@/components/Providers";
import ColorPicker from "@/components/ColorPicker";
import ColorGrid from "@/components/ColorGrid";
import KeyIndexController from "@/components/ControlPanel/KeyIndexController";
import StepsController from "@/components/ControlPanel/StepsController";
import ExportButton from "@/components/ExportButton";
import { generateSpectrum } from "@/utils/generate-spectrum";
import type { ServerSideComponentProp } from "@/types/server-components";
import classes from "./page.module.css";

type PageProps = ServerSideComponentProp<
  {},
  { color?: string; steps?: string; keyIndex?: string }
>;

export default async function Home({ searchParams }: PageProps) {
  const hexParam = searchParams.color ? `#${searchParams.color}` : "#4aa5b7";
  const stepsParam = searchParams.steps ? Number(searchParams.steps) : 11;
  const indexParam = searchParams.keyIndex;

  const colorObject = await generateSpectrum(hexParam, stepsParam, indexParam);
  const { colors, keyColor, keyIndex, cssVars } = colorObject;

  const colorStyles = colors.reduce((acc, color, index) => {
    const key = `--color-primary-${index + 1}00`;
    const style = { [key]: color };
    return { ...acc, ...style };
  }, {});

  // await new Promise(resolve => setTimeout(resolve, 1000));

  return (
    <Providers keyIndex={keyIndex}>
      <main
        className={classes.main}
        style={{
          "--color-primary": colors[keyIndex.current],
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
            <StepsController defaultValue={stepsParam} />
          </section>
          <section className={classes.section}>
            <KeyIndexController key={keyIndex.current} max={stepsParam} />
          </section>
          <div className={classes.spacer} />
          <section className={classes.section}>
            <ExportButton colors={colors} />
          </section>
        </header>
        <ColorGrid colors={colors} />
      </main>
    </Providers>
  );
}
