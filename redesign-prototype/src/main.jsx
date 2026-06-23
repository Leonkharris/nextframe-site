import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  BriefcaseBusiness,
  Check,
  CirclePlay,
  Clapperboard,
  Layers3,
  Menu,
  MousePointer2,
  Pause,
  Play,
  Sparkles,
  Workflow,
  X
} from "lucide-react";
import "./styles.css";

const MEDIA = {
  HERO: "D3oRbzmBwqE",
  WORK_1: "LRQfWCd5_o8",
  WORK_2: "HnUG6sFpReI",
  WORK_3: "q_58rOdi5hk",
  WORK_4: "-0u0gIXAw_k",
  PROCESS_BG: "LRQfWCd5_o8",
  LEGACY_BG: "HnUG6sFpReI",
  LEGACY_1: "RL_XRbP_TLU",
  LEGACY_2: "ITcVSxSKvVA",
  CTA_BG: "q_58rOdi5hk",
  MUSIC_PLAYLIST: "PLpIvQM74C6trizIZ0DSxYImb9JC9CNPOk",
  LOGO: "https://ce6vsiuf1fnatbbk.public.blob.vercel-storage.com/next%20fram%20logo.png"
};

const works = [
  { id: MEDIA.WORK_1, code: "JADE BAR", title: "Cinematic Mixology", type: "Venue Promo" },
  { id: MEDIA.WORK_2, code: "MILLION DREAM", title: "The Million Dream", type: "Real Estate Launch" },
  { id: MEDIA.WORK_3, code: "LUX LOOP", title: "Infinite Luxury", type: "Product Motion" },
  { id: MEDIA.WORK_4, code: "DEMO REEL", title: "Corporate Narrative", type: "Brand Story" },
  { id: MEDIA.LEGACY_1, code: "LEGACY", title: "Memory Film I", type: "Legacy Lab" },
  { id: MEDIA.LEGACY_2, code: "LEGACY", title: "Memory Film II", type: "Legacy Lab" }
];

const offers = [
  {
    id: "quick-content-video",
    tier: "01",
    title: "Quick Content Video",
    price: "PHP 500-1,500",
    summary: "For the client who needs a clean post now. Send the details and get a usable video asset for ads, reels, or LinkedIn.",
    cta: "Order a quick video",
    features: ["No-call brief", "Fast turnaround", "AI-assisted visuals", "Ready to post"]
  },
  {
    id: "hero-sales-video",
    tier: "02",
    title: "Hero Sales Video",
    price: "From PHP 15K",
    summary: "For real estate, venues, launches, and businesses that need one serious video to make the offer feel worth buying.",
    cta: "Plan my hero video",
    features: ["Guided story", "Cinematic AI visuals", "Custom music direction", "Sales-ready finish"],
    featured: true
  },
  {
    id: "monthly-growth-engine",
    tier: "03",
    title: "AI Growth Engine",
    price: "PHP 30K-60K/mo",
    summary: "For businesses that need content every month and a simple path from video views to inquiries, DMs, and follow-up.",
    cta: "Build my engine",
    features: ["Monthly video system", "Lead flow repair", "Website design", "Performance reporting"]
  }
];

const addOns = [
  {
    id: "custom-music-service",
    title: "Custom Music",
    price: "PHP 5K",
    summary: "Original or custom-directed music built around the pace, mood, and emotional target of the video.",
    features: ["Music direction", "AI-assisted composition", "Brand-fit mood", "Final mix for video"],
    cta: "Add custom music"
  },
  {
    id: "website-redesign-service",
    title: "Website Redesign",
    price: "PHP 5K+",
    summary: "A sharper landing page or website refresh so the traffic from your videos has somewhere credible to go.",
    features: ["Landing page direction", "Offer copy cleanup", "Premium visual refresh", "Lead path improvement"],
    cta: "Plan website redesign"
  }
];

const agentPipeline = [
  {
    step: "01",
    agent: "Clarify The Offer",
    role: "Find what the buyer cares about, what proof matters, and what action the video should create.",
    output: "Buyer angle, pain points, proof, CTA"
  },
  {
    step: "02",
    agent: "Shape The Story",
    role: "Turn the offer into a hook, story, visual direction, and message people can understand fast.",
    output: "Concept board, hook, scene plan"
  },
  {
    step: "03",
    agent: "Build The Videos",
    role: "Create the hero video and the supporting cuts that make the campaign useful across channels.",
    output: "Hero video, reels, ad cuts"
  },
  {
    step: "04",
    agent: "Route The Inquiry",
    role: "Give interested buyers a clear next step so attention can become a DM, form, or booking.",
    output: "DM prompt, form, booking path"
  },
  {
    step: "05",
    agent: "Improve The Next Move",
    role: "Use performance signals to decide what to fix, repost, follow up, or build next.",
    output: "Weekly notes, next actions, fixes"
  }
];

const pipelineExamples = [
  {
    label: "Real estate launch",
    input: "A project needs to look premium before buyers ask for price or location.",
    output: "45-second hero video, 3 short reels, inquiry CTA, agent DM prompts, follow-up notes."
  },
  {
    label: "Venue or restaurant promo",
    input: "A venue needs more bookings, but the current content feels ordinary.",
    output: "Cinematic venue reel, food or drink motion loops, story cuts, booking CTA, weekly posting plan."
  },
  {
    label: "Service business lead-gen",
    input: "A business has a good offer, but people do not understand the value fast enough.",
    output: "Explainer ad, credibility clips, LinkedIn cutdowns, lead form copy, simple follow-up sequence."
  }
];

const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
const ytFallback = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const ytEmbed = (id, muted = false) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&${muted ? "mute=1&loop=1&playlist=" + id + "&" : ""}controls=0&playsinline=1&rel=0&modestbranding=1`;

function BrandMark() {
  return (
    <a className="brand" href="#top" aria-label="NextFrame home">
      <img src={MEDIA.LOGO} alt="NextFrame — AI marketing agency, Makati Philippines" />
      <span>
        <strong>NextFrame</strong>
        <em>AI Video Growth</em>
      </span>
    </a>
  );
}

function VideoChrome({ item, className = "", size = "wide", onPlay }) {
  return (
    <button
      className={`video-chrome ${size} ${className}`}
      type="button"
      onClick={() => onPlay(item)}
      aria-label={`Play ${item.title}`}
    >
      <img
        src={ytThumb(item.id)}
        alt=""
        onError={(event) => {
          event.currentTarget.src = ytFallback(item.id);
        }}
      />
      <span className="video-vignette" />
      <span className="video-topline">
        <span>{item.code}</span>
        <CirclePlay size={18} />
      </span>
      <span className="video-caption">
        <span>{item.type}</span>
        <strong>{item.title}</strong>
      </span>
    </button>
  );
}

function FloatingWindows({ onPlay }) {
  const floating = useMemo(
    () => [
      { item: works[1], className: "float-one", size: "wide" },
      { item: works[2], className: "float-two", size: "tall" },
      { item: works[3], className: "float-three", size: "wide" },
      { item: works[4], className: "float-four", size: "small" }
    ],
    []
  );

  return (
    <div className="floating-stage" aria-hidden="false">
      <div className="hero-orbit orbit-a" />
      <div className="hero-orbit orbit-b" />
      <div className="main-screen">
        <iframe
          src={ytEmbed(MEDIA.WORK_1, true)}
          title="NextFrame cinematic mixology reel"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        <div className="screen-shade" />
        <div className="screen-meta">
          <span>Venue Promo</span>
          <button type="button" onClick={() => onPlay(works[0])}>
            <Play size={16} />
            Watch
          </button>
        </div>
      </div>
      {floating.map((entry) => (
        <VideoChrome
          key={entry.className}
          item={entry.item}
          className={entry.className}
          size={entry.size}
          onPlay={onPlay}
        />
      ))}
    </div>
  );
}

function Hero({ onPlay }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <section className="hero" id="top">
      <div className="grain" />
      <nav className="nav">
        <BrandMark />
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#menu">Packages</a>
          <a href="/logo-design/">Logo Design</a>
          <a href="#system">Growth Engine</a>
          <a href="#pipeline">Pipeline</a>
          <a href="#brief">Brief</a>
          <a href="/intake/">Free Audit</a>
        </div>
        <a className="nav-cta" href="#menu">
          Find package <ArrowRight size={16} />
        </a>
        <button
          className="mobile-menu"
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      <div className={`mobile-panel ${mobileOpen ? "open" : ""}`} id="mobile-navigation">
        <a href="#work" onClick={closeMobileMenu}>Work</a>
        <a href="#menu" onClick={closeMobileMenu}>Packages</a>
        <a href="/logo-design/" onClick={closeMobileMenu}>Logo Design</a>
        <a href="#system" onClick={closeMobileMenu}>Growth Engine</a>
        <a href="#pipeline" onClick={closeMobileMenu}>Pipeline</a>
        <a href="#brief" onClick={closeMobileMenu}>Brief</a>
        <a href="/intake/" onClick={closeMobileMenu}>Free Audit</a>
      </div>

      <div className="hero-grid">
        <div className="hero-copy">
          <h1><span className="hero-accent">Premium AI Videos</span> That Turn Views Into Buyer DMs</h1>
          <p>
            For real estate projects, venues, service businesses, and brands that need premium content plus a clear path
            from view to inquiry.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#menu">
              Find My Video Package <ArrowRight size={18} />
            </a>
            <button className="button ghost" type="button" onClick={() => onPlay({ id: MEDIA.HERO, title: "NextFrame Reel" })}>
              <CirclePlay size={18} /> Watch The Work
            </button>
          </div>
          <div className="proof-strip">
            <a href="#quick-content-video" aria-label="Jump to Quick Content Video package">Quick Content Video</a>
            <a href="#hero-sales-video" aria-label="Jump to Hero Sales Video package">Hero Sales Video</a>
            <a href="#monthly-growth-engine" aria-label="Jump to Monthly Growth Engine package">Monthly Growth Engine</a>
            <a href="/intake/" aria-label="Request a free AI marketing audit">Free AI Audit</a>
          </div>
          <div className="service-strip" aria-label="Highlighted services">
            <a href="#custom-music-service" aria-label="Jump to Custom Music service">Custom Music - PHP 5K</a>
            <a href="#website-redesign-service" aria-label="Jump to Website Redesign service">Website Redesign - PHP 5K+</a>
          </div>
          <div className="logo-design-strip" aria-label="Logo design selector">
            <a href="/logo-design/" aria-label="Open the Manuel Legend logo design selector">
              Logo Design - Manuel Legend Selector <ArrowRight size={16} />
            </a>
          </div>
        </div>
        <FloatingWindows onPlay={onPlay} />
      </div>
    </section>
  );
}

function WorkRail({ onPlay }) {
  return (
    <section className="work-section" id="work">
      <div className="section-head">
        <h2>Let the work do the convincing.</h2>
        <p>
          Promotional films, product motion, venue spots, campaign reels, and AI-assisted edits from the actual
          NextFrame library. If your business needs to feel premium online, this is the kind of first impression we build.
        </p>
      </div>
      <div className="reel-track">
        {[...works, ...works].map((item, index) => (
          <VideoChrome
            key={`${item.id}-${index}`}
            item={item}
            size={index % 3 === 1 ? "tall" : "wide"}
            onPlay={onPlay}
          />
        ))}
      </div>
    </section>
  );
}

function OfferMenu() {
  return (
    <section className="menu-section" id="menu">
      <div className="menu-copy">
        <h2>Choose the level of help you need.</h2>
        <p>
          Testing a post, launching a property, selling a service, or building a monthly pipeline all need different
          levels of help. Pick the offer that fits the job.
        </p>
      </div>
      <div className="offer-grid">
        {offers.map((offer) => (
          <article id={offer.id} className={`offer-card ${offer.featured ? "featured" : ""}`} key={offer.title}>
            <div className="offer-top">
              <span>{offer.tier}</span>
              {offer.featured && <strong>Best fit for most businesses</strong>}
            </div>
            <h3>{offer.title}</h3>
            <p>{offer.summary}</p>
            <div className="price">{offer.price}</div>
            <ul>
              {offer.features.map((feature) => (
                <li key={feature}>
                  <Check size={16} /> {feature}
                </li>
              ))}
            </ul>
            <a href="#brief">
              {offer.cta} <ArrowRight size={16} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function AddOnServices() {
  return (
    <section className="addons-section" id="services">
      <div className="addons-head">
        <h2>Add the pieces your launch needs.</h2>
        <p>
          Keep the main menu simple, then add custom music or a redesigned landing page when the campaign needs a more
          complete buyer path.
        </p>
      </div>
      <div className="addon-grid">
        {addOns.map((service) => (
          <article className="addon-card" id={service.id} key={service.title}>
            <div>
              <span>Service add-on</span>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
            </div>
            <div className="addon-price">{service.price}</div>
            <ul>
              {service.features.map((feature) => (
                <li key={feature}>
                  <Check size={16} /> {feature}
                </li>
              ))}
            </ul>
            <a href="#brief">
              {service.cta} <ArrowRight size={16} />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function SystemSection() {
  return (
    <section className="system-section" id="system">
      <div className="system-panel">
        <div className="system-copy">
          <span className="section-kicker">Monthly growth engine</span>
          <h2>Your videos should keep bringing leads after they go live.</h2>
          <p>
            Posting once and hoping is expensive. The Growth Engine turns each promo into a route: video grabs
            attention, DM or form captures demand, follow-up keeps prospects warm, and reports show what is pulling
            inquiries.
          </p>
          <div className="system-actions">
            <span><Clapperboard size={16} /> Premium content</span>
            <span><MousePointer2 size={16} /> Lead capture</span>
            <span><Workflow size={16} /> Follow-up loop</span>
            <span><Layers3 size={16} /> Website design</span>
          </div>
          <a className="system-link" href="#brief">
            Build my monthly engine <ArrowRight size={16} />
          </a>
        </div>
        <div className="ops-window">
          <div className="ops-header">
            <div className="ops-dots"><span /><span /><span /></div>
            <strong>NEXTFRAME / MONTHLY ENGINE</strong>
          </div>
          <div className="ops-dashboard">
            <div className="ops-topbar">
              <div>
                <span>Campaign cockpit</span>
                <strong>Offer to inquiry flow</strong>
              </div>
              <em><span /> Active pipeline</em>
            </div>
            <div className="kpi-grid">
              <div>
                <span>Build</span>
                <strong>Hero + cutdowns</strong>
                <small>One campaign, multiple assets.</small>
              </div>
              <div>
                <span>Capture</span>
                <strong>DM and form paths</strong>
                <small>Give interest somewhere to go.</small>
              </div>
              <div>
                <span>Improve</span>
                <strong>Weekly signal review</strong>
                <small>See what is pulling inquiries.</small>
              </div>
            </div>
            <div className="pipeline-board">
              <div className="pipeline-card">
                <small>01 / OFFER</small>
                <strong>Clarify what buyers should want.</strong>
                <p>Property, venue, service, product, or launch.</p>
              </div>
              <div className="pipeline-card">
                <small>02 / CONTENT</small>
                <strong>Turn it into premium video assets.</strong>
                <p>Hero promo, reels, story cuts, thumbnails, captions.</p>
              </div>
              <div className="pipeline-card">
                <small>03 / LEADS</small>
                <strong>Route interest into a clear next step.</strong>
                <p>DM prompt, lead form, booking link, or sales handoff.</p>
              </div>
              <div className="pipeline-card">
                <small>04 / FOLLOW-UP</small>
                <strong>Keep warm prospects from going cold.</strong>
                <p>Reply prompts, reminders, reporting, next content moves.</p>
              </div>
            </div>
            <div className="engine-footer">
              <span><Sparkles size={16} /> Video creates attention</span>
              <span><BriefcaseBusiness size={16} /> Funnel captures demand</span>
              <span><Layers3 size={16} /> System compounds monthly</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InternalPipeline() {
  return (
    <section className="internal-section" id="pipeline">
      <div className="internal-head">
        <span className="section-kicker">Production system</span>
        <h2>How your brief becomes videos, leads, and <span className="nowrap">follow-up</span>.</h2>
        <p>
          Every campaign moves through a simple production system: clarify the offer, shape the creative, build the
          assets, connect the lead path, and improve from performance signals.
        </p>
      </div>

      <div className="agent-console">
        <div className="agent-rail">
          {agentPipeline.map((item) => (
            <article className="agent-card" key={item.agent}>
              <span>{item.step}</span>
              <h3>{item.agent}</h3>
              <p>{item.role}</p>
              <strong>{item.output}</strong>
            </article>
          ))}
        </div>

        <div className="example-panel">
          <div className="example-top">
            <span>Example runs</span>
            <strong>What the system produces</strong>
          </div>
          <div className="example-list">
            {pipelineExamples.map((example) => (
              <article className="example-card" key={example.label}>
                <div>
                  <span>{example.label}</span>
                  <p>{example.input}</p>
                </div>
                <strong>{example.output}</strong>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const MESSENGER_URL = "https://m.me/61563680191093";

function BriefSection() {
  const [status, setStatus] = useState("idle");
  const [briefText, setBriefText] = useState("");
  const [copied, setCopied] = useState(false);

  async function submitBrief(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const contact = String(data.get("contact") || "").trim();
    const business = String(data.get("business") || "").trim();
    const level = String(data.get("level") || "").trim();
    const need = String(data.get("need") || "").trim();
    if (!name || !contact || !need) {
      setStatus("error");
      return;
    }

    const summary = [
      level ? `Package: ${level}` : "",
      business ? `Business: ${business}` : "",
      `Goal: ${need}`
    ]
      .filter(Boolean)
      .join(" | ");
    setBriefText(`Hi Next-Frame — I'm ${name} (${contact}). ${summary}`);
    setStatus("sending");

    try {
      const cfg = await fetch("/intake/config.json", { cache: "no-store" })
        .then((res) => (res.ok ? res.json() : {}))
        .catch(() => ({}));
      const apiBase = (cfg && cfg.apiBase) || "";
      if (!apiBase) throw new Error("no-api");
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(`${apiBase.replace(/\/$/, "")}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, source: "WebsiteBrief", offer: level || "Website brief", need: summary }),
        signal: controller.signal
      });
      clearTimeout(timer);
      if (!res.ok) throw new Error("bad-status");
      setStatus("ok");
    } catch {
      setStatus("fallback");
    }
  }

  function copyBrief() {
    navigator.clipboard
      .writeText(briefText)
      .then(() => setCopied(true))
      .catch(() => setCopied(false));
  }

  return (
    <section className="brief-section" id="brief">
      <div className="brief-card">
        <div>
          <h2>Tell us what needs to sell.</h2>
          <p>
            Share the offer, target buyer, deadline, and level you want. We will recommend the simplest build that gets
            the job done.
          </p>
          <p className="brief-alt">
            Not sure yet? <a href="/intake/">Start with the free AI marketing audit</a> — useful on its own, no
            obligation.
          </p>
        </div>
        {status === "ok" ? (
          <div className="brief-panel ok">
            <strong>Got it — your brief is in.</strong>
            <p>We reply within 24 hours. If it is urgent, message the page directly:</p>
            <a href={MESSENGER_URL} rel="noopener">Open Messenger</a>
          </div>
        ) : status === "fallback" ? (
          <div className="brief-panel fallback">
            <strong>Our intake desk is briefly offline — send it through Messenger instead.</strong>
            <p>Your brief is ready to paste:</p>
            <pre>{briefText}</pre>
            <div className="brief-panel-actions">
              <button type="button" onClick={copyBrief}>{copied ? "Copied!" : "Copy brief"}</button>
              <a href={MESSENGER_URL} rel="noopener">Open Messenger</a>
            </div>
          </div>
        ) : (
          <form onSubmit={submitBrief} noValidate>
            <input name="name" placeholder="Name *" autoComplete="name" required />
            <input name="contact" placeholder="Email, phone, or Facebook link *" autoComplete="email" required />
            <input name="business" placeholder="Business / project" />
            <select name="level" defaultValue="">
              <option value="" disabled>What level do you need?</option>
              <option>Quick Content Video</option>
              <option>Hero Sales Video</option>
              <option>Monthly Growth Engine</option>
              <option>Custom Music - PHP 5K</option>
              <option>Website Redesign - PHP 5K+</option>
            </select>
            <textarea name="need" placeholder="What do people need to do after watching? *" required />
            {status === "error" && (
              <p className="brief-error">Please fill in your name, a way to reach you, and what the video should do.</p>
            )}
            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send my brief"} <ArrowRight size={16} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function VideoModal({ activeVideo, onClose }) {
  if (!activeVideo) return null;
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={activeVideo.title}>
      <button className="modal-backdrop" type="button" onClick={onClose} aria-label="Close video" />
      <div className="modal-window">
        <div className="modal-header">
          <span>{activeVideo.title}</span>
          <button type="button" onClick={onClose} aria-label="Close video">
            <X size={18} />
          </button>
        </div>
        <iframe
          src={ytEmbed(activeVideo.id)}
          title={activeVideo.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

function SoundtrackToggle() {
  const [on, setOn] = useState(false);
  return (
    <>
      {on && (
        <iframe
          className="soundtrack"
          src={`https://www.youtube-nocookie.com/embed/videoseries?list=${MEDIA.MUSIC_PLAYLIST}&autoplay=1&controls=0&playsinline=1&rel=0&modestbranding=1`}
          title="NextFrame soundtrack"
          allow="autoplay; encrypted-media"
        />
      )}
      <button className="soundtrack-toggle" type="button" onClick={() => setOn((value) => !value)}>
        {on ? <Pause size={16} /> : <Play size={16} />}
        {on ? "Sound on" : "Soundtrack"}
      </button>
    </>
  );
}

function App() {
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) return;
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: "start" });
      });
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return (
    <>
      <Hero onPlay={setActiveVideo} />
      <WorkRail onPlay={setActiveVideo} />
      <OfferMenu />
      <AddOnServices />
      <SystemSection />
      <InternalPipeline />
      <BriefSection />
      <footer>
        <BrandMark />
        <span>Premium AI video growth for businesses that need trust, leads, and momentum.</span>
      </footer>
      <VideoModal activeVideo={activeVideo} onClose={() => setActiveVideo(null)} />
      <SoundtrackToggle />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
