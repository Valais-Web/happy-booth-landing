import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

export const LanguageSwitcher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isEnglishPage = location.pathname === '/en';
  
  const switchLanguage = () => {
    if (isEnglishPage) {
      navigate('/');
    } else {
      navigate('/en');
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 mb-4">
      <Button
        variant={!isEnglishPage ? "default" : "ghost"}
        size="sm"
        onClick={switchLanguage}
        className={`text-sm ${!isEnglishPage ? 'text-black' : 'text-white/80 hover:text-white'}`}
      >
        Français
      </Button>
      <span className="text-white/40">|</span>
      <Button
        variant={isEnglishPage ? "default" : "ghost"}
        size="sm"
        onClick={switchLanguage}
        className={`text-sm ${isEnglishPage ? 'text-black' : 'text-white/80 hover:text-white'}`}
      >
        English
      </Button>
    </div>
  );
};