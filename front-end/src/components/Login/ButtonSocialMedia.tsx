import React, { FC } from 'react';

export interface ButtonSocialMediaProps {
    className: string;
    children: string;
    onClick?: () => void;
}

// const ButtonSocialMedia: FC<ButtonSocialMediaProps> = ({ children, onClick, className }) => {
//     return (
//         <button type="button" className={`flex-1 text-white p-2 rounded-md ${className}`} onClick={onClick}>
//             {children}
//         </button>
//     );
// };
const ButtonSocialMedia: FC<ButtonSocialMediaProps> = ({ children, className }) => {
    return (
        <a
            href="http://localhost:3000/auth/facebook/login"
            className={`flex-1 text-center text-white p-2 rounded-md ${className}`}
        >
            {children}
        </a>
    );
};

export default ButtonSocialMedia;
