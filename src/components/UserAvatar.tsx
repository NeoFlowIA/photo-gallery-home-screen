
import React from "react";
import { User } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
  user: {
    name: string;
    avatarUrl?: string;
  };
  size?: number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = 40 }) => {
  return (
    <Avatar 
      className="cursor-pointer hover:ring-2 hover:ring-accent transition-all" 
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <AvatarImage src={user.avatarUrl} alt={user.name} />
      <AvatarFallback className="bg-light border border-accent">
        <User className="text-dark" size={size > 40 ? 24 : 20} />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
