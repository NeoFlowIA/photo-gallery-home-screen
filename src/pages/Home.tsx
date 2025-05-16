
import React from "react";
import { Link } from "react-router-dom";
import { Search, Camera, ShoppingCart, History, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import NavigationCard from "@/components/NavigationCard";
import NotificationBanner from "@/components/NotificationBanner";
import Footer from "@/components/Footer";
import UserAvatar from "@/components/UserAvatar";

const Home = () => {
  // Mock user data - in a real app, this would come from authentication context
  const user = {
    name: "João",
    isPhotographer: true,
    avatarUrl: "" // Empty string for fallback example
  };

  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen gradient-bg pb-16">
      {/* Background illustration */}
      <div className="absolute top-0 right-0 w-full h-64 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute top-10 right-10">
          <Camera size={120} className="text-secondary-brand" />
        </div>
        <div className="absolute top-40 left-5">
          <Camera size={80} className="text-primary" />
        </div>
      </div>
      
      <div className="container px-4 sm:px-6 py-8">
        {/* User greeting section */}
        <div className="flex items-center mb-8 animate-fade-in">
          <UserAvatar user={user} size={40} />
          <div className="pl-4">
            <h1 className="heading-4">
              Bem-vindo de volta, {user.name} 👋
            </h1>
          </div>
        </div>

        {/* Navigation grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 mb-8 max-h-[400px] overflow-y-auto pb-4">
          <NavigationCard 
            icon={<Search size={24} className="text-primary" />} 
            title="Buscar Eventos" 
            to="/eventos" 
          />
          <NavigationCard 
            icon={<Search size={24} className="text-primary" />} 
            title="Buscar Fotos" 
            to="/fotos" 
          />
          <NavigationCard 
            icon={<ShoppingCart size={24} className="text-primary" />} 
            title="Carrinho" 
            to="/carrinho" 
          />
          <NavigationCard 
            icon={<History size={24} className="text-primary" />} 
            title="Histórico de Compras" 
            to="/historico" 
          />
          {user.isPhotographer && (
            <NavigationCard 
              icon={<Camera size={24} className="text-primary" />} 
              title="Área do Fotógrafo" 
              to="/fotografo" 
            />
          )}
        </div>

        {/* Notification banner */}
        <NotificationBanner />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
