<template>
  <nav class="ComponentsHeader">
    <ul>
      <li><span @click="$router.push('/')">站点LOGO</span></li>
      <li>
        <nuxt-link to="/">
          首页
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/self/publish">
          我发布的
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/self/like">
          我喜欢的
        </nuxt-link>
      </li>
    </ul>
    <div class="author">
      <template v-if="user">
        <div>
          {{ user.nickname }}
        </div>
        <el-link @click="handleLogout" type="primary">
          退出
        </el-link>
      </template>
      <template v-else>
        <router-link to="/auth/login">
          登录
        </router-link>
        <router-link to="/auth/register">
          注册
        </router-link>
      </template>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: undefined
    }
  },
  computed: {
    user() { return this.$store.state.user }
  },
  methods: {
    handleLogout() {
      this.$store.commit('setUser', null)
      this.$axios.post('/api/auth/logout')
      this.$router.push('/auth/login')
    }
  }
}
</script>
<style lang="less">
@header_height: 60px;
.ComponentsHeader {
  display: flex;
  border-bottom: solid 1px #e6e6e6;
  ul {
    flex: 1;
    font-size: 14px;
    list-style: none;
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

  .author {

  }
}
</style>
