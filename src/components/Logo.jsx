import { useId } from 'react'

/**
 * Digimates mark as a crisp vector (traced from the brand logo),
 * so it stays sharp at any size / pixel density.
 */
export default function LogoMark({ size = 32, className, style, title = 'Digimates' }) {
  const uid = useId().replace(/:/g, '')
  const g = `dm-grad-${uid}`
  const w = size * (760 / 640)

  return (
    <svg
      className={className}
      style={style}
      width={w}
      height={size}
      viewBox="20 30 760 640"
      fill="none"
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id={g} gradientUnits="userSpaceOnUse" x1="120" y1="40" x2="420" y2="700">
          <stop offset="0" stopColor="#1ad8f2" />
          <stop offset="0.45" stopColor="#2b86f2" />
          <stop offset="0.75" stopColor="#4a4fe8" />
          <stop offset="1" stopColor="#7b1fe2" />
        </linearGradient>
      </defs>

      <g fill={`url(#${g})`} stroke={`url(#${g})`} strokeLinecap="round" strokeLinejoin="round">
        {/* Bars + dots */}
        <rect x="40" y="540" width="52" height="120" rx="26" stroke="none" />
        <circle cx="66" cy="482" r="24" stroke="none" />
        <rect x="128" y="364" width="52" height="296" rx="26" stroke="none" />
        <circle cx="154" cy="302" r="26" stroke="none" />
        <rect x="214" y="128" width="52" height="532" rx="26" stroke="none" />
        <circle cx="240" cy="68" r="26" stroke="none" />

        {/* D stem */}
        <rect x="304" y="232" width="52" height="428" rx="26" stroke="none" />

        {/* D outer curve */}
        <path
          fill="none"
          strokeWidth="24"
          d="M328 70 C470 66 560 104 605 138 C670 190 712 280 710 370 C708 470 660 550 598 588 C530 630 430 642 340 642"
        />

        {/* Inner network */}
        <g fill="none" strokeWidth="13" opacity="0.85">
          <path d="M328 70 L522 210" />
          <path d="M522 210 L605 138" />
          <path d="M522 210 L710 370" />
          <path d="M522 210 L522 480" opacity="0.55" />
          <path d="M522 480 L710 370" />
          <path d="M522 480 L598 588" />
          <path d="M522 480 L345 640" />
        </g>

        {/* Nodes */}
        <g stroke="none">
          <circle cx="328" cy="70" r="30" />
          <circle cx="605" cy="138" r="34" />
          <circle cx="522" cy="210" r="34" />
          <circle cx="710" cy="370" r="36" />
          <circle cx="522" cy="480" r="36" />
          <circle cx="598" cy="588" r="34" />
        </g>
      </g>
    </svg>
  )
}
