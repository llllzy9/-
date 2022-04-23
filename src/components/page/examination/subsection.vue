<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 班级管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>成绩分段</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :span="4" style="margin-left: 5%; margin-right: -180px">
          <el-select v-model="value" placeholder="请选择班级" clearable>
            <el-option
              v-for="item in options"
              :key="item.classId"
              :label="item.className"
              :value="item.classId"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4" style="margin-left: 170px">
          <el-select v-model="value1" placeholder="请选择试卷" clearable>
            <el-option
              v-for="item in options1"
              :key="item.paperId"
              :label="item.paperName"
              :value="item.paperId"
            >
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="queryLine">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div id="main" style="width: 50%; height: 600px"></div>
    <div id="pie" style="width: 50%; height: 600px"></div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "subsection",
  data() {
    return {
      value: "",
      value1: "",
      charts: "",
      opinionData: [2,5,3,9],
      options: [],
      options1: [],
    };
  },
  //调用

  methods: {
    queryLine() {
      let param = {
        classId: this.value,
        paperId: this.value1,
      };
      this.opinionData = [];
      this.axios
        .post("/wsyu/paper/queryAchievement.htm", param)
        .then(
          function (response) {
            response.data.result.filter((item, i) => {
              this.opinionData.push(item);
            });
            // this.charts.setOption(true)
            this.drawLine("main");
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
    drwaPie(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        title: {
          text: "成绩统计",
          subtext: "总成绩",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "成绩",
            type: "pie",
            radius: "50%",
            data: [
              { value: 8, name: "0~60分(不及格)" },
              { value: 3, name: "60~70分(中等)" },
              { value: 2, name: "70~80分(良好)" },
              { value: 1, name: "80~100分(优秀)" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 10,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },

    drawLine(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        title: {
          text: "成绩分段",
          x: "center",
          subtext: "",
          textStyle: {
            fontStyle: "oblique",
          },
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(50,50,50,0.7)",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          show: true,
          data: ["成绩分段"],
        },
        // grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '3%',
        //     containLabel: true
        // },

        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          data: ["0~60分", "60~70分", "70~80分", "80-100分"],
        },
        yAxis: {
          // 纵轴标尺固定
          type: "value",
          scale: true,
          max: 15,
          min: 0,
          splitNumber: 5,
        },
        series: [
          {
            name: "总共人数",
            type: "bar",
            stack: "总量",
            barCategoryGap: "50%",
            // data: this.opinionData,
            data: [4,2,5,9],
            markPoint: {
              data: [
                {
                  type: "max",
                  name: "最大值",
                },
                {
                  type: "min",
                  name: "最小值",
                },
              ],
            },
            markLine: {
              // data:[
              //   {
              //     type:'average',
              //     name:'平均值'
              //   }
              // ]
            },
            itemStyle: {
              color: "rgb(121, 180, 183)", //设置柱子颜色
            },
            emphasis: {
              itemStyle: {
                color: "#0a9396", //hover时改变柱子颜色
                shadowColor: "rgba(102,102,102,0.50)",
                shadowOffsetX: 5,
                shadowOffsetY: 5,
                shadowBlur: 6,
              },
            },
          },
        ],
      });
    },
  },
  created() {
    this.axios
      .post("/wsyu/paper/queryAchievement.htm")
      .then(
        function (response) {
          response.data.result.filter((item, i) => {
            this.opinionData.push(item);
          });
          // this.charts.setOption(true)
          this.drawLine("main");
        }.bind(this)
      )
      .catch(function (error) {
        console.log(error);
      });

    this.axios
      .post("/wsyu/paper/queryClassIdList.htm")
      .then(
        function (response) {
          response.data.result.filter((item, i) => {
            this.options.push(item);
          });
          // this.charts.setOption(true)
        }.bind(this)
      )
      .catch(function (error) {
        console.log(error);
      });

    this.axios
      .post("/wsyu/paper/queryPaperIdList.htm")
      .then(
        function (response) {
          response.data.result.filter((item, i) => {
            this.options1.push(item);
          });
          // this.charts.setOption(true)
        }.bind(this)
      )
      .catch(function (error) {
        console.log(error);
      });
  },
  mounted() {
    this.$nextTick(function () {
      this.drawLine("main");
      this.drwaPie("pie");
      console.log(this.opinionData);
    });
  },
};
</script>

<style scoped>
#main,
#pie {
  float: left;
  margin-top: 40px;
}
</style>
