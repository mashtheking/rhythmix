'use client';

import * as RadixSlider from '@radix-ui/react-slider'

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
}


const VolumeSlider = ({ value, onChange }: SliderProps) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  }

  return (
    <RadixSlider.Root
      className="relative flex items-center select-none touch-none w-full group h-5"
      defaultValue={[1]}
      value={[value!]}
      onValueChange={handleChange}
      max={1}
      step={0.1}
      aria-label="Volume"
    >
      <RadixSlider.Track className="bg-gray-300 relative grow rounded-full h-1">
        <RadixSlider.Range className="absolute bg-gray-900 rounded-full h-full group-hover:bg-orange-500 transition-colors"/>
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};
export default VolumeSlider;
