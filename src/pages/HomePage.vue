<template>
  <v-app>
    <v-card flat>

      <!-- <v-row>
        <v-col> -->
      <v-row>
        <v-col>
          <v-card
            class="mx-auto"
            width="370"
            height="320"
          >
            <v-card-text>
              <strong class="text-h6">Status Overview</strong>

              <p>
                连接状态:<v-chip
                  class="ma-2"
                  :color="stat_co"
                  text-color="white"
                  x-small
                >{{ stat_str }}</v-chip><br />

                状态信息:<v-chip
                  class="ma-2"
                  :color="stat_msg_co"
                  text-color="white"
                  x-small
                >
                  {{ stat_msg_text }}
                </v-chip><br />

                实例运行时间:<v-chip
                  class="ma-2"
                  x-small
                >
                  {{ b_running_time }} of {{ p_running_time }}
                </v-chip>
              </p>

              <strong class="text-h6">Network Overview</strong>

              <p>
                环境网络-收:
                <v-chip
                  class="ma-2"
                  outlined
                  x-small
                >
                  {{ net_recv }} MB
                </v-chip><br />

                环境网络-发:
                <v-chip
                  class="ma-2"
                  outlined
                  x-small
                >
                  {{ net_sent }} MB
                </v-chip>
              </p>

              <v-divider></v-divider>

              <span class="text-caption grey--text font-weight-light">
                Status & Network Update Time: {{ stat_update_time }}
              </span><br />

              <span class="text-caption grey--text font-weight-light">
                MPR: Message Process Rate (1min)
              </span>
            </v-card-text>
          </v-card>
        </v-col>
        <!-- </v-row>

          <v-row> -->
        <v-col>
          <v-card
            class="mx-auto"
            width="370"
            height="320"
          >
            <v-card-text>
              <strong class="text-h6">Message Overview</strong>

              <p class="msg_ov_cont">
                总消息-收:
                <v-chip
                  class="ma-2"
                  outlined
                  x-small
                >
                  {{ total_r_m }} 条
                </v-chip><br />

                总消息-发:
                <v-chip
                  class="ma-2"
                  outlined
                  x-small
                >
                  {{ total_d_m }} 条
                </v-chip><br />

                消息处理失败:
                <v-chip
                  class="ma-2"
                  color="#e81c1c"
                  outlined
                  x-small
                >
                  {{ total_f_m }} 条
                </v-chip>
              </p>
            </v-card-text>

            <v-card-title>
              <v-icon class="mr-12">
                mdi-message-text
              </v-icon>

              <v-row align="start">
                <div class="text-caption grey--text text-uppercase">
                  Recv msg rate
                </div>

                <div>
                  <span
                    class="text-h3 font-weight-black"
                    v-text="rmr || '—'"
                  ></span>
                  <strong>MPR</strong>
                </div>
              </v-row>
            </v-card-title>

            <v-sheet max-height="50">
              <v-sparkline
                :key="rmr"
                :smooth="16"
                :gradient="['#f72047', '#ffd200', '#1feaea']"
                :line-width="3"
                :value="recv_msg"
                auto-draw
                stroke-linecap="round"
              ></v-sparkline>
            </v-sheet>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <v-container>
      <v-divider></v-divider>
    </v-container>

    <v-card flat>
      <v-card-title>Runtime Overview</v-card-title>
      <v-card-text>单位: %</v-card-text>
      <v-container>
        <v-card
          flat
          class="mx-auto"
        >
          <v-card-title>Bot of platform</v-card-title>
          <div
            id="bot_d"
            style="width: 100%; height: 250%"
          ></div>
        </v-card>

        <v-container>
          <v-divider></v-divider>
        </v-container>

        <v-card
          flat
          class="mx-auto"
        >
          <v-card-title>Platform</v-card-title>
          <div
            id="platform_d"
            style="width: 100%; height: 250%"
          ></div>
        </v-card>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
import * as echarts from "echarts";

export default {
  data: () => ({
    stat_co: "red",
    stat_str: "Offline",
    stat_msg_co: "red",
    stat_msg_text: "ERROR",
    stat_update_time: "updating",

    net_sent: "updating",
    net_recv: "updating",

    total_r_m: "updating",
    total_d_m: "updating",
    total_f_m: "updating",
    rmr: "0",
    recv_msg: [],

    b_running_time: "updating",
    up_time: [],
    b_db_d: {
      cpu: [],
      mem: [],
    },
    p_running_time: "updating",
    p_db_d: {
      cpu: [],
      mem: [],
      disk: [],
    },
  }),

  mounted() {
    let _this = this;

    let token = localStorage.getItem("Authorization");

    let b_docu = document.getElementById("bot_d");
    let b_c = echarts.init(b_docu);

    let p_docu = document.getElementById("platform_d");
    let p_c = echarts.init(p_docu);

    let host = localStorage.getItem("Host");
    let port = localStorage.getItem("Port");

    let moWS = null;
    let msgWS = null;

    function mainOverview() {
      let wsURL = `ws://${host}:${port}/capi/runtime?token=${token}`;
      moWS = new WebSocket(wsURL);
      moWS.onmessage = (event) => {
        _this.stat_co = "green";
        _this.stat_str = "Online";

        let data = JSON.parse(event.data);

        _this.stat_msg_text = data.status_message;
        _this.stat_msg_co = "success";

        _this.b_running_time = data.bot_info.run_time;
        _this.p_running_time = data.platform_info.boot_time;

        _this.up_time.push(new Date().toLocaleTimeString());

        let raw_b_cpu = parseFloat(data.bot_info.cpu_percent);
        let raw_b_mem = parseFloat(data.bot_info.mem_percent);
        _this.b_db_d.cpu.push(raw_b_cpu.toFixed(2));
        _this.b_db_d.mem.push(raw_b_mem.toFixed(2));

        let raw_p_cpu = parseFloat(data.platform_info.cpu_percent);
        let raw_p_mem = parseFloat(data.platform_info.mem_percent);
        let raw_p_disk = parseFloat(data.platform_info.disk_percent);
        _this.p_db_d.cpu.push(raw_p_cpu.toFixed(2));
        _this.p_db_d.mem.push(raw_p_mem.toFixed(2));
        _this.p_db_d.disk.push(raw_p_disk.toFixed(2));

        _this.net_sent = data.platform_info.net_sent;
        _this.net_recv = data.platform_info.net_recv;
      };

      moWS.onclose = () => {
        _this.$toastr.warning("", "ws连接已断开");
      };
    }

    function dealOverviewInfo() {
      if (_this.up_time.length >= 75) _this.up_time.splice(0, 1);
      if (_this.b_db_d.cpu.length >= 75) _this.b_db_d.cpu.splice(0, 1);
      if (_this.b_db_d.mem.length >= 75) _this.b_db_d.mem.splice(0, 1);

      if (_this.p_db_d.cpu.length >= 75) _this.p_db_d.cpu.splice(0, 1);
      if (_this.p_db_d.mem.length >= 75) _this.p_db_d.mem.splice(0, 1);
      if (_this.p_db_d.disk.length >= 75) _this.p_db_d.disk.splice(0, 1);

      let t = new Date();
      _this.stat_update_time = t.toLocaleString("zh-CN", {
        timeZone: "Asia/Shanghai",
      });

      let b_option = {
        title: {
          subtext: "更新间隔: 3s",
          left: "10",
        },
        legend: {
          data: ["CPU Usage", "Mem Usage"],
        },
        color: ["#93eb34", "#34c6eb"],
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        axisPointer: {
          show: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: _this.up_time,
          },
        ],
        yAxis: {
          axisLabel: {
            formatter: "{value} %",
            align: "center",
          },
        },
        series: [
          {
            name: "CPU Usage",
            type: "line",
            itemStyle: {
              color: "#93eb34",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(147,235,52,0.8)",
                },
                {
                  offset: 1,
                  color: "rgba(147,235,52,0.3)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: _this.b_db_d.cpu,
          },
          {
            name: "Mem Usage",
            type: "line",
            itemStyle: {
              color: "#34c6eb",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(52,198,235,0.8)",
                },
                {
                  offset: 1,
                  color: "rgba(52,198,235,0.3)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: _this.b_db_d.mem,
          },
        ],
      };
      b_c.setOption(b_option);
      window.onresize = b_c.resize;

      let p_option = {
        title: {
          subtext: "更新间隔: 3s",
          left: "10",
        },
        legend: {
          data: ["CPU Usage", "Mem Usage", "Disk Usage"],
        },
        color: ["#93eb34", "#34c6eb", "#ebb734"],
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        axisPointer: {
          show: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: _this.up_time,
          },
        ],
        yAxis: {
          axisLabel: {
            formatter: "{value} %",
            align: "center",
          },
          max: 100,
        },
        series: [
          {
            name: "CPU Usage",
            type: "line",
            itemStyle: {
              color: "#93eb34",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(147,235,52,0.8)",
                },
                {
                  offset: 1,
                  color: "rgba(147,235,52,0.3)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: _this.p_db_d.cpu,
          },
          {
            name: "Mem Usage",
            type: "line",
            itemStyle: {
              color: "#34c6eb",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(52,198,235,0.8)",
                },
                {
                  offset: 1,
                  color: "rgba(52,198,235,0.3)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: _this.p_db_d.mem,
          },
          {
            name: "Disk Usage",
            type: "line",
            itemStyle: {
              color: "#ebb734",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(235,183,52,0.8)",
                },
                {
                  offset: 1,
                  color: "rgba(235,183,52,0.3)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: _this.p_db_d.disk,
          },
        ],
      };
      p_c.setOption(p_option);
      window.onresize = p_c.resize;
    }

    function getMessageInfo() {
      let wsURL = `ws://${host}:${port}/capi/message?token=${token}`;
      msgWS = new WebSocket(wsURL);
      msgWS.onmessage = (event) => {
        let data = JSON.parse(event.data);

        _this.recv_msg.push(Number(data.recv_msg));
        _this.total_r_m = data.total_r_m;
        _this.total_d_m = data.total_d_m;
        _this.total_f_m = data.total_f_m;
      };
      msgWS.onclose = () => {
        _this.$toastr.warning("", "ws连接已断开");
      };
    }

    function dealMessageInfo() {
      if (_this.recv_msg.length >= 20) _this.recv_msg.splice(0, 1);

      let minMsg = 0;
      for (let i in _this.recv_msg) {
        minMsg += Number(_this.recv_msg[i]);
      }

      _this.rmr = String(minMsg ? (minMsg / 120).toFixed(2) : 0);
    }

    mainOverview();
    getMessageInfo();
    this.a = setInterval(dealOverviewInfo, 3000);
    this.b = setInterval(dealMessageInfo, 1000);
  },

  beforeDestroy() {
    window.clearInterval(this.a);
    window.clearInterval(this.b);
  },
};
</script>

<style scoped>
.text-h6 {
  color: black;
}

.msg_ov_cont {
  margin-bottom: 0px;
}
</style>
