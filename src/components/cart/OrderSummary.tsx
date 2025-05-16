
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface OrderSummaryProps {
  totalAmount: number;
  discount?: number; // For future use
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ totalAmount, discount }) => {
  return (
    <Card className="shadow-md bg-light border-none rounded-[16px]">
      <CardHeader className="pb-2">
        <CardTitle className="heading-4 text-primary">Resumo do Pedido</CardTitle>
      </CardHeader>
      <CardContent>
        {/* For future discount display
        {discount && (
          <div className="flex justify-between text-text mb-1">
            <span>Subtotal:</span>
            <span>R$ {(totalAmount + discount).toFixed(2).replace('.', ',')}</span>
          </div>
        )}
        {discount && (
          <div className="flex justify-between text-success mb-2">
            <span>Desconto:</span>
            <span>- R$ {discount.toFixed(2).replace('.', ',')}</span>
          </div>
        )}
        */}
        <div className="flex justify-between items-center text-xl font-bold text-primary mt-2 pt-2 border-t border-accent">
          <span>Total:</span>
          <span>R$ {totalAmount.toFixed(2).replace('.', ',')}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
