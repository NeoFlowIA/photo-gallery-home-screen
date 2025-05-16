
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface CheckoutButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ onClick, isLoading, disabled }) => {
  return (
    <Button
      size="lg"
      className="w-full h-[56px] text-base button-text font-bold"
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" size={24} />
      ) : (
        'Finalizar compra'
      )}
    </Button>
  );
};

export default CheckoutButton;
