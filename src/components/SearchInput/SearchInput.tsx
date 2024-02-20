"use client";

import { type ChangeEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import classes from "./component.module.css";

type PageProps = {
  placeholder: string;
};

export default function SearchInput({ placeholder }: PageProps) {
  const params = useSearchParams();
  const router = useRouter();

  const colorParam = params.get("color");
  const decodedColorParam = colorParam && decodeURIComponent(colorParam);
  const defaultValue = decodedColorParam ?? "";

  const [value, setValue] = useState(defaultValue.replace("#", ""));

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value.replace("#", "");
    const containsInvalidCharacters = newValue.match(/[^#0-9a-fA-F]/gm);
    if (containsInvalidCharacters) return;

    setValue(newValue);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.length === 2 || value.length === 4 || value.length === 5) return;

    const searchParams = new URLSearchParams(params);

    if (value !== "") {
      let formattedValue: string;

      if (value.length === 1) {
        formattedValue = `${value}${value}${value}${value}${value}${value}`;
        setValue(formattedValue);
      } else if (value.length === 3) {
        formattedValue = `${value[0]}${value[0]}${value[1]}${value[1]}${value[2]}${value[2]}`;
        setValue(formattedValue);
      } else formattedValue = value;

      const color = formattedValue.startsWith("#")
        ? formattedValue
        : `#${formattedValue}`;

      const colorEncoded = encodeURIComponent(color);
      searchParams.set("color", colorEncoded);
    } else searchParams.delete("color");

    searchParams.delete("anchor");

    router.push(`/?${searchParams}`, { scroll: false });
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <label htmlFor="search" className={classes.label}>
        Hex
      </label>
      <div className={classes.wrapper}>
        <input
          id="search"
          type="text"
          value={value}
          onChange={handleChange}
          className={classes.input}
          placeholder={placeholder.replace("#", "")}
          pattern="^#(?:[0-9a-fA-F]{3}){1,2}$"
        />
        <button type="submit" className={classes.submit}>
          Submit
        </button>
      </div>
    </form>
  );
}
