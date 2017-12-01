<template>
    <transition name="fade">
        <div class="secSide" v-if="isShow" v-loading.lock="loading">
            <span class="off" @click="ToggleSide">
                <img src="../svg/off.png" alt="">
            </span>
            <div>
                <router-link :to="{ name:'UserRouter',params:{name: userInfo.loginname} }">
                    <img :src="userInfo.avatar_url" alt="">
                </router-link>
                <span v-text="userInfo.loginname"></span>
            </div>
            <p>
                <icon name="score" scale="3"></icon><span>{{ userInfo.score }}</span>
            </p>
            <p>
                <icon name="github" scale="3"></icon><span>https://github.com/{{ userInfo.githubUsername }}</span>
            </p>
        </div>
    </transition>


</template>

<script>
export default {
    name:'SideSection',
    data(){
        return {
            loading:true,
            userInfo:{
                avatar_url: '',
                loginname: 'temp'
            },
            name: ''

        }
    },
    watch:{
        userInfo(val){
            // console.log(val)
            if(val) this.loading = false
        },
        name(val){
            // console.log(val)
            this.$http({
                url:`https://cnodejs.org/api/v1/user/${val}`,
                method:'get'
            }).then( res =>{
                this.userInfo = res.data.data
            }).catch( res =>{
                console.log('SideSec.vue :', res);
            })
        }
    },
    created(){
        // console.log(this.isShow)
    },
    computed:{
        isShow:function(){
            return this.$store.state.pageBoolean
        }
    },
    methods:{
        ToggleSide:function(){

            this.$store.commit('increment')
        }
    }
}
</script>

<style scpoed>
    @import url('../style/SideSec.css');
</style>
