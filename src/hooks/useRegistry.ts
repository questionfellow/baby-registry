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

                if (registryError) {
                    if (registryError.code === 'PGRST116') {
                        console.warn('No registry found in Supabase. Falling back to mock data. Please ensure you have added a row to the "registries" table in your Supabase project.');
                    } else {
                        throw registryError;
                    }
                }

                if (registryData) {
                    console.info('Registry data loaded successfully from Supabase:', registryData.baby_name);
                    setRegistry({
                        babyName: registryData.baby_name,
                        dueDate: registryData.due_date,
                        welcomeMessage: registryData.welcome_message,
                        shippingAddress: registryData.shipping_address,
                        contactDetails: registryData.contact_details,
                        howToUse: registryData.how_to_use ?? undefined,
                        upiId: registryData.upi_id ?? undefined
                    });
                }

                // Fetch Gifts
                const { data: giftsData, error: giftsError } = await supabase
                    .from('gifts')
                    .select('*')
                    .order('created_at', { ascending: true });

                if (giftsError) throw giftsError;

                console.log('gifts sort_order values:', giftsData?.map(g => ({ title: g.title, sort_order: g.sort_order })));

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
                        description: g.description,
                        sortOrder: g.sort_order ?? undefined
                    }));
                    formattedGifts.sort((a, b) => {
                        if (a.sortOrder == null && b.sortOrder == null) return 0;
                        if (a.sortOrder == null) return 1;
                        if (b.sortOrder == null) return -1;
                        return a.sortOrder - b.sortOrder;
                    });
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

            if (gift.isBlessing) {
                // Use atomic server-side append to avoid race conditions
                const { error: rpcError } = await supabase
                    .rpc('append_blessing', { gift_id: giftId, person_name: name });
                if (rpcError) throw rpcError;
            } else {
                // For normal gifts, mark as gifted and set the name
                const { error: updateError } = await supabase
                    .from('gifts')
                    .update({ is_gifted: true, gifted_by: [name] })
                    .eq('id', giftId);
                if (updateError) throw updateError;
            }

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
