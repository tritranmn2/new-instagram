import React, { FC, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastConfig } from '@/src/configs/toast.config';
import Input from './Input';
import ButtonSubmit from './ButtonSubmit';
import ButtonSocialMedia from './ButtonSocialMedia';
import { useRouter } from 'next/router';
import { AuthEnum } from '@/src/const/auth.enum';
import AuthForm from '../AuthForm';
import { ToastMessage } from '@/src/const/toast.enum';

const Login: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const router = useRouter();
    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                username: email,
                password,
            });

            console.log(response.data);
            // In a real application, you may handle the response from the API accordingly
            if (response.status === 200) {
                toast.success(ToastMessage.LoginSuccessful, {
                    ...toastConfig,
                    onClose: () => {
                        router.push('/');
                    },
                });
            } else {
                toast.error(ToastMessage.WrongCredentials, toastConfig);
            }
        } catch (error) {
            toast.error(ToastMessage.WrongCode, toastConfig);
        }
    };

    const handleGoogleLogin = () => {
        console.log('Login with Google');
    };

    const handleFacebookLogin = async () => {
        console.log('Login with Facebook');
        try {
            window.open(
                'http://localhost:3000/auth/facebook/login',
                '',
                'popup=yes,width=800,height=600,left=100,top=100',
            );

            // const response = await axios.get('http://localhost:3000/auth/facebook/login');
            // // window.location.href = response.data.url;
            // console.log(response);
            // console.log(response.data);
            // // In a real application, you may handle the response from the API accordingly
            // if (response.status === 200) {
            //     toast.success(ToastMessage.LoginSuccessful, {
            //         ...toastConfig,
            //         onClose: () => {
            //             router.push('/');
            //         },
            //     });
            // } else {
            //     toast.error(ToastMessage.WrongCredentials, toastConfig);
            // }
        } catch (error) {
            toast.error(ToastMessage.WrongCode, toastConfig);
            console.log(error);
        }
    };

    return (
        <AuthForm
            type={AuthEnum.Login}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={handleLogin}
            handleFacebookLogin={handleFacebookLogin}
            handleGoogleLogin={handleGoogleLogin}
        />
    );
};

export default Login;
