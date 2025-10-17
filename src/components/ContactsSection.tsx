import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import './ContactsSection.scss';

const ContactsSection = () => {
  const openMaps = () => {
    window.open('https://goo.gl/maps/kyiv-peremohy-123', '_blank');
  };

  return (
    <section className='py-20 bg-white' id='contacts'>
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
            <div className='bg-surface-light rounded-xl p-4 h-96 flex items-center justify-center widthNew'>
              <div className='text-center'>
                <img className='imagesPc' src='/assets/map_dsctp.jpg' />
                <img className='imagesPhone' src='/assets/map_mob.jpg' />
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
                      вулиця Вацлава Гавела, 4 (на території БЦ Silver Cetre)
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

            <Card className='border-0 shadow-card' id='contactsMap'>
              <CardContent className='p-6'>
                <div className='flex items-start gap-4'>
                  <div className='w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center shrink-0'>
                    <Clock className='h-6 w-6 text-white' />
                  </div>
                  <div>
                    <h3 className='font-bold text-text-dark text-lg mb-2'>Графік роботи</h3>
                    <div className='space-y-1 text-text-light'>
                      <p>Понеділок - П'ятниця: 9:00 - 20:00</p>
                      <p>Субота - Неділя: 10:00 - 20:00</p>
                      {/* <p>: вихідний</p> */}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className='text-center mb-16 margTopTitle'>
          <h2 className='text-4xl md:text-5xl font-bold text-text-dark mb-6'>Прокласти маршрут</h2>
        </div>
        <div className='mapsButtonBlock'>
          <div className='mapsWidth'>
            <a
              href='https://maps.app.goo.gl/nP31FeEo1LcMjvdH6'
              target='_blank'
              className='buttonMaps google'>
              Google <img src='assets/google-maps.png' /> Maps
            </a>
            <a
              href='https://ul.waze.com/ul?place=ChIJ5QYl2XnN1EARIZOki0GUuAI&ll=50.44758200%2C30.43042170&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location'
              target='_blank'
              className='buttonMaps waze'>
              <img src='assets/waze.png' />
              Waze
            </a>
          </div>
        </div>
        <div className='w-full aspect-video mx-auto videoNew'>
          <video
            className='w-full h-full rounded-lg object-cover'
            controls
            preload='metadata'
            poster='assets/сто.jpg'>
            <source src='assets/stoMini.mp4' type='video/mp4' />
            Ваш браузер не поддерживает видео.
          </video>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
