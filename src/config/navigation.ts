export interface NavItem {
  title: string
  href: string
  children?: NavItem[]
}

export interface ServiceCategory {
  title: string
  icon: string
  items: { title: string; href: string }[]
}

export interface MegaMenuItem {
  title: string
  href: string
  categories: ServiceCategory[]
}

// Utility links (top-right area)
export const utilityNavItems: NavItem[] = [
  { title: "Home", href: "/" },
  {
    title: "About Us",
    href: "/about",
    children: [
      { title: "Careers", href: "/careers" },
      { title: "Reviews / Testimonials", href: "/reviews" },
      { title: "Meet The Team", href: "/meet-the-team" },
    ],
  },
  {
    title: "Service Area",
    href: "#",
    children: [
      { title: "Miami", href: "/miami" },
      { title: "Fort Lauderdale", href: "/fort-lauderdale" },
      { title: "Boca Raton", href: "/boca-raton" },
      { title: "Hialeah", href: "/hialeah" },
    ],
  },
  { title: "Contact Us", href: "/contact" },
]

// Quick action items
export const quickActions = [
  { title: "Specials / Coupons", href: "/specials-coupons", icon: "tag" },
  { title: "Financing", href: "/financing", icon: "dollar" },
]

// Primary service navigation with mega menu categories
export const mainNavItems: MegaMenuItem[] = [
  {
    title: "Commercial Electrical Services",
    href: "/commercial-electrical",
    categories: [
      {
        title: "Commercial Electrical Services",
        icon: "building",
        items: [
          { title: "Ground-up Electrical Construction", href: "/commercial-electrical/ground-up-construction" },
          { title: "Emergency & Standby Power Generating Systems", href: "/commercial-electrical/emergency-standby-power" },
          { title: "Commercial HVAC Electrical", href: "/commercial-electrical/hvac-electrical" },
          { title: "Commercial Electrical Panels", href: "/commercial-electrical/electrical-panels" },
        ],
      },
    ],
  },
  {
    title: "Residential Electrical Services",
    href: "/residential-electrical",
    categories: [
      {
        title: "Residential Electrical Services",
        icon: "home",
        items: [
          { title: "Car Charging Stations / EV", href: "/residential-electrical/ev-charging" },
          { title: "Ceiling Fan", href: "/residential-electrical/ceiling-fan" },
          { title: "GFCI Outlets", href: "/residential-electrical/gfci-outlets" },
          { title: "Backup Generators", href: "/residential-electrical/backup-generators" },
        ],
      },
    ],
  },
  {
    title: "Specialty Services",
    href: "/specialty-services",
    categories: [
      {
        title: "Specialty Services",
        icon: "star",
        items: [
          { title: "Holiday Lighting Installation Services", href: "/specialty-services/holiday-lighting" },
          { title: "Landscape Lighting", href: "/specialty-services/landscape-lighting" },
          { title: "Pool & Spa Electrical", href: "/specialty-services/pool-spa-electrical" },
          { title: "Property Management", href: "/specialty-services/property-management" },
        ],
      },
    ],
  },
  {
    title: "Emergency",
    href: "/emergency",
    categories: [
      {
        title: "Emergency Services",
        icon: "alert",
        items: [
          { title: "24-hour Emergency Service", href: "/emergency/24-hour-service" },
          { title: "HVAC", href: "/emergency/hvac" },
          { title: "Heating", href: "/emergency/heating" },
          { title: "Water Heater", href: "/emergency/water-heater" },
        ],
      },
    ],
  },
]
