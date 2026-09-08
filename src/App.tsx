import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, CalendarDays, Check, CircleCheck, Clock3, Instagram, Layers3, Phone, ShieldQuestion, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { Brand } from "./components/Brand";
import { EstimateForm } from "./components/EstimateForm";
import { Footer } from "./components/Footer";
import { Navigation } from "./components/Navigation";
import { ParticleButton } from "./components/ParticleButton";
import { Planner } from "./components/Planner";
import { Reveal } from "./components/Reveal";
import { business, roomChapters } from "./data/business";
import { assetPath } from "./lib/assets";

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Sparkclean Cleaning Services | Walnut Creek, CA",
      "/services": "Your Cleaning Services | Sparkclean",
      "/deep-cleaning": "Your Deep Cleaning Service | Sparkclean",
      "/recurring-cleaning": "Your Recurring Cleaning Service | Sparkclean",
      "/about": "Your Local Cleaning Team | Sparkclean",
      "/service-areas": "Your Cleaning Service Area | Sparkclean",
      "/estimate": "Get Your Free Cleaning Estimate | Sparkclean",
      "/faq": "Your Cleaning Questions Answered | Sparkclean",
      "/privacy": "Your Privacy | Sparkclean",
      "/terms": "Your Service Terms | Sparkclean",
    };
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = titles[pathname] ?? "Your Page Isn’t Here | Sparkclean";
  }, [pathname]);
  return null;
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const imageY = useTransform(scrollYProgress, [0, 0.2], [0, 38]);
  return (
    <section className="hero">
      <motion.div className="hero__media" style={reduced ? undefined : { y: imageY }}>
        <motion.img
          src={assetPath("/images/sparkclean-hero-concept.png")}
          alt="Sparkclean team member finishing a bright California kitchen"
          initial={reduced ? false : { clipPath: "inset(0 0 100% 0)", transform: "scale(1.06)" }}
          animate={{ clipPath: "inset(0 0 0% 0)", transform: "scale(1)" }}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="hero__wash" />
      </motion.div>
      <div className="hero__content shell">
        <motion.span className="hero__kicker" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>Walnut Creek · detail-first home cleaning</motion.span>
        <motion.h1 initial={reduced ? false : { opacity: 0, transform: "translateY(26px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} transition={{ delay: 0.18, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>Walk back into<br />a home that feels<br /><em>brand new.</em></motion.h1>
        <motion.p initial={reduced ? false : { opacity: 0, transform: "translateY(18px)" }} animate={{ opacity: 1, transform: "translateY(0)" }} transition={{ delay: 0.35, duration: 0.7 }}>Deep cleaning and thoughtful recurring care, shaped around the way your home is lived in.</motion.p>
        <motion.div className="hero__actions" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.48 }}>
          <ParticleButton to="/estimate">Get your free estimate</ParticleButton>
          <a className="call-link" href={`tel:${business.phoneHref}`}><Phone size={18} /> Call for your estimate</a>
        </motion.div>
        <motion.a href="#rooms" className="hero__scroll" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}><ArrowDown size={16} /> Explore room by room</motion.a>
      </div>
    </section>
  );
}

function ProofStrip() {
  const items = [
    { icon: Sparkles, label: "Your clean", value: "Deep cleaning" },
    { icon: CalendarDays, label: "Your rhythm", value: "Biweekly · Monthly" },
    { icon: Phone, label: "Your estimate", value: business.phoneDisplay },
    { icon: Instagram, label: "See recent work", value: business.instagramHandle },
  ];
  return <section className="proof-strip" aria-label="Your cleaning options"><div className="shell proof-grid">{items.map(({ icon: Icon, label, value }, index) => <Reveal key={label} delay={index * 0.06} className="proof-item"><Icon size={20} /><span><small>{label}</small><strong>{value}</strong></span></Reveal>)}</div></section>;
}

function RoomStory() {
  return (
    <section id="rooms" className="room-story section">
      <div className="shell section-heading room-story__heading"><div><span className="eyebrow">Your home, room by room</span><h2>See every surface.<br /><em>Feel every detail.</em></h2></div><p>You feel the difference in the edges, handles, ledges, glass, and surfaces that shape each room.</p></div>
      <div className="room-list shell">
        {roomChapters.map((room, index) => (
          <article className={`room-chapter ${index % 2 ? "room-chapter--reverse" : ""}`} key={room.id}>
            <Reveal className="room-chapter__image"><img src={assetPath(room.image)} alt={room.alt} loading={index > 0 ? "lazy" : "eager"} /><span>0{index + 1}</span></Reveal>
            <Reveal className="room-chapter__copy" delay={0.08}><span className="eyebrow">{room.kicker}</span><h3>{room.name}</h3><ul>{room.tasks.map((task, taskIndex) => <motion.li key={task} initial={{ opacity: 0, transform: "translateX(-8px)" }} whileInView={{ opacity: 1, transform: "translateX(0)" }} viewport={{ once: true }} transition={{ delay: taskIndex * 0.05 }}><Check size={16} />{task}</motion.li>)}</ul><p>You’ll confirm your exact checklist before the visit.</p></Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}

function FindYourClean() {
  return <section className="planner-section section"><div className="shell"><Reveal className="section-heading section-heading--light"><div><span className="eyebrow eyebrow--light">Find your clean</span><h2>A better estimate starts with<br /><em>the right questions.</em></h2></div><p>A few details point you toward the right starting service.</p></Reveal><Reveal delay={0.1}><Planner /></Reveal></div></section>;
}

function Plans() {
  const plans = [
    { eyebrow: "Your fresh start", title: "Deep clean", text: "Reset buildup, seasonal dust, and the details your regular upkeep can leave behind.", list: ["Your room-by-room scope", "Your priority details", "Your one-time estimate"], cta: "Plan your deep clean", featured: true },
    { eyebrow: "Your steady rhythm", title: "Biweekly", text: "Keep your home feeling fresh with consistent care every other week.", list: ["Your recurring cadence", "Your confirmed checklist", "Your home priorities"], cta: "Choose biweekly" },
    { eyebrow: "Your monthly reset", title: "Monthly", text: "Give your home lighter upkeep with a dependable clean on your calendar.", list: ["Your monthly cadence", "Your confirmed checklist", "Your flexible estimate"], cta: "Choose monthly" },
  ];
  return <section className="plans section"><div className="shell"><Reveal className="section-heading"><div><span className="eyebrow">Your cleaning plans</span><h2>Choose your rhythm.<br /><em>Shape your scope.</em></h2></div><p>Your estimate reflects your home, its condition, and the details that matter most to you.</p></Reveal><div className="plan-grid">{plans.map((plan, index) => <Reveal key={plan.title} delay={index * 0.08} className={`plan-card liquid-card ${plan.featured ? "plan-card--featured" : ""}`}><span className="eyebrow">{plan.eyebrow}</span><h3>{plan.title}</h3><p>{plan.text}</p><ul>{plan.list.map((item) => <li key={item}><CircleCheck size={17} />{item}</li>)}</ul><ParticleButton to="/estimate" variant={plan.featured ? "primary" : "glass"}>{plan.cta}</ParticleButton></Reveal>)}</div></div></section>;
}

function OwnerNote() {
  return <section className="owner-note section"><div className="shell owner-grid"><Reveal className="owner-photo"><div className="owner-photo__media"><img src={assetPath("/images/sparkclean-team-instagram.jpg")} alt="Two Sparkclean team members detailing a kitchen" loading="lazy" /><div className="owner-photo__caption"><Brand light /><span>Care in every room</span><small>Your home, deeply cared for</small></div></div></Reveal><Reveal className="owner-copy" delay={0.08}><span className="eyebrow eyebrow--light">Your standard of care</span><h2>You deserve people who notice<br /><em>what others pass by.</em></h2><p>Your clean is shaped around your home, your routine, and the details you want to feel different.</p><div className="owner-proof"><div><Layers3 /><span><strong>Built around your home</strong><small>Your scope fits real life</small></span></div><div><ShieldQuestion /><span><strong>Your details come first</strong><small>Set clear priorities before cleaning day</small></span></div></div><a className="text-link text-link--light" href={business.instagram} target="_blank" rel="noreferrer">See your future clean on Instagram <Instagram size={16} /></a></Reveal></div></section>;
}

function FAQ() {
  const faqs = [
    ["Can I choose recurring cleaning?", "Yes. You can start with biweekly or monthly cleaning, then confirm the cadence and checklist that fit your home."],
    ["What can I include in a deep clean?", "Your scope depends on your home and priorities. Share the rooms and details that need attention, then confirm your checklist before scheduling."],
    ["What will your cleaning cost?", "Your quote reflects your home size, condition, service type, access, and priority details."],
    ["Can your home be cleaned in your city?", "Share your ZIP or city when you request an estimate. You’ll confirm whether your address is within the current service area."],
    ["Does your estimate request confirm a booking?", "No. Your request starts the conversation. You’ll confirm your scope, availability, timing, and price before booking."],
  ];
  return <section className="faq section"><div className="shell faq-grid"><Reveal><span className="eyebrow">Your questions, answered</span><h2>Know what to expect.<br /><em>Book with clarity.</em></h2><p>Still deciding? Call and talk through your home.</p><a className="solid-link" href={`tel:${business.phoneHref}`}><Phone size={17} /> Call for your estimate</a></Reveal><div className="faq-list">{faqs.map(([question, answer], index) => <Reveal key={question} delay={index * 0.04}><details><summary>{question}<span>+</span></summary><p>{answer}</p></details></Reveal>)}</div></div></section>;
}

function FinalCTA() {
  return <section className="final-cta"><div className="shell"><Reveal className="final-cta__inner"><span className="eyebrow eyebrow--light">Come home to your difference</span><h2>Ready for your home<br />to feel <em>reset?</em></h2><p>Share what your home needs. You’ll confirm your scope, availability, and price before scheduling.</p><div className="final-cta__actions"><ParticleButton to="/estimate" variant="light">Get your free estimate</ParticleButton><a href={`tel:${business.phoneHref}`}><Phone size={17} /> Call now</a></div></Reveal></div></section>;
}

function HomePage() {
  return <><Hero /><ProofStrip /><RoomStory /><FindYourClean /><Plans /><OwnerNote /><FAQ /><FinalCTA /></>;
}

const pageContent: Record<string, { eyebrow: string; title: string; intro: string; image?: string; points: string[] }> = {
  "/deep-cleaning": { eyebrow: "Your deep clean", title: "Reset your home, room by room.", intro: "When your home needs more than upkeep, focus on the details that change how every room feels.", image: "/images/sparkclean-hero-concept.png", points: ["Show where buildup is most visible", "Prioritize your kitchens, bathrooms, edges, and high-touch details", "Confirm your checklist, timing, and price before scheduling"] },
  "/recurring-cleaning": { eyebrow: "Your recurring clean", title: "Keep your just-cleaned feeling.", intro: "Choose biweekly or monthly cleaning to create a dependable rhythm around your home and priorities.", image: "/images/living-concept.png", points: ["Choose your starting cadence", "Set your core room checklist", "Update your priorities as your home changes"] },
  "/move-cleaning": { eyebrow: "Your move clean", title: "Start your next chapter cleaner.", intro: "Share your move date, property condition, and access details to shape the right move-related clean.", image: "/images/bedroom-concept.png", points: ["Share your move date and property condition", "Choose cabinets, appliances, or empty-home details", "Coordinate your access before scheduling"] },
  "/add-ons": { eyebrow: "Your add-on requests", title: "Choose the details that matter most.", intro: "Request windows, appliance interiors, upholstery, or other special priorities with your estimate.", points: ["Describe your surface or item", "Explain the result you want", "Confirm your process and price before the visit"] },
  "/cleaning-checklist": { eyebrow: "Your cleaning checklist", title: "See your clean before it starts.", intro: "Build a checklist around your rooms, surfaces, and priorities so you know what to expect.", image: "/images/bathroom-concept.png", points: ["Choose your kitchen surfaces, fixtures, fronts, floors, and edges", "Choose your bathroom glass, tile, vanity, fixtures, and floors", "Choose your living and bedroom surfaces, ledges, baseboards, and floors"] },
  "/service-areas": { eyebrow: "Your service area", title: "Start with your address.", intro: "Share your ZIP or city to confirm current coverage and travel availability for your home.", points: ["Share your ZIP or city", "Check your current availability", "Confirm your travel range before scheduling"] },
};

type DetailPoint = {
  title: string;
  text: string;
  items: string[];
};

function InnerHero({ eyebrow, title, intro, image, alt }: { eyebrow: string; title: string; intro: string; image: string; alt: string }) {
  return <section className="inner-hero"><div className="shell inner-hero__grid"><Reveal><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{intro}</p><ParticleButton to="/estimate">Get your free estimate</ParticleButton></Reveal><Reveal className="inner-hero__image" delay={0.08}><img src={assetPath(image)} alt={alt} /></Reveal></div></section>;
}

function DetailPoints({ eyebrow, points, large = false }: { eyebrow: string; points: DetailPoint[]; large?: boolean }) {
  return <section className={`inner-points inner-points--detailed section ${large ? "inner-points--large" : ""}`}><div className="shell"><span className="eyebrow">{eyebrow}</span><div>{points.map((point, index) => <Reveal key={point.title} delay={index * 0.08}><span>0{index + 1}</span><h3>{point.title}</h3><p>{point.text}</p><ul>{point.items.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul></Reveal>)}</div></div></section>;
}

const aboutPoints: DetailPoint[] = [
  { title: "Your priorities lead", text: "Start with the rooms, surfaces, and details that will make the biggest difference to the way your home feels.", items: ["Share the areas that need attention", "Choose the finish you want to come home to"] },
  { title: "Your checklist stays clear", text: "Turn a general cleaning request into a focused room-by-room plan before your visit is scheduled.", items: ["Set kitchen and bathroom details", "Call out edges, ledges, floors, and high-touch areas"] },
  { title: "Your rhythm fits real life", text: "Choose a deeper reset or keep your home feeling cared for with a recurring schedule that suits you.", items: ["Start with deep cleaning", "Choose biweekly or monthly care"] },
];

const servicePoints: DetailPoint[] = [
  { title: "Choose your starting clean", text: "Begin with a detailed reset, recurring upkeep, or a move-related request based on what your home needs now.", items: ["Deep cleaning", "Biweekly or monthly cleaning"] },
  { title: "Build your room checklist", text: "Shape your scope around the spaces you use most and the surfaces you want to feel different.", items: ["Kitchen, bathroom, living, and bedroom priorities", "Edges, fixtures, fronts, floors, and high-touch details"] },
  { title: "Confirm the practical details", text: "Review your condition, access, preferred timing, and priorities before anything is placed on the calendar.", items: ["Confirm your exact scope", "Confirm availability and price"] },
];

const serviceCatalog = [
  { title: "Deep cleaning", image: "/images/sparkclean-hero-concept.png", text: "Give buildup, seasonal dust, and overlooked details a more complete reset.", items: ["Detailed room priorities", "One-time cleaning plan", "Scope confirmed before scheduling"] },
  { title: "Biweekly cleaning", image: "/images/living-concept.png", text: "Keep your most-used rooms feeling consistently fresh every other week.", items: ["Recurring cadence", "Repeatable core checklist", "Priorities that can change with your home"] },
  { title: "Monthly cleaning", image: "/images/bedroom-concept.png", text: "Choose a lighter recurring rhythm for dependable monthly upkeep.", items: ["Monthly cadence", "Core rooms and surfaces", "Flexible priority details"] },
  { title: "Move-related cleaning", image: "/images/bathroom-concept.png", text: "Share your move date, property condition, and access needs for a tailored request.", items: ["Empty-home details", "Cabinet or appliance requests", "Access coordinated before scheduling"] },
  { title: "Special-detail requests", image: "/images/living-concept.png", text: "Call out the individual surfaces or items you want considered alongside your main clean.", items: ["Windows or appliance interiors", "Upholstery or other priorities", "Availability confirmed with your estimate"] },
  { title: "Your cleaning checklist", image: "/images/bathroom-concept.png", text: "Organize every request by room so your expectations are clear from the start.", items: ["Kitchen and bathroom details", "Living and bedroom surfaces", "Floors, ledges, and finishing touches"] },
];

function AboutPage() {
  const gallery = [
    { image: "/images/sparkclean-team-instagram.jpg", alt: "Two Sparkclean team members cleaning a kitchen", label: "The care behind your clean" },
    { image: "/images/sparkclean-hero-concept.png", alt: "A bright kitchen being carefully cleaned", label: "Your kitchen, reset" },
    { image: "/images/bathroom-concept.png", alt: "A bright bathroom after a detailed clean", label: "Your bathroom, refreshed" },
  ];
  return <main className="inner-page"><InnerHero eyebrow="Your local cleaning team" title="Get detail-led care in Walnut Creek." intro="Your home receives focused deep cleaning or recurring care shaped around the way you live and the details you notice." image="/images/sparkclean-team-instagram.jpg" alt="Two Sparkclean team members detailing a kitchen" /><DetailPoints eyebrow="How your clean takes shape" points={aboutPoints} /><section className="about-gallery section"><div className="shell"><Reveal className="section-heading"><div><span className="eyebrow">See your standard of care</span><h2>Thoughtful work in<br /><em>every kind of space.</em></h2></div><p>Picture the rooms you want to walk back into: lighter, calmer, and ready for the way you live.</p></Reveal><div className="about-gallery__grid">{gallery.map((item, index) => <Reveal key={item.label} className={index === 0 ? "about-gallery__item about-gallery__item--portrait" : "about-gallery__item"} delay={index * 0.07}><img src={assetPath(item.image)} alt={item.alt} loading="lazy" /><span>{item.label}</span></Reveal>)}</div></div></section><FinalCTA /></main>;
}

function ServicesPage() {
  return <main className="inner-page"><InnerHero eyebrow="Your cleaning services" title="Choose the clean your home needs." intro="Start with a detailed reset or choose a recurring rhythm shaped around your home, schedule, and priorities." image="/images/bathroom-concept.png" alt="A bright bathroom after a detailed clean" /><DetailPoints eyebrow="Plan your service" points={servicePoints} large /><section className="service-catalog section"><div className="shell"><Reveal className="section-heading"><div><span className="eyebrow">Your complete service guide</span><h2>See every way to<br /><em>shape your clean.</em></h2></div><p>Choose a starting point, then refine the rooms, timing, and details when you request your estimate.</p></Reveal><div className="service-catalog__grid">{serviceCatalog.map((service, index) => <Reveal key={service.title} className="service-card" delay={(index % 3) * 0.06}><div className="service-card__image"><img src={assetPath(service.image)} alt="" loading="lazy" /></div><div className="service-card__body"><span>0{index + 1}</span><h3>{service.title}</h3><p>{service.text}</p><ul>{service.items.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul><Link to="/estimate">Plan this service <span aria-hidden="true">↗</span></Link></div></Reveal>)}</div></div></section><FinalCTA /></main>;
}

function StandardPage({ path }: { path: string }) {
  const content = pageContent[path];
  return <main className="inner-page"><section className="inner-hero"><div className="shell inner-hero__grid"><Reveal><span className="eyebrow">{content.eyebrow}</span><h1>{content.title}</h1><p>{content.intro}</p><ParticleButton to="/estimate">Get your free estimate</ParticleButton></Reveal>{content.image ? <Reveal className="inner-hero__image" delay={0.08}><img src={assetPath(content.image)} alt="Bright, freshly cleaned interior" /></Reveal> : <Reveal className="inner-hero__graphic" delay={0.08}><Sparkles /><span>Your details first</span></Reveal>}</div></section><section className="inner-points section"><div className="shell"><span className="eyebrow">What you can expect</span><div>{content.points.map((point, index) => <Reveal key={point} delay={index * 0.08}><span>0{index + 1}</span><p>{point}</p></Reveal>)}</div></div></section><FinalCTA /></main>;
}

function EstimatePage() { return <main className="estimate-page"><div className="estimate-page__hero shell"><Reveal><span className="eyebrow">Your free estimate</span><h1>Your clean starts with your home.</h1><p>Share your size, condition, timing, and the rooms that need the most attention.</p></Reveal></div><div className="shell"><Reveal delay={0.08}><EstimateForm /></Reveal></div></main>; }

function LegalPage({ type }: { type: "privacy" | "terms" }) {
  const privacy = type === "privacy";
  return <main className="legal-page shell"><span className="eyebrow">Your information</span><h1>{privacy ? "Privacy" : "Terms"}</h1><p>Last updated September 5, 2026</p><section><h2>{privacy ? "What happens to your details" : "Using this website"}</h2><p>{privacy ? "The details you enter in the cleaning planner stay in your browser and are not sent or stored. This website does not use customer accounts, advertising cookies, or analytics." : "You can use this website to explore services and prepare for an estimate call. Your online cleaning plan does not confirm a booking, service area, availability, or price."}</p><h2>{privacy ? "Your choices" : "Your service request"}</h2><p>{privacy ? "You choose whether to call and share your information. Avoid entering sensitive information that is not needed to discuss your cleaning request." : "You’ll confirm your scope, timing, availability, address, and price directly before any service is scheduled."}</p><h2>Your contact option</h2><p>Call <a href={`tel:${business.phoneHref}`}>{business.phoneDisplay}</a> when you’re ready to discuss your home.</p></section></main>;
}

function NotFound() { return <main className="not-found shell"><span>404</span><h1>Your page isn’t here.</h1><p>Head home and choose where you’d like to go next.</p><ParticleButton to="/">Return to your home page</ParticleButton></main>; }

function App() {
  return <><ScrollTop /><Navigation /><Routes><Route path="/" element={<HomePage />} /><Route path="/services" element={<ServicesPage />} /><Route path="/about" element={<AboutPage />} />{Object.keys(pageContent).map((path) => <Route key={path} path={path} element={<StandardPage path={path} />} />)}<Route path="/faq" element={<><main className="inner-page"><FAQ /><FinalCTA /></main></>} /><Route path="/estimate" element={<EstimatePage />} /><Route path="/privacy" element={<LegalPage type="privacy" />} /><Route path="/terms" element={<LegalPage type="terms" />} /><Route path="*" element={<NotFound />} /></Routes><Footer /><div className="mobile-dock"><a href={`tel:${business.phoneHref}`}><Phone />Call</a><Link to="/estimate"><Clock3 />Free estimate</Link></div></>;
}

export default App;
