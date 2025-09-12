import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Іван",
    car: "Volkswagen Passat",
    rating: 5,
    text: "Дуже вдячний ChekCar за швидкий і якісний ремонт. Виявили і усунули проблему за один візит. Рекомендую!",
    avatar: "👨‍💼"
  },
  {
    name: "Олена",
    car: "Kia Sorento",
    rating: 5,
    text: "Чудовий сервіс! Майстри все пояснили і показали старі деталі. Тепер обслуговую всі сімейні авто тільки тут.",
    avatar: "👩‍💼"
  },
  {
    name: "Сергій",
    car: "BMW X5",
    rating: 5,
    text: "Професійний підхід до справи. Діагностика виявила приховані проблеми, які в інших сервісах не помітили. Дякую!",
    avatar: "👨‍🔧"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
            Відгуки клієнтів
          </h2>
          <p className="text-xl text-text-light max-w-3xl mx-auto">
            Понад 1000 задоволених клієнтів довіряють нам свої автомобілі
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-card hover:shadow-soft transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-brand-orange text-brand-orange" />
                  ))}
                </div>
                
                <blockquote className="text-text-dark text-lg mb-6 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-text-dark">
                      {testimonial.name}
                    </div>
                    <div className="text-text-light">
                      {testimonial.car}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-surface-light rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-text-dark mb-4">
              Гарантія якості 12 місяців
            </h3>
            <p className="text-text-light">
              На всі виконані роботи та встановлені запчастини ми надаємо офіційну гарантію. 
              Ваш спокій – наш пріоритет!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;