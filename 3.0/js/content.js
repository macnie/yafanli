var VERSION = '3.0';
var WIDTH = 712;
var HEIGHT = 400;
var PLN_NAME = '采宝贝';
var BOX_URL = 'http://www.yarpai.com/rebates';


chrome.extension.sendRequest({action:"url",url:window.location.href}, function(response) {
  
});
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if(request.action == "url"){
    	sendResponse({
       		url: window.location.href // 获取id是hello的元素发过去
      	});
    }else if(request.action == 'openBox'){
    	open_box()
    }else if(request.action == 'get_item_info'){
    	var iid = get_info('num_iid');
    	var price = get_spl_price();
    	var title = get_info('title');
    	var thumb = get_thumb();
    	var thumbs = get_thumbs();
    	sendResponse({
       		num_iid: iid, // 获取id是hello的元素发过去
       		thumb:thumb,
       		title:title,
       		price:price,
       		thumb:thumb,
       		thumbs:thumbs
      	});
    }
});
function get_info(action){
	var value= $("#J_itemViewed").data('value');
	switch(action){
		case 'num_iid':
			return value.itemId;
			break;
		case 'price':
			return value.price;
			break;
		case 'title':
			return value.title;
			break;
		default:
			break;
	}
}
function get_thumb(){
	var src = $("#J_UlThumb .tb-pic img").first().data('src');
	return str_ireplace('_40x40.jpg','',src);
}
function get_spl_price(){
	return $(".tb-rmb-num").first().html();
}
function get_thumbs(){
	var o = $("#J_UlThumb .tb-pic img");
	var imgs = new Array();
	$.each(o,function(i){
		var src = $(o).data('src');
		src = str_ireplace('_40x40.jpg','',src);
		imgs[i] = src;
	})
	return implode('|',imgs);
}
function open_box(){
  var url = BOX_URL+'?url='+urlencode(window.location.href)+'&from=yfl&source=chrome&v=2';
  install_mask(url);
}
function install_mask(url){
	if(document.getElementById('mask')){return false}
	
	$("body").append('<div id="mask" class="mask"></div><div id="mask-body" class="mask-body clearfix"><div id="mask-wrapper" class="mask-wrapper clearfix"><div id="mask-container" class="mask-container clearfix"></div></div></div>');
	var dh = $('body').height();
	$(".mask").css({height:dh,width:$(window).width()});
	var t = $('body').scrollTop();
	var h = $('.mask-wrapper').height();
	$(".mask-wrapper").animate({height:HEIGHT,marginTop:(($(window).height()-HEIGHT)/2),width:WIDTH},100);
	
	$('#mask-container').html('<h3 class="tm-dialog-title title"><span class="title">'+PLN_NAME+VERSION + '</span><span id="dialog-close" class="dialog-close more icon icon-close" title="按ESC键可以快速关闭窗口">关闭</span></h3><div id="dialog-content" class="mask-dialog-content clearfix"><iframe id="iframe" width="100%" height="'+(HEIGHT-34)+'" frameborder=0 scrolling=no src="'+url+'"></iframe></div>');
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
function str_ireplace (search, replace, subject) {
  var i, k = '';
  var searchl = 0;
  var reg;

  var escapeRegex = function (s) {
    return s.replace(/([\\\^\$*+\[\]?{}.=!:(|)])/g, '\\$1');
  };

  search += '';
  searchl = search.length;
  if (Object.prototype.toString.call(replace) !== '[object Array]') {
    replace = [replace];
    if (Object.prototype.toString.call(search) === '[object Array]') {
      // If search is an array and replace is a string,
      // then this replacement string is used for every value of search
      while (searchl > replace.length) {
        replace[replace.length] = replace[0];
      }
    }
  }

  if (Object.prototype.toString.call(search) !== '[object Array]') {
    search = [search];
  }
  while (search.length > replace.length) {
    // If replace has fewer values than search,
    // then an empty string is used for the rest of replacement values
    replace[replace.length] = '';
  }

  if (Object.prototype.toString.call(subject) === '[object Array]') {
    // If subject is an array, then the search and replace is performed
    // with every entry of subject , and the return value is an array as well.
    for (k in subject) {
      if (subject.hasOwnProperty(k)) {
        subject[k] = str_ireplace(search, replace, subject[k]);
      }
    }
    return subject;
  }

  searchl = search.length;
  for (i = 0; i < searchl; i++) {
    reg = new RegExp(escapeRegex(search[i]), 'gi');
    subject = subject.replace(reg, replace[i]);
  }

  return subject;
}
function implode (glue, pieces) {
  var i = '',
    retVal = '',
    tGlue = '';
  if (arguments.length === 1) {
    pieces = glue;
    glue = '';
  }
  if (typeof pieces === 'object') {
    if (Object.prototype.toString.call(pieces) === '[object Array]') {
      return pieces.join(glue);
    }
    for (i in pieces) {
      retVal += tGlue + pieces[i];
      tGlue = glue;
    }
    return retVal;
  }
  return pieces;
}
function urlencode(str){str=(str+'').toString();return encodeURIComponent(str).replace(/!/g,'%21').replace(/'/g,'%27').replace(/\(/g,'%28').replace(/\)/g,'%29').replace(/\*/g,'%2A').replace(/%20/g,'+');}
