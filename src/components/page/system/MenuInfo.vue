<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 系统管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin-top: 0px" class="nav_search">
      <el-row :gutter="0">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-input
              v-model="menuName"
              style="width: 90%"
              placeholder="请输入菜单名称"
            >
            </el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-button
              type="primary"
              class="glocal_button"
              icon="el-icon-search"
              @click="queryPage"
              >
            </el-button>
          </div>
        </el-col>
        <el-col :span="1">
          <div class="grid-content bg-purple">
            <el-button
              type="primary"
              class="glocal_button"
              icon="ios-search"
              @click="addMenuShow = true"
              >新增
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="menuId" label="菜单ID" width="180">
        </el-table-column>
        <el-table-column prop="menuName" label="菜单名称" width="180">
        </el-table-column>
        <el-table-column prop="menuIndex" label="菜单链接"> </el-table-column>
        <el-table-column prop="menuDegree" label="菜单层级"> </el-table-column>
        <el-table-column prop="parentId" label="父菜单ID"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      </el-table>
      <Page
        :total="total"
        show-total
        show-sizer
        :page-size-opts="[10, 20, 30, 40, 10000]"
        v-show="tableDataShow"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
        style="text-align: center"
      />
    </div>

    <!--菜单新增-->
    <el-dialog
      title="菜单新增"
      :visible.sync="addMenuShow"
      width="20%"
      :before-close="handleClose"
    >
      <span>
        <el-form ref="form" :model="form">
          <el-form-item label="菜单名称" label-width="100px">
            <el-input v-model="form.menuName" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="菜单链接" label-width="100px">
            <el-input v-model="form.menuIndex" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="菜单层级" label-width="100px">
            <el-input v-model="form.menuDegree" style="width: 180px"></el-input>
          </el-form-item>
          <el-form-item label="父菜单ID" label-width="100px">
            <el-input v-model="form.parentId" style="width: 180px"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addMenuShow = false">取 消</el-button>
        <el-button type="primary" @click="insertMenuInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "MenuInfo",
  data() {
    return {
      addMenuShow: false,
      tableData: [],
      currentNum: 1,
      pageSize: 10,
      startDate: "",
      total: 0,
      endDate: "",
      tableDataShow: false,
      menuName: "",
      form: {
        menuName: "",
        menuIcon: "",
        menuIndex: "",
        menuDegree: "",
        parentId: "",
      },
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    setBeginTime(date) {
      //设置时间
      this.stratDate = date;
    },
    setEndTime(date) {
      //设置时间
      this.endDate = date;
    },
    changePage(page) {
      //设置页码
      this.currentNum = page;
      this.queryPage();
    },
    changePageSize(pageSize) {
      //设置每页展示数量
      this.pageSize = pageSize;
      this.queryPage();
    },
    queryPage() {
      let params = {
        currentNum: this.currentNum,
        pageSize: this.pageSize,
        menuName: this.menuName,
      };
      this.axios
        .post("/wsyu/menu/queryPage.htm", params)
        .then(
          function (response) {
            this.tableData = response.data.result.list;
            this.total = response.data.result.count;
            this.tableDataShow = true;
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
    insertMenuInfo() {
      let params = {
        menuName: this.form.menuName,
        menuIndex: this.form.menuIndex,
        menuDegree: this.form.menuDegree,
        parentId: this.form.parentId,
      };
      this.axios
        .post("/wsyu/menu/insertMenuInfo.htm", params)
        .then(
          function (response) {
            if (response.data.code == "0000") {
              this.$message.success("新增成功");
              this.addMenuShow = false;
            } else {
              this.$message.error("新增失败");
            }
          }.bind(this)
        )
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    this.queryPage();
  },
};
</script>

<style scoped>
.grid-content {
  border-radius: 10px;
  min-height: 50px;
}
.nav_search{
    float: right;
    margin-bottom: -10px;
}
</style>
