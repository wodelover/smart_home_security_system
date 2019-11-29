<template>
  <div class="statusInfo">
    <div class="over">
    <el-row :gutter="20">
      <div class="content">
        <el-col :span="6">
          <el-card class="card">
            <!-- 温度显示区域 -->
            <div slot="header">室内温度</div>
            <div>
              <el-image :src="tempPath"></el-image>
              <div class="textarea">
                <el-tag type="success">{{currentTemp}}℃</el-tag>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="card">
            <!-- 湿度显示区域 -->
            <div slot="header">室内湿度</div>
            <div>
              <el-image :src="humidityPath"></el-image>
              <div class="textarea">
                <el-tag type="success">{{currentHumidity}}%</el-tag>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="card">
            <!-- 可燃气体显示区域 -->
            <div slot="header">可燃气体</div>
            <div>
              <el-image :src="firePath"></el-image>
              <div class="textarea">
                <el-tag :type="fireTextColor">{{fireText}}</el-tag>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="card">
            <!-- 人体红外检测 -->
            <div slot="header">红外检测</div>
            <div>
              <el-image :src="homePath"></el-image>
              <div class="textarea">
                <el-tag :type="homeTextColor">{{homeStatusText}}</el-tag>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="card">
            <!-- 蜂鸣器 -->
            <div slot="header">蜂鸣器状态</div>
            <div>
              <el-image :src="beepPath"></el-image>
              <div class="textarea">
                <el-tag :type="beepTextColor">{{beepStatusText}}</el-tag>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="card">
            <!-- 换气 -->
            <div slot="header">换气状态</div>
            <div>
              <el-image :src="airPath"></el-image>
              <div class="textarea">
                <el-tag :type="airTextColor">{{airStatusText}}</el-tag>
              </div>
            </div>
          </el-card>
        </el-col>
      </div>
    </el-row>
  </div>
  </div>
</template>

<script>
import homeInPath from "@/assets/homein.png";
import homeOutPath from "@/assets/homeout.png";
import tempPath from "@/assets/temp.png";
import humidityPath from "@/assets/humidity.png"
import noFirePath from "@/assets/nofire.png";
import onFirePath from "@/assets/fire.png";
import beepOnPath from "@/assets/beepon.png"
import beepOffPath from "@/assets/beepoff.png"
import airOnPath from "@/assets/airon.png"
import airOffPath from "@/assets/airoff.png"

export default {
  data() {
    return {
      // 定义温度图片和数值变量
      tempPath: tempPath,
      currentTemp: 0,

      // 定义湿度图片和数值变量
      humidityPath: humidityPath,
      currentHumidity: 0,

      // 定义可燃气体图片和文本显示
      firePath: noFirePath,
      fireText: "无可燃气体",
      fireStatus: false,
      fireTextColor: "success",

      // 定义是否有人
      homePath: homeOutPath,
      homeStatusText: "无人员进入",
      homeStatus: false,
      homeTextColor: "success",

      // 定义蜂鸣器状态
      beepPath: beepOffPath,
      beepStatusText: "蜂鸣器关闭",
      beepStatus: false,
      beepTextColor: "success",

      // 定义换气状态
      airPath: airOffPath,
      airStatusText: "换气关闭",
      airStatus: false,
      airTextColor: "success"
    };
  },
  created() {
    // 刷新网页
    this.getUpdate();
  },

  methods: {
    getUpdate() {
      setInterval(() => {
        this.$http.getHomeDefaultStatus().then(resp => {
          console.log(resp.data);
          this.currentTemp = resp.data.temp;
          this.currentHumidity = resp.data.humidity;
          this.fireStatus = resp.data.fire;
          this.homeStatus = resp.data.home;
          this.beepStatus = resp.data.beep;
          this.airStatus = resp.data.air;
          this.updateHomeStatus();
          this.updateFireStatus();
          this.updateAirStatus();
          this.updateBeepStatus();
        });
      }, 1000);
    },
    updateFireStatus() {
      if (this.fireStatus) {
        this.firePath = onFirePath;
        this.fireText = "有可燃气体";
        this.fireTextColor = "danger";
      } else {
        this.firePath = noFirePath;
        this.fireText = "无可燃气体";
        this.fireTextColor = "success";
      }
    },
    updateHomeStatus() {
      if (this.homeStatus) {
        this.homePath = homeInPath;
        this.homeStatusText = "有人员进入";
        this.homeTextColor = "danger";
      } else {
        this.homePath = homeOutPath;
        this.homeStatusText = "无人员进入";
        this.homeTextColor = "success";
      }
    },
    updateBeepStatus(){
      if (this.beepStatus) {
        this.beepPath = beepOnPath;
        this.beepStatusText = "蜂鸣器打开";
        this.beepTextColor = "danger";
      } else {
        this.beepPath = beepOffPath;
        this.beepStatusText = "蜂鸣器关闭";
        this.beepTextColor = "success";
      }
    },
    updateAirStatus(){
      if (this.airStatus) {
        this.airPath = airOnPath;
        this.airStatusText = "换气打开";
        this.airTextColor = "danger";
      } else {
        this.airPath = airOffPath;
        this.airStatusText = "换气关闭";
        this.airTextColor = "success";
      }
    }
  }
};
</script>

<style>
/* .el-row {
  margin-top: 10px;
} */
.statusInfo {
  /* height: 100vh; */
  text-align: center;
}

.el-col {
  justify-content: flex-start;
}
.content {
  display: flex;
  flex-direction: row;
  justify-content: center;

  flex-wrap: wrap;
}
.textarea {
  text-align: center;
  display: flex;
  justify-content: center;
}
</style>