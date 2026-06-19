import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <ForgotPasswordForm />
            </div>
        </div>
    );
}