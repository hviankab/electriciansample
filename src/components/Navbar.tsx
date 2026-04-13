import * as React from "react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Menu, ChevronDown, ChevronRight, Phone, MapPin, Mail,
  Snowflake, Flame, Wind, Building, AlertCircle, Clock,
} from "lucide-react"
import { mainNavItems } from "@/config/navigation"
import { siteConfig } from "@/config/site"

/* ─── Top utility bar ─── */
function UtilityBar() {
  return (
    <div className="w-full flex" style={{ backgroundColor: "#0a1929" }}>
      <div className="flex-1 flex items-center px-6 h-9">
        <span className="text-white/90 text-xs font-medium">Welcome to {siteConfig.business.name}</span>
      </div>
      <div className="flex items-center px-6 h-9" style={{ background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)" }}>
        <span className="text-gray-900 text-xs font-semibold">Have any question? {siteConfig.contact.phoneFormatted}</span>
      </div>
    </div>
  )
}

/* ─── Glass dropdown wrapper ─── */
function GlassDropdown({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute top-full left-0 pt-3 z-[90]">
      <div
        className="rounded-xl overflow-hidden min-w-[220px] border border-gray-200 bg-white"
        style={{
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        }}
      >
        {children}
      </div>
    </div>
  )
}

/* ─── Services mega dropdown ─── */
function ServicesDropdown({ isActive, onHover, onLeave }: { isActive: boolean; onHover: () => void; onLeave: () => void }) {
  const [activeItem, setActiveItem] = React.useState<string | null>(null)

  const getIcon = (title: string) => {
    if (title.includes("Commercial")) return <Building className="h-4 w-4" />
    if (title.includes("Residential")) return <Snowflake className="h-4 w-4" />
    if (title.includes("Specialty")) return <Flame className="h-4 w-4" />
    if (title.includes("Emergency")) return <AlertCircle className="h-4 w-4" />
    return <Wind className="h-4 w-4" />
  }

  return (
    <div className="relative flex items-center" onMouseEnter={onHover} onMouseLeave={onLeave}>
      <button className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-white hover:text-brand-secondary transition-colors whitespace-nowrap border-0">
        Services
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isActive ? "rotate-180" : ""}`} />
      </button>
      {isActive && (
        <div className="absolute top-full left-0 pt-3 z-[90] flex">
          {/* Parent list */}
          <div className="min-w-[280px] bg-white rounded-xl shadow-lg border border-gray-200">
            {mainNavItems.map((item) => (
              <div
                key={item.href}
                className={`flex items-center justify-between px-5 py-3 text-sm cursor-pointer transition-colors ${
                  activeItem === item.href ? "bg-gray-100 text-gray-900" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onMouseEnter={() => setActiveItem(item.href)}
              >
                <a href={item.href} className="flex-1 flex items-center gap-2">
                  <span className="text-brand-secondary flex-shrink-0">{getIcon(item.title)}</span>
                  <span>{item.title}</span>
                </a>
                {item.categories[0]?.items.length > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
          {/* Children panel */}
          {activeItem && (() => {
            const active = mainNavItems.find(i => i.href === activeItem)
            if (!active) return null
            const items = active.categories.flatMap(c => c.items)
            const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''
            return (
              <div className="ml-1 min-w-[240px] bg-white rounded-xl shadow-lg border border-gray-200">
                {items.map((child, i) => {
                  const isActive = currentPath === child.href
                  return (
                    <a
                      key={child.href}
                      href={child.href}
                      className={`block px-5 py-3 text-sm transition-colors relative ${
                        isActive 
                          ? "bg-gray-100 text-gray-900 font-semibold" 
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                      style={isActive ? {
                        borderBottom: "3px solid transparent",
                        borderImage: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%) 1",
                        borderImageSlice: "0 0 1 0"
                      } : {}}
                    >
                      {child.title}
                    </a>
                  )
                })}
              </div>
            )
          })()}
        </div>
      )}
    </div>
  )
}

/* ─── About Us dropdown ─── */
function AboutUsDropdown({ isActive, onHover, onLeave }: { isActive: boolean; onHover: () => void; onLeave: () => void }) {
  const aboutItems = [
    { title: "Careers", href: "/careers" },
    { title: "Reviews / Testimonials", href: "/reviews" },
    { title: "Meet The Team", href: "/meet-the-team" },
  ]
  return (
    <div className="relative flex items-center" onMouseEnter={onHover} onMouseLeave={onLeave}>
      <a href="/about" className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-white hover:text-brand-secondary transition-colors whitespace-nowrap">
        About Us
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isActive ? "rotate-180" : ""}`} />
      </a>
      {isActive && (
        <GlassDropdown>
          {aboutItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className={`block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors ${i !== 0 ? "border-t border-gray-100" : ""}`}
            >
              {item.title}
            </a>
          ))}
        </GlassDropdown>
      )}
    </div>
  )
}

/* ─── Service Areas dropdown ─── */
function ServiceAreasDropdown({ isActive, onHover, onLeave }: { isActive: boolean; onHover: () => void; onLeave: () => void }) {
  const areas = [
    { title: "Miami", href: "/miami" },
    { title: "Fort Lauderdale", href: "/fort-lauderdale" },
    { title: "Boca Raton", href: "/boca-raton" },
    { title: "Hialeah", href: "/hialeah" },
  ]
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''
  return (
    <div className="relative flex items-center" onMouseEnter={onHover} onMouseLeave={onLeave}>
      <button className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-white hover:text-brand-secondary transition-colors whitespace-nowrap border-0">
        Service Areas
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isActive ? "rotate-180" : ""}`} />
      </button>
      {isActive && (
        <div className="absolute top-full left-0 pt-3 z-[90]">
          <div className="min-w-[220px] bg-white rounded-xl shadow-lg border border-gray-200">
            {areas.map((area) => {
              const isAreaActive = currentPath === area.href
              return (
                <a
                  key={area.href}
                  href={area.href}
                  className={`block px-5 py-3 text-sm transition-colors ${
                    isAreaActive 
                      ? "bg-gray-100 text-gray-900 font-semibold" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  style={isAreaActive ? {
                    borderBottom: "3px solid transparent",
                    borderImage: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%) 1",
                    borderImageSlice: "0 0 1 0"
                  } : {}}
                >
                  {area.title}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Main Navbar ─── */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [servicesOpen, setServicesOpen] = React.useState(false)
  const [aboutOpen, setAboutOpen] = React.useState(false)
  const [areasOpen, setAreasOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const aboutCloseTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const areasCloseTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
      document.body.classList.toggle('scrolled', isScrolled)
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleServicesHover = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setServicesOpen(true) }
  const handleServicesLeave = () => { closeTimer.current = setTimeout(() => setServicesOpen(false), 150) }
  const handleAboutHover = () => { if (aboutCloseTimer.current) clearTimeout(aboutCloseTimer.current); setAboutOpen(true) }
  const handleAboutLeave = () => { aboutCloseTimer.current = setTimeout(() => setAboutOpen(false), 150) }
  const handleAreasHover = () => { if (areasCloseTimer.current) clearTimeout(areasCloseTimer.current); setAreasOpen(true) }
  const handleAreasLeave = () => { areasCloseTimer.current = setTimeout(() => setAreasOpen(false), 150) }

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] w-full">
      <style>{`
        body { padding-top: 36px; }
        body.scrolled { padding-top: 0px; }
        * { font-family: 'Barlow', system-ui, -apple-system, sans-serif; }
        .utility-bar {
          transition: max-height 0.3s ease, opacity 0.3s ease;
          max-height: 36px;
          opacity: 1;
          overflow: hidden;
        }
        .utility-bar.hidden-bar {
          max-height: 0;
          opacity: 0;
        }
        .navbar-main {
          background: #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          transition: max-height 0.3s ease, opacity 0.3s ease;
          max-height: 500px;
          opacity: 1;
          overflow: hidden;
        }
        .navbar-main.hidden-main {
          max-height: 0;
          opacity: 0;
        }
        .navbar-bottom-wrapper {
          position: relative;
          height: 28px;
          transition: all 0.3s ease;
        }
        .navbar-bottom-wrapper.scrolled {
          height: 56px;
        }
        @media (max-width: 1279px) {
          .navbar-bottom-wrapper {
            height: 0px;
          }
          .navbar-bottom-wrapper.scrolled {
            height: 56px;
          }
          .navbar-bottom.floating {
            display: none;
          }
        }
        .navbar-bottom {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #2c3e50;
          transition: all 0.3s ease;
          z-index: 10;
        }
        .navbar-bottom.floating {
          max-width: 1280px;
          width: calc(100% - 48px);
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .navbar-bottom.scrolled {
          width: 100%;
          max-width: 100%;
          border-radius: 0;
          top: 0;
          transform: translate(-50%, 0);
        }
        .navbar-bottom.scrolled > div {
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
        }
        .nav-link {
          position: relative;
          padding-bottom: 8px;
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 3px;
          background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
          border-radius: 2px 2px 0 0;
        }
      `}</style>

      {/* Top utility bar */}
      <div className={`utility-bar${scrolled ? " hidden-bar" : ""}`}>
        <UtilityBar />
      </div>

      {/* Main nav - white background with logo and info */}
      <div className={`navbar-main w-full${scrolled ? " hidden-main" : ""}`}>
        <div className="container mx-auto px-6">
          <div className="flex h-32 items-center justify-between gap-8">

            {/* Logo */}
            <a href="/" className="flex items-center flex-shrink-0" aria-label={`${siteConfig.business.name} - Home`}>
              <img src={siteConfig.logo.src} alt={siteConfig.logo.alt} className="h-20 w-auto object-contain" height={80} decoding="async" loading="eager" />
            </a>

            {/* Info blocks */}
            <div className="hidden xl:flex items-center gap-8 ml-auto">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-sm border-2 border-dashed border-gray-300 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-gray-700" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">{siteConfig.location.address}</span>
                  <span className="text-sm text-gray-900 font-bold">{siteConfig.location.city}, {siteConfig.location.state}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-sm border-2 border-dashed border-gray-300 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-gray-700" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">Send Your Mail At</span>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-sm text-gray-900 font-bold hover:text-brand-secondary transition-colors">{siteConfig.contact.email}</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-sm border-2 border-dashed border-gray-300 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-gray-700" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 font-medium">Working Hours</span>
                  <span className="text-sm text-gray-900 font-bold">Mon-Sat 9:00am To 7:00pm</span>
                </div>
              </div>
            </div>

            {/* Mobile: phone + hamburger */}
            <div className="flex xl:hidden items-center gap-3 ml-auto">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all"
                style={{ background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)" }}
                aria-label="Call us"
              >
                <Phone className="h-4 w-4" />
              </a>
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open menu" className="text-gray-900 hover:bg-gray-100">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-[400px] p-0 flex flex-col overflow-hidden">
                  <SheetHeader className="sr-only"><SheetTitle>Menu</SheetTitle></SheetHeader>
                  <div className="flex-1 overflow-y-auto">
                    <MobileNav onClose={() => setMobileOpen(false)} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom nav bar wrapper - creates space for the floating nav */}
      <div className={`navbar-bottom-wrapper w-full${scrolled ? " scrolled" : ""}`}>
        <div className={`navbar-bottom${scrolled ? " scrolled" : " floating"}`}>
          <div className={scrolled ? "px-6 w-full" : "px-6"} style={scrolled ? { maxWidth: "1280px", margin: "0 auto" } : {}}>
            <div className="flex h-14 items-center justify-between">
              {/* Logo - only visible when scrolled */}
              {scrolled && (
                <a href="/" className="flex items-center flex-shrink-0 mr-6" aria-label={`${siteConfig.business.name} - Home`}>
                  <img src={siteConfig.logo.src} alt={siteConfig.logo.alt} className="h-10 w-auto object-contain" height={40} decoding="async" loading="eager" />
                </a>
              )}

              {/* Center nav links — desktop */}
              <nav className="hidden xl:flex items-center gap-1">
                <a href="/" className="nav-link active px-4 py-2 text-sm font-bold text-white hover:text-brand-secondary transition-colors whitespace-nowrap">Home</a>
                <AboutUsDropdown isActive={aboutOpen} onHover={handleAboutHover} onLeave={handleAboutLeave} />
                <ServicesDropdown isActive={servicesOpen} onHover={handleServicesHover} onLeave={handleServicesLeave} />
                <a href="/specials-coupons" className="nav-link px-4 py-2 text-sm font-bold text-white hover:text-brand-secondary transition-colors whitespace-nowrap">Specials</a>
                <a href="/financing" className="nav-link px-4 py-2 text-sm font-bold text-white hover:text-brand-secondary transition-colors whitespace-nowrap">Financing</a>
                <ServiceAreasDropdown isActive={areasOpen} onHover={handleAreasHover} onLeave={handleAreasLeave} />
                <a href="/contact" className="nav-link px-4 py-2 text-sm font-bold text-white hover:text-brand-secondary transition-colors whitespace-nowrap">Contact</a>
              </nav>

              {/* Right: Social + CTA - hidden when scrolled */}
              {!scrolled && (
                <div className="hidden xl:flex items-center gap-3 ml-auto">
                  <div className="flex items-center gap-2 mr-2">
                    <a href={siteConfig.social.facebook || "#"} aria-label="Facebook" className="w-9 h-9 rounded-sm flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                    <a href={siteConfig.social.instagram || "#"} aria-label="Instagram" className="w-9 h-9 rounded-sm flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    </a>
                    <a href={siteConfig.social.twitter || "#"} aria-label="X (Twitter)" className="w-9 h-9 rounded-sm flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25h6.988l4.26 5.632 4.746-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                    <a href={siteConfig.social.linkedin || "#"} aria-label="LinkedIn" className="w-9 h-9 rounded-sm flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                    </a>
                  </div>
                  <a
                    href="/contact"
                    className="book-now-btn flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-gray-900 transition-all"
                    style={{ background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)", borderRadius: "4px", border: "none" }}
                  >
                    Book Now
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

/* ─── Mobile navigation ─── */
function MobileNav({ onClose }: { onClose: () => void }) {
  const [servicesOpen, setServicesOpen] = React.useState(false)
  const [aboutOpen, setAboutOpen] = React.useState(false)
  const [areasOpen, setAreasOpen] = React.useState(false)

  const aboutItems = [
    { title: "Careers", href: "/careers" },
    { title: "Reviews / Testimonials", href: "/reviews" },
    { title: "Meet The Team", href: "/meet-the-team" },
  ]
  const serviceAreas = [
    { title: "Miami", href: "/miami" },
    { title: "Fort Lauderdale", href: "/fort-lauderdale" },
    { title: "Boca Raton", href: "/boca-raton" },
    { title: "Hialeah", href: "/hialeah" },
  ]

  const getIcon = (title: string) => {
    if (title.includes("Commercial")) return <Building className="h-4 w-4" />
    if (title.includes("Residential")) return <Snowflake className="h-4 w-4" />
    if (title.includes("Specialty")) return <Flame className="h-4 w-4" />
    if (title.includes("Emergency")) return <AlertCircle className="h-4 w-4" />
    return <Wind className="h-4 w-4" />
  }

  React.useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Close bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center min-h-[60px] mt-10">
        <a href="/" onClick={onClose}>
          <img src={siteConfig.logo.src} alt={siteConfig.logo.alt} className="h-10 w-auto object-contain" />
        </a>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close menu">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Phone + info */}
      <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center justify-center gap-2 bg-brand-secondary text-gray-900 px-6 py-3.5 hover:bg-brand-highlight transition-colors">
        <Phone className="h-5 w-5" />
        <span className="font-semibold text-lg">{siteConfig.contact.phoneFormatted}</span>
      </a>
      <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-col gap-2 text-sm text-gray-700">
          <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-brand-secondary" />{siteConfig.location.fullAddress}</span>
          <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 hover:text-brand-secondary transition-colors">
            <Mail className="w-4 h-4 text-brand-secondary" />{siteConfig.contact.email}
          </a>
        </div>
      </div>

      {/* Nav links */}
      <div className="px-6 py-3 space-y-1">
        <a href="/" className="block py-3 text-base font-medium text-black hover:text-brand-secondary border-b border-gray-200 transition-colors" onClick={onClose}>Home</a>

        {/* About Us */}
        <div className="border-b border-gray-200">
          <button onClick={() => setAboutOpen(!aboutOpen)} className="flex items-center justify-between w-full py-3 text-base font-medium text-black hover:text-brand-secondary transition-colors">
            About Us <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`} />
          </button>
          {aboutOpen && (
            <div className="pb-2 pl-4 space-y-1">
              {aboutItems.map(item => (
                <a key={item.href} href={item.href} className="block py-2 text-sm text-black hover:text-brand-secondary transition-colors" onClick={onClose}>{item.title}</a>
              ))}
            </div>
          )}
        </div>

        {/* Services */}
        <div className="border-b border-gray-200">
          <button onClick={() => setServicesOpen(!servicesOpen)} className="flex items-center justify-between w-full py-3 text-base font-medium text-black hover:text-brand-secondary transition-colors">
            Services <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
          </button>
          {servicesOpen && (
            <div className="pb-2 pl-4 space-y-2">
              {mainNavItems.map(item => (
                <div key={item.href} className="space-y-1">
                  <a href={item.href} className="block py-2 text-sm font-semibold text-black hover:text-brand-secondary transition-colors flex items-center gap-2" onClick={onClose}>
                    <span className="text-brand-secondary">{getIcon(item.title)}</span>{item.title}
                  </a>
                  {item.categories[0]?.items?.length > 0 && (
                    <div className="pl-3 space-y-1 border-l-2 border-gray-200">
                      {item.categories[0].items.map(sub => (
                        <a key={sub.href} href={sub.href} className="block py-1.5 text-sm text-black hover:text-brand-secondary transition-colors flex items-start gap-2" onClick={onClose}>
                          <span className="text-brand-secondary mt-1.5">•</span><span>{sub.title}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <a href="/specials-coupons" className="block py-3 text-base font-medium text-black hover:text-brand-secondary border-b border-gray-200 transition-colors" onClick={onClose}>Specials / Coupons</a>
        <a href="/financing" className="block py-3 text-base font-medium text-black hover:text-brand-secondary border-b border-gray-200 transition-colors" onClick={onClose}>Financing</a>

        {/* Service Areas */}
        <div className="border-b border-gray-200">
          <button onClick={() => setAreasOpen(!areasOpen)} className="flex items-center justify-between w-full py-3 text-base font-medium text-black hover:text-brand-secondary transition-colors">
            Service Areas <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${areasOpen ? "rotate-180" : ""}`} />
          </button>
          {areasOpen && (
            <div className="pb-2 pl-4 space-y-1">
              {serviceAreas.map(area => (
                <a key={area.href} href={area.href} className="block py-2 text-sm text-black hover:text-brand-secondary transition-colors" onClick={onClose}>{area.title}</a>
              ))}
            </div>
          )}
        </div>

        <a href="/contact" className="block py-3 text-base font-medium text-black hover:text-brand-secondary border-b border-gray-200 transition-colors" onClick={onClose}>Contact Us</a>
      </div>

      {/* CTA */}
      <div className="mt-auto px-6 py-4 border-t border-gray-200 bg-gray-50 space-y-3">
        <div className="flex gap-3">
          <a href="/specials-coupons" className="flex-1 flex items-center justify-center bg-white text-gray-900 px-4 py-2.5 rounded-full text-sm font-semibold border border-gray-300 hover:bg-gray-100 transition-all" onClick={onClose}>Specials / Coupons</a>
          <a href="/financing" className="flex-1 flex items-center justify-center bg-white text-gray-900 px-4 py-2.5 rounded-full text-sm font-semibold border border-gray-300 hover:bg-gray-100 transition-all" onClick={onClose}>Financing</a>
        </div>
        <a href="/contact" className="flex items-center justify-center bg-brand-secondary text-gray-900 px-6 py-3 rounded-full text-base font-semibold hover:bg-brand-highlight transition-all w-full shadow-sm" onClick={onClose}>
          Book Now
        </a>
      </div>
    </div>
  )
}
