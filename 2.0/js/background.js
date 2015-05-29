/*** 注册右键雅返利*****/
alert('ok')
chrome.contextMenus.create({
    title: '使用雅返利',
    onclick: function(info, tab) {
		chrome.tabs.sendRequest(tab.id, {requestEvent: "openBox"}, function(response) {
			
		})
    },
    contexts:['all']
});
chrome.tabs.executeScript(null,
                           {code:"document.body.bgColor='red'"});
/** 注册图标被点击****/
chrome.browserAction.onClicked.addListener(function(tab){
	
		chrome.tabs.sendRequest(tab.id, {requestEvent: "openBox"}, function(response) {	
		})
	
})
/**** 获取内容客户端传递过来的NumIid******/
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.requestEvent == "getUserId"){
		
			sendResponse({data:localStorage["id"]});
		
	}else if(request.requestEvent == 'post_num_id'){alert(request.num_iid)
		//loadItemRebate(sender.tab.id,{from:'extension'})
	}
	  
});
chrome.tabs.onSelectionChanged.addListener(function(tabid){
	loadItemRebate(tabid)
});