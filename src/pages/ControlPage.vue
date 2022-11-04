<template>
  <v-app>
    <v-card flat>
      <v-card-title>Service Control Center</v-card-title>
      <v-container>
        <v-item-group>
          <v-row>
            <v-col cols="12">
              <v-expansion-panels>
                <v-expansion-panel>
                  <v-expansion-panel-header>服务列表</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-container>
                      点击刷新
                      <v-btn
                        @click="reloadService"
                        target="_blank"
                        text
                      >
                        <v-icon>mdi-reload</v-icon>
                      </v-btn>
                    </v-container>

                    <v-row>
                      <v-col
                        cols="12"
                        sm="7"
                        md="4"
                        v-for="i in service_data"
                        :key="i.id"
                      >
                        <v-card flat>
                          <v-container>
                            <v-card-title v-text="i.service"></v-card-title>
                            <v-card-subtitle v-text="i.docs"></v-card-subtitle>
                            <v-switch
                              v-model="i.enabled"
                              :label="`Global Enabled: ${i.enabled.toString()}`"
                              @click="
                                controlServiceEnab(i.service, i.enabled)
                              "
                            ></v-switch>

                            <v-expansion-panels flat>
                              <v-expansion-panel>
                                <v-expansion-panel-header>用户禁用列表</v-expansion-panel-header>
                                <v-expansion-panel-content
                                  v-for="a in i.disable_user"
                                  :key="a"
                                >
                                  <v-container>
                                    <v-chip :ripple="false">
                                      {{ a }}
                                      <v-icon @click="
                                          editServUserDisable(
                                            i.service,
                                            a,
                                            true
                                          )
                                        ">mdi-window-close</v-icon>
                                    </v-chip>
                                  </v-container>
                                </v-expansion-panel-content>

                                <v-divider></v-divider>

                                <v-expansion-panel-content>
                                  <v-container>
                                    <v-row align="center">
                                      <div>
                                        <v-text-field
                                          label="Enter User ID"
                                          v-model="cache_text_u"
                                        ></v-text-field>
                                      </div>
                                      <v-btn
                                        target="_blank"
                                        text
                                        @click="
                                          editServUserDisable(
                                            i.service,
                                            cache_text_u,
                                            false
                                          )
                                        "
                                      >Submit</v-btn>
                                    </v-row>
                                  </v-container>
                                </v-expansion-panel-content>
                              </v-expansion-panel>

                              <v-expansion-panel>
                                <v-expansion-panel-header>群禁用列表</v-expansion-panel-header>
                                <v-expansion-panel-content
                                  v-for="a in i.disable_group"
                                  :key="a"
                                >
                                  <v-container>
                                    <v-chip :ripple="false">
                                      {{ a }}
                                      <v-icon @click="
                                          editServGroupDisable(
                                            i.service,
                                            a,
                                            true
                                          )
                                        ">mdi-window-close</v-icon>
                                    </v-chip>
                                  </v-container>
                                </v-expansion-panel-content>

                                <v-divider></v-divider>

                                <v-expansion-panel-content>
                                  <v-container>
                                    <v-row align="center">
                                      <div>
                                        <v-text-field
                                          label="Enter Group ID"
                                          v-model="cache_text_g"
                                        ></v-text-field>
                                      </div>
                                      <v-btn
                                        target="_blank"
                                        text
                                        @click="
                                          editServGroupDisable(
                                            i.service_name,
                                            cache_text_g,
                                            false
                                          )
                                        "
                                      >Submit</v-btn>
                                    </v-row>
                                  </v-container>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                            </v-expansion-panels>
                          </v-container>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel>
                  <v-expansion-panel-header>全局封禁列表</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-container>
                      点击刷新
                      <v-btn
                        @click="reloadBlockList"
                        target="_blank"
                        text
                      >
                        <v-icon>mdi-reload</v-icon>
                      </v-btn>
                    </v-container>

                    <v-card flat>
                      <v-expansion-panels flat>
                        <v-expansion-panel>
                          <v-expansion-panel-header>用户封禁列表</v-expansion-panel-header>
                          <v-expansion-panel-content
                            v-for="i in block_list_u"
                            :key="i"
                          >
                            <v-container>
                              <v-chip :ripple="false">
                                {{ i }}
                                <v-icon @click="editUserBlockList(false, i)">mdi-window-close</v-icon>
                              </v-chip>
                            </v-container>
                          </v-expansion-panel-content>

                          <v-divider></v-divider>

                          <v-expansion-panel-content>
                            <v-container>
                              <v-row align="center">
                                <div>
                                  <v-text-field
                                    label="Enter User ID"
                                    v-model="cache_text_b_u"
                                  ></v-text-field>
                                </div>
                                <v-btn
                                  target="_blank"
                                  text
                                  @click="
                                    editUserBlockList(true, cache_text_b_u)
                                  "
                                >Submit</v-btn>
                              </v-row>
                            </v-container>
                          </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                          <v-expansion-panel-header>群封禁列表</v-expansion-panel-header>
                          <v-expansion-panel-content
                            v-for="i in block_list_g"
                            :key="i"
                          >
                            <v-container>
                              <v-chip :ripple="false">
                                {{ i }}
                                <v-icon @click="editGroupBlockList(false, i)">mdi-window-close</v-icon>
                              </v-chip>
                            </v-container>
                          </v-expansion-panel-content>

                          <v-divider></v-divider>

                          <v-expansion-panel-content>
                            <v-container>
                              <v-row align="center">
                                <div>
                                  <v-text-field
                                    label="Enter Group ID"
                                    v-model="cache_text_b_g"
                                  ></v-text-field>
                                </div>
                                <v-btn
                                  target="_blank"
                                  text
                                  @click="
                                    editGroupBlockList(true, cache_text_b_g)
                                  "
                                >Submit</v-btn>
                              </v-row>
                            </v-container>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </v-card>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>
          </v-row>
        </v-item-group>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    service_data: [],
    cache_text_u: "",
    cache_text_g: "",
    block_list_u: [],
    block_list_g: [],
    cache_text_b_u: "",
    cache_text_b_g: "",
  }),

  mounted() {
    let _this = this;

    let token = localStorage.getItem("Authorization");

    let domain = "";
    let is_debug = localStorage.getItem("IsDebug");
    if (is_debug === "y") {
      let host = localStorage.getItem("Host");
      let port = localStorage.getItem("Port");
      domain = `http://${host}:${port}`;
    }

    function get_service() {
      let url = `${domain}/capi/service/list?token=${token}`;
      _this
        .$axios({
          methods: "get",
          url: url,
          headers: {
            "content-type": "application/json",
          },
        })
        .then((resp) => {
          _this.service_data = resp.data.data;
        })
        .catch(() => {
          _this.$toastr.error("", "获取服务列表失败");
        });
    }

    function get_block_list() {
      let url = `${domain}/capi/block/list?token=${token}`;
      _this
        .$axios({
          methods: "get",
          url: url,
          headers: {
            "content-type": "application/json",
          },
        })
        .then((resp) => {
          let d = resp.data.data;

          _this.block_list_u = Object.keys(d.user);
          _this.block_list_g = Object.keys(d.group);
        })
        .catch(() => {
          _this.$toastr.error("", "获取全局黑名单列表失败");
        });
    }

    get_service();
    get_block_list();
  },

  methods: {
    getToken() {
      return localStorage.getItem("Authorization");
    },

    isDebug() {
      let domain = "";
      let is_debug = localStorage.getItem("IsDebug");
      if (is_debug === "y") {
        let host = localStorage.getItem("Host");
        let port = localStorage.getItem("Port");
        domain = `http://${host}:${port}`;
      }
      return domain;
    },

    reloadService() {
      let url = `${this.isDebug()}/capi/service/list?token=${this.getToken()}`;
      this.$axios({
        methods: "get",
        url: url,
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => {
          this.service_data = resp.data.data;
          this.$toastr.success("", "刷新成功");
        })
        .catch(() => {
          this.$toastr.error("", "获取服务列表失败");
        });
    },

    reloadBlockList() {
      let url = `${this.isDebug()}/capi/block/list?token=${this.getToken()}`;
      this.$axios({
        methods: "get",
        url: url,
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => {
          let d = resp.data.data;

          this.block_list_u = Object.keys(d.user);
          this.block_list_g = Object.keys(d.group);
          this.$toastr.success("", "刷新成功");
        })
        .catch(() => {
          this.$toastr.error("", "获取全局黑名单列表失败");
        });
    },

    controlServiceEnab(serve, is_enab) {
      let enab = is_enab ? 1 : 0;

      let url = `${this.isDebug()}/capi/service/edit?token=${this.getToken()}&service=${serve}&global_enabled=${enab}`;
      this.$axios({
        methods: "get",
        url: url,
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => {
          if (resp.data.status != 200) {
            this.$toastr.error("", "提交修改失败");
            return;
          }
        })
        .cache(() => {
          this.$toastr.error("", "请求出错");
        });
    },

    editServUserDisable(serve, user_id, is_enab) {
      let _this = this;

      if (!user_id) {
        this.$toastr.warning("", "缺少必要信息");
        return;
      }

      let enab = is_enab ? 1 : 0;

      let url = `${this.isDebug()}/capi/service/edit?token=${this.getToken()}&service=${serve}&enabled=${enab}&user=${user_id}`;
      this.$axios({
        methods: "get",
        url: url,
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => {
          if (resp.data.status != 200) {
            this.$toastr.error("", "提交修改失败");
            return;
          }

          let u = _this.service_data[serve].disable_user;
          is_enab ? u.splice(u.indexOf(user_id), 1) : u.push(user_id);
          _this.service_data[serve].disable_user = u;
        })
        .cache(() => {
          this.$toastr.error("", "请求出错");
        });
    },

    editServGroupDisable(serve, group_id, is_enab) {
      let _this = this;

      if (!group_id) {
        this.$toastr.warning("", "缺少必要信息");
        return;
      }

      let enab = is_enab ? 1 : 0;

      let url = `${this.isDebug()}/capi/service/edit?token=${this.getToken()}&service=${serve}&enabled=${enab}&group=${group_id}`;
      this.$axios({
        methods: "get",
        url: url,
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => {
          if (resp.data.status != 200) {
            this.$toastr.error("", "提交修改失败");
            return;
          }

          let g = _this.service_data[serve].disable_group;
          is_enab ? g.splice(g.indexOf(group_id), 1) : g.push(group_id);
          _this.service_data[serve].disable_group = g;
        })
        .cache(() => {
          this.$toastr.error("", "请求出错");
        });
    },

    editUserBlockList(is_enab, user_id) {
      let _this = this;

      if (!user_id) {
        this.$toastr.warning("", "缺少必要信息");
        return;
      }

      let url = `${this.isDebug()}/capi/block/edit?token=${this.getToken()}&enabled=${is_enab}&user_id=${user_id}`;
      this.$axios({
        methods: "get",
        url: url,
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => {
          if (resp.data.status != 200) {
            this.$toastr.error("", "提交修改失败");
            return;
          }

          let u = _this.block_list_u;
          is_enab ? u.push(user_id) : u.splice(u.indexOf(user_id), 1);
          _this.block_list_u = u;
        })
        .cache(() => {
          this.$toastr.error("", "请求出错");
        });
    },

    editGroupBlockList(is_enab, group_id) {
      let _this = this;

      if (!group_id) {
        this.$toastr.warning("", "缺少必要信息");
        return;
      }

      let url = `${this.isDebug()}/capi/block/edit?token=${this.getToken()}&enabled=${is_enab}&group_id=${group_id}`;
      this.$axios({
        methods: "get",
        url: url,
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => {
          if (resp.data.status != 200) {
            this.$toastr.error("", "提交修改失败");
            return;
          }

          let g = _this.block_list_g;
          is_enab ? g.push(group_id) : g.splice(g.indexOf(group_id), 1);
          _this.block_list_g = g;
        })
        .cache(() => {
          this.$toastr.error("", "请求出错");
        });
    },
  },
};
</script>
