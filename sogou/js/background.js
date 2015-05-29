/*** 注册右键雅返利*****/
sogouExplorer.contextMenus.create({
    title: '使用雅返利',
    onclick: function(info, tab) {
		sogouExplorer.tabs.sendRequest(tab.id, {action: "openbox"}, function(response) {	
		})
    },
    contexts:['all']
});

sogouExplorer.tabs.onActivated.addListener(function(tabid){
	//alert(tabid)
})
/** 注册图标被点击****/
sogouExplorer.browserAction.onClicked.addListener(function(tab){
	sogouExplorer.tabs.sendRequest(tab.id, {action: "openbox"}, function(response) {
	})
})
/**** 获取内容客户端自动加载后传递过来的Url,然后直接请求******/
sogouExplorer.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if(request.action == 'url'){
		if(checkTaobaoItemUrl(request.url)){
			requestYflHost(sender.tab.id,{url:request.url})
		}else{
			
		}
	}else{
		
	}
	  
});

