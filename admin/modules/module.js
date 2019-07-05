$(function(){
	$("div[include]").each(function() {
		var $this = $(this);
		$.get($this.attr("include"),function(html) {
			$this.replaceWith(html);
		})
	})
})