import React from 'react';
import LoginForm from '../components/LoginForm';
import LoginBackground from '../components/LoginBackground';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E2937] to-[#152042] flex items-center justify-center p-4 relative overflow-hidden">
            <LoginBackground />
            
            <div className="w-full max-w-md relative z-10 animate-fade-in-up">
                <LoginForm />
            </div>
        </div>
    );
}