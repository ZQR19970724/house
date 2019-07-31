window.onload = function () {
    function setRem() {
        var client = document.documentElement.clientWidth||document.body.clientWidth;
        var width_w = 320;
        var size = (client/width_w)*100;
        document.documentElement.style.fontSize=size+"px";
    }
    setRem();
    window.onresize=setRem;
}
