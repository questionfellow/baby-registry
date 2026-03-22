import React from 'react';
import { Baby, Calendar, MapPin, Phone } from 'lucide-react';
import type { Registry } from '../types';

interface HeaderProps {
    registry: Registry;
}

export const Header: React.FC<HeaderProps> = ({ registry }) => {
    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            // Format to "21 Mar 2026"
            return new Intl.DateTimeFormat('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            }).format(date);
        } catch (e) {
            return dateString;
        }
    };

    return (
        <header className="pt-16 pb-12 text-center animate-fade-in">
            <div className="flex justify-center mb-6">
                <div className="bg-white p-4 rounded-full shadow-md border border-indigo-50">
                    <Baby className="w-10 h-10 text-indigo-500" />
                </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-2 tracking-tight">
                {registry.babyName}'s Registry
            </h1>
            <div className="flex items-center justify-center gap-2 text-indigo-600 font-medium mb-6">
                <Calendar className="w-4 h-4" />
                <span>Date of Birth: {formatDate(registry.dueDate)}</span>
            </div>

            <p className="max-w-2xl mx-auto text-slate-600 text-lg leading-relaxed px-4 mb-10">
                {registry.welcomeMessage}
            </p>

            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
                <div className="glass-card p-4 flex items-start gap-4 text-left">
                    <div className="bg-indigo-50 p-2 rounded-xl mt-1">
                        <MapPin className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1">Shipping Address</h4>
                        <p className="text-sm text-slate-600 leading-snug">
                            {registry.shippingAddress}
                        </p>
                    </div>
                </div>
                <div className="glass-card p-4 flex items-start gap-4 text-left">
                    <div className="bg-emerald-50 p-2 rounded-xl mt-1">
                        <Phone className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-slate-900 mb-1">Contact Details</h4>
                        <p className="text-sm text-slate-600 leading-snug">
                            {registry.contactDetails}
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};
