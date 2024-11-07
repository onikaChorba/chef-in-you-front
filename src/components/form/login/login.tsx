import React from "react";
import { useForm } from 'react-hook-form';
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { fetchLogin, selectIsAuth } from "../../../redux/slices/auth";
import { Input } from "../../input/input";
import { Popup } from "../../popup/popup";
import { Button } from "../../button/button";

interface ILogin {
  setShowLoginForm: (showLoginForm: boolean) => void;
}
export const Login: React.FC<ILogin> = ({ setShowLoginForm }) => {
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
    <Popup title="Login In" isOpen={true} onClose={() => setShowLoginForm(false)}>
      <form onSubmit={handleSubmit(onSubmit)} className="form-block">
        <Input placeholder="login" {...register('email', { required: 'Write email please' })} type="email" />{errors.email?.message}
        <Input placeholder="password" {...register('password', { required: 'Write password please' })} type="string" />{errors.password?.message}
        <Button text="Login In" textStyle="poppins-bold" />
      </form>
    </Popup>
  )
}