import React from 'react';
import { LoginForm } from '@/components/auth/LoginForm';
import { BrandPanel } from '@/components/auth/BrandPanel';

export default function LoginPage() {
    return (
        <div className="flex min-h-screen">
            <div className="flex flex-1 items-center justify-center bg-white">
                <LoginForm />
            </div>
            <BrandPanel />
        </div>
    );
}
