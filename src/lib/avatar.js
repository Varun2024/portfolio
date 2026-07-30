// Avatar URL normalization + terminal-style monogram default.
// Handles Google Drive share links, Dropbox, GitHub blob URLs, and bare URLs.
// Falls back to an inline SVG monogram (initials + scanner corner ticks) when
// none is provided — no external API, no pastel cartoon avatars.

const escapeXml = (s) =>
  String(s).replace(/[<>&"']/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&#39;" }[c]))

const initialsOf = (seed) => {
  const parts = String(seed || "").trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "??"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export const buildDefaultAvatar = (seed = "guest") => {
  const initials = initialsOf(seed)
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'>
    <rect width='64' height='64' fill='#0b0d13' rx='8'/>
    <path d='M6 6 L14 6 M6 6 L6 14' stroke='#7dd3fc' stroke-opacity='0.55' stroke-width='1.5' fill='none' stroke-linecap='round'/>
    <path d='M58 6 L50 6 M58 6 L58 14' stroke='#7dd3fc' stroke-opacity='0.55' stroke-width='1.5' fill='none' stroke-linecap='round'/>
    <path d='M6 58 L14 58 M6 58 L6 50' stroke='#7dd3fc' stroke-opacity='0.55' stroke-width='1.5' fill='none' stroke-linecap='round'/>
    <path d='M58 58 L50 58 M58 58 L58 50' stroke='#7dd3fc' stroke-opacity='0.55' stroke-width='1.5' fill='none' stroke-linecap='round'/>
    <text x='32' y='40' text-anchor='middle' font-family='ui-monospace, SFMono-Regular, Menlo, monospace' font-size='22' font-weight='700' fill='#7dd3fc'>${escapeXml(initials)}</text>
  </svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const matchDrive = (url) => {
  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([^/?#]+)/)
  if (fileMatch) return fileMatch[1]
  const openMatch = url.match(/drive\.google\.com\/open\?id=([^&]+)/)
  if (openMatch) return openMatch[1]
  const ucMatch = url.match(/drive\.google\.com\/uc\?(?:export=[^&]+&)?id=([^&]+)/)
  if (ucMatch) return ucMatch[1]
  const thumbMatch = url.match(/drive\.google\.com\/thumbnail\?id=([^&]+)/)
  if (thumbMatch) return thumbMatch[1]
  return null
}

export const normalizeAvatarUrl = (url, seed) => {
  if (typeof url !== "string") return buildDefaultAvatar(seed)
  const trimmed = url.trim()
  if (!trimmed) return buildDefaultAvatar(seed)

  // Already a local asset reference — pass through.
  if (trimmed.startsWith("/") || trimmed.startsWith("data:")) return trimmed

  // Google Drive — convert any share variant to the thumbnail endpoint so
  // <img> tags can render it without auth or CORS friction.
  const driveId = matchDrive(trimmed)
  if (driveId) {
    return `https://drive.google.com/thumbnail?id=${driveId}&sz=w400`
  }

  // Dropbox share links — flip ?dl=0 to ?raw=1 so it serves the file body.
  if (/dropbox\.com\//.test(trimmed)) {
    if (/[?&]dl=0(&|$)/.test(trimmed)) {
      return trimmed.replace(/([?&])dl=0(&|$)/, "$1raw=1$2")
    }
    if (!/[?&](raw|dl)=/.test(trimmed)) {
      return `${trimmed}${trimmed.includes("?") ? "&" : "?"}raw=1`
    }
    return trimmed
  }

  // GitHub blob URLs serve HTML pages, not images — rewrite to raw.
  const githubBlob = trimmed.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/blob\/(.+)$/)
  if (githubBlob) {
    return `https://raw.githubusercontent.com/${githubBlob[1]}/${githubBlob[2]}/${githubBlob[3]}`
  }

  return trimmed
}

export const resolveAvatar = (url, seed) => {
  return normalizeAvatarUrl(url, seed)
}
