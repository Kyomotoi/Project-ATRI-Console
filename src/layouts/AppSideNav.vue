<template>
  <v-navigation-drawer v-model="isShow" class="side-nav" @update:model-value="changeState()" rail>
    <v-list-item prepend-avatar="@/assets/avatar.jpg" nav></v-list-item>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item v-for="i in topNavItems" :key="i.label" :to="i.to" :prepend-icon="i.icon">
        <v-tooltip activator="parent">{{ i.label }}</v-tooltip>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <v-list density="compact" style="margin-bottom: 46px;" nav>
        <v-list-item prepend-icon="mdi-exit-to-app" @click="doLoginOut()">
          <v-tooltip activator="parent">注销</v-tooltip>
        </v-list-item>
        <v-list-item prepend-icon="mdi-cog-outline" to="/settings">
          <v-tooltip activator="parent">WebUI 设置</v-tooltip>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { GlobalAppStore } from '@/store/app'
import { ToastWrapper } from '@/core/notification';

export default {
  name: 'AppSideNav',
  data: () => ({
    showNav: true,
    topNavItems: [
      {
        label: '首页', icon: 'mdi-home-outline', to: '/',
      },
      {
        label: '控制中心', icon: 'mdi-tune', to: '/control',
      },
      {
        label: '用户管理', icon: 'mdi-account-edit', to: '/manage',
      },
      {
        label: '聊天', icon: 'mdi-message-outline', to: '/chat',
      }
    ]
  }),
  methods: {
    changeState() {
      GlobalAppStore().showNav = !this.showNav;
      this.showNav = GlobalAppStore().showNav;
    },

    doLoginOut() {
      const log = new ToastWrapper('core')

      const noATRI = GlobalAppStore().noATRI;
      if (!noATRI) {
        localStorage.clear();
        GlobalAppStore().noATRI = true;
        this.$router.push('/');
        log.success('注销成功');
      } else {
        log.warn('当前未连接任何 ATRI 实例');
      }
    }
  },
  computed: {
    isShow() {
      return GlobalAppStore().showNav;
    }
  },
}
</script>

<style>
.side-nav {
  top: 22px !important;
  height: 100% !important;
  background: rgba(var(--v-theme-on-surface-variant)) !important;
}

.v-navigation-drawer__scrim {
  overflow-y: auto !important;
}</style>
