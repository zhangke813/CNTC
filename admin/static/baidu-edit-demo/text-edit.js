//自定义全局变量
//自动获取焦点
Vue.directive('focus', {
	inserted: function(ele) {
		ele.focus()
	}
})
// Vue.filter('',function(){
// 	return text.trim()
// })
function save(key, obj) {
	var json = JSON.stringify(obj)
	localStorage.setItem(key, json)
}



var index = -1
var flag
var um 
var app = new Vue({
	el: "#app",
	data: {
		newText: {
			title: '',
			temp: '',
			html: '',
			createtime: new Date().toLocaleDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes()
		},
		texts: JSON.parse(localStorage.getItem('texts')) || [],
		rename: ''
	},
	methods: {
		addText: function() {
			var name = app.newText.title.trim()
			var newType = app.newText.temp.trim()
			//有名字的判断
			if (-1 == index) {
				if (0 == name.length) {
					alert('名字不能为空')
					return
				}
				if (0 == newType.length) {
					alert('模板不能为空')
					return
				}
				for (var i = 0; i < app.texts.length; i++) {
					if (name == app.texts[i].title) {
						alert('名字重复')
						return
					}
				}
				app.texts.push(app.newText)
				localStorage.setItem('texts', JSON.stringify(app.texts))
				console.log('保存成功')
			} else {
				// console.log(this.texts[index].name)
				//    this.texts[index]={
				// name:this.newText.name,
				// newType:this.newText.newType,
				// html:this.newText.html
				this.texts[flag] = {
					title: this.newText.title,
					temp: this.newText.temp,
					html: this.newText.html,
					createtime: new Date().toLocaleDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes()
				}
				save('texts', this.texts)
			}
			app.newText = {
				title: '',
				temp: '',
				html: '',
				createtime: new Date().toLocaleDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes()

			}
		},
		changeName: function() {
			for (var i = 0; i < app.texts.length; i++) {
				if (app.newText.title == app.texts[i].title) {
					app.rename = '名字重复'
					return
				}
			}
			app.rename = ''
		},
		getHTML:function() {
			console.log(myEditor.innerHTML)
		}
	},
	created: function() {
		var args = location.href.split('?')[1]
		if (!args) return
		args = args.split('&')
		for (var i = 0; i < args.length; i++) {
			var arg = args[i].split('=')
			if ('id' == arg[0]) {
				index = arg[1]
				break
			}
		}
		// if(index == this.texts.title){
		// 	this.newText = {
		// 		title: this.texts[index].title,
		// 		temp: this.texts[index].temp,
		// 		html: this.texts[index].html
		// 	}
		// }
		for (flag = 0; flag < this.texts.length; flag++) {
			if (decodeURI(index) == this.texts[flag].title) {
				this.newText = {
					title: this.texts[flag].title,
					temp: this.texts[flag].temp,
					html: this.texts[flag].html
				}
				return flag
			}
		}
	},
	mounted: function() {
		um = UM.getEditor('myEditor');
		console.log("6.组件模板挂载后,但不保证已在docment中")
		console.log("	a.dom挂在后的更新")
		
		
	}

	
})
