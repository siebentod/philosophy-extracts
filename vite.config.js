import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';
import { data } from './src/data';

const dynamicRoutes = [
  ...data.map((ar) => `/text/${ar.id}`),
  ...data.map((ar) => `/author/${ar.author}`),
];

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://philosophy-extracts.vercel.app/',
      dynamicRoutes,
    }),
  ],
});
