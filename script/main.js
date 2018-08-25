$(() => {
    // console.log("链接测试成功");




    //改变透明度轮播 固定样式
    // class Slider {
    //     constructor(slider) {
    //         this.$ele = $('#banner>.round');
    //         this.init();
    //     }
    //     init() {
    //         this.index = 0;
    //         this.timer = null;
    //         this.left = $('#bt-left');
    //         this.right = $('#bt-right');
    //         this.num = $('.banner>.round>li').length;
    //         this.roundIndex = $('#roundIndex')
    //         this.event();
    //         this.round();
    //         this.autoplay();
    //         this.stop()

    //     }
    //     event() {
    //         // console.log("event调用成功");
    //         let _this = this;
    //         $(_this.left).on('click', function () {
    //             _this.index--;
    //             if (_this.index == -1) {
    //                 _this.index = _this.num - 1;
    //             }
    //             _this.active()
    //         });
    //         $(_this.right).on('click', function () {
    //             _this.index++
    //                 if (_this.index == _this.num) {
    //                     _this.index = 0;
    //                 }
    //             _this.active()
    //         })
    //     }
    //     round() {
    //         let _this = this;
    //         _this.roundIndex.children().on('click', function () {
    //             // console.log($(this).index());

    //             $(this).css({
    //                     "border": "2px solid #f7b200",
    //                     "background": "#f7b200"
    //                 })
    //                 .siblings().css({
    //                     "border": "2px solid #5a4070",
    //                     "background": "#d7d7d7"
    //                 });
    //             _this.index = $(this).index();
    //             console.log(_this.index);

    //             _this.active();
    //         })
    //     }
    //     active() {
    //         let _this = this;
    //         this.$ele.children().eq(_this.index).stop().animate({
    //                 "zIndex": 2,
    //                 "opacity": 1,
    //             }, 500)
    //             .siblings().stop().animate({
    //                 "zIndex": 1,
    //                 "opacity": 0
    //             }, 500);
    //         _this.roundIndex.children().eq(_this.index).css({
    //                 "border": "2px solid #f7b200",
    //                 "background": "#f7b200"
    //             })
    //             .siblings().css({
    //                 "border": "2px solid #5a4070",
    //                 "background": "#d7d7d7"
    //             })
    //     }
    //     autoplay() {
    //         let _this = this;
    //         _this.timer = setInterval(function () {
    //             $(_this.right).trigger('click')
    //         }, 3000)
    //     }
    //     stop() {
    //         let _this = this;

    //         this.$ele.hover(function () {
    //             $(_this.left).css("opacity", 1);
    //             $(_this.right).css("opacity", 1);
    //             $(_this.left).on('mouseover', function () {
    //                 $(_this.left).css("opacity", 1);
    //                 $(_this.right).css("opacity", 1);
    //                 clearInterval(_this.timer)
    //             })
    //             $(_this.right).on('mouseover', function () {
    //                 $(_this.left).css("opacity", 1);
    //                 $(_this.right).css("opacity", 1);
    //                 clearInterval(_this.timer)
    //             })
    //             _this.roundIndex.on('mouseover', function () {
    //                 clearInterval(_this.timer)
    //             })


    //             clearInterval(_this.timer)
    //         }, function () {
    //             $(_this.left).css("opacity", 0);
    //             $(_this.right).css("opacity", 0);
    //             _this.autoplay()
    //         })
    //     }
    // }

    // 动态加载轮播

    class Slider {
        constructor(slider) {
            this.$ele = $('#banner>.round');
            this.loadJSON()
                .done($.proxy(function (res) {
                    this.renderPag(res.data.banners)
                }, this))
        }
        loadJSON() {
            return $.ajax({
                url: '../php/indexpage1.json',
                dataType: 'json'
            })
        }
        renderPag(json) {
            var html = "";
            for (let i = 0, len = json.length; i < len; i++) {
                html += `
                        <li>
                            <a href="javascript:void(0)">
                                <img src="${json[i].pcImageUrl}" alt="">
                            </a>
                        </li>`
            }
            $("#round").html(html);
            var res = ''
            for (let i = 0, len = json.length; i < len; i++) {
                res += `
                <li></li>
                `
            }
            $("#roundIndex").html(res);
            this.init()
        }
        init() {
            this.index = 0;
            this.timer = null;
            this.left = $('#bt-left');
            this.right = $('#bt-right');
            this.num = $('.banner>.round>li').length;
            this.roundIndex = $('#roundIndex')
            this.event();
            this.round();
            this.autoplay();
            this.stop()

        }
        event() {
            // console.log("event调用成功");
            let _this = this;
            $(_this.left).on('click', function () {
                _this.index--;
                if (_this.index == -1) {
                    _this.index = _this.num - 1;
                }
                _this.active()
            });
            $(_this.right).on('click', function () {
                _this.index++
                    if (_this.index == _this.num) {
                        _this.index = 0;
                    }
                _this.active()
            })
        }
        round() {
            let _this = this;
            _this.roundIndex.children().on('click', function () {
                // console.log($(this).index());

                $(this).css({
                        "border": "2px solid #f7b200",
                        "background": "#f7b200"
                    })
                    .siblings().css({
                        "border": "2px solid #5a4070",
                        "background": "#d7d7d7"
                    });
                _this.index = $(this).index();
                _this.active();
            })
        }
        active() {
            let _this = this;
            this.$ele.children().eq(_this.index).stop().animate({
                    "zIndex": 2,
                    "opacity": 1,
                }, 500)
                .siblings().stop().animate({
                    "zIndex": 1,
                    "opacity": 0
                }, 500);
            _this.roundIndex.children().eq(_this.index).css({
                    "border": "2px solid #f7b200",
                    "background": "#f7b200"
                })
                .siblings().css({
                    "border": "2px solid #5a4070",
                    "background": "#d7d7d7"
                })
        }
        autoplay() {
            let _this = this;
            _this.timer = setInterval(function () {
                $(_this.right).trigger('click')
            }, 5000)
        }
        stop() {
            let _this = this;

            this.$ele.hover(function () {
                $(_this.left).css("opacity", 1);
                $(_this.right).css("opacity", 1);
                $(_this.left).on('mouseover', function () {
                    $(_this.left).css("opacity", 1);
                    $(_this.right).css("opacity", 1);
                    clearInterval(_this.timer)
                })
                $(_this.right).on('mouseover', function () {
                    $(_this.left).css("opacity", 1);
                    $(_this.right).css("opacity", 1);
                    clearInterval(_this.timer)
                })
                _this.roundIndex.on('mouseover', function () {
                    clearInterval(_this.timer)
                })


                clearInterval(_this.timer)
            }, function () {
                $(_this.left).css("opacity", 0);
                $(_this.right).css("opacity", 0);
                _this.autoplay()
            })
        }
    }
    //轮播图调用
    new Slider('#banner')

    //模块1  category-modules-1 动态加载
    class Modules_1 {
        constructor() {
            this.loadJSON()
                .done($.proxy(function (res) {
                    this.renderPag(res.data.modules[0].moduleInfo.moduleItems)
                }, this))
        }
        loadJSON() {
            return $.ajax({
                url: '../php/indexpage1.json',
                dataType: 'json'
            })
        }
        renderPag(json) {
            var html = '';
            for (let i = 0, len = json.length; i < len; i++) {
                html += `
                        <li>
                            <a href="javascript:void(0)">
                                <img src="${json[i].pcImageUrl}" alt="">
                            </a>
                        </li>`
            }
            $('#category-modules-1 > ul').html(html);


        }
    }
    new Modules_1()


    //模块2  category-modules-2
    class Modules_2 {
        constructor(id) {
            this.$ele = $('#category-modules-2-main');
            this.loadJSON()
                .done($.proxy(function (res) {
                    this.renderPag(res.data.modules[1])
                }, this))
        }
        loadJSON() {
            return $.ajax({
                url: '../php/indexpage1.json',
                dataType: 'json'
            })
        }
        renderPag(json) {
            $('#category-modules-2-title>h3').html(json.moduleInfo.moduleTitle);

            $('#category-modules-2-main').find('img').each(function (index, element) {
                $(this).attr({
                    src: `${json.moduleInfo.moduleItems[index].pcImageUrl}`
                })
            })
            this.init()

        }
        init() {
            this.num = this.$ele.children('li').length;
            this.mouseenter();
        }
        mouseenter() {
            let _this = this;
            this.$ele.children().on('mouseenter', function () {
                $(this).stop().animate({
                    "width": "620px",
                }, 500).siblings().stop().animate({
                    "width": "82px",
                }, 500);
                $(this).find('i').stop().fadeOut(500);
                $(this).siblings().find('i').stop().fadeIn(500);

            })
        }
    }
    //模块2调用
    new Modules_2('category-modules-2-main')

    // 模块3动态加载

    // class Modules_3 {
    //     constructor() {
    //         this.loadJSON()
    //             .done($.proxy(function (res) {
    //                 this.renderPag(res.data.modules)
    //             }, this))
    //     }
    //     loadJSON() {
    //         return $.ajax({
    //             url: '../php/indexpage1.json',
    //             dataType: 'json'
    //         })
    //     }
    //     renderPag(json) {
    //         var html1 = '';
    //         for (let i = 0, len = json.length; i < len; i++) {
    //             if (json[i].moduleType == 3) {
    //                 var html2 = '';
    //                 html1 = `
    //                         <div class="category-modules-3">
    //                             <div class="category-modules-3-title">
    //                                 <h3>${json[i].moduleInfo.moduleTitle}</h3>
    //                                 <p>
    //                                     <a href="javascript:void(0)">查看全部></a>
    //                                 </p>
    //                             </div>
    //                             <ul id=${json[i].templateId}>
    //                                 <li class="category-modules-3-list-first">
    //                                     <a href="javascript:void(0)">
    //                                         <i>
    //                                             <img src="${json[i].moduleInfo.moduleImage}" alt="">
    //                                         </i>
    //                                         <span>${json[i].moduleInfo.manufacturers}&nbsp;&nbsp;${json[i].moduleInfo.moduleBrand}</span>
    //                                     </a>
    //                                 </li>
    //                             </ul>
    //                     </div>`
    //                 $('#category').append(html1);
    //                 for (let j = 0, lens = json[i].moduleInfo.moduleItems.length; j < lens; j++) {
    //                     html2 = `
    //                                 <li>
    //                                     <a href="javascript:void(0)">
    //                                         <i>
    //                                             <img src="${json[i].moduleInfo.moduleItems[j].image}" alt="">
    //                                         </i>
    //                                         <dl>
    //                                             <dt>${json[i].moduleInfo.moduleItems[j].ext.itemName}</dt>
    //                                             <dd>¥${json[i].moduleInfo.moduleItems[j].ext.itemPrice}</dd>
    //                                         </dl>
    //                                     </a>
    //                                 </li>`
    //                     $(`#${json[i].templateId}`).append(html2);
    //                 }

    //             }
    //         }

    //     }

    // }
    // new Modules_3();

    // //模块加载json2
    // class Modulesjson2 {
    //     constructor() {
    //         this.scroll();

    //     }
    //     loadJSON() {
    //         return $.ajax({
    //             url: `../php/indexpage2.json`,
    //             dataType: 'json'
    //         })
    //     }
    //     scroll() {
    //         $(document).scroll(function () {
    //             if ($(document).scrollTop() > 4000) {
    //                 $(document).off('scroll');
    //                 this.loadJSON()
    //                     .done($.proxy(function (res) {
    //                         this.renderPag(res.data.modules)
    //                     }, this))
    //             }
    //         }.bind(this))
    //     }
    //     renderPag(json) {
    //         var html1 = '';
    //         for (let i = 0, len = json.length; i < len; i++) {
    //             if (json[i].moduleType == 3) {
    //                 var html2 = '';
    //                 html1 = `
    //                         <div class="category-modules-3">
    //                             <div class="category-modules-3-title">
    //                                 <h3>${json[i].moduleInfo.moduleTitle}</h3>
    //                                 <p>
    //                                     <a href="javascript:void(0)">查看全部></a>
    //                                 </p>
    //                             </div>
    //                             <ul id=${json[i].templateId}>
    //                                 <li class="category-modules-3-list-first">
    //                                     <a href="javascript:void(0)">
    //                                         <i>
    //                                             <img src="${json[i].moduleInfo.moduleImage}" alt="">
    //                                         </i>
    //                                         <span>${json[i].moduleInfo.manufacturers}&nbsp;&nbsp;${json[i].moduleInfo.moduleBrand}</span>
    //                                     </a>
    //                                 </li>
    //                             </ul>
    //                     </div>`
    //                 $('#category').append(html1);
    //                 for (let j = 0, lens = json[i].moduleInfo.moduleItems.length; j < lens; j++) {
    //                     html2 = `
    //                                 <li>
    //                                     <a href="javascript:void(0)">
    //                                         <i>
    //                                             <img src="${json[i].moduleInfo.moduleItems[j].image}" alt="">
    //                                         </i>
    //                                         <dl>
    //                                             <dt>${json[i].moduleInfo.moduleItems[j].ext.itemName}</dt>
    //                                             <dd>¥${json[i].moduleInfo.moduleItems[j].ext.itemPrice}</dd>
    //                                         </dl>
    //                                     </a>
    //                                 </li>`
    //                     $(`#${json[i].templateId}`).append(html2);
    //                 }

    //             }
    //         }

    //     }

    // }
    // new Modulesjson2();

    // class Modulesjson3 {
    //     constructor() {
    //         this.scroll();
    //     }
    //     loadJSON() {
    //         return $.ajax({
    //             url: `../php/indexpage2.json`,
    //             dataType: 'json'
    //         })
    //     }
    //     scroll() {
    //         $(document).on('scroll',function () {
    //             if ($(document).scrollTop() > 8000) {
    //                 $(document).off('scroll');
    //                 this.loadJSON()
    //                     .done($.proxy(function (res) {
    //                         this.renderPag(res.data.modules)
    //                     }, this))
    //             }
    //         }.bind(this))
    //     }
    //     renderPag(json) {
    //         var html1 = '';
    //         for (let i = 0, len = json.length; i < len; i++) {
    //             if (json[i].moduleType == 3) {
    //                 var html2 = '';
    //                 html1 = `
    //                         <div class="category-modules-3">
    //                             <div class="category-modules-3-title">
    //                                 <h3>${json[i].moduleInfo.moduleTitle}</h3>
    //                                 <p>
    //                                     <a href="javascript:void(0)">查看全部></a>
    //                                 </p>
    //                             </div>
    //                             <ul id=${json[i].templateId}>
    //                                 <li class="category-modules-3-list-first">
    //                                     <a href="javascript:void(0)">
    //                                         <i>
    //                                             <img src="${json[i].moduleInfo.moduleImage}" alt="">
    //                                         </i>
    //                                         <span>${json[i].moduleInfo.manufacturers}&nbsp;&nbsp;${json[i].moduleInfo.moduleBrand}</span>
    //                                     </a>
    //                                 </li>
    //                             </ul>
    //                     </div>`
    //                 $('#category').append(html1);
    //                 for (let j = 0, lens = json[i].moduleInfo.moduleItems.length; j < lens; j++) {
    //                     html2 = `
    //                                 <li>
    //                                     <a href="javascript:void(0)">
    //                                         <i>
    //                                             <img src="${json[i].moduleInfo.moduleItems[j].image}" alt="">
    //                                         </i>
    //                                         <dl>
    //                                             <dt>${json[i].moduleInfo.moduleItems[j].ext.itemName}</dt>
    //                                             <dd>¥${json[i].moduleInfo.moduleItems[j].ext.itemPrice}</dd>
    //                                         </dl>
    //                                     </a>
    //                                 </li>`
    //                     $(`#${json[i].templateId}`).append(html2);
    //                 }

    //             }
    //         }

    //     }

    // }
    // new Modulesjson3()
})