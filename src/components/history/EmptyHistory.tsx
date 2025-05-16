
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react'; // Icon for empty history (receipt/document)

const EmptyHistory: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 min-h-[calc(100vh-200px)]">
      <FileText size={64} className="text-subtle-text mb-6" />
      <h2 className="text-xl font-semibold text-text mb-2">Você ainda não fez nenhuma compra</h2>
      <p className="text-subtle-text mb-6 body-text">
        Explore os eventos e encontre suas fotos para começar!
      </p>
      <Button asChild variant="secondary" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground min-h-[48px]">
        <Link to="/eventos">Buscar eventos</Link>
      </Button>
    </div>
  );
};

export default EmptyHistory;
