'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import ControllerWrapper from '../ControllerWrapper';
import Label from '@/components/base/Label';
import NumberInput from '@/components/base/NumberInput';

type PropTypes = {
  defaultMin: number;
  defaultMax: number;
};

export default function RangeController({ defaultMin, defaultMax }: PropTypes) {
  const router = useRouter();
  const params = useSearchParams();

  function pushRouterMax(value: string | number) {
    const newValue = typeof value === 'string' ? parseInt(value) : value;
    const searchParams = new URLSearchParams(params);

    if (newValue === 94) searchParams.delete('max');
    else searchParams.set('max', newValue.toString());

    router.push(`/?${searchParams}`, { scroll: false });
  }

  function pushRouterMin(value: string | number) {
    const newValue = typeof value === 'string' ? parseInt(value) : value;
    const searchParams = new URLSearchParams(params);

    if (newValue === 12) searchParams.delete('min');
    else searchParams.set('min', newValue.toString());

    router.push(`/?${searchParams}`, { scroll: false });
  }

  return (
    <div style={{ display: 'grid', gap: 'var(--space-20)' }}>
      <ControllerWrapper>
        <Label htmlFor="max">Max Brightness</Label>
        <NumberInput
          id="max"
          onChangeCallback={pushRouterMax}
          defaultValue={defaultMax}
          min={85}
          max={100}
        />
      </ControllerWrapper>
      <ControllerWrapper>
        <Label htmlFor="min">Min Brightness</Label>
        <NumberInput
          id="min"
          onChangeCallback={pushRouterMin}
          defaultValue={defaultMin}
          min={0}
          max={20}
        />
      </ControllerWrapper>
    </div>
  );
}
