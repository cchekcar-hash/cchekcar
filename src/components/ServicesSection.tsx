import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Settings, Thermometer, Target, Stethoscope, CircleDot, Car } from 'lucide-react';

const services = [
  {
    icon: Wrench,
    title: 'Заміна моторної оливи',
    description: 'Повна заміна масла + фільтра за 30 хвилин',
    price: 'від 600 грн',
  },
  {
    icon: Stethoscope,
    title: "Комп'ютерна діагностика",
    description: 'Перевірка 50+ пунктів вашого авто',
    price: 'від 900 грн',
  },
  {
    icon: Settings,
    title: 'Заміна гальмівних колодок',
    description: 'Повна заміна з перевіркою гальмівної системи',
    price: 'від 1200 грн',
  },
  {
    icon: Settings,
    title: 'Ремонт двигуна',
    description: 'Повний ремонт двигуна з діагностикою та гарантією',
    price: 'від 40000 грн',
  },
  {
    icon: Target,
    title: 'Ремонт коробки передач',
    description: 'Ремонт механічних та автоматичних коробок передач',
    price: 'від 14000 грн',
  },
  {
    icon: Car,
    title: 'Комплексна діагностика',
    description: 'Повна перевірка всіх систем автомобіля',
    price: 'від 1800 грн',
  },
  {
    icon: CircleDot,
    title: 'Шиномонтаж',
    description: 'Заміна, балансування, ремонт коліс',
    price: 'від 400 грн',
  },
];

const ServicesSection = () => {
  return (
    <section id='services' className='py-20 bg-surface-light'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-text-dark mb-6'>Наші послуги</h2>
          <p className='text-xl text-text-light max-w-3xl mx-auto'>
            Професійне обслуговування автомобілів будь-якої марки з використанням сучасного
            обладнання та оригінальних запчастин
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service, index) => (
            <Card
              key={index}
              className='group hover:shadow-card transition-all duration-300 hover:scale-105 border-0 shadow-soft'>
              <CardHeader className='text-center pb-4'>
                <div className='w-16 h-16 mx-auto mb-4 bg-gradient-hero rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                  <service.icon className='h-8 w-8 text-white' />
                </div>
                <CardTitle className='text-xl font-bold text-text-dark'>{service.title}</CardTitle>
              </CardHeader>
              <CardContent className='text-center'>
                <CardDescription className='text-text-light mb-4 text-base'>
                  {service.description}
                </CardDescription>
                <div className='text-2xl font-bold text-brand-orange'>{service.price}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className='text-center mt-12'>
          <p className='text-text-light mb-6'>
            Не знайшли потрібну послугу? Зв'яжіться з нами – ми обслуговуємо автомобілі будь-якої
            складності!
          </p>
          <button
            className='text-brand-blue hover:text-brand-blue-dark font-semibold text-lg underline decoration-2 underline-offset-4 hover:decoration-brand-blue-dark transition-colors'
            onClick={() =>
              document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
            }>
            Записатися на консультацію →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
