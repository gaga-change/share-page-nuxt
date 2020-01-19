<template>
  <el-card shadow="hover">
    <p><img :src="icon" alt=""> {{ path }}</p>
    <p>{{ post.describe }}</p>
    <p>{{ post.author.nickname }} 分享于 {{ post.createdAt | time }}</p>
    <p>
      <el-tag v-for="tag in (post.tags || [])" :key="tag">
        {{ tag }}
      </el-tag>
    </p>
  </el-card>
</template>

<script>
export default {
  filters: {
    time(val) {
      return (new Date(val)).toLocaleString()
    }
  },
  props: {
    post: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {

    }
  },
  computed: {
    host() {
      return this.post.content.match(/(https:|http)\/\/[^/]+/)[0]
    },
    icon() {
      return this.host + '/favicon.ico'
    },
    path() {
      return this.post.content.substr(this.host.length + 1)
    }
  }
}
</script>
