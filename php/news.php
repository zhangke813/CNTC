<?php
	/**
	 * 获取新闻列表
	 * zh1 海外月刊,http://cntc.top/php/news.php?zh2
	 */
	
	header('Access-Control-Allow-Origin:*');
	header('Content-type: application/json');  
	
    $path = '../live/'.$_SERVER['QUERY_STRING'];
	$list = scandir($path);
	
	$res = '[';
	$len = sizeof($list);
	
	for($i = 0;$i < $len;$i++){
		if('.pdf' == substr($list[$i],-4)){
			$res .= "\"$list[$i]\",";
		}
	}
	
	$res = substr($res,0,strlen($res) - 1).']';
	
	echo iconv('gbk','utf-8',$res);
	
  
