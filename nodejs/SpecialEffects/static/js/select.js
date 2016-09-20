/**
 * Created by liu on 16/9/18.
 */


selectJqueryFunction = function () {
    $("#form1 input:enabled").val("这里变化了");
    $("#form1 input:disabled").val("不能点变化了");
    $count = $("input:checked").length;
    $selectText = $("select :selected").text();
    alert($count);
    alert($selectText);
};


$(function () {

  selectJqueryFunction();

}());

