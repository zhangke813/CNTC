$(function(){
	$(".td_comp").mouseover(function(event){
		$(this).children(".shade").stop().fadeIn(500);
		$(this).css("transform","scale(1.2)")
		
		
	});
	$(".td_comp").mouseout(function(event){
		$(this).children(".shade").stop().fadeOut(500);
		$(this).css("transform","scale(1)")
	});
})

