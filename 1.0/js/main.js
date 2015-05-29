function init(){
	
}
function getUserId(){
	if(localStorage["id"]>0){
		return localStorage["id"];
		
	}else{
		chrome.tabs.create({url:"./options.html?title=设置要返利的雅趴账户"});
		return false;
	}
}
function disableForm(){
	$("input").attr('disabled','disabled');
}
function enableForm(){
	$("input").removeAttr('disabled');
}
function getIid(){
	
		chrome.tabs.sendRequest(tab.id, {
		      requestEvent: "getNumId"
		    }, function(response) {
		    	var iid = response.data;
		    	//alert(iid);
		        // tab做出响应，发来的response
		        var data = requestYarParHost(iid);
		        
		})
	
}
function show(tab,url){
	if(checkTaobaoItemUrl(url)){
		chrome.tabs.sendRequest(tab.id, {
		      requestEvent: "getNumId"
		    }, function(response) {
		    	var iid = response.data;
		    	if(iid){
		    		
		    		var data = requestYarParHost(tab,iid);
		    	}
		    	//alert(iid);
		        // tab做出响应，发来的response     
		})
	}else{
		
	}
}
function setIcon(color,text,tabid){
	chrome.browserAction.setBadgeBackgroundColor({color:[208, 0, 24, 255],'tabId':tabid});
	chrome.browserAction.setBadgeText({text:text?text:'0','tabId':tabid});
}
function requestYarParHost(tab,iid){
	if(iid>0){
		$.post('http://yfl.api.yarpar.com/query',{iid:iid,client:'chrome'},function(data){
			setIcon('',data.rebate,tab.id);
			$("#rebate").html(data.rebate)
			$("#rebateUrl").attr('href',data.click_url);
		},'json')
	}
}
function checkTaobaoItemUrl(url){
	var url = parse_url(url);
	
	if(strpos(url['host'],'taobao.com')){
		return true;
	}
	if(strpos(url['host'],'tmall.com')){
		return true;
	}
}
function parse_url(str,component){var key=['source','scheme','authority','userInfo','user','pass','host','port','relative','path','directory','file','query','fragment'],ini=(this.php_js&&this.php_js.ini)||{},mode=(ini['phpjs.parse_url.mode']&&ini['phpjs.parse_url.mode'].local_value)||'php',parser={php:/^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/};var m=parser[mode].exec(str),uri={},i=14;while(i--){if(m[i]){uri[key[i]]=m[i];}}
if(component){return uri[component.replace('PHP_URL_','').toLowerCase()];}
if(mode!=='php'){var name=(ini['phpjs.parse_url.queryKey']&&ini['phpjs.parse_url.queryKey'].local_value)||'queryKey';parser=/(?:^|&)([^&=]*)=?([^&]*)/g;uri[name]={};uri[key[12]].replace(parser,function($0,$1,$2){if($1){uri[name][$1]=$2;}});}
delete uri.source;return uri;}
function strpos(haystack,needle,offset){var i=(haystack+'').indexOf(needle,(offset||0));return i===-1?false:i;}
function urlencode(str){str=(str+'').toString();return encodeURIComponent(str).replace(/!/g,'%21').replace(/'/g,'%27').replace(/\(/g,'%28').replace(/\)/g,'%29').replace(/\*/g,'%2A').replace(/%20/g,'+');}
    