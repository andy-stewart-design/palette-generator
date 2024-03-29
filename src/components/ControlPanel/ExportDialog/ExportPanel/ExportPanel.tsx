'use client';

import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { generateSVG } from '@/utils/generate-svg';
import { generateCSSVariables } from '@/utils/generate-color-names';
import { copyToClipboard } from '@/utils/copy-to-clipboard';
import { downloadFile, type ExportFiletype } from '@/utils/download-file';
import { tabContent, type TabValue } from './tab-content';
import Button from '@/components/base/Button';
import type { Okhsl } from 'culori';
import classes from './component.module.css';

type PropTypes = {
  colors: {
    raw: Okhsl[];
    hex: string[];
    intergerName: number[];
  };
};

export default function ExportPanel({ colors }: PropTypes) {
  const [value, setValue] = useState<TabValue>('figma');

  const exported = generateExport(value, colors);

  return (
    <Tabs.Root
      className={classes.root}
      value={value}
      onValueChange={(newValue) => setValue(newValue as TabValue)}
      defaultValue={value}
      orientation="vertical"
    >
      <Tabs.List className={classes.tabs}>
        <div className={classes.sticky}>
          {tabContent.map((tab) => (
            <Tabs.Trigger
              key={tab.value}
              className={classes.tab}
              value={tab.value}
              disabled={tab.disabled}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </div>
      </Tabs.List>
      <div className={classes.panels}>
        {tabContent.map((tab) => (
          <Tabs.Content key={tab.value} value={tab.value} asChild>
            <div className={`${classes.panel} ${classes[tab.value]}`}>
              <div dangerouslySetInnerHTML={{ __html: exported.htmlString }} />
            </div>
          </Tabs.Content>
        ))}
        <div className={classes.export}>
          <Button onClick={() => copyToClipboard(exported.copyString)}>Copy</Button>
          <Button
            variant="secondary"
            onClick={() => downloadFile(exported.copyString, exported.type)}
          >
            Download
          </Button>
        </div>
      </div>
    </Tabs.Root>
  );
}

type GenerateExportReturn = {
  type: ExportFiletype;
  htmlString: string;
  copyString: string;
};

function generateExport(
  type: TabValue,
  colors: {
    raw: Okhsl[];
    hex: string[];
    intergerName: number[];
  }
): GenerateExportReturn {
  if (type === 'figma') {
    return {
      type: 'svg',
      htmlString: generateSVG(colors.hex),
      copyString: generateSVG(colors.hex),
    };
  } else {
    const primitiveVariables = generateCSSVariables({ type: 'primitive', colors });
    const cssVarNames = Object.keys(primitiveVariables);
    const cssVarValues = Object.values(primitiveVariables);
    const colorsArray = cssVarNames.map((name, i) => ({ name, value: cssVarValues[i] }));
    return {
      type: 'css',
      htmlString: generatePaletteHTML(colorsArray),
      copyString: generatePaletteCopyString(colorsArray),
    };
  }
}

function generatePaletteHTML(colorsArray: { name: string; value: string }[]): string {
  const containerDiv = document.createElement('div');
  const beforeParagraph = document.createElement('p');
  const afterParagraph = document.createElement('p');
  const ul = document.createElement('ul');

  beforeParagraph.innerHTML =
    '<span data-code-h2>:where(</span><span data-code-h3>:root</span><span data-code-h2>) {</span>';
  afterParagraph.innerHTML = '<span data-code-h2>}</span>';

  containerDiv.appendChild(beforeParagraph);

  colorsArray.forEach((color) => {
    const li = document.createElement('li');
    const nameSpan = document.createElement('span');
    const valueSpan = document.createElement('span');

    nameSpan.textContent = `${color.name}: `;
    nameSpan.setAttribute('data-code-h1', '');
    valueSpan.innerHTML = `<span data-code-h3>#</span><span data-code-text>${color.value.replace(
      '#',
      ''
    )};</span>`;

    li.appendChild(nameSpan);
    li.appendChild(valueSpan);
    ul.appendChild(li);
  });

  containerDiv.appendChild(ul);
  containerDiv.appendChild(afterParagraph);

  return containerDiv.outerHTML;
}

function generatePaletteCopyString(colorsArray: { name: string; value: string }[]): string {
  const openingTag = ':where(:root) {';
  const closingTag = '}';
  const vars = colorsArray
    .map((color) => `${color.name}: ${color.value};`)
    .join('\n')
    .trim();

  return [openingTag, vars, closingTag].join('\n').trim();
}
