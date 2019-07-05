new Vue({
	el:"#a",
	beforeCreate:function () {
		localStorage.setItem('code','123456')
	},
	data:{
			//旧密码
			jcodess:'',
			//新密码，重复新密码
			ncode:'',
			rncode:'',
			rename:'',
			cc:''
	},
	methods:{
		checkname:function(){
			//输入密码等于原密码
			var a = localStorage.getItem('code')
			console.log(a)
			if(this.jcodess == localStorage.getItem('code') && this.ncode == this.rncode){
				//存新密码的值
				var inp = document.getElementById("bb").value
				localStorage.setItem('ncode',inp)
				var inp1 = document.getElementById("bb1").value
				localStorage.setItem('rncode',inp1)
				var ar = localStorage.getItem('ncode')
				
				localStorage.setItem('code',ar)
				console.log(this.code)
			}
		},
		bbb:function(){
			if(this.jcodess != localStorage.getItem('code')){
				this.rename='原密码不正确'
				return
			}
			this.rename=''
		},
		c:function(){
			if(this.ncode != this.rncode){
				this.cc = '重新输入的密码不正确'
				return
			}
			this.cc=''
		}
	}
})