import React from 'react';
import PropTypes from 'prop-types';

export default function Controls(props) {
  return (
    <div className="controls">
      <button id="clearBtn" onClick={props.onClear}>
        Clear
      </button>
      <button id="saveBtn" onClick={props.onSave}>
        Save
      </button>
      
      <label htmlFor="strokeWidthSlider">Brush Size</label>
      <input
        id="strokeWidthSlider"
        ref={props.strokeWidthSliderRef}
        className="slider"
        type="range"
        min="1"
        max="100"
        list="strokeWidthSliderMarkers"
        onChange={props.onStrokeWidthChange}
      />
      <datalist id="strokeWidthSliderMarkers">
        <option value="1" label="1" />
        <option value="25" label="25" />
        <option value="50" label="50" />
        <option value="75" label="75" />
        <option value="100" label="100" />
      </datalist>

      <label htmlFor="colorSlider">Brush Color</label>
      <input
        id="colorSlider"
        ref={props.colorSliderRef}
        className="slider"
        type="range"
        min="1"
        max="360"
        onChange={props.onColorChange}
      />

      <label htmlFor="crazyModeToggle">Crazy mode</label>
      <label className="switch">
        <input
          id="crazyModeToggle"
          type="checkbox"
          ref={props.crazyModeToggleRef}
          onChange={props.onCrazyModeChange}
        />
        <span className="toggle round"></span>
      </label>
    </div>
  );
}

Controls.propTypes = {
  onClear: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onStrokeWidthChange: PropTypes.func.isRequired,
  strokeWidthSliderRef: PropTypes.object.isRequired,
  crazyModeToggleRef: PropTypes.object.isRequired,
};
