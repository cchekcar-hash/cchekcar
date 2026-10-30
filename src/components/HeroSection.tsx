import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-bg.jpg';
import './HeroSection.scss';
import { ArrowUp, Clock, MapPin, PhoneCall, Shield, Sparkles } from 'lucide-react';

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
        <div className='bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-card paddingSmall'>
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-text-dark mb-6 leading-tight'>
            <span className='text-brand-blue'>ChekCar</span> – ваш надійний автосервіс у Києві
          </h1>

          {/* <ul className='listNew'>
            <li>
              <Sparkles className='iconlist' />
              1500+ позитивних відгуків
            </li>
            <li>
              <Clock className='iconlist' />
              Витрачайте годину часу, а не день
            </li>
            <li>
              <Shield className='iconlist' />
              Гарантія на роботи
            </li>
          </ul> */}

          <p className='text-xl md:text-2xl text-text-light mb-8 max-w-4xl mx-auto margTopText margTopBottomNone'>
            Діагностика та ремонт авто будь-якої марки.{' '}
            <strong>Точна ціна до початку робіт.</strong>
          </p>
          <p className='text-xl md:text-2xl text-text-light mb-8 max-w-4xl mx-auto margTopText smallText'>
            Потрібен ремонт авто, дзвони нам!
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center flexWrap'>
            <a href='tel:+380936430070'>
              <Button variant='hero' size='xl' className='text-xl px-12 py-6 buttonHeroWidth'>
                <PhoneCall className='newIconCall' />
                Записатися зараз
              </Button>
            </a>
            {/*  <Button
                variant='hero'
                size='xl'
                className='text-xl px-12 py-6 buttonHeroWidth'
                onClick={() =>
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
                }>
                <PhoneCall className='newIconCall' />
                Записатися зараз
              </Button> */}
            {/* <Button
              variant='outline'
              size='xl'
              className='text-xl px-12 py-6 border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white'
              onClick={() =>
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
              }>
              Наші послуги
            </Button> */}
            {/* <button
              className='text-xl px-12 py-6 border-2 border-brand-blue text-brand-blue  hover:text-white buttonDownSprint'
              onClick={() =>
                document.getElementById('contactsMap')?.scrollIntoView({ behavior: 'smooth' })
              }>
              Як доїхати?
            </button> */}
          </div>

          <div className='textBlockBottom'>
            {/* <h3 className='text-xl md:text-2xl text-text-light mb-8 max-w-4xl mx-auto textBottom'>
              Гарантія якості 12 місяців
            </h3>
            <p className='text-xl md:text-2xl text-text-light mb-8 max-w-4xl mx-auto margTopTextBottom'>
              На всі виконані роботи у разі використання запчастин від наших постачальників. Ваш
              спокій – наш пріоритет!
            </p> */}
            <MapPin className='h-6 w-6 text-white iconChange' />
            <p
              className='textChange'
              onClick={() =>
                document.getElementById('contactsMap')?.scrollIntoView({ behavior: 'smooth' })
              }>
              бульвар Вацлава Гавела, 4 (на території БЦ Silver Centre) Київ, Україна
            </p>
          </div>
        </div>
      </div>
      <div
        className='buttonMoveUpBlock'
        onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}>
        <button className='buttonMoveUp'>
          <ArrowUp className='buttonMoveUpIcon d' />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
