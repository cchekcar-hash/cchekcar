import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

const ContactsSection = () => {
  const openMaps = () => {
    window.open('https://goo.gl/maps/kyiv-peremohy-123', '_blank');
  };

  return (
    <section className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-text-dark mb-6'>
            Контакти та розташування
          </h2>
          <p className='text-xl text-text-light max-w-3xl mx-auto'>
            Знайдіть нас у зручному місці в центрі Києва
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Map */}
          <div className='order-2 lg:order-1'>
            <div className='bg-surface-light rounded-xl p-4 h-96 flex items-center justify-center'>
              <div className='text-center'>
                <MapPin className='h-16 w-16 text-brand-blue mx-auto mb-4' />
                <h3 className='text-xl font-bold text-text-dark mb-2'>Інтерактивна карта</h3>
                <p className='text-text-light mb-4'>
                  ChekCar Автосервіс
                  <br />
                  проспект Перемоги, 123
                  <br />
                  Київ, Україна
                </p>
                <Button variant='hero' onClick={openMaps}>
                  <Navigation className='h-4 w-4 mr-2' />
                  Прокласти маршрут
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className='order-1 lg:order-2 space-y-6'>
            <Card className='border-0 shadow-card'>
              <CardContent className='p-6'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center shrink-0'>
                    <MapPin className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h3 className='font-bold text-text-dark text-lg mb-2'>Адреса</h3>
                    <p className='text-text-light'>
                      вулиця Вацлава Гавела, 4 (на території БЦ)
                      <br />
                      Київ, Україна
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='border-0 shadow-card'>
              <CardContent className='p-6'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center shrink-0'>
                    <Phone className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h3 className='font-bold text-text-dark text-lg mb-2'>Телефони</h3>
                    <div className='space-y-1'>
                      <p className='text-text-light'>
                        <a
                          href='tel:+380936430070'
                          className='hover:text-brand-blue transition-colors'>
                          +38 (093) 643-00-70
                        </a>
                      </p>
                      {/* <p className='text-text-light'>
                        <a
                          href='tel:+380671234567'
                          className='hover:text-brand-blue transition-colors'>
                          +38 (067) 123-45-67
                        </a>
                      </p> */}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className='border-0 shadow-card'>
              <CardContent className='p-6'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center shrink-0'>
                    <Clock className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h3 className='font-bold text-text-dark text-lg mb-2'>Графік роботи</h3>
                    <div className='space-y-1 text-text-light'>
                      <p>Понеділок - П'ятниця: 09:00 - 19:00</p>
                      <p>Субота: за домовленістю</p>
                      <p>Неділя: вихідний</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
