const { useEffect } = React;

const ArrowRight = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>
  </svg>
);

const Monogram = ({ className = "" }) => (
  <svg viewBox="0 0 256 256" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M 128.005 191.173 C 128.448 156.208 156.93 128 192 128 L 192 64 L 128 64 C 128 99.346 99.346 128 64 128 L 64 192 L 128 192 Z M 192 256 L 64 256 C 28.654 256 0 227.346 0 192 L 0 64 L 64 64 L 64 0 L 192 0 C 227.346 0 256 28.654 256 64 L 256 192 L 192 192 Z"></path>
  </svg>
);

const VIDEO_A = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4";
const VIDEO_B = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_183428_ab5e672a-f608-4dcb-b319-f3e040f02e2d.mp4";

// ─────────── Pill button ───────────
const PillButton = ({ children, textClass = "text-base md:text-lg", href, onClick }) => {
  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} onClick={onClick} className={`btn-pill inline-flex items-center gap-3 ${textClass} font-medium pl-8 pr-2 py-2 rounded-full transition-colors duration-200`}>
      {children}
      <span className="bg-white rounded-full p-2 flex items-center justify-center">
        <ArrowRight className="w-5 h-5 text-black" />
      </span>
    </Tag>
  );
};

// ─────────── Navbar ───────────
const Navbar = () => {
  const links = ["About", "Experience", "Skills", "Recognition"];
  const go = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 24, behavior: "smooth" });
  };
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 px-4 sm:px-6 py-4 sm:py-5">
      <div className="max-w-[88rem] mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl sm:text-2xl font-medium tracking-tight text-black truncate">Sanjana Rane</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={go(l.toLowerCase())} className="text-base text-gray-700 hover:text-black font-medium transition-colors duration-200">{l}</a>
          ))}
        </div>
        <a href="mailto:sanjana.s.rane21@gmail.com" className="btn-pill text-sm sm:text-base font-medium px-4 sm:px-7 py-2 sm:py-2.5 rounded-full transition-colors duration-200 shrink-0 whitespace-nowrap">Get in touch</a>
      </div>
    </nav>
  );
};

// ─────────── Logo chip (favicon mark + name) ───────────
const LogoChip = ({ name, domain }) => {
  const [failed, setFailed] = React.useState(false);
  return (
    <span className="mx-7 shrink-0 flex items-center gap-3 whitespace-nowrap">
      {domain && !failed && (
        <img src={`https://www.google.com/s2/favicons?sz=128&domain=${domain}`} alt="" loading="lazy"
          onError={() => setFailed(true)}
          className="w-10 h-10 object-contain rounded-[7px] bg-white/70 shrink-0" />
      )}
      <span className="text-black/70 font-medium" style={{ fontSize: "18px", letterSpacing: "-0.01em" }}>{name}</span>
    </span>
  );
};

// ─────────── Hero brand marquee (institutions) ───────────
const HERO_BRANDS = [
  { n: "Morgan Stanley", d: "morganstanley.com" },
  { n: "JPMorgan Chase", d: "jpmorganchase.com" },
  { n: "Huawei", d: "huawei.com" },
  { n: "Larsen & Toubro", d: "larsentoubro.com" },
  { n: "Eaton Vance", d: "eatonvance.com" },
  { n: "Calvert", d: "calvert.com" },
  { n: "Parametric", d: "parametricportfolio.com" },
];

const HeroMarquee = () => (
  <div className="mt-12 w-full max-w-xl overflow-hidden py-3 shrink-0">
    <div className="marquee-track">
      {[...HERO_BRANDS, ...HERO_BRANDS].map((b, i) => (
        <LogoChip key={i} name={b.n} domain={b.d} />
      ))}
    </div>
  </div>
);

// ─────────── Hero ───────────
const HeroSection = () => (
  <section className="flex-1 px-4 sm:px-6 pt-20 pb-4 sm:pb-6 flex items-end">
    <div className="max-w-[88rem] mx-auto w-full">
      <div className="relative w-full rounded-2xl overflow-hidden" style={{ minHeight: "calc(100svh - 88px)" }}>
        <video autoPlay muted loop playsInline className="object-cover absolute inset-0 w-full h-full" src={VIDEO_A}></video>
        <div className="hero-scrim absolute inset-0 z-[1] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col items-start justify-start min-h-full p-6 pt-24 pb-10 sm:p-10 sm:pt-28 md:p-12 md:pt-28 md:pb-16">
          <p className="accent-text text-sm md:text-base font-semibold mb-4">AI Automation, Digital Campaigns &amp; Marketing Operations</p>
          <h1 className="text-black text-[2.5rem] leading-[1.05] sm:text-5xl sm:leading-tight md:text-6xl font-medium max-w-2xl mb-4" style={{ letterSpacing: "-0.04em" }}>
            Boosting marketing<br />campaigns through AI.
          </h1>
          <p className="text-black/80 text-base md:text-lg max-w-md mb-8 leading-relaxed" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
            Seven years architecting multi-region campaigns and white-glove client delivery across Morgan Stanley, JPMorgan Chase and global technology.
          </p>
          <PillButton href="mailto:sanjana.s.rane21@gmail.com">Get in touch</PillButton>
          <HeroMarquee />
        </div>
      </div>
    </div>
  </section>
);

// ─────────── Meet / About ───────────
const stats = [
  { k: "7+", v: "Years experience" },
  { k: "$18M", v: "Quarterly paid media" },
  { k: "200+", v: "Hours saved / year" },
  { k: "3", v: "Regions delivered" },
];

const AboutSection = () => (
  <section id="about" className="bg-page px-4 sm:px-6 py-16 sm:py-20 md:py-24">
    <div className="max-w-[88rem] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-10 md:mb-16 items-start">
        <div>
          <h2 className="text-black text-3xl sm:text-4xl md:text-5xl font-medium leading-tight" style={{ letterSpacing: "-0.03em" }}>Meet Sanjana</h2>
        </div>
        <p className="text-black/70 text-xl sm:text-2xl md:text-3xl leading-relaxed">
          A marketing operations specialist blending AI automation and engineered prompts with digital campaign delivery where precision, discretion and white-glove execution meet scale.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl overflow-hidden lg:col-span-2 p-7 min-h-80 flex flex-col justify-between relative">
          <video autoPlay muted loop playsInline className="object-cover absolute inset-0 w-full h-full" src={VIDEO_B}></video>
          <div className="hero-scrim absolute inset-0 z-[1] pointer-events-none"></div>
          <h3 className="relative z-10 text-black text-[28px] font-medium leading-snug" style={{ letterSpacing: "-0.02em" }}>Campaigns that convert</h3>
          <p className="relative z-10 text-black text-[20px] font-semibold max-w-xs">Eight-figure paid-media programmes with a 20% lift in conversion and data-driven audience targeting.</p>
        </div>
        <div className="bg-card-dark rounded-2xl p-7 min-h-80 flex flex-col justify-between">
          <h3 className="text-white text-2xl font-medium leading-snug">Always compliant,<br />always precise.</h3>
          <p className="text-white/60 text-base">Regulated fund collateral and factsheets across EMEA, US and APAC — accuracy is non-negotiable.</p>
        </div>
        <div className="bg-card-dark rounded-2xl p-7 min-h-80 flex flex-col justify-between">
          <h3 className="text-white text-2xl font-medium leading-snug">AI-powered<br />automation</h3>
          <p className="text-white/60 text-base">Architected data-extraction workflows saving ~200 hours annually across monthly and quarter-end deliverables.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {stats.map((s) => (
          <div key={s.v} className="rounded-2xl bg-white p-7 flex flex-col justify-between min-h-40">
            <div className="accent-text text-4xl md:text-5xl font-medium" style={{ letterSpacing: "-0.03em" }}>{s.k}</div>
            <div className="text-black/60 text-sm mt-3">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────── Skills marquee ───────────
const TOOLS = [
  { n: "Adobe Experience Manager", d: "adobe.com" },
  { n: "Seismic", d: "seismic.com" },
  { n: "Tableau", d: "tableau.com" },
  { n: "Power BI", d: "powerbi.microsoft.com" },
  { n: "Salesforce", d: "salesforce.com" },
  { n: "Google Ads", d: "ads.google.com" },
  { n: "Display & Video 360", d: "marketingplatform.google.com" },
  { n: "Campaign Manager 360", d: "marketingplatform.google.com" },
  { n: "MySQL", d: "mysql.com" },
];

const SkillsSection = () => (
  <section id="skills" className="bg-page px-4 sm:px-6 py-8 md:py-12">
    <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 items-center">
      <div className="text-black/70 text-base leading-relaxed">
        Platforms &amp; tools I work across every day.
      </div>
      <div className="md:col-span-3 overflow-hidden py-3">
        <div className="backers-track">
          {[...TOOLS, ...TOOLS].map((b, i) => (
            <LogoChip key={i} name={b.n} domain={b.d} />
          ))}
        </div>
      </div>
    </div>
  </section>
);

Object.assign(window, { ArrowRight, PillButton, Navbar, HeroSection, AboutSection, SkillsSection, VIDEO_B });
