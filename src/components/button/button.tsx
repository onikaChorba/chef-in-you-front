import React from "react"
import styles from './button.module.scss'

interface IButton {
  text: string;
  onClick?: () => void;
  className?: string;
  textStyle: string;
  buttonStyle?: string;
  type?: string;
}

export const Button: React.FC<IButton> = ({ text, onClick, className, textStyle, buttonStyle = "button-primary" }, type) => {
  return (
    <button onClick={onClick} className={`${styles.button} ${textStyle} ${className} ${styles[buttonStyle]}`} type={type}>
      {text}
    </button>
  )
}