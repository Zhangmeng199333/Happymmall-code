/*
 * @Author: mikey.zhaopeng 
 * @Date: 2017-12-21 16:50:04 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-04 15:35:08
 */

require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');
//表单错误提示
var formError = {
    show: function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function () {
        $('.error-item').hide().find('.err-msg').text('');
    }
};

var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        //登录按钮点击提交        
        $('#submit').click(function () {
            _this.submit();
        });
        //按下回车也进行提交
        $('.user-content').keyup(function (e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    //提交表单
    submit: function () {
        var formData = {
                username: $.trim($('#username').val()),
                password: $.trim($('#password').val())
            },
            //表单验证结果
            valdateResult = this.formValidate(formData);
        //验证成功
        if (valdateResult.status) {
            _user.login(formData, function (res) {
                // if(formData.username === username){
                //     formError.hide(res);
                // }
                // if(formData.password === password){
                //     formError.hide(res);
                // }
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
            }, function (errMsg) {
                formError.show(errMsg);
            })
        }
        //验证失败
        else {
            formError.show(valdateResult.msg);
        }
    },
    //表单字段的验证
    formValidate: function (formData) {
        var result = {
            status : false,
            msg : ''
        };
        if (!_mm.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        //验证通过，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function () {
    page.init();
});