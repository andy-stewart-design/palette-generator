'use client';

import * as Tabs from '@radix-ui/react-tabs';
import classes from './component.module.css';

const tabs = [
  {
    label: 'Figma',
    value: 'figma',
  },
  {
    label: 'CSS Variables',
    value: 'css-vars',
  },
  {
    label: 'Tailwind (v.3)',
    value: 'tw-classic',
  },
  {
    label: 'Tailwind (v.4+)',
    value: 'tw-next',
  },
];

export default function ExportPanel() {
  return (
    <Tabs.Root className={classes.root} defaultValue="figma" orientation="vertical">
      <Tabs.List className={classes.tabs}>
        <div className={classes.sticky}>
          {tabs.map((tab) => (
            <Tabs.Trigger key={tab.value} value={tab.value} className={classes.tab}>
              {tab.label}
            </Tabs.Trigger>
          ))}
        </div>
      </Tabs.List>
      <div className={classes.panels}>
        {tabs.map((tab) => (
          <Tabs.Content key={tab.value} value={tab.value} asChild>
            <div className={classes.panel}>
              <p>{tab.label}</p>
            </div>
          </Tabs.Content>
        ))}
        <div className={classes.export}>
          <button>Copy</button>
          <button>Download</button>
        </div>
      </div>
    </Tabs.Root>
  );
}
