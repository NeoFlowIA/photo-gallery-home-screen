
import React, { useState, useEffect } from 'react';
import PurchaseItemCard, { Purchase } from '@/components/history/PurchaseItemCard';
import EmptyHistory from '@/components/history/EmptyHistory';
import Footer from '@/components/Footer'; // Assuming Footer is generic
import UserAvatar from '@/components/UserAvatar'; // For consistency with Home
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Mock user data - in a real app, this would come from authentication context
const mockUser = {
  name: "Usuário",
  avatarUrl: "" 
};

// Mock purchase data
const mockPurchases: Purchase[] = [
  {
    id: '1',
    eventName: 'Corrida de Aniversário da Cidade',
    purchaseDate: '10 de Maio de 2025',
    photoThumbnails: ['/placeholder.svg', '/placeholder.svg', '/placeholder.svg', '/placeholder.svg'],
    totalAmount: 75.00,
    paymentMethod: 'credit_card',
  },
  {
    id: '2',
    eventName: 'Show de Rock Independente',
    purchaseDate: '02 de Maio de 2025',
    photoThumbnails: ['/placeholder.svg', '/placeholder.svg'],
    totalAmount: 30.00,
    paymentMethod: 'pix',
  },
  {
    id: '3',
    eventName: 'Festival Gastronômico Sabores do Mundo',
    purchaseDate: '20 de Abril de 2025',
    photoThumbnails: ['/placeholder.svg'],
    totalAmount: 15.00,
    paymentMethod: 'credit',
  },
];

const PurchaseHistoryPage: React.FC = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Set to mockPurchases to show items, or [] to show EmptyHistory
      setPurchases(mockPurchases); 
      // setPurchases([]); // Uncomment to test EmptyHistory
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center gradient-bg p-4">
        <div className="animate-pulse text-primary">Carregando histórico...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <header className="bg-light shadow-sm sticky top-0 z-10 p-4">
        <div className="container mx-auto flex items-center justify-between">
           <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-text">
            <ArrowLeft size={24} />
          </Button>
          <h1 className="heading-4 text-text text-center flex-grow">Minhas compras</h1>
          <UserAvatar user={mockUser} size={32} />
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        {purchases.length === 0 ? (
          <EmptyHistory />
        ) : (
          <div className="space-y-3">
            <p className="text-subtle-text body-text mb-4">Confira as fotos que você adquiriu.</p>
            {purchases.map((purchase) => (
              <PurchaseItemCard key={purchase.id} purchase={purchase} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PurchaseHistoryPage;
