"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchInput({}) {
  const params = useSearchParams();
  const router = useRouter();

  const colorParam = params.get("color");
  const decodedColorParam = colorParam && decodeURIComponent(colorParam);
  const defaultValue = decodedColorParam ?? "";
  const [value, setValue] = useState(defaultValue);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const searchParams = new URLSearchParams(params);

    if (value !== "") {
      const color = value.startsWith("#") ? value : `#${value}`;
      const colorEncoded = encodeURIComponent(color);
      searchParams.set("color", colorEncoded);
    } else searchParams.delete("color");

    router.push(`/?${searchParams}`, { scroll: false });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search" style={{ fontSize: "0.875rem" }}>
        Hex
      </label>
      <div>
        <input
          id="search"
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />{" "}
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
