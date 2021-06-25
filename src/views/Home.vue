<template>
  <div class="home">
<el-container style="height: 100vh; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(0, 21, 41)">
    <h1 class="logo">后台管理系统</h1>
    <el-menu
    background-color="#001529"
    text-color="#aaa"
    :router="true"
    :default-active="activedIndex"
    active-text-color="#fff">
      <el-submenu :index="''+item.id" style="width:200px" v-for="item in lists" :key="item.id">
          <template slot="title">
            <i class="el-icon-message" v-if="item.authName==='用户管理'"></i>
            <i class="el-icon-lock" v-else-if="item.authName==='权限管理'"></i>
            {{item.authName}}
          </template>
          <el-menu-item :index="''+_item.path" v-for="_item in item.children" :key="_item.id">{{_item.authName}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header class="home-header">
      <el-dropdown>
        <el-avatar size="medium" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="signOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
  </div>
</template>

<style lang="scss" scoped>
  .home {
    .logo {
      height: 60px;
      line-height: 60px;
      font-size: 16px;
      color: #fff;
      text-align: center;
    }
    .home-header {
      height: 60px;
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
</style>

<script>
  import { mapMutations } from 'vuex'
  import { SET_INFO } from '../store/mutation-type'
  import api from '../http/apis'
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item),
        lists: [],
        activedIndex: ''
      }
    },
    watch:{
      $route: {
        immediate: true,
        handler(route){
          this.activedIndex = route.name.toLowerCase()
        }
      }
    },
    methods: {
      ...mapMutations([SET_INFO]),
      async getMenus(){
        const lists = await this.$apis.getMenus()  
        this.lists = lists
      },
      //退出
      signOut() {
        this.SET_INFO({
          token: '',
          username: ''
        })
        this.$router.push({
          name: 'Login'
        })
      }
    },
    async beforeRouteEnter(to, from, next){
     const lists = await api.getMenus()
     next(vm => {
       vm.lists = lists
     })
    }
  };
</script>