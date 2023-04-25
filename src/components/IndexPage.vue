<template>
  <div class="padd" style="height: 100%; overflow: auto;">
    <v-card class="w-100" variant="text">
      <div class="pa-5">
        <div style="font-size: 40px; font-weight: 300;">ATRI WebUI</div>
        <div class="mt-2" style="font-size: 15px; font-weight: 200; color: gray;">为 ATRI 而生的网页控制端，轻量、简洁。</div>

        <v-row class="mt-6 mt-lg-16 w-100 h-100" justify="start">
          <v-col v-if="noATRI" class="h-100 w-100" cols="12" :md="noATRI ? 7 : 6">
            <div class="mb-2" style="font-weight: 300;">开始</div>
            <v-row class="mt-1 ml-2 h-100" justify="start">
              <v-col class="pa-0 h-100" cols="12" sm="6">
                <AuthCard />
              </v-col>
              <v-col class="pa-0 h-100" cols="12" sm="6">
                <a href="//atri.imki.moe" target="_blank" style="text-decoration: none;">
                  <v-hover close-delay="50" v-slot="{ isHovering, props }">
                    <v-card class="tip-card ma-2 pa-5 h-100" v-bind="props" :elevation="isHovering ? 5 : 0">
                      <div style="font-weight: 600;">文档说明</div>
                      <div class="mt-2 text-body-2 font-weight-thin">
                        阅读 Project ATRI 文档，<br />
                        以了解有关 ATRI 及本 WebUI 的信息。
                      </div>
                    </v-card>
                  </v-hover>
                </a>
              </v-col>
            </v-row>
          </v-col>
          <v-col v-if="!noATRI" class="h-100 w-100" cols="12" md="6">
            <div class="mb-2" style="font-weight: 300;">概览</div>
            <v-row class="h-100" justify="center">
              <v-col class="pa0 h-100" cols="12" sm="4">
                <v-hover close-delay="50" v-slot="{ isHovering, props }">
                  <v-card class="tip-card ma-2 pa-2 h-100 w-100" v-bind="props" :elevation="isHovering ? 5 : 0"
                    variant="text">
                    <div style="font-weight: 600;">连接实例</div>
                    <div class="d-flex justify-end mt-4">
                      <div>123（个）</div>
                    </div>
                  </v-card>
                </v-hover>
              </v-col>
              <v-col class="pa0 h-100" cols="12" sm="4">
                <v-hover close-delay="50" v-slot="{ isHovering, props }">
                  <v-card class="tip-card ma-2 pa-2 h-100 w-100" :elevation="isHovering ? 5 : 0" variant="text"
                    v-bind="props">
                    <div style="font-weight: 600;">服务用户</div>
                    <div class="d-flex justify-end mt-4">
                      <div>114（位）</div>
                    </div>
                  </v-card>
                </v-hover>
              </v-col>
              <v-col class="pa0 h-100" cols="12" sm="4">
                <v-hover close-delay="50" v-slot="{ isHovering, props }">
                  <v-card class="tip-card ma-2 pa-2 h-100 w-100" :elevation="isHovering ? 5 : 0" variant="text"
                    v-bind="props">
                    <div style="font-weight: 600;">消息收发</div>
                    <div class="d-flex justify-end mt-4">
                      <div>114（收） 514（发）</div>
                    </div>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="h-100 w-100" cols="12" :md="noATRI ? 7 : 6">
            <div class="mb-2" style="font-weight: 300;">链接</div>
            <v-row class="ml-2 h-100" no-gutters>
              <v-col class="w-100" cols="6" lg="12" sm="5">
                <a class="index-a" href="//github.com/Kyomotoi/ATRI" target="_blank">
                  <v-icon class="mdi-18px">mdi-apps</v-icon>
                  <span>ATRI 项目地址</span>
                </a>
              </v-col>
              <v-col class="w-100" cols="6" lg="12" sm="5">
                <a class="index-a" href="//github.com/Kyomotoi/Project-ATRI-Console" target="_blank">
                  <v-icon class="mdi-18px">mdi-application</v-icon>
                  <span>WebUI 项目地址</span>
                </a>
              </v-col>
              <v-col class="w-100" cols="6" lg="12" sm="5">
                <a class="index-a" href="//jq.qq.com/?_wv=1027&k=WoAAYXbJ" target="_blank">
                  <v-icon class="mdi-18px">mdi-qqchat</v-icon>
                  <span>加入交流群</span>
                </a>
              </v-col>
              <v-col class="w-100" cols="6" lg="12" sm="5">
                <a class="index-a" href="//github.com/Kyomotoi/Project-ATRI-Console/issues" target="_blank">
                  <v-icon class="mdi-18px">mdi-comment-alert-outline</v-icon>
                  <span>WebUI 问题反馈</span>
                </a>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </div>
    </v-card>

    <div class="w-100" v-if="!noATRI">
      <v-divider class="mt-4 d-flex justify-center" :thickness="3"></v-divider>

      <PerformanceCards />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  computed: {
    noATRI() {
      return GlobalAppStore().noATRI;
    }
  }
}
</script>

<script lang="ts" setup>
import AuthCard from './status/AuthCard.vue';
import PerformanceCards from '@/components/status/PerformanceCards.vue';

import { GlobalAppStore } from '@/store/app';

GlobalAppStore().stepNow = '首页';
</script>

<style>
.padd {
  padding: 20px;
}

@media (max-width: 1280px) {
  .padd {
    padding: 10px;
  }
}

@media (max-width: 900px) {
  .pa0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
}

.index-a {
  color: #666666;
  text-decoration: none;
  background: transparent;
  transition: opacity 0.3s 0s ease;
}

.index-a:hover {
  filter: blur(1px);
  opacity: 0.8;
}

.index-a>.v-icon {
  margin-right: 8px;
}

a>span {
  font-size: 10px;
  font-weight: 300;
}

.tip-card {
  border: 0;
  background: white;
}

.tip-card:hover {
  background: white;
}

.debug-tip {
  color: white;
  text-align: center;
  top: 0;
  left: 0;
  right: 0;
  background: #FF5252;
}
</style>