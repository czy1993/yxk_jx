<template> 
    <div id="changePassword" class="system_component" >
        <div class="system_view">
            <!-- <EcRouterBack  routerName='system'  /> -->
              <h4>修改密码</h4>
            <div class="views">
                <el-input class="texts" v-model="oldPass" show-password placeholder="请输入您的密码"></el-input>
            </div>
            <div class="views">
                <el-input class="texts" v-model="newPassI" show-password :placeholder="passPlaceholder"></el-input>
            </div>
            <div class="views">
                <el-input class="texts" v-model="newPass"  maxlength='16' show-password placeholder="请输入您的新密码"></el-input>
            </div>
            <div class="buts" @click="save_updatePass()" >提交</div>
        </div>
    </div>
</template>
<script>
import { updatePass } from "@/api/user.js";
import axios from 'axios';
import { baseUrl } from "@/utils/env.js";
import EcRouterBack from "@/components/EduactionRouterBack.vue"
export default {
    data(){
        return{
            oldPass:"",
            newPassI:"",
            newPass:"",
            passPlaceholder:"请输入您的新密码"
        }
    },
    components:{
        EcRouterBack
    },
    methods:{
        save_updatePass(){
             const passreg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/;
            if(this.oldPass == '' || this.newPass == ''  || this.newPassI == ''){
                this.$message.error('请输入新旧密码再行操作');
            }else if(this.newPassI != this.newPass){
                this.$message.error('两次新密码输入不一致');
            }else if(!passreg.test(this.newPass)){
                this.$message.error('新密码必须为8-16 数字加大小写字母');
            }else{
                updatePass({
                    oldPass:this.$md5(this.oldPass),
                    newPass:this.$md5(this.newPass)
                }).then( res =>{
                    if(res.code == 200){
                        this.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                        this.$router.go(-1)
                    }
                })
            }
            
        }
    },
    watch:{
        
    }
}
</script>