<template>
  <v-hover close-delay="50" v-slot="{ isHovering, props }">
    <v-card class="tip-card ma-2 pa-5 h-100" v-bind="props" :elevation="isHovering ? 5 : 0" @click="dialog = !dialog">
      <div style="font-weight: 600;">连接实例</div>
      <div class="mt-2 text-body-2 font-weight-thin">
        连接 ATRI 实例，<br />
        开启 WebUI 之旅。
      </div>
    </v-card>
  </v-hover>

  <v-dialog v-model="dialog" persistent width="512">
    <v-card>
      <div v-if="debug" class="debug-tip">已启用 DEBUG 模式</div>

      <v-card-title>
        <span class="text-h5">WebUI Auth</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="auth.token" label="请键入密钥" hint="请键入来自 ATRI 的密钥" variant="underlined"
                :rules="auth.rules" :append-icon="auth.showToken ? 'mdi-eye' : 'mdi-eye-off'"
                :type="auth.showToken ? 'text' : 'password'"
                @click:append="auth.showToken = !auth.showToken"></v-text-field>
            </v-col>
            <v-col v-if="debug" cols="12">
              <v-text-field v-model="auth.host" label="请键入 Host" hint="请键入 ATRI 设置中的 Host" variant="underlined"
                :rules="auth.rules"></v-text-field>
            </v-col>
            <v-col v-if="debug" cols="12">
              <v-text-field v-model="auth.port" label="请键入 Port" hint="请键入 ATRI 设置中的 Port" variant="underlined"
                :rules="auth.rules"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red-accent-2" variant="text" @click="debug = !debug">
          DEBUG
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          取消
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="doConnect()">
          连接
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export default {
  data: () => {
    return {
      dialog: false,
      debug: false,
      auth: {
        rules: [(value: any) => !!value || '必要'],
        showToken: false,
        token: '',
        host: '',
        port: '',
      }
    }
  },
  methods: {
    async doConnect() {
      const log = new ToastWrapper('connect')

      const { token, host, port } = this.auth;

      const errorMessages = [];

      if (!token) {
        errorMessages.push('缺少所需密钥');
      }

      if (this.debug) {
        if (!host) {
          errorMessages.push('缺少 Host');
        } else {
          localStorage.setItem('host', host);
        }
        if (!port) {
          errorMessages.push('缺少 Port');
        } else {
          localStorage.setItem('port', port);
        }
      }

      if (errorMessages.length > 0) {
        errorMessages.forEach(errorMessage => log.error(errorMessage));
        return;
      }

      const api = new API(token, this.debug);
      try {
        const result = await api.auth();
        if (result) {
          this.dialog = false;
          useAppStore().noATRI = false;
          localStorage.setItem('isDebug', this.debug ? 'y' : 'n');
          localStorage.setItem('token', token);
          log.success('连接成功');
        }
      } catch (error: any) {
        log.error(error.message);
      }
    }
  },
  watch: {
    debug() {
      const log = new ToastWrapper('connect')
      if (this.debug) {
        log.warn('已启用 DEBUG');
      }
      useAppStore().isDebug = this.debug
    }
  }
}
</script>

<script lang="ts" setup>
import { useAppStore } from '@/store/app';

import { API } from '@/core/api/index';
import { ToastWrapper } from '@/core/notification';
</script>

