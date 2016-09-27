/**
 * Created by liu on 16/9/26.
 */

/**
 * top nav menu function
 */
nav = function () {
    $(".nav li").hover(function () {
        $(this).find(".hide-nav").show();
    }, function () {
        $(this).find(".hide-nav").hide();
    });
};
/**
 * addHot left category
 */
addHot = function () {
    $hotTag = $(".category-wrap .promotion");
    var hotHtml = "<i></i>";
    $hotTag.append(hotHtml)
        .addClass("hot");
};
/**
 * ad showImg
 * @param index
 */
showImg = function (index) {
    $navTag = $(".banner-nav li");
    $navTag.parents('.banner')
        .find('img').eq(index).stop(true, true).fadeIn().siblings('img').fadeOut();
    $navTag.eq(index).addClass('chos').siblings('li').removeClass('chos');
};
/**
 * 定时器自动滚动
 */
adAutoScrool = function () {
    $bannerNav = $('.banner-nav li');
    $('.banner-nav').css('opacity','0.7');
    var navLength = $bannerNav.length;
    var index = 0;
    var adTimer = null;
    $bannerNav.mouseover(function () {
        $currentIndex = $(this).index();
        showImg($currentIndex);
        index = $currentIndex;
    }).eq(0).mouseover();
    $(".banner").hover(function () {
        if (adTimer) {
            clearInterval(adTimer);
        }
    }, function () {
        adTimer = setInterval(function () {
            showImg(index);
            index++;
            if (index == navLength) {
                index = 0;
            }
        }, 3000);
    }).trigger('mouseleave');
};
ad = function () {
    $(".banner-nav li").hover(function () {
        var index = $(this).index();
        $(this).parents('.banner')
            .find('img').eq(index).stop(true, true).fadeIn().siblings('img').fadeOut();
        $(this).css({
            "background": "#37a7d7 url(../shop/images/adindex.gif) no-repeat center bottom",
            "color": "#ffffff"
        })
    }, function () {
        $(this).css({
            "background": "#363437",
            "color": "#777578"
        })
    });
};
customTips = function () {
    var x = 10;
    var y = 20;
    $("a.tooltip").mouseover(function(e){
        this.myTitle = this.title;
        this.title = "";
        var tooltip = "<div id='tooltip'>"+ this.myTitle +"</div>"; //创建 div 元素
        $("body").append(tooltip);	//把它追加到文档中
        $("#tooltip")
            .css({
                "top": (e.pageY+y) + "px",
                "left": (e.pageX+x)  + "px"
            }).show("fast");	  //设置x坐标和y坐标，并且显示
    }).mouseout(function(){
        this.title = this.myTitle;
        $("#tooltip").remove();   //移除
    }).mousemove(function(e){
        $("#tooltip")
            .css({
                "top": (e.pageY+y) + "px",
                "left": (e.pageX+x)  + "px"
            });
    });
};
/**
 * auto call function
 */
$(function () {
    nav();
    addHot();
    adAutoScrool();
});