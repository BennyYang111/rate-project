/**
 * Global error handler
 *
 * @param {*} err {Error trace}
 * @param {*} vm {Component in which error occured}
 * @param {*} info {Vue specific error information such as lifecycle hooks, events etc}
 */
// import postLog from '@/common/clientLog'

const errorHandler = (err: any, vm: any, info: any) => {
  if (info !== 'errorCaptured hook') {
    const errorType = err.errorType
    let err4Backend
    let errMsg: string
    switch (errorType) {
      default:
        err4Backend = typeof err.toServerString === 'function' ? err.toServerString() : err.stack
        errMsg = `"${err4Backend}" \n from (${info})`
        console.log(errMsg)
      // postLog(
      //   vm.$store.state.LoginStore.userInfo.userAccount,
      //   vm.functionId,
      //   vm.componentName,
      //   errMsg,
      //   new Date().toISOString()
      // );
    }
  }
}

export { errorHandler }
