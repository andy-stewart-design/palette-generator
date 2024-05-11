"use client";

import { useState, ChangeEvent, ComponentProps } from "react";
import classes from "./component.module.css";

type PropTypes = {
  defaultValue: number;
  min: number;
  max: number;
  onChangeCallback: (value: string | number) => void;
} & ComponentProps<"input">;

export default function NumberInput({
  defaultValue,
  min,
  max,
  onChangeCallback,
  disabled,
  ...delegated
}: PropTypes) {
  const [value, setValue] = useState(defaultValue);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (disabled) return;

    setValue(parseInt(e.target.value));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (disabled) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      increment();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      decrement();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const newValue = value >= max ? max : value <= min ? min : value;
      setValue(newValue);
      onChangeCallback(newValue);
    }
  }

  function decrement() {
    if (disabled) return;

    const newValue = value - 1 <= min ? min : value - 1;
    setValue(newValue);
    onChangeCallback(newValue);
  }

  function increment() {
    if (disabled) return;

    const newValue = value + 1 >= max ? max : value + 1;
    setValue(newValue);
    onChangeCallback(newValue);
  }

  return (
    <div className={classes.container}>
      <button
        onClick={decrement}
        className={classes.button}
        disabled={disabled}
      >
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
          <path d="M3 8 L13 8" strokeWidth="1.25" stroke="currentColor" />
        </svg>
      </button>
      <input
        {...delegated}
        type="number"
        className={classes.input}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        min={min}
        max={max}
      />
      <button
        onClick={increment}
        className={classes.button}
        disabled={disabled}
      >
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
          <path
            d="M3 8 L13 8 M8 3 L8 13"
            strokeWidth="1.25"
            stroke="currentColor"
          />
        </svg>
      </button>
    </div>
  );
}
