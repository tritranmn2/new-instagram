import React, { FC, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastConfig } from '@/src/configs/toast.config';
import { useRouter } from 'next/router';
import AuthForm from '../AuthForm';
import { AuthEnum } from '@/src/const/auth.enum';
import { ToastMessage } from '@/src/const/toast.enum';

const Register: FC = () => {
    const [fullName, setFullName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const handleRegister = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/register', {
                username: email,
                fullName,
                password,
            });
            // console.log(fullName);
            console.log(response.data);
            toast.success(ToastMessage.RegisterSuccessful, {
                ...toastConfig,
                onClose: () => {
                    router.push('/login');
                },
            });
        } catch (error) {
            toast.error(ToastMessage.WrongCode, toastConfig);
            console.log(error);
        }
    };

    return (
        <AuthForm
            type={AuthEnum.Register}
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={handleRegister}
        />
    );
};

export default Register;
