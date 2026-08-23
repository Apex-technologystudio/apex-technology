import type { SVGProps } from 'react'

/**
 * Interface icons.
 *
 * All are stroke-based on a 24-unit grid and inherit `currentColor`, so a
 * single text colour drives the icon. Decorative by default (`aria-hidden`) —
 * every icon here sits next to a visible text label, so announcing it again
 * would only add noise for screen-reader users.
 */
type IconProps = SVGProps<SVGSVGElement>

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export function ChevronIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  )
}

export function MenuIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icon>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Icon>
  )
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Icon>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m4 12.5 5 5 11-11" />
    </Icon>
  )
}

export function PhoneIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5L16 12l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 5.2 2 2 0 0 1 5.5 3Z" />
    </Icon>
  )
}

export function MailIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3.5 7 7.6 5.3a1.6 1.6 0 0 0 1.8 0L20.5 7" />
    </Icon>
  )
}

export function LocationIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Icon>
  )
}

/** WhatsApp glyph — filled, and intentionally not on the 24-grid stroke system. */
export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.24 8.24 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43l-.48-.01c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  )
}

/* ---------------------------------------------------------------------------
   Feature icons

   Each one animates only while its container is hovered or marked in-view, via
   the `group-hover`/`group-data-[view=in]` hooks. The keyframes live in
   globals.css, so the reduced-motion block there disables all of them at once.
--------------------------------------------------------------------------- */

/** Barcode with a scan beam that sweeps down the bars. */
export function BarcodeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7V5.5A1.5 1.5 0 0 1 5.5 4H7M17 4h1.5A1.5 1.5 0 0 1 20 5.5V7M20 17v1.5a1.5 1.5 0 0 1-1.5 1.5H17M7 20H5.5A1.5 1.5 0 0 1 4 18.5V17" />
      <path d="M7.5 8.5v7M10 8.5v7M12.5 8.5v7M15 8.5v7M17 8.5v7" strokeWidth={1.4} />
      <path
        d="M6 12h12"
        stroke="var(--color-cyan)"
        strokeWidth={2}
        className="origin-center opacity-0 group-hover:animate-[apex-scan_1.4s_ease-in-out_infinite] group-hover:opacity-100"
        style={{ ['--scan-distance' as string]: '4px' }}
      />
    </Icon>
  )
}

/** Receipt whose torn edge and lines suggest printing. */
export function ReceiptIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 3h12v16.5l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2-2 1.2Z" />
      <path d="M9 8h6M9 11.5h6M9 15h3.5" strokeWidth={1.4} />
    </Icon>
  )
}

/** Stacked boxes for inventory. */
export function InventoryIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 8.5 12 4l9 4.5-9 4.5-9-4.5Z" />
      <path d="m3 12.5 9 4.5 9-4.5M3 16.5 12 21l9-4.5" strokeWidth={1.4} />
    </Icon>
  )
}

/** Rising bars — the profit/reporting mark. Bars grow on hover. */
export function ProfitIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 20h18" />
      <rect
        x="5" y="13" width="3.4" height="5" rx="0.8"
        className="origin-bottom transition-transform duration-500 group-hover:scale-y-[1.35]"
      />
      <rect
        x="10.3" y="9.5" width="3.4" height="8.5" rx="0.8"
        className="origin-bottom transition-transform duration-500 delay-75 group-hover:scale-y-[1.2]"
      />
      <rect
        x="15.6" y="6" width="3.4" height="12" rx="0.8"
        className="origin-bottom transition-transform duration-500 delay-150 group-hover:scale-y-[1.12]"
      />
      <path d="m5 8 4.5-3.5L13 7l6-4.5" stroke="var(--color-cyan)" strokeWidth={1.6} opacity={0.9} />
    </Icon>
  )
}

/** Shield with a check — local backup and data safety. */
export function BackupIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3 5 5.8v5.4c0 4.3 2.9 8.2 7 9.3 4.1-1.1 7-5 7-9.3V5.8Z" />
      <path d="m9 12 2.2 2.2L15.5 10" stroke="var(--color-cyan)" strokeWidth={1.9} />
    </Icon>
  )
}

/** Open ledger — the udhaar / khata mark. */
export function UdhaarIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 6.5S10.2 5 7.2 5H4v13h3.4c2.8 0 4.6 1.4 4.6 1.4s1.8-1.4 4.6-1.4H20V5h-3.2C13.8 5 12 6.5 12 6.5Z" />
      <path d="M12 6.5v13" strokeWidth={1.4} />
    </Icon>
  )
}

/** A payment splitting into two routes. */
export function SplitPaymentIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 4v6" />
      <path d="M12 10 6.5 15v5M12 10l5.5 5v5" strokeWidth={1.5} />
      <circle cx="12" cy="4" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="6.5" cy="20" r="1.6" fill="var(--color-cyan)" stroke="none" />
      <circle cx="17.5" cy="20" r="1.6" fill="var(--color-cyan)" stroke="none" />
    </Icon>
  )
}

/** Crossed-out cloud — states plainly that the software runs without internet. */
export function OfflineIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7.5 18.5h9.2a3.8 3.8 0 0 0 .6-7.55 5.6 5.6 0 0 0-10.42-1.6A4 4 0 0 0 7.5 18.5Z" />
      <path d="M4 4l16 16" stroke="var(--color-cyan)" strokeWidth={2} />
    </Icon>
  )
}

/** Users with a key — admin vs worker permissions. */
export function RolesIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
      <path d="M16.5 11.5h4M18.5 9.5v4" stroke="var(--color-cyan)" strokeWidth={1.8} />
    </Icon>
  )
}

/** Storefront — retail industry mark. */
export function HomeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 10.5 12 3.5l8 7" />
      <path d="M5.5 9.8V20h13V9.8" />
      <path d="M9.75 20v-5.5h4.5V20" strokeWidth={1.4} />
    </Icon>
  )
}

export function StoreIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 9.5V20h16V9.5" />
      <path d="M3 9.5 4.8 4h14.4L21 9.5a3 3 0 0 1-5.5 1.6 3 3 0 0 1-5 0A3 3 0 0 1 3 9.5Z" />
      <path d="M10 20v-5h4v5" strokeWidth={1.4} />
    </Icon>
  )
}

export function RestaurantIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 3v8a2.5 2.5 0 0 0 5 0V3M8.5 11v10" />
      <path d="M17.5 3c-1.4 1.4-2 3.2-2 5.2 0 1.4.7 2.4 2 2.8V21" />
    </Icon>
  )
}

export function PharmacyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="M12 8v8M8 12h8" stroke="var(--color-cyan)" strokeWidth={2} />
    </Icon>
  )
}

export function SupermarketIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 4h2.2l2.4 10.5h9.6L19 7H6.2" />
      <circle cx="9" cy="19" r="1.6" />
      <circle cx="16.5" cy="19" r="1.6" />
    </Icon>
  )
}

export function GymIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 9v6M7 7v10M17 7v10M20 9v6M7 12h10" />
    </Icon>
  )
}

export function CodeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4M13.5 5l-3 14" />
    </Icon>
  )
}

export function MobileIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 5.5h3" strokeWidth={1.4} />
      <path d="M11 18.5h2" strokeWidth={1.4} />
    </Icon>
  )
}

export function GearIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9 5.3 5.3" />
    </Icon>
  )
}

export function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M8 5.2c0-.9 1-1.5 1.8-1l9 6.8c.7.5.7 1.5 0 2l-9 6.8c-.8.5-1.8-.1-1.8-1Z" />
    </svg>
  )
}
