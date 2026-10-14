import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const siteUrl = process.env.VITE_SITE_URL || 'https://antika-factory.netlify.app';

const robotsTxtContent = `User-agent: *
Disallow: /admin/
Allow: /
Allow: /llms.txt

Sitemap: ${siteUrl}/sitemap.xml
`;

// Write robots.txt to dist folder
const distPath = path.join(__dirname, 'dist');
const robotsPath = path.join(distPath, 'robots.txt');

// Ensure dist directory exists
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

fs.writeFileSync(robotsPath, robotsTxtContent, 'utf-8');
console.log('✅ robots.txt generated successfully in dist/');
console.log(`📍 Location: ${robotsPath}`);
console.log(`🌐 Site URL: ${siteUrl}`);
