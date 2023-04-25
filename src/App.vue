<template>
  <v-app>
    <AppTopBar />
    <AppSideNav />
    <div :class="isShowNav"
      style="background: #f7f7f7; padding-bottom: 24px; overflow-x: hidden; overflow-y: auto; min-height: 0">
      <router-view />
    </div>
    <AppStatBar />
  </v-app>
</template>

<script lang="ts" setup>
import AppTopBar from './layouts/AppTopBar.vue';
import AppSideNav from './layouts/AppSideNav.vue';
import AppStatBar from './layouts/AppStatBar.vue';

import { computed } from 'vue';
import { GlobalAppStore } from '@/store/app';

let isShowNav = computed(() => {
  return GlobalAppStore().showNav ? "cont h-screen w-100" : "h-screen w-100"
})
</script>

<style>
@import 'vue3-toastify/dist/index.css';

.v-list .v-list-item--nav:not(:only-child) {
  margin-bottom: 0 !important;
}

.cont {
  padding-left: 0;

  transition: padding-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
@media screen and (min-width: 1280px) {
  .cont {
    padding-left: 56px;
  }
}

@media screen and (max-width: 900px) {
  .Toastify__toast-container {
    margin-bottom: 24px;
  }
}
</style>
