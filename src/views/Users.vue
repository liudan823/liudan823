<template>
  <div class="users" v-if="tableData">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      status-icon
      label-width="100px"
      class="demo-ruleForm"
      inline
    >
      <el-form-item prop="pass">
        <el-input type="user" v-model="ruleForm.pass" autocomplete="off">
          <template slot="append">
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="search()"
            ></el-button>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="dialogaddForm = true"
          >添加用户</el-button
        >
      </el-form-item>
    </el-form>
    <el-table :data="tableData.users" border style="width: 100%">
      <el-table-column
        prop="date"
        label="#"
        width="90"
        type="index"
        :index="indexmins"
      >
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="create_time" label="创建日期">
        <template slot-scope="scope">{{ day(scope.row.create_time) }}</template>
      </el-table-column>
      <el-table-column label="用户状态" prop="mg_state">
        <template slot-scope="scope">
          <el-switch
            validate-event
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="putStatus(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="small"
            @click="comclick(scope.row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            size="small"
            @click="allClick(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="small"
            @click="open"
          >
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[1, 2, 3, 5]"
      :page-size="pramas.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.total"
    >
    </el-pagination>
    <el-dialog title="用户信息" :visible.sync="dialogaddForm">
      <el-form :model="addForm" :rules="addrules" class="demo-ruleForm">
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input
            v-model="addForm.password"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          :label-width="formLabelWidth"
          prop="mobile"
        >
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogaddForm = false">取 消</el-button>
        <el-button type="primary" @click="pushUser()">确 定</el-button>
      </div>
    </el-dialog>
      <el-button type="text" @click="open">

      </el-button>
   
    <el-dialog title="编辑用户" :visible.sync="dialogcompile">
      <el-form :model="comForm" :rules="addrules" class="demo-ruleForm">
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input
            v-model="comForm.username"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>

        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="comForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          :label-width="formLabelWidth"
          prop="mobile"
        >
          <el-input v-model="comForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogcompile = false">取 消</el-button>
        <el-button type="primary" @click="compileUser()">确 定</el-button>
      </div>
    </el-dialog>
                                          <!-- 隐藏 -->
    <el-dialog title="分配角色" :visible.sync="dialogall">   
      <el-form :model="all">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            v-model="all.allname"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <el-select v-model="id" placeholder="请选择">
            <el-option
              :label="item.roleName"
              :value="item.id"
              v-for="item in allData"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogall = false">取 消</el-button>
        <el-button type="primary" @click="AllClick()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
import _ from "underscore";
export default {
  data() {
    return {
      val: true,
      status: true,
      ruleForm: {
        pass: "",
      },
      tableData: null,
      pramas: {
        query: "",
        pagenum: 1,
        pagesize: 1,
      },
      allname: "",
      dialogall: false,
      dialogaddForm: false,
      dialogdelete: false,
      dialogcompile: false,

      currentPage4: 1,
      all: {
        region: "测试主管",
        allname: "",
      },
      id: "",
      allData: [],
      comForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
        id: "",
        role_id: "",
      },
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      deleteId: null,
      formLabelWidth: "120px",
      addrules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },

  watch: {
    $route: {
      immediate: true,
      handler(val) {
        this.ruleForm.pass = val.query.query;
        this.pramas.query = val.query.query;
        this.userhand(this.pramas);
      },
    },
  },

  methods: {
    //分配角色
    allClick(val) {
      (this.dialogall = true), (this.all.allname = val.username);
      this.deleteId = val.id;
      this.$apis.allUser().then((res) => {
        this.allData = res;
      });
    },

    AllClick() {
      this.dialogall = false;
      this.$apis.allId(this.deleteId, { id: this.deleteId, rid: this.id });
      this.userhand(this.pramas);
    },
    //修改用户
    comclick(val) {
      this.dialogcompile = true;
      this.comForm = val;
    },
    async compileUser() {
      (this.dialogcompile = false), await this.$apis.comUser(this.comForm);
      this.userhand(this.pramas);
    },  
    // submitForm() {},
    //添加用户
    async pushUser() {
      this.dialogaddForm = false;
      await this.$apis.addUser(this.addForm);
      this.userhand(this.pramas);
    },
    //删除用户
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    async putStatus(val) {
      const { id, mg_state } = val;
      await this.$apis.gutStatus({ id, mg_state });
      this.userhand(this.pramas);
    },
    search() {
      // this.pramas.pagesize=1
      this.pramas.query = this.ruleForm.pass;
      this.userhand(this.pramas);
      this.$router.push({
        query: {
          query: this.ruleForm.pass,
        },
      });
    },
    day(val) {
      return dayjs(val).format("YYYY-MM-DD");
    },
    change() {},
    userhand(pramas) {
      this.$apis.getUser(pramas).then((res) => {
        this.tableData = res;
      });
    },
    handleSizeChange(val) {
      (this.pramas.pagesize = val), this.userhand(this.pramas);
      window.localStorage.setItem("pagesize", val);
    },
    handleCurrentChange(val) {
      (this.pramas.pagenum = val), this.userhand(this.pramas);
      window.localStorage.setItem("pagenum", val);
    },
    indexmins(val) {
      return (this.pramas.pagenum - 1) * this.pramas.pagesize + val + 1;
    },
  },
  mounted() {
    this.userhand(this.pramas);
    this.day();
  },
  created() {
    this.pramas.pagenum = Number(localStorage.getItem("pagenum")) || 1;
    this.pramas.pagesize = Number(localStorage.getItem("pagesize")) || 1;
    this.userhand(this.pramas);
    this.currentPage4 = Number(this.pramas.pagenum);
  },
};
</script>
<style lang="scss" scoped>
.demo-ruleForm {
  margin-top: 20px;
}
</style>
