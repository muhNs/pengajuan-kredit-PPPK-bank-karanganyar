import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// IMPORT LAYOUT
import MainLayout from './components/layout/MainLayout';

// IMPORT HALAMAN PUBLIK
import LandingPage from './pages/LandingPage/index';
import FormPengajuan from './pages/Pengajuan/pages/FormPengajuan';

export const router = createBrowserRouter([
    {
        // 1. RUTE PUBLIK
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <LandingPage /> },
            { path: 'pengajuan', element: <FormPengajuan /> },
        ],
    },
]);


