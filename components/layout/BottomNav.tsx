'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Heart, PlusCircle, MessageSquare, User } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Anasayfa', path: '/', icon: Home },
    { name: 'Favoriler', path: '/favoriler', icon: Heart },
    { name: 'İlan Ver', path: '/ilan-ver', icon: PlusCircle },
    { name: 'Mesajlar', path: '/mesajlar', icon: MessageSquare },
    { name: 'Hesabım', path: '/profil', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-50 md:hidden pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.path;
        
        return (
          <Link 
            key={item.path} 
            href={item.path} 
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              isActive ? 'text-yellow-500' : 'text-gray-500 hover:text-yellow-500'
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}