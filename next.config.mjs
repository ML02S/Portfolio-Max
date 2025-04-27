import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  trailingSlash: true,
  output: 'export',
  images: {
    unoptimized: true, // ✅ Zet image optimization uit voor statische export
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
