import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Toast } from '@/components/ui/Toast';
import { AuthModal } from '@/components/auth/AuthModal';
import { KostDetailModal } from '@/components/kost/KostDetailModal';
import { PaymentFlow } from '@/components/payment/PaymentFlow';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

// Public Pages
import { HomePage } from '@/components/pages/HomePage';
import { PromoPage } from '@/components/pages/PromoPage';
import { HelpPage } from '@/components/pages/HelpPage';
import { AboutPage } from '@/components/pages/AboutPage';
import { StrategicEcosystemPage } from '@/components/pages/StrategicEcosystemPage';

// App Pages (Protected)
import { FavoritesPage } from '@/components/pages/FavoritesPage';
import { OrdersPage } from '@/components/pages/OrdersPage';
import { AdminDashboard } from '@/components/pages/AdminDashboard';
import { ProfileSettingsPage } from '@/components/settings/ProfileSettingsPage';

import { useStore } from '@/store/useStore';
import type { Kost, PaymentOptionType } from '@/types';

export function App() {
  const { currentRoute, currentUser, initiateTransaction, activeTransaction, showToast, setRoute } = useStore();
  
  // Modal states
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedKost, setSelectedKost] = useState<Kost | null>(null);
  const [kostDetailOpen, setKostDetailOpen] = useState(false);
  const [paymentFlowOpen, setPaymentFlowOpen] = useState(false);
  
  // Handle opening kost detail
  const handleOpenKostDetail = (kost: Kost) => {
    setSelectedKost(kost);
    setKostDetailOpen(true);
  };
  
  // Handle proceeding to payment
  const handleProceedToPayment = (months: number, startDate: string, paymentOption: PaymentOptionType) => {
    if (!currentUser) {
      showToast('Please sign in to continue with booking.', 'info');
      setAuthModalOpen(true);
      return;
    }
    
    if (!selectedKost) return;
    
    const transaction = initiateTransaction({
      kostId: selectedKost.id,
      months,
      startDate,
      paymentOption
    });
    
    if (transaction) {
      setKostDetailOpen(false);
      setPaymentFlowOpen(true);
    } else {
      showToast('Failed to initiate transaction. Please try again.', 'error');
    }
  };
  
  const handlePaymentFlowClose = () => {
    setPaymentFlowOpen(false);
    setSelectedKost(null);
  };
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const { fetchKostsFromAPI } = useStore.getState();
    fetchKostsFromAPI();
  }, [currentRoute]);

  // Determine Layout Strategy
  const isPublicRoute = ['home', 'promo', 'help', 'about', 'blog', 'partner', 'search', 'strategic-ecosystem'].includes(currentRoute);
  
  const renderContent = () => {
    switch (currentRoute) {
      // Public Routes
      case 'home':
      case 'search':
        return <HomePage onOpenKostDetail={handleOpenKostDetail} />;
      case 'promo':
        return <PromoPage onOpenKostDetail={handleOpenKostDetail} />;
      case 'help':
        return <HelpPage />;
      case 'about':
        return <AboutPage />;
      case 'career':
        return <AboutPage type="career" />;
      case 'blog':
        return <AboutPage type="blog" />;
      case 'partner':
        return <AboutPage type="partner" />;
      case 'strategic-ecosystem':
        return <StrategicEcosystemPage />;

      // Protected Routes
      case 'favorites':
      case 'favorit':
        return <FavoritesPage onOpenKostDetail={handleOpenKostDetail} />;
      case 'orders':
      case 'pesanan':
        return <OrdersPage />;
      case 'settings':
        return <ProfileSettingsPage />;
        
      // Admin Routes
      case 'admin':
      case 'admin-dashboard':
      case 'admin-properties':
      case 'admin-transactions':
      case 'admin-bookings':
      case 'admin-users':
      case 'transaksi': // Mapping hypothetical route to admin dashboard for now
        if (!currentUser || currentUser.role !== 'admin') {
          // Redirect to home if not admin but trying to access admin
          // But 'transaksi' might be user specific too? 
          // For now, let's keep strict admin check for admin routes
          if (currentRoute === 'transaksi') return <OrdersPage />; // Reuse orders page for user transactions
          
          setRoute('home');
          showToast('Access denied. Administrator privileges required.', 'error');
          return <HomePage onOpenKostDetail={handleOpenKostDetail} />;
        }
        return <AdminDashboard />;
        
      default:
        return <HomePage onOpenKostDetail={handleOpenKostDetail} />;
    }
  };

  // Render Logic
  if (currentUser && !isPublicRoute) {
    // Authenticated App Layout (SaaS Style)
    return (
      <DashboardLayout>
        {renderContent()}
         <Toast />
        <KostDetailModal
          isOpen={kostDetailOpen}
          onClose={() => setKostDetailOpen(false)}
          kost={selectedKost}
          onProceedToPayment={handleProceedToPayment}
        />
        <PaymentFlow
          isOpen={paymentFlowOpen}
          onClose={handlePaymentFlowClose}
          transaction={activeTransaction}
        />
      </DashboardLayout>
    );
  }

  // Public Web Layout
  return (
    <div className="min-h-screen bg-slate-50 font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar onOpenAuth={() => setAuthModalOpen(true)} />
      <main className="pt-20 min-h-screen">
        {renderContent()}
      </main>
      <Footer />
      <Toast />
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
      <KostDetailModal
        isOpen={kostDetailOpen}
        onClose={() => setKostDetailOpen(false)}
        kost={selectedKost}
        onProceedToPayment={handleProceedToPayment}
      />
      <PaymentFlow
        isOpen={paymentFlowOpen}
        onClose={handlePaymentFlowClose}
        transaction={activeTransaction}
      />
    </div>
  );
}
