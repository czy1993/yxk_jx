
// 系统设置api
import request from '@/utils/request'
export function login(data){
    return request({
        url:"/agency/front/system/login",
        method:"post",
        data
    })
}
// /agency/front/system/accountList 查询机构账号  ?agencyId=2&current=1&size=1
export function accountList(data){
    return request({
        url:"/agency/front/system/accountList"+data,
        method:"get"
    })
}

// /agency/front/system/addAccount 新增机构账号
export function addAccount(data){
    return request({
        url:"/agency/front/system/addAccount",
        method:"post",
        data
    })   
}
// 删除账号
export function deleteUser(data){
    return request({
        url:"/agency/front/system/deleteUser"+data,
        method:'get'
    })
}
//  重置密码
export function resetPass(data){
    return request({
        url:"/agency/front/system/resetPass"+data,
        method:"get",
        headers:{
            'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
        }
    })
}
//  查询机构层级
export function searchLevel(data){
    return request({
        url:"/agency/front/system/searchLevel"+data,
        method:"get"
    })
}
//  修改密码
export function updatePass(data){
    return request({
        url:'/agency/front/system/updatePass',
        method:"post",
        data
    })
}
// /agency/front/system/levelList 查询机构权限
export function levelList(data){
    return request({
        url:"/agency/front/system/levelList"+data,
        headers: {
            'Content-Type':' application/x-www-form-urlencoded;charset=utf-8 '
        },
        method:"get"
    })
}
// /agency/front/system/levelUpdate 修改机构权限
export function levelUpdate(data){
    return request({
        url:"/agency/front/system/levelUpdate",
        method:"post",
        data
    })
}
// 增加机构层级
export function levelAdd(data){
    return request({
        url:"/agency/front/system/levelAdd",
        method:"post",
        data
    })
}
// /agency/front/system/systemAbout 关于平台信息
export function systemAbout(){
    return request({
        url:"/agency/front/system/systemAbout",
        method:"get"
    })
}

//数据字典
export function getDict(data) {
    return request({
    url: `/agency/front/system/getDict?${data}`,
    method: "get"
    });
}
//查询菜单
export function queryUserMenu() {
    return request({
      url: "/agency/front/system/searchLeftMenu",
      method: "get"
    });
}
//  单文件上传
export function uploadSingle(data,urls){
    return request({
        url:"/agency/front/system/uploadSingle/"+urls,
        method:'post',
        headers: {
            'Content-Type':' application/x-www-form-urlencoded;charset=utf-8 '
        },
        data,
    })
}
//  修改用户层级
export function changeLevel(data){
    return request({
        url:"/agency/front/system/changeLevel"+data,
        method:"get"
    })
}
//   忘记密码之校验手机号
export function sendVerifyCode(data){
    return request({
        url:"/agency/front/system/sendVerifyCode"+data,
        method:"get"
    })
}
//  忘记密码之重设密码
export function forgetPassReset(data){
    return request({
        url:"/agency/front/system/forgetPassReset",
        method:"post",
        data
    })
}