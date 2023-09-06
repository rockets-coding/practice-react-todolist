// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import react from '@vitejs/plugin-react';

// #FIXME:
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
