<template>
  <v-app>
    <v-card class="mx-auto my-12" align="center">
      <v-card-title>Auth System</v-card-title>

      <v-container align="center">
        <div align="left">
          Enter IP:
          <input type="text" v-model="authForm.ip" placeholder="ip" /><br />

          Enter Port:
          <input type="text" v-model="authForm.port" placeholder="port" /><br />

          Enter Token:
          <input
            type="text"
            v-model="authForm.token"
            placeholder="token"
          /><br />

          or<br />
          Enter Build Key:
          <input
            type="text"
            v-model="authForm.build_key"
            placeholder="暂时无用"
          /><br />
        </div>

        <v-divider></v-divider>

        <v-btn class="mr-2" target="_blank" text @click="authData"
          >CONNECT</v-btn
        >
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  data() {
    return {
      authForm: {
        ip: "",
        port: "",
        token: "",
        build_key: "",
      },
    };
  },

  methods: {
    ...mapMutations(["authing"]),
    authData() {
      let _this = this;
      let authData = this.authForm;

      if (!authData.ip || !authData.port || !authData.token) {
        if (!authData.build_key) {
          this.$toastr.warning("", "Missing content");
          return;
        } else {
          this.$toastr.info("", "正在向服务器发送请求...");

          this.$toastr.success("", "服务器连接成功！");
          this.$toastr.success("", "目标IP: " + "114514");
        }
        return;
      }

      var authURL =
        "http://" +
        authData.ip +
        ":" +
        authData.port +
        "/capi/auth?token=" +
        authData.token;
      this.axios({
        methods: "get",
        url: authURL,
        headers: {
          "content-type": "application/json",
        },
      }).then(function (response) {
        var d = response.data;
        if (d.status != 200 && d.msg != "ok") {
          _this.$toastr.error("", "请检查密钥是否输入正确");
          return;
        }

        _this.$toastr.success("", "验证通过");

        _this.authing({
          Authorization: _this.authForm.token,
        });

        _this.$toastr.info("", "正在跳转...");
        _this.$router.push("/home");
      });
    },
  },
};
</script>
