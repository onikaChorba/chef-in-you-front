import React from "react"
import styles from './button.module.scss'

interface IButton {
  text: string;
  onClick?: () => void;
  className: string;
  textStyle: string;
}

export const Button: React.FC<IButton> = ({ text, onClick, className, textStyle }) => {
  return (
    <button onClick={onClick} className={`${styles.button} ${textStyle} ${styles[className]}`}>
      {text}
    </button>

  )
}