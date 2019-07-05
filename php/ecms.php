<?PHP
	//类似localstorage存储
	//GET 方法获取数据 POST方法保存数据
	//POST数据使用键值对发送,按键名存储为文件名,值存储为文件内容
	//GET按读取data下的文件
	header('Access-Control-Allow-Origin:*');
	header('Content-type: application/json');  
	
	if('GET' == $_SERVER['REQUEST_METHOD']){
		//读取文件
		$path = 'data/'.$_SERVER['QUERY_STRING'].'.db';
	  
		$myfile = fopen($path, 'r');
	  	echo fread($myfile,filesize($path));
	  	fclose($myfile);
	}else{
	  //写入文件
		$txt = urldecode(file_get_contents("php://input"));
		$index = strpos($txt,'=');
		$key = substr($txt,0,$index);
		$value = substr($txt,$index + 1);
	  
		$path = 'data/'.$key.'.db';
		$myfile = fopen($path, 'w');
	  	fwrite($myfile, $value);
		echo '{"code":0}';
		fclose($myfile);
	}