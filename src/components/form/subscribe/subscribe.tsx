import React from "react"
import styles from '../form.module.scss';
import { Popup } from "../../popup/popup"
import { Input } from "../../input/input"
import { Button } from "../../button/button"
import Images from "../../../images";

export const Subscribe = ({
  setShowSubscribeForm,
  showSubscribeForm,
}: {
  setShowSubscribeForm: (showSubscribeForm: boolean) => void;
  showSubscribeForm: boolean;
}) => {
  return (
    <Popup isOpen={showSubscribeForm} onClose={() => setShowSubscribeForm(false)} >
      <div className={styles['form__signup']}>
        <div className={styles['form__signup-image']}>
          <img src={Images.subscribe} alt="recipe" />
        </div>
        <form className={`${styles['form__signup-form']} form-block`}>
          <h2 className={`poppins-extrabold ${styles['form__title']}`} > Subscribe to our newsletter!</h2>
          <Input placeholder="Enter Your Email" type="email" name="login" icon={Images.email.default} id="emailToSubscribe" />
          <Button text="Subscribe" textStyle="poppins-bold" />
          <p className={`${styles['form__text']} text`}> We value your privacy and will never send irrelevant information</p>
        </form>
      </div>
    </Popup>
  )
}