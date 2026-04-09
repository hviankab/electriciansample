// ===========================================
// SITE CONFIGURATION
// Update this file with client information
// All components will automatically use these values
// ===========================================

export const siteConfig = {
  // Business Information
  business: {
    name: "Electrician Sample",
    fullName: "ABC Company Electrical Services",
    tagline: "Electrical Services",
    description: "Professional Electrical Services",
  },

  // Location
  location: {
    city: "New York",
    state: "SC",
    address: "3648 Rorance Road",
    fullAddress: "3648 Rorance Road, New York, SC 29170",
  },

  // Contact
  contact: {
    email: "dealer@domain.com",
    phone: "0123456789",
    phoneFormatted: "012-345-6789",
  },

  // Brand Colors (used in CSS variables)
  colors: {
    primary: "#212A31",      // Dark Navy - dominant, headers, navbar
    secondary: "#124E66",    // Teal - buttons, CTAs, highlights
    tertiary: "#D3D9D4",     // Light Gray - section backgrounds
    quaternary: "#FFFFFF",   // White - page background
    accent: "#748D92",       // Steel Blue Gray - body text, secondary info
    highlight: "#2E3944",    // Dark Slate - hover state
  },

  // Logo
  logo: {
    src: "/electricianimgs/AdobeStock_840240236-removebg-preview.png",
    alt: "Electrician Logo",
  },

  // Social Media (optional)
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
  },

  // SEO
  seo: {
    siteName: "Electrician Sample",
    defaultTitle: "Professional Electrical Services | Licensed Electricians",
    defaultDescription: "Trusted electrical services for residential and commercial properties. Licensed electricians available 24/7 for installations, repairs, and emergency service.",
    keywords: "digital marketing Denver, local advertising Denver, indoor billboard advertising, website design Denver, PPC advertising, social media management, Connected TV advertising, OTT ads, geofencing, local SEO Denver",
    siteUrl: "https://acmeinc.com", // Update with actual domain
    ogImage: "https://acmeinc.com/og-image.jpg", // Update with actual OG image
    twitterHandle: "@acmeinc",
  },

  // Template Info
  template: {
    id: "8",
    name: "Progressive Section Layout",
  },
}

// Helper to get location-aware text
export function getLocationText(text: string): string {
  return text
    .replaceAll("{city}", siteConfig.location.city)
    .replaceAll("{state}", siteConfig.location.state)
    .replaceAll("{business}", siteConfig.business.name)
    .replaceAll("{fullName}", siteConfig.business.fullName)
}

// Process an array of strings through getLocationText
export function processLocationArray(arr: string[]): string[] {
  return arr.map(getLocationText)
}
