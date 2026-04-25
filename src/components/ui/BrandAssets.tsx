import React from 'react';

// ==========================================
// HOTEL PARTNERS (STRATEGIC ECOSYSTEM)
// ==========================================

export const LogoAccor = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 30" fill="currentColor" className={className} aria-label="Accor">
    <path d="M15,5 L20,25 L25,5 M30,5 C30,5 35,5 35,10 C35,15 30,15 30,15 L35,25 M40,5 C40,5 45,5 45,10 C45,15 40,15 40,15 L45,25 M50,15 A5,5 0 1,0 50,25 A5,5 0 1,0 50,15 M65,5 L65,25 M65,15 L75,15 M75,5 L75,25" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <text x="10" y="28" fontSize="12" fontWeight="bold" fill="currentColor" style={{display:'none'}}>ACCOR</text>
  </svg>
);

export const LogoArchipelago = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 120 30" fill="currentColor" className={className} aria-label="Archipelago">
    <path d="M10,25 L20,5 L30,25 M15,18 L25,18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="20" cy="10" r="2" fill="currentColor"/>
    <rect x="40" y="10" width="10" height="15" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M60,10 L70,10 L60,25 L70,25" stroke="currentColor" strokeWidth="2" fill="none"/>
  </svg>
);

export const LogoIHG = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 40" fill="currentColor" className={className}>
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="24" fontWeight="900" fontFamily="serif" letterSpacing="2">IHG</text>
    <rect x="5" y="5" width="90" height="30" rx="0" fill="none" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

export const LogoBestWestern = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 120 40" fill="currentColor" className={className}>
    <path d="M10,5 L10,35 M10,5 L30,5 L35,10 L30,15 L10,15 L30,20 L35,25 L30,35 L10,35" stroke="currentColor" strokeWidth="3" fill="none"/>
    <path d="M50,5 L55,35 L60,15 L65,35 L70,5" stroke="currentColor" strokeWidth="3" fill="none"/>
  </svg>
);

export const LogoAston = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 30" fill="currentColor" className={className}>
    <text x="5" y="22" fontSize="20" fontWeight="bold" fontFamily="sans-serif" letterSpacing="1">ASTON</text>
  </svg>
);

export const LogoSwissBel = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 140 30" fill="currentColor" className={className}>
    <path d="M10,15 L20,15 M15,10 L15,20" stroke="currentColor" strokeWidth="4"/>
    <text x="30" y="20" fontSize="16" fontWeight="bold" fontFamily="sans-serif">SWISS-BEL</text>
  </svg>
);

export const LogoArtotel = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 120 30" fill="currentColor" className={className}>
    <circle cx="15" cy="15" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
    <text x="35" y="20" fontSize="16" fontWeight="300" fontFamily="sans-serif" letterSpacing="2">ARTOTEL</text>
  </svg>
);

export const LogoSantika = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 120 30" fill="currentColor" className={className}>
    <path d="M10,25 Q15,5 25,25" stroke="currentColor" strokeWidth="2" fill="none"/>
    <text x="35" y="20" fontSize="16" fontWeight="bold" fontFamily="serif">Santika</text>
  </svg>
);

export const LogoHorison = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 120 30" fill="currentColor" className={className}>
    <rect x="10" y="10" width="15" height="15" fill="currentColor"/>
    <text x="35" y="22" fontSize="18" fontWeight="bold" fontFamily="sans-serif">HORISON</text>
  </svg>
);

export const LogoDafam = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 30" fill="currentColor" className={className}>
    <path d="M10,5 C20,5 20,25 10,25 L10,5" stroke="currentColor" strokeWidth="2" fill="none"/>
    <text x="25" y="20" fontSize="16" fontWeight="bold" fontFamily="sans-serif">DAFAM</text>
  </svg>
);

export const LogoFave = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 30" fill="currentColor" className={className}>
    <text x="5" y="22" fontSize="22" fontWeight="900" fontFamily="sans-serif" fill="#ec4899">fave</text>
    <text x="55" y="22" fontSize="22" fontWeight="300" fontFamily="sans-serif">hotel</text>
  </svg>
);

export const LogoNeo = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 30" fill="currentColor" className={className}>
    <text x="5" y="22" fontSize="20" fontWeight="bold" fontFamily="monospace">NEO</text>
    <circle cx="55" cy="15" r="3" fill="currentColor"/>
  </svg>
);


// ==========================================
// PAYMENT METHODS (BANK & WALLET)
// ==========================================

export const LogoQRIS = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 35" fill="none" className={className}>
    <rect width="100" height="35" fill="white"/>
    <path d="M10,5 L25,5 L25,20 L10,20 Z" stroke="#DC2626" strokeWidth="2"/>
    <path d="M15,10 L20,10 L20,15 L15,15 Z" fill="#DC2626"/>
    <text x="32" y="24" fontSize="18" fontWeight="900" fill="#111827" fontFamily="Arial">QRIS</text>
  </svg>
);

export const LogoBCA = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 80 30" fill="none" className={className}>
    <text x="0" y="22" fontSize="22" fontWeight="900" fill="#005EB8" fontFamily="Arial">BCA</text>
  </svg>
);

export const LogoBNI = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 80 30" fill="none" className={className}>
    <rect x="0" y="5" width="10" height="20" fill="#F15A24"/>
    <text x="15" y="22" fontSize="22" fontWeight="900" fill="#00665E" fontFamily="Arial">BNI</text>
    <path d="M2,15 L8,15" stroke="white" strokeWidth="2"/>
  </svg>
);

export const LogoMandiri = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 30" fill="none" className={className}>
    <text x="0" y="22" fontSize="20" fontWeight="900" fill="#003D79" fontFamily="Arial" style={{fontStyle:'italic'}}>mandiri</text>
    <path d="M85,5 Q100,5 100,20" stroke="#FFB81C" strokeWidth="3" fill="none"/>
  </svg>
);

export const LogoBRI = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 80 30" fill="none" className={className}>
    <rect x="0" y="0" width="30" height="30" rx="4" fill="#00529C"/>
    <text x="35" y="22" fontSize="22" fontWeight="900" fill="#00529C" fontFamily="Arial">BRI</text>
    <path d="M5,15 L25,15 M15,5 L15,25" stroke="white" strokeWidth="3"/>
  </svg>
);

export const LogoGoPay = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 80 30" fill="none" className={className}>
    <text x="0" y="22" fontSize="20" fontWeight="900" fill="#00AED6" fontFamily="Arial">gopay</text>
  </svg>
);

export const LogoOVO = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 80 30" fill="none" className={className}>
    <text x="0" y="22" fontSize="20" fontWeight="900" fill="#4C3494" fontFamily="Arial">OVO</text>
  </svg>
);

export const LogoShopeePay = ({ className = "h-8" }: { className?: string }) => (
  <svg viewBox="0 0 100 30" fill="none" className={className}>
    <text x="0" y="22" fontSize="18" fontWeight="900" fill="#EE4D2D" fontFamily="Arial">ShopeePay</text>
  </svg>
);
