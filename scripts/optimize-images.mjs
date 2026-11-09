// Pre-renders the page's raster images as AVIF and WebP at the widths the layout uses.
// Cloudflare Pages serves next/image URLs as the untouched original, so the optimisation has to
// happen here, at build time. Sources live in assets/, output goes to public/img/ (git-ignored).
import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";
import { join, parse } from "node:path";

const out = "public/img";
await mkdir(out, { recursive: true });

// width list per source: the hero is 1152px wide at the widest layout, feature rows 660px.
const widths = (name) => (name.startsWith("workspaces") ? [768, 1152, 2304] : [700, 1400]);

const jobs = [];
for (const file of await readdir("assets/screenshots")) {
  const { name } = parse(file);
  for (const w of widths(name)) {
    const img = sharp(join("assets/screenshots", file)).resize({ width: w, withoutEnlargement: true });
    jobs.push(img.clone().avif({ quality: 55, effort: 6 }).toFile(join(out, `${name}-${w}.avif`)));
    jobs.push(img.clone().webp({ quality: 82 }).toFile(join(out, `${name}-${w}.webp`)));
  }
}
for (const file of await readdir("assets/logos")) {
  const { name } = parse(file);
  // sponsor marks render 28px tall; 2x is plenty.
  jobs.push(sharp(join("assets/logos", file)).resize({ height: 56 }).webp({ quality: 90 }).toFile(join(out, `${name}.webp`)));
}
// small marks: the brand icon (28px) and the two nav icons (16px), at 2x.
const icons = { "terrakube.png": 56, "slack.png": 32, "gitbooklogo.svg": 32 };
for (const [file, size] of Object.entries(icons)) {
  const { name } = parse(file);
  jobs.push(sharp(join("assets/icons", file), { density: 300 }).resize({ height: size }).webp({ quality: 90, alphaQuality: 100 }).toFile(join(out, `${name}.webp`)));
}
await Promise.all(jobs);
console.log(`optimised ${jobs.length} files into ${out}`);
