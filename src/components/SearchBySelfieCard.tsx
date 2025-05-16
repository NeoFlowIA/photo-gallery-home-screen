
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, Upload } from 'lucide-react';

interface SearchBySelfieCardProps {
  onSearch: (type: 'camera' | 'upload') => void;
}

export const SearchBySelfieCard: React.FC<SearchBySelfieCardProps> = ({ onSearch }) => {
  // Basic camera detection (can be improved)
  const hasCamera = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

  return (
    <Card className="bg-light border-none shadow-md rounded-[16px] animate-scale-in overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-semibold text-text">Buscar por selfie</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        {hasCamera && (
          <Button 
            variant="outline" 
            className="w-full min-h-[48px] border-primary text-primary hover:bg-primary/10 active:scale-95"
            onClick={() => onSearch('camera')}
          >
            <Camera size={20} className="mr-2" />
            Tirar selfie
          </Button>
        )}
        <Button 
          variant="outline" 
          className="w-full min-h-[48px] border-primary text-primary hover:bg-primary/10 active:scale-95"
          onClick={() => onSearch('upload')}
        >
          <Upload size={20} className="mr-2" />
          Enviar foto da galeria
        </Button>
        {!hasCamera && <p className="text-xs text-subtle-text text-center">Câmera não detectada. Use a opção de enviar foto.</p>}
      </CardContent>
    </Card>
  );
};

