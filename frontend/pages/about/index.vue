<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="py-8 sm:py-12 md:py-16 lg:py-20">
      <div class="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div class="mx-auto max-w-3xl text-center">
          <TypeEffect />
          <!-- <h1 class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Meeting Scheduler System</h1> -->
          <p class="mt-4 text-lg text-muted-foreground sm:mt-6 sm:text-xl md:mt-8 md:text-2xl">
            Effortlessly schedule and manage your meetings with our powerful platform.
          </p>
        </div>
      </div>
    </header>
    <section class="py-12 sm:py-16 md:py-20 lg:py-24">
      <div class="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <div class="mx-auto max-w-6xl">
          <h2 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Key Features</h2>
          <p class="mt-4 text-lg text-muted-foreground sm:mt-6 sm:text-xl md:mt-8 md:text-2xl">
            Discover the powerful features that make our Meeting Scheduler System the perfect solution for your team.
          </p>
          <div class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div class="rounded-lg bg-card p-6 shadow-md transition-all hover:bg-card-hover hover:shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
              </div>
              <h3 class="mt-4 text-xl font-bold">Easy Meeting Scheduling</h3>
              <p class="mt-2 text-muted-foreground">Quickly schedule meetings with a user-friendly interface.</p>
            </div>
            <div class="rounded-lg bg-card p-6 shadow-md transition-all hover:bg-card-hover hover:shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
                  <path
                    d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z">
                  </path>
                  <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"></path>
                </svg>
              </div>
              <h3 class="mt-4 text-xl font-bold">Email Notifications</h3>
              <p class="mt-2 text-muted-foreground">
                Automatic email notifications to participants for meeting confirmations, reminders, and updates.
              </p>
            </div>
            <div class="rounded-lg bg-card p-6 shadow-md transition-all hover:bg-card-hover hover:shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 class="mt-4 text-xl font-bold">Real-Time Availability</h3>
              <p class="mt-2 text-muted-foreground">
                Check real-time availability of participants to find the best meeting times.
              </p>
            </div>
            <div class="rounded-lg bg-card p-6 shadow-md transition-all hover:bg-card-hover hover:shadow-lg">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
                  <path d="M12 2v10"></path>
                  <path d="M18.4 6.6a9 9 0 1 1-12.77.04"></path>
                </svg>
              </div>
              <h3 class="mt-4 text-xl font-bold">Customizable Settings</h3>
              <p class="mt-2 text-muted-foreground">Configure meeting durations, buffer times, and no</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped>
.container {
  @apply mx-auto px-4 py-10;
}

.space-y-2>*+* {
  @apply mt-2;
}
</style>