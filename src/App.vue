<template>
  <v-app>
    <v-app-bar
      app
      flat
    >
      <v-app-bar-nav-icon>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar-nav-icon>

      <v-app-bar-title>Console for ATRI</v-app-bar-title>

      <div v-if="is_debugging">
        <v-lazy>
          <v-chip
            class="ma-2"
            color="#64B5F6"
            text-color="white"
          >DEBUG MODE</v-chip>
        </v-lazy>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/Kyomotoi/ATRI"
        target="_blank"
        text
      >
        <!-- <span class="mr-2">GitHub</span> -->
        <v-icon>mdi-github</v-icon>
      </v-btn>

      <v-btn
        href="https://jq.qq.com/?_wv=1027&k=WoAAYXbJ"
        target="_blank"
        text
      >
        <!-- <span class="mr-2">Chat</span> -->
        <v-icon>mdi-qqchat</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      app
      v-model="drawer"
      class="nd-0"
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group active-class="nattier-blue--text text--accent-4">
          <router-link
            to="/home"
            tag="v-list-item-title"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>主页 | Home</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link
            to="/control"
            tag="v-list-item-title"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-wrench</v-icon>
              </v-list-item-icon>
              <v-list-item-title>控制面板 | Control</v-list-item-title>
            </v-list-item>
          </router-link>

          <router-link
            to="/chat"
            tag="v-list-item-title"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-comment-processing</v-icon>
              </v-list-item-icon>
              <v-list-item-title>聊天 | Chat</v-list-item-title>
            </v-list-item>
          </router-link>

          <v-container>
            <v-divider></v-divider>
          </v-container>

          <v-list-item @click="LoginOut">
            <v-list-item-icon>
              <v-icon>mdi-run-fast</v-icon>
            </v-list-item-icon>
            <v-list-item-title>注销并回到登陆页</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <v-lazy>
          <router-view></router-view>
        </v-lazy>
      </v-container>
    </v-main>

    <v-footer app>
      <v-divider></v-divider>
      <v-container fluid>
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            class="text-center"
            cols="auto"
          >
            <span>
              {{ new Date().getFullYear() }} &copy; Made by
              <strong>
                <a
                  class="kyogit"
                  href="https://github.com/Kyomotoi"
                >Kyomotoi</a>
              </strong>
              with ❤️
            </span>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  created() {
    document.title = "Console";

    if (localStorage.getItem("IsDebug") != "y") {
      localStorage.removeItem("IsDebug");
    }
  },

  data: () => ({
    drawer: false,
    is_debugging: false,
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

    function check_in_debugging() {
      _this.is_debugging =
        localStorage.getItem("IsDebug") === "y" ? true : false;
    }

    function check_auth() {
      let url = `${domain}/capi/auth?token=${token}`;
      _this
        .$axios({
          methods: "get",
          url: url,
          headers: {
            "content-type": "application/json",
          },
        })
        .then((resp) => {
          let d = resp.data;
          if (d.status != 200 && d.detail != "OK") {
            _this.$toastr.error("", "实例出现问题");
            localStorage.removeItem("Authorization");
            localStorage.removeItem("IsDebug");
            localStorage.removeItem("Host");
            localStorage.removeItem("Port");
            _this.$router.push("/login");
          }
        });
    }

    setInterval(check_in_debugging, 5000);
    setInterval(check_auth, 5000);
  },

  methods: {
    LoginOut() {
      let token = localStorage.getItem("Authorization");
      if (token === null || token === "") {
        this.$toastr.warning("", "请先验证");
      } else {
        localStorage.removeItem("Authorization");
        localStorage.removeItem("IsDebug");
        localStorage.removeItem("Host");
        localStorage.removeItem("Port");
        this.$toastr.warning("", "已注销");
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>

<style scoped>
.kyogit {
  color: #00000099;
}

.nd-0 {
  background-image: url("assets/nd-bg.png");
}
</style>
