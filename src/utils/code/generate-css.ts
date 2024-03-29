export function generateCSS(colors: string[], intergerName: number[]): string {
  const openingTag = ':where(:root) {';
  const closingTag = '}';
  const variables = colors.map(
    (color, index) => `    --color-primary-${intergerName[index]}: ${color};`
  );

  return [openingTag, ...variables, closingTag].join('\n').trim();
}
