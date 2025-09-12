import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-bg.jpg';
import './HeroSection.scss';

const HeroSection = () => {
  return (
    <section
      id='hero'
      className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Background Image */}
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: `url(${heroImage})` }}>
        <div className='absolute inset-0 bg-gradient-to-r from-brand-blue/90 to-brand-blue/70'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <div className='bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-card'>
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-text-dark mb-6 leading-tight'>
            <span className='text-brand-blue'>ChekCar</span> – ваш надійний автосервіс у Києві
          </h1>

          <p className='text-xl md:text-2xl text-text-light mb-8 max-w-4xl mx-auto'>
            Обслуговування авто будь-якої марки з гарантією 12 місяців
          </p>

          {/* Special Offer Banner */}
          <div className='bg-gradient-accent rounded-xl p-6 mb-8 text-white displayNone'>
            <h2 className='text-2xl md:text-3xl font-bold mb-2'>
              🔥 -15% на перший візит для нових клієнтів до кінця місяця!
            </h2>
            <p className='text-lg opacity-90'>
              Знижка діє на всі види послуг при першому відвідуванні
            </p>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Button
              variant='hero'
              size='xl'
              className='text-xl px-12 py-6'
              onClick={() =>
                document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
              }>
              Записатися зараз
            </Button>
            <Button
              variant='outline'
              size='xl'
              className='text-xl px-12 py-6 border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white'
              onClick={() =>
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
              }>
              Наші послуги
            </Button>
          </div>

          <p className='text-xl md:text-2xl text-text-light mb-8 max-w-4xl mx-auto textBottom'>
            Ваш надійний автосервіс у Києві. Обслуговування авто будь-якої марки з гарантією 12
            місяців.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
