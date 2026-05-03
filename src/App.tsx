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

type Service = {
  icon: typeof Building2;
  title: string;
  text: string;
  longText: string;
  includes: string[];
  images: string[];
};

const services: Service[] = [
  {
    icon: Building2,
    title: 'Balkone & Anlagenbau',
    text: 'Planung, Demontage und saubere Montage von Balkon- und Sommergartenprojekten – inklusive Statik-Abstimmung mit den Gewerken.',
    longText:
      'Ob neuer Anbau, Sanierung oder Komplettaustausch: Wir realisieren Balkone und Sommergärten von der Bestandsaufnahme bis zur Übergabe. Wir kümmern uns um Statik-Abstimmung, Demontage, Anker- und Konsolentechnik sowie die abschließende Montage von Geländer, Sichtschutz und Beleuchtung. Die Baustelle bleibt sauber, Termine werden eingehalten – auch wenn andere Gewerke parallel arbeiten.',
    includes: [
      'Bestandsaufnahme und Maßaufnahme vor Ort',
      'Demontage von Bestandsbalkonen',
      'Anker- und Konsolentechnik',
      'Aluminium-, Stahl- und Holzkonstruktionen',
      'Geländer, Sichtschutz und Beleuchtung',
      'Statik- und Fachplanerabstimmung',
    ],
    images: ['IMG_0185.jpeg', 'IMG_0188.jpeg'],
  },
  {
    icon: Fence,
    title: 'Zaunbau & Sichtschutz',
    text: 'Robuste Zaunanlagen, Tore und Sichtschutzlösungen passend zu Haus, Garten und Bestand. Aluminium, Holz oder WPC.',
    longText:
      'Ein Zaun definiert das Grundstück und schützt es zugleich. Wir planen und montieren Anlagen, die zur Architektur, zum Garten und zur Nutzung passen – vom Doppelstabmatten-Zaun bis zur designorientierten Aluminium-Lamelle. Schiebe- oder Drehtore mit Antrieb sind ebenfalls Teil des Programms. Punktfundamente, Linienführung und Höhenausgleich werden sauber vorbereitet.',
    includes: [
      'Vermessung und Linienführung',
      'Punktfundamente und Verankerung',
      'Aluminium-, Stahl- oder Holz-Zaunfelder',
      'Sichtschutz aus Lamellen oder WPC',
      'Schiebe- und Drehtore mit Antrieb',
      'Beschläge, Schlösser, Briefkastenanlagen',
    ],
    images: ['IMG_0190.jpeg', 'IMG_0193.jpeg'],
  },
  {
    icon: Home,
    title: 'Überdachungen',
    text: 'Terrassenüberdachungen, Kaltwintergärten und wetterfeste Konstruktionen – inklusive Beleuchtung und Beschattung auf Wunsch.',
    longText:
      'Vom einfachen Vordach bis zum vollwertigen Kaltwintergarten: Wir konstruieren und montieren Überdachungen für ganzjährige Nutzung. Auf Wunsch ergänzen wir LED-Beleuchtung, Markisen oder Glasschiebewände. Regenrinne, Anschlüsse und Abdichtungen werden professionell ausgeführt, damit die Konstruktion langfristig dicht bleibt.',
    includes: [
      'Terrassenüberdachungen aus Aluminium',
      'Kaltwintergärten mit Glas-Schiebeelementen',
      'Vordächer für Eingang und Nebentüren',
      'LED-Lichtbänder und Spots',
      'Markisen und Beschattungssysteme',
      'Regenrinne, Anschluss und Abdichtung',
    ],
    images: ['IMG_0195.jpeg', 'IMG_0198.jpeg'],
  },
  {
    icon: DoorOpen,
    title: 'Innenausbau',
    text: 'Türen, Böden, Fenster, Rollläden und Schreinerarbeiten mit Blick fürs Detail – sauber gemessen, sauber montiert.',
    longText:
      'Innenausbau heißt für uns: Maße ernst nehmen, Übergänge sauber lösen, Materialien sinnvoll kombinieren. Ob neue Türen mit Zarge, Massivholzboden oder Rollläden – wir kümmern uns um die saubere Montage inklusive Demontage des Bestands und besenreiner Übergabe. Schnittstellen zu Maler, Elektrik und Sanitär werden vorab koordiniert.',
    includes: [
      'Innen- und Wohnungstüren mit Zarge',
      'Parkett, Laminat, Vinyl, Massivholz',
      'Fenster und Rollläden inklusive Anschluss',
      'Trockenbau-Anschlüsse und Leibungen',
      'Maßgefertigte Einbaumöbel',
      'Demontage und besenreine Übergabe',
    ],
    images: ['IMG_0200.jpeg', 'IMG_0203.jpeg'],
  },
  {
    icon: Hammer,
    title: 'Allgemeine Montage',
    text: 'Von der Einzelmontage bis zur Komplettlösung. MSK packt flexibel an, koordiniert Gewerke und liefert besenrein ab.',
    longText:
      'Wenn keiner weiß, wer es montiert, sind wir die richtige Adresse. Egal ob ein einzelnes Möbelstück, ein neues Treppengeländer oder ein komplettes Bauteilpaket – wir übernehmen die saubere, durchdachte Montage und koordinieren bei Bedarf weitere Gewerke. Werkzeug, Hebehilfen und Material kommen mit; vor Ort wird angepackt, nicht improvisiert.',
    includes: [
      'Einzelmontagen jeder Größenordnung',
      'Aufmaß und Lieferkoordination',
      'Schnittstelle zu Elektrik und Sanitär',
      'Werkzeug- und Materiallogistik',
      'Foto-Dokumentation auf Wunsch',
      'Termintreue Werkstattarbeit',
    ],
    images: ['IMG_0205.jpeg', 'IMG_0208.jpeg'],
  },
  {
    icon: Trees,
    title: 'Außenbereich komplett',
    text: 'Balkon, Garten, Terrasse und Fassade werden funktional, langlebig und optisch stimmig zusammengeführt.',
    longText:
      'Wenn mehrere Außenbereiche zusammengehören sollen, denken wir das Bild gesamtheitlich: Balkon, Terrasse, Zaun und Fassade müssen zueinander passen. Wir koordinieren Materialien, Linien und Höhen so, dass am Ende ein stimmiges Außenbild entsteht – inklusive Beleuchtung, Außensteckdosen und Anschluss an Garten und Wege.',
    includes: [
      'Materialwahl und Designabstimmung',
      'Terrassendielen aus Holz oder WPC',
      'Sichtschutz und Bepflanzungsrahmen',
      'Beleuchtung und Außensteckdosen',
      'Mülltonnen- und Fahrradunterstände',
      'Anschluss an Garten und Wege',
    ],
    images: ['IMG_0210.jpeg', 'IMG_0213.jpeg'],
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

const materials = [
  {
    label: '01',
    title: 'Aluminium & Stahl',
    text: 'Pulverbeschichtete Profile, geschweißte Konstruktionen und Verzinkungen für tragende Bauteile. Wartungsarm und langlebig auch unter Wetterlast.',
  },
  {
    label: '02',
    title: 'Massivholz & Schreinerei',
    text: 'Lärche, Eiche, Douglasie für den Außenbereich, Eiche und Buche für den Innenausbau. Sauberer Schreinerstandard, ehrliche Oberflächen.',
  },
  {
    label: '03',
    title: 'Glas, WPC & Verbund',
    text: 'Sicherheitsglas für Geländer und Überdachung, WPC für pflegeleichte Dielen, Verbundwerkstoffe für komplexe Sichtschutzlösungen.',
  },
];

const faqs = [
  {
    q: 'Wie läuft eine Anfrage ab?',
    a: 'Telefon oder E-Mail genügt. Wir melden uns in der Regel binnen eines Werktags zurück, vereinbaren einen Termin vor Ort und erstellen anschließend ein verbindliches Angebot.',
  },
  {
    q: 'Welche Region deckt MSK ab?',
    a: 'Standort ist Weidenbach in Mittelfranken. Wir arbeiten regelmäßig im Großraum Ansbach, Triesdorf, Gunzenhausen und Umgebung. Größere Projekte auch außerhalb auf Anfrage.',
  },
  {
    q: 'Übernehmt ihr Demontage und Entsorgung?',
    a: 'Ja. Wir bauen bestehende Anlagen sauber zurück und kümmern uns auf Wunsch um die fachgerechte Entsorgung der Altmaterialien.',
  },
  {
    q: 'Arbeitet MSK auch mit anderen Gewerken zusammen?',
    a: 'Selbstverständlich. Bei Komplettprojekten koordinieren wir Schnittstellen zu Elektrik, Sanitär, Maler und Statik – damit auf der Baustelle nichts wartet.',
  },
  {
    q: 'Wie schnell könnt ihr starten?',
    a: 'Das hängt von Größe und Material ab. Kleine Montagen oft binnen weniger Wochen, Komplettprojekte mit längerer Vorlaufzeit – ehrliche Termine statt leerer Versprechen.',
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [route, setRoute] = useState<Route>(() => getRouteFromHash());
  const [activeServiceIdx, setActiveServiceIdx] = useState<number | null>(null);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRouteFromHash());
      setMenuOpen(false);
      setActiveServiceIdx(null);
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

  const openService = (idx: number) => setActiveServiceIdx(idx);
  const closeService = () => setActiveServiceIdx(null);

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
            <ServicesPage onOpenService={openService} />
          ) : route === 'gallery' ? (
            <GalleryPage />
          ) : route === 'contact' ? (
            <ContactPage />
          ) : route === 'privacy' ? (
            <LegalPage type="privacy" />
          ) : route === 'imprint' ? (
            <LegalPage type="imprint" />
          ) : (
            <LandingPage onNavigate={navigate} onOpenService={openService} />
          )}
        </main>
        <Footer />
        <CookieBanner />
        <AnimatePresence>
          {activeServiceIdx !== null ? (
            <ServiceModal
              key={activeServiceIdx}
              service={services[activeServiceIdx]}
              onClose={closeService}
            />
          ) : null}
        </AnimatePresence>
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

function LandingPage({
  onNavigate,
  onOpenService,
}: {
  onNavigate: (r: Route) => void;
  onOpenService: (idx: number) => void;
}) {
  return (
    <>
      <Hero />
      <StatRow />
      <ServicesTeaser onSeeAll={() => onNavigate('services')} onOpenService={onOpenService} />
      <GalleryTeaser onSeeAll={() => onNavigate('gallery')} />
      <ReviewsSection />
      <ContactCTA onContact={() => onNavigate('contact')} />
    </>
  );
}

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-meta reveal-stack">
          <span className="eyebrow">MSK · Familienbetrieb seit 2019</span>
          <span className="hero-meta-locale">Weidenbach · Mittelfranken</span>
        </div>

        <div className="hero-stack">
          <div className="hero-copy reveal-stack">
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

          <HeroAnimation />
        </div>
      </div>
    </section>
  );
}

function HeroAnimation() {
  return (
    <m.div
      className="hero-art-wrap"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.25, ease: [0.2, 0.6, 0.2, 1] }}
      aria-hidden="true"
    >
      <svg className="hero-art" viewBox="0 0 480 540" role="img" aria-label="Animation: Balkon-Aufriss wird Schritt für Schritt montiert">
        <defs>
          <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeOpacity="0.05" strokeWidth="1" />
          </pattern>
        </defs>

        <rect className="art-frame" x="0" y="0" width="480" height="540" fill="url(#hero-grid)" />

        <g className="art-roof-group">
          <path className="art-roof" d="M70 150 L240 60 L410 150" />
          <line className="art-roof-base" x1="50" y1="150" x2="430" y2="150" />
        </g>

        <line className="art-post art-post-l" x1="120" y1="150" x2="120" y2="430" />
        <line className="art-post art-post-r" x1="360" y1="150" x2="360" y2="430" />

        <line className="art-rail art-rail-1" x1="120" y1="240" x2="360" y2="240" />
        <line className="art-rail art-rail-2" x1="120" y1="430" x2="360" y2="430" />
        <line className="art-platform" x1="100" y1="448" x2="380" y2="448" />

        <g className="art-bal-group">
          {[155, 190, 225, 260, 295, 325].map((x) => (
            <line key={x} x1={x} y1="240" x2={x} y2="430" />
          ))}
        </g>

        <circle className="art-dot" cx="240" cy="60" r="8" />

        <g className="art-dim">
          <line x1="80" y1="150" x2="80" y2="430" />
          <line x1="76" y1="150" x2="84" y2="150" />
          <line x1="76" y1="430" x2="84" y2="430" />
          <text x="80" y="294" textAnchor="middle">2,80</text>
        </g>

        <g className="art-dim-bottom">
          <line x1="120" y1="478" x2="360" y2="478" />
          <line x1="120" y1="474" x2="120" y2="482" />
          <line x1="360" y1="474" x2="360" y2="482" />
          <text x="240" y="498" textAnchor="middle">3,40</text>
        </g>

        <g className="art-label">
          <text x="50" y="525">BALKON · ELEVATION 1:50</text>
          <text x="430" y="525" textAnchor="end">MSK · 2026</text>
        </g>
      </svg>
    </m.div>
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

function ServicesTeaser({
  onSeeAll,
  onOpenService,
}: {
  onSeeAll: () => void;
  onOpenService: (idx: number) => void;
}) {
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
          ctaHref="#leistungen"
          ctaLabel="Alle Leistungen"
          onCta={onSeeAll}
          titleId="services-teaser-title"
        />

        <div className="service-list">
          {services.slice(0, 4).map((service, index) => {
            const Icon = service.icon;
            return (
              <button
                className="service-row"
                key={service.title}
                type="button"
                onClick={() => onOpenService(index)}
                aria-label={`${service.title} – Details öffnen`}
              >
                <span className="service-num">{String(index + 1).padStart(2, '0')}</span>
                <span className="service-icon" aria-hidden="true">
                  <Icon />
                </span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <ChevronRight className="row-arrow" aria-hidden="true" />
              </button>
            );
          })}
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

function ServicesPage({ onOpenService }: { onOpenService: (idx: number) => void }) {
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
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <button
                  className="service-row"
                  key={service.title}
                  type="button"
                  onClick={() => onOpenService(index)}
                  aria-label={`${service.title} – Details öffnen`}
                >
                  <span className="service-num">{String(index + 1).padStart(2, '0')}</span>
                  <span className="service-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <span className="service-meta" aria-hidden="true">
                    Details ansehen
                  </span>
                  <ChevronRight className="row-arrow" aria-hidden="true" />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section materials">
        <div className="container">
          <SectionHead
            num="·"
            label="Materialien"
            title={
              <>
                Saubere Wahl.<br /> <em>Belastbare Substanz</em>.
              </>
            }
            titleId="materials-title"
          />
          <div className="material-grid">
            {materials.map((mat) => (
              <article className="material-card" key={mat.title}>
                <span className="material-num">{mat.label}</span>
                <h3>{mat.title}</h3>
                <p>{mat.text}</p>
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
          <SectionHead
            num="·"
            label="Häufige Fragen"
            title={
              <>
                Klare Antworten,<br /> <em>bevor es losgeht</em>.
              </>
            }
            titleId="faq-title"
          />
          <dl className="faq-list">
            {faqs.map((item) => (
              <div className="faq-item" key={item.q}>
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
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
   Service modal
   ============================================================ */

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const Icon = service.icon;

  return (
    <m.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <m.div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.32, ease: [0.2, 0.6, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Schließen"
        >
          <X aria-hidden="true" />
        </button>

        <div className="modal-images">
          {service.images.map((img, i) => (
            <figure key={img}>
              <LazyImage
                src={`/Gallery/${img}`}
                alt={`${service.title} – Referenzbild ${i + 1}`}
                eager={i === 0}
              />
            </figure>
          ))}
        </div>

        <header className="modal-head">
          <span className="eyebrow no-rule">
            <Icon aria-hidden="true" /> Leistung
          </span>
          <h2 id="modal-title">{service.title}</h2>
        </header>

        <div className="modal-body">
          <p className="lead">{service.longText}</p>

          <h3>Was wir umsetzen</h3>
          <ul className="modal-list">
            {service.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3>Kurz und ehrlich</h3>
          <p className="muted">
            Sie schicken uns ein paar Fotos und Maße, wir melden uns mit einem Termin vor Ort und einem
            verbindlichen Angebot zurück. Bis zur besenreinen Übergabe bleibt das Team gleich.
          </p>
        </div>

        <footer className="modal-foot">
          <a className="button" href="#kontakt" onClick={onClose}>
            Anfrage starten
            <ArrowRight aria-hidden="true" />
          </a>
          <button className="button ghost" type="button" onClick={onClose}>
            Schließen
          </button>
        </footer>
      </m.div>
    </m.div>
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
