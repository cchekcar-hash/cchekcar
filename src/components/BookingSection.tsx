import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Phone, User } from 'lucide-react';
import axios from 'axios';

const services = [
  'Діагностика автомобіля',
  'Діагностика перед покупкою',
  'Планове ТО',
  'Підбір запчастин',
  'Ремонт ходової',
  'Ремонт двигуна',
  'Ремонт гальмівної системи',
  'Ремонт рульової групи',
  'Ремонт трансмісійної групи',
  'Ремонт паливної системи',
  'Реставрація та ремонт турбін',
  'Ремонт коробки передач та зчеплення',
  'Заміна мастил, фільтрів роботизованих КПП',
  'Заміна мастил, фільтрів DSG та Power Shift',
  'Заміна витратних матеріалів та компонентів',
  'Детейлінг',
];

const BookingSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    car: '',
    service: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({ name: '', phone: '', car: '', service: '' });

  // ✅ более универсальная валидация телефона
  // принимает номера начиная с + и 10–13 цифр (например: +380990915435, 0990915435)
  const validatePhone = (phone) => {
    const phoneRegex = /^\+?\d{10,13}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors = { name: '', phone: '', car: '', service: '' };
    let isValid = true;

    if (formData.name.length < 2) {
      newErrors.name = "Ім'я має містити принаймні 2 символи";
      isValid = false;
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Введіть коректний номер телефону (наприклад +380990915435 або 0990915435)';
      isValid = false;
    }

    if (formData.car.length < 2) {
      newErrors.car = 'Марка/модель має містити принаймні 2 символи';
      isValid = false;
    }

    if (!formData.service) {
      newErrors.service = 'Оберіть послугу';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (field, value) => {
    if (field === 'phone') {
      // Разрешаем только цифры и + в начале
      value = value.replace(/(?!^\+)[^\d]/g, '').slice(0, 13);
    }

    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage('');

    try {
      const message = `
      Новий запис на сервіс:

      👤 Ім'я: ${formData.name}
      📱 Телефон: ${formData.phone}
      🚗 Автомобіль: ${formData.car}
      ⚙️ Послуга: ${formData.service}
    `;

      const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;

      if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        throw new Error('Telegram Bot Token або Chat ID не налаштовані в .env');
      }

      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

      await axios.post(telegramUrl, {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      });

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'booking_form_submit', service: formData.service });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'booking_form_submit', { service: formData.service });
      }

      setSuccessMessage("Дякуємо, що відправили заявку! Ми зв'яжемося з вами найближчим часом.");
      setFormData({ name: '', phone: '', car: '', service: '' });
      setErrors({ name: '', phone: '', car: '', service: '' });
    } catch (error) {
      console.error('Помилка відправки даних:', error);
      alert('Виникла помилка при відправці даних. Спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id='booking' className='py-20 bg-gradient-to-br from-surface-light to-surface-neutral'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-text-dark mb-6'>Онлайн-запис</h2>
          <p className='text-xl text-text-light max-w-3xl mx-auto'>
            Забронюйте зручний час для обслуговування вашого автомобіля
          </p>
        </div>

        <div className='max-w-2xl mx-auto'>
          <Card className='border-0 shadow-card'>
            <CardHeader className='text-center bg-gradient-hero text-white rounded-t-lg'>
              <CardTitle className='text-2xl font-bold'>Записатися на сервіс</CardTitle>
              <CardDescription className='text-white/90'>
                Заповніть форму і ми зв'яжемося з вами для підтвердження
              </CardDescription>
            </CardHeader>
            <CardContent className='p-8'>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div className='space-y-2'>
                    <Label
                      htmlFor='name'
                      className='text-text-dark font-semibold flex items-center gap-2'>
                      <User className='h-4 w-4' />
                      Ім'я *
                    </Label>
                    <Input
                      id='name'
                      placeholder="Введіть ваше ім'я"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                      minLength={2}
                      className='border-2 border-border focus:border-brand-blue'
                    />
                    {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
                  </div>

                  <div className='space-y-2'>
                    <Label
                      htmlFor='phone'
                      className='text-text-dark font-semibold flex items-center gap-2'>
                      <Phone className='h-4 w-4' />
                      Телефон *
                    </Label>
                    <Input
                      id='phone'
                      type='tel'
                      placeholder='+380992315965'
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required
                      className='border-2 border-border focus:border-brand-blue'
                    />
                    {errors.phone && <p className='text-red-500 text-sm'>{errors.phone}</p>}
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='car' className='text-text-dark font-semibold'>
                    Марка/модель автомобіля *
                  </Label>
                  <Input
                    id='car'
                    placeholder='Наприклад: Toyota Camry 2018'
                    value={formData.car}
                    onChange={(e) => handleInputChange('car', e.target.value)}
                    required
                    minLength={2}
                    className='border-2 border-border focus:border-brand-blue'
                  />
                  {errors.car && <p className='text-red-500 text-sm'>{errors.car}</p>}
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='service' className='text-text-dark font-semibold'>
                    Послуга *
                  </Label>
                  <Select
                    onValueChange={(value) => handleInputChange('service', value)}
                    value={formData.service}
                    required>
                    <SelectTrigger className='border-2 border-border focus:border-brand-blue'>
                      <SelectValue placeholder='Оберіть послугу' />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service, index) => (
                        <SelectItem key={index} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.service && <p className='text-red-500 text-sm'>{errors.service}</p>}
                </div>

                <div className='space-y-4'>
                  <Button
                    type='submit'
                    variant='hero'
                    size='lg'
                    className='w-full text-lg py-6'
                    disabled={isSubmitting}>
                    {isSubmitting ? 'Відправка...' : 'Записатися'}
                  </Button>
                  {successMessage && (
                    <p className='text-left text-brand-blue text-lg'>{successMessage}</p>
                  )}
                </div>
              </form>

              <div className='mt-8 p-6 bg-surface-light rounded-xl'>
                <div className='flex items-center gap-2 text-text-dark font-semibold mb-2'>
                  <Clock className='h-5 w-5 text-brand-blue' />
                  Що далі?
                </div>
                <p className='text-text-light'>
                  Після отримання заявки наш менеджер зв'яжеться з вами протягом 15 хвилин для
                  підтвердження запису та уточнення деталей.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
