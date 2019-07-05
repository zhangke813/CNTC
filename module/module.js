/**
 * 模块加载工具
 * 作者:邱明发
 */
$(function() {
	$("div[include]").each(function() {
		var $this = $(this);
		$.get($this.attr("include"), function(html) {
			$this.replaceWith(html)
		})
	})
})
