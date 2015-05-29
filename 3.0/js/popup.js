/** 当点击应用图标，当前页面的content获取信息****/
$(function(){
	if(get_target()){
		var t = get_target();
		$("#form").attr('action',t);
		chrome.tabs.getSelected(null,function(tab){
			chrome.tabs.sendRequest(tab.id, {action: "get_item_info"}, function(response) {
					loading(0);
					W('num_iid',response.num_iid);
					W('title',response.title);
					W('price',response.price);
					W('thumb',response.thumb);
					W('thumbs',response.thumbs);
			})
		})
	}
	
})
