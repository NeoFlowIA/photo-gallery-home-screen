import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItemCard, { CartItem } from '@/components/cart/CartItemCard';
import OrderSummary from '@/components/cart/OrderSummary';
import PaymentMethodSelector, { PaymentMethod } from '@/components/cart/PaymentMethodSelector';
import CheckoutButton from '@/components/cart/CheckoutButton';
import EmptyCart from '@/components/cart/EmptyCart';
import PurchaseSuccessDialog from '@/components/cart/PurchaseSuccessDialog';
import PaymentFailureAlert from '@/components/cart/PaymentFailureAlert';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

// Mock Data
const initialCartItems: CartItem[] = [
  { id: '1', imageUrl: 'https://picsum.photos/seed/eventA_photo1/100/100', eventName: 'Casamento Ana & Bruno', price: 25.00 },
  { id: '2', imageUrl: 'https://picsum.photos/seed/eventA_photo2/100/100', eventName: 'Casamento Ana & Bruno', price: 25.00 },
  { id: '3', imageUrl: 'https://picsum.photos/seed/eventB_photo1/100/100', eventName: 'Aniversário de 15 anos da Sofia', price: 20.00 },
  { id: '4', imageUrl: 'https://picsum.photos/seed/eventC_photo1/100/100', eventName: 'Formatura Engenharia Turma X', price: 18.50 },
];

const initialUserBalance = 30.00; // Example: insufficient for the full cart initially

type CheckoutState = 'cart' | 'loading' | 'success' | 'failure';

interface GroupedCartItems {
  [eventName: string]: CartItem[];
}

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [userBalance, setUserBalance] = useState<number>(initialUserBalance);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit');
  const [checkoutState, setCheckoutState] = useState<CheckoutState>('cart');
  const [failureMessage, setFailureMessage] = useState<string | undefined>(undefined);

  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };
  
  const handleAddCredit = () => {
    // Placeholder for navigation or modal to add credit
    // For demo, let's just increase balance
    setUserBalance(prev => prev + 50); 
    toast.success("R$ 50,00 adicionados ao seu saldo!");
  };

  const handleCheckout = () => {
    setCheckoutState('loading');
    setFailureMessage(undefined);

    // Simulate API call
    setTimeout(() => {
      if (paymentMethod === 'credit' && userBalance < totalAmount) {
        setFailureMessage('Saldo insuficiente para completar a compra com crédito interno. Adicione mais crédito ou escolha outra forma de pagamento.');
        setCheckoutState('failure');
        return;
      }

      // Simulate random success/failure for demo
      // const isSuccess = Math.random() > 0.2; 
      const isSuccess = true; // For now, let's assume success unless saldo is insufficient

      if (isSuccess) {
        if (paymentMethod === 'credit') {
          setUserBalance(prevBalance => prevBalance - totalAmount);
        }
        // setCartItems([]); // Clear cart on success - commented out to keep items for demo after success
        setCheckoutState('success');
        toast.success("Compra finalizada com sucesso!");
      } else {
        setFailureMessage("Não foi possível processar seu pagamento. Tente novamente.");
        setCheckoutState('failure');
        toast.error("Falha ao processar pagamento.");
      }
    }, 1500);
  };

  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item.eventName]) {
      acc[item.eventName] = [];
    }
    acc[item.eventName].push(item);
    return acc;
  }, {} as GroupedCartItems);

  if (checkoutState === 'success') {
    return (
      <PurchaseSuccessDialog 
        open={true} 
        onOpenChange={(open) => {
          if (!open) {
            setCheckoutState('cart'); 
            // Potentially clear cart items here if not done earlier
            // setCartItems([]); 
            navigate('/'); 
          }
        }} 
      />
    );
  }

  if (cartItems.length === 0 && checkoutState !== 'loading') {
    return <EmptyCart />;
  }
  
  const isCheckoutDisabled = paymentMethod === 'credit' && userBalance < totalAmount;

  return (
    <div className="min-h-screen bg-gradient-to-b from-light to-accent/30 p-4 pb-24 space-y-6 animate-fade-in">
      <header>
        <h1 className="heading-4 text-text mb-1">Seu Carrinho</h1>
        <p className="body-text text-subtle-text">Revise seus itens e finalize sua compra.</p>
      </header>

      {checkoutState === 'failure' && failureMessage && (
        <PaymentFailureAlert 
          onRetry={() => {
            setCheckoutState('cart');
            handleCheckout(); // Optionally retry immediately or just reset state
          }}
          message={failureMessage}
        />
      )}
      
      <ScrollArea className="h-[calc(100vh-400px)] sm:h-auto sm:max-h-[50vh] pr-3">
        <div className="space-y-6">
          {Object.entries(groupedItems).map(([eventName, items]) => (
            <section key={eventName}>
              <h2 className="text-lg font-semibold text-text mb-2">{eventName}</h2>
              <div className="space-y-3">
                {items.map(item => (
                  <CartItemCard key={item.id} item={item} onRemove={handleRemoveItem} />
                ))}
              </div>
              <Separator className="my-4 bg-accent" />
            </section>
          ))}
        </div>
      </ScrollArea>
      
      <OrderSummary totalAmount={totalAmount} />
      
      <PaymentMethodSelector
        selectedMethod={paymentMethod}
        onMethodChange={setPaymentMethod}
        userBalance={userBalance}
        totalAmount={totalAmount}
        onAddCredit={handleAddCredit}
      />
      
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-light border-t border-accent shadow- ऊपर">
        <CheckoutButton 
          onClick={handleCheckout} 
          isLoading={checkoutState === 'loading'}
          disabled={isCheckoutDisabled && paymentMethod === 'credit'} // Disable if credit chosen and insufficient
        />
         {isCheckoutDisabled && paymentMethod === 'credit' && (
           <p className="text-xs text-destructive text-center mt-2">
             Saldo insuficiente. Adicione crédito ou escolha outra forma de pagamento.
           </p>
         )}
      </div>
    </div>
  );
};

export default CartPage;
