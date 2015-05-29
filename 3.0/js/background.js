/*** 注册右键雅返利*****/
chrome.contextMenus.create({
    title: '使用雅返利',
    onclick: function(info, tab) {
		chrome.tabs.sendRequest(tab.id, {action: "openBox"}, function(response) {	
		})
    },
    contexts:['all']
});
get_target()
chrome.tabs.onActivated.addListener(function(tabid){
	//alert(tabid)
})
/**** 获取内容客户端自动加载后传递过来的Url,然后直接请求******/
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if(request.action == 'url'){
		if(checkTaobaoItemUrl(request.url)){
			requestYflHost(sender.tab.id,{url:request.url})
		}else{
			
		}
	}else{
		
	}
	  
});

/** 注册图标被点击****
chrome.browserAction.onClicked.addListener(function(tab){
	chrome.tabs.sendRequest(tab.id, {action: "openBox"}, function(response) {
	})
})
**/