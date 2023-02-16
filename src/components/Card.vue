<script setup lang="ts">

import {ICoin} from "@/interfaces/ICoin";
import {formatPrice} from "@/utils/utils";

defineProps<{ coin: ICoin }>()

</script>

<template>
  <div class="flex md:items-center md:justify-center order-1 xl:justify-start">
    <img :src="coin.icon" :alt="coin.name" class="self-start">
    <div class="flex flex-col ml-4">
      <span class="block text-lg font-bold text-alpha-700">{{ coin.name }}</span>
      <span class="block text-alpha-200 text-sm">{{ coin.base_symbol }}</span>
      <span class="block mt-4 text-3xl font-semibold text-gray-900">{{
          formatPrice(coin.ask, coin.decimals, 'USD')
        }}</span>
    </div>
  </div>
</template>

<style scoped>
</style>