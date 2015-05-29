var VERSION = '2.0';
var WIDTH = 712;
var HEIGHT = 500;
var QUERY_URL = 'http://www.yarpai.com/rebates/query';
var BOX_URL = 'http://www.yarpai.com/rebates';

function check_login(){
	return true;
	if(localStorage['id']>0){
		return localStorage['id'];
	}else{
		return false;
	}
}
function getUserId(){
	if(localStorage["id"]>0){
		return localStorage["id"];
		
	}else{
		chrome.tabs.create({url:"./options.html"});
		return false;
	}
}
function setIcon(color,text,tabid){
	chrome.browserAction.setBadgeBackgroundColor({color:[208, 0, 24, 255],'tabId':tabid});
	chrome.browserAction.setBadgeText({text:text?text:'0.00','tabId':tabid});
}
function loadItemRebate(tabid,params){
	if(!params){params = {}}
	chrome.tabs.sendRequest(tabid,{requestEvent: "get_num_iid"}, function(response) {
    	var num_iid = response.data;
    	var settings = {
			iid				:	num_iid
		};
		params = $.extend({}, settings, params || {});
    	requestYflHost(tabid,params);
	})
}

function requestYflHost(tabid,params){
	var settings = {
		action 			: 'ItemRebate',
		client			:	'chrome',
		verion			:	'2.0',
		num_iid				:	0
	};
	params = $.extend({}, settings, params || {});
	$.post(QUERY_URL,params,function(data){
		setIcon('',data.rebate,tabid);
	},'json')
}
function checkTaobaoItemUrl(url){
	var url = parse_url(url);
	if(strpos(url['host'],'taobao.com')){
		return true;
	}
	if(strpos(url['host'],'tmall.com')){
		return true;
	}
	return false;
}
function scroll_top() { var scrollPos; if (window.pageYOffset) { scrollPos = window.pageYOffset; } else if (document.compatMode && document.compatMode != 'BackCompat') { scrollPos = document.documentElement.scrollTop; } else if (document.body) { scrollPos = document.body.scrollTop; } return scrollPos; }
function parse_url(str,component){var key=['source','scheme','authority','userInfo','user','pass','host','port','relative','path','directory','file','query','fragment'],ini=(this.php_js&&this.php_js.ini)||{},mode=(ini['phpjs.parse_url.mode']&&ini['phpjs.parse_url.mode'].local_value)||'php',parser={php:/^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/};var m=parser[mode].exec(str),uri={},i=14;while(i--){if(m[i]){uri[key[i]]=m[i];}}
if(component){return uri[component.replace('PHP_URL_','').toLowerCase()];}
if(mode!=='php'){var name=(ini['phpjs.parse_url.queryKey']&&ini['phpjs.parse_url.queryKey'].local_value)||'queryKey';parser=/(?:^|&)([^&=]*)=?([^&]*)/g;uri[name]={};uri[key[12]].replace(parser,function($0,$1,$2){if($1){uri[name][$1]=$2;}});}
delete uri.source;return uri;}
function strpos(haystack,needle,offset){var i=(haystack+'').indexOf(needle,(offset||0));return i===-1?false:i;}
function urlencode(str){str=(str+'').toString();return encodeURIComponent(str).replace(/!/g,'%21').replace(/'/g,'%27').replace(/\(/g,'%28').replace(/\)/g,'%29').replace(/\*/g,'%2A').replace(/%20/g,'+');}
    