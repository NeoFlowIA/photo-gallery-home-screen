
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Wallet, Banknote } from 'lucide-react';
import AddCreditButton from './AddCreditButton';

export type PaymentMethod = 'credit' | 'cash';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
  userBalance: number;
  totalAmount: number;
  onAddCredit: () => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onMethodChange,
  userBalance,
  totalAmount,
  onAddCredit
}) => {
  const isCreditInsufficient = selectedMethod === 'credit' && userBalance < totalAmount;

  return (
    <div className="space-y-4">
      <h3 className="body-text font-medium text-text">Como deseja pagar?</h3>
      <RadioGroup
        value={selectedMethod}
        onValueChange={(value) => onMethodChange(value as PaymentMethod)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {/* Credit Option */}
        <Label htmlFor="credit-payment" className="cursor-pointer">
          <Card className={`p-4 rounded-[16px] border-2 ${selectedMethod === 'credit' ? 'border-primary shadow-md' : 'border-transparent hover:border-accent'}`}>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="credit" id="credit-payment" className="sr-only" />
              <Wallet size={24} className={`mr-2 ${selectedMethod === 'credit' ? 'text-primary' : 'text-subtle-text'}`} />
              <div className="flex-grow">
                <span className={`font-medium ${selectedMethod === 'credit' ? 'text-primary' : 'text-text'}`}>Crédito interno</span>
                <p className={`text-xs ${selectedMethod === 'credit' ? 'text-primary/80' : 'text-subtle-text'}`}>
                  Seu saldo: R$ {userBalance.toFixed(2).replace('.', ',')}
                </p>
              </div>
            </div>
          </Card>
        </Label>

        {/* Cash Option */}
        <Label htmlFor="cash-payment" className="cursor-pointer">
          <Card className={`p-4 rounded-[16px] border-2 ${selectedMethod === 'cash' ? 'border-primary shadow-md' : 'border-transparent hover:border-accent'}`}>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="cash" id="cash-payment" className="sr-only" />
              <Banknote size={24} className={`mr-2 ${selectedMethod === 'cash' ? 'text-primary' : 'text-subtle-text'}`} />
              <div className="flex-grow">
                <span className={`font-medium ${selectedMethod === 'cash' ? 'text-primary' : 'text-text'}`}>Dinheiro</span>
                <p className={`text-xs ${selectedMethod === 'cash' ? 'text-primary/80' : 'text-subtle-text'}`}>Pagamento externo</p>
              </div>
            </div>
          </Card>
        </Label>
      </RadioGroup>
      {isCreditInsufficient && (
        <AddCreditButton onClick={onAddCredit} />
      )}
    </div>
  );
};

export default PaymentMethodSelector;
