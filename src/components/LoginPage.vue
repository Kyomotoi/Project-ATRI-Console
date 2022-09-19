<template>
  <v-app>
    <v-card
      class="mx-auto my-12"
      align="center"
      width="300"
    >
      <v-card-title>Auth System</v-card-title>

      <v-container align="center">
        <v-text-field
          v-model="token"
          :append-icon="show_token ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show_token ? 'text' : 'password'"
          :disabled="is_debug"
          :rules="rules"
          label="Enter Token"
          @click:append="show_token = !show_token"
        ></v-text-field>

        <v-btn
          class="mr-2"
          target="_blank"
          text
          :disabled="is_debug"
          @click="authData"
        >CONNECT</v-btn>
      </v-container>
    </v-card>

    <div class="text-center">
      <v-menu
        v-model="is_debug"
        transition="slide-y-transition"
        offset-y
        :nudge-width="200"
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="mr-2"
            target="_blank"
            v-bind="attrs"
            v-on="on"
            text
            @click="debugTip"
          >DEBUG MODE</v-btn>
        </template>

        <v-card align="center">
          <v-card-title>Debug Config</v-card-title>

          <v-divider></v-divider>

          <v-container>
            <v-text-field
              label="Enter Host"
              v-model="host"
              clearable
              :rules="rules"
            ></v-text-field>

            <v-text-field
              label="Enter Port"
              v-model="port"
              clearable
              :rules="rules"
            ></v-text-field>

            <v-text-field
              v-model="token"
              :append-icon="show_token ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show_token ? 'text' : 'password'"
              :rules="rules"
              label="Enter Token"
              @click:append="show_token = !show_token"
            ></v-text-field>

            <v-btn
              class="mr-2"
              target="_blank"
              text
              @click="authData"
            >CONNECT</v-btn>
          </v-container>
        </v-card>
      </v-menu>
    </div>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data: () => ({
    token: "",
    show_token: false,
    is_debug: false,
    host: "",
    port: "",
    rules: [(value) => !!value || "必要"],
  }),

  methods: {
    ...mapMutations(["authing"]),
    authData() {
      let url;
      if (!this.is_debug) {
        if (!this.token) {
          this.$toastr.warning("", "缺少访问密钥");
          return;
        }
        url = `/capi/auth?token=${this.token}`;
      } else {
        if (!this.token || !this.host || !this.port) {
          this.$toastr.warning("", "缺少必要内容");
          return;
        }
        url = `http://${this.host}:${this.port}/capi/auth?token=${this.token}`;
      }

      let _this = this;

      this.$axios({
        methods: "get",
        url: url,
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => {
          let d = resp.data;
          if (d.status != 200 && d.msg != "OK") {
            _this.$toastr.warning("", "请检查密钥是否输入正确");
            return;
          }

          _this.$toastr.success("", "验证通过");
          if (_this.is_debug) {
            _this.$toastr.info("", "以 Debug 模式登入");
          }
          _this.authing({
            Authorization: _this.token,
            IsDebug: _this.is_debug ? "y" : "n",
            Host: _this.is_debug ? _this.host : "",
            Port: _this.is_debug ? _this.port : "",
          });
          _this.$router.push("/home");
        })
        .catch(() => {
          _this.$toastr.error("", "该目标不存在实例");
        });
    },

    debugTip() {
      this.is_debug = !this.is_debug;
      if (this.is_debug) {
        this.$toastr.info("", "将启用 Debug 模式");
      }
    },
  },
};
</script>
