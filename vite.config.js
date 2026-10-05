import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { writeFileSync, readdirSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const SITE = 'https://varuncodes.tech'

// Read log slugs from src/content/logs/*.md so sitemap stays in sync without a build step.
const readLogSlugs = () => {
  try {
    const dir = resolve(process.cwd(), 'src/content/logs')
    return readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace(/\.md$/, ''))
  } catch {
    return []
  }
}

const seoAssetsPlugin = () => ({
  name: 'seo-assets',
  closeBundle() {
    const today = new Date().toISOString().slice(0, 10)
    const slugs = readLogSlugs()
    const urls = [
      `${SITE}/`,
      `${SITE}/logs`,
      ...slugs.map((s) => `${SITE}/logs/${s}`),
    ]
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq></url>`).join('\n')}
</urlset>
`
    const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`
    writeFileSync('dist/sitemap.xml', sitemap)
    writeFileSync('dist/robots.txt', robots)
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seoAssetsPlugin()],
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
})
