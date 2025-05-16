
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavigationCardProps {
  icon: React.ReactNode;
  title: string;
  to: string;
  className?: string;
}

const NavigationCard: React.FC<NavigationCardProps> = ({ 
  icon, 
  title, 
  to,
  className 
}) => {
  return (
    <Link 
      to={to}
      className={cn(
        "nav-card animate-scale-in min-h-[120px]",
        className
      )}
    >
      <div className="mb-3">{icon}</div>
      <span className="button-text text-center">{title}</span>
    </Link>
  );
};

export default NavigationCard;
