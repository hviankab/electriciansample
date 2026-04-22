import * as React from "react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Menu, ChevronDown, Phone,
  Snowflake, Flame, Wind, Building, AlertCircle,
} from "lucide-react"
import { mainNavItems } from "@/config/navigation"
import { siteConfig } from "@/config/site"

/* ─── Services Category Dropdown ─── */
function ServiceCategoryDropdown({ 
  item, 
  isActive, 
  onHover, 
  onLeave 
}: { 
  item: typeof mainNavItems[0]; 
  isActive: boolean; 
  onHover: () => void; 
  onLeave: () => void;
}) {
  const getIcon = (title: string) => {
    if (title.includes("Commercial")) return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="18" height="18" x="3" y="3" rx="2"/>
        <path d="M3 9h18"/>
        <path d="M9 21V9"/>
      </svg>
    )
    if (title.includes("Residential")) return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    )
    if (title.includes("Specialty")) return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v4"/>
        <path d="M12 18v4"/>
        <path d="m4.93 4.93 2.83 2.83"/>
        <path d="m16.24 16.24 2.83 2.83"/>
        <path d="M2 12h4"/>
        <path d="M18 12h4"/>
        <path d="m4.93 19.07 2.83-2.83"/>
        <path d="m16.24 7.76 2.83-2.83"/>
      </svg>
    )
    if (title.includes("Emergency")) return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    )
    return <Wind className="h-5 w-5" />
  }

  const items = item.categories.flatMap(c => c.items)
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''

  return (
    <div className="relative" onMouseEnter={onHover} onMouseLeave={onLeave}>
      <a
        href={item.href}
        className="flex items-center gap-3 px-6 py-4 text-white hover:bg-white/10 transition-colors group uppercase text-sm font-bold"
      >
        <span className="text-white">{getIcon(item.title)}</span>
        <span>{item.title}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isActive ? "rotate-180" : ""}`} />
      </a>
      
      {isActive && (
        <div className="absolute top-full left-0 pt-2 z-[90]">
          <div className="min-w-[280px] bg-white rounded-lg shadow-xl border border-gray-200">
            {items.map((child) => {
              const isChildActive = currentPath === child.href
              return (
                <a
                  key={child.href}
                  href={child.href}
                  className={`block px-5 py-3 text-sm transition-colors ${
                    isChildActive 
                      ? "bg-blue-50 text-gray-900 font-semibold border-l-4 border-blue-500" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {child.title}
                </a>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Simple Dropdown ─── */
function SimpleDropdown({ 
  title, 
  items, 
  isActive, 
  onHover, 
  onLeave 
}: { 
  title: string;
  items: Array<{ title: string; href: string }>;
  isActive: boolean; 
  onHover: () => void; 
  onLeave: () => void;
}) {
  return (
    <div className="relative" onMouseEnter={onHover} onMouseLeave={onLeave}>
      <button className="flex items-center gap-1 text-base font-semibold text-gray-700 hover:text-gray-900 transition-colors border-0 bg-transparent">
        {title}
        <ChevronDown className={`h-4 w-4 transition-transform ${isActive ? "rotate-180" : ""}`} />
      </button>
      {isActive && (
        <div className="absolute top-full left-0 pt-2 z-[90]">
          <div className="min-w-[200px] bg-white rounded-lg shadow-xl border border-gray-200">
            {items.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className={`block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors ${i !== 0 ? "border-t border-gray-100" : ""}`}
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Main Navbar ─── */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)

  const dropdownTimers = React.useRef<{ [key: string]: ReturnType<typeof setTimeout> }>({})

  const handleDropdownHover = (key: string) => {
    if (dropdownTimers.current[key]) clearTimeout(dropdownTimers.current[key])
    setActiveDropdown(key)
  }

  const handleDropdownLeave = (key: string) => {
    dropdownTimers.current[key] = setTimeout(() => setActiveDropdown(null), 300)
  }

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

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] w-full">
      <style>{`
        * { font-family: 'Barlow', system-ui, -apple-system, sans-serif; }
        body { padding-top: 180px; }
      `}</style>

      {/* Level 1: Top Info Bar */}
      <div className="w-full bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center h-12">
            <div className="flex items-center gap-8">
              <a href="/" className="text-base font-semibold text-gray-700 hover:text-gray-900 transition-colors">Home</a>
              <SimpleDropdown 
                title="About Us" 
                items={aboutItems}
                isActive={activeDropdown === 'about'}
                onHover={() => handleDropdownHover('about')}
                onLeave={() => handleDropdownLeave('about')}
              />
              <a href="/contact" className="text-base font-semibold text-gray-700 hover:text-gray-900 transition-colors">Contact Us</a>
              <a href="/careers" className="text-base font-semibold text-gray-700 hover:text-gray-900 transition-colors">Careers</a>
              <SimpleDropdown 
                title="Service Areas" 
                items={serviceAreas}
                isActive={activeDropdown === 'areas'}
                onHover={() => handleDropdownHover('areas')}
                onLeave={() => handleDropdownLeave('areas')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Level 2: Logo, Maintenance Plan, Financing, Phone */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-24">
            
            {/* Logo */}
            <a href="/" className="flex items-center" aria-label={`${siteConfig.business.name} - Home`}>
              <img 
                src={siteConfig.logo.src} 
                alt={siteConfig.logo.alt} 
                className="h-16 w-auto object-contain"
                decoding="async" 
                loading="eager" 
              />
            </a>

            {/* Center: Specials & Financing */}
            <div className="hidden lg:flex items-center gap-12">
              <a
                href="/specials-coupons"
                className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
                    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
                    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/>
                  </svg>
                </div>
                <span className="text-lg font-bold">Specials</span>
              </a>

              <a
                href="/financing"
                className="flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="20" height="14" x="2" y="5" rx="2"/>
                    <line x1="2" x2="22" y1="10" y2="10"/>
                  </svg>
                </div>
                <span className="text-lg font-bold">Financing</span>
              </a>
            </div>

            {/* Right: Book Now Button */}
            <a
              href="/contact"
              className="hidden lg:flex items-center gap-2 px-8 py-3 rounded-full text-base font-bold text-gray-900 transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)" }}
            >
              Book Now
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>

            {/* Mobile Menu */}
            <div className="flex lg:hidden items-center gap-3">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ background: "#0ea5e9" }}
                aria-label="Call us"
              >
                <Phone className="h-5 w-5" />
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

      {/* Level 3: Service Categories */}
      <div className="w-full" style={{ background: "#1e3a5f" }}>
        <div className="container mx-auto px-6">
          <div className="hidden lg:flex items-center justify-center">
            {mainNavItems.map((item) => (
              <ServiceCategoryDropdown
                key={item.href}
                item={item}
                isActive={activeDropdown === item.href}
                onHover={() => handleDropdownHover(item.href)}
                onLeave={() => handleDropdownLeave(item.href)}
              />
            ))}
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
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-3 flex justify-end items-center min-h-[60px] mt-10">
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close menu">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Phone */}
      <a href={`tel:${siteConfig.contact.phone}`} className="flex items-center justify-center gap-2 text-white px-6 py-3.5 transition-colors" style={{ background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)" }}>
        <Phone className="h-5 w-5 text-gray-900" />
        <span className="font-semibold text-lg text-gray-900">{siteConfig.contact.phoneFormatted}</span>
      </a>

      {/* Nav links */}
      <div className="px-6 py-3 space-y-1">
        <a href="/" className="block py-3 text-base font-medium text-black hover:text-blue-600 border-b border-gray-200 transition-colors" onClick={onClose}>Home</a>

        {/* About Us */}
        <div className="border-b border-gray-200">
          <button onClick={() => setAboutOpen(!aboutOpen)} className="flex items-center justify-between w-full py-3 text-base font-medium text-black hover:text-blue-600 transition-colors">
            About Us <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`} />
          </button>
          {aboutOpen && (
            <div className="pb-2 pl-4 space-y-1">
              {aboutItems.map(item => (
                <a key={item.href} href={item.href} className="block py-2 text-sm text-black hover:text-blue-600 transition-colors" onClick={onClose}>{item.title}</a>
              ))}
            </div>
          )}
        </div>

        {/* Services */}
        <div className="border-b border-gray-200">
          <button onClick={() => setServicesOpen(!servicesOpen)} className="flex items-center justify-between w-full py-3 text-base font-medium text-black hover:text-blue-600 transition-colors">
            Services <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
          </button>
          {servicesOpen && (
            <div className="pb-2 pl-4 space-y-2">
              {mainNavItems.map(item => (
                <div key={item.href} className="space-y-1">
                  <a href={item.href} className="block py-2 text-sm font-semibold text-black hover:text-blue-600 transition-colors flex items-center gap-2" onClick={onClose}>
                    <span className="text-blue-600">{getIcon(item.title)}</span>{item.title}
                  </a>
                  {item.categories[0]?.items?.length > 0 && (
                    <div className="pl-3 space-y-1 border-l-2 border-gray-200">
                      {item.categories[0].items.map(sub => (
                        <a key={sub.href} href={sub.href} className="block py-1.5 text-sm text-black hover:text-blue-600 transition-colors flex items-start gap-2" onClick={onClose}>
                          <span className="text-blue-600 mt-1.5">•</span><span>{sub.title}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <a href="/reviews" className="block py-3 text-base font-medium text-black hover:text-blue-600 border-b border-gray-200 transition-colors" onClick={onClose}>Reviews</a>

        {/* Service Areas */}
        <div className="border-b border-gray-200">
          <button onClick={() => setAreasOpen(!areasOpen)} className="flex items-center justify-between w-full py-3 text-base font-medium text-black hover:text-blue-600 transition-colors">
            Service Areas <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${areasOpen ? "rotate-180" : ""}`} />
          </button>
          {areasOpen && (
            <div className="pb-2 pl-4 space-y-1">
              {serviceAreas.map(area => (
                <a key={area.href} href={area.href} className="block py-2 text-sm text-black hover:text-blue-600 transition-colors" onClick={onClose}>{area.title}</a>
              ))}
            </div>
          )}
        </div>

        <a href="/contact" className="block py-3 text-base font-medium text-black hover:text-blue-600 border-b border-gray-200 transition-colors" onClick={onClose}>Contact Us</a>
      </div>

      {/* CTA */}
      <div className="mt-auto px-6 py-4 border-t border-gray-200 bg-gray-50 space-y-3">
        <div className="flex gap-3">
          <a href="/specials-coupons" className="flex-1 flex items-center justify-center bg-white text-gray-900 px-4 py-2.5 rounded-full text-sm font-semibold border border-gray-300 hover:bg-gray-100 transition-all" onClick={onClose}>Specials</a>
          <a href="/financing" className="flex-1 flex items-center justify-center bg-white text-gray-900 px-4 py-2.5 rounded-full text-sm font-semibold border border-gray-300 hover:bg-gray-100 transition-all" onClick={onClose}>Financing</a>
        </div>
      </div>
    </div>
  )
}
