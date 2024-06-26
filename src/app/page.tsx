// TODO: Add ability to manually adjust min and max brightness
// TODO: Add mobile shim

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
import { generateExport } from '@/utils/code';
import type { ServerSideComponentProp } from '@/types/server-components';
import classes from './page.module.css';
// import RangeController from '@/components/ControlPanel/RangeController/RangeController';
// import { okhsl } from 'culori';

type PageProps = ServerSideComponentProp<
  {},
  { color?: string; steps?: string; keyIndex?: string; min?: string; max?: string }
>;

export default async function Home({ searchParams }: PageProps) {
  const hexParam = searchParams.color ? `#${searchParams.color}` : '#4aa5b7';
  const stepsParam = searchParams.steps ? Number(searchParams.steps) : 11;
  const indexParam = searchParams.keyIndex;
  // const { min, max } = searchParams;
  // const [minBrightness, maxBrightness] = generateBrightness(min, max, hexParam);

  const colorObject = await generateSpectrum(hexParam, stepsParam, indexParam);
  const { colors, keyColor, keyIndex } = colorObject;

  const primitiveVariables = generateCSSVariables({ type: 'primitive', colors });
  const semanticVariables = generateCSSVariables({ type: 'semantic', color: keyColor });
  const cssVariables = { ...primitiveVariables, ...semanticVariables };

  const exportedColors = generateExport({ colors: colors.hex, intergerName: colors.intergerName });

  return (
    <Providers keyIndex={keyIndex}>
      <main className={classes.main} style={cssVariables}>
        <header className={classes.header}>
          <section className={classes.section}>
            <ColorPicker currentColor={keyColor} cssVariables={cssVariables} />
          </section>
          <section className={`${classes.section} group-key-index`}>
            <KeyIndexController key={keyIndex.current} max={stepsParam} />
          </section>
          <section className={classes.section}>
            <StepsController defaultValue={stepsParam} />
          </section>
          {/* <section className={classes.section}>
            <RangeController defaultMin={minBrightness} defaultMax={maxBrightness} />
          </section> */}
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

// function generateBrightness(
//   min: string | number | undefined,
//   max: string | number | undefined,
//   keyColor: string
// ) {
//   const numberMin = typeof min === 'string' ? parseInt(min) : min;
//   const numberMax = typeof max === 'string' ? parseInt(max) : max;

//   const keyColorObject = okhsl(keyColor);
//   if (keyColorObject === undefined) throw new Error('Could not parse key color');
//   const keyLightness = keyColorObject.l * 100;
//   console.log({ keyLightness });

//   let finalMin = numberMin ?? 12;
//   if (keyLightness < finalMin) finalMin = parseInt(keyLightness.toFixed(2));

//   let finalMax = numberMax ?? 94;
//   if (keyLightness > finalMax) finalMax = parseInt(keyLightness.toFixed(2));

//   return [finalMin, finalMax];
// }
