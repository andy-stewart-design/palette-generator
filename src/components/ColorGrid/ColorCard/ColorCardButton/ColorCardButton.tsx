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
    >
      <div>
        {/* <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M22 12H16M8 12H2M12 8V2M12 22V16" />
        </svg> */}
        {!disabled ? "Update Key Color" : "Key Color"}
      </div>
    </button>
  );
}
