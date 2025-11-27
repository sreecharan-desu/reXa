// File: /mnt/data/utils/placeholder.ts
export interface PlaceholderSource {
  name?: string;
  category?: string;
  description?: string;
  points?: number; // optional, used for badge only (never show any sensitive codes)
  expiryDate?: string; // optional, show expiration hint (non-sensitive)
}

// deterministic hash (FNV-1a variant)
const hashString = (str = ""): number => {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
};

const palettes = [
  ["#06b6d4", "#0891b2"],
  ["#7c3aed", "#a78bfa"],
  ["#3b82f6", "#60a5fa"],
  ["#f97316", "#fb923c"],
  ["#10b981", "#34d399"],
  ["#ef4444", "#f97373"],
  ["#f59e0b", "#fbbf24"],
];

const escapeXml = (s = "") =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// Small helper to format expiry hint
const expiryHint = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  // format: "Expires Jul 31, 2025"
  return `Expires ${d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
};

export const makePlaceholderSvgDataUrl = (src: PlaceholderSource) => {
  const base = `${src.name || ""}|${src.category || ""}|${
    src.description || ""
  }|${src.points || ""}`;
  const h = hashString(base);
  const palette = palettes[h % palettes.length];
  const [c1, c2] = palette;
  const angle = h % 360;
  const circleOffset = 20 + (h % 60);
  const patternSeed = (h % 1000) / 1000;

  const titleRaw = (src.name || "").trim() || src.category || "Offer";
  const title = titleRaw.length > 40 ? titleRaw.slice(0, 37) + "..." : titleRaw;
  const subRaw = (src.category || src.description || "").trim();
  const subtitle = subRaw.length > 60 ? subRaw.slice(0, 57) + "..." : subRaw;
  const pointsText = src.points !== undefined ? `${src.points} pts` : "";
  const expiryText = expiryHint(src.expiryDate);

  // Choose a single-letter glyph fallback (A-Z) if category not descriptive
  const glyph = (src.category || "").toLowerCase().includes("food")
    ? "🍽"
    : (src.category || "").toLowerCase().includes("entertain")
    ? "🎬"
    : (src.category || "").toLowerCase().includes("travel")
    ? "✈"
    : (src.category || "").toLowerCase().includes("game")
    ? "🎮"
    : (src.name || "").trim().charAt(0).toUpperCase() || "O";

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720" role="img" aria-label="${escapeXml(
    title
  )}">
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}" />
      <stop offset="1" stop-color="${c2}" />
    </linearGradient>

    <!-- subtle diagonal lines pattern -->
    <pattern id="stripe" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(${angle})">
      <rect width="16" height="16" fill="rgba(255,255,255,0)" />
      <path d="M0 16 L16 0" stroke="rgba(255,255,255,0.05)" stroke-width="1" />
    </pattern>

    <!-- soft grain for texture -->
    <filter id="grain">
      <feTurbulence baseFrequency="${
        0.8 * patternSeed
      }" numOctaves="1" stitchTiles="stitch" result="noise" />
      <feColorMatrix type="saturate" values="0" in="noise" result="mono" />
      <feBlend in="SourceGraphic" in2="mono" mode="overlay" />
    </filter>

    <!-- card shadow -->
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="8" stdDeviation="18" flood-color="#000" flood-opacity="0.18"/>
    </filter>

    <clipPath id="cardClip">
      <rect rx="28" ry="28" width="1040" height="560" x="80" y="80" />
    </clipPath>
  </defs>

  <!-- background gradient -->
  <rect width="1200" height="720" fill="url(#grad)"/>

  <!-- decorative stripes -->
  <rect width="1200" height="720" fill="url(#stripe)" opacity="0.18" />

  <!-- translucent card -->
  <g filter="url(#shadow)">
    <rect x="80" y="80" rx="28" ry="28" width="1040" height="560" fill="rgba(255,255,255,0.06)" />
  </g>

  <!-- content inside card clipped -->
  <g clip-path="url(#cardClip)">
    <!-- left panel circle + glyph -->
    <g transform="translate(120,160)">
      <circle cx="0" cy="0" r="140" fill="rgba(255,255,255,0.08)" />
      <circle cx="0" cy="0" r="106" fill="white" opacity="0.06" />
      <text x="0" y="18" font-size="82" text-anchor="middle" font-family='system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' fill="white">
        ${escapeXml(glyph)}
      </text>
    </g>

    <!-- main text block -->
    <g transform="translate(320,180)">
      <text x="0" y="0" font-size="44" font-weight="700" font-family='Inter, ui-sans-serif, system-ui, -apple-system' fill="white">
        ${escapeXml(title)}
      </text>

      <text x="0" y="54" font-size="18" fill="rgba(255,255,255,0.95)" font-family='Inter, ui-sans-serif'>
        ${escapeXml(subtitle || "Great offer")}
      </text>

      <!-- small meta row -->
      <g transform="translate(0,100)">
        ${
          pointsText
            ? `<rect x="0" y="-26" width="160" height="36" rx="8" fill="rgba(255,255,255,0.08)" />
        <text x="20" y="-2" font-size="14" fill="white" font-family='Inter'>${escapeXml(
          pointsText
        )}</text>`
            : ""
        }

        ${
          expiryText
            ? `<text x="${
                pointsText ? 180 : 0
              }" y="-2" font-size="14" fill="rgba(255,255,255,0.82)" font-family='Inter'>${escapeXml(
                expiryText
              )}</text>`
            : ""
        }
      </g>
    </g>

    <!-- small ribbon top-right showing category (non-sensitive) -->
    <g transform="translate(920,120)">
      <rect x="-12" y="-12" rx="8" ry="8" width="230" height="44" fill="rgba(255,255,255,0.06)" />
      <text x="8" y="20" font-size="16" fill="white" font-family='Inter'>
        ${escapeXml(src.category || "General")}
      </text>
    </g>

    <!-- subtle corner decoration -->
    <g transform="translate(960,420) rotate(${(h % 10) - 5})" opacity="0.08">
      <rect x="0" y="0" width="180" height="110" rx="12" fill="white" />
    </g>
  </g>

  <!-- subtle grain overlay to make image feel tactile -->
  <rect width="1200" height="720" fill="transparent" filter="url(#grain)" opacity="0.06" />

</svg>`.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};
