<template>
  <div class="secDiv">
    <div class="profile" v-loading.lock="loading">
      <div class="avatar">
        <img alt="" :src="userInfo.avatar_url">
        <h6>{{ userInfo.loginname }}</h6>
        <p>
          <icon name="score" scale="3"></icon>
          <span>积分：{{ userInfo.score }}</span>
        </p>
        <p>
          <icon name="github" scale="3"></icon>
          <span>Github：https://github.com/{{ userInfo.githubUsername }}</span>
        </p>
        <p>
          <icon name="time" scale="3"></icon>
          <span>创建时间：{{ dealCommentTime(userInfo.create_at) }}</span>
        </p>
      </div>
      <div class="recentReolies">
        <p class="title">最近参与的话题</p>
        <template v-for="(item,index) in userInfo.recent_replies">
          <div v-if="index < 4" :key="index">
            <router-link :to="{ name:'UserRouter',params:{name:item.author.loginname} }">
              <img :src="item.author.avatar_url" alt="">
            </router-link>
            <router-link :to='{ name:"ArticleRouter",params:{id:item.id} }'>
              <p v-text="item.title"></p>
            </router-link>
          </div>
        </template>
      </div>
      <div class="recentTopics">
        <p class="title">最近创建的话题</p>
        <template v-for="(item,index) in userInfo.recent_topics">
          <div v-if="index < 4" :key="index">
            <router-link :to="{ name:'UserRouter',params:{name:item.author.loginname} }">
              <img :src="item.author.avatar_url" alt="">
            </router-link>
            <router-link :to='{ name:"ArticleRouter",params:{id:item.id} }'>
              <p v-text="item.title"></p>
            </router-link>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userInfo: {
          create_at: "2017-03-20"
        },
        loading: true
      };
    },

    created() {
      this.$http({
        url: `https://cnodejs.org/api/v1${this.$route.path}`,
        method: "get"
      }).then(res => {
        this.userInfo = res.data.data
      }).catch(res => {
        console.log('UserCom.vue', res)
      })
    },
    methods: {
      dealCommentTime(time){
          console.log(time);
          return String(time).match(/.{10}/)[0].replace(/[T]/, ' ');
      }

    },
    beforeRouteUpdate(to, from, next){
      this.$http({
        url: `https://cnodejs.org/api/v1${to.path}`,
        method: 'get'
      }).then(res => {
        this.userInfo = res.data.data
      }).catch(res => {
        console.log('UserCom.vue', res)
      });
      next()
    },
    watch: {
      userInfo(val){
        if (val) {
          this.loading = false;
        }
      }
    }
  };
</script>

<style scoped>
  @import url('../style/UserCom.css');
</style>
