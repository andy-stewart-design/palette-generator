// TODO: Establish Design System

// TODO: Update export options
// - Add modal to handle export options
// - Add export modes: CSS Variables, Tailwind (v4+ & v3), Figma, Swift UI?
// - For CSS/TW, add ability to select color mode

// TODO: Persis last color with cookies
// TODO: Add color accessibility grid
// TODO: Add ability to do color palettes as well as color spectra
// TODO: Improve performance of saturated yellow hues

import Providers from '@/components/Providers';
import ColorPicker from '@/components/ColorPicker';
import ColorGrid from '@/components/ColorGrid';
import KeyIndexController from '@/components/ControlPanel/KeyIndexController';
import StepsController from '@/components/ControlPanel/StepsController';
import ExportButton from '@/components/ExportButton';
import { generateSpectrum } from '@/utils/generate-spectrum';
import { generateCSSVariables } from '@/utils/generate-color-names';
import type { ServerSideComponentProp } from '@/types/server-components';
import classes from './page.module.css';

type PageProps = ServerSideComponentProp<{}, { color?: string; steps?: string; keyIndex?: string }>;

export default async function Home({ searchParams }: PageProps) {
  const hexParam = searchParams.color ? `#${searchParams.color}` : '#4aa5b7';
  const stepsParam = searchParams.steps ? Number(searchParams.steps) : 11;
  const indexParam = searchParams.keyIndex;

  const colorObject = await generateSpectrum(hexParam, stepsParam, indexParam);
  const { colors, keyColor, keyIndex } = colorObject;

  const primitiveVariables = generateCSSVariables({ type: 'primitive', colors });
  const semanticVariables = generateCSSVariables({ type: 'semantic', color: keyColor, colors });

  return (
    <Providers keyIndex={keyIndex}>
      <main
        className={classes.main}
        style={{
          ...primitiveVariables,
          ...semanticVariables,
        }}
      >
        <header className={classes.header}>
          <section className={classes.section}>
            <ColorPicker currentColor={keyColor} />
          </section>
          <section className={classes.section}>
            <KeyIndexController key={keyIndex.current} max={stepsParam} />
          </section>
          <section className={classes.section}>
            <StepsController defaultValue={stepsParam} />
          </section>
          <div className={classes.spacer} />
          <section className={classes.section}>
            <ExportButton colors={colors.hex} />
          </section>
        </header>
        <ColorGrid colors={colors.hex} names={colors.intergerName} />
      </main>
    </Providers>
  );
}
