import React from 'react';

interface InputProps {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    type,
    placeholder,
    value,
    onChange,
    id,
    error,
}) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-800 mb-2">
                {label}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${error ? 'border-red-500' : 'border-gray-300'
                    }`}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
};
