# React Cyclic Slider

A React component for cyclic value selection, perfect for circular controls like angles, color wheels, clock times, and any other value that wraps around at min/max boundaries.

## Features

Hey, here's what you get with this slider:

- Values that loop around without getting stuck at the ends - perfect for things like angles or clock times
- Works great with touch, mouse, or any pointer device
- Fully TypeScript ready
- Set your own min, max, and step values
- Style it your way with a separate theming css file - use ours or roll your own
- Choose how it updates: as you drag or only when you let go
- Comes with a handy number input for when you need to be precise
- Optional units display (°, px, %, etc.) right next to the number input

## How Cyclic Wrapping Works

When a value exceeds the maximum or falls below the minimum:

- **Values above max:** Wrap around to min + (value % max)
  - Example: With range 0-360, a value of 370 becomes 10
  - Example: With range 100-200, a value of 210 becomes 10 (210 % 200)
  
- **Values below min:** The component handles wrapping for values below the minimum

This cyclic behavior makes the slider perfect for:

- Angles (0-360 degrees)
- Hue values in HSL color (0-360)
- Time selection (hours, minutes)
- And any other values that should wrap around at boundaries

## Installation

```bash
npm install react-cyclic-slider
# or
yarn add react-cyclic-slider
```

## Usage

```jsx
import React, { useState } from 'react';
import { CyclicSlider } from 'react-cyclic-slider';
// Optional: import the default theme
import 'react-cyclic-slider/dist/theme/cyclic-slider-theme.css';

function App() {
  const [angle, setAngle] = useState(0);
  
  // Update on every input change (continuous)
  const handleContinuousUpdate = (value) => {
    setAngle(value);
  };
  
  // Or update only when user releases the slider
  const handleReleaseUpdate = (value) => {
    setAngle(value);
  };
  
  return (
    <div>
      <h1>Angle Selector</h1>
      <p>Current angle: {angle}°</p>
      
      {/* Continuous updates as the user drags */}
      <CyclicSlider
        min={0}
        max={360}
        step={1}
        value={angle}
        label="Angle (continuous updates)"
        onInput={handleContinuousUpdate}
        unit="°"
      />
      
      {/* Updates only on release */}
      <CyclicSlider
        min={0}
        max={360}
        step={1}
        value={angle}
        label="Angle (update on release)"
        onChange={handleReleaseUpdate}
        unit="°"
      />
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | number | required | Current value of the slider |
| min | number | 0 | Minimum value |
| max | number | 360 | Maximum value |
| step | number | 1 | Step increment |
| label | string | undefined | Optional label text |
| onChange | function | undefined | Callback when value changes on pointer up (when released) |
| onInput | function | undefined | Callback on every value change during dragging |
| className | string | '' | Additional CSS class |
| unit | string | '' | Optional unit display (°, px, %, etc.) next to the number input |

## Theming

The component comes with essential layout styling built in, but visual styling is provided as a separate CSS file. This allows you to either:

1. Use the default theme by importing:

    ```jsx
    import 'react-cyclic-slider/dist/theme/cyclic-slider-theme.css';
    ```

2. Create your own theme by styling these selectors:

    ```css
    /* Your custom theme file */
    .cyclic-slider input[type="range"] {
    /* Range input styling */
    }

    .cyclic-slider input[type="range"]::-webkit-slider-thumb {
    /* Thumb styling for webkit browsers */
    }

    .cyclic-slider input[type="range"]::-moz-range-thumb {
    /* Thumb styling for Firefox */
    }

    .cyclic-slider input[type="number"] {
    /* Number input styling */
    }
    ```

## Examples

The component is versatile and can be used for various cyclic values:

- **Angle Selector:** 0-360 degrees
- **Color Wheel:** 0-360 hue values in HSL color
- **Clock Control:** 1-12 hours or 0-59 minutes
- **Day of Week:** 0-6 for days of the week
- **Month Selector:** 1-12 for months of the year
- **Temperature Range:** -50 to 50 degrees
- **Rotation:** -180 to 180 degrees

### Custom Range Examples

```jsx
// Standard range (min=0, max>0)
<CyclicSlider
  value={5}
  min={0}
  max={10}
  step={1}
  label="Standard Range"
  onChange={handleChange}
/>

// Positive range (min>0, max>min)
<CyclicSlider
  value={110}
  min={100} 
  max={200}
  step={1}
  label="Positive Range"
  onChange={handleChange}
/>

// Range with negative min (min<0, max>0)
<CyclicSlider
  value={0}
  min={-180}
  max={180}
  step={1}
  label="Rotation (-180° to 180°)"
  unit="°"
  onChange={handleChange}
/>

// Fractional step values
<CyclicSlider
  value={2.5}
  min={0}
  max={10}
  step={0.5}
  label="Fractional Steps"
  onChange={handleChange}
/>
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Preview production build
npm run preview

```

This project uses:

- [Vite](https://vitejs.dev/) for fast development and optimized builds
- [Vitest](https://vitest.dev/) for unit testing
- [TypeScript](https://www.typescriptlang.org/) for type safety

## Author

**Tom Bigelajzen**  
GitHub: [@tombigel](https://github.com/tombigel)

## License

MIT
