<template>
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold mb-6">Meetings</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold">Weekly Team Sync</h2>
            <div class="flex items-center gap-2">
              <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                Reschedule
              </button>
              <button class="bg-red-500 text-white hover:bg-red-600 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 rounded-md px-3">
                Cancel
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="text-sm text-muted-foreground">Wednesday, June 28, 2023</p>
              <p class="text-sm text-muted-foreground">10:00 AM - 11:00 AM</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Meeting Room A</p>
            </div>
          </div>
          <div>
            <p class="text-sm text-muted-foreground mb-2">Participants:</p>
            <div class="flex items-center gap-2 flex-wrap max-h-20 overflow-hidden">
              <div class="flex items-center gap-2">
                <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <img class="aspect-square h-full w-full" alt="John Doe" src="../../public/placeholder-user.jpg" />
                </span>
                <span class="text-sm">John Doe</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <img class="aspect-square h-full w-full" alt="Jane Smith" src="../../public/placeholder-user.jpg" />
                </span>
                <span class="text-sm">Jane Smith</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <img class="aspect-square h-full w-full" alt="Bob Johnson" src="../../public/placeholder-user.jpg" />
                </span>
                <span class="text-sm">Bob Johnson</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <img class="aspect-square h-full w-full" alt="Sarah Lee" src="../../public/placeholder-user.jpg" />
                </span>
                <span class="text-sm">Sarah Lee</span>
              </div>
            </div>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2 mt-2">
              Show all
            </button>
            <p class="text-sm text-muted-foreground mt-2">4 participants</p>
          </div>
          <div>
            <p class="text-sm text-muted-foreground mb-2">External Participants:</p>
            <div class="flex items-center gap-2 flex-wrap max-h-20 overflow-hidden">
              <div class="flex items-center gap-2">
                <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <img class="aspect-square h-full w-full" alt="Emily Davis" src="../../public/placeholder-user.jpg" />
                </span>
                <span class="text-sm">Emily Davis</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <img class="aspect-square h-full w-full" alt="Michael Chen" src="../../public/placeholder-user.jpg" />
                </span>
                <span class="text-sm">Michael Chen</span>
              </div>
            </div>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2 mt-2">
              Show all
            </button>
            <p class="text-sm text-muted-foreground mt-2">2 external participants</p>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold">Design Review</h2>
            <div class="flex items-center gap-2">
              <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                Reschedule
              </button>
              <button class="bg-red-500 text-white hover:bg-red-600 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 rounded-md px-3">
                Cancel
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="text-sm text-muted-foreground">Friday, June 30, 2023</p>
              <p class="text-sm text-muted-foreground">2:00 PM - 3:00 PM</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Meeting Room B</p>
            </div>
          </div>
          <div>
            <p class="text-sm text-muted-foreground mb-2">Participants:</p>
            <div class="flex items-center gap-2 flex-wrap max-h-20 overflow-hidden">
              <div class="flex items-center gap-2">
                <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <img class="aspect-square h-full w-full" alt="John Doe" src="../../public/placeholder-user.jpg" />
                </span>
                <span class="text-sm">John Doe</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <img class="aspect-square h-full w-full" alt="Jane Smith" src="../../public/placeholder-user.jpg" />
                </span>
                <span class="text-sm">Jane Smith</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <img class="aspect-square h-full w-full" alt="Bob Johnson" src="../../public/placeholder-user.jpg" />
                </span>
                <span class="text-sm">Bob Johnson</span>
              </div>
            </div>
            <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2 mt-2">
              Show all
            </button>
            <p class="text-sm text-muted-foreground mt-2">3 participants</p>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow-md p-6 border-l-4 border-secondary">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-semibold">Product Roadmap</h2>
            <div class="flex items-center gap-2">
              <button class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                Reschedule
              </button>
              <button class="bg-red-500 text-white hover:bg-red-600 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 rounded-md px-3">
                Cancel
              </button>
            </div>
          </div>
          <div class="flex items-center justify-between mb-4">
            <div>
              <p class="text-sm text-muted-foreground">Monday, July 3, 2023</p>
              <p class="text-sm text-muted-foreground">4:00 PM - 5:00 PM</p>
            </div>
            <div>
              <p class="text-sm text-muted-foreground">Meeting Room C</p>
            </div>
          </div>
          <div>
            <p class="text-sm text-muted-foreground mb-2">Participants:</p>
            <div class="flex items-center gap-2 flex-wrap max-h-20 overflow-hidden">
              <div class="flex items-center gap-2">
                <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <img class="aspect-square h-full w-full" alt="John Doe" src="../../public/placeholder-user.jpg" />
                </span>
                <span class="text-sm">John Doe</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <img class="aspect-square h-full w-full" alt="Jane Smith" src="../../public/placeholder-user.jpg" />
                </span>
                <span class="text-sm">Jane Smith</span>
              </div>
              <div class="flex items-center gap-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </template>