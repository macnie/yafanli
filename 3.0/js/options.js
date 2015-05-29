$(function(){
	$('#submit').click(function () {
	   save_form();
	});
	
})
function save_form(){
	var target = $("#target").val();
	if(target == ''){
		alert('请输入地址');
	}else{
		localStorage["target"] = target;
		alert('保存成功');
	}
}