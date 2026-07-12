// components come from halo-portfolio-core.jsx (shared babel scope)

// ─────────── Experience ───────────
const JOBS = [
  { company: "Morgan Stanley Investment Management", domain: "morganstanley.com", role: "Associate — Marketing Operations", period: "Mar 2025 — Present", region: "EMEA · US · APAC",
    note: "Lead end-to-end production of MSIM factsheets, pitchbooks and fund collateral; architected AI data-extraction saving ~200 hours annually; project-managed the first Asia-Channel migration to India." },
  { company: "JPMorgan Chase & Co.", domain: "jpmorganchase.com", role: "Marketing Delivery Analyst — Strategy & Insights", period: "Apr 2022 — Dec 2023", region: "Mumbai, India",
    note: "Managed USD 10M–18M quarterly paid social & display, achieving 5% ROI and a 20% conversion lift across JPMC and co-brands — United, Air Canada, Disney, Marriott, Hyatt." },
  { company: "Larsen & Toubro — Huawei", domain: "huawei.com", role: "Search Product Operations Analyst", period: "Apr 2020 — Jan 2022", region: "APAC · EMEA · LATAM",
    note: "Built growth campaign frameworks for Huawei's Petal search across three regions; configured HTML5 landing pages and A/B tests; co-architected a keyword-accuracy automation tool." },
  { company: "Nestaway Technologies", domain: "nestaway.com", role: "Executive — Central Operations", period: "Apr 2019 — Jan 2020", region: "Bengaluru, India",
    note: "Salesforce CRM for property off-boarding and ticketing, facilitating deposit recoveries worth ~INR 7M with rigorous audit reporting." },
];

// Small logo tile for an Experience card (favicon with graceful fallback)
const JobLogo = ({ domain, dark }) => {
  const [failed, setFailed] = React.useState(false);
  if (!domain || failed) return null;
  return (
    <span className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${dark ? "bg-white" : "bg-white ring-1 ring-black/5"}`}>
      <img src={`https://www.google.com/s2/favicons?sz=128&domain=${domain}`} alt="" loading="lazy"
        onError={() => setFailed(true)} className="w-8 h-8 object-contain" />
    </span>
  );
};

const ExperienceCardHeader = ({ j, dark }) => (
  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
    <div className="flex items-center gap-3.5">
      <JobLogo domain={j.domain} dark={dark} />
      <h3 className={`text-xl sm:text-2xl font-medium leading-snug ${dark ? "text-white" : "text-black"}`} style={{ letterSpacing: "-0.02em" }}>{j.company}</h3>
    </div>
    <span className={`text-sm whitespace-nowrap sm:mt-1 ${dark ? "text-white/50" : "text-black/50"}`}>{j.period}</span>
  </div>
);

const ExperienceSection = () => (
  <section id="experience" className="bg-page px-4 sm:px-6 py-16 sm:py-20 md:py-24">
    <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
      <div className="md:pr-12 md:pt-2 md:sticky md:top-10">
        <p className="accent-text text-sm font-semibold mb-2">Where I've delivered</p>
        <h2 className="text-black text-4xl sm:text-5xl md:text-6xl font-medium leading-none mb-6" style={{ letterSpacing: "-0.04em" }}>Experience</h2>
        <p className="text-black/60 text-base leading-relaxed max-w-sm">
          Progressive roles across Tier-1 financial institutions, global technology and hospitality — delivering multi-region campaigns and regulated reporting.
        </p>
        <div className="mt-8 rounded-3xl overflow-hidden relative min-h-[280px] sm:min-h-[360px] md:min-h-[640px]">
          <video autoPlay muted loop playsInline className="object-cover absolute inset-0 w-full h-full" src={VIDEO_B}></video>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {JOBS.map((j, i) => (
          <div key={j.company} className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between min-h-56 ${i === 0 ? "bg-card-dark" : "bg-white"}`}>
            <ExperienceCardHeader j={j} dark={i === 0} />
            <div className={`text-sm mt-1 ${i === 0 ? "text-white/70" : "text-black/60"}`}>{j.role} · {j.region}</div>
            <p className={`text-base mt-5 leading-relaxed ${i === 0 ? "text-white/60" : "text-black/70"}`}>{j.note}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────── Recognition ───────────
const AWARDS = [
  { year: "2022", title: "Outstanding Performer", org: "JPMorgan Chase & Co.", note: "For architecting an in-house Automation QA tool that improved keyword accuracy and reporting efficiency." },
  { year: "2020–21", title: "Best Employee — 2 years running", org: "Huawei / L&T", note: "For ownership of Petal search-product operations across global markets." },
  { year: "2024–25", title: "25% QoQ revenue growth", org: "Family F&B — Marketing Lead", note: "Led marketing strategy delivering growth over three consecutive quarters." },
];

const RecognitionSection = () => (
  <section id="recognition" className="bg-page px-4 sm:px-6 py-16 sm:py-20 md:py-24">
    <div className="max-w-[88rem] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-10 md:mb-16 items-start">
        <h2 className="text-black text-3xl sm:text-4xl md:text-5xl font-medium leading-tight" style={{ letterSpacing: "-0.03em" }}>Recognition &amp; Impact</h2>
        <p className="text-black/70 text-xl md:text-2xl leading-relaxed">
          Certified in Google Analytics, HubSpot and SQL — and repeatedly recognised for automation and delivery excellence.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {AWARDS.map((a) => (
          <div key={a.title} className="rounded-2xl bg-white p-6 sm:p-7 min-h-64 flex flex-col justify-between">
            <div className="text-black/50 text-sm">{a.year}</div>
            <div>
              <h3 className="text-black text-2xl font-medium leading-snug mt-6" style={{ letterSpacing: "-0.02em" }}>{a.title}</h3>
              <div className="text-black/60 text-sm mt-2">{a.org}</div>
              <p className="text-black/70 text-base mt-4 leading-relaxed">{a.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─────────── Contact ───────────
const ContactSection = () => (
  <section id="contact" className="bg-page px-4 sm:px-6 pb-16 sm:pb-24 pt-8">
    <div className="max-w-[88rem] mx-auto">
      <div className="rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: message + actions */}
        <div className="bg-card-dark p-8 sm:p-10 md:p-16 flex flex-col justify-center order-2 md:order-1">
          <p className="accent-text text-sm font-semibold tracking-wide uppercase mb-4" style={{ color: "#8FB4FF" }}>Let's connect</p>
          <h2 className="text-white text-4xl sm:text-5xl md:text-6xl font-medium leading-tight mb-6" style={{ letterSpacing: "-0.04em" }}>
            Let's build the<br />next campaign.
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-md mb-8 leading-relaxed" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
            Based in Bengaluru, India · Open to relocating to the UAE.
          </p>
          <div className="flex flex-wrap gap-3">
            <PillButton href="mailto:sanjana.s.rane21@gmail.com">Email me</PillButton>
            <a href="tel:+917619441862" className="inline-flex items-center bg-white text-black text-base md:text-lg font-medium px-8 py-3.5 rounded-full hover:bg-white/80 transition-colors duration-200" style={{ boxShadow: "0 0 0 0.5px rgba(0,0,0,0.05), 0 4px 30px rgba(0,0,0,0.08)" }}>
              +91 76194 41862
            </a>
          </div>
        </div>
        {/* Right: portrait */}
        <div className="relative min-h-[420px] md:min-h-[560px] order-1 md:order-2 bg-card-dark">
          <img src="assets/sanjana-portrait.jpeg" alt="Sanjana Rane" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "50% 18%" }} />
          {/* seam blend into the navy panel (desktop only) */}
          <div className="hidden md:block absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(90deg, var(--card-dark) 0%, rgba(20,35,58,0.35) 14%, rgba(20,35,58,0) 32%)" }}></div>
          {/* bottom vignette for the caption */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(11,20,36,0.85), transparent)" }}></div>
          <div className="absolute left-8 bottom-7 z-10">
            <div className="text-white text-xl font-medium" style={{ letterSpacing: "-0.02em" }}>Sanjana Rane</div>
            <div className="text-white/70 text-sm mt-0.5">Marketing Operations &amp; AI Automation</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─────────── App ───────────
const PALETTES = {
  "Cobalt (recommended)": ["#F1F5FB", "#14233A", "#2F6BFF", "#2F6BFF"],
  "Indigo AI":    ["#F3F2FB", "#1E1B4B", "#4F46E5", "#4F46E5"],
  "Slate Violet": ["#F5F5F5", "#2B2644", "#111111", "#6D5DD3"],
  "Emerald Growth":["#F0F5F1", "#0C2E22", "#12946A", "#0F8F5E"],
  "Signal Orange":["#FAF6F1", "#191512", "#E4571F", "#D64B16"],
  "Magenta Pulse":["#FAF1F6", "#2A0E24", "#C21F80", "#C21F80"],
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "Cobalt (recommended)",
  "coloredButtons": true
}/*EDITMODE-END*/;

function applyPalette(name, coloredButtons) {
  const p = PALETTES[name] || PALETTES["Cobalt (recommended)"];
  const [bg, card, pill, accent] = p;
  const root = document.documentElement.style;
  root.setProperty("--page-bg", bg);
  root.setProperty("--card-dark", card);
  root.setProperty("--pill-bg", coloredButtons ? pill : "#111111");
  root.setProperty("--accent", accent);
}

const App = () => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(() => { applyPalette(t.palette, t.coloredButtons); }, [t.palette, t.coloredButtons]);
  return (
  <div className="flex flex-col bg-page">
    <div className="min-h-[100svh] md:h-screen flex flex-col md:overflow-hidden relative">
      <Navbar />
      <HeroSection />
    </div>
    <AboutSection />
    <SkillsSection />
    <ExperienceSection />
    <RecognitionSection />
    <ContactSection />

    <TweaksPanel title="Tweaks">
      <TweakSection label="Colour theme" />
      <TweakSelect label="Palette" value={t.palette} options={Object.keys(PALETTES)} onChange={(v) => setTweak("palette", v)} />
      <TweakToggle label="Coloured buttons" value={t.coloredButtons} onChange={(v) => setTweak("coloredButtons", v)} />
    </TweaksPanel>
  </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
