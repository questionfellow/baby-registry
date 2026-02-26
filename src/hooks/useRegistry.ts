import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { mockRegistry, mockGifts } from '../lib/mockData';
import type { Gift, Registry } from '../types';

export const useRegistry = () => {
    const [registry, setRegistry] = useState<Registry>(mockRegistry);
    const [gifts, setGifts] = useState<Gift[]>(mockGifts);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch Registry Info
                const { data: registryData, error: registryError } = await supabase
                    .from('registries')
                    .select('*')
                    .single();

                if (registryError && registryError.code !== 'PGRST116') {
                    throw registryError;
                }

                if (registryData) {
                    setRegistry({
                        babyName: registryData.baby_name,
                        dueDate: registryData.due_date,
                        welcomeMessage: registryData.welcome_message,
                        shippingAddress: registryData.shipping_address,
                        contactDetails: registryData.contact_details
                    });
                }

                // Fetch Gifts
                const { data: giftsData, error: giftsError } = await supabase
                    .from('gifts')
                    .select('*')
                    .order('created_at', { ascending: true });

                if (giftsError) throw giftsError;

                if (giftsData && giftsData.length > 0) {
                    const formattedGifts: Gift[] = giftsData.map(g => ({
                        id: g.id,
                        title: g.title,
                        price: g.price,
                        imageUrl: g.image_url,
                        productUrl: g.product_url,
                        isGifted: g.is_gifted,
                        giftedBy: Array.isArray(g.gifted_by) ? g.gifted_by : (g.gifted_by ? [g.gifted_by] : []),
                        isBlessing: g.is_blessing,
                        description: g.description
                    }));
                    setGifts(formattedGifts);
                }
            } catch (err: any) {
                console.error('Error fetching registry data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Set up real-time subscriptions
        const giftsSubscription = supabase
            .channel('public:gifts')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'gifts' }, () => {
                fetchData();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(giftsSubscription);
        };
    }, []);

    const markAsGifted = async (giftId: string, name: string) => {
        try {
            const gift = gifts.find(g => g.id === giftId);
            if (!gift) return false;

            let updateData: any = {};

            if (gift.isBlessing) {
                // For blessings, append the name to the list
                const currentNames = gift.giftedBy || [];
                updateData = {
                    gifted_by: [...currentNames, name]
                };
            } else {
                // For normal gifts, mark as gifted and set the name
                updateData = {
                    is_gifted: true,
                    gifted_by: [name]
                };
            }

            const { error: updateError } = await supabase
                .from('gifts')
                .update(updateData)
                .eq('id', giftId);

            if (updateError) throw updateError;
            return true;
        } catch (err: any) {
            console.error('Error marking as gifted:', err);
            setError(err.message);
            return false;
        }
    };

    return { registry, gifts, loading, error, markAsGifted };
};
export type { Gift, Registry };
