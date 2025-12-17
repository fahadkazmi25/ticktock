import React from 'react';

interface SelectProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder?: string;
    className?: string;
}

export const Select: React.FC<SelectProps> = ({
    value,
    onChange,
    options,
    placeholder = 'Select...',
    className = '',
}) => {
    return (
        <div className="relative inline-block ">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`
      px-4 py-2 pr-10
      border border-gray-300
      rounded-md bg-white
      text-sm text-gray-700
      appearance-none
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      cursor-pointer
      w-full
      ${className}
    `}
            >
                {/* <option value="">{placeholder}</option> */}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {/* Custom Arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                    className="
        h-4 w-4 text-gray-500
        transition-transform duration-200 ease-in-out
        group-focus-within:rotate-180
      "
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </div>

    );
};
