import React from "react";
import styles from './checkbox.module.scss'

export const Checkbox = ({ checked = false, onChange, checkedImage, uncheckedImage, label }: any) => {
  return (
    <label className={styles.checkbox__label}>
      <div
        onClick={() => onChange(!checked)}
      >
        <img
          width={20}
          src={checked ? checkedImage : uncheckedImage}
          alt={checked ? "Checked" : "Unchecked"}
          className="w-full h-full object-contain"
        />
      </div>
      {label && <p className='text'>{label}</p>}
    </label>
  );
};
;
