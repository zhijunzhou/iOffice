<template>
  <div class="main-menu">
    <el-dropdown class="message-container" trigger="hover">
      <div class="message-wrapper">
        <span class="el-dropdown-link">
          <el-badge :value="10" :max="99" class="item spacing"><i class="el-icon-bell"></i></el-badge>
        </span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item divided v-for="(item,index) in noticList" :key="index">
          <p>{{item.content}}</p>
          <p>{{item.time}}</p>
        </el-dropdown-item>
        <el-dropdown-item divided style="text-align: center">Clean</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown class="avatar-container" trigger="hover">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="userLogo">
        <span class="user-name">Admin</span>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <el-dropdown-item >
          Account
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">Sign Out</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import userLogo from '@/assets/img/u225.png'

export default {
  name: 'dropdown',
  data() {
    return {
      userLogo,
      noticList: [
        {
          time: '2017-10-12',
          content: '您有新的任务：2018-31周任务'
        },
        {
          time: '2017-10-12',
          content: '您有新的任务：2018-31周任务'
        },
        {
          time: '2017-10-12',
          content: '您有新的任务：2018-31周任务'
        }
      ]
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    openLogout() {
      this.$confirm('确定要退出登录吗？', '确认退出', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.main-menu {
  position: absolute;
  top: 0;
  right: 35px;
  display: flex;
  align-items: center;
  .item {
    height: 16px;
    color: rgba(0, 0, 0, 0.65);
    line-height: 16px;
    cursor: pointer;
    margin-right: 20px;
  }
  .message-container,
  .avatar-container {
    height: 64px;
    display: inline-block;
    :hover {
      background-color: #e6f7ff;
    }
    .message-wrapper,
    .avatar-wrapper {
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      height: 64px;
      padding: 0 5px;
      .user-avatar {
        width: 30px;
        height: 30px;
        border-radius: 15px;
        background-color: #99a9bf;
      }
      .user-name {
        font-size: 12px;
        padding-left: 8px;
      }
    }
  }
}
.el-dropdown-menu {
  margin: 0;
  padding: 0;
  .el-dropdown-menu__item {
    padding: 8px 10px;
    margin: 0;
    width: 350px;
    &:before {
      height: 0;
    }
    p {
      margin: 0;
      line-height: 26px;
    }
  }
}
</style>
