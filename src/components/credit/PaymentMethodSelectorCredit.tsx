
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, QrCode } from 'lucide-react'; // QrCode might not be in default lucide, using placeholder

export type CreditPaymentMethod = 'pix' | 'credit_card';

interface PaymentMethodSelectorCreditProps {
  selectedMethod: CreditPaymentMethod;
  onMethodChange: (method: CreditPaymentMethod) => void;
}

const PaymentMethodSelectorCredit: React.FC<PaymentMethodSelectorCreditProps> = ({
  selectedMethod,
  onMethodChange,
}) => {
  return (
    <div className="mb-6">
      <h3 className="body-text font-medium text-text mb-3">Forma de pagamento</h3>
      <RadioGroup
        value={selectedMethod}
        onValueChange={(value) => onMethodChange(value as CreditPaymentMethod)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {/* PIX Option */}
        <Label htmlFor="pix-payment" className="cursor-pointer">
          <Card className={`rounded-xl border-2 transition-all duration-200 ease-in-out ${selectedMethod === 'pix' ? 'border-primary shadow-md scale-105' : 'border-transparent hover:border-accent'}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="pix" id="pix-payment" className="sr-only" />
                <QrCode size={28} className={`mr-2 ${selectedMethod === 'pix' ? 'text-primary' : 'text-subtle-text'}`} />
                <div>
                  <span className={`font-medium ${selectedMethod === 'pix' ? 'text-primary' : 'text-text'}`}>PIX</span>
                  <p className={`text-xs ${selectedMethod === 'pix' ? 'text-primary/80' : 'text-subtle-text'}`}>
                    Pagamento instantâneo
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Label>

        {/* Credit Card Option */}
        <Label htmlFor="card-payment" className="cursor-pointer">
          <Card className={`rounded-xl border-2 transition-all duration-200 ease-in-out ${selectedMethod === 'credit_card' ? 'border-primary shadow-md scale-105' : 'border-transparent hover:border-accent'}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="credit_card" id="card-payment" className="sr-only" />
                <CreditCard size={28} className={`mr-2 ${selectedMethod === 'credit_card' ? 'text-primary' : 'text-subtle-text'}`} />
                <div>
                  <span className={`font-medium ${selectedMethod === 'credit_card' ? 'text-primary' : 'text-text'}`}>Cartão de Crédito</span>
                  <p className={`text-xs ${selectedMethod === 'credit_card' ? 'text-primary/80' : 'text-subtle-text'}`}>
                    Parcelamento disponível
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Label>
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodSelectorCredit;
