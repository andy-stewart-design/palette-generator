// TODO: Update export options
// - Add export modes: Tailwind (< v.3), JSON (W3C)
// TODO: Toast Messages

// TODO: Hit + Likes Counter (using turso)
// TODO: Copy individual colors by clicking on hex value
// TODO: Add color accessibility grid
// TODO: Add ability to select color spaces and models
// TODO: Add ability to do color palettes as well as color spectra
// TODO: Persist last color with cookies
// TODO: Improve performance of saturated yellow hues

import Providers from '@/components/Providers';
import ColorPicker from '@/components/ColorPicker';
import ColorGrid from '@/components/ColorGrid';
import KeyIndexController from '@/components/ControlPanel/KeyIndexController';
import StepsController from '@/components/ControlPanel/StepsController';
import ExportDialog, { ExportRoot, ExportTrigger } from '@/components/ControlPanel/ExportDialog';
import { generateSpectrum } from '@/utils/generate-spectrum';
import { generateCSSVariables } from '@/utils/generate-color-names';
import { generateCode } from '@/utils/code';
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
  const semanticVariables = generateCSSVariables({ type: 'semantic', color: keyColor });
  const cssVariables = { ...primitiveVariables, ...semanticVariables };

  const exportedColors = generateCode({ colors: colors.hex, intergerName: colors.intergerName });

  return (
    <Providers keyIndex={keyIndex}>
      <main className={classes.main} style={cssVariables}>
        <header className={classes.header}>
          <section className={classes.section}>
            <ColorPicker currentColor={keyColor} cssVariables={cssVariables} />
          </section>
          <section className={classes.section}>
            <KeyIndexController key={keyIndex.current} max={stepsParam} />
          </section>
          <section className={classes.section}>
            <StepsController defaultValue={stepsParam} />
          </section>
          <div className={classes.spacer} />
          <section className={classes.section}>
            <ExportRoot>
              <ExportTrigger />
              <ExportDialog colors={exportedColors} />
            </ExportRoot>
          </section>
        </header>
        <ColorGrid colors={colors.hex} names={colors.intergerName} />
      </main>
    </Providers>
  );
}
