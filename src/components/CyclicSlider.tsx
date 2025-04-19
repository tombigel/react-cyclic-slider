/**
 * React Cyclic Slider
 * A component for cyclic value selection that wraps at min/max boundaries
 * 
 * @author Tom Bigelajzen
 * @see https://github.com/tombigel
 * @license MIT
 */

import React, { useCallback, useEffect, useState } from 'react';
import './CyclicSlider.css';

export interface CyclicSliderProps {
  value: number;
  onChange?: (value: number) => void;
  onInput?: (value: number) => void;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  unit?: string;
}

const CyclicSlider: React.FC<CyclicSliderProps> = ({
  value: dataValue,
  onChange,
  onInput,
  label,
  min = 0,
  max = 360,
  step = 1,
  className = '',
  unit = ''
}) => {
  const [value, setValue] = useState<number>(dataValue);

  // Update local state when the parent component changes the value prop
  useEffect(() => {
    if (dataValue !== value) {
      setValue(dataValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataValue]);

  // Handle changes from the input elements
  const handleValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.valueAsNumber % max;
      setValue(newValue);
      // Call onInput callback if provided
      onInput && onInput(newValue);
    },
    [max, onInput]
  );

  // Call onChange callback when the user releases the slider
  const updateDataOnMouseUp = useCallback(
    () => {
      onChange && onChange(value);
    },
    [onChange, value]
  );

  // The core cyclic slider functionality
  const cyclicHandler = useCallback(
    (event: React.PointerEvent<HTMLInputElement>) => {
      // Prevent default browser behavior
      event.preventDefault();

      const {
        target,
        nativeEvent: { offsetX },
        pointerId
      } = event;
      const element = target as HTMLInputElement;
      const { offsetWidth } = element;

      // Calculate initial value based on click position
      const initialValue = Math.round(offsetX / offsetWidth * (max - min));
      setValue(initialValue);
      onInput && onInput(initialValue);

      // Update value as the pointer moves, with proper min/max wrapping
      const onPointerMove = (e: PointerEvent) => {
        const newValue = Math.round(
          e.offsetX % offsetWidth / offsetWidth * (max - min)
        );

        const normalizedValue =
          newValue < min ? max + newValue % max : newValue;
        setValue(normalizedValue);
        // Call onInput callback with the new value
        onInput && onInput(normalizedValue);
      };

      // Set up event handling for pointer movement and release
      element.setPointerCapture(pointerId);
      element.addEventListener("pointermove", onPointerMove);
      element.addEventListener("pointerup", () => {
        element.removeEventListener("pointermove", onPointerMove);
        onChange && onChange(value);
      }, { once: true });
    },
    [min, max, onInput, onChange, value]
  );

  return (
    <>
      {label && <label htmlFor="input">{label}</label>}
      <div className={`cyclic-slider ${className}`}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onInput={handleValueChange}
          onPointerUp={updateDataOnMouseUp}
          onPointerDown={cyclicHandler}
        />
        <div className="input-with-unit">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onInput={handleValueChange}
            onChange={updateDataOnMouseUp}
          />
          {unit && <span className="unit-suffix">{unit}</span>}
        </div>
      </div>
    </>
  );
};

export default CyclicSlider; 