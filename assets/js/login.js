$(function() {

    $('#login-rt').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link-rt').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            var pwd = $('#password').val()
            if (pwd !== value) {
                return '密码不一致请重新输入'
            }
        }
    })
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                console.log(res.status)
                return layer.msg(res.message)
            }


            layer.msg('注册成功，请登录')
            $('#link-rt').click()
        })
    })
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res.status)
                if (res.status !== 0) {
                    return layer.msg('登录失败，请重新登录')
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                location.href = '/index.html'
            }

        })
    })
})