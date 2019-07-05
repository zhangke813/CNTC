function save(key,obj){
	var json = JSON.stringify(obj)
	serverStorage.setItem(key,json)
}
var flag = 1
var etext= new Vue({
	el:'#bpp',
	data:{
		localTexts:[],
		texts:[],
		blockTemp:[],
		temp:true,
		page:{
			size:8,
			index:0,
			start:0,
			end:2,
			count:0,
			allPage:0,
			reset:function() {
				this.start = this.size * this.index
				this.end = this.start + this.size
				this.count = etext.texts.length
				//向上取整
				this.allPage = Math.ceil(this.count / this.size)
			}
		}
	},
	methods:{
		del: function(name){
			//删除 splice(起始下标，删除个数)
			// etext.texts.splice(i,1)
			//删除后保存，就相当于覆盖掉了
			for(var i = 0;i<this.localTexts.length;i++){
				if(name == this.localTexts[i].title){
					this.localTexts.splice(i,1)
					save('text',this.localTexts)
					break
				}
			}
			for(var i = 0;i<this.texts.length;i++){
				if(name == this.texts[i].title){
					this.texts.splice(i,1)
					break
				}
			}
		},
		selected:function(temp){
			var oneTemp=[]
			for(var i = 0;i<this.localTexts.length;i++){
				if(this.localTexts[i].temp == temp){
					oneTemp.push(this.localTexts[i])
				}
			}
			this.texts = oneTemp
			this.page.index = 0
			this.page.reset()
		},
		//选择页面的函数
		selectePage:function (index) {
			this.page.index = index-1
			this.page.reset()
		},
		timesort:function(texts){
			if(1 == flag){
			var compare = function(obj1,obj2){
				var aTimeString = obj1.toptime
				var bTimeString = obj2.toptime
				var aTime = new Date(aTimeString).getTime()
				var bTime = new Date(bTimeString).getTime()
				if (aTime < bTime){
					return 1;
				}else if(aTime > bTime){
					return -1;
				}else{
					return 0;
				}
			}
			texts.sort(compare)
			flag = -1
		}else{
			var compare = function(obj1,obj2){
				var aTimeString = obj1.toptime
				var bTimeString = obj2.toptime
				var aTime = new Date(aTimeString).getTime()
				var bTime = new Date(bTimeString).getTime()
				if (aTime < bTime){
					return -1;
				}else if(aTime > bTime){
					return 1;
				}else{
					return 0;
				}
			}
			texts.sort(compare)
			flag = 1
		}
		}
	},
	created:function(){
		serverStorage.getItem('text',function(res){
			etext.localTexts = res.body || []
		})
		serverStorage.getItem('templates',function(res){
			etext.blockTemp = res.body || []
		})
	}
})