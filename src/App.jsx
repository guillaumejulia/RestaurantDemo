import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIG ANIMATIONS ---
const scrollReveal = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};
const viewportConfig = { once: false, amount: 0.15 };

// --- 1. PRELOADER ---
const Preloader = ({ onComplete }) => {
  return (
    <motion.div 
      initial={{ y: 0 }} exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 1 } }}
      className="fixed inset-0 z-[100] bg-zinc-950 flex items-center justify-center"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }} transition={{ duration: 0.5 }}
        className="text-4xl md:text-6xl font-extrabold text-white tracking-tighter flex items-center gap-2"
      >
        ECLIPSE<span className="w-4 h-4 rounded-full bg-orange-500 animate-pulse"></span>
      </motion.div>
    </motion.div>
  );
};

// --- 2. FOND IMMERSIF ---
const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-zinc-950">
    <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-rose-600/10 blur-[120px] mix-blend-screen animate-pulse duration-[10000ms]"></div>
    <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-orange-600/10 blur-[150px] mix-blend-screen animate-pulse duration-[8000ms]"></div>
  </div>
);

// --- 3. NAVBAR FLOTTANTE ---
const FloatingNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ delay: 2, type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 w-full z-50 flex justify-center pt-6 px-4 transition-all duration-500 ${isScrolled ? 'pt-4' : ''}`}
    >
      <div className="flex items-center justify-between w-full max-w-5xl bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-full px-6 py-3 shadow-2xl">
        <a href="#" className="text-xl font-extrabold text-white tracking-tighter">
          ECLIPSE<span className="text-orange-500">.</span>
        </a>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-zinc-300">
          <a href="#menu" className="hover:text-white transition-colors">La Carte</a>
          <a href="#bento" className="hover:text-white transition-colors">Vision</a>
          <a href="#infos" className="hover:text-white transition-colors">Infos</a>
        </div>
        <a href="#reservation" className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-all">
          Réserver
        </a>
      </div>
    </motion.nav>
  );
};

// --- 4. HERO ---
const Hero = () => (
  <section className="relative min-h-[100svh] flex flex-col items-center justify-center pt-32 pb-20 px-4 z-10 text-center">
    <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="max-w-4xl mx-auto mt-16">
      <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white mb-6 leading-[0.9]">
        Le Goût, <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-500 to-purple-600">Sublimé.</span>
      </h1>
      <p className="text-lg md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 font-light">
        L'avant-garde de la gastronomie. Une expérience sensorielle qui redéfinit les codes de la haute cuisine.
      </p>
    </motion.div>
  </section>
);

// --- 5. BANDE DÉFILANTE (MARQUEE) ---
const InfiniteMarquee = () => {
  const words = ["Sélection Guide Michelin 2026", "✦", "Gault & Millau : 3 Toques", "✦", "Élu Meilleur Concept Culinaire", "✦", "Fooding de l'Année", "✦"];
  return (
    <div className="w-full overflow-hidden bg-orange-500 text-black py-4 z-10 relative rotate-[-1deg] scale-105 my-12 border-y border-orange-400">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {[...words, ...words, ...words, ...words].map((word, index) => (
          <span key={index} className="mx-6 text-sm md:text-base font-bold uppercase tracking-widest">{word}</span>
        ))}
      </motion.div>
    </div>
  );
};

// --- 6. MENU INTERACTIF ---
const InteractiveMenu = () => {
  const [activeTab, setActiveTab] = useState('plats');
  const menuData = {
    entrees: [
      { nom: "Asperges Blanches", desc: "Émulsion au foin fumé, jaune d'œuf confit et caviar", prix: "28€" },
      { nom: "Crudo de Saint-Jacques", desc: "Agrumes givrés, huile de tagète et ponzu blanc", prix: "32€" }
    ],
    plats: [
      { nom: "Pigeon de Racan", desc: "Rôti sur coffre, betterave au feu de bois, jus perlé", prix: "54€" },
      { nom: "Turbot Sauvage", desc: "Cuit nacré, déclinaison d'artichauts, sauce champagne", prix: "62€" },
      { nom: "Bœuf Wagyu A5", desc: "Saisi au binchotan, purée truffée (Supplément)", prix: "85€" }
    ],
    desserts: [
      { nom: "Le Citron Noir", desc: "Crémeux yuzu, meringue brûlée et poivre de Timut", prix: "22€" },
      { nom: "Chocolat Grand Cru", desc: "Textures de cacao 75%, glace au sarrasin torréfié", prix: "24€" }
    ]
  };

  return (
    <section id="menu" className="py-24 px-4 relative z-10">
      <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">La Carte</h2>
          <p className="text-zinc-400">Évolutive, instinctive, selon l'inspiration du Chef.</p>
        </div>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {['entrees', 'plats', 'desserts'].map((tab) => (
            <button
              key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${
                activeTab === tab ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-400 border-zinc-700 hover:border-orange-500 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-10 backdrop-blur-sm min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {menuData[activeTab].map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-b border-white/5 pb-4 last:border-0">
                  <div className="md:w-3/4">
                    <h3 className="text-xl font-bold text-white mb-1">{item.nom}</h3>
                    <p className="text-zinc-400 text-sm font-light">{item.desc}</p>
                  </div>
                  <div className="text-orange-400 font-bold text-lg md:text-right shrink-0">{item.prix}</div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};

// --- 7. BENTO GRID ---
const BentoGrid = () => (
  <section id="bento" className="py-24 px-4 relative z-10">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 md:h-[600px]">
      <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group border border-white/10 min-h-[300px]">
        <img src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Feu" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-8">
          <h3 className="text-3xl font-bold text-white mb-2">Maîtrise du Feu</h3>
          <p className="text-zinc-300">Des cuissons millimétrées à la braise incandescente.</p>
        </div>
      </motion.div>
      <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} transition={{ delay: 0.1 }} className="md:col-span-2 md:row-span-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col justify-center min-h-[200px]">
        <p className="text-2xl font-light text-white leading-relaxed">
          "Créer des <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">souvenirs indélébiles</span>."
        </p>
      </motion.div>
      <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} transition={{ delay: 0.2 }} className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-3xl p-6 flex flex-col justify-between min-h-[200px]">
        <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500 mb-4">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <h3 className="text-xl font-bold text-white">Terroir Brut</h3>
      </motion.div>
      <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} transition={{ delay: 0.3 }} className="md:col-span-1 md:row-span-1 relative rounded-3xl overflow-hidden group border border-white/10 min-h-[200px]">
        <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Mixologie" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
        <h3 className="absolute bottom-6 left-6 text-xl font-bold text-white">L'Alchimie</h3>
      </motion.div>
    </div>
  </section>
);

// --- 8. AVIS GOOGLE ---
const GoogleReviews = () => {
  const reviews = [
    { name: "Sophie L.", text: "Une claque culinaire. Le bœuf Wagyu fond en bouche. Service irréprochable.", date: "Il y a 2 jours" },
    { name: "Marc D.", text: "L'accord mets et vins est exceptionnel. L'ambiance tamisée est parfaite pour un date.", date: "Il y a 1 semaine" },
    { name: "Julie P.", text: "Probablement la meilleure table de la ville actuellement. Réservez les yeux fermés.", date: "Il y a 2 semaines" }
  ];
  return (
    <section className="py-20 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-extrabold text-xl">G</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">4.9/5 sur Google</h2>
          <div className="flex text-orange-400 text-2xl">★★★★★</div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div key={i} variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} transition={{ delay: i * 0.1 }} className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-md">
              <div className="flex text-orange-400 text-sm mb-4">★★★★★</div>
              <p className="text-zinc-300 italic mb-6">"{review.text}"</p>
              <div className="flex justify-between items-end">
                <span className="font-bold text-white">{review.name}</span>
                <span className="text-xs text-zinc-500">{review.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 9. LOCALISATION & INFOS PRATIQUES ---
const LocationMap = () => (
  <section id="infos" className="py-24 px-4 relative z-10">
    <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="max-w-6xl mx-auto bg-zinc-900/40 border border-white/10 rounded-[2rem] overflow-hidden flex flex-col md:flex-row backdrop-blur-md">
      <div className="p-10 md:p-16 md:w-1/2 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-white mb-8">Nous Trouver</h2>
        <div className="space-y-6 mb-10">
          <div>
            <h3 className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-2">Adresse</h3>
            <p className="text-zinc-300">12 Avenue de l'Éclipse<br/>75008 Paris, France</p>
          </div>
          <div>
            <h3 className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-2">Horaires</h3>
            <p className="text-zinc-300">Mar - Sam : 19h30 - 23h30<br/><span className="text-zinc-500">Fermé Dimanche et Lundi</span></p>
          </div>
        </div>
        <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-zinc-200 transition-colors">
          Itinéraire Google Maps
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </a>
      </div>
      <div className="md:w-1/2 h-[400px] md:h-auto relative">
        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Carte" className="absolute inset-0 w-full h-full object-cover grayscale opacity-70" />
        <div className="absolute inset-0 bg-orange-500/10 mix-blend-color"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 bg-orange-500 rounded-full border-4 border-zinc-900 animate-bounce shadow-[0_0_20px_rgba(249,115,22,0.6)]"></div>
        </div>
      </div>
    </motion.div>
  </section>
);

// --- 10. RÉSERVATION FONCTIONNELLE ---
const ReservationForm = () => {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 4000);
    }, 2000);
  };

  return (
    <section id="reservation" className="py-24 px-4 relative z-10 flex justify-center">
      <motion.div variants={scrollReveal} initial="hidden" whileInView="visible" viewport={viewportConfig} className="w-full max-w-3xl bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-3">Votre Place.</h2>
          <p className="text-zinc-400">Demande de réservation en temps réel.</p>
        </div>
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center py-12">
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Demande Envoyée !</h3>
              <p className="text-zinc-400">Le restaurant va vous confirmer votre table par SMS d'ici quelques minutes.</p>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <input type="text" required className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-orange-500 transition-all" placeholder="Nom complet" />
              <div className="grid md:grid-cols-2 gap-4">
                <input type="tel" required className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-orange-500 transition-all" placeholder="Téléphone" />
                <input type="datetime-local" required className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-5 py-4 text-zinc-400 focus:outline-none focus:border-orange-500 transition-all [color-scheme:dark]" />
              </div>
              <button type="submit" disabled={status === 'loading'} className="w-full bg-white text-black font-extrabold text-lg py-4 rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300 mt-4 flex justify-center items-center h-16 disabled:opacity-70 disabled:cursor-not-allowed">
                {status === 'loading' ? <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div> : "Demander une table"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

// --- COMPOSANT PRINCIPAL (ASSEMBLAGE) ---
export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="font-sans bg-zinc-950 text-white selection:bg-orange-500 selection:text-white relative overflow-x-hidden">
      
      <AnimatePresence onExitComplete={() => window.scrollTo(0, 0)}>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <AmbientBackground />
      <FloatingNav />
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }} onAnimationComplete={() => setLoading(false)}>
        <Hero />
        <InfiniteMarquee />
        <InteractiveMenu />
        <BentoGrid />
        <GoogleReviews />
        <LocationMap />
        <ReservationForm />
        
        <footer className="border-t border-white/5 py-10 text-center text-zinc-500 text-sm">
          <p>© {new Date().getFullYear()} ECLIPSE. Propulsé par la meilleure agence web.</p>
        </footer>
      </motion.div>
    </div>
  );
}