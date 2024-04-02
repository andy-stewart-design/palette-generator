'use client';

import ControllerWrapper from '../ControllerWrapper';
import Label from '@/components/base/Label';
import NumberInput from '@/components/base/NumberInput';
import { Locked, Undo, Unlocked } from '@/components/icons/16';
import { useKeyIndexContext } from '@/components/Providers';
import classes from './component.module.css';
import VisuallyHidden from '@/components/base/VisuallyHidden';

type PropTypes = {
  max: number;
};

export default function KeyIndexController({ max }: PropTypes) {
  const { keyIndex, updateKeyIndex, isLocked, toggleIsLocked } = useKeyIndexContext();

  const resetIndex = () => updateKeyIndex(-1);

  return (
    <ControllerWrapper>
      <div className={classes.labelWrapper}>
        <Label htmlFor="key-index">Key Index</Label>
        <Label as="span">
          <button onClick={toggleIsLocked} className={classes.button}>
            {isLocked ? <Locked /> : <Unlocked />}
            <VisuallyHidden>{isLocked ? 'Unlock' : 'Lock'}</VisuallyHidden>
          </button>
        </Label>
        <Label as="span">
          <button
            disabled={isLocked || keyIndex.current === keyIndex.generated}
            onClick={resetIndex}
            className={classes.button}
          >
            <Undo />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </Label>
      </div>
      <NumberInput
        id="key-index"
        defaultValue={keyIndex.current}
        onChangeCallback={updateKeyIndex}
        disabled={isLocked}
        min={0}
        max={max}
      />
    </ControllerWrapper>
  );
}
