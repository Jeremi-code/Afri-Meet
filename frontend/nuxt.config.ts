// https://nuxt.com/docs/api/configuration/nuxt-config
import "@nuxt3/graphql-codegen-module";
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/apollo", "@nuxt/ui", "@nuxt3/graphql-codegen-module"],
  apollo: {
    clients: {
      default: {
        httpEndpoint: "http://localhost:8080/v1/graphql",
      },
    },
  },
});
