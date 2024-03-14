export default function AuthImage() {
  return (
    <svg
      className="animate-spin-slow"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 800 800"
    >
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="nnneon-grad">
          <stop stopColor="hsl(157, 100%, 54%)" stopOpacity="1" offset="0%" />
          <stop stopColor="hsl(331, 87%, 61%)" stopOpacity="1" offset="100%" />
        </linearGradient>
        <filter
          id="nnneon-filter"
          x="-100%"
          y="-100%"
          width="400%"
          height="400%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur
            stdDeviation="77 77"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="SourceGraphic"
            edgeMode="none"
            result="blur"
          />
        </filter>
        <filter
          id="nnneon-filter2"
          x="-100%"
          y="-100%"
          width="400%"
          height="400%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur
            stdDeviation="25 17"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="SourceGraphic"
            edgeMode="none"
            result="blur"
          />
        </filter>
      </defs>
      <g strokeWidth="16" stroke="url(#nnneon-grad)" fill="none">
        <path
          d="M400 226.795166015625L550.0000095849032 313.3975856398686V486.60242488835587L400 573.2048445125995L249.99999041509682 486.60242488835587V313.3975856398686L400 226.795166015625Z "
          filter="url(#nnneon-filter)"
        />
        <path
          d="M458 226.795166015625L608.0000095849032 313.3975856398686V486.60242488835587L458 573.2048445125995L307.9999904150968 486.60242488835587V313.3975856398686L458 226.795166015625Z "
          filter="url(#nnneon-filter2)"
          opacity="0.82"
        />
        <path
          d="M342 226.795166015625L492.0000095849032 313.3975856398686V486.60242488835587L342 573.2048445125995L191.99999041509682 486.60242488835587V313.3975856398686L342 226.795166015625Z "
          filter="url(#nnneon-filter2)"
          opacity="0.82"
        />
        <path d="M400 226.795166015625L550.0000095849032 313.3975856398686V486.60242488835587L400 573.2048445125995L249.99999041509682 486.60242488835587V313.3975856398686L400 226.795166015625Z " />
      </g>
    </svg>
  );
}
