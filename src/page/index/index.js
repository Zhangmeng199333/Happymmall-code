/*
 * @Author: mikey.zhaopeng 
 * @Date: 2017-12-21 16:51:14 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-05 15:17:40
 */
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var navSide        = require('page/common/nav-side/index.js');
var templateBanner = require('./banner.string');
var _mm            = require('util/mm.js');

$(function() {
    //渲染banner的html
    var bannerHtml = _mm.renderHtml(templateBanner);
    $('.banner-con').html(bannerHtml);
    //初始化banner
    var $slider = $('.banner').unslider({
        dots : true
    });
    //前后翻页的事件绑定
    $('.banner-con .banner-arrow').click(function(){
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});
