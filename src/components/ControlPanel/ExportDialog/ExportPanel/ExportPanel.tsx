'use client';

import * as Tabs from '@radix-ui/react-tabs';
import classes from './component.module.css';
import { generateSVG } from '@/utils/generate-svg';

type PropTypes = {
  colors: Array<string>;
};

const tabs = [
  {
    label: 'Figma',
    value: 'figma',
    disabled: false,
  },
  {
    label: 'CSS Variables',
    value: 'css-vars',
    disabled: false,
  },
  {
    label: 'Tailwind (v.4+)',
    value: 'tw-next',
    disabled: false,
  },
  {
    label: 'Tailwind (v.3)',
    value: 'tw-classic',
    disabled: true,
  },
  {
    label: 'JSON (W3C)',
    value: 'json-w3c',
    disabled: true,
  },
];

export default function ExportPanel({ colors }: PropTypes) {
  return (
    <Tabs.Root className={classes.root} defaultValue="figma" orientation="vertical">
      <Tabs.List className={classes.tabs}>
        <div className={classes.sticky}>
          {tabs.map((tab) => (
            <Tabs.Trigger
              key={tab.value}
              value={tab.value}
              className={classes.tab}
              disabled={tab.disabled}
            >
              {tab.label}
            </Tabs.Trigger>
          ))}
        </div>
      </Tabs.List>
      <div className={classes.panels}>
        {tabs.map((tab) => (
          <>
            {tab.value === 'figma' ? (
              <Tabs.Content key={tab.value} value={tab.value} asChild>
                <div className={`${classes.panel} ${classes.figma}`}>
                  <div dangerouslySetInnerHTML={{ __html: generateSVG(colors) }} />
                </div>
              </Tabs.Content>
            ) : (
              <Tabs.Content key={tab.value} value={tab.value} asChild>
                <div className={classes.panel}>
                  <p>{tab.label}</p>
                </div>
              </Tabs.Content>
            )}
          </>
        ))}
        <div className={classes.export}>
          <button>Copy</button>
          <button>Download</button>
        </div>
      </div>
    </Tabs.Root>
  );
}
