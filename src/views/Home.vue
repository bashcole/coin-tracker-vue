<script setup lang="ts">
import {onMounted, ref} from "vue";
import {fetchExchangePairs} from "@/utils/utils";
import Card from "@/components/Card.vue";
import {ICoin} from "@/interfaces/ICoin";

const coins = ref<ICoin[] | null>(null);

onMounted(async () => {
  coins.value = await fetchExchangePairs();
})

</script>

<template>
  <div class="text-center">
    <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
      <span class="block xl:inline">Coin Tracker</span>
      <span class="block text-indigo-600 xl:inline"> that works</span>
    </h1>
    <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">Anim aute
      id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
      occaecat fugiat aliqua.</p>
  </div>

  <div class="mt-32">
    <h3 class="text-lg leading-6 font-medium text-gray-900">Supported currencies</h3>

    <div v-if="!coins" class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
      <div class="px-4 py-16 bg-white rounded-lg overflow-hidden skeleton" v-for="_ in 4">
      </div>

    </div>
    <dl v-else class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4">
      <router-link :to="{ name: 'Details', params: { pair: coin.symbol }}"
                   class="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6" v-for="coin in coins"
                   v-bind:key="coin.symbol">

        <Card :coin="coin"/>

      </router-link>

    </dl>
  </div>

</template>

<style scoped>
</style>
