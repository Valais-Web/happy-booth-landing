import { Link, useLocation } from "react-router-dom";
import { Globe } from "lucide-react";

export const LanguageSwitcher = () => {
  const location = useLocation();
  const isEnglish = location.pathname === '/en';

  return (
    <div className="flex items-center space-x-2 text-sm">
      <Globe className="w-4 h-4 text-white/60" />
      <div className="flex items-center space-x-1">
        <Link
          to="/"
          className={`px-2 py-1 rounded transition-colors ${
            !isEnglish 
              ? 'text-white font-medium' 
              : 'text-white/60 hover:text-white/80'
          }`}
        >
          FR
        </Link>
        <span className="text-white/40">|</span>
        <Link
          to="/en"
          className={`px-2 py-1 rounded transition-colors ${
            isEnglish 
              ? 'text-white font-medium' 
              : 'text-white/60 hover:text-white/80'
          }`}
        >
          EN
        </Link>
      </div>
    </div>
  );
};