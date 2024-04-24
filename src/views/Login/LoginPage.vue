<template>
  <q-layout>
    <q-page-container>
      <q-page class="login-page">
        <form @submit.prevent="">
          <q-card bordered class="login-card">
            <q-card-section>
              <div class="text-h5" style="text-align: center">歡迎登入開發金點</div>
              <span>測試(Id: A123456789, password: 123456)</span>
              <br />
              <q-input
                outlined
                filled
                v-model="username"
                class="input-field"
                placeholder="輸入身分證字號"
                autocomplete="current-username"
                :rules="[(val) => val !== '' || usernameErrMsg]"
              />
              <br />
              <q-input
                outlined
                filled
                v-model="password"
                class="input-field"
                :type="showPassword ? 'text' : 'password'"
                placeholder="輸入密碼"
                autocomplete="current-password"
                :rules="[(val) => val !== '' || passwordErrMsg]"
              >
                <template v-slot:append>
                  <q-icon name="visibility_off" v-if="!showPassword" @click="showPassword = true" />
                  <q-icon name="visibility" v-else @click="showPassword = false" /> </template
              ></q-input>
              <br />
              <q-card-section style="display: flex; padding: 10px; margin-right: 10px"
                ><q-input
                  outlined
                  filled
                  v-model="captcha"
                  placeholder="輸入驗證碼"
                  :rules="[(val) => val !== '' || captchaErrMsg]"
                />
                <div class="separator"></div>
                <div class="v3-margin">
                  <!-- <button type="button" @click="useReCaptchaV3(useReCaptchaInstance)">
                    Submit to active reCAPTCHA
                  </button> -->
                  <canvas ref="canvas" width="100" height="40" class="captcha-canvas"></canvas>
                  <q-btn class="refresh-btn" @click="refreshCaptcha">Refresh</q-btn>
                </div>
              </q-card-section>
              <q-card-section>
                <div>
                  <vue-recaptcha
                    :sitekey="instance_vueRecaptchaV2.data_v2SiteKey"
                    size="normal"
                    theme="light"
                    hl="zh-TW"
                    @verify="instance_vueRecaptchaV2.recaptchaVerified"
                    @expire="instance_vueRecaptchaV2.recaptchaExpired"
                    @fail="instance_vueRecaptchaV2.recaptchaFailed"
                  />
                </div>
              </q-card-section>
              <q-card-section class="text-center">
                <q-btn
                  type="submit"
                  color="#979797"
                  text-color="black"
                  label="Login"
                  @click="login"
                  class="submit-button"
                />
              </q-card-section>
            </q-card-section>
          </q-card>
        </form>
      </q-page>
    </q-page-container>
  </q-layout>
  <!-- <div class="q-pa-md q-gutter-sm">
    <div class="login-container">
      <div class="login-content"></div>
    </div>
  </div> -->
</template>

<script setup lang="ts" name="LoginPage">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useReCaptcha } from 'vue-recaptcha-v3'
import { useReCaptchaV3 } from '@/common/useReCaptchaV3'
import vueRecaptcha from 'vue3-recaptcha2'
import { useUserStore } from '@/stores/userStore'

const username = ref('')
const usernameErrMsg = ref('請輸入身分證字號')
const passwordErrMsg = ref('請輸入密碼')
const captchaErrMsg = ref('請輸入驗證碼')
const password = ref('')
const captcha = ref('')
const router = useRouter()

const userStore = useUserStore()

let canvas = ref()
let ctx: any
let captchaText = ref('')

const showPassword = ref(false)

const useReCaptchaInstance = useReCaptcha()!

const instance_vueRecaptchaV2 = reactive({
  // 請換成你註冊的 SiteKey
  // Please change to your SiteKey.
  data_v2SiteKey: '6LcfnKspAAAAAEyK51r8Nm0CV2dGZGry03mOKBWC',
  recaptchaVerified: (response_token: string) => {
    console.log(response_token)
    // 連接後端API，給後端進行認證
    // Connect to your Backend service.
  },
  recaptchaExpired: () => {
    // 驗證過期後進行的動作
    // After recaptcha is expired, the action you can do.
    console.log('驗證過期啦！！')
  },
  recaptchaFailed: () => {
    // 驗證失敗進行的動作
    // After recaptcha is failed, the action you can do.
    alert('驗證失敗！！')
  }
})

function drawCaptcha() {
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.font = '24px Arial'
  ctx.fillText(captchaText.value, 10, 30)
}

function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

function refreshCaptcha() {
  captchaText.value = generateRandomString(6)
  drawCaptcha()
}

onMounted(() => {
  canvas.value = canvas.value || document.createElement('canvas')
  ctx = canvas.value.getContext('2d')
  refreshCaptcha()
})

function login() {
  if (username.value === '') {
    usernameErrMsg.value = '請輸入身份證字號'
    alert('請輸入身份證字號')
    refreshCaptcha()
    return
  } else {
    if (!verifyId(username.value)) {
      refreshCaptcha()
      return
    }
    if (username.value !== 'A123456789') {
      alert('身分證字號輸入錯誤')
      refreshCaptcha()
      return
    }
  }
  if (password.value === '') {
    passwordErrMsg.value = '請輸入密碼'
    alert('請輸入密碼')
    refreshCaptcha()
    return
  } else if (password.value !== '123456') {
    alert('密碼輸入錯誤')
    refreshCaptcha()
    return
  }
  if (captcha.value === '') {
    captchaErrMsg.value = '請輸入驗證碼'
    alert('請輸入驗證碼')
    refreshCaptcha()
    return
  } else if (captcha.value !== captchaText.value) {
    captchaErrMsg.value = '驗證碼輸入錯誤'
    console.log(captcha.value, captchaText.value)
    alert('驗證碼輸入錯誤')
    refreshCaptcha()
    return
  }

  console.log('Username:', username.value)
  console.log('Password:', password.value)
  console.log('CaptchaText:', captchaText)
  if (
    username.value === 'A123456789' &&
    password.value === '123456' &&
    captcha.value === captchaText.value
  ) {
    console.log('success')
    userStore.isLogin = true
    alert('登入成功！！')
    useReCaptchaV3(useReCaptchaInstance)
    router.push('/RateAll')
  } else {
    password.value = ''
    captcha.value = ''
    console.log('fail')
    refreshCaptcha()
    alert('登入失敗！！')
    router.push('/Login')
  }
}

function verifyId(id: string): boolean {
  id = id.trim()

  if (id.length != 10) {
    usernameErrMsg.value = '身份證字號長度不正確'
    alert('身份證字號長度不正確')
    return false
  }

  let countyCode = id.charCodeAt(0)
  if (countyCode < 65 || countyCode > 90) {
    usernameErrMsg.value = '身份證字號字首英文代號、縣市不正確'
    alert('身份證字號字首英文代號、縣市不正確')
    return false
  }

  let genderCode = id.charCodeAt(1)
  if (genderCode != 49 && genderCode != 50) {
    usernameErrMsg.value = '身份證字號性別代碼不正確'
    alert('身份證字號性別代碼不正確')
    return false
  }

  let serialCode: any = id.slice(2)
  for (let i in serialCode) {
    let c = serialCode.charCodeAt(i)
    if (c < 48 || c > 57) {
      usernameErrMsg.value = '身份證字號數字區出現非數字字元'
      alert('身份證字號數字區出現非數字字元')
      return false
    }
  }

  let conver = 'ABCDEFGHJKLMNPQRSTUVXYWZIO'
  let weights = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1]

  id = String(conver.indexOf(id[0]) + 10) + id.slice(1)

  let checkSum = 0
  for (let i = 0; i < id.length; i++) {
    const c = parseInt(id[i])
    const w = weights[i]
    checkSum += c * w
  }

  const verification = checkSum % 10 == 0

  return verification
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 600px;
}
.submit-button {
  width: 50%;
  margin-top: 20px;
}
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
}
.login-content {
  background-color: aqua;
  width: 400px;
  height: 300px;
}
.input-field {
  width: 100%;
  font-size: 16px;
  border: 0px solid #ccc;
  border-radius: 4px;
}
.separator {
  width: 1px;
  margin: 0 10px;
}
.v3-margin {
  margin-top: 20px;
}
.captcha-canvas {
  width: 110px;
  height: 40px;
  margin-right: 10px;
  margin-top: -5px;
  border: 1px solid #ccc; /* Add border for better visibility */
}

.refresh-btn {
  width: 100px;
  margin-top: -75px;
  margin-left: 130px;
}
</style>
