/*
* author: mamingyang@baofeng.com
* date: 2018/11/1
* usage: 这是一个标准的view单文件。含ajax请求用法。
*/

<template>
<div class="lh70 cBlu" id="info">
  {{info}}
</div>
</template>

<script>
import { getData } from '../../services/home';

export default {
  name: 'Home',
  data() {
    return {
      info: {},
    };
  },
  methods: {
    async getInfo() {
      this.info = await getData({ el: '#info' });
    },
  },
  mounted() {
    this.getInfo();
  },
};
</script>

<style lang="scss" scoped>

</style>
