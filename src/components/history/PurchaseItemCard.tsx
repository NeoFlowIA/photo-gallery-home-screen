
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Download, CreditCard, Wallet } from 'lucide-react'; // Assuming Wallet for "crédito interno" and CreditCard for "dinheiro" or other card payments
import { toast } from "sonner";

export interface Purchase {
  id: string;
  eventName: string;
  purchaseDate: string;
  photoThumbnails: string[];
  totalAmount: number;
  paymentMethod: 'credit' | 'cash' | 'pix' | 'credit_card'; // Expanded for clarity
}

interface PurchaseItemCardProps {
  purchase: Purchase;
}

const PaymentMethodIcon: React.FC<{ method: Purchase['paymentMethod'] }> = ({ method }) => {
  switch (method) {
    case 'credit':
      return <Wallet size={16} className="mr-1" />;
    case 'cash':
    case 'credit_card': // Grouping cash and credit_card for icon simplicity here
      return <CreditCard size={16} className="mr-1" />;
    case 'pix':
      return <span className="mr-1 text-xs font-bold">PIX</span>; // Placeholder for PIX icon
    default:
      return null;
  }
};

const PaymentMethodText: React.FC<{ method: Purchase['paymentMethod'] }> = ({ method }) => {
  switch (method) {
    case 'credit':
      return <>Crédito interno</>;
    case 'cash':
      return <>Dinheiro</>;
    case 'credit_card':
      return <>Cartão de Crédito</>;
    case 'pix':
      return <>PIX</>;
    default:
      return null;
  }
};

const PurchaseItemCard: React.FC<PurchaseItemCardProps> = ({ purchase }) => {
  const handleViewDetails = () => {
    toast.info("Detalhes da Compra", {
      description: "Esta funcionalidade para ver todos os detalhes e baixar comprovante será implementada em breve.",
      action: {
        label: "Ok",
        onClick: () => {},
      },
    });
  };

  return (
    <Card className="mb-3 shadow-md rounded-xl bg-light">
      <CardHeader>
        <CardTitle className="text-lg text-text">{purchase.eventName}</CardTitle>
        <p className="text-xs text-subtle-text caption-text">{purchase.purchaseDate}</p>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {purchase.photoThumbnails.slice(0, 3).map((thumb, index) => (
            <img
              key={index}
              src={thumb || '/placeholder.svg'}
              alt={`Thumbnail ${index + 1}`}
              className="w-20 h-20 object-cover rounded-md bg-accent"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
          ))}
          {purchase.photoThumbnails.length > 3 && (
            <div className="w-20 h-20 rounded-md bg-accent flex items-center justify-center text-text font-bold">
              +{purchase.photoThumbnails.length - 3}
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-text body-text">Valor total:</p>
          <p className="text-primary font-bold body-text">
            R$ {purchase.totalAmount.toFixed(2).replace('.', ',')}
          </p>
        </div>
        <div className="flex items-center text-subtle-text text-sm">
          <PaymentMethodIcon method={purchase.paymentMethod} />
          <PaymentMethodText method={purchase.paymentMethod} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-end gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="sm" className="w-full sm:w-auto text-dark border-dark/50 hover:bg-dark/10 hover:text-dark min-h-[48px]">
                <Download size={16} className="mr-2" />
                Baixar Comprovante
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Recurso em breve</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Button onClick={handleViewDetails} size="sm" className="w-full sm:w-auto min-h-[48px]">
          Ver detalhes
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PurchaseItemCard;
