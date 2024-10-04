import React from "react";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../redux/store.ts";
import { fetchRegister, selectIsAuth } from "../../../redux/slices/auth.ts";
import { Input } from "../../input/input.tsx";

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: "Test Text",
      email: "test@gmail.com",
      password: "tests"
    },
    mode: "onChange"
  });

  const onSubmit = async (values: { fullName: string, email: string; password: string }) => {
    await dispatch(fetchRegister(values));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="full name" {...register('fullName', { required: 'Write full name' })} type="text" />
      {errors.fullName?.message}
      <Input placeholder="email" {...register('email', { required: 'Write email' })} type="email" />
      {errors.email?.message}
      <Input placeholder="password" {...register('password', { required: 'Write password please' })} />
      {errors.password?.message}
      <button className='button' type='submit'>
        Sing Up
      </button>
    </form>
  )
}