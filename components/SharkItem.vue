<template>
  <el-card :class="className" shadow="hover">
    <p><img :src="icon" width="32" height="32" alt=""> {{ path }}</p>
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
    className: {
      type: String,
      default: ''
    },
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
