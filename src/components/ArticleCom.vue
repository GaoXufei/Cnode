<template>
    <div class="secDiv" v-loading.lock="loading">
        <div class="articleMessage">
            <h2>{{ article.title }}</h2>
            <p>
                <span><i>发布于：</i>{{ createTime }}</span>
                <span><i>作者：</i><router-link :to="{ name:'UserRouter',params:{name: article.author.loginname} }">{{ article.author.loginname }}</router-link></span>
                <span><i>浏览量：</i>{{ article.visit_count }}</span>
                <span><i>来自：</i>{{ article.tab }}</span>
            </p>
        </div>
        <div id="content" v-html="article.content"></div>
        <div class="reply" id="reply">
            <div v-for="reply of article.replies" :key="reply.length" class="replySec">
                <router-link :to="{name:'UserRouter',params:{name:{name: reply.author.loginname}}}">
                    <img :src="reply.author.avatar_url" alt="">
                </router-link>
                <div>
                    <div class="replyUp">
                        <span class="replyUserName">{{ reply.author.loginname }}</span>
                        <span>{{ dealCommentTime(reply.create_at) }}</span>
                        <span class="thumbs" >
                            <icon name="thumbs-up" scale="1.5"></icon>
                            <span>{{ reply.ups.length }}</span>
                        </span>
                    </div>
                    <p v-html="reply.content"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            article: {
                title: '',
                author: {
                    loginname: 'temp'
                },
                visit_count: '',
                tap: '',
                content: '',
                create_at: '2017-04-13',
                replies: ''
            },
            loading: true
        }
    },
    computed:{
        createTime(){
            return String(this.article.create_at).match(/.{10}/)[0]
        }
    },
    methods:{
        dealCommentTime(time){

            return String(time).match(/.{16}/)[0].replace(/.{2}/,'').replace(/[T]/,' ');
        }
    },
    watch:{
        article(val) {
            if(val){
                this.loading = false
            }
        }
    },
    beforeCreate(){
        this.$http({
            url: `https://cnodejs.org/api/v1${this.$route.path}`,
            method: 'get'
        }).then(res => {
            if( res.data.success == true ){
                this.article = res.data.data;
                this.$parent.authorName = this.article.author.loginname;
            }else{
                this.article = 'Sorry, Something wrong happend when getting the remote data';
            }
        }).catch(res => {
            console.log('ArticleCom.vue: ', res);
        })
    },
    created(){


    }
}
</script>

<style>
    @import url('../style/ArticleCom.css');
</style>
