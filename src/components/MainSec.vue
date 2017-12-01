<template>
    <div class="secDiv" v-loading='loading' element-loading-text="数据加载中..." >
        <div v-for="item of content" :key="item.id">
            <router-link :to="{ name:'UserRouter',params:{name:item.author.loginname} }">
                <img :src="item.author.avatar_url" :title="item.author.loginname" alt="">
            </router-link>
            <div class="textDiv">
                <router-link :to="{name:'ArticleRouter',params:{id:item.id}}">{{ item.title }}</router-link>
                <div class="stuff">
                    <span>回复：{{ item.reply_count }}</span>
                    <span>创建于：{{ dealTime(item.create_at) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name:'MainSection',
    data(){
        return {
            content: [],
            limit:0,
            loading:true
        }
    },
    methods:{
        scrollMethod(){
            const sumH    = document.body.scrollHeight || document.documentElement.scrollHeight;
            const viewH   = document.documentElement.clientHeight;
            const scrollH = document.body.scrollTop || document.documentElement.scrollTop;
            if( viewH +  scrollH >= sumH ){
                this.getData()
            }
        },
        getData(){
            this.limit += 10;
            this.$http({
                url:'https://cnodejs.org/api/v1/topics',
                method:'get',
                params:{
                    page: 1,
                    limit: this.limit,
                    mdrender: 'false'
                }
            }).then(response => {
                this.content = response.data.data;
            }).catch(res => {
                console.log('MaiSrc:',res)
            })
        },
        dealTime(time){
           return String(time).match(/.{10}/)[0]
        }
    },
    mounted(){
        window.addEventListener('scroll',this.scrollMethod);
    },
    computed:{
        
    },
    created(){
        this.getData()
        
    },
    watch:{
        content(val){
            if(val){
                this.loading = false;
            }
        }
        
    }
}
</script>

<style scoped>
    @import url('../style/MainSec.css');
</style>
