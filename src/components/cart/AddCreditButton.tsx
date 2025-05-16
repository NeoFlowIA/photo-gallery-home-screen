
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from "sonner";

interface AddCreditButtonProps {
  onClick: () => void;
}

const AddCreditButton: React.FC<AddCreditButtonProps> = ({ onClick }) => {
  const handleClick = () => {
    onClick();
    toast.info("Redirecionando para adicionar crédito...", {
      description: "Esta funcionalidade será implementada em breve."
    });
  }
  return (
    <Button
      variant="outline"
      className="w-full border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary active:scale-95 min-h-[48px]"
      onClick={handleClick}
    >
      <Plus size={20} className="mr-2" />
      Adicionar crédito
    </Button>
  );
};

export default AddCreditButton;
