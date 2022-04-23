<template>
  <div id="dashboard">
    <div class="upper-left">
      <el-calendar v-model="value" id="el-calendar"></el-calendar>
    </div>
    <div class="upper-right">
      <h1 style="color: #79b4b7">备忘录</h1>
      <form action="#" @submit.prevent="addMemo">
        <textarea
          cols="72"
          rows="12"
          v-model="msg"
          @keyup.enter="addMemo"
          placeholder="记录一下最近要做的事情吧~"
          class="box"
        ></textarea>
      </form>
      <ul>
        <li v-for="item in list" :key="item.index">
          <h2>
            <p>
              <span class="">
                <span>{{ item.id }}.</span>
                <span>{{ item.msg }}</span>
              </span>
              <span class="box10"></span>
              <span class="">
                <el-button type="" @click.prevent="delMemo(item.id)">删除</el-button>
                <el-button type="" v-on:click="editIt(item)" class="">编辑</el-button>
                <el-button type="" v-on:click="doneIt(item)" class="">完成</el-button>
              </span>
            </p>
          </h2>
        </li>
      </ul>
    </div>
    <div id="main" ref="mychart" style="width: 98%; height: 395px"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "#dashboard",
  data() {
    return {
      msg: "",
      list: [],
      message: "黑马",
      index: 1,
    };
  },
  components: {},
  mounted() {
    let myEcharts = echarts.init(this.$refs.mychart);
    myEcharts.setOption({
      title: {
        text: "成绩统计",
        x: "center",
        subtext: "全年级",
        textStyle: {
          fontStyle: "oblique",
        },
      },
      xAxis: {
        data: ["0-20分", "20-40分", "40-60分", "60-80分","80-100分"],
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: "value",
        scale: true,
          max: 20,
          min: 0,
          splitNumber: 5,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      series: {
        name: "成绩统计",
        type: "bar",
        data: [2, 5, 12, 9,5],
        barWidth: "50%",
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
        itemStyle: {
          color: "rgb(121, 180, 183)", //设置柱子颜色
        },
      },
    });
  },
  computed: {
    role() {
      return this.name === "admin" ? "超级管理员" : "普通用户";
    },
  },

  methods: {
    addMemo() {
      var memo = {
        id: this.index,
        msg: this.msg,
        time: new Date().toLocaleTimeString(),
      };
      this.list.push(memo);
      this.index++;
      this.msg = "";
    },
    delMemo(id) {
      this.list = this.list.filter((item) => {
        return item.id != id;
      });
    },
  },
};
</script>


<style scoped>
#main {
  position: relative;
  top: 0;
  transform: translate(0%, 130%);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.dashboard_bg {
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255);
  background-size: 100%;
}
.upper-left {
  left: 10px;
  top: 10px;
  width: 600px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  float: left;
}
.upper-right {
  left: 10px;
  top: 10px;
  width: 630px;
  height: 485px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  float: left;
  margin-left: 30px;
}
#el-calendar /deep/ .el-calendar-table .el-calendar-day {
  height: 56px;
  text-align: center;
  line-height: 46px;
  color: #79b4b7;
}
.upper-right h1 {
  text-align: center;
}
#beiwang {
  font-size: 16px;
}
textarea {
  caret-color: black;
  font-size: 16px;
}
ul {
  text-align: left;
  list-style-type: none;
}
.text {
  width: 350px;
  height: 100px;
}
a {
  text-decoration: none;
  color: #79b4b7;
}
.upper-right button {
  border-radius: 2px;
  margin-left: 7px;
  padding: 4px;
  margin-top: 3px;
  border: none;
  outline: none;
  cursor: pointer;
  color: #fff;
  background-color: #42b983;
  font-size: 16px;
}
.box10 {
  display: inline-block;
  width: 200px;
}
.box{
  margin-left: 10px;
     outline-style: none;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 700;
    font-family: "Microsoft soft";
    box-shadow: inset -2px -3px 5px 0px #ccc;
}
</style>




