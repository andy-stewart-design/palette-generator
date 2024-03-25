import type { ComponentPropsWithoutRef, ElementType } from "react";
import classes from "./component.module.css";

type PropTypes<T extends ElementType> = {
  as?: T;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

export default function VisuallyHidden<C extends ElementType>({
  as,
  children,
  ...delegated
}: PropTypes<C>) {
  const Component = as || "span";

  return (
    <Component {...delegated} className={classes.srOnly}>
      {children}
    </Component>
  );
}
