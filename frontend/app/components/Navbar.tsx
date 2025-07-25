// components/Navbar.tsx
'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const t = useTranslations('Navbar');

  return (
    <nav className="bg-white p-4 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/HomePage/logo.png" alt="Logo" className="h-8" />
        </div>
        <div className="flex space-x-8">
          <Link href="/home" className="text-gray-600 hover:text-orange-500">
            {t('home')}
          </Link>
          <Link href="/modules" className="text-gray-600 hover:text-orange-500">
            {t('modules')}
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-orange-500">
            {t('about')}
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-orange-500">
            {t('contact')}
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <Link href="/login" className="text-gray-600 hover:text-orange-500">
            {t('login')}
          </Link>
          <Link href="/register" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            {t('signup')}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
