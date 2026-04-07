export interface Gift {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    productUrl?: string;
    isGifted: boolean;
    giftedBy?: string[]; // Changed to array for multiple signatures (Blessings)
    isBlessing?: boolean; // New field for non-monetary multi-person gift
    description?: string;
    sortOrder?: number;
}

export interface Registry {
    babyName: string;
    dueDate: string;
    welcomeMessage: string;
    shippingAddress: string;
    contactDetails: string;
}
