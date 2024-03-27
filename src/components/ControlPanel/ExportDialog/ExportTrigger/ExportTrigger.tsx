'use client';

import { Trigger } from '@radix-ui/react-dialog';
import classes from './component.module.css';

export default function ExportTrigger() {
  return (
    <Trigger asChild>
      <button className={classes.trigger}>Export Colors</button>
    </Trigger>
  );
}
