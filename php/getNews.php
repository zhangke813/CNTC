<?php
	/**
	 * 获取新闻列表
	 * zh1 海外月刊,http://cntc.top/php/news.php?zh2
	 */
	
	// $path = '../live/'.$_GET['src'];
	$path = '../live/'.'zh2/测试.html';
	
	$path=iconv('utf-8', 'GB18030', $path);
	
	echo file_get_contents($path);
  
