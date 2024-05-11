import { useEffect } from 'react';

export function useSetDocumentStyle(cssVariables: Record<string, string>) {
  useEffect(() => {
    if (!document) return;
    const root = document.documentElement;

    const varNames = Object.keys(cssVariables);
    const varValues = Object.values(cssVariables);
    const varArray = varNames.map((name, i) => ({ name, value: varValues[i] }));

    varArray.forEach(({ name, value }) => {
      root.style.setProperty(name, value);
    });
  }, [cssVariables]);
}
