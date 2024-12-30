import React from "react";
import styles from '../form.module.scss';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { fetchRegister } from "../../../redux/slices/auth";
import { Input } from "../../input/input";
import { Button } from "../../button/button";
import signupImg from '../../../assets/imgs/singUp.jpeg';
import userIcon from '../../../assets/icons/user-for-input.svg';
import email from '../../../assets/icons/email.svg';
import password from '../../../assets/icons/password.svg';
interface IRegistration {
  setShowRegForm: (showRegForm: boolean) => void;
}

export const Registration: React.FC<IRegistration> = ({ setShowRegForm }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: { fullName: string, email: string; password: string }) => {
    await dispatch(fetchRegister(values));
  };

  return (
    <>
      <h2 className={`poppins-extrabold`}>Sing up</h2>
      <div className={styles.form}>
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
                icon={userIcon}
              />
              {errors.fullName?.message && (
                <p className={styles['form__error']}>{errors.fullName.message}</p>
              )}
              <Input
                placeholder="Email"
                {...register('email', { required: 'Write email' })}
                type="email"
                icon={email}
              />
              {errors.email?.message && (
                <p className={styles['form__error']}>{errors.email.message}</p>
              )}
              <Input
                placeholder="Password"
                {...register('password', { required: 'Write password please' })}
                icon={password}
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
      </div>
    </>
  );
};
