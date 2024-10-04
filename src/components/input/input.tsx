import React from 'react';
import './input.scss';

export const Input = ({ value, label, name, type, placeholder, onChange }) => {
  return (
    <div className="input-container">
      <label htmlFor={name} className='poppins-bold'>{label}</label>
      <input
        value={value}
        type={type}
        id={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>

  )
}
