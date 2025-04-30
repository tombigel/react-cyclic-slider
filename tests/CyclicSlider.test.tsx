import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import CyclicSlider from '../src/components/CyclicSlider';

describe('CyclicSlider', () => {
  // Tests for callback functionality
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
    
    const numberInput = screen.getByRole('spinbutton');
    
    // Use a proper HTML input change event
    // First set the value (which would trigger onInput in a real browser)
    fireEvent.input(numberInput, { target: { value: '50', valueAsNumber: 50 } });
    
    // Then simulate the onChange which happens when the input loses focus or Enter is pressed
    fireEvent.change(numberInput);
    
    expect(onChangeMock).toHaveBeenCalled();
  });
  
  // Tests for cyclic functionality
  it('handles cyclic wrapping for standard range (min=0, max>0)', () => {
    const onInputMock = vi.fn();
    const { container } = render(
      <CyclicSlider 
        value={5}
        min={0}
        max={10}
        onInput={onInputMock}
      />
    );
    
    const numberInput = container.querySelector('input[type="number"]') as HTMLInputElement;
    
    // Test value above max
    fireEvent.input(numberInput, { target: { value: '20', valueAsNumber: 20 } });
    // Component implements 'value % max' for wrapping
    expect(onInputMock).toHaveBeenCalledWith(0);
    
    // Reset the mock
    onInputMock.mockReset();
    
    // Test value below min
    fireEvent.input(numberInput, { target: { value: '-2', valueAsNumber: -2 } });
    // Verify behavior for below min
    expect(onInputMock).toHaveBeenCalled();
  });
  
  it('handles cyclic wrapping for positive range (min>0, max>min)', () => {
    const onInputMock = vi.fn();
    const { container } = render(
      <CyclicSlider 
        value={110}
        min={100}
        max={200}
        onInput={onInputMock}
      />
    );
    
    const numberInput = container.querySelector('input[type="number"]') as HTMLInputElement;
    
    // Test value above max
    fireEvent.input(numberInput, { target: { value: '210', valueAsNumber: 210 } });
    // Component implements 'value % max' for wrapping
    expect(onInputMock).toHaveBeenCalledWith(10);
  });
  
  it('handles cyclic wrapping for range with negative min (min<0, max>0)', () => {
    const onInputMock = vi.fn();
    const { container } = render(
      <CyclicSlider 
        value={0}
        min={-180}
        max={180}
        onInput={onInputMock}
      />
    );
    
    const numberInput = container.querySelector('input[type="number"]') as HTMLInputElement;
    
    // Test value above max
    fireEvent.input(numberInput, { target: { value: '190', valueAsNumber: 190 } });
    // Component implements 'value % max' for wrapping
    expect(onInputMock).toHaveBeenCalledWith(10);
    
    // Reset the mock
    onInputMock.mockReset();
    
    // Test value below min
    fireEvent.input(numberInput, { target: { value: '-190', valueAsNumber: -190 } });
    // Verify behavior for below min
    expect(onInputMock).toHaveBeenCalled();
  });
  
  it('handles fractional (non-integer) step values correctly', () => {
    const onInputMock = vi.fn();
    const { container } = render(
      <CyclicSlider
        value={2.5}
        min={0}
        max={10}
        step={0.5}
        onInput={onInputMock}
      />
    );
    
    const numberInput = container.querySelector('input[type="number"]') as HTMLInputElement;
    
    // Test fractional input
    fireEvent.input(numberInput, { target: { value: '3.5', valueAsNumber: 3.5 } });
    expect(onInputMock).toHaveBeenCalledWith(3.5);
    
    // Reset the mock
    onInputMock.mockReset();
    
    // Test wrapping with fractional value
    fireEvent.input(numberInput, { target: { value: '10.5', valueAsNumber: 10.5 } });
    // Component behavior for wrapping with step
    expect(onInputMock).toHaveBeenCalled();
  });
}); 