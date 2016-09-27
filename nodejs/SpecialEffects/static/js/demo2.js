/**
 * Created by liu on 16/9/18.
 */

function extractedMouseOperation() {
    $("a.tooltip").mouseover(function (e) {
        this.title = "";
        var $jqTitle = $("<div id='toolTip' style='position: absolute;background: #3db1fa;'>这是jq创建的tittle</div>");
        $("body").append($jqTitle);
        $("#toolTip")
            .css({
                "top": (e.pageY + 20) + "px",
                "left": (e.pageX + 10) + "px"
            }).show("fast");
    }).mouseout(function () {
        //隐藏titile
        $("#toolTip").remove();
    }).mousemove(function (e) {
        $("#toolTip")
            .css({
                "top": (e.pageY + 20) + "px",
                "left": (e.pageX + 10) + "px"
            }).show("fast");
    });
};

$(function () {
    //显示titile
    extractedMouseOperation();
}());

