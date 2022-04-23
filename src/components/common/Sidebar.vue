<template>
  <div class="sidebar" v-if="$route.meta.isBlank !== true">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      background-color="#79B4B7"
      text-color="#fff"
      active-text-color="#9BE3DE"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template slot="title">
                  {{ subItem.title }}
                </template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                  >{{ threeItem.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.index"
                >{{ subItem.title }}</el-menu-item
              >
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from "../common/bus";
export default {
  props: {
    routes: {
      default: () => [],
    },
  },
  data() {
    return {
      items: [],
      icon: ["el-icon-s-order", "el-icon-s-custom"],
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
  },
  mounted() {
    if (this.routes != "" && this.routes != undefined) {
      this.items = this.routes;
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", (msg) => {
      this.collapse = msg;
      bus.$emit("collapse-content", msg);
    });
    let param = {
      roleId: sessionStorage.getItem("role"),
    };
    this.axios
      .post("/wsyu/login/queryMenuList.htm", param)
      .then(
        function (response) {
          console.log("侧边栏");
          console.log(response);
          this.items = response.data.result;
        }.bind(this)
      )
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0px;
  top: 80px;
  bottom: 0;
  text-align: center;
  overflow-y: scroll;
  border-radius: 0px 40px 30px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.sidebar::-webkit-scrollbar {
  width: 0px;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  border: none;
  width: 210px;
}
.sidebar > ul {
  height: 100%;
}
.sidebar .sidebar-el-menu li:hover {
  background-color: azure !important;
  color: #56a7a7 !important;
}
.el-submenu__title i {
  color: #ffffff;
}
</style>
