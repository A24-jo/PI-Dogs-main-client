import React from "react";

function SelectField({ options, onChange, error }) {
  return (
    <div>
      <select multiple onChange={onChange}>
        <option value="">temperament</option>
        {options.map((item, index) => (
          <option key={index} value={`${item.id},${item.name}`}>
            {item.name}
          </option>
        ))}
      </select>
      <br />
      {error && <p>Selecciona al menos un temperamento</p>}
      <label>temperaments</label>
    </div>
  );
}

export default SelectField;