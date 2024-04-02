import type { ReactNode } from 'react';
import KeyIndexProvider from './KeyIndexProvider';

type PropTypes = {
  keyIndex: {
    current: number;
    generated: number;
  };
  children: ReactNode;
};

export default function Providers({ keyIndex, children }: PropTypes) {
  return <KeyIndexProvider keyIndex={keyIndex}>{children}</KeyIndexProvider>;
}
