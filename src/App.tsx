import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { HomePage, ServicePage } from './demo/pages';
import NotFound from './pages/NotFound';
import { useEffect } from 'react';
import { pixelPageView } from './pixels';

const queryClient = new QueryClient();

// Restores the scroll position when going back, scrolls to top (or #hash) on a new page
const positions = new Map<string, number>();

function ScrollManager() {
  const { key, pathname, hash } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    pixelPageView();
  }, [pathname]);

  useEffect(() => {
    const save = () => positions.set(key, window.scrollY);
    window.addEventListener('scroll', save, { passive: true });
    return () => window.removeEventListener('scroll', save);
  }, [key]);

  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    requestAnimationFrame(() => {
      if (navType === 'POP' && positions.has(key)) window.scrollTo(0, positions.get(key)!);
      else if (target) target.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo(0, 0);
    });
  }, [key, pathname, hash, navType]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollManager />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/ru' element={<HomePage />} />
          <Route path='/ru/:slug' element={<ServicePage />} />
          <Route path='/:slug' element={<ServicePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
