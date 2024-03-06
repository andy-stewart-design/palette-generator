"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import HSLInputs from "@/components/HSLInputs";
import { formatHex, type Color, type Okhsl } from "culori";
import debounce from "just-debounce-it";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { ReadonlyURLSearchParams } from "next/navigation";
import classes from "./component.module.css";

type PropTypes = {
  currentColor: {
    hex: string;
    raw: Okhsl;
    name: string;
  };
};

export default function ColorPicker({ currentColor: systemColor }: PropTypes) {
  const [currentColor, setCurrentColor] = useState(systemColor);

  const params = useSearchParams();
  const router = useRouter();

  function updateColor(color: string | { h: number; s: number; l: number }) {
    if (typeof color === "string") {
      const searchParams = new URLSearchParams(params);

      if (color !== "") searchParams.set("color", color);
      else searchParams.delete("color");

      searchParams.delete("anchor");
      router.push(`/?${searchParams}`, { scroll: false });
    } else {
      const raw: Color = { mode: "okhsl", h: color.h, s: color.s, l: color.l };
      const hex = formatHex(raw);
      const newCurrentColor = { ...systemColor, hex, raw };
      setCurrentColor(newCurrentColor);
      updateURL(hex, router, params);
    }
  }

  useEffect(() => {
    if (currentColor !== systemColor) setCurrentColor(systemColor);
  }, [systemColor]);

  return (
    <div
      className={classes.wrapper}
      style={{ "--color-primary": currentColor.hex }}
    >
      <p className={classes.label}>
        Key Color <span>{currentColor.name}</span>
      </p>
      <div className={classes.inputs}>
        <SearchInput
          placeholder={currentColor.hex}
          updateColor={updateColor}
          key={currentColor.hex}
        />
        <HSLInputs color={currentColor.raw} updateColor={updateColor} />
      </div>
    </div>
  );
}

const updateURL = debounce(
  (hex: string, router: AppRouterInstance, params: ReadonlyURLSearchParams) => {
    const searchParams = new URLSearchParams(params);
    searchParams.set("color", hex.replace("#", ""));
    router.push(`/?${searchParams}`, { scroll: false });
  },
  200
);
