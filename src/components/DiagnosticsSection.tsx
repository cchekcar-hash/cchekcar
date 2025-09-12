import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Stethoscope, Eye, Settings, TestTube, Wrench, Camera, Gauge } from "lucide-react";

const diagnosticServices = [
  {
    icon: Stethoscope,
    title: "Комп'ютерна діагностика",
    description: "Повна перевірка електронних систем автомобіля",
    price: "від 500 грн"
  },
  {
    icon: Eye,
    title: "Перевірка лакофарбового покриття",
    description: "Виявлення шпаклівки, перефарбування та ДТП",
    price: "від 800 грн"
  },
  {
    icon: Gauge,
    title: "Перевірка компресії ДВЗ",
    description: "Діагностика стану циліндро-поршневої групи",
    price: "від 300 грн за циліндр"
  },
  {
    icon: Camera,
    title: "Ендоскопія двигуна",
    description: "Внутрішній огляд двигуна без розбирання",
    price: "від 500 грн за циліндр"
  },
  {
    icon: TestTube,
    title: "Перевірка газів в охолоджуючій рідині",
    description: "Діагностика пробою прокладки головки блоку",
    price: "від 1200 грн"
  },
  {
    icon: Wrench,
    title: "Діагностика ходової",
    description: "Повна перевірка підвіски та рульового управління",
    price: "від 500 грн"
  },
  {
    icon: Search,
    title: "Візуальний огляд двигуна",
    description: "Зовнішня діагностика стану двигуна і навісного обладнання",
    price: "від 500 грн"
  }
];

const DiagnosticsSection = () => {
  return (
    <section id="diagnostics" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-6">
            Діагностика перед покупкою авто
          </h2>
          <p className="text-xl text-text-light max-w-3xl mx-auto">
            Професійна діагностика допоможе виявити приховані дефекти та уникнути дорогих ремонтів у майбутньому
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diagnosticServices.map((service, index) => (
            <Card key={index} className="group hover:shadow-card transition-all duration-300 hover:scale-105 border-0 shadow-soft">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-accent rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-text-dark">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-text-light mb-4 text-base">
                  {service.description}
                </CardDescription>
                <div className="text-2xl font-bold text-brand-orange">
                  {service.price}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-text-light mb-6">
            Комплексна діагностика - найкращий спосіб переконатися у справності автомобіля перед покупкою
          </p>
          <button 
            className="text-brand-blue hover:text-brand-blue-dark font-semibold text-lg underline decoration-2 underline-offset-4 hover:decoration-brand-blue-dark transition-colors"
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Замовити діагностику →
          </button>
        </div>
      </div>
    </section>
  );
};

export default DiagnosticsSection;