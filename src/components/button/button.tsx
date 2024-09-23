import React from "react"
import './button.scss'
export const Button = ({ text, onClick, className }) => {
  return (
    <button onClick={onClick} className={`button poppins-medium ${className}`}>
      {text}
    </button>
  )
}