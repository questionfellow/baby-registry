import React from 'react';
import { ExternalLink, CheckCircle, Gift as GiftIcon, User, Heart } from 'lucide-react';
import type { Gift } from '../types';

interface GiftCardProps {
    gift: Gift;
    onMarkAsGifted: (gift: Gift) => void;
    onBuyNow: (gift: Gift) => void;
}

export const GiftCard: React.FC<GiftCardProps> = ({ gift, onMarkAsGifted, onBuyNow }) => {
    const isFullyGifted = gift.isGifted && !gift.isBlessing;

    return (
        <div className={`glass-card overflow-hidden h-full flex flex-col ${isFullyGifted ? 'opacity-80' : ''}`}>
            <div className="relative aspect-[4/3] overflow-hidden">
                <img
                    src={gift.imageUrl}
                    alt={gift.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${!isFullyGifted ? 'hover:scale-110' : 'grayscale-[20%]'}`}
                />
                {isFullyGifted && (
                    <div className="absolute inset-0 bg-indigo-900/40 backdrop-blur-[1px] flex items-center justify-center">
                        <div className="bg-white/95 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                            <span className="font-bold text-indigo-900">Received!</span>
                        </div>
                    </div>
                )}
                {gift.isBlessing && (
                    <div className="absolute top-4 right-4 animate-bounce">
                        <div className="bg-rose-500 text-white p-2 rounded-full shadow-lg">
                            <Heart className="w-5 h-5 fill-current" />
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-slate-800 mb-2 truncate" title={gift.title}>
                    {gift.title}
                </h3>

                <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                    {gift.description}
                </p>

                <div className="flex items-center justify-between mt-auto mb-6">
                    <div className="text-2xl font-bold text-indigo-600">
                        {gift.isBlessing ? (
                            <span className="text-rose-500 text-lg flex items-center gap-1">
                                <Heart className="w-4 h-4 fill-current" />
                                Pure Love
                            </span>
                        ) : (
                            `₹${gift.price.toLocaleString('en-IN')}`
                        )}
                    </div>
                    {gift.giftedBy && gift.giftedBy.length > 0 && (
                        <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full max-w-[150px]">
                            <User className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">
                                {gift.isBlessing
                                    ? `${gift.giftedBy.length} People Blessed`
                                    : `Gifted by ${gift.giftedBy[0]}`}
                            </span>
                        </div>
                    )}
                </div>

                <div className={`grid ${gift.isBlessing || !gift.productUrl ? 'grid-cols-1' : 'grid-cols-2'} gap-3`}>
                    {!gift.isBlessing && gift.productUrl && (
                        <button
                            onClick={() => !isFullyGifted && onBuyNow(gift)}
                            className={`btn-primary flex items-center justify-center gap-2 text-sm py-3 ${isFullyGifted ? 'bg-slate-200 text-slate-500 hover:bg-slate-200 border-none shadow-none pointer-events-none' : ''}`}
                        >
                            <ExternalLink className="w-4 h-4" />
                            <span>Buy Now</span>
                        </button>
                    )}
                    <button
                        onClick={() => onMarkAsGifted(gift)}
                        disabled={isFullyGifted}
                        className={`px-4 py-3 rounded-full font-medium text-sm transition-all duration-200 flex items-center justify-center gap-2
              ${isFullyGifted
                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                : gift.isBlessing
                                    ? 'bg-rose-50 text-rose-600 border border-rose-100 hover:bg-rose-100'
                                    : 'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300'}`}
                    >
                        {isFullyGifted ? (
                            <>
                                <CheckCircle className="w-4 h-4" />
                                <span>Gifted</span>
                            </>
                        ) : gift.isBlessing ? (
                            <>
                                <Heart className="w-4 h-4" />
                                <span>Send Blessings</span>
                            </>
                        ) : (
                            <>
                                <GiftIcon className="w-4 h-4" />
                                <span>Mark Gifted</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
