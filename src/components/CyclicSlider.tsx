/**
 * React Cyclic Slider
 * A component for cyclic value selection that wraps at min/max boundaries
 * 
 * @author Tom Bigelajzen
 * @see https://github.com/tombigel
 * @license MIT
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const tempValueWhileDragging = useRef<number>(dataValue);
  
  // Update local state when the parent component changes the value prop
  useEffect(() => {
    if (dataValue !== value) {
      setValue(dataValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataValue]);

  // Handle changes from the number input
  const onNumberInputInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.valueAsNumber % max;
      setValue(newValue);
      // Call onInput callback if provided
      onInput && onInput(newValue);
    },
    [max, onInput]
  );

  // Handle changes from the number input
  const onNumberInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(event.target.valueAsNumber);
    },
    [onChange]
  );

  // The core cyclic slider functionality
  const onSliderPointerDown = useCallback(
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
      tempValueWhileDragging.current = initialValue;
      setValue(initialValue);
      onInput && onInput(initialValue);

      // Update value as the pointer moves, with proper min/max wrapping
      const onPointerMove = (e: PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (element.hasPointerCapture(pointerId)) {
          const newValue = Math.round(e.offsetX % offsetWidth / offsetWidth * (max - min) + min) * step;
          const normalizedValue = newValue < min ? max + newValue % max : newValue;
          
          tempValueWhileDragging.current = normalizedValue;
          setValue(normalizedValue);
          // Call onInput callback with the new value
          onInput && onInput(normalizedValue);
        }
      };

      const onPointerCleanup = () => { 
        element.removeEventListener("pointermove", onPointerMove);
        element.releasePointerCapture(pointerId);
        onChange && onChange(tempValueWhileDragging.current);
        document.removeEventListener("pointerup", onPointerCleanup);
        document.removeEventListener("pointercancel", onPointerCleanup);
        console.log('onPointerCleanup', tempValueWhileDragging.current);
      };

      // Set up event handling for pointer movement and release
      element.setPointerCapture(pointerId);
      element.addEventListener("pointermove", onPointerMove, { passive: false });
      document.addEventListener("pointerup", onPointerCleanup);
      document.addEventListener("pointercancel", onPointerCleanup);
    },
    [min, max, onInput, onChange]
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
          onPointerDown={onSliderPointerDown}
        />
        <div className="input-with-unit">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onInput={onNumberInputInput}
            onChange={onNumberInputChange}
          />
          {unit && <span className="unit-suffix">{unit}</span>}
        </div>
      </div>
    </>
  );
};

export default CyclicSlider; 