import type { NuxtPage } from 'nuxt/schema';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Run Preservation Project',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        {
          rel: 'icon',
          type: 'image/ico',
          href: '/favicon.ico',
        },
      ],
    },
  },

  css: ['@/assets/css/styles.scss'],

  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    'nuxt-gtag',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-vuefire',
  ],

  colorMode: {
    classSuffix: '',
  },

  googleFonts: {},

  gtag: {
    id: 'G-QNLZ5NY7HH',
  },

  eslint: {
    config: {
      stylistic: true,
    },
  },

  vuefire: {
    auth: {
      enabled: true,
    },
    config: {
      apiKey: 'AIzaSyDG4Hv7zeZ4bVaZqGvrFFXEaTRE8CSJVfg',
      authDomain: 'run-preservation-project-cdfe2.firebaseapp.com',
      projectId: 'run-preservation-project-cdfe2',
      storageBucket: 'run-preservation-project-cdfe2.appspot.com',
      messagingSenderId: '787553848265',
      appId: '1:787553848265:web:891e05e1034952da7ab618',
      measurementId: 'G-YVXK8DRF9B',
    },
  },

  hooks: {
    'pages:extend'(pages) {
      function setMiddleware(pages: NuxtPage[]) {
        for (const page of pages) {
          if (page.name !== 'index') {
            page.meta ||= {};
            page.meta.middleware = ['auth'];
          }
          if (page.children) {
            setMiddleware(page.children);
          }
        }
      }
      setMiddleware(pages);
    },
  },

  compatibilityDate: '2024-09-08',
});
