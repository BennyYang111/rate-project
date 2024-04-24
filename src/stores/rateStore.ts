import { defineStore } from 'pinia'
import axios from 'axios'
import type { RateDTO } from '@/views/pages/modules/RateDTO'
import type { RateOptionsDTO } from '@/views/pages/modules/RateOptionsDTO'
import { getDate } from '@/common/date'

export const useRateStore = defineStore('rateStore', {
  actions: {
    async getRate() {
      const { data } = await axios.post(
        'https://openapi.taifex.com.tw/v1/DailyForeignExchangeRates'
      )
      const todayData = await axios.post('https://tw.rter.info/capi.php')
      data.push({
        Date: getDate(0),
        'AUD/USD': (1 / todayData.data['USDAUD']['Exrate']).toFixed(6),
        'EUR/USD': (1 / todayData.data['USDEUR']['Exrate']).toFixed(6),
        'GBP/USD': (1 / todayData.data['USDGBP']['Exrate']).toFixed(6),
        'NZD/USD': (1 / todayData.data['USDNZD']['Exrate']).toFixed(6),
        'RMB/NTD': (
          1 /
          (todayData.data['USDCNY']['Exrate'] / todayData.data['USDTWD']['Exrate'])
        ).toFixed(6),
        'USD/HKD': todayData.data['USDHKD']['Exrate'].toFixed(6),
        'USD/JPY': todayData.data['USDJPY']['Exrate'].toFixed(6),
        'USD/NTD': todayData.data['USDTWD']['Exrate'].toFixed(6),
        'USD/RMB': todayData.data['USDCNY']['Exrate'].toFixed(6),
        'USD/ZAR': todayData.data['USDZAR']['Exrate'].toFixed(6)
      })

      this.rateOptions = [
        { value: 'USD', rate: 1, columName: 'USD', label: '美金' },
        {
          value: 'EUR',
          rate: todayData.data['USDEUR']['Exrate'],
          columName: 'EUR/USD',
          label: '歐元'
        },
        {
          value: 'GBP',
          rate: todayData.data['USDGBP']['Exrate'],
          columName: 'GBP/USD',
          label: '英鎊'
        },
        {
          value: 'AUD',
          rate: todayData.data['USDAUD']['Exrate'],
          columName: 'AUD/USD',
          label: '澳幣'
        },
        {
          value: 'NZD',
          rate: todayData.data['USDNZD']['Exrate'],
          columName: 'NZD/USD',
          label: '紐幣'
        }
      ]
      this.rateList = data

      console.log(this.rateList)
    }
    // async getRateOptions() {
    //   const { data } = await axios.get('https://tw.rter.info/capi.php')
    //   this.rateOptions = [
    //     { value: 'USD', rate: 1, columName: 'USD', label: '美金' },
    //     { value: 'EUR', rate: data['USDEUR']['Exrate'], columName: 'EUR/USD', label: '歐元' },
    //     { value: 'GBP', rate: data['USDGBP']['Exrate'], columName: 'GBP/USD', label: '英鎊' },
    //     { value: 'AUD', rate: data['USDAUD']['Exrate'], columName: 'AUD/USD', label: '澳幣' },
    //     { value: 'NZD', rate: data['USDNZD']['Exrate'], columName: 'NZD/USD', label: '紐幣' }
    //   ]
    // }
  },
  state() {
    return {
      rateList: [] as RateDTO[],
      rateOptions: [] as RateOptionsDTO[]
    }
  }
})
