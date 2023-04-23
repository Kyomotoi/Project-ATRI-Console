<template>
  <v-navigation-drawer v-model="drawer" location="bottom" temporary>
    114514
  </v-navigation-drawer>

  <v-system-bar :class="style">
    <button class="info-btn" @click.stop="drawer = !drawer">
      <v-tooltip activator="parent" location="top">
        <template v-slot:activator="{ props }">
          <div v-bind="props" class="d-flex" style="font-size: 13px;">
            ⓧ&nbsp;<div>0</div>&nbsp;
            ⚠&nbsp;<div>0</div>&nbsp;
            ⓘ&nbsp;<div>0</div>&nbsp;
          </div>
        </template>
        信息
      </v-tooltip>
    </button>

    <v-spacer></v-spacer>

    <div class="pr-3">アトリは、高性能ですから！</div>

    <a href="//github.com/Kyomotoi/Project-ATRI-Console/issues" target="_blank">
      <button class="bot-btn">
        <v-tooltip activator="parent" location="top">
          <template v-slot:activator="{ props }">
            <v-icon v-bind="props">mdi-message-text-outline</v-icon>
          </template>
          反馈
        </v-tooltip>
      </button>
    </a>
  </v-system-bar>
</template>

<script lang="ts">
import { useAppStore } from '@/store/app'
export default {
  name: 'AppStatBar',
  data: () => {
    return {
      drawer: false,
    }
  },
  computed: {
    style() {
      return useAppStore().noATRI ? 'bot-bar' : 'bot-bar is-online';
    }
  }
}
</script>

<style>
.bot-bar {
  z-index: 114514 !important;
  top: unset !important;
  bottom: 0;
  left: 0 !important;
  width: 100% !important;
  background: #d6d6d6 !important;

  transition: background .5s;
}

.is-online {
  background: #ff7f50 !important;
}

.bot-btn {
  border-radius: 10%;
}

.bot-btn:hover,
.info-btn:hover {
  opacity: 0.5;
}
</style>
