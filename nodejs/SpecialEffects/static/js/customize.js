/**
 * Created by liu on 16/9/19.
 */

fetchName = function (name) {
    return "call back--"+name;
};
demo = function () {
   // alert("customize js call back");
};
pClick = function (index) {
    alert(index);
};
(function () {
    var pList = document.getElementsByTagName("p");
    for (var i=0 ; i<pList.length;i++){
        pList[i].onclick = function () {
            alert("className="+this.className);
        }
    }
}());
