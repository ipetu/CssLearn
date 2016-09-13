//移动设备设置rem, 参考m.taobao.com
(function(window) {
        var v = window.devicePixelRatio;
        var dpr = v ? (v >= 3 ? 3 : (v >= 2 ? 2 : 1)) : 1;
        var scale = 1 / dpr;
        var doc = window.document;
        var html = doc.documentElement;
        var viewport = doc.createElement('meta');

        viewport.setAttribute('name', 'viewport');
        viewport.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');

        if (html.firstElementChild) {
            html.firstElementChild.appendChild(viewport);
        } else {
            var m = doc.createElement('div');
            m.appendChild(viewport);
            doc.write(m.innerHTML);
        }

        var t;

        window.addEventListener('resize', function() {
            clearTimeout(t);
            t = setTimeout(setRem, 300);
        }, false);

        window.addEventListener('orientationchange', function() {
            setRem();
        });

        doc.addEventListener('DOMContentLoaded', function() {
            setRem();
        });

        function setRem() {
            // .getBoundingClientRect().width 比 .clientWidth更精准
            var width = html.getBoundingClientRect().width;

            // 等价于 20 * (width / 320)
            // 开发基准rootFontSize * (deviceWidth / 开发基准pageSize)
            html.style.fontSize = (width / 16) + 'px';
        }
    }(window));
