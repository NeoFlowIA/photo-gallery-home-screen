
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BalanceDisplay from '@/components/credit/BalanceDisplay';
import ValueSelector from '@/components/credit/ValueSelector';
import PaymentMethodSelectorCredit, { CreditPaymentMethod } from '@/components/credit/PaymentMethodSelectorCredit';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import UserAvatar from '@/components/UserAvatar';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

// Mock user data
const mockUser = {
  name: "Usuário",
  avatarUrl: "" 
};

const AddCreditPage: React.FC = () => {
  const navigate = useNavigate();
  // In a real app, balance would come from context/API
  const [currentBalance, setCurrentBalance] = useState(50.75); 
  const [selectedValue, setSelectedValue] = useState<number | string>(10); // Default selection
  const [customAmount, setCustomAmount] = useState<string>("10");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<CreditPaymentMethod>('pix');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set initial custom amount based on selected value
    if (typeof selectedValue === 'number') {
        setCustomAmount(selectedValue.toString());
    }
  }, [selectedValue]);


  const handleAddCredit = () => {
    const amountToAdd = parseFloat(customAmount);
    if (isNaN(amountToAdd) || amountToAdd < 5) {
      toast.error("Valor inválido", {
        description: "Por favor, insira um valor de recarga de no mínimo R$ 5,00.",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call for adding credit
    setTimeout(() => {
      setIsLoading(false);
      // Simulate success/failure
      const success = Math.random() > 0.2; // 80% chance of success

      if (success) {
        setCurrentBalance(prevBalance => prevBalance + amountToAdd);
        toast.success("Crédito adicionado com sucesso! 🎉", {
          description: `Novo saldo: R$ ${(currentBalance + amountToAdd).toFixed(2).replace('.', ',')}`,
        });
        navigate(-1); // Go back to the previous page
      } else {
        toast.error("Falha na recarga", {
          description: "Algo deu errado. Verifique sua conexão ou tente novamente.",
        });
      }
    }, 2000);
  };
  
  const finalAmount = parseFloat(customAmount) || 0;

  return (
    <div className="min-h-screen gradient-bg flex flex-col">
      <header className="bg-light shadow-sm sticky top-0 z-10 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-text">
            <ArrowLeft size={24} />
          </Button>
          <h1 className="heading-4 text-text text-center flex-grow">Adicionar Crédito</h1>
          <UserAvatar user={mockUser} size={32} />
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        <BalanceDisplay balance={currentBalance} />
        <ValueSelector
          selectedValue={selectedValue}
          onValueChange={setSelectedValue}
          customAmount={customAmount}
          onCustomAmountChange={setCustomAmount}
        />
        <PaymentMethodSelectorCredit
          selectedMethod={selectedPaymentMethod}
          onMethodChange={setSelectedPaymentMethod}
        />
        <Button
          size="lg"
          className="w-full h-[56px] text-base button-text font-bold mt-8 min-h-[56px]"
          onClick={handleAddCredit}
          disabled={isLoading || finalAmount < 5}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            `Adicionar R$ ${finalAmount > 0 ? finalAmount.toFixed(2).replace('.', ',') : '0,00'}`
          )}
        </Button>
      </main>
      <Footer />
    </div>
  );
};

export default AddCreditPage;
