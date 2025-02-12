import React from "react";
import styles from './checkbox.module.scss';

interface ICheckbox {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  checkedImage: string;
  uncheckedImage: string;
  label?: string;
}

export const Checkbox: React.FC<ICheckbox> = ({ checked = false, onChange, checkedImage, uncheckedImage, label }) => {
  return (
    <label className={styles.checkbox__label}>
      <div
        onClick={() => onChange && onChange(!checked)}
      >
        <img
          width={20}
          src={checked ? checkedImage : uncheckedImage}
          alt={checked ? "Checked" : "Unchecked"}
        />
      </div>
      {label && <p className='text'>{label}</p>}
    </label>
  );
};
;
