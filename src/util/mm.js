/*
 * @Author: YQ
 * @Date: 2017-12-24 14:03:53 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-12-28 18:25:14
 */
var Hogan = require('hogan.js');
var conf = {
    serverHost:''
};
var _mm = {
    //网络请求
    request : function(param){
        //缓存_mm对象
        var _this = this;
        //ajax后台数据请求
        $.ajax({
            type     :    param.method || 'get',
            url      :    param.url  || '',
            dataType :    param.type || 'json',
            data     :    param.data || '',
            success  :    function(res){
                //请求成功
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data,res.msg);
                }
                //没有登录状态，需要强制登录
                else if(10 === res.status){
                    _this.doLogin();
                }
                //请求成功，数据错误
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.data);                    
                }
            },
            //请求失败  404
            error    :    function(){
                typeof param.error === 'function' && param.error(err.statusText);                                    
            },
        });
    },
    //获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    //获取url参数
    getUrlParam : function(name){
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURICompotent(result[2]) : null;
    },
    //渲染HTML模板
    renderHtml : function(htmlTemplate,data){
        var template = Hogan.compile(htmlTemplate),
            result   = template.render(data);
        return result;
    },
    //成功提示
    successTips : function(msg){
        alert(msg || '操作成功');
    },
    //错误提示
    errorTips : function(msg){
        alert(msg || '哪里不对了');
    },
    //字段的验证，支持非空、手机。邮箱的判断
    validate : function(value,type){
        var value = $.trim(value);
        //非空验证
        if('require' === type){
            return !!value;
        }
        //手机号码验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        //邮箱验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //统一登录处理
    doLogin : function(){
        //跳转到登录页，
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
    }
};
module.exports = _mm;