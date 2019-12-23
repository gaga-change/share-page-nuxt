<template>
  <nav class="ComponentsHeader">
    <ul>
      <li><span @click="$router.push('/')">站点LOGO</span></li>
      <li><nuxt-link to="/">首页</nuxt-link></li>
      <li><nuxt-link to="/self/publish">我发布的</nuxt-link></li>
      <li><nuxt-link to="/self/like">我喜欢的</nuxt-link></li>
    </ul>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: undefined
    };
  },
  computed: {},
  methods: {}
};
</script>
<style lang="less">
.ComponentsHeader {
  ul {
    font-size: 14px;
    list-style: none;
    border-bottom: solid 1px #e6e6e6;
    li {
      display: block;
      float: left;
      margin: 0;
      span,
      a {
        display: block;
        padding: 0 20px;
        height: 60px;
        line-height: 60px;
        color: #909399;
        text-decoration: none;
        cursor: pointer;
        border-bottom: 2px solid transparent;
        &.nuxt-link-exact-active {
          border-bottom: 2px solid #409eff;
          color: #303133;
        }
      }
    }
    &:after {
      content: " ";
      clear: both;
      display: block;
    }
  }
}
</style>