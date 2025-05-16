
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// import { toast } from "sonner"; // Toast is no longer needed here directly

interface AddCreditButtonProps {
  onClick?: () => void; // Kept onClick for potential other uses, but primary action is navigation
}

const AddCreditButton: React.FC<AddCreditButtonProps> = ({ onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
    navigate('/adicionar-credito');
    // toast.info("Redirecionando para adicionar crédito..."); // Removed as navigation is direct
  };

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
