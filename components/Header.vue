<template>
  <nav class="ComponentsHeader">
    <ul>
      <li class="logo-area">
        <Logo />
        <img src="/title.png" width="46" alt="源享">
      </li>
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
        <el-dropdown @command="handleCommand">
          <div class="avatar-area">
            <span class="nickname mr10">{{ user.nickname }}</span>
            <el-avatar> {{ user.nickname }} </el-avatar>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item disabled>
              基本设置
            </el-dropdown-item>
            <el-dropdown-item command="logout" divided>
              退出
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
import Logo from '@/components/Logo'
export default {
  components: { Logo },
  data() {
    return {
      activeIndex: undefined
    }
  },
  computed: {
    user() { return this.$store.state.user }
  },
  methods: {
    /** 下拉选项点击事件 */
    handleCommand(command) {
      switch (command) {
        case 'logout':
          this.logout()
          break
      }
    },
    /** 退出登录 */
    logout() {
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
      height: @header_height;
      span,
      a {
        display: block;
        padding: 0 20px;
        height: @header_height;
        line-height: @header_height;
        color: #909399;
        text-decoration: none;
        cursor: pointer;
        border-bottom: 2px solid transparent;
        &.nuxt-link-exact-active {
          border-bottom: 2px solid #409eff;
          color: #303133;
        }
      }
      &.logo-area {
        cursor: pointer;
        height: @header_height;
        display: flex;
        align-items: center;
        margin-right: 20px;
        img {
          margin-left: 5px;
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
    .avatar-area {
      display: flex;
      height: @header_height;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>
