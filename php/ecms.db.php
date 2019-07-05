<?php
    require_once 'DB.class.php';
	$db = new DB();
	
    //类似localstorage存储
    //GET 方法获取数据 POST方法保存数据
    //POST数据使用键值对发送,按键名存储为文件名,值存储为文件内容
    //GET按读取data下的文件
    header('Access-Control-Allow-Origin:*');
    header('Content-type: application/json');
    
    if ('GET' == $_SERVER['REQUEST_METHOD']) {
        echo $db->getItem($_SERVER['QUERY_STRING']);
    } else {
        //写入文件
        $txt = urldecode(file_get_contents("php://input"));
        $index = strpos($txt, '=');
        $key = substr($txt, 0, $index);
        $value = substr($txt, $index + 1);
		echo '{"code":'.$db->setItem($key, $value).'}';
    }
