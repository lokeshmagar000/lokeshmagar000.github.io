# Lok Bahadur Roka Magar — Portfolio

App Developer & AI Content Creator from Nepal 🇳🇵
Live: https://lokeshmagar000.github.io

## How to edit (no coding needed)
Everything you write lives in **`js/content.js`**:
- **Bio** → `bio` (English) and `bio` under `ne` (Nepali)
- **Profile photo** → put it in `images/profile/`, then set `photo: "images/profile/profile.jpg"`
- **App links** → replace `null` with the real link, e.g. `url: "https://play.google.com/..."`
- **Screenshots** → put pictures in `images/<project>/`, then list them in `screenshots: [...]`
  (keep each under 500 KB, WebP or JPG)
- **Contact form** → make a free form at formspree.io and put its ID in `formspreeId`

## Files
| File | What it does |
|---|---|
| `index.html` | The page structure |
| `css/style.css` | Colours, layout, animations, light/dark mode |
| `js/content.js` | All text, links and pictures (EN + NE) |
| `js/main.js` | Language & theme switch, menu, project cards, contact form |
| `src/hero3d.js` | 3D animation source (Three.js) |
| `js/hero3d.min.js` | Packed 3D file the site loads (rebuild after editing `src/hero3d.js`) |

Rebuild the 3D file: `npm install three esbuild` then
`npx esbuild src/hero3d.js --bundle --minify --format=esm --outfile=js/hero3d.min.js`

## Custom domain (later)
Only after **lokmagar.com.np** is approved and its DNS points to GitHub, add a file named
`CNAME` containing `lokmagar.com.np`. Adding it earlier would break the site.

Three.js is MIT licensed (© three.js authors).
