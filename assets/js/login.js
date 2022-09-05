$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.registter-box').show()
    })
    $('#login_log').on('click', function () {
        $('.login-box').show()
        $('.registter-box').hide()
    })

    //layui 获取form ， 自定义pwd 和 repwd
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.registter-box [name=password]').val()
            if (pwd !== value) {
                return "密码不一致"
            }
        }
    })
    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=user]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser',
            data
            ,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功,请登录')
                $('#login_log').click()
            }
        )
    })

    //监听登录表单注册事件
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        var data = {
            username: $('#form_login [name=user]').val(),
            password: $('#form_login [name=password]').val()
        }
        $.post('/api/login',
       data,
        function(res){
            if (res.status !== 0) {
                return layer.msg('登录失败');
            }
            layer.msg('登录成功')
            localStorage.setItem('token', res.token)
            location.href = '/index.html'
        }
        )
    })

    // $('#form_login').submit(function(e){
    //     e.prevntDefault()
    //        $.ajax({
    //         url:'http://www.liulongbin.top:3007/api/login',
    //         method:'POST',
    //         data:$(this).serialize(),
    //         success:function(res){
    //             if(res.status !==0){
    //                 return layer.msg('登录失败')
    //             }
    //             layer.msg('登录成功')
    //         }
    //        })
    // })

})


