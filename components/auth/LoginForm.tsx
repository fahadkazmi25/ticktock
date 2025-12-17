'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { Input } from './Input';
import { Button } from './Button';
import { Checkbox } from './Checkbox';

export const LoginForm: React.FC = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });

            if (result?.error) {
                toast.error('Invalid email or password');
            } else {
                toast.success('Login successful!');
                router.push('/timesheets');
                router.refresh();
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl px-10 py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Welcome back</h1>

            <form onSubmit={handleSubmit}>
                <Input
                    label="Email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                />

                <Checkbox
                    label="Remember me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    id="remember"
                />

                <Button type="submit">
                    {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
            </form>
        </div>
    );
};
