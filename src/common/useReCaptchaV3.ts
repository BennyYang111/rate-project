import type { IReCaptchaComposition } from 'vue-recaptcha-v3'
export async function useReCaptchaV3(useReCaptcha: IReCaptchaComposition) {
  const { executeRecaptcha, recaptchaLoaded } = useReCaptcha
  await recaptchaLoaded()
  const token = await executeRecaptcha('login')
  console.log(token)
}
