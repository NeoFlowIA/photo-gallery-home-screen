
import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const NotificationBanner: React.FC = () => {
  const { toast } = useToast();

  const handleNotificationRequest = () => {
    toast({
      title: "Alerta ativado!",
      description: "Você será notificado quando novas fotos forem publicadas.",
    });
  };

  return (
    <div className="bg-accent rounded-lg overflow-hidden animate-fade-in border-l-4 border-secondary-brand">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <p className="body-text mb-3 sm:mb-0">
            📸 Não encontrou sua foto? Ative o alerta e receba quando novas fotos forem publicadas.
          </p>
          <Button 
            onClick={handleNotificationRequest} 
            className="bg-secondary-brand hover:bg-secondary-brand/90 text-white min-h-[48px]"
          >
            Quero ser notificado
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationBanner;
