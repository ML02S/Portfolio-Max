/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Statische export-instellingen
  trailingSlash: true,  // Zorg ervoor dat de URLs eindigen op /index.html
  output: 'export',     // Dit zorgt ervoor dat de site wordt geëxporteerd als statische bestanden
};

export default nextConfig;
