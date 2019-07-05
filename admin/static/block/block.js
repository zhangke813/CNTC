function save(key, obj) {
    var json = JSON.stringify(obj)
    serverStorage.setItem(key, json)
}
var eblock = new Vue({
    el: '#blo',
    data: {
        localblocks: [],
        page: {
            index: 0, 
            size: 10,
            start: 0,
            end: 10,
            count: 0,
            allpage: 0,
            reset: function () {
                this.start = this.size * this.index
                this.end = this.start + this.size
                this.count = eblock.localblocks.length
                this.allpage = Math.ceil(this.count / this.size)
            }
        }
    },
    methods: {
        del: function (i) {
            //splice(i,1)  (删除起始下标,删除个数)
            //var blocks1=JSON.stringify(eblock.blocks)
            eblock.localblocks.splice(i, 1)
            //删除后保存
            save('blocks', eblock.localblocks)
        },
		selectePage:function (index) {
			this.page.index = index-1
			this.page.reset()
		}
    },mounted:function(){
		
    },created:function(){
		serverStorage.getItem('blocks',function(res){
			eblock.localblocks=res.body
			eblock.page.reset()
		})
    }
})