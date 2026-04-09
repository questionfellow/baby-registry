import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import type { Gift } from '../types';

interface BuyNowModalProps {
    gift: Gift | null;
    isOpen: boolean;
    onClose: () => void;
}

export const BuyNowModal: React.FC<BuyNowModalProps> = ({ gift, isOpen, onClose }) => {
    if (!isOpen || !gift) return null;

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
                        <div className="bg-indigo-50 p-3 rounded-2xl">
                            <ExternalLink className="w-6 h-6 text-indigo-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Buy Now</h2>
                            <p className="text-sm text-slate-500">You're about to leave this page</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-100">
                        <h4 className="text-sm font-bold text-slate-700 mb-1">{gift.title}</h4>
                        <p className="text-xs text-slate-500">
                            Please come back to this registry website and mark the item as gifted if you do end up gifting this item.
                        </p>
                    </div>

                    <a
                        href={gift.productUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="btn-primary w-full py-4 rounded-full text-white font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]"
                    >
                        <ExternalLink className="w-5 h-5" />
                        <span>Show website</span>
                    </a>
                    <p className="text-[10px] text-center text-slate-400 mt-4 px-6 italic">
                        Remember to mark as gifted when you're back!
                    </p>
                </div>
            </div>
        </div>
    );
};
