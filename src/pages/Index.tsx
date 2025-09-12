import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import DiagnosticsSection from '@/components/DiagnosticsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import BookingSection from '@/components/BookingSection';
import ContactsSection from '@/components/ContactsSection';
import Footer from '@/components/Footer';
import Galerry from '@/components/Galerry';

const Index = () => {
  return (
    <>
      <Header />
      <main className='min-h-screen pt-16'>
        <HeroSection />
        <ServicesSection />
        <DiagnosticsSection />
        <TestimonialsSection />
        <Galerry />
        <BookingSection />
        <ContactsSection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
