import React, { FC } from 'react';
import Link from 'next/link';
import ButtonSocialMedia from '../Login/ButtonSocialMedia';
import ButtonSubmit from '../Login/ButtonSubmit';
import Input from '../Login/Input';
import { AuthEnum } from '@/src/const/auth.enum';

export interface AuthFormProps {
    type: AuthEnum;
    email: string;
    password: string;
    fullName?: string;
    onSubmit: (e: any) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setFullName?: (fullName: string) => void;
    handleGoogleLogin?: () => void;
    handleFacebookLogin?: () => void;
}

const AuthForm: FC<AuthFormProps> = ({
    type,
    email,
    password,
    fullName,
    onSubmit,
    setEmail,
    setPassword,
    setFullName,
    handleGoogleLogin,
    handleFacebookLogin,
}) => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-96 p-6 bg-white rounded shadow">
                <h1 className="text-2xl font-semibold mb-4 text-center">{type}</h1>

                <form onSubmit={onSubmit}>
                    {type === AuthEnum.Register && (
                        <Input label="Full Name" content={fullName} setContent={setFullName ? setFullName : () => {}} />
                    )}
                    <Input label="Email" content={email} setContent={setEmail} />
                    <Input label="Password" content={password} setContent={setPassword} />
                    {type === AuthEnum.Login ? (
                        <>
                            <p className="mt-4 text-sm mb-4 text-center">or login with</p>
                            <div className="flex gap-4 mb-6">
                                {/* <ButtonSocialMedia
                                    className="bg-red-600 hover:bg-red-700"
                                    //  onClick={handleGoogleLogin}
                                >
                                    Google
                                </ButtonSocialMedia> */}
                                <ButtonSocialMedia
                                    className="bg-blue-800 hover:bg-blue-900"
                                    // onClick={handleFacebookLogin}
                                >
                                    Facebook
                                </ButtonSocialMedia>
                            </div>
                            <ButtonSubmit> Login</ButtonSubmit>
                        </>
                    ) : (
                        <ButtonSubmit>Register</ButtonSubmit>
                    )}
                </form>
                <p className="mt-4 text-sm text-center">
                    {type === AuthEnum.Login ? 'Do not have an account?' : 'Already have an account?'}
                    <Link
                        href={type === AuthEnum.Login ? `/register` : `/login`}
                        className="text-blue-500 hover:underline"
                    >
                        {type === AuthEnum.Login ? `Register` : `Login`}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
