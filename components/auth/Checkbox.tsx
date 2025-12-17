import React from 'react';

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    id: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    label,
    checked,
    onChange,
    id,
}) => {
    return (
        <div className="flex items-center mb-6">
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={onChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor={id} className="ml-2 text-sm text-gray-700">
                {label}
            </label>
        </div>
    );
};
