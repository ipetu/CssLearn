/**
 * Created by liu on 16/9/18.
 */
// $(function () {
//     var one = $("img.one");
//     var two = $("img.two");
//     var three = $("img.three");
//     var four = $("img.four");
//     setInterval(function () {
//         four.toggle(1000);
//         three.toggle(2000);
//         two.toggle(3000);
//     },1000);
// }());
/**
 * 基本选择器
 */
baseJQuerySelect = function () {
    $("#one").css("background","#bbffaa");
    $(".mini").css({
        "background":"#bbffaa",
        "color":"#aaa"
    });
    $("div").css({
        "background":"#bbffaa",
        "color":"#fff"
    });
    $("*").css({
        "background":"#bbffaa"
    });
    $("span,#two").css({
        "background":"#bbffaa"
    });
}
/**
 * level select
 */
levelJquerySelect = function () {
    //后代选择器
   $("body div").css({
       "background":"#bbffaa",
   });
    // 选取父元素下的子元素
   $("body > div").css({
       "background":"#bbffaa",
   });
    //选取class为one的下一个div的同辈元素
    $(".one + div").css({
       "background":"#bbffaa",
    });
    $(".one").next("div").css({
        "background":"#ffbbaa",
    });
    //选取id为two的元素后面的所有div同辈元素
    $("#two ~ div").css({
        "background":"#bbffaa",
    });
    $("#two").nextAll("div").css({
        "background":"#ffbbaa",
    });
    //siblings只要是同辈元素节点都能匹配上.
    $("#two").siblings("div").css({
       "background":"#000",
    });
    $("div:even").css({
       "background":"red",
    });
    $("div:odd").css({
       "background":"blue",
    });
    $("div:eq(3)").css({
        "background":"yellow",
    });
    $("div:gt(3)").css({
        "background":"green",
    });
};
/**
 * 显示与隐藏
 */
function extractedShowAndHide() {
    $(".level11 > a").click(function () {
        $(this).addClass("current")
            .next().show()
            .parent().siblings().children("a").removeClass("current")
            .next().hide();
        return false;
    });
}
/**
 * js 与 jquery的点击事件
 */
function clickDemo() {
    var $cr = $("#cr");
    var cr = $cr[0];
    $cr.click(function () {
        if (cr.checked) {
            alert("感谢你的支持");
        }
    });

    $cr.click(function () {
        if ($cr.is(":checked")) {
            alert("这也是选中了");
        }
    });
    var $demo = $(".demo");
    $demo.click(function () {
        alert("jquery click call back");
    });
}
$(function () {

    extractedShowAndHide();

    clickDemo();

    // baseJQuerySelect();
    levelJquerySelect();
}());

var f1 = function () {
    // alert("hello3");
    // returnName = fetchName("给你一个名字");
    // alert(returnName);
};

$(document).ready(function () {
    // alert("hello2");
    // f1();
}());
