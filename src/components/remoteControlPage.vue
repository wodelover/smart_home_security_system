<template>
  <div>
    <el-row :gutter="10">
      <el-col>
        <el-switch
          v-model="lightStatus"
          active-color="#13ce66"
          :active-text="lightStatusText"
          inactive-color="#b3c0d1"
          @change="onLightStatusChanged"
        ></el-switch>
      </el-col>
      <el-col>
        <el-switch
          v-model="changeOfAirStatus"
          active-color="#13ce66"
          :active-text="changeOfAirStatusText"
          inactive-color="#b3c0d1"
          @change="onChangeOfAirStatusChanged"
        ></el-switch>
      </el-col>
      <el-col>
        <el-switch
          v-model="keepTempStatus"
          active-color="#13ce66"
          :active-text="keepTempStatusText"
          inactive-color="#b3c0d1"
          @change="onKeepTempStatusChanged"
        ></el-switch>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lightStatus: false,
      lightStatusText: "已关闭照明",
      changeOfAirStatus: false,
      changeOfAirStatusText: "已关闭换气",
      keepTempStatus: false,
      keepTempStatusText: "已关闭恒温"
    };
  },
  created(){//当刷新网页后重新请求转态信息
    this.getUpdate();
  },
  methods: {
    getUpdate(){
      setInterval(() => {
        this.$http.getControlDefaultStatus().then(resp => {
          this.lightStatus = resp.data.light;
          this.changeOfAirStatus = resp.data.changeAir;
          this.keepTempStatus = resp.data.keepTemp;
        });
      }, 2000);
    },
    onLightStatusChanged() {
      this.$http.changeLightStatus(this.lightStatus).then(resp => {
        if ('true' === resp.data.lightStatus) {
          this.lightStatusText = "已打开照明";
        }else{
          this.lightStatusText = "已关闭照明";
        }
      });
    },
    onChangeOfAirStatusChanged() {
      this.$http.changeAirStatus(this.changeOfAirStatus).then(resp => {
        if ('true' === resp.data.airStatus) {
          this.changeOfAirStatusText = "已打开换气";
        } else{
          this.changeOfAirStatusText = "已关闭换气";
        }
      });
    },
    onKeepTempStatusChanged() {
      this.$http.changeKeepTempStatus(this.keepTempStatus).then(resp => {
        if ('true' === resp.data.keepTempStatus) {
          this.keepTempStatusText = "已打开恒温";
        } else {
          this.keepTempStatusText = "已关闭恒温";
        }
      });
    }
  }
};
</script>

<style>
.el-col {
  margin-left: 10px;
  margin-top: 10px;
}
</style>