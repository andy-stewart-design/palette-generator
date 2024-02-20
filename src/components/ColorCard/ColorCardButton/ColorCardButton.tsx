"use client";

import { useRouter, useSearchParams } from "next/navigation";
import classes from "./component.module.css";

type PageProps = {
  index: number;
  disabled: boolean;
};

export default function ColorCardButton({ index, disabled }: PageProps) {
  const router = useRouter();
  const params = useSearchParams();

  function handleClick() {
    const searchParams = new URLSearchParams(params);
    searchParams.set("anchor", index.toString());
    router.push(`/?${searchParams}`, { scroll: false });
  }

  return (
    <button
      className={classes.button}
      onClick={handleClick}
      disabled={disabled}
    />
  );
}
