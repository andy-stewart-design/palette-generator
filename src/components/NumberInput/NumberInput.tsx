"use client";

import { useState, ChangeEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import classes from "./component.module.css";

export default function NumberInput({}) {
  const [value, setValue] = useState(11);
  const router = useRouter();
  const params = useSearchParams();

  function handleChange(e: ChangeEvent<HTMLInputElement> | number) {
    const newValue = typeof e === "number" ? e : Number(e.target.value);

    setValue(newValue);
    const searchParams = new URLSearchParams(params);

    if (newValue === 11) searchParams.delete("steps");
    else searchParams.set("steps", newValue.toString());

    console.log(params.toString());

    router.push(`/?${searchParams}`, { scroll: false });
  }

  const decrement = () => handleChange(value - 1);
  const increment = () => handleChange(value + 1);

  return (
    <div style={{ display: "grid" }}>
      <label htmlFor="steps" className={classes.label}>
        Steps
      </label>
      <div>
        <button onClick={decrement}>-</button>
        <input
          id="steps"
          className={classes.input}
          type="number"
          value={value}
          onChange={handleChange}
          min={3}
          max={20}
        />
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
}
