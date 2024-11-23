import React from "react";
import styles from '../form.module.scss';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { fetchRegister } from "../../../redux/slices/auth";
import { Input } from "../../input/input";
import { Popup } from "../../popup/popup";
import { Button } from "../../button/button";
import signupImg from '../../../assets/imgs/singUp.jpeg';

interface IRegistration {
  setShowRegForm: (showRegForm: boolean) => void;
}

export const Registration: React.FC<IRegistration> = ({ setShowRegForm }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: "Test Text",
      email: "test@gmail.com",
      password: "tests",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: { fullName: string, email: string; password: string }) => {
    await dispatch(fetchRegister(values));
  };

  return (
    <Popup isOpen={true} onClose={() => setShowRegForm(false)} size="large">
      <div className={styles['form__signup']}>
        <div className={styles['form__signup-image']}>
          <img src={signupImg} alt="Sign up" />
        </div>
        <div className={styles['form__signup-form']}>
          <h2 className={`${styles['form__title']} poppins-bold`}>Want to join our Family</h2>
          <form onSubmit={handleSubmit(onSubmit)} className={styles['form__block']}>
            <Input
              placeholder="Full name"
              {...register('fullName', { required: 'Write full name' })}
              type="text"
            />
            {errors.fullName?.message && (
              <p className={styles['form__error']}>{errors.fullName.message}</p>
            )}
            <Input
              placeholder="Email"
              {...register('email', { required: 'Write email' })}
              type="email"
            />
            {errors.email?.message && (
              <p className={styles['form__error']}>{errors.email.message}</p>
            )}
            <Input
              placeholder="Password"
              {...register('password', { required: 'Write password please' })}
            />
            {errors.password?.message && (
              <p className={styles['form__error']}>{errors.password.message}</p>
            )}
            <Button
              text="Sign Up"
              textStyle="poppins-bold"
              className={styles['form__button']}
            />
          </form>
        </div>
      </div>
    </Popup>
  );
};
