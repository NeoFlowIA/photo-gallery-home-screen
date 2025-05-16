
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react'; // Using ShoppingCart as a placeholder
import { Link } from 'react-router-dom';

const EmptyCart: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 min-h-[calc(100vh-200px)]">
      <ShoppingCart size={64} className="text-subtle-text mb-6" />
      <h2 className="heading-4 text-text mb-2">Seu carrinho está vazio.</h2>
      <p className="body-text text-subtle-text mb-6">
        Adicione algumas fotos incríveis dos seus eventos favoritos!
      </p>
      <Button asChild variant="secondary" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 min-h-[48px] px-6">
        <Link to="/eventos">Buscar eventos</Link>
      </Button>
    </div>
  );
};

export default EmptyCart;
