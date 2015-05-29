chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    if (request.requestEvent == "getNumId"){  // 在得到request请求是ok的时候 做下面的操作 
    	
      sendResponse({
        data: $("input[name='item_id_num']").val() // 获取id是hello的元素发过去  
      }); 
    }else if(request.requestEvent == 'openBox'){
    	var win = window;
    	var fanuser = '';
    	var url = window.location;
    	chrome.extension.sendRequest({requestEvent: "getUserId"}, function(response) {
		  fanuser = response.data;
		  if(fanuser >0){
			  if (checkTaobao(url)) {
			  		
					win.document.charset="UTF-8";
				 	var js=win.document.createElement('script');
				 	js.type='text/javascript';
				 	js.src='http://yfl.api.yarpar.com/ui/js/taofan.js';
				 	js.setAttribute("charset","UTF-8");
				 	js.id = 'yptaofan';
				 	js.value = fanuser;
				 	win.document.getElementsByTagName('html')[0].insertBefore(js, win.document.getElementsByTagName('html')[0].firstChild);
				 	$('body').prepend('<input type="hidden" id="yarpar_user_id" name="yarpar_user_id" value="'+fanuser+'" />');
				}else {
					alert('此页面不支持右键返现，请确认您打开的当前页面是淘宝宝贝详情页');
				}
		  }else{
		  	alert('请点击雅返利图标右键-选项。绑定您的雅趴网账户。否则无法收到返利哦')
		  }
		});
			
    }else{
    	console.log(request.requestEvent)
    }  
  }
);
function checkTaobao(url){
	var iid = $("input[name='item_id_num']").val();
	return parseInt(iid);
}