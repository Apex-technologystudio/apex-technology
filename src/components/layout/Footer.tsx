import Link from 'next/link'
import { Logo } from '@/components/brand/Logo'
import { footerLinks, site, whatsappLink, whatsappMessages } from '@/lib/site'
import { MailIcon, PhoneIcon, WhatsAppIcon, LocationIcon } from '@/components/svg/Icons'

const columns = [
  { title: 'Products', links: footerLinks.products },
  { title: 'Industries', links: footerLinks.industries },
  { title: 'Services', links: footerLinks.services },
  { title: 'Company', links: footerLinks.company },
] as const

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-navy text-navy-200">
      <div className="container-apex py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
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
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
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
