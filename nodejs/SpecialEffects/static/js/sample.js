/**
 * Created by liu on 16/9/18.
 */

changeJJText = function (object) {
    $(object).find("span").css({
        "background": "#ccddee"
    }).text("精简显示品牌");
};
changeAllText = function (object) {
    $(object).find("span").css({
        "background": "#ccddee"
    }).text("显示全部品牌");
};
addHightLight = function () {
    $("ul li").filter(":contains('佳能'),:contains('尼康'),:contains('奥林巴斯')")
        .addClass("promoted");
};
removeHightLight = function () {
    $("ul li").filter(":contains('佳能'),:contains('尼康'),:contains('奥林巴斯')")
        .removeClass("promoted");
};
$(function () {
    //从第7条开始隐藏后面的品牌（最后一条"其他品牌相机"除外）
    var $category = $("ul li:gt(5):not(:last)");
    $category.hide();
    //获取 class 为showmore的div的所有子元素a
    var $toggleBtn = $("div .showmore > a ");
    $toggleBtn.click(function () {
        if ($category.is(":visible")) {
            $category.hide();
            changeAllText(this);
            removeHightLight();
        } else {
            $category.show();
            changeJJText(this);
            addHightLight();
        }
        return false;//超链接不跳转
    });
    // $toggleBtn.click(function () {
    //     $toggleBtn.toggle(function () {
    //         //显示
    //         $category.show();
    //         changeJJText(this);
    //         addHightLight();
    //     }, function () {
    //         //隐藏
    //         $category.hide();
    //         changeAllText(this);
    //         removeHightLight();
    //     });
    //     return false;//超链接不跳转
    // });
}());

