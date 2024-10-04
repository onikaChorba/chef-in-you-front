import React, { forwardRef } from 'react';
import styles from './input.module.scss';

interface IInput {
  value?: string;
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, IInput>(
  ({ value, label, name, type = 'text', placeholder, onChange }, ref) => {
    return (
      <div className={styles['input-container']}>
        {label && <label htmlFor={name} className='poppins-bold'>{label}</label>}
        <input
          ref={ref}
          value={value}
          type={type}
          id={name}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    );
  }
);