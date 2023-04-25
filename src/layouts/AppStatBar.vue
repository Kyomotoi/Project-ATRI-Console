<template>
  <v-navigation-drawer v-model="drawer" style="padding-bottom: 22px;" location="bottom" temporary>
    <v-card class="h-100 w-100 rounded-0">
      <div v-if="!notice" class="h-100 w-100 d-flex justify-center align-center">
        当前暂无通知
      </div>

      <div v-if="tab === '' && notice" class="h-100 w-100 d-flex justify-center align-center position-absolute">
        请选择一个项目
      </div>

      <v-tabs v-model="tab" height="35">
        <template v-for="(key, value) in notices" :key="key">
          <v-tab v-if="isHaveNotice(key)" :value="value">{{ value }}</v-tab>
        </template>
      </v-tabs>

      <v-card-text class="h-100 pr-0 pl-0 pt-0" style="padding-bottom: 37px; overflow-y: auto;">
        <v-window v-model="tab">
          <template v-for="(key, value) in notices" :key="key">
            <v-window-item :value="value">
              <template v-for="(_key, _value) in key">
                <div v-if="Object.keys(_key).length !== 0" :key="_value">
                  <v-banner v-for="i in _key" :key="i" lines="one" :color="_value.toString()" :icon="`$${_value}`">
                    <template v-slot:text>
                      {{ i.content }}
                    </template>

                    <template v-slot:actions>
                      <v-btn @click="ignoreNotice(i.id)">忽略</v-btn>
                    </template>
                  </v-banner>
                </div>
              </template>
            </v-window-item>
          </template>
        </v-window>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>

  <v-system-bar :class="style">
    <button class="info-btn" @click.stop="drawer = !drawer">
      <v-tooltip activator="parent" location="top">
        <template v-slot:activator="{ props }">
          <div v-bind="props" class="d-flex" style="font-size: 13px;">
            ⓧ&nbsp;<div>{{ noticeOverview.error }}</div>&nbsp;
            ⚠&nbsp;<div>{{ noticeOverview.warning }}</div>&nbsp;
            🛈&nbsp;<div>{{ noticeOverview.info }}</div>&nbsp;
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
import { GlobalAppStore, Notifications } from '@/store/app';
export default {
  name: 'AppStatBar',
  data: () => {
    return {
      drawer: false,
      notice: false,
      tab: '',
      tabs: [] as string[],
      noticeOverview: {
        error: 0,
        warning: 0,
        info: 0,
      }
    }
  },
  computed: {
    style(): string {
      return GlobalAppStore().noATRI ? 'bot-bar' : 'bot-bar is-online';
    },
    notices(): any {
      const notices = Notifications().notices;
      if (Object.keys(notices).length !== 0) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.notice = true;
      }
      this.updateTabsAndOverview();
      return notices;
    },
  },
  methods: {
    updateTabsAndOverview() {
      this.tabs = [];
      this.noticeOverview.info = 0;
      this.noticeOverview.warning = 0;
      this.noticeOverview.error = 0;

      const notices = this.notices;
      for (const notice in notices) {
        for (const infoLevel in notices[notice]) {
          if (infoLevel === 'info') {
            this.noticeOverview.info += notices[notice][infoLevel].length;
          } else if (infoLevel === 'error') {
            this.noticeOverview.error += notices[notice][infoLevel].length;
          } else if (infoLevel === 'warning') {
            this.noticeOverview.warning += notices[notice][infoLevel].length;
          }
        }

        const detail = notices[notice];
        if (
          !this.tabs.includes(notice)
          && (
            detail.error.length !== 0 ||
            detail.warning.length !== 0 ||
            detail.info.length !== 0
          )
        ) {
          this.tabs.push(notice);
        }
      }
    },
    isHaveNotice(v: any): boolean {
      const haveNotice = (
        Object.keys(v.info).length !== 0 ||
        Object.keys(v.warning).length !== 0 ||
        Object.keys(v.error).length !== 0
      );
      if (this.tabs.length === 0) {
        this.notice = false
      }
      if (!haveNotice) {
        this.tab = this.tabs.length !== 0 ? this.tabs[0] : '';
      }
      return haveNotice;
    },
    ignoreNotice(id: string): void {
      const notices: any = Notifications().notices;
      for (const notice in notices) {
        for (const infoLevel in notices[notice]) {
          if (Object.keys(notices[notice][infoLevel]).length !== 0) {
            notices[notice][infoLevel] = notices[notice][infoLevel].filter(
              (item: { id: string, content: string }) => {
                return item.id !== id;
              }
            );
          }
        }
      }
    },
    tests(item: any): void {
      console.log(item)
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
