import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Instagram, Facebook, Linkedin, 
  Heart, KeyRound, CarFront, Activity, Building2, 
  Home, Smartphone, Plane, MapPin, Clock, Phone, 
  Mail, MessageCircle, Star, ChevronRight, Briefcase, MoreHorizontal, UserPlus 
} from 'lucide-react';

// --- Funções Auxiliares ---

// Função para gerar e baixar o vCard (Contato)
const downloadVCard = () => {
  // Dados do contato
  const contact = {
    name: "Frizzo Corretora de Seguros",
    phone: "+5511973039860",
    email: "administrativo@frizzoseguros.com.br",
    website: "https://www.frizzoseguros.com.br", // Ajuste se tiver um domínio real
    address: "Rua Moacir Miguel da Silva, 91 - Jd. Bonfiglioli, São Paulo - SP"
  };

  // Formato vCard 3.0
  const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${contact.name}
ORG:${contact.name}
TEL;TYPE=WORK,VOICE:${contact.phone}
EMAIL:${contact.email}
URL:${contact.website}
ADR;TYPE=WORK:;;${contact.address}
END:VCARD`;

  // Cria um Blob e um link para download
  const blob = new Blob([vCardData], { type: "text/vcard" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Frizzo_Corretora.vcf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// --- Componentes ---

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const idleTimer = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;

      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Seguros', href: '#seguros' },
    { name: 'Frizzolândia', href: '#porque-frizzo' },
    { name: 'Redes', href: '#frizzolandia' }, 
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white py-4'}`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#01cbfe] to-[#193c5c]"></div>
      
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
        <div className="flex-1 flex justify-start items-center">
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="relative text-gray-600 hover:text-[#01cbfe] transition-colors font-medium text-sm uppercase tracking-wide group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#01cbfe] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-800 focus:outline-none p-2 -ml-2 hover:bg-gray-100 rounded-md transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className="flex-shrink-0 absolute left-1/2 transform -translate-x-1/2">
          <a href="#inicio" className="group block">
            <img 
              src="/img/logo-header.png" 
              alt="Frizzo Corretora" 
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              onError={(e) => {e.target.style.display='none'; console.warn("Logo não encontrada.")}} 
            />
          </a>
        </div>

        <div className="flex-1 flex justify-end items-center">
          <a href="#contato" className="relative overflow-hidden bg-[#13acd3] text-white px-5 py-2 rounded-md hover:bg-[#01cbfe] transition-all duration-300 shadow-md font-semibold text-sm flex items-center gap-2 group">
            <span className="hidden sm:inline">Cotação Online</span>
            <span className="sm:hidden">Cotar</span>
            <ChevronRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </nav>

      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-white border-t border-gray-100 shadow-xl absolute w-full left-0 z-40 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            onClick={() => setIsOpen(false)}
            className="block py-4 px-6 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#13acd3] font-medium border-b border-gray-100 transition-colors"
          >
            {link.name}
          </a>
        ))}
      </div>
    </header>
  );
};

const Hero = () => {
  const [activeTab, setActiveTab] = useState('saude');
  
  // Função para lidar com a troca de abas
  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
  };

  const content = {
    saude: {
      title: "O Plano de Saúde Ideal para Você e sua Família.",
      text: "Com os melhores planos de saúde do mercado, garantimos que você e sua família tenham acesso a um atendimento de excelência.",
      buttonText: "Faça sua Cotação Gratuita",
      wppText: "Olá! Gostaria de fazer uma cotação para um plano de saúde.",
      color: "from-blue-500 to-cyan-500"
    },
    consorcio: {
      title: "Realize Seus Sonhos com o Consórcio Certo.",
      text: "Planeje a conquista do seu carro ou imóvel de forma inteligente e sem juros. Economia e segurança para o seu futuro.",
      buttonText: "Simule seu Consórcio",
      wppText: "Olá! Gostaria de simular um consórcio.",
      color: "from-emerald-500 to-teal-500"
    },
    auto: {
      title: "Seu Veículo Seguro, Sua Rotina sem Imprevistos.",
      text: "Dirija com a tranquilidade de saber que seu carro está protegido. Coberturas completas e assistência 24h.",
      buttonText: "Cote seu Seguro Auto",
      wppText: "Olá! Gostaria de cotar um seguro para meu veículo.",
      color: "from-orange-500 to-red-500"
    },
    empresarial: {
      title: "Proteção Completa para o Seu Negócio.",
      text: "Garanta a segurança do seu patrimônio e a tranquilidade dos seus colaboradores com nossas soluções empresariais personalizadas.",
      buttonText: "Cote Seguro Empresarial",
      wppText: "Olá! Gostaria de uma cotação para seguro empresarial.",
      color: "from-purple-500 to-indigo-500"
    }
  };

  const currentContent = content[activeTab];

  return (
    <section id="inicio" className="relative w-full min-h-screen flex flex-col justify-center p-4 pt-24 lg:pt-0 bg-[#193c5c] overflow-hidden">
      
      {/* Background Animado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl transition-all duration-1000 ease-in-out
          ${activeTab === 'saude' ? '-top-20 -left-20 scale-100' : activeTab === 'consorcio' ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-110' : 'bottom-0 right-0 scale-90'}
        `}></div>
        <div className={`absolute w-[600px] h-[600px] bg-[#01cbfe]/10 rounded-full blur-3xl transition-all duration-1000 ease-in-out delay-100
          ${activeTab === 'saude' ? 'bottom-0 right-0' : activeTab === 'consorcio' ? '-top-20 right-20' : 'top-20 -left-20'}
        `}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col h-full justify-center flex-grow">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center flex-grow">
          
          {/* Content Side */}
          <div className="text-center lg:text-left w-full flex flex-col justify-center order-2 lg:order-1 pb-24 lg:pb-0">
             <div key={activeTab}>
                <h1 
                  className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-xl animate-blurIn opacity-0"
                  style={{ animationDelay: '0ms' }}
                >
                  {currentContent.title}
                </h1>
                <p 
                  className="text-lg text-white/90 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light animate-blurIn opacity-0"
                  style={{ animationDelay: '150ms' }}
                >
                  {currentContent.text}
                </p>
                <div className="animate-blurIn opacity-0" style={{ animationDelay: '300ms' }}>
                  <a 
                    href={`https://wa.me/5511987654321?text=${encodeURIComponent(currentContent.wppText)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white text-lg transition-all duration-300 bg-gradient-to-r ${currentContent.color} font-pj rounded-full focus:outline-none hover:scale-105 shadow-lg hover:shadow-2xl hover:-translate-y-1`}
                  >
                    {currentContent.buttonText}
                    <div className="absolute -inset-3 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-lg"></div>
                  </a>
                </div>
             </div>
          </div>

          {/* Visual Side */}
          <div className="relative w-full flex flex-col justify-center items-center perspective-1000 order-1 lg:order-2 mb-4 lg:mb-0">
            
            {/* CARDS FLUTUANTES SOBRE O VÍDEO */}
            <div className="w-full max-w-xl flex flex-col items-center mb-6 z-20">
                 
                 {/* CARD DA LOGO - Ajustado para ser menor e centralizado entre os cards de baixo */}
                 <div className="w-[50%] bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex items-center justify-center shadow-xl transform transition-transform hover:scale-105 mb-4">
                    <img src="/img/logo-hero.png" alt="Frizzo Seguros" className="h-17 w-auto" />
                 </div>

                 {/* Linha dos Cards de Estatísticas */}
                 <div className="flex gap-4 w-full">
                    <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-white flex items-center gap-4 shadow-xl transform transition-transform hover:scale-105">
                        <div className={`bg-gradient-to-r ${currentContent.color} w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300`}>
                          <Clock size={24} className="text-white" />
                        </div>
                        <div>
                          <span className="block text-2xl font-bold leading-none">25+</span>
                          <span className="text-xs uppercase opacity-80 tracking-wider font-semibold">Anos</span>
                        </div>
                    </div>
                    <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-white flex items-center gap-4 shadow-xl transform transition-transform hover:scale-105">
                        <div className={`bg-gradient-to-r ${currentContent.color} w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300`}>
                          <Building2 size={24} className="text-white" />
                        </div>
                        <div>
                          <span className="block text-2xl font-bold leading-none">40+</span>
                          <span className="text-xs uppercase opacity-80 tracking-wider font-semibold">Parceiros</span>
                        </div>
                    </div>
                 </div>
            </div>

            {/* Glow de fundo */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-r ${currentContent.color} opacity-20 blur-[80px] rounded-full transition-all duration-700`}></div>

            {/* Video Container */}
            <div className="relative z-10 w-full max-w-xl bg-white/10 backdrop-blur-xl p-3 rounded-[2rem] border border-white/20 shadow-2xl overflow-hidden group transform transition-all hover:scale-[1.01] hover:border-white/30">
              <div className="aspect-video rounded-[1.5rem] overflow-hidden bg-gray-900 flex items-center justify-center relative animate-zoomIn">
                 <div className="absolute inset-0 bg-gradient-to-t from-[#193c5c]/60 to-transparent z-10 pointer-events-none"></div>
                 <video className="w-full h-full object-cover" controls playsInline poster="/img/logo.png">
                    <source src="/img/video-institucional.mp4" type="video/mp4" />
                    Seu navegador não suporta a tag de vídeo.
                 </video>
              </div>
            </div>
          </div>
        </div>

        {/* Hotbar Mobile */}
        <div className="mt-8 flex justify-center lg:hidden relative z-30 pb-8">
            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 p-1.5 rounded-full flex items-center space-x-1 shadow-2xl overflow-x-auto">
                <div 
                className="absolute top-1.5 h-[calc(100%-0.75rem)] bg-white rounded-full transition-all duration-300 ease-out shadow-sm"
                style={{ 
                    width: '44px', 
                    left: activeTab === 'saude' ? '6px' : 
                          activeTab === 'consorcio' ? '58px' : 
                          activeTab === 'auto' ? '110px' : '162px'
                }}
                ></div>
                <button onClick={() => handleTabChange('saude')} className={`relative p-2.5 rounded-full z-10 transition-colors duration-300 ${activeTab === 'saude' ? 'text-[#193c5c]' : 'text-white/70 hover:text-white'}`}>
                  <Heart size={20} strokeWidth={2.5} />
                </button>
                <div className="w-px h-4 bg-white/20"></div>
                <button onClick={() => handleTabChange('consorcio')} className={`relative p-2.5 rounded-full z-10 transition-colors duration-300 ${activeTab === 'consorcio' ? 'text-[#193c5c]' : 'text-white/70 hover:text-white'}`}>
                  <KeyRound size={20} strokeWidth={2.5} />
                </button>
                <div className="w-px h-4 bg-white/20"></div>
                <button onClick={() => handleTabChange('auto')} className={`relative p-2.5 rounded-full z-10 transition-colors duration-300 ${activeTab === 'auto' ? 'text-[#193c5c]' : 'text-white/70 hover:text-white'}`}>
                  <CarFront size={20} strokeWidth={2.5} />
                </button>
                <div className="w-px h-4 bg-white/20"></div>
                <button onClick={() => handleTabChange('empresarial')} className={`relative p-2.5 rounded-full z-10 transition-colors duration-300 ${activeTab === 'empresarial' ? 'text-[#193c5c]' : 'text-white/70 hover:text-white'}`}>
                  <Briefcase size={20} strokeWidth={2.5} />
                </button>
                <div className="w-px h-4 bg-white/20"></div>
                <a href="#seguros" className="relative p-2.5 rounded-full z-10 text-white/70 hover:text-white transition-colors duration-300">
                  <MoreHorizontal size={20} strokeWidth={2.5} />
                </a>
            </div>
        </div>

        {/* Hotbar Desktop */}
        <div className="absolute bottom-10 left-0 right-0 hidden lg:flex justify-center z-30">
           <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-full flex items-center gap-3 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] animate-float">
              
              <button 
                onClick={() => handleTabChange('saude')}
                title="Saúde"
                className={`relative w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300 ease-out group ${activeTab === 'saude' ? 'bg-white text-blue-500 shadow-lg scale-110 ring-4 ring-blue-500/20' : 'text-white hover:bg-white/10'}`}
              >
                <Heart size={24} strokeWidth={activeTab === 'saude' ? 3 : 2} fill={activeTab === 'saude' ? "currentColor" : "none"} className="transition-transform duration-300" />
              </button>

              <button 
                onClick={() => handleTabChange('consorcio')}
                title="Consórcio"
                className={`relative w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300 ease-out group ${activeTab === 'consorcio' ? 'bg-white text-emerald-500 shadow-lg scale-110 ring-4 ring-emerald-500/20' : 'text-white hover:bg-white/10'}`}
              >
                <KeyRound size={24} strokeWidth={activeTab === 'consorcio' ? 3 : 2} className="transition-transform duration-300" />
              </button>

              <button 
                onClick={() => handleTabChange('auto')}
                title="Seguro Auto"
                className={`relative w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300 ease-out group ${activeTab === 'auto' ? 'bg-white text-orange-500 shadow-lg scale-110 ring-4 ring-orange-500/20' : 'text-white hover:bg-white/10'}`}
              >
                <CarFront size={24} strokeWidth={activeTab === 'auto' ? 3 : 2} className="transition-transform duration-300" />
              </button>

              <button 
                onClick={() => handleTabChange('empresarial')}
                title="Seguro Empresarial"
                className={`relative w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-300 ease-out group ${activeTab === 'empresarial' ? 'bg-white text-purple-500 shadow-lg scale-110 ring-4 ring-purple-500/20' : 'text-white hover:bg-white/10'}`}
              >
                <Briefcase size={24} strokeWidth={activeTab === 'empresarial' ? 3 : 2} className="transition-transform duration-300" />
              </button>

              <a 
                href="#seguros"
                title="Mais Seguros"
                className="relative w-12 h-12 rounded-full flex items-center justify-center z-10 text-white hover:bg-white/10 transition-all duration-300 ease-out group"
              >
                <MoreHorizontal size={24} strokeWidth={2} className="transition-transform duration-300 group-hover:scale-110" />
              </a>

           </div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ Icon, title, desc }) => (
  <div className="bg-white/80 backdrop-blur-sm border border-white/40 p-6 text-center rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-[#13acd3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div className="bg-[#13acd3]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-[#13acd3] group-hover:text-white transition-all duration-300 text-[#13acd3] relative z-10 shadow-inner group-hover:shadow-lg">
      <Icon size={32} strokeWidth={1.5} className="transform group-hover:scale-110 transition-transform duration-300" />
    </div>
    <h3 className="text-lg font-bold text-[#193c5c] mb-3 relative z-10">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed relative z-10">{desc}</p>
  </div>
);

const Services = () => {
  const services = [
    { Icon: Heart, title: 'Planos de Saúde', desc: 'Cuidado e bem-estar para você e sua família.' },
    { Icon: KeyRound, title: 'Consórcio', desc: 'A forma inteligente de conquistar seus sonhos.' },
    { Icon: CarFront, title: 'Seguro Auto', desc: 'Proteção completa para seu veículo.' },
    { Icon: Activity, title: 'Seguro de Vida', desc: 'Garanta a tranquilidade de quem você ama.' },
    { Icon: Building2, title: 'Seguro Empresarial', desc: 'Soluções para impulsionar seu negócio.' },
    { Icon: Home, title: 'Seguro Residencial', desc: 'A segurança que seu lar merece.' },
    { Icon: Smartphone, title: 'Seguro Celular', desc: 'Proteja seu smartphone contra danos.' },
    { Icon: Plane, title: 'Seguro Viagem', desc: 'Viaje com total tranquilidade.' },
  ];

  return (
    <section id="seguros" className="py-10 lg:py-14 overflow-hidden bg-gray-50 relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#13acd3]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#193c5c]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-8">
          <span className="text-[#13acd3] font-bold uppercase tracking-wider text-sm mb-2 block">O que oferecemos</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#193c5c]">Nossos Seguros</h2>
          <div className="w-24 h-1 bg-[#13acd3] mx-auto mt-4 rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">Soluções completas e personalizadas para proteger o que mais importa para você, sua família e seus negócios.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {services.map((s, i) => <ServiceCard key={i} {...s} />)}
        </div>
      </div>
    </section>
  );
};

const Partners = () => {
  const partners = [
    '/img/allianz.png', '/img/Amil.png', '/img/Azul.png', '/img/HDI.png', '/img/itau.png', 
    '/img/Mapfre.png', '/img/Medsenior.png', '/img/Notredame.png', '/img/Porto.png', 
    '/img/Prevent Senior.png', '/img/Suhai.png', '/img/SulAmérica.png', '/img/Tokio.png', '/img/Yelum.png'
  ];

  return (
    <div className="py-8 bg-white overflow-hidden border-t border-gray-100">
       <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#193c5c] opacity-90">Trabalhamos com as Melhores Seguradoras</h2>
       </div>
       <div className="scroller w-full overflow-hidden mask-linear-gradient">
          <div className="scroller-inner flex gap-16 w-max animate-scroll">
             {partners.map((p, i) => (
               <div key={`p1-${i}`} className="h-14 w-auto grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-500 transform hover:scale-110 cursor-pointer">
                 <img src={p} alt="Seguradora" className="h-full w-auto object-contain" />
               </div>
             ))}
             {partners.map((p, i) => (
               <div key={`p2-${i}`} className="h-14 w-auto grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-500 transform hover:scale-110 cursor-pointer">
                 <img src={p} alt="Seguradora" className="h-full w-auto object-contain" />
               </div>
             ))}
          </div>
       </div>
    </div>
  );
};

const Frizzolandia = () => {
  const [highlightedId, setHighlightedId] = useState(null);

  const handleHover = (id) => setHighlightedId(id);
  const handleLeave = () => setHighlightedId(null);

  return (
    <section id="porque-frizzo" className="py-20 lg:py-28 bg-[#193c5c] overflow-hidden relative">
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

      <div className="container mx-auto px-6 mb-16 relative z-10">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Bem vindo a Frizzolândia</h2>
          <p className="text-white/80 mt-4 max-w-4xl mx-auto text-xl leading-relaxed font-light">
            Um ecossistema exclusivo para quem concentra mais de um seguro com a Frizzo. <br className="hidden md:block"/> Segurança, benefícios e um relacionamento que cresce com você.
          </p>
        </div>
      </div>

      <div className="container mx-auto flex flex-col items-center px-4 sm:px-6 relative z-10">
        <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 lg:p-16 flex flex-col justify-center transform transition-all hover:border-white/20">
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-0">
            
            {/* Left Column */}
            <div className="w-full lg:w-2/5 space-y-8 lg:pr-12 order-2 lg:order-1">
               <div 
                 onMouseEnter={() => handleHover(1)} onMouseLeave={handleLeave}
                 className={`p-6 rounded-2xl cursor-pointer text-center lg:text-right transition-all duration-500 border border-transparent ${highlightedId === 1 ? 'bg-white/10 border-white/20 shadow-lg scale-105' : 'hover:bg-white/5'}`}
               >
                 <h3 className="font-bold text-2xl text-white mb-2">Experiência no Mercado</h3>
                 <p className="text-white/70 text-base leading-relaxed">Há mais de 25 anos atuando com seguros, conhecemos o que realmente funciona para proteger você.</p>
               </div>
               <div 
                 onMouseEnter={() => handleHover(2)} onMouseLeave={handleLeave}
                 className={`p-6 rounded-2xl cursor-pointer text-center lg:text-right transition-all duration-500 border border-transparent ${highlightedId === 2 ? 'bg-white/10 border-white/20 shadow-lg scale-105' : 'hover:bg-white/5'}`}
               >
                 <h3 className="font-bold text-2xl text-white mb-2">Relação de Confiança</h3>
                 <p className="text-white/70 text-base leading-relaxed">Conhecemos quem você é e construímos uma relação próxima e de longo prazo.</p>
               </div>
            </div>

            {/* Center Logo Split */}
            <div className="w-full lg:w-auto my-12 lg:my-0 flex justify-center order-1 lg:order-2">
               <div className="relative w-64 h-64 lg:w-80 lg:h-80 grid grid-cols-2 grid-rows-2 gap-0 transition-transform duration-700">
                 <div onMouseEnter={() => handleHover(1)} onMouseLeave={handleLeave} className={`overflow-hidden relative transition-transform duration-500 z-10 ${highlightedId === 1 ? 'scale-105 -translate-x-2 -translate-y-2' : ''}`}>
                   <img src="/img/logo.png" className="absolute top-0 left-0 w-[200%] h-[200%] max-w-none object-cover" />
                 </div>
                 <div onMouseEnter={() => handleHover(3)} onMouseLeave={handleLeave} className={`overflow-hidden relative transition-transform duration-500 z-10 ${highlightedId === 3 ? 'scale-105 translate-x-2 -translate-y-2' : ''}`}>
                   <img src="/img/logo.png" className="absolute top-0 -left-full w-[200%] h-[200%] max-w-none object-cover" />
                 </div>
                 <div onMouseEnter={() => handleHover(2)} onMouseLeave={handleLeave} className={`overflow-hidden relative transition-transform duration-500 z-10 ${highlightedId === 2 ? 'scale-105 -translate-x-2 translate-y-2' : ''}`}>
                   <img src="/img/logo.png" className="absolute -top-full left-0 w-[200%] h-[200%] max-w-none object-cover" />
                 </div>
                 <div onMouseEnter={() => handleHover(4)} onMouseLeave={handleLeave} className={`overflow-hidden relative transition-transform duration-500 z-10 ${highlightedId === 4 ? 'scale-105 translate-x-2 translate-y-2' : ''}`}>
                   <img src="/img/logo.png" className="absolute -top-full -left-full w-[200%] h-[200%] max-w-none object-cover" />
                 </div>
               </div>
            </div>

            {/* Right Column */}
            <div className="w-full lg:w-2/5 space-y-8 lg:pl-12 order-3">
               <div 
                 onMouseEnter={() => handleHover(3)} onMouseLeave={handleLeave}
                 className={`p-6 rounded-2xl cursor-pointer text-center lg:text-left transition-all duration-500 border border-transparent ${highlightedId === 3 ? 'bg-white/10 border-white/20 shadow-lg scale-105' : 'hover:bg-white/5'}`}
               >
                 <h3 className="font-bold text-2xl text-white mb-2">Gestão da Apólice</h3>
                 <p className="text-white/70 text-base leading-relaxed">Cuidamos das suas apólices e renovações para que sua proteção esteja sempre atualizada.</p>
               </div>
               <div 
                 onMouseEnter={() => handleHover(4)} onMouseLeave={handleLeave}
                 className={`p-6 rounded-2xl cursor-pointer text-center lg:text-left transition-all duration-500 border border-transparent ${highlightedId === 4 ? 'bg-white/10 border-white/20 shadow-lg scale-105' : 'hover:bg-white/5'}`}
               >
                 <h3 className="font-bold text-2xl text-white mb-2">Programa de Benefícios</h3>
                 <p className="text-white/70 text-base leading-relaxed">Participa de um programa com créditos e condições diferenciadas para novos contratos.</p>
               </div>
            </div>

          </div>
        </div>
        
        <div className="w-full text-center mt-16">
           <a href="#contato" className="inline-block bg-[#13acd3] text-white font-bold py-5 px-12 text-xl rounded-full hover:bg-[#01cbfe] transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl ring-4 ring-[#13acd3]/30">
             Venha fazer parte dessa comunidade!
           </a>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', type: '', message: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Olá! Gostaria de solicitar uma cotação.\n\n*Nome:* ${formData.name}\n*E-mail:* ${formData.email}\n*Telefone:* ${formData.phone}\n*Tipo de Seguro:* ${formData.type}\n\n*Mensagem:*\n${formData.message}`;
    window.open(`https://wa.me/5511973039860?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contato" className="py-20 lg:py-28 overflow-hidden bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#193c5c]">Entre em Contato</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">Tire suas dúvidas ou solicite sua cotação online gratuita.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Info Side */}
          <div className="lg:col-span-3 flex flex-col space-y-8 p-8 rounded-3xl shadow-2xl bg-[#193c5c] h-full text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

             <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-xl bg-gray-900 border border-white/10 relative z-10">
               <iframe title="Localização" className="w-full h-full border-0 opacity-90 hover:opacity-100 transition-opacity" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.7149289588315!2d-46.74414042372487!3d-23.578679778787873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5434d3b729bd%3A0x22dc1a58d07f0ec0!2sFfrizzo%20Seguros!5e0!3m2!1spt-BR!2sbr!4v1764617321726!5m2!1spt-BR!2sbr" allowFullScreen loading="lazy"></iframe>
             </div>
             
             <div className="grid md:grid-cols-3 gap-6 relative z-10">
                <a href="https://www.google.com/maps/place/Ffrizzo+Seguros/@-23.5786798,-46.7441404,17z/data=!4m18!1m9!3m8!1s0x94ce5434d3b729bd:0x22dc1a58d07f0ec0!2sFfrizzo+Seguros!8m2!3d-23.5786798!4d-46.7415655!9m1!1b1!16s%2Fg%2F11bzwxmpml!3m7!1s0x94ce5434d3b729bd:0x22dc1a58d07f0ec0!8m2!3d-23.5786798!4d-46.7415655!9m1!1b1!16s%2Fg%2F11bzwxmpml?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D" target="_blank" className="flex flex-col items-center text-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/5 hover:border-white/20">
                  <div className="p-3 bg-[#01cbfe]/20 rounded-full text-[#01cbfe]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div><h4 className="font-bold text-lg">Endereço</h4><p className="text-sm text-white/80">Rua Moacir Miguel da Silva 91</p></div>
                </a>
                <div className="flex flex-col items-center text-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/5 hover:border-white/20">
                  <div className="p-3 bg-[#01cbfe]/20 rounded-full text-[#01cbfe]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div><h4 className="font-bold text-lg">Horário</h4><p className="text-sm text-white/80">Seg a Sex, 8h às 17h</p></div>
                </div>
                <button onClick={downloadVCard} className="flex flex-col items-center text-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/5 hover:border-white/20">
                  <div className="p-3 bg-[#01cbfe]/20 rounded-full text-[#01cbfe]">
                    <UserPlus className="w-6 h-6" />
                  </div>
                  <div><h4 className="font-bold text-lg">Salvar Contato</h4><p className="text-sm text-white/80">Adicionar à agenda</p></div>
                </button>
             </div>

             <div className="grid md:grid-cols-3 gap-6 relative z-10">
                <a href="mailto:administrativo@frizzoseguros.com.br" className="flex flex-col items-center text-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/5 hover:border-white/20">
                  <div className="p-3 bg-[#01cbfe]/20 rounded-full text-[#01cbfe]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div><h4 className="font-bold text-lg">E-mail</h4><p className="text-xs text-white/80 break-all">admin@frizzoseguros.com.br</p></div>
                </a>
                <a href="https://wa.me/5511973039860" className="flex flex-col items-center text-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/5 hover:border-white/20">
                  <div className="p-3 bg-[#01cbfe]/20 rounded-full text-[#01cbfe]">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div><h4 className="font-bold text-lg">WhatsApp</h4><p className="text-sm text-white/80">Converse conosco!</p></div>
                </a>
                <a href="https://www.google.com/maps/place/FFrizzo+Seguros/@-23.5786798,-46.7415655,17z/data=!4m18!1m9!3m8!1s0x94ce5434d3b729bd:0x22dc1a58d07f0ec0!2sFFrizzo+Seguros!8m2!3d-23.5786798!4d-46.7415655!9m1!1b1!16s%2Fg%2F11bzwxmpml!3m7!1s0x94ce5434d3b729bd:0x22dc1a58d07f0ec0!8m2!3d-23.5786798!4d-46.7415655!9m1!1b1!16s%2Fg%2F11bzwxmpml?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D" target="_blank" className="flex flex-col items-center text-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition border border-white/5 hover:border-white/20">
                  <div className="p-3 bg-[#01cbfe]/20 rounded-full text-[#01cbfe]">
                    <Star className="w-6 h-6" />
                  </div>
                  <div><h4 className="font-bold text-lg">Avalie-nos</h4><p className="text-sm text-white/80">Sua opinião importa!</p></div>
                </a>
             </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-2 p-8 sm:p-10 rounded-3xl shadow-2xl bg-white h-full text-gray-800 border border-gray-100">
             <h2 className="text-3xl font-bold text-center mb-8 text-[#193c5c]">Cotação Online</h2>
             <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                   <label className="block text-sm font-bold mb-2 text-gray-600">Seu nome completo</label>
                   <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Nome Completo" className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#01cbfe] focus:ring-2 focus:ring-[#01cbfe]/20 outline-none transition-all" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   <div>
                     <label className="block text-sm font-bold mb-2 text-gray-600">E-mail</label>
                     <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="seu@email.com" className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#01cbfe] focus:ring-2 focus:ring-[#01cbfe]/20 outline-none transition-all" />
                   </div>
                   <div>
                     <label className="block text-sm font-bold mb-2 text-gray-600">WhatsApp</label>
                     <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="(11) 99999-9999" className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#01cbfe] focus:ring-2 focus:ring-[#01cbfe]/20 outline-none transition-all" />
                   </div>
                </div>
                <div>
                   <label className="block text-sm font-bold mb-2 text-gray-600">Tipo de Seguro</label>
                   <select required name="type" value={formData.type} onChange={handleChange} className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#01cbfe] focus:ring-2 focus:ring-[#01cbfe]/20 outline-none transition-all">
                      <option value="">Selecione...</option>
                      <option value="saude">Saúde</option>
                      <option value="consorcio">Consórcio</option>
                      <option value="auto">Auto</option>
                      <option value="vida">Vida</option>
                      <option value="empresarial">Empresarial</option>
                      <option value="residencial">Residencial</option>
                      <option value="viagem">Viagem</option>
                   </select>
                </div>
                <div>
                   <label className="block text-sm font-bold mb-2 text-gray-600">Mensagem</label>
                   <textarea required name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Descreva sua necessidade..." className="w-full p-3 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#01cbfe] focus:ring-2 focus:ring-[#01cbfe]/20 outline-none transition-all resize-none"></textarea>
                </div>
                <div className="text-center pt-2">
                   <button type="submit" className="w-full bg-[#193c5c] text-white font-bold py-4 px-8 rounded-lg hover:bg-[#13acd3] transition-all transform hover:scale-[1.02] shadow-lg">
                     Solicitar Cotação
                   </button>
                </div>
             </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Socials = () => {
  return (
    <section id="frizzolandia" className="pt-10 pb-20 lg:pt-12 lg:pb-24 bg-[#193c5c] overflow-hidden">
       <div className="container mx-auto px-6">
         <div className="text-center mt-12 mb-16">
             <h2 className="text-4xl md:text-5xl font-bold text-white">Conecte-se Conosco</h2>
             <p className="text-white/90 mt-4 max-w-2xl mx-auto text-lg">Acompanhe nossos conteúdos exclusivos.</p>
         </div>
         
         <div className="flex justify-center items-center space-x-4 md:space-x-8 mb-12">
             <a href="https://www.instagram.com/frizzoseguros/" target="_blank" className="flex items-center gap-2 text-white font-bold py-3 px-6 rounded-xl shadow-lg bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 transform hover:scale-110 transition-transform">
                <Instagram size={20} /> Instagram
             </a>
             <a href="https://www.facebook.com/frizzoseguros/" target="_blank" className="flex items-center gap-2 text-white font-bold py-3 px-6 rounded-xl shadow-lg bg-[#1877F2] transform hover:scale-110 transition-transform">
                <Facebook size={20} /> Facebook
             </a>
             <a href="https://www.linkedin.com/company/frizzo-corretora-de-seguros/" target="_blank" className="flex items-center gap-2 text-white font-bold py-3 px-6 rounded-xl shadow-lg bg-[#0A66C2] transform hover:scale-110 transition-transform">
                <Linkedin size={20} /> LinkedIn
             </a>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {[1, 2, 3, 4].map((i) => (
               <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-2 transform hover:scale-105 transition-transform duration-300">
                 <div className="w-full aspect-[9/16] bg-black/20 rounded-lg flex items-center justify-center relative group">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
                            <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                        </div>
                    </div>
                    <video className="w-full h-full object-cover rounded-lg" controls>
                      <source src="/img/teste.mp4" type="video/mp4" />
                    </video>
                 </div>
               </div>
             ))}
         </div>
       </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-white border-t border-gray-200">
     <div className="container mx-auto py-8 px-6 flex flex-wrap justify-between items-center text-sm text-gray-600">
        <div className="w-full md:w-auto text-center md:text-left mb-4 md:mb-0 font-medium">&copy; 2026 Frizzo Corretora de Seguros.</div>
        <div className="w-full md:w-auto flex justify-center space-x-8 mb-4 md:mb-0">
           <a href="#" className="hover:text-[#13acd3] transition-colors">Política de Privacidade</a>
           <a href="#" className="hover:text-[#13acd3] transition-colors">Termos de Uso</a>
        </div>
        <div className="w-full md:w-auto flex justify-center space-x-6">
           <a href="https://www.linkedin.com/company/frizzo-corretora-de-seguros/" target="_blank" className="text-[#13acd3] opacity-60 hover:opacity-100 transition-opacity hover:scale-110 transform duration-200">
             <Linkedin size={24} />
           </a>
           <a href="https://www.instagram.com/frizzoseguros/" target="_blank" className="text-[#13acd3] opacity-60 hover:opacity-100 transition-opacity hover:scale-110 transform duration-200">
             <Instagram size={24} />
           </a>
           <a href="https://www.facebook.com/frizzoseguros/" target="_blank" className="text-[#13acd3] opacity-60 hover:opacity-100 transition-opacity hover:scale-110 transform duration-200">
             <Facebook size={24} />
           </a>
        </div>
     </div>
  </footer>
);

export default function App() {
  return (
    <div className="font-sans antialiased text-gray-800 bg-white selection:bg-[#01cbfe] selection:text-white">
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        
        .scroller:hover .animate-scroll {
          animation-play-state: paused;
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideUpFade {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in forwards;
        }

        @keyframes blurIn {
          from { opacity: 0; transform: translateY(20px) scale(0.95); filter: blur(5px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        .animate-blurIn {
          animation: blurIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-zoomIn {
          animation: zoomIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes pulse-whatsapp {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(34, 197, 94, 0); }
        }

        .mask-linear-gradient {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
      
      <Header />
      <Hero />
      <Services />
      <Partners />
      <Frizzolandia />
      <Contact />
      <Socials />
      <Footer />
      
      <a 
        href="https://wa.me/5511973039860"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white w-14 h-14 lg:w-auto lg:px-5 lg:py-3 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-[60] hover:scale-110"
        style={{ animation: 'pulse-whatsapp 2s infinite' }}
      >
        <img src="/img/wpp.png" alt="WhatsApp" className="w-8 h-8 lg:w-6 lg:h-6 lg:mr-2 filter brightness-0 invert" />
        <span className="hidden lg:inline font-bold text-sm tracking-wide">Fale Conosco</span>
      </a>
    </div>
  );
}