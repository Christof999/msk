import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  ChevronRight,
  DoorOpen,
  Fence,
  Hammer,
  Home,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Star,
  Trees,
  X,
} from 'lucide-react';
import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import './styles.css';

const COOKIE_CONSENT_KEY = 'msk-cookie-consent';
const PHONE_DISPLAY = '0175 8676763';
const PHONE_TEL = '+491758676763';
const EMAIL = 'info@msk-montage.de';
const ADDRESS = 'Dr.-Müller-Str. 26 a, 91746 Weidenbach';
const MAPS_URL =
  'https://maps.google.com/?q=Dr.-M%C3%BCller-Stra%C3%9Fe%2026A%2C%2091746%20Weidenbach';

type Route = 'home' | 'services' | 'gallery' | 'contact' | 'privacy' | 'imprint';

const galleryImages = Array.from({ length: 31 }, (_, i) =>
  `IMG_${String(185 + i).padStart(4, '0')}.jpeg`,
);

const navItems: { label: string; route: Route; href: string }[] = [
  { label: 'Leistungen', route: 'services', href: '#leistungen' },
  { label: 'Galerie', route: 'gallery', href: '#galerie' },
  { label: 'Kontakt', route: 'contact', href: '#kontakt' },
];

const services = [
  {
    icon: Building2,
    title: 'Balkone & Anlagenbau',
    text: 'Planung, Demontage, Montage und saubere Umsetzung von Balkon- und Sommergartenprojekten – inklusive Statik-Abstimmung mit den Gewerken.',
  },
  {
    icon: Fence,
    title: 'Zaunbau & Sichtschutz',
    text: 'Robuste Zaunanlagen, Tore und Sichtschutzlösungen passend zu Haus, Garten und Bestand. Aluminium, Holz oder WPC.',
  },
  {
    icon: Home,
    title: 'Überdachungen',
    text: 'Terrassenüberdachungen, Kaltwintergärten und wetterfeste Konstruktionen aus einer Hand – inklusive Beleuchtung und Beschattung auf Wunsch.',
  },
  {
    icon: DoorOpen,
    title: 'Innenausbau',
    text: 'Türen, Böden, Fenster, Rollläden und Schreinerarbeiten mit Blick fürs Detail – sauber gemessen, sauber montiert.',
  },
  {
    icon: Hammer,
    title: 'Allgemeine Montage',
    text: 'Von der Einzelmontage bis zur Komplettlösung. MSK packt flexibel an, koordiniert Gewerke und liefert besenrein ab.',
  },
  {
    icon: Trees,
    title: 'Außenbereich komplett',
    text: 'Balkon, Garten, Terrasse und Fassade werden funktional, langlebig und optisch stimmig zusammengeführt.',
  },
];

const reviews = [
  {
    quote:
      'Kaltwintergarten mit Balkon realisiert – sauber, professionell und mit einem starken Team umgesetzt.',
    name: 'Hans-Jörg Schubert',
    project: 'Kaltwintergarten · Balkon',
  },
  {
    quote:
      'Eine komplexe Aufgabe zu unserer vollsten Zufriedenheit ausgeführt. Sehr empfehlenswert.',
    name: 'Sebastian Kuhn',
    project: 'Komplettmontage',
  },
  {
    quote:
      'Super Team. Schnell, freundlich und sehr sauber gearbeitet. Mit bestem Gewissen weiterzuempfehlen.',
    name: 'Monika Häfner',
    project: 'Innenausbau',
  },
];

const stats = [
  { value: '20+', label: 'Jahre Erfahrung im Schreinerhandwerk' },
  { value: '5,0', label: 'Bewertung aus echten Kundenstimmen' },
  { value: '2019', label: 'als Familienbetrieb selbstständig' },
];

const processSteps = [
  {
    label: 'Schritt 01',
    title: 'Verstehen.',
    text: 'Vor Ort prüfen wir den Bestand und sprechen offen über Anspruch, Budget und Zeitrahmen.',
  },
  {
    label: 'Schritt 02',
    title: 'Koordinieren.',
    text: 'Material, Gewerke und Ablauf werden abgestimmt – damit auf der Baustelle nichts wartet.',
  },
  {
    label: 'Schritt 03',
    title: 'Ausführen.',
    text: 'Sauber montieren, prüfen und besenrein übergeben. Ohne Drama, ohne offene Enden.',
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [route, setRoute] = useState<Route>(() => getRouteFromHash());

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRouteFromHash());
      setMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (next: Route) => {
    const hash = next === 'home' ? '' : `#${routeToHash(next)}`;
    if (hash !== window.location.hash) {
      window.location.hash = hash;
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <LazyMotion features={domAnimation}>
      <div className="site-shell">
        <SkipLink />
        <Header
          route={route}
          menuOpen={menuOpen}
          onToggleMenu={() => setMenuOpen((open) => !open)}
          onCloseMenu={() => setMenuOpen(false)}
        />
        <main id="main-content" tabIndex={-1}>
          {route === 'services' ? (
            <ServicesPage />
          ) : route === 'gallery' ? (
            <GalleryPage />
          ) : route === 'contact' ? (
            <ContactPage />
          ) : route === 'privacy' ? (
            <LegalPage type="privacy" />
          ) : route === 'imprint' ? (
            <LegalPage type="imprint" />
          ) : (
            <LandingPage onNavigate={navigate} />
          )}
        </main>
        <Footer />
        <CookieBanner />
      </div>
    </LazyMotion>
  );
}

function routeToHash(route: Route): string {
  switch (route) {
    case 'services':
      return 'leistungen';
    case 'gallery':
      return 'galerie';
    case 'contact':
      return 'kontakt';
    case 'privacy':
      return 'datenschutz';
    case 'imprint':
      return 'impressum';
    default:
      return '';
  }
}

function getRouteFromHash(): Route {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '').split('?')[0];
  switch (hash) {
    case 'leistungen':
      return 'services';
    case 'galerie':
      return 'gallery';
    case 'kontakt':
      return 'contact';
    case 'datenschutz':
      return 'privacy';
    case 'impressum':
      return 'imprint';
    default:
      return 'home';
  }
}

function SkipLink() {
  return (
    <a className="skip-link" href="#main-content">
      Zum Inhalt springen
    </a>
  );
}

function Header({
  route,
  menuOpen,
  onToggleMenu,
  onCloseMenu,
}: {
  route: Route;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
}) {
  return (
    <header className="site-header">
      <nav className="nav" aria-label="Hauptnavigation">
        <a className="brand" href="#" aria-label="MSK Montage Service Kohlert – Startseite">
          <img src="/brand/msk-logo.svg" alt="" width="42" height="42" />
          <span className="brand-name">
            <strong>MSK</strong>
            <small>Montage Service Kohlert</small>
          </span>
        </a>

        <div className="nav-links desktop-links">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={route === item.route ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href={`tel:${PHONE_TEL}`}>
            Anrufen
          </a>
        </div>

        <button
          className="menu-toggle"
          type="button"
          onClick={onToggleMenu}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className="sr-only">Menü öffnen oder schließen</span>
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <m.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={onCloseMenu}
                aria-current={route === item.route ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
            <a className="nav-cta" href={`tel:${PHONE_TEL}`} onClick={onCloseMenu}>
              {PHONE_DISPLAY}
            </a>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

/* ============================================================
   Landing
   ============================================================ */

function LandingPage({ onNavigate }: { onNavigate: (r: Route) => void }) {
  return (
    <>
      <Hero />
      <StatRow />
      <ServicesTeaser onSeeAll={() => onNavigate('services')} />
      <GalleryTeaser onSeeAll={() => onNavigate('gallery')} />
      <ReviewsSection />
      <ContactCTA onContact={() => onNavigate('contact')} />
    </>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container reveal-stack">
        <div className="hero-meta">
          <span className="eyebrow">MSK · Familienbetrieb seit 2019</span>
          <span className="hero-meta-locale">Weidenbach · Mittelfranken</span>
        </div>

        <h1 id="hero-title">
          Montage,<br />
          die <em>hält</em>.
        </h1>

        <div className="hero-foot">
          <div className="hero-actions">
            <a className="button" href="#kontakt">
              Projekt anfragen
              <ArrowRight aria-hidden="true" />
            </a>
            <a className="button ghost" href="#galerie">
              Arbeiten ansehen
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>

          <ul className="hero-checks" aria-label="Kennzeichen von MSK">
            <li>
              <BadgeCheck aria-hidden="true" /> 20 Jahre Schreinerhandwerk
            </li>
            <li>
              <BadgeCheck aria-hidden="true" /> Saubere, planbare Abwicklung
            </li>
            <li>
              <BadgeCheck aria-hidden="true" /> Regional verankert in Weidenbach
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function StatRow() {
  return (
    <section className="container section-tight" aria-label="Kennzahlen">
      <div className="stat-row">
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

function ServicesTeaser({ onSeeAll }: { onSeeAll: () => void }) {
  return (
    <section className="section" id="leistungen-teaser" aria-labelledby="services-teaser-title">
      <div className="container">
        <SectionHead
          num="01"
          label="Leistungen"
          title={
            <>
              Vom Balkon bis zum Boden – <em>aus einer Hand</em>.
            </>
          }
          description="Sechs klar abgegrenzte Leistungsbereiche. Jede Baustelle wird vom selben Team begleitet, koordiniert und sauber übergeben."
          ctaHref="#leistungen"
          ctaLabel="Alle Leistungen"
          onCta={onSeeAll}
          titleId="services-teaser-title"
        />

        <div className="service-list">
          {services.slice(0, 4).map((service, index) => (
            <a className="service-row" key={service.title} href="#leistungen" onClick={onSeeAll}>
              <span className="service-num">{String(index + 1).padStart(2, '0')}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ChevronRight className="row-arrow" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryTeaser({ onSeeAll }: { onSeeAll: () => void }) {
  const teaser = ['IMG_0185.jpeg', 'IMG_0192.jpeg', 'IMG_0198.jpeg', 'IMG_0204.jpeg', 'IMG_0210.jpeg'];

  return (
    <section className="section" id="galerie-teaser" aria-labelledby="gallery-teaser-title">
      <div className="container">
        <SectionHead
          num="02"
          label="Arbeiten"
          title={
            <>
              Echte Projekte aus <em>Montage und Ausbau</em>.
            </>
          }
          description="Ein Auszug realisierter Arbeiten: Balkone, Überdachungen, Außenanlagen und Innenausbau."
          ctaHref="#galerie"
          ctaLabel="Galerie öffnen"
          onCta={onSeeAll}
          titleId="gallery-teaser-title"
        />

        <div className="gallery-teaser">
          {teaser.map((image, i) => (
            <m.figure
              key={image}
              className="gt-tile"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <LazyImage
                src={`/Gallery/${image}`}
                alt={`Referenzprojekt von MSK Montage Service Kohlert – Vorschau ${i + 1}`}
                eager={i === 0}
              />
            </m.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section className="section" id="bewertungen" aria-labelledby="reviews-title">
      <div className="container">
        <SectionHead
          num="03"
          label="Stimmen"
          title={
            <>
              Zuverlässigkeit, Tempo, <em>saubere Arbeit</em>.
            </>
          }
          description="Auszüge aus öffentlichen Google-Rezensionen, inhaltlich gekürzt für die Website."
          titleId="reviews-title"
        />
        <div className="review-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review.name}>
              <div className="stars" aria-label="5 von 5 Sternen">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} aria-hidden="true" fill="currentColor" />
                ))}
              </div>
              <blockquote>{review.quote}</blockquote>
              <div className="author">
                <strong>{review.name}</strong>
                <span>{review.project}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactCTA({ onContact }: { onContact: () => void }) {
  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-block">
          <div>
            <span className="eyebrow no-rule" style={{ color: 'rgba(246,243,236,0.65)' }}>
              04 — Kontakt
            </span>
            <h2 id="cta-title" style={{ marginTop: '1rem' }}>
              Erzählen Sie uns,<br /> was <em>montiert werden soll</em>.
            </h2>
            <p>
              Ein kurzer Anruf, eine kurze Mail, ein paar Fotos – wir melden uns zurück und planen den Termin
              vor Ort.
            </p>
          </div>
          <div className="cta-actions">
            <a className="button" href="#kontakt" onClick={onContact}>
              Anfrage starten
              <ArrowRight aria-hidden="true" />
            </a>
            <a className="button ghost" href={`tel:${PHONE_TEL}`}>
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Subpages
   ============================================================ */

function ServicesPage() {
  return (
    <>
      <PageHero
        crumb="Leistungen"
        title={
          <>
            Was wir <em>montieren</em>.
          </>
        }
        lead="Sechs Bereiche, ein Team. Wir sind dort gut, wo Schreinerhandwerk auf Montagepower trifft – und arbeiten überall dort, wo es zwischen Gewerken eng wird."
      />

      <section className="section">
        <div className="container">
          <div className="service-list">
            {services.map((service, index) => (
              <article className="service-row" key={service.title}>
                <span className="service-num">{String(index + 1).padStart(2, '0')}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <span aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            num="·"
            label="Arbeitsweise"
            title={
              <>
                Handwerklich stark,<br /> <em>pragmatisch organisiert</em>.
              </>
            }
            description="Sebastian Kohlert und Team stehen für klare Absprachen, belastbare Lösungen und ein Netzwerk für Komplettprojekte. So bleibt die Baustelle planbar und das Ergebnis hochwertig."
            titleId="process-title"
          />
          <div className="process-grid">
            {processSteps.map((step) => (
              <div className="process-step" key={step.title}>
                <span className="step-num">{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-block">
            <div>
              <h2>
                Klingt passend? <em>Lassen Sie uns reden</em>.
              </h2>
              <p>
                Eine kurze Beschreibung reicht – wir melden uns zurück und vereinbaren den Termin vor Ort.
              </p>
            </div>
            <div className="cta-actions">
              <a className="button" href="#kontakt">
                Zum Kontakt
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function GalleryPage() {
  return (
    <>
      <PageHero
        crumb="Galerie"
        title={
          <>
            Arbeiten aus <em>Montage und Ausbau</em>.
          </>
        }
        lead="Eine Auswahl realisierter Projekte rund um Balkone, Überdachungen, Zaunanlagen und Innenausbau. Bilder werden beim Scrollen nachgeladen."
      />

      <section className="section">
        <div className="container">
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <m.figure
                key={image}
                className={
                  index === 0 || index === 7 || index === 18
                    ? 'gallery-item large'
                    : index === 4 || index === 14
                      ? 'gallery-item wide'
                      : 'gallery-item'
                }
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: Math.min(index, 8) * 0.04 }}
              >
                <LazyImage
                  src={`/Gallery/${image}`}
                  alt={`Referenzprojekt von MSK Montage Service Kohlert ${index + 1}`}
                  eager={index < 2}
                />
              </m.figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Kontakt"
        title={
          <>
            Lassen Sie uns über <em>Ihr Projekt</em> sprechen.
          </>
        }
        lead="Sie erreichen uns telefonisch, per E-Mail oder über das Formular. Wir melden uns in der Regel innerhalb eines Werktags zurück."
      />

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <p>
                Sie haben ein konkretes Vorhaben oder erst einmal Fragen? Eine kurze Beschreibung mit ein
                paar Fotos hilft, das Projekt einzuschätzen.
              </p>

              <div className="contact-cards">
                <a href={`tel:${PHONE_TEL}`}>
                  <Phone aria-hidden="true" />
                  <span>
                    <small>Telefon</small>
                    <strong>{PHONE_DISPLAY}</strong>
                  </span>
                  <ArrowUpRight className="row-arrow" aria-hidden="true" />
                </a>
                <a href={`mailto:${EMAIL}`}>
                  <Mail aria-hidden="true" />
                  <span>
                    <small>E-Mail</small>
                    <strong>{EMAIL}</strong>
                  </span>
                  <ArrowUpRight className="row-arrow" aria-hidden="true" />
                </a>
                <a href={MAPS_URL} target="_blank" rel="noreferrer">
                  <MapPin aria-hidden="true" />
                  <span>
                    <small>Standort</small>
                    <strong>{ADDRESS}</strong>
                  </span>
                  <ArrowUpRight className="row-arrow" aria-hidden="true" />
                </a>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} aria-label="Anfrageformular">
      <label>
        Name
        <input name="name" autoComplete="name" required placeholder="Ihr Name" />
      </label>
      <label>
        Telefon oder E-Mail
        <input
          name="contact"
          autoComplete="email"
          required
          placeholder="z. B. info@beispiel.de"
        />
      </label>
      <label>
        Projektart
        <select name="project" defaultValue="Allgemeine Montage">
          <option>Allgemeine Montage</option>
          <option>Balkone & Anlagenbau</option>
          <option>Zaun- und Außenbereich</option>
          <option>Überdachung</option>
          <option>Innenausbau</option>
        </select>
      </label>
      <label>
        Nachricht
        <textarea
          name="message"
          rows={5}
          placeholder="Worum geht es bei Ihrem Projekt? Maße, Bilder oder ein Zeitrahmen helfen bei der Einschätzung."
        />
      </label>
      <div className="actions">
        <button className="button" type="submit">
          Anfrage senden
          <ArrowRight aria-hidden="true" />
        </button>
        <span className="legal-note">DSGVO · keine Weitergabe an Dritte</span>
      </div>
      {submitted ? (
        <p className="form-note" role="status">
          Vielen Dank! Sobald die Formularanbindung live ist, erhalten Sie eine Eingangsbestätigung. Bis
          dahin freuen wir uns über einen kurzen Anruf unter {PHONE_DISPLAY}.
        </p>
      ) : null}
    </form>
  );
}

/* ============================================================
   Shared
   ============================================================ */

function PageHero({
  crumb,
  title,
  lead,
}: {
  crumb: string;
  title: ReactNode;
  lead: string;
}) {
  return (
    <section className="page-hero" aria-labelledby="page-title">
      <div className="container page-hero-grid reveal-stack">
        <div className="crumbs">
          <a href="#">Start</a>
          <ChevronRight aria-hidden="true" />
          <span aria-current="page">{crumb}</span>
        </div>
        <h1 id="page-title">{title}</h1>
        <p className="lead">{lead}</p>
      </div>
    </section>
  );
}

function SectionHead({
  num,
  label,
  title,
  description,
  ctaHref,
  ctaLabel,
  onCta,
  titleId,
}: {
  num: string;
  label: string;
  title: ReactNode;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
  onCta?: () => void;
  titleId?: string;
}) {
  return (
    <header className="section-head">
      <div className="head-label">
        <span className="section-num">— {num}</span>
        <span className="eyebrow no-rule">{label}</span>
      </div>
      <div className="head-title">
        <h2 id={titleId}>{title}</h2>
        {description ? <p>{description}</p> : null}
        {ctaHref && ctaLabel ? (
          <a className="link-arrow head-cta" href={ctaHref} onClick={onCta}>
            {ctaLabel}
            <ArrowUpRight aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </header>
  );
}

function LegalPage({ type }: { type: 'privacy' | 'imprint' }) {
  const isPrivacy = type === 'privacy';
  return (
    <>
      <PageHero
        crumb={isPrivacy ? 'Datenschutz' : 'Impressum'}
        title={isPrivacy ? <>Datenschutz<em>erklärung</em>.</> : <>Im<em>pressum</em>.</>}
        lead={
          isPrivacy
            ? 'Diese Datenschutzerklärung beschreibt, wie wir mit personenbezogenen Daten umgehen, wenn Sie diese Website besuchen oder Kontakt aufnehmen.'
            : 'Angaben gemäß § 5 TMG für die Verantwortlichkeit, Erreichbarkeit und Inhalte dieser Website.'
        }
      />
      <section className="section">
        <div className="container narrow">
          <div className="legal-card">
            {isPrivacy ? (
              <>
                <h2>Verantwortlicher</h2>
                <p>
                  MSK Montage Service Kohlert, Sebastian Kohlert, {ADDRESS}.<br />
                  Telefon: <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a> · E-Mail:{' '}
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </p>
                <h2>Kontaktformular</h2>
                <p>
                  Bei einer Anfrage über das Formular werden Name, Kontaktdaten und Ihre Nachricht
                  ausschließlich zur Bearbeitung der Anfrage verarbeitet (Art. 6 Abs. 1 lit. b DSGVO). Eine
                  Weitergabe an Dritte findet nicht statt.
                </p>
                <h2>Server-Logs</h2>
                <p>
                  Beim Aufruf dieser Website werden technisch notwendige Daten (z. B. anonymisierte
                  IP-Adresse, Browsertyp, Zeitpunkt) verarbeitet. Diese Daten dienen ausschließlich dem
                  sicheren Betrieb der Website und werden nicht mit anderen Datenquellen zusammengeführt.
                </p>
                <h2>Cookies</h2>
                <p>
                  Diese Website setzt ausschließlich technisch notwendige Cookies bzw. eine lokale
                  Speicherung Ihrer Cookie-Entscheidung. Es findet kein Tracking, keine Profilbildung und
                  keine Übergabe an externe Marketing-Dienste statt.
                </p>
                <h2>Ihre Rechte</h2>
                <p>
                  Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung
                  sowie Widerspruch und Datenübertragbarkeit. Eine Beschwerde können Sie bei der
                  zuständigen Aufsichtsbehörde einlegen.
                </p>
              </>
            ) : (
              <>
                <h2>MSK Montage Service Kohlert</h2>
                <p>
                  Sebastian Kohlert<br />
                  {ADDRESS}
                </p>
                <h2>Kontakt</h2>
                <p>
                  Telefon: <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
                  <br />
                  E-Mail: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                </p>
                <h2>Verantwortlich für den Inhalt</h2>
                <p>Sebastian Kohlert, Anschrift wie oben.</p>
                <h2>Haftung für Inhalte</h2>
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte verantwortlich. Für
                  fremde Inhalte verlinkter Seiten übernehmen wir keine Gewähr; bei Bekanntwerden von
                  Rechtsverletzungen werden entsprechende Inhalte umgehend entfernt.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <a className="brand" href="#" aria-label="MSK Startseite">
              <img src="/brand/msk-logo.svg" alt="" width="52" height="52" />
              <span className="brand-name">
                <strong>MSK</strong>
                <small>Montage Service Kohlert</small>
              </span>
            </a>
            <p>
              Familienbetrieb für Montage, Schreinerhandwerk und Komplettlösungen aus Weidenbach in
              Mittelfranken.
            </p>
          </div>
          <div className="footer-col">
            <h4>Navigation</h4>
            <a href="#leistungen">Leistungen</a>
            <a href="#galerie">Galerie</a>
            <a href="#kontakt">Kontakt</a>
          </div>
          <div className="footer-col">
            <h4>Kontakt</h4>
            <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <span>{ADDRESS}</span>
          </div>
          <div className="footer-col">
            <h4>Rechtliches</h4>
            <a href="#impressum">Impressum</a>
            <a href="#datenschutz">Datenschutz</a>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} MSK Montage Service Kohlert</span>
          <span>Weidenbach · Mittelfranken</span>
        </div>
      </div>
    </footer>
  );
}

function CookieBanner() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(COOKIE_CONSENT_KEY) !== 'accepted';
  });

  function accept() {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <m.aside
      className="cookie-banner"
      role="dialog"
      aria-labelledby="cookie-title"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    >
      <h2 id="cookie-title">
        <ShieldCheck aria-hidden="true" /> Cookies
      </h2>
      <p>
        Wir verwenden ausschließlich technisch notwendige Cookies, damit diese Website korrekt
        funktioniert und Ihre Cookie-Entscheidung gespeichert wird. Kein Tracking, keine externen
        Marketing-Cookies. Mehr unter <a href="#datenschutz">Datenschutz</a>.
      </p>
      <div className="cookie-actions">
        <button className="button" type="button" onClick={accept}>
          Verstanden
        </button>
        <a className="link-arrow" href="#datenschutz">
          Details lesen
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </m.aside>
  );
}

/* ============================================================
   Lazy image
   ============================================================ */

function LazyImage({
  src,
  alt,
  eager = false,
}: {
  src: string;
  alt: string;
  eager?: boolean;
}) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const [shouldLoad, setShouldLoad] = useState(eager);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (eager || shouldLoad) return;
    const el = wrapperRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '500px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [eager, shouldLoad]);

  return (
    <span ref={wrapperRef} className={`lazy-img${loaded ? ' is-loaded' : ''}`}>
      {shouldLoad ? (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
        />
      ) : null}
    </span>
  );
}

export default App;
