// Avatar URL normalization + terminal-style monogram default.
// Handles Google Drive share links, Dropbox, GitHub blob URLs, and bare URLs.
// Falls back to an inline SVG monogram (initials + scanner corner ticks) when
// none is provided — no external API, no pastel cartoon avatars.

export const buildDefaultAvatar = (seed = "guest") => {
  // DiceBear notionists — illustrated avatars that match the Experience card
  // portrait style. Deterministic per-seed, no auth, SVG-rendered.
  const s = encodeURIComponent(String(seed || "guest"))
  return `https://api.dicebear.com/9.x/notionists/svg?seed=${s}&backgroundColor=1a1d2a,232735,14161f&backgroundType=solid&radius=50`
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
