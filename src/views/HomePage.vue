<template>
  <q-card-section v-if="!userStore.isLogin">
    <Login />
  </q-card-section>
  <q-card-section v-if="userStore.isLogin">
    <q-card-section>
      <HeaderBar />
    </q-card-section>
    <q-separator inset></q-separator>
    <div class="content">
      <RouterView></RouterView>
    </div>
  </q-card-section>
</template>

<script setup lang="ts" name="HomePage">
import HeaderBar from './HeaderBar.vue'
import Login from '@/views/Login/LoginPage.vue'
import { useUserStore } from '@/stores/userStore'
import { RouterView } from 'vue-router'

const userStore = useUserStore()
</script>

<style scoped>
.content {
  margin: 0 auto;
  margin-top: 30px;
  border-radius: 10px;
  box-shadow: 10px 5px 5px whitesmoke;
  width: 90%;
  height: auto;
  /* border: 1px solid; */
}
</style>
