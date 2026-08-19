type IconProps = { className?: string };

const frame = "h-10 w-10 stroke-[1.4] text-fg";

function Bars({ className = "fill-brand-pink" }: { className?: string }) {
  return (
    <g className={className}>
      <rect x="9" y="14" width="2.2" height="10" rx="0.4" />
      <rect x="12.4" y="11" width="2.2" height="13" rx="0.4" />
      <rect x="15.8" y="8" width="2.2" height="16" rx="0.4" />
    </g>
  );
}

export function ServiceIcon({ id, className }: { id: string } & IconProps) {
  return (
    <svg viewBox="0 0 40 40" className={className ?? frame} fill="none" aria-hidden>
      <rect x="1" y="1" width="38" height="38" rx="10" className="stroke-fg/25" />
      {id === "exhibitions" && (
        <>
          <path d="M8 28V14l12-6 12 6v14" className="stroke-current" />
          <Bars />
        </>
      )}
      {id === "booths" && (
        <>
          <path d="M10 28V16h20v12" className="stroke-current" />
          <path d="M10 16l10-6 10 6" className="stroke-current" />
          <Bars />
        </>
      )}
      {id === "events" && (
        <>
          <path d="M12 28V12h16v16" className="stroke-current" />
          <path d="M12 12l8-4 8 4" className="stroke-current" />
          <Bars />
        </>
      )}
      {["management", "projects", "registration"].includes(id) && (
        <>
          <rect x="12" y="10" width="16" height="20" rx="2" className="stroke-current" />
          <Bars />
        </>
      )}
      {["fabrication", "production", "maintenance"].includes(id) && (
        <>
          <circle cx="20" cy="20" r="8" className="stroke-current" />
          <Bars />
        </>
      )}
      {id === "installation" && (
        <>
          <path d="M12 26l16-12" className="stroke-current" />
          <path d="M14 14h8v8" className="stroke-current" />
          <Bars />
        </>
      )}
      {["structure", "stage"].includes(id) && (
        <>
          <path d="M8 28h24M12 28V14h16v14" className="stroke-current" />
          <Bars />
        </>
      )}
      {["av", "led", "signage"].includes(id) && (
        <>
          <rect x="10" y="12" width="20" height="14" rx="1.5" className="stroke-current" />
          <Bars />
        </>
      )}
      {id === "lighting" && (
        <>
          <path d="M20 10v6M14 28h12M16 16h8l-2 12h-4z" className="stroke-current" />
          <Bars />
        </>
      )}
      {["printing", "branding"].includes(id) && (
        <>
          <path d="M12 26V12h16v10H18l-6 4z" className="stroke-current" />
          <Bars />
        </>
      )}
      {["logistics", "transport"].includes(id) && (
        <>
          <path d="M8 24h16l6-6v6h2v4H8z" className="stroke-current" />
          <Bars />
        </>
      )}
      {["warehouse", "packaging"].includes(id) && (
        <>
          <path d="M10 28V16l10-6 10 6v12z" className="stroke-current" />
          <Bars />
        </>
      )}
      {id === "conference" && (
        <>
          <path d="M12 26h16v2H12zM16 18h8v8h-8z" className="stroke-current" />
          <Bars />
        </>
      )}
      {id === "hospitality" && (
        <>
          <path d="M12 24c0-4 3.5-8 8-8s8 4 8 8" className="stroke-current" />
          <Bars />
        </>
      )}
    </svg>
  );
}
