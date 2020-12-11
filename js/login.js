$(function() {

    $('#login').validate({
        //规则配置
        rules: {
            phone: {
                required:true,
                minlength:10,
                maxlength:12
            },
            password:{
                required:true,
                minlength: 6,
                maxlength: 12

            }
        },
        // 提示信息配置
        messages: {
           phone:{
            required: '请输入正确手机号/邮箱地址/华为号',
            minlength:'最少10个字符',
            maxlength:'最多12个字符'
           },
           password:{
               required:' 请输入密码',
               minlength:'最少6个字符',
               maxlength: '最多16个字符'
           }
        }, 
        //表单提交事件
        submitHandler(form){
            // console.log('验证通过')
            const info = $(form).serialize()
            // console.log(info)
            //2-2 发送请求
            $.post('../server/login.php', info, null, 'json').then(res => {
                // console.log(res)

                if(res.code === 0){
                    // $('.login_error').removeClass('hide')
                    console.log('登录失败')
                }else if(res.code === 1){
                    // $('.login_error').addClass('hide')
                    console.log('登录成功')
                    setCookie('nickname',res.nickname,30 )
                    window.location.href = '../pages/index.html'
                    $(".login").addClass('hide').next().removeClass('hide')
                }
            })
        }
    })

})

