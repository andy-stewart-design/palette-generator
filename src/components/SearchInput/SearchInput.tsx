"use client";

import { type ChangeEvent, useState } from "react";
import classes from "./component.module.css";

type PageProps = {
  placeholder: string;
  updateColor: (color: string | { h: number; s: number; l: number }) => void;
};

export default function SearchInput({ placeholder, updateColor }: PageProps) {
  const defaultValue = placeholder.replace("#", "");
  const [value, setValue] = useState(defaultValue);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value.replace("#", "");
    const containsInvalidCharacters = newValue.match(/[^#0-9a-fA-F]/gm);
    if (containsInvalidCharacters) return;
    setValue(newValue);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.length === 2 || value.length === 4 || value.length === 5) return;

    if (value !== "") {
      let formattedValue: string;

      if (value.length === 1) {
        formattedValue = `${value}${value}${value}${value}${value}${value}`;
        setValue(formattedValue);
      } else if (value.length === 3) {
        formattedValue = `${value[0]}${value[0]}${value[1]}${value[1]}${value[2]}${value[2]}`;
        setValue(formattedValue);
      } else if (value.length > 6) {
        formattedValue = value.slice(0, 6);
        setValue(formattedValue);
      } else formattedValue = value;

      const color = formattedValue.startsWith("#")
        ? formattedValue.replace("#", "")
        : formattedValue;

      updateColor(color);
    } else updateColor(value);
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <label htmlFor="search" className={classes.label}>
        Hex
      </label>
      <div className={classes.wrapper}>
        <span className={classes.swatch} />
        <input
          id="search"
          type="text"
          value={value}
          onChange={handleChange}
          className={classes.input}
          placeholder={defaultValue}
        />
        <button type="submit" className={classes.submit}>
          Submit
        </button>
      </div>
    </form>
  );
}
