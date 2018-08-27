$(() => {
    //商品选项卡
    function goodTab() {
        $('#editor-picture').children('li').on('click', function () {
            $(this).addClass('main-avtive').siblings().removeClass('main-avtive');
            let $src = $(this).find('img').attr('src');
            $('#editor-picture-item').attr('src', $src);
        })
    }
    goodTab()

    //购物车加购
    function ShoppingCarPlus() {}
    ShoppingCarPlus.prototype = {
        init() {
            this.$detail = $('.specs-detail');
            this.$addShopCar = $('.addShopCar');
            this.goodSpecification(); //商品选中规格 颜色 和尺寸;
            this.goodNum(); // 选中商品数量;
            this.addShopCar(); //加入购物车
        },
        goodSpecification() {
            this.$detail.on('click', function () {
                $(this).addClass('lowModel-specs-active').siblings().removeClass('lowModel-specs-active');
                $(this).children('em').css("display", "block").end().siblings().children('em').css('display', 'none');
            })
        },
        goodNum() {
            let num = parseInt($('#panel-number').html());
            $('#panel-add').on('click', function () {
                num += 1;
                $('#panel-number').html(num)
            });
            $('#panel-minus').on('click', function () {
                if (num == 1) {
                    $('#panel-number').html(num)
                } else {
                    num -= 1;
                    $('#panel-number').html(num)
                }
            })

        },
        addShopCar(){
            this.$addShopCar.on('click',function(e){
                // 图片地址
                let goodImgSrc =  $('#editor-picture-item').attr('src'); 
                // 商品ID
                let goodId = `${$('.lowModel-specs-active').eq(0).attr('data-good-id')}${$('.lowModel-specs-active').eq(1).attr('data-good-id')}`;
                // 商品颜色
                let goodColor = $('.lowModel-specs-active').eq(0).text();
                // 商品尺寸
                let goodSize = $('.lowModel-specs-active').eq(1).text();
                // 商品单价
                let goodPrice = $('#goodPrice').text();
                // 商品数量
                let goodNum = $('#panel-number').text()
                
                var shopCarStr = $.cookie('byShopCar') ? $.cookie('byShopCar') : '';

                var shopCarObj = shopCarStrToObj(shopCarStr);

                
            }.bind(this))
        },
        shopCarStrToObj(shopCarStr){
            if(!shopCarStr){
                return {}
            }
        },
        shopCarObjToStr(){

        },
        loadShopCar(){

        }

    }
    new ShoppingCarPlus().init();
})