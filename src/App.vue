<template>
  <div id="app">
    <cnode-head></cnode-head>
    <router-view name="main" />
    <router-view name="side" ref="child" />
  </div>
</template>

<script>

import cnodeHead from './components/cnodeHead'

export default {
  name: 'app',
  data(){
    return {
      authorName:''
    }
  },
  components:{
    cnodeHead
  },
  watch:{
    authorName(value){
      this.$refs.child.name = value
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  font-size:.24rem;
  position: relative;
}

*{
  margin:0;
  padding:0;
}
</style>
