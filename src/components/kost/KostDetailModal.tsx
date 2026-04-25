import { useState } from 'react';
import { 
  MapPin, Star, BadgeCheck, Zap, Heart, Check, 
  Users, Phone, Shield, ChevronRight, ChevronLeft,
  Building2, Wifi, Car, ShowerHead, Share2,
  CreditCard, Calendar, MapPinned, Info, Wallet, Flag
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { formatIDR } from '@/utils/helpers';
import { PAYMENT_OPTIONS } from '@/utils/legal';
import type { Kost, PaymentOptionType } from '@/types';
import { cn } from '@/utils/cn';

interface KostDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  kost: Kost | null;
  onProceedToPayment: (months: number, startDate: string, paymentOption: PaymentOptionType) => void;
}

const FACILITY_ICONS: Record<string, typeof Wifi> = {
  'wifi': Wifi,
  'parkir': Car,
  'kamar mandi': ShowerHead,
  'k. mandi': ShowerHead,
};

const getFacilityIcon = (facility: string) => {
  const lower = facility.toLowerCase();
  for (const [key, Icon] of Object.entries(FACILITY_ICONS)) {
    if (lower.includes(key)) return Icon;
  }
  return Check;
};

const PAYMENT_OPTION_ICONS = {
  OPTION_A: CreditCard,
  OPTION_B: Calendar,
  OPTION_C: MapPinned
};

export function KostDetailModal({ isOpen, onClose, kost, onProceedToPayment }: KostDetailModalProps) {
  const [months, setMonths] = useState(1);
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<PaymentOptionType>('OPTION_A');
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  
  const { currentUser, toggleFavorite, isFavorite, showToast } = useStore();
  
  if (!kost) return null;
  
  const isFav = currentUser ? isFavorite(kost.id) : false;
  const subtotal = kost.price * months;
  const promoPercent = kost.promo && months >= 3 ? (kost.promoPercent || 10) : 0;
  const discount = Math.round(subtotal * (promoPercent / 100));
  const adminFee = 5000;
  const serviceFee = selectedPaymentOption === 'OPTION_C' ? 0 : 2500;
  const totalAmount = subtotal - discount + adminFee + serviceFee;
  
  const images = kost.images && kost.images.length > 0 ? kost.images : [kost.img];

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };
  
  const getPaymentAmount = () => {
    if (selectedPaymentOption === 'OPTION_A') {
      return { label: 'Total Bayar', amount: totalAmount };
    } else if (selectedPaymentOption === 'OPTION_B') {
      const dpAmount = Math.ceil(totalAmount * 0.3);
      return { label: 'Bayar DP (30%)', amount: dpAmount };
    } else {
      return { label: 'Deposit Booking', amount: PAYMENT_OPTIONS.OPTION_C.depositAmount };
    }
  };
  
  const paymentInfo = getPaymentAmount();
  
  const handleFavoriteClick = () => {
    if (!currentUser) {
      showToast('Silakan masuk untuk menyimpan favorit.', 'info');
      return;
    }
    toggleFavorite(kost.id);
    showToast(isFav ? 'Dihapus dari favorit.' : 'Ditambahkan ke favorit.', 'success');
  };
  
  const handleBooking = () => {
    if (!currentUser) {
      showToast('Silakan masuk untuk melakukan booking.', 'info');
      return;
    }
    if (!kost.available) {
      showToast('Maaf, kost ini sedang tidak tersedia.', 'error');
      return;
    }
    onProceedToPayment(months, startDate, selectedPaymentOption);
  };
  
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-6xl w-full h-[95vh] rounded-2xl overflow-hidden p-0 bg-slate-50">
      <div className="flex flex-col h-full">
        {/* Navigation Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-slate-800 hidden md:block">Detail Properti</h2>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Bagikan
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn("flex items-center gap-2", isFav && "text-red-500 hover:text-red-600 hover:bg-red-50")}
              onClick={handleFavoriteClick}
            >
              <Heart className={cn("w-4 h-4", isFav && "fill-current")} />
              <span className="hidden md:inline">{isFav ? 'Disimpan' : 'Simpan'}</span>
            </Button>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
            >
              <span className="text-xl font-bold text-slate-500">×</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-4 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Authority Content */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Hero Gallery */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-200 group">
                  <img 
                    src={images[currentImageIdx]} 
                    alt={`${kost.name} view ${currentImageIdx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {images.length > 1 && (
                    <>
                      <button 
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft className="w-5 h-5 text-slate-800" />
                      </button>
                      <button 
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight className="w-5 h-5 text-slate-800" />
                      </button>
                      <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm">
                        {currentImageIdx + 1} / {images.length}
                      </div>
                    </>
                  )}

                  {/* Overlay Badges */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/90 backdrop-blur text-slate-800 px-3 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wide">
                      {kost.type}
                    </span>
                    {kost.verified && (
                      <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                        <BadgeCheck className="w-3 h-3" />
                        Verified Partner
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Main Info */}
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h1 className="text-3xl font-black text-slate-900 leading-tight">{kost.name}</h1>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                        <span className="text-xl font-bold text-slate-900">{kost.rating}</span>
                      </div>
                      <span className="text-sm text-slate-500 underline decoration-slate-300 decoration-dotted underline-offset-4">{kost.reviews} reviews</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-slate-600 mb-6">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>{kost.address}</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full mx-1" />
                    <span className="font-medium text-emerald-700 hover:underline cursor-pointer">Lihat Peta</span>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="text-center">
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Tipe</p>
                      <p className="font-bold text-slate-800">{kost.type}</p>
                    </div>
                    <div className="text-center border-l border-slate-100">
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Kamar</p>
                      <p className={cn("font-bold", kost.available ? "text-emerald-600" : "text-red-500")}>
                        {kost.available ? `${kost.rooms} Tersedia` : 'Penuh'}
                      </p>
                    </div>
                    <div className="text-center border-l border-slate-100">
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Update</p>
                      <p className="font-bold text-slate-800">2 hari lalu</p>
                    </div>
                    <div className="text-center border-l border-slate-100">
                      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Listrik</p>
                      <p className="font-bold text-slate-800">Termasuk</p>
                    </div>
                  </div>
                </div>

                {/* Facilities */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Fasilitas & Layanan</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {kost.fac.map((facility, idx) => {
                      const Icon = getFacilityIcon(facility);
                      return (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 bg-white hover:border-emerald-200 transition-colors">
                          <Icon className="w-5 h-5 text-emerald-600" />
                          <span className="text-sm font-medium text-slate-700">{facility}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Tentang Properti Ini</h3>
                  <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                    <p>{kost.description}</p>
                    <p className="mt-4">
                      Lingkungan kost sangat kondusif untuk istirahat dan belajar. Keamanan 24 jam dengan sistem CCTV dan akses kartu. 
                      Lokasi sangat strategis, hanya 5 menit jalan kaki ke minimarket dan 10 menit berkendara ke pusat kota.
                    </p>
                  </div>
                </div>

                {/* Owner Profile */}
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                        {kost.ownerPhoto ? (
                          <img src={kost.ownerPhoto} alt={kost.owner} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-emerald-100 text-emerald-700 font-bold text-xl">
                            {kost.owner.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-medium mb-0.5">Dikelola oleh</p>
                        <h4 className="text-lg font-bold text-slate-900">{kost.owner}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded font-medium">
                            <Shield className="w-3 h-3" />
                            Super Host
                          </span>
                          <span className="text-xs text-slate-400">• Tergabung sejak 2024</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="hidden sm:flex">
                      Hubungi Pemilik
                    </Button>
                  </div>
                </div>

                {/* Reviews Teaser (Static for now) */}
                <div className="border-t border-slate-200 pt-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900">Ulasan Penghuni</h3>
                    <a href="#" className="text-emerald-600 font-semibold text-sm hover:underline">Lihat semua ulasan</a>
                  </div>
                  <div className="space-y-6">
                    {[1, 2].map((_, i) => (
                      <div key={i} className="border-b border-slate-100 pb-6 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-slate-200" />
                            <div>
                              <p className="text-sm font-bold text-slate-900">User {i + 1}</p>
                              <p className="text-xs text-slate-500">Januari 2026</p>
                            </div>
                          </div>
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}
                          </div>
                        </div>
                        <p className="text-slate-600 text-sm">
                          Tempatnya bersih dan nyaman banget. Ibu kosnya ramah. Fasilitas sesuai deskripsi.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Sticky Payment Card */}
              <div className="lg:col-span-4 relative">
                <div className="sticky top-24 space-y-4">
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-6 overflow-hidden relative">
                    {/* Top decoration */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
                    
                    <div className="flex items-baseline justify-between mb-6">
                      <div>
                        <span className="text-3xl font-black text-slate-900 tracking-tight">{formatIDR(kost.price)}</span>
                        <span className="text-slate-500 font-medium"> / bulan</span>
                      </div>
                      {kost.promo && (
                        <div className="flex flex-col items-end">
                          <span className="bg-rose-100 text-rose-600 px-2 py-1 rounded text-xs font-bold">
                            Hemat {kost.promoPercent}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Booking Form */}
                    <div className="space-y-4">
                      {/* Date & Duration */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase">Durasi</label>
                          <select
                            value={months}
                            onChange={(e) => setMonths(Number(e.target.value))}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          >
                            <option value={1}>1 Bulan</option>
                            <option value={3}>3 Bulan</option>
                            <option value={6}>6 Bulan</option>
                            <option value={12}>1 Tahun</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase">Check-in</label>
                          <input
                            type="date"
                            value={startDate}
                            min={minDateStr}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      {/* Payment Options */}
                      <div className="space-y-2 pt-2">
                        <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                          Metode Pembayaran
                          <Info className="w-3 h-3 text-slate-400" />
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          {Object.entries(PAYMENT_OPTIONS).map(([key, option]) => {
                            const isSelected = selectedPaymentOption === key;
                            return (
                              <button
                                key={key}
                                onClick={() => setSelectedPaymentOption(key as PaymentOptionType)}
                                className={cn(
                                  "flex items-center justify-between p-3 rounded-xl border text-left transition-all",
                                  isSelected 
                                    ? "border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600" 
                                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                                )}
                              >
                                <span className="text-sm font-bold text-slate-700">{option.name}</span>
                                {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="bg-slate-50 rounded-xl p-4 space-y-2 mt-4">
                        <div className="flex justify-between text-sm text-slate-600">
                          <span>Harga Sewa</span>
                          <span>{formatIDR(subtotal)}</span>
                        </div>
                        {discount > 0 && (
                          <div className="flex justify-between text-sm text-emerald-600 font-medium">
                            <span>Diskon Promo</span>
                            <span>-{formatIDR(discount)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm text-slate-600">
                          <span>Biaya Layanan</span>
                          <span>{formatIDR(adminFee + serviceFee)}</span>
                        </div>
                        
                        <div className="border-t border-slate-200 pt-2 mt-2">
                          <div className="flex justify-between items-baseline">
                            <span className="font-bold text-slate-800">Total</span>
                            <span className="font-bold text-lg text-slate-900">{formatIDR(totalAmount)}</span>
                          </div>
                          
                          {/* Payment Specific Total */}
                          {selectedPaymentOption !== 'OPTION_A' && (
                            <div className="flex justify-between items-center mt-2 bg-white border border-slate-200 p-2 rounded-lg">
                              <span className="text-xs font-semibold text-slate-500">Bayar Sekarang ({paymentInfo.label})</span>
                              <span className="text-sm font-black text-emerald-600">{formatIDR(paymentInfo.amount)}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <Button 
                        variant="primary" 
                        className="w-full py-4 text-base font-bold shadow-lg shadow-emerald-200"
                        onClick={handleBooking}
                        disabled={!kost.available}
                      >
                        {kost.available ? 'Ajukan Sewa' : 'Tidak Tersedia'}
                      </Button>
                      
                      <div className="text-center">
                        <p className="text-xs text-slate-400">
                          Belum dikenakan biaya. Anda bisa membatalkan nanti.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
                    <Flag className="w-5 h-5 text-slate-400 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-slate-700">Laporkan Properti Ini</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Jika Anda menemukan ketidaksesuaian informasi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Mobile Sticky Bottom Bar */}
        <div className="lg:hidden border-t border-slate-200 bg-white p-4 sticky bottom-0 z-30 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div>
            <p className="text-xs text-slate-500 font-medium">Mulai dari</p>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-emerald-600">{formatIDR(paymentInfo.amount)}</span>
              <span className="text-xs text-slate-400">/ {selectedPaymentOption === 'OPTION_A' ? 'total' : 'awal'}</span>
            </div>
          </div>
          <Button 
            variant="primary" 
            size="lg"
            onClick={handleBooking}
            disabled={!kost.available}
            className="px-8"
          >
            {kost.available ? 'Sewa' : 'Penuh'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

// Helper component for star icons needed in the new layout
function CheckCircle2({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
