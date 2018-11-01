<template>
  <el-container direction="vertical">
    <Header/>
    <div :style="{minHeight}">
      <router-view/>
    </div>
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
  data() {
    return {
      minHeight: '0',
    };
  },
  methods: {
    listenResize() {
      window.onresize = () => {
        this.setMinHeight();
      };
    },
    setMinHeight() {
      this.minHeight = `${document.documentElement.clientHeight - 140}px`;
    },
  },
  created() {
    this.setMinHeight();
    this.listenResize();
  },
};
</script>

<style lang="scss">
  @import "reset";
</style>
