import type { Gift, Registry } from '../types';

export const mockRegistry: Registry = {
    babyName: "Baby Gulmohar",
    dueDate: "July 15, 2026",
    welcomeMessage: "Thank you for being part of our journey! We appreciate your love and support as we prepare for our little one's arrival.",
    shippingAddress: "123 Nursery Lane, Sweetwater, CA 90210",
    contactDetails: "Phone: (555) 123-4567 | Email: parents@example.com"
};

export const mockGifts: Gift[] = [
    {
        id: "f81d4fae-7dec-11d0-a765-00a0c91e6bf6",
        title: "Blessings & Good Wishes",
        price: 0,
        imageUrl: "https://images.unsplash.com/photo-1518091043644-c1d445bcc97a?auto=format&fit=crop&q=80&w=800",
        isGifted: false,
        isBlessing: true,
        giftedBy: ["Grandma Rose", "Uncle Dave"],
        description: "Your blessings and good wishes mean the world to us and our little one. Please add your name to our blessing wall!"
    },
    {
        id: "1",
        title: "Premium Baby Stroller",
        price: 75000,
        imageUrl: "https://images.unsplash.com/photo-1591084728795-1149f32d9866?auto=format&fit=crop&q=80&w=800",
        productUrl: "https://www.amazon.in/example-stroller",
        isGifted: true,
        giftedBy: ["Aunt Sarah"],
        description: "Versatile and comfortable stroller for all terrains."
    },
    {
        id: "2",
        title: "Smart Nursery Crib",
        price: 95000,
        imageUrl: "https://images.unsplash.com/photo-1544126592-807daa215a05?auto=format&fit=crop&q=80&w=800",
        productUrl: "https://www.pepperfry.com/example-crib",
        isGifted: false,
        description: "Elegant crib with adjustable height and built-in sensors."
    },
    {
        id: "3",
        title: "High-Tech Baby Monitor",
        price: 25000,
        imageUrl: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800",
        productUrl: "https://www.reliance-digital.com/example-monitor",
        isGifted: false,
        description: "HD video monitor with dual-way talk and room temperature alerts."
    }
];
