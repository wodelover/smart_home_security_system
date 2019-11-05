<template>
  <div class="statusInfo">
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
            <!-- 宠物在窝显示区域 -->
            <div slot="header">宠物状态</div>
            <div>
              <el-image :src="homePath"></el-image>
              <div class="textarea">
                <el-tag type="success">{{homeStatusText}}</el-tag>
              </div>
            </div>
          </el-card>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
import homeInPath from "@/assets/homein.png";
import homeOutPath from "@/assets/homeout.png";
import tempPath from "@/assets/temp.png";
import noFirePath from "@/assets/nofire.png";
import onFirePath from "@/assets/fire.png";

export default {
  data() {
    return {
      // 定义温度图片和数值变量
      tempPath: tempPath,
      currentTemp: 0,

      // 定义可燃气体图片和文本显示
      firePath: noFirePath,
      fireText: "无可燃气体",
      fireStatus: false,
      fireTextColor: "success",

      // 定义是否在睡觉
      homePath: homeOutPath,
      homeStatusText: "未睡觉",
      homeStatus: false
    };
  },
  created() {
    // 刷新网页
    this.getUpdate();
  },

  methods: {
    getUpdate() {
      setInterval(() => {
        this.$http.getPetDefaultStatus().then(resp => {
          this.currentTemp = resp.data.temp;
          this.fireStatus = resp.data.fire;
          this.homeStatus = resp.data.home;
          this.updateHomeStatus();
          this.updateFireStatus();
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
        this.homeStatusText = "睡觉中";
      } else {
        this.homePath = homeOutPath;
        this.homeStatusText = "未睡觉";
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
  height: 100vh;
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