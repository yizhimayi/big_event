$(function(){
    //需求1：获取用户信息，渲染到页面上
      //要求：封装成功函数，全局函数
      getUserInfo();

      //需求2.退出登录
    $('#btnLogout').on('click',function(){
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            //强制专跳登录页面。销毁token
            location.href ='/login.html'
            localStorage.removeItem('token')
            layer.close(index);
          });
    })
})
function getUserInfo(){
   axios({
    url:'/my/userinfo',
    // headers: {Authorization: localStorage.getItem('token') },
   }).then((res)=>{
    console.log(res.data.data);
    if(res.data.status !==0){
        return layui.layer.msg(res.data.message)
    }
    //渲染
    rendyerAvater(res.data.data)
   })
}


//渲染用户信息和头像
   function  rendyerAvater(user){
    //渲染用户信息
    let name = user.nickname || user.username
   $('.welcome').html('欢迎 '+name)

   //渲染头像
   if(user.user_pic!==null){
    $('.text-avatar').hide();
    $('.layui-nav-img').show().attr('src',user.user_pic)
   }else{
    $('.layui-nav-img').hide();
    let first = name.charAt(0).toUpperCase()
    $('.text-avatar').show().html(first)
   }
   }