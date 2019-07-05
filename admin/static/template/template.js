var index = -1

function save(key, obj) {
	var json = JSON.stringify(obj)
	serverStorage.setItem(key, json)

}
var templateVue = new Vue({
	el: "#template",
	data: {
		templates: JSON.parse(localStorage.getItem('templates')) || [],
		newTemplate: {
			title: '',
			header: [],
			aside: [],
			footer: [],
			toptime:new Date().toLocaleDateString() + ' '+ new Date().getHours() + ':'+ new Date().getMinutes(),
			createtime:new Date().toLocaleDateString() + ' '+ new Date().getHours() + ':'+ new Date().getMinutes()
		},
		blocks:[],
		addbtn: {
			state: false,
			text: '保存'
		},
		show_h: false,
		show_a: false,
		show_f: false


	},
	methods: {
		btnfc_h: function() {
			var that = this
			that.show_h = true
			this.show_a = false
			this.show_f = false
		},
		hiddenshow_h: function() {
			var that = this;
			that.show_h = false;
		},
		btnfc_a: function() {
			var that = this
			that.show_a = true
			this.show_h = false
			this.show_f = false
		},
		hiddenshow_a: function() {
			var that = this;
			that.show_a = false;
		},
		btnfc_f: function() {
			var that = this
			that.show_f = true
			this.show_a = false
			this.show_h = false
		},
		hiddenshow_f: function() {
			var that = this;
			that.show_f = false;
		},
		add: function() {
			var name = this.newTemplate.title.trim()
			if (-1 == index) {
				if (0 == name.length) {
					alert('名字不能为空')
					return
				}
			}
			for (var i = 0; i < this.templates.length; i++) {
				if (name == this.templates[i].title) {
					alert('名字重复')
					return
				}
			}
			this.templates.push({
				title: this.newTemplate.title,
				header: this.newTemplate.header,
				aside: this.newTemplate.aside,
				footer: this.newTemplate.footer,
			})
			this.addbtn = {
				state: true,
				text: '保存中...'
			}
			serverStorage.setItem('templates', JSON.stringify(this.templates), function(res) {
				if (0 == res.body.code) {
					alert('保存成功')
				}
				templateVue.addbtn = {
					state: false,
					text: '保存'
				}
			})
			// save('templates', this.templates)
			this.newTemplate = {
				title: '',
				header: [],
				aside: [],
				footer: []
			}
			this.show_a = false
			this.show_h = false
			this.show_f = false
		},
		del: function(name) {
			for (var i = 0; i < this.templates.length; i++) {
				if (name == this.templates[i].title) {
					this.templates.splice(i, 1)
				}
			}
			save('templates', this.templates)
		},
		clear: function() {
			this.newTemplate = {
				title: '',
				header: [],
				aside: [],
				footer: []
			}
			this.show_a = false
			this.show_h = false
			this.show_f = false
		},
		update: function(title) {
			for (var i = 0; i < this.templates.length; i++) {
				if (title == this.templates[i].title) {
					this.newTemplate = {
						title: this.templates[i].title,
						header: this.templates[i].header,
						aside: this.templates[i].aside,
						footer: this.templates[i].footer,
					}
					this.templates.splice(i, 1)
				}

			}
		}
	},
	created: function() {
		serverStorage.getItem('blocks', function(res) {
			templateVue.blocks = res.body
		})
		serverStorage.getItem('templates', function(res) {
			templateVue.templates = res.body
		})
	}

})
