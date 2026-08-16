// Build step for the portfolio.
//
// The design export tool rewrites index.html and the .jsx files at the repo
// root, so this script treats those as read-only source and emits a separate
// dist/. That way a re-export never clobbers the build config, and the build
// simply adapts to whatever the export produced.
//
// What it does:
//   1. Compiles each .jsx to plain JS  -> removes Babel standalone (3.06 MB)
//   2. Builds a Tailwind stylesheet     -> removes the CDN runtime (398 KB)
//   3. Rewrites index.html to point at React production builds (saves ~1 MB)
//   4. Copies assets/ through untouched
//
// tweaks-panel.jsx stays in the output: App() calls useTweaks() and renders
// <TweaksPanel>, so removing it would break the page. It is 24 KB and renders
// nothing unless the design host activates it, which is a fair trade next to
// the 3 MB Babel saving.

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { cpSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync, existsSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Short content hash, so every build that changes a file changes its URL.
// Without this the browser happily serves a cached bundle after a deploy and
// the site looks stale for as long as max-age allows.
const hashOf = (path) =>
  createHash("sha256").update(readFileSync(path)).digest("hex").slice(0, 10);

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "dist");

// Runtime scripts that ship, in load order. Order matters: these compile to
// classic scripts sharing global scope, and app.jsx depends on globals that
// tweaks-panel.jsx and core.jsx assign to window.
const ENTRIES = ["tweaks-panel.jsx", "halo-portfolio-core.jsx", "halo-portfolio-app.jsx"];

const REACT_PROD = {
  "https://unpkg.com/react@18.3.1/umd/react.development.js":
    "https://unpkg.com/react@18.3.1/umd/react.production.min.js",
  "https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js":
    "https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js",
};

const kb = (n) => (n / 1024).toFixed(1) + " KB";

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

// ---------------------------------------------------------------- 1. compile
// The .jsx files share one scope in the browser today (Babel concatenates them
// into the global scope), so they are compiled individually and loaded in the
// same order as classic scripts. No modules, no bundler, same semantics.
// Maps the plain output name to its hashed filename, for rewriting index.html.
const hashedName = {};

for (const file of ENTRIES) {
  const plain = file.replace(/\.jsx$/, ".js");
  const out = join(dist, plain);
  execFileSync(
    "npx",
    ["babel", join(root, file), "--presets", "@babel/preset-react", "--out-file", out],
    { stdio: "inherit", cwd: root },
  );
  const size = statSync(out).size;
  const final = plain.replace(/\.js$/, `.${hashOf(out)}.js`);
  renameSync(out, join(dist, final));
  hashedName[plain] = final;
  console.log(`  compiled ${file} -> ${final} (${kb(size)})`);
}

// --------------------------------------------------------------- 2. tailwind
const cssOut = join(dist, "styles.css");
execFileSync(
  "npx",
  ["tailwindcss", "-c", "tailwind.config.js", "-i", "tailwind.src.css", "-o", cssOut, "--minify"],
  { stdio: "inherit", cwd: root },
);
const cssSize = statSync(cssOut).size;
const cssFinal = `styles.${hashOf(cssOut)}.css`;
renameSync(cssOut, join(dist, cssFinal));
console.log(`  tailwind -> ${cssFinal} (${kb(cssSize)})`);

// ------------------------------------------------------------------- 3. html
let html = readFileSync(join(root, "index.html"), "utf8");

for (const [dev, prod] of Object.entries(REACT_PROD)) {
  if (!html.includes(dev)) throw new Error(`index.html no longer references ${dev}`);
  html = html.replace(dev, prod);
}

// The integrity hashes belong to the dev builds; they would block the prod ones.
html = html.replace(/\s+integrity="[^"]*"/g, "");

// Drop Babel standalone entirely - nothing left to compile at runtime.
html = html.replace(/\s*<script[^>]*babel\/standalone[^>]*><\/script>/g, "");
if (/babel\/standalone/.test(html)) throw new Error("Babel standalone still referenced");

// Swap the Tailwind CDN runtime compiler for the built stylesheet.
html = html.replace(
  /\s*<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>/,
  `\n<link rel="stylesheet" href="${cssFinal}" />`,
);
if (/cdn\.tailwindcss\.com/.test(html)) throw new Error("Tailwind CDN still referenced");

// Point each text/babel .jsx tag at its compiled .js. Anything the export adds
// that this build does not know how to compile is a hard error rather than a
// silently dropped script.
html = html.replace(
  /\s*<script type="text\/babel"[^>]*src="([^"]+)\.jsx"><\/script>/g,
  (match, name) => {
    if (!ENTRIES.includes(`${name}.jsx`)) {
      throw new Error(`index.html loads ${name}.jsx, which is not in ENTRIES - add it to build.mjs`);
    }
    return `\n<script src="${hashedName[`${name}.js`]}"></script>`;
  },
);
if (/text\/babel/.test(html)) throw new Error("A text/babel script survived");
// Guard against an unhashed reference slipping through - that is exactly how a
// deploy ends up serving a stale bundle from cache.
for (const plain of Object.keys(hashedName)) {
  if (html.includes(`"${plain}"`)) throw new Error(`index.html still references unhashed ${plain}`);
}
if (html.includes('"styles.css"')) throw new Error("index.html still references unhashed styles.css");

writeFileSync(join(dist, "index.html"), html);
console.log(`  index.html -> ${kb(Buffer.byteLength(html))}`);

// ----------------------------------------------------------------- 4. assets
if (existsSync(join(root, "assets"))) {
  cpSync(join(root, "assets"), join(dist, "assets"), { recursive: true });
  console.log("  copied assets/");
}

console.log("build ok");
