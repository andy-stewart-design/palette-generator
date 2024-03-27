'use client';

import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { generateSVG } from '@/utils/generate-svg';
import { generateCSSVariables } from '@/utils/generate-color-names';
import { copyToClipboard } from '@/utils/copy-to-clipboard';
import { downloadFile } from '@/utils/download-file';
import { tabContent, type TabValue } from './tab-content';
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

  const generated = getContent(value, colors);
  const colorPaletteSVG = generateSVG(colors.hex);

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
          <>
            {generated.type === 'figma' ? (
              <Tabs.Content key={tab.value} value={tab.value} asChild>
                <div className={`${classes.panel} ${classes.figma}`}>
                  <div dangerouslySetInnerHTML={{ __html: generated.content }} />
                </div>
              </Tabs.Content>
            ) : (
              <Tabs.Content key={tab.value} value={tab.value} asChild>
                <div className={`${classes.panel} ${classes.code}`}>
                  <p>{`:root {`}</p>
                  <ul>
                    {generated.content.map(({ name, value }) => (
                      <li key={value}>
                        {name}: {value};
                      </li>
                    ))}
                  </ul>
                  <p>{`}`}</p>
                </div>
              </Tabs.Content>
            )}
          </>
        ))}
        <div className={classes.export}>
          <button onClick={() => copyToClipboard(colorPaletteSVG)}>Copy</button>
          <button onClick={() => downloadFile(colorPaletteSVG)}>Download</button>
        </div>
      </div>
    </Tabs.Root>
  );
}

function getContent(
  type: TabValue,
  colors: {
    raw: Okhsl[];
    hex: string[];
    intergerName: number[];
  }
) {
  if (type === 'figma') {
    return { type, content: generateSVG(colors.hex) };
  } else {
    const primitiveVariables = generateCSSVariables({ type: 'primitive', colors });
    const cssVarNames = Object.keys(primitiveVariables);
    const cssVarValues = Object.values(primitiveVariables);
    return { type, content: cssVarNames.map((name, i) => ({ name, value: cssVarValues[i] })) };
  }
}
