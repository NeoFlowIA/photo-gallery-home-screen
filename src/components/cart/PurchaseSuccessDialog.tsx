
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { PartyPopper } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PurchaseSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PurchaseSuccessDialog: React.FC<PurchaseSuccessDialogProps> = ({ open, onOpenChange }) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-light rounded-[20px]">
        <AlertDialogHeader className="items-center">
          <PartyPopper size={48} className="text-success mb-4" />
          <AlertDialogTitle className="heading-4 text-text">Compra realizada com sucesso!</AlertDialogTitle>
          <AlertDialogDescription className="body-text text-subtle-text text-center">
            Você pode acessar suas fotos no seu Histórico de Compras.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
          <AlertDialogAction asChild className="w-full bg-primary hover:bg-primary/90 min-h-[48px]">
            <Link to="/historico">Ver histórico</Link>
          </AlertDialogAction>
          <AlertDialogCancel asChild className="w-full min-h-[48px]">
            <Link to="/">Voltar para a Home</Link>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PurchaseSuccessDialog;
