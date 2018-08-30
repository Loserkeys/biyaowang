$(() => {

    class Register {
        constructor() {
            this.init()
            this.storageUser();//点击注册
        }
        init() {

            // 用户名规则
            $('#userName').on('blur', function () {
                let $userName = $('#userName').val();
                let pattern = /^((13[\d])|(15[0-9])|(16[6,7,8,9])|(17[1,3,6,7,8,9])|(1[6,8][1,6,8,9]))\d{8}$/;
                if (!$userName) {
                    $(this).siblings('i').css({
                        'display': 'block'
                    })
                } else if (!pattern.test($userName)) {
                    $(this).siblings('i').css({
                        'display': 'block'
                    })
                } else if (pattern.test($userName)) {
                    $(this).siblings('i').css({
                        'display': 'none'
                    })
                }
            })
            // 验证码规则
            $('#phoneCode').on('blur', function () {
                var $phoneCode = $('#phoneCode').val()
                if (!$phoneCode) {
                    $(this).siblings('i').css({
                        'display': 'block'
                    })
                } else {
                    $(this).siblings('i').css({
                        'display': 'none'
                    })
                }
            })
            $('#password').on('blur', function () {
                let $password = $('#password').val();
                let pattern = /^\w{6,32}$/;
                if (!password) {
                    $(this).siblings('i').css({
                        'display': 'block'
                    })
                } else if (!pattern.test($password)) {
                    $(this).siblings('i').css({
                        'display': 'block'
                    })
                } else if (pattern.test($password)) {
                    $(this).siblings('i').css("display", "none")
                }
            })
            $('#repeatPassword').on('blur', function () {
                let $repeatPassword = $('#repeatPassword').val()
                if ($repeatPassword == $('#password').val()) {
                    $(this).siblings('i').css("display", "none")
                } else {
                    $(this).siblings('i').css("display", "block")
                }
            })

            this.storageUser()
        }
        storageUser() {
                var _this = this
            $('.account-btn').on('click',function(){
                var userStr = $.cookie("byRegisterUserStr") ? $.cookie("byRegisterUserStr") : "";
                var userObj = _this.userStrToObj(userStr);

                if($('#userName').val() in userObj){
                    alert("用户名注册");
                    return
                }else{
                    userObj[$('#userName').val()] = $('#password').val();
                }
                userStr = JSON.stringify(userObj);
                $.cookie("byRegisterUserStr",userStr,{expires:7,path:"/"});
                alert("注册成功");
                location.href = "login.html"
            })

        }
        userStrToObj(str) {
            if (!str) {
                return {};
            }
            return JSON.parse(str);
        }
    }

    new Register();

})