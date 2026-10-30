import { BrowserRouter, Navigate, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { HomePage, PrivacyPage, ServicePage } from './demo/pages';
import { useEffect } from 'react';
import { pixelPageView } from './pixels';

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

export const AppRoutes = () => (
  <>
    <ScrollManager />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/ru' element={<HomePage />} />
      <Route path='/privacy' element={<PrivacyPage />} />
      <Route path='/ru/privacy' element={<PrivacyPage />} />
      <Route path='/ru/:slug' element={<ServicePage />} />
      <Route path='/:slug' element={<ServicePage />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  </>
);

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
