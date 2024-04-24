<template>
  <div class="q-pa-md q-gutter-sm">
    <div class="text-h4">過去一個月美金、人民幣對新台幣匯率</div>
  </div>
  <div class="map">
    <div id="main" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script setup lang="ts" name="RateTWD">
import { onMounted } from 'vue'
import { useRateStore } from '@/stores/rateStore'
import * as echarts from 'echarts'

const rateStore = useRateStore()

onMounted(async () => {
  await rateStore.getRate()
  const filteredRates = rateStore.rateList.filter((rate) => {
    return rate['RMB/NTD'] && rate['USD/NTD']
  })

  const dateList = filteredRates.map((rate) => {
    const year = rate.Date.slice(0, 4)
    const month = rate.Date.slice(4, 6)
    const day = rate.Date.slice(6, 8)
    return year + '/' + month + '/' + day
  })
  const usdNtdList = filteredRates.map((rate) => {
    return rate['USD/NTD']
  })
  const rmbNtdList = filteredRates.map((rate) => {
    return rate['RMB/NTD']
  })

  const usdNtdNumberList = filteredRates.map((rate) => {
    return Number(rate['USD/NTD'])
  })
  const rmbNtdNumberList = filteredRates.map((rate) => {
    return Number(rate['RMB/NTD'])
  })

  const myChart = echarts.init(document.getElementById('main'))

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
        name: '美金',
        min: Math.min(...usdNtdNumberList),
        max: Math.max(...usdNtdNumberList),
        position: 'left',
        axisLabel: {
          formatter: '{value} 元'
        }
      },
      {
        type: 'value',
        name: '人民幣',
        min: Math.min(...rmbNtdNumberList),
        max: Math.max(...rmbNtdNumberList),
        position: 'right',
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
        data: usdNtdList
      },
      {
        name: '人民幣',
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        data: rmbNtdList
      }
    ]
  }

  myChart.setOption(option)
})
</script>

<style scoped></style>
