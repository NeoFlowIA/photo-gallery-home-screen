
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import { toast } from "sonner";

export interface CartItem {
  id: string;
  imageUrl: string;
  eventName: string;
  price: number;
}

interface CartItemCardProps {
  item: CartItem;
  onRemove: (itemId: string) => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, onRemove }) => {
  const handleRemove = () => {
    onRemove(item.id);
    toast.error(`"${item.eventName}" removida do carrinho.`, {
      duration: 2000,
    });
  };

  return (
    <Card className="p-3 flex items-center gap-3 shadow-sm bg-light">
      <img src={item.imageUrl} alt={item.eventName} className="w-20 h-20 object-cover rounded-md" />
      <div className="flex-grow">
        <p className="text-sm font-medium text-text">{item.eventName}</p>
        <p className="text-xs text-subtle-text">Foto Digital</p>
        <p className="text-sm font-semibold text-primary mt-1">R$ {item.price.toFixed(2).replace('.', ',')}</p>
      </div>
      <Button variant="ghost" size="icon" onClick={handleRemove} className="text-destructive hover:text-destructive/80">
        <Trash2 size={20} />
      </Button>
    </Card>
  );
};

export default CartItemCard;
