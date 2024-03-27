export const tabContent = [
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
    label: 'Tailwind (pre v.4)',
    value: 'tw-classic',
    disabled: true,
  },
  {
    label: 'JSON (W3C)',
    value: 'json-w3c',
    disabled: true,
  },
];

export type TabValue = 'figma' | 'css-vars' | 'tw-classic' | 'json-w3c';
