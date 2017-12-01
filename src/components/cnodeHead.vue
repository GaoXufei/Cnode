<template>
  <div class="head">

    <el-button type="text" @click="dialogVisiblez">
      <img src="../svg/icon.png" alt="">
    </el-button>
    <el-button type="text" @click="ToggleSide" v-if="RouterName">
      <img src="../svg/user.png" alt="">
    </el-button>
    <el-dialog title="技术栈" :visible.sync="dialogVisible" size='tiny'>
      <div class="dialogDiv">
        <ul>
          <li>Vue.js</li>
          <li>Vue-router</li>
          <li>Axios</li>
          <li>ElementUI</li>
          <li>CnodeJs API</li>
        </ul>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  export default {
    data(){
      return {
        dialogVisible: false,
        RouterName: false,
        routerBeal: 'RootPath'
      }
    },
    methods: {
      dialogVisiblez: function (res) {
        this.dialogVisible = !this.dialogVisible
      },
      ToggleSide: function () {

        this.$store.commit('increment')
      }


    },
    created(){
      console.log(this.$route)
      if (this.$route.name == 'RootPath') {
        this.RouterName = false;
      } else if (this.$route.name == 'ArticleRouter') {
        this.RouterName = true;
      } else {
        this.RouterName = false;
      }
    },
    watch: {
      $route(val){
        this.routerBeal = val.name
        if (val.name == 'RootPath') {
          this.RouterName = false;
        } else if (val.name == 'ArticleRouter') {
          this.RouterName = true;
        } else {
          this.RouterName = false;
        }
      },

    },


  }
</script>

<style scoped>
  @import url('../style/cnodeHead.css');
</style>
