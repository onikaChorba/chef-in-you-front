import React from "react";
import axios from "axios";
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import styles from '../form.module.scss';
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { fetchRegister } from "../../../redux/slices/auth";
import { RegisterParams } from "../../../types";
import { Input } from "../../input/input";
import { Button } from "../../button/button";
import signupImg from '../../../assets/imgs/singUp.jpeg';
import userIcon from '../../../assets/icons/user-for-input.svg';
import email from '../../../assets/icons/email.svg';
import password from '../../../assets/icons/password.svg';
import { Popup } from "../../popup/popup";
interface IRegistration {
  showRegForm: boolean;
  setShowRegForm: (showRegForm: boolean) => void;
}

export const Registration: React.FC<IRegistration> = ({
  showRegForm,
  setShowRegForm
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fullName: "test112233",
      email: "test112233@gmail.com",
      password: "mfmdsnmn",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: RegisterParams) => {
    const payload = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    };
    console.log('Payload:', payload);
    await dispatch(fetchRegister(payload));
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      if (credentialResponse.credential) {
        const token = credentialResponse.credential;

        const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userInfo = userInfoResponse.data;

        console.log('Google User Info:', userInfo);

      } else {
        console.error('Google login failed: no credential received');
      }
    } catch (error) {
      console.error('Error during Google login:', error);
    }
  };

  return (
    <Popup isOpen={showRegForm} onClose={() => setShowRegForm(false)}>
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
                type="submit"
                text="Sign Up"
                textStyle="poppins-bold"
                className={styles['form__button']}
              />
            </form>
            <div className={styles['form__google']}>
              <p className={`${styles['form__subtitle']} poppins-bold`}>
                Or Sign Up with Google
              </p>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.error('Google login failed')}
              />
            </div>

          </div>
        </div>
      </div>
    </Popup>
  );
};
