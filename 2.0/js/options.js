$(function(){
	$(".r-item input.text").focus(function(){
		$(this).siblings('.r-label').addClass('r-label-on');
		$(this).siblings('.r-tip').fadeIn();
		$(this).siblings('.error-message').hide();
	}).blur(function(){
		if($(this).val().length==0){
			$(this).siblings('.r-label').removeClass('r-label-on');
		}
			$(this).siblings('.r-tip').fadeOut();
	})
	updatePage();
	
})
function login(){
	var email = $("input[name='data[User][email]']").val();
	var password = $("input[name='data[User][password]']").val();
	$.post('http://www.yarpar.com/api/get_user_info',{email:email,password:password},function(data){
		if(data.status){
			localStorage["id"] = data.id;
			localStorage['nickname'] = data.nickname;
			localStorage['avatar'] = data.avatar;
			localStorage['space'] = data.space;
			localStorage['fan_count'] = data.fan_count;
			localStorage['follow_count'] = data.follow_count;
			localStorage['product_count'] = data.product_count;
			updatePage()
			
		}else{
			error(data.message)
		}
	},'json')
}
function logout(){
	localStorage["id"] = 0;
	localStorage['nickname'] = 0;
	localStorage['avatar'] = 0;
	localStorage['space'] = 0;
	localStorage['fan_count'] = 0;
	localStorage['follow_count'] = 0;
	localStorage['product_count'] = 0;
	updatePage()
}
function updatePage(){
	$(".section").hide();
	if(check_login()){
		$("#userWrapper").show();
		updateUser();
	}else{
		$("#loginWrapper").show()
	}
}
function updateUser(){
	$("#avatar").attr('src',localStorage['avatar']);
	$("#nickname").attr('href',localStorage['space']).html(localStorage['nickname']);
}
function error(e){
	$("#error-message").html(e);
}