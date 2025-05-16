
import React from 'react';
import { Wallet } from 'lucide-react';

interface BalanceDisplayProps {
  balance: number;
}

const BalanceDisplay: React.FC<BalanceDisplayProps> = ({ balance }) => {
  return (
    <div className="p-4 mb-6 bg-accent rounded-lg border border-primary/30">
      <div className="flex items-center">
        <Wallet size={28} className="text-primary mr-3" />
        <div>
          <p className="text-sm text-subtle-text">Seu saldo atual</p>
          <p className="heading-4 text-primary">
            R$ {balance.toFixed(2).replace('.', ',')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BalanceDisplay;
