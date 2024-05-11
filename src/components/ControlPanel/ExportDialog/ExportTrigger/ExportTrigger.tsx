'use client';

import { Trigger } from '@radix-ui/react-dialog';
import classes from './component.module.css';
import Button from '@/components/base/Button';

export default function ExportTrigger() {
  return (
    <Trigger asChild>
      <Button>Export Colors</Button>
    </Trigger>
  );
}
