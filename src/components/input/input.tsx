import React, { forwardRef } from 'react';
import styles from './input.module.scss';

interface IInput {
  value?: string;
  label?: string;
  name: string;
  type?: string;
  icon?: string;
  id: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, IInput>(
  ({ value, label, name, type = 'text', placeholder, onChange, icon, id }, ref) => {
    return (
      <div className={styles['input']}>
        {label && (
          <label htmlFor={name} className={styles['input__label']}>
            {label}
          </label>
        )}
        <div className={styles['input__wrapper']}>
          {icon && (
            <img
              src={icon}
              alt={`${name}-icon`}
              className={styles['input__icon']}
            />
          )}
          <input
            ref={ref}
            value={value}
            type={type}
            id={id}
            placeholder={placeholder}
            onChange={onChange}
            className={styles['input__field']}
          />
        </div>
      </div>
    );
  }
);
