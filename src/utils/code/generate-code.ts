import { generateCSS, generateSVG, highlightCode } from '.';
import type { TabValue } from '@/components/ControlPanel/ExportDialog/ExportPanel';
import type { ExportFiletype } from '../download-file';

type CodeProps = {
  colors: string[];
  intergerName: number[];
};

export type ExportedColor = {
  language: ExportFiletype;
  format: TabValue;
  htmlString: string;
  copyString: string;
};

export type ExportedColors = Array<ExportedColor>;

export function generateCode({ colors, intergerName }: CodeProps): ExportedColors {
  const svg: ExportedColor = {
    language: 'svg',
    format: 'figma',
    htmlString: generateSVG(colors),
    copyString: generateSVG(colors),
  };

  const cssCopyString = generateCSS(colors, intergerName);

  const css: ExportedColor = {
    language: 'css',
    format: 'css-vars',
    htmlString: highlightCode(cssCopyString, 'css'),
    copyString: cssCopyString,
  };

  return [svg, css];
}
