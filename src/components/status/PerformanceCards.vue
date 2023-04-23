<template>
  <div class="mt-4 h-100">
    <div class="padd" style="font-weight: 300;">性能概览</div>
    <v-row class="pa-5 h-100">
      <v-col class="w-100" cols="12" md="3" sm="6">
        <v-card class="stat-cpu d-flex flex-column justify-space-between" elevation="0">
          <div class="stat-bg stat-cpu-icon">
            <CpuIcon />
          </div>
          <v-container>
            <div class="d-flex justify-start">
              <div class="stat-cpu-icon mt-2 mr-4">
                <CpuIcon style="height: 32px; width: 32px;" />
              </div>
              <div>
                Processor
                <div class="stat-subtitle">114514</div>
              </div>
            </div>

            <div class="d-flex justify-end">
              <div class="stat-card-pers-int stat-card-pers-out">0</div>
              <div class="stat-card-pers-int">1</div>
              <div class="stat-card-pers-int">1</div>
              .
              <div>4</div>
              <div>5</div>
              %
            </div>
          </v-container>
          <div class="d-flex justify-space-between">
            <div class="stat-card-info">
              <v-badge dot location="top" offset-y="-3" bordered>
                <div class="stat-card-details pt-3">8 Cores</div>
              </v-badge>
            </div>
            <div class="stat-card-info">
              <v-badge dot location="top" offset-y="-3" bordered>
                <div class="stat-card-details pt-3">3.2 GHz</div>
              </v-badge>
            </div>
            <div class="stat-card-info">
              <v-badge dot location="top" offset-y="-3" bordered>
                <div class="stat-card-details pt-3">x64</div>
              </v-badge>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col class="w-100" cols="12" md="3" sm="6">
        <v-card class="stat-machine d-flex flex-column justify-space-between" elevation="0">
          <div class="stat-bg stat-machine-icon">
            <MachineIcon />
          </div>
          <v-container>
            <div class="d-flex justify-start">
              <div class="stat-machine-icon mt-2 mr-4">
                <CpuIcon style="height: 32px; width: 32px;" />
              </div>
              <div>
                Machine
                <div class="stat-subtitle">114514</div>
              </div>
            </div>

            <div class="d-flex justify-end">
              <div class="stat-card-pers-int stat-card-pers-out">0</div>
              <div class="stat-card-pers-int">1</div>
              <div class="stat-card-pers-int">1</div>
              .
              <div>4</div>
              <div>5</div>
              %
            </div>
          </v-container>
          <div class="d-flex justify-space-between">
            <div class="stat-card-info">
              <v-badge dot location="top" offset-y="-3" bordered>
                <div class="stat-card-details pt-3">...</div>
              </v-badge>
            </div>
            <div class="stat-card-info">
              <v-badge dot location="top" offset-y="-3" bordered>
                <div class="stat-card-details pt-3">...</div>
              </v-badge>
            </div>
            <div class="stat-card-info">
              <v-badge dot location="top" offset-y="-3" bordered>
                <div class="stat-card-details pt-3">...</div>
              </v-badge>
            </div>
          </div>

        </v-card>
      </v-col>
      <v-col class="w-100" cols="12" md="3" sm="6">
        <v-card class="stat-storage d-flex flex-column justify-space-between" elevation="0">
          <div class="stat-bg stat-storage-icon">
            <StorageIcon />
          </div>
          <v-container>
            <div class="d-flex justify-start">
              <div class="stat-storage-icon mt-2 mr-4">
                <StorageIcon style="height: 32px; width: 32px;" />
              </div>
              <div>
                Storage
                <div class="stat-subtitle">114514</div>
              </div>
            </div>

            <div class="d-flex justify-end">
              <div class="stat-card-pers-int stat-card-pers-out">0</div>
              <div class="stat-card-pers-int">1</div>
              <div class="stat-card-pers-int">1</div>
              .
              <div>4</div>
              <div>5</div>
              %
            </div>
          </v-container>
          <div class="d-flex justify-space-between">
            <div class="stat-card-info">
              <v-badge dot location="top" offset-y="-3" bordered>
                <div class="stat-card-details pt-3">...</div>
              </v-badge>
            </div>
            <div class="stat-card-info">
              <v-badge dot location="top" offset-y="-3" bordered>
                <div class="stat-card-details pt-3">...</div>
              </v-badge>
            </div>
            <div class="stat-card-info">
              <v-badge dot location="top" offset-y="-3" bordered>
                <div class="stat-card-details pt-3">...</div>
              </v-badge>
            </div>
          </div>
        </v-card>
      </v-col>
      <v-col class="w-100" cols="12" md="3" sm="6">
        <v-card class="d-flex flex-column justify-space-between" elevation="0">
          
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PerformanceCards',
  data: () => {
    return {

    }
  },
}
</script>

<script lang="ts" setup>
import CpuIcon from '@/components/svg/CpuIcon.vue';
import MachineIcon from '@/components/svg/MachineIcon.vue';
import StorageIcon from '@/components/svg/StorageIcon.vue';
</script>

<style>
.stat-bg {
  position: absolute;
  margin-top: 40px;
  margin-left: 10px;
  opacity: 0.1;
}

.stat-subtitle {
  color: #B4B4B4;
  font-size: 12px;
  position: absolute;
}

.stat-cpu-icon {
  fill: #B2D8FF;
}

.stat-machine-icon {
  fill: #FFCD9A;
}

.stat-storage-icon {
  fill: #B5E0B0;
}

.stat-card-pers-int {
  font-size: 40px;
}

.stat-card-pers-out {
  color: #C0C0C0;
  opacity: 0.75;
}

.stat-card-info {
  height: 35px;
  width: 100%;
  text-align: center;
}

.stat-cpu>div>.stat-card-info {
  background: #E5F2FF;
}

.stat-cpu>div>.stat-card-info>.v-badge>div>span {
  background-color: #B2D8FF;
}

.stat-machine>div>.stat-card-info {
  background: #ffe6cd;
}

.stat-machine>div>.stat-card-info>.v-badge>div>span {
  background-color: #FFCD9A;
}

.stat-storage>div>.stat-card-info {
  background: #d7eed5;
}

.stat-storage>div>.stat-card-info>.v-badge>div>span {
  background-color: #B5E0B0;
}

.stat-card-details {
  color: #909090;
  font-size: 13px;
}
</style>
