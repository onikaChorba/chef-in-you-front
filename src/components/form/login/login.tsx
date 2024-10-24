import React from "react";
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { fetchLogin, selectIsAuth } from "../../../redux/slices/auth";
import { Input } from "../../input/input";

export const Login = () => {

  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="login" {...register('email', { required: 'Write email please' })} type="email" />{errors.email?.message}
      <Input placeholder="password" {...register('password', { required: 'Write password please' })} type="string" />{errors.password?.message}
      <button className='button' type='submit'>
        Login In
      </button>
    </form>
  )
}