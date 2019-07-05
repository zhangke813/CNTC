<?php
class DB
{
    private static $host="my3521847.xincache4.cn";
    private static $user="my3521847";
    private static $password="s2F7Z7E6";
    private static $dbName="my3521847";           //数据库名
    private static $charset="utf8";          //字符编码
    private static $port="3306";            //端口号
    private $conn=null;
	
    public function __construct(){
        $this->conn=new mysqli(self::$host, self::$user, self::$password, self::$dbName, self::$port);
        $this->conn->query("set names ".self::$charset);
    }
    //执行sql语句
    public function query($sql){
        return $this->conn->query($sql);
    }
    //返回受影响数据行数
    public function update($sql){
        $this->conn->query($sql);
        return mysqli_affected_rows($this->conn);
    }
	
	/**
	 * 获取数据
	 * 将数据库当对象数据库使用
	 * @param {Object} $key
	 */
	public function getItem($key){
		$result = $this->query("SELECT fval FROM test where fkey =`$key`");
		
		if ($result->num_rows > 0) {
			$row = $result->fetch_assoc();
			return $row['fval'];
		}else{
			return null;
		}
	}
	
	/**
	 * 设置数据
	 * 将数据库当对象数据库使用
	 * @param {Object} $key
	 * @param {Object} $value
	 */
	public function setItem($key,$value){
		if(null == $this->getItem($key)){
			$sql = "INSERT INTO test VALUES (`$key`, `$value`)";
		}else{
			$sql = "UPDATE test SET `fval`=`$value` WHERE  `fkey`=`$key`";
		}
		return $this->update($sql);
	}
	
    //关闭数据库
    public function close()
    {
        @mysqli_close($this->conn);
    }
}