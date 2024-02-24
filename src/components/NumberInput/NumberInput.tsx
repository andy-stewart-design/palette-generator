"use client";

import { useState, ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import classes from "./component.module.css";

type PropTypes = {
  defaultValue: number;
};

export default function NumberInput({ defaultValue }: PropTypes) {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();
  const params = useSearchParams();
  const max = 20;
  const min = 3;

  function commitChange(value: string | number) {
    const newValue = typeof value === "string" ? parseInt(value) : value;
    const searchParams = new URLSearchParams(params);

    if (newValue === 11) searchParams.delete("steps");
    else searchParams.set("steps", newValue.toString());

    const anchor = params.get("anchor");
    if (anchor && parseInt(anchor) >= newValue - 1) {
      searchParams.set("anchor", (newValue - 1).toString());
    }

    router.push(`/?${searchParams}`, { scroll: false });
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(parseInt(e.target.value));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
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
      commitChange(newValue);
    }
  }

  function decrement() {
    const newValue = value - 1 <= min ? min : value - 1;
    setValue(newValue);
    commitChange(newValue);
  }

  function increment() {
    const newValue = value + 1 >= max ? max : value + 1;
    setValue(newValue);
    commitChange(newValue);
  }

  return (
    <div style={{ display: "grid" }} className={classes.form}>
      <label htmlFor="steps" className={classes.label}>
        Steps
      </label>
      <div className={classes.container}>
        <button onClick={decrement} className={classes.button}>
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
            <path d="M2 8 L14 8" strokeWidth="1.5" stroke="currentColor" />
          </svg>
        </button>
        <input
          id="steps"
          className={classes.input}
          type="number"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          min={min}
          max={max}
        />
        <button onClick={increment} className={classes.button}>
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
            <path
              d="M2 8 L14 8 M8 2 L8 14"
              strokeWidth="1.5"
              stroke="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
