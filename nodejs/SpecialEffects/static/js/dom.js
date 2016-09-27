/**
 * Created by liu on 16/9/18.
 */


$(function () {
    var $vli = $("ul li:eq(0)");
    var attr = $vli.attr("title");
    var text = $vli.text();
    // alert(text);
    // alert(attr);
    var $li_1 = $("<li title='香蕉'>香蕉</li>");
    var $li_2 = $("<li title='西瓜'>西瓜</li>");
    $("ul").append($li_1);
    $("ul").append($li_2);
    $("ul li").click(function () {
       $(this).clone(true).appendTo("ul");
    });
    $("p").scrollTop;
}());

