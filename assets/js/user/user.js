$(function () {
    //需求1： 自定义校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度在1~6个字符之间'
            }
        }
    })
    
   //需求2：ajax 获取用户信息，渲染到页面上

   initUserInfo()
   //封装函数
   function initUserInfo(){
    axios({
        method:'GET',
        url:'/my/userinfo'
    }).then((res)=>{
        // console.log(res.data);
        if(res.data.status !==0){
            return layer.msg('res.msg.message')
        }
        //内置模块->表单—>表单赋值/取值
        form.val("formTest", res.data.data);
           
    })
   }

   //重置表单
   $('#btnReset').on('click',function(e){
    //阻止默认行为
    e.preventDefault();
    //重新渲染
    initUserInfo();
   })
})


