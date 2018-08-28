$(() => {
    //商品选项卡
    function goodTab() {
        $('#editor-picture').children('li').on('click', function () {
            $(this).addClass('main-avtive').siblings().removeClass('main-avtive');
            let $src = $(this).find('img').attr('src');
            $('.editor-picture-item').attr('src', $src);

        })
    }
    goodTab()

    //放大镜
    function Magnifier() {};

    $.extend(Magnifier.prototype, {
        init() {
            this.samllBox = $(".smallBox");
            this.grayBox = $(".grayBox")
            this.bigBox = $(".bigBox");
            this.samllImg = this.samllBox.find("img");
            this.bigImg = this.bigBox.find("img");

            //放大比例
            this.widthprop = this.bigBox.width() / this.grayBox.width();
            this.heightprop = this.bigBox.height() / this.grayBox.height();

            this.bigImg.width(this.samllBox.width() * this.widthprop);
            this.bigImg.height(this.samllBox.height() * this.heightprop);


            this.handEvent()
        },
        handEvent() {
            this.samllBox.on("mouseenter", $.proxy(this.overEvent, this));
            this.samllBox.on("mouseleave", $.proxy(this.outEvent, this));
            this.samllBox.on("mousemove", $.proxy(this.moveEvent, this));
        },
        overEvent() {
            // console.log("overEvent调用")
            this.grayBox.stop().fadeIn();
            this.bigBox.stop().fadeIn();
            this.samllImg.stop().animate({
                opacity: .5
            })
        },
        outEvent() {
            // console.log("outEvent调用");
            this.grayBox.stop().fadeOut();
            this.bigBox.stop().fadeOut();
            this.samllImg.stop().animate({
                opacity: 1
            })

        },
        moveEvent(event) {
            // console.log("moveEvent调用");
            var evt = event || window.event;
            //鼠标坐标;
            var nLeft = evt.offsetX;
            var nTop = evt.offsetY;
            //
            this.posElem({
                left: nLeft - this.grayBox.width() / 2,
                top: nTop - this.grayBox.height() / 2
            })

        },
        posElem(position) {
            // console.log("posElem调用");
            //边界检测
            var maxLeft = this.samllBox.width() - this.grayBox.width();
            position.left = position.left <= 0 ? 0 : position.left;
            position.left = position.left >= maxLeft ? maxLeft : position.left;

            var maxTop = this.samllBox.height() - this.grayBox.height();
            position.top = position.top <= 0 ? 0 : position.top;
            position.top = position.top >= maxTop ? maxTop : position.top;
            //遮蔽块的位置
            this.grayBox.css({
                left: position.left,
                top: position.top,
            })
            //遮蔽块的背景图片位置
            this.grayBox.css({
                backgroundPosition: -position.left + "px " + -position.top + "px",
            })

            //行进总路程
            var totalleftRoad = this.samllBox.width() - this.grayBox.width();
            var totaltopRoad = this.samllBox.height() - this.grayBox.height();

            //行进路程比例
            var leftProp = (position.left / totalleftRoad).toFixed(2);
            var topProp = (position.top / totaltopRoad).toFixed(2);

            //大图的总路程
            var totalLeft = this.bigImg.width() - this.bigBox.width();
            var totalTop = this.bigImg.height() - this.bigBox.height();

            this.bigImg.css({
                left: -totalLeft * leftProp,
                top: -totalTop * topProp,
            })
        }

    })
    new Magnifier().init();


    //购物车加购
    function ShoppingCarPlus() {}
    ShoppingCarPlus.prototype = {
        init() {
            this.$detail = $('.specs-detail');
            this.$addShopCar = $('.addShopCar');
            this.goodSpecification(); //商品选中规格 颜色 和尺寸;
            this.goodNum(); // 选中商品数量;
            this.addShopCar(); //加入购物车;
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
        addShopCar() {
            this.$addShopCar.on('click', function (e) {
                // 商品ID
                var goodId = `${$('.lowModel-specs-active').eq(0).attr('data-good-id')}${$('.lowModel-specs-active').eq(1).attr('data-good-id')}`;
                // 图片地址
                var goodImgSrc = $('#editor-picture-item').attr('src');
                //商品名字
                var goodName = $('#goodName').text();
                // 商品颜色
                var goodColor = $('.lowModel-specs-active').eq(0).text();
                // 商品尺寸
                var goodSize = $('.lowModel-specs-active').eq(1).text();
                // 商品单价
                var goodPrice = parseFloat($('#goodPrice').text());
                // 商品数量
                var goodNum = parseFloat($('#panel-number').text());

                var shopCarStr = $.cookie('byShopCar') ? $.cookie('byShopCar') : '';
                var shopCarObj = this.shopCarStrToObj(shopCarStr);
                if (goodId in shopCarObj) {
                    shopCarObj[goodId].num = shopCarObj[goodId].num + goodNum;
                } else {
                    shopCarObj[goodId] = {
                        "img": goodImgSrc,
                        "name": goodName,
                        "color": goodColor,
                        "size": goodSize,
                        "price": goodPrice,
                        "num": goodNum
                    }
                }
                shopCarStr = JSON.stringify(shopCarObj);
                $.cookie('byShopCar', shopCarStr, {
                    expires: 7,
                    path: "/"
                });

                shopCarStr = $.cookie('byShopCar') ? $.cookie('byShopCar') : '';
                shopCarObj = this.shopCarStrToObj(shopCarStr);
                loadShopCar()
                console.log(shopCarObj);
            }.bind(this))
        },
        shopCarStrToObj(str) {
            if (!str) {
                return {}
            }
            return JSON.parse(str)
        },

        //本地储存技术
        // addShopCar() {
        //     this.$addShopCar.on('click', function (e) {
        //         // 商品ID
        //         var goodId = `${$('.lowModel-specs-active').eq(0).attr('data-good-id')}${$('.lowModel-specs-active').eq(1).attr('data-good-id')}`;
        //         // 图片地址
        //         var goodImgSrc = $('#editor-picture-item').attr('src');
        //         //商品名字
        //         var goodName = $('#goodName').text();
        //         // 商品颜色
        //         var goodColor = $('.lowModel-specs-active').eq(0).text();
        //         // 商品尺寸
        //         var goodSize = $('.lowModel-specs-active').eq(1).text();
        //         // 商品单价
        //         var goodPrice = $('#goodPrice').text();
        //         // 商品数量
        //         var goodNum = $('#panel-number').text();

        //         // 获取本地储存的数据;
        //         var shopCarStr = localStorage.getItem("byShopCar") ? localStorage.getItem("byShopCar") : "";
        //         var shopCarObj = JSON.parse(shopCarStr);
        //         var shopCarObj ={}
        //         if (goodId in shopCarObj) {
        //             shopCarObj[goodId].num += 1;
        //         } else {
        //         }
        //         shopCarStr = JSON.stringify(shopCarObj);
        //         //储存用户信息
        //         localStorage.setItem("byshopCar",shopCarStr);

        //         var shopCarObj = shopCarStrToObj(shopCarStr);


        //     }.bind(this))
        // },
    }
    //加载页面时初始化购物车数量
    function loadShopCar() {
        var shopCarStr = $.cookie('byShopCar') ? $.cookie('byShopCar') : '';
        var shopCarObj = shopCarStrToObj(shopCarStr);
        // 获取购物车中商品的数量
        var total = 0;
        for (var id in shopCarObj) {
            total += shopCarObj[id].num
        }
        $('#buyNum').html(total);
    }
    function shopCarStrToObj(str) {
            if (!str) {
                return {}
            }
            return JSON.parse(str)
        }

        loadShopCar();

    new ShoppingCarPlus().init();
})