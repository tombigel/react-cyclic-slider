# React Cyclic Slider

A React component for cyclic value selection, perfect for circular controls like angles, color wheels, clock times, and any other value that wraps around at min/max boundaries.

## Features

- Cyclic value selection (wraps around min/max values)
- Touch/pointer support
- TypeScript support
- Customizable min/max/step values
- Separate theming system (use our theme or create your own)
- Dual update modes (continuous or on release)
- Built-in number input for precise value control

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
      />
      
      {/* Updates only on release */}
      <CyclicSlider
        min={0}
        max={360}
        step={1}
        value={angle}
        label="Angle (update on release)"
        onChange={handleReleaseUpdate}
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

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build demo app
npm run build

# Build library
npm run build:lib
```

## Author

**Tom Bigelajzen**  
GitHub: [@tombigel](https://github.com/tombigel)

## License

MIT
