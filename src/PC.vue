<template>
  <el-container direction="vertical">
    <Header/>
    <router-view/>
    <Footer/>
  </el-container>
</template>

<script>
export default {
  name: 'PC',
  components: {
    Header: () => import('./components/Header'),
    Footer: () => import('./components/Footer'),
  },
};
</script>

<style lang="scss">
@import "reset";
</style>
