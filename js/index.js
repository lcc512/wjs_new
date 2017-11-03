$(function() {
    // 动态轮播图方法
    banner();
    iscrollOne();
});

var banner = function() {
    // 1,模拟后台数据
    // 2，判断设备 没弄
    // 3，数据转换为html 拼接
    // a. 点
    // b. 图
    // 4，渲染到页面
    // 5，测试
    // 获取轮播图组件,点，图片，窗口
    var $banner = $('.carousel');
    var $point = $banner.find('.carousel-indicators');
    var $image = $banner.find('.carousel-inner');
    var $window = $(window);
    // 测试数据
    var data_lunbo = [{
            pcSrc: 'images/lunbo1.jpg'
        },
        {
            pcSrc: 'images/lunbo2.jpg'
        },
        {
            pcSrc: 'images/lunbo3.jpg'
        },
        {
            pcSrc: 'images/lunbo4.jpg'
        },

    ]
    // 渲染操作
    var render = function() {

        var isMoible = $window.width() < 768 ? true : false;

        // 渲染点
        var pointHtml = '';
        //渲染图
        var imageHtml = '';

        $.each(data_lunbo, function(key, value) {

            pointHtml += '<li data-target="#carousel-example-generic" data-slide-to="' + key + '"' + (key == 0 ? ' class="active"' : ' ') + '></li>\n';

            imageHtml += '<div class="item' + (key == 0 ? ' active' : ' ') + '">';
            imageHtml += '<a href="#" class="pc-imageBox" style="background-image: url(' + value.pcSrc + ')"></a>';
            imageHtml += '</div>';

        });
        $point.html(pointHtml);
        $image.html(imageHtml);
    }

    render();

    // 移动端手势切换 左滑 右滑
    // 通过jQuery绑定touch事件
    // 使用 originalEvent 中的触摸点集合
    var startX = 0;
    var distanceX = 0;
    var isMove = false;

    $banner.on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove', function(e) {
        isMove = true;
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
    }).on('touchend', function(e) {

        if (isMove && Math.abs(distanceX) > 50) {
            if (distanceX > 0) {
                $banner.carousel('prev');
                console.log('you shangyizhang');
            } else {
                $banner.carousel('next');
                console.log('zuo xiayiz');
            }
        }

        // 重置
        startX = 0;
        distanceX = 0;
        isMove = false;
    });
};
// 自滑动的插件方法
var iscrollOne = function() {

    // 1，把所有的页签在一行显示 设置父容器的宽度是所有自容器的宽度之和
    // 2，满足区域滚动的html结构要求 必须有大容器套着一个小容器
    // 3，实现滑动功能 使用区域滚动

    // 父容器
    var $tabs = $('.wjs-product .nav-tabs');
    // 所有的子容器
    var $liList = $tabs.find('li');
    // 计算宽度之和
    var width = 0;
    // width 获取的是内容的宽度
    // innerWidth() 内容和内边距的宽度
    // outerWidth() 内容和内边距和边框的宽度
    // outerWidth(true) 内容和内边距和边框和外边距的宽度
    $.each($liList, function(i, item) {
        width += $(item).outerWidth(true);
    });
    // 把计算出的宽度设置给父容器
    $tabs.width(width);

    new IScroll('.nav-tabs-parent',{
        scrollX: true,
        scrollY: false
    });


};