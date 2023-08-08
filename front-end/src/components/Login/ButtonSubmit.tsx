import React, { FC } from 'react';

export interface ButtonSubmitProps {
    children: JSX.Element | string;
}

const ButtonSubmit: FC<ButtonSubmitProps> = ({ children }) => {
    return (
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            {children}
        </button>
    );
};

export default ButtonSubmit;
