import React from "react";

function InputField({ name, placeholder, value, onChange, error }) {
  return (
    <div>
      <input
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <label>{name}</label>
      {error && <p>{error}</p>}
    </div>
  );
}

export default InputField;