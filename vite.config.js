import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./",
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@theme': path.resolve(__dirname, './src/thems/alpa'),
      '~@theme/styles': path.resolve(__dirname, './src/thems/alpa/styles'),
      '~@scss/mixins': path.resolve(__dirname, './src/assets/scss/mixins'),
      '~@scss/z-index': path.resolve(__dirname, './src/assets/scss/z-index'),
      '@views': path.resolve(__dirname, './src/views'),
      '~@theme/fonts': path.resolve(__dirname, './src/thems/alpa/fonts'),
      '@plugins': path.resolve(__dirname, './src/plugins'),
      '@src': path.resolve(__dirname, './src'),
      '@ui': path.resolve(__dirname, './src/ui'),
      '@ui-kit': path.resolve(__dirname, './src/ui-kit'),
    },
  },
})
