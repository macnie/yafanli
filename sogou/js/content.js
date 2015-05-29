var VERSION = '3.0';
var WIDTH = 712;
var HEIGHT = 400;
var BOX_URL = 'http://www.yarpai.com/rebates';
var  com_sogou_lenmy_yafanli = {
	openbox:function(){
	  	this.install_mask(BOX_URL+'?url='+encodeURIComponent(window.location.href)+'&from=yfl&source=chrome&v=2');
	},
	install_mask:function(url){
		var This = this;
		if(document.getElementById('mask')){return false}
		
		$("body").append('<div id="mask" class="mask"></div><div id="mask-body" class="mask-body clearfix"><div id="mask-wrapper" class="mask-wrapper clearfix"><div id="mask-container" class="mask-container clearfix"></div></div></div>');
		var dh = $('body').height();
		$(".mask").css({height:dh,width:$(window).width()});
		var t = $('body').scrollTop();
		var h = $('.mask-wrapper').height();
		$(".mask-wrapper").animate({height:HEIGHT,marginTop:(($(window).height()-HEIGHT)/2),width:WIDTH},100);
		
		$('#mask-container').html('<h3 class="tm-dialog-title title"><span class="title">雅返利 '+ VERSION + '</span><span id="dialog-close" class="dialog-close more icon icon-close" title="按ESC键可以快速关闭雅返利窗口">关闭</span></h3><div id="dialog-content" class="mask-dialog-content clearfix"><iframe id="iframe" width="100%" height="'+(HEIGHT-34)+'" frameborder=0 scrolling=no src="'+url+'"></iframe></div>');
		$("#dialog-close").hover(function(){
			$(this).addClass("icon-close-hover");
		},function(){
			$(this).removeClass("icon-close-hover");
		}).click(function(){
			This.uninstall_mask();
		})
		$(window).resize(function(){
			$(".mask-wrapper").animate({height:HEIGHT,marginTop:(($(window).height()-HEIGHT)/2),width:WIDTH},100);
		})
		$(document).keyup(function(e){
			if(e.keyCode === 27){
				com_sogou_lenmy_yafanli.uninstall_mask()
			}
		});
	},
	uninstall_mask:function(){
		$('.mask,.mask-body').fadeOut(300,function(){$(this).remove()})
	}
	
}
sogouExplorer.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if(request.action == "url"){
    	sendResponse({
       		url: window.location.href // 获取id是hello的元素发过去 
      	});
    }else if(request.action == 'openbox'){
    	com_sogou_lenmy_yafanli.openbox()
    }
});
sogouExplorer.extension.sendRequest({action:"url",url:window.location.href}, function(response) {
  
});

