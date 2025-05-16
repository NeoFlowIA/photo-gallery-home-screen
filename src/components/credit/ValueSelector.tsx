
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ValueSelectorProps {
  selectedValue: number | string; // Can be string if user types
  onValueChange: (value: number | string) => void;
  customAmount: string;
  onCustomAmountChange: (amount: string) => void;
}

const predefinedAmounts = [10, 20, 50, 100];

const ValueSelector: React.FC<ValueSelectorProps> = ({
  selectedValue,
  onValueChange,
  customAmount,
  onCustomAmountChange,
}) => {
  const handlePredefinedClick = (amount: number) => {
    onValueChange(amount);
    onCustomAmountChange(amount.toString());
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and an optional single decimal point for cents
    if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
        onCustomAmountChange(value);
        onValueChange(value === "" ? 0 : parseFloat(value)); // Update selectedValue as well
    }
  };
  
  return (
    <div className="mb-6">
      <h3 className="body-text font-medium text-text mb-3">Escolha um valor para adicionar</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {predefinedAmounts.map((amount) => (
          <Button
            key={amount}
            variant="outline"
            className={`min-h-[48px] h-auto py-3 text-base border-2 rounded-xl transition-all duration-200 ease-in-out
              ${selectedValue === amount ? 'border-primary bg-primary/10 text-primary font-semibold shadow-md scale-105' : 'border-input hover:border-primary/50 text-text'}`}
            onClick={() => handlePredefinedClick(amount)}
          >
            R$ {amount.toFixed(2).replace('.', ',')}
          </Button>
        ))}
      </div>
      <Input
        type="text" // Changed to text to handle decimal input with regex
        inputMode="decimal" // Provides a numeric-like keyboard on mobile with decimal options
        placeholder="Outro valor (ex: 25,50)"
        value={customAmount}
        onChange={handleCustomInputChange}
        className="h-12 text-base rounded-xl focus:border-primary"
        min="5" // min attribute is less effective with type="text" but good for semantics
      />
      {customAmount !== "" && parseFloat(customAmount) < 5 && (
         <p className="text-xs text-destructive mt-1">O valor mínimo é R$ 5,00.</p>
      )}
    </div>
  );
};

export default ValueSelector;
