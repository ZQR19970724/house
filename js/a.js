$.fn.extend({
    // 调用这个函数初始化一个轮播图
    carouselInit: function (option) {
        var _data = option.data || [];
        var _delay = option.delay || 5000;
        var _initNum = option.initNum || 0;
        var _animateSpeed = option.animateSpeed || 300;
        var _activeColor = option.activeColor || '#f40';
        var _width = option.width || '100%';
        var _height = option.height || '100%';
        // 绑定html
        var htmlEl = '';
        htmlEl += '<ul>';
        $.each(_data, function (i, e) {
            htmlEl += '<li><img src="' + e + '" alt=""></li>';
        });
        htmlEl += '</ul>';
        htmlEl += '<div class="ctrl">';
        htmlEl += '<span class="prev"><</span>';
        htmlEl += '<span class="next">></span>';
        htmlEl += '</div>';
        htmlEl += '<ol>';
        $.each(_data, function () {
            htmlEl += '<li></li>';
        });
        htmlEl += '</ol>';

        this.html(htmlEl);
        var _$ulLi = this.children('ul').children();
        var _$olLi = this.children('ol').children();
        var _$spans = this.find('span');
        // 绑定css
        this.css({
            width: _width,
            height: _height,
            margin: '50px auto',
            position: 'relative'
        });

        _$ulLi.css({
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'none'
        });

        // 计算span的位置
        _$spans.css({
            width: 30,
            height: 50,
            position: 'absolute',
            top: (_height - 50) / 2,
            fontSize: 25,
            fontFamily: '黑体',
            color: '#fff',
            textAlign: 'center',
            lineHeight: '50px',
            cursor: 'pointer',
            backgroundColor: 'rgba(0,0,0,.2)'
        });

        _$spans.eq(1).css({
            right: 0
        });

        this.find('ol').css({
            position: 'absolute',
            bottom: 20,
            left: (_width - _data.length * 20) / 2
        });

        _$olLi.css({
            width: 10,
            height: 10,
            backgroundColor: '#fff',
            float: 'left',
            marginLeft: 10,
            borderRadius: '50%'
        });


        // 初始化
        _$ulLi.eq(_initNum).show();
        _$olLi.eq(_initNum).css({
            backgroundColor: _activeColor
        });
        // 绑定js
        var index = _initNum;
        var timer = null;
        timer = setInterval(function () {
            play(1);
        },_delay);

        this.hover(function () {
            clearInterval(timer);
        },function () {
            timer = setInterval(function () {
                play(1);
            },_delay);
        });

        _$olLi.on('mouseenter',function () {
            index = $(this).index();
            play();
        });

        _$spans.eq(0).click(function () {
            play(0);
        });

        _$spans.eq(1).click(function () {
            play(1);
        });

        function play(flag) {
            if(flag !== undefined){
                flag ? index++ : index--;
            }
            index = index > _data.length - 1 ? 0 : index;
            index = index < 0 ? _data.length - 1 : index;
            _$ulLi.eq(index).fadeIn(_initNum).siblings().fadeOut(_animateSpeed);
            _$olLi.eq(index).css({
                backgroundColor: _activeColor
            }).siblings().css({
                backgroundColor: '#fff'
            });
        }

    }
});