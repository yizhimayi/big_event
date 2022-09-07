$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //为上传绑定点击事件
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    //为文件选择框绑定change
    $('#file').on('change', function (e) {
        //获取用户选择的图片
        var filelist = e.target.files
        if (filelist.lenght === 0) {
            return layui.layer.msg('请选择照片')
        }


        //拿到用户选择的文件
        var file = e.target.files[0]
        //将文件转化为路径
        var newImgURL = URL.createObjectURL(file)

        //重新初始化裁剪区域
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })


    $('#btnUPload').on('click', function (e) {
        //拿到用户剪裁之后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        
        //调用接口将头像上传到服务器
        var layer = layui.layer
        e.preventDefault();
        axios({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
              }
        }).then(res => {
            console.log(res);
            if (res.data.status !== 0) {
                return layer.msg('111')
                console.log(res.data);
            }
            layer.msg('修改成功')
            window.parent.getUserInfo()
         
        })

    })
})
