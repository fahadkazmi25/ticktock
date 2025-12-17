'use client';

import React, { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

export const Header: React.FC = () => {
    const { data: session } = useSession();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSignOut = () => {
        signOut({ callbackUrl: '/login' });
    };

    return (
        <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
                {/* Left side - Logo and Navigation */}
                <div className="flex items-center gap-8">
                    <h1 className="text-xl font-bold text-gray-900">ticktock</h1>
                    <nav className="hidden md:block">
                        <a href="/timesheets" className="text-sm text-gray-700 hover:text-gray-900">
                            Timesheets
                        </a>
                    </nav>
                </div>

                {/* Right side - User Menu */}
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
                    >
                        <span>{session?.user?.name || 'User'}</span>
                        <svg
                            className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                            <div className="px-4 py-2 border-b border-gray-100">
                                <p className="text-sm font-medium text-gray-900">{session?.user?.name}</p>
                                <p className="text-xs text-gray-500">{session?.user?.email}</p>
                            </div>
                            <button
                                onClick={handleSignOut}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
