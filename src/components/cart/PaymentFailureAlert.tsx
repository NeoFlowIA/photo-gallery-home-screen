
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface PaymentFailureAlertProps {
  onRetry: () => void;
  message?: string;
}

const PaymentFailureAlert: React.FC<PaymentFailureAlertProps> = ({ 
  onRetry, 
  message = "Algo deu errado. Verifique sua conexão ou tente novamente." 
}) => {
  return (
    <Alert variant="destructive" className="my-4">
      <AlertTriangle className="h-5 w-5" />
      <AlertTitle>Falha no Pagamento</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
      <Button onClick={onRetry} variant="destructive" className="mt-4 w-full sm:w-auto">
        Tentar novamente
      </Button>
    </Alert>
  );
};

export default PaymentFailureAlert;
