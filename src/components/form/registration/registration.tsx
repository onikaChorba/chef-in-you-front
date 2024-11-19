import React from "react";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { fetchRegister } from "../../../redux/slices/auth";
import { Input } from "../../input/input";
import { Popup } from "../../popup/popup";
import { Button } from "../../button/button";

interface IRegistration {
  setShowRegForm: (showRegForm: boolean) => void;
}
export const Registration: React.FC<IRegistration> = ({ setShowRegForm }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, formState: { errors } } = useForm({
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
    <Popup title="Sing up" isOpen={true} onClose={() => setShowRegForm(false)}>
      <form onSubmit={handleSubmit(onSubmit)} className="form-block">
        <Input placeholder="full name" {...register('fullName', { required: 'Write full name' })} type="text" />
        {errors.fullName?.message}
        <Input placeholder="email" {...register('email', { required: 'Write email' })} type="email" />
        {errors.email?.message}
        <Input placeholder="password" {...register('password', { required: 'Write password please' })} />
        {errors.password?.message}
        <Button text="Sing Up" textStyle="poppins-bold" />
      </form>
    </Popup>
  )
}