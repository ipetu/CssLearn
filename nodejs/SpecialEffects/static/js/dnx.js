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

$(function () {
    $(".level11 > a").click(function () {
        $(this).addClass("current")
            .next().show()
            .parent().siblings().children("a").removeClass("current")
            .next().hide();
        return false;
    });

    var $cr = $("#cr");
    var cr = $cr[0];
    $cr.click(function () {
        if (cr.checked){
            alert("感谢你的支持");
        }
    });

    $cr.click(function () {
        if ($cr.is(":checked")){
            alert("这也是选中了");
        }
    });

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
