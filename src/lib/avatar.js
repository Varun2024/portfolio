// Avatar URL normalization + deterministic default-avatar selection.
// Handles Google Drive share links, Dropbox, GitHub blob URLs, and bare URLs.
// Falls back to a stable, name-seeded DiceBear avatar when none is provided.

const DEFAULT_AVATAR_STYLES = [
  "avataaars",
  "bottts-neutral",
  "lorelei",
  "fun-emoji",
]

const DEFAULT_BG_PALETTE = "1f1e39,282b4b,7a57db,33c2cc"

const hashSeed = (input) => {
  const value = String(input ?? "guest")
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}

export const buildDefaultAvatar = (seed = "guest") => {
  const cleanSeed = String(seed).trim() || "guest"
  const style = DEFAULT_AVATAR_STYLES[hashSeed(cleanSeed) % DEFAULT_AVATAR_STYLES.length]
  const params = new URLSearchParams({
    seed: cleanSeed,
    backgroundColor: DEFAULT_BG_PALETTE,
    radius: "50",
  })
  return `https://api.dicebear.com/9.x/${style}/svg?${params.toString()}`
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
