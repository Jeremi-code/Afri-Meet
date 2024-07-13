// https://nuxt.com/docs/api/configuration/nuxt-config
import "@nuxt3/graphql-codegen-module";
export default defineNuxtConfig({
  devtools: { enabled: true },
  css:['~/assets/main.css'],
  modules: [
    "@nuxtjs/apollo",
    "@nuxt/ui",
    "@nuxt3/graphql-codegen-module",
    "@pinia/nuxt",
  ],
  apollo: {
    clients: {
      default: {
        httpEndpoint: "http://localhost:8080/v1/graphql",
        wsEndpoint: 'ws://localhost:8080/v1/graphql',
      },
    },
  },
  runtimeConfig : {
    public : {
      jwtKey : process.env.NUXT_JWT_KEY
    }
  },
  pinia: {
    storesDirs: ['./store/**']
  }
});