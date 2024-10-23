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
      <div className={styles.input__container}>
        {label && <label htmlFor={name} className={styles.input__label}>{label}</label>}
        <input
          ref={ref}
          value={value}
          type={type}
          id={name}
          placeholder={placeholder}
          className={styles.input__input}
          onChange={onChange}
        />
      </div>
    );
  }
);
