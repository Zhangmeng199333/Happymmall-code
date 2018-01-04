/*
 * @Author: mikey.zhaopeng 
 * @Date: 2017-12-21 16:50:04 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-04 15:42:51
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
        $('.error-item').show().find('.err-msg').text('');
    }
};

var page = {
    data : {
        username : '',
        question : '',
        answer   : '',
        token    : ''
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadStepUsername();
    },
    bindEvent: function () {
        var _this = this;
        //输入用户名后下一步按钮点击     
       $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            //用户名存在
            if(username){
                _user.getQuestion(username,function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            else{
                formError.show('请输入用户名');
            }
       });
         //输入密码提示问题答案中的按钮点击        
         $('#submit-question').click(function(){
            var answer = $.trim($('#answer').val());
            //答案是否存在
            if(answer){
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer   : answer
                },function(res){
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                },function(errMsg){
                    formError.show(errMsg);
                });
            }
            else{
                formError.show('请输入密码提示问题答案');
            }
       });
       //输入新密码后的按钮点击        
       $('#submit-password').click(function(){
        var password = $.trim($('#password').val());
        //密码是否为空
        if(password && password.length >= 6){
            _user.resetPassword({
                username    : _this.data.username,
                passwordNew : password,
                forgetToken : _this.data.token
            },function(res){
                window.location.href = './result.html?type=pass-reset';
            },function(errMsg){
                formError.show(errMsg);
            });
        }
        else{
            formError.show('请输入不少于6位的新密码');
        }
   });
    },
    //找回密码 第一步  加载输入用户名
    loadStepUsername : function(){
        $('.step-username').show();
    },
     //找回密码  第二步 加载输入密码提示问题答案
     loadStepQuestion : function(){
         //清除错误提示
        formError.hide();
        //做容器的切换
        $('.step-username').hide().siblings('.step-question').show().find('.question').text(thsi.data.question);
    }, 
    //找回密码  第三步 加载输入新密码
    loadStepPassword : function(){
        formError.hide();
        $('.step-question').hide().siblings('.step-password').show();         
    },
    //提交表单
    // submit: function () {
    //     var formData = {
    //             username: $.trim($('#username').val()),
    //             password: $.trim($('#password').val())
    //         },
    //         //表单验证结果
    //         valdateResult = this.formValidate(formData);
    //     //验证成功
    //     if (valdateResult.status) {
    //         _user.login(formData, function (res) {
    //             window.location.href = _mm.getUrlParam('redirect') || './index.html';
    //         }, function (errMsg) {
    //             formError.show(errMsg);
    //         })
    //     }
    //     //验证失败
    //     else {
    //         formError.show(valdateResult.msg);
    //     }
    // },
    // //表单字段的验证
    // formValidate: function (formData) {
    //     var result = {
    //         status : false,
    //         msg : ''
    //     };
    //     if (!_mm.validate(formData.username, 'require')) {
    //         result.msg = '用户名不能为空';
    //         return result;
    //     }
    //     if (!_mm.validate(formData.password, 'require')) {
    //         result.msg = '密码不能为空';
    //         return result;
    //     }
    //     //验证通过，返回正确提示
    //     result.status = true;
    //     result.msg = '验证通过';
    //     return result;
    // }
};
$(function () {
    page.init();
});