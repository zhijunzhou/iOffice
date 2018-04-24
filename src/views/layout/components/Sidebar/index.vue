<template>
  <scroll-bar>
    <div :class="['top-title',isCollapse?'small':'big']" @click="backDash">
      <img :src="userLogo" alt="">
      <span v-if="!isCollapse">iOffice</span>
    </div>
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#001529" text-color="#fff" active-text-color="#409EFF">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
import userLogo from '@/assets/img/u225.png'

export default {
  data() {
    return {
      userLogo
    }
  },
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters(['sidebar']),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    backDash() {
      this.$router.push({ path: '/dashboard' })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.top-title {
  height: 64px;
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: #002140;
  &.big {
    padding-left: 40px;
  }
  &.small {
    padding-left: 20px;
  }
  span {
    font-weight: bold;
    padding-left: 15px;
    color: white;
    font-size: 18px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 30px;
  }
}
</style>
