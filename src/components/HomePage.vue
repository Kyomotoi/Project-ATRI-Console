<template>
  <v-app>
    <meta
      http-equiv="Content-Security-Policy"
      content="upgrade-insecure-requests"
    />
    <v-card flat>
      <v-card-title>Status Overview</v-card-title>
      <v-container>
        <v-row>
          <v-card flat class="mx-auto">
            连接状态:<v-chip class="ma-2" :color="stat_co" text-color="white">
              {{ stat_str }}
            </v-chip>
          </v-card>

          <v-card flat class="mx-auto">
            状态信息:<v-chip class="ma-2" :color="stat_msg_co" outlined>
              <v-icon left> {{ stat_msg_icon }} </v-icon>
              {{ stat_msg_text }}
            </v-chip>
          </v-card>

          <v-card flat class="mx-auto">
            实例运行时间:<v-chip class="ma-2" color="indigo darken-3" outlined>
              <v-icon left>mdi-timelapse</v-icon>
              {{ b_running_time }}
            </v-chip>
          </v-card>

          <v-card flat class="mx-auto">
            环境运行时间:<v-chip class="ma-2" color="indigo darken-3" outlined>
              <v-icon left>mdi-timelapse</v-icon>
              {{ p_running_time }}
            </v-chip>
          </v-card>
        </v-row>
      </v-container>

      <v-container>
        <v-row>
          <v-card flat class="mx-auto">
            总消息-收:<v-chip class="ma-2" color="#65cf38" outlined>
              <v-icon left>mdi-message</v-icon>
              {{ total_r_m }} 条
            </v-chip>
          </v-card>

          <v-card flat class="mx-auto">
            总消息-处理:<v-chip class="ma-2" color="#e8b51c" outlined>
              <v-icon left>mdi-message-processing</v-icon>
              {{ total_d_m }} 条
            </v-chip>
          </v-card>

          <v-card flat class="mx-auto">
            处理失败:<v-chip class="ma-2" color="#e81c1c" outlined>
              <v-icon left>mdi-message-alert</v-icon>
              {{ total_f_m }} 条
            </v-chip>
          </v-card>
        </v-row>
      </v-container>

      <v-container>
        <v-row>
          <v-card flat class="mx-auto">
            环境网络-收:<v-chip class="ma-2" color="indigo darken-3" outlined>
              <v-icon left>mdi-download-network</v-icon>
              {{ net_inte_recv }} MB
            </v-chip>
          </v-card>

          <v-card flat class="mx-auto">
            环境网络-发:<v-chip class="ma-2" color="indigo darken-3" outlined>
              <v-icon left>mdi-upload-network</v-icon>
              {{ net_inte_send }} MB
            </v-chip>
          </v-card>
        </v-row>
      </v-container>
    </v-card>

    <v-divider></v-divider>

    <v-card flat>
      <v-card-title>Runtime Overview</v-card-title>
      <v-card-text>单位: %</v-card-text>
      <v-container>
        <v-card flat class="mx-auto">
          <v-card-title>Bot of platform</v-card-title>
          <div id="bot_d" style="width: 100%; height: 250%"></div>
        </v-card>

        <v-divider></v-divider>

        <v-card flat class="mx-auto">
          <v-card-title>Platform</v-card-title>
          <div id="platform_d" style="width: 100%; height: 250%"></div>
        </v-card>
      </v-container>
    </v-card>

    <v-divider></v-divider>

    <v-card flat>
      <v-card-title>Message Processing Overview</v-card-title>
      <v-container>
        <v-card flat class="mx-auto">
          <div id="msg_d" style="width: 100%; height: 250%"></div>
        </v-card>
      </v-container>
    </v-card>
  </v-app>
</template>

<script>
import * as echarts from "echarts";

export default {
  data: () => ({
    stat_co: "deep-purple accent-4",
    stat_str: "updating",
    stat_msg_co: "deep-purple accent-4",
    stat_msg_icon: "mdi-server-off",
    stat_msg_text: "updating",
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
    net_inte_send: "updating",
    net_inte_recv: "updating",
    m_db_d: {
      up_time: [],
      recv_msg: [],
      deal_msg: [],
      failed_deal_msg: [],
    },
    total_r_m: "updating",
    total_d_m: "updating",
    total_f_m: "updating",
  }),

  mounted() {
    let _this = this;

    let baseURL = localStorage.getItem("BaseURL");
    let token = localStorage.getItem("Authorization");

    let b_docu = document.getElementById("bot_d");
    let b_c = echarts.init(b_docu);

    let p_docu = document.getElementById("platform_d");
    let p_c = echarts.init(p_docu);

    let m_docu = document.getElementById("msg_d");
    let m_c = echarts.init(m_docu);

    function main_overview() {
      let url = `${baseURL}auth?token=${token}`;
      _this
        .$axios({
          methods: "get",
          url: url,
          headers: {
            "content-type": "application/json",
          },
        })
        .then(function (resp) {
          let d = resp.data;
          if (d.status != 200 && d.msg != "OK") {
            _this.$toastr.error("", "实例出现问题");
            _this.stat_co = "red";
            _this.stat_str = "Offline";
          } else {
            _this.stat_co = "green";
            _this.stat_str = "Online";
          }
        })
        .catch(() => {
          _this.$toastr.error("", "实例已离线");
          _this.stat_co = "red";
          _this.stat_str = "Offline";
          _this.$toastr.error("", "获取实例信息失败");
        });

      let url_p = `${baseURL}runtime?token=${token}`;
      _this
        .$axios({
          methods: "get",
          url: url_p,
          headers: {
            "content-type": "application/json",
          },
        })
        .then(function (resp) {
          _this.stat_msg_text = resp.data.data.platform.stat_msg;
          _this.stat_msg_co = "success";
          _this.stat_msg_icon = "mdi-server";

          _this.b_running_time = resp.data.data.bot.bot_run_time;
          _this.p_running_time = resp.data.data.platform.boot_time;

          _this.up_time.push(new Date().toLocaleTimeString());

          let raw_b_cpu = parseFloat(resp.data.data.bot.cpu_percent);
          let raw_b_mem = parseFloat(resp.data.data.bot.mem_percent);
          _this.b_db_d.cpu.push(raw_b_cpu.toFixed(2));
          _this.b_db_d.mem.push(raw_b_mem.toFixed(2));

          let raw_p_cpu = parseFloat(resp.data.data.platform.cpu_percent);
          let raw_p_mem = parseFloat(resp.data.data.platform.mem_percent);
          let raw_p_disk = parseFloat(resp.data.data.platform.disk_percent);
          _this.p_db_d.cpu.push(raw_p_cpu.toFixed(2));
          _this.p_db_d.mem.push(raw_p_mem.toFixed(2));
          _this.p_db_d.disk.push(raw_p_disk.toFixed(2));

          _this.net_inte_send = resp.data.data.platform.inte_send;
          _this.net_inte_recv = resp.data.data.platform.inte_recv;
        })
        .catch(() => {
          _this.stat_msg_text = "ERROR";
          _this.stat_msg_co = "red";
          _this.stat_msg_icon = "mdi-server-off";
        });

      if (_this.up_time.length >= 75) _this.up_time.splice(0, 1);
      if (_this.b_db_d.cpu.length >= 75) _this.b_db_d.cpu.splice(0, 1);
      if (_this.b_db_d.mem.length >= 75) _this.b_db_d.mem.splice(0, 1);

      if (_this.p_db_d.cpu.length >= 75) _this.p_db_d.cpu.splice(0, 1);
      if (_this.p_db_d.mem.length >= 75) _this.p_db_d.mem.splice(0, 1);
      if (_this.p_db_d.disk.length >= 75) _this.p_db_d.disk.splice(0, 1);

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

    function m_dashb() {
      let url_m = `${baseURL}message?token=${token}`;
      _this
        .$axios({
          methods: "get",
          url: url_m,
          headers: {
            "content-type": "application/json",
          },
        })
        .then(function (resp) {
          _this.m_db_d.up_time.push(new Date().toLocaleTimeString());
          _this.m_db_d.recv_msg.push(resp.data.data.recv_msg);
          _this.m_db_d.deal_msg.push(resp.data.data.deal_msg);
          _this.m_db_d.failed_deal_msg.push(resp.data.data.failed_deal_msg);
          _this.total_r_m = resp.data.data.total_r_m;
          _this.total_d_m = resp.data.data.total_d_m;
          _this.total_f_m = resp.data.data.total_f_m;
        })
        .catch(() => {
          m_docu.innerHTML = "获取实例信息失败";
        });
      if (_this.m_db_d.up_time.length >= 75) _this.m_db_d.up_time.splice(0, 1);
      if (_this.m_db_d.recv_msg.length >= 75)
        _this.m_db_d.recv_msg.splice(0, 1);
      if (_this.m_db_d.deal_msg.length >= 75)
        _this.m_db_d.deal_msg.splice(0, 1);
      if (_this.m_db_d.failed_deal_msg.length >= 75)
        _this.m_db_d.failed_deal_msg.splice(0, 1);

      let option = {
        title: {
          subtext: "更新间隔: 10s",
          left: "10",
        },
        legend: {
          data: ["In", "Dealed", "Failure"],
        },
        color: ["#93eb34", "#34c6eb", "#eb3434"],
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
            data: _this.m_db_d.up_time,
          },
        ],
        yAxis: {
          axisLabel: {
            formatter: "{value} 条",
            align: "center",
          },
        },
        series: [
          {
            name: "In",
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
            data: _this.m_db_d.recv_msg,
          },
          {
            name: "Dealed",
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
            data: _this.m_db_d.deal_msg,
          },
          {
            name: "Failure",
            type: "line",
            itemStyle: {
              color: "#eb3434",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(235,52,52,0.8)",
                },
                {
                  offset: 1,
                  color: "rgba(235,52,52,0.3)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: _this.m_db_d.failed_deal_msg,
          },
        ],
      };
      m_c.setOption(option);
      window.onresize = m_c.resize;
    }

    this.a = setInterval(main_overview, 3000);
    this.b = setInterval(m_dashb, 10000);
  },

  beforeDestroy() {
    window.clearInterval(this.a);
    window.clearInterval(this.b);
  },
};
</script>

<style scoped>
.h2-index {
  font-size: 240%;
  color: #8f8f8f;
}
</style>
