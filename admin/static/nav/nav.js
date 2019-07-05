function save(objValue){
	vnav.saveButtonDown = true
	vnav.saveButtonText = '保存中...'
	serverStorage.getItem('blocks',function(res){
		var blk = res.body || []
		for(var i=0;i<blk.length;i++){
			if(blk[i].title == '导航'){
				blk[i].value = objValue
				blk[i].html = document.getElementById('css').innerHTML + document.getElementsByClassName('content')[0].innerHTML
				break
			}
		}
		if(i==blk.length){
			var val = {
				title:'导航',
				html:document.getElementById('css').innerHTML + document.getElementsByClassName('content')[0].innerHTML,
				author:'张俊男',
				state:100,
				value:objValue,
				createTime:new Date()
			}
			blk.push(val)
		}
		var value = JSON.stringify(blk)
		serverStorage.setItem('blocks',value,function(){
			vnav.saveButtonDown = false
			vnav.saveButtonText = '确认修改'
		})
	})
	
}
var vnav = new Vue({
	el:'#app',
	data:{
		arr:[
			{
				navName:'首页',
				navBody:'正文',
				isopen :true,
				navChilds : []
			},
			{
				navName:'关于海外',
				navBody:'正文',
				isopen :true,
				navChilds : [
					{
						chiName:'板块介绍',
						chiBody:'正文',
					},
					{
						chiName:'董事长致辞',
						chiBody:'正文',
					},
					{
						chiName:'核心团队',
						chiBody:'正文',
					},
					{
						chiName:'组织架构',
						chiBody:'正文',
					}
				]
			}
		],
		version:0,
		isfolding:true,
		saveButtonDown:false,
		saveButtonText:'确认修改'
	},
	methods:{
		openOrclose:function(i){
			if(this.arr[i].isopen == true )
				document.getElementsByClassName('symbol')[i].innerText = '➕'
			else
				document.getElementsByClassName('symbol')[i].innerText = '➖'
			this.arr[i].isopen = !this.arr[i].isopen
		},
		addnav:function(i){
			this.arr.splice(i+1,0,{
				navName:'',
				navBody:'',
				isopen :false,
				navChilds : []
			})
		},
		delnav:function(i){
			this.arr.splice(i,1)
			if(this.arr.length == 0){
				this.addnav(0)
			}
		},
		addnavchild:function(i){
			this.arr[i].navChilds.push({
				chiName:'',
				chiBody:''
			})
			document.getElementsByClassName('symbol')[i].innerText = '➖'
			this.arr[i].isopen = true
		},
		delchild:function(i,j){
			this.arr[i].navChilds.splice(j,1)
		},
		addchild:function(i,j){
			this.arr[i].navChilds.splice(j+1,0,{
				chiName:'',
				chiBody:''
			})
		},
		tofront:function(i){
			if(0==i) return
			var temp = this.arr[i]
			this.arr[i] = this.arr[i-1]
			this.arr[i-1] = temp
			
			this.version++
		},
		tonext:function(i){
			if(this.arr.length-1 == i) return
			var temp = this.arr[i]
			this.arr[i] = this.arr[i+1]
			this.arr[i+1] = temp
			
			this.version++
		},
		childTofront:function(i,j){
			if(0==j) return
			var temp = this.arr[i].navChilds[j]
			this.arr[i].navChilds[j] = 	this.arr[i].navChilds[j-1]
			this.arr[i].navChilds[j-1] = temp
			
			this.version++
		},
		childTonext:function(i,j){
			if(this.arr[i].navChilds.length-1 == j) return
			var temp = this.arr[i].navChilds[j]
			this.arr[i].navChilds[j] = 	this.arr[i].navChilds[j+1]
			this.arr[i].navChilds[j+1] = temp
			
			this.version++
		},
		upData(){
			if(!this.saveButtonDown)
				save(this.arr)
		},
		extension:function(){
			this.isfolding = !this.isfolding;
		}
	},
	created:function(){
		serverStorage.getItem('blocks',function(res){
			for(var i=0;i<res.body.length;i++){
				if(res.body[i].title == '导航'){
					vnav.arr = res.body[i].value
				}
			}
		})
	}
})