import React from "react";
import styles from '../form.module.scss';
import { useForm } from 'react-hook-form';
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import { fetchLogin, selectIsAuth } from "../../../../redux/slices/auth";
import { Input } from "../../../input/input";
import { Button } from "../../../button/button";
import { Popup } from "../../../popup/popup";
import Images from "../../../../images";
interface ILogin {
  showLoginForm: boolean;
  setShowLoginForm: (showLoginForm: boolean) => void;
}

export const Login: React.FC<ILogin> = ({
  showLoginForm,
  setShowLoginForm
}) => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "onika164604@gmail.com",
      password: "11111"
    },
    mode: "onChange"
  });

  const onSubmit = async (values: { email: string; password: string }) => {
    const data = await dispatch(fetchLogin(values));
    if (!data.payload) {
      alert('Error login')
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />
  };

  return (
    <Popup isOpen={showLoginForm} onClose={() => setShowLoginForm(false)} size="standard">
      <h2 className={`poppins-extrabold`}>Login</h2>
      <div className={styles.formContainer}>
        <div className={styles.formContent}>
          <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form} form-block`} >
            <Input placeholder="login" {...register('email', { required: 'Write email please' })} type="email" icon={Images.email.default} id="emailLoginIn" />{errors.email?.message}
            <Input placeholder="password" {...register('password', { required: 'Write password please' })} type="string" icon={Images.password.default} id="passwordLoginIn" />{errors.password?.message}
            <Button text="Login In" textStyle="poppins-bold" />
          </form>
          <div className={styles.formImage}>
            <img src={Images.junkfood} alt="food" />
          </div>
        </div>
      </div>
    </Popup>
  )
}