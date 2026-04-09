import { useState } from 'react';
import { Header } from './components/Header';
import { GiftCard } from './components/GiftCard';
import { GiftModal } from './components/GiftModal';
import { BuyNowModal } from './components/BuyNowModal';
import { useRegistry } from './hooks/useRegistry';
import type { Gift } from './types';
import { AlertCircle, Loader2 } from 'lucide-react';

function App() {
  const { registry, gifts, loading, error, markAsGifted } = useRegistry();
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buyNowGift, setBuyNowGift] = useState<Gift | null>(null);

  const handleOpenMarkAsGifted = (gift: Gift) => {
    setSelectedGift(gift);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGift(null);
  };

  const handleConfirmGifted = async (data: { name: string }) => {
    if (!selectedGift) return;

    const success = await markAsGifted(selectedGift.id, data.name);
    if (success) {
      handleCloseModal();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading your registry...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="glass-card p-8 max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Oops!</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Header registry={registry} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in [animation-delay:200ms]">
          {gifts.map((gift: Gift) => (
            <div key={gift.id}>
              <GiftCard
                gift={gift}
                onMarkAsGifted={handleOpenMarkAsGifted}
                onBuyNow={setBuyNowGift}
              />
            </div>
          ))}
        </div>

        {gifts.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            <p>No items added to the registry yet.</p>
          </div>
        )}
      </div>

      <BuyNowModal
        gift={buyNowGift}
        isOpen={!!buyNowGift}
        onClose={() => setBuyNowGift(null)}
      />

      <GiftModal
        gift={selectedGift}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleConfirmGifted}
      />

      <footer className="py-12 border-t border-slate-200/50 text-center text-slate-400 text-sm">
        <p>© 2026 {registry.babyName}'s Registry. Made with love.</p>
      </footer>
    </div>
  );
}

export default App;
