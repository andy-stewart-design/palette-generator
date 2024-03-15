"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import classes from "./component.module.css";
import { useId } from "react";

type PageProps = {
  index: number;
  disabled: boolean;
};

export default function ColorCardButton({ index, disabled }: PageProps) {
  const router = useRouter();
  const params = useSearchParams();

  function handleClick() {
    const searchParams = new URLSearchParams(params);
    searchParams.set("keyIndex", index.toString());
    router.push(`/?${searchParams}`, { scroll: false });
  }

  return (
    <>
      {disabled && (
        <motion.button
          layoutId="key-index-button"
          id="key-index-button"
          className={classes.button}
          onClick={handleClick}
          disabled={disabled}
          initial={{ width: 'auto' }}
        >
          <div>
            Key Color
          </div>
        </motion.button>
      )}
      {!disabled && (
        <motion.button
          className={classes.button}
          onClick={handleClick}
          disabled={disabled}
          initial={{ width: 'auto' }}
        >
          <div>
            Set Key
          </div>
        </motion.button>
      )}
    </>
  );
}
