<template>
  <!-- <q-carousel v-model="activeSlideIndex" style="background-color: whitesmoke"></q-carousel> -->
  <div style="background-color: aqua">
    123
    <q-carousel v-model="activeSlideIndex" style="background-color: whitesmoke"
      >55555
      <q-carousel-slide name="slide1" class="bg-primary"> 123456789 </q-carousel-slide>
      <q-carousel-slide name="slide2" class="bg-secondary"> Slide 2 </q-carousel-slide>
      <q-carousel-slide name="slide3" class="bg-tertiary"> Slide 3 </q-carousel-slide>
    </q-carousel>
  </div>
  <div class="q-pa-md q-gutter-sm">
    <div class="text-h4">各國匯率</div>
  </div>
  <div class="q-pa-md">
    <q-table :rows="rateList" :columns="columns" row-key="name" bordered> </q-table>
  </div>
</template>

<script setup lang="ts" name="RateAll">
import { computed, onBeforeMount, ref } from 'vue'
import { useRateStore } from '@/stores/rateStore'
import type { RateDTO } from './modules/RateDTO'
import { QCarousel, QCarouselSlide } from 'quasar'

const activeSlideIndex = ref(0)

let columns = [
  { name: 'Date', label: '日期', field: 'Date', sortable: true },
  { name: 'AUD/USD', label: '澳幣/美金', field: 'AUD/USD', sortable: true },
  { name: 'EUR/USD', label: '歐元/美金', field: 'EUR/USD', sortable: true },
  { name: 'GBP/USD', label: '英鎊/美金', field: 'GBP/USD', sortable: true },
  { name: 'NZD/USD', label: '紐幣/美金', field: 'NZD/USD', sortable: true },
  { name: 'RMB/NTD', label: '人民幣/台幣', field: 'RMB/NTD', sortable: true },
  { name: 'USD/HKD', label: '美金/港幣', field: 'USD/HKD', sortable: true },
  { name: 'USD/JPY', label: '美金/日圓', field: 'USD/JPY', sortable: true },
  { name: 'USD/NTD', label: '美金/新台幣', field: 'USD/NTD', sortable: true },
  { name: 'USD/RMB', label: '美金/人民幣', field: 'USD/RMB', sortable: true },
  { name: 'USD/ZAR', label: '美金/南非幣', field: 'USD/ZAR', sortable: true }
]

let rateStore = useRateStore()

const rateList = computed<RateDTO[]>(() => {
  return rateStore.rateList
})

onBeforeMount(async () => {
  await rateStore.getRate()
})
</script>

<style scoped></style>
