import { Card, CardContent } from '@/components/ui/card';
import { BadgeCheck, Eye, FileText, PackageCheck, Ban, Wrench } from 'lucide-react';

const reasons = [
  {
    icon: BadgeCheck,
    title: 'Точна ціна до початку робіт',
    text: 'Називаємо вартість ремонту до того, як почнемо роботу.',
  },
  {
    icon: Eye,
    title: 'Показуємо несправність наочно',
    text: 'Показуємо, що саме зламалося, на вашому авто.',
  },
  {
    icon: PackageCheck,
    title: 'Повертаємо старі запчастини',
    text: 'Старі деталі віддаємо вам, щоб ви бачили, що саме змінили.',
  },
  {
    icon: Ban,
    title: 'Без зайвих робіт',
    text: 'Робимо тільки те, що справді потрібно вашому авто.',
  },
  {
    icon: FileText,
    title: 'Документи на роботи',
    text: 'Надаємо документи на всі виконані роботи.',
  },
  {
    icon: Wrench,
    title: 'Двигуни BMW – наш профіль',
    text: 'Ремонт двигунів, ендоскопія, розточка блоку циліндрів, ремонт ГБЦ.',
  },
];

const TestimonialsSection = () => {
  return (
    <section className='py-20 bg-white' id='feedbacks'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-text-dark mb-6'>Чому обирають ChekCar</h2>
          <p className='text-xl text-text-light max-w-3xl mx-auto'>
            Чесний підхід до ремонту: ви знаєте, що робимо, скільки це коштує і що змінили
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className='border-0 shadow-card hover:shadow-soft transition-all duration-300'>
              <CardContent className='p-8'>
                <div className='w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center mb-4'>
                  <reason.icon className='h-6 w-6 text-white' />
                </div>
                <div className='text-xl font-bold text-text-dark mb-2'>{reason.title}</div>
                <p className='text-text-light text-lg leading-relaxed'>{reason.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
