// https://nuxt.com/docs/api/configuration/nuxt-config
import "@nuxt3/graphql-codegen-module";
export default defineNuxtConfig({
  devtools: { enabled: true },
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
      },
    },
  },
//   toast: {
//     position: 'top-center',
//     register: [ // Register custom toasts
//       {
//         name: 'my-error',
//         message: 'Oops...Something went wrong',
//         options: {
//           type: 'error'
//         }
//       }
//     ]
// }
});