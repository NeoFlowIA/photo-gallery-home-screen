
import React, { useState } from 'react';
import { SearchBySelfieCard } from '@/components/SearchBySelfieCard';
import { SearchByNumberCard } from '@/components/SearchByNumberCard';
import Footer from '@/components/Footer';
import NotificationBanner from '@/components/NotificationBanner'; // Using existing for "No results" for now
import { Button } from '@/components/ui/button';
import { Check, Grid2x2 } from 'lucide-react'; // Grid2x2 for photo item, Check for success

// Mock data for photo results
const mockPhotos = [
  { id: '1', src: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=150&h=150&fit=crop', eventName: 'Evento de Tecnologia' },
  { id: '2', src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=150&h=150&fit=crop', eventName: 'Workshop de Design' },
  { id: '3', src: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=150&h=150&fit=crop', eventName: 'Festival de Luzes' },
  { id: '4', src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150&h=150&fit=crop', eventName: 'Aventura na Montanha' },
];

interface Photo {
  id: string;
  src: string;
  eventName: string;
}

const PhotoGridItem: React.FC<{ photo: Photo }> = ({ photo }) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    // Here you would typically add to a global cart state
    console.log(`Added ${photo.eventName} to cart`);
    setTimeout(() => setAddedToCart(false), 2000); // Reset after 2s
  };

  return (
    <div className="bg-light rounded-lg shadow-sm overflow-hidden flex flex-col animate-scale-in">
      <img src={photo.src} alt={photo.eventName} className="w-full h-auto aspect-square object-cover" />
      <div className="p-2 flex flex-col flex-grow">
        <p className="caption-text text-text mb-1 truncate">{photo.eventName}</p>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={handleAddToCart} 
          className={`w-full mt-auto ${addedToCart ? 'bg-success text-white hover:bg-success/90' : 'text-primary border-primary hover:bg-primary/10'}`}
        >
          {addedToCart ? <Check size={16} className="mr-1" /> : <Grid2x2 size={16} className="mr-1" />} 
          {addedToCart ? 'Adicionado' : 'Ver Detalhes'} 
          {/* Changed text to "Ver Detalhes" as "Adicionar ao carrinho" is usually on a product page */}
        </Button>
      </div>
    </div>
  );
};


const SearchPhotos: React.FC = () => {
  const [participantNumber, setParticipantNumber] = useState('');
  const [searchResults, setSearchResults] = useState<Photo[]>([]);
  const [showNoResults, setShowNoResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchByNumber = () => {
    if (!participantNumber.trim()) return;
    setIsSearching(true);
    setShowNoResults(false);
    setSearchResults([]);
    console.log('Searching by number:', participantNumber);
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      // Simulate finding photos or not
      if (participantNumber === '123456') {
        setSearchResults(mockPhotos);
      } else {
        setShowNoResults(true);
      }
    }, 1500);
  };
  
  const handleSelfieSearch = (type: 'camera' | 'upload') => {
    setIsSearching(true);
    setShowNoResults(false);
    setSearchResults([]);
    console.log(`Initiating selfie search via ${type}`);
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      // Simulate finding photos for any selfie attempt for now
      setSearchResults(mockPhotos.slice(0,2)); // Show fewer results for selfie example
    }, 2000);
  };


  return (
    <div className="flex flex-col min-h-screen bg-gradient-bg">
      <main className="flex-grow p-4 space-y-6 pb-24"> {/* Increased pb for footer */}
        {/* Bloco 1: Cabeçalho */}
        <div className="animate-fade-in">
          <h1 className="heading-4 text-text">Encontre suas fotos</h1>
          <p className="body-text text-subtle-text mt-1">
            Busque por uma selfie ou pelo número do seu crachá.
          </p>
        </div>

        {/* Bloco 2: Métodos de busca */}
        <div className="space-y-4">
          <SearchBySelfieCard onSearch={handleSelfieSearch} />
          <SearchByNumberCard
            participantNumber={participantNumber}
            setParticipantNumber={setParticipantNumber}
            onSearch={handleSearchByNumber}
            isSearching={isSearching && participantNumber.length > 0}
          />
        </div>
        
        {isSearching && (
          <div className="flex justify-center items-center py-8">
            <p className="body-text text-primary">Buscando suas fotos...</p>
            {/* Simple spinner */}
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary ml-2"></div>
          </div>
        )}

        {/* Bloco 3: Resultados (Conditional) */}
        {searchResults.length > 0 && !isSearching && (
          <div>
            <h2 className="heading-4 text-text mb-4">Fotos encontradas</h2>
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              {searchResults.map((photo) => (
                <PhotoGridItem key={photo.id} photo={photo} />
              ))}
            </div>
            {searchResults.length >= 12 && ( // Placeholder for pagination/infinite scroll
                 <Button variant="outline" className="w-full mt-4">Ver mais fotos</Button>
            )}
          </div>
        )}

        {/* Bloco 4: Nenhum resultado (Conditional) */}
        {showNoResults && !isSearching && (
          <div className="mt-6">
             {/* Using the existing NotificationBanner as a template for "No Results" */}
            <div className="bg-accent rounded-lg overflow-hidden animate-fade-in border-l-4 border-secondary-brand p-4">
                <p className="body-text mb-3 text-center">
                😞 Nenhuma foto encontrada… <br/> Talvez estejam sendo publicadas agora mesmo!
                </p>
                <Button 
                    onClick={() => console.log("Ativar alerta clicado")} 
                    className="w-full bg-secondary-brand hover:bg-secondary-brand/90 text-white min-h-[48px]"
                >
                    Ativar alerta para novas fotos
                </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchPhotos;

