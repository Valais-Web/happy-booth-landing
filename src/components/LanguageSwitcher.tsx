import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface LanguageSwitcherProps {
  currentLanguage: string;
}

const LanguageSwitcher = ({ currentLanguage }: LanguageSwitcherProps) => {
  const navigate = useNavigate();
  
  const switchLanguage = (lang: string) => {
    if (lang === 'fr') {
      navigate('/fr');
    } else {
      navigate('/en');
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <div className="flex space-x-1">
        <Button
          variant={currentLanguage === 'fr' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => switchLanguage('fr')}
          className="text-xs px-2 py-1 h-auto"
        >
          FR
        </Button>
        <Button
          variant={currentLanguage === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => switchLanguage('en')}
          className="text-xs px-2 py-1 h-auto"
        >
          EN
        </Button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;