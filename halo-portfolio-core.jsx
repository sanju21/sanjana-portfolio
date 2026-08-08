const { useEffect } = React;

const ArrowRight = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>
  </svg>
);

const LinkedInIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"></path>
  </svg>
);

const EMAIL = "mailto:sanjana.s.rane21@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/rane-sanjana/";

const Monogram = ({ className = "" }) => (
  <svg viewBox="0 0 256 256" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M 128.005 191.173 C 128.448 156.208 156.93 128 192 128 L 192 64 L 128 64 C 128 99.346 99.346 128 64 128 L 64 192 L 128 192 Z M 192 256 L 64 256 C 28.654 256 0 227.346 0 192 L 0 64 L 64 64 L 64 0 L 192 0 C 227.346 0 256 28.654 256 64 L 256 192 L 192 192 Z"></path>
  </svg>
);

const VIDEO_A = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4";
const VIDEO_B = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_183428_ab5e672a-f608-4dcb-b319-f3e040f02e2d.mp4";

// Self-hosted brand marks, keyed by domain. Vectors where the brand publishes one,
// otherwise the largest square icon the company ships. Chips are ~40-48px, so these
// are all square emblems — wordmark logos are unusable at that size.
// Domains absent here fall back to the favicon service.
const LOGOS = {
  "morganstanley.com": "assets/logos/morganstanley-mark.png",
  "jpmorganchase.com": "assets/logos/jpmorganchase.png",
  "huawei.com": "assets/logos/huawei.svg",
  "larsentoubro.com": "assets/logos/larsentoubro.svg",
  "adobe.com": "assets/logos/adobe.svg",
  "tableau.com": "assets/logos/tableau.svg",
  "powerbi.microsoft.com": "assets/logos/powerbi.svg",
  "salesforce.com": "assets/logos/salesforce.svg",
  "ads.google.com": "assets/logos/googleads.svg",
  "marketingplatform.google.com": "assets/logos/googlemarketingplatform.svg",
  "mysql.com": "assets/logos/mysql.svg",
  "eatonvance.com": "assets/logos/eatonvance.png",
  "calvert.com": "assets/logos/calvert.svg",
  "parametricportfolio.com": "assets/logos/parametric.svg",
  "nestaway.com": "assets/logos/nestaway.png",
  "seismic.com": "assets/logos/seismic.png",
};

const logoSrc = (domain) =>
  LOGOS[domain] || `https://www.google.com/s2/favicons?sz=128&domain=${domain}`;

// ─────────── Lazy background video ───────────
// Each clip is ~5 MB. The two below-fold ones hold their src back until near
// the viewport; the hero passes `eager` since deferring something already
// on screen only delays it.
//
// A blank card is far worse than an early fetch, so the observer is a
// best-effort optimisation with two escape hatches: no IntersectionObserver
// support loads immediately, and a timeout loads anyway if the observer never
// reports (it does not fire at all while the tab is hidden, for instance).
const LazyVideo = ({ src, className, eager = false }) => {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(eager);
  useEffect(() => {
    if (eager) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setVisible(true); return; }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { rootMargin: "300px" },
    );
    io.observe(el);
    const fallback = setTimeout(() => setVisible(true), 4000);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, [eager]);
  return (
    <video ref={ref} autoPlay muted loop playsInline preload="none" aria-hidden="true"
      className={className} src={visible ? src : undefined}></video>
  );
};

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
  const [open, setOpen] = React.useState(false);
  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 24, behavior: "smooth" });
  };
  // Lock body scroll while the mobile sheet is open so the page behind stays put.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 px-4 sm:px-6 py-4 sm:py-5">
      <div className="max-w-[88rem] mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xl sm:text-2xl font-medium tracking-tight text-black truncate">Sanjana Rane</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={go(l.toLowerCase())} className="text-base text-gray-700 hover:text-black font-medium transition-colors duration-200 py-2">{l}</a>
          ))}
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile"
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-700 hover:text-black hover:bg-black/5 transition-colors duration-200">
            <LinkedInIcon className="w-5 h-5" />
          </a>
          <a href={EMAIL} className="btn-pill text-sm sm:text-base font-medium px-4 sm:px-7 py-2.5 rounded-full transition-colors duration-200 whitespace-nowrap">Get in touch</a>
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden w-10 h-10 rounded-full flex items-center justify-center text-black hover:bg-black/5 transition-colors duration-200">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>
                    : <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="md:hidden mt-3 rounded-2xl bg-white/95 backdrop-blur p-2 shadow-lg ring-1 ring-black/5">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={go(l.toLowerCase())}
              className="block px-4 py-3 rounded-xl text-base font-medium text-gray-800 hover:bg-black/5 transition-colors duration-200">{l}</a>
          ))}
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-base font-medium text-gray-800 hover:bg-black/5 transition-colors duration-200">
            <LinkedInIcon className="w-4 h-4" /> LinkedIn
          </a>
        </div>
      )}
    </nav>
  );
};

// ─────────── Logo chip (favicon mark + name) ───────────
const LogoChip = ({ name, domain }) => {
  const [failed, setFailed] = React.useState(false);
  return (
    <span className="mx-7 shrink-0 flex items-center gap-3 whitespace-nowrap">
      {domain && !failed && (
        <img src={logoSrc(domain)} alt={`${name} logo`} loading="lazy"
          onError={() => setFailed(true)}
          className="w-10 h-10 object-contain rounded-[7px] bg-white p-1.5 shrink-0" />
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
        <LazyVideo eager className="object-cover absolute inset-0 w-full h-full" src={VIDEO_A} />
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
  <section id="about" className="bg-page px-4 sm:px-6 py-14 sm:py-20 md:py-24">
    <div className="max-w-[88rem] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-10 md:mb-16 items-start">
        <div>
          <h2 className="text-black text-3xl sm:text-4xl md:text-5xl font-medium leading-tight" style={{ letterSpacing: "-0.03em" }}>Meet Sanjana</h2>
        </div>
        <p className="text-black/70 text-xl sm:text-2xl md:text-3xl leading-relaxed">
          A marketing operations specialist blending AI automation and engineered prompts with digital campaign delivery where precision, discretion and white-glove execution meet scale.
        </p>
      </div>

      {/* Cards sit heading-top / body-bottom on sm+ where the 320px min-height
          makes that deliberate. On mobile the content is short relative to the
          card, so justify-between opened a dead gap — let it flow instead. */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl overflow-hidden lg:col-span-2 p-6 sm:p-7 sm:min-h-80 flex flex-col gap-4 sm:gap-6 sm:justify-between relative">
          <LazyVideo className="object-cover absolute inset-0 w-full h-full" src={VIDEO_B} />
          {/* The diagonal hero scrim clears text on a wide hero but leaves the
              right side bare on a narrow card, so use a flat wash on mobile. */}
          <div className="absolute inset-0 z-[1] pointer-events-none bg-white/75 sm:bg-transparent"></div>
          <div className="hidden sm:block hero-scrim absolute inset-0 z-[1] pointer-events-none"></div>
          <h3 className="relative z-10 text-black text-[28px] font-medium leading-snug" style={{ letterSpacing: "-0.02em" }}>Campaigns that convert</h3>
          <p className="relative z-10 text-black text-[20px] font-semibold max-w-xs">Eight-figure paid-media programmes with a 20% lift in conversion and data-driven audience targeting.</p>
        </div>
        <div className="bg-card-dark rounded-2xl p-6 sm:p-7 sm:min-h-80 flex flex-col gap-3 sm:gap-6 sm:justify-between">
          <h3 className="text-white text-2xl font-medium leading-snug">Always compliant,<br />always precise.</h3>
          <p className="text-white/75 text-base">Regulated fund collateral and factsheets across EMEA, US and APAC — accuracy is non-negotiable.</p>
        </div>
        <div className="bg-card-dark rounded-2xl p-6 sm:p-7 sm:min-h-80 flex flex-col gap-3 sm:gap-6 sm:justify-between">
          <h3 className="text-white text-2xl font-medium leading-snug">AI-powered<br />automation</h3>
          <p className="text-white/75 text-base">Architected data-extraction workflows saving ~200 hours annually across monthly and quarter-end deliverables.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-3 sm:mt-4">
        {stats.map((s) => (
          <div key={s.v} className="rounded-2xl bg-white p-5 sm:p-7 flex flex-col justify-between min-h-32 sm:min-h-40">
            <div className="accent-text text-3xl sm:text-4xl md:text-5xl font-medium" style={{ letterSpacing: "-0.03em" }}>{s.k}</div>
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
  <section id="skills" className="bg-page px-4 sm:px-6 py-6 sm:py-8 md:py-12">
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

Object.assign(window, { ArrowRight, LinkedInIcon, LazyVideo, PillButton, Navbar, HeroSection, AboutSection, SkillsSection, VIDEO_B, logoSrc, EMAIL, LINKEDIN });
