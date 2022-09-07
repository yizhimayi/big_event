$(function () {
    //需求1：自定义校验规则
    //密码规则
    let form = layui.form;
    var layer = layui.layer;
    form.verify({
        //密码规则
        pwd: [
            /^[\S]{6,15}$/
            , '密码必须6到15位，且不能出现空格'
        ],
        //新密码规则
        newPwd: function (value) {
            let v1 = $('[ name=oldPwd]').val()
            if (value == v1) {
                return '新密码和旧密码不可以相同'
            }
        },
        rePwd: function (value) {
            let v2 = $('[name=newPwd]').val()
            if (value !== v2) {
                return '两次密码不一致，请重新输入'
            }
        }
    })


    //需求2：修改密码
    $('#formPwd').on('submit', function (e) {
        e.preventDefault();
        axios({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize()
        }).then(res => {
            if (res.data.status !== 0) {
                return layer.msg(res.data.message)
            }
            layer.msg('修改成功')
            //重置表单 reset() 是DOM对象
            $("#formPwd")[0].reset()
           setTimeout(()=>{
          window.parent.location.href='/login.html'
           })
        })
    })
})