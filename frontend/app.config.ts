export default defineAppConfig({
  ui: {
    primary: 'lime',
    gray: 'neutral',
    icons : {
      dynamic : true
    },
    accordion : {
      wrapper: 'md:w-[550px] flex flex-col',
      container: 'md:w-[550px] flex flex-col',
      item: {
        base: '',
        size: 'text-lg',
        color: 'text-gray-500 dark:text-gray-400',
        padding: 'pt-1.5 pb-3 px-1.5',
        icon: 'ms-auto transform transition-transform duration-200',
      },
      transition: {
        enterActiveClass: 'overflow-hidden transition-[height] duration-200 ease-out',
        leaveActiveClass: 'overflow-hidden transition-[height] duration-200 ease-out',
      },
      default: {
        openIcon: 'i-heroicons-chevron-down-20-solid',
        closeIcon: '',
        class: 'md:w-[550px] mb-1.5',
        variant: 'soft',
      },
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