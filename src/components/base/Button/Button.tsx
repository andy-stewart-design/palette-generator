import { forwardRef, ComponentProps } from 'react';
import classes from './component.module.css';

type PropTypes = {
  variant?: 'primary' | 'secondary';
} & ComponentProps<'button'>;

const Button = forwardRef<HTMLButtonElement, PropTypes>(
  ({ children, variant = 'primary', ...delegated }, ref) => {
    return (
      <button ref={ref} {...delegated} className={`${classes.button} ${classes[variant]}`}>
        {children}
      </button>
    );
  }
);

export default Button;
