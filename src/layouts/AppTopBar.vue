<template>
  <v-dialog v-model="dialog" class="h-100" transition="dialog-top-transition" width="auto">
    <div class="d-flex justify-center">
      <v-card>
        <v-toolbar style="color: white;" color="#00c3eb" title="关于 ATRI WebUI"></v-toolbar>
        <div class="pa-5">
          <div class="d-flex justify-center text-h6">
            アトリは、高性能ですから！
          </div>

          <v-list lines="one">
            <v-list-item v-for="i in aboutInfos" :key="i.title" :title="i.title" :subtitle="i.subtitle"></v-list-item>
          </v-list>
        </div>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="dialog = false">CLOSE</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-dialog>

  <v-system-bar class="top-bar">
    <div style="z-index: 1;">
      <button class="mr-4" @click="showNav = !showNav">
        <v-avatar image="@/assets/logo-1.png" size="20"></v-avatar>
      </button>
      <button class="top-btn" @click="dialog = true">About</button>
    </div>
    <div class="position-absolute w-100 d-flex justify-center">{{ title }}</div>
    <v-spacer></v-spacer>
  </v-system-bar>
</template>

<script lang="ts">
import { useAppStore } from '@/store/app';

export default {
  name: 'AppTopBar',
  data: () => ({
    dialog: false,
    showNav: true,
    aboutInfos: [
      {
        title: '114514',
        subtitle: '1145141919',
      },
    ],
  }),
  computed: {
    title() {
      return `ATRI WebUI - ${useAppStore().stepNow}`;
    }
  },
  watch: {
    showNav() {
      useAppStore().showNav = this.showNav;
    }
  }
}
</script>

<style>
.top-bar {
  padding-inline-end: 0 !important;
  position: relative !important;
}

.top-btn {
  border-radius: 10%;
  transition: background .1s;
}

.top-btn:hover {
  background: #cccccc;
}
</style>
