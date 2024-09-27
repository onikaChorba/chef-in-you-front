import React from "react";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store.ts";
import { fetchLogin } from "../../../redux/slices/auth.ts";

export const Login = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: "onika164604@gmail.com",
      password: "11111"
    },
    mode: "onChange"
  });

  const onSubmit = (values: { email: string; password: string }) => {
    dispatch(fetchLogin(values));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="login" {...register('email', { required: 'Write email please' })} type="email" />{errors.email?.message}
      <input placeholder="password" {...register('password', { required: 'Write password please' })} />{errors.password?.message}
      <button className='button' type='submit'>
        Login In
      </button>
    </form>
  )
}