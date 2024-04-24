/**
 * 取得日期
 * @param {string} dates 增加或減少天數
 * @returns yyyyMMdd
 */
export const getDate = (dates: number): string => {
  const today = new Date()
  const n = dates || 0
  today.setDate(today.getDate() + n)
  const year = today.getFullYear()
  const month = ('0' + (today.getMonth() + 1)).slice(-2)
  const day = ('0' + today.getDate()).slice(-2)
  const formattedDate = year + month + day
  return formattedDate
}

/**
 * 取得日期
 * @param {string} dates 增加或減少天數
 * @returns yyyy/MM/dd
 */
export const getDateWithSlash = (dates: number): string => {
  const today = new Date()
  const n = dates || 0
  today.setDate(today.getDate() + n)
  const year = today.getFullYear()
  const month = ('0' + (today.getMonth() + 1)).slice(-2)
  const day = ('0' + today.getDate()).slice(-2)
  const formattedDate = year + '/' + month + '/' + day
  return formattedDate
}
