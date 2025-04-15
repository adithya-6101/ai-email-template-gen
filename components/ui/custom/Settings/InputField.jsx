import React from 'react'
import { Input } from '../../input';
function InputField({ label, value, onHandleInputChange }) {
  return (
    <div>
      <label>{label}</label>
      <Input
        value={value}
        onChange={(event) => onHandleInputChange(event.target.value)}
      />
    </div>
  );
}

export default InputField