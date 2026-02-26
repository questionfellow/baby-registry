import React, { useState, useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Heart } from 'lucide-react';
import type { Gift } from '../types';

interface GiftModalProps {
    gift: Gift | null;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { name: string }) => void;
}

export const GiftModal: React.FC<GiftModalProps> = ({
    gift,
    isOpen,
    onClose,
    onSubmit
}) => {
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isOpen) {
            setName('');
            setError(null);
        }
    }, [isOpen]);

    if (!isOpen || !gift) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!name.trim()) {
            setError('Please enter your name.');
            return;
        }

        onSubmit({ name });
    };

    const isBlessing = gift.isBlessing;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
            <div
                className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className={`${isBlessing ? 'bg-rose-50' : 'bg-indigo-50'} p-3 rounded-2xl`}>
                            {isBlessing ? (
                                <Heart className="w-6 h-6 text-rose-500 fill-current" />
                            ) : (
                                <GiftIcon className="w-6 h-6 text-indigo-500" />
                            )}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                {isBlessing ? 'Send Blessings' : 'Mark as Gifted'}
                            </h2>
                            <p className="text-sm text-slate-500 truncate max-w-[240px]">
                                {isBlessing ? 'Add your name to the blessing wall' : "Confirm you've ordered this!"}
                            </p>
                        </div>
                    </div>

                    <div className={`${isBlessing ? 'bg-rose-50/30' : 'bg-slate-50'} rounded-2xl p-4 mb-6 border ${isBlessing ? 'border-rose-100' : 'border-slate-100'}`}>
                        <h4 className={`text-sm font-bold ${isBlessing ? 'text-rose-900' : 'text-slate-700'} mb-1`}>{gift.title}</h4>
                        <p className={`text-xs ${isBlessing ? 'text-rose-600' : 'text-slate-500'}`}>
                            {isBlessing
                                ? 'Your love and support mean everything. Multiple people can sign this!'
                                : "By marking this as gifted, you're letting others know this item is already taken."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">
                                Your Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={isBlessing ? "Your name for the blessing wall..." : "Who is this lovely gift from?"}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 text-sm rounded-xl">
                                <AlertCircle className="w-4 h-4" />
                                <span>{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            className={`${isBlessing ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-200' : 'btn-primary'} w-full py-4 rounded-full text-white font-bold text-lg mt-2 flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]`}
                        >
                            {isBlessing ? (
                                <Heart className="w-5 h-5 fill-current" />
                            ) : (
                                <CheckCircle className="w-5 h-5" />
                            )}
                            <span>{isBlessing ? 'Send My Blessings' : 'Confirm Reservation'}</span>
                        </button>
                        <p className="text-[10px] text-center text-slate-400 mt-4 px-6 italic">
                            {isBlessing
                                ? "This is a non-monetary gift of love."
                                : "Use the address details in the header to ship directly to the parents."}
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

const GiftIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="20 12 20 22 4 22 4 12"></polyline>
        <rect x="2" y="7" width="20" height="5"></rect>
        <line x1="12" y1="22" x2="12" y2="7"></line>
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
    </svg>
);
