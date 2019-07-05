function save(key, obj) {
	var json = JSON.stringify(obj)
	serverStorage.setItem(key, json)
}
var i = -1
var um
var ii
var blo2 = new Vue({
	el: '#blo2',
	data: {
		blockedit: {
			title: '',
			html: '',
			toptime: new Date().toLocaleDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes(),
			createtime: new Date().toLocaleDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes()
		},
		blocks: [],
		content: '',
		addbtn: {
			state: false,
			text: '保存'
		}
	},
	methods: {
		addblock: function() {
			var titles = this.blockedit.title.trim()
			this.blockedit.html = UM.getEditor('myEditor').getContent()
			var htmls = this.blockedit.html.trim()
			// this.ue=UE.getEditor('editor').getContent()
			if (i) {
				if (0 == titles.length) {
					alert("标题不能为空")
					return
				}
				if (0 == htmls.length) {
					alert("html不能为空")
					return
				}
				if(ii){
					for (var j = 0; j < this.blocks.length; j++) {
						if (titles == this.blocks[j].title && j != ii) {
							alert("标题不能相同")
							return
						}
					}
					
				}else{
					for (var j = 0; j < this.blocks.length; j++) {
						if (titles == this.blocks[j].title) {
							alert("标题不能相同")							
							return
						}
					}
				}
				if(-1 == i){
					blo2.blocks.push(blo2.blockedit)
					
					this.addbtn = {
						state: true,
						text: '保存中...'
					}
					
					serverStorage.setItem('blocks', JSON.stringify(blo2.blocks), function(res) {
						if (0 == res.body.code) {
							alert('保存成功')
						}
					
						blo2.addbtn = {
							state: false,
							text: '保存'
						}
					})
				}else {
				this.blocks[ii] = {
					title: this.blockedit.title,
					html: this.blockedit.html,
					createtime: this.blockedit.createtime,
					toptime: new Date().toLocaleDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes()
				}
				alert('修改成功')
				save('blocks', this.blocks)
				}
				i = -1
			} 

			blo2.blockedit = {
				title: '',
				html: '',
				createtime: new Date().toLocaleDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes(),
				toptime: new Date().toLocaleDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes()
			}
		}
	},
	created: function() {
		serverStorage.getItem('blocks', function(res) {
			blo2.blocks = res.body || []
			var arg = location.href.split('?')[1]
			//新建时没有参数
			if (!arg) return
			ii = arg.split('=')[1]
			blo2.blockedit = {
				title: blo2.blocks[ii].title,
				html: blo2.blocks[ii].html,
				createtime: blo2.blocks[ii].createtime,
				toptime: new Date().toLocaleDateString() + ' ' + new Date().getHours() + ':' + new Date().getMinutes(),
			}
			UM.getEditor('myEditor').setContent(blo2.blockedit.html, true);
			i = 1

		})
	},
	mounted: function() {
		um = UM.getEditor('myEditor');
		console.log("6.组件模板挂载后,但不保证已在docment中")
		console.log("	a.dom挂在后的更新")
	}
})
