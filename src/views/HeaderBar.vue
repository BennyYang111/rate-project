<template>
  <div class="headerBar">
    <a href="/RateAll">
      <img src="@/assets/images/logo/CDF_logo.png" />
    </a>
    <q-slide-transition>
      <ul
        class="nav-bar-list"
        :class="{ 'responsive-nav': showResponsiveNav, 'show-responsive-nav': showResponsiveNav }"
      >
        <li class="nav-item" v-for="nav in navBarList" :key="nav.id">
          <RouterLink class="nav-font" :to="nav.value"> {{ nav.label }}</RouterLink>
        </li>
      </ul>
    </q-slide-transition>
    <div class="menu-icon" @click="toggleResponsiveNav">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script setup lang="ts" name="HeaderBar">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

let navBarList = [
  { id: '1', value: '/RateAll', label: '各國匯率' },
  { id: '2', value: '/RateTWD', label: '美金、人民幣對新台幣匯率' },
  { id: '3', value: '/RateChange', label: '各國對美金匯率' }
]

let showResponsiveNav = ref(false)
let router = useRouter()

function toggleResponsiveNav() {
  showResponsiveNav.value = !showResponsiveNav.value
}

router.afterEach(() => {
  showResponsiveNav.value = false
})
</script>

<style scoped>
.headerBar {
  height: 92px;
  align-items: flex-end;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  /* background-color: brown; */
}
.nav-bar-list {
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}
.nav-item {
  min-width: max-content;
  white-space: nowrap;
  /* background-color: bisque; */
  margin-left: 20px;
  justify-content: center;
}
ul li {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}
li {
  display: flex;
}
.nav-font {
  display: list-item;
  font-size: 20px;
  color: black;
  text-decoration: none;
  margin-left: 10%;
}
.nav-font:hover {
  font-weight: 800;
  border-bottom: 3px solid black;
}
.menu-icon {
  display: none;
  cursor: pointer;
  position: absolute;
  top: 30%;
  right: 10px;
}
.menu-icon span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: black;
  margin: 5px 0;
}
.responsive-nav {
  display: none;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  z-index: 9999;
  top: calc(100% + 10px);
  left: 0;
  background-color: #f9f9f9;
  width: 60%;
  padding: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  transform: translateY(100%);
  transition: transform 0.3s ease;
}
.responsive-nav .nav-item {
  margin: 10px 0;
}
.show-responsive-nav {
  transform: translateY(0);
}
@media screen and (max-width: 768px) {
  .headerBar {
    /* flex-direction: column;
    align-items: flex-start; */

    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: relative;
    display: flex;
  }
  .nav-bar-list {
    display: none;
  }
  .menu-icon {
    display: block;
    margin-right: 10px;
  }
  .responsive-nav {
    display: flex;
  }
}
</style>
