var serverStorage = {
	getItem:function(key,backFun) {
		Vue.http.get('http://cntc.top/php/ecms.php?' + key,{emulateJSON:true})
			.then(backFun)
	},
	setItem:function(key,value,backFun) {
		var args = {}
		args[key]=value
		Vue.http.post('http://cntc.top/php/ecms.php',args,{emulateJSON:true}).then(backFun)
	}
}