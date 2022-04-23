<template>
  <div class="login-wrap">
    <div class="useless"></div>
    <div class="ms-login">
      <div class="cartoon">
        <div class="head">
          <img src="../../assets/img/owl-login.png" alt="" id="owl" />
        </div>
        <div class="hand_left"></div>
        <div class="hand_right"></div>
      </div>
      <div class="ms-title">用户登录</div>
      <el-form
        :model="param"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content"
      >
        <div style="margin-top: 10px">
          <el-form-item prop="username">
            <el-input
              v-model="param.userId"
              placeholder="请输入用户名"
              size="large"
            >
              <el-button slot="prepend" icon="el-icon-user"></el-button>
            </el-input>
          </el-form-item>
        </div>
        <div style="margin: 20px 0 30px 0">
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="请输入密码"
              v-model="param.password"
              @keyup.enter.native="submitForm()"
              size="large"
            >
              <el-button slot="prepend" icon="el-icon-lock"></el-button>
            </el-input>
          </el-form-item>
        </div>
        <div class="login-btn">
          <el-button type="primary" plain @click="submitForm()">登录</el-button>
        </div>
        <div class="login-btn">
          <el-button type="text" @click="dialogFormVisible = true"
            >新用户注册</el-button
          >
        </div>
      </el-form>
      <div class="line">
        <el-radio-group v-model="radio">
          <el-radio :label="3">学生登录</el-radio>
          <el-radio :label="6">教师登录</el-radio>
        </el-radio-group>
        <p class="argeement">
          登录即表示同意平台<a>《隐私政策》</a>和<a>《用户协议》</a>
        </p>
      </div>
    </div>
    <el-dialog
      title="用户注册"
      :visible.sync="dialogFormVisible"
      center
      width="35%"
      :destroy-on-close="true"
    >
      <el-form :model="form" :rules="rules1" ref="form" class="dialogform">
        <el-form-item label="用户名：" label-width="100px" prop="userName">
          <el-input
            v-model="form.userName"
            :label-width="formLabelWidth"
            placeholder="姓名"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="账号：" label-width="100px" prop="userId">
          <el-input
            v-model="form.userId"
            :label-width="formLabelWidth"
            placeholder="学号或者教师号"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：" label-width="100px" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            :label-width="formLabelWidth"
            placeholder="密码"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码："
          label-width="100px"
          prop="confirmPassword"
        >
          <el-input
            type="password"
            v-model="form.confirmPassword"
            :label-width="formLabelWidth"
            placeholder="确认密码"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色：" label-width="100px" prop="typeId">
          <el-select
            v-model="form.typeId"
            placeholder="请选择角色"
            :label-width="formLabelWidth"
            style="width: 200px"
            @change="selectType"
          >
            <el-option label="学生" :value="0"></el-option>
            <el-option label="老师" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="班级："
          label-width="100px"
          prop="classId"
          v-show="this.status === 0"
        >
          <el-select
            v-model="form.classId"
            placeholder="请选择班级"
            :label-width="formLabelWidth"
            style="width: 200px"
          >
            <el-option
              v-for="(item, index) in this.classList"
              :label="item.className"
              :value="item.classId"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">取 消</el-button>
        <el-button type="primary" @click="registerForm('form')"
          >注 册</el-button
        >
      </div>
    </el-dialog>
    <div class="down-wrap"></div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  data: function () {
    return {
      radio: 3,
      classList: [],
      status: 1,
      param: {
        userId: "",
        password: "",
      },
      dialogFormVisible: false,
      rules: {
        userId: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      rules1: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" },
        ],

        userId: [{ required: true, message: "请输入用户id", trigger: "blur" }],
        confirmPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "blur" },
        ],
        typeId: [{ required: true, message: "请选择角色", trigger: "change" }],
      },
      form: {
        userName: "",
        userId: "",
        password: "",
        delivery: false,
        confirmPassword: "",
        typeId: "",
        classId: "",
      },
      formLabelWidth: "100px",
    };
  },
  methods: {
    ...mapMutations(["storeLogin"]),
    selectType(event) {
      console.log(event);
      this.status = event;
    },
    registerForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let params = {
            userId: this.form.userId,
            password: this.form.password,
            typeId: this.form.typeId,
            userName: this.form.userName,
            confirmPassword: this.form.confirmPassword,
            classId: this.form.classId,
          };
          if (this.form.password !== this.form.confirmPassword) {
            this.$message({ message: "密码不一致", type: "error" });
            return;
          }
          axios
            .post("/wsyu/login/registerLogin.htm", params)
            .then((response) => {
              if (response.data.code == "0000") {
                this.$message({ message: "注册成功", type: "success" });
                this.$refs[form].resetFields();
                this.dialogFormVisible = false;
              } else {
                this.$message({ message: "注册出错", type: "error" });
                // return false;
              }
            });
        }
      });
    },
    resetForm(form) {
      this.$refs[form].resetFields();
      this.dialogFormVisible = false;
    },
    submitForm() {
      this.$refs.login.validate((valid) => {
        if (valid) {
          let params = {
            userId: this.param.userId,
            password: this.param.password,
          };
          axios
            .post("/wsyu/login/login.htm", params)
            .then((response) => {
              if (response.data.code == "0000") {
                //生成uuid作为token
                const uuidv5 = require("uuid/v5");
                const token = uuidv5("wsyu", uuidv5.DNS);
                // 登陆成功 假设这里是后台返回的 token
                localStorage.setItem("token", response.data.result.token);
                sessionStorage.setItem("token", response.data.result.token);
                this.$message.success("登录成功");
                sessionStorage.setItem(
                  "role",
                  JSON.stringify(response.data.result.role)
                );
                sessionStorage.setItem(
                  "ms_username",
                  response.data.result.userName
                );
                sessionStorage.setItem("uid", response.data.result.uid);
                sessionStorage.setItem("userId", response.data.result.userId);
                var user = this.param.userName;
                this.userToken = response.data.result.token; //拿到返回数据里的token
                this.storeLogin({ Authorization: this.userToken });
                this.$router.push("/");
              } else {
                this.$message({
                  message: response.data.description,
                  type: "error",
                });
              }
            })
            .catch((error) => {
              console.log(error);
              this.$message({ message: "登录出错", type: "error" });
            });
        } else {
          this.$message.error("请输入账号和密码");
          return false;
        }
      });
    },
  },
  created() {
    this.axios
      .post("/wsyu/class/queryList.htm")
      .then(
        function (response) {
          this.classList = response.data.result;
        }.bind(this)
      )
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.useless {
  height: 50%;
}
.down-wrap {
  background-color: azure;
  width: 100%;
  height: 50%;
}
#owl {
  position: absolute;
  top: -100px;
  left: 163px;
}
.hand_left {
  position: absolute;
  height: 27px;
  width: 34px;
  border-radius: 83px;
  top: -16px;
  left: 175px;
  background-color: #472d20;
}
.hand_right {
  position: absolute;
  height: 27px;
  width: 34px;
  border-radius: 83px;
  top: -16px;
  left: 332px;
  background-color: #472d20;
  text-align: right;
}
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.ms-title {
  width: 100%;
  line-height: 40px;
  text-align: center;
  font-size: 24px;
  padding-bottom: 20px;
  font-weight: bold;
  color: rgb(0, 0, 0);
}
.ms-login {
  position: absolute;
  left: 50%;
  width: 540px;
  height: 526px;
  border-radius: 10px;
  padding: 40px;
  background: rgb(255, 255, 255);
  transform: translate(-50%, -44%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.ms-content {
  padding: 30px 50px;
  background-color: rgb(255, 255, 255);
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 42px;
  margin-bottom: 10px;
}
.line {
  padding-bottom: 20px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}
.argeement {
  text-align: center;
  font-size: 12px;
  color: #a8a8b3;
  position: relative;
  left: 0px;
  bottom: -60px;
}
.dialogform {
  margin-left: 75px;
  /* text-align: center; */
}
</style>
