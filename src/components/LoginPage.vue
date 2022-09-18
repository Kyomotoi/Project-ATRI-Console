<template>
  <v-app>
    <v-card
      class="mx-auto my-12"
      align="center"
    >
      <v-card-title>Auth System</v-card-title>

      <v-container align="center">
        <div align="left">
          <v-text-field
            label="Enter Token"
            v-model="token"
          ></v-text-field>
        </div>
        <v-btn
          class="mr-2"
          target="_blank"
          text
          @click="authData"
        >CONNECT</v-btn>
      </v-container>
    </v-card>

    <!-- <v-card
      class="mx-auto"
      align="center"
    > -->
    <div class="text-center">
      <v-menu
        v-model="is_debug"
        offset-y
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-bin
            color="primary"
            v-bind="attrs"
            v-on="on"
						text
          >Enabled Debug Model</v-bin>
        </template>

        <v-card>
          123
        </v-card>
      </v-menu>
      <!-- </v-card> -->
    </div>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data: () => ({
    token: "",
    is_debug: false
  }),

  methods: {
    ...mapMutations(["authing"]),
    authData() {
      let _this = this;

      if (!_this.token) {
        this.$toastr.warning("", "缺少访问密钥");
        return;
      }

      this.$axios({
        methods: "get",
        url: `/capi/auth?token=${_this.token}`,
        headers: {
          "content-type": "application/json"
        }
      })
        .then(function(resp) {
          let d = resp.data;
          if (d.status != 200 && d.msg != "OK") {
            _this.$toastr.warning("", "请检查密钥是否输入正确");
            return;
          }

          _this.$toastr.success("", "验证通过");

          let isDebug = localStorage.getItem("isDebug");
          if (isDebug) {
            _this.$toastr.info("", "以 Debug 模式登入");
          }

          _this.authing({
            Authorization: _this.token
          });
          _this.$router.push("/home");
        })
        .catch(() => {
          _this.$toastr.error("", "该目标不存在实例");
        });
    },

    ...mapMutations(["enabDebug"]),
    enabledDebugModel() {
      // let _this = this;

      if (this.is_debug) {
        this.$toastr.info("", "已启用 Debug 模式");
      }
    }
  }
};
</script>
