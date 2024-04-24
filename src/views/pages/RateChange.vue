<template>
  <q-card-section>
    <div class="q-pa-md q-gutter-sm">
      <div class="text-h4">歐元、英鎊、澳幣、紐幣對美元的當日匯率</div>
    </div>
    <div class="container">
      <div class="exchange-form">
        <div class="input-container">
          <label for="amount" class="input-label">金額:</label>
          <q-input
            outlined
            id="amount"
            class="input-field"
            v-model="amount"
            @update:model-value="convert"
            placeholder="Enter amount"
            :rules="[(val) => val > 0 || '請輸入大於0的數字']"
          />
        </div>
        <div class="input-container col">
          <label class="input-label">幣別:</label>
          <q-select
            outlined
            v-model="fromCurrency"
            :options="optionList"
            @update:model-value="changeChart(rateStore.rateList)"
            behavior="menu"
          />
        </div>
        <!-- <div class="input-container">
          <label class="input-label">To Currency:</label>
          <q-select v-model="toCurrency" :disable="true" :options="optionList" behavior="menu" />
        </div> -->
        <!-- <q-btn class="submit-button" @click="convert">Convert</q-btn> -->
        <br />
        <div v-if="convertedAmount !== null" class="result-container">
          <label class="result-label">轉換金額(美金):</label>
          <div class="result-value">{{ convertedAmount }}</div>
        </div>
      </div>
      <div class="col">
        <div class="map">
          <div id="main" style="width: 100%; height: 400px"></div>
        </div>
      </div>
    </div>
  </q-card-section>
</template>

<script setup lang="ts" name="RateChange">
import { onMounted, ref } from 'vue'
import { useRateStore } from '@/stores/rateStore'
import * as echarts from 'echarts'
import type { RateDTO } from './modules/RateDTO'
import type { RateOptionsDTO } from './modules/RateOptionsDTO'

let amount = ref(1)
let fromCurrency = ref('歐元')
let convertedAmount = ref(0)
let optionList = ref([''])

let rateStore = useRateStore()

onMounted(async () => {
  await rateStore.getRate()

  rateStore.rateOptions.splice(0, 1)

  optionList.value = rateStore.rateOptions.map((option) => {
    return option['label']
  })

  const filteredRates = rateStore.rateList.filter((rate) => {
    return rate['EUR/USD'] && rate['GBP/USD'] && rate['AUD/USD'] && rate['NZD/USD']
  })

  changeChart(filteredRates)
})

function convert() {
  const option = rateStore.rateOptions.find((option) => option.label === fromCurrency.value)
  if (option !== undefined && amount.value > 0) {
    convertedAmount.value = amount.value * (1 / option.rate)
  } else {
    convertedAmount.value = 0
  }
}

function changeChart(filteredRates: RateDTO[]) {
  const optionList: RateOptionsDTO[] = rateStore.rateOptions
  const country = optionList.find((country) => country.label === fromCurrency.value)?.columName

  const dateList = filteredRates.map((rate) => {
    const year = rate.Date.slice(0, 4)
    const month = rate.Date.slice(4, 6)
    const day = rate.Date.slice(6, 8)
    return year + '/' + month + '/' + day
  })

  const chartList = filteredRates.map((rate) => {
    if (country !== undefined) {
      return rate[country as keyof RateDTO]
    }
  })

  const chartNumberList = filteredRates.map((rate) => {
    const rateTmp = Number(rate[country as keyof RateDTO]).toFixed(6)
    return Number(rateTmp)
  })

  const existingChartElement = document.getElementById('main')
  let myChart: echarts.ECharts
  if (existingChartElement && echarts.getInstanceByDom(existingChartElement)) {
    myChart = echarts.getInstanceByDom(existingChartElement)!
  } else {
    myChart = echarts.init(document.getElementById('main'))
  }

  window.addEventListener('resize', () => {
    myChart.resize()
  })

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    legend: {},
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        data: dateList
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: fromCurrency.value,
        min: Math.min(...chartNumberList),
        max: Math.max(...chartNumberList),
        position: 'left',
        axisLabel: {
          formatter: '{value} 元'
        }
      }
    ],
    series: [
      {
        name: '美金',
        type: 'line',
        smooth: true,
        yAxisIndex: 0,
        data: chartList
      }
    ]
  }

  myChart.setOption(option)

  convert()
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
}
.exchange-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.input-container {
  margin-bottom: 20px;
}
.input-label {
  font-size: 16px;
  margin-bottom: 8px;
  color: #333;
}
.input-field {
  width: 100%;
  font-size: 16px;
  border: 0px solid #ccc;
  border-radius: 4px;
}
.submit-button {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.submit-button:hover {
  background-color: #0056b3;
}
.result-container {
  margin-top: 20px;
}
.result-label {
  font-size: 16px;
  margin-bottom: 8px;
  color: #333;
}
.result-value {
  font-size: 18px;
  font-weight: bold;
  color: #007bff;
}
</style>
