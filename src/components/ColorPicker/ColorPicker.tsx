'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SearchInput from '@/components/ColorPicker/SearchInput';
import HSLInputs from '@/components/ColorPicker/HSLInputs';
import { formatHex, type Color, type Okhsl } from 'culori';
import debounce from 'just-debounce-it';
import classes from './component.module.css';

type PropTypes = {
  currentColor: {
    hex: string;
    raw: Okhsl;
    intergerName: number;
    name: string;
  };
};

export default function ColorPicker({ currentColor: systemColor }: PropTypes) {
  const [currentColor, setCurrentColor] = useState(systemColor);

  useEffect(() => {
    if (currentColor !== systemColor) setCurrentColor(systemColor);
  }, [systemColor]);

  const params = useSearchParams();
  const router = useRouter();

  function updateColor(color: string | { h: number; s: number; l: number }) {
    if (typeof color === 'string') {
      const searchParams = new URLSearchParams(params);

      if (color !== '') searchParams.set('color', color);
      else searchParams.delete('color');

      searchParams.delete('keyIndex');
      router.push(`/?${searchParams}`, { scroll: false });
    } else {
      const raw: Color = { mode: 'okhsl', h: color.h, s: color.s, l: color.l };
      const hex = formatHex(raw);
      const newCurrentColor = { ...systemColor, hex, raw };
      setCurrentColor(newCurrentColor);
      updateURL(hex, params);
    }
  }

  const updateURL = useMemo(
    () =>
      debounce((hex: string, params: URLSearchParams) => {
        const searchParams = new URLSearchParams(params);
        console.log(params.forEach((value, key) => console.log(key, value)));

        searchParams.set('color', hex.replace('#', ''));
        router.push(`/?${searchParams}`, { scroll: false });
      }, 200),
    []
  );

  const primaryDesaturated = formatHex({
    mode: 'okhsl',
    h: currentColor.raw.h ?? 0,
    s: 0,
    l: currentColor.raw.l,
  });

  const primaryMedium = formatHex({
    mode: 'okhsl',
    h: currentColor.raw.h ?? 0,
    s: 0.8,
    l: 0.6,
  });

  return (
    <div
      className={classes.wrapper}
      style={{
        '--color-primary': currentColor.hex,
        '--color-primary-desaturated': primaryDesaturated,
        '--color-primary-medium': primaryMedium,
      }}
    >
      <p className={classes.label}>
        Key Color <span>{currentColor.name}</span>
      </p>
      <div className={classes.inputs}>
        <SearchInput
          placeholder={systemColor.hex}
          updateColor={updateColor}
          key={systemColor.hex}
        />
        <HSLInputs color={currentColor.raw} updateColor={updateColor} />
      </div>
    </div>
  );
}
