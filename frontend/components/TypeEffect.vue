<template>
    <div class="h-[43px]">
        <span class="font-bold text-4xl text-[#84CC16] ">{{ displayedText }}</span>
        <span v-if="showCursor" class="inline-block w-[1px] text-3xl bg-black ">&nbsp;</span>
    </div>
</template>

<script lang="ts" setup>
    const fullSlogan = "Afrimeet"
    const displayedText = ref('')
    const showCursor = ref(true)
    let currentIndex = ref(0);
    let typingInterval : NodeJS.Timeout;
    let cursorInterval : NodeJS.Timeout;

    const typeText = () => {
  if (currentIndex.value < fullSlogan.length) {
    displayedText.value += fullSlogan[currentIndex.value];
    currentIndex.value++;
  } else {
    clearInterval(typingInterval);
    setTimeout(() => {
      displayedText.value = '';
      currentIndex.value = 0;
      typingInterval = setInterval(typeText, 200);
    }, 1000);   
}
};
onMounted(() => {
  typingInterval = setInterval(typeText, 200);
  cursorInterval = setInterval(() => {
    showCursor.value = !showCursor.value;
  }, 500);
});

    onUnmounted(() => {
        clearInterval(typingInterval);
        clearInterval(cursorInterval);
    })

</script>