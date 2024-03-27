'use client';

import React, { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import ExportPanel from './ExportPanel';
import { Close } from '@/components/icons/20';
import type { Okhsl } from 'culori';
import classes from './component.module.css';

type PropTypes = {
  colors: {
    raw: Okhsl[];
    hex: string[];
    intergerName: number[];
  };
};

export default function ExportDialog({ ...delegated }: PropTypes) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className={classes.overlay}>
        <Dialog.Content className={classes.dialog}>
          <div className={classes.header}>
            <Dialog.Title>Export Palette</Dialog.Title>
            <Dialog.Close asChild>
              <button className={classes.close} aria-label="Close">
                <Close />
              </button>
            </Dialog.Close>
          </div>
          <ExportPanel {...delegated} />
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  );
}

export function ExportRoot({ children }: { children: ReactNode }) {
  return <Dialog.Root>{children}</Dialog.Root>;
}
