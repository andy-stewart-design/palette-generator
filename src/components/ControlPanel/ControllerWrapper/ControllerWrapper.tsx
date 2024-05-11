import { ComponentProps } from "react";
import classes from "./component.module.css";

export default function ControllerWrapper({ children }: ComponentProps<"div">) {
    return <div className={classes.wrapper}>{children}</div>
}