import React, { useEffect, useRef } from "react";
import styles from "./popup.module.scss";
import { Button } from "../button/button";

interface IPopup {
  title: string;
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export const Popup: React.FC<IPopup> = ({ title, isOpen = false, onClose, children }) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (
        modalContentRef.current &&
        target &&
        !modalContentRef.current.contains(target) &&
        !target.closest('.popup__content')
      ) {
        onClose && onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalContentRef, onClose]);


  return (
    <>
      {
        isOpen && <div className={styles.popup}>
          <div className={styles.popup__content} ref={modalContentRef}>
            <h2 className={`${styles.popup__title} poppins-bold`}>{title}</h2>
            {children}
            <Button className={`${styles.popup__button} button-primary`} onClick={onClose} text="Close" textStyle="poppins-semibold" />
          </div>
        </div>
      }
    </>
  );
};
