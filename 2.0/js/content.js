/*** 判断是否是淘宝网站，如果是，则监听 ****/
var num_iid = $("input[name='item_id_num']").val();
if(num_iid > 0){
	chrome.extension.sendRequest({requestEvent: "post_num_id",num_iid:num_iid}, function(response) {	
	})
}
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if(request.requestEvent == "get_num_iid"){
    	sendResponse({
       		data: $("input[name='item_id_num']").val() // 获取id是hello的元素发过去 
      	});
    }else if(request.requestEvent == 'openBox'){
    	open_box()
    }  
});
function open_box(){
	chrome.extension.sendRequest({requestEvent: "getUserId"}, function(response) {
		  var user_id = response.data;
		  var num_iid = $("input[name='item_id_num']").val();
		  var url = 'http://yfl.api.yarpar.com/?uid='+user_id+'&iid='+num_iid+'&from=yfl&source=chrome&v=2';
		  install_mask(url);
	})
}
function install_mask(url){
	if(document.getElementById('mask')){return false}
	
	$("body").append('<div id="mask" class="mask"></div><div id="mask-body" class="mask-body clearfix"><div id="mask-wrapper" class="mask-wrapper clearfix"><div id="mask-container" class="mask-container clearfix"></div></div></div>');
	var dh = $('body').height();
	$(".mask").css({height:dh,width:$(window).width()});
	var t = $('body').scrollTop();
	var h = $('.mask-wrapper').height();
	$(".mask-wrapper").animate({height:HEIGHT,marginTop:(($(window).height()-HEIGHT)/2),width:WIDTH},100);
	
	$('#mask-container').html('<h3 class="tm-dialog-title title"><span class="title">雅返利 '+ VERSION + '</span><span id="dialog-close" class="dialog-close more icon icon-close">关闭</span></h3><div id="dialog-content" class="mask-dialog-content clearfix"><iframe width="100%" height="467px" frameborder=0 scrolling=no src="'+url+'"></iframe></div>');
	$("#dialog-close").hover(function(){
		$(this).addClass("icon-close-hover");
	},function(){
		$(this).removeClass("icon-close-hover");
	}).click(function(){
		uninstall_mask();
	})
}
function uninstall_mask(){
	$('.mask,.mask-body').fadeOut(300,function(){$(this).remove()})
}
$(window).resize(function(){
	$(".mask-wrapper").animate({height:HEIGHT,marginTop:(($(window).height()-HEIGHT)/2),width:WIDTH},100);
})
$(document).keyup(function(e){
	if(e.keyCode === 27){
		uninstall_mask()
	}
});
