import React from 'react';
import PropTypes from 'prop-types';

export default function Controls(props) {
  return (
    <div className="controls">
      <button id="clear" onClick={props.onClear}>
        Clear
      </button>
      <button id="save" onClick={props.onSave}>
        Save
      </button>
      <button id="redo">Redo</button>
    </div>
  );
}

Controls.propTypes = {
  onClear: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
