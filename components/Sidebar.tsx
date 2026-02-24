
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAVIGATION } from '../constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  return (
    <aside className={`
      relative bg-white border-r border-slate-200 transition-all duration-300 flex flex-col h-screen
      ${isOpen ? 'w-64' : 'w-20'}
    `}>
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
        <div className={`flex items-center gap-3 ${!isOpen && 'hidden'}`}>
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">CD</span>
          </div>
          <span className="font-bold text-slate-800 text-sm whitespace-nowrap">CONECTA DELIVERY</span>
        </div>
        {!isOpen && (
           <div className="w-full flex justify-center">
             <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">CD</span>
             </div>
           </div>
        )}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-20 bg-white border border-slate-200 rounded-full p-1 shadow-sm hover:bg-slate-50 transition-colors z-10"
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto overflow-x-hidden">
        {NAVIGATION.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-3 py-2 rounded-lg transition-all duration-200
              ${isActive 
                ? 'bg-blue-50 text-blue-600 font-semibold' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
            `}
          >
            <item.icon size={20} className="shrink-0" />
            <span className={`whitespace-nowrap ${!isOpen && 'opacity-0 w-0'}`}>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={`p-6 border-t border-slate-200 ${!isOpen && 'hidden'}`}>
        <div className="bg-blue-600 rounded-xl p-4 text-white">
          <p className="text-xs font-medium opacity-80 mb-1">PLANO PRO</p>
          <p className="text-sm font-bold mb-3">Upgrade para Enterprise</p>
          <button className="w-full py-2 bg-white text-blue-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors">
            Saiba Mais
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
