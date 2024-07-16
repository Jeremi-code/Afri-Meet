export default defineAppConfig({
  ui: {
    primary: 'lime',
    gray: 'neutral',
    icons : {
      dynamic : true
    },
    notifications : {
      position : 'top-0 bottom-auto',
      style : {
        zIndex : 999
      }
    },
    modal:{
      container:'flex min-h-full items-center sm:items-center justify-center text-center',
    }
  },

})