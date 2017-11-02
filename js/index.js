$(function() {
    // 动态轮播图方法
    banner();
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