import Link from 'next/link'
import { Logo } from '@/components/brand/Logo'
import { footerLinks, site, whatsappLink, whatsappMessages } from '@/lib/site'
import {
  MailIcon,
  PhoneIcon,
  WhatsAppIcon,
  LocationIcon,
  FacebookIcon,
  InstagramIcon,
} from '@/components/svg/Icons'

/**
 * Footer link columns.
 *
 * This is the site's main internal link mesh: every city, comparison and guide
 * hub is reachable from every page. Pages that are only in the sitemap and
 * linked from nowhere get crawled far more slowly and rank worse, so new
 * sections belong here as well as in sitemap.ts.
 */
const columns = [
  { title: 'Products', links: footerLinks.products },
  { title: 'Industries', links: footerLinks.industries },
  { title: 'Services', links: footerLinks.services },
  { title: 'Guides', links: footerLinks.guides },
  { title: 'Cities', links: footerLinks.cities },
  { title: 'Company', links: footerLinks.company },
] as const

const SOCIAL_ICONS: Record<string, typeof FacebookIcon> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-navy text-navy-200">
      <div className="container-apex py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_3fr]">
          <div className="flex flex-col gap-6">
            <Logo tone="reversed" width={200} />
            <p className="max-w-sm text-sm leading-relaxed">
              Apex POS is offline point of sale software built for Pakistani shops — billing,
              inventory, udhaar and real profit tracking, with no monthly fees.
            </p>

            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a
                  href={whatsappLink(whatsappMessages.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-cyan"
                >
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" />
                  {site.phoneDisplay}
                  <span className="text-xs text-navy-400">(WhatsApp)</span>
                </a>
              </li>
              <li>
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-cyan"
                >
                  <PhoneIcon className="h-4 w-4 shrink-0" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2.5 break-all transition-colors hover:text-cyan"
                >
                  <MailIcon className="h-4 w-4 shrink-0" />
                  {site.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5">
                <LocationIcon className="h-4 w-4 shrink-0" />
                Serving all of {site.country}
              </li>
            </ul>

            {/* Social profiles. rel="me" states that these belong to the same
                entity as this site — the markup counterpart of `sameAs` in the
                Organization JSON-LD. */}
            <ul className="flex items-center gap-3">
              {site.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.name]
                if (!Icon) return null
                return (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="me noopener noreferrer"
                      aria-label={`${site.name} on ${social.name}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-navy-200 transition-colors hover:border-cyan/50 hover:bg-white/5 hover:text-cyan"
                    >
                      <Icon className="h-[1.05rem] w-[1.05rem]" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  {column.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm transition-colors hover:text-cyan"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/*
          Cities are a genuine service-area statement and double as local search
          signal; the same list feeds `areaServed` in the Organization JSON-LD.
        */}
        <div className="mt-14 border-t border-white/10 pt-8">
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
            POS software across Pakistan
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-navy-300">
            We install and support Apex POS for businesses in{' '}
            {site.areaServed.slice(0, -1).join(', ')} and {site.areaServed.at(-1)} — remote
            setup and training are available nationwide.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row sm:items-center">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="text-navy-400">{site.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
