import React, { FC } from 'react';
import lodash from 'lodash';
export interface InputType {}
export interface InputProps {
    label: string;
    content?: string;
    setContent: (content: string) => void;
}

const Input: FC<InputProps> = ({ label, content, setContent }) => {
    const id = lodash.camelCase(label);
    let type = lodash.toLower(label);
    type = type === 'email' || type === 'password' ? type : 'text';
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                placeholder={`Enter ${lodash.toLower(label)}...`}
                type={type}
                id={id}
                className="mt-1 p-2 w-full border rounded-md"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
        </div>
    );
};

export default Input;
