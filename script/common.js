$(function () {
    //回到顶部
    function returnTop() {
        $(document).on('scroll', function () {
            if ($(document).scrollTop() > 0) {
                $('.rightBar-top').stop().fadeIn(100)
            } else {
                $('.rightBar-top').stop().fadeOut(100)
            }
        })
        $('.rightBar-top').on('click', function () {
            $('body,html').stop().animate({
                scrollTop: 0
            }, 1000)
        })
        if ($(document).scrollTop() > 0) {
            $('.rightBar-top').stop().fadeIn(100)
        }
    }
    returnTop();

    //分享弹窗
    function popUp() {
        $(".rightBar-share").on('click', function () {
            $('.shareMask').stop().fadeIn(300);
        })
        $(".close-popup").on('click', function () {
            $('.shareMask').stop().fadeOut(300);
        })
    }
    popUp()

    //类目商品列表
    class GoodsList {
        constructor() {
            this.loadJSON()
                .done($.proxy(function (res) {
                    this.renderPag(res.data)
                }, this))
        }
        loadJSON() {
            return $.ajax({
                url: '../php/goodlist.json',
                dataType: 'json'
            })
        }
        renderPag(json) {
            var html1 = '';
            for (let i = 0, len = json.length; i < len; i++) {
                var html2 = '';
                html1 = `            
                        <div>
                            <h3>${json[i].goodsTop}</h3>
                            <ul id=${json[i].goodsId}>
                            </ul>
                        </div>
                        `
                $('#goodslist').append(html1);
                for (let j = 0, lens = json[i].goodsNum.length; j < lens; j++) {
                    html2 = `                    
                            <li>
                                <a href="javascript:void(0)">
                                    <i>
                                        <img src="${json[i].goodsNum[j].goodsImg}" alt="">
                                    </i>
                                    <dl>
                                        <dt>${json[i].goodsNum[j].goodsName}</dt>
                                        <dd>¥${json[i].goodsNum[j].finalPrice}</dd>
                                    </dl>
                                </a>
                            </li>
                             `
                    $(`#${json[i].goodsId}`).append(html2);
                }

            }
        }

    }
    new GoodsList();

    // 吸顶菜单
    
    function retract() {
        $(document).on('scroll', function () {
            if ($(document).scrollTop() > 150) {
                $('#retract-wrap').stop().slideDown(200);
            } else {
                $('#retract-wrap').stop().slideUp(200);
            }
        })
    }
    retract()
})