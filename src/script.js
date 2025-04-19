import React from "https://esm.sh/react@18.2.0";
import ReactDOM from "https://esm.sh/react-dom@18.2.0";

// Demo App,
// skip to CyclicSlider component for the real content
const App = () => {
  const [angle, setAngle] = React.useState(0);
  return (
    <div>
      <h1>React Cyclic Angle Slider</h1>
      <label for="input">Data Angle in parent</label>
      <input
        type="number"
        min="0"
        max="360"
        step="1"
        value={angle}
        onInput={(event) => {
          setAngle(event.target.valueAsNumber);
        }}
      />
      <hr />
      <CyclicSlider
        min={0}
        max={360}
        step={1}
        value={angle}
        label="Angle"
        onChange={setAngle}
      />
    </div>
  );
};

// CyclicSlider, a react slider that acts as if it is in a circle
// Good for angle sliders
const CyclicSlider = ({
  value: dataValue,
  onChange,
  onInput,
  label,
  min,
  max,
  step
}) => {
  const [value, setValue] = React.useState(dataValue);

  // If top level data is changed elsewhere, update local state
  React.useEffect(() => {
    if (dataValue !== value) {
      setValue(dataValue);
    }
  }, [dataValue]);

  // Set local state
  const handleValueChange = React.useCallback(
    (event) => {
      const newValue = event.target.valueAsNumber % 360;
      setValue(newValue);
      // If set to update on every change, update (onInput)
      onInput && onInput(newValue);
    },
    [onInput]
  );

  // Update outer comp if onChange is set (on mouse up)
  const updateDataOnMouseUp = React.useCallback(
    (event) => {
      onChange && onChange(value);
    },
    [onChange, value]
  );

  // The magic:
  const cyclicHandler = React.useCallback(
    (event) => {
      // Don't do native
      event.preventDefault();

      const {
        target,
        nativeEvent: { offsetX },
        pointerId
      } = event;
      const { offsetWidth } = target;

      // Set initial value on mouse down (TODO: not accurate at the edges)
      setValue(Math.round((offsetX / offsetWidth) * (max - min)));

      // Update value on X axis changes, normalize to min and max bounds
      const onPointerMove = (e) => {
        const newValue = Math.round(
          ((e.offsetX % offsetWidth) / offsetWidth) * (max - min)
        );
        const normalizedValue =
          newValue < min ? max + (newValue % max) : newValue;
        setValue(normalizedValue);
        // If set to update on every change, update (onInput)
        onInput && onInput(normalizedValue);
      };

      // Handle mouse and pointer events internally
      target.setPointerCapture(pointerId);
      target.addEventListener("pointermove", onPointerMove);
      target.addEventListener("pointerup", () => {
        target.removeEventListener("pointermove", onPointerMove);
      }, {once: true});
    },
    [min, max]
  );

  return (
    <>
      <label for="input">{label}</label>
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
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onInput={handleValueChange}
        onChange={updateDataOnMouseUp}
      />
    </>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
