import { ComponentProps } from 'react';
import classes from './component.module.css';

type PropTypes = {
  variant?: 'primary' | 'secondary';
} & ComponentProps<'button'>;

export default function Button({ children, variant = 'primary', ...delegated }: PropTypes) {
  return (
    <button {...delegated} className={`${classes.button} ${classes[variant]}`}>
      {children}
    </button>
  );
}
