
import React from "react";
import { Home, Search, ShoppingCart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Footer: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-light shadow-md">
      <div className="flex justify-around items-center h-16">
        <FooterLink 
          to="/" 
          icon={<Home size={20} />} 
          label="Home" 
          isActive={isActive("/")} 
        />
        <FooterLink 
          to="/fotos" 
          icon={<Search size={20} />} 
          label="Buscar" 
          isActive={isActive("/fotos")} 
        />
        <FooterLink 
          to="/carrinho" 
          icon={<ShoppingCart size={20} />} 
          label="Carrinho" 
          isActive={isActive("/carrinho")} 
        />
        <FooterLink 
          to="/perfil" 
          icon={<User size={20} />} 
          label="Perfil" 
          isActive={isActive("/perfil")} 
        />
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, icon, label, isActive }) => {
  return (
    <Link 
      to={to} 
      className="flex flex-col items-center justify-center min-w-[60px] min-h-[48px]"
    >
      <div className={cn(
        "flex flex-col items-center transition-colors",
        isActive ? "text-primary" : "text-subtle-text"
      )}>
        {icon}
        <span className="text-[10px] font-medium mt-1">{label}</span>
      </div>
    </Link>
  );
};

export default Footer;
