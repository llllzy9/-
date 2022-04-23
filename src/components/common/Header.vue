<template>
    <div class="header" v-if="$route.meta.isBlank!==true">
        <div class="logo"><img></div>
        <div class="toptitle">
        </div>
        <div class="header-right">
            <div class="header-user-con">

                <!-- 用户头像 -->
                <div class="user-avator">
                    <img src="../../assets/img/touxiang.jpeg"/>
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            fullscreen: false,
            name: '',
        };
    },
    computed: {
        username() {
            let username = sessionStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
    methods: {
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                sessionStorage.removeItem('ms_username');
				sessionStorage.removeItem('token');
                this.$router.push('/login');
            }
        },
        // 侧边栏折叠
        // collapseChage() {
        //     this.collapse = !this.collapse;
        //     bus.$emit('collapse', this.collapse);
        // },

    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChage();
        }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: azure;
    background: url(../../assets/img/header.jpg);
    border-radius: 0 0px 80px 0px;
box-shadow: 0px 2px 6px 0 #9d9d9d;
    background-size: 110%;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    float: left;
    width: 396px;
    line-height: 89px;
    margin-left: 100px;
    background: url(../../assets/img/logoTop.png);
    background-size: 221px;
    padding-bottom: -1px;
    background-repeat: no-repeat;
    transform: translate(-24%, -1px);
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.el-dropdown-link {
    color: rgb(0, 0, 0);
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
.toptitle{
    position: absolute;
    left: 650px;
    top: 10px;
    color: #79B4B7;
}
</style>
