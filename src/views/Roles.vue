<template>
    <div class="roles">
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
    border
    :data="rolesData "
    style="width: 100%;margin-top:15px">
    <el-table-column type="expand">
      <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="所属店铺">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
        <!-- <el-row v-for="item in props.row.children" :key="item.id">
          <el-col :span="4">
            <el-tag type="success">{{item.authName}}</el-tag>
            > 
          </el-col>
          <el-col :span="20">
              <el-row v-for="_item in item.children" :key="_item.id">
                <el-col :span="8">
                   <el-tag type="success">{{_item.authName}}</el-tag>
                   >
                </el-col>
                <el-col :span="16">
                   <el-tag type="success" v-for="__item in _item.children" :key="__item.id">{{__item.authName}}</el-tag>
                </el-col>
              </el-row>
          </el-col>
        </el-row> -->
      </template>
    </el-table-column>

   
    <el-table-column
      label="商品 ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="desc">
    </el-table-column>
  </el-table>

    </div>
</template>

<script>
import _ from "underscore"; 
export default {
    props: {

    },
    data() {
         return {
           rolesData:[]
      }
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    // methods: {
    //   //获取角色列表 
    //     async getRoles(){
    //       const res = await this.$apis.getRoles
    //       this.rolesData=res
    //     }
    // },
    // created(){
    //     this.getRoles()
    // },
    components: {

    },
};
</script>

<style scoped lang="scss">

</style>
