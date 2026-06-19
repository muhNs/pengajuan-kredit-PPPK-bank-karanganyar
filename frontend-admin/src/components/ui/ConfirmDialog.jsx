import React from 'react';
import Modal from './Modal';

/**
 * Confirmation Dialog for destructive actions
 * Props:
 *  - isOpen: boolean
 *  - onClose: () => void
 *  - onConfirm: () => void
 *  - title?: string
 *  - message?: string
 *  - confirmLabel?: string
 *  - isDestructive?: boolean
 */
export default function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title = 'Konfirmasi Hapus',
    message = 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.',
    confirmLabel = 'Ya, Hapus',
    isDestructive = true,
}) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size="sm"
            footer={
                <>
                    <button
                        onClick={onClose}
                        className="px-5 py-2 text-sm font-bold border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-all"
                    >
                        Batal
                    </button>
                    <button
                        onClick={() => { onConfirm(); onClose(); }}
                        className={`px-5 py-2 text-sm font-bold rounded-lg transition-all shadow-sm ${
                            isDestructive
                                ? 'bg-red-600 hover:bg-red-700 text-white'
                                : 'bg-[#152042] hover:bg-[#0B1171] text-white'
                        }`}
                    >
                        {confirmLabel}
                    </button>
                </>
            }
        >
            <div className="flex flex-col items-center gap-4 py-3 text-center">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${isDestructive ? 'bg-red-50' : 'bg-yellow-50'}`}>
                    {isDestructive ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#dc2626" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#FFC800" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"/>
                        </svg>
                    )}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed max-w-xs">{message}</p>
            </div>
        </Modal>
    );
}
