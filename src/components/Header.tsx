import { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DiscountBlock from './DiscountBlock';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-soft'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex items-center'>
            <div className='text-2xl font-bold text-brand-blue'>ChekCar</div>
          </div>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            <button
              onClick={() => scrollToSection('hero')}
              className='text-text-dark hover:text-brand-blue transition-colors'>
              Головна
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className='text-text-dark hover:text-brand-blue transition-colors'>
              Послуги
            </button>
            <button
              onClick={() => scrollToSection('diagnostics')}
              className='text-text-dark hover:text-brand-blue transition-colors'>
              Діагностика
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className='text-text-dark hover:text-brand-blue transition-colors'>
              Відгуки
            </button>
            <button
              onClick={() => scrollToSection('booking')}
              className='text-text-dark hover:text-brand-blue transition-colors'>
              Запис
            </button>
            <button
              onClick={() => scrollToSection('contacts')}
              className='text-text-dark hover:text-brand-blue transition-colors'>
              Контакти
            </button>
          </nav>

          {/* Contact Info & CTA */}
          <div className='hidden lg:flex items-center space-x-4'>
            <div className='flex items-center text-sm text-text-light'>
              <Phone className='h-4 w-4 mr-1' />
              <a href='tel:+380936430070'>+38 (093) 643-00-70</a>
            </div>
            <Button
              onClick={() => scrollToSection('booking')}
              className='bg-gradient-hero hover:opacity-90'>
              Записатися
            </Button>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='md:hidden p-2'>
            {isMenuOpen ? (
              <X className='h-6 w-6 text-text-dark' />
            ) : (
              <Menu className='h-6 w-6 text-text-dark' />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className='md:hidden py-4 border-t border-border'>
            <nav className='flex flex-col space-y-4'>
              <button
                onClick={() => scrollToSection('hero')}
                className='text-left text-text-dark hover:text-brand-blue transition-colors'>
                Головна
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className='text-left text-text-dark hover:text-brand-blue transition-colors'>
                Послуги
              </button>
              <button
                onClick={() => scrollToSection('diagnostics')}
                className='text-left text-text-dark hover:text-brand-blue transition-colors'>
                Діагностика
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className='text-left text-text-dark hover:text-brand-blue transition-colors'>
                Відгуки
              </button>
              <button
                onClick={() => scrollToSection('booking')}
                className='text-left text-text-dark hover:text-brand-blue transition-colors'>
                Запис
              </button>
              <button
                onClick={() => scrollToSection('contacts')}
                className='text-left text-text-dark hover:text-brand-blue transition-colors'>
                Контакти
              </button>
              <div className='pt-4 border-t border-border'>
                <div className='flex items-center text-sm text-text-light mb-3'>
                  <Phone className='h-4 w-4 mr-1' />
                  <a href='tel:+380936430070'>+38 (093) 643-00-70</a>
                </div>
                <Button
                  onClick={() => scrollToSection('booking')}
                  className='w-full bg-gradient-hero hover:opacity-90'>
                  Записатися
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
      <DiscountBlock right='right' />
    </header>
  );
};

export default Header;
