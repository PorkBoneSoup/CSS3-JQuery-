// Copyright (c) 2010 Ivan Vanderbyl
// Originally found at http://ivan.ly/ui
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

(function( $ ){
  // Simple wrapper around jQuery animate to simplify animating progress from your app
  // Inputs: Progress as a percent, Callback
  // TODO: Add options and jQuery UI support.
	//简单包装jQuery动画来简化动画从你的应用进展
	//输入:进步百分之一,回调
	//TODO:添加选项和jQuery UI支持。
	//参数
	//progress:输入要到达的进度值
	//callback回调函数
  $.fn.animateProgress = function(progress, callback) {    
    return this.each(function() {
      $(this).animate({
//    	设置进度条宽度的动画
        width: progress+'%'
      }, {
//    	动画运行完成时间
        duration: 2000, 
        
        // swing or linear
				//动画的速度状态
				//swing或线性
        easing: 'swing',

        // this gets called every step of the animation, and updates the label
        //动画运行的每一步,并执行里面的方法
        step: function( progress ){
				//获取显示进度数值的DOM元素,可以进行修改来控制进度数值的显示Dom元素
          var labelEl = $('.ui-label', this),
              valueEl = $('.value', labelEl);
          //用来控制进度当在百分之几的时候，执行什么样的方法时间，按照需要进行修改
          if (Math.ceil(progress) < 20 && $('.ui-label', this).is(":visible")) {
            labelEl.hide();
          }else{
            if (labelEl.is(":hidden")) {
              labelEl.fadeIn();
            };
          }
          //用来控制进度当在百分之一百的时候，执行什么样的方法时间，按照需要进行修改
          if (Math.ceil(progress) == 100) {
            labelEl.text('Done');
            setTimeout(function() {
              labelEl.fadeOut();
            }, 1000);
          }else{
            valueEl.text(Math.ceil(progress) + '%');
          }
        },
        //回调函数
        complete: function(scope, i, elem) {
          if (callback) {
            callback.call(this, i, elem );
          };
        }
      });
    });
  };
})( jQuery );

$(function() {
  // Hide the label at start
  //隐藏在开始标签
  $('#progress_bar .ui-progress .ui-label').hide();
  // Set initial value
  //设置一开始的精度初始值
  $('#progress_bar .ui-progress').css('width', '7%');

  // Simulate some progress
  //模拟一些进展
  $('#progress_bar .ui-progress').animateProgress(43, function() {
    $(this).animateProgress(79, function() {
      setTimeout(function() {
        $('#progress_bar .ui-progress').animateProgress(100, function() {
          $('#main_content').slideDown();
          $('#fork_me').fadeIn();
        });
      }, 2000);
    });
  });
  
});