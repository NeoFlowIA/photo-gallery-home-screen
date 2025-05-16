
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SearchByNumberCardProps {
  participantNumber: string;
  setParticipantNumber: (value: string) => void;
  onSearch: () => void;
  isSearching: boolean;
}

export const SearchByNumberCard: React.FC<SearchByNumberCardProps> = ({
  participantNumber,
  setParticipantNumber,
  onSearch,
  isSearching,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(value)) {
      setParticipantNumber(value);
      if (error) setError(null);
    }
  };

  const handleSubmit = () => {
    if (!participantNumber.trim()) {
      setError('Por favor, insira o número.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    // Optional: Regex for 6 digits if needed: /^\d{6}$/
    // if (!/^\d{6}$/.test(participantNumber)) {
    //   setError('O número deve conter 6 dígitos.');
    //   setShake(true);
    //   setTimeout(() => setShake(false), 500);
    //   return;
    // }
    setError(null);
    onSearch();
  };

  return (
    <Card className="bg-light border-none shadow-md rounded-[16px] animate-scale-in overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold text-text">Buscar por número</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <Input
          type="text" // Use text to allow custom formatting/masking later if needed
          inputMode="numeric" // Helps mobile keyboards
          placeholder="Digite seu número de participante"
          value={participantNumber}
          onChange={handleInputChange}
          className={cn(
            "min-h-[48px] text-base",
            error && "border-primary ring-primary",
            shake && "animate-shake" // Requires 'animate-shake' in tailwind.config.ts or index.css
          )}
        />
        {error && <p className="text-sm text-primary">{error}</p>}
        <Button 
          className="w-full min-h-[48px] bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95"
          onClick={handleSubmit}
          disabled={isSearching}
        >
          {isSearching ? 'Buscando...' : 'Buscar fotos'}
        </Button>
      </CardContent>
    </Card>
  );
};

// Add shake animation to index.css or tailwind.config.ts
// For simplicity, I'll suggest adding to index.css for now.
// If you want to add it to tailwind.config.ts, it would be under keyframes and animation.
// Example for index.css:
/*
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}
.animate-shake {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}
*/

