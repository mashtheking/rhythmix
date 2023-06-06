'use client';

import * as RadixSlider from '@radix-ui/react-slider'

interface SliderProps {
  value?: number;
  onChange?: (value: number) => void;
  max: number;
}


const Slider = ({ value, onChange, max }: SliderProps) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  }

  return (
    <RadixSlider.Root
      className="relative flex items-center select-none touch-none w-36 cursor-pointer"
      defaultValue={[0]}
      value={[value!]}
      onValueChange={handleChange}
      max={max}
      aria-label="Seek"
    >
      <RadixSlider.Track className="bg-gray-600 relative grow rounded-full h-1">
        <RadixSlider.Range
          className="absolute bg-white rounded-full h-full"
        />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};
export default Slider;
