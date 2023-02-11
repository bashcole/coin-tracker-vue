<script setup lang="ts">
</script>

<template>

  <div class="relative bg-gray-50 overflow-hidden flex-grow">

    <div class="relative pt-6 pb-16 sm:pb-24">
      <div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
          <nav class="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
            <div class="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
              <div class="flex items-center justify-between w-full md:w-auto">
                <router-link to="/">
                  <span class="sr-only">CoinTracker</span>
                  <img class="h-8 w-auto sm:h-10" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                       alt="">
                </router-link>
              </div>
            </div>
          </nav>
        </div>
      </div>

      <main class="mt-2 mx-auto max-w-7xl px-4 sm:mt-12">
        <router-view :key="$route.path"></router-view>
      </main>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
