import { useEffect, useMemo, useState } from 'react';
import { useI18n } from './i18n/useI18n';

const whatsappLink = 'https://wa.me/8562057105140';
const telegramLink = 'https://t.me/Arlott_Arlott';
const phoneLink = 'tel:+8562057105140';

const waLinkWithText = (text: string) => {
  const url = new URL(whatsappLink);
  url.searchParams.set('text', text);
  return url.toString();
};

const WhatsAppButton = ({
  href,
  label,
  variant = "primary",
  className = "",
}: {
  href: string;
  label: string;
  variant?: "primary" | "ghost";
  className?: string;
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition";
  const primary =
    // Brand-friendly WhatsApp button that still fits the site's cyan/teal theme.
    "bg-gradient-to-r from-accent to-emerald-400 text-surface-900 shadow-[0_18px_55px_-24px_rgba(34,211,238,0.75)] ring-1 ring-white/10 hover:brightness-[0.98] active:scale-[0.99]";
  const ghost =
    "border border-white/20 bg-white/5 text-white/85 hover:border-accent/70 hover:bg-white/10";

  return (
    <a
      href={href}
      className={[base, variant === "primary" ? primary : ghost, className].filter(Boolean).join(" ")}
      aria-label={label}
    >
      <img src="/whatsapp.svg" alt="" className="h-5 w-5 shrink-0" />
      <span>{label}</span>
    </a>
  );
};


const QuoteModal = ({
  open,
  onClose,
  initialPackage,
  t,
}: {
  open: boolean;
  onClose: () => void;
  initialPackage?: string;
  t: (key: string) => string;
}) => {
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [goal, setGoal] = useState('');
  const [packageName, setPackageName] = useState('');
  const [timeline, setTimeline] = useState('');

  useEffect(() => {
    if (!open) return;
    if (initialPackage && !packageName) setPackageName(initialPackage);
  }, [open, initialPackage, packageName]);

  if (!open) return null;

  const submit = () => {
    const lines = [
      t('quote.title'),
      `- ${t('quote.name')}: ${name || t('quote.notSpecified')}`,
      `- ${t('quote.business')}: ${business || t('quote.notSpecified')}`,
      `- ${t('quote.goal')}: ${goal || t('quote.notSpecified')}`,
      `- ${t('quote.package')}: ${packageName || t('quote.notSpecified')}`,
      `- ${t('quote.timeline')}: ${timeline || t('quote.notSpecified')}`,
    ];
    window.open(waLinkWithText(lines.join('\n')), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-4 backdrop-blur md:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={t('quote.title')}
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-3xl border border-white/10 bg-surface-900/80 p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="badge">{t('quote.badge')}</p>
            <h3 className="mt-3 text-xl font-semibold md:text-2xl">{t('quote.title')}</h3>
            <p className="mt-1 text-sm text-white/65">{t('quote.subtitle')}</p>
          </div>
          <button
            type="button"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 transition hover:border-accent/60 hover:bg-white/10"
            onClick={onClose}
          >
            {t('quote.close')}
          </button>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">{t('quote.name')}</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none ring-0 transition focus:border-accent/60"
              placeholder={t('quote.namePh')}
            />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">{t('quote.business')}</span>
            <input
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none ring-0 transition focus:border-accent/60"
              placeholder={t('quote.businessPh')}
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">{t('quote.goal')}</span>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none ring-0 transition focus:border-accent/60"
              placeholder={t('quote.goalPh')}
            />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">{t('quote.package')}</span>
            <input
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none ring-0 transition focus:border-accent/60"
              placeholder={t('quote.packagePh')}
            />
          </label>
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">{t('quote.timeline')}</span>
            <input
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none ring-0 transition focus:border-accent/60"
              placeholder={t('quote.timelinePh')}
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-white/50">{t('quote.note')}</p>
          <div className="flex gap-3">
            <a
              href={whatsappLink}
              className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-xs font-semibold text-white/80 transition hover:border-accent/60 hover:bg-white/10"
              target="_blank"
              rel="noreferrer"
            >
              {t('quote.direct')}
            </a>
            <button type="button" onClick={submit} className="rounded-full bg-accent px-6 py-3 text-xs font-semibold text-surface-900 shadow-glow transition hover:brightness-95 active:scale-[0.99]">
              {t('quote.send')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const App = () => {
  const { language, setLanguage, dictionary, t } = useI18n();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quotePackage, setQuotePackage] = useState<string | undefined>(undefined);

  const portfolioItems = useMemo(
    () => Array.from({ length: 6 }, (_, index) => `${dictionary.portfolio.item} ${index + 1}`),
    [dictionary.portfolio.item]
  );

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  const openQuote = (pkg?: string) => {
    setQuotePackage(pkg);
    setQuoteOpen(true);
  };

  return (
    <div className="min-h-screen text-slate-100">
      <QuoteModal
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        initialPackage={quotePackage}
        t={t}
      />
      <header className="sticky top-0 z-20 border-b border-white/10 bg-surface-900/70 backdrop-blur supports-[backdrop-filter]:bg-surface-900/60">
        <div className="container flex h-16 items-center justify-between gap-6 md:h-20">
          {/* Brand */}
          <a href="#hero" className="group flex items-center gap-4">
            <div className="relative">
              {/* Logo box (white, crisp, balanced) */}
             <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-black/10 md:h-16 md:w-16">
  <img
    src="/logo.png"
    alt="ArmSungMa Logo"
    className="h-full w-full object-cover"
  />
</div>
            </div>

            <div className="leading-tight">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/75 md:text-base">
                ArmSungMa
              </p>
              <p className="text-xs text-white/55 md:text-sm">Web Agency</p>
            </div>
          </a>

          {/* Nav (center balanced) */}
          <nav className="hidden flex-1 items-center justify-center gap-7 text-sm text-white/70 md:flex">
            <a className="link-underline" href="#services">
              {t('nav.services')}
            </a>
            <a className="link-underline" href="#packages">
              {t('nav.packages')}
            </a>
            <a className="link-underline" href="#why">
              {t('nav.why')}
            </a>
            <a className="link-underline" href="#process">
              {t('nav.process')}
            </a>
            <a className="link-underline" href="#portfolio">
              {t('nav.portfolio')}
            </a>
            <a className="link-underline" href="#faq">
              {t('nav.faq')}
            </a>
            <a className="link-underline" href="#contact">
              {t('nav.contact')}
            </a>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <WhatsAppButton href={whatsappLink} label={t('cta.whatsapp')} className="hidden md:inline-flex px-5 py-2 text-xs" />
            <button
              type="button"
              onClick={() => openQuote()}
              className="hidden rounded-full border border-accent/40 bg-accent/10 px-5 py-2 text-xs font-semibold text-accent transition hover:border-accent/70 hover:bg-accent/15 md:inline-flex"
            >
              {t('cta.quote')}
            </button>
<button
              type="button"
              onClick={() => setLanguage(language === 'lo' ? 'en' : 'lo')}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/85 transition hover:border-accent/60 hover:bg-white/10 hover:text-white"
              aria-label="Toggle language"
            >
              {language === 'lo' ? 'EN' : 'LO'}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="pt-16 md:pt-24" id="hero">
          <div className="container grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div className="space-y-6">
              <span className="badge">{t('hero.label')}</span>
              <h1 className="text-3xl font-semibold leading-tight tracking-tight md:text-5xl font-display">{t('hero.headline')}</h1>
              <p className="text-base text-white/70 md:text-lg">{t('hero.subtitle')}</p>
              <div className="flex flex-wrap gap-3">
                <WhatsAppButton href={whatsappLink} label={t('cta.whatsapp')} />
                <button
                  type="button"
                  onClick={() => openQuote()}
                  className="rounded-full border border-accent/40 bg-accent/10 px-6 py-3 text-sm font-semibold text-accent transition hover:border-accent/70 hover:bg-accent/15"
                >
                  {t('cta.quote')}
                </button>
<a
                  href={telegramLink}
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-accent/60"
                >
                  {t('cta.telegram')}
                </a>
                <a
                  href={phoneLink}
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-accent/60"
                >
                  {t('cta.phone')}
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-white/60">
                <span>{t('hero.trust')}</span>
                <span className="hidden h-1 w-1 rounded-full bg-white/30 md:inline-block"></span>
                <span>{t('hero.note')}</span>
              </div>

              <div className="grid gap-4 pt-4 sm:grid-cols-3">
                {dictionary.hero.cardItems.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/70">
                    <span className="text-white">•</span> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
  <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface-900/40 shadow-2xl">
    <div className="relative w-full">
  <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface-900/40 shadow-2xl">
    <img
      src="/hero-preview.jpg"
      alt="Website preview"
      className="w-full h-auto object-cover"
    />
  </div>

  {/* Glow */}
  <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-accent/10 blur-3xl"></div>
</div>
  </div>

  {/* Glow background */}
  <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-accent/10 blur-3xl"></div>
</div>
          </div>
        </section>

        <section className="pt-20" id="services">
          <div className="container space-y-10">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-white/40">{t('nav.services')}</p>
              <h2 className="text-2xl font-semibold md:text-3xl">{dictionary.services.title}</h2>
              <p className="text-white/60">{dictionary.services.subtitle}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {dictionary.services.items.map((item) => (
                <div key={item.title} className="card space-y-4">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-white/70">{item.desc}</p>
                  <button
                    type="button"
                    onClick={() => openQuote(item.title)}
                    className="inline-flex items-center justify-center rounded-full border border-accent/40 bg-accent/10 px-4 py-2 text-xs font-semibold text-accent transition hover:border-accent/70 hover:bg-accent/15"
                  >
                    {t('cta.quote')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Packages / Offer */}
        <section className="pt-20" id="packages">
          <div className="container space-y-10">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-white/40">{t('nav.packages')}</p>
              <h2 className="text-2xl font-semibold md:text-3xl">{dictionary.packages.title}</h2>
              <p className="text-white/60">{dictionary.packages.subtitle}</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {dictionary.packages.items.map((pkg) => (
                <div key={pkg.title} className="card flex flex-col gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold">{pkg.title}</p>
                      {pkg.highlight ? <span className="badge">{pkg.highlight}</span> : null}
                    </div>
                    <p className="text-sm text-white/65">{pkg.desc}</p>
                  </div>
                  <ul className="space-y-2 text-sm text-white/70">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-accent/70" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center justify-between gap-3">
                    <p className="text-xs text-white/50">{pkg.note}</p>
                    <button
                      type="button"
                      onClick={() => openQuote(pkg.title)}
                      className="rounded-full bg-accent px-5 py-2 text-xs font-semibold text-surface-900 shadow-glow transition hover:brightness-95"
                    >
                      {t('cta.quote')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pt-20" id="why">
          <div className="container space-y-10">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-white/40">{t('nav.why')}</p>
              <h2 className="text-2xl font-semibold md:text-3xl">{dictionary.why.title}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {dictionary.why.items.map((item) => (
                <div key={item.title} className="card space-y-3">
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="text-sm text-white/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pt-20" id="process">
          <div className="container space-y-10">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-white/40">{t('nav.process')}</p>
              <h2 className="text-2xl font-semibold md:text-3xl">{dictionary.process.title}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-5">
              {dictionary.process.steps.map((step, index) => (
                <div key={step.title} className="card space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-sm font-semibold text-accent">
                    {index + 1}
                  </div>
                  <h3 className="text-base font-semibold">{step.title}</h3>
                  <p className="text-sm text-white/70">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pt-20" id="portfolio">
          <div className="container space-y-10">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-white/40">{t('nav.portfolio')}</p>
              <h2 className="text-2xl font-semibold md:text-3xl">{dictionary.portfolio.title}</h2>
              <p className="text-white/60">{dictionary.portfolio.subtitle}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {portfolioItems.map((item) => (
                <div key={item} className="card flex flex-col justify-between gap-6">
                  <div>
                    <p className="text-lg font-semibold">{item}</p>
                    <p className="mt-2 text-sm text-white/60">{dictionary.portfolio.tag}</p>
                  </div>
                  <span className="badge">{dictionary.portfolio.tag}</span>
                </div>
              ))}
            </div>
            <a
              href={telegramLink}
              className="inline-flex items-center justify-center rounded-full border border-accent/50 px-6 py-3 text-sm font-semibold text-accent transition hover:bg-accent/10"
            >
              {t('cta.samples')}
            </a>
          </div>
        </section>


        <section className="pt-20" id="proof">
          <div className="container space-y-10">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-white/40">{t('proof.title')}</p>
              <h2 className="text-2xl font-semibold md:text-3xl">{dictionary.proof.title}</h2>
              <p className="text-white/60">{dictionary.proof.subtitle}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {dictionary.proof.items.map((it) => (
                <div key={it.name} className="card space-y-4">
                  <p className="text-sm text-white/75">“{it.text}”</p>
                  <div className="pt-2">
                    <p className="text-sm font-semibold">{it.name}</p>
                    <p className="text-xs text-white/50">{it.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="card space-y-4">
                <h3 className="text-lg font-semibold">{dictionary.guarantee.title}</h3>
                <ul className="space-y-2 text-sm text-white/75">
                  {dictionary.guarantee.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent/80" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card space-y-4">
                <h3 className="text-lg font-semibold">{dictionary.ctaband.title}</h3>
                <p className="text-sm text-white/70">{dictionary.ctaband.subtitle}</p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <WhatsAppButton href={whatsappLink} label={dictionary.ctaband.primary} />
                  <button
                    type="button"
                    onClick={() => setQuoteOpen(true)}
                    className="rounded-full border border-accent/40 bg-accent/10 px-6 py-3 text-sm font-semibold text-accent transition hover:border-accent/70 hover:bg-accent/15"
                  >
                    {dictionary.ctaband.secondary}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-20" id="faq">
          <div className="container space-y-10">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-white/40">{t('nav.faq')}</p>
              <h2 className="text-2xl font-semibold md:text-3xl">{dictionary.faq.title}</h2>
            </div>
            <div className="grid gap-4">
              {dictionary.faq.items.map((item, index) => (
                <div key={item.q} className="card">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                    aria-expanded={openFaq === index}
                  >
                    <span className="text-base font-semibold">{item.q}</span>
                    <span className="text-accent">{openFaq === index ? '−' : '+'}</span>
                  </button>
                  {openFaq === index && <p className="mt-4 text-sm text-white/70">{item.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20 pt-20" id="contact">
          <div className="container">
            <div className="card flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <div className="space-y-3">
                <h2 className="text-2xl font-semibold md:text-3xl">{dictionary.final.title}</h2>
                <p className="text-white/60">{dictionary.final.subtitle}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">{dictionary.final.note}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <WhatsAppButton href={whatsappLink} label={t('cta.whatsapp')} />
                <button
                  type="button"
                  onClick={() => setQuoteOpen(true)}
                  className="rounded-full border border-accent/40 bg-accent/10 px-6 py-3 text-sm font-semibold text-accent transition hover:border-accent/70 hover:bg-accent/15"
                >
                  {t('cta.quote')}
                </button>
<a
                  href={telegramLink}
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-accent/60"
                >
                  {t('cta.telegram')}
                </a>
                <a
                  href={phoneLink}
                  className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-accent/60"
                >
                  {t('cta.phone')}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="container flex flex-col items-start justify-between gap-4 text-sm text-white/50 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} ArmSungMa. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <a className="link-underline" href={whatsappLink}>
              WhatsApp
            </a>
            <a className="link-underline" href={telegramLink}>
              Telegram
            </a>
            <a className="link-underline" href={phoneLink}>
              {t('cta.phone')}
            </a>
          </div>
        </div></footer>

{/* Floating WhatsApp (mobile conversion) */}
<a
        id="wa-float"
        href={whatsappLink}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-accent to-emerald-400 text-surface-900 shadow-2xl ring-1 ring-white/10 transition hover:scale-105 md:hidden"
        aria-label={t('cta.whatsapp')}
      >
        <img src="/whatsapp.svg" alt="" className="h-7 w-7" />
      </a>

    </div>
  );
};

export default App;
