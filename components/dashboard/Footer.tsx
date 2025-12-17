import React from 'react';

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className=" max-w-7xl mx-auto bg-white mt-10 border-gray-200 border px-6 py-6 rounded-lg shadow-md ">
            <div className="text-center">
                <p className="text-sm text-gray-600">
                    © {currentYear} tentwenty. All rights reserved.
                </p>
            </div>
        </footer>
    );
};
