import createJiti from 'jiti';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const jiti = createJiti(fileURLToPath(import.meta.url));

// Import env here to validate during build. Using jiti we can import .ts files :)
jiti('./env');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'natur-profile-images.s3.ap-southeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Add both SVG and handlebars loader rules
    config.module.rules.push(
      {
        // SVG loader rule
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        // Handlebars loader rule
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        options: {
          runtime: resolve(
            dirname(fileURLToPath(import.meta.url)),
            'node_modules',
            'handlebars'
          ),
          precompileOptions: {
            knownHelpersOnly: false,
          },
        },
      }
    );

    // Additional fix for handlebars runtime import
    config.resolve.alias = {
      ...config.resolve.alias,
      handlebars: 'handlebars/dist/handlebars.min.js',
    };

    return config;
  },
};

export default nextConfig;
