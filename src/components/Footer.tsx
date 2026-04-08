import { siteConfig } from "@/config/site"
export function Footer() {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { title: "HOME", href: "/" },
    { title: "SERVICE AREAS", href: "/service-areas" },
    { title: "SCHEDULE NOW", href: "/contact" },
  ]

  const airConditioningServices = [
    { title: "AC Repair", href: "/air-conditioning/ac-repair" },
    { title: "AC Installation and Replacement", href: "/air-conditioning/ac-installation-replacement" },
  ]

  const emergencyServices = [
    { title: "24/7 AC Repairs", href: "/emergency/24-7-ac-repairs" },
    { title: "24/7 Emergency Repairs", href: "/emergency/24-7-emergency-repairs" },
  ]

  const commercialServices = [
    { title: "HVAC Repair", href: "/commercial/hvac-repair" },
    { title: "HVAC Installation", href: "/commercial/hvac-installation" },
  ]

  return (
    <footer className="bg-brand-primary text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Us Column */}
          <div>
            <h3 className="text-sm font-bold tracking-wide mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-brand-highlight rounded-full"></span>
              CONTACT US
            </h3>
            <div className="space-y-3 mb-6">
              <p className="text-sm text-white font-semibold">
                {siteConfig.business.fullName}
              </p>
              <p className="text-sm text-white/70">
                {siteConfig.location.fullAddress}
              </p>
              <p className="text-sm text-white/70">
                Email: {siteConfig.contact.email}
              </p>
              <p className="text-sm text-white/70">
                Phone: {siteConfig.contact.phoneFormatted}
              </p>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-bold tracking-wide mb-4 flex items-center gap-2">
                <span className="w-1 h-4 bg-brand-highlight rounded-full"></span>
                QUICK LINKS
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-white/70 hover:text-brand-highlight transition-colors"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Air Conditioning Services Column */}
          <div>
            <h3 className="text-sm font-bold tracking-wide mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-brand-highlight rounded-full"></span>
              AIR CONDITIONING SERVICES
            </h3>
            <ul className="space-y-2">
              {airConditioningServices.map((service) => (
                <li key={service.href}>
                  <a
                    href={service.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Emergency HVAC Services Column */}
          <div>
            <h3 className="text-sm font-bold tracking-wide mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-brand-highlight rounded-full"></span>
              EMERGENCY HVAC SERVICES
            </h3>
            <ul className="space-y-2">
              {emergencyServices.map((service) => (
                <li key={service.href}>
                  <a
                    href={service.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Commercial HVAC Services Column */}
          <div>
            <h3 className="text-sm font-bold tracking-wide mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-brand-highlight rounded-full"></span>
              COMMERCIAL HVAC SERVICES
            </h3>
            <ul className="space-y-2">
              {commercialServices.map((service) => (
                <li key={service.href}>
                  <a
                    href={service.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t-2 border-brand-highlight/30">
        <div className="container mx-auto px-4 py-4">
          <p className="text-sm text-white/50 text-center">
            © Copyright {currentYear} {siteConfig.business.name}
          </p>
        </div>
      </div>
    </footer>
  )
}
