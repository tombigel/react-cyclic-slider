/// <reference types="vite/client" />

import React, { useState } from 'react';
// Use the alias defined in vite.config.mjs
import CyclicSlider from 'react-cyclic-slider';
import './App.css';
// Correct relative path to theme file
import '../src/theme/cyclic-slider-theme.css';

// Calculate the public URL based on environment
const getPublicUrl = () => {
  return import.meta.env.BASE_URL || '';
};

const App: React.FC = () => {
  // State for angle example
  const [angle, setAngle] = useState(0);
  const [angleUpdateMode, setAngleUpdateMode] = useState<'input' | 'change'>('input');
  
  // State for hue example
  const [hue, setHue] = useState(180);
  const [hueUpdateMode, setHueUpdateMode] = useState<'input' | 'change'>('input');
  
  // State for clock example (hours)
  const [hour, setHour] = useState(3);
  const [hourUpdateMode, setHourUpdateMode] = useState<'input' | 'change'>('input');
  
  // Calculate the position of the indicator based on the angle
  const indicatorStyle = {
    transform: `rotate(${angle}deg)`
  };
  
  // Calculate background color based on hue
  const hueBackgroundStyle = {
    backgroundColor: `hsl(${hue}, 70%, 60%)`
  };
  
  // Calculate hour hand rotation (30 degrees per hour)
  const hourHandStyle = {
    transform: `rotate(${hour * 30}deg)`
  };
  
  // Format hour for display
  const formatHour = (hr: number) => {
    return hr === 0 ? 12 : hr;
  };
  
  // Generate clock hour positions
  const getHourPositions = () => {
    return [...Array(12)].map((_, i) => {
      // Calculate angle in radians (starting from top, clockwise)
      const angle = ((i * 30) - 90) * (Math.PI / 180);
      
      // Calculate position - 80% of radius to position closer to the edge
      const radius = 45;
      const left = 50 + Math.cos(angle) * radius;
      const top = 50 + Math.sin(angle) * radius;
      
      return {
        hour: i === 0 ? 12 : i,
        style: {
          position: 'absolute' as const,
          left: `${left}%`,
          top: `${top}%`,
          transform: 'translate(-50%, -50%)'
        }
      };
    });
  };
  
  const hourPositions = getHourPositions();
  
  return (
    <div className="app">
      <h1>React Cyclic Slider</h1>
      
      <div>
        <div className="demo-section">
          <h2>Angle Selector</h2>
          
          <CyclicSlider
            min={0}
            max={360}
            step={1}
            value={angle}
            label="Angle Slider"
            onChange={angleUpdateMode === 'change' ? setAngle : undefined}
            onInput={angleUpdateMode === 'input' ? setAngle : undefined}
            unit="°"
          />
          
          <div className="demo-visualization">
            <div className="angle-display">
              <div className="angle-circle">
                <div className="angle-indicator" style={indicatorStyle}></div>
              </div>
              <div className="angle-value">{angle}°</div>
            </div>
          </div>
          
          <div className="update-mode">
            <p>Update mode:</p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="angle-update-mode"
                  checked={angleUpdateMode === 'input'}
                  onChange={() => setAngleUpdateMode('input')}
                />
                On Input (continuous)
              </label>
              <label>
                <input
                  type="radio"
                  name="angle-update-mode"
                  checked={angleUpdateMode === 'change'}
                  onChange={() => setAngleUpdateMode('change')}
                />
                On Change (on release)
              </label>
            </div>
          </div>
        </div>
        
        <div className="demo-section">
          <h2>Color Hue</h2>
          
          <CyclicSlider
            min={0}
            max={360}
            step={1}
            value={hue}
            label="Hue Selector"
            onChange={hueUpdateMode === 'change' ? setHue : undefined}
            onInput={hueUpdateMode === 'input' ? setHue : undefined}
            unit="°"
          />
          
          <div className="demo-visualization">
            <div className="hue-display" style={hueBackgroundStyle}>
            </div>
            <div className="hue-value">HSL({hue}, 70%, 60%)</div>
          </div>
          
          <div className="update-mode">
            <p>Update mode:</p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="hue-update-mode"
                  checked={hueUpdateMode === 'input'}
                  onChange={() => setHueUpdateMode('input')}
                />
                On Input (continuous)
              </label>
              <label>
                <input
                  type="radio"
                  name="hue-update-mode"
                  checked={hueUpdateMode === 'change'}
                  onChange={() => setHueUpdateMode('change')}
                />
                On Change (on release)
              </label>
            </div>
          </div>
        </div>
        
        <div className="demo-section">
          <h2>Clock Hour</h2>
          
          <CyclicSlider
            min={0}
            max={12}
            step={1}
            value={hour}
            label="Hour Selector (12-hour clock)"
            onChange={hourUpdateMode === 'change' ? setHour : undefined}
            onInput={hourUpdateMode === 'input' ? setHour : undefined}
            unit="hr"
          />
          
          <div className="demo-visualization">
            <div className="clock-display">
              <div className="clock-face">
                {/* Hour numbers */}
                {hourPositions.map(({ hour, style }) => (
                  <div key={hour} className="hour-number" style={style}>
                    {hour}
                  </div>
                ))}
                
                {/* Hour hand */}
                <div className="hour-hand" style={hourHandStyle}></div>
                
                {/* Center dot */}
                <div className="clock-center"></div>
              </div>
              <div className="hour-value">{formatHour(hour)} o'clock</div>
            </div>
          </div>
          
          <div className="update-mode">
            <p>Update mode:</p>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="hour-update-mode"
                  checked={hourUpdateMode === 'input'}
                  onChange={() => setHourUpdateMode('input')}
                />
                On Input (continuous)
              </label>
              <label>
                <input
                  type="radio"
                  name="hour-update-mode"
                  checked={hourUpdateMode === 'change'}
                  onChange={() => setHourUpdateMode('change')}
                />
                On Change (on release)
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <footer>
        <p>A cyclic slider component for React that wraps values at min/max boundaries</p>
        <p>
          <a 
            href="https://github.com/tombigel/react-cyclic-slider" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
          {' | '}
          <a 
            href="https://www.npmjs.com/package/react-cyclic-slider" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            View on npm
          </a>
        </p>
        <p>
          <a 
            href={`${getPublicUrl()}/static/LICENSE.txt`}
            target="_blank" 
            rel="noopener noreferrer"
          >
            MIT License
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App; 