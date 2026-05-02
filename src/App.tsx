import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  DoorOpen,
  Fence,
  Hammer,
  Home,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Trees,
  X,
} from 'lucide-react';
import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import './styles.css';

const COOKIE_CONSENT_KEY = 'msk-cookie-consent';

const galleryImages = [
  'IMG_0185.jpeg',
  'IMG_0186.jpeg',
  'IMG_0187.jpeg',
  'IMG_0188.jpeg',
  'IMG_0189.jpeg',
  'IMG_0190.jpeg',
  'IMG_0191.jpeg',
  'IMG_0192.jpeg',
  'IMG_0193.jpeg',
  'IMG_0194.jpeg',
  'IMG_0195.jpeg',
  'IMG_0196.jpeg',
  'IMG_0197.jpeg',
  'IMG_0198.jpeg',
  'IMG_0199.jpeg',
  'IMG_0200.jpeg',
  'IMG_0201.jpeg',
  'IMG_0202.jpeg',
  'IMG_0203.jpeg',
  'IMG_0204.jpeg',
  'IMG_0205.jpeg',
  'IMG_0206.jpeg',
  'IMG_0207.jpeg',
  'IMG_0208.jpeg',
  'IMG_0209.jpeg',
  'IMG_0210.jpeg',
  'IMG_0211.jpeg',
  'IMG_0212.jpeg',
  'IMG_0213.jpeg',
  'IMG_0214.jpeg',
  'IMG_0215.jpeg',
];

const navItems = [
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Projekte', href: '#galerie' },
  { label: 'Bewertungen', href: '#bewertungen' },
  { label: 'Kontakt', href: '#kontakt' },
];

const services = [
  {
    icon: Building2,
    title: 'Balkone & Anlagenbau',
    text: 'Planung, Demontage, Montage und saubere Umsetzung von Balkon- und Sommergartenprojekten.',
  },
  {
    icon: Fence,
    title: 'Zaunbau & Sichtschutz',
    text: 'Robuste Zaunanlagen, Tore und Sichtschutzloesungen passend zu Haus, Garten und Bestand.',
  },
  {
    icon: Home,
    title: 'Ueberdachungen',
    text: 'Terrassenueberdachungen, Kaltwintergaerten und wetterfeste Konstruktionen aus einer Hand.',
  },
  {
    icon: DoorOpen,
    title: 'Innenausbau',
    text: 'Tueren, Boeden, Fenster, Rolllaeden und Schreinerarbeiten mit Blick fuer Details.',
  },
  {
    icon: Hammer,
    title: 'Alles montieren',
    text: 'Von der Einzelmontage bis zur Komplettloesung: MSK packt flexibel an, koordiniert Gewerke und liefert sauber ab.',
  },
  {
    icon: Trees,
    title: 'Aussenbereich komplett',
    text: 'Balkon, Garten, Terrasse und Fassade werden funktional, langlebig und optisch stimmig umgesetzt.',
  },
];

const reviews = [
  {
    quote:
      'Kaltwintergarten mit Balkon realisiert - sauber, professionell und mit einem starken Team umgesetzt.',
    name: 'Hans-Joerg Schubert',
  },
  {
    quote:
      'Eine komplexe Aufgabe zu unserer vollsten Zufriedenheit ausgefuehrt. Sehr empfehlenswert.',
    name: 'Sebastian Kuhn',
  },
  {
    quote:
      'Super Team. Schnell, freundlich und sehr sauber gearbeitet. Mit bestem Gewissen weiterzuempfehlen.',
    name: 'Monika Haefner',
  },
];

const stats = [
  { value: '20+', label: 'Jahre Erfahrung im Schreinerhandwerk' },
  { value: '5,0', label: 'Google-Bewertung aus Kundenstimmen' },
  { value: '2019', label: 'als Familienbetrieb selbststaendig' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [route, setRoute] = useState(() => getRouteFromHash());

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRouteFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div className="site-shell">
        <SkipLink />
        <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((open) => !open)} />
        <main id="main-content" tabIndex={-1}>
          {route === 'privacy' ? <LegalPage type="privacy" /> : route === 'imprint' ? <LegalPage type="imprint" /> : <LandingPage />}
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </LazyMotion>
  );
}

function getRouteFromHash() {
  const hash = window.location.hash.replace('#', '');
  if (hash === 'datenschutz') return 'privacy';
  if (hash === 'impressum') return 'imprint';
  return 'home';
}

function SkipLink() {
  return (
    <a className="skip-link" href="#main-content">
      Zum Inhalt springen
    </a>
  );
}

function Header({ menuOpen, onToggleMenu }: { menuOpen: boolean; onToggleMenu: () => void }) {
  return (
    <header className="site-header">
      <nav className="nav" aria-label="Hauptnavigation">
        <a className="brand" href="#" aria-label="MSK Montage Service Kohlert Startseite">
          <img src="/brand/msk-logo.svg" alt="" width="64" height="64" />
          <span>
            <strong>MSK</strong>
            <small>Montage Service Kohlert</small>
          </span>
        </a>

        <button className="menu-toggle" type="button" onClick={onToggleMenu} aria-expanded={menuOpen} aria-controls="mobile-menu">
          <span className="sr-only">Menue oeffnen oder schliessen</span>
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <div className="nav-links desktop-links">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href="tel:+491758676763">
            Jetzt anrufen
          </a>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <m.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <a href="tel:+491758676763">0175 8676763</a>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function LandingPage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <Process />
      <Gallery />
      <Reviews />
      <Contact />
    </>
  );
}

function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="hero section-pad" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <m.p
            className="eyebrow"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Familienbetrieb aus Weidenbach seit 2019
          </m.p>
          <m.h1
            id="hero-title"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.6 }}
          >
            Montage, die haelt: Balkone, Zaeune, Ueberdachungen und Innenausbau.
          </m.h1>
          <m.p
            className="hero-lead"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.6 }}
          >
            MSK Montage Service Kohlert verbindet 20 Jahre Schreinerhandwerk mit flexibler Montagepower.
            Ob Grossprojekt, Renovierung oder knifflige Einzelmontage: Wir koennen alles montieren und
            organisieren auf Wunsch die passende Komplettloesung.
          </m.p>
          <m.div
            className="hero-actions"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.6 }}
          >
            <a className="button primary" href="#kontakt">
              Projekt anfragen <ArrowRight aria-hidden="true" />
            </a>
            <a className="button secondary" href="#galerie">
              Arbeiten ansehen
            </a>
          </m.div>
          <ul className="hero-checks" aria-label="Stärken von MSK">
            <li>
              <BadgeCheck aria-hidden="true" /> Saubere Montage
            </li>
            <li>
              <BadgeCheck aria-hidden="true" /> Zuverlaessige Abwicklung
            </li>
            <li>
              <BadgeCheck aria-hidden="true" /> Regional verankert
            </li>
          </ul>
        </div>

        <m.div
          className="hero-card"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94, rotate: -2 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.18, duration: 0.7, type: 'spring', stiffness: 90 }}
        >
          <div className="logo-mark">
            <img src="/brand/msk-logo.svg" alt="MSK Montage Service Kohlert Logo" />
          </div>
          <div className="rating-card">
            <span className="stars" aria-label="5 von 5 Sternen">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} aria-hidden="true" fill="currentColor" />
              ))}
            </span>
            <strong>5,0 Google-Bewertung</strong>
            <small>gelobt fuer professionelle Arbeit, Zuverlaessigkeit und saubere Ergebnisse</small>
          </div>
        </m.div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="trustbar" aria-label="Kennzahlen">
      <div className="container stats-grid">
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section-pad" id="leistungen" aria-labelledby="services-title">
      <div className="container">
        <SectionIntro
          eyebrow="Leistungsspektrum"
          title="Ein Team fuer fast jede Montageaufgabe."
          text="Vom Balkon bis zum Boden: MSK denkt praktisch, arbeitet praezise und bleibt ansprechbar, bis alles passt."
        />
        <div className="service-grid">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <RevealCard className="service-card" key={service.title} delay={index * 0.04}>
                <Icon aria-hidden="true" />
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </RevealCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    'Vor Ort verstehen, was wirklich gebraucht wird.',
    'Material, Gewerke und Ablauf sinnvoll koordinieren.',
    'Sauber montieren, pruefen und besenrein uebergeben.',
  ];

  return (
    <section className="process section-pad" aria-labelledby="process-title">
      <div className="container split-grid">
        <div>
          <p className="eyebrow">Arbeitsweise</p>
          <h2 id="process-title">Handwerklich stark, pragmatisch organisiert.</h2>
          <p>
            Sebastian Kohlert und Team stehen fuer klare Absprachen, belastbare Loesungen und ein
            Netzwerk fuer Komplettprojekte. So bleibt die Baustelle planbar und das Ergebnis hochwertig.
          </p>
        </div>
        <ol className="steps">
          {steps.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="gallery section-pad" id="galerie" aria-labelledby="gallery-title">
      <div className="container">
        <SectionIntro
          eyebrow="Projektgalerie"
          title="Echte Arbeiten aus Montage, Aussenbereich und Ausbau."
          text="Alle im Repository vorhandenen Bilder werden als Referenzen gezeigt und geben einen Eindruck von Balkon-, Aussenbereich- und Montagearbeiten."
        />
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <m.figure
              key={image}
              className={index === 0 || index === 5 ? 'gallery-item large' : 'gallery-item'}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.03 }}
            >
              <img
                src={`/Gallery/${image}`}
                alt={`Referenzprojekt von MSK Montage Service Kohlert ${index + 1}`}
                loading={index < 2 ? 'eager' : 'lazy'}
              />
            </m.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="reviews section-pad" id="bewertungen" aria-labelledby="reviews-title">
      <div className="container">
        <SectionIntro
          eyebrow="Kundenstimmen"
          title="Zuverlaessigkeit, Tempo und saubere Arbeit werden besonders oft genannt."
          text="Auszuege aus oeffentlichen Google-Rezensionen, inhaltlich gekuerzt fuer die Website."
        />
        <div className="review-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review.name}>
              <div className="stars" aria-label="5 von 5 Sternen">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} aria-hidden="true" fill="currentColor" />
                ))}
              </div>
              <blockquote>{review.quote}</blockquote>
              <p>{review.name}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="contact section-pad" id="kontakt" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div>
          <p className="eyebrow">Kontakt</p>
          <h2 id="contact-title">Erzaehlen Sie uns, was montiert werden soll.</h2>
          <p>
            Die Kontaktseite ist als Dummy vorbereitet. Telefonnummer und Standort sind bereits sichtbar,
            das Formular kann spaeter an E-Mail, CRM oder ein Backend angebunden werden.
          </p>
          <div className="contact-cards">
            <a href="tel:+491758676763">
              <Phone aria-hidden="true" />
              <span>
                <strong>Mobil</strong>
                0175 8676763
              </span>
            </a>
            <a href="mailto:kontakt@example.com">
              <Mail aria-hidden="true" />
              <span>
                <strong>E-Mail Dummy</strong>
                kontakt@example.com
              </span>
            </a>
            <a href="https://maps.google.com/?q=Dr.-M%C3%BCller-Stra%C3%9Fe%2026A%2C%2091746%20Weidenbach" target="_blank" rel="noreferrer">
              <MapPin aria-hidden="true" />
              <span>
                <strong>Standort</strong>
                Dr.-Mueller-Str. 26 a, 91746 Weidenbach
              </span>
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" autoComplete="name" required placeholder="Max Mustermann" />
          </label>
          <label>
            Telefon oder E-Mail
            <input name="contact" autoComplete="email" required placeholder="0175 ... oder mail@example.de" />
          </label>
          <label>
            Projektart
            <select name="project" defaultValue="Montage">
              <option>Montage</option>
              <option>Balkon</option>
              <option>Zaun / Aussenbereich</option>
              <option>Ueberdachung</option>
              <option>Innenausbau</option>
            </select>
          </label>
          <label>
            Nachricht
            <textarea name="message" rows={5} placeholder="Worum geht es bei Ihrem Projekt?" />
          </label>
          <button className="button primary" type="submit">
            Dummy-Anfrage senden <ArrowRight aria-hidden="true" />
          </button>
          {submitted ? (
            <p className="form-note" role="status">
              Danke! Diese Demo speichert noch keine Daten. Die Formularanbindung kann im naechsten Schritt erfolgen.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

function LegalPage({ type }: { type: 'privacy' | 'imprint' }) {
  const isPrivacy = type === 'privacy';

  return (
    <section className="legal section-pad">
      <div className="container narrow">
        <p className="eyebrow">Dummy-Seite</p>
        <h1>{isPrivacy ? 'Datenschutzerklaerung' : 'Impressum'}</h1>
        <div className="legal-card">
          {isPrivacy ? (
            <>
              <p>
                Diese Datenschutzerklaerung ist ein Platzhalter und muss vor Veroeffentlichung juristisch
                geprueft und an die tatsaechlichen Dienste angepasst werden.
              </p>
              <h2>Verantwortlicher</h2>
              <p>MSK Montage Service Kohlert, Dr.-Mueller-Str. 26 a, 91746 Weidenbach.</p>
              <h2>Kontaktformular</h2>
              <p>
                Das aktuelle Demo-Formular versendet und speichert keine personenbezogenen Daten. Bei einer
                spaeteren Backend-Anbindung sind Zweck, Rechtsgrundlage und Speicherdauer zu ergaenzen.
              </p>
              <h2>Cookies</h2>
              <p>
                Das Cookie-Banner speichert lediglich die lokale Zustimmung im Browser. Tracking-Dienste sind
                in dieser Demo nicht integriert.
              </p>
            </>
          ) : (
            <>
              <p>
                Angaben gemaess § 5 TMG. Dieser Inhalt ist ein Dummy und muss vor Livegang final geprueft
                werden.
              </p>
              <h2>MSK Montage Service Kohlert</h2>
              <p>
                Sebastian Kohlert
                <br />
                Dr.-Mueller-Str. 26 a
                <br />
                91746 Weidenbach
              </p>
              <h2>Kontakt</h2>
              <p>
                Telefon: 0175 8676763
                <br />
                E-Mail: kontakt@example.com
              </p>
              <h2>Haftung fuer Inhalte</h2>
              <p>
                Als Diensteanbieter sind wir fuer eigene Inhalte verantwortlich. Dieser Abschnitt ist als
                Platzhalter fuer die finale rechtliche Fassung vorgesehen.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <img src="/brand/msk-logo.svg" alt="" width="72" height="72" />
          <p>MSK Montage Service Kohlert - Montage, Schreinerhandwerk und Komplettloesungen aus Weidenbach.</p>
        </div>
        <div>
          <h2>Kontakt</h2>
          <a href="tel:+491758676763">0175 8676763</a>
          <span>Dr.-Mueller-Str. 26 a, 91746 Weidenbach</span>
        </div>
        <div>
          <h2>Rechtliches</h2>
          <a href="#impressum">Impressum</a>
          <a href="#datenschutz">Datenschutz</a>
        </div>
      </div>
    </footer>
  );
}

function CookieBanner() {
  const [visible, setVisible] = useState(() => localStorage.getItem(COOKIE_CONSENT_KEY) !== 'accepted');

  function acceptCookies() {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <m.aside
      className="cookie-banner"
      aria-labelledby="cookie-title"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h2 id="cookie-title">
          <ShieldCheck aria-hidden="true" /> Cookie-Hinweis
        </h2>
        <p>
          Diese Demo nutzt nur notwendige lokale Speicherung fuer Ihre Cookie-Entscheidung. Kein Tracking,
          keine externen Marketing-Cookies.
        </p>
      </div>
      <button className="button primary" type="button" onClick={acceptCookies}>
        Verstanden
      </button>
    </m.aside>
  );
}

function SectionIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <div className="section-intro">
      <p className="eyebrow">
        <Sparkles aria-hidden="true" /> {eyebrow}
      </p>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function RevealCard({ children, className, delay = 0 }: { children: ReactNode; className: string; delay?: number }) {
  return (
    <m.article
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay }}
    >
      {children}
      <CheckCircle2 className="card-check" aria-hidden="true" />
    </m.article>
  );
}

export default App;
