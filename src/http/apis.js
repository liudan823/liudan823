import http from './index'
import store from '../store'
import {
    SET_INFO
} from '../store/mutation-type'
import router from '../router'
import {
    mapMutations
} from 'vuex'
import { Message } from 'element-ui'
// import { delete } from 'vue/types/umd'
export default {
    //登录
    login: (data, message) => {
        http('login', data, 'POST')
            .then(({
                meta: {
                    msg
                },
                data: {
                    token,
                    username
                }
            }) => {
                message({
                    type: 'success',
                    message: msg
                })
                store.commit(SET_INFO, {
                    token,
                    username
                })
                router.push({
                    name: 'Home'
                })
            }).catch(err => {
                message({
                    type: 'error',
                    message: err
                })
            })
    },
    // 获取左侧权限菜单
    async getMenus() {
        const res = await http('menus', null, 'GET')
        return res.data;
    },
    async getUser(parmas) {
        const res = await http('users', null, 'GET',parmas)
        return res.data;
    },
    async gutStatus({id,mg_state}){
        const res= await http(`users/${id}/state/${mg_state}`,null,'PUT')
        Message({
            type:'success',
            message:res.meta.msg
        })
        return res.data
    },
    //添加用户
    async addUser(data){
    //   const {username,password,email,mobile}=data
        const res=await http("users",data,'POST');

        Message({
            type:'success',
            message:res.meta.msg
        })
        
    },
    //删除用户
    async deleteUser(id){
        console.log(id)
        const res=await http(`users/${id}`,null,'delete')
        Message({
            type:'success',
            message:res.meta.msg
        })
        return res.data
    },
    //修改用户
    async comUser(data){
        const res=await http(`users/${data.id}`,data,'PUT')
        Message({
            type:'success',
            message:res.meta.msg
        })
        return res.data
    },
    //分配角色
    async allUser(){
        const res=await http('roles',null,"GET")
        // Message({
        //     type:'success',
        //     message:res.meta.msg
        // })
        return res.data
    },
    async allId(ID,body){
        const res=await http(`users/${ID}/role`,body
        ,'PUT')
        Message({
            type:'success',
            message:res.meta.msg
        })
        return res.data
        
    },
    //获取角色列表
    async getRoles(){
        const res=await http(`roles`,null ,'GET')
        return res.data
    }
}