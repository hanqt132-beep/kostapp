import { 
  Building2, Globe, ArrowUpRight, Award, ShieldCheck, 
  Handshake, CheckCircle2, TrendingUp, Hotel
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { 
  LogoAccor, LogoArchipelago, LogoIHG, LogoBestWestern, 
  LogoSwissBel, LogoArtotel, LogoSantika, LogoHorison, 
  LogoDafam, LogoFave, LogoNeo, LogoAston 
} from '../ui/BrandAssets';

// Strategic Hospitality Partners with Official Logos (SVG Components)
const PARTNERS = [
  { 
    name: "Accor Live Limitless", 
    Logo: LogoAccor,
    desc: "Raffles, Fairmont, Sofitel, Novotel, ibis"
  },
  { 
    name: "Archipelago International", 
    Logo: LogoArchipelago,
    desc: "Aston, favehotel, NEO, Harper"
  },
  { 
    name: "IHG Hotels & Resorts", 
    Logo: LogoIHG,
    desc: "InterContinental, Holiday Inn, Crowne Plaza"
  },
  { 
    name: "Best Western", 
    Logo: LogoBestWestern,
    desc: "Best Western Premier, BW Signature"
  },
  { 
    name: "Swiss-Belhotel", 
    Logo: LogoSwissBel,
    desc: "Swiss-Belhotel, Zest Hotels"
  },
  { 
    name: "Artotel Group", 
    Logo: LogoArtotel,
    desc: "Artotel, Bobotel, Rooms Inc"
  },
  { 
    name: "Santika Indonesia", 
    Logo: LogoSantika,
    desc: "Santika Premiere, Amaris Hotel"
  },
  { 
    name: "Horison Hotels", 
    Logo: LogoHorison,
    desc: "Grand Horison, Horison Ultima"
  },
  { 
    name: "Dafam Hotel Management", 
    Logo: LogoDafam,
    desc: "Grand Dafam, Hotel Dafam, Meotel"
  },
  { 
    name: "Aston Hotels", 
    Logo: LogoAston,
    desc: "Archipelago International Member"
  },
  { 
    name: "Fave Hotel", 
    Logo: LogoFave,
    desc: "Fun, Fresh & Friendly Hotels"
  },
  { 
    name: "Neo Hotels", 
    Logo: LogoNeo,
    desc: "Designed for a new world"
  }
];

export function StrategicEcosystemPage() {
  const { kosts, showToast } = useStore();

  const metrics = {
    activeProperties: kosts.length * 150 + 1200, // Simulated scale
    cities: 34,
    strategicPartners: PARTNERS.length + 45
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Authority Header Section */}
      <section className="bg-slate-900 text-white relative overflow-hidden py-24">
        {/* Abstract Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-emerald-300 font-semibold text-sm mb-8 animate-enter">
            <Handshake className="w-4 h-4" />
            National Hospitality Network
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 animate-enter" style={{ animationDelay: '100ms' }}>
            Didukung Jaringan Mitra <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">
              Perhotelan & Hospitality Nasional
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12 animate-enter" style={{ animationDelay: '200ms' }}>
            Kolaborasi strategis dengan grup perhotelan terpercaya untuk memastikan standar kualitas, operasional, dan pelayanan terbaik bagi penghuni.
          </p>

          {/* Dynamic Credibility Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-enter" style={{ animationDelay: '300ms' }}>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">
              <div className="text-4xl font-black text-white mb-1">
                {new Intl.NumberFormat('id-ID').format(metrics.activeProperties)}+
              </div>
              <p className="text-slate-400 font-medium text-sm uppercase tracking-wider">Total Properti Aktif</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">
              <div className="text-4xl font-black text-white mb-1">
                {metrics.cities}
              </div>
              <p className="text-slate-400 font-medium text-sm uppercase tracking-wider">Kota Operasional</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">
              <div className="text-4xl font-black text-white mb-1">
                {metrics.strategicPartners}
              </div>
              <p className="text-slate-400 font-medium text-sm uppercase tracking-wider">Total Mitra Strategis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Brand Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Strategic Partners</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Kami bekerja sama dengan pemimpin industri untuk menghadirkan standar hunian kelas dunia.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {PARTNERS.map((partner, idx) => (
            <div 
              key={idx}
              className="group bg-white rounded-xl border border-slate-200 p-6 flex flex-col items-center justify-center text-center hover:border-emerald-200 hover:shadow-xl transition-all duration-300 cursor-pointer h-full relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 w-full flex flex-col items-center h-full justify-between">
                 <div className="h-16 w-full flex items-center justify-center mb-4 text-slate-800">
                    <partner.Logo className="h-10 w-auto max-w-[140px]" />
                 </div>
                 
                 <div className="border-t border-slate-100 pt-3 w-full">
                    <h3 className="font-bold text-slate-700 text-sm group-hover:text-emerald-700 transition-colors">{partner.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{partner.desc}</p>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Integration Value Prop */}
      <section className="bg-white border-t border-slate-200 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-emerald-600 font-bold mb-6">
                <ShieldCheck className="w-5 h-5" />
                Enterprise Standard
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                Standarisasi Operasional & Kualitas Layanan
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Quality Assurance</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Setiap properti dalam ekosistem kami wajib memenuhi 150+ titik pemeriksaan kualitas yang diadopsi dari standar perhotelan internasional.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                    <Globe className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Integrated Network</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Akses ke jaringan inventaris nasional memungkinkan fleksibilitas dan skalabilitas bagi mitra korporat dan institusi.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Certified Management</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Pengelolaan properti dilakukan oleh tim yang tersertifikasi dalam manajemen hospitalitas modern.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-indigo-500/20 rounded-3xl blur-2xl transform rotate-3" />
              <div className="relative bg-slate-900 rounded-3xl p-8 text-white shadow-2xl">
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Growth Metric</p>
                    <p className="text-3xl font-bold">YoY Growth</p>
                  </div>
                  <div className="text-emerald-400 font-bold text-xl flex items-center gap-1">
                    <TrendingUp className="w-5 h-5" />
                    +142%
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                      <span className="font-medium">Corporate Partners</span>
                    </div>
                    <span className="font-mono text-emerald-400">850+</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full" />
                      <span className="font-medium">Government Entities</span>
                    </div>
                    <span className="font-mono text-blue-400">120+</span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full" />
                      <span className="font-medium">Education Institutions</span>
                    </div>
                    <span className="font-mono text-purple-400">45+</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <Button 
                    className="w-full bg-white text-slate-900 hover:bg-slate-100"
                    onClick={() => showToast('Penawaran kemitraan terkirim! Tim spesialis kami akan segera memproses. 🎉', 'success')}
                  >
                    Become a Partner
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
