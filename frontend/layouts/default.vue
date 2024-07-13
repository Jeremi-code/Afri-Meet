<template>
    <div class="min-h-screen flex flex-col">
        <NavBar />
        <UNotifications/>
        <div class="flex flex-col grow">
            <slot />
        </div> 
    </div>
</template>