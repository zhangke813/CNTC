//自定义全局变量
//自动获取焦点
Vue.directive('focus',{
	inserted:function(ele){
		ele.focus()
	}
})
// Vue.filter('',function(){
// 	return text.trim()
// })
// function save(key,obj){
// 	var json = JSON.stringify(obj)
// 	serverStorage.setItem(key,json,function(res){})
// }
var index = -1
var flag
var um
var app = new Vue({
	el:"#app",
	data:{
		newText:{
			title:'',
			temp:'',
			html:'',
			toptime:new Date().toLocaleDateString() + ' '+ new Date().getHours() + ':'+ new Date().getMinutes(),
			createtime:new Date().toLocaleDateString() + ' '+ new Date().getHours() + ':'+ new Date().getMinutes()
		},
		texts:[],
		blockTemp:[],
		rename:'',
		addbtn: {
			state: false,
			text: '保存'
		}
	},
	methods:{
		addText:function(){
			var name = app.newText.title.trim()
			var newType = app.newText.temp.trim()
			//有名字的判断
			if(-1 == index){
			if(0 == name.length){
				alert('名字不能为空')
				return
			}
			if(0 == newType.length){
				alert('模板不能为空')
				return
			}
			for(var i =0;i<app.texts.length;i++){
				if(name == app.texts[i].title){
					alert('名字重复')
					return
				}
			}
			this.newText={
				title:this.newText.title,
				temp:this.newText.temp,
				html:myEditor.innerHTML,
				toptime:new Date().toLocaleDateString() + ' '+ new Date().getHours() + ':'+ new Date().getMinutes(),
				createtime:new Date().toLocaleDateString() + ' '+ new Date().getHours() + ':'+ new Date().getMinutes(),
			}
			app.texts.push(app.newText)
			// localStorage.setItem('texts',JSON.stringify(app.texts))
			this.addbtn = {
				state: true,
				text: '保存中...'
			}
			serverStorage.setItem('text',JSON.stringify(app.texts),function(res){
				app.addbtn= {
					state: false,
					text: '保存'
				}
				if (0 == res.body.code) {
					window.location.href='../app/text.html'
				}
			})
			console.log('保存成功')
			}else{
				    if(0 == name.length){
				    	alert('名字不能为空')
				    	return
				    }
				    if(0 == newType.length){
				    	alert('模板不能为空')
				    	return
				    }
					// console.log(this.texts[index].name)
				 //    this.texts[index]={
					// name:this.newText.name,
					// newType:this.newText.newType,
					// html:this.newText.html
					this.texts[flag] = {
						title:this.newText.title,
						temp:this.newText.temp,
						html:myEditor.innerHTML,
						toptime:new Date().toLocaleDateString() + ' '+ new Date().getHours() + ':'+ new Date().getMinutes(),
						createtime:this.newText.createtime
					}
					// save('text',this.texts)
					this.addbtn = {
						state: true,
						text: '保存中...'
					}
					serverStorage.setItem('text',JSON.stringify(this.texts),function(res){
						app.addbtn= {
							state: false,
							text: '保存'
						}
						if (0 == res.body.code) {
							window.location.href='../app/text.html'
						}
					})
			}
			this.newText = {
				title:'',
				temp:'',
				html:''	,
				toptime:new Date().toLocaleDateString() + ' '+ new Date().getHours() + ':'+ new Date().getMinutes(),
				createtime:new Date().toLocaleDateString() + ' '+ new Date().getHours() + ':'+ new Date().getMinutes()
			}
			UM.getEditor('myEditor').setContent(this.newText.html, true);
		},
		changeName:function(){
			for(var i =0;i<app.texts.length;i++){
				if(app.newText.title == app.texts[i].title){
					app.rename='名字重复'
					return
				}
			}
			app.rename =''
		}
	},
	created:function(){
		serverStorage.getItem('text', function(res) {
			app.texts = res.body || []
			var args = location.href.split('?')[1]//取到？号后面的值
			if(!args)return //判断是否args的取值是否存在
			args = args.split('&')
			for(var i = 0;i< args.length;i++){
				var arg = args[i].split('=')
				if('id' == arg[0]){
					index = arg[1]
					break
				}
			}
			for(flag = 0;flag<app.texts.length;flag++){
				//decodeURI(index)将中文名字进行解码
				if(decodeURI(index) == app.texts[flag].title){
					app.newText = {
						//将修改页面的数值返还到修改的页面
						title: app.texts[flag].title,
						temp: app.texts[flag].temp,
						html: app.texts[flag].html,
						createtime:app.texts[flag].createtime
					}
					//UM.getEditor('myEditor').setContent(app.newText.html, true);
					myEditor.innerHTML = app.newText.html;
					return flag	
				}
			}
		})
		serverStorage.getItem('templates',function(res){
			app.blockTemp = res.body || []
		})
		// if(index == this.texts.title){
		// 	this.newText = {
		// 		title: this.texts[index].title,
		// 		temp: this.texts[index].temp,
		// 		html: this.texts[index].html
		// 	}
		// }
	},
	mounted:function() {
		um= UM.getEditor('myEditor');
	}
	// watch:{
	// 	texts:{
	// 		handler:function(value,oleValue){
	// 			localStorage.setItem('texts',JSON.stringify(value))
	// 		},
	// 		deep:true
	// 	}
	// }
})