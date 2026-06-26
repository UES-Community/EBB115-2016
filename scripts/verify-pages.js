const fs = require('fs');
const path = require('path');

let errors = [];
let warnings = [];

console.log("🔍 Verifying GitHub Pages deployment configuration...");

// 1. Check next.config.ts
const configPath = path.join(process.cwd(), 'next.config.ts');
if (fs.existsSync(configPath)) {
  const content = fs.readFileSync(configPath, 'utf8');
  if (!content.includes("output: 'export'") && !content.includes('output: "export"')) {
    errors.push("next.config.ts does not set output to 'export'. This is required for static exports on GitHub Pages.");
  }
  if (!content.includes("unoptimized: true")) {
    warnings.push("next.config.ts might not have images.unoptimized set. GitHub Pages does not support Next.js default image optimization.");
  }
} else {
  errors.push("next.config.ts not found at the root of the project.");
}

// 2. Check public/.nojekyll
const nojekyllPath = path.join(process.cwd(), 'public', '.nojekyll');
if (!fs.existsSync(nojekyllPath)) {
  errors.push("public/.nojekyll is missing. GitHub Pages will ignore folders starting with underscores (like _next) if this is absent.");
}

// 3. Check .github/workflows/deploy.yml
const workflowPath = path.join(process.cwd(), '.github', 'workflows', 'deploy.yml');
if (fs.existsSync(workflowPath)) {
  const content = fs.readFileSync(workflowPath, 'utf8');
  if (content.includes("static_site_generator: next")) {
    errors.push("deploy.yml still contains 'static_site_generator: next'. This overrides your next.config.ts settings during deployment and prevents a static export.");
  }
  if (!content.includes("path: ./out") && !content.includes("path: \"./out\"")) {
    errors.push("deploy.yml upload step does not upload './out'. Ensure it points to the Next.js export directory.");
  }
} else {
  warnings.push("GitHub Pages deployment workflow (.github/workflows/deploy.yml) not found.");
}

if (errors.length > 0) {
  console.error("\n❌ GitHub Pages configuration checks failed:");
  errors.forEach(err => console.error(`  - ${err}`));
  process.exit(1);
} else {
  console.log("\n✅ GitHub Pages configuration looks correct!");
  if (warnings.length > 0) {
    console.log("\n⚠️ Warnings:");
    warnings.forEach(warn => console.log(`  - ${warn}`));
  }
  process.exit(0);
}
