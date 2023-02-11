<script setup lang="ts">

import PeriodList from "@/components/PeriodList.vue";

import {useRoute} from 'vue-router';
import {onMounted, ref} from 'vue'
import {generateChartOptions, generateChartData, fetchCurrency, formatPrice, createPriceAlert} from '@/utils/utils'

import 'chartjs-adapter-moment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import {Line} from 'vue-chartjs'
import {ICoinDetails} from "@/interfaces/ICoinDetails";

ChartJS.register(
    CategoryScale,
    LinearScale,
    Filler,
    TimeScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const route = useRoute();
const pair = <string>route.params.pair
const main_currency = pair.split('-')[0]
const currency = ref<ICoinDetails | null>(null);

const timeframe = ref('1D')
const data = ref<any | null>(null);
const options = ref<any | null>(null);

const email = ref('')
const limit = ref(0)
const pair_id = ref(0)
const show_success = ref(false);
const show_error = ref(false);

const onTimeFrameClick = async (value: string) => {
  timeframe.value = value
  data.value = null;
  options.value = generateChartOptions(value);
  data.value = await generateChartData(value, pair);
}

const handleAlertSubmit = async (e: any) => {
  e.preventDefault()
  const response = await createPriceAlert(email.value, limit.value ,1);
  if (response){
    show_success.value = true
  } else {
    show_error.value = true
  }
}

onMounted(async () => {
  currency.value = await fetchCurrency(main_currency);
  options.value = generateChartOptions(timeframe.value);
  data.value = await generateChartData(timeframe.value, pair);
})

</script>

<template>
  <div class="max-w-7xl mx-auto flex justify-center flex-col">

    <div v-if="currency && data"
        class="flex flex-wrap justify-between w-full p-4 my-6 bg-white rounded-md xl:px-6 xl:py-0 xl:h-20 xl:items-center md:mt-0">
      <div class="flex items-center justify-center order-1 xl:justify-start xl:w-3/12">
        <img
          :src="currency.icon" :alt="currency.name"/>
        <div class="flex flex-wrap ml-4"><span
            class="block w-full text-lg font-bold text-alpha-700">{{ currency.name }}</span>
          <span class="block text-alpha-200">{{ currency.symbol }}</span></div>
      </div>
      <div
          class="items-center justify-between order-3 hidden w-full px-1 mt-4 xl:flex xl:flex-wrap xl:order-2 xl:mt-0 xl:w-3/12">
        <span class="order-2 block font-bold text-lg xl:order-1 text-alpha-700 xl:text-left xl:w-full"><data
            data-price="379620611007.00" data-decimals="2" data-symbol="USD">{{ formatPrice(currency.market_cap, currency.decimals, 'USD') }}</data></span> <span
          class="order-1 block xl:order-2 text-alpha-200 xl:w-full xl:text-left">
                                Market Cap
                            </span></div>
      <div
          class="flex flex-col items-center justify-center order-2 px-1 xl:order-5 xl:w-1/5"><span
          class="self-end block text-lg font-bold text-alpha-700 xl:w-full xl:text-right">
        <data data-price="19163837.00"
                                                                                               data-decimals="8">{{formatPrice(currency.circulating_supply, 8, '')}}</data>
                                BTC
                            </span> <span class="self-end block text-lg text-alpha-700 xl:w-full xl:text-right">
                                Circulating Supply
                            </span></div>
    </div>
    <div v-else class="skeleton w-full p-4 my-6 bg-white rounded-md xl:px-6 xl:py-0 xl:h-20 xl:items-center md:mt-0">

    </div>

    <div class="box center">

      <PeriodList :onClick="onTimeFrameClick"/>

      <span v-if="!data || !currency"
            class="skeleton pointer-events-auto rounded-md bg-indigo-600 py-2 px-3 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500">Loading...</span>
      <Line v-else :data="data" :options="options"/>
    </div>

    <div class="mt-10 sm:mt-12">
      <form class="max-w-xl mx-auto" method="post" @submit.prevent="handleAlertSubmit">
        <span v-if="show_error" class="mb-4 border border-red-400 px-4 py-3 rounded bg-red-100 block text-red-700">Something seriously bad happened.</span>
        <span v-if="show_success" class="mb-4 border border-green-400 px-4 py-3 rounded bg-green-100 block text-green-700">Alert successfully set.</span>
        <div class="gap-4 flex-col flex lg:flex-row">
          <div class="min-w-0 flex-1">
            <label for="email" class="sr-only">Email address</label>
            <input v-model="email" required id="email" autocomplete="off" type="email" placeholder="Enter your email"
                   class="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900">
          </div>

          <div class="min-w-0 flex-1">
            <label for="price" class="sr-only">Price</label>
            <input v-model="limit" required id="price" autocomplete="off" type="number" placeholder="Enter your price point"
                   class="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900">
          </div>
          <div class="">
            <button type="submit"
                    class="block w-full py-3 px-4 rounded-md shadow bg-indigo-500 text-white font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900">
              Notify me
            </button>
          </div>
        </div>
        <p class="mt-3 text-sm text-gray-300 sm:mt-4">Get notified when the price drops, don't miss the chance of
          becoming a <strong>gazillionaire</strong>!</p>
      </form>
    </div>
  </div>
</template>

<style scoped>

.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  padding: 20px;
  position: relative;
  height: 400px;
  /*min-width: 755px;*/
}

.read-the-docs {
  color: #888;
}
</style>
