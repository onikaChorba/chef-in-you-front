import React from 'react';
import './input.scss';

export const Input = ({ label, name, type, placeholder }) => {
  return (
    <div className="input-container">
      <label htmlFor={name} className='poppins-bold'>{label}</label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
      />
    </div>

  )
}
