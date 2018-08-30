$(() => {
  //商品选项卡
  function goodTab() {
    $("#editor-picture")
      .children("li")
      .on("click", function () {
        $(this)
          .addClass("main-avtive")
          .siblings()
          .removeClass("main-avtive");
        let $src = $(this)
          .find("img")
          .attr("src");
        $(".editor-picture-item").attr("src", $src);
      });
  }
  goodTab();

  //放大镜
  function Magnifier() {}

  $.extend(Magnifier.prototype, {
    init() {
      this.samllBox = $(".smallBox");
      this.grayBox = $(".grayBox");
      this.bigBox = $(".bigBox");
      this.samllImg = this.samllBox.find("img");
      this.bigImg = this.bigBox.find("img");

      //放大比例
      this.widthprop = this.bigBox.width() / this.grayBox.width();
      this.heightprop = this.bigBox.height() / this.grayBox.height();

      this.bigImg.width(this.samllBox.width() * this.widthprop);
      this.bigImg.height(this.samllBox.height() * this.heightprop);

      this.handEvent();
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
        opacity: 0.5
      });
    },
    outEvent() {
      // console.log("outEvent调用");
      this.grayBox.stop().fadeOut();
      this.bigBox.stop().fadeOut();
      this.samllImg.stop().animate({
        opacity: 1
      });
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
      });
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
        top: position.top
      });
      //遮蔽块的背景图片位置
      this.grayBox.css({
        backgroundPosition: -position.left + "px " + -position.top + "px"
      });

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
        top: -totalTop * topProp
      });
    }
  });
  new Magnifier().init();

  //购物车加购
  function ShoppingCarPlus() {}
  ShoppingCarPlus.prototype = {
    init() {
      this.$detail = $(".specs-detail");
      this.$addShopCar = $(".addShopCar");
      this.goodSpecification(); //商品选中规格 颜色 和尺寸;
      this.goodNum(); // 选中商品数量;
      this.addShopCar(); //加入购物车;
    },
    goodSpecification() {
      this.$detail.on("click", function () {
        $(this)
          .addClass("lowModel-specs-active")
          .siblings()
          .removeClass("lowModel-specs-active");
        $(this)
          .children("em")
          .css("display", "block")
          .end()
          .siblings()
          .children("em")
          .css("display", "none");
      });
    },
    goodNum() {
      let num = parseInt($("#panel-number").html());
      $("#panel-add").on("click", function () {
        num += 1;
        $("#panel-number").html(num);
      });
      $("#panel-minus").on("click", function () {
        if (num == 1) {
          $("#panel-number").html(num);
        } else {
          num -= 1;
          $("#panel-number").html(num);
        }
      });
    },
    addShopCar() {
      this.$addShopCar.on("click", function (e) {
        // 商品ID
        var goodId = `${$(".lowModel-specs-active").eq(0).attr("data-good-id")}
                        ${$(".lowModel-specs-active").eq(1).attr("data-good-id")}
                        `;
        // 图片地址
        var goodImgSrc = $("#editor-picture-item").attr("src");
        //商品名字
        var goodName = $("#goodName").text();
        // 商品颜色
        var goodColor = $(".lowModel-specs-active")
          .eq(0)
          .text();
        // 商品尺寸
        var goodSize = $(".lowModel-specs-active")
          .eq(1)
          .text();
        // 商品单价
        var goodPrice = parseFloat($("#goodPrice").text());
        // 商品数量
        var goodNum = parseFloat($("#panel-number").text());
        // 店铺名字
        var storeName = $("#shopStoreName").text();

        var shopCarStr = $.cookie("byShopCar") ? $.cookie("byShopCar") : "";
        var shopCarObj = this.shopCarStrToObj(shopCarStr);
        if (goodId in shopCarObj) {
          shopCarObj[goodId].num = shopCarObj[goodId].num + goodNum;
        } else {
          shopCarObj[goodId] = {
            img: goodImgSrc,
            name: goodName,
            color: goodColor,
            size: goodSize,
            price: goodPrice,
            num: goodNum,
            store: storeName
          };
        }
        shopCarStr = JSON.stringify(shopCarObj);
        $.cookie("byShopCar", shopCarStr, {
          expires: 7,
          path: "/"
        });

        shopCarStr = $.cookie("byShopCar") ? $.cookie("byShopCar") : "";
        shopCarObj = this.shopCarStrToObj(shopCarStr);
        loadShopCar();
      }.bind(this));
    },
    shopCarStrToObj(str) {
      if (!str) {
        return {};
      }
      return JSON.parse(str);
    }

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
  };

  new ShoppingCarPlus().init();






  // 购物车操作
  class OperateShoppingCart {
    constructor() {
      this.shopCarStr = $.cookie("byShopCar") ? $.cookie("byShopCar") : "";
      this.loadCar();
      this.deletegood(); // 删除商品
      this.event(); //操纵商品数量
      this.totalNumReload();
    }
    //刷新页面加载购物车
    loadCar() {
      if (!this.shopCarStr) {
        $(".commodityHints").css({
          display: "block"
        });
      } else {
        let shopCarObj = shopCarStrToObj(this.shopCarStr);
        for (var id in shopCarObj) {
          var good = shopCarObj[id];
          var str = `
                    <div class="shopStore">
                        <i class="checked"></i>
                        <span class="inline">商家：</span>
                        <span id="J_product_name " class="inline col_666">${
                          good.store
                        }</span>
                    </div>
                    <ul class="shopgood clearfix" data-shop-id = "${id}">
                        <li class="goodsLi1 text-L" style="width:15% ">
                            <i class="checked"></i>
                            <p>
                                <img src="${good.img}" alt="">
                            </p>
                        </li>
                        <li class="goodsLi2" style="width:40%">
                            <ul>
                                <li class="goodsLi2-active">${
                                  good.name
                                }</li>
                                <li>颜色:${good.color}</li>
                                <li>尺寸:${good.size}</li>
                            </ul>
                        </li>
                        <li class="goodsLi3" style="width:10%">
                            <b>￥${good.price}</b>
                        </li>
                        <li class="goodsLi4" style="width:20%">
                            <div>
                                <p class="reduce"></p>
                                <input class="changeNum" type="text" value="${good.num}">
                                <p class="add"></p>
                            </div>
                        </li>
                        <li class="goodsLi3" style="width:10%">
                            <b class="smallPlan">￥${good.price *
                              good.num}</b>
                        </li>
                        <li class="goodsLi6" style="width:5%">
                                <a href="javascript:void(0)" class="deletegood"></a>
                            </li>
                    </ul>
                    `;
          $(".shoppingBox").prepend(str);
        }
        this.calculatingPrice();
      }
    }
    calculatingPrice() {
      let str1 = `
                <div class="shopCar-statistics">
                <div class="shopCar-statistics-left">
                    <i class="checked"></i>
                    <span>全选</span>
                    <a id="deleteAll" href="javascript:void(0)">删除</a>
                </div>
                <dl class="shopCar-statistics-right">
                    <dt>
                        商品总数<span class="buyNum"></span>件
                    </dt>
                    <dd>
                        商品总价:<span class="totalPrice"></span>
                    </dd>
                </dl>

                </div>
                <div class="shopCar-buy">
                    <a class="goonShopping " href="javascript:void(0)">继续购物</a>
                    <a class="tallyBTnPos " href="javascript:void(0)">结算</a>
                    <p>合计:
                        <span class="totalPrice"></span>
                    </p>

                </div>

                    `;
      $(".shoppingBox").append(str1);
      this.totalPrice();
    }
    // 计算价格
    totalPrice() {
      $(".buyNum").html($("#buyNum").html());
      var totalP = 0;
      for (let i = 0; i < $(".smallPlan").length; i++) {
        // console.log(parseFloat($(".smallPlan")[i].innerHTML.substring(1)));
        totalP += parseFloat($(".smallPlan")[i].innerHTML.substring(1));
      }
      $('.totalPrice').html(`￥${totalP}`)

    }
    // 删除商品
    deletegood() {
      var _this = this;
      $(".deletegood").on('click', function () {
        var id = $(this).parents('.shopgood').attr("data-shop-id");
        $(this).parents('.shopgood').prev('.shopStore').remove().end().remove();
        _this.totalPrice() //更新价格

        // 删除cookie中的商品信息
        var shopCarStr = $.cookie("byShopCar") ? $.cookie("byShopCar") : "";
        var shopCarObj = JSON.parse(shopCarStr);
        delete shopCarObj[id];
        shopCarStr = JSON.stringify(shopCarObj);
        $.cookie("byShopCar", shopCarStr, {
          expires: 7,
          path: "/"
        });
        _this.totalPrice();
        _this.totalNumReload();

      })

    }
    event() {

      var _this = this;
      //减少商品数量
      $('.reduce').on('click', function () {
        var id = $(this).parents('.shopgood').attr("data-shop-id");
        var shopCarStr = $.cookie("byShopCar") ? $.cookie("byShopCar") : "";
        var shopCarObj = JSON.parse(shopCarStr);
        if (shopCarObj[id].num > 1) {
          shopCarObj[id].num -= 1;
        }
        $(this).siblings('input').val(shopCarObj[id].num)
        // 更新小计
        $(this).parents(".goodsLi4").next(".goodsLi3").children(".smallPlan").html(`￥${shopCarObj[id].price * shopCarObj[id].num}`)
        shopCarStr = JSON.stringify(shopCarObj);
        $.cookie("byShopCar", shopCarStr, {
          expires: 7,
          path: "/"
        });
        _this.totalPrice();
        _this.totalNumReload();

      })

      //增加商品数量
      $('.add').on('click', function () {
        var id = $(this).parents('.shopgood').attr("data-shop-id");
        var shopCarStr = $.cookie("byShopCar") ? $.cookie("byShopCar") : "";
        var shopCarObj = JSON.parse(shopCarStr);
        shopCarObj[id].num += 1;
        $(this).siblings('input').val(shopCarObj[id].num)
        // 更新小计
        $(this).parents(".goodsLi4").next(".goodsLi3").children(".smallPlan").html(`￥${shopCarObj[id].price * shopCarObj[id].num}`)
        shopCarStr = JSON.stringify(shopCarObj);
        $.cookie("byShopCar", shopCarStr, {
          expires: 7,
          path: "/"
        });
        _this.totalPrice();
        _this.totalNumReload();

      })

      // 输入框失焦事件
      $('.changeNum').blur(function () {
        var id = $(this).parents('.shopgood').attr("data-shop-id");
        var shopCarStr = $.cookie("byShopCar") ? $.cookie("byShopCar") : "";
        var shopCarObj = JSON.parse(shopCarStr);

        var pattern = /^\d+$/;
        if (!pattern.test($(this).val())) {
          shopCarObj[id].num = 1;
          $(this).val(1)
        }
        //修改数量
        shopCarObj[id].num = parseInt($(this).val());
        $(this).parents(".goodsLi4").next(".goodsLi3").children(".smallPlan").html(`￥${shopCarObj[id].price * shopCarObj[id].num}`)
        shopCarStr = JSON.stringify(shopCarObj);
        $.cookie("byShopCar", shopCarStr, {
          expires: 7,
          path: "/"
        });
        _this.totalPrice();
        _this.totalNumReload();

      })

      $('#deleteAll').on('click', function () {
        $('.shopStore,.shopgood').remove();
        $.cookie("byShopCar", "", {
          expires: -1,
          path: "/"
        })
        _this.totalPrice();
        _this.totalNumReload();
        location.reload();

      })
    }
    totalNumReload() {
      var totalNum = 0;
      for (var i = 0; i < $('.changeNum').length; i++) {
        totalNum += parseInt($('.changeNum')[i].value);
      }
      $('#buyNum,.buyNum').html(totalNum);
    }
  }


  new OperateShoppingCart();

  function loadShopCar() {
    var shopCarStr = $.cookie("byShopCar") ? $.cookie("byShopCar") : "";
    var shopCarObj = shopCarStrToObj(shopCarStr);
    // 获取购物车中商品的数量
    var total = 0;
    for (var id in shopCarObj) {
      total += shopCarObj[id].num;
    }
    $(".num").html(total);
  }
  //  把cookie从字符串转为对象
  function shopCarStrToObj(str) {
    if (!str) {
      return {};
    }
    return JSON.parse(str);
  }

  loadShopCar();



});