import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import CyclicSlider from './CyclicSlider';

describe('CyclicSlider', () => {
  it('renders correctly with default props', () => {
    render(<CyclicSlider value={45} />);
    
    // Check for range input
    const rangeInput = screen.getByRole('slider');
    expect(rangeInput).toBeInTheDocument();
    expect(rangeInput).toHaveAttribute('type', 'range');
    expect(rangeInput).toHaveAttribute('min', '0');
    expect(rangeInput).toHaveAttribute('max', '360');
    expect(rangeInput).toHaveAttribute('step', '1');
    expect(rangeInput).toHaveValue('45');
    
    // Check for number input
    const numberInput = screen.getByRole('spinbutton');
    expect(numberInput).toBeInTheDocument();
    expect(numberInput).toHaveAttribute('type', 'number');
    expect(numberInput).toHaveValue(45);
  });
  
  it('renders with a label when provided', () => {
    render(<CyclicSlider value={45} label="Test Label" />);
    
    // Check if label is rendered
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
  });
  
  it('displays unit suffix when unit prop is provided', () => {
    render(<CyclicSlider value={45} unit="°" />);
    
    // Check if unit suffix is rendered
    const unitSuffix = screen.getByText('°');
    expect(unitSuffix).toBeInTheDocument();
    expect(unitSuffix).toHaveClass('unit-suffix');
  });
  
  it('does not display unit suffix when unit prop is not provided', () => {
    render(<CyclicSlider value={45} />);
    
    // Check that there is no unit suffix element
    const unitSuffix = document.querySelector('.unit-suffix');
    expect(unitSuffix).not.toBeInTheDocument();
  });
  
  it('respects custom min, max, and step values', () => {
    render(
      <CyclicSlider
        value={5}
        min={0}
        max={10}
        step={0.5}
      />
    );
    
    const rangeInput = screen.getByRole('slider');
    expect(rangeInput).toHaveAttribute('min', '0');
    expect(rangeInput).toHaveAttribute('max', '10');
    expect(rangeInput).toHaveAttribute('step', '0.5');
    expect(rangeInput).toHaveValue('5');
  });
  
  it('applies the className prop', () => {
    render(<CyclicSlider value={45} className="custom-class" />);
    
    const sliderContainer = screen.getByRole('slider').parentElement;
    expect(sliderContainer).toHaveClass('cyclic-slider');
    expect(sliderContainer).toHaveClass('custom-class');
  });
  
  it('calls onInput callback when input value changes', () => {
    const onInputMock = vi.fn();
    render(
      <CyclicSlider
        value={45}
        onInput={onInputMock}
      />
    );
    
    const numberInput = screen.getByRole('spinbutton');
    fireEvent.input(numberInput, { target: { value: '50', valueAsNumber: 50 } });
    
    expect(onInputMock).toHaveBeenCalledWith(50);
  });
  
  it('calls onChange callback when input is completed', () => {
    const onChangeMock = vi.fn();
    render(
      <CyclicSlider
        value={45}
        onChange={onChangeMock}
      />
    );
    
    // Test using the range input's pointerup event which triggers the updateDataOnMouseUp
    const rangeInput = screen.getByRole('slider');
    fireEvent.pointerUp(rangeInput);
    
    expect(onChangeMock).toHaveBeenCalledWith(45);
  });
  
  it('handles wrapping around min/max values', () => {
    const onInputMock = vi.fn();
    render(
      <CyclicSlider
        value={359}
        min={0}
        max={360}
        onInput={onInputMock}
      />
    );
    
    const numberInput = screen.getByRole('spinbutton');
    fireEvent.input(numberInput, { target: { value: '370', valueAsNumber: 370 } });
    
    // Value should wrap around to 10 (370 % 360 = 10)
    expect(onInputMock).toHaveBeenCalledWith(10);
  });
  
  it('updates internal state when value prop changes', () => {
    const { rerender } = render(<CyclicSlider value={10} />);
    
    // Initial value
    const rangeInput = screen.getByRole('slider');
    expect(rangeInput).toHaveValue('10');
    
    // Update value through props
    rerender(<CyclicSlider value={20} />);
    expect(rangeInput).toHaveValue('20');
  });
}); 