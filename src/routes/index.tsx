import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
const heroImage = "/hero-1.jpeg";
import backImage from "@/assets/renu-back-movement.jpg";
import stretchImage from "@/assets/renu-gentle-stretch.jpg";
import jointImage from "@/assets/renu-joint-movement.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ReNu Pain & Wellness | Understand Your Pain. Find Your Way Forward." },
      { name: "description", content: "Personalized pain care begins with understanding. Explore ReNu's patient-first evaluation, care pathway, and conditions we help with." },
      { property: "og:title", content: "ReNu Pain & Wellness | A Clearer Path Through Pain" },
      { property: "og:description", content: "Understand your pain and find the right way forward with an evaluation-first approach to care." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const featuredConditions = [
  { name: "Back & spine pain", detail: "When pain keeps you from moving comfortably.", image: backImage, alt: "Person gently resting their hands against their lower back", shape: "rounded-t-[7rem] rounded-br-[7rem] rounded-bl-[1rem]" },
  { name: "Neck pain & headaches", detail: "When tension and discomfort disrupt your day.", image: stretchImage, alt: "Person gently stretching their shoulder", shape: "rounded-tl-[7rem] rounded-tr-[1rem] rounded-b-[7rem]" },
  { name: "Joint & arthritis pain", detail: "When everyday movement feels harder than it should.", image: jointImage, alt: "Hands resting gently on a bent knee", shape: "rounded-t-[7rem] rounded-br-[1rem] rounded-bl-[7rem]" },
];
const otherConditions = [
  { name: "Nerve pain & sciatica", detail: "Sharp, radiating pain that travels down your leg or arm.", image: stretchImage, alt: "Person gently stretching their shoulder", shape: "rounded-tl-[1rem] rounded-tr-[7rem] rounded-b-[7rem]" },
  { name: "Sports & accident injuries", detail: "Pain from acute injuries that hasn't resolved with rest.", image: jointImage, alt: "Hands resting gently on a bent knee", shape: "rounded-t-[7rem] rounded-bl-[7rem] rounded-br-[1rem]" },
  { name: "Pain after surgery", detail: "Post-surgical pain that lingers longer than expected.", image: backImage, alt: "Person gently resting their hands against their lower back", shape: "rounded-tl-[7rem] rounded-tr-[1rem] rounded-br-[7rem] rounded-bl-[1rem]" },
];
const steps = [
  { number: "01", title: "Listen", detail: "Your full story comes first." },
  { number: "02", title: "Evaluate", detail: "A focused, thoughtful exam." },
  { number: "03", title: "Explain", detail: "Clear options, in plain language." },
  { number: "04", title: "Treat", detail: "The right first step for you." },
  { number: "05", title: "Measure", detail: "Track what matters in daily life." },
  { number: "06", title: "Adjust", detail: "Refine the plan as you progress." },
];

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [version, setVersion] = useState<1 | 2 | 3>(1);
  const closeMenu = () => setMenuOpen(false);
  const conditionsRef = useRef<HTMLElement>(null);
  const [conditionsProgress, setConditionsProgress] = useState(0);
  const [conditionsTranslateY, setConditionsTranslateY] = useState(0);
  const [conditionsWrapperHeight, setConditionsWrapperHeight] = useState(0);
  const conditionsSentinelRef = useRef<HTMLDivElement>(null);
  const conditionsContentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const headerBottomRef = useRef(120);
  const [headerBottom, setHeaderBottom] = useState(120);
  const processRef = useRef<HTMLElement>(null);
  const evaluationRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLElement>(null);
  const scheduleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const refs = [conditionsRef, processRef, evaluationRef, quoteRef, scheduleRef];
    const update = () => {
      const hdr = headerRef.current;
      const hBottom = hdr ? hdr.offsetTop + hdr.offsetHeight : 120;
      headerBottomRef.current = hBottom;
      setHeaderBottom(hBottom);
      refs.forEach(ref => {
        const el = ref.current;
        if (!el) return;
        el.style.top = `${hBottom}px`;
      });
    };
    update();
    window.addEventListener('resize', update);

    const measureWrapper = () => {
      const content = conditionsContentRef.current;
      if (content) setConditionsWrapperHeight(content.offsetHeight);
    };
    measureWrapper();
    const ro = new ResizeObserver(measureWrapper);
    if (conditionsContentRef.current) ro.observe(conditionsContentRef.current);
    // Also remeasure on image load (images shift layout after mount)
    conditionsRef.current?.querySelectorAll('img').forEach(img => img.addEventListener('load', measureWrapper));

    const handleScroll = () => {
      const el = conditionsRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
      setConditionsProgress(progress);

      const sentinel = conditionsSentinelRef.current;
      if (sentinel) {
        const stickyTop = headerBottomRef.current;
        const scrollPast = Math.max(0, stickyTop - sentinel.getBoundingClientRect().top);
        const contentH = conditionsContentRef.current?.offsetHeight ?? el.scrollHeight;
        const maxScroll = Math.max(0, contentH - el.offsetHeight);
        setConditionsTranslateY(Math.min(scrollPast, maxScroll));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', handleScroll);
      ro.disconnect();
    };
  }, []);

  return (
    <div className={`page-root min-h-screen bg-background text-foreground ${version !== 3 ? "overflow-hidden" : ""}`} data-theme={version >= 2 ? "v2" : undefined} data-version={version}>
      <div className="sticky top-0 z-50 flex justify-end gap-1 bg-background/80 px-5 py-1.5 backdrop-blur-md">
        {([1, 2, 3] as const).map(v => (
          <button key={v} onClick={() => setVersion(v)} className={`h-7 rounded-full border px-4 text-[10px] font-semibold uppercase backdrop-blur transition-colors ${version === v ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background/80 text-muted-foreground hover:text-foreground"}`}>V{v}</button>
        ))}
      </div>
      <header ref={headerRef} className="sticky top-[40px] z-30 bg-background/80 backdrop-blur-md">
        <div className={`grid h-20 w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-6 lg:flex lg:justify-between ${version === 3 ? "px-5" : "px-3 sm:px-6 lg:px-10"}`}>
          <a href="#top" onClick={closeMenu} className={`flex min-w-0 items-center gap-3 ${version !== 3 ? "ml-[50px]" : ""}`} aria-label="ReNu Pain & Wellness home">
            <span className="font-logo text-3xl font-semibold leading-none text-foreground">ReNu<span className="text-primary">.</span></span>
            <span className="hidden border-l border-border pl-3 text-[10px] font-semibold uppercase leading-[1.4] text-muted-foreground sm:block">Pain &<br />Wellness</span>
          </a>
          <nav className="hidden items-center gap-8 text-xs font-medium uppercase text-muted-foreground lg:flex" aria-label="Main navigation">
            <a className="transition-colors hover:text-foreground" href="#">About Us</a>
            <a className="transition-colors hover:text-foreground" href="#">Patient Info</a>
            <a className="transition-colors hover:text-foreground" href="#">Treatments</a>
            <a className="transition-colors hover:text-foreground" href="#conditions">Who we help</a>
            <a className="transition-colors hover:text-foreground" href="#services">Services</a>
            <a className="transition-colors hover:text-foreground" href="#process">Our approach</a>
            <a className="transition-colors hover:text-foreground" href="#evaluation">Your first visit</a>
          </nav>
          <div className="hidden lg:flex items-center gap-4">
            <Button asChild variant="hero" size="lg" className="h-11 rounded-full px-6 text-xs uppercase" style={version === 3 ? { backgroundColor: '#1D5B57', color: '#FBFAF7' } : undefined}><a href="#schedule">Schedule an evaluation <ArrowUpRight /></a></Button>
            <div className="flex items-center gap-3 border-l border-border pl-4">
              <a href="#" aria-label="Facebook" className="outline-none transition-opacity hover:opacity-70">
                <svg className="size-4" viewBox="0 0 24 24" fill="#7BA68A" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="outline-none transition-opacity hover:opacity-70">
                <svg className="size-4" viewBox="0 0 24 24" fill="#7BA68A" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="outline-none transition-opacity hover:opacity-70">
                <svg className="size-4" viewBox="0 0 24 24" fill="#7BA68A" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
          <Button variant="subtle" size="icon" className="shrink-0 rounded-full lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav className="flex flex-col gap-1 border-t border-border bg-background px-6 py-5 text-sm lg:hidden" aria-label="Mobile navigation">
          <a onClick={closeMenu} className="py-3" href="#">About Us</a>
          <a onClick={closeMenu} className="py-3" href="#">Patient Info</a>
          <a onClick={closeMenu} className="py-3" href="#">Treatments</a>
          <a onClick={closeMenu} className="py-3" href="#conditions">Who we help</a>
          <a onClick={closeMenu} className="py-3" href="#services">Services</a>
          <a onClick={closeMenu} className="py-3" href="#process">Our approach</a>
          <a onClick={closeMenu} className="py-3" href="#evaluation">Your first visit</a>
          <a onClick={closeMenu} className="py-3 text-primary" href="#schedule">Schedule an evaluation <ArrowUpRight className="inline size-4" /></a>
        </nav>}
      </header>


      <main id="top">
        <div className={version === 3 ? "px-5" : "px-3 sm:px-6 lg:px-10"} style={version === 3 ? { position: 'sticky', top: 0, zIndex: 0 } : undefined}>
          <div className={`relative ${version === 3 ? "w-full" : "mx-auto max-w-[1600px]"}`}>
            {version !== 3 && <div className="pointer-events-none absolute inset-0 z-20 translate-x-5 translate-y-5 rounded-[2.5rem] rounded-tr-[1rem] border border-white/60 sm:rounded-[4rem] sm:rounded-tr-[1rem]" />}
          <section className={`relative flex items-center overflow-hidden ${version === 3 ? "rounded-none" : "rounded-[2.5rem] rounded-tr-[1rem] min-h-[610px] sm:min-h-[660px] sm:rounded-[4rem] sm:rounded-tr-[1rem] lg:min-h-[690px]"}`} style={version === 3 ? { height: 'calc(100vh - 100px)', borderRadius: '10px' } : undefined}>
            <img src={heroImage} alt="A wide field of green leaves in soft morning light" width={1920} height={1088} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-center hero-ken-burns" />
            <div className="hero-shade absolute inset-0" aria-hidden="true" />
            <div className="relative z-10 w-full px-7 py-20 sm:px-12 lg:px-24">
              <div className="max-w-[750px]">
                <p className="mb-8 text-xs font-semibold uppercase text-kicker">The right path out of pain</p>
                {version === 3 ? (
                  <>
                    <h1 className="font-display text-[clamp(1.6rem,4.5vw,4rem)] font-normal leading-[1.1] text-hero-foreground"><span className="block">Advanced interventional care. A whole-person approach.</span></h1>
                    <p className="mt-8 max-w-[520px] text-base leading-relaxed text-hero-muted md:text-lg">Dr. Razi and the ReNu Pain & Wellness team don't guess. They start with a thorough evaluation, identify the source, and build a plan that fits your life.</p>
                  </>
                ) : (
                  <>
                    <h1 className="font-display text-[clamp(2rem,6.5vw,5.75rem)] font-normal leading-[1.06] text-hero-foreground"><span className="block whitespace-nowrap">Understand your pain.</span><em className="block font-normal text-primary">Find the right way forward.</em></h1>
                    <p className="mt-8 max-w-[480px] text-base leading-relaxed text-hero-muted md:text-lg">Personalized pain care that starts with an accurate evaluation — so your next step feels clear, not uncertain.</p>
                  </>
                )}
                <div className="mt-9 flex flex-wrap items-center gap-6">
                  <Button asChild variant="hero" size="lg" className="h-14 rounded-full px-7 text-xs font-semibold uppercase"><a href="#schedule">Schedule a Pain Evaluation <ArrowUpRight /></a></Button>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 hidden px-12 py-7 text-[10px] font-semibold uppercase text-hero-muted sm:flex sm:justify-between lg:px-24"><span>ReNu Pain & Wellness</span><span>Clarity before treatment</span></div>
          </section>
          </div>
        </div>

        <div className="relative z-10 bg-background">
        {version !== 3 ? (
          <section className="bg-background mx-auto max-w-[1600px] px-6 pt-16 pb-20 sm:px-10 md:pt-24 md:pb-28 lg:px-16 text-center">
            <p className="font-display text-[clamp(1.6rem,4vw,3.5rem)] leading-[1.15] font-normal">Pain is personal.</p>
            <p className="font-display text-[clamp(1.6rem,4vw,3.5rem)] leading-[1.15] font-normal">Your care should be too.</p>
            <p className="font-display text-[clamp(1.6rem,4vw,3.5rem)] leading-[1.15] font-normal"><em className="text-primary">We start by listening.</em></p>
          </section>
        ) : (
          <section className="bg-background mx-auto max-w-[1600px] px-6 pt-16 pb-20 sm:px-10 md:pt-24 md:pb-28 lg:px-16">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
              <div className="relative aspect-[3/4] max-h-[432px] w-full max-w-[324px] overflow-hidden rounded-[2rem] bg-secondary ml-[300px]">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-muted-foreground">
                  <svg className="size-16 opacity-30" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                  <span className="text-xs uppercase tracking-widest opacity-40">Doctor photo</span>
                </div>
              </div>
              <div>
                <p className="mb-6 text-[11px] font-semibold uppercase text-kicker">Meet your doctor</p>
                <h2 className="mb-6 font-display text-4xl leading-tight md:text-6xl">Toufan Razi,<span className="text-[0.7em]">MD</span></h2>
                <p className="text-base leading-8 text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p className="mt-4 text-base leading-8 text-muted-foreground">An anesthesiology and pain management specialist dedicated to helping patients find meaningful relief from chronic pain. My approach combines advanced treatment options with personalized, whole-person care focused on restoring function and improving quality of life. I look forward to helping you move toward a healthier, more comfortable future.</p>
              </div>
            </div>
          </section>
        )}

        <div className="mt-8" style={{ height: conditionsWrapperHeight > 0 ? `${conditionsWrapperHeight}px` : undefined }}>
          <div ref={conditionsSentinelRef} />
        <section ref={conditionsRef} id="conditions" className="sticky z-10 rounded-t-[2.5rem] overflow-hidden" style={{ backgroundColor: "#E8F2EB", height: `calc(100vh - ${headerBottom}px)` }}>
          <div ref={conditionsContentRef} style={{ transform: `translateY(${-conditionsTranslateY}px)`, willChange: 'transform' }}>
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 md:py-24">
            <div className="mb-12 flex flex-col justify-between gap-7 md:mb-16 md:flex-row md:items-end">
              <div><p className="mb-5 text-[11px] font-semibold uppercase text-kicker">01 — Who we help</p><h2 className="max-w-2xl font-display text-4xl leading-tight md:text-6xl" style={version === 1 ? { color: '#1D5B57' } : undefined}>Care that begins with<br /><em className="text-primary">your experience.</em></h2></div>
              {version !== 3 && <p className="max-w-sm text-sm leading-7 text-muted-foreground">Pain is personal. We begin with what you're feeling, how it affects your life, and what you want to get back to.</p>}
            </div>
            <div className="grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
              {featuredConditions.map((item, index) => <a key={item.name} href="#evaluation" className={`group block min-w-0 ${index === 1 ? "md:pt-20" : ""}`} style={{ transform: `translateY(${index === 0 ? -40 * conditionsProgress : index === 2 ? -60 * conditionsProgress : 40 * conditionsProgress}px)`, transition: 'transform 0.1s linear' }}>
                <div className="relative">
                  <div className={`pointer-events-none absolute inset-0 z-10 translate-x-5 translate-y-5 border border-white/60 ${item.shape}`} />
                  <div className={`aspect-[4/4.8] overflow-hidden bg-secondary ${item.shape}`}><img src={item.image} alt={item.alt} width={912} height={1104} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transition-none" /></div>
                </div>
                <div className="mt-6"><h3 className="font-display text-2xl md:text-3xl" style={version === 1 ? { color: '#1D5B57' } : undefined}>{item.name}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>{version === 3 && <p className="mt-3 text-xs font-semibold uppercase text-primary">Learn more</p>}</div>
                <span className="mt-6 block h-px w-14 bg-primary transition-[width] duration-500 group-hover:w-full motion-reduce:transition-none" />
              </a>)}
            </div>
            <div className="mt-14 grid gap-x-10 gap-y-12 md:mt-20 md:grid-cols-3">{otherConditions.map((item) => <a key={item.name} href="#evaluation" className="group block min-w-0"><div className="relative"><div className={`pointer-events-none absolute inset-0 z-10 translate-x-5 translate-y-5 border border-white/60 ${item.shape}`} /><div className={`aspect-[4/4.8] overflow-hidden bg-secondary ${item.shape}`}><img src={item.image} alt={item.alt} className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105" /></div></div><div className="mt-6"><p className="font-display text-xl sm:text-2xl" style={version === 1 ? { color: '#1D5B57' } : undefined}>{item.name}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p><p className="mt-3 text-xs font-semibold uppercase text-primary">Learn more</p></div></a>)}</div>
          </div>
          </div>
        </section>
        </div>

        <section ref={processRef} id="process" className="sticky z-20 scroll-mt-20 bg-secondary py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="mb-5 text-[11px] font-semibold uppercase text-kicker">02 — The ReNu care pathway</p><h2 className="max-w-2xl font-display text-4xl leading-tight md:text-6xl">A thoughtful process.<br /><em className="text-primary">A clearer direction.</em></h2></div><p className="max-w-sm text-sm leading-7 text-muted-foreground">Good care is not a list of treatments. It's a sequence of decisions made with you, and adjusted as you go.</p></div>
            <div className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-3 lg:grid-cols-6">
              {steps.map((step) => <div key={step.number} className="min-w-0"><span className="font-display text-4xl italic text-primary/75">{step.number}</span><h3 className="mt-5 font-display text-2xl">{step.title}</h3><p className="mt-3 max-w-[150px] text-sm leading-6 text-muted-foreground">{step.detail}</p></div>)}
            </div>
          </div>
        </section>

        <section ref={evaluationRef} id="evaluation" className="sticky z-30 scroll-mt-20 bg-background py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:px-10">
            <div><p className="mb-5 text-[11px] font-semibold uppercase text-kicker">03 — Your first visit</p><h2 className="font-display text-4xl leading-tight md:text-6xl">The Pain Clarity <em className="text-primary">Evaluation.</em></h2><p className="mt-7 max-w-md text-base leading-8 text-muted-foreground">A first visit with a clear purpose: to understand the likely source of your pain and help you make an informed decision about what comes next.</p><Button asChild variant="subtle" size="lg" className="mt-9 h-12 rounded-full px-6 text-xs uppercase"><a href="#schedule">Plan your first visit <ArrowRight /></a></Button></div>
            <div className="border-t border-border"><p className="py-5 text-xs font-semibold uppercase text-kicker">You can expect to leave with</p>{[
              ["01", "A clearer understanding", "An explanation of the likely source of your pain."],
              ["02", "Options that make sense", "Appropriate next steps explained without pressure."],
              ["03", "A recommended direction", "A care roadmap, in writing when appropriate."],
            ].map(([number, title, description]) => <div key={number} className="grid grid-cols-[48px_1fr] gap-4 border-t border-border py-8"><span className="pt-1 text-xs text-kicker">{number}</span><div><h3 className="font-display text-2xl md:text-3xl">{title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{description}</p></div></div>)}</div>
          </div>
        </section>

        <section ref={quoteRef} className="sticky z-40 bg-secondary py-20 md:py-24"><div className="mx-auto max-w-7xl px-6 lg:px-10"><p className="mb-7 text-[11px] font-semibold uppercase text-kicker">Our point of view</p><blockquote className="max-w-5xl font-display text-3xl leading-snug md:text-5xl">“The first step toward feeling better is understanding what you're dealing with.”</blockquote><p className="mt-7 text-sm text-muted-foreground">Clarity, guidance, and care without pressure.</p></div></section>

        <section ref={scheduleRef} id="schedule" className="sticky z-50 scroll-mt-20 bg-background py-24 md:py-32"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 px-6 md:flex-row md:items-end lg:px-10"><div><p className="mb-5 text-[11px] font-semibold uppercase text-kicker">04 — Your next step</p><h2 className="max-w-2xl font-display text-4xl leading-tight md:text-6xl">The way forward starts <em className="text-primary">with clarity.</em></h2><p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">We're designing a more helpful first step. Appointment booking and insurance details will be available here when confirmed by ReNu.</p></div><div className="shrink-0 border-t border-border pt-6 text-sm text-muted-foreground md:max-w-[250px]"><span className="mb-2 block text-xs font-semibold uppercase text-kicker">Coming soon</span>Online scheduling for the Pain Clarity Evaluation.</div></div></section>
        </div>{/* end sticky overlay wrapper */}
      </main>
      <footer className="bg-secondary"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 py-10 sm:flex-row sm:items-end lg:px-10"><div><a href="#top" className="font-logo text-3xl font-semibold">ReNu<span className="text-primary">.</span></a><p className="mt-2 text-xs uppercase text-muted-foreground">Pain & Wellness</p></div><p className="text-xs text-muted-foreground">Understand your pain. Find the right way forward.</p></div></footer>
    </div>
  );
}
