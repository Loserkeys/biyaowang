$(() => {

    class Login {
        constructor() {
            this.event()
            this.init();
        }
        init(){
            
            $('.pwd-btn').on('click',function(){
                $(this).addClass('login-checked').siblings('.sms-btn').removeClass('login-checked').end().parents('.account-title').siblings(".pwd-login").removeClass('hide').siblings('.sms-login').addClass("hide")
            })
            $('.sms-btn').on('click',function(){
                $(this).addClass('login-checked').siblings('.pwd-btn').removeClass('login-checked').end().parents('.account-title').siblings(".sms-login").removeClass('hide').siblings('.pwd-login').addClass("hide")
            })
        }
        event(){
            

        }
    }

    new Login();

})