import { useLocation, Link } from 'react-router-dom';

export const LanguageSwitcher = () => {
  const location = useLocation();
  const isEnglish = location.pathname === '/en';

  return (
    <div className="flex items-center space-x-2 text-sm text-white/60">
      <Link 
        to="/"
        className={`hover:text-white transition-colors ${!isEnglish ? 'text-white font-medium' : ''}`}
      >
        FR
      </Link>
      <span>|</span>
      <Link 
        to="/en"
        className={`hover:text-white transition-colors ${isEnglish ? 'text-white font-medium' : ''}`}
      >
        EN
      </Link>
    </div>
  );
};