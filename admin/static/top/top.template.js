//作者：刘韬闻
//模块：top，导航条
var html = '<div class="top">	<div class="top-left">		<ul>			<li class="top-log">neusoft</li>			<li><a href="text.html">正文</a></li>			<li><a href="template.html">模板</a></li>			<li><a href="block.html">区块</a></li>			<li><a href="nav.html">导航</a></li>			<li><a href="classification.html">正文分类</a></li>			<li><a href="global.html">全局</a></li>			<li><a href="com.html">公司</a></li>			<li><a href="/">*前端</a></li>		</ul>	</div>	<div class="top-right">		<div class="top-set">			<div class="top-seta"><a href="resetPwd.html">修改密码</a></div>			<div class="top-seta"><a href="thanths.html">致谢</a></div>			<div class="top-seta"><a href="setting.html">设置</a></div>			<div class="top-seta"><a href="about.html">关于我们</a></div>			<div class="top-seta"><a href="logout.html">退出</a></div>		</div><span id="uname">&admin</span>	</div></div>'
Vue.component('top',Vue.extend({
	template:html
}))