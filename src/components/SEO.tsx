import { useEffect } from "react";
import { seoConfig } from "@/lib/seo-config";

interface SEOProps { title?: string; description?: string; image?: string; url?: string; type?: string; keywords?: string; author?: string; }
const SEO = ({ title = seoConfig.defaultTitle, description = seoConfig.defaultDescription, image = seoConfig.defaultImage, url = seoConfig.siteUrl, type = "website", keywords = "ABRAPA, Jundiaí, HIV, AIDS, apoio social, solidariedade", author = seoConfig.siteName }: SEOProps) => {
  useEffect(() => {
    const fullTitle = title.includes("ABRAPA") ? title : `${title} | ABRAPA Jundiaí`;
    document.title = fullTitle;
    const meta = (key: string, value: string, property = false) => { const selector = property ? `meta[property="${key}"]` : `meta[name="${key}"]`; let node = document.querySelector(selector) as HTMLMetaElement | null; if (!node) { node = document.createElement("meta"); node.setAttribute(property ? "property" : "name", key); document.head.appendChild(node); } node.content = value; };
    const fullImage = image.startsWith("http") ? image : `${seoConfig.siteUrl}${image}`;
    meta("description", description); meta("keywords", keywords); meta("author", author); meta("og:type", type, true); meta("og:title", fullTitle, true); meta("og:description", description, true); meta("og:image", fullImage, true); meta("og:url", url, true); meta("og:site_name", "ABRAPA Jundiaí", true); meta("twitter:card", "summary_large_image"); meta("twitter:title", fullTitle); meta("twitter:description", description); meta("twitter:image", fullImage);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null; if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); } canonical.href = url;
    let schema = document.querySelector('script[data-abrapa-schema]'); if (!schema) { schema = document.createElement("script"); schema.setAttribute("type", "application/ld+json"); schema.setAttribute("data-abrapa-schema", "true"); document.head.appendChild(schema); } schema.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "NGO", name: "ABRAPA Jundiaí", description, url: seoConfig.siteUrl, logo: `${seoConfig.siteUrl}${seoConfig.logoImage}`, sameAs: [seoConfig.social.instagram], address: { "@type": "PostalAddress", streetAddress: "Rua Secundino Veiga, 119", addressLocality: "Jundiaí", addressRegion: "SP", addressCountry: "BR" }, contactPoint: { "@type": "ContactPoint", telephone: "+55-11-4521-1248", email: "contato@abrapajundiai.org.br" } });
  }, [title, description, image, url, type, keywords, author]);
  return null;
};
export default SEO;
