import { cpSync, mkdirSync, writeFileSync } from "fs";

const funcDir = ".vercel/output/functions/index.func";

mkdirSync(funcDir, { recursive: true });
mkdirSync(".vercel/output/static", { recursive: true });

// Copy server bundle
cpSync("dist/server", funcDir, { recursive: true });

// Copy static client assets
cpSync("dist/client", ".vercel/output/static", { recursive: true });

// Serverless function config
writeFileSync(`${funcDir}/.vc-config.json`, JSON.stringify({
  runtime: "nodejs20.x",
  handler: "server.js",
  launcherType: "Nodejs",
  entrypoint: "server.js"
}, null, 2));

// Vercel output config
writeFileSync(".vercel/output/config.json", JSON.stringify({
  version: 3,
  routes: [
    {
      src: "/assets/(.*)",
      headers: { "cache-control": "public, max-age=31536000, immutable" },
      continue: true
    },
    { src: "/(.*)", dest: "/index" }
  ]
}, null, 2));

console.log("✓ .vercel/output assembled");